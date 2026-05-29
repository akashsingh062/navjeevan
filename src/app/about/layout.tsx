import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Nav Jeevan Public School Khabharabhar",
  description:
    "Learn about Nav Jeevan Public School Khabharabhar — our history, vision, and mission. Discover how NJPS Kushinagar delivers outstanding CBSE-pattern primary education to students.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nav Jeevan Public School – NJPS Kushinagar",
    description:
      "Discover our journey, vision and values. NJPS Kushinagar is dedicated to nurturing excellence in education at Khabharabhar, Kaptanganj.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
