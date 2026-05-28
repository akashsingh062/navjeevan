"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Target, Compass, Lightbulb, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { visionMissionDetails } from "@/lib/data/about";

export default function VisionMissionPage() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === "en" 
      ? "Vision & Mission | Nav Jeevan Public School"
      : "विजन और मिशन | नव जीवन पब्लिक स्कूल";
  }, [language]);

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
            {visionMissionDetails.title[language]}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-left">
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark tracking-tight mb-2">
          {visionMissionDetails.title[language]}
        </h1>
        <p className="text-sm text-neutral-body mb-10">
          {visionMissionDetails.subtitle[language]}
        </p>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-primary/20 bg-primary-light overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-primary text-white">
              <Target className="w-5 h-5" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">
                {visionMissionDetails.vision.title[language]}
              </h2>
            </div>
            <div className="px-5 py-5">
              <p className="text-base sm:text-lg font-bold text-neutral-dark leading-relaxed italic">
                {visionMissionDetails.vision.quote[language]}
              </p>
              <p className="text-sm text-neutral-body leading-relaxed mt-3">
                {visionMissionDetails.vision.desc[language]}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-accent/20 bg-accent-light overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-accent text-white">
              <Compass className="w-5 h-5" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">
                {visionMissionDetails.mission.title[language]}
              </h2>
            </div>
            <div className="px-5 py-5">
              <p className="text-base sm:text-lg font-bold text-neutral-dark leading-relaxed italic">
                {visionMissionDetails.mission.quote[language]}
              </p>
              <p className="text-sm text-neutral-body leading-relaxed mt-3">
                {visionMissionDetails.mission.desc[language]}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-amber-500 text-white">
              <Lightbulb className="w-5 h-5" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">
                {visionMissionDetails.strategy.title[language]}
              </h2>
            </div>
            <div className="px-5 py-5">
              <p className="text-base sm:text-lg font-bold text-neutral-dark leading-relaxed italic">
                {visionMissionDetails.strategy.quote[language]}
              </p>
              <p className="text-sm text-neutral-body leading-relaxed mt-3">
                {visionMissionDetails.strategy.desc[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
