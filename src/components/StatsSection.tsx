import React from "react";
import { Users, UserCheck, Award, GraduationCap } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "1,200+",
      label: "Enrolled Students",
      description: "Nursery to Class XII",
      icon: Users,
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      value: "35+",
      label: "Experienced Teachers",
      description: "Dedicated educators",
      icon: UserCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      value: "18+",
      label: "Years of Excellence",
      description: "Established in 2008",
      icon: Award,
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      value: "100%",
      label: "CBSE Pass Rate",
      description: "Excellent academic results",
      icon: GraduationCap,
      color: "text-purple-600 bg-purple-50 border-purple-100"
    }
  ];

  return (
    <section className="py-12 bg-neutral-light border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:border-primary/30 transition-all"
              >
                {/* Icon Wrapper */}
                <div className={`p-3 rounded-xl border mb-4 ${stat.color} shrink-0`}>
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                
                {/* Big numbers */}
                <span className="text-3xl md:text-4xl font-black text-neutral-dark tracking-tight leading-none">
                  {stat.value}
                </span>
                
                {/* Label */}
                <span className="text-sm font-extrabold text-neutral-dark mt-2.5 leading-snug">
                  {stat.label}
                </span>

                {/* Subtext description */}
                <span className="text-xs text-neutral-body mt-1 font-normal leading-relaxed">
                  {stat.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
