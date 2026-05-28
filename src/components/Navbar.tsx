"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  BookOpen,
  Lock,
  Menu,
  Bell,
  ChevronDown,
  Home,
  GraduationCap,
  Image as ImageIcon,
  Users,
  History,
  Target,
  MessageCircle,
  MapPin,
  ChevronRight,
  Languages,
} from "lucide-react";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/lib/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const aboutDropdown = [
  {
    label: "History",
    href: "/about/history",
    icon: History,
    desc: "Our journey since 2008",
  },
  {
    label: "Vision & Mission",
    href: "/about/vision-mission",
    icon: Target,
    desc: "What we stand for",
  },
  {
    label: "Manager's Message",
    href: "/about/message-manager",
    icon: MessageCircle,
    desc: "From the Management Desk",
  },
  {
    label: "Principal's Message",
    href: "/about/message-principal",
    icon: MessageCircle,
    desc: "From the Principal",
  },
  {
    label: "Find Us",
    href: "/about/find-us",
    icon: MapPin,
    desc: "Location & directions",
  },
];

const quickLinks = [
  {
    label: "Admissions",
    href: "/admissions",
    icon: GraduationCap,
    badge: "Open",
    badgeColor: "bg-accent",
  },
  {
    label: "Notices",
    href: "/notices",
    icon: Bell,
    badge: null,
    badgeColor: "",
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: ImageIcon,
    badge: null,
    badgeColor: "",
  },
  {
    label: "Faculty",
    href: "/faculty",
    icon: Users,
    badge: null,
    badgeColor: "",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsVisible(true);
    setAboutOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 4);

      // Smart header scrolling reveal logic for mobile devices
      if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 80) {
        setIsVisible(false);
      } else if (
        currentScrollY < lastScrollY.current - 10 ||
        currentScrollY <= 20
      ) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!aboutOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (aboutBtnRef.current && aboutBtnRef.current.contains(e.target as Node))
        return;
      if (dropdownRef.current && dropdownRef.current.contains(e.target as Node))
        return;
      setAboutOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [aboutOpen]);

  useLayoutEffect(() => {
    if (aboutOpen && aboutBtnRef.current) {
      const rect = aboutBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom, left: rect.left });
    }
  }, [aboutOpen]);

  const translatedAboutDropdown = aboutDropdown.map((item) => {
    let label = item.label;
    let desc = item.desc;
    if (item.label === "History") {
      label = language === "en" ? "History" : "इतिहास";
      desc = language === "en" ? "Our journey since 2008" : "2008 से हमारा सफर";
    } else if (item.label === "Vision & Mission") {
      label = language === "en" ? "Vision & Mission" : "दृष्टिकोण और लक्ष्य";
      desc = language === "en" ? "What we stand for" : "हमारे आदर्श और मूल्य";
    } else if (item.label === "Manager's Message") {
      label = language === "en" ? "Manager's Message" : "प्रबंधक का संदेश";
      desc =
        language === "en"
          ? "From the Management Desk"
          : "प्रबंधन डेस्क से संदेश";
    } else if (item.label === "Principal's Message") {
      label =
        language === "en" ? "Principal's Message" : "प्रधानाचार्य का संदेश";
      desc =
        language === "en" ? "From the Principal" : "प्रधानाचार्य की कलम से";
    } else if (item.label === "Find Us") {
      label = language === "en" ? "Find Us" : "मार्गदर्शन प्राप्त करें";
      desc =
        language === "en"
          ? "Location & directions"
          : "विद्यालय का नक्शा और मार्ग";
    }
    return { ...item, label, desc };
  });

  const translatedQuickLinks = quickLinks.map((item) => {
    let label = item.label;
    if (item.label === "Admissions") {
      label = t.nav.admissions;
    } else if (item.label === "Gallery") {
      label = t.nav.gallery;
    } else if (item.label === "Notices") {
      label = t.nav.notices;
    } else if (item.label === "Faculty") {
      label = t.nav.faculty;
    }
    return { ...item, label };
  });

  const translatedNavLinks = navLinks.map((link) => {
    let label = link.label;
    if (link.label === "Home") label = t.nav.home;
    else if (link.label === "About") label = t.nav.about;
    else if (link.label === "Academics") label = t.nav.academics;
    else if (link.label === "Admissions") label = t.nav.admissions;
    else if (link.label === "Faculty") label = t.nav.faculty;
    else if (link.label === "Facilities") label = t.nav.facilities;
    else if (link.label === "Gallery") label = t.nav.gallery;
    else if (link.label === "Notices") label = t.nav.notices;
    else if (link.label === "Contact") label = t.nav.contact;
    return { ...link, label };
  });

  return (
    <>
      {}
      {/* ===== TIER 1: Upper Header Wrapper ===== */}
      <div className="relative h-16 sm:h-20 md:h-auto z-40">
        <div
          className={`bg-white border-b border-border transition-all duration-300 ${
            isScrolled ? "shadow-sm" : ""
          } fixed md:relative top-0 left-0 right-0 ${
            isVisible ? "translate-y-0" : "-translate-y-full md:translate-y-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
              {/* Brand */}
              <Link
                href="/"
                className="flex items-center gap-2.5 shrink-0 focus:outline-none group"
                aria-label="Nav Jeevan Public School Home"
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/30 overflow-hidden bg-primary-light flex items-center justify-center shrink-0 group-hover:border-primary/60 transition-colors">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm sm:text-base font-black text-neutral-dark tracking-tight leading-tight">
                    Nav Jeevan Public School
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-body font-medium leading-tight mt-0.5">
                    <span className="inline sm:hidden">
                      Kaptanganj, Kushinagar
                    </span>
                    <span className="hidden sm:inline">
                      Khabharabhar, Kaptanganj, Kushinagar (India) – 274301
                    </span>
                  </span>
                </div>
              </Link>

              {/* Quick Action Cards — desktop */}
              <div className="hidden md:flex items-center gap-2 shrink-0">
                {/* Premium Language switch toggle */}
                <button
                  onClick={toggleLanguage}
                  className="relative flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary-light transition-all cursor-pointer select-none group min-w-[90px] text-left focus:outline-none shadow-3xs"
                  aria-label="Toggle language mode / भाषा बदलें"
                >
                  <Languages className="w-5 h-5 text-primary group-hover:scale-105 transition-transform" />
                  <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="text-[9px] uppercase font-black text-neutral-body/60 tracking-wider">
                      भाषा / Lang
                    </span>
                    <span className="text-[10px] font-black text-neutral-dark group-hover:text-primary transition-colors">
                      {language === "en" ? "हिन्दी" : "English"}
                    </span>
                  </div>
                </button>

                {translatedQuickLinks.map(
                  ({ label, href, icon: Icon, badge, badgeColor }) => (
                    <Link
                      key={href}
                      href={href}
                      className="relative flex flex-col items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary-light transition-all group min-w-[72px] text-center"
                    >
                      {badge && (
                        <span
                          className={`absolute -top-1.5 -right-1.5 ${badgeColor} text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none z-10`}
                        >
                          {badge}
                        </span>
                      )}
                      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-neutral-dark group-hover:text-primary transition-colors">
                        {label}
                      </span>
                    </Link>
                  ),
                )}

                <Link
                  href="/admin"
                  className="relative flex flex-col items-center justify-center gap-1 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover transition-all min-w-[72px] text-center group"
                >
                  <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">
                    {language === "en" ? "Admin" : "प्रशासक"}
                  </span>
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center gap-1.5 shrink-0">
                {/* Dynamic lang toggle directly on header for smartphone visitors */}
                <button
                  onClick={toggleLanguage}
                  className="p-2.5 bg-primary-light text-primary rounded-xl flex items-center justify-center font-black text-xs select-none gap-1 focus:outline-none shadow-3xs"
                  aria-label="Switch Language / भाषा बदलें"
                >
                  <Languages className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] font-black">
                    {language === "en" ? "हिन्दी" : "EN"}
                  </span>
                </button>

                <a
                  href="tel:+919935661144"
                  className="p-2.5 bg-primary-light text-primary rounded-xl"
                  aria-label="Call"
                >
                  <Phone className="w-5 h-5" />
                </a>

                <button
                  onClick={() => setIsOpen(true)}
                  className="p-2.5 text-neutral-dark hover:bg-neutral-light rounded-xl focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TIER 2: Navigation Bar — desktop only ===== */}
      <nav
        className={`hidden md:flex sticky top-0 z-40 bg-primary transition-shadow ${isScrolled ? "shadow-sm" : ""}`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex items-center h-11">
            {/* Home icon */}
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-full text-white hover:bg-white/15 transition-colors border-r border-white/20 shrink-0"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </Link>

            {/* All translated nav links */}
            {translatedNavLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              const isAbout = link.href === "/about";

              if (isAbout) {
                return (
                  <button
                    key={link.href}
                    ref={aboutBtnRef}
                    onClick={() => setAboutOpen((o) => !o)}
                    className={`flex items-center gap-1 px-4 h-full text-[12px] font-semibold whitespace-nowrap transition-colors shrink-0 border-r border-white/20 ${
                      isActive || aboutOpen
                        ? "bg-white/20 text-white"
                        : "text-white/90 hover:bg-white/15 hover:text-white"
                    }`}
                    aria-expanded={aboutOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 h-full text-[12px] font-semibold whitespace-nowrap transition-colors shrink-0 border-r border-white/20 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Phone */}
            <a
              href="tel:+919935661144"
              className="ml-auto flex items-center gap-1.5 px-3 h-full text-white/90 hover:bg-white/15 text-[11px] font-bold border-l border-white/20 shrink-0 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>99356 61144</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ===== ABOUT DROPDOWN — fixed position, escapes all overflow ===== */}
      {aboutOpen && (
        <div
          ref={dropdownRef}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
            zIndex: 99999,
          }}
        >
          {translatedAboutDropdown.map((item) => {
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAboutOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light transition-colors group border-b border-border last:border-0"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-light group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                  <ItemIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-neutral-dark group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-neutral-body leading-tight">
                    {item.desc}
                  </p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-body/40 group-hover:text-primary transition-colors shrink-0" />
              </Link>
            );
          })}
        </div>
      )}

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={translatedNavLinks}
        aboutDropdown={translatedAboutDropdown}
      />
    </>
  );
}
