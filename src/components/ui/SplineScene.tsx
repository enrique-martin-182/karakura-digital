"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="w-10 h-10 rounded-full border-2 border-primary-container/30 border-t-primary-container animate-spin" />
    </div>
  ),
});

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={className}>
        <Spline scene={scene} className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`${className} relative flex items-center justify-center`}>
      {/* Static placeholder — avoids ~2MB Spline parse during scroll */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 60% 50%, rgba(78,222,163,0.08), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-4 text-center px-6">
        {/* Robot silhouette via CSS */}
        <div style={{ position: "relative", width: 72, height: 88 }}>
          {/* Head */}
          <div style={{ width: 44, height: 36, background: "rgba(78,222,163,0.15)", border: "1px solid rgba(78,222,163,0.3)", borderRadius: 8, margin: "0 auto", position: "relative" }}>
            <div style={{ position: "absolute", top: 10, left: 8, width: 8, height: 8, background: "rgba(78,222,163,0.6)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: 10, right: 8, width: 8, height: 8, background: "rgba(78,222,163,0.6)", borderRadius: "50%" }} />
          </div>
          {/* Body */}
          <div style={{ width: 52, height: 40, background: "rgba(78,222,163,0.1)", border: "1px solid rgba(78,222,163,0.2)", borderRadius: 6, margin: "4px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, background: "rgba(255,122,0,0.5)", borderRadius: "50%" }} />
            <div style={{ width: 6, height: 6, background: "rgba(78,222,163,0.5)", borderRadius: "50%" }} />
            <div style={{ width: 6, height: 6, background: "rgba(255,122,0,0.5)", borderRadius: "50%" }} />
          </div>
          {/* Legs */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 4 }}>
            <div style={{ width: 16, height: 12, background: "rgba(78,222,163,0.1)", border: "1px solid rgba(78,222,163,0.2)", borderRadius: 4 }} />
            <div style={{ width: 16, height: 12, background: "rgba(78,222,163,0.1)", border: "1px solid rgba(78,222,163,0.2)", borderRadius: 4 }} />
          </div>
        </div>

        <button
          onClick={() => setLoaded(true)}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
          style={{
            background: "rgba(78,222,163,0.12)",
            border: "1px solid rgba(78,222,163,0.3)",
            color: "rgba(78,222,163,0.9)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "8px solid rgba(78,222,163,0.9)",
            }}
          />
          Cargar experiencia 3D
        </button>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Requiere unos segundos de carga</p>
      </div>
    </div>
  );
}
