"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
}

interface SystemContextType {
  isChaosMode: boolean;
  chaosLevel: number; // 0 to 1
  toggleChaosMode: () => void;
  systemHealth: number;
  showMetrics: boolean;
  toggleShowMetrics: () => void;
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type']) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider = ({ children }: { children: ReactNode }) => {
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [systemHealth, setSystemHealth] = useState(99.98);
  const [showMetrics, setShowMetrics] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isChaosMode) {
      interval = setInterval(() => {
        setChaosLevel(Math.random());
      }, 500);
    } else {
      setChaosLevel(0);
    }
    return () => clearInterval(interval);
  }, [isChaosMode]);

  const toggleChaosMode = () => {
    setIsChaosMode(!isChaosMode);
    if (!isChaosMode) {
      setSystemHealth(74.23);
      addNotification("CHAOS_PROTOCOL_INITIALIZED", "error");
    } else {
      setSystemHealth(99.98);
      addNotification("SYSTEM_STABILITY_RESTORED", "info");
    }
  };

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const toggleShowMetrics = () => setShowMetrics(!showMetrics);

  return (
    <SystemContext.Provider value={{ 
      isChaosMode, 
      chaosLevel,
      toggleChaosMode, 
      systemHealth,
      showMetrics,
      toggleShowMetrics,
      notifications,
      addNotification
    }}>
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
