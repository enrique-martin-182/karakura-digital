"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSecretStore } from "@/store/useSecretStore";

const SPARK_COUNT    = 22;
const SPARK_DURATION = 0.6;
const COLORS = ["#fde047", "#ffffff", "#fb923c", "#fbbf24", "#a3e635"];

interface Spark { id: number; x: number; y: number; angle: number; distance: number; size: number; color: string; }
interface Wave  { id: number; x: number; y: number; }
interface Flash { id: number; x: number; y: number; }

function useVoltBodyClass(active: boolean) {
  useEffect(() => {
    const el = document.documentElement;
    if (active) el.classList.add("volt-mode");
    else el.classList.remove("volt-mode");
    return () => el.classList.remove("volt-mode");
  }, [active]);
}

function SparkParticle({ spark }: { spark: Spark }) {
  const rad = (spark.angle * Math.PI) / 180;
  const tx  = Math.cos(rad) * spark.distance;
  const ty  = Math.sin(rad) * spark.distance;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: spark.x, top: spark.y,
        width: spark.size, height: spark.size,
        translateX: "-50%", translateY: "-50%",
        background: spark.color,
        boxShadow: `0 0 ${spark.size * 2}px 2px ${spark.color}, 0 0 ${spark.size * 6}px ${spark.color}99`,
        willChange: "transform, opacity",
      }}
      initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
      animate={{ x: tx, y: ty, scale: 0, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: SPARK_DURATION, ease: [0.2, 0.8, 0.4, 1] }}
    />
  );
}

function ShockwaveRing({ wave }: { wave: Wave }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: wave.x, top: wave.y,
        translateX: "-50%", translateY: "-50%",
        border: "2px solid #fde047",
        boxShadow: "0 0 12px 2px #fde047, inset 0 0 8px #fde04744",
        willChange: "transform, opacity",
      }}
      initial={{ width: 4, height: 4, opacity: 1 }}
      animate={{ width: 160, height: 160, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    />
  );
}

function SecondRing({ wave }: { wave: Wave }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: wave.x, top: wave.y,
        translateX: "-50%", translateY: "-50%",
        border: "1px solid #fb923c88",
        willChange: "transform, opacity",
      }}
      initial={{ width: 4, height: 4, opacity: 0.7 }}
      animate={{ width: 90, height: 90, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.06 }}
    />
  );
}

function FlashBurst({ flash }: { flash: Flash }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: flash.x, top: flash.y,
        translateX: "-50%", translateY: "-50%",
        background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,224,71,0.8) 30%, transparent 70%)",
        willChange: "transform, opacity",
      }}
      initial={{ width: 0, height: 0, opacity: 1 }}
      animate={{ width: 100, height: 100, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    />
  );
}

export function ClickSparks() {
  const isVoltMode = useSecretStore((s) => s.isVoltMode);
  const [sparks, setSparks]   = useState<Spark[]>([]);
  const [waves, setWaves]     = useState<Wave[]>([]);
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const nextId      = useRef(0);
  const cursorRef   = useRef<HTMLDivElement>(null);

  useVoltBodyClass(isVoltMode);

  // Cursor glow — direct DOM, no re-renders
  useEffect(() => {
    if (!isVoltMode) return;
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isVoltMode]);

  useEffect(() => {
    if (!isVoltMode) return;

    const onClick = (e: MouseEvent) => {
      const waveId  = nextId.current++;
      const flashId = nextId.current++;

      const burst: Spark[] = Array.from({ length: SPARK_COUNT }, (_, i) => ({
        id:       nextId.current++,
        x:        e.clientX,
        y:        e.clientY,
        angle:    (360 / SPARK_COUNT) * i + (Math.random() - 0.5) * 30,
        distance: 60 + Math.random() * 90,
        size:     4 + Math.random() * 7,
        color:    COLORS[Math.floor(Math.random() * COLORS.length)],
      }));

      setSparks((p)  => [...p, ...burst]);
      setWaves((p)   => [...p, { id: waveId, x: e.clientX, y: e.clientY }]);
      setFlashes((p) => [...p, { id: flashId, x: e.clientX, y: e.clientY }]);

      const sparkIds = new Set(burst.map((s) => s.id));
      setTimeout(() => setSparks((p)  => p.filter((s) => !sparkIds.has(s.id))), SPARK_DURATION * 1000 + 100);
      setTimeout(() => setWaves((p)   => p.filter((w) => w.id !== waveId)),  600);
      setTimeout(() => setFlashes((p) => p.filter((f) => f.id !== flashId)), 250);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [isVoltMode]);

  if (!isVoltMode && sparks.length === 0 && waves.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9996 }}
    >
      {/* Cursor electricity glow */}
      {isVoltMode && (
        <div
          ref={cursorRef}
          className="absolute pointer-events-none"
          style={{
            width: 40, height: 40,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(253,224,71,0.55) 0%, rgba(251,191,36,0.2) 50%, transparent 75%)",
            boxShadow: "0 0 14px 4px rgba(253,224,71,0.35)",
            willChange: "transform",
            top: 0, left: 0,
          }}
        />
      )}

      <AnimatePresence>
        {flashes.map((f) => <FlashBurst    key={f.id} flash={f} />)}
        {waves.map((w)   => <ShockwaveRing key={`a${w.id}`} wave={w} />)}
        {waves.map((w)   => <SecondRing    key={`b${w.id}`} wave={w} />)}
        {sparks.map((s)  => <SparkParticle key={s.id}  spark={s} />)}
      </AnimatePresence>
    </div>
  );
}
