import React from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Clock, Navigation } from "lucide-react";

export const metadata = {
  title: "Find Us | Nav Jeevan Public School",
  description:
    "Location and directions to Nav Jeevan Public School, Khabharabhar, Kaptanganj, Kushinagar, Uttar Pradesh.",
};

export default function FindUsPage() {
  return (
    <div className="flex-1 bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-light border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-neutral-body">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-dark font-semibold">Find Us</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-10 bg-primary rounded-full" />
          <span className="text-xs font-black text-primary uppercase tracking-widest">
            Location
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark mb-8">
          Find Us
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Address */}
          <div className="bg-neutral-light rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-light rounded-xl flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-sm font-extrabold text-neutral-dark">
                Our Address
              </h2>
            </div>
            <address className="not-italic text-sm text-neutral-body leading-relaxed">
              <strong className="text-neutral-dark">
                Nav Jeevan Public School
              </strong>
              <br />
              Khabharabhar, Kaptanganj
              <br />
              Kushinagar, Uttar Pradesh
              <br />
              PIN – 274301
              <br />
              India
            </address>
          </div>

          {/* Contact */}
          <div className="bg-neutral-light rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-light rounded-xl flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-sm font-extrabold text-neutral-dark">
                Contact
              </h2>
            </div>
            <div className="flex flex-col gap-2 text-sm text-neutral-body">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-body/70">
                  Phone
                </span>
                <a
                  href="tel:+917880952150"
                  className="block font-bold text-neutral-dark hover:text-primary transition-colors"
                >
                  +91 7880952150
                </a>
              </div>
              <div className="mt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-body/70">
                  Office Hours
                </span>
                <p className="font-semibold text-neutral-dark flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Mon – Sat, 8:00
                  AM – 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map embed */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
          <div className="bg-neutral-dark text-white px-4 py-3 flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            <span className="text-sm font-bold">
              Map — Kaptanganj, Kushinagar
            </span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.2831206161474!2d83.70648051493035!3d26.87901608307221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993fb10720e70e7%3A0xd607f29150455540!2sNav%20Jeevan%20Public%20School!5e0!3m2!1sen!2sin!4v1717282800000!5m2!1sen!2sin"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nav Jeevan Public School Location — Kaptanganj, Kushinagar"
          />
        </div>

        <div className="mt-5 flex gap-3 flex-wrap">
          <a
            href="https://www.google.com/maps/place/Nav+Jeevan+Public+School/@26.8790161,83.7086692,17z/data=!3m1!4b1!4m6!3m5!1s0x3993fb10720e70e7:0xd607f29150455540!8m2!3d26.8790161!4d83.7086692!16s%2Fg%2F1q64qk6fg?hl=en&entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-hover transition-all"
          >
            <Navigation className="w-4 h-4" />
            Open in Google Maps
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-neutral-dark rounded-xl font-bold text-sm hover:bg-neutral-light transition-all"
          >
            Contact Us
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
