"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";

const MODEL_BASE = "/assets/models/nature/";

let _seedCounter = 0;
function nextSeed(): number {
  _seedCounter = (_seedCounter + 1.6180339887) % 10;
  return _seedCounter;
}

/** Static prop (rock, mushroom, flower, stump, bridge, path tile) from Kenney's Nature Kit (CC0). */
export function NatureProp({
  file,
  position,
  scale = 1,
  rotationY = 0,
}: {
  file: string;
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
}) {
  const { scene } = useGLTF(MODEL_BASE + file);
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Clone object={scene} castShadow receiveShadow />
    </group>
  );
}

/** A real tree model with a gentle wind sway — replaces the procedural sphere/cone canopy trees. */
export function NatureTree({
  file,
  position,
  scale = 1,
  rotationY = 0,
}: {
  file: string;
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_BASE + file);
  const seed = useMemo(() => nextSeed(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = Math.sin(t * 0.7 + seed) * 0.025 + Math.sin(t * 1.3 + seed) * 0.012;
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group ref={ref}>
        <Clone object={scene} castShadow receiveShadow />
      </group>
    </group>
  );
}

const dummy = new THREE.Object3D();

interface GrassSpec {
  x: number;
  z: number;
  y: number;
  scale: number;
  rotationY: number;
}

/** Instanced grass field — hundreds of blades in a single draw call (tjs-geometry skill: InstancedMesh). */
export function GrassField({ blades, file = "grass.glb" }: { blades: GrassSpec[]; file?: string }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const { scene } = useGLTF(MODEL_BASE + file);

  const { geometry, material } = useMemo(() => {
    let geo: THREE.BufferGeometry | null = null;
    let mat: THREE.Material | null = null;
    scene.traverse((child) => {
      if (!geo && (child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        geo = mesh.geometry;
        mat = mesh.material as THREE.Material;
      }
    });
    return { geometry: geo, material: mat };
  }, [scene]);

  useEffect(() => {
    if (!ref.current) return;
    blades.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.rotation.set(0, b.rotationY, 0);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [blades]);

  if (!geometry || !material) return null;

  return (
    <instancedMesh ref={ref} args={[geometry, material, blades.length]} castShadow receiveShadow />
  );
}

export function useGrassField(
  count: number,
  origin: [number, number, number],
  spread: number,
  heightFn: (x: number, z: number) => number
): GrassSpec[] {
  return useMemo(() => {
    const [bx, , bz] = origin;
    const out: GrassSpec[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 * 3.1 + i;
      const r = Math.sqrt(((i * 37) % count) / count) * spread;
      const x = bx + Math.cos(angle) * r;
      const z = bz + Math.sin(angle) * r;
      out.push({
        x,
        z,
        y: heightFn(x - bx, z - bz),
        // Deterministic pseudo-random values from index — avoids Math.random() in render.
        scale: 0.6 + ((i * 0.6180339887) % 1) * 0.7,
        rotationY: ((i * 0.7548776662) % 1) * Math.PI * 2,
      });
    }
    return out;
  }, [count, origin, spread, heightFn]);
}

[
  "tree_pineRoundA", "tree_pineRoundB", "tree_pineRoundC", "tree_pineRoundD",
  "tree_pineSmallA", "tree_pineSmallB", "tree_pineTallA",
  "tree_default", "tree_detailed", "tree_oak", "tree_cone", "tree_fat",
  "tree_palmTall", "tree_palmShort", "tree_palmDetailedShort", "tree_palmDetailedTall",
  "rock_largeA", "rock_largeB", "rock_largeC", "rock_largeD",
  "rock_smallA", "rock_smallB", "rock_smallC", "rock_smallD", "rock_tallA",
  "stone_largeA", "stone_largeB", "stone_smallA", "stone_smallB", "stone_smallC",
  "cliff_rock", "cliff_large_rock",
  "grass", "grass_large", "grass_leafs",
  "path_stone", "path_stoneCorner", "path_stoneEnd",
  "mushroom_red", "mushroom_tan", "mushroom_redGroup",
  "flower_purpleA", "flower_purpleB", "flower_redA", "flower_redB", "flower_yellowA",
  "stump_round", "stump_old",
  "plant_bush", "plant_bushLarge", "plant_bushSmall", "plant_bushTriangle",
  "log", "log_large", "log_stack", "log_stackLarge",
  "bridge_wood", "bridge_woodNarrow",
  "cactus_short", "cactus_tall", "campfire_stones",
  "ground_riverRocks", "ground_pathRocks",
].forEach((f) => useGLTF.preload(MODEL_BASE + f + ".glb"));
