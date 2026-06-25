"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";
import SectionHeading from "@/components/SectionHeading";
import { Download, FileCheck, AlertTriangle, Calendar, Gift, Percent, Clock, Megaphone, Compass, ClipboardCheck, Receipt, Send, Star, ArrowRight, CheckCircle2, GraduationCap, BookOpen, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import {
  admissionSteps,
  ageEligibility,
  requiredDocuments,
  subsidizedFees,
} from "@/lib/data/admissions";

export default function Admissions() {
  const { language } = useLanguage();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState("eligibility");
  const [feeStudentType, setFeeStudentType] = useState<"new" | "old">("new");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    contactNumber: "",
    whatsappNumber: "",
    desiredClass: "Nursery",
    medium: "English Medium",
    comments: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.studentName ||
      !formData.fatherName ||
      !formData.contactNumber ||
      !formData.desiredClass
    ) {
      toast.error(
        language === "en"
          ? "Please fill out all required fields."
          : "कृपया सभी आवश्यक फ़ील्ड भरें।"
      );
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(
          language === "en"
            ? "Your inquiry was submitted successfully!"
            : "आपकी पूछताछ सफलतापूर्वक सबमिट हो गई है!"
        );
        setFormData({
          studentName: "",
          fatherName: "",
          contactNumber: "",
          whatsappNumber: "",
          desiredClass: "Nursery",
          medium: "English Medium",
          comments: "",
        });
      } else {
        throw new Error(data.error || "Submission failed");
      }
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : (language === "en"
              ? "Failed to submit inquiry. Please try again."
              : "पूछताछ सबमिट करने में विफल। कृपया पुन: प्रयास करें।");
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    {
      id: "eligibility",
      labelEn: "Eligibility & Checklist",
      labelHi: "पात्रता एवं दस्तावेज़",
      icon: ClipboardCheck,
    },
    {
      id: "fees",
      labelEn: "Fees & Installments",
      labelHi: "शुल्क एवं किस्त विवरण",
      icon: Receipt,
    },
    {
      id: "process",
      labelEn: "Admission Process",
      labelHi: "प्रवेश प्रक्रिया",
      icon: Compass,
    },
    {
      id: "apply",
      labelEn: "Admission Enquiry",
      labelHi: "प्रवेश पूछताछ",
      icon: Send,
    },
  ];

  return (
    <div className="py-0 bg-white flex-1 animate-fade-in-up">

      {/* ──────────── HERO BANNER ──────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#2a1e3a] to-[#0F172A] text-white py-10 sm:py-16 md:py-24 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/15 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

        {/* Floating icons */}
        <div className="absolute top-12 right-[12%] opacity-10 animate-float-slow pointer-events-none hidden md:block">
          <GraduationCap className="w-14 h-14" />
        </div>
        <div className="absolute bottom-12 right-[22%] opacity-10 animate-float pointer-events-none hidden md:block">
          <BookOpen className="w-10 h-10" />
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left">
            <span className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] uppercase font-black text-white/90 bg-white/10 border border-white/15 px-3 sm:px-4 py-1.5 rounded-full tracking-widest mb-3 sm:mb-5 select-none backdrop-blur-sm">
              <Star className="w-3 h-3 text-accent" />
              {language === "en"
                ? "Admission Session 2026 - 2027 is open"
                : "प्रवेश सत्र 2026 - 2027 खुला है"}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black tracking-tight leading-[1.1] mb-3 sm:mb-5">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {t.admissions.bannerTitle}
              </span>
            </h1>
            <p className="hidden sm:block text-sm sm:text-base text-white/60 leading-relaxed font-medium max-w-2xl">
              {t.admissions.bannerDesc}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">

        {/* ──────────── TAB NAVIGATION ──────────── */}
        <div className="mb-6 sm:mb-12 relative">
          {/* Mobile: compact grid of 4 tabs */}
          <div className="grid grid-cols-4 gap-1.5 sm:hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-col items-center gap-1 px-1.5 py-2.5 rounded-xl font-bold text-[10px] transition-all cursor-pointer focus:outline-none border ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/15"
                      : "bg-neutral-light text-neutral-body border-border"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-neutral-body"}`} />
                  <span className="leading-tight text-center">
                    {tab.id === "process" ? (language === "en" ? "Process" : "प्रक्रिया") :
                     tab.id === "eligibility" ? (language === "en" ? "Eligibility" : "पात्रता") :
                     tab.id === "fees" ? (language === "en" ? "Fees" : "शुल्क") :
                     (language === "en" ? "Enquiry" : "पूछताछ")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop: full horizontal tabs */}
          <div className="hidden sm:flex overflow-x-auto scrollbar-none gap-2 pb-1 flex-nowrap select-none hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer focus:outline-none shrink-0 border ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/15"
                      : "bg-neutral-light text-neutral-body border-border hover:text-neutral-dark hover:border-neutral-body/30 hover:bg-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-neutral-body"}`} />
                  <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="text-xs sm:text-[13px]">{language === "en" ? tab.labelEn : tab.labelHi}</span>
                    <span className={`text-[8px] uppercase tracking-wider font-semibold ${isActive ? "text-white/60" : "opacity-50"}`}>
                      {language === "en" ? tab.labelHi : tab.labelEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ──────────── TAB 1: ADMISSION PROCESS ──────────── */}
        {activeTab === "process" && (
          <div className="animate-fade-in-up flex flex-col gap-6 sm:gap-12">

            {/* Steps Section */}
            <section className="text-left">
              <SectionHeading
                title={
                  language === "en"
                    ? "Our Admission Process"
                    : "हमारी प्रवेश प्रक्रिया"
                }
                subtitle={
                  language === "en"
                    ? "A transparent, simple, and step-by-step pipeline to join our educational community."
                    : "हमारे शैक्षणिक परिवार में शामिल होने के लिए एक पारदर्शी, सरल और चरण-दर-चरण प्रक्रिया।"
                }
              />

              {/* Timeline Steps — compact list on mobile, grid on desktop */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {admissionSteps.map((step, idx) => (
                  <div
                    key={step.num}
                    className="relative bg-surface border border-border p-6 rounded-2xl shadow-xs card-hover-lift flex flex-col gap-4 group overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-primary/10" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 font-black text-sm border border-primary/15 group-hover:bg-primary group-hover:text-white transition-colors">
                        {step.num}
                      </div>
                      {idx < admissionSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-[2.6rem] right-[-1.5rem] z-10">
                          <ArrowRight className="w-4 h-4 text-border" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-extrabold text-neutral-dark leading-tight">
                      {step.title[language]}
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed font-normal">
                      {step.desc[language]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile: compact numbered list */}
              <div className="flex flex-col gap-2.5 mt-5 sm:hidden">
                {admissionSteps.map((step) => (
                  <div
                    key={step.num}
                    className="flex items-center gap-3 bg-surface border border-border px-4 py-3 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 font-black text-xs border border-primary/15">
                      {step.num}
                    </div>
                    <h3 className="text-xs font-extrabold text-neutral-dark leading-tight">
                      {step.title[language]}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            {/* View/Download Admission Form Card */}
            {/* Offline Application Card — compact on mobile */}
            <div className="relative bg-gradient-to-r from-neutral-light to-white border border-border p-4 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-8 text-left shadow-xs overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary/20" />

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-start flex-1 w-full">
                {/* Visual Image Preview — hidden on mobile */}
                <div 
                  onClick={() => setIsViewerOpen(true)}
                  className="hidden sm:block relative w-28 h-38 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:border-primary/40 group transition-all shrink-0 select-none"
                >
                  <Image
                    src="/admissionForm.png"
                    alt="Admission Form Preview"
                    fill
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-300"
                    sizes="112px"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black/60 px-2.5 py-1.5 rounded-md flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                      {language === "en" ? "Preview" : "पूर्वावलोकन"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-2.5">
                  <span className="text-[9px] uppercase font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full tracking-wider w-fit">
                    {language === "en" ? "Offline Application" : "ऑफलाइन आवेदन"}
                  </span>
                  <h4 className="text-sm sm:text-lg font-serif font-black text-neutral-dark leading-snug">
                    {language === "en" ? "Official Print-Ready Admission Form" : "आधिकारिक प्रिंट-योग्य प्रवेश फॉर्म"}
                  </h4>
                  <p className="hidden sm:block text-xs text-neutral-body font-medium leading-relaxed">
                    {language === "en"
                      ? "Download and print the offline admission form to fill out and submit directly at the school office counter in Khabharabhar."
                      : "खबरभार स्थित विद्यालय कार्यालय काउंटर पर सीधे जमा करने के लिए ऑफलाइन प्रवेश फॉर्म डाउनलोड और प्रिंट करें।"}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
                    <button
                      onClick={() => setIsViewerOpen(true)}
                      className="px-4 sm:px-5 py-2.5 bg-neutral-dark hover:bg-neutral-dark/95 text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ClipboardCheck className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "View Form" : "फॉर्म देखें"}</span>
                    </button>
                    <a
                      href="/admissionForm.png"
                      download="Nav_Jeevan_Public_School_Admission_Form.png"
                      className="px-4 sm:px-5 py-2.5 bg-white hover:bg-neutral-light border border-gray-300 text-neutral-dark text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "Download PNG" : "डाउनलोड करें (PNG)"}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action CTA card */}
            {/* Quick Action CTA — compact on mobile */}
            <div className="relative bg-gradient-to-r from-primary/8 via-accent/8 to-primary/5 border border-primary/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6 text-left overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-neutral-dark leading-snug">
                  {language === "en" ? "Ready to begin the enrollment process?" : "प्रवेश प्रक्रिया शुरू करने के लिए तैयार हैं?"}
                </h4>
                <p className="hidden sm:block text-xs text-neutral-body mt-1 font-medium">
                  {language === "en"
                    ? "Submit your inquiry form online, and our admissions team will contact you within 24 hours."
                    : "अपना पूछताछ फ़ॉर्म ऑनलाइन जमा करें, और हमारी प्रवेश टीम 24 घंटे के भीतर आपसे संपर्क करेगी।"}
                </p>
              </div>
              <button
                onClick={() => setActiveTab("apply")}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-black rounded-xl shadow-lg shadow-primary/15 transition-all whitespace-nowrap cursor-pointer select-none shrink-0 flex items-center justify-center gap-2"
              >
                <span>{language === "en" ? "Submit Online Enquiry" : "ऑनलाइन पूछताछ सबमिट करें"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ──────────── TAB 2: ELIGIBILITY & CHECKLIST ──────────── */}
        {activeTab === "eligibility" && (
          <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start text-left">
            {/* Age Eligibility */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <SectionHeading
                title={t.admissions.criteriaTitle}
                subtitle={t.admissions.criteriaSubtitle}
              />

              {/* Desktop: full table */}
              <div className="hidden sm:block overflow-x-auto border border-border rounded-2xl shadow-xs bg-white mt-2">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-neutral-light to-white border-b border-border text-neutral-dark font-extrabold text-xs uppercase">
                      <th className="p-4 font-bold">
                        {language === "en" ? "Class Offered" : "कक्षा"}
                      </th>
                      <th className="p-4 font-bold">
                        {t.admissions.ageRequirement}
                      </th>
                      <th className="p-4 font-bold">
                        {language === "en" ? "Key Criteria" : "मुख्य पात्रता"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-neutral-body font-normal">
                    {ageEligibility.map((el, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-primary/[0.02] transition-colors"
                      >
                        <td className="p-4 font-extrabold text-neutral-dark whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {el.class}
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-primary whitespace-nowrap">
                          {el.age}
                        </td>
                        <td className="p-4 leading-relaxed">
                          {el.criteria[language]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile: simple stacked cards */}
              <div className="flex flex-col gap-2.5 mt-2 sm:hidden">
                {ageEligibility.map((el, idx) => (
                  <div key={idx} className="bg-surface border border-border rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold text-neutral-dark flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {el.class}
                      </span>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {el.age}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-body leading-relaxed font-normal">
                      {el.criteria[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Checklist Card */}
            <div className="lg:col-span-5 bg-surface border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs">
              <div className="bg-gradient-to-r from-accent/5 to-primary/5 p-4 sm:p-6 border-b border-border">
                <h3 className="text-base sm:text-lg font-extrabold text-neutral-dark flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  {t.admissions.checkTitle}
                </h3>
                <p className="hidden sm:block text-xs text-neutral-body leading-relaxed font-normal mt-2">
                  {t.admissions.checkSubtitle}
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <ul className="flex flex-col gap-2.5 sm:gap-3.5 text-xs text-neutral-body leading-relaxed">
                  {requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex gap-2.5 sm:gap-3 items-start font-medium group/doc">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5 select-none group-hover/doc:bg-accent group-hover/doc:text-white transition-colors">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span className="text-[11px] sm:text-xs">{doc[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ──────────── TAB 3: FEES & INSTALLMENTS ──────────── */}
        {activeTab === "fees" && (
          <div className="animate-fade-in-up flex flex-col gap-5 sm:gap-8 text-left">
            
            {/* Yearly Fees Statement Card */}
            <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-md">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2a1e3a] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-bold bg-accent text-white px-3 py-1 rounded-lg tracking-wider inline-block mb-2.5 select-none shadow-sm">
                    {language === "en" ? "Yearly Fees Statement" : "वार्षिक शुल्क विवरण"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-none">
                    NAV JEEVAN PUBLIC SCHOOL
                  </h3>
                  <p className="text-xs text-white/50 mt-1.5 font-medium uppercase tracking-wide">
                    Khabharabhar, Kushinagar-274301
                  </p>
                </div>
                <div className="sm:text-right shrink-0 relative z-10">
                  <span className="text-sm font-extrabold bg-white/10 px-5 py-2.5 rounded-xl backdrop-blur-sm border border-white/10 inline-block">
                    {language === "en" ? "Session: 2026-27" : "सत्र: 2026-27"}
                  </span>
                </div>
              </div>

              {/* Mobile: Detailed Installments Layout */}
              <div className="sm:hidden p-4 flex flex-col gap-4">
                {/* Student Type Selector Toggle */}
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setFeeStudentType("new")}
                    className={`py-2 text-xs font-black rounded-lg transition-all ${
                      feeStudentType === "new"
                        ? "bg-white text-emerald-800 shadow-xs border border-emerald-100"
                        : "text-neutral-body hover:text-neutral-dark"
                    }`}
                  >
                    {language === "en" ? "New Admission" : "नया प्रवेश"}
                  </button>
                  <button
                    onClick={() => setFeeStudentType("old")}
                    className={`py-2 text-xs font-black rounded-lg transition-all ${
                      feeStudentType === "old"
                        ? "bg-white text-slate-800 shadow-xs border border-slate-100"
                        : "text-neutral-body hover:text-neutral-dark"
                    }`}
                  >
                    {language === "en" ? "Existing Student" : "पुराना छात्र"}
                  </button>
                </div>

                {/* 1st Installment Card */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-[#1A1A2E]/5 px-4 py-3 border-b border-border flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#1A1A2E]/10 text-[#1A1A2E] flex items-center justify-center font-bold text-[10px]">
                        1
                      </div>
                      <span className="font-serif font-black text-xs text-neutral-dark">
                        {language === "en" ? "1st Installment" : "प्रथम किस्त"}
                      </span>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {language === "en" ? "Due: Apr 25" : "अंतिम तिथि: 25 अप्रैल"}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    {/* Nursery to V */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[11px] font-black text-emerald-800 tracking-wide uppercase">
                          {language === "en" ? "Nursery to Class V" : "नर्सरी से कक्षा V"}
                        </h5>
                        <span className="text-[10px] font-bold text-neutral-dark">
                          ₹{feeStudentType === "new" ? "2,050" : "1,600"} Total
                        </span>
                      </div>
                      <div className="bg-emerald-50/20 border border-emerald-100/40 rounded-xl p-3 text-[11px] text-neutral-body flex flex-col gap-1.5 font-semibold">
                        <div className="flex justify-between">
                          <span>{language === "en" ? "Admission/Promotion" : "प्रवेश/उन्नयन शुल्क"}</span>
                          <span className="text-neutral-dark">₹{feeStudentType === "new" ? "1,000" : "550"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "April Tuition" : "अप्रैल शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "May Tuition" : "मई शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "June Tuition" : "जून शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-border" />

                    {/* Class VI to VIII */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[11px] font-black text-blue-800 tracking-wide uppercase">
                          {language === "en" ? "Class VI to VIII" : "कक्षा VI से VIII"}
                        </h5>
                        <span className="text-[10px] font-bold text-neutral-dark">
                          ₹{feeStudentType === "new" ? "2,200" : "1,750"} Total
                        </span>
                      </div>
                      <div className="bg-blue-50/20 border border-blue-100/40 rounded-xl p-3 text-[11px] text-neutral-body flex flex-col gap-1.5 font-semibold">
                        <div className="flex justify-between">
                          <span>{language === "en" ? "Admission/Promotion" : "प्रवेश/उन्नयन शुल्क"}</span>
                          <span className="text-neutral-dark">₹{feeStudentType === "new" ? "1,000" : "550"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "April Tuition" : "अप्रैल शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "May Tuition" : "मई शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "June Tuition" : "जून शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2nd Installment Card */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-[#1A1A2E]/5 px-4 py-3 border-b border-border flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#1A1A2E]/10 text-[#1A1A2E] flex items-center justify-center font-bold text-[10px]">
                        2
                      </div>
                      <span className="font-serif font-black text-xs text-neutral-dark">
                        {language === "en" ? "2nd Installment" : "द्वितीय किस्त"}
                      </span>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {language === "en" ? "Due: Jul 25" : "अंतिम तिथि: 25 जुलाई"}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    {/* Nursery to V */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[11px] font-black text-emerald-800 tracking-wide uppercase">
                          {language === "en" ? "Nursery to Class V" : "नर्सरी से कक्षा V"}
                        </h5>
                        <span className="text-[10px] font-bold text-neutral-dark">₹1,400 Total</span>
                      </div>
                      <div className="bg-emerald-50/20 border border-emerald-100/40 rounded-xl p-3 text-[11px] text-neutral-body flex flex-col gap-1.5 font-semibold">
                        <div className="flex justify-between">
                          <span>{language === "en" ? "July Tuition" : "जुलाई शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "August Tuition" : "अगस्त शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "September Tuition" : "सितंबर शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "Examination Fee" : "परीक्षा शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-border" />

                    {/* Class VI to VIII */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[11px] font-black text-blue-800 tracking-wide uppercase">
                          {language === "en" ? "Class VI to VIII" : "कक्षा VI से VIII"}
                        </h5>
                        <span className="text-[10px] font-bold text-neutral-dark">₹1,550 Total</span>
                      </div>
                      <div className="bg-blue-50/20 border border-blue-100/40 rounded-xl p-3 text-[11px] text-neutral-body flex flex-col gap-1.5 font-semibold">
                        <div className="flex justify-between">
                          <span>{language === "en" ? "July Tuition" : "जुलाई शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "August Tuition" : "अगस्त शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "September Tuition" : "सितंबर शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "Examination Fee" : "परीक्षा शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3rd Installment Card */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-[#1A1A2E]/5 px-4 py-3 border-b border-border flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#1A1A2E]/10 text-[#1A1A2E] flex items-center justify-center font-bold text-[10px]">
                        3
                      </div>
                      <span className="font-serif font-black text-xs text-neutral-dark">
                        {language === "en" ? "3rd Installment" : "तृतीय किस्त"}
                      </span>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {language === "en" ? "Due: Oct 25" : "अंतिम तिथि: 25 अक्टूबर"}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    {/* Nursery to V */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[11px] font-black text-emerald-800 tracking-wide uppercase">
                          {language === "en" ? "Nursery to Class V" : "नर्सरी से कक्षा V"}
                        </h5>
                        <span className="text-[10px] font-bold text-neutral-dark">₹1,400 Total</span>
                      </div>
                      <div className="bg-emerald-50/20 border border-emerald-100/40 rounded-xl p-3 text-[11px] text-neutral-body flex flex-col gap-1.5 font-semibold">
                        <div className="flex justify-between">
                          <span>{language === "en" ? "October Tuition" : "अक्टूबर शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "November Tuition" : "नवंबर शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "December Tuition" : "दिसंबर शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "Examination Fee" : "परीक्षा शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-border" />

                    {/* Class VI to VIII */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[11px] font-black text-blue-800 tracking-wide uppercase">
                          {language === "en" ? "Class VI to VIII" : "कक्षा VI से VIII"}
                        </h5>
                        <span className="text-[10px] font-bold text-neutral-dark">₹1,550 Total</span>
                      </div>
                      <div className="bg-blue-50/20 border border-blue-100/40 rounded-xl p-3 text-[11px] text-neutral-body flex flex-col gap-1.5 font-semibold">
                        <div className="flex justify-between">
                          <span>{language === "en" ? "October Tuition" : "अक्टूबर शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "November Tuition" : "नवंबर शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "December Tuition" : "दिसंबर शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "Examination Fee" : "परीक्षा शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4th Installment Card */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-[#1A1A2E]/5 px-4 py-3 border-b border-border flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#1A1A2E]/10 text-[#1A1A2E] flex items-center justify-center font-bold text-[10px]">
                        4
                      </div>
                      <span className="font-serif font-black text-xs text-neutral-dark">
                        {language === "en" ? "4th Installment" : "चतुर्थ किस्त"}
                      </span>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {language === "en" ? "Due: Jan 25" : "अंतिम तिथि: 25 जनवरी"}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    {/* Nursery to V */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[11px] font-black text-emerald-800 tracking-wide uppercase">
                          {language === "en" ? "Nursery to Class V" : "नर्सरी से कक्षा V"}
                        </h5>
                        <span className="text-[10px] font-bold text-neutral-dark">₹1,050 Total</span>
                      </div>
                      <div className="bg-emerald-50/20 border border-emerald-100/40 rounded-xl p-3 text-[11px] text-neutral-body flex flex-col gap-1.5 font-semibold">
                        <div className="flex justify-between">
                          <span>{language === "en" ? "January Tuition" : "जनवरी शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "February Tuition" : "फरवरी शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "March Tuition" : "मार्च शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹350</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-border" />

                    {/* Class VI to VIII */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-[11px] font-black text-blue-800 tracking-wide uppercase">
                          {language === "en" ? "Class VI to VIII" : "कक्षा VI से VIII"}
                        </h5>
                        <span className="text-[10px] font-bold text-neutral-dark">₹1,200 Total</span>
                      </div>
                      <div className="bg-blue-50/20 border border-blue-100/40 rounded-xl p-3 text-[11px] text-neutral-body flex flex-col gap-1.5 font-semibold">
                        <div className="flex justify-between">
                          <span>{language === "en" ? "January Tuition" : "जनवरी शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "February Tuition" : "फरवरी शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === "en" ? "March Tuition" : "मार्च शिक्षण शुल्क"}</span>
                          <span className="text-neutral-dark">₹400</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grand Total Comparison Card */}
                <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2a1e3a] text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                  <span className="text-[9px] uppercase font-bold bg-accent text-white px-2 py-0.5 rounded tracking-wider inline-block mb-2 z-10 relative">
                    {language === "en" ? "Annual Grand Total" : "कुल वार्षिक शुल्क"}
                  </span>
                  <div className="grid grid-cols-2 gap-3 z-10 relative">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                      <span className="text-[9px] uppercase tracking-wide text-white/60 font-bold block">Nursery to V</span>
                      <span className="text-xs font-black text-emerald-400 mt-1 block">
                        ₹{feeStudentType === "new" ? "5,900" : "5,450"}{language === "en" ? " / Year" : " / वर्ष"}
                      </span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                      <span className="text-[9px] uppercase tracking-wide text-white/60 font-bold block">Class VI to VIII</span>
                      <span className="text-xs font-black text-blue-400 mt-1 block">
                        ₹{feeStudentType === "new" ? "6,500" : "6,050"}{language === "en" ? " / Year" : " / वर्ष"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Full Table */}
              <div className="hidden sm:block p-4 sm:p-6 overflow-x-auto">
                <div className="min-w-[680px]">
                  <table className="w-full text-center border-collapse border border-gray-200 text-xs sm:text-sm font-semibold">
                    <thead>
                      <tr className="bg-neutral-light border-b border-gray-200 text-neutral-dark text-xs uppercase tracking-wide font-extrabold select-none">
                        <th colSpan={2} className="p-3 border border-gray-200 font-black">
                          {language === "en" ? "Installment & Details" : "किस्त एवं विवरण"}
                        </th>
                        <th colSpan={2} className="p-3 border border-gray-200 font-black text-center bg-emerald-50/30 text-emerald-900">
                          {language === "en" ? "NUR.- To - Vth" : "नर्सरी से कक्षा V"}
                        </th>
                        <th colSpan={2} className="p-3 border border-gray-200 font-black text-center bg-blue-50/30 text-blue-900">
                          {language === "en" ? "VI - To - VIII" : "कक्षा VI से VIII"}
                        </th>
                      </tr>
                      <tr className="bg-neutral-light/50 border-b border-gray-200 text-neutral-body text-[10px] uppercase font-bold select-none">
                        <th colSpan={2} className="p-2.5 border border-gray-200"></th>
                        <th className="p-2.5 border border-gray-200 bg-emerald-50/15 text-emerald-800 font-extrabold">{language === "en" ? "NEW" : "नए छात्र"}</th>
                        <th className="p-2.5 border border-gray-200 text-neutral-dark font-extrabold">{language === "en" ? "OLD" : "पुराने छात्र"}</th>
                        <th className="p-2.5 border border-gray-200 bg-blue-50/15 text-blue-800 font-extrabold">{language === "en" ? "NEW" : "नए छात्र"}</th>
                        <th className="p-2.5 border border-gray-200 text-neutral-dark font-extrabold">{language === "en" ? "OLD" : "पुराने छात्र"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 text-neutral-body">
                      
                      {/* 1st Installment */}
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td rowSpan={5} className="p-3 border border-gray-200 bg-neutral-light/35 font-bold uppercase tracking-wider text-[10px] text-neutral-dark select-none align-middle font-serif">
                          <span className="inline-block whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                            {language === "en" ? "1st Installment" : "प्रथम किस्त"}
                          </span>
                        </td>
                        <td className="p-2.5 border border-gray-200 text-left font-bold text-neutral-dark">
                          {language === "en" ? "Admission/Promotion" : "प्रवेश/उन्नयन शुल्क"}
                        </td>
                        <td className="p-2.5 border border-gray-200 font-black text-emerald-700 bg-emerald-50/5">1000</td>
                        <td className="p-2.5 border border-gray-200 font-bold text-neutral-dark">550</td>
                        <td className="p-2.5 border border-gray-200 font-black text-blue-700 bg-blue-50/5">1000</td>
                        <td className="p-2.5 border border-gray-200 font-bold text-neutral-dark">550</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "April" : "अप्रैल"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "May" : "मई"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "June" : "जून"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="bg-neutral-light/50 font-extrabold text-neutral-dark">
                        <td className="p-2.5 border border-gray-200 text-left font-black tracking-wide uppercase text-[10px] text-neutral-body">
                          {language === "en" ? "1st Inst. Total" : "प्रथम किस्त योग"}
                        </td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-emerald-800">2050</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1600</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-blue-800">2200</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1750</td>
                      </tr>

                      {/* 2nd Installment */}
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td rowSpan={5} className="p-3 border border-gray-200 bg-neutral-light/35 font-bold uppercase tracking-wider text-[10px] text-neutral-dark select-none align-middle font-serif">
                          <span className="inline-block whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                            {language === "en" ? "2nd Installment" : "द्वितीय किस्त"}
                          </span>
                        </td>
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "July" : "जुलाई"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "August" : "अगस्त"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "September" : "सितंबर"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left font-bold text-neutral-dark">
                          {language === "en" ? "Examination Fee" : "परीक्षा शुल्क"}
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                      </tr>
                      <tr className="bg-neutral-light/50 font-extrabold text-neutral-dark">
                        <td className="p-2.5 border border-gray-200 text-left font-black tracking-wide uppercase text-[10px] text-neutral-body">
                          {language === "en" ? "2nd Inst. Total" : "द्वितीय किस्त योग"}
                        </td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-emerald-800">1400</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1400</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-blue-800">1550</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1550</td>
                      </tr>

                      {/* 3rd Installment */}
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td rowSpan={5} className="p-3 border border-gray-200 bg-neutral-light/35 font-bold uppercase tracking-wider text-[10px] text-neutral-dark select-none align-middle font-serif">
                          <span className="inline-block whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                            {language === "en" ? "3rd Installment" : "तृतीय किस्त"}
                          </span>
                        </td>
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "October" : "अक्टूबर"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "November" : "नवंबर"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "December" : "दिसंबर"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left font-bold text-neutral-dark">
                          {language === "en" ? "Examination Fee" : "परीक्षा शुल्क"}
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                      </tr>
                      <tr className="bg-neutral-light/50 font-extrabold text-neutral-dark">
                        <td className="p-2.5 border border-gray-200 text-left font-black tracking-wide uppercase text-[10px] text-neutral-body">
                          {language === "en" ? "3rd Inst. Total" : "तृतीय किस्त योग"}
                        </td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-emerald-800">1400</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1400</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-blue-800">1550</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1550</td>
                      </tr>

                      {/* 4th Installment */}
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td rowSpan={4} className="p-3 border border-gray-200 bg-neutral-light/35 font-bold uppercase tracking-wider text-[10px] text-neutral-dark select-none align-middle font-serif">
                          <span className="inline-block whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                            {language === "en" ? "4th Installment" : "चतुर्थ किस्त"}
                          </span>
                        </td>
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "January" : "जनवरी"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "February" : "फरवरी"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="hover:bg-neutral-light/5 transition-colors">
                        <td className="p-2.5 border border-gray-200 text-left flex justify-between items-center text-xs font-medium">
                          <span>{language === "en" ? "March" : "मार्च"}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">{language === "en" ? "Fee" : "शुल्क"}</span>
                        </td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">350</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                        <td className="p-2.5 border border-gray-200">400</td>
                      </tr>
                      <tr className="bg-neutral-light/50 font-extrabold text-neutral-dark">
                        <td className="p-2.5 border border-gray-200 text-left font-black tracking-wide uppercase text-[10px] text-neutral-body">
                          {language === "en" ? "4th Inst. Total" : "चतुर्थ किस्त योग"}
                        </td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-emerald-800">1050</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1050</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-blue-800">1200</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1200</td>
                      </tr>

                      {/* Total Fees Row */}
                      <tr className="bg-[#1A1A2E] text-white font-black text-xs sm:text-sm">
                        <td colSpan={2} className="p-3.5 border border-[#1A1A2E] text-left uppercase tracking-wider font-extrabold">
                          {language === "en" ? "Total Fees (Annual Sum)" : "कुल योग (कुल वार्षिक शुल्क)"}
                        </td>
                        <td className="p-3.5 border border-[#1A1A2E] text-center bg-emerald-600/90 text-white text-sm sm:text-base font-black">5900</td>
                        <td className="p-3.5 border border-[#1A1A2E] text-center text-neutral-light/80 text-sm sm:text-base font-black">5450</td>
                        <td className="p-3.5 border border-[#1A1A2E] text-center bg-blue-600/90 text-white text-sm sm:text-base font-black">6500</td>
                        <td className="p-3.5 border border-[#1A1A2E] text-center text-neutral-light/80 text-sm sm:text-base font-black">6050</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Notice Board — compact on mobile */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs">
              <div className="flex items-center gap-3 sm:gap-3.5 p-4 sm:p-8 border-b border-amber-200/60 bg-gradient-to-r from-amber-50/80 to-amber-100/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-600/10 text-amber-600 flex items-center justify-center shrink-0 shadow-sm border border-amber-200/50">
                  <Megaphone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-lg font-serif font-black text-amber-900 tracking-tight leading-none">
                    {language === "en"
                      ? "Official Notice & Fee Guidelines"
                      : "आवश्यक निर्देश"}
                  </h4>
                  <p className="block text-xs text-amber-800/70 font-semibold mt-1.5">
                    {language === "en"
                      ? "Please read the following guidelines regarding payment schedules and concessions carefully."
                      : "कृपया भुगतान अनुसूची और रियायतों के संबंध में निम्नलिखित दिशानिर्देशों को ध्यानपूर्वक पढ़ें।"}
                  </p>
                </div>
              </div>

              {/* Guidelines Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 p-4 sm:p-8 text-xs sm:text-sm">
                
                {/* 1. Installments Card */}
                <div className="bg-white/80 p-5 rounded-2xl border border-amber-200/50 shadow-xs flex gap-3.5 items-start card-hover-lift">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 mt-0.5 shrink-0">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-amber-950 mb-1 leading-tight">
                      {language === "en" ? "Installment Due Dates" : "किस्त भुगतान अवधि"}
                    </h5>
                    <p className="font-medium text-amber-900/90 leading-relaxed text-[11px] sm:text-xs">
                      {language === "en"
                        ? "It is mandatory to deposit the fee of each installment by the 25th of its first month."
                        : "प्रत्येक Installment का शुल्क उसके प्रथम माह के 25 तारीख तक जमा करना अनिवार्य है।"}
                    </p>
                  </div>
                </div>

                {/* 2. School Kit */}
                <div className="flex bg-white/80 p-5 rounded-2xl border border-amber-200/50 shadow-xs gap-3.5 items-start card-hover-lift">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 mt-0.5 shrink-0">
                    <Gift className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-amber-950 mb-1 leading-tight">
                      {language === "en" ? "Complimentary School Kit" : "निःशुल्क स्कूल सामग्री (किट)"}
                    </h5>
                    <p className="font-medium text-amber-900/90 leading-relaxed text-[11px] sm:text-xs">
                      {language === "en"
                        ? "New Admission students will receive a free school kit including a school Tie, Belt, ID Card, and Diary (I-to-VIII)."
                        : "New Admission पर टाई, बेल्ट, आई -कार्ड, डायरी (I-to-VIII) दिया जायेगा।"}
                    </p>
                  </div>
                </div>

                {/* 3. Concession Rules */}
                <div className="flex bg-white/80 p-5 rounded-2xl border border-amber-200/50 shadow-xs gap-3.5 items-start md:col-span-2 card-hover-lift">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 mt-0.5 shrink-0">
                    <Percent className="w-4.5 h-4.5" />
                  </div>
                  <div className="w-full">
                    <h5 className="font-extrabold text-amber-950 mb-1 leading-tight">
                      {language === "en" ? "Admission Fee Concessions" : "शुल्क रियायत नियम"}
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-medium text-amber-900/90 text-[11px] sm:text-xs mt-3">
                      <li className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/40">
                        <span className="font-bold block text-amber-950">
                          {language === "en" ? "3 New Admissions" : "3 New Admission पर"}
                        </span>
                        {language === "en" ? "Up to ₹1,000 concession" : "1000 रू तक का शुल्क माफ़ किया जायेगा।"}
                      </li>
                      <li className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/40">
                        <span className="font-bold block text-amber-950">
                          {language === "en" ? "3 Admissions (New/Old)" : "3 New/Old Admission पर"}
                        </span>
                        {language === "en" ? "Up to ₹500 concession" : "500 रू तक का शुल्क माफ़ किया जायेगा।"}
                      </li>
                      <li className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/40">
                        <span className="font-bold block text-amber-950">
                          {language === "en" ? "4 Admissions (New/Old)" : "4 New/Old Admission पर"}
                        </span>
                        {language === "en" ? "Up to ₹1,000 concession" : "1000 रू तक का शुल्क माफ़ किया जायेगा।"}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 4. Late Fine */}
                <div className="bg-white/80 p-5 rounded-2xl border border-amber-200/50 shadow-xs flex gap-3.5 items-start md:col-span-2 card-hover-lift">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-700 mt-0.5 shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-rose-950 mb-1 leading-tight flex items-center gap-1.5">
                      {language === "en" ? "Late Payment Fine" : "विलंब शुल्क"}
                    </h5>
                    <p className="font-medium text-rose-900/90 leading-relaxed text-[11px] sm:text-xs">
                      {language === "en"
                        ? "A late payment fine of ₹100 is strictly applicable for payments made after the 25th of the installment month."
                        : "निर्धारित तिथि के बाद शुल्क जमा करने पर 100रु विलम्ब शुल्क जमा करना होगा।"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ──────────── TAB 4: ONLINE INQUIRY FORM ──────────── */}
        {activeTab === "apply" && (
          <div className="animate-fade-in-up">
            <div className="max-w-3xl mx-auto">
              {/* Form header */}
              <div className="text-center mb-5 sm:mb-8">
                <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-primary/10 text-primary items-center justify-center mx-auto mb-4 border border-primary/15">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-neutral-dark">
                  {language === "en" ? "Submit Admission Enquiry" : "प्रवेश पूछताछ सबमिट करें"}
                </h3>
                <p className="hidden sm:block text-xs text-neutral-body mt-2 font-medium max-w-md mx-auto">
                  {language === "en"
                    ? "Fill in the details below and our admissions team will contact you within 24 hours."
                    : "नीचे विवरण भरें और हमारी प्रवेश टीम 24 घंटे के भीतर आपसे संपर्क करेगी।"}
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary/20" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="studentName"
                        className="text-xs font-bold text-neutral-dark"
                      >
                        {language === "en"
                          ? "Student's Full Name *"
                          : "छात्र का पूरा नाम *"}
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder={
                          language === "en" ? "e.g., Rajesh Kumar" : "उदा. राजेश कुमार"
                        }
                        className="px-4 py-3.5 rounded-xl border border-border bg-neutral-light/50 text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fatherName"
                        className="text-xs font-bold text-neutral-dark"
                      >
                        {language === "en"
                          ? "Father's / Guardian's Name *"
                          : "पिता / संरक्षक का नाम *"}
                      </label>
                      <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        required
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder={
                          language === "en"
                            ? "e.g., Shri Anil Kumar"
                            : "उदा. श्री अनिल कुमार"
                        }
                        className="px-4 py-3.5 rounded-xl border border-border bg-neutral-light/50 text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contactNumber"
                        className="text-xs font-bold text-neutral-dark"
                      >
                        {language === "en"
                          ? "Contact Phone Number *"
                          : "संपर्क फोन नंबर *"}
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        required
                        pattern="[0-9]{10}"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder={
                          language === "en" ? "e.g., 9889897057" : "उदा. 9889897057"
                        }
                        className="px-4 py-3.5 rounded-xl border border-border bg-neutral-light/50 text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="whatsappNumber"
                        className="text-xs font-bold text-neutral-dark"
                      >
                        {language === "en"
                          ? "WhatsApp Number (Optional)"
                          : "व्हाट्सएप नंबर (वैकल्पिक)"}
                      </label>
                      <input
                        type="tel"
                        id="whatsappNumber"
                        name="whatsappNumber"
                        pattern="[0-9]{10}"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        placeholder={
                          language === "en" ? "e.g., 9415906899" : "उदा. 9415906899"
                        }
                        className="px-4 py-3.5 rounded-xl border border-border bg-neutral-light/50 text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="desiredClass"
                        className="text-xs font-bold text-neutral-dark"
                      >
                        {language === "en"
                          ? "Desired Class for Admission *"
                          : "प्रवेश के लिए वांछित कक्षा *"}
                      </label>
                      <select
                        id="desiredClass"
                        name="desiredClass"
                        required
                        value={formData.desiredClass}
                        onChange={handleChange}
                        className="px-4 py-3.5 rounded-xl border border-border bg-neutral-light/50 text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      >
                        {[
                          "Nursery",
                          "LKG",
                          "UKG",
                          "Class 1",
                          "Class 2",
                          "Class 3",
                          "Class 4",
                          "Class 5",
                          "Class 6",
                          "Class 7",
                          "Class 8",
                        ].map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="medium"
                        className="text-xs font-bold text-neutral-dark"
                      >
                        {language === "en" ? "Preferred Medium *" : "पसंदीदा माध्यम *"}
                      </label>
                      <select
                        id="medium"
                        name="medium"
                        required
                        value={formData.medium}
                        onChange={handleChange}
                        className="px-4 py-3.5 rounded-xl border border-border bg-neutral-light/50 text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      >
                        {[
                          {
                            val: "English Medium",
                            label:
                              language === "en" ? "English Medium" : "अंग्रेजी माध्यम",
                          },
                        ].map((med) => (
                          <option key={med.val} value={med.val}>
                            {med.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="comments"
                      className="text-xs font-bold text-neutral-dark"
                    >
                      {language === "en"
                        ? "Additional Inquiries / Comments"
                        : "अतिरिक्त पूछताछ / टिप्पणियाँ"}
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={4}
                      value={formData.comments}
                      onChange={handleChange}
                      placeholder={
                        language === "en"
                          ? "Enter any specific queries regarding fee concessions, documents, or syllabus here..."
                          : "शुल्क रियायत, दस्तावेज, या पाठ्यक्रम के बारे में कोई विशेष प्रश्न यहां दर्ज करें..."
                      }
                      className="px-4 py-3.5 rounded-xl border border-border bg-neutral-light/50 text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-primary/15 select-none mt-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <span>
                        {language === "en"
                          ? "Submitting Inquiry..."
                          : "पूछताछ सबमिट हो रही है..."}
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          {language === "en"
                            ? "Submit Admission Inquiry"
                            : "प्रवेश पूछताछ सबमिट करें"}
                        </span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ──────────── BOTTOM CTA ──────────── */}
        <section
          id="download"
          className="mt-8 sm:mt-16 relative overflow-hidden bg-gradient-to-r from-[#1A1A2E] to-[#2a1e3a] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8 text-left shadow-lg"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col gap-1.5 sm:gap-2.5 max-w-xl relative z-10">
            <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-wider">
              {t.admissions.bannerTag}
            </span>
            <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-tight">
              {t.admissions.actionCall}
            </h3>
            <p className="hidden sm:block text-xs md:text-sm text-white/60 leading-relaxed font-normal">
              {language === "en"
                ? "Have questions about student registration, fee structures, or documents? WhatsApp our Helpline Desk directly, or call Kaptanganj administration office."
                : "छात्र पंजीकरण, शुल्क संरचना या आवश्यक दस्तावेजों के बारे में प्रश्न हैं? सीधे प्रवेश कार्यालय को व्हाट्सएप करें या हमारे कप्तानगंज कार्यालय में कॉल करें।"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3.5 shrink-0 relative z-10">
            <a
              href="https://wa.me/919415906899?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm transition-all shadow-lg shadow-emerald-600/20 focus:outline-none shrink-0 cursor-pointer"
            >
              <Download className="w-5 h-5 shrink-0 rotate-270" />
              <span>
                {language === "en"
                  ? "Chat Admissions Desk"
                  : "व्हाट्सएप प्रवेश डेस्क"}
              </span>
            </a>
          </div>
        </section>
      </div>

      {isViewerOpen && (
        <ImageModal
          isOpen={isViewerOpen}
          imageUrl="/admissionForm.png"
          category={language === "en" ? "Official Admission Form" : "आधिकारिक प्रवेश फॉर्म"}
          title={language === "en" ? "NJPS Official Admission Form" : "NJPS आधिकारिक प्रवेश फॉर्म"}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </div>
  );
}
