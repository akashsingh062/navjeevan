import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Principal's Message",
  description:
    "Read the Principal's message at Nav Jeevan Public School (NJPS) Khabharabhar — insights on our academic philosophy, student welfare, and educational goals in Kushinagar.",
  alternates: { canonical: "/about/message-principal" },
};

export default function PrincipalMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
