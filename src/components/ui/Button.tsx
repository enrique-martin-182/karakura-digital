"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
  > {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-white border border-white/10 hover:shadow-[0_0_40px_-5px_rgba(255,122,0,0.7)] btn-shine",
  secondary:
    "border border-outline-variant/50 bg-surface-variant/30 backdrop-blur-sm text-white hover:bg-surface-variant hover:border-outline-variant hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]",
  ghost: "text-on-surface-variant hover:text-white underline-offset-4 hover:underline",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Button({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-label-md font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container",
    variants[variant],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: EASE }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: EASE }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
