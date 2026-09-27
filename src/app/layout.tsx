import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { BUSINESS_CONFIG } from "@/data/initialData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Apex Decorating & Restoration | Master Painters & Decorators Cheltenham, Bath & Cotswolds",
    template: "%s | Apex Decorating & Restoration",
  },
  description: "Specialist master painters, heritage property restoration, airless kitchen spray finishes, and designer wallpapering across Cheltenham, Bath, Bristol and the Cotswolds. £5M insured.",
  keywords: [
    "painter and decorator Cheltenham",
    "heritage property restoration Bath",
    "sash window repair bio resin",
    "kitchen spray painting Bristol",
    "specialist wallpaper hanger Cotswolds",
    "Farrow and Ball painters",
    "commercial decorator Gloucestershire"
  ],
  authors: [{ name: "Apex Decorating & Restoration" }],
  creator: "Apex Decorating & Restoration",
  publisher: "developer.itsmyapp.co.uk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Apex Decorating & Restoration | Master Craftsmen",
    description: "Premium residential and commercial painting, sash window restoration, and fine finish spraying in Cheltenham, Bath & Cotswolds.",
    type: "website",
    locale: "en_GB",
    siteName: "Apex Decorating & Restoration",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${outfit.variable}`}>
      <body className="flex flex-col min-h-screen bg-[#fcfbf7] text-slate-900 selection:bg-amber-100 selection:text-amber-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-amber-600 text-white font-bold rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Skip to main content
        </a>
        
        <Navbar />
        
        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
