import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Principal's Message | Nav Jeevan Public School Khabharabhar",
  description:
    "Read the Principal's message at Nav Jeevan Public School Khabharabhar. Insights on academic philosophy, discipline, and student guidance at NJPS Kushinagar.",
  alternates: { canonical: "/about/message-principal" },
};

export default function PrincipalMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
