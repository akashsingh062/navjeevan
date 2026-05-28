"use client";

import React, { useState } from "react";
import { Notice } from "@/types";
import NoticeCard from "@/components/NoticeCard";
import SectionHeading from "@/components/SectionHeading";
import { Search, CalendarDays, AlertCircle } from "lucide-react";

interface NoticesClientProps {
  initialNotices: Notice[];
}

const CATEGORIES = ["All", "Admission", "Exam", "Holiday", "General", "Others"];

export default function NoticesClient({ initialNotices }: NoticesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter notices based on category tabs and search input
  const filteredNotices = initialNotices.filter((notice) => {
    const matchesCategory = activeCategory === "All" || notice.category === activeCategory;
    const matchesSearch = 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 text-left">
      
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-5 bg-neutral-light border border-gray-200 rounded-3xl shadow-sm">
        
        {/* Keyword Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-body" />
          <input
            type="text"
            placeholder="Search notice board..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-sm rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-neutral-dark font-medium transition-all"
            aria-label="Search notices"
          />
        </div>

        {/* Category Tabs */}
        <div 
          className="flex flex-wrap gap-2 w-full md:w-auto md:justify-end"
          role="tablist"
          aria-label="Notice Board Categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer focus:outline-none ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-neutral-body border-gray-200 hover:border-gray-300 hover:text-neutral-dark"
              }`}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat} Board
            </button>
          ))}
        </div>

      </div>

      {/* Notices Grid */}
      {filteredNotices.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col items-center gap-3">
          <AlertCircle className="w-12 h-12 text-neutral-body/30" />
          <p className="text-sm font-extrabold text-neutral-dark">No notices match your criteria.</p>
          <p className="text-xs text-neutral-body -mt-1 font-normal leading-relaxed">
            Try checking another keyword or resetting the filter boards.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      )}

    </div>
  );
}
