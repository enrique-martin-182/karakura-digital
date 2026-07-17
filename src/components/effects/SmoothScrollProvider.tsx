"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";

const OPTIONS: LenisOptions = {
  lerp: 0.08,
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  touchMultiplier: 1.5,
  wheelMultiplier: 1,
};

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={OPTIONS}>
      {children}
    </ReactLenis>
  );
}

// Hook for consuming lenis instance from child components (e.g. scroll-to buttons)
export { useLenis };
