import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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

import { SystemProvider, useSystem } from "@/context/SystemContext";
import { TerminalCLI } from "@/components/animations/TerminalCLI";
import { SystemOverlay } from "@/components/shared/SystemOverlay";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { Soundscape } from "@/components/shared/Soundscape";
import { SystemNotifications } from "@/components/shared/SystemNotifications";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased bg-black text-white cursor-none`}>
        <SystemProvider>
          <ChaosWrapper>
            {children}
          </ChaosWrapper>
          <TerminalCLI />
          <SystemOverlay />
          <CommandPalette />
          <CustomCursor />
          <Soundscape />
          <SystemNotifications />
        </SystemProvider>
      </body>
    </html>
  );
}

const ChaosWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isChaosMode, chaosLevel } = useSystem();
  
  return (
    <motion.div
      animate={isChaosMode ? {
        x: [0, (chaosLevel - 0.5) * 4, 0],
        y: [0, (chaosLevel - 0.5) * 4, 0],
        filter: chaosLevel > 0.8 ? ["none", "hue-rotate(90deg) grayscale(1)", "none"] : "none"
      } : {}}
      transition={{ duration: 0.1, repeat: isChaosMode ? Infinity : 0 }}
      className="min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
};
