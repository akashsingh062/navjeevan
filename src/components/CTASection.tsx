import React from "react";
import Link from "next/link";
import { Phone, ArrowRight, FileText } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-linear-to-br from-primary via-[#C55218] to-[#A83F10] text-white relative overflow-hidden">
      {}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.06),transparent)]" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {}
        <div className="flex justify-center mb-5">
          <span className="inline-block bg-white/15 border border-white/20 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest text-white">
            Session 2026–2027 · Admissions Open Now
          </span>
        </div>

        {}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-center leading-tight tracking-tight max-w-2xl mx-auto">
          Give Your Child a Bright Future with Quality Education
        </h2>

        {}
        <p className="mt-4 text-sm sm:text-base text-white/80 text-center max-w-xl mx-auto leading-relaxed font-medium">
          Enrollment open from Nursery to Class XII. Smart classrooms, computer lab, experienced teachers — all in Kushinagar.
        </p>

        {}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <Link
            href="/admissions"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-primary hover:bg-neutral-light rounded-2xl font-black text-sm shadow-lg transition-all active:scale-95"
          >
            <span>Apply for Admission</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/admissions#download"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white/12 border border-white/25 text-white hover:bg-white/18 rounded-2xl font-bold text-sm transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Download Form</span>
          </Link>
        </div>

        {}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/60">
          <Phone className="w-3.5 h-3.5" />
          <span>Helpline: <strong className="text-white/90">+91 7880952150</strong></span>
        </div>
      </div>
    </section>
  );
}
