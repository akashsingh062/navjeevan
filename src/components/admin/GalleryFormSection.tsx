"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { PlusCircle, Camera, Trash2, Link as LinkIcon, Sparkles, CheckCircle2, AlertCircle, Play, UploadCloud, Globe, HelpCircle, Folder, ArrowLeft } from "lucide-react";
import { GalleryItem } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

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

  const [selectedCategoryFolder, setSelectedCategoryFolder] = useState<string | null>(null);

  const extractImagesFromHtml = (htmlText: string): string[] => {
    const scontentRegex = /(https:\/\/[a-z0-9.-]+\.fbcdn\.net\/v\/[^"'\s>)}]+)/gi;
    const fbcdnMatches = htmlText.match(scontentRegex) || [];

    const instaCdnRegex = /(https:\/\/[a-z0-9.-]+\.cdninstagram\.com\/[^"'\s>)}]+)/gi;
    const instaCdnMatches = htmlText.match(instaCdnRegex) || [];

    if (instaCdnMatches.length > 0) {
      const instaImages: string[] = [];
      for (let link of instaCdnMatches) {
        link = link.replace(/\\/g, "").replace(/&amp;/g, "&");
        const lower = link.toLowerCase();
        if (lower.includes("profile_pic") || lower.includes("s150x150") || lower.includes("logo") || lower.includes("avatar")) continue;
        if (!instaImages.includes(link)) instaImages.push(link);
      }
      if (instaImages.length > 0) return instaImages;
    }

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
        if (isFB || isInsta) {
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

  const handleBulkDeleteGallery = async (idsToDelete: string[] = selectedGalleryIds) => {
    if (idsToDelete.length === 0) return;
    const loadingToast = toast.loading(`Deleting ${idsToDelete.length} photos...`);
    try {
      let successCount = 0;
      let failCount = 0;
      for (const id of idsToDelete) {
        const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
        const result = await res.json();
        if (res.ok && result.success) {
          successCount++;
        } else {
          failCount++;
        }
      }
      toast.success(`Successfully deleted ${successCount} photos.${failCount > 0 ? ` Failed to delete ${failCount} photos.` : ""}`, { id: loadingToast });
      setSelectedGalleryIds(prev => prev.filter(id => !idsToDelete.includes(id)));
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

  // Group gallery list by category
  const groupedGallery = galleryList.reduce((acc, photo) => {
    const category = photo.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(photo);
    return acc;
  }, {} as Record<string, GalleryItem[]>);

  const categoryOrder = [
    "Annual Function",
    "Sports Day",
    "Classroom Activities",
    "Cultural Events",
    "Independence Day",
    "Prize Distribution"
  ];
  
  const sortedCategories = Object.keys(groupedGallery).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  // Selection helper variables for current active folder view
  const currentFolderPhotos = selectedCategoryFolder ? (groupedGallery[selectedCategoryFolder] || []) : [];
  const currentFolderPhotoIds = currentFolderPhotos.map(p => p.id || p._id || "").filter(Boolean);
  const selectedFolderIdsInSelection = currentFolderPhotoIds.filter(id => selectedGalleryIds.includes(id));
  const areAllInFolderSelected = currentFolderPhotoIds.length > 0 && currentFolderPhotoIds.every(id => selectedGalleryIds.includes(id));

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
        <h3 className="text-base font-black text-slate-900">Add Photo Log (Multi-Upload)</h3>
        <p className="text-xs text-slate-500 font-medium">Choose multiple files, folders, or paste external image links instantly to register them into the school gallery.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Event Category</label>
            <select
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
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
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex flex-col gap-2 mt-2"
              >
                <label className="text-xs font-bold text-slate-700">Specify Custom Category</label>
                <input
                  type="text"
                  placeholder="e.g. Science Exhibition, Field Trip"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                />
              </motion.div>
            )}
          </div>

          {/* Caption Prefix */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Optional Base Caption Prefix</label>
            <input
              type="text"
              placeholder="e.g. Traditional Folk Dance (Optional)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm rounded-xl font-medium text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              {...galleryForm.register("title")}
            />
            <p className="text-[10px] text-slate-400 font-medium leading-none">
              If left blank, clean capitalized file or link names will be used as captions automatically.
            </p>
          </div>
        </div>

        {/* Upload Mode Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold text-slate-700 tracking-wide">Photo Source Mode</label>
          <div className="flex bg-slate-100 border border-slate-200 p-1.5 rounded-2xl gap-2 w-full max-w-md">
            <button
              type="button"
              onClick={() => setUploadMode("file")}
              className={`flex-1 py-3 px-4 text-xs font-black rounded-xl transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-1.5 select-none ${
                uploadMode === "file"
                  ? "bg-white text-primary shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Camera className="w-4 h-4 shrink-0" />
              <span>Select Local Assets</span>
            </button>
            <button
              type="button"
              onClick={() => setUploadMode("links")}
              className={`flex-1 py-3 px-4 text-xs font-black rounded-xl transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-1.5 select-none ${
                uploadMode === "links"
                  ? "bg-white text-primary shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <LinkIcon className="w-4 h-4 shrink-0" />
              <span>Web Image Links</span>
            </button>
          </div>
        </div>

        {/* Mode content panels */}
        {uploadMode === "file" ? (
          <div className="flex flex-col gap-4">
            <label className="text-xs font-extrabold text-slate-700 tracking-wide">Select Assets</label>
            <div className="flex flex-col gap-4 p-8 bg-slate-50 border border-dashed border-slate-300 hover:bg-slate-100/50 hover:border-slate-400 transition-colors rounded-2xl text-center items-center justify-center">
              <UploadCloud className="w-10 h-10 text-primary/40 mb-1" />

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
                <label className="px-5 py-3 bg-primary text-white text-xs font-extrabold rounded-xl hover:bg-primary-hover transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md">
                  <PlusCircle className="w-4 h-4" />
                  <span>Choose Asset Files</span>
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

                <label className="px-5 py-3 bg-[#0F172A] text-white text-xs font-extrabold rounded-xl hover:bg-slate-850 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md">
                  <Camera className="w-4 h-4" />
                  <span>Upload Entire Folder</span>
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

              <p className="text-[10px] text-slate-400 font-medium leading-none">
                Supports multiple JPEGs, PNGs. Subdirectories are filtered to extract images only.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-slate-700 tracking-wide">Image URL links (One URL per line)</label>
              <textarea
                rows={4}
                placeholder="Paste direct URLs here (one link per line)&#10;e.g.&#10;https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-xs rounded-xl font-medium font-mono text-slate-850 focus:outline-none focus:border-primary transition-all"
                value={linksInput}
                onChange={(e) => setLinksInput(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5 mt-1.5">
                <span className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  Enter links. Direct assets are saved and reference their host directly.
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
                  Resolve Facebook Link
                </button>
              </div>
            </div>

            {showHtmlExtractor && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col gap-3 text-xs text-amber-900 leading-relaxed font-semibold">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="font-extrabold text-amber-950">Local Facebook Link Scraper</span>
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
                <p className="font-medium text-[11px] text-amber-850">
                  Resolve pages in-browser by pasting the post&apos;s source HTML:
                </p>
                <ol className="list-decimal list-inside font-medium text-[11px] text-amber-850 flex flex-col gap-1">
                  <li>
                    Open post page:{" "}
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
                      <span className="text-slate-500 font-bold">(Paste link above first)</span>
                    )}
                  </li>
                  <li>Press <kbd className="bg-amber-100 px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px]">Ctrl+U</kbd> or <kbd className="bg-amber-100 px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px]">Cmd+Option+U</kbd></li>
                  <li>Copy all page source (<kbd className="bg-amber-100 px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px]">Ctrl+A</kbd> / <kbd className="bg-amber-100 px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px]">Ctrl+C</kbd>).</li>
                  <li>Paste the HTML page source code below:</li>
                </ol>
                <textarea
                  rows={3}
                  placeholder="Paste source code (HTML) here..."
                  className="w-full px-3 py-2.5 bg-white border border-amber-200 rounded-xl text-xs font-mono font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                  value={htmlInput}
                  onChange={(e) => setHtmlInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleLocalHtmlExtract}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black text-xs uppercase self-end focus:outline-none cursor-pointer"
                >
                  Extract Images
                </button>
              </div>
            )}

            {parsedLinks.length > 0 && (
              <div className="flex flex-col gap-3 border border-slate-200 rounded-2xl p-4 bg-white mt-1">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-extrabold text-slate-800">
                    Links Queue ({parsedLinks.length} URLs detected)
                  </span>
                  <button
                    type="button"
                    disabled={isGalleryUploading}
                    onClick={() => setLinksInput("")}
                    className="text-[10px] font-black text-red-650 hover:underline cursor-pointer focus:outline-none disabled:opacity-50"
                  >
                    Clear Links
                  </button>
                </div>

                <div className="max-h-48 overflow-y-auto flex flex-col gap-2 divide-y divide-slate-100 pr-1 text-xs">
                  {parsedLinks.map((link, idx) => {
                    const needsResolve = needsResolution(link);
                    return (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 text-xs font-medium gap-3">
                        <span className="text-slate-800 truncate max-w-[160px] sm:max-w-sm font-mono text-[10px] sm:text-[11px]" title={link}>
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
                            <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-emerald-50 border border-emerald-150 text-emerald-800 rounded flex items-center gap-1">
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

        {/* Local file queue display */}
        {uploadMode === "file" && galleryQueue.length > 0 && (
          <div className="flex flex-col gap-3 border border-slate-200 rounded-2xl p-4.5 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-extrabold text-slate-800">
                Upload Queue ({galleryQueue.length} files selected)
              </span>
              <button
                type="button"
                disabled={isGalleryUploading}
                onClick={() => setGalleryQueue([])}
                className="text-[10px] font-black text-red-650 hover:underline cursor-pointer focus:outline-none disabled:opacity-50"
              >
                Clear Queue
              </button>
            </div>

            <div className="max-h-48 overflow-y-auto flex flex-col gap-2 divide-y divide-slate-50 pr-1 text-xs">
              {galleryQueue.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 text-xs font-medium gap-3">
                  <span className="text-slate-800 truncate max-w-[140px] sm:max-w-xs" title={item.file.name}>
                    {item.file.name}
                  </span>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {item.status === "idle" && (
                      <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                        Pending
                      </span>
                    )}
                    {item.status === "uploading" && (
                      <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded animate-pulse">
                        Uploading...
                      </span>
                    )}
                    {item.status === "success" && (
                      <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded">
                        Success
                      </span>
                    )}
                    {item.status === "error" && (
                      <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 bg-red-50 text-red-750 rounded" title={item.errorMsg}>
                        Error
                      </span>
                    )}

                    {item.status === "idle" && (
                      <button
                        type="button"
                        onClick={() => setGalleryQueue(prev => prev.filter(q => q.id !== item.id))}
                        className="text-red-500 hover:text-red-700 font-extrabold text-[10px] focus:outline-none cursor-pointer"
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

        {/* Submit uploads */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={
            isGalleryUploading ||
            (uploadMode === "file" ? galleryQueue.length === 0 : parsedLinks.length === 0)
          }
          className="w-full py-4 bg-[#0F172A] hover:bg-slate-850 disabled:bg-slate-300 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
        >
          {uploadMode === "file" ? (
            <>
              <UploadCloud className="w-4 h-4" />
              <span>
                {isGalleryUploading
                  ? `Uploading Files (${galleryQueue.filter(q => q.status === "success").length}/${galleryQueue.length})...`
                  : `Start Upload & Save (${galleryQueue.length} Photos)`
                }
              </span>
            </>
          ) : (
            <>
              <Globe className="w-4 h-4" />
              <span>
                {isGalleryUploading
                  ? `Saving Web Links...`
                  : `Save Direct Links (${parsedLinks.length} Photos)`
                }
              </span>
            </>
          )}
        </motion.button>
      </form>

      {/* Grid media gallery */}
      <div className="mt-12 border-t border-slate-100 pt-10 text-left flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-sm font-black text-slate-900">Uploaded Gallery Photos ({galleryList.length})</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold">Select and manage active photo gallery grids.</p>
          </div>
        </div>

        {galleryList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-slate-150 rounded-2xl">
            <p className="text-xs text-slate-500 font-semibold italic">No photos registered in the gallery.</p>
          </div>
        ) : selectedCategoryFolder === null ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {sortedCategories.map((category) => {
              const count = groupedGallery[category]?.length || 0;
              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategoryFolder(category)}
                  className="p-5 bg-white border border-slate-200 hover:border-primary/40 hover:shadow-sm rounded-2xl text-left flex flex-col gap-4 cursor-pointer focus:outline-none transition-all group w-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary-light group-hover:border-primary/20 flex items-center justify-center transition-colors">
                    <Folder className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-black text-slate-900 group-hover:text-primary truncate transition-colors">
                      {category}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1">
                      {count} {count === 1 ? "Photo" : "Photos"}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Header / Back bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryFolder(null);
                    // Clear selected gallery IDs of current folder when navigating back
                    setSelectedGalleryIds(prev => prev.filter(id => !currentFolderPhotoIds.includes(id)));
                  }}
                  className="inline-flex items-center justify-center p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer focus:outline-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {selectedCategoryFolder}
                  </h5>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {currentFolderPhotos.length} {currentFolderPhotos.length === 1 ? "photo" : "photos"} in folder
                  </span>
                </div>
              </div>

              {currentFolderPhotos.length > 0 && (
                <div className="flex items-center gap-2.5 self-stretch sm:self-auto flex-wrap justify-end">
                  {selectedFolderIdsInSelection.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        triggerConfirm(
                          "Delete Selected Photos",
                          `Are you sure you want to permanently delete all ${selectedFolderIdsInSelection.length} selected photos from this folder? This action cannot be undone.`,
                          () => handleBulkDeleteGallery(selectedFolderIdsInSelection)
                        );
                      }}
                      className="px-3.5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-xl shadow-xs transition-all focus:outline-none cursor-pointer"
                    >
                      Delete Selected ({selectedFolderIdsInSelection.length})
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => {
                      if (areAllInFolderSelected) {
                        // Deselect all in this folder
                        setSelectedGalleryIds(prev => prev.filter(id => !currentFolderPhotoIds.includes(id)));
                      } else {
                        // Select all in this folder
                        setSelectedGalleryIds(prev => {
                          const union = new Set([...prev, ...currentFolderPhotoIds]);
                          return Array.from(union);
                        });
                      }
                    }}
                    className="px-3.5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-black uppercase rounded-xl shadow-3xs transition-all focus:outline-none cursor-pointer select-none"
                  >
                    {areAllInFolderSelected ? "Deselect All" : "Select All"}
                  </button>
                </div>
              )}
            </div>

            {/* Folder Grid */}
            {(!groupedGallery[selectedCategoryFolder] || groupedGallery[selectedCategoryFolder].length === 0) ? (
              <div className="p-8 text-center bg-slate-50 border border-slate-150 rounded-2xl">
                <p className="text-xs text-slate-500 font-semibold italic">This folder is empty.</p>
                <button
                  type="button"
                  onClick={() => setSelectedCategoryFolder(null)}
                  className="mt-3 text-xs text-primary font-bold hover:underline"
                >
                  Go Back to Folders
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <AnimatePresence>
                  {(groupedGallery[selectedCategoryFolder] || []).map((photo, index) => {
                    const isChecked = selectedGalleryIds.includes(photo.id || photo._id || "");
                    return (
                      <motion.div
                        key={photo.id || photo._id || `gallery-photo-${index}`}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`bg-[#F8FAFC] border rounded-2xl overflow-hidden shadow-3xs relative group flex flex-col h-full transition-all hover:shadow-xs ${
                          isChecked ? "border-primary bg-primary-light/10" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {/* Check indicator box */}
                        <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 p-1 rounded-lg backdrop-blur-xs shadow-xs border border-slate-150 flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const id = photo.id || photo._id || "";
                              if (e.target.checked) {
                                setSelectedGalleryIds(prev => [...prev, id]);
                              } else {
                                setSelectedGalleryIds(prev => prev.filter(x => x !== id));
                              }
                            }}
                            className="w-4 h-4 rounded border-slate-350 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                          />
                        </div>

                        {/* Compact Delete button (Mobile only) */}
                        <div className="absolute top-2.5 right-2.5 z-10 sm:hidden">
                          <button
                            type="button"
                            onClick={() => {
                              triggerConfirm(
                                "Delete Photo",
                                "Are you sure you want to permanently delete this photo from the school gallery? This action cannot be undone.",
                                () => handleDeleteGallery(photo.id || photo._id || "")
                              );
                            }}
                            className="bg-white/95 p-1.5 rounded-lg backdrop-blur-xs shadow-xs border border-red-100 hover:border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all flex items-center justify-center cursor-pointer focus:outline-none"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Image visual wrapper with aspect ratio */}
                        <div className="relative aspect-video w-full bg-slate-100 shrink-0 overflow-hidden shadow-inner">
                          <Image
                            src={getVideoPoster(photo.imageUrl)}
                            alt={photo.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {isVideoUrl(photo.imageUrl) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                              <div className="bg-black/50 border border-white/20 p-2 rounded-full text-white shadow-md">
                                <Play className="w-4.5 h-4.5 fill-white text-white translate-x-0.5" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Text captions */}
                        <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                          <div>
                            <span className="text-[8px] font-black uppercase text-accent tracking-wider block">
                              {photo.category}
                            </span>
                            <h5 className="text-[10px] font-extrabold text-slate-800 line-clamp-2 mt-0.5 leading-snug wrap-break-word" title={photo.title}>
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
                            className="hidden sm:flex w-full py-2 bg-red-50/50 hover:bg-red-50 border border-red-100 hover:border-red-200 text-red-600 hover:text-red-700 font-extrabold text-[10px] rounded-xl transition-all items-center justify-center gap-1 cursor-pointer focus:outline-none shadow-3xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Asset</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
