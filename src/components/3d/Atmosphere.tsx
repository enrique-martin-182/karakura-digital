"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Fireflies / glowing particles
function Fireflies({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = 0.5 + Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      ph[i] = Math.random() * Math.PI * 2;
    }

    return [pos, ph];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += Math.sin(t * 0.5 + phases[i]) * 0.005;
      arr[i * 3 + 1] += Math.cos(t * 0.3 + phases[i] * 2) * 0.003;
      arr[i * 3 + 2] += Math.sin(t * 0.4 + phases[i] * 1.5) * 0.004;
    }

    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // Pulsing glow
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.4 + Math.sin(t * 2) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#aeff6e"
        size={0.12}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Volumetric light rays (god rays simulation)
function GodRays() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.03 + Math.sin(t * 0.3 + i * 0.5) * 0.015;
    });
  });

  const rays = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      position: [
        -10 + i * 3 + Math.random() * 2,
        8,
        -5 + Math.random() * 10,
      ] as [number, number, number],
      rotation: [0, 0, (Math.random() - 0.5) * 0.3] as [number, number, number],
      scale: [0.3 + Math.random() * 0.4, 15, 1] as [number, number, number],
    }));
  }, []);

  return (
    <group ref={ref}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={ray.position}
          rotation={ray.rotation}
          scale={ray.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#ffd080"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Ground fog
function Fog() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += Math.sin(t * 0.1 + i * 0.1) * 0.008;
      arr[i * 3 + 2] += Math.cos(t * 0.08 + i * 0.15) * 0.006;
    }

    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8d8c0"
        size={0.8}
        transparent
        opacity={0.08}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function Atmosphere() {
  return (
    <group>
      <Fireflies />
      <GodRays />
      <Fog />
    </group>
  );
}
