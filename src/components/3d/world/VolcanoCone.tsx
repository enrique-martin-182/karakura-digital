"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { LavaMaterial } from "./LavaMaterial";

// Lathe profile points [radius, y] — defines volcano silhouette bottom to top
const LATHE_POINTS = [
  [1.80, 0.00],
  [1.65, 0.15],
  [1.30, 0.50],
  [0.95, 0.90],
  [0.70, 1.35],
  [0.52, 1.75],
  [0.45, 2.10],
  [0.50, 2.25],
  [0.35, 2.30],
  [0.25, 2.20],
].map(([r, y]) => new THREE.Vector2(r, y));

function buildVolcanoGeometry(): THREE.BufferGeometry {
  const lathe = new THREE.LatheGeometry(LATHE_POINTS, 24);
  const pos = lathe.attributes.position as THREE.BufferAttribute;
  const count = pos.count;

  // Per-vertex color based on normalized height
  const colors = new Float32Array(count * 3);
  const base   = new THREE.Color("#1a1209");
  const mid    = new THREE.Color("#2d1608");
  const hot    = new THREE.Color("#5a1a08");
  const temp   = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const y = pos.getY(i);
    const t = Math.max(0, Math.min(1, y / 2.30)); // 0=base, 1=crater

    // Radial noise perturbation (deterministic, no Math.random)
    const angle = Math.atan2(pos.getZ(i), pos.getX(i));
    const freq = 5 + Math.floor(t * 3); // more frequency variation mid-slope
    const amp  = t > 0.15 && t < 0.85 ? 0.10 * Math.sin(t * Math.PI) : 0.02;
    const noise = Math.sin(angle * freq + t * 13.1) * amp
                + Math.sin(angle * (freq + 2) + t * 7.3) * amp * 0.4;
    const r = Math.sqrt(pos.getX(i) ** 2 + pos.getZ(i) ** 2);
    if (r > 0.01) {
      const nr = r + noise;
      pos.setXYZ(i, (pos.getX(i) / r) * nr, pos.getY(i), (pos.getZ(i) / r) * nr);
    }

    // Vertex color
    if (t < 0.35) temp.lerpColors(base, mid, t / 0.35);
    else           temp.lerpColors(mid, hot, (t - 0.35) / 0.65);
    colors[i * 3]     = temp.r;
    colors[i * 3 + 1] = temp.g;
    colors[i * 3 + 2] = temp.b;
  }

  lathe.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  pos.needsUpdate = true;
  lathe.computeVertexNormals();
  return lathe;
}

export function VolcanoCone() {
  const geo = useMemo(buildVolcanoGeometry, []);

  // 3 lava rivers at 120° intervals going down the slope
  const rivers = useMemo(() =>
    [0, 1, 2].map((i) => {
      const angle = (i / 3) * Math.PI * 2;
      return {
        position: [Math.sin(angle) * 0.72, 0.92, Math.cos(angle) * 0.72] as [number, number, number],
        rotationY: angle,
      };
    }), []
  );

  return (
    <group>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial vertexColors roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Lava rivers on slope */}
      {rivers.map((r, i) => (
        <mesh
          key={i}
          position={r.position}
          rotation={[-Math.PI / 2.8, r.rotationY, 0]}
          castShadow={false}
        >
          <planeGeometry args={[0.18, 2.0, 1, 8]} />
          <LavaMaterial />
        </mesh>
      ))}
    </group>
  );
}

// ─── CharredStump ─────────────────────────────────────────────────────────────
// Procedural charred tree stump: trunk cylinder + 2 branch stubs. No GLTF needed.

const STUMP_MAT = new THREE.MeshStandardMaterial({
  color: "#171210",
  roughness: 0.95,
  metalness: 0,
});

export function CharredStump({
  position,
  rotationY = 0,
}: {
  position: [number, number, number];
  rotationY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Main trunk */}
      <mesh material={STUMP_MAT} castShadow>
        <cylinderGeometry args={[0.055, 0.075, 0.55, 6]} />
      </mesh>
      {/* Branch A */}
      <mesh
        material={STUMP_MAT}
        position={[0.12, 0.2, 0.0]}
        rotation={[0, 0, -Math.PI / 4]}
        castShadow
      >
        <cylinderGeometry args={[0.025, 0.035, 0.30, 5]} />
      </mesh>
      {/* Branch B */}
      <mesh
        material={STUMP_MAT}
        position={[-0.08, 0.15, 0.06]}
        rotation={[0.3, 0, Math.PI / 3.5]}
        castShadow
      >
        <cylinderGeometry args={[0.020, 0.030, 0.22, 5]} />
      </mesh>
    </group>
  );
}
