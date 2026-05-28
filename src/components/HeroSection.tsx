"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/hero-banner.png",
    title: "Nav Jeevan Public School",
    subtitle: "Empowering Rural Minds Through Quality Education",
    tag: "Session 2026–27 Admissions Open",
    cta: { label: "Apply for Admission", href: "/admissions" },
  },
  {
    id: 2,
    image: "/hero-slide2.png",
    title: "Morning Assembly & Values",
    subtitle: "Discipline, Devotion & Daily Learning — Nurturing Whole Persons",
    tag: "CBSE Pattern · Hindi & English Medium",
    cta: { label: "Explore Facilities", href: "/facilities" },
  },
  {
    id: 3,
    image: "/hero-slide3.png",
    title: "Annual Sports Day",
    subtitle: "Building Character, Competence & Community Since 2008",
    tag: "1,200+ Students · 35+ Dedicated Educators",
    cta: { label: "Know More About Us", href: "/about" },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((indexOrUpdater: number | ((prev: number) => number)) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(prev => typeof indexOrUpdater === "function" ? indexOrUpdater(prev) : indexOrUpdater);
      setTransitioning(false);
    }, 350);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((c: number) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [goTo]);

  const prev = () => goTo((c: number) => (c - 1 + slides.length) % slides.length);
  const next = () => goTo((c: number) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(230px, 46vw, 540px)" }}>

      {/* === All slide images stacked, only active one visible === */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current && !transitioning ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* === Persistent overlay (above all images, z-index 2) === */}
      <div className="absolute inset-0 bg-linear-to-r from-neutral-dark/85 via-neutral-dark/50 to-transparent" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-linear-to-t from-neutral-dark/55 via-transparent to-transparent" style={{ zIndex: 2 }} />

      {/* === Slide Content (z-index 3) === */}
      <div
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center transition-opacity duration-300"
        style={{ zIndex: 3, opacity: transitioning ? 0 : 1 }}
      >
        <div className="max-w-xl">
          {/* Tag badge */}
          <span className="inline-block bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 sm:mb-4">
            {slide.tag}
          </span>

          {/* Title */}
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md mb-2 sm:mb-3">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-white/85 font-medium leading-relaxed mb-4 sm:mb-6 max-w-md drop-shadow">
            {slide.subtitle}
          </p>

          {/* CTA */}
          <Link
            href={slide.cta.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95"
          >
            <span>{slide.cta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* === Prev/Next Controls (z-index 4) === */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/55 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-90"
        aria-label="Previous slide"
        style={{ zIndex: 4 }}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/55 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-90"
        aria-label="Next slide"
        style={{ zIndex: 4 }}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* === Dot Indicators (z-index 4) === */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 4 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/45 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* === Slide counter (top-right) === */}
      <div
        className="absolute top-3 right-3 sm:right-6 bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
        style={{ zIndex: 4 }}
      >
        {current + 1} / {slides.length}
      </div>
    </section>
  );
}
