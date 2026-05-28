import React from "react";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery } from "@/lib/dataManager";

export const metadata = {
  title: "Photo Gallery | Nav Jeevan Public School Kushinagar",
  description: "Browse pictures of annual function dances, sports days, classroom activities, independence day flag hosting and prize distributions at Nav Jeevan School.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            Life & Events
          </span>
          <SectionHeading
            title="School Photo Gallery"
            subtitle="Glimpses of active student life, regional cultural festivals, competitive sports days, and computer lab practicals."
          />
        </div>

        {/* Gallery Grid component */}
        <div className="mt-8">
          <GalleryGrid items={images} />
        </div>

      </div>
    </div>
  );
}
