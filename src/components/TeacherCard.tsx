"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Faculty } from "@/types";
import { GraduationCap, Briefcase } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TeacherCardProps {
  member: Faculty;
}

export default function TeacherCard({ member }: TeacherCardProps) {
  const { language } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    const clean = name.replace(/^(Shri|Smt\.|Ms\.|Mr\.|Dr\.)\s+/i, "").trim().split(/\s+/);
    if (clean.length >= 2) return (clean[0][0] + clean[clean.length - 1][0]).toUpperCase();
    return (clean[0]?.[0] ?? "NJ").toUpperCase();
  };

  return (
    <div className="bg-white rounded-3xl border border-border p-5 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative backdrop glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-300" />
      
      {/* Image container */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-neutral-light shadow-md group-hover:shadow-lg group-hover:border-primary/20 transition-all duration-300 shrink-0 bg-neutral-light flex items-center justify-center">
        {member.imageUrl && !imageError ? (
          <Image
            src={member.imageUrl}
            alt={`Photo of ${member.name}`}
            fill
            sizes="(max-w-640px) 128px, 144px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-3xl font-black text-primary select-none">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-2 mt-2 w-full">
        <span className="px-3 py-1 bg-accent-light text-accent text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full border border-accent/10 group-hover:bg-accent group-hover:text-white transition-all duration-300">
          {member.subject}
        </span>
        
        <h3 className="text-sm sm:text-base font-extrabold text-neutral-dark tracking-tight leading-snug group-hover:text-primary transition-colors duration-300">
          {member.name}
        </h3>

        {(member.qualification || member.experience) && (
          <div className="w-full border-t border-border mt-3 pt-3 flex flex-col gap-2 text-left">
            {member.qualification && (
              <div className="flex items-center gap-2 text-neutral-body">
                <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-neutral-dark truncate" title={member.qualification}>
                  {member.qualification}
                </span>
              </div>
            )}
            {member.experience && (
              <div className="flex items-center gap-2 text-neutral-body">
                <Briefcase className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-neutral-dark truncate">
                  {member.experience} {language === "en" ? "experience" : "अनुभव"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
