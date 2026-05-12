"use client";

import React, { useEffect, useCallback } from 'react';
import { useSystem } from '@/context/SystemContext';

export const Soundscape = () => {
  const { isChaosMode } = useSystem();

  const playBeep = useCallback((freq = 440, type: OscillatorType = 'sine', duration = 0.1, volume = 0.1) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context blocked or not supported.");
    }
  }, []);

  useEffect(() => {
    const handleClick = () => playBeep(880, 'sine', 0.05, 0.05);
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        playBeep(1200, 'sine', 0.02, 0.02);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [playBeep]);

  // Ambient Hum Logic
  useEffect(() => {
    let oscillator: OscillatorNode | null = null;
    let audioCtx: AudioContext | null = null;

    const startHum = () => {
      try {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(50, audioCtx.currentTime); // Low freq hum
        
        gainNode.gain.setValueAtTime(isChaosMode ? 0.05 : 0.02, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
      } catch (e) {}
    };

    const stopHum = () => {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
      }
      if (audioCtx) {
        audioCtx.close();
      }
    };

    // Note: Auto-play policies require user interaction first.
    // This will start on the first click in the app.
    window.addEventListener('mousedown', startHum, { once: true });

    return () => {
      stopHum();
      window.removeEventListener('mousedown', startHum);
    };
  }, [isChaosMode]);

  return null;
};
