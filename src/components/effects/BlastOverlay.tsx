"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useSecretStore } from "@/store/useSecretStore";

const LINE_COUNT = 28;

// Pre-compute line geometry (static, no re-render cost)
const LINES = Array.from({ length: LINE_COUNT }, (_, i) => {
  const angle  = (360 / LINE_COUNT) * i;
  const rad    = (angle * Math.PI) / 180;
  const inner  = 8 + (i % 3) * 2;
  const length = 48 + (i % 5) * 9;
  return {
    x1: 50 + Math.cos(rad) * inner,
    y1: 50 + Math.sin(rad) * inner,
    x2: 50 + Math.cos(rad) * length,
    y2: 50 + Math.sin(rad) * length,
    strokeWidth: i % 4 === 0 ? 0.5 : 0.22,
    opacity:     i % 3 === 0 ? 1 : 0.55,
  };
});

export function BlastOverlay() {
  const isBlastMode = useSecretStore((s) => s.isBlastMode);

  const velocity       = useMotionValue(0);
  const smoothVelocity = useSpring(velocity, { stiffness: 55, damping: 14 });

  // All visual intensities derived from velocity
  const vignetteOpacity  = useTransform(smoothVelocity, [0, 150, 800, 4000], [0, 0.25, 0.75, 0.95]);
  const lineOpacity      = useTransform(smoothVelocity, [0, 120, 600, 3000], [0, 0.2,  0.65, 0.9 ]);
  const glowOpacity      = useTransform(smoothVelocity, [0, 200, 1000, 4000],[0, 0.3,  0.7,  1.0 ]);
  const tunnelScale      = useTransform(smoothVelocity, [0, 400, 3000],       [1, 1.012, 1.025]);
  const chromatic        = useTransform(smoothVelocity, [0, 300, 2000],       [0, 0.2,  0.6  ]);

  const lastY  = useRef(0);
  const lastTs = useRef(performance.now());

  useEffect(() => {
    if (!isBlastMode) { velocity.set(0); return; }

    const onScroll = () => {
      const now = performance.now();
      const dt  = (now - lastTs.current) / 1000;
      if (dt < 0.008) return;
      const dy = window.scrollY - lastY.current;
      velocity.set(Math.max(0, dy / dt));
      lastY.current  = window.scrollY;
      lastTs.current = now;
    };

    lastY.current  = window.scrollY;
    lastTs.current = performance.now();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); velocity.set(0); };
  }, [isBlastMode, velocity]);

  if (!isBlastMode) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9984, willChange: "transform", scale: tunnelScale }}
    >
      {/* Speed lines — SVG radiating from centre */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: lineOpacity }}
      >
        {LINES.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="white"
            strokeWidth={l.strokeWidth}
            strokeOpacity={l.opacity}
          />
        ))}
        {/* Inner burst circle */}
        <circle cx="50" cy="50" r="6" fill="none" stroke="white" strokeWidth="0.15" strokeOpacity="0.4" />
        <circle cx="50" cy="50" r="12" fill="none" stroke="white" strokeWidth="0.1"  strokeOpacity="0.25" />
      </motion.svg>

      {/* Deep tunnel vignette */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background: [
            "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 25%, rgba(0,0,40,0.92) 100%)",
            "linear-gradient(to bottom, rgba(0,10,60,0.5) 0%, transparent 22%, transparent 78%, rgba(0,10,60,0.6) 100%)",
          ].join(", "),
        }}
      />

      {/* Cyan speed glow on edges */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: glowOpacity,
          background: [
            "radial-gradient(ellipse 100% 100% at 50% 0%,   rgba(6,182,212,0.18) 0%, transparent 55%)",
            "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(6,182,212,0.22) 0%, transparent 55%)",
            "radial-gradient(ellipse 30% 100% at 0%   50%,  rgba(99,102,241,0.15) 0%, transparent 70%)",
            "radial-gradient(ellipse 30% 100% at 100% 50%,  rgba(99,102,241,0.15) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Chromatic aberration hint — red left / blue right */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: chromatic,
          background: [
            "radial-gradient(ellipse 25% 100% at 0%   50%, rgba(239,68,68,0.12)  0%, transparent 100%)",
            "radial-gradient(ellipse 25% 100% at 100% 50%, rgba(59,130,246,0.12) 0%, transparent 100%)",
          ].join(", "),
        }}
      />
    </motion.div>
  );
}
