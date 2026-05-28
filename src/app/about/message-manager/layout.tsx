import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager's Message",
  description:
    "Read the Manager's message at Nav Jeevan Public School (NJPS) Khabharabhar — our management's vision for quality education, infrastructure, and community development in Kushinagar.",
  alternates: { canonical: "/about/message-manager" },
};

export default function ManagerMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
