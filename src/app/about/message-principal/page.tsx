"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { principalNote } from "@/lib/data/about";
import AboutNavigation from "@/components/AboutNavigation";

export default function PrincipalMessagePage() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === "en"
      ? "Principal's Message | Nav Jeevan Public School"
      : "प्रधानाचार्य का संदेश | नव जीवन पब्लिक स्कूल";
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
            {principalNote.title[language]}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-10 bg-primary rounded-full" />
          <span className="text-xs font-black text-primary uppercase tracking-widest">
            {principalNote.tag[language]}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark mb-8">
          {principalNote.title[language]}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-md bg-neutral-light">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face&auto=format"
                alt={`Photo of ${principalNote.name[language]}`}
                fill
                className="object-cover"
                sizes="200px"
                priority
                loading="eager"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-extrabold text-neutral-dark">
                {principalNote.name[language]}
              </p>
              <p className="text-xs text-primary font-bold uppercase tracking-wide mt-0.5">
                {language === "en" ? "Principal" : "प्रधानाचार्य"}
              </p>
              <p className="text-[10px] text-neutral-body mt-1">
                {language === "en" ? "Nav Jeevan Public School" : "नव जीवन पब्लिक स्कूल"}
              </p>
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="relative bg-primary-light rounded-2xl p-6 border border-primary/15">
              <Quote className="absolute top-4 left-4 w-6 h-6 text-primary/20" />
              <div className="flex flex-col gap-4 text-sm text-neutral-body leading-relaxed pl-4">
                <p>{principalNote.salutation[language]}</p>
                <p>{principalNote.p1[language]}</p>
                <p>{principalNote.p2[language]}</p>
                <p>{principalNote.p3[language]}</p>
                <p>{principalNote.p4[language]}</p>
                <p className="font-semibold text-neutral-dark">
                  {language === "en" ? "With respect and affection," : "सादर स्नेह सहित,"}
                  <br />
                  {principalNote.name[language]}
                  <br />
                  <span className="text-xs font-normal text-primary">
                    {principalNote.role[language]}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <AboutNavigation />
      </div>
    </div>
  );
}
