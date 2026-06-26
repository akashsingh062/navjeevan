"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, Image, Users, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useHasNewNotices } from "@/lib/useHasNewNotices";

const bottomNavItems = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/notices", labelKey: "notices", icon: Bell },
  { href: "/gallery", labelKey: "gallery", icon: Image },
  { href: "/faculty", labelKey: "faculty", icon: Users },
  { href: "/contact", labelKey: "contact", icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];
  const { hasNew: hasNewNotice } = useHasNewNotices();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-stretch justify-around h-16">
        {bottomNavItems.map(({ href, labelKey, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

          let label = "";
          if (labelKey === "home") label = t.nav.home;
          else if (labelKey === "notices") label = t.nav.notices;
          else if (labelKey === "gallery") label = t.nav.gallery;
          else if (labelKey === "faculty") label = t.nav.faculty;
          else if (labelKey === "contact") label = t.nav.contact;

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 min-h-0 min-w-0 text-center transition-all relative ${
                isActive ? "text-primary" : "text-neutral-body"
              }`}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >

              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
              <span className={`relative transition-transform ${isActive ? "scale-110" : "scale-100"}`}>
                <Icon
                  className={`w-5 h-5 transition-all ${isActive ? "stroke-[2.5px]" : "stroke-[1.75px]"}`}
                  aria-hidden="true"
                />
                {labelKey === "notices" && hasNewNotice && (
                  <span className="notif-dot" />
                )}
              </span>
              <span
                className={`text-[10px] font-bold leading-none truncate w-full text-center transition-all ${
                  isActive ? "text-primary font-extrabold" : "text-neutral-body"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
