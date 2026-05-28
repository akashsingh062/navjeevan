import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  accent?: string; 
}

export default function SectionHeading({ title, subtitle, centered = false, accent }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-2 ${centered ? "items-center text-center" : "items-start text-left"}`}>
      {accent && (
        <span className="text-[10px] uppercase font-black text-primary bg-primary-light px-3 py-1 rounded-full tracking-widest">
          {accent}
        </span>
      )}
      <h2 className="text-xl sm:text-2xl font-black text-neutral-dark leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-neutral-body leading-relaxed max-w-2xl font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
