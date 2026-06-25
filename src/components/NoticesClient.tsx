"use client";

import { useState } from "react";
import { Notice } from "@/types";
import NoticeCard from "@/components/NoticeCard";
import NoticeDetailModal from "@/components/NoticeDetailModal";
import { Search, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NoticesClientProps {
  initialNotices: Notice[];
}

const CATEGORIES = ["All", "Admission", "Exam", "Holiday", "General", "Others"] as const;

const CATEGORY_NAMES = {
  All: { en: "All Board", hi: "सभी बोर्ड" },
  Admission: { en: "Admissions", hi: "प्रवेश" },
  Exam: { en: "Exams", hi: "परीक्षाएँ" },
  Holiday: { en: "Holidays", hi: "अवकाश" },
  General: { en: "General", hi: "सामान्य" },
  Others: { en: "Others", hi: "अन्य" }
};

export default function NoticesClient({ initialNotices }: NoticesClientProps) {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const filteredNotices = initialNotices.filter((notice) => {
    let matchesCategory = false;
    if (activeCategory === "All") {
      matchesCategory = true;
    } else if (activeCategory === "Others") {
      matchesCategory = !["General", "Admission", "Exam", "Holiday"].includes(notice.category);
    } else {
      matchesCategory = notice.category === activeCategory;
    }
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 text-left">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-5 bg-neutral-light border border-gray-200 rounded-3xl shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-body" />
          <input
            type="text"
            placeholder={language === "en" ? "Search notice board..." : "सूचना पट्ट में खोजें..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-sm rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-neutral-dark font-medium transition-all"
            aria-label="Search notices"
          />
        </div>

        <div
          className="flex flex-wrap gap-2 w-full md:w-auto md:justify-end"
          role="tablist"
          aria-label="Notice Board Categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer focus:outline-none ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-neutral-body border-gray-200 hover:border-gray-300 hover:text-neutral-dark"
              }`}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {CATEGORY_NAMES[cat][language]}
            </button>
          ))}
        </div>
      </div>

      {filteredNotices.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col items-center gap-3">
          <AlertCircle className="w-12 h-12 text-neutral-body/30" />
          <p className="text-sm font-extrabold text-neutral-dark">
            {language === "en" ? "No notices match your criteria." : "आपके मानदंडों से मेल खाती कोई सूचना नहीं है।"}
          </p>
          <p className="text-xs text-neutral-body -mt-1 font-normal leading-relaxed">
            {language === "en"
              ? "Try checking another keyword or resetting the filter boards."
              : "कोई अन्य कीवर्ड आज़माएँ या फ़िल्टर रीसेट करें।"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredNotices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onClick={() => setSelectedNotice(notice)}
            />
          ))}
        </div>
      )}

      {selectedNotice && (
        <NoticeDetailModal
          isOpen={!!selectedNotice}
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
          language={language}
        />
      )}
    </div>
  );
}
