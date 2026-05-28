import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our History – Journey of NJPS Khabharabhar",
  description:
    "Explore the history and milestones of Nav Jeevan Public School Khabharabhar, from its founding to becoming a leading educational institution in Kaptanganj, Kushinagar.",
  alternates: { canonical: "/about/history" },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
