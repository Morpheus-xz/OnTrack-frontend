import React from "react";
import { SparklesCore } from "./ui/SparklesCore";
import { FloatingIcons } from "./ui/FloatingIcons";

/**
 * BackgroundWrapper: The Global Atmosphere of OnTrack.
 * This component wraps around your Routes in App.jsx to ensure
 * sparkles, floating icons, and ambient glows persist on every page.
 */
export default function BackgroundWrapper({ children }) {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-blue-500/30">

      {/* 1. FIXED BACKGROUND ENGINE
          Positioned 'fixed' so it stays perfectly still while the user scrolls,
          creating a deep parallax effect with the content on top.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Layer A: Sparkles (The FigureIt Twinkle Effect) */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
  id="global-page-sparkles"
  background="transparent"
  minSize={0.5}          /* Increased from 0.4 for better visibility */
  maxSize={1.3}          /* Increased from 1.2 for larger highlights */
  particleDensity={100}  /* Doubled from 70 to make it much denser */
  className="w-full h-full"
  particleColor="#3b82f6"
  speed={0.8}            /* Increased from 0.5 for more active movement */
/>
        </div>

        {/* Layer B: Floating Technical Icons (Ghost Icons) */}
        <FloatingIcons />

        {/* Layer C: Mesh Blueprint Grid
            Provides that "Engineering" texture you liked.
        */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        {/* Layer D: Ambient Primary Glow (Top Left) */}
        <div className="absolute w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[160px] -top-1/4 -left-1/4 animate-pulse duration-[10s]" />

        {/* Layer E: Secondary Accent Glow (Bottom Right) */}
        <div className="absolute w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[140px] -bottom-1/4 -right-1/4 opacity-50" />
      </div>

      {/* 2. PAGE CONTENT
          Wrapped in a relative container with a higher Z-index
          to ensure all text and buttons remain interactive.
      */}
      <div className="relative z-10 w-full">
        {children}
      </div>

    </div>
  );
}