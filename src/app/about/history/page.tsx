import React from "react";
import Link from "next/link";
import { History, ChevronRight } from "lucide-react";

export const metadata = {
  title: "History | Nav Jeevan Public School",
  description:
    "Learn about the founding and journey of Nav Jeevan Public School since 2008 in Khabharabhar, Kaptanganj, Kushinagar.",
};

const timeline = [
  {
    year: "2008",
    title: "Foundation",
    desc: "Nav Jeevan Public School was established with 50 students in Khabharabhar, Kaptanganj, Kushinagar with a vision to bring quality English-medium education to rural Uttar Pradesh.",
    color: "border-primary bg-primary",
  },
  {
    year: "2012",
    title: "Secondary Classes Introduced",
    desc: "The school expanded to include secondary classes (Class IX–X), providing an uninterrupted learning path for local students.",
    color: "border-accent bg-accent",
  },
  {
    year: "2014",
    title: "Infrastructure Expansion",
    desc: "New academic wing constructed with library, science resource room, and drinking water facility. Student enrollment crossed 400.",
    color: "border-amber-500 bg-amber-500",
  },
  {
    year: "2018",
    title: "Sports & Cultural Programs",
    desc: "Annual Sports Day and cultural festivals formalized. NCC-type physical drills introduced for all students.",
    color: "border-primary bg-primary",
  },
  {
    year: "2020",
    title: "Digital IT Lab",
    desc: "A 15-computer IT laboratory was established, integrating basic computing and internet skills into the weekly curriculum.",
    color: "border-accent bg-accent",
  },
  {
    year: "2024",
    title: "Smart Classroom Adoption",
    desc: "Interactive digital screens installed in primary sections for enhanced audio-visual learning in science and languages.",
    color: "border-amber-500 bg-amber-500",
  },
];

export default function HistoryPage() {
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
          <span className="text-neutral-dark font-semibold">History</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
            <History className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark tracking-tight">
              Our History
            </h1>
            <p className="text-sm text-neutral-body mt-0.5">
              A journey of 15+ years of rural educational excellence
            </p>
          </div>
        </div>

        {/* Intro */}
        <p className="text-sm sm:text-base text-neutral-body leading-relaxed mb-10 max-w-2xl">
          Founded in 2008 with a handful of students and an unwavering belief
          that every child — regardless of geography — deserves world-class
          education, Nav Jeevan Public School has grown into one of the most
          trusted institutions in Kaptanganj, Kushinagar.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="relative flex gap-5 sm:gap-8 items-start pl-12 sm:pl-16"
              >
                {/* Year dot */}
                <div
                  className={`absolute left-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full ${item.color} text-white flex items-center justify-center shrink-0 border-4 border-white shadow-sm`}
                >
                  <span className="text-[9px] sm:text-[10px] font-black leading-none text-center">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="bg-neutral-light rounded-2xl border border-border p-4 sm:p-5 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-dark mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
