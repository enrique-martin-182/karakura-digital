"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── BirdFlock ────────────────────────────────────────────────────────────────
// N small cone meshes orbiting the biome center on a tilted elliptical path.
// Each bird banks (Z rotation) proportional to path curvature and flaps wings
// (Z oscillation). All motion is deterministic — no Math.random() in render.

const BIRD_GEO = new THREE.ConeGeometry(0.06, 0.18, 4);

interface BirdFlockProps {
  count?: number;
  orbitRadius?: number;
  orbitHeight?: number;
  speed?: number;
  color?: string;
}

export function BirdFlock({
  count = 6,
  orbitRadius = 2.5,
  orbitHeight = 2.5,
  speed = 0.6,
  color = "#ffffff",
}: BirdFlockProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Deterministic per-bird offsets: phase offset, height variation, speed variation
  const birds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const s = Math.sin(i * 127.1 + 3.1) * 43758.5453;
        const rand = s - Math.floor(s);
        return {
          phaseOffset: (i / count) * Math.PI * 2,
          heightVar: (rand - 0.5) * 0.6,
          speedMult: 0.85 + rand * 0.3,
        };
      }),
    [count]
  );

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.6,
        metalness: 0,
      }),
    [color]
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    birds.forEach((bird, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      const angle = t * speed * bird.speedMult + bird.phaseOffset;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius * 0.7; // ellipse
      const y = orbitHeight + bird.heightVar + Math.sin(t * 1.1 + bird.phaseOffset) * 0.3;
      mesh.position.set(x, y, z);

      // Face direction of travel
      const nextAngle = angle + 0.05;
      const dx = Math.cos(nextAngle) * orbitRadius - x;
      const dz = Math.sin(nextAngle) * orbitRadius * 0.7 - z;
      mesh.rotation.y = Math.atan2(dx, dz);

      // Wing flap
      mesh.rotation.z = Math.sin(t * 8 + bird.phaseOffset) * 0.35;

      // Bank into turn
      mesh.rotation.x = Math.sin(t * speed * bird.speedMult + bird.phaseOffset + Math.PI / 2) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {birds.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          geometry={BIRD_GEO}
          material={mat}
          castShadow={false}
        />
      ))}
    </group>
  );
}
