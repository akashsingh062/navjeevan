import React from "react";
import SectionHeading from "@/components/SectionHeading";
import TeacherCard from "@/components/TeacherCard";
import { getFaculty } from "@/lib/dataManager";


export const metadata = {
  title: "Our Experienced Faculty | Nav Jeevan Public School Kushinagar",
  description:
    "Meet our dedicated teachers, language experts, and IT administrators at Nav Jeevan Public School. Experienced educators in Kaptanganj.",
};

export const dynamic = "force-dynamic";

export default async function FacultyPage() {
  const teachers = await getFaculty();

  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            Our Mentors
          </span>
          <SectionHeading
            title="Meet Our Dedicated Faculty"
            subtitle="The educators, subject experts, and administrative leaders who guide children in Khabharabhar, Kaptanganj."
          />
        </div>


        {/* Teachers Grid */}
        {teachers.length === 0 ? (
          <div className="text-center py-16 bg-neutral-light border border-gray-200 rounded-3xl p-6">
            <p className="text-sm font-semibold text-neutral-body">
              Faculty profiles are currently being updated by the administrator.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {teachers.map((member) => (
              <TeacherCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
