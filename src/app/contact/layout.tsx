import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us – Phone, Email & Address",
  description:
    "Contact Nav Jeevan Public School (NJPS) Khabharabhar, Kaptanganj, Kushinagar. Phone: +91 99356 61144. Address: Khabharabhar, Kaptanganj, Kushinagar, UP 274301. Enquiry form available.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact NJPS Khabharabhar – Get in Touch",
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
