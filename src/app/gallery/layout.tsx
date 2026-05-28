import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery – School Events & Activities",
  description:
    "Browse the photo gallery of Nav Jeevan Public School (NJPS) Khabharabhar — annual functions, sports day, Republic Day celebrations, classroom activities, and campus life in Kushinagar.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery – NJPS Khabharabhar School Events",
    description:
      "Photos and memories from Nav Jeevan Public School Khabharabhar events, celebrations, and everyday campus life.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
