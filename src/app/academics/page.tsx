import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ClipboardCheck, 
  GraduationCap, 
  Smile, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const metadata = {
  title: "Academics & Curriculum (LKG to VIII) | Nav Jeevan Public School",
  description: "Explore the CBSE-aligned joyful learning curriculum, core subjects, stress-free assessment framework, and seasonal school timings at Nav Jeevan Public School.",
};

export default function Academics() {
  const learningStages = [
    {
      title: "Foundational Pre-Primary Stage",
      classes: "Classes: LKG & UKG",
      focus: "Play-Way & Sensory Discovery",
      desc: "An engaging, activity-filled environment where young minds learn through hands-on games, interactive storytelling, and sensory play. We prioritize motor skill development, basic vocabulary, social manners, and self-expression with absolutely zero exam pressure.",
      subjects: ["Foundational English & Phonics", "Hindi Varnamala & Recitation", "Basic Numbers & Counting", "Art, Coloring & Creative Craft", "General Awareness & Nature Study", "Rhymes & Actions"],
      icon: Smile,
      borderColor: "border-primary/20",
      accentBg: "bg-primary-light",
      accentText: "text-primary"
    },
    {
      title: "Preparatory Primary Stage",
      classes: "Classes: I to V (Class 1 to 5)",
      focus: "Experiential & Concept-Based Learning",
      desc: "Designed to fuel academic curiosity and concrete learning. Students transition seamlessly to structured subjects, focusing on reading fluency, math calculations, and local environment studies. Joyful worksheets and daily activities build high levels of student self-confidence.",
      subjects: ["English Language & Literature", "Hindi Vyakaran & Literature", "Mathematics & Speed Arithmetic", "Environmental Studies (EVS)", "Computer Literacy & ICT", "Moral Value Education", "General Knowledge & Quiz", "Visual & Performing Arts"],
      icon: BookOpen,
      borderColor: "border-accent/20",
      accentBg: "bg-accent-light",
      accentText: "text-accent"
    },
    {
      title: "Middle School Stage",
      classes: "Classes: VI to VIII (Class 6 to 8)",
      focus: "Analytical Reasoning & Critical Inquiry",
      desc: "Prepares senior students with deeper conceptual clarity and analytical thinking skills. We introduce laboratory observation basics, mental math shortcuts, digital computing, and a third language to foster global perspectives and physical coordination through sports.",
      subjects: ["English Grammar, Writing & Lit", "Hindi Vyakaran & Sahitya", "Sanskrit (Third Language)", "Mathematics (Arithmetic, Algebra, Geometry)", "Integrated Science (Physics, Chemistry, Biology)", "Social Sciences (History, Geography, Civics)", "Computer Applications & Coding Basics", "Physical & Health Education", "Art, Crafts & General Knowledge"],
      icon: GraduationCap,
      borderColor: "border-neutral-dark/10",
      accentBg: "bg-neutral-light",
      accentText: "text-neutral-dark"
    }
  ];

  const timings = [
    {
      season: "Summer Session (April to October)",
      duration: "07:30 AM to 12:30 PM",
      break: "Recess: 10:00 AM - 10:20 AM",
      bg: "bg-primary-light border-primary/20 text-primary",
      iconColor: "text-primary"
    },
    {
      season: "Winter Session (November to March)",
      duration: "08:30 AM to 01:30 PM",
      break: "Recess: 11:00 AM - 11:20 AM",
      bg: "bg-accent-light border-accent/20 text-accent",
      iconColor: "text-accent"
    }
  ];



  return (
    <div className="py-12 bg-background flex-1 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================
            1. HERO PAGE HEADER BLOCK
            ========================================================= */}
        <div className="relative overflow-hidden bg-linear-to-br from-primary to-neutral-dark text-white rounded-3xl p-8 md:p-12 mb-16 shadow-lg">
          {/* Subtle overlay shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] uppercase font-black text-white/90 bg-white/15 border border-white/20 px-3 py-1 rounded-full tracking-widest inline-block mb-4">
              LKG to Class VIII Curriculum
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
              Academics & Joyful Learning
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              We offer a child-centered education framework aligned with CBSE & NCERT standards. 
              Our structure emphasizes concept clarity, moral development, and practical skills 
              to provide rural children with a competitive foundation.
            </p>
          </div>
        </div>

        {/* =========================================================
            2. STAGES & WINGS SECTION
            ========================================================= */}
        <section className="mb-20">
          <SectionHeading
            accent="Educational Stages"
            title="Curriculum & Learning Stages"
            subtitle="Explore our age-appropriate frameworks designed to support children through their critical early years."
            centered
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {learningStages.map((stage, idx) => {
              const StageIcon = stage.icon;
              return (
                <div 
                  key={idx}
                  className={`bg-surface border ${stage.borderColor} rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/30 transition-all duration-300 relative group overflow-hidden`}
                >
                  {/* Subtle top indicator bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${stage.accentBg}`} />
                  
                  <div>
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-2xl ${stage.accentBg} ${stage.accentText} flex items-center justify-center shrink-0 shadow-sm`}>
                        <StageIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black tracking-wider uppercase text-neutral-body/75">
                          {stage.classes}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-neutral-dark leading-tight mt-0.5">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    {/* Focus Tagline */}
                    <div className={`text-xs font-extrabold ${stage.accentText} flex items-center gap-1.5 mb-4`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{stage.focus}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-body leading-relaxed mb-6 font-medium">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Core Subjects badge grid */}
                  <div className="pt-5 border-t border-border">
                    <span className="text-[10px] uppercase font-black text-accent tracking-wider block mb-3">
                      Prescribed Core Subjects
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.subjects.map((sub, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[11px] font-semibold text-neutral-dark bg-neutral-light px-2.5 py-1 rounded-lg border border-border"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            3. EVALUATION SYSTEM & SCHOOL HOURS (2-Column Grid)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* A. Prescribed Examination Framework (Left) */}
          <div className="lg:col-span-7 bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center">
                  <ClipboardCheck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-neutral-dark leading-none">
                    Continuous Evaluation System
                  </h3>
                  <p className="text-[11px] text-neutral-body font-medium mt-1">
                    CBSE Guidelines & CCE Assessment Framework
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-body leading-relaxed mb-6 font-medium">
                To guarantee organic mental growth without exam stress, Nav Jeevan Public School 
                strictly implements continuous assessments that reward regular curiosity rather than 
                rote memorization.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <Smile className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      Pre-Primary: Gentle Observations
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5">
                      No written exam pressure for LKG and UKG children. Progress is evaluated 
                      via sensory participation, speech development, drawings, and interactive games.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      Class I to VIII: Continuous Diagnostics (CCE)
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5">
                      Evaluated through regular class diagnostics, periodic tests (PA-1 & PA-2), 
                      subject enrichment projects (maps, science kits), notebook neatness, and oral skills.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-dark">
                      Half-Yearly & Annual Evaluations
                    </h4>
                    <p className="text-xs text-neutral-body leading-relaxed mt-0.5">
                      Mid-term examinations in September and final examinations in March form the 
                      core evaluative pillars to support structured progression into higher grades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-[11px] text-accent font-bold">
              <span>* Standard Progress Cards issued twice a year.</span>
              <span className="flex items-center gap-1">CBSE Standards <ArrowRight className="w-3 h-3" /></span>
            </div>
          </div>

          {/* B. Daily School Hours (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                    <Clock className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-neutral-dark leading-none">
                      Seasonal School Timings
                    </h3>
                    <p className="text-[11px] text-neutral-body font-medium mt-1">
                      Safeguarding Student Safety & Climate Shifts
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-body leading-relaxed mb-6 font-medium">
                  We modify our daily assembly and academic hours seasonally to protect students 
                  from intense summer heat waves and dense winter morning fog.
                </p>

                <div className="flex flex-col gap-4">
                  {timings.map((time, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl border ${time.bg} flex gap-4 items-start shadow-xs`}
                    >
                      <Clock className="w-6 h-6 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider">{time.season}</h4>
                        <p className="text-base sm:text-lg font-black mt-1">{time.duration}</p>
                        <p className="text-[11px] font-bold opacity-80 mt-0.5">{time.break}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-neutral-body font-medium mt-6 bg-neutral-light p-3 rounded-xl border border-border">
                <strong>Important:</strong> Shift announcements are communicated to parents via SMS and 
                notice board cards a week before implementation.
              </div>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
}
