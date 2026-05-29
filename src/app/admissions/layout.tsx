import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions Open | Nav Jeevan Public School Khabharabhar",
  description:
    "Admissions are open at Nav Jeevan Public School Khabharabhar. Apply today at NJPS Kushinagar (Nursery to Class 8) for modern, affordable, and holistic UP education.",
  alternates: { canonical: "/admissions" },
  openGraph: {
    title: "Admissions Open at NJPS Kushinagar – Apply Now",
    description:
      "Enrol your child at Nav Jeevan Public School Khabharabhar. Admissions open for all classes. Quality UP-pattern education in Kushinagar.",
  },
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
