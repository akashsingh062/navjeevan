import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { Award, Compass, Heart, Sparkles, BookOpen } from "lucide-react";

export const metadata = {
  title: "About Us | Nav Jeevan Public School Kushinagar",
  description: "Learn about the rich history, vision, and mission of Nav Jeevan Public School. Affiliated with CBSE, providing high-quality bilingual education in Captanganj.",
};

export default function About() {
  const coreValues = [
    {
      title: "Our Mission",
      desc: "To deliver high-standard bilingual (Hindi & English) education that fosters intellectual growth, physical fitness, computer literacy, and strong civic character in every student.",
      icon: Compass,
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Our Vision",
      desc: "To build an empowered rural student body capable of competing with urban standards, while staying rooted in strong moral, cultural, and national values.",
      icon: Sparkles,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "Our Core Ethos",
      desc: "Honesty, respect, discipline, and community development. We believe every child is a beacon of hope and positive progress for their family and society.",
      icon: Heart,
      color: "bg-amber-50 text-amber-600 border-amber-100"
    }
  ];

  const milestones = [
    {
      year: "2008",
      title: "Founding Year",
      desc: "Established with just 50 students in a modest brick building to address the urgent need for quality primary English-medium instruction in Khabharabhar."
    },
    {
      year: "2014",
      title: "Infrastructure Expansion",
      desc: "Constructed the secondary academic wing, library room, and pure water cooling filters. Student count crossed 400."
    },
    {
      year: "2020",
      title: "Digital IT Lab Launch",
      desc: "Equipped a dedicated laboratory with 15 computer units, integrating basic computing skills into the weekly curriculum."
    },
    {
      year: "2024",
      title: "Smart Classroom Adoption",
      desc: "Fitted primary teaching blocks with digital audio-visual screens to aid interactive science, reading, and language comprehension."
    }
  ];

  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="mb-14">
          <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            Since 2008
          </span>
          <SectionHeading 
            title="About Nav Jeevan Public School"
            subtitle="The story of our dedication, academic excellence, and community building in rural Kushinagar."
          />
        </div>

        {/* History & Recognition Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-gray-100 pb-16">
          <div className="lg:col-span-7 flex flex-col gap-5 text-sm md:text-base text-neutral-body font-normal leading-relaxed">
            <h3 className="text-xl font-extrabold text-neutral-dark mb-1">Our History</h3>
            <p>
              Nav Jeevan Public School was established in 2008 with a simple yet ambitious goal: to bring premium, modern, and value-based education to children in the rural pockets of Captanganj, Kushinagar, Uttar Pradesh. Recognizing that language fluency and computer literacy are key barriers for rural progress, we structured our curricula around bilingual teaching guidelines.
            </p>
            <p>
              Over the last decade and a half, our institution has grown from a local primary class center into a reputable CBSE-pattern co-educational school. Today, we cater to hundreds of boys and girls from Khabharabhar and nearby villages, ensuring they secure high scores in higher education exams and clear entrance competitions successfully.
            </p>
            
            {/* Accreditation Block */}
            <div className="mt-4 p-5 bg-neutral-light border border-gray-200 rounded-2xl flex gap-4 items-start">
              <Award className="w-10 h-10 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-neutral-dark">Recognition & Affiliation</h4>
                <p className="text-xs text-neutral-body mt-1 leading-relaxed">
                  Nav Jeevan is recognized under the educational standards of Uttar Pradesh. The school operates on strict CBSE pattern methodologies, preparing children for modern competitive challenges. Both English and Hindi instruction formats are actively sustained.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Milestones (Right) */}
          <div className="lg:col-span-5 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-extrabold text-neutral-dark border-b border-gray-200 pb-3 mb-6">
              Our Journey (Milestones)
            </h3>
            <div className="flex flex-col gap-6 relative pl-4 border-l border-primary/25">
              {milestones.map((stone, idx) => (
                <div key={idx} className="relative flex flex-col gap-1.5">
                  {/* Circle dot marker */}
                  <div className="absolute left-[-25px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white" />
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {stone.year}
                    </span>
                    <h4 className="text-sm font-extrabold text-neutral-dark">
                      {stone.title}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-body leading-relaxed font-normal">
                    {stone.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission, Vision, and Values Block */}
        <section className="py-16 border-b border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionHeading 
              title="Our Purpose & Core Values"
              subtitle="The pillars that define daily academic instruction and character training at Nav Jeevan."
              centered
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col gap-4 text-left"
                >
                  <div className={`p-3 w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-dark leading-tight">
                    {val.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Full Long-Form Principal Welcome Letter */}
        <section className="py-16 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-10 my-12">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-black text-primary uppercase tracking-widest">Leadership Note</span>
              <h3 className="text-2xl font-extrabold text-neutral-dark tracking-tight leading-tight">
                Message from the Principal&apos;s Desk
              </h3>
              <div className="h-0.5 w-12 bg-primary mt-1.5 rounded-full" />
            </div>

            <div className="flex flex-col gap-4 text-sm md:text-base text-neutral-body font-normal leading-relaxed">
              <p>Dear Parents, Guardians, and Well-Wishers,</p>
              <p>
                Welcome to Nav Jeevan Public School! It is a distinct privilege to lead an educational community where our staff members, student body, and parents collaborate in building supportive, character-defining, and capable lives.
              </p>
              <p>
                We recognize that rural areas in Kushinagar are brimming with pure talent, child analytical capability, and creative energies. However, students often face hurdles in competitive exam fields due to a lack of core English language confidence and digital computing literacy.
              </p>
              <p>
                At Nav Jeevan, we bridges this divide. Our bilingual classrooms are geared toward removing language fear. Our computer practicals ensure kids from class III can handle digital systems comfortably. Our moral drills establish strong character, respect for elders, and national pride.
              </p>
              <p>
                We welcome you to partner with us in this beautiful journey. Let us hold hands to secure the absolute best developmental path for our children.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-300 flex flex-col">
              <span className="text-sm font-black text-neutral-dark">Shri Rajesh Kumar Mishra</span>
              <span className="text-xs text-accent font-bold mt-0.5">Principal, Nav Jeevan Public School</span>
              <span className="text-xs text-gray-500 font-medium">M.Sc., B.Ed., M.Ed. | 22+ Years Educational Service</span>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-8">
          <SectionHeading 
            title="School Achievements" 
            subtitle="Proud milestones representing our student and teacher efforts in Kushinagar district tournaments and board outcomes."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="p-5 bg-white border border-gray-200 rounded-2xl flex gap-3.5 items-start">
              <BookOpen className="w-8 h-8 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-neutral-dark">100% Board Results</h4>
                <p className="text-xs text-neutral-body mt-1 leading-relaxed">
                  Consecutive academic batches have achieved a 100% pass record in Class X standard curriculum tests, with top students scoring over 90% in Science and Math.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-2xl flex gap-3.5 items-start">
              <Award className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-neutral-dark">District Sports Trophies</h4>
                <p className="text-xs text-neutral-body mt-1 leading-relaxed">
                  Our student sports contingents have bagged Gold and Silver placements in block-level Kabaddi, Kho-Kho, and 400m sprint events in Kushinagar tournaments.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-2xl flex gap-3.5 items-start">
              <GraduationCapIcon className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-neutral-dark">Regional Scholarship Qualifiers</h4>
                <p className="text-xs text-neutral-body mt-1 leading-relaxed">
                  Multiple children from weaker economic backgrounds have successfully cracked government merit scholarship programs under our teacher coaching models.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Simple fallback helper component since standard GraduationCap is sometimes imported with different suffixes
function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2} 
      stroke="currentColor" 
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.263 10.185a.75.75 0 0 0 0 1.206l6.705 4.917a.75.75 0 0 0 .89 0l6.705-4.917a.75.75 0 0 0 0-1.206l-6.705-4.917a.75.75 0 0 0-.89 0l-6.705 4.917Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v-6.75m0 6.75H8.25m3.75 0h3.75m-7.5 0v-2.25c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25" />
    </svg>
  );
}
