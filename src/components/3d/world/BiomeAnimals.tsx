"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Shared geometries — created once, reused across every animal instance (perf rule: share geometry/material)
const sphereGeo = new THREE.SphereGeometry(1, 12, 10);
const sphereGeoLow = new THREE.SphereGeometry(1, 8, 6);
const capsuleGeo = new THREE.CapsuleGeometry(1, 1, 4, 8);
const coneGeo = new THREE.ConeGeometry(1, 1, 8);

function Eyes({ scale = 0.05, offset = 0.18 }: { scale?: number; offset?: number }) {
  return (
    <group position={[0, offset * 0.3, offset]}>
      <mesh position={[-offset * 0.5, 0, 0]} geometry={sphereGeoLow} scale={scale}>
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} />
      </mesh>
      <mesh position={[offset * 0.5, 0, 0]} geometry={sphereGeoLow} scale={scale}>
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} />
      </mesh>
    </group>
  );
}

// ---------- DESERT ----------

export function Scorpion({ position }: { position: [number, number, number] }) {
  const tail = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed;
    if (tail.current) tail.current.rotation.x = -0.6 + Math.sin(t * 1.5) * 0.15;
  });

  return (
    <group position={position} scale={0.6}>
      <mesh geometry={sphereGeo} scale={[0.16, 0.08, 0.12]} position={[0, 0.08, 0]} castShadow>
        <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} geometry={sphereGeoLow} scale={[0.07, 0.05, 0.05]} position={[side * 0.18, 0.08, 0.1]} castShadow>
          <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
        </mesh>
      ))}
      <group ref={tail} position={[0, 0.1, -0.12]} rotation={[-0.6, 0, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} geometry={sphereGeoLow} scale={0.045 - i * 0.005} position={[0, i * 0.08, 0]} castShadow>
            <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ---------- ARCTIC ----------

export function Seal({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed;
    if (ref.current) ref.current.rotation.z = Math.sin(t * 0.8) * 0.04;
  });

  return (
    <group ref={ref} position={position} rotation={[0, Math.random() * Math.PI, 0]}>
      <mesh geometry={capsuleGeo} scale={[0.17, 0.4, 0.17]} position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial color="#8a8a8a" roughness={0.7} />
      </mesh>
      <mesh geometry={sphereGeo} scale={0.13} position={[0, 0.16, 0.4]} castShadow>
        <meshStandardMaterial color="#8a8a8a" roughness={0.7} />
      </mesh>
      <Eyes scale={0.014} offset={0.07} />
    </group>
  );
}

// ---------- OCEAN ----------

export function FishSchool({ center, count = 8 }: { center: [number, number, number]; count?: number }) {
  const ref = useRef<THREE.Group>(null);
  const fish = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        radius: 0.4 + Math.random() * 0.5,
        speed: 0.6 + Math.random() * 0.4,
        phase: (i / count) * Math.PI * 2,
        height: Math.random() * 0.4,
        color: i % 2 === 0 ? "#ffb830" : "#ff7a3a",
      })),
    [count]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((f, i) => {
      const data = fish[i];
      const angle = t * data.speed + data.phase;
      f.position.x = Math.cos(angle) * data.radius;
      f.position.z = Math.sin(angle) * data.radius;
      f.position.y = data.height + Math.sin(t * 2 + data.phase) * 0.05;
      f.rotation.y = -angle + Math.PI / 2;
    });
  });

  return (
    <group ref={ref} position={center}>
      {fish.map((data, i) => (
        <group key={i}>
          <mesh geometry={coneGeo} scale={[0.05, 0.12, 0.05]} rotation={[0, 0, -Math.PI / 2]} castShadow>
            <meshStandardMaterial color={data.color} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ---------- VOLCANIC ----------

export function Iguana({ position }: { position: [number, number, number] }) {
  const tail = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed;
    if (tail.current) tail.current.rotation.y = Math.sin(t * 1.1) * 0.2;
  });

  return (
    <group position={position}>
      <mesh geometry={capsuleGeo} scale={[0.08, 0.22, 0.08]} position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial color="#2a5a3a" roughness={0.7} />
      </mesh>
      <mesh geometry={sphereGeo} scale={0.07} position={[0, 0.08, 0.22]} castShadow>
        <meshStandardMaterial color="#2a5a3a" roughness={0.7} />
      </mesh>
      <Eyes scale={0.01} offset={0.04} />
      <mesh ref={tail} geometry={coneGeo} scale={[0.05, 0.32, 0.05]} position={[0, 0.07, -0.22]} rotation={[Math.PI / 2.1, 0, 0]} castShadow>
        <meshStandardMaterial color="#2a5a3a" roughness={0.7} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          geometry={coneGeo}
          scale={[0.018, 0.04, 0.018]}
          position={[0, 0.13, 0.12 - i * 0.07]}
          castShadow
        >
          <meshStandardMaterial color="#1a3a25" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export function Crab({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const claws = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed;
    if (ref.current) ref.current.position.x = position[0] + Math.sin(t * 0.4) * 0.3;
    if (claws.current) {
      claws.current.children.forEach((c, i) => {
        c.rotation.z = Math.sin(t * 2 + i) * 0.15 * (i === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={ref} position={position} scale={0.5}>
      <mesh geometry={sphereGeo} scale={[0.18, 0.1, 0.14]} position={[0, 0.1, 0]} castShadow>
        <meshStandardMaterial color="#d4441f" roughness={0.5} />
      </mesh>
      <group ref={claws}>
        {[-1, 1].map((s) => (
          <mesh key={s} geometry={sphereGeoLow} scale={[0.08, 0.06, 0.06]} position={[s * 0.22, 0.1, 0.08]} castShadow>
            <meshStandardMaterial color="#d4441f" roughness={0.5} />
          </mesh>
        ))}
      </group>
      <Eyes scale={0.013} offset={0.08} />
    </group>
  );
}
