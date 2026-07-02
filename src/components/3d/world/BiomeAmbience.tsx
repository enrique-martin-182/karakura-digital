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

// ─── VolcanoSmoke ────────────────────────────────────────────────────────────
// 20 instanced quads that rise, expand, and fade in a continuous loop.
// Uses AdditiveBlending so the gray smoke brightens what's behind it slightly.

const SMOKE_COUNT = 20;
const SMOKE_GEO = new THREE.PlaneGeometry(1, 1);

const smokeFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vAge;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    float noise = hash(vUv * 3.0 + uTime * 0.1);
    float alpha = smoothstep(0.5, 0.1, dist) * sin(vAge * 3.14159) * 0.45 * (0.8 + noise * 0.2);
    gl_FragColor = vec4(vec3(0.75 + noise * 0.15), alpha);
  }
`;

const smokeVert = /* glsl */ `
  uniform float uTime;
  attribute float aOffset;
  varying vec2 vUv;
  varying float vAge;

  void main() {
    vUv = uv;
    float age = fract((uTime * 0.28 + aOffset));
    vAge = age;
    float scale = 0.3 + age * 1.6;
    float y = age * 2.2;
    vec3 pos = position * scale + vec3(0.0, y, 0.0);
    // Always face camera (billboard): rotate in world space
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export function VolcanoSmoke() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const offsets = useMemo(() => {
    const arr = new Float32Array(SMOKE_COUNT);
    for (let i = 0; i < SMOKE_COUNT; i++) arr[i] = i / SMOKE_COUNT;
    return arr;
  }, []);

  const smokeGeoWithAttr = useMemo(() => {
    const geo = SMOKE_GEO.clone();
    geo.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 1));
    return geo;
  }, [offsets]);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    dummy.position.set(0, 0, 0);
    dummy.updateMatrix();
    for (let i = 0; i < SMOKE_COUNT; i++) {
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[smokeGeoWithAttr, undefined, SMOKE_COUNT]}
      position={[0, 2.5, 0]}
      frustumCulled={false}
    >
      <shaderMaterial
        ref={matRef}
        vertexShader={smokeVert}
        fragmentShader={smokeFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

// ─── AshParticles ────────────────────────────────────────────────────────────
// 30 small points drifting downward in a spiral above the volcano.

const ASH_COUNT = 30;

export function AshParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, offsets: ashOffsets } = useMemo(() => {
    const positions = new Float32Array(ASH_COUNT * 3);
    const offsets = new Float32Array(ASH_COUNT);
    for (let i = 0; i < ASH_COUNT; i++) {
      const s = Math.sin(i * 127.1 + 5.3) * 43758.5453;
      const rand = s - Math.floor(s);
      const s2 = Math.sin(i * 311.7 + 9.1) * 43758.5453;
      const rand2 = s2 - Math.floor(s2);
      positions[i * 3]     = (rand - 0.5) * 2.5;
      positions[i * 3 + 1] = rand2 * 3.5 + 1.5;
      positions[i * 3 + 2] = (Math.sin(i * 0.7) - 0.5) * 2.5;
      offsets[i] = rand;
    }
    return { positions, offsets };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < ASH_COUNT; i++) {
      let y = pos.getY(i) - 0.008;
      if (y < 0) y = 3.5 + ashOffsets[i] * 1.5;
      const x = pos.getX(i) + Math.sin(t * 0.4 + i) * 0.005;
      pos.setXY(i, x, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, 0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={ASH_COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#cc6622" size={0.05} transparent opacity={0.75} depthWrite={false} sizeAttenuation />
    </points>
  );
}
