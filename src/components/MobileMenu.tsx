"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Phone, MessageSquare, Lock, ChevronRight, ChevronDown, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  aboutDropdown?: DropdownItem[];
}

export default function MobileMenu({ isOpen, onClose, navLinks, aboutDropdown }: MobileMenuProps) {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Reset about dropdown when menu closes
  useEffect(() => {
    if (!isOpen) setAboutExpanded(false);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-dark z-50"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.28 }}
            className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white z-50 flex flex-col shadow-2xl"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <span className="text-base font-black text-neutral-dark block leading-tight">Nav Jeevan</span>
                <span className="text-[9px] uppercase font-bold text-accent tracking-widest">Public School</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-neutral-body hover:bg-neutral-light rounded-xl focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 py-3 px-3 overflow-y-auto" aria-label="Mobile Navigation">
              {/* Mobile Menu Language Quick Selector pill */}
              <div className="px-3 py-2.5 mb-4 bg-neutral-light rounded-2xl flex items-center justify-between shadow-3xs select-none">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-neutral-dark">{language === "en" ? "भाषा बदलें (हिन्दी)" : "Switch to English"}</span>
                </div>
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-[10px] font-black rounded-lg cursor-pointer transition-colors focus:outline-none"
                >
                  {language === "en" ? "हिन्दी" : "English"}
                </button>
              </div>

              {navLinks.map((link) => {
                const isAbout = link.href === "/about";

                if (isAbout && aboutDropdown) {
                  return (
                    <div key={link.href}>
                      {/* About expandable row */}
                      <button
                        onClick={() => setAboutExpanded((v) => !v)}
                        className="flex items-center justify-between w-full px-3 py-3.5 text-sm font-semibold text-neutral-dark hover:text-primary hover:bg-primary-light rounded-xl transition-all mb-0.5"
                        aria-expanded={aboutExpanded}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-4 h-4 text-neutral-body/50 transition-transform duration-200 ${aboutExpanded ? "rotate-180" : ""}`} />
                      </button>

                      {/* Sub-items */}
                      <AnimatePresence>
                        {aboutExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 mb-1 border-l-2 border-primary/20 pl-3 flex flex-col gap-0.5">
                              {aboutDropdown.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-neutral-dark hover:text-primary hover:bg-primary-light rounded-xl transition-all group"
                                  >
                                    <ItemIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                                    <span>{item.label}</span>
                                    <ChevronRight className="w-3.5 h-3.5 text-neutral-body/30 ml-auto group-hover:text-primary transition-colors" />
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3.5 text-sm font-semibold text-neutral-dark hover:text-primary hover:bg-primary-light rounded-xl transition-all mb-0.5"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-body/50" />
                  </Link>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="px-4 py-4 border-t border-border flex flex-col gap-2.5">
              <a
                href="tel:+917880952150"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{language === "en" ? "Call School: 7880952150" : "फ़ोन कॉल: 7880952150"}</span>
              </a>
              <a
                href="https://wa.me/917880952150?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-accent text-white rounded-2xl font-bold text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === "en" ? "WhatsApp Inquiry" : "व्हाट्सएप प्रवेश डेस्क"}</span>
              </a>
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 border border-border text-neutral-body hover:bg-neutral-light rounded-2xl font-semibold text-xs transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.nav.staffPortal}</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
