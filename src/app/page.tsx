import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Lock,
  ChevronRight,
  Target,
  Lightbulb,
  Compass,
  Users,
  BookOpen,
  ArrowRight,
  Phone,
  Award,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import NoticeCard from "@/components/NoticeCard";
import GalleryGrid from "@/components/GalleryGrid";
import CTASection from "@/components/CTASection";
import { getNotices, getGallery } from "@/lib/dataManager";

export const dynamic = "force-dynamic";

// Management members — Unsplash placeholder photos (replace with real photos later)
const managementMembers = [
  {
    name: "Shri Rajesh Kumar Mishra",
    role: "Principal",
    initial: "R",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Smt. Sushila Devi",
    role: "Vice Principal",
    initial: "S",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Shri Anil Kumar Singh",
    role: "Managing Director",
    initial: "A",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Smt. Priya Mishra",
    role: "Administrative Head",
    initial: "P",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

export default async function Home() {
  const [notices, galleryItems] = await Promise.all([
    getNotices(),
    getGallery(),
  ]);
  const previewNotices = notices.slice(0, 4);
  const previewGallery = galleryItems.slice(0, 4);

  return (
    <div className="flex flex-col flex-1">
      {/* ── 1. HERO SLIDER ── */}
      <HeroSection />

      {/* ── 3. NOTICES + ADMIN LOGIN CARDS ── */}
      <section className="py-8 sm:py-10 bg-neutral-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* === Notices Card === */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-primary text-white">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wide">
                    Latest Notices
                  </h2>
                </div>
                <Link
                  href="/notices"
                  className="flex items-center gap-1 text-[11px] font-bold text-white/80 hover:text-white transition-colors"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Notice list */}
              <div className="p-4 flex flex-col gap-3">
                {previewNotices.length === 0 ? (
                  <p className="text-xs text-neutral-body italic py-4 text-center">
                    No notices posted yet.
                  </p>
                ) : (
                  previewNotices.map((notice) => (
                    <NoticeCard key={notice.id} notice={notice} />
                  ))
                )}
              </div>
            </div>

            {/* === Admin Login Card === */}
            <div className="flex flex-col gap-4">
              {/* Admin card */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 bg-neutral-dark text-white flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wide">
                    Staff Portal
                  </h2>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-neutral-dark">
                      School Administration
                    </p>
                    <p className="text-xs text-neutral-body mt-1">
                      Manage notices, faculty, gallery and school records.
                    </p>
                  </div>
                  <Link
                    href="/admin"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Login to Admin Panel</span>
                  </Link>
                  <a
                    href="tel:+917880952150"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-border hover:bg-neutral-light text-neutral-dark rounded-xl font-semibold text-xs transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>Call: +91 7880952150</span>
                  </a>
                </div>
              </div>

              {/* Quick admissions card */}
              <div className="bg-accent rounded-2xl p-5 text-white flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-extrabold uppercase tracking-wide">
                    Admissions Open
                  </span>
                </div>
                <p className="text-xs text-white/85 leading-relaxed">
                  Session 2026–27 enrollment open. Nursery to Class XII. Apply
                  now!
                </p>
                <Link
                  href="/admissions"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-white text-accent rounded-xl font-bold text-xs transition-all hover:bg-neutral-light"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT SECTION ── */}
      <section
        className="py-10 sm:py-14 bg-white border-b border-border"
        id="about"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-10 bg-primary rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-neutral-dark tracking-tight">
              About Nav Jeevan Public School
            </h2>
            <div className="h-1 flex-1 bg-border rounded-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* === Image side === */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3">
                <Image
                  src="/about-students.png"
                  alt="Students learning at Nav Jeevan Public School"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Label overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-neutral-dark/80 to-transparent px-4 py-4">
                  <p className="text-white text-xs font-bold">
                    Nav Jeevan Public School — Smart Classroom
                  </p>
                  <p className="text-white/70 text-[10px]">
                    Khabharabhar, Kaptanganj, Kushinagar
                  </p>
                </div>
              </div>

              {/* Floating stat badge */}
              <div className="absolute -top-3 -right-3 bg-primary text-white rounded-2xl px-4 py-3 shadow-lg text-center">
                <span className="block text-2xl font-black leading-none">
                  15+
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wide mt-0.5">
                  Years of
                  <br />
                  Excellence
                </span>
              </div>
            </div>

            {/* === Content side === */}
            <div className="flex flex-col gap-6">
              {/* Intro paragraph */}
              <p className="text-sm sm:text-base text-neutral-body leading-relaxed">
                Established in 2008 with a vision to revolutionize primary and
                secondary education in rural Uttar Pradesh, Nav Jeevan Public
                School is affiliated with CBSE curriculum standards. We combine
                rigorous academics with digital computer exposure, cultural
                celebrations, and physical drills to construct all-round
                capabilities in our students.
              </p>

              {/* Vision / Mission / Strategy — three cards */}
              <div className="flex flex-col gap-3">
                {/* Vision */}
                <div className="flex gap-3.5 items-start p-4 bg-primary-light border border-primary/20 rounded-2xl">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-dark mb-1">
                      Our Vision
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed">
                      Every child growing to be educated, committed and
                      empowered global persons.
                    </p>
                  </div>
                </div>

                {/* Mission */}
                <div className="flex gap-3.5 items-start p-4 bg-accent-light border border-accent/20 rounded-2xl">
                  <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-dark mb-1">
                      Our Mission
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed">
                      To accompany every child and facilitate integrated
                      development, joyful learning and empowerment with
                      character and competence.
                    </p>
                  </div>
                </div>

                {/* Strategy */}
                <div className="flex gap-3.5 items-start p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-dark mb-1">
                      Our Strategy
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed">
                      A process of joyful learning coupled with constant
                      accompaniment, whole person paradigm and child centered
                      education.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-light hover:bg-primary/20 text-primary font-bold text-sm rounded-xl transition-all self-start"
              >
                Read Our Full Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. OUR MANAGEMENT ── */}
      <section className="py-10 sm:py-12 bg-neutral-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="h-1 w-10 bg-accent rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-neutral-dark tracking-tight">
              Our Management
            </h2>
            <div className="h-1 flex-1 bg-border rounded-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {managementMembers.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border p-4 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 bg-neutral-light">
                  <Image
                    src={member.photo}
                    alt={`Photo of ${member.name}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-neutral-dark leading-tight">
                    {member.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wide mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/faculty"
              className="flex items-center gap-2 px-5 py-2.5 border border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-sm transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Meet Our Faculty</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE US ── */}
      <section className="py-10 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-10 bg-primary rounded-full" />
            <h2 className="text-xl font-black text-neutral-dark">
              Why Choose Nav Jeevan?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Award,
                color: "text-primary bg-primary-light",
                title: "Affordable Quality",
                desc: "CBSE-pattern learning with minimal fees for every child in Kushinagar.",
              },
              {
                icon: HeartHandshake,
                color: "text-accent bg-accent-light",
                title: "Bilingual Learning",
                desc: "Classes in both Hindi & English — no child is left behind due to language.",
              },
              {
                icon: ShieldCheck,
                color: "text-amber-600 bg-amber-50",
                title: "Smart & Modern",
                desc: "Smart classrooms, computer lab, and dedicated IT literacy from early grades.",
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 bg-neutral-light border border-border rounded-2xl"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${p.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-dark">
                      {p.title}
                    </h3>
                    <p className="text-xs text-neutral-body leading-relaxed mt-1">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities section removed — shown on /facilities page */}

      {/* ── 8. GALLERY SNIPPET ── */}
      {previewGallery.length > 0 && (
        <section className="py-10 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-1 w-10 bg-accent rounded-full" />
                <h2 className="text-xl font-black text-neutral-dark">
                  Life at Nav Jeevan
                </h2>
              </div>
              <Link
                href="/gallery"
                className="flex items-center gap-1 text-xs font-bold text-primary hover:underline shrink-0"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <GalleryGrid items={previewGallery} limit={4} />
          </div>
        </section>
      )}

      {/* ── 9. CTA BANNER ── */}
      <CTASection />

      {/* ── 10. CONTACT QUICK STRIP ── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-1 w-10 bg-primary rounded-full" />
            <h2 className="text-xl font-black text-neutral-dark">
              Get in Touch
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <a
              href="tel:+917880952150"
              className="flex items-center gap-3 flex-1 p-4 border border-border rounded-2xl hover:border-primary/30 hover:bg-neutral-light transition-all"
            >
              <div className="p-2.5 bg-primary-light rounded-xl text-primary shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-neutral-body uppercase tracking-wider">
                  Call Office
                </span>
                <span className="block text-sm font-black text-neutral-dark">
                  +91 7880952150
                </span>
              </div>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-3 flex-1 p-4 border border-primary/20 bg-primary-light rounded-2xl hover:bg-primary/15 transition-all"
            >
              <div className="p-2.5 bg-primary/15 rounded-xl text-primary shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-neutral-body uppercase tracking-wider">
                  Online
                </span>
                <span className="block text-sm font-black text-primary">
                  Send an Inquiry
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
