import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Users, Monitor, Trophy } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/hero-banner.jpg",
    title: "Nav Jeevan Public School Khabharabhar",
    subtitle:
      "NJPS Kushinagar: Empowering rural minds through top-tier UP-pattern education since 2011.",
    tag: "Session 2026–27 Admissions Open",
    cta: { label: "Apply for Admission", href: "/admissions?tab=apply" },
  },
  {
    id: 2,
    image: "/national.jpg",
    title: "Nav Jeevan Public School",
    subtitle:
      "Discipline, devotion, and academic excellence at NJPS Kushinagar — UP pattern learning.",
    tag: "UP Pattern · Hindi & English Medium",
    cta: { label: "Explore Facilities", href: "/facilities" },
  },
  {
    id: 3,
    image: "/anual.jpg",
    title: "Annual Day Celebrations at NJPS",
    subtitle:
      "Building strong character, digital competence, and active community at Nav Jeevan School Khabharabhar.",
    tag: "Cultural Events, Dances & Prize Distribution",
    cta: { label: "Know More About Us", href: "/about" },
  },
];

const stats = [
  { icon: GraduationCap, value: "500+", label: "Students" },
  { icon: Users, value: "25+", label: "Teachers" },
  { icon: Trophy, value: "15+", label: "Years" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (indexOrUpdater: number | ((prev: number) => number)) => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) =>
          typeof indexOrUpdater === "function"
            ? indexOrUpdater(prev)
            : indexOrUpdater,
        );
        setTransitioning(false);
      }, 350);
    },
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((c: number) => (c + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [goTo]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(520px, 75vh, 900px)" }}
    >
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current && !transitioning ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
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

      {/* Overlays */}
      <div
        className="absolute inset-0 bg-linear-to-r from-neutral-dark/90 via-neutral-dark/60 to-neutral-dark/20"
        style={{ zIndex: 2 }}
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-neutral-dark/70 via-transparent to-neutral-dark/20"
        style={{ zIndex: 2 }}
      />
      {/* Subtle gradient overlay for premium feel */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          zIndex: 2,
          background: "linear-gradient(135deg, rgba(212,98,26,0.15) 0%, transparent 50%, rgba(26,107,69,0.1) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center transition-opacity duration-300"
        style={{ zIndex: 3, opacity: transitioning ? 0 : 1 }}
      >
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {slide.tag}
          </span>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md mb-2 sm:mb-3">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-white/85 font-medium leading-relaxed mb-5 sm:mb-7 max-w-md drop-shadow">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={slide.cta.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 hover:shadow-xl"
            >
              <span>{slide.cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-xl font-bold text-xs sm:text-sm backdrop-blur-sm transition-all"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </div>


      {/* Bottom stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 hidden sm:block"
        style={{ zIndex: 4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-stretch backdrop-blur-md bg-white/10 border border-white/15 rounded-t-2xl overflow-hidden divide-x divide-white/10">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 stat-card"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <div className="flex flex-col leading-none">
                    <span className="text-sm font-black text-white">{stat.value}</span>
                    <span className="text-[10px] text-white/60 font-semibold">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
