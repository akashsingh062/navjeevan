import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { Clock, BookOpen, Layers, CheckCircle2, Calendar, ClipboardCheck } from "lucide-react";

export const metadata = {
  title: "Academics & Curriculum | Nav Jeevan Public School Kushinagar",
  description: "Check the CBSE-aligned curriculum, subjects offered, examination systems, school hours, and complete academic calendar at Nav Jeevan Public School.",
};

export default function Academics() {
  const classes = [
    {
      wing: "Primary Wing (Nursery to Class V)",
      desc: "Focuses on language confidence, basic calculations, sensory motor actions, and moral manners.",
      subjects: "English, Hindi, Mathematics, Environmental Studies (EVS), General Knowledge, Moral Science, Art & Craft."
    },
    {
      wing: "Middle Wing (Class VI to VIII)",
      desc: "Develops deeper conceptual understanding, laboratory basics, speed arithmetic, and basic computing.",
      subjects: "English Grammar & Lit, Hindi, Sanskrit, Mathematics, Integrated Science, Social Sciences, Computer IT Skills."
    },
    {
      wing: "Secondary Wing (Class IX to XII)",
      desc: "Specialized streams in CBSE standard formats. Intensive drills for district & board exams, and analytic thinking.",
      subjects: "English Core, Hindi Core, Mathematics, Physics, Chemistry, Biology, History, Geography, Economics, Computer IT Science."
    }
  ];

  const timings = [
    {
      season: "Summer Hours (April to October)",
      duration: "07:30 AM to 12:30 PM",
      break: "Interval Recess: 10:00 AM - 10:20 AM",
      bg: "bg-blue-50 border-blue-200 text-blue-900"
    },
    {
      season: "Winter Hours (November to March)",
      duration: "08:30 AM to 01:30 PM",
      break: "Interval Recess: 11:00 AM - 11:20 AM",
      bg: "bg-emerald-50 border-emerald-200 text-emerald-900"
    }
  ];

  const calendarEvents = [
    { date: "April 06, 2026", event: "New Academic Session 2026-27 Commences", type: "academic" },
    { date: "May 29, 2026", event: "Free Welfare Textbooks Distribution Day", type: "academic" },
    { date: "June 01 - July 05, 2026", event: "Summer Vacation Holidays (UP Heat Wave)", type: "holiday" },
    { date: "August 15, 2026", event: "Independence Day Celebrations (Flag Hoisting)", type: "event" },
    { date: "September 14 - 26, 2026", event: "Half-Yearly Mock & Mid-Term Examinations", type: "exam" },
    { date: "October 02, 2026", event: "Gandhi Jayanti Celebrations & Cleanliness Assembly", type: "holiday" },
    { date: "November 14, 2026", event: "Annual Sports Meet & Children's Day Fete", type: "event" },
    { date: "December 21, 2026", event: "Annual Day Function & Cultural Skit Show", type: "event" },
    { date: "January 26, 2027", event: "Republic Day Parade & Patriotic Recitals", type: "event" },
    { date: "March 08 - 20, 2027", event: "Annual Examination Sessions & Final Evaluations", type: "exam" }
  ];

  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-14">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            CBSE Standards
          </span>
          <SectionHeading
            title="Academics & Curricula"
            subtitle="Providing a robust educational framework tailored to empower rural student capability."
          />
        </div>

        {/* Classes Offered Cards */}
        <section className="mb-16">
          <SectionHeading
            title="Wings & Classes Offered"
            subtitle="Details of class levels, teaching targets, and textbooks prescribed."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {classes.map((cls, idx) => (
              <div 
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-dark mb-2">
                    {cls.wing}
                  </h3>
                  <p className="text-xs text-neutral-body leading-relaxed mb-4">
                    {cls.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <span className="text-[10px] uppercase font-black text-accent block mb-1.5 tracking-wider">
                    Core Subjects:
                  </span>
                  <p className="text-xs text-neutral-dark leading-relaxed font-semibold">
                    {cls.subjects}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timings & Assembly (Two column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-gray-100 pt-16 mb-16">
          
          {/* School Hours (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <SectionHeading
              title="Daily School Timings"
              subtitle="Timings shift seasonally to safeguard student safety from intense summer heat and dense winter fog."
            />
            <div className="flex flex-col gap-4 mt-4">
              {timings.map((time, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${time.bg} flex gap-4 items-start shadow-sm`}>
                  <Clock className="w-7 h-7 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold">{time.season}</h4>
                    <p className="text-lg font-black mt-1">{time.duration}</p>
                    <p className="text-xs mt-1 font-semibold opacity-75">{time.break}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam System (Right) */}
          <div className="lg:col-span-6 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col gap-5 text-left">
            <h3 className="text-lg font-extrabold text-neutral-dark flex items-center gap-2 border-b border-gray-200 pb-3">
              <ClipboardCheck className="w-5 h-5 text-primary" />
              Prescribed Examination System
            </h3>
            <p className="text-xs text-neutral-body leading-relaxed font-normal -mt-2">
              Nav Jeevan aligns strictly with the Continuous Comprehensive Evaluation format based on CBSE guidelines, ensuring regular diagnostics instead of stress.
            </p>
            <ul className="flex flex-col gap-3.5 text-xs text-neutral-body font-medium leading-relaxed">
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span><strong>Monthly Unit Diagnostics:</strong> Conducted during regular class slots to check weekly conceptual clarity in Science & Math.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span><strong>Half-Yearly Mock Sessions:</strong> Detailed assessment in September to establish progress cards and identify boys & girls needing remedial help.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span><strong>Annual Examinations:</strong> Final evaluative curriculum sheets in March to finalize promotion guidelines.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Academic Calendar Grid */}
        <section className="py-16 border-t border-gray-100">
          <SectionHeading
            title="Academic Calendar (Key Dates)"
            subtitle="Important events, assessment brackets, holidays, and celebrations for current batch."
          />
          
          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white mt-8">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-neutral-light border-b border-gray-200 text-neutral-dark font-extrabold text-xs uppercase">
                  <th className="p-4 font-bold">Planned Date</th>
                  <th className="p-4 font-bold">Event Details</th>
                  <th className="p-4 font-bold">Event Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-neutral-body font-normal">
                {calendarEvents.map((evt, idx) => {
                  // Style badge based on event classification
                  const typeColors = {
                    academic: "bg-blue-50 text-blue-700 border-blue-100",
                    holiday: "bg-emerald-50 text-emerald-700 border-emerald-100",
                    exam: "bg-red-50 text-red-700 border-red-100",
                    event: "bg-amber-50 text-amber-700 border-amber-100"
                  };
                  const color = typeColors[evt.type as keyof typeof typeColors] || typeColors.academic;

                  return (
                    <tr key={idx} className="hover:bg-neutral-light/35 transition-colors">
                      <td className="p-4 font-extrabold text-neutral-dark whitespace-nowrap">{evt.date}</td>
                      <td className="p-4 font-semibold text-neutral-dark leading-relaxed">{evt.event}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className={`text-[10px] font-extrabold border px-2 py-0.5 rounded uppercase tracking-wider ${color}`}>
                          {evt.type}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
