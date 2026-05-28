import React from "react";
import Link from "next/link";
import { Phone, FileText, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 bg-linear-to-br from-primary to-blue-700 text-white rounded-3xl overflow-hidden shadow-lg relative my-12 mx-4 sm:mx-6 lg:mx-8">
      {/* Decorative backdrop patterns (pure CSS for maximum performance and zero weight) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Admission open badge */}
        <span className="inline-block bg-accent px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-sm mb-4">
          Session 2026 - 2027 Admissions Open
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight max-w-2xl">
          Give Your Child the Gift of Quality English & Hindi Medium Education
        </h2>

        {/* Description */}
        <p className="mt-4 text-base md:text-lg text-blue-100 max-w-xl font-medium leading-relaxed">
          Enrollment is open from Nursery to Class XII. Secure a brighter future with computer training, smart classrooms, and expert teachers in Kushinagar.
        </p>

        {/* Action button grids */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link
            href="/admissions"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-white text-primary hover:bg-neutral-light rounded-xl font-bold transition-all shadow-md focus:outline-none"
          >
            <span>Apply Online Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/admissions#download"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-primary-hover border border-white/20 text-white hover:bg-primary/80 rounded-xl font-bold transition-all focus:outline-none"
          >
            <FileText className="w-4 h-4" />
            <span>Download Admission Form</span>
          </Link>
        </div>

        {/* Quick helper desk note */}
        <div className="mt-6 flex items-center gap-2 text-xs text-blue-200">
          <Phone className="w-3.5 h-3.5" />
          <span>Need help? Call our Helpline: <strong>+91 7880952150</strong></span>
        </div>
      </div>
    </section>
  );
}
