import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { navLinks } from "@/lib/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark text-gray-300 pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Brand & Intro */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xl font-black text-white tracking-tight block">
                Nav Jeevan Public School
              </span>
              <span className="text-xs uppercase font-bold text-accent tracking-widest block mt-0.5">
                Kushinagar, Uttar Pradesh
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              A co-educational English & Hindi medium school affiliated with
              CBSE standards, dedicated to raising the level of education and
              empowerment in rural regions.
            </p>
            {/* Quick WhatsApp Admissions button */}
            <div className="mt-2">
              <a
                href="https://wa.me/917880952150?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white font-bold text-xs rounded-xl hover:bg-accent-hover transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Admission Help Desk
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 tracking-wide uppercase border-b border-gray-800 pb-2">
              Quick Links
            </h3>
            <ul
              className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm"
              aria-label="Footer Navigation"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors block py-1 font-medium hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* School Timings & Admin Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 tracking-wide uppercase border-b border-gray-800 pb-2">
              School Hours
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm text-gray-400">
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-300">
                    Summer Timings:
                  </span>
                  <span className="block text-xs mt-0.5">
                    07:30 AM - 12:30 PM (Mon - Sat)
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-300">
                    Winter Timings:
                  </span>
                  <span className="block text-xs mt-0.5">
                    08:30 AM - 01:30 PM (Mon - Sat)
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-300">Sunday:</span>
                  <span className="block text-xs mt-0.5">Closed (Holiday)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 tracking-wide uppercase border-b border-gray-800 pb-2">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Khabharabhar, Captanganj,
                  <br />
                  Kushinagar, Uttar Pradesh - 274301
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+917880952150"
                  className="hover:text-white hover:underline transition-colors font-semibold"
                >
                  +917880952150
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@navjeevanschool.org"
                  className="hover:text-white hover:underline transition-colors break-all"
                >
                  info@navjeevanschool.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Base Details / Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-normal">
          <p>© {currentYear} Nav Jeevan Public School. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Affiliation Code: CBSE Pattern</span>
            <span>Medium: Hindi & English</span>
          </div>
        </div>
      </div>

      {/* Structured Local Business/School Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "School",
            name: "Nav Jeevan Public School",
            image: "https://navjeevanschool.org/images/logo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Khabharabhar, Captanganj",
              addressLocality: "Kushinagar",
              addressRegion: "Uttar Pradesh",
              postalCode: "274301",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "26.9272",
              longitude: "83.7188",
            },
            url: "https://navjeevanschool.org",
            telephone: "+917880952150",
            email: "info@navjeevanschool.org",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "07:30",
                closes: "13:30",
              },
            ],
            priceRange: "₹",
            hasMap: "https://maps.google.com",
          }),
        }}
      />
    </footer>
  );
}
