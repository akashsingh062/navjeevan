import React from "react";
import SectionHeading from "@/components/SectionHeading";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/dataManager";
import { Lightbulb, Info } from "lucide-react";

export const metadata = {
  title: "Modern School Facilities | Nav Jeevan Public School Kushinagar",
  description: "Explore the modern facilities at Nav Jeevan Public School including smart classrooms, computer IT lab, RO drinking water, playground and safe buses.",
};

export default function FacilitiesPage() {
  const facilities = getFacilities();

  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            Our Infrastructure
          </span>
          <SectionHeading
            title="Our Modern School Facilities"
            subtitle="Providing essential and advanced resources that foster a safe, clean, and interactive learning environment."
          />
        </div>

        {/* Small educational infrastructure quote */}
        <div className="mb-12 p-5 bg-neutral-light border border-gray-200 rounded-2xl flex gap-3.5 items-start text-xs text-neutral-body leading-relaxed max-w-4xl">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="font-semibold">
            We believe that a high-standard school layout directly enhances student attendance, health, and comprehension. At Nav Jeevan Public School, we continuously invest in modern visual panels, clean drinking RO networks, and sports fields, ensuring children in Khabharabhar receive top-tier learning resources.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {facilities.map((fac) => (
            <FacilityCard key={fac.id} facility={fac} />
          ))}
        </div>

        {/* Detailed Highlight Block for the Smart IT Lab and Playgrounds */}
        <section className="bg-linear-to-tr from-neutral-light to-blue-50/20 border border-gray-200 rounded-3xl p-6 md:p-10 text-left flex flex-col gap-6">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-wider text-xs">
            <Lightbulb className="w-5 h-5" />
            <span>Facility Spotlight</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* IT Lab Details */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-extrabold text-neutral-dark leading-tight">
                Computer IT Lab & Digital Literacy
              </h3>
              <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
                To equip our rural students for modern work brackets, we prescribe weekly computer practical sessions for Class III onwards. Our computer laboratory operates with 20+ desktop seats, teaching kids word processing, calculations in sheets, slides presentation, internet search methodologies, and keyboard touch typing under dedicated IT guides.
              </p>
            </div>

            {/* Smart Classrooms Details */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-extrabold text-neutral-dark leading-tight">
                Bilingual Smart Classrooms
              </h3>
              <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
                Primary and secondary instruction blocks are equipped with digital audio-visual screens and display units. This helps our teachers show animated science concepts, map projections in geography, and reading comprehension exercises in English. The visual engagement ensures children retain up to 80% more details from their lectures.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
