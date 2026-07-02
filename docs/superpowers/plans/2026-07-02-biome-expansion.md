# Biome Expansion + Coherence — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Añadir 4 biomas nuevos (savanna, swamp, taiga, reef) al diorama planetario y mejorar la coherencia visual de los biomas existentes (ruinas en jungla, base de pirámide en desierto, icebergs LatheGeometry en ártico, árboles caducifolios en bosque).

**Architecture:** `types.ts` recibe las 4 entradas nuevas en `BIOMES[]`. `WorldTerrain.tsx` recibe los 4 `HEIGHT_FN` y 4 funciones `DecorXxx` nuevas. Componentes procedurales compartidos (AcaciaTree, MangroveTree, CoralHead, SeaAnemone, RuinPillar, RuinWall, IcebergMesh) van en un nuevo `BiomeProcedural.tsx`. `BiomeAmbience.tsx` recibe `SwampMist`. FishSchool y CoralCluster/useCoralCluster ya existen — NO recrear.

**Tech Stack:** Next.js 16.2.7, React 19, React Three Fiber v9, Three.js 0.185, @react-three/drei v10. Sin framework de tests.

## Global Constraints

- `"use client"` al inicio de todo nuevo archivo de componente 3D
- Sin `Math.random()` en render o scope de módulo — solo en `useMemo` con seeds deterministas `Math.sin(i * 127.1) * 43758.5453` pattern
- `AdditiveBlending + depthWrite={false}` en todos los shaders de partículas/glow/mist
- Geometrías procedurales: máximo ~500 triángulos por componente
- `FishSchool` ya existe en `BiomeAnimals.tsx` — `{ center: [number,number,number], count?: number }` — importar y reutilizar
- `CoralCluster` + `useCoralCluster` ya existen en `InstancedDecor.tsx` — importar y reutilizar
- `BirdFlock` wiring se hace inline en `WorldTerrain.tsx` dentro del JSX del map de biomas (seguir el patrón existente)
- `DECOR_BY_BIOME` en WorldTerrain.tsx necesita entrada para cada bioma del array `BIOMES`; `HEIGHT_FN` también — un bioma en BIOMES sin HEIGHT_FN rompe BiomeRegion en runtime

---

### Task 1: Registrar 4 biomas nuevos en types.ts + HEIGHT_FN + stubs

**Files:**
- Modify: `src/components/3d/world/types.ts`
- Modify: `src/components/3d/world/WorldTerrain.tsx`

**Interfaces:**
- Consumes: nada nuevo
- Produces:
  - 4 nuevas entradas en `BIOMES[]`: `savanna`, `swamp`, `taiga`, `reef`
  - 4 nuevas entradas en `HEIGHT_FN`: `HEIGHT_FN.savanna`, `.swamp`, `.taiga`, `.reef`
  - 4 stubs en `DECOR_BY_BIOME`: retornan `<group />` (vacíos — Task 4 los rellena)
  - BirdFlock wiring para los 4 biomas en el JSX map

- [ ] **Step 1: Añadir 4 biomas a BIOMES[] en types.ts**

Abrir `src/components/3d/world/types.ts`. Añadir al final del array `BIOMES`, justo antes del cierre `]`:

```ts
  {
    id: "savanna",
    name: "Sabana Dorada",
    description: "Llanura arida con acacias en parasol, termiteros y manadas de camellos bajo el sol abrasador.",
    position: [4.9, -1.7, 8.5],
    color: "#c9a84c",
    markerColor: "#E8B84B",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [8.8, -3.1, 15.3],
    detailCameraTarget: [4.9, -1.7, 8.5],
    projects: [],
  },
  {
    id: "swamp",
    name: "Pantano Profundo",
    description: "Manglares ancestrales sobre aguas turbias, hongos luminiscentes y tortugas entre raices emergentes.",
    position: [-9.8, 0.9, -1.7],
    color: "#3d5a2a",
    markerColor: "#7BC67E",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-17.6, 1.6, -3.1],
    detailCameraTarget: [-9.8, 0.9, -1.7],
    projects: [],
  },
  {
    id: "taiga",
    name: "Taiga Boreal",
    description: "Bosque de coniferas bajo manto de nieve, zorros entre pinos helados y auroras en el horizonte.",
    position: [-4.1, 8.2, 3.8],
    color: "#dce8ee",
    markerColor: "#A8D8EA",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-7.4, 14.8, 6.8],
    detailCameraTarget: [-4.1, 8.2, 3.8],
    projects: [],
  },
  {
    id: "reef",
    name: "Gran Arrecife",
    description: "Coral multicolor bajo aguas tropicales, cardumenes de peces y tortugas marinas entre anemones.",
    position: [7.5, -3.4, 5.0],
    color: "#ffe8a0",
    markerColor: "#00CED1",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [13.5, -6.1, 9.0],
    detailCameraTarget: [7.5, -3.4, 5.0],
    projects: [],
  },
```

- [ ] **Step 2: Añadir HEIGHT_FN para los 4 biomas en WorldTerrain.tsx**

En `WorldTerrain.tsx`, localizar el bloque `HEIGHT_FN` (línea ~27) y añadir 4 entradas nuevas:

```ts
  savanna: (x, z) => 0.05 + Math.sin(x * 2.1) * 0.06 + Math.sin(z * 1.8) * 0.05,
  swamp:   (x, z) => 0.12 + Math.sin(x * 3.1 + 0.5) * 0.08 + Math.cos(z * 2.7) * 0.06,
  taiga:   (x, z) => 0.10 + Math.abs(Math.sin(x * 2.3)) * 0.12 + Math.abs(Math.cos(z * 2.1)) * 0.10,
  reef:    (x, z) => 0.04 + Math.sin(x * 3.0) * 0.05 + Math.cos(z * 2.5) * 0.04,
```

- [ ] **Step 3: Añadir stubs DecorXxx y wiring en WorldTerrain.tsx**

Antes de `const DECOR_BY_BIOME` añadir 4 funciones stub (se reemplazarán en Task 4):

```tsx
function SavannaDecor() { return <group />; }
function SwampDecor()   { return <group />; }
function TaigaDecor()   { return <group />; }
function ReefDecor()    { return <group />; }
```

Actualizar `DECOR_BY_BIOME`:

```ts
const DECOR_BY_BIOME: Record<string, () => ReactNode> = {
  jungle:   JungleDecor,
  desert:   DesertDecor,
  arctic:   ArcticDecor,
  ocean:    OceanDecor,
  forest:   ForestDecor,
  volcanic: VolcanicDecor,
  savanna:  SavannaDecor,
  swamp:    SwampDecor,
  taiga:    TaigaDecor,
  reef:     ReefDecor,
};
```

En el JSX map de biomas, dentro de `<group key={biome.id} ...>`, añadir BirdFlock wiring para los nuevos biomas (justo después de las líneas existentes `biome.id === "ocean" && ...`):

```tsx
{biome.id === "savanna" && <BirdFlock count={6} orbitRadius={2.5} orbitHeight={3.0} speed={0.5}  color="#c8a020" />}
{biome.id === "swamp"   && <BirdFlock count={4} orbitRadius={2.0} orbitHeight={1.8} speed={0.45} color="#1a3a1a" />}
{biome.id === "taiga"   && <BirdFlock count={5} orbitRadius={2.0} orbitHeight={2.5} speed={0.6}  color="#ccddee" />}
{biome.id === "reef"    && <BirdFlock count={7} orbitRadius={3.0} orbitHeight={1.8} speed={0.8}  color="#ffffff" />}
```

- [ ] **Step 4: Verificar en preview**

El dev server está en localhost:3000. Comprobar que los 4 nuevos biomas aparecen en el globo como islas vacías (terrain coloreado, sin props todavía). Comprobar consola — no debe haber errores de `HEIGHT_FN[id] is not a function`.

- [ ] **Step 5: Commit**

```bash
git add src/components/3d/world/types.ts src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: register 4 new biomes — savanna, swamp, taiga, reef"
```

---

### Task 2: BiomeProcedural.tsx — componentes geométricos procedurales

**Files:**
- Create: `src/components/3d/world/BiomeProcedural.tsx`

**Interfaces:**
- Consumes: nada externo
- Produces (exports):
  - `AcaciaTree()` — sin props
  - `MangroveTree()` — sin props
  - `CoralHead({ colorIndex: number })` — coral con color determinista por índice
  - `SeaAnemone()` — sin props
  - `IcebergMesh({ scale: number })` — iceberg LatheGeometry
  - `RuinPillar({ position: [number,number,number], rotY?: number, lean?: number })` — pilar de ruina
  - `RuinWall({ position: [number,number,number], rotY?: number })` — muro de ruina

- [ ] **Step 1: Crear BiomeProcedural.tsx**

Crear `src/components/3d/world/BiomeProcedural.tsx`:

```tsx
"use client";

import { useMemo } from "react";
import * as THREE from "three";

// ─── AcaciaTree ──────────────────────────────────────────────────────────────
// Tronco fino + copa en parasol plana (característica de la sabana africana)

const ACACIA_TRUNK = new THREE.MeshStandardMaterial({ color: "#6b4226", roughness: 0.9 });
const ACACIA_CANOPY = new THREE.MeshStandardMaterial({ color: "#4a7a2a", roughness: 0.85 });

export function AcaciaTree() {
  return (
    <group>
      <mesh material={ACACIA_TRUNK} castShadow>
        <cylinderGeometry args={[0.04, 0.07, 0.9, 6]} />
      </mesh>
      {/* Copa plana en parasol — CylinderGeometry muy aplastada */}
      <mesh material={ACACIA_CANOPY} castShadow position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.65, 0.08, 0.14, 8]} />
      </mesh>
      {/* Segunda capa de copa ligeramente más pequeña arriba */}
      <mesh material={ACACIA_CANOPY} castShadow position={[0, 0.74, 0]}>
        <cylinderGeometry args={[0.38, 0.05, 0.10, 7]} />
      </mesh>
    </group>
  );
}

// ─── MangroveTree ─────────────────────────────────────────────────────────────
// Tronco con 4 raíces en arco y copa esférica aplastada

const MANGROVE_WOOD = new THREE.MeshStandardMaterial({ color: "#2d1f10", roughness: 0.95 });
const MANGROVE_LEAF = new THREE.MeshStandardMaterial({ color: "#2d5a1a", roughness: 0.85 });

export function MangroveTree() {
  return (
    <group>
      {/* Tronco principal */}
      <mesh material={MANGROVE_WOOD} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.7, 5]} />
      </mesh>
      {/* 4 raíces inclinadas emergiendo del suelo */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            material={MANGROVE_WOOD}
            castShadow
            position={[Math.cos(angle) * 0.22, -0.12, Math.sin(angle) * 0.22]}
            rotation={[Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5]}
          >
            <cylinderGeometry args={[0.02, 0.03, 0.45, 4]} />
          </mesh>
        );
      })}
      {/* Copa esférica aplastada */}
      <mesh material={MANGROVE_LEAF} castShadow position={[0, 0.55, 0]} scale={[1, 0.6, 1]}>
        <sphereGeometry args={[0.45, 8, 6]} />
      </mesh>
    </group>
  );
}

// ─── CoralHead ────────────────────────────────────────────────────────────────
// Rama principal con 3 ramas secundarias. Color por índice (determinista).

const CORAL_COLORS = ["#ff6644", "#ff2288", "#ffaa22", "#cc44ff", "#ff4400", "#22aaff"];

export function CoralHead({ colorIndex = 0 }: { colorIndex?: number }) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: CORAL_COLORS[colorIndex % CORAL_COLORS.length],
      roughness: 0.7,
      metalness: 0.05,
    }),
    [colorIndex]
  );

  return (
    <group>
      {/* Rama principal */}
      <mesh material={mat} castShadow>
        <cylinderGeometry args={[0.04, 0.08, 0.45, 6]} />
      </mesh>
      {/* 3 ramas secundarias a 120° */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <mesh
            key={i}
            material={mat}
            castShadow
            position={[Math.cos(angle) * 0.12, 0.1, Math.sin(angle) * 0.12]}
            rotation={[Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5]}
          >
            <cylinderGeometry args={[0.025, 0.04, 0.28, 5]} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── SeaAnemone ───────────────────────────────────────────────────────────────
// Base cilíndrica + 6 tentáculos en corona

const ANEMONE_BASE = new THREE.MeshStandardMaterial({ color: "#cc2288", roughness: 0.8 });
const ANEMONE_TIP  = new THREE.MeshStandardMaterial({ color: "#ff66cc", roughness: 0.7 });

export function SeaAnemone() {
  return (
    <group>
      <mesh material={ANEMONE_BASE} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.28, 5]} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            material={ANEMONE_TIP}
            castShadow
            position={[Math.cos(angle) * 0.07, 0.18, Math.sin(angle) * 0.07]}
            rotation={[Math.cos(angle) * 0.6, 0, Math.sin(angle) * 0.6]}
          >
            <cylinderGeometry args={[0.008, 0.012, 0.18, 3]} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── IcebergMesh ──────────────────────────────────────────────────────────────
// Iceberg con perfil LatheGeometry irregular y material físico traslúcido

const ICEBERG_PROFILE = [
  new THREE.Vector2(0.6,  0.00),
  new THREE.Vector2(0.85, 0.22),
  new THREE.Vector2(0.65, 0.55),
  new THREE.Vector2(0.38, 0.90),
  new THREE.Vector2(0.18, 1.30),
  new THREE.Vector2(0.05, 1.60),
];

function buildIcebergGeo(): THREE.BufferGeometry {
  const lathe = new THREE.LatheGeometry(ICEBERG_PROFILE, 10);
  const pos = lathe.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const angle = Math.atan2(pos.getZ(i), pos.getX(i));
    const t = pos.getY(i) / 1.6;
    const noise = Math.sin(angle * 4 + t * 7.3) * 0.06 * Math.sin(t * Math.PI);
    const r = Math.sqrt(pos.getX(i) ** 2 + pos.getZ(i) ** 2);
    if (r > 0.01) {
      const nr = r + noise;
      pos.setXYZ(i, (pos.getX(i) / r) * nr, pos.getY(i), (pos.getZ(i) / r) * nr);
    }
  }
  pos.needsUpdate = true;
  lathe.computeVertexNormals();
  return lathe;
}

const ICEBERG_GEO = buildIcebergGeo();

export function IcebergMesh({ scale = 1 }: { scale?: number }) {
  return (
    <mesh geometry={ICEBERG_GEO} scale={scale} castShadow>
      <meshPhysicalMaterial
        color="#ddeeff"
        transmission={0.5}
        thickness={0.8}
        roughness={0.08}
        ior={1.31}
        clearcoat={0.5}
      />
    </mesh>
  );
}

// ─── RuinPillar ───────────────────────────────────────────────────────────────
// Pilar de ruina: cilindro + capitel, ligeramente inclinado

const RUIN_MAT = new THREE.MeshStandardMaterial({ color: "#7a6a4a", roughness: 0.95 });

export function RuinPillar({
  position,
  rotY = 0,
  lean = 0,
}: {
  position: [number, number, number];
  rotY?: number;
  lean?: number;
}) {
  return (
    <group position={position} rotation={[lean, rotY, 0]}>
      <mesh material={RUIN_MAT} castShadow>
        <cylinderGeometry args={[0.16, 0.19, 1.35, 8]} />
      </mesh>
      {/* Capitel */}
      <mesh material={RUIN_MAT} castShadow position={[0, 0.74, 0]}>
        <cylinderGeometry args={[0.22, 0.17, 0.11, 8]} />
      </mesh>
    </group>
  );
}

// ─── RuinWall ─────────────────────────────────────────────────────────────────
// Fragmento de muro de piedra

export function RuinWall({
  position,
  rotY = 0,
}: {
  position: [number, number, number];
  rotY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      <mesh material={RUIN_MAT} castShadow>
        <boxGeometry args={[1.2, 0.75, 0.22]} />
      </mesh>
      {/* Bloque roto encima */}
      <mesh material={RUIN_MAT} castShadow position={[-0.3, 0.5, 0.04]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.55, 0.28, 0.20]} />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 2: Verificar TypeScript**

Ejecutar `npx tsc --noEmit` desde la raíz del proyecto. Confirmar que BiomeProcedural.tsx no introduce errores nuevos.

- [ ] **Step 3: Commit**

```bash
git add src/components/3d/world/BiomeProcedural.tsx
git commit -m "feat: BiomeProcedural — AcaciaTree, MangroveTree, CoralHead, SeaAnemone, IcebergMesh, RuinPillar, RuinWall"
```

---

### Task 3: SwampMist en BiomeAmbience.tsx

**Files:**
- Modify: `src/components/3d/world/BiomeAmbience.tsx`

**Interfaces:**
- Consumes: THREE (ya importado), useRef/useFrame (ya importados)
- Produces: `SwampMist()` — exportada al final del archivo

- [ ] **Step 1: Leer BiomeAmbience.tsx**

Leer `src/components/3d/world/BiomeAmbience.tsx` para confirmar los imports existentes (THREE, useRef, useMemo, useFrame, ya deben estar). NO modificar componentes existentes.

- [ ] **Step 2: Añadir SwampMist al final de BiomeAmbience.tsx**

```tsx
// ─── SwampMist ────────────────────────────────────────────────────────────────
// Esfera de niebla pantanosa. Igual que JungleMist pero más densa y verde oscuro.

const swampMistFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPos;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i); float b = hash(i+vec2(1,0));
    float c = hash(i+vec2(0,1)); float d = hash(i+vec2(1,1));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
  }
  float fbm(vec2 p) {
    float v=0.0; float a=0.5;
    for(int i=0;i<3;i++){v+=noise(p)*a;p*=2.1;a*=0.5;}
    return v;
  }
  void main() {
    vec2 uv = vUv * 2.5 + vec2(uTime * 0.04, uTime * 0.03);
    float n = fbm(uv);
    float alpha = (n * 0.12 + 0.05) * (1.0 - length(vPos) / 2.5);
    gl_FragColor = vec4(0.15, 0.28, 0.10, clamp(alpha, 0.0, 0.18));
  }
`;

const swampMistVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function SwampMist() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh position={[0, 0.4, 0]}>
      <sphereGeometry args={[2.5, 16, 16]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={swampMistVert}
        fragmentShader={swampMistFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
```

- [ ] **Step 3: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Confirmar cero errores nuevos.

- [ ] **Step 4: Commit**

```bash
git add src/components/3d/world/BiomeAmbience.tsx
git commit -m "feat: SwampMist ambient shader for swamp biome"
```

---

### Task 4: Decors de los 4 biomas nuevos

**Files:**
- Modify: `src/components/3d/world/WorldTerrain.tsx`

**Interfaces:**
- Consumes (importar al inicio de WorldTerrain.tsx):
  - `AcaciaTree, MangroveTree, CoralHead, SeaAnemone` from `"./BiomeProcedural"`
  - `SwampMist` from `"./BiomeAmbience"` (añadir al import existente)
  - `FishSchool` ya importado de `"./BiomeAnimals"` — no tocar
  - `CoralCluster, useCoralCluster` ya importados de `"./InstancedDecor"` — no tocar
- Produces: reemplaza los 4 stubs `SavannaDecor`, `SwampDecor`, `TaigaDecor`, `ReefDecor` con implementaciones completas

- [ ] **Step 1: Añadir import de BiomeProcedural y SwampMist**

Leer WorldTerrain.tsx. Localizar el bloque de imports al inicio. Añadir:

```tsx
import { AcaciaTree, MangroveTree, CoralHead, SeaAnemone } from "./BiomeProcedural";
```

Actualizar el import de BiomeAmbience para incluir SwampMist:

```tsx
import { BirdFlock, VolcanoSmoke, AshParticles, JungleMist, DesertHeatHaze, ArcticAurora, CraterSparks, SwampMist } from "./BiomeAmbience";
```

- [ ] **Step 2: Reemplazar SavannaDecor stub**

Localizar `function SavannaDecor() { return <group />; }` y reemplazar:

```tsx
function SavannaDecor() {
  const heightFn = HEIGHT_FN.savanna;

  const acacias = useMemo(() =>
    scatter(8, LOCAL_ORIGIN, 2.1, heightFn, 10).map((p) => ({
      position: [p.x, p.y, p.z] as [number, number, number],
      scale: 0.7 + p.rand * 0.5,
      rotY: p.rand * Math.PI * 2,
    })), []);

  const rockFiles = ["rock_largeA.glb", "rock_largeB.glb", "rock_largeC.glb", "rock_largeD.glb"];
  const rocks = useMemo(() =>
    scatter(6, LOCAL_ORIGIN, 2.2, heightFn, 30).map((p, i) => ({
      ...p, file: rockFiles[i % rockFiles.length], scale: 0.3 + p.rand * 0.25, rot: p.rand * Math.PI * 4
    })), []);

  const grass = useGrassField(60, LOCAL_ORIGIN, 2.2, heightFn);

  // 2 termite mounds deterministas
  const mounds: [number, number, number][] = [
    [1.2,  heightFn(1.2,  -0.8), -0.8],
    [-1.5, heightFn(-1.5,  0.6),  0.6],
  ];

  return (
    <group>
      {acacias.map((a, i) => (
        <group key={i} position={a.position} rotation={[0, a.rotY, 0]} scale={a.scale}>
          <AcaciaTree />
        </group>
      ))}
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={r.scale} rotationY={r.rot} heightFn={heightFn} />
      ))}
      <GrassField blades={grass} file="grass_large.glb" />
      {/* Termite mounds */}
      {mounds.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh castShadow>
            <cylinderGeometry args={[0.13, 0.32, 0.75, 8]} />
            <meshStandardMaterial color="#b8864e" roughness={0.9} />
          </mesh>
          {[0, 1, 2].map((j) => {
            const a = (j / 3) * Math.PI * 2 + i * 1.1;
            return (
              <mesh key={j} position={[Math.cos(a) * 0.18, 0.18, Math.sin(a) * 0.18]} castShadow>
                <sphereGeometry args={[0.06, 6, 5]} />
                <meshStandardMaterial color="#a87040" roughness={0.9} />
              </mesh>
            );
          })}
        </group>
      ))}
      <StaticAnimal file="camel.glb" position={[-0.8,  heightFn(-0.8, 0.5) + 0.35, 0.5]}  scale={0.0024} rotationY={0.7} bobAmount={0.02} bobSpeed={0.9} />
      <StaticAnimal file="camel.glb" position={[-1.4,  heightFn(-1.4, 1.0) + 0.32, 1.0]}  scale={0.0022} rotationY={-0.3} bobAmount={0.02} bobSpeed={0.85} />
    </group>
  );
}
```

- [ ] **Step 3: Reemplazar SwampDecor stub**

```tsx
function SwampDecor() {
  const heightFn = HEIGHT_FN.swamp;

  const mangroves = useMemo(() =>
    scatter(6, LOCAL_ORIGIN, 1.9, heightFn, 20).map((p) => ({
      position: [p.x, p.y, p.z] as [number, number, number],
      scale: 0.65 + p.rand * 0.45,
      rotY: p.rand * Math.PI * 2,
    })), []);

  const clutterFiles = ["mushroom_red.glb", "mushroom_tan.glb", "mushroom_redGroup.glb", "stump_old.glb", "log.glb", "log_large.glb"];
  const clutter = useMemo(() =>
    scatter(10, LOCAL_ORIGIN, 2.0, heightFn, 40).map((p, i) => ({
      ...p, file: clutterFiles[i % clutterFiles.length], scale: 0.4 + p.rand * 0.3, rot: p.rand * Math.PI * 4
    })), []);

  return (
    <group>
      {mangroves.map((m, i) => (
        <group key={i} position={m.position} rotation={[0, m.rotY, 0]} scale={m.scale}>
          <MangroveTree />
        </group>
      ))}
      {clutter.map((c, i) => (
        <PhysicsNatureProp key={i} file={c.file} position={[c.x, c.y, c.z]} scale={c.scale} rotationY={c.rot} heightFn={heightFn} />
      ))}
      {/* Charco central */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 16]} />
        <meshStandardMaterial color="#2d3d1a" roughness={0.4} transparent opacity={0.75} />
      </mesh>
      <StaticAnimal file="turtle.glb" position={[0.4, 0.05, 0.3]}  scale={0.018} rotationY={1.1} bobAmount={0.03} bobSpeed={0.6} />
      <StaticAnimal file="turtle.glb" position={[-0.5, 0.05, -0.4]} scale={0.016} rotationY={-0.7} bobAmount={0.03} bobSpeed={0.55} />
      <StaticAnimal file="turtle.glb" position={[0.7, 0.05, -0.6]} scale={0.015} rotationY={2.3} bobAmount={0.03} bobSpeed={0.5} />
      <SwampMist />
    </group>
  );
}
```

- [ ] **Step 4: Reemplazar TaigaDecor stub**

```tsx
function TaigaDecor() {
  const heightFn = HEIGHT_FN.taiga;

  const pineFiles = ["tree_pineTallA.glb", "tree_pineRoundA.glb", "tree_pineRoundB.glb", "tree_pineRoundC.glb", "tree_pineRoundD.glb", "tree_pineSmallA.glb"];
  const pines = useMemo(() =>
    scatter(14, LOCAL_ORIGIN, 2.2, heightFn, 0).map((p, i) => ({
      ...p, file: pineFiles[i % pineFiles.length], scale: 0.45 + p.rand * 0.35, rot: p.rand * Math.PI * 4
    })), []);

  const rockFiles = ["rock_smallA.glb", "rock_smallB.glb", "stone_smallA.glb", "stone_smallB.glb"];
  const rocks = useMemo(() =>
    scatter(5, LOCAL_ORIGIN, 2.0, heightFn, 80).map((p, i) => ({
      ...p, file: rockFiles[i % rockFiles.length], scale: 0.3 + p.rand * 0.2, rot: p.rand * Math.PI * 4
    })), []);

  // Snow drifts at base of trees (3 deterministic positions)
  const snowDrifts: [number, number, number][] = [
    [0.8,  heightFn(0.8,  -1.1), -1.1],
    [-1.3, heightFn(-1.3,  0.7),  0.7],
    [0.3,  heightFn(0.3,   1.5),  1.5],
  ];

  return (
    <group>
      {pines.map((t, i) => (
        <PhysicsNatureTree key={i} file={t.file} position={[t.x, t.y, t.z]} scale={t.scale} rotationY={t.rot} heightFn={heightFn} />
      ))}
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={r.scale} rotationY={r.rot} heightFn={heightFn} />
      ))}
      <NatureProp file="log_stack.glb" position={[1.0, heightFn(1.0, -0.5) + 0.05, -0.5]} scale={0.5} rotationY={0.8} />
      <NatureProp file="log_stack.glb" position={[-0.6, heightFn(-0.6, 1.2) + 0.05, 1.2]} scale={0.45} rotationY={2.1} />
      {/* Snow drifts — SphereGeometry muy aplastada */}
      {snowDrifts.map((pos, i) => (
        <mesh key={i} position={pos} scale={[0.55 + i * 0.1, 0.12, 0.45 + i * 0.08]} castShadow>
          <sphereGeometry args={[0.5, 8, 5]} />
          <meshStandardMaterial color="#f0f4f8" roughness={0.6} />
        </mesh>
      ))}
      <RiggedAnimal file="fox.glb" animationMatch="idle_2" position={[1.0, heightFn(1.0, 0.4) + 0.22, 0.4]} scale={0.22} rotationY={-1.2} />
      <RiggedAnimal file="fox.glb" animationMatch="idle_2" position={[-0.8, heightFn(-0.8, -0.6) + 0.22, -0.6]} scale={0.20} rotationY={2.8} />
      <RiggedAnimal file="rabbit.glb" animationMatch="sitting_idle" position={[0.3, heightFn(0.3, 1.0) + 0.22, 1.0]} scale={0.17} rotationY={0.5} />
      <RiggedAnimal file="rabbit.glb" animationMatch="idle" position={[-1.5, heightFn(-1.5, 0.3) + 0.22, 0.3]} scale={0.16} rotationY={3.1} />
      <ArcticAurora />
    </group>
  );
}
```

**Nota:** `RiggedAnimal` ya está importado. `ArcticAurora` ya está importado de BiomeAmbience.

- [ ] **Step 5: Reemplazar ReefDecor stub**

```tsx
function ReefDecor() {
  const heightFn = HEIGHT_FN.reef;
  const corals = useCoralCluster(22, LOCAL_ORIGIN, 2.0);

  const coralHeads = useMemo(() =>
    scatter(8, LOCAL_ORIGIN, 1.9, heightFn, 15).map((p, i) => ({
      position: [p.x, p.y + 0.22, p.z] as [number, number, number],
      scale: 0.6 + p.rand * 0.5,
      colorIndex: i,
    })), []);

  const anemones = useMemo(() =>
    scatter(5, LOCAL_ORIGIN, 1.7, heightFn, 55).map((p) => ({
      position: [p.x, p.y + 0.14, p.z] as [number, number, number],
      scale: 0.7 + p.rand * 0.4,
    })), []);

  const rockFiles = ["rock_smallA.glb", "rock_smallB.glb", "rock_smallC.glb", "rock_smallD.glb"];
  const rocks = useMemo(() =>
    scatter(6, LOCAL_ORIGIN, 2.1, heightFn, 0).map((p, i) => ({
      ...p, file: rockFiles[i % rockFiles.length], scale: 0.35 + p.rand * 0.3, rot: p.rand * Math.PI * 4
    })), []);

  const kelp = useGrassField(40, LOCAL_ORIGIN, 2.0, heightFn);

  return (
    <group>
      <CoralCluster corals={corals} y={0.18} />
      {coralHeads.map((c, i) => (
        <group key={i} position={c.position} scale={c.scale}>
          <CoralHead colorIndex={c.colorIndex} />
        </group>
      ))}
      {anemones.map((a, i) => (
        <group key={i} position={a.position} scale={a.scale}>
          <SeaAnemone />
        </group>
      ))}
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={r.scale} rotationY={r.rot} heightFn={heightFn} />
      ))}
      <GrassField blades={kelp.map((k) => ({ ...k, y: k.y + 0.4, scale: k.scale * 1.8 }))} file="grass_large.glb" />
      <StaticAnimal file="turtle.glb" position={[0.6, 0.22, -0.5]}  scale={0.022} rotationY={1.1} bobAmount={0.06} bobSpeed={0.7} />
      <StaticAnimal file="turtle.glb" position={[-1.0, 0.18, 0.4]}  scale={0.018} rotationY={-0.5} bobAmount={0.06} bobSpeed={0.6} />
      <FishSchool center={[0.5, 0.5, 0.5]}   count={12} />
      <FishSchool center={[-1.2, 0.4, -0.8]} count={9} />
    </group>
  );
}
```

- [ ] **Step 6: Verificar en preview**

Confirmar que los 4 biomas muestran decoración (acacias, manglares, pinos, coral). Revisar consola — no debe haber errores de import o de undefined.

- [ ] **Step 7: Commit**

```bash
git add src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: SavannaDecor, SwampDecor, TaigaDecor, ReefDecor — 4 new biome decorations"
```

---

### Task 5: Coherencia en biomas existentes

**Files:**
- Modify: `src/components/3d/world/WorldTerrain.tsx`
- Modify: `src/components/3d/world/BiomeProcedural.tsx` (ya existe — solo importar)

**Interfaces:**
- Consumes: `RuinPillar, RuinWall, IcebergMesh` from `"./BiomeProcedural"` — añadir al import existente
- Produces: JungleDecor + ruinas, ArcticDecor con IcebergMesh LatheGeometry, ForestDecor con árboles caducifolios

**Nota sobre desierto y océano:** DesertDecor ya tiene pirámide (ConeGeometry 4 lados) y oasis. OceanDecor ya tiene CoralCluster, FishSchool y tortugas. Ambos están suficientemente coherentes — NO modificar.

- [ ] **Step 1: Actualizar import de BiomeProcedural en WorldTerrain.tsx**

Localizar `import { AcaciaTree, MangroveTree, CoralHead, SeaAnemone } from "./BiomeProcedural"` (añadido en Task 4) y expandirlo:

```tsx
import { AcaciaTree, MangroveTree, CoralHead, SeaAnemone, IcebergMesh, RuinPillar, RuinWall } from "./BiomeProcedural";
```

- [ ] **Step 2: Añadir ruinas ancestrales a JungleDecor**

Localizar `function JungleDecor()`. Justo antes del `return (`, añadir:

```tsx
  const ruins: { pos: [number, number, number]; rotY: number; lean: number }[] = [
    { pos: [-1.8, heightFn(-1.8, 0.5), 0.5], rotY: 0.4,  lean: 0.08 },
    { pos: [ 1.5, heightFn( 1.5, 1.1), 1.1], rotY: 1.8,  lean: -0.06 },
    { pos: [-0.6, heightFn(-0.6, -1.7), -1.7], rotY: 3.1, lean: 0.05 },
  ];
```

Dentro del `<group>` del return, añadir DESPUÉS de los bushes:

```tsx
      {/* Ruinas ancestrales */}
      {ruins.map((r, i) => (
        <RuinPillar key={i} position={r.pos} rotY={r.rotY} lean={r.lean} />
      ))}
      <RuinWall position={[1.8, heightFn(1.8, 0.4), 0.4]} rotY={0.7} />
      <NatureProp file="plant_bush.glb" position={[1.4, heightFn(1.4, 0.6) + 0.05, 0.6]} scale={0.35} rotationY={1.1} />
      <NatureProp file="plant_bush.glb" position={[2.1, heightFn(2.1, 0.2) + 0.05, 0.2]} scale={0.30} rotationY={2.4} />
```

- [ ] **Step 3: Reemplazar icebergs de ArcticDecor con IcebergMesh LatheGeometry**

Localizar en `ArcticDecor`:

```tsx
  const icebergs = useMemo(
    () =>
      scatter(8, LOCAL_ORIGIN, 2.1, heightFn, 0).map((p) => ({
        pos: [p.x, 0.1 + p.rand * 0.2, p.z] as [number, number, number],
        scale: 0.18 + p.rand * 0.17,
      })),
    []
  );
```

Reemplazar con (reduce count a 5, escala más visible):

```tsx
  const icebergs = useMemo(
    () =>
      scatter(5, LOCAL_ORIGIN, 2.1, heightFn, 0).map((p) => ({
        pos: [p.x, 0.05 + p.rand * 0.1, p.z] as [number, number, number],
        scale: 0.22 + p.rand * 0.20,
        rotY: p.rand * Math.PI * 2,
      })),
    []
  );
```

Localizar el bloque JSX que renderiza los icebergs:

```tsx
      {icebergs.map((ice, i) => (
        <mesh key={i} position={ice.pos} castShadow>
          <dodecahedronGeometry args={[ice.scale, 1]} />
          <meshPhysicalMaterial
            color="#dff4fb"
            transmission={0.55}
            thickness={0.8}
            roughness={0.1}
            ior={1.31}
            clearcoat={0.4}
            envMapIntensity={1.2}
          />
        </mesh>
      ))}
```

Reemplazar con:

```tsx
      {icebergs.map((ice, i) => (
        <group key={i} position={ice.pos} rotation={[0, ice.rotY, 0]}>
          <IcebergMesh scale={ice.scale} />
        </group>
      ))}
```

- [ ] **Step 4: Cambiar árboles de ForestDecor a caducifolios**

Localizar en `ForestDecor`:

```tsx
  const treeFiles = ["tree_pineRoundA.glb", "tree_pineRoundB.glb", "tree_pineRoundC.glb", "tree_pineRoundD.glb", "tree_pineTallA.glb", "tree_pineSmallA.glb"];
```

Reemplazar con:

```tsx
  const treeFiles = ["tree_oak.glb", "tree_fat.glb", "tree_detailed.glb", "tree_default.glb", "tree_oak.glb", "tree_fat.glb"];
```

Esto convierte el bosque templado de coníferas (más propio de taiga) a frondosos caducifolios.

- [ ] **Step 5: Verificar en preview**

Confirmar:
- Jungla: 3 pilares y 1 muro de ruinas visibles entre los árboles
- Ártico: 5 icebergs LatheGeometry en lugar de dodecaedros — forma más realista
- Bosque: árboles frondosos (roble, árbol gordo) en lugar de pinos

Revisar consola — sin errores nuevos.

- [ ] **Step 6: Commit**

```bash
git add src/components/3d/world/WorldTerrain.tsx src/components/3d/world/BiomeProcedural.tsx
git commit -m "feat: biome coherence — jungle ruins, arctic LatheGeometry icebergs, forest deciduous trees"
```
