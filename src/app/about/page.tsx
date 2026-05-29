"use client";

import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { Award, Compass, Heart, Sparkles, BookOpen, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  coreValues,
  milestones,
  achievements,
  historyDetails,
  principalNote
} from "@/lib/data/about";

const iconMap = {
  Compass,
  Sparkles,
  Heart,
  BookOpen,
  Award,
  GraduationCap
};

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="py-12 bg-white flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            {language === "en" ? "Since 2011" : "2011 से स्थापित"}
          </span>
          <SectionHeading
            as="h1"
            title={language === "en" ? "About Nav Jeevan Public School" : "नव जीवन पब्लिक स्कूल के बारे में"}
            subtitle={language === "en" ? "The story of our dedication, academic excellence, and community building in rural Kushinagar." : "ग्रामीण कुशीनगर में हमारे समर्पण, शैक्षणिक उत्कृष्टता और सामुदायिक निर्माण की कहानी।"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-gray-100 pb-16 text-left">
          <div className="lg:col-span-7 flex flex-col gap-5 text-sm md:text-base text-neutral-body font-normal leading-relaxed">
            <h3 className="text-xl font-extrabold text-neutral-dark mb-1">
              {historyDetails.title[language]}
            </h3>
            <p>
              {historyDetails.p1[language]}
            </p>
            <p>
              {historyDetails.p2[language]}
            </p>

            <div className="mt-4 p-5 bg-neutral-light border border-gray-200 rounded-2xl flex gap-4 items-start">
              <Award className="w-10 h-10 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-neutral-dark">
                  {historyDetails.recognitionTitle[language]}
                </h4>
                <p className="text-xs text-neutral-body mt-1 leading-relaxed">
                  {historyDetails.recognitionDesc[language]}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-extrabold text-neutral-dark border-b border-gray-200 pb-3 mb-6">
              {historyDetails.journeyTitle[language]}
            </h3>
            <div className="flex flex-col gap-6 relative pl-4 border-l border-primary/25">
              {milestones.map((stone, idx) => (
                <div key={idx} className="relative flex flex-col gap-1.5">
                  <div className="absolute left-[-25px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white" />

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {stone.year}
                    </span>
                    <h4 className="text-sm font-extrabold text-neutral-dark">
                      {stone.title[language]}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-body leading-relaxed font-normal">
                    {stone.desc[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="py-16 border-b border-gray-100 text-left">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionHeading
              title={language === "en" ? "Our Purpose & Core Values" : "हमारा उद्देश्य और मूल मूल्य"}
              subtitle={language === "en" ? "The pillars that define daily academic instruction and character training at Nav Jeevan." : "नव जीवन में दैनिक शैक्षणिक निर्देश और चरित्र प्रशिक्षण को परिभाषित करने वाले स्तंभ।"}
              centered
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = iconMap[val.iconName];
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col gap-4"
                >
                  <div
                    className={`p-3 w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${val.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-dark leading-tight">
                    {val.title[language]}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
                    {val.desc[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-10 my-12 text-left">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-black text-primary uppercase tracking-widest">
                {principalNote.tag[language]}
              </span>
              <h3 className="text-2xl font-extrabold text-neutral-dark tracking-tight leading-tight">
                {principalNote.title[language]}
              </h3>
              <div className="h-0.5 w-12 bg-primary mt-1.5 rounded-full" />
            </div>

            <div className="flex flex-col gap-4 text-sm md:text-base text-neutral-body font-normal leading-relaxed">
              <p>{principalNote.salutation[language]}</p>
              <p>
                {principalNote.p1[language]}
              </p>
              <p>
                {principalNote.p2[language]}
              </p>
              <p>
                {principalNote.p3[language]}
              </p>
              <p>
                {principalNote.p4[language]}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-300 flex flex-col">
              <span className="text-sm font-black text-neutral-dark">
                {principalNote.name[language]}
              </span>
              <span className="text-xs text-accent font-bold mt-0.5">
                {principalNote.role[language]}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {principalNote.credentials[language]}
              </span>
            </div>
          </div>
        </section>

        <section className="py-8 text-left">
          <SectionHeading
            title={language === "en" ? "School Achievements" : "विद्यालय की उपलब्धियाँ"}
            subtitle={language === "en" ? "Proud milestones representing our student and teacher efforts in Kushinagar district tournaments and board outcomes." : "कुशीनगर जिला टूर्नामेंट और बोर्ड परीक्षा परिणामों में हमारे छात्रों और शिक्षकों के प्रयासों का गौरवशाली प्रतिनिधित्व।"}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {achievements.map((ach, idx) => {
              const Icon = iconMap[ach.iconName];
              return (
                <div key={idx} className="p-5 bg-white border border-gray-200 rounded-2xl flex gap-3.5 items-start">
                  <Icon className={`w-8 h-8 ${ach.color} shrink-0 mt-0.5`} />
                  <div>
                    <h4 className="text-sm font-extrabold text-neutral-dark">
                      {ach.title[language]}
                    </h4>
                    <p className="text-xs text-neutral-body mt-1 leading-relaxed">
                      {ach.desc[language]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
