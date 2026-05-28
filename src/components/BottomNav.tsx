"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, Image, Users, Phone } from "lucide-react";

const bottomNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/notices", label: "Notices", icon: Bell },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/faculty", label: "Faculty", icon: Users },
  { href: "/contact", label: "Contact", icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on admin page
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-stretch justify-around h-16">
        {bottomNavItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 min-h-0 transition-all relative ${
                isActive ? "text-primary" : "text-neutral-body"
              }`}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator pill */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
              <span className={`transition-transform ${isActive ? "scale-110" : "scale-100"}`}>
                <Icon
                  className={`w-5 h-5 transition-all ${isActive ? "stroke-[2.5px]" : "stroke-[1.75px]"}`}
                  aria-hidden="true"
                />
              </span>
              <span
                className={`text-[10px] font-bold leading-none transition-all ${
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
