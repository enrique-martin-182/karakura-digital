"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/cn";

interface GlassCardProps {
  children: React.ReactNode;
  variant?: "default" | "glow-orange" | "glow-green" | "error";
  hover?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "border border-outline-variant/20 hover:border-primary-container/40",
  "glow-orange": "glow-accent border border-primary-container/30",
  "glow-green": "green-glow border border-secondary/30",
  error: "border border-error/20",
};

export function GlassCard({
  children,
  variant = "default",
  hover = true,
  className,
}: GlassCardProps) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.08), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={cn(
        "glass-panel rounded-2xl p-8 md:p-10 relative overflow-hidden group",
        variantStyles[variant],
        className
      )}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: spotlight }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
