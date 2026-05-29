import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Us | Nav Jeevan Public School Khabharabhar Directions",
  description:
    "Get full directions and map for Nav Jeevan Public School Khabharabhar. Contact NJPS Kushinagar at Khabharabhar, Kaptanganj, Uttar Pradesh 274301.",
  alternates: { canonical: "/about/find-us" },
};

export default function FindUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
