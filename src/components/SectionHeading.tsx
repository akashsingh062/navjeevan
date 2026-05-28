import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : "text-left"}`}>
      <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark tracking-tight leading-tight">
        {title}
      </h2>
      <div
        className={`h-1 w-16 bg-primary mt-2 rounded-full ${
          centered ? "mx-auto" : "mr-auto"
        }`}
      />
      {subtitle && (
        <p className="mt-3 text-base text-neutral-body max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
