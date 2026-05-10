"use client";

import React from "react";
// Note: We'll use dynamic imports in the page to avoid SSR issues with Canvas
// import { Canvas } from "@react-three/fiber";

export const Scene = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-black to-black">
      {/* 3D Scene will be implemented here once dependencies are fully installed */}
      <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
    </div>
  );
};
