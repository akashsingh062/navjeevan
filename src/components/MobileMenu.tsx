"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  // Prevent background scrolling when mobile menu is open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
            aria-hidden="true"
          />

          {/* Slide-out drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 flex flex-col p-6 pointer-events-auto border-l border-neutral-light"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Header section inside drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-light">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary leading-tight">Nav Jeevan</span>
                <span className="text-[10px] uppercase font-semibold text-accent tracking-wider">Public School</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-neutral-dark rounded-full hover:bg-neutral-light focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 py-8 flex flex-col gap-4 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="text-lg font-semibold text-neutral-dark hover:text-primary py-2 px-3 rounded-lg hover:bg-neutral-light transition-all flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Quick Action buttons for quick access */}
            <div className="pt-6 border-t border-neutral-light flex flex-col gap-3">
              <a
                href="tel:+919935661144"
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover text-sm"
              >
                <Phone className="w-4 h-4" />
                Call School Office
              </a>
              <a
                href="https://wa.me/919935661144?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white rounded-xl font-bold hover:bg-accent-hover text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Admission Cell
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
