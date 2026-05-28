import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Award,
  ShieldCheck,
  HeartHandshake,
  CheckCircle,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import SectionHeading from "@/components/SectionHeading";
import NoticeCard from "@/components/NoticeCard";
import FacilityCard from "@/components/FacilityCard";
import GalleryGrid from "@/components/GalleryGrid";
import CTASection from "@/components/CTASection";
import { getNotices, getFacilities, getGallery } from "@/lib/dataManager";

export default async function Home() {
  // Fetch data on the server
  const [notices, galleryItems] = await Promise.all([
    getNotices(),
    getGallery(),
  ]);

  const facilities = getFacilities();

  // Get only top 3 recent/important notices for the preview
  const previewNotices = notices.slice(0, 3);

  // Get top 4 gallery items for the preview
  const previewGallery = galleryItems.slice(0, 4);

  // Why choose us points
  const whyChoosePoints = [
    {
      title: "Affordable High-Quality Education",
      desc: "Providing CBSE pattern learning with minimal fee structures, ensuring every child in Khabharabhar & Captanganj gets quality education.",
      icon: Award,
    },
    {
      title: "Bilingual Standard (Hindi & English)",
      desc: "Strengthening communication. Classes are explained clearly in both English and Hindi so rural students grasp concepts without language fear.",
      icon: HeartHandshake,
    },
    {
      title: "Smart Learning & IT Literacy",
      desc: "Equipped with interactive smart classroom displays and a dedicated computer laboratory teaching keyboarding, office tools, and internet safety.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Banner Section */}
      <HeroSection />

      {/* Statistics Overlay Counter */}
      <StatsSection />

      {/* School Introduction & Principal Welcome Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Principal Quote card */}
            <div className="lg:col-span-5 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-serif">
                “
              </div>
              <blockquote className="text-neutral-dark italic leading-relaxed text-sm font-medium">
                Our objective at Nav Jeevan is to make learning accessible,
                exciting, and morally grounding for every student in our rural
                belt. We ensure that our children do not feel left behind by
                modern digital advancements, bridging technology with regional
                culture.
              </blockquote>
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col">
                <cite className="not-italic text-sm font-black text-neutral-dark">
                  Shri Rajesh Kumar Mishra
                </cite>
                <span className="text-xs text-accent font-bold mt-0.5 uppercase tracking-wider">
                  Principal, Nav Jeevan Public School
                </span>
              </div>
            </div>

            {/* General Intro Paragraphs */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start">
              <SectionHeading
                title="Welcome to Nav Jeevan Public School"
                subtitle="Nurturing Excellence, character and capability in Khabharabhar, Captanganj, Kushinagar."
              />
              <p className="text-sm md:text-base text-neutral-body leading-relaxed font-normal mb-5">
                Established with a vision to revolutionize primary and secondary
                education in rural Uttar Pradesh, Nav Jeevan Public School is
                affiliated with CBSE curriculum standards. We combine rigorous
                academic routines with digital computer exposure, cultural
                celebrations, and physical physical drills to construct
                all-round capabilities in our children.
              </p>
              <p className="text-sm md:text-base text-neutral-body leading-relaxed font-normal mb-6">
                Our dedicated faculty members utilize bilingual teaching methods
                to ensure every student—regardless of their background—grows
                confident in English speech, Mathematics, and Analytical
                Science.
              </p>
              <Link
                href="/about"
                className="flex items-center gap-2 px-5 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-sm rounded-xl transition-all focus:outline-none"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Highlight Grid */}
      <section className="py-16 bg-neutral-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Nav Jeevan School?"
            subtitle="Providing a robust foundation for competitive futures while staying connected to our core roots."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {whyChoosePoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all flex flex-col gap-4"
                >
                  <div className="w-12 h-12 bg-accent/15 border border-accent/20 rounded-xl flex items-center justify-center text-accent shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-extrabold text-neutral-dark leading-tight">
                      {point.title}
                    </h3>
                    <p className="text-sm text-neutral-body leading-relaxed font-normal">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notice Board & Facilities Snapshots Preview */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Notices Panel (Left) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-extrabold text-neutral-dark tracking-tight">
                  Latest Notices
                </h3>
                <Link
                  href="/notices"
                  className="text-xs font-extrabold text-primary hover:underline focus:outline-none"
                >
                  View All Notices
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {previewNotices.length === 0 ? (
                  <p className="text-xs text-neutral-body">
                    No notices currently posted.
                  </p>
                ) : (
                  previewNotices.map((notice) => (
                    <NoticeCard key={notice.id} notice={notice} />
                  ))
                )}
              </div>
            </div>

            {/* Key Facilities Highlights (Right) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-extrabold text-neutral-dark tracking-tight">
                  Facilities Spotlight
                </h3>
                <Link
                  href="/facilities"
                  className="text-xs font-extrabold text-primary hover:underline focus:outline-none"
                >
                  Explore All Facilities
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facilities.slice(0, 4).map((fac) => (
                  <FacilityCard key={fac.id} facility={fac} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Highlight Snippet */}
      <section className="py-16 bg-neutral-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeading
              title="Life at Nav Jeevan"
              subtitle="Glimpses of cultural events, academic projects, sports tournaments, and child talent showcases."
            />
            <Link
              href="/gallery"
              className="flex items-center gap-1 text-sm font-bold text-primary hover:underline shrink-0 pb-1 focus:outline-none"
            >
              <span>Browse Photo Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <GalleryGrid items={previewGallery} limit={4} />
        </div>
      </section>

      {/* Admissions Enrollment Call-to-action Banner */}
      <CTASection />

      {/* Contact Section Quick Info Form Link */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <SectionHeading
            title="Have Questions? Get in Touch!"
            subtitle="Located conveniently at Captanganj, Kushinagar. Reach out today for admission schedules, transport routes, and general inquiries."
            centered
          />

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-6 justify-center w-full max-w-lg">
            <a
              href="tel:+917880952150"
              className="flex items-center justify-center gap-3 w-full p-4 border border-gray-200 rounded-2xl hover:border-primary/40 hover:bg-neutral-light/55 transition-colors focus:outline-none"
            >
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-neutral-body uppercase tracking-wider">
                  Call Office
                </span>
                <span className="block text-sm font-black text-neutral-dark">
                  +91 7880952150
                </span>
              </div>
            </a>

            <Link
              href="/contact"
              className="flex items-center justify-center gap-3 w-full p-4 border border-primary/20 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors focus:outline-none"
            >
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-neutral-body uppercase tracking-wider">
                  Inquiry Desk
                </span>
                <span className="block text-sm font-black text-primary">
                  Fill Inquiry Form
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
