"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";
import SectionHeading from "@/components/SectionHeading";
import { Download, FileCheck, AlertTriangle, Calendar, Gift, Percent, Clock, Megaphone, Compass, ClipboardCheck, Receipt, Send } from "lucide-react";
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

  const [activeTab, setActiveTab] = useState("process");
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

  return (
    <div className="py-12 bg-white flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-white bg-accent px-3.5 py-1.5 rounded-full tracking-wider inline-block mb-3.5 shadow-sm select-none">
            {language === "en"
              ? "Admission Session 2026 - 2027 is open"
              : "प्रवेश सत्र 2026 - 2027 खुला है"}
          </span>
          <SectionHeading
            as="h1"
            title={t.admissions.bannerTitle}
            subtitle={t.admissions.bannerDesc}
          />
        </div>

        {/* Sleek Interactive Tabs Group */}
        <div className="mb-12 border-b border-gray-250/70">
          <div className="flex overflow-x-auto scrollbar-none gap-2 pb-px -mb-px flex-nowrap select-none">
            {[
              {
                id: "process",
                labelEn: "Admission Process",
                labelHi: "प्रवेश प्रक्रिया",
                icon: Compass,
              },
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
                id: "apply",
                labelEn: "Admission Enquiry",
                labelHi: "प्रवेश पूछताछ",
                icon: Send,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-5 py-4 font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-b-2 cursor-pointer focus:outline-none shrink-0 ${
                    isActive
                      ? "border-primary text-primary font-black bg-primary/[0.02]"
                      : "border-transparent text-neutral-body hover:text-neutral-dark hover:bg-neutral-light/35"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-primary" : "text-neutral-body"}`} />
                  <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="text-xs sm:text-[13px]">{language === "en" ? tab.labelEn : tab.labelHi}</span>
                    <span className="text-[9px] uppercase tracking-wider opacity-60 font-semibold">
                      {language === "en" ? tab.labelHi : tab.labelEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Admission Process */}
        {activeTab === "process" && (
          <div className="animate-fade-in-up flex flex-col gap-10">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 text-left">
                {admissionSteps.map((step) => (
                  <div
                    key={step.num}
                    className="bg-neutral-light border border-gray-200 p-6 rounded-2xl relative shadow-sm hover:border-primary/20 transition-all flex flex-col gap-3"
                  >
                    <span className="text-3xl font-serif font-black text-primary/30 leading-none">
                      {step.num}
                    </span>
                    <h3 className="text-base font-extrabold text-neutral-dark leading-tight">
                      {step.title[language]}
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed font-normal">
                      {step.desc[language]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* View/Download Admission Form Card */}
            <div className="bg-neutral-light border border-gray-250 p-6 sm:p-8 rounded-3xl flex flex-col lg:flex-row justify-between items-center gap-8 text-left mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start flex-1">
                {/* Visual Image Preview */}
                <div 
                  onClick={() => setIsViewerOpen(true)}
                  className="relative w-32 h-44 sm:w-28 sm:h-38 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:border-primary/40 group transition-all shrink-0 select-none"
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

                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full tracking-wider w-fit">
                    {language === "en" ? "Offline Application" : "ऑफलाइन आवेदन"}
                  </span>
                  <h4 className="text-lg font-serif font-black text-neutral-dark leading-snug">
                    {language === "en" ? "Official Print-Ready Admission Form" : "आधिकारिक प्रिंट-योग्य प्रवेश फॉर्म"}
                  </h4>
                  <p className="text-xs text-neutral-body font-medium leading-relaxed">
                    {language === "en"
                      ? "Download and print the offline admission form to fill out and submit directly at the school office counter in Khabharabhar."
                      : "खबरभार स्थित विद्यालय कार्यालय काउंटर पर सीधे जमा करने के लिए ऑफलाइन प्रवेश फॉर्म डाउनलोड और प्रिंट करें।"}
                  </p>
                  <div className="flex flex-wrap gap-2.5 mt-2">
                    <button
                      onClick={() => setIsViewerOpen(true)}
                      className="px-4 py-2 bg-neutral-dark hover:bg-neutral-dark/95 text-white text-xs font-black rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ClipboardCheck className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "View Form" : "फॉर्म देखें"}</span>
                    </button>
                    <a
                      href="/admissionForm.png"
                      download="Nav_Jeevan_Public_School_Admission_Form.png"
                      className="px-4 py-2 bg-white hover:bg-neutral-light border border-gray-300 text-neutral-dark text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "Download PNG" : "डाउनलोड करें (PNG)"}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action CTA card */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-left">
              <div>
                <h4 className="text-base font-extrabold text-neutral-dark leading-snug">
                  {language === "en" ? "Ready to begin the enrollment process?" : "प्रवेश प्रक्रिया शुरू करने के लिए तैयार हैं?"}
                </h4>
                <p className="text-xs text-neutral-body mt-1 font-medium">
                  {language === "en"
                    ? "Submit your inquiry form online, and our admissions team will contact you within 24 hours."
                    : "अपना पूछताछ फ़ॉर्म ऑनलाइन जमा करें, और हमारी प्रवेश टीम 24 घंटे के भीतर आपसे संपर्क करेगी।"}
                </p>
              </div>
              <button
                onClick={() => setActiveTab("apply")}
                className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-black rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer select-none shrink-0"
              >
                {language === "en" ? "Submit Online Enquiry" : "ऑनलाइन पूछताछ सबमिट करें"}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Eligibility & Checklist */}
        {activeTab === "eligibility" && (
          <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
            {/* Age Eligibility Table */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <SectionHeading
                title={t.admissions.criteriaTitle}
                subtitle={t.admissions.criteriaSubtitle}
              />
              <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white mt-2">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-neutral-light border-b border-gray-200 text-neutral-dark font-extrabold text-xs uppercase">
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
                        className="hover:bg-neutral-light/35 transition-colors"
                      >
                        <td className="p-4 font-extrabold text-neutral-dark whitespace-nowrap">
                          {el.class}
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
            </div>

            {/* Document Checklist Card */}
            <div className="lg:col-span-5 bg-neutral-light border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
              <h3 className="text-lg font-extrabold text-neutral-dark flex items-center gap-2 border-b border-gray-200 pb-3">
                <FileCheck className="w-5 h-5 text-primary" />
                {t.admissions.checkTitle}
              </h3>
              <p className="text-xs text-neutral-body leading-relaxed font-normal -mt-2">
                {t.admissions.checkSubtitle}
              </p>
              <ul className="flex flex-col gap-3 text-xs text-neutral-body leading-relaxed">
                {requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start font-medium">
                    <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5 select-none">
                      ✓
                    </div>
                    <span>{doc[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Fees & Installments */}
        {activeTab === "fees" && (
          <div className="animate-fade-in-up flex flex-col gap-8 text-left">
            
            {/* Yearly Fees Statement Card */}
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md">
              {/* Card Header */}
              <div className="bg-primary/95 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/20">
                <div>
                  <span className="text-[10px] uppercase font-bold bg-accent text-white px-2.5 py-1 rounded-md tracking-wider inline-block mb-2 select-none shadow-sm">
                    {language === "en" ? "Yearly Fees Statement" : "वार्षिक शुल्क विवरण"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-none">
                    NAV JEEVAN PUBLIC SCHOOL
                  </h3>
                  <p className="text-xs text-neutral-light/80 mt-1.5 font-medium uppercase tracking-wide">
                    Khabharabhar, Kushinagar-274301
                  </p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-sm font-extrabold bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 inline-block">
                    {language === "en" ? "Session: 2026-27" : "सत्र: 2026-27"}
                  </span>
                </div>
              </div>

              {/* Table Container */}
              <div className="p-4 sm:p-6 overflow-x-auto">
                <div className="min-w-[680px]">
                  <table className="w-full text-center border-collapse border border-gray-200 text-xs sm:text-sm font-semibold">
                    <thead>
                      <tr className="bg-neutral-light border-b border-gray-200 text-neutral-dark text-xs uppercase tracking-wide font-extrabold select-none">
                        <th colSpan={2} className="p-3 border border-gray-200 font-black">
                          {language === "en" ? "Installment & Details" : "किस्त एवं विवरण"}
                        </th>
                        <th colSpan={2} className="p-3 border border-gray-200 font-black text-center bg-emerald-50/20 text-emerald-900">
                          {language === "en" ? "NUR.- To - Vth" : "नर्सरी से कक्षा V"}
                        </th>
                        <th colSpan={2} className="p-3 border border-gray-200 font-black text-center bg-blue-50/20 text-blue-900">
                          {language === "en" ? "VI - To - VIII" : "कक्षा VI से VIII"}
                        </th>
                      </tr>
                      <tr className="bg-neutral-light/50 border-b border-gray-200 text-neutral-body text-[10px] uppercase font-bold select-none">
                        <th colSpan={2} className="p-2.5 border border-gray-200"></th>
                        <th className="p-2.5 border border-gray-200 bg-emerald-50/10 text-emerald-800 font-extrabold">{language === "en" ? "NEW" : "नए छात्र"}</th>
                        <th className="p-2.5 border border-gray-200 text-neutral-dark font-extrabold">{language === "en" ? "OLD" : "पुराने छात्र"}</th>
                        <th className="p-2.5 border border-gray-200 bg-blue-50/10 text-blue-800 font-extrabold">{language === "en" ? "NEW" : "नए छात्र"}</th>
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
                      <tr className="bg-neutral-light/35 font-extrabold text-neutral-dark">
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
                      <tr className="bg-neutral-light/35 font-extrabold text-neutral-dark">
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
                      <tr className="bg-neutral-light/35 font-extrabold text-neutral-dark">
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
                      <tr className="bg-neutral-light/35 font-extrabold text-neutral-dark">
                        <td className="p-2.5 border border-gray-200 text-left font-black tracking-wide uppercase text-[10px] text-neutral-body">
                          {language === "en" ? "4th Inst. Total" : "चतुर्थ किस्त योग"}
                        </td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-emerald-800">1050</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1050</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-blue-800">1200</td>
                        <td className="p-2.5 border border-gray-200 font-extrabold text-neutral-dark">1200</td>
                      </tr>

                      {/* Total Fees Row */}
                      <tr className="bg-neutral-dark text-white font-black text-xs sm:text-sm border border-neutral-dark">
                        <td colSpan={2} className="p-3.5 border border-neutral-dark text-left uppercase tracking-wider font-extrabold">
                          {language === "en" ? "Total Fees (Annual Sum)" : "कुल योग (कुल वार्षिक शुल्क)"}
                        </td>
                        <td className="p-3.5 border border-neutral-dark text-center bg-emerald-600/90 text-white text-sm sm:text-base font-black">5900</td>
                        <td className="p-3.5 border border-neutral-dark text-center bg-neutral-dark text-neutral-light text-sm sm:text-base font-black">5450</td>
                        <td className="p-3.5 border border-neutral-dark text-center bg-blue-600/90 text-white text-sm sm:text-base font-black">6500</td>
                        <td className="p-3.5 border border-neutral-dark text-center bg-neutral-dark text-neutral-light text-sm sm:text-base font-black">6050</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Premium Notice Board Section */}
            <div className="bg-amber-50/40 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 text-amber-600 flex items-center justify-center shrink-0 shadow-sm border border-amber-200/50">
                <Megaphone className="w-6 h-6" />
              </div>
              <div className="flex-1 w-full">
                <h4 className="text-lg font-serif font-black text-amber-900 tracking-tight leading-none mb-1.5 flex items-center gap-2">
                  {language === "en"
                    ? "Official Notice & Fee Guidelines"
                    : "आवश्यक निर्देश"}
                </h4>
                <p className="text-xs text-amber-800/80 font-semibold mb-6">
                  {language === "en"
                    ? "Please read the following guidelines regarding payment schedules and concessions carefully."
                    : "कृपया भुगतान अनुसूची और रियायतों के संबंध में निम्नलिखित दिशानिर्देशों को ध्यानपूर्वक पढ़ें।"}
                </p>

                {/* Guidelines Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-xs sm:text-sm">
                  
                  {/* 1. Installments Card */}
                  <div className="bg-white/80 p-4.5 rounded-2xl border border-amber-200/60 shadow-xs flex gap-3.5 items-start">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 mt-0.5">
                      <Calendar className="w-4 h-4" />
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
                  <div className="bg-white/80 p-4.5 rounded-2xl border border-amber-200/60 shadow-xs flex gap-3.5 items-start">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 mt-0.5">
                      <Gift className="w-4 h-4" />
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
                  <div className="bg-white/80 p-4.5 rounded-2xl border border-amber-200/60 shadow-xs flex gap-3.5 items-start md:col-span-2">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 mt-0.5">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div className="w-full">
                      <h5 className="font-extrabold text-amber-950 mb-1 leading-tight">
                        {language === "en" ? "Admission Fee Concessions" : "शुल्क रियायत नियम"}
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-medium text-amber-900/90 text-[11px] sm:text-xs mt-2">
                        <li className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/40">
                          <span className="font-bold block text-amber-950">
                            {language === "en" ? "3 New Admissions" : "3 New Admission पर"}
                          </span>
                          {language === "en" ? "Up to ₹1,000 concession" : "1000 रू तक का शुल्क माफ़ किया जायेगा।"}
                        </li>
                        <li className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/40">
                          <span className="font-bold block text-amber-950">
                            {language === "en" ? "3 Admissions (New/Old)" : "3 New/Old Admission पर"}
                          </span>
                          {language === "en" ? "Up to ₹500 concession" : "500 रू तक का शुल्क माफ़ किया जायेगा।"}
                        </li>
                        <li className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/40">
                          <span className="font-bold block text-amber-950">
                            {language === "en" ? "4 Admissions (New/Old)" : "4 New/Old Admission पर"}
                          </span>
                          {language === "en" ? "Up to ₹1,000 concession" : "1000 रू तक का शुल्क माफ़ किया जायेगा।"}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 4. Late Fine */}
                  <div className="bg-white/80 p-4.5 rounded-2xl border border-amber-200/60 shadow-xs flex gap-3.5 items-start md:col-span-2">
                    <div className="p-2 rounded-xl bg-rose-500/10 text-rose-700 mt-0.5">
                      <Clock className="w-4 h-4" />
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
          </div>
        )}

        {/* Tab 4: Online Inquiry Form */}
        {activeTab === "apply" && (
          <div className="animate-fade-in-up">
            <div className="max-w-3xl mx-auto bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
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
                      className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary/50 transition-colors"
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
                      className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary/50 transition-colors"
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
                      className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary/50 transition-colors"
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
                        language === "en" ? "e.g., 9956526062" : "उदा. 9956526062"
                      }
                      className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary/50 transition-colors"
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
                      className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary/50 transition-colors"
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
                      className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary/50 transition-colors"
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
                    className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-neutral-dark focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white rounded-2xl font-black text-sm transition-all shadow-md select-none mt-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <span>
                      {language === "en"
                        ? "Submitting Inquiry..."
                        : "पूछताछ सबमिट हो रही है..."}
                    </span>
                  ) : (
                    <>
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
        )}

        {/* Global Helpline chat desk at bottom */}
        <section
          id="download"
          className="mt-16 py-12 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-left"
        >
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs font-black text-primary uppercase tracking-wider">
              {t.admissions.bannerTag}
            </span>
            <h3 className="text-xl font-extrabold text-neutral-dark tracking-tight leading-tight">
              {t.admissions.actionCall}
            </h3>
            <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
              {language === "en"
                ? "Have questions about student registration, fee structures, or documents? WhatsApp our Helpline Desk directly, or call Kaptanganj administration office."
                : "छात्र पंजीकरण, शुल्क संरचना या आवश्यक दस्तावेजों के बारे में प्रश्न हैं? सीधे प्रवेश कार्यालय को व्हाट्सएप करें या हमारे कप्तानगंज कार्यालय में कॉल करें।"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3.5 shrink-0">
            <a
              href="https://wa.me/919956526062?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm transition-all shadow-md focus:outline-none shrink-0 cursor-pointer"
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
