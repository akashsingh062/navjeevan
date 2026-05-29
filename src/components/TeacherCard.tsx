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
    <div className="bg-white rounded-3xl border border-border/80 p-6 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-2xl hover:border-accent/30 hover:-translate-y-1.5 transition-all duration-500 ease-out relative overflow-hidden group">
      {/* Decorative backdrop glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors duration-300" />
      
      {/* Circular profile frame layout */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-border/50 to-accent/25 border border-border shadow-inner group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-500 shrink-0 bg-neutral-light">
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-neutral-light">
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
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <span className="text-2xl font-black text-accent select-none">
                {getInitials(member.name)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-2 mt-1 w-full">
        <span className="px-3.5 py-1 bg-accent-light text-accent text-[9px] font-black uppercase tracking-wider rounded-full border border-accent/10 group-hover:bg-accent group-hover:text-white transition-all duration-300">
          {member.subject}
        </span>
        
        <h3 className="text-sm sm:text-base font-extrabold text-neutral-dark tracking-tight leading-snug group-hover:text-accent transition-colors duration-300">
          {member.name}
        </h3>

        {(member.qualification || member.experience) && (
          <div className="w-full bg-neutral-light border border-border/40 rounded-2xl p-3 flex flex-col gap-2 mt-2 group-hover:bg-accent/5 group-hover:border-accent/10 transition-all duration-500 text-left">
            {member.qualification && (
              <div className="flex items-center gap-2 text-neutral-body">
                <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-[11px] font-semibold text-neutral-dark truncate" title={member.qualification}>
                  {member.qualification}
                </span>
              </div>
            )}
            {member.experience && (
              <div className="flex items-center gap-2 text-neutral-body">
                <Briefcase className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-[11px] font-semibold text-neutral-dark truncate">
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
