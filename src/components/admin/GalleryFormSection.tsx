"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { PlusCircle, Camera, Trash2 } from "lucide-react";
import { GalleryItem } from "@/types";

interface GalleryFormInput {
  title: string;
  category: string;
  imageUrl: string;
}

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

  const handleGalleryMultiUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (galleryQueue.length === 0) {
      toast.error("Please choose one or more photo files/folders to upload first.");
      return;
    }

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

  return (
    <form onSubmit={handleGalleryMultiUpload} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 text-left mb-2">
        <h3 className="text-base font-extrabold text-neutral-dark">Add Photo Log (Multi-Upload)</h3>
        <p className="text-xs text-neutral-body">Choose multiple files or select an entire folder of photos instantly to register them into the school gallery.</p>
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
          placeholder="e.g. Traditional Folk Dance (Optional: file names will be appended/used)"
          className="w-full px-4 py-3 bg-neutral-light border border-gray-200 text-sm rounded-xl font-medium text-neutral-dark focus:outline-none focus:border-primary"
          {...galleryForm.register("title")}
        />
        <span className="text-[10px] text-neutral-body font-medium leading-relaxed mt-0.5">
          If left blank, clean capitalized file names will be used as captions automatically.
        </span>
      </div>

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

      {galleryQueue.length > 0 && (
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
        disabled={isGalleryUploading || galleryQueue.length === 0}
        className="w-full mt-4 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      >
        <PlusCircle className="w-4 h-4" />
        <span>
          {isGalleryUploading 
            ? `Uploading Photos (${galleryQueue.filter(q => q.status === "success").length}/${galleryQueue.length})...`
            : `Start Upload & Save (${galleryQueue.length} Photos)`
          }
        </span>
      </button>

      {/* Live Event Photos inside Admin Panel for deletion */}
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
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
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
