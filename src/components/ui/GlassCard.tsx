"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={cn(
        "glass-panel rounded-2xl p-8 md:p-10 relative overflow-hidden group",
        variantStyles[variant],
        className
      )}
    >
      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
