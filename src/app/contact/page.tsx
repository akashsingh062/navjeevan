import React from "react";
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
  Info
} from "lucide-react";

export const metadata = {
  title: "Contact & Helpline Desk | Nav Jeevan Public School Kushinagar",
  description:
    "Connect with Nav Jeevan Public School Khabharabhar, Kaptanganj. Find direct phone hotlines, WhatsApp admissions chat links, office hours, and interactive campus map coordinates.",
};

export default function ContactPage() {
  const contactDirectory = [
    {
      title: "General Hotline",
      detail: "+91 7880952150",
      desc: "For general admission queries, parent updates, and document requests.",
      actionLabel: "Call Helpline",
      href: "tel:+917880952150",
      icon: Phone,
      accentBg: "bg-primary-light",
      accentText: "text-primary",
      borderColor: "border-primary/10"
    },
    {
      title: "WhatsApp Admissions",
      detail: "Chat Directly",
      desc: "Instant text helpline with admissions officers regarding class structures.",
      actionLabel: "Message Desk",
      href: "https://wa.me/917880952150?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry.",
      icon: MessageSquare,
      accentBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accentText: "text-emerald-700",
      borderColor: "border-emerald-200/50"
    },
    {
      title: "Email Support Desk",
      detail: "info@navjeevanschool.org",
      desc: "For transfer requests, complaints, official records, or feedback submissions.",
      actionLabel: "Send Email",
      href: "mailto:info@navjeevanschool.org",
      icon: Mail,
      accentBg: "bg-accent-light",
      accentText: "text-accent",
      borderColor: "border-accent/10"
    },
    {
      title: "Campus Office Hours",
      detail: "08:00 AM - 01:30 PM",
      desc: "Subsidized fee counters and physical document reception are active Mon - Sat.",
      actionLabel: "Visit Campus",
      href: "#campus-location",
      icon: Clock,
      accentBg: "bg-neutral-light",
      accentText: "text-neutral-dark",
      borderColor: "border-border"
    }
  ];

  return (
    <div className="py-12 bg-background flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================
            1. HERO HEADER BLOCK
            ========================================================= */}
        <div className="relative overflow-hidden bg-linear-to-br from-primary to-neutral-dark text-white rounded-3xl p-8 md:p-12 mb-16 shadow-lg">
          {/* Decorative backdrop shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] uppercase font-black text-white/90 bg-white/15 border border-white/20 px-3 py-1 rounded-full tracking-widest inline-block mb-4">
              Helpline Directory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
              Campus Contacts & Helplines
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              Have questions about admission processes, subsidised fee structures, or campus visits? 
              Connect with our administrative leads directly from your mobile phone or visit our Khabharabhar campus.
            </p>
          </div>
        </div>

        {/* =========================================================
            2. HELPLINE DIRECTORY CARDS GRID
            ========================================================= */}
        <section className="mb-16">
          <SectionHeading
            accent="Helpline Desk"
            title="Helpline Directory"
            subtitle="Trigger direct dial, direct message, or email actions immediately from your smartphone."
            centered
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {contactDirectory.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div 
                  key={idx}
                  className={`bg-surface border ${card.borderColor} rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-primary/30 transition-all duration-300 relative group overflow-hidden`}
                >
                  {/* Saffron border indicator */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${card.accentBg}`} />

                  <div>
                    {/* Icon container */}
                    <div className={`w-10 h-10 rounded-xl ${card.accentBg} ${card.accentText} flex items-center justify-center mb-4 shrink-0 shadow-2xs`}>
                      <CardIcon className="w-5 h-5" />
                    </div>

                    <h4 className="text-[11px] font-black tracking-wider uppercase text-neutral-body/75">
                      {card.title}
                    </h4>
                    <p className="text-base font-black text-neutral-dark mt-1 leading-snug break-words">
                      {card.detail}
                    </p>
                    <p className="text-xs text-neutral-body mt-3 leading-relaxed font-medium">
                      {card.desc}
                    </p>
                  </div>

                  {/* Tactile Action Button */}
                  <div className="pt-6 mt-6 border-t border-border">
                    <a
                      href={card.href}
                      className={`w-full py-2.5 rounded-xl text-center font-bold text-xs shadow-2xs group-hover:shadow-xs transition-all flex items-center justify-center gap-1.5 focus:outline-none ${
                        card.accentBg.includes("primary") || card.accentBg.includes("emerald")
                          ? "bg-primary text-white hover:bg-primary-hover"
                          : "bg-neutral-light text-neutral-dark hover:bg-neutral-light/75 border border-border"
                      }`}
                    >
                      <span>{card.actionLabel}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            3. ADMINISTRATIVE & MAPS DESK (2-Column Grid)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left Column: Administrative Visit Guidance */}
          <div className="lg:col-span-6 bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-xs flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center">
                  <UserCheck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-neutral-dark leading-none">
                    Administrative Guidance Desk
                  </h3>
                  <p className="text-[11px] text-neutral-body font-medium mt-1">
                    Guidance for Campus Visitors & Parent Interviews
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* Principal Appointments */}
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      Principal Interview Desk
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5 font-medium">
                      Interviews and student performance cards reviews are conducted directly with 
                      the Principal, Mon - Sat between <strong>11:30 AM and 01:00 PM</strong>. 
                      Prior telephone reservation is highly recommended.
                    </p>
                  </div>
                </div>

                {/* Subsidized fee & Transfer certificates */}
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      Fees, Subsidies & TCs Counter
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5 font-medium">
                      All monthly subsidised fee depositions, sibling concession audits, and 
                      Transfer Certificate (TC) applications are processed exclusively at 
                      <strong>Counter No. 1</strong> from 08:30 AM to 01:00 PM.
                    </p>
                  </div>
                </div>

                {/* Safety & visitor rules */}
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      Visitor Registry & Safety Rules
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5 font-medium">
                      To safeguard our 1,200+ students, all campus visitors and parents must 
                      register their names, purpose, and mobile numbers in the gatekeeper&apos;s 
                      log book. Out-of-hours student dismissals require gate pass authorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-neutral-body font-medium mt-8 bg-neutral-light p-3.5 rounded-xl border border-border">
              <strong>Bilingual Assistance:</strong> Dial the Helpline if you need assistance in Hindi or English. 
              Our office clerk will assist you cheerfully.
            </div>
          </div>

          {/* Right Column: Campus Location Map Directions */}
          <div id="campus-location" className="lg:col-span-6 flex flex-col justify-between gap-6 text-left">
            <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                    <MapPin className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-neutral-dark leading-none">
                      Map & GPS Directions
                    </h3>
                    <p className="text-[11px] text-neutral-body font-medium mt-1">
                      Khabharabhar Campus, Kaptanganj, Kushinagar
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-body leading-relaxed mb-6 font-medium">
                  Located in Khabharabhar, just a short distance from the main Kaptanganj Block Road. 
                  Highly accessible for school buses, personal two-wheelers, and transport routes.
                </p>

                {/* Google Map Iframe */}
                <div className="relative w-full aspect-video rounded-2xl border border-border overflow-hidden shadow-2xs bg-neutral-light mb-6">
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
              </div>

              {/* Action Targets */}
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://www.google.com/maps/place/Nav+Jeevan+Public+School/@26.8790161,83.7086692,17z/data=!3m1!4b1!4m6!3m5!1s0x3993fb10720e70e7:0xd607f29150455540!8m2!3d26.8790161!4d83.7086692!16s%2Fg%2F1q64qk6fg?hl=en&entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-extrabold text-xs hover:bg-primary-hover shadow-xs transition-colors focus:outline-none"
                >
                  <Navigation className="w-4 h-4 shrink-0" />
                  <span>Get GPS Directions</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
