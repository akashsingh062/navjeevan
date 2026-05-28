"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Faculty } from "@/types";
import { GraduationCap, Briefcase, Award } from "lucide-react";

interface TeacherCardProps {
  member: Faculty;
}

export default function TeacherCard({ member }: TeacherCardProps) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    const clean = name.replace(/^(Shri|Smt\.|Ms\.|Mr\.|Dr\.)\s+/i, "").trim().split(/\s+/);
    if (clean.length >= 2) return (clean[0][0] + clean[clean.length - 1][0]).toUpperCase();
    return (clean[0]?.[0] ?? "NJ").toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all overflow-hidden flex flex-row items-center gap-0 group">
      
      {}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-neutral-light overflow-hidden self-stretch flex items-center justify-center">
        {member.imageUrl && !imageError ? (
          <Image
            src={member.imageUrl}
            alt={`Photo of ${member.name}`}
            fill
            sizes="96px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-2xl font-black text-primary select-none">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Content — right side */}
      <div className="flex-1 min-w-0 px-3.5 py-3">
        <h3 className="text-sm font-extrabold text-neutral-dark leading-tight truncate group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <div className="flex items-center gap-1 mt-0.5 text-accent">
          <Award className="w-3 h-3 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wide truncate">{member.subject}</span>
        </div>

        {(member.qualification || member.experience) && (
          <div className="mt-2 flex flex-col gap-1">
            {member.qualification && (
              <div className="flex items-center gap-1.5 text-neutral-body">
                <GraduationCap className="w-3 h-3 shrink-0 text-primary" />
                <span className="text-[11px] font-medium truncate">{member.qualification}</span>
              </div>
            )}
            {member.experience && (
              <div className="flex items-center gap-1.5 text-neutral-body">
                <Briefcase className="w-3 h-3 shrink-0 text-primary" />
                <span className="text-[11px] font-medium">{member.experience} exp.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
