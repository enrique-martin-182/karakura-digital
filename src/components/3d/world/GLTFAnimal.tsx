"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_BASE = "/assets/models/animals/";

let _seedCounter = 0;
function nextSeed(): number {
  _seedCounter = (_seedCounter + 1.6180339887) % 10;
  return _seedCounter;
}

/** Rigged, animated character (fox/rabbit/monkey) — real game-quality models from Quaternius (CC0). */
export function RiggedAnimal({
  file,
  animationMatch,
  position,
  scale = 1,
  rotationY = 0,
}: {
  file: string;
  animationMatch: string;
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_BASE + file);
  const cloned = useMemo(() => scene, [scene]);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    const match = names.find((n) => n.toLowerCase().includes(animationMatch.toLowerCase()));
    const action = match ? actions[match] : actions[names[0]];
    action?.reset().fadeIn(0.4).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, names, animationMatch]);

  return (
    <group ref={group} position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Clone object={cloned} castShadow />
    </group>
  );
}

/** Static legacy model (toucan/camel/penguin/turtle) with a gentle procedural idle —
    these packs ship a single unrigged mesh, so life comes from the wrapper group's motion. */
export function StaticAnimal({
  file,
  position,
  scale = 1,
  rotationY = 0,
  bobAmount = 0.04,
  bobSpeed = 1.2,
}: {
  file: string;
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  bobAmount?: number;
  bobSpeed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_BASE + file);
  const seed = useMemo(() => nextSeed(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * bobSpeed + seed;
    ref.current.position.y = position[1] + Math.sin(t) * bobAmount;
    ref.current.rotation.y = rotationY + Math.sin(t * 0.4) * 0.06;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <Clone object={scene} castShadow />
    </group>
  );
}

useGLTF.preload(MODEL_BASE + "fox.glb");
useGLTF.preload(MODEL_BASE + "rabbit.glb");
useGLTF.preload(MODEL_BASE + "monkey.glb");
useGLTF.preload(MODEL_BASE + "toucan.glb");
useGLTF.preload(MODEL_BASE + "camel.glb");
useGLTF.preload(MODEL_BASE + "penguin.glb");
useGLTF.preload(MODEL_BASE + "turtle.glb");
