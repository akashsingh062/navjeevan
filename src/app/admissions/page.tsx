"use client";

import SectionHeading from "@/components/SectionHeading";
import { Download, FileCheck, AlertTriangle } from "lucide-react";
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

  return (
    <div className="py-12 bg-white flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-white bg-accent px-3.5 py-1.5 rounded-full tracking-wider inline-block mb-3.5 shadow-sm select-none">
            {language === "en"
              ? "Admission Session 2026 - 2027 Open"
              : "प्रवेश सत्र 2026 - 2027 खुला है"}
          </span>
          <SectionHeading
            as="h1"
            title={t.admissions.bannerTitle}
            subtitle={t.admissions.bannerDesc}
          />
        </div>

        <section className="mb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-gray-100 pt-16 mb-16 text-left">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SectionHeading
              title={t.admissions.criteriaTitle}
              subtitle={t.admissions.criteriaSubtitle}
            />
            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white mt-4">
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

          <div className="lg:col-span-5 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col gap-5">
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

        <section className="py-16 border-t border-gray-100 mb-16 text-left">
          <SectionHeading
            title={
              language === "en"
                ? "Affordable & Subsidized Fee Structure"
                : "किफायती और रियायती शुल्क संरचना"
            }
            subtitle={t.admissions.guidelineSubtitle}
          />

          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white mt-8">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-neutral-light border-b border-gray-200 text-neutral-dark font-extrabold text-xs uppercase">
                  <th className="p-4 font-bold">
                    {language === "en" ? "Class / Wing" : "कक्षा वर्ग"}
                  </th>
                  <th className="p-4 font-bold">
                    {language === "en"
                      ? "One-Time Admission Fee"
                      : "एक बार प्रवेश शुल्क"}
                  </th>
                  <th className="p-4 font-bold">
                    {language === "en"
                      ? "Monthly Tuition Fee"
                      : "मासिक शिक्षण शुल्क"}
                  </th>
                  <th className="p-4 font-bold">
                    {language === "en"
                      ? "Term Examination Fee"
                      : "सत्र परीक्षा शुल्क"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-neutral-body font-normal">
                {subsidizedFees.map((fee, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-neutral-light/35 transition-colors"
                  >
                    <td className="p-4 font-extrabold text-neutral-dark whitespace-nowrap">
                      {fee.range}
                    </td>
                    <td className="p-4 font-semibold text-neutral-body whitespace-nowrap">
                      {fee.admission}
                    </td>
                    <td className="p-4 font-extrabold text-accent whitespace-nowrap">
                      {fee.tuition}
                    </td>
                    <td className="p-4 font-semibold text-neutral-body whitespace-nowrap">
                      {fee.exam}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 p-4.5 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 items-start text-xs text-amber-800 leading-relaxed font-semibold">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold">
                {language === "en"
                  ? "Important Fee Notes:"
                  : "महत्वपूर्ण शुल्क दिशानिर्देश:"}
              </h4>
              <ul className="list-disc list-inside mt-1 font-medium text-[11px] flex flex-col gap-1">
                <li>
                  {language === "en"
                    ? "Monthly tuition fees must be deposited at the counter by the 10th of every month."
                    : "मासिक शिक्षण शुल्क हर महीने की 10 तारीख तक स्कूल काउंटर पर जमा किया जाना चाहिए।"}
                </li>
                <li>
                  {language === "en"
                    ? "Special fee concessions are available for siblings (brother/sister studying together)."
                    : "सहोदर (एक साथ पढ़ रहे भाई/बहन) के लिए विशेष शुल्क रियायत की सुविधा उपलब्ध है।"}
                </li>
                <li>
                  {language === "en"
                    ? "Subsidies are offered to parents from weaker economic categories upon verification."
                    : "आर्थिक रूप से कमजोर श्रेणियों के अभिभावकों को सत्यापन के बाद विशेष रियायतें दी जाती हैं।"}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="download"
          className="py-12 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 text-left"
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
              href="https://wa.me/919935661144?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%2520admission%2520inquiry."
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
    </div>
  );
}
