"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import AboutNavigation from "@/components/AboutNavigation";
import { Award, Compass, Heart, Sparkles, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  coreValues,
  milestones,
  achievements,
  historyDetails,
  managerNote,
  directorNote,
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

        <section className="py-16 text-left border-b border-gray-100">
          <SectionHeading
            title={language === "en" ? "School Leadership" : "विद्यालय का नेतृत्व"}
            subtitle={language === "en" ? "Meet the visionary leaders guiding Nav Jeevan Public School towards academic and holistic success." : "शैक्षणिक और समग्र सफलता की ओर नव जीवन पब्लिक स्कूल का मार्गदर्शन करने वाले दूरदर्शी नेताओं से मिलें।"}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Manager Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm card-hover-lift group">
              <div className="flex flex-col gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent/20 bg-neutral-light shrink-0">
                  <Image
                    src="/manager.jpg"
                    alt="Shri Dhirendra Pratap Singh"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-neutral-dark">
                    {language === "en" ? "Shri Dhirendra Pratap Singh" : "श्री धीरेन्द्र प्रताप सिंह"}
                  </h4>
                  <p className="text-xs text-accent font-bold mt-1 uppercase tracking-wider">
                    {language === "en" ? "Manager" : "प्रबंधक"}
                  </p>
                </div>
                <p className="text-xs text-neutral-body leading-relaxed line-clamp-3">
                  {language === "en" ? "Welcoming you to NJPS. Education is not merely the transfer of knowledge. It is the awakening of a young mind..." : "एनजेपीएस में आपका स्वागत है। शिक्षा केवल ज्ञान का हस्तांतरण नहीं है। यह एक युवा दिमाग को जाग्रत करना है..."}
                </p>
              </div>
              <Link
                href="/about/message-manager"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-primary-hover active:scale-[0.98] transition-all"
              >
                <span>{language === "en" ? "Read Manager's Message" : "प्रबंधक का संदेश पढ़ें"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Director Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm card-hover-lift group">
              <div className="flex flex-col gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent/20 bg-neutral-light shrink-0">
                  <Image
                    src="/director.jpg"
                    alt="Shri Sandeep Sharma"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-neutral-dark">
                    {language === "en" ? "Shri Sandeep Sharma" : "श्री संदीप शर्मा"}
                  </h4>
                  <p className="text-xs text-accent font-bold mt-1 uppercase tracking-wider">
                    {language === "en" ? "Managing Director" : "प्रबंध निदेशक"}
                  </p>
                </div>
                <p className="text-xs text-neutral-body leading-relaxed line-clamp-3">
                  {language === "en" ? "Welcome to our digital portal. Nav Jeevan stands for holistic growth, academic passion, and building moral foundations..." : "हमारे डिजिटल पोर्टल पर आपका स्वागत है। नव जीवन समग्र विकास, शैक्षणिक जुनून और नैतिक नींव के निर्माण के लिए प्रतिबद्ध है..."}
                </p>
              </div>
              <Link
                href="/about/message-director"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-primary-hover active:scale-[0.98] transition-all"
              >
                <span>{language === "en" ? "Read Director's Message" : "निदेशक का संदेश पढ़ें"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Principal Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm card-hover-lift group">
              <div className="flex flex-col gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/20 bg-neutral-light shrink-0">
                  <Image
                    src="/principle.jpeg"
                    alt="Shri Satyendra Pratap Singh"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-neutral-dark">
                    {language === "en" ? "Shri Satyendra Pratap Singh" : "श्री सत्येंद्र प्रताप सिंह"}
                  </h4>
                  <p className="text-xs text-primary font-bold mt-1 uppercase tracking-wider">
                    {language === "en" ? "Principal" : "प्रधानाचार्य"}
                  </p>
                </div>
                <p className="text-xs text-neutral-body leading-relaxed line-clamp-3">
                  {language === "en" ? "It is a distinct privilege to lead an educational community where our staff, students, and parents collaborate..." : "एक ऐसे शैक्षणिक समुदाय का नेतृत्व करना एक विशेषाधिकार है जहाँ हमारे स्टाफ, छात्र और अभिभावक सहयोग करते हैं..."}
                </p>
              </div>
              <Link
                href="/about/message-principal"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-primary-hover active:scale-[0.98] transition-all"
              >
                <span>{language === "en" ? "Read Principal's Message" : "प्रधानाचार्य का संदेश पढ़ें"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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

        <AboutNavigation />
      </div>
    </div>
  );
}
