import React from "react";
import { Facility } from "@/types";
import * as LucideIcons from "lucide-react";

interface FacilityCardProps {
  facility: Facility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[facility.iconName] || LucideIcons.HelpCircle;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex gap-3.5 items-start p-4">
      <div className="p-2.5 bg-primary-light rounded-xl text-primary shrink-0">
        <IconComponent className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-extrabold text-neutral-dark leading-tight">{facility.title}</h3>
        <p className="text-xs text-neutral-body leading-relaxed mt-1">{facility.description}</p>
      </div>
    </div>
  );
}
