"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import NoticesClient from "@/components/NoticesClient";
import { Notice } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export default function NoticesPage() {
  const { language } = useLanguage();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = language === "en"
      ? "Notice Board | Nav Jeevan Public School"
      : "सूचना पट्ट | नव जीवन पब्लिक स्कूल";
  }, [language]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.notices)) {
          setNotices(data.notices);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load notices:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 bg-white flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            {language === "en" ? "School Bulletins" : "स्कूल बुलेटिन"}
          </span>
          <SectionHeading
            as="h1"
            title={language === "en" ? "Official School Notice Board" : "आधिकारिक स्कूल सूचना पट्ट"}
            subtitle={language === "en"
              ? "Stay updated with CBSE announcements, exam calendars, summer/winter holiday notices, and parents directives."
              : "CBSE घोषणाओं, परीक्षा कैलेंडर, ग्रीष्मकालीन/शीतकालीन अवकाश सूचनाओं और अभिभावकों के निर्देशों के साथ अपडेट रहें।"}
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-sm font-semibold text-neutral-body animate-pulse">
              {language === "en" ? "Loading notices..." : "सूचनाएं लोड हो रही हैं..."}
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <NoticesClient initialNotices={notices} />
          </div>
        )}
      </div>
    </div>
  );
}
