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
    // Billboard: zero rotation columns of model-view so quad always faces camera
    mat4 mv = viewMatrix * modelMatrix;
    mv[0][0] = 1.0; mv[0][1] = 0.0; mv[0][2] = 0.0;
    mv[1][0] = 0.0; mv[1][1] = 1.0; mv[1][2] = 0.0;
    mv[2][0] = 0.0; mv[2][1] = 0.0; mv[2][2] = 1.0;
    gl_Position = projectionMatrix * mv * vec4(pos, 1.0);
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
      const restX = positions[i * 3];
      const x = restX + Math.sin(t * 0.4 + i) * 0.05;
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

// ─── JungleMist ──────────────────────────────────────────────────────────────
// Translucent sphere with FBM noise shader pulsing in green/teal.

const mistVert = /* glsl */ `
  uniform float uTime;
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const mistFrag = /* glsl */ `
  uniform float uTime;
  varying vec3 vPos;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i); float b = hash(i+vec2(1,0));
    float c = hash(i+vec2(0,1)); float d = hash(i+vec2(1,1));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
  }
  float fbm(vec2 p) {
    float v=0.0; float a=0.5;
    for(int i=0;i<3;i++){v+=noise(p)*a;p*=2.07;a*=0.5;}
    return v;
  }

  void main() {
    vec2 uv = vPos.xz * 0.5 + vec2(uTime * 0.04, uTime * 0.025);
    float n = fbm(uv);
    float dist = length(vPos) / 2.2;
    float alpha = (0.055 + n * 0.04) * smoothstep(1.0, 0.5, dist);
    gl_FragColor = vec4(0.18, 0.58, 0.32, alpha);
  }
`;

export function JungleMist() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => { if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh position={[0, 0.5, 0]}>
      <sphereGeometry args={[2.2, 16, 16]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={mistVert}
        fragmentShader={mistFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── DesertHeatHaze ──────────────────────────────────────────────────────────
// Transparent plane whose vertex displacement creates a heat-shimmer effect.

const hazeVert = /* glsl */ `
  uniform float uTime;
  void main() {
    vec3 pos = position;
    pos.y += sin(pos.x * 4.0 + uTime * 2.1) * 0.018 + sin(pos.z * 3.5 + uTime * 1.7) * 0.015;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
const hazeFrag = /* glsl */ `void main() { gl_FragColor = vec4(0.0); }`;

export function DesertHeatHaze() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => { if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh position={[0, 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 4, 12, 12]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={hazeVert}
        fragmentShader={hazeFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── ArcticAurora ────────────────────────────────────────────────────────────
// Curved ribbon mesh (arc) with UV-scrolling aurora color shader.
// Geometry: a PlaneGeometry bent into a horizontal arc at Y=3.5.

const auroraVert = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float scroll = vUv.x * 2.0 - uTime * 0.18;
    float band1 = sin(scroll * 3.14159 + 0.0) * 0.5 + 0.5;
    float band2 = sin(scroll * 3.14159 + 2.1) * 0.5 + 0.5;
    float band3 = sin(scroll * 3.14159 + 4.2) * 0.5 + 0.5;
    vec3 col = vec3(band1 * 0.0 + band2 * 0.0 + band3 * 0.2,
                    band1 * 0.9 + band2 * 0.2,
                    band1 * 0.2 + band2 * 0.8 + band3 * 0.5);
    float alpha = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
    alpha *= 0.55 + sin(uTime * 0.5 + vUv.x * 6.28) * 0.2;
    gl_FragColor = vec4(col, alpha * 0.65);
  }
`;

export function ArcticAurora() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(6, 1.5, 32, 4);
    const pos = g.attributes.position as THREE.BufferAttribute;
    // Bend into arc: each vertex gets X/Z from circle, Y from original Y
    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) / 6 + 0.5); // 0..1
      const angle = (u - 0.5) * Math.PI; // -PI/2..PI/2
      const radius = 3.0;
      const vY = pos.getY(i); // height variation along ribbon
      pos.setXYZ(i, Math.cos(angle) * radius, vY, Math.sin(angle) * radius * 0.4);
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((s) => { if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime; });

  return (
    <mesh geometry={geo} position={[0, 3.5, 0]}>
      <shaderMaterial
        ref={matRef}
        vertexShader={auroraVert}
        fragmentShader={auroraFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── CraterSparks ────────────────────────────────────────────────────────────
// 40 ballistic ember particles launched from crater rim.
// All motion is computed in the vertex shader — zero JS per frame.

const SPARKS_COUNT = 40;

const sparksVert = /* glsl */ `
  uniform float uTime;
  attribute float aV0;
  attribute float aVx;
  attribute float aVz;
  attribute float aOffset;
  attribute float aLifetime;

  void main() {
    float t = mod(uTime * 0.9 + aOffset * aLifetime, aLifetime);
    float g = 2.8;
    float x = aVx * t;
    float y = aV0 * t - 0.5 * g * t * t;
    float z = aVz * t;
    // Kill particle when y drops below 0
    float alive = step(0.0, y);
    vec3 pos = vec3(x, y + 2.3, z) * alive;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    float age = t / aLifetime;
    gl_PointSize = max(0.0, (1.0 - age) * 5.0) * alive;
  }
`;

const sparksFrag = /* glsl */ `
  void main() {
    // Circular point sprite
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    gl_FragColor = vec4(1.0, 0.65, 0.12, 1.0 - d * 1.8);
  }
`;

export function CraterSparks() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const buffers = useMemo(() => {
    const aV0       = new Float32Array(SPARKS_COUNT);
    const aVx       = new Float32Array(SPARKS_COUNT);
    const aVz       = new Float32Array(SPARKS_COUNT);
    const aOffset   = new Float32Array(SPARKS_COUNT);
    const aLifetime = new Float32Array(SPARKS_COUNT);

    for (let i = 0; i < SPARKS_COUNT; i++) {
      // Deterministic pseudo-random values
      const s1 = Math.sin(i * 127.1 + 1.3) * 43758.5453; const r1 = s1 - Math.floor(s1);
      const s2 = Math.sin(i * 311.7 + 2.7) * 43758.5453; const r2 = s2 - Math.floor(s2);
      const s3 = Math.sin(i * 74.9  + 3.1) * 43758.5453; const r3 = s3 - Math.floor(s3);
      const s4 = Math.sin(i * 191.3 + 4.5) * 43758.5453; const r4 = s4 - Math.floor(s4);
      const s5 = Math.sin(i * 53.2  + 5.9) * 43758.5453; const r5 = s5 - Math.floor(s5);

      aV0[i]       = 0.8 + r1 * 1.2;         // upward speed 0.8–2.0
      aVx[i]       = (r2 - 0.5) * 0.8;       // lateral X
      aVz[i]       = (r3 - 0.5) * 0.8;       // lateral Z
      aOffset[i]   = r4;                       // phase offset 0–1
      aLifetime[i] = 1.4 + r5 * 1.2;         // cycle duration 1.4–2.6s
    }
    const positions = new Float32Array(SPARKS_COUNT * 3);
    return { aV0, aVx, aVz, aOffset, aLifetime, positions };
  }, []);

  useFrame((s) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position"
          array={buffers.positions}
          count={SPARKS_COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-aV0"       array={buffers.aV0}       count={SPARKS_COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aVx"       array={buffers.aVx}       count={SPARKS_COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aVz"       array={buffers.aVz}       count={SPARKS_COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aOffset"   array={buffers.aOffset}   count={SPARKS_COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aLifetime" array={buffers.aLifetime} count={SPARKS_COUNT} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={sparksVert}
        fragmentShader={sparksFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
