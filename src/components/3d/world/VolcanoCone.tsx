"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LavaMaterial } from "./LavaMaterial";

// Lathe profile points [radius, y] — defines volcano silhouette bottom to top
const LATHE_POINTS = [
  [1.80, 0.00],
  [1.65, 0.15],
  [1.30, 0.50],
  [0.95, 0.90],
  [0.70, 1.35],
  [0.52, 1.75],
  [0.45, 2.10],
  [0.50, 2.25],
  [0.35, 2.30],
  [0.25, 2.20],
].map(([r, y]) => new THREE.Vector2(r, y));

function buildVolcanoGeometry(): THREE.BufferGeometry {
  const lathe = new THREE.LatheGeometry(LATHE_POINTS, 24);
  const pos = lathe.attributes.position as THREE.BufferAttribute;
  const count = pos.count;

  // Per-vertex color based on normalized height
  const colors = new Float32Array(count * 3);
  const base   = new THREE.Color("#1a1209");
  const mid    = new THREE.Color("#2d1608");
  const hot    = new THREE.Color("#5a1a08");
  const temp   = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const y = pos.getY(i);
    const t = Math.max(0, Math.min(1, y / 2.30)); // 0=base, 1=crater

    // Radial noise perturbation (deterministic, no Math.random)
    const angle = Math.atan2(pos.getZ(i), pos.getX(i));
    const freq = 5 + Math.floor(t * 3); // more frequency variation mid-slope
    const amp  = t > 0.15 && t < 0.85 ? 0.10 * Math.sin(t * Math.PI) : 0.02;
    const noise = Math.sin(angle * freq + t * 13.1) * amp
                + Math.sin(angle * (freq + 2) + t * 7.3) * amp * 0.4;
    const r = Math.sqrt(pos.getX(i) ** 2 + pos.getZ(i) ** 2);
    if (r > 0.01) {
      const nr = r + noise;
      pos.setXYZ(i, (pos.getX(i) / r) * nr, pos.getY(i), (pos.getZ(i) / r) * nr);
    }

    // Vertex color
    if (t < 0.35) temp.lerpColors(base, mid, t / 0.35);
    else           temp.lerpColors(mid, hot, (t - 0.35) / 0.65);
    colors[i * 3]     = temp.r;
    colors[i * 3 + 1] = temp.g;
    colors[i * 3 + 2] = temp.b;
  }

  lathe.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  pos.needsUpdate = true;
  lathe.computeVertexNormals();
  return lathe;
}

export function VolcanoCone() {
  const geo = useMemo(() => buildVolcanoGeometry(), []);

  // 3 lava rivers at 120° intervals going down the slope
  const rivers = useMemo(() =>
    [0, 1, 2].map((i) => {
      const angle = (i / 3) * Math.PI * 2;
      return {
        position: [Math.sin(angle) * 0.72, 0.92, Math.cos(angle) * 0.72] as [number, number, number],
        rotationY: angle,
      };
    }), []
  );

  return (
    <group>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial vertexColors roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Lava rivers on slope */}
      {rivers.map((r, i) => (
        <mesh
          key={i}
          position={r.position}
          rotation={[-Math.PI / 2.8, r.rotationY, 0]}
          castShadow={false}
        >
          <planeGeometry args={[0.18, 2.0, 1, 8]} />
          <LavaMaterial />
        </mesh>
      ))}
    </group>
  );
}

// ─── CharredStump ─────────────────────────────────────────────────────────────
// Procedural charred tree stump: trunk cylinder + 2 branch stubs. No GLTF needed.

const STUMP_MAT = new THREE.MeshStandardMaterial({
  color: "#171210",
  roughness: 0.95,
  metalness: 0,
});

export function CharredStump({
  position,
  rotationY = 0,
}: {
  position: [number, number, number];
  rotationY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Main trunk */}
      <mesh material={STUMP_MAT} castShadow>
        <cylinderGeometry args={[0.055, 0.075, 0.55, 6]} />
      </mesh>
      {/* Branch A */}
      <mesh
        material={STUMP_MAT}
        position={[0.12, 0.2, 0.0]}
        rotation={[0, 0, -Math.PI / 4]}
        castShadow
      >
        <cylinderGeometry args={[0.025, 0.035, 0.30, 5]} />
      </mesh>
      {/* Branch B */}
      <mesh
        material={STUMP_MAT}
        position={[-0.08, 0.15, 0.06]}
        rotation={[0.3, 0, Math.PI / 3.5]}
        castShadow
      >
        <cylinderGeometry args={[0.020, 0.030, 0.22, 5]} />
      </mesh>
    </group>
  );
}

// ─── CraterLavaPool ───────────────────────────────────────────────────────────

const poolVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const poolFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

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
    for(int i=0;i<4;i++){v+=noise(p)*a;p*=2.1;a*=0.5;}
    return v;
  }

  void main() {
    vec2 uv = vUv * 3.5 + vec2(uTime * 0.12, uTime * 0.08);
    float n = fbm(uv);
    float pulse = 0.82 + sin(uTime * 1.8) * 0.18;
    vec3 hot  = vec3(1.0, 0.85, 0.05);
    vec3 mid  = vec3(1.0, 0.30, 0.02);
    vec3 cool = vec3(0.55, 0.05, 0.01);
    vec3 col = n > 0.6 ? mix(mid, hot, (n-0.6)/0.4)
                       : mix(cool, mid, n/0.6);
    col *= pulse;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function CraterLavaPool() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh position={[0, 2.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.45, 24]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={poolVert}
        fragmentShader={poolFrag}
        uniforms={{ uTime: { value: 0 } }}
        toneMapped={false}
      />
    </mesh>
  );
}

// ─── VolcanoGlow ──────────────────────────────────────────────────────────────
// Orange point light + additive glow sphere radiating from crater.

const glowVert = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFrag = /* glsl */ `
  varying vec3 vPos;
  void main() {
    float d = length(vPos) / 3.5;
    float alpha = (1.0 - d) * (1.0 - d) * 0.10;
    gl_FragColor = vec4(1.0, 0.28, 0.02, alpha);
  }
`;

export function VolcanoGlow() {
  return (
    <group>
      <pointLight
        position={[0, 3.2, 0]}
        intensity={4}
        color="#ff5500"
        distance={14}
        decay={2}
        castShadow={false}
      />
      <mesh>
        <sphereGeometry args={[3.5, 16, 16]} />
        <shaderMaterial
          vertexShader={glowVert}
          fragmentShader={glowFrag}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
