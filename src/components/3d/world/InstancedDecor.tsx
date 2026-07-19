"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Rounder, higher-segment geometry for a soft "cozy" silhouette instead of raw faceted low-poly
const coralGeo = new THREE.ConeGeometry(1, 1, 7);

const dummy = new THREE.Object3D();

interface CoralSpec {
  x: number;
  z: number;
  scale: [number, number, number];
  colorIdx: number;
}

const coralColors = [new THREE.Color("#e05050"), new THREE.Color("#e0a030"), new THREE.Color("#50c0a0")];

export function CoralCluster({ corals, y = -0.8 }: { corals: CoralSpec[]; y?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!ref.current) return;
    corals.forEach((c, i) => {
      dummy.position.set(c.x, y, c.z);
      dummy.scale.set(...c.scale);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
      ref.current!.setColorAt(i, coralColors[c.colorIdx]);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [corals, y]);

  return (
    <instancedMesh ref={ref} args={[coralGeo, undefined, corals.length]} castShadow>
      <meshStandardMaterial roughness={0.6} />
    </instancedMesh>
  );
}

export function useCoralCluster(count: number, origin: [number, number, number], spread: number): CoralSpec[] {
  return useMemo(() => {
    const [bx, , bz] = origin;
    const out: CoralSpec[] = [];
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random values from index — avoids Math.random() in render.
      const r = 0.15 + ((i * 0.6180339887) % 1) * 0.2;
      out.push({
        x: bx + Math.sin(i * 5.3) * spread,
        z: bz + Math.cos(i * 3.7) * spread,
        scale: [r, 0.5 + ((i * 0.7548776662) % 1) * 0.5, r],
        colorIdx: i % 3,
      });
    }
    return out;
  }, [count, origin, spread]);
}
