import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision & Mission | NJPS Kushinagar Shaping Future Leaders",
  description:
    "Discover the vision, mission, and strategies of Nav Jeevan Public School Khabharabhar. Nurturing integrated development and academic excellence at NJPS Kushinagar.",
  alternates: { canonical: "/about/vision-mission" },
};

export default function VisionMissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
