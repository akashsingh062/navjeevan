import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – History, Vision & Values",
  description:
    "Learn about Nav Jeevan Public School (NJPS) Khabharabhar — our history, vision, mission, core values, achievements, and commitment to quality education in Kaptanganj, Kushinagar, Uttar Pradesh.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nav Jeevan Public School – NJPS Khabharabhar",
    description:
      "Discover our journey, vision and values. NJPS Khabharabhar is dedicated to nurturing excellence in education in rural Kushinagar.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
