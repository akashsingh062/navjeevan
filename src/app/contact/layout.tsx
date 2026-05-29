import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Nav Jeevan Public School Khabharabhar",
  description:
    "Get in touch with Nav Jeevan Public School Khabharabhar. Contact NJPS Kushinagar for admissions, support, and school visits. Phone: +91 98898 97057. Address: Khabharabhar, Kaptanganj, Kushinagar, UP 274301.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact NJPS Kushinagar – Get in Touch",
    description:
      "Reach Nav Jeevan Public School at Khabharabhar, Kaptanganj, Kushinagar. Phone, email, map and enquiry form.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
