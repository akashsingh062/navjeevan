import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Faculty | Nav Jeevan Public School Khabharabhar",
  description:
    "Meet the highly qualified teachers and staff members at Nav Jeevan Public School Khabharabhar. Dedicated educators shaping young minds at NJPS Kushinagar.",
  alternates: { canonical: "/faculty" },
  openGraph: {
    title: "Faculty at NJPS Kushinagar – Dedicated Teachers",
    description:
      "Qualified and caring teachers driving academic excellence at Nav Jeevan Public School Khabharabhar, Kushinagar.",
  },
};

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
