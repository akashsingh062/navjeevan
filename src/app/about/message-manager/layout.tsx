import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager's Message | Nav Jeevan Public School Khabharabhar",
  description:
    "Read the Managing Director's note at Nav Jeevan Public School Khabharabhar. Discover management's vision for academic progress and community welfare at NJPS Kushinagar.",
  alternates: { canonical: "/about/message-manager" },
};

export default function ManagerMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
