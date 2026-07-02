"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Two layers of stars: a dense background layer (small, dim) and a sparse foreground layer
// (larger, brighter) — the same trick real planetarium software uses to suggest depth without
// actual parallax cost. All geometry is static; no per-frame updates needed.
export function WorldStarfield() {
  const { bgPositions, bgSizes, fgPositions, fgSizes } = useMemo(() => {
    const BG_COUNT = 1800;
    const FG_COUNT = 220;
    const RADIUS = 160;

    const bgPos = new Float32Array(BG_COUNT * 3);
    const bgSz = new Float32Array(BG_COUNT);
    const fgPos = new Float32Array(FG_COUNT * 3);
    const fgSz = new Float32Array(FG_COUNT);

    // Deterministic hash so the field is the same every render
    const hash = (n: number) => {
      const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    // Uniform-on-sphere distribution: sample on unit sphere then scale
    for (let i = 0; i < BG_COUNT; i++) {
      const theta = Math.acos(2 * hash(i * 3) - 1);
      const phi = 2 * Math.PI * hash(i * 3 + 1);
      const r = RADIUS * (0.85 + hash(i * 3 + 2) * 0.15);
      bgPos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      bgPos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      bgPos[i * 3 + 2] = r * Math.cos(theta);
      bgSz[i] = 0.6 + hash(i * 7 + 5) * 0.9;
    }

    for (let i = 0; i < FG_COUNT; i++) {
      const theta = Math.acos(2 * hash(i * 5 + 999) - 1);
      const phi = 2 * Math.PI * hash(i * 5 + 1000);
      const r = RADIUS * (0.7 + hash(i * 5 + 1001) * 0.28);
      fgPos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      fgPos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      fgPos[i * 3 + 2] = r * Math.cos(theta);
      fgSz[i] = 1.6 + hash(i * 11 + 2000) * 2.2;
    }

    return { bgPositions: bgPos, bgSizes: bgSz, fgPositions: fgPos, fgSizes: fgSz };
  }, []);

  return (
    <>
      {/* Background layer: dense, small, slightly blue-white */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[bgPositions, 3]} />
          <bufferAttribute attach="attributes-size" args={[bgSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          color="#c8d8ff"
          size={0.9}
          sizeAttenuation={false}
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>

      {/* Foreground layer: sparse, larger, warm white — the "bright stars" */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[fgPositions, 3]} />
          <bufferAttribute attach="attributes-size" args={[fgSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          color="#fffbe8"
          size={1.8}
          sizeAttenuation={false}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </>
  );
}
