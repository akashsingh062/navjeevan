"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { PlusCircle, Camera, Trash2, Link as LinkIcon, Sparkles, CheckCircle2, AlertCircle, Play } from "lucide-react";
import { GalleryItem } from "@/types";

interface GalleryFormInput {
  title: string;
  category: string;
  imageUrl: string;
}

const isVideoUrl = (url: string): boolean => {
  if (!url) return false;
  const u = url.toLowerCase();
  return (
    u.includes(".mp4") ||
    u.includes(".webm") ||
    u.includes(".ogg") ||
    u.includes("/video/") ||
    u.includes("video.fna.fbcdn.net") ||
    u.includes("video-") ||
    u.includes("facebook.com/watch") ||
    u.includes("facebook.com/video.php") ||
    u.includes("fb.watch")
  );
};

const getVideoPoster = (url: string): string => {
  try {
    const u = new URL(url);
    const poster = u.searchParams.get("poster");
    if (poster) return decodeURIComponent(poster);
  } catch {}
  return url;
};

const isCdnFilename = (name: string): boolean => {
  const clean = name.replace(/[-_\s]+/g, "");
  if (clean.length > 15) {
    const digits = clean.replace(/\D/g, "");
    if (digits.length / clean.length > 0.8) {
      return true;
    }
  }
  return false;
};

interface GalleryFormSectionProps {
  galleryList: GalleryItem[];
  refreshData: () => Promise<void>;
  triggerConfirm: (title: string, message: string, onConfirm: () => void) => void;
}

export default function GalleryFormSection({
  galleryList,
  refreshData,
  triggerConfirm,
}: GalleryFormSectionProps) {
  const galleryForm = useForm<GalleryFormInput>({
    defaultValues: { title: "", category: "Annual Function", imageUrl: "" }
  });

  const [customCategory, setCustomCategory] = useState("");
  const watchedCategory = useWatch({
    control: galleryForm.control,
    name: "category",
    defaultValue: "Annual Function"
  });

  const [galleryQueue, setGalleryQueue] = useState<{
    id: string;
    file: File;
    status: "idle" | "uploading" | "success" | "error";
    errorMsg?: string;
  }[]>([]);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<string[]>([]);

  const [uploadMode, setUploadMode] = useState<"file" | "links">("file");
  const [linksInput, setLinksInput] = useState("");
  const [showHtmlExtractor, setShowHtmlExtractor] = useState(false);
  const [htmlExtractorUrl, setHtmlExtractorUrl] = useState("");
  const [htmlInput, setHtmlInput] = useState("");

  const extractImagesFromHtml = (htmlText: string): string[] => {
    const scontentRegex = /(https:\/\/[a-z0-9.-]+\.fbcdn\.net\/v\/[^"'\s>)}]+)/gi;
    const fbcdnMatches = htmlText.match(scontentRegex) || [];

    const isExcludedMedia = (urlStr: string): boolean => {
      const lowerUrl = urlStr.toLowerCase();
      return (
        lowerUrl.includes("/t39.30808-1/") ||
        lowerUrl.includes("/t1.30497-1/") ||
        lowerUrl.includes("/emoji.php") ||
        lowerUrl.includes("/rsrc.php") ||
        lowerUrl.includes("cstp=mx") ||
        lowerUrl.includes("fb50") ||
        lowerUrl.includes("fb100") ||
        lowerUrl.includes("fb200") ||
        lowerUrl.includes("safe_image.php") ||
        lowerUrl.includes("s24x24") ||
        lowerUrl.includes("s32x32") ||
        lowerUrl.includes("s40x40") ||
        lowerUrl.includes("s72x72") ||
        lowerUrl.includes("s100x100") ||
        lowerUrl.includes("s160x160")
      );
    };

    const isVideoMedia = (urlStr: string): boolean => {
      const lower = urlStr.toLowerCase();
      return (
        lower.includes("/t15.") ||
        lower.includes(".mp4") ||
        lower.includes("/video/") ||
        lower.includes("video.fna") ||
        lower.includes("facebook.com/watch") ||
        lower.includes("facebook.com/video.php") ||
        lower.includes("fb.watch")
      );
    };

    const idMap = new Map<string, { url: string; score: number }>();

    for (let link of fbcdnMatches) {
      link = link.replace(/\\/g, "").replace(/&amp;/g, "&");
      if (isExcludedMedia(link) || isVideoMedia(link)) {
        continue;
      }

      try {
        const u = new URL(link);
        const pathname = u.pathname;
        const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
        if (filename) {
          let score = 100;
          if (link.includes("s590x590")) {
            score = 80;
          } else if (link.includes("s600x600") || link.includes("s640x640") || link.includes("s720x720")) {
            score = 90;
          } else if (link.includes("s960x960")) {
            score = 110;
          } else if (link.includes("mx2048x1536") || link.includes("p600x600")) {
            score = 150;
          } else if (!link.includes("_s")) {
            score = 120;
          }

          const existing = idMap.get(filename);
          if (!existing || existing.score < score) {
            idMap.set(filename, { url: link, score });
          }
        }
      } catch {}
    }

    return Array.from(idMap.values()).map(info => info.url);
  };

  const handleLocalHtmlExtract = () => {
    if (!htmlInput.trim()) {
      toast.error("Please paste the page source HTML code first.");
      return;
    }
    const extracted = extractImagesFromHtml(htmlInput);
    if (extracted.length === 0) {
      toast.error("No image links found in the pasted page source. Make sure you copied the entire page source.");
      return;
    }

    const resolvedUrls = extracted.join("\n");
    setLinksInput(prev => {
      const lines = prev.split("\n");
      const index = lines.findIndex(l => l.trim() === htmlExtractorUrl);
      if (index !== -1) {
        lines[index] = resolvedUrls;
      } else {
        return prev ? `${prev}\n${resolvedUrls}` : resolvedUrls;
      }
      return lines.join("\n");
    });

    toast.success(`Successfully extracted ${extracted.length} image(s) locally!`);
    setShowHtmlExtractor(false);
    setHtmlInput("");
  };

  const parsedLinks = React.useMemo(() => {
    if (!linksInput.trim()) return [];
    return linksInput.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  }, [linksInput]);

  const resolveExternalLink = (url: string): string => {
    const resolved = url.trim();
    if (resolved.includes("drive.google.com")) {
      const fileIdMatch = resolved.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || resolved.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
      }
    }
    if (resolved.includes("dropbox.com")) {
      return resolved
        .replace("www.dropbox.com", "dl.dropboxusercontent.com")
        .replace("?dl=0", "")
        .replace("&dl=0", "")
        .replace("?dl=1", "")
        .replace("&dl=1", "");
    }
    return resolved;
  };

  const needsResolution = (url: string): boolean => {
    const u = url.trim().toLowerCase();

    if (u.match(/\.(jpeg|jpg|gif|png|webp|svg)($|\?)/)) {
      return false;
    }

    if (u.includes("res.cloudinary.com") || u.includes("fbcdn.net") || u.includes("googleusercontent.com")) {
      return false;
    }

    return u.startsWith("http://") || u.startsWith("https://");
  };

  const handleResolveLink = async (originalLink: string) => {
    const u = originalLink.trim().toLowerCase();

    if (u.includes("drive.google.com") || u.includes("dropbox.com")) {
      const resolved = resolveExternalLink(originalLink);
      if (resolved !== originalLink) {
        setLinksInput(prev => {
          const lines = prev.split("\n");
          const index = lines.findIndex(l => l.trim() === originalLink);
          if (index !== -1) {
            lines[index] = resolved;
          }
          return lines.join("\n");
        });
        toast.success("Link resolved successfully to direct URL!");
        return;
      }
    }

    const isFB = u.includes("facebook.com");
    const isInsta = u.includes("instagram.com");
    const isGPhotos = u.includes("photos.google.com") || u.includes("photos.app.goo.gl");

    let platformName = "webpage";
    if (isFB) platformName = "Facebook";
    else if (isInsta) platformName = "Instagram";
    else if (isGPhotos) platformName = "Google Photos";

    const loadingToast = toast.loading(`Connecting to ${platformName} to extract images...`);
    try {
      const res = await fetch("/api/resolve-facebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: originalLink })
      });
      const result = await res.json();

      if (res.ok && result.success && Array.isArray(result.images) && result.images.length > 0) {
        const resolvedUrls = result.images.join("\n");

        setLinksInput(prev => {
          const lines = prev.split("\n");
          const index = lines.findIndex(l => l.trim() === originalLink);
          if (index !== -1) {
            lines[index] = resolvedUrls;
          }
          return lines.join("\n");
        });
        toast.success(`Successfully extracted ${result.images.length} direct image(s) from ${platformName}!`, { id: loadingToast });
      } else {
        toast.error(result.message || `Failed to extract images from ${platformName}. Make sure it is public.`, { id: loadingToast });
        if (isFB) {
          setHtmlExtractorUrl(originalLink);
          setShowHtmlExtractor(true);
        }
      }
    } catch (err) {
      toast.error(`Failed to connect to ${platformName} resolution API.`, { id: loadingToast });
      console.error(`${platformName} extraction error:`, err);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    const loadingToast = toast.loading("Deleting photo...");
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Gallery photo deleted successfully.", { id: loadingToast });
        refreshData();
      } else {
        toast.error(result.message || "Failed to delete gallery item.", { id: loadingToast });
      }
    } catch {
      toast.error("Failed to connect to gallery delete API.", { id: loadingToast });
    }
  };

  const handleBulkDeleteGallery = async () => {
    if (selectedGalleryIds.length === 0) return;
    const loadingToast = toast.loading(`Deleting ${selectedGalleryIds.length} photos...`);
    try {
      let successCount = 0;
      let failCount = 0;
      for (const id of selectedGalleryIds) {
        const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
        const result = await res.json();
        if (res.ok && result.success) {
          successCount++;
        } else {
          failCount++;
        }
      }
      toast.success(`Successfully deleted ${successCount} photos.${failCount > 0 ? ` Failed to delete ${failCount} photos.` : ""}`, { id: loadingToast });
      setSelectedGalleryIds([]);
      refreshData();
    } catch {
      toast.error("Failed to execute bulk deletion.", { id: loadingToast });
    }
  };

  const handleGalleryMultiUpload = async () => {
    setIsGalleryUploading(true);
    const mainLoadingToast = toast.loading(`Uploading batch of ${galleryQueue.length} photos...`);
    let successCount = 0;
    let failCount = 0;

    const baseTitle = galleryForm.getValues("title") || "";
    const category = galleryForm.getValues("category") || "Annual Function";

    let finalCategory = category;
    if (category === "Others") {
      finalCategory = customCategory.trim() || "Others";
    }

    const updatedQueue = [...galleryQueue];

    for (let i = 0; i < updatedQueue.length; i++) {
      const item = updatedQueue[i];
      if (item.status === "success") continue;

      item.status = "uploading";
      setGalleryQueue([...updatedQueue]);

      try {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("category", finalCategory);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData
        });
        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok || !uploadResult.success) {
          throw new Error(uploadResult.message || "Failed to upload photograph.");
        }

        const imageUrl = uploadResult.url;

        const cleanFileName = item.file.name
          .substring(0, item.file.name.lastIndexOf("."))
          .replace(/[-_]+/g, " ")
          .trim();

        const capitalizedFileName = cleanFileName
          .split(" ")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        const finalTitle = baseTitle
          ? `${baseTitle} - ${capitalizedFileName}`
          : capitalizedFileName || "Gallery Image";

        const galleryRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: finalTitle,
            category: finalCategory,
            imageUrl
          })
        });
        const galleryResult = await galleryRes.json();

        if (!galleryRes.ok || !galleryResult.success) {
          throw new Error(galleryResult.message || "Failed to register gallery item.");
        }

        item.status = "success";
        successCount++;
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Failed to process photo.";
        item.status = "error";
        item.errorMsg = errMsg;
        failCount++;
      }

      setGalleryQueue([...updatedQueue]);
    }

    setIsGalleryUploading(false);

    if (failCount === 0) {
      toast.success(`Successfully uploaded and saved all ${successCount} photos to the gallery!`, { id: mainLoadingToast });
      setGalleryQueue([]);
      galleryForm.reset({ title: "", category });
      setCustomCategory("");
      refreshData();
    } else {
      toast.error(`Completed processing: ${successCount} succeeded, ${failCount} failed. Please review error items.`, { id: mainLoadingToast });
      setCustomCategory("");
      refreshData();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadMode === "file") {
      await handleGalleryMultiUpload();
    } else {
      await handleGalleryLinksUpload();
    }
  };

  const handleGalleryLinksUpload = async () => {
    if (parsedLinks.length === 0) {
      toast.error("Please enter one or more image links to add to the gallery.");
      return;
    }

    setIsGalleryUploading(true);
    const mainLoadingToast = toast.loading(`Saving ${parsedLinks.length} web links to the gallery...`);
    let successCount = 0;
    let failCount = 0;

    const baseTitle = galleryForm.getValues("title") || "";
    const category = galleryForm.getValues("category") || "Annual Function";

    let finalCategory = category;
    if (category === "Others") {
      finalCategory = customCategory.trim() || "Others";
    }

    const getFilenameFromUrl = (url: string) => {
      try {
        const u = new URL(url);
        const poster = u.searchParams.get("poster");
        const urlToParse = poster ? decodeURIComponent(poster) : url;
        const u2 = new URL(urlToParse);
        const pathname = u2.pathname;
        const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
        if (lastSegment && lastSegment.includes(".")) {
          return lastSegment.substring(0, lastSegment.lastIndexOf("."))
            .replace(/[-_]+/g, " ")
            .trim();
        }
      } catch {}
      return "";
    };

    for (let i = 0; i < parsedLinks.length; i++) {
      const link = parsedLinks[i];
      try {
        const resolvedLink = resolveExternalLink(link);

        const isVideo = isVideoUrl(resolvedLink);
        const cleanFileName = getFilenameFromUrl(resolvedLink);
        const isCdn = isCdnFilename(cleanFileName);
        const displayName = (cleanFileName && !isCdn) ? cleanFileName : "";

        const capitalizedFileName = displayName
          ? displayName
              .split(" ")
              .map(w => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          : "";

        const finalTitle = baseTitle
          ? (capitalizedFileName ? `${baseTitle} - ${capitalizedFileName}` : baseTitle)
          : (capitalizedFileName || (isVideo ? `Event Video ${i + 1}` : `Web Photo ${i + 1}`));

        const galleryRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: finalTitle,
            category: finalCategory,
            imageUrl: resolvedLink
          })
        });
        const galleryResult = await galleryRes.json();

        if (!galleryRes.ok || !galleryResult.success) {
          throw new Error(galleryResult.message || "Failed to save link.");
        }

        successCount++;
      } catch (error) {
        failCount++;
        console.error(`Failed to save link: ${link}`, error);
      }
    }

    setIsGalleryUploading(false);

    if (failCount === 0) {
      toast.success(`Successfully saved all ${successCount} links directly to the school gallery!`, { id: mainLoadingToast });
      setLinksInput("");
      galleryForm.reset({ title: "", category });
      setCustomCategory("");
      refreshData();
    } else {
      toast.error(`Completed processing: ${successCount} succeeded, ${failCount} failed. Please verify link formats.`, { id: mainLoadingToast });
      refreshData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 text-left mb-2">
        <h3 className="text-base font-extrabold text-neutral-dark">Add Photo Log (Multi-Upload)</h3>
        <p className="text-xs text-neutral-body">Choose multiple files, folders, or paste external image links instantly to register them into the school gallery.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold text-neutral-dark">Event Category</label>
        <select
          className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
          {...galleryForm.register("category")}
        >
          <option value="Annual Function">Annual Function</option>
          <option value="Sports Day">Sports Day</option>
          <option value="Classroom Activities">Classroom Activities</option>
          <option value="Cultural Events">Cultural Events</option>
          <option value="Independence Day">Independence Day</option>
          <option value="Prize Distribution">Prize Distribution</option>
          <option value="Others">Others</option>
        </select>

        {watchedCategory === "Others" && (
          <div className="flex flex-col gap-1.5 mt-2 transition-all">
            <label className="text-xs font-bold text-neutral-dark">Specify Custom Category</label>
            <input
              type="text"
              placeholder="e.g. Science Exhibition, Field Trip"
              className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
            <span className="text-[10px] text-neutral-body font-medium leading-relaxed">
              If left blank, the category will default to &quot;Others&quot;.
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold text-neutral-dark">Optional Base Caption Title Prefix</label>
        <input
          type="text"
          placeholder="e.g. Traditional Folk Dance (Optional: file/link names will be appended/used)"
          className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
          {...galleryForm.register("title")}
        />
        <span className="text-[10px] text-neutral-body font-medium leading-relaxed mt-0.5">
          If left blank, clean capitalized file or link names will be used as captions automatically.
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold text-neutral-dark">Photo Upload Method</label>
        <div className="flex bg-neutral-light/75 border border-gray-150 p-1.5 rounded-2xl gap-1.5">
          <button
            type="button"
            onClick={() => setUploadMode("file")}
            className={`grow py-3 px-4 text-xs font-black rounded-xl transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-1.5 select-none ${
              uploadMode === "file"
                ? "bg-white text-primary shadow-xs border border-gray-250"
                : "text-neutral-body hover:text-neutral-dark"
            }`}
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span>Select Local Files/Folder</span>
          </button>
          <button
            type="button"
            onClick={() => setUploadMode("links")}
            className={`grow py-3 px-4 text-xs font-black rounded-xl transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-1.5 select-none ${
              uploadMode === "links"
                ? "bg-white text-primary shadow-xs border border-gray-255"
                : "text-neutral-body hover:text-neutral-dark"
            }`}
          >
            <LinkIcon className="w-4 h-4 shrink-0" />
            <span>External Image Link(s)</span>
          </button>
        </div>
      </div>

      {uploadMode === "file" ? (

        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-extrabold text-neutral-dark">Select Photos or Folder</label>

          <div className="flex flex-col gap-4 p-6 bg-neutral-light border border-dashed border-gray-300 rounded-2xl text-center items-center justify-center">
            <Camera className="w-10 h-10 text-primary/40 mb-1" />

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
              <label className="px-5 py-2.5 bg-primary text-white text-xs font-extrabold rounded-xl hover:bg-primary-hover transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                <PlusCircle className="w-4 h-4" />
                <span>Select Multiple Files</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;
                    const newItems = Array.from(files).map(file => ({
                      id: Math.random().toString(36).substring(2, 9),
                      file,
                      status: "idle" as const
                    }));
                    setGalleryQueue(prev => [...prev, ...newItems]);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </label>

              <label className="px-5 py-2.5 bg-neutral-dark text-white text-xs font-extrabold rounded-xl hover:bg-neutral-dark/95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                <PlusCircle className="w-4 h-4" />
                <span>Select Entire Folder</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  {...({ webkitdirectory: "", directory: "" } as React.InputHTMLAttributes<HTMLInputElement>)}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;
                    const imageFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
                    if (imageFiles.length === 0) {
                      toast.error("No image files found in the selected folder.");
                      return;
                    }
                    const newItems = imageFiles.map(file => ({
                      id: Math.random().toString(36).substring(2, 9),
                      file,
                      status: "idle" as const
                    }));
                    setGalleryQueue(prev => [...prev, ...newItems]);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-[10px] text-neutral-body leading-tight">
              Upload multiple JPEGs, PNGs. All folders are automatically filtered to process images only.
            </p>
          </div>
        </div>
      ) : (

        <div className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-neutral-dark">Image URL links (One URL per line)</label>
            <textarea
              rows={4}
              placeholder="Paste direct URLs here (one link per line)&#10;e.g.&#10;https://images.unsplash.com/photo-1522071820081-009f0129c71c&#10;https://drive.google.com/file/d/1A2B3C_4D5E.../view"
              className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-xs rounded-xl font-medium font-mono text-neutral-dark focus:outline-none focus:border-primary transition-all"
              value={linksInput}
              onChange={(e) => setLinksInput(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5 mt-1">
              <span className="text-[10px] text-neutral-body leading-relaxed">
                Enter one or multiple links. External links will be saved directly and **never uploaded to Cloudinary**, rendering fully from their source host.
              </span>
              <button
                type="button"
                onClick={() => {
                  const firstFbLink = parsedLinks.find(l => l.includes("facebook.com")) || "";
                  setHtmlExtractorUrl(firstFbLink);
                  setShowHtmlExtractor(true);
                }}
                className="text-[10px] font-black text-primary hover:underline cursor-pointer focus:outline-none shrink-0 self-start sm:self-center"
              >
                Resolve Facebook Locally
              </button>
            </div>
          </div>

          {showHtmlExtractor && (
            <div className="bg-amber-50 border border-amber-250 rounded-2xl p-4.5 flex flex-col gap-3 text-xs text-amber-900 leading-relaxed font-semibold">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="font-extrabold text-amber-950">Local Facebook Link Resolver (Server Bypassed)</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowHtmlExtractor(false);
                    setHtmlInput("");
                  }}
                  className="text-[10px] text-amber-700 hover:text-amber-950 font-bold"
                >
                  Close
                </button>
              </div>
              <p className="font-medium text-[11px] text-amber-800">
                Facebook blocks cloud servers in production. You can resolve this link locally in your browser by pasting the post&apos;s page source:
              </p>
              <ol className="list-decimal list-inside font-medium text-[11px] text-amber-800 flex flex-col gap-1">
                <li>
                  Open the Facebook post:{" "}
                  {htmlExtractorUrl ? (
                    <a
                      href={htmlExtractorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-primary hover:text-primary-hover font-extrabold"
                    >
                      {htmlExtractorUrl}
                    </a>
                  ) : (
                    <span className="text-neutral-500 font-bold">(No URL selected. Paste the link in the textarea above first)</span>
                  )}
                </li>
                <li>
                  Press{" "}
                  <kbd className="bg-amber-100/80 px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px]">
                    Ctrl+U
                  </kbd>{" "}
                  (Windows) or{" "}
                  <kbd className="bg-amber-100/80 px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px]">
                    Cmd+Option+U
                  </kbd>{" "}
                  (Mac) to view page source.
                </li>
                <li>
                  Select all and copy (
                  <kbd className="bg-amber-100/80 px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px]">
                    Ctrl+A
                  </kbd>{" "}
                  /{" "}
                  <kbd className="bg-amber-100/80 px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px]">
                    Ctrl+C
                  </kbd>
                  ).
                </li>
                <li>Paste the copied source HTML code below:</li>
              </ol>
              <textarea
                rows={3}
                placeholder="Paste Facebook page source (HTML) code here..."
                className="w-full px-3 py-2 bg-white border border-amber-250 rounded-xl text-xs font-mono font-medium text-neutral-dark focus:outline-none focus:border-amber-500"
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleLocalHtmlExtract}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black text-xs uppercase self-end focus:outline-none cursor-pointer"
              >
                Extract Images Locally
              </button>
            </div>
          )}

          {parsedLinks.length > 0 && (
            <div className="flex flex-col gap-3 border border-gray-200 rounded-2xl p-4 bg-white mt-1">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-extrabold text-neutral-dark">
                  Links Queue ({parsedLinks.length} URLs detected)
                </span>
                <button
                  type="button"
                  disabled={isGalleryUploading}
                  onClick={() => setLinksInput("")}
                  className="text-[10px] font-black text-red-600 hover:underline cursor-pointer focus:outline-none disabled:opacity-50"
                >
                  Clear Links
                </button>
              </div>

              <div className="max-h-48 overflow-y-auto flex flex-col gap-2 divide-y divide-gray-50 pr-1">
                {parsedLinks.map((link, idx) => {
                  const needsResolve = needsResolution(link);
                  return (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 text-xs font-medium gap-3">
                      <span className="text-neutral-dark truncate max-w-sm sm:max-w-md font-mono text-[11px]" title={link}>
                        {link}
                      </span>

                      <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                        {needsResolve ? (
                          <>
                            <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-brand-amber/10 border border-brand-amber/15 text-brand-amber rounded flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Page link
                            </span>
                            <button
                              type="button"
                              onClick={() => handleResolveLink(link)}
                              className="px-2.5 py-1 bg-primary hover:bg-primary-hover text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3 shrink-0 animate-pulse" />
                              <span>Resolve Link</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-emerald-100 border border-emerald-150 text-emerald-800 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Direct Link
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {uploadMode === "file" && galleryQueue.length > 0 && (
        <div className="flex flex-col gap-3 border border-gray-200 rounded-2xl p-4 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-xs font-extrabold text-neutral-dark">
              Upload Queue ({galleryQueue.length} files selected)
            </span>
            <button
              type="button"
              disabled={isGalleryUploading}
              onClick={() => setGalleryQueue([])}
              className="text-[10px] font-black text-red-600 hover:underline cursor-pointer focus:outline-none disabled:opacity-50"
            >
              Clear Queue
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto flex flex-col gap-2 divide-y divide-gray-50 pr-1">
            {galleryQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 text-xs font-medium gap-3">
                <span className="text-neutral-dark truncate max-w-xs" title={item.file.name}>
                  {item.file.name}
                </span>

                <div className="flex items-center gap-2.5 shrink-0">
                  {item.status === "idle" && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-gray-100 text-neutral-body rounded">
                      Pending
                    </span>
                  )}
                  {item.status === "uploading" && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded animate-pulse">
                      Uploading...
                    </span>
                  )}
                  {item.status === "success" && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                      Success
                    </span>
                  )}
                  {item.status === "error" && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-red-100 text-red-800 rounded" title={item.errorMsg}>
                      Error
                    </span>
                  )}

                  {item.status === "idle" && (
                    <button
                      type="button"
                      onClick={() => setGalleryQueue(prev => prev.filter(q => q.id !== item.id))}
                      className="text-red-500 hover:text-red-700 font-extrabold text-[10px] focus:outline-none"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={
          isGalleryUploading ||
          (uploadMode === "file" ? galleryQueue.length === 0 : parsedLinks.length === 0)
        }
        className="w-full mt-4 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      >
        {uploadMode === "file" ? (
          <>
            <PlusCircle className="w-4 h-4" />
            <span>
              {isGalleryUploading
                ? `Uploading Photos (${galleryQueue.filter(q => q.status === "success").length}/${galleryQueue.length})...`
                : `Start Upload & Save (${galleryQueue.length} Photos)`
              }
            </span>
          </>
        ) : (
          <>
            <PlusCircle className="w-4 h-4" />
            <span>
              {isGalleryUploading
                ? `Saving External Links...`
                : `Save Direct Links (${parsedLinks.length} Photos)`
              }
            </span>
          </>
        )}
      </button>

      <div className="mt-10 border-t border-gray-100 pt-8 text-left">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h4 className="text-sm font-extrabold text-neutral-dark">Uploaded Gallery Photos ({galleryList.length})</h4>
          {galleryList.length > 0 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (selectedGalleryIds.length === galleryList.length) {
                    setSelectedGalleryIds([]);
                  } else {
                    setSelectedGalleryIds(galleryList.map(p => p.id || p._id || "").filter(Boolean));
                  }
                }}
                className="px-2.5 py-1.5 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
              >
                {selectedGalleryIds.length === galleryList.length ? "Deselect All" : "Select All"}
              </button>
              {selectedGalleryIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    triggerConfirm(
                      "Delete Selected Photos",
                      `Are you sure you want to permanently delete all ${selectedGalleryIds.length} selected event photos? This action cannot be undone.`,
                      handleBulkDeleteGallery
                    );
                  }}
                  className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-lg shadow-sm transition-all focus:outline-none cursor-pointer"
                >
                  Delete Selected ({selectedGalleryIds.length})
                </button>
              )}
            </div>
          )}
        </div>
        {galleryList.length === 0 ? (
          <p className="text-xs text-neutral-body italic">No uploaded event photos found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryList.map((photo) => (
              <div key={photo.id || photo._id} className="bg-neutral-light border border-gray-200 rounded-2xl overflow-hidden shadow-sm relative group flex flex-col h-full">
                <div className="absolute top-2.5 left-2.5 z-10 bg-white/80 p-1 rounded-lg backdrop-blur-xs shadow-xs border border-gray-100 flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedGalleryIds.includes(photo.id || photo._id || "")}
                    onChange={(e) => {
                      const id = photo.id || photo._id || "";
                      if (e.target.checked) {
                        setSelectedGalleryIds(prev => [...prev, id]);
                      } else {
                        setSelectedGalleryIds(prev => prev.filter(x => x !== id));
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                </div>
                <div className="relative aspect-video w-full bg-gray-200 shrink-0">
                  <Image
                    src={getVideoPoster(photo.imageUrl)}
                    alt={photo.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  {isVideoUrl(photo.imageUrl) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <div className="bg-black/50 border border-white/20 p-2 rounded-full text-white shadow-md">
                        <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                  <div>
                    <span className="text-[8px] font-black uppercase text-neutral-body tracking-wider block">
                      {photo.category}
                    </span>
                    <h5 className="text-[10px] font-extrabold text-neutral-dark line-clamp-2 mt-0.5 leading-snug">
                      {photo.title}
                    </h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      triggerConfirm(
                        "Delete Photo",
                        "Are you sure you want to permanently delete this photo from the school gallery? This action cannot be undone.",
                        () => handleDeleteGallery(photo.id || photo._id || "")
                      );
                    }}
                    className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-600 font-extrabold text-[10px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Photo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
