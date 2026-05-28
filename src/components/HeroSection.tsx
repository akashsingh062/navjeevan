import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-neutral-dark via-gray-900 to-primary py-20 lg:py-28 text-white overflow-hidden border-b-4 border-accent">
      {/* Dynamic background layout overlays (Zero weights, pure CSS vectors) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,163,74,0.15),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.2),transparent)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -mr-24 -mb-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text details */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
            
            {/* CBSE Affiliation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/25 border border-accent/40 rounded-full font-black text-xs uppercase tracking-widest text-white">
              <Award className="w-4 h-4 text-accent" />
              <span>CBSE Pattern • Both Hindi & English Medium</span>
            </div>

            {/* School Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
              Nav Jeevan <br className="hidden sm:inline" />
              <span className="text-primary">Public School</span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              Empowering rural communities in Kushinagar through affordable, high-quality, smart education. Shaping active minds and characters from Nursery to Class XII.
            </p>

            {/* Touch-optimized actions grid */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/admissions"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-md focus:outline-none text-sm cursor-pointer"
              >
                <span>Admission 2026-27</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl font-bold transition-all focus:outline-none text-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Office</span>
              </Link>
            </div>

            {/* School location summary */}
            <p className="text-xs text-gray-400 font-semibold tracking-wide">
              📍 Khabharabhar, Captanganj, Kushinagar, Uttar Pradesh - 274301
            </p>

          </div>

          {/* Interactive highlight box (Visual representation of school values, instead of a heavy image) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm flex flex-col gap-6 shadow-xl relative">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent animate-pulse" />
              
              <h3 className="text-lg font-extrabold text-white tracking-wide border-b border-white/10 pb-3">
                Key Announcements
              </h3>
              
              <div className="flex flex-col gap-4.5">
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center font-bold text-accent shrink-0 text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">Registration Open</h4>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed font-normal">
                      Collect offline forms from Captanganj school counter today.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary shrink-0 text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">Smart IT Lab Setup</h4>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed font-normal">
                      Equipped with 20+ computer seats for student practical exercises.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center font-bold text-amber-500 shrink-0 text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">Vedic Math Classes</h4>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed font-normal">
                      Special weekly speed calculation sessions for class VI onwards.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
