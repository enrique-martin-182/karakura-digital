"use client";

import { motion, type MotionValue } from "framer-motion";

interface GradientBlobProps {
  color: "orange" | "green";
  position: string;
  size?: string;
  y?: MotionValue<number>;
}

export function GradientBlob({ color, position, size = "500px", y }: GradientBlobProps) {
  const colorClass =
    color === "orange"
      ? "bg-primary-container/30"
      : "bg-secondary/20";

  return (
    <motion.div
      className={`absolute ${position} rounded-full blur-[140px] pointer-events-none animate-pulse-slow ${colorClass}`}
      style={{ width: size, height: size, y }}
      aria-hidden="true"
    />
  );
}
