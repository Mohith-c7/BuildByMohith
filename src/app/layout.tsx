import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SystemLayout } from "@/components/layout/SystemLayout";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Mohith | System Architect Portfolio",
    template: "%s | Portfolio_OS"
  },
  description: "A production-grade distributed system showcasing career evolution and technical expertise. Built with Next.js, Three.js, and Framer Motion.",
  keywords: ["System Architect", "Backend Developer", "Microservices", "Distributed Systems", "Full Stack"],
  authors: [{ name: "Mohith" }],
  creator: "Mohith",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buildbymohith.in",
    siteName: "Portfolio_OS",
    title: "Mohith | System Architect",
    description: "Distributed systems and high-performance backend architecture.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Portfolio OS" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohith | System Architect",
    description: "Distributed systems and high-performance backend architecture.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased bg-black text-white cursor-none`}>
        <SystemLayout>
          {children}
        </SystemLayout>
      </body>
    </html>
  );
}
