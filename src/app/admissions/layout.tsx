import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions Open – Apply Now for 2026-27",
  description:
    "Admissions open at Nav Jeevan Public School (NJPS) Khabharabhar, Kaptanganj, Kushinagar. Apply now for Nursery to Class 8. Affordable fees, quality education, modern facilities. Contact us today.",
  alternates: { canonical: "/admissions" },
  openGraph: {
    title: "Admissions Open at NJPS Khabharabhar – Apply Now",
    description:
      "Enrol your child at Nav Jeevan Public School Khabharabhar. Admissions open for all classes. Quality CBSE-pattern education in Kushinagar.",
  },
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
