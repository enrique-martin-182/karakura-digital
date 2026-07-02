# Volcanic Biome Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar el bioma volcánico en un volcán dramático y creíble con geometría LatheGeometry, ríos de lava, pool de lava en el cráter, iluminación naranja dinámica, chispas balísticas, halo de resplandor y tocones carbonizados en lugar de palmeras.

**Architecture:** Se crea `VolcanoCone.tsx` con los componentes de geometría/iluminación del volcán. `CraterSparks` se añade a `BiomeAmbience.tsx` siguiendo el patrón existente. `WorldTerrain.tsx` es el único punto de integración — `VolcanicDecor` se reescribe para usar todos los nuevos componentes y se eliminan las palmeras.

**Tech Stack:** Three.js 0.185, React Three Fiber v9, @react-three/drei v10, React 19, Next.js 16.2.7. Sin framework de tests — verificación visual via preview tools.

## Global Constraints

- `"use client"` en todos los nuevos archivos de componentes 3D
- Sin `backdrop-filter: blur()` ni CSS `filter: blur()` en elementos animados
- Shaders de partículas/glow: `AdditiveBlending` + `depthWrite={false}`
- Sin `Math.random()` en JSX/render — solo en `useMemo` con semillas deterministas (sin-based hashing)
- Geometrías/materiales compartidos definidos a nivel de módulo (fuera de componentes) cuando sea posible
- `useFrame` para todas las animaciones (sin setInterval/setTimeout)
- `LavaMaterial` ya existe en `src/components/3d/world/LavaMaterial.tsx` — importar y reutilizar
- `PointLight` con `castShadow={false}` (sin coste de shadow map)

---

### Task 1: VolcanoCone geometry + CharredStump

**Files:**
- Create: `src/components/3d/world/VolcanoCone.tsx`

**Interfaces:**
- Consumes: `THREE` (three.js), `useMemo` (react)
- Produces:
  - `VolcanoCone()` — componente sin props, renderiza el cono con vertex colors y ríos de lava
  - `CharredStump({ position, rotationY }: { position: [number,number,number], rotationY?: number })` — tocón carbonizado procedural

- [ ] **Step 1: Crear VolcanoCone.tsx con VolcanoCone**

Crear `src/components/3d/world/VolcanoCone.tsx`:

```tsx
"use client";

import { useMemo } from "react";
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
  const geo = useMemo(buildVolcanoGeometry, []);

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
```

- [ ] **Step 2: Añadir CharredStump al mismo archivo**

Añadir al final de `VolcanoCone.tsx`:

```tsx
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
```

- [ ] **Step 3: Verificar en el preview**

El servidor ya corre en localhost:3000. Importar `VolcanoCone` y `CharredStump` temporalmente en `WorldTerrain.tsx` para verificar que compilan (sin errores de consola). Tomar screenshot.

- [ ] **Step 4: Commit**

```bash
git add src/components/3d/world/VolcanoCone.tsx
git commit -m "feat: VolcanoCone LatheGeometry with vertex colors and lava rivers"
```

---

### Task 2: CraterLavaPool + PointLight + Glow halo

**Files:**
- Modify: `src/components/3d/world/VolcanoCone.tsx` (añadir CraterLavaPool y VolcanoGlow al final)

**Interfaces:**
- Consumes: nada nuevo
- Produces:
  - `CraterLavaPool()` — pool de lava animado para el interior del cráter
  - `VolcanoGlow()` — halo de resplandor naranja aditivo + PointLight

- [ ] **Step 1: Añadir CraterLavaPool a VolcanoCone.tsx**

Añadir al final del archivo, antes del cierre:

```tsx
// ─── CraterLavaPool ───────────────────────────────────────────────────────────

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

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

const glowFrag = /* glsl */ `
  varying vec3 vPos;
  void main() {
    float d = length(vPos) / 3.5;
    float alpha = (1.0 - d) * (1.0 - d) * 0.10;
    gl_FragColor = vec4(1.0, 0.28, 0.02, alpha);
  }
`;
const glowVert = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
```

**Nota:** El `import { useRef } from "react"` y `import { useFrame } from "@react-three/fiber"` deben añadirse al bloque de imports en la parte superior del archivo si no están ya.

- [ ] **Step 2: Verificar que los imports de useRef y useFrame están presentes**

Leer `VolcanoCone.tsx` y confirmar que el bloque de imports incluye:
```tsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LavaMaterial } from "./LavaMaterial";
```

Si faltan, añadirlos.

- [ ] **Step 3: Verificar visualmente**

Importar `CraterLavaPool` y `VolcanoGlow` temporalmente en `VolcanicDecor` de `WorldTerrain.tsx` y confirmar que el pool de lava aparece en el cráter y el resplandor naranja se ve alrededor del volcán. Comprobar consola.

- [ ] **Step 4: Commit**

```bash
git add src/components/3d/world/VolcanoCone.tsx
git commit -m "feat: crater lava pool shader + volcano point light and glow halo"
```

---

### Task 3: CraterSparks particle system

**Files:**
- Modify: `src/components/3d/world/BiomeAmbience.tsx` (añadir CraterSparks al final)

**Interfaces:**
- Consumes: nada nuevo (THREE ya importado, useRef/useMemo/useFrame ya en el archivo)
- Produces:
  - `CraterSparks()` — 40 partículas de brasa con trayectoria balística via shader

- [ ] **Step 1: Añadir CraterSparks al final de BiomeAmbience.tsx**

Leer el archivo actual para confirmar los imports existentes, luego añadir al final:

```tsx
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
    return { aV0, aVx, aVz, aOffset, aLifetime };
  }, []);

  useFrame((s) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position"
          array={new Float32Array(SPARKS_COUNT * 3)}
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
```

- [ ] **Step 2: Verificar visualmente**

Añadir `<CraterSparks />` temporalmente dentro de `VolcanicDecor` en `WorldTerrain.tsx` y confirmar que las brasas salen disparadas desde el cráter con trayectoria balística. Comprobar que no hay errores de shader en consola.

- [ ] **Step 3: Commit**

```bash
git add src/components/3d/world/BiomeAmbience.tsx
git commit -m "feat: CraterSparks ballistic ember particle system"
```

---

### Task 4: VolcanicDecor overhaul — wiring + remove palms + add stumps

**Files:**
- Modify: `src/components/3d/world/WorldTerrain.tsx`

**Interfaces:**
- Consumes:
  - `VolcanoCone` from `./VolcanoCone`
  - `CraterLavaPool` from `./VolcanoCone`
  - `VolcanoGlow` from `./VolcanoCone`
  - `CharredStump` from `./VolcanoCone`
  - `CraterSparks` from `./BiomeAmbience` (import already exists — update it)
- Produces: `VolcanicDecor` completamente reescrita

- [ ] **Step 1: Actualizar import de VolcanoCone en WorldTerrain.tsx**

Añadir al bloque de imports (después de los imports de `IslandBase`):
```tsx
import { VolcanoCone, CraterLavaPool, VolcanoGlow, CharredStump } from "./VolcanoCone";
```

Actualizar el import existente de `BiomeAmbience` para incluir `CraterSparks`:
```tsx
import { BirdFlock, VolcanoSmoke, AshParticles, JungleMist, DesertHeatHaze, ArcticAurora, CraterSparks } from "./BiomeAmbience";
```

- [ ] **Step 2: Reescribir VolcanicDecor**

Encontrar la función `VolcanicDecor` (actualmente lines ~401-461) y reemplazarla completamente:

```tsx
function VolcanicDecor() {
  const heightFn = HEIGHT_FN.volcanic;
  const rockFiles = ["rock_tallA.glb", "cliff_large_rock.glb", "stone_largeA.glb", "stone_largeB.glb", "cliff_rock.glb"];
  const rocks = useMemo(
    () => scatter(14, LOCAL_ORIGIN, 2.1, heightFn, 0).map((p, i) => ({
      ...p, file: rockFiles[i % rockFiles.length],
      scale: 0.4 + p.rand * 0.35, rot: p.rand * Math.PI * 4
    })),
    []
  );

  // 5 charred stumps — deterministic positions around the biome
  const stumps = useMemo(() => [
    { position: [ 1.4,  heightFn( 1.4,  0.6), 0.6 ] as [number,number,number], rotY: 0.8  },
    { position: [-1.3,  heightFn(-1.3,  0.9), 0.9 ] as [number,number,number], rotY: 2.1  },
    { position: [ 0.5,  heightFn( 0.5, -1.6), -1.6] as [number,number,number], rotY: 4.5  },
    { position: [-0.8,  heightFn(-0.8, -1.2), -1.2] as [number,number,number], rotY: 1.3  },
    { position: [ 1.8,  heightFn( 1.8, -0.7), -0.7] as [number,number,number], rotY: 3.2  },
  ], []);

  return (
    <group>
      {/* Rocks */}
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={r.scale} rotationY={r.rot} heightFn={heightFn} />
      ))}

      {/* Volcano structure: cone + crater pool + glow + sparks */}
      <VolcanoCone />
      <CraterLavaPool />
      <VolcanoGlow />
      <CraterSparks />

      {/* Charred stumps (replaced palms) */}
      {stumps.map((s, i) => (
        <CharredStump key={i} position={s.position} rotationY={s.rotY} />
      ))}

      {/* Volcanic ground pools */}
      <mesh position={[1.8, 0.05, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 20]} />
        <meshStandardMaterial color="#1a1212" roughness={0.9} />
      </mesh>
      <mesh position={[-1.2, 0.05, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 16]} />
        <meshStandardMaterial color="#1a1212" roughness={0.9} />
      </mesh>

      {/* Fauna */}
      <Iguana position={[1.7, 0.07, 1.0]} />
      <Iguana position={[2.1, 0.07, 1.5]} />
      <Iguana position={[1.4, 0.07, 1.7]} />
      <Iguana position={[0.9, 0.07, 1.9]} />
      <Iguana position={[2.3, 0.07, 0.8]} />
      <Iguana position={[1.2, 0.07, 0.3]} />
      <Crab position={[1.8, 0.04, 0.7]} />
      <Crab position={[1.5, 0.04, 1.6]} />
      <Crab position={[2.2, 0.04, 1.1]} />

      {/* Ambient effects */}
      <VolcanoSmoke />
      <AshParticles />
    </group>
  );
}
```

- [ ] **Step 3: Verificar visualmente**

Tomar screenshot del diorama y confirmar:
- El volcán tiene forma real (lathe, no cono simple), con irregularidades en las laderas
- 3 ríos de lava bajan por las laderas
- Pool de lava animado visible en el cráter
- Resplandor naranja ilumina el entorno
- Chispas salen disparadas desde el cráter
- No hay palmeras — hay tocones carbonizados
- No hay errores en consola

- [ ] **Step 4: Commit**

```bash
git add src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: VolcanicDecor overhaul — real volcano geometry, lava rivers, glow, sparks, charred stumps"
```
