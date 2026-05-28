"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import TeacherCard from "@/components/TeacherCard";
import { Faculty } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export default function FacultyPage() {
  const { language } = useLanguage();
  const [teachers, setTeachers] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = language === "en"
      ? "Our Experienced Faculty | Nav Jeevan Public School"
      : "हमारे अनुभवी शिक्षक | नव जीवन पब्लिक स्कूल";
  }, [language]);

  useEffect(() => {
    fetch("/api/faculty")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.faculty)) {
          setTeachers(data.faculty);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load faculty:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 bg-white flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            {language === "en" ? "Our Mentors" : "हमारे मार्गदर्शक"}
          </span>
          <SectionHeading
            title={language === "en" ? "Meet Our Dedicated Faculty" : "हमारे समर्पित शिक्षकों से मिलें"}
            subtitle={language === "en" 
              ? "The educators, subject experts, and administrative leaders who guide children in Khabharabhar, Kaptanganj."
              : "वे शिक्षक, विषय विशेषज्ञ और प्रशासनिक नेता जो खबरभार, कप्तानगंज में बच्चों का मार्गदर्शन करते हैं।"}
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-sm font-semibold text-neutral-body animate-pulse">
              {language === "en" ? "Loading faculty profiles..." : "शिक्षक प्रोफाइल लोड हो रही है..."}
            </p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-16 bg-neutral-light border border-gray-200 rounded-3xl p-6">
            <p className="text-sm font-semibold text-neutral-body">
              {language === "en" 
                ? "Faculty profiles are currently being updated by the administrator."
                : "शिक्षक प्रोफाइल वर्तमान में प्रशासक द्वारा अपडेट की जा रही हैं।"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {teachers.map((member) => (
              <TeacherCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
