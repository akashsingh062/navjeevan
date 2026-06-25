"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, Download, AlertTriangle, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Notice } from "@/types";

interface NoticeDetailModalProps {
  isOpen: boolean;
  notice: Notice | null;
  onClose: () => void;
  language: "en" | "hi";
}

const isImageUrl = (url?: string): boolean => {
  if (!url) return false;
  const lowercaseUrl = url.toLowerCase();
  return (
    lowercaseUrl.endsWith(".jpg") ||
    lowercaseUrl.endsWith(".jpeg") ||
    lowercaseUrl.endsWith(".png") ||
    lowercaseUrl.endsWith(".webp") ||
    lowercaseUrl.endsWith(".gif") ||
    lowercaseUrl.includes("res.cloudinary.com") ||
    lowercaseUrl.includes("/uploads/")
  );
};

export default function NoticeDetailModal({
  isOpen,
  notice,
  onClose,
  language
}: NoticeDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!mounted || !notice) return null;

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  const categoryConfig = {
    Admission: { badge: "bg-blue-100 text-blue-800", border: "border-t-blue-500" },
    Holiday:   { badge: "bg-emerald-100 text-emerald-800", border: "border-t-emerald-500" },
    Exam:      { badge: "bg-red-100 text-red-800", border: "border-t-red-500" },
    General:   { badge: "bg-amber-100 text-amber-800", border: "border-t-amber-500" },
    Others:    { badge: "bg-purple-100 text-purple-800", border: "border-t-purple-500" },
  };

  const cfg = categoryConfig[notice.category as keyof typeof categoryConfig] || categoryConfig.Others;
  const isImg = isImageUrl(notice.attachmentUrl);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Notice: ${notice.title}`}
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-dark cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl z-10 flex flex-col pointer-events-auto border-t-4 ${cfg.border} max-h-[90vh]`}
          >
            {/* Header */}
            <div className="p-6 pb-4 flex justify-between items-start gap-4 border-b border-gray-100 shrink-0">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${cfg.badge}`}>
                    {notice.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-neutral-body font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={notice.date}>{formatDate(notice.date)}</time>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-neutral-light hover:bg-gray-200 text-neutral-body hover:text-neutral-dark rounded-full transition-colors focus:outline-none"
                aria-label="Close notice details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 scrollbar-thin">
              <h3 className="text-lg sm:text-xl font-serif font-black text-neutral-dark leading-snug flex items-start gap-2">
                {notice.isImportant && (
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                )}
                <span>{notice.title}</span>
              </h3>

              <div className="text-neutral-dark text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium bg-neutral-light/50 p-5 rounded-2xl border border-gray-150">
                {notice.description}
              </div>

              {/* Attachment Section */}
              {notice.attachmentUrl && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-black text-neutral-dark uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-primary" />
                    <span>{language === "en" ? "Circular Attachment" : "परिपत्र संलग्नक"}</span>
                  </h4>

                  {isImg ? (
                    /* Image Attachment Preview */
                    <div className="relative border border-gray-200 rounded-2xl overflow-hidden bg-neutral-light max-h-80 flex items-center justify-center shadow-inner group">
                      <img
                        src={notice.attachmentUrl}
                        alt="Circular attachment preview"
                        className="max-h-80 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  ) : (
                    /* Non-Image Attachment Card */
                    <div className="p-4 bg-primary-light/50 border border-primary/20 rounded-2xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                          <Paperclip className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-neutral-dark">
                            {language === "en" ? "Circular Document" : "परिपत्र दस्तावेज़"}
                          </p>
                          <p className="text-[10px] text-neutral-body font-semibold">
                            {language === "en" ? "Click below to view or download the attached circular file." : "संलग्न परिपत्र फ़ाइल देखने या डाउनलोड करने के लिए नीचे क्लिक करें।"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <a
                    href={`/api/notices/download?url=${encodeURIComponent(notice.attachmentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer select-none"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {language === "en"
                        ? (isImg ? "View / Download Circular Image" : "View / Download Circular Document")
                        : (isImg ? "परिपत्र छवि देखें / डाउनलोड करें" : "परिपत्र दस्तावेज़ देखें / डाउनलोड करें")}
                    </span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
