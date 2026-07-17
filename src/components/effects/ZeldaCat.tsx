"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useSecretStore } from "@/store/useSecretStore";

// ─── Cat walker (mounted only while active) ───────────────────────────────────

function CatWalker() {
  const [scope, animate] = useAnimate();
  const deactivate = useSecretStore((s) => s.deactivateZelda);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const W   = window.innerWidth;
    const cx  = W / 2 - 40;   // center: sprite is 80px wide
    const end = W + 120;

    let cancelled = false;

    async function walk() {
      // Phase 1 — enter from left → center
      await animate(
        scope.current,
        { x: cx },
        { duration: 4.5, ease: "linear" },
      );
      if (cancelled) return;

      // Phase 2 — sit & observe: subtle head-bob loop
      await animate(
        scope.current,
        { y: [0, -7, 0, -4, 0, -7, 0] },
        { duration: 2.4, ease: "easeInOut" },
      );
      if (cancelled) return;

      // Phase 3 — exit to right
      await animate(
        scope.current,
        { x: end },
        { duration: 4.5, ease: "linear" },
      );
      if (cancelled) return;

      deactivate();
    }

    walk();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={scope}
      className="fixed pointer-events-none select-none"
      style={{
        bottom:  32,
        left:    0,
        x:       -120,   // start off-screen left
        zIndex:  9997,
        willChange: "transform",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/*
        Place your pixel-art gif at /public/pixel-cat.gif
        Recommended: 80×80px, transparent bg, walking-right cycle.
        If the sprite faces LEFT, add style={{ scaleX: -1 }} below.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pixel-cat.gif"
        alt=""
        aria-hidden="true"
        width={80}
        height={80}
        style={{ imageRendering: "pixelated" }}
      />
    </motion.div>
  );
}

// ─── Public component (always mounted, controls AnimatePresence) ──────────────

export function ZeldaCat() {
  const isActive = useSecretStore((s) => s.isZeldaActive);

  return (
    <AnimatePresence>
      {isActive && <CatWalker key="zelda-cat" />}
    </AnimatePresence>
  );
}
