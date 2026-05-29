"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { History, Target, MessageSquare, MapPin } from "lucide-react";

export default function AboutNavigation() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const links = [
    {
      href: "/about/history",
      label: { en: "Our History", hi: "हमारा इतिहास" },
      icon: History
    },
    {
      href: "/about/vision-mission",
      label: { en: "Vision & Mission", hi: "लक्ष्य और दृष्टिकोण" },
      icon: Target
    },
    {
      href: "/about/message-principal",
      label: { en: "Principal's Message", hi: "प्रधानाचार्य का संदेश" },
      icon: MessageSquare
    },
    {
      href: "/about/message-manager",
      label: { en: "Manager's Message", hi: "प्रबंधक का संदेश" },
      icon: MessageSquare
    },
    {
      href: "/about/find-us",
      label: { en: "Find Us / Directions", hi: "मार्गदर्शन / पता" },
      icon: MapPin
    }
  ];

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <h3 className="text-xs font-black text-neutral-dark uppercase tracking-widest mb-6">
        {language === "en" ? "Explore More About Us" : "हमारे बारे में और जानें"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 p-3.5 rounded-2xl border transition-all duration-200 active:scale-[0.98] text-xs font-bold ${
                isActive
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/15"
                  : "bg-neutral-light border-gray-200 text-neutral-dark hover:border-primary/20 hover:bg-white hover:text-primary"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white animate-pulse" : "text-primary"}`} />
              <span>{link.label[language as "en" | "hi"]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
