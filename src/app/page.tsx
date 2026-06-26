"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Lock,
  ChevronRight,
  Target,
  Lightbulb,
  Compass,
  Users,
  BookOpen,
  ArrowRight,
  Phone,
  Award,
  HeartHandshake,
  ShieldCheck,
  Paperclip,
  Download,
  Sparkles,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import NoticeCard from "@/components/NoticeCard";
import NoticeDetailModal from "@/components/NoticeDetailModal";
import GalleryGrid from "@/components/GalleryGrid";
import CTASection from "@/components/CTASection";
import ImageModal from "@/components/ImageModal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Notice, GalleryItem } from "@/types";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function isRecent(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff >= 0 && diff <= TWO_DAYS_MS;
}

const managementMembers = [
  {
    name: {
      en: "Shri Dhirendra Pratap Singh",
      hi: "श्री धीरेन्द्र प्रताप सिंह",
    },
    role: {
      en: "Manager",
      hi: "प्रबंधक",
    },
    photo: "/manager.jpg",
    // 1396×1864 — tall portrait headshot, centered face, solid bg
    imgPosition: "center 20%",
  },
  {
    name: {
      en: "Shri Satyendra Pratap Singh",
      hi: "श्री सत्येंद्र प्रताप सिंह",
    },
    role: {
      en: "Principal",
      hi: "प्रधानाचार्य",
    },
    photo: "/principle.jpeg",
    // 552×619 — near-square, sitting at desk, face in upper portion
    imgPosition: "center 25%",
  },
  {
    name: {
      en: "Shri Sandeep Sharma",
      hi: "श्री संदीप शर्मा",
    },
    role: {
      en: "Managing Director",
      hi: "प्रबंध निदेशक",
    },
    photo: "/director.jpg",
    // 1000×1224 — portrait headshot, slightly tilted, teal bg
    imgPosition: "center 15%",
  }
];

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const [notices, setNotices] = useState<Notice[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/notices")
        .then((res) => res.json())
        .catch(() => null),
      fetch("/api/gallery")
        .then((res) => res.json())
        .catch(() => null),
    ]).then(([noticesData, galleryData]) => {
      if (noticesData) {
        setNotices(
          Array.isArray(noticesData)
            ? noticesData
            : (noticesData.notices ?? []),
        );
      }
      if (galleryData) {
        setGalleryItems(
          Array.isArray(galleryData)
            ? galleryData
            : (galleryData.gallery ?? []),
        );
      }
      setLoading(false);
    });
  }, []);

  const previewNotices = notices.slice(0, 5);
  const previewGallery = galleryItems.slice(0, 4);

  return (
    <div className="flex flex-col flex-1">
      <HeroSection />

      {/* ─── Gradient divider ─────────────────────────────────── */}
      <div className="section-gradient-divider" />

      {/* ─── Notices + Sidebar ─────────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Notices column */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden text-left reveal-on-scroll reveal-fade-right">
              {/* Header with gradient accent */}
              <div className="relative px-4 sm:px-5 py-4 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-primary via-primary to-[#B8521A] opacity-100" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-extrabold uppercase tracking-wide">
                        {language === "en" ? "Latest Notices" : "नवीनतम सूचनाएँ"}
                      </h2>
                      <p className="text-[10px] text-white/60 font-medium">
                        {language === "en" ? "Important updates & announcements" : "महत्वपूर्ण अपडेट और घोषणाएं"}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/notices"
                    className="flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg"
                  >
                    <span>{language === "en" ? "View All" : "सभी देखें"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-4">
                {loading ? (
                  <div className="flex flex-col gap-3 py-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex gap-3 p-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-1/3" />
                          <div className="h-4 bg-gray-200 rounded w-2/3" />
                          <div className="h-3 bg-gray-200 rounded w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : previewNotices.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-neutral-light rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Bell className="w-7 h-7 text-neutral-body/40" />
                    </div>
                    <p className="text-xs text-neutral-body italic">
                      {language === "en"
                        ? "No notices posted yet."
                        : "अभी तक कोई सूचना पोस्ट नहीं की गई है।"}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Desktop notices */}
                    <div className="hidden md:flex flex-col gap-4">
                      {previewNotices.map((notice) => (
                        <div key={notice.id || notice._id} className="relative">
                          {isRecent(notice.date) && (
                            <span className="new-badge absolute -top-2 -right-2 z-10">
                              NEW
                            </span>
                          )}
                          <NoticeCard
                            notice={notice}
                            onClick={() => setSelectedNotice(notice)}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Mobile notices */}
                    <div className="md:hidden flex flex-col gap-3">
                      {previewNotices.map((notice) => {
                        const isImportant = notice.isImportant;
                        const borderColors = {
                          red: "border-l-red-500",
                          amber: "border-l-amber-500",
                          green: "border-l-emerald-500",
                          blue: "border-l-blue-500",
                          purple: "border-l-purple-500",
                        };
                        const categoryBorders = {
                          Admission: "border-l-blue-500",
                          Holiday: "border-l-emerald-500",
                          Exam: "border-l-red-500",
                          General: "border-l-amber-500",
                          Others: "border-l-purple-500",
                        };
                        const categoryBadges = {
                          Admission:
                            "bg-blue-55/10 text-blue-700 border border-blue-200/50",
                          Holiday:
                            "bg-emerald-55/10 text-emerald-700 border border-emerald-200/50",
                          Exam: "bg-red-55/10 text-red-700 border border-red-200/50",
                          General:
                            "bg-amber-55/10 text-amber-700 border border-amber-200/50",
                          Others:
                            "bg-purple-55/10 text-purple-700 border border-purple-200/50",
                        };
                        const activeBorderColor = isImportant
                          ? (borderColors[notice.importanceColor ?? "red"] ??
                            "border-l-red-500")
                          : (categoryBorders[
                            notice.category as keyof typeof categoryBorders
                          ] ?? categoryBorders.Others);
                        const activeBadgeStyle =
                          categoryBadges[
                          notice.category as keyof typeof categoryBadges
                          ] ?? categoryBadges.Others;

                        return (
                          <div
                            key={notice.id || notice._id}
                            onClick={() => setSelectedNotice(notice)}
                            className={`relative p-3 bg-neutral-light border border-gray-200 border-l-4 ${activeBorderColor} rounded-xl shadow-3xs flex flex-col gap-2 text-left cursor-pointer hover:shadow-xs hover:border-primary/30 transition-all`}
                          >
                            {isRecent(notice.date) && (
                              <span className="new-badge absolute -top-1.5 -right-1.5 z-10">
                                NEW
                              </span>
                            )}
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider ${activeBadgeStyle}`}
                              >
                                {notice.category}
                              </span>
                              <span className="text-[9px] text-neutral-body font-bold">
                                {new Date(notice.date).toLocaleDateString(
                                  "en-IN",
                                  { day: "numeric", month: "short" },
                                )}
                              </span>
                            </div>

                            <div className="flex items-start justify-between gap-2.5 min-w-0">
                              <h4 className="text-xs font-extrabold text-neutral-dark leading-snug break-words flex-1">
                                {isImportant && (
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 align-middle animate-pulse" />
                                )}
                                <span className="align-middle">
                                  {notice.title}
                                </span>
                              </h4>
                              {notice.attachmentUrl && (
                                <a
                                  href={`/api/notices/download?url=${encodeURIComponent(notice.attachmentUrl)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors shrink-0 flex items-center justify-center"
                                  title="Download Circular"
                                >
                                  <Paperclip className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {selectedNotice && (
              <NoticeDetailModal
                isOpen={!!selectedNotice}
                notice={selectedNotice}
                onClose={() => setSelectedNotice(null)}
                language={language}
              />
            )}

            {/* Sidebar */}
            <div className="hidden md:flex flex-col gap-5 text-left reveal-on-scroll reveal-fade-left">
              {/* Staff Portal Card */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden card-accent-bottom">
                <div className="relative px-5 py-3.5 bg-neutral-dark text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8" />
                  <div className="relative flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <h2 className="text-sm font-extrabold uppercase tracking-wide">
                      {t.nav.staffPortal}
                    </h2>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto animate-glow-pulse">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-neutral-dark">
                      {language === "en"
                        ? "School Administration"
                        : "विद्यालय प्रशासन"}
                    </p>
                    <p className="text-xs text-neutral-body mt-1">
                      {language === "en"
                        ? "Manage notices, faculty, gallery and school records."
                        : "सूचनाओं, शिक्षकों, गैलरी और विद्यालय के रिकॉर्ड का प्रबंधन करें।"}
                    </p>
                  </div>
                  <Link
                    href="/admin"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {language === "en"
                        ? "Login to Admin Panel"
                        : "एडमिन पैनल में लॉगिन करें"}
                    </span>
                  </Link>
                  <a
                    href="tel:+919889897057"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-border hover:bg-neutral-light text-neutral-dark rounded-xl font-semibold text-xs transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {language === "en"
                        ? "Call: +91 98898 97057"
                        : "कॉल करें: +91 98898 97057"}
                    </span>
                  </a>
                </div>
              </div>

              {/* Admissions card */}
              <div className="relative bg-accent rounded-2xl p-5 text-white flex flex-col gap-3 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-6 -mb-6 pointer-events-none" />

                <div className="relative flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-extrabold uppercase tracking-wide">
                      {language === "en" ? "Admissions Open" : "प्रवेश खुले हैं"}
                    </span>
                    <span className="block text-[10px] text-white/50 font-medium">
                      {language === "en" ? "Session 2026–27" : "सत्र 2026-27"}
                    </span>
                  </div>
                </div>
                <p className="relative text-xs text-white/85 leading-relaxed">
                  {language === "en"
                    ? "Session 2026–27 enrollment open. Nursery to Class VIII. Apply now!"
                    : "सत्र 2026-27 के लिए पंजीकरण खुला है। नर्सरी से कक्षा VIII। अभी आवेदन करें!"}
                </p>
                <Link
                  href="/admissions?tab=apply"
                  className="relative flex items-center justify-center gap-1.5 w-full py-2.5 bg-white text-accent rounded-xl font-bold text-xs transition-all hover:bg-neutral-light hover:shadow-lg"
                >
                  <span>
                    {language === "en"
                      ? "Apply for Admission"
                      : "प्रवेश के लिए आवेदन करें"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="relative flex items-center justify-center gap-1.5 w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {language === "en" ? "View Admission Form" : "प्रवेश फॉर्म देखें"}
                  </span>
                </button>
                <a
                  href="/admissionForm.png"
                  download="Nav_Jeevan_Public_School_Admission_Form.png"
                  className="relative flex items-center justify-center gap-1.5 w-full py-2.5 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {language === "en" ? "Download Offline Form" : "ऑफलाइन फॉर्म डाउनलोड करें"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section ────────────────────────────────────── */}
      <section
        className="py-12 sm:py-16 bg-white relative overflow-hidden"
        id="about"
      >
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/3 rounded-full blur-3xl -ml-36 -mb-36 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-10 text-left reveal-on-scroll reveal-fade-up">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-black text-primary bg-primary-light px-3 py-1 rounded-full tracking-widest w-fit flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                {language === "en" ? "About Us" : "हमारे बारे में"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-dark tracking-tight">
                {language === "en"
                  ? "About Nav Jeevan Public School"
                  : "नव जीवन पब्लिक स्कूल के बारे में"}
              </h2>
            </div>
            <div className="h-[2px] flex-1 bg-linear-to-r from-border to-transparent rounded-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start text-left overflow-hidden">
            {/* Image side */}
            <div className="relative reveal-on-scroll reveal-fade-right">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 group">
                <Image
                  src="/img-2.jpg"
                  alt="Students learning at Nav Jeevan Public School"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-neutral-dark/80 to-transparent px-5 py-5">
                  <p className="text-white text-xs font-bold">
                    {language === "en"
                      ? "Nav Jeevan Public School — Smart Classroom"
                      : "नव जीवन पब्लिक स्कूल - स्मार्ट क्लासरूम"}
                  </p>
                  <p className="text-white/70 text-[10px]">
                    {language === "en"
                      ? "Khabharabhar, Kaptanganj, Kushinagar"
                      : "खबरभार, कप्तानगंज, कुशीनगर"}
                  </p>
                </div>
              </div>

              {/* Years badge */}
              <div className="absolute -top-3 -right-3 bg-linear-to-br from-primary to-[#B8521A] text-white rounded-2xl px-4 py-3 shadow-xl text-center animate-float-slow">
                <span className="block text-2xl font-black leading-none">
                  15+
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wide mt-0.5">
                  {language === "en"
                    ? "Years of\nExcellence"
                    : "उत्कृष्टता के\nवर्ष"}
                </span>
              </div>

              {/* Decorative dots */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 dot-pattern opacity-30 pointer-events-none hidden lg:block" />
            </div>

            {/* Text side */}
            <div className="flex flex-col gap-6 reveal-on-scroll reveal-fade-left">
              <p className="text-sm sm:text-base text-neutral-body leading-relaxed">
                {language === "en"
                  ? "Established in 2011 with a vision to revolutionize primary and secondary education in rural Uttar Pradesh, Nav Jeevan Public School is affiliated with UP curriculum standards. We combine rigorous academics with digital computer exposure, cultural celebrations, and physical drills to construct all-round capabilities in our students."
                  : "ग्रामीण उत्तर प्रदेश में प्राथमिक और माध्यमिक शिक्षा में क्रांति लाने के दृष्टिकोण से 2011 में स्थापित, नव जीवन पब्लिक स्कूल सीबीएसई पाठ्यक्रम मानकों से संबद्ध है। हम अपने छात्रों में सर्वांगीण क्षमताओं के निर्माण के लिए कठोर शिक्षा के साथ डिजिटल कंप्यूटर एक्सपोज़र, सांस्कृतिक उत्सवों और शारीरिक अभ्यासों का संयोजन करते हैं।"}
              </p>

              <div className="flex flex-col gap-3">
                {/* Vision */}
                <div className="flex gap-3.5 items-start p-4 bg-primary-light border border-primary/15 rounded-2xl reveal-on-scroll reveal-fade-up delay-100 icon-hover-bounce hover:border-primary/30 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-[#B8521A] flex items-center justify-center shrink-0 shadow-sm">
                    <Target className="w-5 h-5 text-white icon-target" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-dark mb-1">
                      {language === "en" ? "Our Vision" : "हमारा दृष्टिकोण"}
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed">
                      {language === "en"
                        ? "Every child growing to be educated, committed and empowered global persons."
                        : "हर बच्चा शिक्षित, प्रतिबद्ध और सशक्त वैश्विक व्यक्ति बनने की ओर अग्रसर हो।"}
                    </p>
                  </div>
                </div>

                {/* Mission */}
                <div className="flex gap-3.5 items-start p-4 bg-accent-light border border-accent/15 rounded-2xl reveal-on-scroll reveal-fade-up delay-200 icon-hover-bounce hover:border-accent/30 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-accent to-[#155838] flex items-center justify-center shrink-0 shadow-sm">
                    <Compass className="w-5 h-5 text-white icon-target" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-dark mb-1">
                      {language === "en" ? "Our Mission" : "हमारा लक्ष्य"}
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed">
                      {language === "en"
                        ? "To accompany every child and facilitate integrated development, joyful learning and empowerment with character and competence."
                        : "प्रत्येक बच्चे का मार्गदर्शन करना और उनके चरित्र व क्षमता के साथ उनका एकीकृत विकास, आनंदमयी शिक्षा और सशक्तिकरण सुनिश्चित करना।"}
                    </p>
                  </div>
                </div>

                {/* Strategy */}
                <div className="flex gap-3.5 items-start p-4 bg-amber-50 border border-amber-200/50 rounded-2xl reveal-on-scroll reveal-fade-up delay-300 icon-hover-bounce hover:border-amber-300 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Lightbulb className="w-5 h-5 text-white icon-target" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-dark mb-1">
                      {language === "en" ? "Our Strategy" : "हमारी कार्यनीति"}
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed">
                      {language === "en"
                        ? "A process of joyful learning coupled with constant accompaniment, whole person paradigm and child centered education."
                        : "निरंतर मार्गदर्शन, समग्र व्यक्तित्व प्रतिमान और बाल केंद्रित शिक्षा के साथ आनंदमयी शिक्षा की प्रक्रिया।"}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-light hover:bg-primary/20 text-primary font-bold text-sm rounded-xl transition-all self-start hover:shadow-sm group"
              >
                <span>
                  {language === "en"
                    ? "Read Our Full Story"
                    : "हमारी पूरी कहानी पढ़ें"}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gradient divider ─────────────────────────────────── */}
      <div className="section-gradient-divider" />

      {/* ─── Management Section ───────────────────────────────── */}
      <section className="py-12 sm:py-14 bg-neutral-light relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/3 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8 text-left reveal-on-scroll reveal-fade-up">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-black text-accent bg-accent-light px-3 py-1 rounded-full tracking-widest w-fit">
                {language === "en" ? "Leadership" : "नेतृत्व"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-dark tracking-tight">
                {language === "en" ? "Our Management" : "हमारा प्रबंधन"}
              </h2>
            </div>
            <div className="h-[2px] flex-1 bg-linear-to-r from-border to-transparent rounded-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {managementMembers.map((member, i) => {
              const delays = ["", "delay-100", "delay-200", "delay-300"];
              const isMd = i === 2;
              return (
                <Link
                  key={i}
                  href={
                    i === 0
                      ? "/about/message-manager"
                      : i === 1
                      ? "/about/message-principal"
                      : "/about/message-director"
                  }
                  className={`flex flex-col w-full sm:h-[380px] rounded-3xl border transition-all duration-500 ease-out group reveal-on-scroll reveal-fade-up ${delays[i]} card-accent-bottom ${isMd
                      ? "bg-white border-2 border-primary/25 shadow-md hover:border-primary/55 hover:-translate-y-2"
                      : "bg-white border border-border shadow-xs hover:border-primary/20 hover:shadow-md hover:-translate-y-2"
                    }`}
                >
                  <div className="relative w-full aspect-4/3 sm:aspect-auto sm:h-[240px] overflow-hidden shrink-0 bg-neutral-light/5 rounded-t-3xl">
                    <Image
                      src={member.photo}
                      alt={`Photo of ${member.name[language]}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ objectPosition: member.imgPosition }}
                      sizes="(max-width: 640px) 100vw, 25vw"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="flex-1 p-5 flex flex-col justify-center items-center text-center gap-2 w-full bg-white rounded-b-3xl">
                    <h3 className="text-sm sm:text-base font-extrabold text-neutral-dark tracking-tight leading-snug transition-colors duration-300 group-hover:text-primary">
                      {member.name[language]}
                    </h3>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-md leading-none transition-all duration-300 border ${isMd
                          ? "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-white group-hover:border-transparent"
                          : "bg-neutral-light text-neutral-body border-border group-hover:bg-primary group-hover:text-white group-hover:border-transparent"
                        }`}
                    >
                      {member.role[language]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/faculty"
              className="flex items-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-extrabold text-sm shadow-2xs hover:shadow-lg hover:scale-103 transition-all duration-300 ease-out cursor-pointer group"
            >
              <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>
                {language === "en"
                  ? "Meet Our Faculty"
                  : "हमारे शिक्षकों से मिलें"}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Section ───────────────────────────────── */}
      <section className="py-12 bg-white relative overflow-hidden text-left">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl -mr-40 -mb-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8 reveal-on-scroll reveal-fade-up">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-black text-primary bg-primary-light px-3 py-1 rounded-full tracking-widest w-fit">
                {language === "en" ? "Why Us" : "हमें क्यों चुनें"}
              </span>
              <h2 className="text-xl font-black text-neutral-dark">
                {language === "en"
                  ? "Why Choose Nav Jeevan?"
                  : "नव जीवन को क्यों चुनें?"}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: Award,
                gradient: "from-primary to-[#B8521A]",
                bgLight: "bg-primary-light",
                borderColor: "border-primary/10 hover:border-primary/25",
                title:
                  language === "en" ? "Affordable Quality" : "किफायती गुणवत्ता",
                desc:
                  language === "en"
                    ? "UP-pattern learning with minimal fees for every child in Kushinagar."
                    : "कुशीनगर में प्रत्येक बच्चे के लिए न्यूनतम शुल्क के साथ सीबीएसई-पैटर्न शिक्षा.",
              },
              {
                icon: HeartHandshake,
                gradient: "from-accent to-[#155838]",
                bgLight: "bg-accent-light",
                borderColor: "border-accent/10 hover:border-accent/25",
                title:
                  language === "en" ? "Bilingual Learning" : "द्विभाषी शिक्षा",
                desc:
                  language === "en"
                    ? "Classes in both Hindi & English — no child is left behind due to language."
                    : "हिन्दी और अंग्रेजी दोनों में कक्षाएं - भाषा के कारण कोई भी बच्चा पीछे न रहे.",
              },
              {
                icon: ShieldCheck,
                gradient: "from-amber-500 to-amber-600",
                bgLight: "bg-amber-50",
                borderColor: "border-amber-200/50 hover:border-amber-300",
                title:
                  language === "en" ? "Smart & Modern" : "स्मार्ट और आधुनिक",
                desc:
                  language === "en"
                    ? "Smart classrooms, computer lab, and dedicated IT literacy from early grades."
                    : "स्मार्ट कक्षाएं, कंप्यूटर लैब और शुरुआती कक्षाओं से समर्पित आईटी साक्षरता.",
              },
            ].map((p, i) => {
              const Icon = p.icon;
              const delays = ["", "delay-100", "delay-200"];
              return (
                <div
                  key={i}
                  className={`flex gap-4 items-start p-5 ${p.bgLight} border ${p.borderColor} rounded-2xl reveal-on-scroll reveal-fade-up ${delays[i]} icon-hover-bounce hover:shadow-md transition-all card-accent-bottom`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-linear-to-br ${p.gradient} flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <Icon className="w-5 h-5 text-white icon-target" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-dark">
                      {p.title}
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed mt-1">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Gallery Preview ──────────────────────────────────── */}
      {loading ? (
        <div className="py-10 text-center text-xs text-neutral-body italic">
          {language === "en"
            ? "Loading campus life gallery..."
            : "गैलरी लोड हो रही है..."}
        </div>
      ) : previewGallery.length > 0 ? (
        <section className="py-12 bg-neutral-light text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/3 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 reveal-on-scroll reveal-fade-up">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-black text-accent bg-accent-light px-3 py-1 rounded-full tracking-widest w-fit">
                    {language === "en" ? "Campus Life" : "कैंपस जीवन"}
                  </span>
                  <h2 className="text-xl font-black text-neutral-dark">
                    {language === "en"
                      ? "Life at Nav Jeevan"
                      : "नव जीवन में जीवन के रंग"}
                  </h2>
                </div>
              </div>
              <Link
                href="/gallery"
                className="flex items-center gap-1 text-xs font-bold text-primary hover:underline shrink-0 bg-primary-light px-3 py-1.5 rounded-lg"
              >
                <span>{language === "en" ? "View All" : "सभी देखें"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <GalleryGrid items={previewGallery} limit={4} />
          </div>
        </section>
      ) : null}

      <CTASection />

      {/* ─── Contact Section ──────────────────────────────────── */}
      <section className="py-12 bg-white text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6 reveal-on-scroll reveal-fade-up">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-black text-primary bg-primary-light px-3 py-1 rounded-full tracking-widest w-fit">
                {language === "en" ? "Contact" : "संपर्क"}
              </span>
              <h2 className="text-xl font-black text-neutral-dark">
                {language === "en" ? "Get in Touch" : "संपर्क में रहें"}
              </h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
            <a
              href="tel:+919889897057"
              className="flex items-center gap-3 flex-1 p-4 border border-border rounded-2xl hover:border-primary/30 hover:bg-primary-light/50 transition-all reveal-on-scroll reveal-fade-right delay-100 card-accent-bottom group"
            >
              <div className="p-2.5 bg-linear-to-br from-primary-light to-primary/15 rounded-xl text-primary shrink-0 group-hover:shadow-sm transition-shadow">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-neutral-body uppercase tracking-wider">
                  {language === "en" ? "Call Office" : "कार्यालय में कॉल करें"}
                </span>
                <span className="block text-sm font-black text-neutral-dark">
                  +91 98898 97057
                </span>
              </div>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-3 flex-1 p-4 border border-primary/20 bg-primary-light rounded-2xl hover:bg-primary/15 transition-all reveal-on-scroll reveal-fade-left delay-200 card-accent-bottom group"
            >
              <div className="p-2.5 bg-primary/15 rounded-xl text-primary shrink-0 group-hover:shadow-sm transition-shadow">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-neutral-body uppercase tracking-wider">
                  {language === "en" ? "Online" : "ऑनलाइन"}
                </span>
                <span className="block text-sm font-black text-primary">
                  {language === "en" ? "Send an Inquiry" : "पूछताछ भेजें"}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <ImageModal
        isOpen={isFormOpen}
        imageUrl="/admissionForm.png"
        category={language === "en" ? "Admission Form" : "प्रवेश फॉर्म"}
        title={language === "en" ? "Nav Jeevan Public School Admission Form" : "नव जीवन पब्लिक स्कूल प्रवेश फॉर्म"}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}
