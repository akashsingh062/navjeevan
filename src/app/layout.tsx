import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollRevealObserver from "@/components/ScrollRevealObserver";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://njpskhabharabhar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Nav Jeevan Public School Khabharabhar – NJPS Khabharabhar, Kushinagar",
    template: "%s | Nav Jeevan Public School",
  },
  description:
    "Welcome to Nav Jeevan Public School Khabharabhar, Kaptanganj. Experience premier UP education at NJPS Kushinagar with smart classrooms, advanced computer IT labs, and holistic student guidance. Apply now!",
  keywords: [
    "Nav Jeevan Public School",
    "Nav Jeevan Public School Khabharabhar",
    "NJPS Khabharabhar",
    "NJPS",
    "Nav Jeevan School Kushinagar",
    "Best UP school Kushinagar",
    "Best school in Kushinagar",
    "English medium school Kaptanganj",
    "School in Khabharabhar",
    "Schools in Kaptanganj",
    "Admissions open Kushinagar",
    "Top school Kaptanganj Kushinagar",
    "Rural schools Uttar Pradesh",
    "UP school Kaptanganj",
    "Primary school Kushinagar",
    "Nav Jeevan Vidyalaya",
    "नव जीवन पब्लिक स्कूल",
    "नव जीवन पब्लिक स्कूल खभरबहार",
  ],
  authors: [{ name: "Nav Jeevan Public School" }],
  creator: "Nav Jeevan Public School",
  publisher: "Nav Jeevan Public School",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "googlee07843d3e8ac66fc",
  },
  openGraph: {
    title:
      "Nav Jeevan Public School – NJPS Khabharabhar | Best School in Kushinagar, UP",
    description:
      "Empowering students with modern IT literacy, smart classrooms, and excellent UP-pattern academics in Khabharabhar, Kaptanganj, Kushinagar.",
    url: SITE_URL,
    siteName: "Nav Jeevan Public School",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nav Jeevan Public School – NJPS Khabharabhar",
    description:
      "Best UP-pattern school in Khabharabhar, Kaptanganj, Kushinagar, UP. Smart classrooms, computer labs & holistic education.",
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
    <html
      lang="en"
      className={`${outfit.variable} h-full`}
      style={{ overflowX: "clip" }}
      data-scroll-behavior="smooth"
    >
      <body
        className="min-h-full flex flex-col bg-[#FAFAF7] text-neutral-dark font-sans antialiased select-text"
        style={{ overflowX: "clip" }}
      >
        <LanguageProvider>
          <ScrollRevealObserver />
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

          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
