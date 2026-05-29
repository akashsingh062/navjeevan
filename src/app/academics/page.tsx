"use client";

import SectionHeading from "@/components/SectionHeading";
import {
  Clock,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Smile,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import {
  academicsStages,
  seasonalTimings,
  calendarMilestones,
} from "@/lib/data/academics";

const iconMap = {
  Smile,
  BookOpen,
  GraduationCap,
};

export default function Academics() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="py-12 bg-background flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-linear-to-br from-primary to-neutral-dark text-white rounded-3xl p-8 md:p-12 mb-16 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl text-left">
            <span className="text-[10px] uppercase font-black text-white/90 bg-white/15 border border-white/20 px-3 py-1 rounded-full tracking-widest inline-block mb-4 select-none">
              {t.academics.timingsLKGtoVIII}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
              {t.academics.bannerTitle}
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              {t.academics.bannerDesc}
            </p>
          </div>
        </div>

        <section className="mb-20">
          <SectionHeading
            accent={t.academics.bannerTag}
            title={t.academics.stageTitle}
            subtitle={t.academics.stageSubtitle}
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {academicsStages.map((stage, idx) => {
              const StageIcon = iconMap[stage.iconName];
              return (
                <div
                  key={idx}
                  className={`bg-surface border ${stage.borderColor} rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/30 transition-all duration-300 relative group overflow-hidden text-left`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${stage.accentBg}`}
                  />

                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl ${stage.accentBg} ${stage.accentText} flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        <StageIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black tracking-wider uppercase text-neutral-body/75">
                          {stage.classes[language]}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-neutral-dark leading-tight mt-0.5">
                          {stage.title[language]}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`text-xs font-extrabold ${stage.accentText} flex items-center gap-1.5 mb-4`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{stage.focus[language]}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-body leading-relaxed mb-6 font-medium">
                      {stage.desc[language]}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-border">
                    <span className="text-[10px] uppercase font-black text-accent tracking-wider block mb-3">
                      {language === "en"
                        ? "Prescribed Core Subjects"
                        : "निर्धारित मुख्य विषय"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.subjects[language].map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-semibold text-neutral-dark bg-neutral-light px-2.5 py-1 rounded-lg border border-border"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20 text-left">
          <div className="lg:col-span-7 bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center">
                  <ClipboardCheck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-neutral-dark leading-none">
                    {t.academics.evalTitle}
                  </h3>
                  <p className="text-[11px] text-neutral-body font-medium mt-1">
                    {t.academics.evalSubtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-body leading-relaxed mb-6 font-medium">
                {language === "en"
                  ? "To guarantee organic mental growth without exam stress, Nav Jeevan Public School strictly implements continuous assessments that reward regular curiosity rather than rote memorization."
                  : "बिना परीक्षा के तनाव के मानसिक विकास की गारंटी के लिए, नव जीवन पब्लिक स्कूल कड़ाई से सतत मूल्यांकन लागू करता है जो रटने के बजाय नियमित जिज्ञासा को पुरस्कृत करता है।"}
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <Smile className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      {t.academics.foundationalTitle}:{" "}
                      {language === "en" ? "Gentle Observations" : "सहज अवलोकन"}
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5 font-medium">
                      {language === "en"
                        ? "No written exam pressure for LKG and UKG children. Progress is evaluated via sensory participation, speech development, drawings, and interactive games."
                        : "LKG और UKG के बच्चों के लिए कोई लिखित परीक्षा का दबाव नहीं है। विकास का मूल्यांकन संवेदी भागीदारी, भाषण विकास, चित्रकारी और इंटरैक्टिव खेलों के माध्यम से किया जाता है।"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      {t.academics.unitDiagnostics}
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5 font-medium">
                      {t.academics.unitDiagnosticsDesc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      {t.academics.termEvaluations}
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5 font-medium">
                      {t.academics.termEvaluationsDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-[11px] text-accent font-bold">
              <span>
                {language === "en"
                  ? "* Standard Progress Cards issued twice a year."
                  : "* मानक प्रगति पत्र वर्ष में दो बार जारी किए जाते हैं।"}
              </span>
              <span className="flex items-center gap-1">
                {t.common.UPPatternShort} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                    <Clock className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-neutral-dark leading-none">
                      {t.academics.timingsGeneral}
                    </h3>
                    <p className="text-[11px] text-neutral-body font-medium mt-1">
                      {t.academics.timingsSubtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-body leading-relaxed mb-6 font-medium">
                  {t.academics.bannerDesc}
                </p>

                <div className="flex flex-col gap-4">
                  {seasonalTimings.map((time, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border ${time.bg} flex gap-4 items-start shadow-xs`}
                    >
                      <Clock className="w-6 h-6 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider">
                          {time.season[language]}
                        </h4>
                        <p className="text-base sm:text-lg font-black mt-1">
                          {time.duration}
                        </p>
                        <p className="text-[11px] font-bold opacity-80 mt-0.5">
                          {time.break[language]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-neutral-body font-medium mt-6 bg-neutral-light p-3 rounded-xl border border-border">
                <strong>
                  {language === "en" ? "Important:" : "महत्वपूर्ण सूचना:"}
                </strong>{" "}
                {language === "en"
                  ? "Shift announcements are communicated to parents via SMS and notice board cards a week before implementation."
                  : "समय सारणी में बदलाव की सूचना अभिभावकों को एक सप्ताह पूर्व SMS और सूचना पट्ट के माध्यम से दी जाती है।"}
              </div>
            </div>
          </div>
        </div>

        <section className="mb-10 text-left">
          <SectionHeading
            accent={t.academics.badgeAcademic}
            title={t.academics.calendarTitle}
            subtitle={t.academics.calendarSubtitle}
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {calendarMilestones.map((event, idx) => (
              <div
                key={idx}
                className="bg-surface border border-border rounded-3xl p-6 shadow-2xs hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-lg text-[9px] uppercase font-black text-white ${
                      event.type === "academic"
                        ? "bg-primary"
                        : event.type === "exam"
                          ? "bg-brand-amber"
                          : "bg-accent"
                    }`}
                  >
                    {event.badgeText[language]}
                  </span>

                  <span className="block text-base sm:text-lg font-black text-neutral-dark mt-3 leading-tight">
                    {event.date[language]}
                  </span>

                  <h4 className="text-xs font-black text-neutral-dark mt-2 leading-snug">
                    {event.title[language]}
                  </h4>

                  <p className="text-xs text-neutral-body leading-relaxed mt-2.5 font-medium">
                    {event.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
