"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSecretStore } from "@/store/useSecretStore";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Spark {
  id:       number;
  x:        number;
  y:        number;
  angle:    number;  // degrees
  distance: number;  // px
  size:     number;  // px
}

const SPARK_COUNT    = 10;
const SPARK_DURATION = 0.45; // seconds

// ─── Volt body class (CSS variable override) ──────────────────────────────────
// Injected on <html> so Tailwind tokens cascade correctly.

function useVoltBodyClass(active: boolean) {
  useEffect(() => {
    const el = document.documentElement;
    if (active) {
      el.classList.add("volt-mode");
    } else {
      el.classList.remove("volt-mode");
    }
    return () => el.classList.remove("volt-mode");
  }, [active]);
}

// ─── Single spark particle ────────────────────────────────────────────────────

function SparkParticle({ spark }: { spark: Spark }) {
  const rad = (spark.angle * Math.PI) / 180;
  const tx  = Math.cos(rad) * spark.distance;
  const ty  = Math.sin(rad) * spark.distance;

  return (
    <motion.div
      key={spark.id}
      className="absolute rounded-full pointer-events-none"
      style={{
        left:      spark.x,
        top:       spark.y,
        width:     spark.size,
        height:    spark.size,
        translateX: "-50%",
        translateY: "-50%",
        background: "#fde047",
        boxShadow: `0 0 ${spark.size * 2}px 2px #fde047, 0 0 ${spark.size * 4}px #fbbf24`,
        willChange: "transform, opacity",
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{ x: tx, y: ty, scale: 0, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: SPARK_DURATION, ease: "easeOut" }}
    />
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export function ClickSparks() {
  const isVoltMode = useSecretStore((s) => s.isVoltMode);
  const [sparks, setSparks]   = useState<Spark[]>([]);
  const nextId = useRef(0);

  useVoltBodyClass(isVoltMode);

  useEffect(() => {
    if (!isVoltMode) return;

    const onClick = (e: MouseEvent) => {
      // Spawn a burst of sparks from the click point
      const burst: Spark[] = Array.from({ length: SPARK_COUNT }, (_, i) => ({
        id:       nextId.current++,
        x:        e.clientX,
        y:        e.clientY,
        // Evenly spaced angles + slight jitter
        angle:    (360 / SPARK_COUNT) * i + (Math.random() - 0.5) * 20,
        distance: 35 + Math.random() * 45,
        size:     3 + Math.random() * 4,
      }));

      setSparks((prev) => [...prev, ...burst]);

      // Prune after animation finishes
      const ids = new Set(burst.map((s) => s.id));
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => !ids.has(s.id)));
      }, SPARK_DURATION * 1000 + 50);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [isVoltMode]);

  // Unmount cleanly when volt mode off
  if (!isVoltMode && sparks.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9996 }}
    >
      <AnimatePresence>
        {sparks.map((spark) => (
          <SparkParticle key={spark.id} spark={spark} />
        ))}
      </AnimatePresence>
    </div>
  );
}
