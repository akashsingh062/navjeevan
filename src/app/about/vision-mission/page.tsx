import React from "react";
import Link from "next/link";
import { Target, Compass, Lightbulb, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Vision & Mission | Nav Jeevan Public School",
  description: "Our vision, mission, and strategy at Nav Jeevan Public School — empowering rural children through joyful, character-centered education.",
};

export default function VisionMissionPage() {
  return (
    <div className="flex-1 bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-light border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-neutral-body">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-dark font-semibold">Vision & Mission</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark tracking-tight mb-2">Vision & Mission</h1>
        <p className="text-sm text-neutral-body mb-10">The core principles that guide everything we do at Nav Jeevan.</p>

        <div className="flex flex-col gap-6">
          {/* Vision */}
          <div className="rounded-2xl border border-primary/20 bg-primary-light overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-primary text-white">
              <Target className="w-5 h-5" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">Our Vision</h2>
            </div>
            <div className="px-5 py-5">
              <p className="text-base sm:text-lg font-bold text-neutral-dark leading-relaxed italic">
                "Every child growing to be educated, committed and empowered global persons."
              </p>
              <p className="text-sm text-neutral-body leading-relaxed mt-3">
                We envision a future where no child in rural Uttar Pradesh is deprived of quality education. Every student who walks through our gates leaves with the knowledge, confidence, and character to be a responsible global citizen while remaining rooted in their cultural heritage.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="rounded-2xl border border-accent/20 bg-accent-light overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-accent text-white">
              <Compass className="w-5 h-5" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">Our Mission</h2>
            </div>
            <div className="px-5 py-5">
              <p className="text-base sm:text-lg font-bold text-neutral-dark leading-relaxed italic">
                "To accompany every child and facilitate integrated development, joyful learning and empowerment with character and competence."
              </p>
              <p className="text-sm text-neutral-body leading-relaxed mt-3">
                Our mission goes beyond academics. We walk alongside each child as a guide and mentor — nurturing intellectual curiosity, emotional resilience, physical wellness, and moral character so they grow as complete, capable human beings.
              </p>
            </div>
          </div>

          {/* Strategy */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-amber-500 text-white">
              <Lightbulb className="w-5 h-5" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">Our Strategy</h2>
            </div>
            <div className="px-5 py-5">
              <p className="text-base sm:text-lg font-bold text-neutral-dark leading-relaxed italic">
                "A process of joyful learning coupled with constant accompaniment, whole person paradigm and child centered education."
              </p>
              <p className="text-sm text-neutral-body leading-relaxed mt-3">
                We implement a child-centered pedagogy that treats every student as a unique individual. Through interactive classrooms, bilingual instruction (Hindi & English), computer literacy, cultural activities, and regular sports, we make learning joyful and holistic — never just rote memorization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
