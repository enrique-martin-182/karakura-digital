"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const SPRING = { stiffness: 180, damping: 28, mass: 0.6 };

export function MagneticCard({
  children,
  className = "",
  glowColor = "rgba(255,122,0,0.45)",
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // Damped values for smooth follow
  const smoothX = useSpring(mx, SPRING);
  const smoothY = useSpring(my, SPRING);

  // Tilt: ±5 deg
  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);

  // Glow position as percentage strings for the radial gradient
  const glowLeft = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glowTop  = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    setHovered(false);
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      transition={{ duration: 0 }}
      className={`relative overflow-hidden glass-panel ${className}`}
    >
      {/* Border glow — follows cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          background: hovered
            ? `radial-gradient(320px circle at ${glowLeft} ${glowTop}, ${glowColor}, transparent 65%)`
            : "none",
          opacity: 0.6,
        }}
      />

      {/* Edge-only glow ring using pseudo-like overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          background: hovered
            ? `radial-gradient(280px circle at ${glowLeft} ${glowTop}, ${glowColor.replace(/[\d.]+\)$/, "0.12)")}, transparent 60%)`
            : "none",
          boxShadow: hovered ? `inset 0 0 0 1px ${glowColor.replace(/[\d.]+\)$/, "0.25)")}` : "none",
          transition: "box-shadow 0.25s",
        }}
      />

      <div className="relative z-10" style={{ transform: "translateZ(8px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
