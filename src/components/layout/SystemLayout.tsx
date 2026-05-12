"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SystemProvider, useSystem } from "@/context/SystemContext";
import { TerminalCLI } from "@/components/animations/TerminalCLI";
import { SystemOverlay } from "@/components/shared/SystemOverlay";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { Soundscape } from "@/components/shared/Soundscape";
import { SystemNotifications } from "@/components/shared/SystemNotifications";

export const SystemLayout = ({ children }: { children: React.ReactNode }) => {
  return (
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
  );
};

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
