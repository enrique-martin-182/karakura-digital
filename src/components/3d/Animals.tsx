"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Low-poly deer drinking near the river
function Deer({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle head bobbing (drinking animation)
    groupRef.current.children[1].rotation.x = Math.sin(t * 0.8) * 0.1 - 0.3;
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, -0.5, 0]}>
      {/* Body */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 1.2]} />
        <meshStandardMaterial color="#8B6914" roughness={0.9} flatShading />
      </mesh>

      {/* Head */}
      <group position={[0, 1.3, 0.7]}>
        <mesh castShadow>
          <boxGeometry args={[0.25, 0.3, 0.4]} />
          <meshStandardMaterial color="#9B7924" roughness={0.9} flatShading />
        </mesh>
        {/* Ears */}
        <mesh position={[0.12, 0.2, 0]} castShadow>
          <coneGeometry args={[0.06, 0.15, 4]} />
          <meshStandardMaterial color="#8B6914" flatShading />
        </mesh>
        <mesh position={[-0.12, 0.2, 0]} castShadow>
          <coneGeometry args={[0.06, 0.15, 4]} />
          <meshStandardMaterial color="#8B6914" flatShading />
        </mesh>
        {/* Antlers */}
        <mesh position={[0.1, 0.25, -0.05]} rotation={[0, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.015, 0.02, 0.4, 4]} />
          <meshStandardMaterial color="#5a4020" flatShading />
        </mesh>
        <mesh position={[-0.1, 0.25, -0.05]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.015, 0.02, 0.4, 4]} />
          <meshStandardMaterial color="#5a4020" flatShading />
        </mesh>
      </group>

      {/* Legs */}
      {[
        [0.15, 0.4, 0.35],
        [-0.15, 0.4, 0.35],
        [0.15, 0.4, -0.35],
        [-0.15, 0.4, -0.35],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 5]} />
          <meshStandardMaterial color="#7a5910" roughness={0.9} flatShading />
        </mesh>
      ))}

      {/* Tail */}
      <mesh position={[0, 1.2, -0.65]} castShadow>
        <sphereGeometry args={[0.08, 4, 4]} />
        <meshStandardMaterial color="#c8b890" flatShading />
      </mesh>
    </group>
  );
}

// Fox hiding in bushes
function Fox({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!tailRef.current) return;
    const t = state.clock.elapsedTime;
    tailRef.current.rotation.z = Math.sin(t * 2) * 0.3;
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, 1.2, 0]}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.35, 0.3, 0.8]} />
        <meshStandardMaterial color="#c45a1a" roughness={0.85} flatShading />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.5, 0.45]} castShadow>
        <boxGeometry args={[0.25, 0.22, 0.3]} />
        <meshStandardMaterial color="#d46a2a" roughness={0.85} flatShading />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 0.45, 0.65]} castShadow>
        <coneGeometry args={[0.08, 0.2, 4]} />
        <meshStandardMaterial color="#e8e0d0" flatShading />
      </mesh>

      {/* Ears */}
      <mesh position={[0.1, 0.65, 0.4]} castShadow>
        <coneGeometry args={[0.06, 0.18, 3]} />
        <meshStandardMaterial color="#c45a1a" flatShading />
      </mesh>
      <mesh position={[-0.1, 0.65, 0.4]} castShadow>
        <coneGeometry args={[0.06, 0.18, 3]} />
        <meshStandardMaterial color="#c45a1a" flatShading />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, 0.5, -0.5]} rotation={[0.5, 0, 0]} castShadow>
        <coneGeometry args={[0.12, 0.6, 5]} />
        <meshStandardMaterial color="#d46a2a" flatShading />
      </mesh>

      {/* White tail tip */}
      <mesh position={[0, 0.7, -0.7]} castShadow>
        <sphereGeometry args={[0.07, 4, 4]} />
        <meshStandardMaterial color="#f0e8d8" flatShading />
      </mesh>

      {/* Legs */}
      {[
        [0.1, 0.15, 0.25],
        [-0.1, 0.15, 0.25],
        [0.1, 0.15, -0.25],
        [-0.1, 0.15, -0.25],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 4]} />
          <meshStandardMaterial color="#2a1a0a" flatShading />
        </mesh>
      ))}
    </group>
  );
}

// Birds flying in circles
function Birds({ center, count = 5 }: { center: [number, number, number]; count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const birdData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      offset: (i / count) * Math.PI * 2,
      radius: 3 + Math.random() * 2,
      speed: 0.3 + Math.random() * 0.2,
      height: Math.random() * 2,
      wingPhase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <group position={center}>
      {birdData.map((bird, i) => (
        <BirdInstance key={i} data={bird} />
      ))}
    </group>
  );
}

function BirdInstance({
  data,
}: {
  data: {
    offset: number;
    radius: number;
    speed: number;
    height: number;
    wingPhase: number;
  };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * data.speed + data.offset;

    groupRef.current.position.x = Math.cos(t) * data.radius;
    groupRef.current.position.z = Math.sin(t) * data.radius;
    groupRef.current.position.y = data.height + Math.sin(t * 2) * 0.5;
    groupRef.current.rotation.y = -t + Math.PI / 2;

    // Wing flapping
    const wingAngle = Math.sin(state.clock.elapsedTime * 6 + data.wingPhase) * 0.4;
    if (leftWingRef.current) leftWingRef.current.rotation.z = wingAngle;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -wingAngle;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshStandardMaterial color="#1a1a2a" flatShading />
      </mesh>
      {/* Left wing */}
      <mesh ref={leftWingRef} position={[0.1, 0, 0]}>
        <planeGeometry args={[0.2, 0.06]} />
        <meshStandardMaterial color="#2a2a3a" side={THREE.DoubleSide} flatShading />
      </mesh>
      {/* Right wing */}
      <mesh ref={rightWingRef} position={[-0.1, 0, 0]}>
        <planeGeometry args={[0.2, 0.06]} />
        <meshStandardMaterial color="#2a2a3a" side={THREE.DoubleSide} flatShading />
      </mesh>
    </group>
  );
}

// Bush clusters (to hide animals naturally)
function Bush({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {[
        [0, 0.2, 0],
        [0.3, 0.15, 0.2],
        [-0.2, 0.18, -0.15],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <dodecahedronGeometry args={[0.3 + Math.random() * 0.15, 0]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.3 + Math.random() * 0.05, 0.6, 0.12 + Math.random() * 0.06)}
            roughness={0.9}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

export function Animals() {
  return (
    <group>
      {/* Deer near river */}
      <Deer position={[2.5, -0.1, 3]} />

      {/* Fox in bushes */}
      <Fox position={[8, 1.5, -5]} />
      <Bush position={[7.5, 1.3, -5.5]} scale={1.5} />
      <Bush position={[8.8, 1.4, -4.5]} scale={1.2} />

      {/* Birds circling above waterfall */}
      <Birds center={[-4, 7, -7]} count={6} />

      {/* Birds near treetops */}
      <Birds center={[10, 9, 5]} count={4} />

      {/* Scattered bushes */}
      <Bush position={[-3, 0.2, 6]} scale={1.3} />
      <Bush position={[5, 0.8, -2]} />
      <Bush position={[-7, 1, 1]} scale={1.4} />
      <Bush position={[12, 1.5, -8]} scale={1.1} />
    </group>
  );
}
