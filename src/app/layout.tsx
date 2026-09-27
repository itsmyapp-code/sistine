import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sistine Decorating | Painters & Decorators Dartmouth, Devon",
    template: "%s | Sistine Decorating",
  },
  description: "Professional painting and decorating in Dartmouth and the wider South Hams. Interior and exterior residential decorating with quality finishes.",
  keywords: [
    "painter and decorator Dartmouth",
    "Sistine Decorating Dartmouth",
    "painting Southtown Dartmouth",
    "interior painters Dartmouth",
    "exterior decorating South Devon",
    "wallpapering Dartmouth"
  ],
  authors: [{ name: "Sistine Decorating" }],
  creator: "Sistine Decorating",
  publisher: "developer.itsmyapp.co.uk",
  openGraph: {
    title: "Sistine Decorating | Dartmouth & South Devon",
    description: "Quality residential painting and decorating services across Dartmouth and the wider South Hams.",
    type: "website",
    locale: "en_GB",
    siteName: "Sistine Decorating",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e293b",
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
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex flex-col min-h-screen bg-[#faf9f5] text-slate-800 selection:bg-amber-100 selection:text-amber-900 font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-slate-900 text-white font-bold rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
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
