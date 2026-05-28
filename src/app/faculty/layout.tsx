import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Faculty – Experienced & Qualified Teachers",
  description:
    "Meet the experienced and qualified teaching staff at Nav Jeevan Public School (NJPS) Khabharabhar. Dedicated educators providing personalised attention and holistic learning in Kushinagar.",
  alternates: { canonical: "/faculty" },
  openGraph: {
    title: "Faculty at NJPS Khabharabhar – Dedicated Teachers",
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
