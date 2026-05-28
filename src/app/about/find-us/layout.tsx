import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Us – Location & Directions to NJPS",
  description:
    "Find Nav Jeevan Public School (NJPS) at Khabharabhar, Kaptanganj, Kushinagar, Uttar Pradesh 274301. Get directions, map, and nearby landmarks.",
  alternates: { canonical: "/about/find-us" },
};

export default function FindUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
