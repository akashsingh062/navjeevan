import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our History | Nav Jeevan Public School Khabharabhar",
  description:
    "Explore the history and milestones of Nav Jeevan Public School Khabharabhar, from its founding in 2011 to becoming a leading primary school as NJPS Kushinagar.",
  alternates: { canonical: "/about/history" },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
