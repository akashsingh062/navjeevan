import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics – CBSE Pattern Curriculum",
  description:
    "Explore the CBSE-pattern academic curriculum at Nav Jeevan Public School (NJPS) Khabharabhar, Kaptanganj. English & Hindi medium instruction from Nursery to Class 8 with smart classrooms and activity-based learning.",
  alternates: { canonical: "/academics" },
  openGraph: {
    title: "Academics at NJPS Khabharabhar – CBSE Pattern Curriculum",
    description:
      "Comprehensive CBSE-pattern curriculum with smart classrooms, co-curricular activities, and holistic education at Nav Jeevan Public School.",
  },
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
