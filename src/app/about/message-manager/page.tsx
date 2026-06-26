"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { managerNote } from "@/lib/data/about";
import AboutNavigation from "@/components/AboutNavigation";

export default function ManagerMessagePage() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === "en"
      ? "Manager's Message | Nav Jeevan Public School"
      : "प्रबंधक का संदेश | नव जीवन पब्लिक स्कूल";
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
            {managerNote.title[language]}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-10 bg-accent rounded-full" />
          <span className="text-xs font-black text-accent uppercase tracking-widest">
            {managerNote.tag[language]}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark mb-8">
          {managerNote.title[language]}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-accent/20 shadow-md bg-neutral-light">
              <Image
                src="/manager.jpg"
                alt={`Photo of ${managerNote.name[language]}`}
                fill
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
                sizes="200px"
                priority
                loading="eager"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-extrabold text-neutral-dark">
                {managerNote.name[language]}
              </p>
              <p className="text-xs text-accent font-bold uppercase tracking-wide mt-0.5">
                {language === "en" ? "Manager" : "प्रबंधक"}
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
                <p>{managerNote.salutation[language]}</p>
                <p>{managerNote.p1[language]}</p>
                <p>{managerNote.p2[language]}</p>
                <p>{managerNote.p3[language]}</p>
                <p className="font-semibold text-neutral-dark">
                  {language === "en" ? "With warm regards," : "सादर विनीत,"}
                  <br />
                  {managerNote.name[language]}
                  <br />
                  <span className="text-xs font-normal text-primary">
                    {managerNote.role[language]}
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
