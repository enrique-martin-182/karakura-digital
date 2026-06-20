"use client";

import { motion, type MotionValue } from "framer-motion";

interface GradientBlobProps {
  color: "orange" | "green";
  position: string;
  size?: string;
  y?: MotionValue<number>;
}

export function GradientBlob({ color, position, size = "500px", y }: GradientBlobProps) {
  const gradient =
    color === "orange"
      ? "radial-gradient(circle, rgba(255, 122, 0, 0.3) 0%, transparent 70%)"
      : "radial-gradient(circle, rgba(78, 222, 163, 0.2) 0%, transparent 70%)";

  return (
    <motion.div
      className={`absolute ${position} rounded-full pointer-events-none`}
      style={{ width: size, height: size, y, background: gradient, willChange: "transform", contain: "strict" }}
      aria-hidden="true"
    />
  );
}
