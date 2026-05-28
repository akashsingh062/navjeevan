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

  // Get initials for the fallback avatar
  const getInitials = (name: string) => {
    // Strip prefixes like Shri, Smt., Ms., Dr.
    const cleanName = name.replace(/^(Shri|Smt\.|Ms\.|Mr\.|Dr\.)\s+/i, "");
    const parts = cleanName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return (parts[0] ? parts[0][0] : "NJ").toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
      
      {/* Teacher Photograph Section */}
      <div className="relative aspect-square w-full bg-neutral-light overflow-hidden flex items-center justify-center">
        {member.imageUrl && !imageError ? (
          <Image
            src={member.imageUrl}
            alt={`Photograph of ${member.name}`}
            fill
            sizes="(max-w-768px) 100vw, (max-w-1200px) 33vw, 250px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          /* Fallback Initials Badge */
          <div className="absolute inset-0 bg-linear-to-tr from-primary to-accent/40 flex flex-col items-center justify-center text-white">
            <span className="text-4xl font-black tracking-wider drop-shadow-sm select-none">
              {getInitials(member.name)}
            </span>
            <span className="text-[10px] mt-1 uppercase font-bold opacity-75 tracking-widest select-none">
              Nav Jeevan Faculty
            </span>
          </div>
        )}
      </div>

      {/* Teacher Profile Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Faculty Name */}
          <h3 className="text-base font-extrabold text-neutral-dark leading-snug group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          
          {/* Subject Badge */}
          <div className="mt-1 flex items-center gap-1.5 text-accent font-extrabold text-xs uppercase tracking-wide">
            <Award className="w-3.5 h-3.5" />
            <span>{member.subject}</span>
          </div>
        </div>

        {/* Credentials & Details Grid */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-2.5 text-xs text-neutral-body">
          <div className="flex items-start gap-2 font-medium">
            <GraduationCap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{member.qualification}</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Briefcase className="w-4 h-4 text-primary shrink-0" />
            <span>{member.experience} Teaching Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
}
