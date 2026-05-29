import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Nav Jeevan Public School Khabharabhar",
  description:
    "View the dynamic school environment at Nav Jeevan Public School Khabharabhar. Browse photos of student activities, events, and academic life at NJPS Kushinagar.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Photo Gallery – NJPS Kushinagar School Events",
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
