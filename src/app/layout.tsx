import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nav Jeevan Public School | Best CBSE School in Kushinagar, UP",
  description: "Welcome to Nav Jeevan Public School in Khabharabhar, Captanganj, Kushinagar, Uttar Pradesh. Offering high-quality co-educational CBSE-pattern learning in Hindi & English medium with smart classrooms, advanced computer labs, and modern facilities.",
  keywords: [
    "Nav Jeevan Public School",
    "Nav Jeevan School Kushinagar",
    "Best CBSE school Kushinagar",
    "English medium school Captanganj",
    "Schools in Khabharabhar",
    "Admissions open Kushinagar",
    "Rural schools Uttar Pradesh",
    "Top school in Captanganj"
  ],
  authors: [{ name: "Nav Jeevan School Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Nav Jeevan Public School | Best CBSE School in Kushinagar, UP",
    description: "Empowering rural students with modern IT literacy, smart learning blocks, and excellent CBSE academics in Khabharabhar, Captanganj.",
    type: "website",
    locale: "en_IN",
    siteName: "Nav Jeevan Public School"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-dark font-sans select-text">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
