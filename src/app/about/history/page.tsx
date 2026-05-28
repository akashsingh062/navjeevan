"use client";

import React from "react";
import Link from "next/link";
import { History, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { historyDetails, milestones } from "@/lib/data/about";
import AboutNavigation from "@/components/AboutNavigation";

export default function HistoryPage() {
  const { language } = useLanguage();

  return (
    <div className="flex-1 bg-white animate-fade-in-up">
      <div className="bg-neutral-light border-b border-border text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-neutral-body">
          <Link href="/" className="hover:text-primary transition-colors">
            {language === "en" ? "Home" : "होम"}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/about" className="hover:text-primary transition-colors">
            {language === "en" ? "About" : "हमारे बारे में"}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-dark font-semibold">
            {historyDetails.title[language]}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-left">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
            <History className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark tracking-tight">
              {historyDetails.title[language]}
            </h1>
            <p className="text-sm text-neutral-body mt-0.5">
              {language === "en" ? "A journey of 15+ years of rural educational excellence" : "ग्रामीण शैक्षिक उत्कृष्टता का 15+ वर्षों का सफर"}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-neutral-body leading-relaxed mb-10 max-w-2xl">
          {language === "en" 
            ? "Founded in 2008 with a handful of students and an unwavering belief that every child — regardless of geography — deserves world-class education, Nav Jeevan Public School has grown into one of the most trusted institutions in Kaptanganj, Kushinagar."
            : "2008 में मुट्ठी भर छात्रों और एक अटूट विश्वास के साथ स्थापित कि प्रत्येक बच्चा - भूगोल की परवाह किए बिना - विश्व स्तरीय शिक्षा का हकदार है, नव जीवन स्कूल कप्तानगंज, कुशीनगर में सबसे भरोसेमंद संस्थानों में से एक बन गया है।"}
        </p>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="flex flex-col gap-8">
            {milestones.map((item, i) => (
              <div
                key={i}
                className="relative flex gap-5 sm:gap-8 items-start pl-12 sm:pl-16"
              >
                <div
                  className="absolute left-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 border-4 border-white shadow-sm"
                >
                  <span className="text-[9px] sm:text-[10px] font-black leading-none text-center">
                    {item.year}
                  </span>
                </div>

                <div className="bg-neutral-light rounded-2xl border border-border p-4 sm:p-5 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                      {item.year}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-neutral-dark mb-1.5">
                    {item.title[language]}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-body leading-relaxed">
                    {item.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AboutNavigation />
      </div>
    </div>
  );
}
