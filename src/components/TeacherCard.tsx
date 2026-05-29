"use client";

import { useState } from "react";
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
    <div className="flex flex-col w-full sm:h-[420px] rounded-3xl border border-border bg-white shadow-xs hover:shadow-md hover:border-accent/30 hover:-translate-y-1.5 transition-all duration-500 ease-out relative overflow-hidden group">

      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors duration-300" />

      <div className="relative w-full aspect-4/3 sm:aspect-auto sm:h-[230px] overflow-hidden shrink-0 bg-neutral-light/5 rounded-t-3xl flex items-center justify-center">
        {member.imageUrl && !imageError ? (
          <Image
            src={member.imageUrl}
            alt={`Photo of ${member.name}`}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 flex items-center justify-center">
            <span className="text-3xl font-black text-primary select-none">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between gap-3 bg-white w-full rounded-b-3xl">
        <div className="flex flex-col items-center text-center gap-1.5">
          <h3 className="text-base sm:text-lg font-black text-neutral-dark tracking-tight leading-snug group-hover:text-accent transition-colors duration-300">
            {member.name}
          </h3>
          <span className="px-3 py-0.5 bg-neutral-light text-neutral-body text-[9px] font-bold uppercase tracking-wider rounded-md border border-border group-hover:bg-accent group-hover:text-white group-hover:border-transparent transition-all duration-300">
            {member.subject}
          </span>
        </div>

        {(member.qualification || member.experience) && (
          <div className="w-full bg-neutral-light/50 border border-border/60 rounded-2xl p-3 flex flex-col gap-1.5 group-hover:bg-accent/5 group-hover:border-accent/15 transition-all duration-500 text-left">
            {member.qualification && (
              <div className="flex items-center gap-2 text-neutral-dark/80">
                <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-[11px] font-semibold text-neutral-dark truncate" title={member.qualification}>
                  {member.qualification}
                </span>
              </div>
            )}
            {member.experience && (
              <div className="flex items-center gap-2 text-neutral-dark/80">
                <Briefcase className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-[11px] font-semibold text-neutral-dark truncate">
                  {member.experience.toLowerCase().includes("year") ||
                  member.experience.toLowerCase().includes("experience") ||
                  member.experience.includes("वर्ष") ||
                  member.experience.includes("अनुभव")
                    ? member.experience
                    : `${member.experience} ${language === "en" ? "years experience" : "वर्षों का अनुभव"}`}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
