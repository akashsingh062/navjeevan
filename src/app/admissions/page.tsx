import React from "react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import {
  Download,
  FileCheck,
  Calendar,
  Clock,
  AlertTriangle,
  ArrowDown,
} from "lucide-react";

export const metadata = {
  title: "Admissions 2026-27 | Nav Jeevan Public School Kaptanganj",
  description:
    "Information about admission process, age eligibility, required documents, and fee structures at Nav Jeevan Public School. Download forms online.",
};

export default function Admissions() {
  const steps = [
    {
      num: "01",
      title: "Collect Prospectus & Form",
      desc: "Collect the official admission form from the school counter in Khabharabhar, Kaptanganj during office hours (8:00 AM to 1:00 PM), or download it below.",
    },
    {
      num: "02",
      title: "Submit Documents & Form",
      desc: "Fill in child details and submit the application at the school office along with photocopies of Birth Certificate, Aadhar Card, and Transfer Certificate.",
    },
    {
      num: "03",
      title: "Student Interactive Check",
      desc: "For primary classes, a simple verbal interactive session is scheduled. For class VI and above, a basic written check in Math and English occurs.",
    },
    {
      num: "04",
      title: "Fee Payment & Admission",
      desc: "Upon selection, secure the student seat by depositing the admission fee at the counter. Uniform details and text books list will be provided.",
    },
  ];

  const eligibility = [
    {
      class: "Nursery / LKG",
      age: "3 to 4 Years",
      criteria:
        "Should be toilet-trained and responsive to verbal instructions.",
    },
    {
      class: "UKG / Class I",
      age: "4 to 5+ Years",
      criteria: "Should recognize basic alphabet sounds and numbers.",
    },
    {
      class: "Class II to V",
      age: "6 to 9 Years",
      criteria: "Basic Hindi and English reading skills. Simple arithmetic.",
    },
    {
      class: "Class VI to VIII",
      age: "10 to 12 Years",
      criteria:
        "Passing certificate from previous school. Written check score.",
    },
    {
      class: "Class IX to XII",
      age: "13 to 15+ Years",
      criteria:
        "Class VIII/X pass sheet. Written evaluation score in core subjects.",
    },
  ];

  const documents = [
    "Child's Original Birth Certificate (Hospital / Gram Panchayat issued)",
    "Photocopy of Child's Aadhar Card",
    "Photocopy of Parents' (Mother & Father) Aadhar Cards",
    "3 Recent Passport-size Photographs of the Child",
    "Original School Transfer Certificate (TC) from Class II onwards",
    "Previous Class Report Card / Progress Marksheet",
    "Category Certificate (OBC/SC/ST) if applicable for fee records",
  ];

  const fees = [
    {
      range: "Nursery to UKG",
      admission: "₹1,000 (Once)",
      tuition: "₹650 / Month",
      exam: "₹300 / Term",
    },
    {
      range: "Class I to V",
      admission: "₹1,500 (Once)",
      tuition: "₹800 / Month",
      exam: "₹400 / Term",
    },
    {
      range: "Class VI to VIII",
      admission: "₹1,800 (Once)",
      tuition: "₹1,000 / Month",
      exam: "₹450 / Term",
    },
    {
      range: "Class IX to X",
      admission: "₹2,500 (Once)",
      tuition: "₹1,300 / Month",
      exam: "₹500 / Term",
    },
    {
      range: "Class XI to XII",
      admission: "₹3,000 (Once)",
      tuition: "₹1,600 / Month",
      exam: "₹600 / Term",
    },
  ];

  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-14 text-left">
          <span className="text-[10px] uppercase font-black text-white bg-accent px-3.5 py-1.5 rounded-full tracking-wider inline-block mb-3.5 shadow-sm">
            Admission Session 2026 - 2027 Open
          </span>
          <SectionHeading
            title="School Admissions & Enrollment"
            subtitle="Everything you need to know to secure your child's seat at Nav Jeevan Public School."
          />
        </div>

        {/* Process Roadmap */}
        <section className="mb-16">
          <SectionHeading
            title="Our Admission Process"
            subtitle="A transparent, simple, and step-by-step pipeline to join our educational community."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-neutral-light border border-gray-200 p-6 rounded-2xl relative shadow-sm hover:border-primary/20 transition-all flex flex-col gap-3"
              >
                <span className="text-3xl font-serif font-black text-primary/30 leading-none">
                  {step.num}
                </span>
                <h3 className="text-base font-extrabold text-neutral-dark leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-body leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Two-Column Information (Documents & Eligibility) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-gray-100 pt-16 mb-16">
          {/* Age Eligibility (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SectionHeading
              title="Class Age & Eligibility Standards"
              subtitle="Please check the age and educational eligibility list before submitting forms."
            />
            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white mt-4">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-neutral-light border-b border-gray-200 text-neutral-dark font-extrabold text-xs uppercase">
                    <th className="p-4 font-bold">Class Offered</th>
                    <th className="p-4 font-bold">Target Age</th>
                    <th className="p-4 font-bold">Key Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-neutral-body font-normal">
                  {eligibility.map((el, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-neutral-light/35 transition-colors"
                    >
                      <td className="p-4 font-extrabold text-neutral-dark whitespace-nowrap">
                        {el.class}
                      </td>
                      <td className="p-4 font-semibold text-primary whitespace-nowrap">
                        {el.age}
                      </td>
                      <td className="p-4 leading-relaxed">{el.criteria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Required Paperwork (Right) */}
          <div className="lg:col-span-5 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col gap-5">
            <h3 className="text-lg font-extrabold text-neutral-dark flex items-center gap-2 border-b border-gray-200 pb-3">
              <FileCheck className="w-5 h-5 text-primary" />
              Required Documents Checklist
            </h3>
            <p className="text-xs text-neutral-body leading-relaxed font-normal -mt-2">
              Please submit self-attested photocopies of these documents along
              with the physical form. Keep originals handy for verification.
            </p>
            <ul className="flex flex-col gap-3 text-xs text-neutral-body leading-relaxed">
              {documents.map((doc, idx) => (
                <li key={idx} className="flex gap-2.5 items-start font-medium">
                  <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                    ✓
                  </div>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fee Structure Table */}
        <section className="py-16 border-t border-gray-100 mb-16">
          <SectionHeading
            title="Affordable & Transparent Fee Structure"
            subtitle="We maintain simple and highly subsidized fee schedules to benefit rural families in Kushinagar, with no hidden charges."
          />

          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white mt-8">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-neutral-light border-b border-gray-200 text-neutral-dark font-extrabold text-xs uppercase">
                  <th className="p-4 font-bold">Class / Wing</th>
                  <th className="p-4 font-bold">One-Time Admission Fee</th>
                  <th className="p-4 font-bold">Monthly Tuition Fee</th>
                  <th className="p-4 font-bold">Term examination Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-neutral-body font-normal">
                {fees.map((fee, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-neutral-light/35 transition-colors"
                  >
                    <td className="p-4 font-extrabold text-neutral-dark whitespace-nowrap">
                      {fee.range}
                    </td>
                    <td className="p-4 font-semibold text-neutral-body whitespace-nowrap">
                      {fee.admission}
                    </td>
                    <td className="p-4 font-extrabold text-accent whitespace-nowrap">
                      {fee.tuition}
                    </td>
                    <td className="p-4 font-semibold text-neutral-body whitespace-nowrap">
                      {fee.exam}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 p-4.5 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 items-start text-xs text-amber-800 leading-relaxed font-semibold">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold">Important Fee Notes:</h4>
              <ul className="list-disc list-inside mt-1 font-medium text-[11px] flex flex-col gap-1">
                <li>
                  Monthly tuition fees must be deposited at the counter by the
                  10th of every month.
                </li>
                <li>
                  Special fee concessions are available for siblings
                  (brother/sister studying together).
                </li>
                <li>
                  Subsidies are offered to parents from weaker economic
                  categories upon verification of state category certificates.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Paper Form Download Section */}
        <section
          id="download"
          className="py-12 bg-neutral-light border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16"
        >
          <div className="flex flex-col gap-2 max-w-xl text-left">
            <span className="text-xs font-black text-primary uppercase tracking-wider">
              Printable Application
            </span>
            <h3 className="text-xl font-extrabold text-neutral-dark tracking-tight leading-tight">
              Download Offline Admission Form
            </h3>
            <p className="text-xs md:text-sm text-neutral-body leading-relaxed font-normal">
              Prefer filling out a paper form? Download our bilingual,
              easy-to-print PDF form. Print it out, fill in the details, and
              bring it to our Kaptanganj office counter with documents.
            </p>
          </div>

          <a
            href="#inquiry-form"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white hover:bg-primary-hover rounded-xl font-black text-sm transition-all shadow-md focus:outline-none shrink-0 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Request Form via Inquiry</span>
          </a>
        </section>

        {/* Admissions Inquiry & Help Desk Contact Form */}
        <section id="inquiry-form" className="py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Context details */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <span className="text-xs font-black text-primary uppercase tracking-widest">
                Enrollment Help
              </span>
              <SectionHeading
                title="Quick Online Admissions Inquiry"
                subtitle="Have questions about age calculations, bus routes, or documents? Send us a quick inquiry and our admission team will call you back directly."
              />

              <div className="flex flex-col gap-4 text-xs text-neutral-body">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    1
                  </div>
                  <span className="font-semibold">
                    Bilingual help via phone or WhatsApp.
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    2
                  </div>
                  <span className="font-semibold">
                    Sub-second form submit with honeypot security.
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    3
                  </div>
                  <span className="font-semibold">
                    No paperwork charges for basic queries.
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form component */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
