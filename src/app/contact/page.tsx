"use client";

import SectionHeading from "@/components/SectionHeading";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ExternalLink,
  Navigation,
  UserCheck,
  ShieldAlert,
  Info,
  GraduationCap,
  BookOpen,
  Star,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { contactDirectory } from "@/lib/data/contact";

const iconMap = {
  Phone,
  Mail,
  Clock,
  MessageSquare,
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="py-0 bg-background flex-1 animate-fade-in-up">

      {/* ──────────── HERO BANNER ──────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#2a1e3a] to-[#0F172A] text-white py-16 md:py-24 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/15 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Floating decorative icons */}
        <div className="absolute top-12 right-[15%] opacity-10 animate-float-slow pointer-events-none hidden md:block">
          <Phone className="w-12 h-12" />
        </div>
        <div className="absolute bottom-16 right-[25%] opacity-10 animate-float pointer-events-none hidden md:block">
          <Mail className="w-10 h-10" />
        </div>
        <div className="absolute top-20 left-[20%] opacity-[0.07] animate-float pointer-events-none hidden lg:block">
          <GraduationCap className="w-16 h-16" />
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase font-black text-white/90 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full tracking-widest mb-5 select-none backdrop-blur-sm">
              <Star className="w-3 h-3 text-primary" />
              {t.contact.bannerTag}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black tracking-tight leading-[1.1] mb-5">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {t.contact.bannerTitle}
              </span>
            </h1>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-medium max-w-2xl">
              {t.contact.bannerDesc}
            </p>

            {/* Quick action pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="tel:+919889897057" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30">
                <Phone className="w-3.5 h-3.5" />
                <span>{language === "en" ? "Call Now" : "अभी कॉल करें"}</span>
              </a>
              <a href="https://wa.me/919415906899" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 text-white rounded-xl text-xs font-bold transition-all backdrop-blur-sm">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{language === "en" ? "WhatsApp" : "व्हाट्सएप"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ──────────── HELPLINE DIRECTORY ──────────── */}
        <section className="mb-20">
          <SectionHeading
            accent={t.contact.bannerTag}
            title={t.contact.helplineTitle}
            subtitle={t.contact.helplineSubtitle}
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {contactDirectory.map((card, idx) => {
              const CardIcon = iconMap[card.iconName];
              return (
                <div
                  key={idx}
                  className="group relative bg-surface border border-border rounded-3xl p-6 shadow-xs card-hover-lift flex flex-col justify-between overflow-hidden text-left"
                >
                  {/* Gradient top accent stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                    idx === 0 ? "from-primary to-primary-hover" :
                    idx === 1 ? "from-emerald-500 to-emerald-600" :
                    idx === 2 ? "from-emerald-400 to-emerald-600" :
                    "from-accent to-accent-hover"
                  }`} />

                  {/* Hover glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Icon with float offset effect */}
                    <div className={`w-12 h-12 rounded-2xl ${card.accentBg} ${card.accentText} flex items-center justify-center mb-5 shrink-0 shadow-sm group-hover:shadow-md transition-shadow border border-border/50`}>
                      <CardIcon className="w-5.5 h-5.5" />
                    </div>

                    <h4 className="text-[10px] font-black tracking-[0.12em] uppercase text-neutral-body/70 mb-1.5">
                      {card.title[language]}
                    </h4>
                    <p className="text-base font-black text-neutral-dark leading-snug break-words">
                      {card.detail[language]}
                    </p>
                    <p className="text-xs text-neutral-body mt-3 leading-relaxed font-medium">
                      {card.desc[language]}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border relative z-10">
                    <a
                      href={card.href}
                      className={`w-full py-3 rounded-xl text-center font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 focus:outline-none group-hover:shadow-md ${
                        card.accentBg.includes("primary") || card.accentBg.includes("emerald")
                          ? "bg-primary text-white hover:bg-primary-hover"
                          : "bg-neutral-light text-neutral-dark hover:bg-neutral-light/75 border border-border"
                      }`}
                    >
                      <span>{card.actionLabel[language]}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ──────────── ADMIN DESK + MAP ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 text-left">

          {/* Administrative Guidance Desk */}
          <div className="lg:col-span-6 bg-surface border border-border rounded-3xl shadow-xs flex flex-col overflow-hidden">
            {/* Card header with accent bar */}
            <div className="relative bg-gradient-to-r from-accent/5 to-primary/5 p-6 md:p-8 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center shadow-sm border border-accent/10">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-neutral-dark leading-none">
                    {t.contact.deskTitle}
                  </h3>
                  <p className="text-[11px] text-neutral-body font-medium mt-1.5">
                    {t.contact.deskSubtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-5 flex-1">
              {/* Info items */}
              {[
                {
                  icon: UserCheck,
                  iconBg: "bg-accent-light",
                  iconColor: "text-accent",
                  title: t.contact.principalDesk,
                  desc: t.contact.principalDeskDesc,
                },
                {
                  icon: Info,
                  iconBg: "bg-primary-light",
                  iconColor: "text-primary",
                  title: t.contact.feesDesk,
                  desc: t.contact.feesDeskDesc,
                },
                {
                  icon: ShieldAlert,
                  iconBg: "bg-amber-50",
                  iconColor: "text-amber-600",
                  title: t.contact.visitorDesk,
                  desc: t.contact.visitorDeskDesc,
                },
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start group/item">
                    <div className={`mt-0.5 w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-xs border border-border/30 group-hover/item:shadow-sm transition-shadow`}>
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-neutral-dark leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-body leading-relaxed mt-1 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bilingual note */}
            <div className="mx-6 md:mx-8 mb-6 md:mb-8">
              <div className="flex items-start gap-3 text-[11px] text-neutral-body font-medium bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-2xl border border-border/50">
                <BookOpen className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                <p>
                  <strong className="text-neutral-dark">{language === "en" ? "Bilingual Assistance:" : "द्विभाषी सहायता:"}</strong>{" "}
                  {language === "en" ? "Dial the Helpline if you need assistance in Hindi or English. Our office clerk will assist you cheerfully." : "यदि आपको हिन्दी या अंग्रेजी में सहायता की आवश्यकता है तो हेल्पलाइन नंबर पर संपर्क करें। हमारे कार्यालय सहायक सहर्ष आपकी मदद करेंगे।"}
                </p>
              </div>
            </div>
          </div>

          {/* Map & GPS Section */}
          <div id="campus-location" className="lg:col-span-6 flex flex-col justify-between gap-0">
            <div className="bg-surface border border-border rounded-3xl shadow-xs flex-1 flex flex-col overflow-hidden">
              {/* Map header */}
              <div className="relative bg-gradient-to-r from-primary/5 to-accent/5 p-6 md:p-8 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center shadow-sm border border-primary/10">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-neutral-dark leading-none">
                      {t.contact.gpsTitle}
                    </h3>
                    <p className="text-[11px] text-neutral-body font-medium mt-1.5">
                      {t.contact.gpsSubtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1">
                <p className="text-xs sm:text-sm text-neutral-body leading-relaxed mb-6 font-medium">
                  {t.contact.gpsDesc}
                </p>

                {/* Map embed with premium border */}
                <div className="relative w-full aspect-video rounded-2xl border-2 border-border overflow-hidden shadow-sm bg-neutral-light mb-6 flex-1 min-h-[250px]">
                  <iframe
                    title="Nav Jeevan Public School Campus Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.2831206161474!2d83.70648051493035!3d26.87901608307221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993fb10720e70e7%3A0xd607f29150455540!2sNav%20Jeevan%20Public%20School!5e0!3m2!1sen!2sin!4v1717282800000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>

                {/* GPS Action button */}
                <a
                  href="https://www.google.com/maps/place/Nav+Jeevan+Public+School/@26.8790161,83.7086692,17z/data=!3m1!4b1!4m6!3m5!1s0x3993fb10720e70e7:0xd607f29150455540!8m2!3d26.8790161!4d83.7086692!16s%2Fg%2F1q64qk6fg?hl=en&entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-primary text-white rounded-xl font-extrabold text-xs hover:bg-primary-hover shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/20 transition-all focus:outline-none self-start"
                >
                  <Navigation className="w-4 h-4 shrink-0" />
                  <span>{t.common.gpsDirections}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
