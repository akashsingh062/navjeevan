"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  category: string;
  title: string;
  date?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
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

const isEmbedVideoUrl = (url: string): boolean => {
  if (!url) return false;
  const u = url.toLowerCase();
  return u.includes("facebook.com/watch") || u.includes("facebook.com/video.php") || u.includes("fb.watch");
};

const getVideoPoster = (url: string): string => {
  try {
    const u = new URL(url);
    const poster = u.searchParams.get("poster");
    if (poster) return decodeURIComponent(poster);
  } catch {}
  return url;
};

const getFacebookEmbedUrl = (url: string): string => {
  try {
    const u = new URL(url);
    let videoId = u.searchParams.get("v");
    if (!videoId) {
      const match = u.pathname.match(/\/(?:videos|watch|v)\/(\d+)/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
    if (videoId) {
      const canonicalUrl = `https://www.facebook.com/video.php?v=${videoId}`;
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonicalUrl)}&show_text=false&autoplay=true&mute=false`;
    }
  } catch {}
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true&mute=false`;
};

export default function ImageModal({
  isOpen,
  imageUrl,
  category,
  title,
  date,
  onClose,
  onPrev,
  onNext
}: ImageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

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
      const downloadUrl = isEmbedVideoUrl(imageUrl) ? getVideoPoster(imageUrl) : imageUrl;
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;

      const isVideo = isVideoUrl(imageUrl);
      const ext = isVideo && !isEmbedVideoUrl(imageUrl) ? "mp4" : "jpg";
      const safeFilename = title.replace(/[^a-zA-Z0-9_-]/g, "_") || (isVideo ? "school_video" : "school_photo");
      link.download = `${safeFilename}.${ext}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Blob download failed, falling back to new tab:", err);

      const fallbackUrl = isEmbedVideoUrl(imageUrl) ? getVideoPoster(imageUrl) : imageUrl;
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!mounted) return null;

  const isVideo = isVideoUrl(imageUrl);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${isVideo ? "Video" : "Image"} preview of ${title}`}
        >

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-dark cursor-pointer pointer-events-auto"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl z-10 flex flex-col pointer-events-auto border border-gray-800"
          >

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full bg-neutral-light flex items-center justify-center">
              {isVideo ? (
                isEmbedVideoUrl(imageUrl) ? (
                  <iframe
                    src={getFacebookEmbedUrl(imageUrl)}
                    className="w-full h-full max-h-[70vh] rounded-t-3xl border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={imageUrl}
                    className="w-full h-full max-h-[70vh] object-contain rounded-t-3xl"
                    controls
                    autoPlay
                    playsInline
                  />
                )
              ) : (

                <Image
                  src={getVideoPoster(imageUrl)}
                  alt={title}
                  fill
                  unoptimized
                  sizes="(max-width: 1200px) 100vw, 900px"
                  className="object-contain"
                  priority
                />
              )}

              {onPrev && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all active:scale-90 focus:outline-none cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {onNext && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all active:scale-90 focus:outline-none cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>

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
                {isEmbedVideoUrl(imageUrl) && (
                  <p className="text-[10px] sm:text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-200/50 px-3 py-2 rounded-xl mt-1 leading-relaxed">
                    ⚠️ If the player shows &quot;Video unavailable&quot;, it is due to Facebook privacy/embedding restrictions. Please use the **&quot;Watch on Facebook&quot;** button to watch it directly.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {isEmbedVideoUrl(imageUrl) && (
                  <a
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer select-none focus:outline-none shrink-0"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Watch on Facebook</span>
                  </a>
                )}

                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer select-none focus:outline-none shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>{isVideo ? "Download Video" : "Download Photo"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
