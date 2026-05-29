import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities | Nav Jeevan Public School Khabharabhar Campus",
  description:
    "Explore the modern learning campus facilities at Nav Jeevan Public School Khabharabhar. Smart classrooms and digital IT labs at NJPS Kushinagar prepare children for a digital future.",
  alternates: { canonical: "/facilities" },
  openGraph: {
    title: "Facilities at NJPS Kushinagar – Modern Infrastructure",
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
