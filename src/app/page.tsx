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
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import NoticeCard from "@/components/NoticeCard";
import GalleryGrid from "@/components/GalleryGrid";
import CTASection from "@/components/CTASection";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Notice, GalleryItem } from "@/types";

const managementMembers = [
  {
    name: {
      en: "Shri Satyendra Pratap Singh",
      hi: "श्री सत्येंद्र प्रताप सिंह",
    },
    role: {
      en: "Principal",
      hi: "प्रधानाचार्य",
    },
    photo: '/un.jpeg',
  },
  {
    name: {
      en: "Smt. Sushila Devi",
      hi: "श्रीमती सुशीला देवी",
    },
    role: {
      en: "Vice Principal",
      hi: "उप-प्रधानाचार्या",
    },
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: {
      en: "Shri Anil Kumar Singh",
      hi: "श्री अनिल कुमार सिंह",
    },
    role: {
      en: "Managing Director",
      hi: "प्रबंध निदेशक",
    },
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: {
      en: "Smt. Priya Mishra",
      hi: "श्रीमती प्रिया मिश्रा",
    },
    role: {
      en: "Administrative Head",
      hi: "प्रशासनिक प्रमुख",
    },
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const [notices, setNotices] = useState<Notice[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

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

      <section className="py-8 sm:py-10 bg-neutral-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden text-left reveal-on-scroll reveal-fade-right">
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-primary text-white">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wide">
                    {language === "en" ? "Latest Notices" : "नवीनतम सूचनाएँ"}
                  </h2>
                </div>
                <Link
                  href="/notices"
                  className="flex items-center gap-1 text-[11px] font-bold text-white/80 hover:text-white transition-colors"
                >
                  <span>{language === "en" ? "View All" : "सभी देखें"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-4">
                {loading ? (
                  <p className="text-xs text-neutral-body italic py-4 text-center">
                    {language === "en"
                      ? "Loading notices..."
                      : "सूचनाएँ लोड हो रही हैं..."}
                  </p>
                ) : previewNotices.length === 0 ? (
                  <p className="text-xs text-neutral-body italic py-4 text-center">
                    {language === "en"
                      ? "No notices posted yet."
                      : "अभी तक कोई सूचना पोस्ट नहीं की गई है।"}
                  </p>
                ) : (
                  <>
                    <div className="hidden md:flex flex-col gap-4">
                      {previewNotices.map((notice) => (
                        <NoticeCard
                          key={notice.id || notice._id}
                          notice={notice}
                        />
                      ))}
                    </div>

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
                            className={`p-3 bg-neutral-light border border-gray-200 border-l-4 ${activeBorderColor} rounded-xl shadow-3xs flex flex-col gap-2 text-left`}
                          >
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

            <div className="hidden md:flex flex-col gap-4 text-left reveal-on-scroll reveal-fade-left">
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 bg-neutral-dark text-white flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wide">
                    {t.nav.staffPortal}
                  </h2>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto">
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
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all"
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

              <div className="bg-accent rounded-2xl p-5 text-white flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-extrabold uppercase tracking-wide">
                    {language === "en" ? "Admissions Open" : "प्रवेश खुले हैं"}
                  </span>
                </div>
                <p className="text-xs text-white/85 leading-relaxed">
                  {language === "en"
                    ? "Session 2026–27 enrollment open. Nursery to Class VIII. Apply now!"
                    : "सत्र 2026-27 के लिए पंजीकरण खुला है। नर्सरी से कक्षा VIII। अभी आवेदन करें!"}
                </p>
                <Link
                  href="/admissions"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-white text-accent rounded-xl font-bold text-xs transition-all hover:bg-neutral-light"
                >
                  <span>
                    {language === "en"
                      ? "Apply for Admission"
                      : "प्रवेश के लिए आवेदन करें"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-10 sm:py-14 bg-white border-b border-border"
        id="about"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8 text-left reveal-on-scroll reveal-fade-up">
            <div className="h-1 w-10 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-neutral-dark tracking-tight">
              {language === "en"
                ? "About Nav Jeevan Public School"
                : "नव जीवन पब्लिक स्कूल के बारे में"}
            </h2>
            <div className="h-1 flex-1 bg-border rounded-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start text-left overflow-hidden">
            <div className="relative reveal-on-scroll reveal-fade-right">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3">
                <Image
                  src="/img-2.jpg"
                  alt="Students learning at Nav Jeevan Public School"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-neutral-dark/80 to-transparent px-4 py-4">
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

              <div className="absolute -top-3 -right-3 bg-primary text-white rounded-2xl px-4 py-3 shadow-lg text-center">
                <span className="block text-2xl font-black leading-none">
                  15+
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wide mt-0.5">
                  {language === "en"
                    ? "Years of\nExcellence"
                    : "उत्कृष्टता के\nवर्ष"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 reveal-on-scroll reveal-fade-left">
              <p className="text-sm sm:text-base text-neutral-body leading-relaxed">
                {language === "en"
                  ? "Established in 2011 with a vision to revolutionize primary and secondary education in rural Uttar Pradesh, Nav Jeevan Public School is affiliated with UP curriculum standards. We combine rigorous academics with digital computer exposure, cultural celebrations, and physical drills to construct all-round capabilities in our students."
                  : "ग्रामीण उत्तर प्रदेश में प्राथमिक और माध्यमिक शिक्षा में क्रांति लाने के दृष्टिकोण से 2011 में स्थापित, नव जीवन पब्लिक स्कूल सीबीएसई पाठ्यक्रम मानकों से संबद्ध है। हम अपने छात्रों में सर्वांगीण क्षमताओं के निर्माण के लिए कठोर शिक्षा के साथ डिजिटल कंप्यूटर एक्सपोज़र, सांस्कृतिक उत्सवों और शारीरिक अभ्यासों का संयोजन करते हैं।"}
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex gap-3.5 items-start p-4 bg-primary-light border border-primary/20 rounded-2xl reveal-on-scroll reveal-fade-up delay-100">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-white" />
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

                <div className="flex gap-3.5 items-start p-4 bg-accent-light border border-accent/20 rounded-2xl reveal-on-scroll reveal-fade-up delay-200">
                  <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-white" />
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

                <div className="flex gap-3.5 items-start p-4 bg-amber-50 border border-amber-200 rounded-2xl reveal-on-scroll reveal-fade-up delay-300">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-white" />
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
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-light hover:bg-primary/20 text-primary font-bold text-sm rounded-xl transition-all self-start"
              >
                <span>
                  {language === "en"
                    ? "Read Our Full Story"
                    : "हमारी पूरी कहानी पढ़ें"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-neutral-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7 text-left reveal-on-scroll reveal-fade-up">
            <div className="h-1 w-10 bg-accent rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-neutral-dark tracking-tight">
              {language === "en" ? "Our Management" : "हमारा प्रबंधन"}
            </h2>
            <div className="h-1 flex-1 bg-border rounded-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {managementMembers.map((member, i) => {
              const delays = ["", "delay-100", "delay-200", "delay-300"];
              const isMd = i === 2;
              return (
                <div
                  key={i}
                  className={`flex flex-col w-full sm:h-[380px] rounded-3xl border transition-all duration-500 ease-out group reveal-on-scroll reveal-fade-up ${delays[i]} ${
                    isMd
                      ? "bg-white border-2 border-primary/25 shadow-md hover:border-primary/55 hover:-translate-y-1.5"
                      : "bg-white border border-border shadow-xs hover:border-primary/20 hover:shadow-md hover:-translate-y-1.5"
                  }`}
                >
                  <div className="relative w-full aspect-4/3 sm:aspect-auto sm:h-[240px] overflow-hidden shrink-0 bg-neutral-light/5 rounded-t-3xl">
                    <Image
                      src={member.photo}
                      alt={`Photo of ${member.name[language]}`}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, 25vw"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  <div className="flex-1 p-5 flex flex-col justify-center items-center text-center gap-2 w-full bg-white rounded-b-3xl">
                    <h3 className="text-sm sm:text-base font-extrabold text-neutral-dark tracking-tight leading-snug transition-colors duration-300 group-hover:text-primary">
                      {member.name[language]}
                    </h3>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-md leading-none transition-all duration-300 border ${
                        isMd
                          ? "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-white group-hover:border-transparent"
                          : "bg-neutral-light text-neutral-body border-border group-hover:bg-primary group-hover:text-white group-hover:border-transparent"
                      }`}
                    >
                      {member.role[language]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/faculty"
              className="flex items-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-extrabold text-sm shadow-2xs hover:shadow-lg hover:scale-103 transition-all duration-300 ease-out cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>
                {language === "en"
                  ? "Meet Our Faculty"
                  : "हमारे शिक्षकों से मिलें"}
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6 reveal-on-scroll reveal-fade-up">
            <div className="h-1 w-10 bg-primary rounded-full" />
            <h2 className="text-xl font-black text-neutral-dark">
              {language === "en"
                ? "Why Choose Nav Jeevan?"
                : "नव जीवन को क्यों चुनें?"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Award,
                color: "text-primary bg-primary-light",
                title:
                  language === "en" ? "Affordable Quality" : "किफायती गुणवत्ता",
                desc:
                  language === "en"
                    ? "UP-pattern learning with minimal fees for every child in Kushinagar."
                    : "कुशीनगर में प्रत्येक बच्चे के लिए न्यूनतम शुल्क के साथ सीबीएसई-पैटर्न शिक्षा.",
              },
              {
                icon: HeartHandshake,
                color: "text-accent bg-accent-light",
                title:
                  language === "en" ? "Bilingual Learning" : "द्विभाषी शिक्षा",
                desc:
                  language === "en"
                    ? "Classes in both Hindi & English — no child is left behind due to language."
                    : "हिन्दी और अंग्रेजी दोनों में कक्षाएं - भाषा के कारण कोई भी बच्चा पीछे न रहे.",
              },
              {
                icon: ShieldCheck,
                color: "text-amber-600 bg-amber-50",
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
                  className={`flex gap-4 items-start p-4 bg-neutral-light border border-border rounded-2xl reveal-on-scroll reveal-fade-up ${delays[i]}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${p.color}`}
                  >
                    <Icon className="w-5 h-5" />
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

      {loading ? (
        <div className="py-10 text-center text-xs text-neutral-body italic">
          {language === "en"
            ? "Loading campus life gallery..."
            : "गैलरी लोड हो रही है..."}
        </div>
      ) : previewGallery.length > 0 ? (
        <section className="py-10 bg-white border-b border-border text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-5 reveal-on-scroll reveal-fade-up">
              <div className="flex items-center gap-3">
                <div className="h-1 w-10 bg-accent rounded-full" />
                <h2 className="text-xl font-black text-neutral-dark">
                  {language === "en"
                    ? "Life at Nav Jeevan"
                    : "नव जीवन में जीवन के रंग"}
                </h2>
              </div>
              <Link
                href="/gallery"
                className="flex items-center gap-1 text-xs font-bold text-primary hover:underline shrink-0"
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

      <section className="py-10 bg-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5 reveal-on-scroll reveal-fade-up">
            <div className="h-1 w-10 bg-primary rounded-full" />
            <h2 className="text-xl font-black text-neutral-dark">
              {language === "en" ? "Get in Touch" : "संपर्क में रहें"}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <a
              href="tel:+919889897057"
              className="flex items-center gap-3 flex-1 p-4 border border-border rounded-2xl hover:border-primary/30 hover:bg-neutral-light transition-all reveal-on-scroll reveal-fade-right delay-100"
            >
              <div className="p-2.5 bg-primary-light rounded-xl text-primary shrink-0">
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
              className="flex items-center gap-3 flex-1 p-4 border border-primary/20 bg-primary-light rounded-2xl hover:bg-primary/15 transition-all reveal-on-scroll reveal-fade-left delay-200"
            >
              <div className="p-2.5 bg-primary/15 rounded-xl text-primary shrink-0">
                <ArrowRight className="w-5 h-5" />
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
    </div>
  );
}
