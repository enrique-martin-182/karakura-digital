"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { useSecretStore } from "@/store/useSecretStore";

const BASE_OPTIONS: LenisOptions = {
  lerp:             0.08,
  duration:         1.4,
  easing:           (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation:      "vertical",
  gestureOrientation: "vertical",
  smoothWheel:      true,
  touchMultiplier:  1.5,
  wheelMultiplier:  1,
};

const BLAST_OPTIONS = {
  lerp:            0.55,
  wheelMultiplier: 6,
  touchMultiplier: 5,
} as const;

// Mutates the live Lenis instance options when Blast Mode toggles.
// Must be rendered INSIDE <ReactLenis> to access the instance via useLenis.
function SonicController() {
  const isBlastMode = useSecretStore((s) => s.isBlastMode);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);

  // Capture lenis instance on first scroll frame
  useLenis((lenis) => {
    if (!lenisRef.current) lenisRef.current = lenis;
  });

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isBlastMode) {
      lenis.options.lerp            = BLAST_OPTIONS.lerp;
      lenis.options.wheelMultiplier = BLAST_OPTIONS.wheelMultiplier;
      lenis.options.touchMultiplier = BLAST_OPTIONS.touchMultiplier;
    } else {
      lenis.options.lerp            = BASE_OPTIONS.lerp;
      lenis.options.wheelMultiplier = BASE_OPTIONS.wheelMultiplier ?? 1;
      lenis.options.touchMultiplier = BASE_OPTIONS.touchMultiplier ?? 1.5;
    }
  }, [isBlastMode]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={BASE_OPTIONS}>
      <SonicController />
      {children}
    </ReactLenis>
  );
}

// Hook for consuming lenis instance from child components (e.g. scroll-to buttons)
export { useLenis };
