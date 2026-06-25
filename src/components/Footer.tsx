"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  ArrowUp,
  Compass,
  ExternalLink,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { navLinks } from "@/lib/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const currentYear = new Date().getFullYear();

  const { language } = useLanguage();
  const t = translations[language];

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const translatedNavLinks = navLinks.map((link) => {
    let label = link.label;
    if (link.label === "Home") label = t.nav.home;
    else if (link.label === "About") label = t.nav.about;
    else if (link.label === "Academics") label = t.nav.academics;
    else if (link.label === "Admissions") label = t.nav.admissions;
    else if (link.label === "Faculty") label = t.nav.faculty;
    else if (link.label === "Facilities") label = t.nav.facilities;
    else if (link.label === "Gallery") label = t.nav.gallery;
    else if (link.label === "Notices") label = t.nav.notices;
    else if (link.label === "Contact") label = t.nav.contact;
    return { ...link, label };
  });

  const exploreLinks = translatedNavLinks.filter((link) =>
    ["/", "/about", "/academics", "/admissions", "/facilities"].includes(
      link.href,
    ),
  );

  const infoLinks = translatedNavLinks.filter((link) =>
    ["/faculty", "/gallery", "/notices", "/contact"].includes(link.href),
  );

  return (
    <footer className="relative bg-neutral-dark text-gray-300 border-t border-gray-800 overflow-hidden">
      {}
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-amber-500 to-accent" />

      {}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,98,26,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,107,69,0.06),transparent_50%)] pointer-events-none" />

      {}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {}
          <div className="md:col-span-4 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-md">
                <Image
                  src="/navjeevanLogo.jpeg"
                  alt="Nav Jeevan Public School Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <span className="text-lg font-black text-white block leading-tight tracking-tight">
                  Nav Jeevan Public School
                </span>
                <span className="text-[10px] uppercase font-black text-accent tracking-wider block mt-0.5">
                  {language === "en"
                    ? "Kushinagar, Uttar Pradesh"
                    : "कुशीनगर, उत्तर प्रदेश"}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
              {language === "en"
                ? "Established in 2011, empowering rural students in Kaptanganj block through quality, modern co-education. Specially tailored class curriculum for developmental stages LKG to VIII."
                : "2011 में स्थापित, कप्तानगंज ब्लॉक में गुणवत्तापूर्ण, आधुनिक सह-शिक्षा के माध्यम से ग्रामीण छात्रों को सशक्त बनाना। LKG से कक्षा VIII तक के लिए विशेष रूप से तैयार पाठ्यक्रम।"}
            </p>

            {}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-dark/80 border border-gray-800 rounded-xl self-start text-[10px] text-gray-300 font-bold select-none shadow-3xs">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>{t.common.UPPattern}</span>
            </div>

            {}
            <div className="flex flex-col gap-3.5 mt-2">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-500">
                {t.common.liveChannels}
              </h4>
              <div className="flex gap-2.5 items-center">
                {}
                <a
                  href="https://wa.me/919415906899?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all duration-300 shadow-2xs hover:shadow-xs focus:outline-none"
                  aria-label="WhatsApp Admission Help Desk"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.common.admissionDesk}</span>
                </a>

                {}
                <a
                  href="https://www.facebook.com/navjeevanschool2011/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 flex items-center justify-center transition-all duration-300 hover:bg-primary/10 hover:text-primary focus:outline-none"
                  aria-label="Visit Facebook Page"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com/@navjeevanschoolkhabharabha1894?si=2HN9rK9w_PlD4gkr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 flex items-center justify-center transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 focus:outline-none"
                  aria-label="Visit YouTube Channel"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <a
                  href="https://whatsapp.com/channel/0029Vb6llG17j6g1HkdrW239"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 flex items-center justify-center transition-all duration-300 hover:bg-emerald-500/10 hover:text-emerald-500 focus:outline-none"
                  aria-label="Follow WhatsApp Channel"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.057 5.249 5.304 0 11.758 0c3.129 0 6.07 1.22 8.277 3.431 2.207 2.212 3.42 5.155 3.42 8.283 0 6.452-5.243 11.7-11.697 11.7-2.003 0-3.96-.518-5.701-1.51L0 24zm6.59-4.846c1.66.986 3.292 1.503 5.108 1.503 5.4 0 9.795-4.398 9.795-9.797 0-2.618-1.02-5.08-2.87-6.932-1.85-1.85-4.311-2.868-6.925-2.868-5.405 0-9.8 4.398-9.8 9.797-.002 1.773.461 3.504 1.34 5.025l-.974 3.564 3.666-.962zm10.867-7.15c-.294-.148-1.736-.856-2.004-.954-.268-.099-.463-.148-.658.148-.195.297-.756.954-.927 1.151-.17.196-.341.221-.635.074-.294-.148-1.24-.457-2.361-1.458-.873-.779-1.462-1.74-1.633-2.037-.17-.294-.018-.454.13-.601.132-.132.294-.345.441-.518.148-.173.197-.297.296-.494.099-.198.05-.371-.025-.518-.075-.148-.658-1.587-.9-2.18-.237-.569-.478-.492-.658-.502-.17-.009-.365-.01-.56-.01s-.51.074-.778.37c-.268.297-1.02 1.002-1.02 2.44 0 1.437 1.045 2.821 1.192 3.018.148.197 2.057 3.14 4.985 4.41.696.302 1.24.483 1.66.617.7.223 1.338.192 1.843.116.563-.084 1.736-.708 1.98-1.391.243-.684.243-1.272.17-1.391-.073-.119-.268-.198-.563-.347z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-left">
            {}
            <div>
              <h3 className="text-white font-black text-xs uppercase tracking-widest border-b border-gray-800 pb-3 mb-4">
                {t.common.exploreCampus}
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                {exploreLinks.map((link) => (
                  <li key={link.href} className="group">
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 font-medium block py-0.5 group-hover:translate-x-1 focus:outline-none focus:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {}
            <div>
              <h3 className="text-white font-black text-xs uppercase tracking-widest border-b border-gray-800 pb-3 mb-4">
                {t.common.information}
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                {infoLinks.map((link) => (
                  <li key={link.href} className="group">
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 font-medium block py-0.5 group-hover:translate-x-1 focus:outline-none focus:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {}
          <div className="md:col-span-4 flex flex-col gap-6 text-left">
            {}
            <div>
              <h3 className="text-white font-black text-xs uppercase tracking-widest border-b border-gray-800 pb-3 mb-4">
                {t.common.campusTimings}
              </h3>

              <div className="flex flex-col gap-3 text-sm text-gray-400">
                {}
                <div className="flex gap-2.5 items-start">
                  <div className="relative w-2 h-2 mt-1.5 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-45 scale-125" />
                    <div className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-200 text-xs">
                      {t.common.summerHours}
                    </span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">
                      07:30 AM – 12:30 PM ({t.common.daysMonSat})
                    </span>
                  </div>
                </div>

                {}
                <div className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="block font-bold text-gray-200 text-xs">
                      {t.common.winterHours}
                    </span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">
                      08:30 AM – 01:30 PM ({t.common.daysMonSat})
                    </span>
                  </div>
                </div>

                {}
                <div className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="block font-bold text-gray-200 text-xs">
                      {t.common.sundayTimings}
                    </span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">
                      {t.common.sundayStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 group relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-light/10 text-primary flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-primary group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    {t.common.directionsDesk}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1 leading-normal font-medium">
                    {language === "en"
                      ? "26.8790° N, 83.7087° E. Khabharabhar Campus, Kaptanganj."
                      : "26.8790° उ, 83.7087° पू. खबरभार परिसर, कप्तानगंज।"}
                  </p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/place/Nav+Jeevan+Public+School/@26.8790161,83.7086692,17z/data=!3m1!4b1!4m6!3m5!1s0x3993fb10720e70e7:0xd607f29150455540!8m2!3d26.8790161!4d83.7086692!16s%2Fg%2F1q64qk6fg?hl=en&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 w-full py-2 bg-neutral-dark hover:bg-primary border border-gray-800 hover:border-primary text-gray-300 hover:text-white font-extrabold text-[10px] rounded-xl text-center transition-all duration-300 flex items-center justify-center gap-1 focus:outline-none shadow-3xs"
              >
                <span>{t.common.openGps}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            {}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-dark/80 border border-gray-800 rounded-xl self-start text-[10px] text-gray-400 font-medium select-none shadow-3xs">
              <Languages className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>{t.common.bilingualSupport}</span>
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-gray-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center sm:text-left">
            <p>
              © {currentYear} Nav Jeevan Public School.{" "}
              {t.common.rightsReserved}
            </p>
            <span className="hidden sm:inline text-gray-700">•</span>
            <p className="flex items-center gap-1">
              <span>{t.common.madeInKushinagar}</span>
            </p>
          </div>

          <div className="flex items-center gap-4.5">
            <span className="text-[10px] font-black text-gray-500 border border-gray-800 rounded-md px-1.5 py-0.5 tracking-wider uppercase">
              {language === "en" ? "Affiliated Model" : "सम्बद्ध मॉडल"}
            </span>

            {}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 hover:bg-primary hover:border-primary text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer group focus:outline-none"
              aria-label="Scroll to top of the page"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "School",
            name: "Nav Jeevan Public School",
            alternateName: [
              "NJPS",
              "NJPS Khabharabhar",
              "NJPS Kushinagar",
              "Nav Jeevan Public School",
              "Nav Jeevan Public School Khabharabhar",
              "नव जीवन पब्लिक स्कूल",
              "नव जीवन पब्लिक स्कूल खभरबहार",
            ],
            description:
              "Nav Jeevan Public School (NJPS) is a co-educational UP-pattern school in Khabharabhar, Kaptanganj, Kushinagar, Uttar Pradesh, offering English and Hindi medium education from Nursery to Class 8 with smart classrooms, computer labs, and holistic development programs.",
            url: "https://njpskhabharabhar.vercel.app",
            logo: "https://njpskhabharabhar.vercel.app/logo.png",
            image: "https://njpskhabharabhar.vercel.app/about-students.png",
            telephone: "+919889897057",
            email: "navjeevanschool2011@gmail.com",
            foundingDate: "2011",
            award: "Affiliated to UP Pattern",
            knowsAbout: [
              "UP Curriculum",
              "Primary Education",
              "IT Literacy",
              "Holistic Child Development",
            ],
            sameAs: [
              "https://www.facebook.com/navjeevanschool2011/",
              "https://youtube.com/@navjeevanschoolkhabharabha1894?si=2HN9rK9w_PlD4gkr",
              "https://whatsapp.com/channel/0029Vb6llG17j6g1HkdrW239"
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Khabharabhar, Kaptanganj",
              addressLocality: "Kushinagar",
              addressRegion: "Uttar Pradesh",
              postalCode: "274301",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 26.7348,
              longitude: 83.7889,
            },
            areaServed: [
              {
                "@type": "City",
                name: "Kaptanganj",
              },
              {
                "@type": "AdministrativeArea",
                name: "Kushinagar",
              },
              {
                "@type": "State",
                name: "Uttar Pradesh",
              },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Academic Programs",
              itemListElement: [
                {
                  "@type": "Course",
                  name: "Nursery to UKG (Pre-Primary)",
                  description:
                    "Activity-based early childhood education program",
                },
                {
                  "@type": "Course",
                  name: "Class 1 to Class 5 (Primary)",
                  description:
                    "UP-pattern primary education in English and Hindi medium",
                },
                {
                  "@type": "Course",
                  name: "Class 6 to Class 8 (Middle School)",
                  description:
                    "UP-pattern middle school education with science labs and computer training",
                },
              ],
            },
            amenityFeature: [
              {
                "@type": "LocationFeatureSpecification",
                name: "Smart Classrooms",
              },
              { "@type": "LocationFeatureSpecification", name: "Computer Lab" },
              { "@type": "LocationFeatureSpecification", name: "Library" },
              { "@type": "LocationFeatureSpecification", name: "Playground" },
              {
                "@type": "LocationFeatureSpecification",
                name: "Assembly Hall",
              },
            ],
          }),
        }}
      />
    </footer>
  );
}
