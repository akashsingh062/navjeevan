"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  category: string;
  title: string;
  date?: string;
  onClose: () => void;
}

export default function ImageModal({
  isOpen,
  imageUrl,
  category,
  title,
  date,
  onClose
}: ImageModalProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      
      // Sanitize title for filename
      const safeFilename = title.replace(/[^a-zA-Z0-9_-]/g, "_") || "school_photo";
      link.download = `${safeFilename}.jpg`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Blob download failed, falling back to new tab:", err);
      // Fallback: Open in new tab if CORS or fetch blocks the download
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview of ${title}`}
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-dark cursor-pointer pointer-events-auto"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl z-10 flex flex-col pointer-events-auto border border-gray-800"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo preview container */}
            <div className="relative aspect-video w-full bg-neutral-light flex items-center justify-center">
              {/* Uses fallback visual gradient in case source image fails */}
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-w-1200px) 100vw, 900px"
                className="object-contain"
                priority
              />
            </div>

            {/* Description panel */}
            <div className="p-6 bg-white border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] uppercase font-black text-accent bg-accent/10 px-2.5 py-1 rounded-full tracking-wider">
                    {category}
                  </span>
                  {date && (
                    <div className="flex items-center gap-1 text-xs text-neutral-body font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={date}>{formatDate(date)}</time>
                    </div>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-black text-neutral-dark mt-1 leading-snug">
                  {title}
                </h3>
              </div>

              {/* Download Action Button */}
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer select-none focus:outline-none shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Photo</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
