"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const SparklesCore = (props) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  // --- FIX: Hooks must be at the very top ---
  const generatedId = useId();
  const particleId = id || generatedId;
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const controls = {
    particles: {
      number: {
        value: particleDensity || 120,
        density: { enable: true, width: 800, height: 800 },
      },
      color: { value: particleColor || "#ffffff" },
      move: {
        enable: true,
        speed: speed || 0.4,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
      },
      size: {
        value: { min: minSize || 1, max: maxSize || 3 },
        animation: { enable: false, speed: 4, startValue: "random", destroy: "none" },
      },
      opacity: {
        value: { min: 0.1, max: 1 },
        animation: { enable: true, speed: 1, startValue: "random", destroy: "none" },
      },
      shape: { type: "circle" },
    },
    detectRetina: true,
    fpsLimit: 60
  };

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={particleId}
          className={cn("h-full w-full")}
          particlesLoaded={async (container) => {}}
          options={{
            background: { color: { value: background || "transparent" } },
            fullScreen: { enable: false, zIndex: 1 },
            ...controls,
          }}
        />
      )}
    </motion.div>
  );
};