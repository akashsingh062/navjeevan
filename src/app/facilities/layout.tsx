import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities – Smart Classrooms, Computer Labs & More",
  description:
    "Discover modern facilities at Nav Jeevan Public School (NJPS) Khabharabhar — smart classrooms, advanced computer labs, library, playground, assembly hall, and safe campus infrastructure in Kushinagar.",
  alternates: { canonical: "/facilities" },
  openGraph: {
    title: "Facilities at NJPS Khabharabhar – Modern Infrastructure",
    description:
      "Smart classrooms, computer labs, library, playground, and more at Nav Jeevan Public School Khabharabhar.",
  },
};

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
