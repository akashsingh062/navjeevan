"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import { GalleryItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const { language } = useLanguage();
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = language === "en"
      ? "Photo Gallery | Nav Jeevan Public School"
      : "फोटो गैलरी | नव जीवन पब्लिक स्कूल";
  }, [language]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.gallery)) {
          setImages(data.gallery);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gallery:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 bg-white flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            {language === "en" ? "Life & Events" : "जीवन और कार्यक्रम"}
          </span>
          <SectionHeading
            as="h1"
            title={language === "en" ? "School Photo Gallery" : "स्कूल फोटो गैलरी"}
            subtitle={language === "en"
              ? "Glimpses of active student life, regional cultural festivals, competitive sports days, and computer lab practicals."
              : "सक्रिय छात्र जीवन, क्षेत्रीय सांस्कृतिक उत्सवों, खेलकूद प्रतियोगिताओं और कंप्यूटर लैब के व्यावहारिक सत्रों की झलकियाँ।"}
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-sm font-semibold text-neutral-body animate-pulse">
              {language === "en" ? "Loading gallery..." : "गैलरी लोड हो रही है..."}
            </p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-neutral-light border border-gray-200 rounded-3xl p-6">
            <p className="text-sm font-semibold text-neutral-body">
              {language === "en"
                ? "No photos uploaded yet. Check back soon!"
                : "अभी तक कोई फोटो अपलोड नहीं की गई है। कृपया बाद में देखें!"}
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <GalleryGrid items={images} />
          </div>
        )}
      </div>
    </div>
  );
}
