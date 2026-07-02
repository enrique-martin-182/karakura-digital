"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";

interface TreeData {
  position: [number, number, number];
  scale: number;
  rotation: number;
  trunkHeight: number;
  crownLayers: number;
}

function generateTrees(count: number, seed: number): TreeData[] {
  const trees: TreeData[] = [];
  for (let i = 0; i < count; i++) {
    const hash = Math.sin(i * 127.1 + seed) * 43758.5453;
    const r1 = hash - Math.floor(hash);
    const hash2 = Math.sin(i * 269.5 + seed + 3.7) * 43758.5453;
    const r2 = hash2 - Math.floor(hash2);

    const x = (r1 - 0.5) * 50;
    const z = (r2 - 0.5) * 50;

    // Skip river area
    const riverDist = Math.abs(x - Math.sin(z * 0.3) * 3);
    if (riverDist < 3.5) continue;

    const height =
      Math.sin(x * 0.15) * Math.cos(z * 0.12) * 2.5 +
      Math.sin(x * 0.08 + 1) * Math.sin(z * 0.06 + 2) * 1.5;

    trees.push({
      position: [x, height, z],
      scale: 0.6 + r1 * 0.8,
      rotation: r2 * Math.PI * 2,
      trunkHeight: 1.5 + r1 * 2,
      crownLayers: 2 + Math.floor(r2 * 3),
    });
  }
  return trees;
}

function ProceduralTree({ data }: { data: TreeData }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle wind sway
    groupRef.current.rotation.z = Math.sin(t * 0.5 + data.position[0]) * 0.02;
    groupRef.current.rotation.x = Math.cos(t * 0.3 + data.position[2]) * 0.01;
  });

  const crownColor = useMemo(() => {
    const hue = 0.28 + (Math.sin(data.position[0] * 0.5) * 0.05);
    const sat = 0.5 + Math.cos(data.position[2] * 0.3) * 0.2;
    // Use deterministic pseudo-random based on position to avoid Math.random() in render
    const pseudoRand = (Math.sin(data.position[0] * 127.1 + data.position[2] * 311.7) * 43758.5453) % 1;
    const lightness = 0.15 + Math.abs(pseudoRand) * 0.08;
    return new THREE.Color().setHSL(hue, sat, lightness);
  }, [data.position]);

  return (
    <group
      ref={groupRef}
      position={data.position}
      scale={data.scale}
      rotation={[0, data.rotation, 0]}
    >
      {/* Trunk */}
      <mesh position={[0, data.trunkHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.15, data.trunkHeight, 6]} />
        <meshStandardMaterial color="#3a2517" roughness={0.95} />
      </mesh>

      {/* Crown layers - low poly cones */}
      {Array.from({ length: data.crownLayers }).map((_, i) => {
        const y = data.trunkHeight + i * 0.8;
        const radius = 1.2 - i * 0.25;
        return (
          <mesh key={i} position={[0, y, 0]} castShadow>
            <coneGeometry args={[radius, 1.5, 7]} />
            <meshStandardMaterial
              color={crownColor}
              roughness={0.85}
              flatShading
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function Trees() {
  const trees = useMemo(() => generateTrees(120, 42), []);

  return (
    <group>
      {trees.map((tree, i) => (
        <ProceduralTree key={i} data={tree} />
      ))}
    </group>
  );
}
