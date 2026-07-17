"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSecretStore } from "@/store/useSecretStore";

// Blue edge-vignette that intensifies with downward scroll velocity.
// Uses opacity on a gradient overlay — no blur, no filter: safe for perf.

export function BlastOverlay() {
  const isBlastMode = useSecretStore((s) => s.isBlastMode);

  // Raw scroll velocity (px / s), smoothed via spring
  const velocity       = useMotionValue(0);
  const smoothVelocity = useSpring(velocity, { stiffness: 80, damping: 20 });

  // Map velocity → opacity: still = 0, fast down = 0.55
  const opacity = useTransform(smoothVelocity, [0, 100, 800, 3000], [0, 0.1, 0.45, 0.6]);

  const lastY   = useRef(0);
  const lastTs  = useRef(performance.now());

  useEffect(() => {
    if (!isBlastMode) {
      velocity.set(0);
      return;
    }

    const onScroll = () => {
      const now = performance.now();
      const dt  = (now - lastTs.current) / 1000;
      if (dt < 0.008) return; // skip micro-updates

      const dy = window.scrollY - lastY.current;
      velocity.set(Math.max(0, dy / dt)); // only downward velocity
      lastY.current  = window.scrollY;
      lastTs.current = now;
    };

    lastY.current  = window.scrollY;
    lastTs.current = performance.now();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      velocity.set(0);
    };
  }, [isBlastMode, velocity]);

  if (!isBlastMode) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex:     9984,
        opacity,
        background: [
          "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(30,64,175,0.55) 100%)",
          "linear-gradient(to bottom, rgba(30,64,175,0.2) 0%, transparent 18%, transparent 82%, rgba(30,64,175,0.3) 100%)",
        ].join(", "),
        willChange: "opacity",
      }}
    />
  );
}
