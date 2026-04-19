import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import "./globals.css";

// Lazy-load non-critical components that aren't needed for initial render
const FAQHelpline = dynamic(() => import("@/components/layout/FAQHelpline"), { ssr: false });
const CursorTrail = dynamic(() => import("@/components/common/CursorTrail"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/common/Chatbot"), { ssr: false });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reuse_mart — Sustainable E-Commerce & Circular Economy",
  description: "Shop, reuse, donate, rescue food, and track your sustainability impact. A community-powered platform for a circular economy.",
  keywords: ["sustainable", "circular economy", "e-commerce", "upcycling", "food rescue", "swap", "rent"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <CurrencyProvider>
            <CursorTrail />
            <Preloader />
            <Navbar />
            <main className="flex-1">{children}</main>
            <FAQHelpline />
            <Footer />
            <Chatbot />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
