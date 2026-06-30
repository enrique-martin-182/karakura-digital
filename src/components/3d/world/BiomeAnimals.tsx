"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Shared geometries — created once, reused across every animal instance (perf rule: share geometry/material)
const sphereGeo = new THREE.SphereGeometry(1, 12, 10);
const sphereGeoLow = new THREE.SphereGeometry(1, 8, 6);
const capsuleGeo = new THREE.CapsuleGeometry(1, 1, 4, 8);
const coneGeo = new THREE.ConeGeometry(1, 1, 8);
const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 8);
const torusGeo = new THREE.TorusGeometry(1, 0.3, 6, 12);

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

// ---------- JUNGLE ----------

export function Toucan({ position }: { position: [number, number, number] }) {
  const head = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed;
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.6) * 0.3;
      head.current.position.y = 0.42 + Math.sin(t * 2.2) * 0.015;
    }
    if (tail.current) tail.current.rotation.x = -0.5 + Math.sin(t * 1.4) * 0.08;
  });

  return (
    <group position={position}>
      <mesh geometry={capsuleGeo} scale={[0.16, 0.22, 0.16]} position={[0, 0.28, 0]} rotation={[0.3, 0, 0]} castShadow>
        <meshStandardMaterial color="#181818" roughness={0.6} />
      </mesh>
      <mesh ref={tail} geometry={coneGeo} scale={[0.08, 0.35, 0.08]} position={[0, 0.22, -0.18]} rotation={[-0.5, 0, 0]} castShadow>
        <meshStandardMaterial color="#181818" roughness={0.6} />
      </mesh>
      <group ref={head} position={[0, 0.42, 0.08]}>
        <mesh geometry={sphereGeo} scale={0.13} castShadow>
          <meshStandardMaterial color="#181818" roughness={0.6} />
        </mesh>
        <mesh geometry={coneGeo} scale={[0.1, 0.32, 0.1]} position={[0, 0, 0.2]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
          <meshStandardMaterial color="#ff9a1f" roughness={0.4} />
        </mesh>
        <Eyes scale={0.018} offset={0.1} />
      </group>
      <mesh geometry={sphereGeoLow} scale={[0.07, 0.07, 0.07]} position={[0, 0.08, 0]}>
        <meshStandardMaterial color="#ffd23f" />
      </mesh>
    </group>
  );
}

export function Monkey({ position }: { position: [number, number, number] }) {
  const tail = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed;
    if (tail.current) tail.current.rotation.z = Math.sin(t * 1.2) * 0.4;
    if (body.current) body.current.position.y = Math.sin(t * 1.8) * 0.04;
  });

  return (
    <group position={position}>
      <group ref={body}>
        <mesh geometry={sphereGeo} scale={0.2} position={[0, 0.2, 0]} castShadow>
          <meshStandardMaterial color="#8a5a2a" roughness={0.8} />
        </mesh>
        <mesh geometry={sphereGeo} scale={0.13} position={[0, 0.4, 0]} castShadow>
          <meshStandardMaterial color="#8a5a2a" roughness={0.8} />
        </mesh>
        <mesh geometry={sphereGeoLow} scale={[0.08, 0.07, 0.02]} position={[0, 0.39, 0.1]}>
          <meshStandardMaterial color="#e8c9a0" />
        </mesh>
        <Eyes scale={0.015} offset={0.08} />
      </group>
      <group ref={tail} position={[0, 0.18, -0.16]}>
        <mesh geometry={cylinderGeo} scale={[0.025, 0.35, 0.025]} position={[0, -0.15, 0]} rotation={[1.1, 0, 0]} castShadow>
          <meshStandardMaterial color="#8a5a2a" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ---------- DESERT ----------

export function Camel({ position }: { position: [number, number, number] }) {
  const legs = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 1.4 + seed;
    if (legs.current) {
      legs.current.children.forEach((leg, i) => {
        leg.rotation.x = Math.sin(t + i * Math.PI * 0.5) * 0.18;
      });
    }
  });

  return (
    <group position={position}>
      <mesh geometry={capsuleGeo} scale={[0.22, 0.45, 0.22]} position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <meshStandardMaterial color="#d4a96a" roughness={0.9} />
      </mesh>
      <mesh geometry={sphereGeo} scale={0.16} position={[0.05, 0.72, 0]} castShadow>
        <meshStandardMaterial color="#d4a96a" roughness={0.9} />
      </mesh>
      <mesh geometry={sphereGeo} scale={0.13} position={[0.35, 0.6, 0]} castShadow>
        <meshStandardMaterial color="#d4a96a" roughness={0.9} />
      </mesh>
      <mesh geometry={capsuleGeo} scale={[0.05, 0.2, 0.05]} position={[0.47, 0.5, 0]} rotation={[0, 0, -0.3]} castShadow>
        <meshStandardMaterial color="#d4a96a" roughness={0.9} />
      </mesh>
      <Eyes scale={0.014} offset={0.06} />
      <group ref={legs} position={[0, 0.42, 0]}>
        {[-0.18, -0.06, 0.06, 0.18].map((x, i) => (
          <mesh key={i} geometry={cylinderGeo} scale={[0.035, 0.4, 0.035]} position={[x, -0.2, 0.08 * (i % 2 === 0 ? 1 : -1)]} castShadow>
            <meshStandardMaterial color="#b8935a" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

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

export function Penguin({ position }: { position: [number, number, number] }) {
  const body = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 3 + seed;
    if (body.current) {
      body.current.rotation.z = Math.sin(t) * 0.08;
      body.current.position.y = Math.abs(Math.sin(t)) * 0.01;
    }
  });

  return (
    <group ref={body} position={position}>
      <mesh geometry={capsuleGeo} scale={[0.13, 0.22, 0.13]} position={[0, 0.22, 0]} castShadow>
        <meshStandardMaterial color="#181a24" roughness={0.5} />
      </mesh>
      <mesh geometry={capsuleGeo} scale={[0.09, 0.16, 0.09]} position={[0, 0.2, 0.04]} castShadow>
        <meshStandardMaterial color="#f4f4f0" roughness={0.5} />
      </mesh>
      <mesh geometry={sphereGeo} scale={0.09} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial color="#181a24" roughness={0.5} />
      </mesh>
      <mesh geometry={coneGeo} scale={[0.025, 0.06, 0.025]} position={[0, 0.39, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff9a1f" />
      </mesh>
      <Eyes scale={0.012} offset={0.06} />
    </group>
  );
}

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

export function Turtle({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const flippers = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.08;
      ref.current.rotation.y += 0.0025;
    }
    if (flippers.current) {
      flippers.current.children.forEach((f, i) => {
        f.rotation.z = Math.sin(t * 1.6 + i * Math.PI) * 0.35 * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh geometry={sphereGeo} scale={[0.32, 0.16, 0.4]} position={[0, 0.14, 0]} castShadow>
        <meshStandardMaterial color="#3a8a4a" roughness={0.5} />
      </mesh>
      <mesh geometry={sphereGeo} scale={[0.13, 0.12, 0.14]} position={[0, 0.1, 0.42]} castShadow>
        <meshStandardMaterial color="#5ab06a" roughness={0.5} />
      </mesh>
      <Eyes scale={0.013} offset={0.07} />
      <group ref={flippers}>
        {[
          [0.3, 0.1, 0.18],
          [-0.3, 0.1, 0.18],
          [0.26, 0.08, -0.28],
          [-0.26, 0.08, -0.28],
        ].map((p, i) => (
          <mesh key={i} geometry={sphereGeoLow} scale={[0.16, 0.05, 0.1]} position={p as [number, number, number]} castShadow>
            <meshStandardMaterial color="#5ab06a" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

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

// ---------- FOREST ----------

export function Fox({ position }: { position: [number, number, number] }) {
  const tail = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed;
    if (tail.current) tail.current.rotation.z = Math.sin(t * 2.2) * 0.25;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <group position={position}>
      <mesh geometry={capsuleGeo} scale={[0.13, 0.22, 0.13]} position={[0, 0.18, 0]} rotation={[Math.PI / 2.3, 0, 0]} castShadow>
        <meshStandardMaterial color="#d4641f" roughness={0.7} />
      </mesh>
      <group ref={head} position={[0, 0.24, 0.18]}>
        <mesh geometry={sphereGeo} scale={0.11} castShadow>
          <meshStandardMaterial color="#d4641f" roughness={0.7} />
        </mesh>
        <mesh geometry={coneGeo} scale={[0.06, 0.12, 0.06]} position={[0, -0.02, 0.1]} rotation={[Math.PI / 2.4, 0, 0]} castShadow>
          <meshStandardMaterial color="#e8e0d8" roughness={0.7} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} geometry={coneGeo} scale={[0.04, 0.08, 0.03]} position={[s * 0.06, 0.1, 0]} rotation={[0, 0, s * 0.2]} castShadow>
            <meshStandardMaterial color="#d4641f" roughness={0.7} />
          </mesh>
        ))}
        <Eyes scale={0.013} offset={0.06} />
      </group>
      <mesh ref={tail} geometry={capsuleGeo} scale={[0.06, 0.22, 0.06]} position={[0, 0.2, -0.2]} rotation={[1.1, 0, 0]} castShadow>
        <meshStandardMaterial color="#e8e0d8" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function Rabbit({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const ears = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 3 + seed;
    if (ref.current) ref.current.scale.y = 1 + Math.abs(Math.sin(t)) * 0.06;
    if (ears.current) ears.current.rotation.x = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={ref} position={position}>
      <mesh geometry={sphereGeo} scale={0.1} position={[0, 0.1, 0]} castShadow>
        <meshStandardMaterial color="#b89a7a" roughness={0.8} />
      </mesh>
      <mesh geometry={sphereGeo} scale={0.07} position={[0, 0.2, 0.05]} castShadow>
        <meshStandardMaterial color="#b89a7a" roughness={0.8} />
      </mesh>
      <group ref={ears} position={[0, 0.25, 0.04]}>
        {[-1, 1].map((s) => (
          <mesh key={s} geometry={capsuleGeo} scale={[0.018, 0.06, 0.018]} position={[s * 0.03, 0.05, 0]} castShadow>
            <meshStandardMaterial color="#b89a7a" roughness={0.8} />
          </mesh>
        ))}
      </group>
      <Eyes scale={0.01} offset={0.04} />
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
