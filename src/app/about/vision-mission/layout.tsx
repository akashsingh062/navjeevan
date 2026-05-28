import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision & Mission – Shaping Future Leaders",
  description:
    "The vision and mission of Nav Jeevan Public School (NJPS) Khabharabhar — nurturing holistic development, academic excellence, and moral values in every child at Kaptanganj, Kushinagar.",
  alternates: { canonical: "/about/vision-mission" },
};

export default function VisionMissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
