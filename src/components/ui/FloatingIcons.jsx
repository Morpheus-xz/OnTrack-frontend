import React from 'react';
import {
  Code, Brain, PieChart, Layers, Terminal,
  Cpu, Database, Globe, Zap, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const IconWrapper = ({ icon: Icon, x, y, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.1, 0.3, 0.1], // Subtle opacity so it stays in background
      scale: 1,
      y: [0, -40, 0],
      x: [0, 20, 0]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className={`absolute hidden lg:flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm ${color} shadow-2xl z-0 pointer-events-none`}
    style={{ left: x, top: y }}
  >
    <Icon size={32} />
  </motion.div>
);

export const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Existing Icons */}
      <IconWrapper icon={Code} x="12%" y="15%" delay={0} color="text-blue-500/60" />
      <IconWrapper icon={Brain} x="85%" y="20%" delay={2} color="text-purple-500/60" />
      <IconWrapper icon={PieChart} x="8%" y="75%" delay={1} color="text-emerald-500/60" />
      <IconWrapper icon={Layers} x="88%" y="60%" delay={3} color="text-orange-500/60" />
      <IconWrapper icon={Terminal} x="45%" y="10%" delay={4} color="text-zinc-500/60" />

      {/* Add New Instances to fill space */}
      <IconWrapper icon={Zap} x="30%" y="40%" delay={5} color="text-yellow-500/60" />
      <IconWrapper icon={Activity} x="70%" y="50%" delay={1} color="text-red-500/60" />
      <IconWrapper icon={Database} x="40%" y="80%" delay={3} color="text-cyan-500/60" />
    </div>
  );
};