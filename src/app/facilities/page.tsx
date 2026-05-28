"use client";

import React from "react";
import SectionHeading from "@/components/SectionHeading";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/dataManager";
import { Lightbulb, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FacilitiesPage() {
  const { language } = useLanguage();
  const facilities = getFacilities();

  return (
    <div className="py-12 bg-white flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            {language === "en" ? "Our Infrastructure" : "हमारा बुनियादी ढांचा"}
          </span>
          <SectionHeading
            title={language === "en" ? "Our Modern School Facilities" : "हमारी आधुनिक स्कूल सुविधाएं"}
            subtitle={language === "en" ? "Providing essential and advanced resources that foster a safe, clean, and interactive learning environment." : "सुरक्षित, स्वच्छ और इंटरैक्टिव शिक्षण वातावरण को बढ़ावा देने वाले आवश्यक और उन्नत संसाधन प्रदान करना।"}
          />
        </div>

        <div className="mb-12 p-5 bg-neutral-light border border-gray-200 rounded-2xl flex gap-3.5 items-start text-xs text-neutral-body leading-relaxed max-w-4xl text-left">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="font-semibold">
            {language === "en"
              ? "We believe that a high-standard school layout directly enhances student attendance, health, and comprehension. At Nav Jeevan Public School, we continuously invest in modern visual panels, clean drinking RO networks, and sports fields, ensuring children in Khabharabhar receive top-tier learning resources."
              : "हमारा मानना है कि एक उच्च-स्तरीय स्कूल लेआउट सीधे छात्र उपस्थिति, स्वास्थ्य और समझ को बढ़ाता है। नव जीवन पब्लिक स्कूल में, हम आधुनिक विजुअल पैनल, स्वच्छ पेयजल आरओ नेटवर्क और खेल के मैदानों में निरंतर निवेश करते हैं, जिससे खबरभार के बच्चों को शीर्ष स्तर के सीखने के संसाधन मिलना सुनिश्चित होता है।"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {facilities.map((fac) => (
            <FacilityCard key={fac.id} facility={fac} />
          ))}
        </div>

        <section className="bg-linear-to-tr from-neutral-light to-blue-50/20 border border-gray-200 rounded-3xl p-6 md:p-10 text-left flex flex-col gap-6">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-wider text-xs">
            <Lightbulb className="w-5 h-5" />
            <span>{language === "en" ? "Facility Spotlight" : "सुविधा आकर्षण केंद्र"}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-extrabold text-neutral-dark leading-tight">
                {language === "en" ? "Computer IT Lab & Digital Literacy" : "कंप्यूटर आईटी लैब और डिजिटल साक्षरता"}
              </h3>
              <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
                {language === "en"
                  ? "To equip our rural students for modern work brackets, we prescribe weekly computer practical sessions for Class III onwards. Our computer laboratory operates with 20+ desktop seats, teaching kids word processing, calculations in sheets, slides presentation, internet search methodologies, and keyboard touch typing under dedicated IT guides."
                  : "हमारे ग्रामीण छात्रों को आधुनिक कौशल से लैस करने के लिए, हम कक्षा III से आगे के लिए साप्ताहिक कंप्यूटर व्यावहारिक सत्र निर्धारित करते हैं। हमारी कंप्यूटर प्रयोगशाला 20+ डेस्कटॉप सीटों के साथ संचालित होती है, जो बच्चों को वर्ड प्रोसेसिंग, शीट में गणना, स्लाइड प्रस्तुति, इंटरनेट खोज पद्धति और समर्पित आईटी गाइडों के तहत कीबोर्ड टच टाइपिंग सिखाती है।"}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-extrabold text-neutral-dark leading-tight">
                {language === "en" ? "Bilingual Smart Classrooms" : "द्विभाषी स्मार्ट क्लासरूम"}
              </h3>
              <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
                {language === "en"
                  ? "Primary and secondary instruction blocks are equipped with digital audio-visual screens and display units. This helps our teachers show animated science concepts, map projections in geography, and reading comprehension exercises in English. The visual engagement ensures children retain up to 80% more details from their lectures."
                  : "प्राथमिक और उच्च शिक्षण ब्लॉकों को डिजिटल ऑडियो-विजुअल स्क्रीन और डिस्प्ले यूनिट से लैस किया गया है। यह हमारे शिक्षकों को एनिमेटेड विज्ञान अवधारणाओं, भूगोल में मानचित्र अनुमानों और अंग्रेजी में पढ़ने की समझ के अभ्यास को दिखाने में मदद करता है। दृश्य जुड़ाव यह सुनिश्चित करता है कि बच्चे अपने व्याख्यानों से 80% अधिक विवरण याद रखें।"}
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
