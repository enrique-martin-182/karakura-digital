"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Procedurally modeled floating-island underside: a tapered, jagged dirt/rock body hanging below
 * the grass plane, built entirely from BufferGeometry (no external model) — the cross-section look
 * from the reference garden diorama, where the island reads as a chunk of earth, not a flat tile.
 *
 * Three rings, walked around the same 8x8 square footprint as BiomeRegion's top plane:
 *   1. boundary ring  — sits exactly at the grass plane's edge (same heightFn), zero seam
 *   2. overhang ring  — pulled in slightly and jagged, so the grass visually overhangs the dirt
 *   3. root ring      — pulled in further and ragged, closing to a broken-earth point cluster
 */
function buildIslandBaseGeometry(
  heightFn: (x: number, z: number) => number,
  size: number,
  depth: number,
  seed: number
) {
  const half = size / 2;
  const perSide = 9; // boundary points per edge — coarse on purpose, the skirt reads as rock, not lawn
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  const rand = (i: number, salt: number) => {
    const v = Math.sin(i * 12.9898 + salt * 78.233 + seed * 37.1) * 43758.5453;
    return v - Math.floor(v);
  };

  // Walk a circular perimeter so the dirt underside matches the rounded terrain top.
  // Radius matches the alphaMap full-opacity zone (~88% of half-size).
  const boundary: [number, number][] = [];
  const totalPoints = perSide * 4;
  const circleRadius = half * 0.88;
  for (let i = 0; i < totalPoints; i++) {
    const angle = (i / totalPoints) * Math.PI * 2;
    // Subtle organic jitter so it doesn't read as a perfect machine circle
    const r = circleRadius + Math.sin(i * 2.3 + seed * 1.7) * 0.45;
    boundary.push([Math.cos(angle) * r, Math.sin(angle) * r]);
  }

  const ringCount = boundary.length;
  const dirt = new THREE.Color("#4a3320");
  const dirtDark = new THREE.Color("#2a1c12");
  const rockFleck = new THREE.Color("#6a5a48");

  // Ring 0: boundary, matches the grass plane's edge exactly (no visible seam)
  boundary.forEach(([x, z]) => {
    const y = heightFn(x, z);
    positions.push(x, y - 0.04, z);
    const c = dirt.clone().lerp(dirtDark, 0.15);
    colors.push(c.r, c.g, c.b);
  });

  // Ring 1: overhang — pulled in 8-14%, jagged, ~0.5-0.9 below the boundary
  boundary.forEach(([x, z], i) => {
    const pull = 0.88 - rand(i, 1) * 0.15;
    const y = heightFn(x, z) - (0.5 + rand(i, 2) * 0.4);
    positions.push(x * pull, y, z * pull);
    const c = dirt.clone().lerp(rockFleck, rand(i, 3) * 0.3);
    colors.push(c.r, c.g, c.b);
  });

  // Ring 2: root — pulled in 45-65%, ragged, near the bottom
  boundary.forEach(([x, z], i) => {
    const pull = 0.55 - rand(i, 4) * 0.18;
    const y = -depth + rand(i, 5) * 0.6;
    positions.push(x * pull, y, z * pull);
    const c = dirtDark.clone().lerp(rockFleck, rand(i, 6) * 0.25);
    colors.push(c.r, c.g, c.b);
  });

  // Bottom cluster: 4 irregular points closing the root ring into a broken-earth point
  const bottomStart = positions.length / 3;
  const clusterPoints = 4;
  for (let i = 0; i < clusterPoints; i++) {
    const a = (i / clusterPoints) * Math.PI * 2;
    const r = 0.4 + rand(i, 7) * 0.5;
    const y = -depth - 0.3 - rand(i, 8) * 0.7;
    positions.push(Math.cos(a) * r, y, Math.sin(a) * r);
    colors.push(dirtDark.r, dirtDark.g, dirtDark.b);
  }

  // Stitch boundary -> overhang -> root as quad strips
  const stitchRings = (ringA: number, ringB: number) => {
    for (let i = 0; i < ringCount; i++) {
      const a0 = ringA * ringCount + i;
      const a1 = ringA * ringCount + ((i + 1) % ringCount);
      const b0 = ringB * ringCount + i;
      const b1 = ringB * ringCount + ((i + 1) % ringCount);
      indices.push(a0, b0, a1, a1, b0, b1);
    }
  };
  stitchRings(0, 1);
  stitchRings(1, 2);

  // Fan the root ring into the bottom cluster
  for (let i = 0; i < ringCount; i++) {
    const r0 = 2 * ringCount + i;
    const r1 = 2 * ringCount + ((i + 1) % ringCount);
    const cIdx = bottomStart + Math.floor((i / ringCount) * clusterPoints) % clusterPoints;
    indices.push(r0, cIdx, r1);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function IslandBase({
  position,
  heightFn,
  size = 8,
  depth = 3,
  seed = 0,
}: {
  position: [number, number, number];
  heightFn: (x: number, z: number) => number;
  size?: number;
  depth?: number;
  seed?: number;
}) {
  const geometry = useMemo(() => buildIslandBaseGeometry(heightFn, size, depth, seed), [heightFn, size, depth, seed]);

  return (
    <mesh geometry={geometry} position={position} castShadow receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.95} flatShading />
    </mesh>
  );
}
