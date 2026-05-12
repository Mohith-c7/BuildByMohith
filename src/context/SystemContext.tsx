"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SystemContextType {
  isChaosMode: boolean;
  toggleChaosMode: () => void;
  systemHealth: number;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider = ({ children }: { children: ReactNode }) => {
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [systemHealth, setSystemHealth] = useState(99.98);

  const toggleChaosMode = () => {
    setIsChaosMode(!isChaosMode);
    if (!isChaosMode) {
      setSystemHealth(74.23);
    } else {
      setSystemHealth(99.98);
    }
  };

  return (
    <SystemContext.Provider value={{ isChaosMode, toggleChaosMode, systemHealth }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
