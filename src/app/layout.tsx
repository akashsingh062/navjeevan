import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nav Jeevan Public School | Best CBSE School in Kushinagar, UP",
  description:
    "Welcome to Nav Jeevan Public School in Khabharabhar, Kaptanganj, Kushinagar, Uttar Pradesh. Offering high-quality co-educational CBSE-pattern learning in Hindi & English medium with smart classrooms, advanced computer labs, and modern facilities.",
  keywords: [
    "Nav Jeevan Public School",
    "Nav Jeevan School Kushinagar",
    "Best CBSE school Kushinagar",
    "English medium school Kaptanganj",
    "Schools in Khabharabhar",
    "Admissions open Kushinagar",
    "Rural schools Uttar Pradesh",
    "Top school in Kaptanganj",
  ],
  authors: [{ name: "Nav Jeevan School Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Nav Jeevan Public School | Best CBSE School in Kushinagar, UP",
    description:
      "Empowering rural students with modern IT literacy, smart learning blocks, and excellent CBSE academics in Khabharabhar, Kaptanganj.",
    type: "website",
    locale: "en_IN",
    siteName: "Nav Jeevan Public School",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D4621A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF7] text-neutral-dark font-sans antialiased select-text">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontFamily: "Outfit, sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "12px",
            },
          }}
        />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        {/* Sticky bottom nav — mobile only */}
        <BottomNav />
      </body>
    </html>
  );
}
