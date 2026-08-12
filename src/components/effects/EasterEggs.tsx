"use client";

import dynamic from "next/dynamic";

const ZeldaCat    = dynamic(() => import("./ZeldaCat").then(m => ({ default: m.ZeldaCat })), { ssr: false });
const ClickSparks = dynamic(() => import("./ClickSparks").then(m => ({ default: m.ClickSparks })), { ssr: false });
const BlastOverlay = dynamic(() => import("./BlastOverlay").then(m => ({ default: m.BlastOverlay })), { ssr: false });

export function EasterEggs() {
  return (
    <>
      <ZeldaCat />
      <ClickSparks />
      <BlastOverlay />
    </>
  );
}
