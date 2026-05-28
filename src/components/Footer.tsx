import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { navLinks } from "@/lib/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark text-gray-300 border-t-4 border-primary">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-black text-white block leading-tight">
                  Nav Jeevan Public School
                </span>
                <span className="text-[9px] uppercase font-bold text-accent tracking-widest">
                  Kushinagar, UP
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Co-educational Hindi & English medium school. CBSE pattern.
              Empowering rural students in Kaptanganj since 2008.
            </p>
            <a
              href="https://wa.me/917880952150?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white font-bold text-xs rounded-xl hover:bg-accent-hover transition-colors self-start"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Admissions
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider border-b border-gray-800 pb-2">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 gap-x-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors font-medium block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* School Hours */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider border-b border-gray-800 pb-2">
              School Hours
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li className="flex gap-2.5">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-gray-300 text-xs">
                    Summer (Apr–Sep)
                  </span>
                  <span className="block text-xs mt-0.5">
                    07:30 AM – 12:30 PM
                  </span>
                </div>
              </li>
              <li className="flex gap-2.5">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-gray-300 text-xs">
                    Winter (Oct–Mar)
                  </span>
                  <span className="block text-xs mt-0.5">
                    08:30 AM – 01:30 PM
                  </span>
                </div>
              </li>
              <li className="flex gap-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-gray-300 text-xs">
                    Sunday
                  </span>
                  <span className="block text-xs mt-0.5">Closed (Holiday)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider border-b border-gray-800 pb-2">
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm text-gray-400">
              <li className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed text-xs">
                  Khabharabhar, Kaptanganj, Kushinagar, UP – 274301
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+917880952150"
                  className="hover:text-white transition-colors font-semibold text-xs"
                >
                  +91 7880952150
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:info@navjeevanschool.org"
                  className="hover:text-white transition-colors break-all text-xs"
                >
                  info@navjeevanschool.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {currentYear} Nav Jeevan Public School. All rights reserved.</p>
          <div className="flex gap-4">
            <span>CBSE Pattern</span>
            <span>Hindi & English Medium</span>
          </div>
        </div>
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "School",
            name: "Nav Jeevan Public School",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Khabharabhar, Kaptanganj",
              addressLocality: "Kushinagar",
              addressRegion: "Uttar Pradesh",
              postalCode: "274301",
              addressCountry: "IN",
            },
            url: "https://navjeevanschool.org",
            telephone: "+917880952150",
            email: "info@navjeevanschool.org",
          }),
        }}
      />
    </footer>
  );
}
