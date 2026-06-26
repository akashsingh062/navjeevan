"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { directorNote } from "@/lib/data/about";
import AboutNavigation from "@/components/AboutNavigation";

export default function DirectorMessagePage() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === "en"
      ? "Director's Message | Nav Jeevan Public School"
      : "निदेशक का संदेश | नव जीवन पब्लिक स्कूल";
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
            {directorNote.title[language as "en" | "hi"]}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-10 bg-accent rounded-full" />
          <span className="text-xs font-black text-accent uppercase tracking-widest">
            {directorNote.tag[language as "en" | "hi"]}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark mb-8">
          {directorNote.title[language as "en" | "hi"]}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-accent/20 shadow-md bg-neutral-light">
              <Image
                src="/director.jpg"
                alt={`Photo of ${directorNote.name[language as "en" | "hi"]}`}
                fill
                className="object-cover"
                style={{ objectPosition: "center 15%" }}
                sizes="200px"
                priority
                loading="eager"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-extrabold text-neutral-dark">
                {directorNote.name[language as "en" | "hi"]}
              </p>
              <p className="text-xs text-accent font-bold uppercase tracking-wide mt-0.5">
                {language === "en" ? "Managing Director" : "प्रबंध निदेशक"}
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
                <p>{directorNote.salutation[language as "en" | "hi"]}</p>
                <p>{directorNote.p1[language as "en" | "hi"]}</p>
                <p>{directorNote.p2[language as "en" | "hi"]}</p>
                <p>{directorNote.p3[language as "en" | "hi"]}</p>
                <p className="font-semibold text-neutral-dark">
                  {language === "en" ? "With warm regards," : "सादर विनीत,"}
                  <br />
                  {directorNote.name[language as "en" | "hi"]}
                  <br />
                  <span className="text-xs font-normal text-primary">
                    {directorNote.role[language as "en" | "hi"]}
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
