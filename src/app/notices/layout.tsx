import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notices & Circulars – Latest Announcements",
  description:
    "Latest notices, circulars, and official announcements from Nav Jeevan Public School (NJPS) Khabharabhar, Kaptanganj, Kushinagar. Stay updated with exam schedules, holidays, and events.",
  alternates: { canonical: "/notices" },
  openGraph: {
    title: "Notices – NJPS Khabharabhar Announcements",
    description:
      "Official notices and circulars from Nav Jeevan Public School Khabharabhar. Exam dates, holidays, events, and more.",
  },
};

export default function NoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
