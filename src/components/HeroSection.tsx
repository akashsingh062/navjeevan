import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/hero-banner.jpg",
    title: "Nav Jeevan Public School",
    subtitle: "Empowering Rural Minds Through Quality Education",
    tag: "Session 2026–27 Admissions Open",
    cta: { label: "Apply for Admission", href: "/admissions" },
  },
  {
    id: 2,
    image: "/national.jpg",
    title: "Morning Assembly & Values",
    subtitle: "Discipline, Devotion & Daily Learning — Nurturing Whole Persons",
    tag: "CBSE Pattern · Hindi & English Medium",
    cta: { label: "Explore Facilities", href: "/facilities" },
  },
  {
    id: 3,
    image: "/anual.jpg",
    title: "Annual Day Celebrations",
    subtitle: "Building Character, Competence & Community Since 2011",
    tag: "Cultural Events, Dances & Prize Distribution",
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

  
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((c: number) => (c + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [goTo]);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(520px, 75vh, 900px)" }}>

      
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

      
      <div className="absolute inset-0 bg-linear-to-r from-neutral-dark/85 via-neutral-dark/50 to-transparent" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-linear-to-t from-neutral-dark/55 via-transparent to-transparent" style={{ zIndex: 2 }} />

      
      <div
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center transition-opacity duration-300"
        style={{ zIndex: 3, opacity: transitioning ? 0 : 1 }}
      >
        <div className="max-w-xl">
          
          <span className="inline-block bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 sm:mb-4">
            {slide.tag}
          </span>

          
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md mb-2 sm:mb-3">
            {slide.title}
          </h1>

          
          <p className="text-xs sm:text-sm lg:text-base text-white/85 font-medium leading-relaxed mb-4 sm:mb-6 max-w-md drop-shadow">
            {slide.subtitle}
          </p>

          
          <Link
            href={slide.cta.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95"
          >
            <span>{slide.cta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
