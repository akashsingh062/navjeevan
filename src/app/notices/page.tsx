import React from "react";
import SectionHeading from "@/components/SectionHeading";
import NoticesClient from "@/components/NoticesClient";
import { getNotices } from "@/lib/dataManager";

export const metadata = {
  title: "Notice Board | Nav Jeevan Public School Kushinagar",
  description:
    "Official Nav Jeevan Public School notice board. Access exam datesheets, holiday announcements, CBSE circulars, and admission updates in Kaptanganj.",
};

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            School Bulletins
          </span>
          <SectionHeading
            title="Official School Notice Board"
            subtitle="Stay updated with CBSE announcements, exam calendars, summer/winter holiday notices, and parents directives."
          />
        </div>

        {/* Notices Board Filter System */}
        <div className="mt-6">
          <NoticesClient initialNotices={notices} />
        </div>
      </div>
    </div>
  );
}
