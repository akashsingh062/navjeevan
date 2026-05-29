"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel"
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">

      <div
        className="fixed inset-0 bg-neutral-dark/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        className="relative bg-white border border-gray-100 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 text-left z-10 transform scale-100 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-neutral-light rounded-xl text-neutral-body hover:text-neutral-dark transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="confirm-modal-title" className="text-sm font-extrabold text-neutral-dark tracking-wide">
              {title}
            </h3>
            <p className="text-[10px] text-neutral-body font-semibold uppercase mt-0.5 tracking-wider">
              Safety Check Required
            </p>
          </div>
        </div>

        <p className="text-xs text-neutral-body leading-relaxed font-medium">
          {message}
        </p>

        <div className="flex gap-2.5 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 bg-white hover:bg-neutral-light text-neutral-dark text-xs font-black uppercase rounded-xl transition-all shadow-xs focus:outline-none cursor-pointer text-center"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase rounded-xl transition-all shadow-xs focus:outline-none cursor-pointer text-center"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
