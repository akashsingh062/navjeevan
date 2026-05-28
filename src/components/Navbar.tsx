"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, BookOpen } from "lucide-react";
import MobileMenu from "./MobileMenu";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Faculty", href: "/faculty" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md border-neutral-light py-2" 
            : "bg-white border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo and Name */}
          <Link 
            href="/" 
            className="flex items-center gap-3 focus:outline-none rounded-lg p-1 group"
            aria-label="Nav Jeevan Public School Home"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black text-neutral-dark tracking-tight leading-tight">
                Nav Jeevan
              </span>
              <span className="text-[10px] uppercase font-bold text-accent tracking-widest leading-none">
                Public School • CBSE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none ${
                    isActive
                      ? "text-primary bg-neutral-light"
                      : "text-neutral-body hover:text-primary hover:bg-neutral-light/50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Info / Call Actions (Desktop) */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href="tel:+919935661144"
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-all"
              title="Call School Office"
            >
              <Phone className="w-4 h-4" />
              <span>+91 99356 61144</span>
            </a>
            <Link
              href="/admissions"
              className="px-5 py-2.5 text-sm font-bold text-white bg-accent hover:bg-accent-hover rounded-xl shadow-sm transition-all text-center"
            >
              Admission open
            </Link>
          </div>

          {/* Hamburger Menu & Mobile Call Button (Mobile & Tablet) */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href="tel:+919935661144"
              className="p-2.5 text-primary bg-primary/10 rounded-full hover:bg-primary/20"
              aria-label="Call School Office"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2.5 text-neutral-dark hover:bg-neutral-light rounded-full focus:outline-none"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out mobile menu */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
