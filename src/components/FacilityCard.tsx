import React from "react";
import { Facility } from "@/types";
import * as LucideIcons from "lucide-react";

interface FacilityCardProps {
  facility: Facility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
  // Dynamically map icon names from LucideIcons dictionary
  const IconComponent = (LucideIcons as any)[facility.iconName] || LucideIcons.HelpCircle;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex gap-4 items-start">
      
      {/* Icon Wrapper */}
      <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
        <IconComponent className="w-6 h-6" aria-hidden="true" />
      </div>

      {/* Description details */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-extrabold text-neutral-dark leading-tight">
          {facility.title}
        </h3>
        <p className="text-sm text-neutral-body leading-relaxed font-normal">
          {facility.description}
        </p>
      </div>

    </div>
  );
}
