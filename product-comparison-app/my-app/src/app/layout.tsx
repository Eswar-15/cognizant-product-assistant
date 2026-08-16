import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VersusAI — Smart AI Product Comparison Engine",
  description:
    "Compare laptops, smartphones, and tech hardware with verified zero-hallucination RAG AI datasheets.",
  keywords: ["product comparison", "laptop finder", "AI spec comparison", "tech specs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <body
        className={`${inter.variable} font-sans text-[#0F172A] bg-[#F5F7FA] min-h-screen antialiased selection:bg-blue-100 selection:text-blue-900`}
      >
        {children}
      </body>
    </html>
  );
}
