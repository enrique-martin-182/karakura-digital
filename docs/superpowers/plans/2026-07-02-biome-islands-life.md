# Biome Islands: Forma Real + Vida Ambiental — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que los biomas del diorama parezcan islas reales emergiendo del océano, con vida ambiental animada (pájaros, humo, niebla, aurora, cenizas, distorsión de calor) y más animales por bioma.

**Architecture:** Se crea un nuevo `BiomeAmbience.tsx` con todos los efectos ambientales como componentes independientes. `WorldTerrain.tsx` se modifica para aumentar la profundidad de `IslandBase`, añadir una banda de playa, afinar el alpha fade de `BiomeRegion`, renderizar `BiomeAmbience` dentro de cada grupo de bioma, y añadir más animales. No hay dependencias externas nuevas — todo usa Three.js/R3F/drei que ya están instalados.

**Tech Stack:** Three.js 0.185, React Three Fiber v9, @react-three/drei v10, React 19, Next.js 16.2.7. Sin framework de tests — la verificación es visual vía `preview_screenshot` + `preview_console_logs`.

## Global Constraints

- Sin `backdrop-filter: blur()` ni CSS `filter: blur()` en ningún elemento animado
- Animaciones de fondo: `will-change: transform`, `translate3d` para GPU compositing
- Shaders de partículas: `blending=THREE.AdditiveBlending`, `depthWrite=false`
- `"use client"` en todos los archivos de componentes 3D
- Path alias: `@/*` → `./src/*`
- Sin Math.random() en JSX/render — solo en `useMemo` con semillas deterministas
- Nombres de archivos en inglés, strings visibles al usuario en español

---

### Task 1: Island Form — IslandBase depth + beach ring + alpha fade

**Files:**
- Modify: `src/components/3d/world/WorldTerrain.tsx` (función `BiomeRegion` lines ~63-120, y `WorldTerrain` render lines ~462-493)

**Interfaces:**
- Consumes: nada nuevo
- Produces: nada que otros consuman (cambios puramente visuales)

- [ ] **Step 1: Aumentar profundidad de IslandBase**

En `WorldTerrain.tsx` línea ~482-485, cambiar:
```tsx
<IslandBase
  position={[0, 0, 0]}
  heightFn={heightFn}
  size={5}
  depth={biome.id === "volcanic" ? 2.5 : 1.8}
  seed={i}
/>
```
por:
```tsx
<IslandBase
  position={[0, 0, 0]}
  heightFn={heightFn}
  size={5}
  depth={4.0}
  seed={i}
/>
```

- [ ] **Step 2: Añadir banda de playa**

Dentro del bloque `{biome.id !== "ocean" && (...)}` en `WorldTerrain`, justo después de `<IslandBase .../>`, añadir:
```tsx
{/* Beach/shoreline ring at island edge */}
<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
  <torusGeometry args={[2.4, 0.12, 8, 32]} />
  <meshStandardMaterial color="#d4b483" roughness={0.9} metalness={0} />
</mesh>
```

- [ ] **Step 3: Afinar alpha fade de BiomeRegion**

En `BiomeRegion` (líneas ~69-76), reemplazar el bloque `grad.addColorStop`:
```tsx
grad.addColorStop(0.0, "rgba(255,255,255,1)");
grad.addColorStop(0.52, "rgba(255,255,255,1)");
grad.addColorStop(0.78, "rgba(255,255,255,0.6)");
grad.addColorStop(1.0, "rgba(0,0,0,0)");
```
por:
```tsx
grad.addColorStop(0.0,  "rgba(255,255,255,1)");
grad.addColorStop(0.60, "rgba(255,255,255,1)");
grad.addColorStop(0.80, "rgba(255,255,255,0.5)");
grad.addColorStop(1.0,  "rgba(0,0,0,0)");
```

- [ ] **Step 4: Verificar visualmente**

El servidor ya está corriendo. Confirmar en el preview:
- Las islas tienen un cuerpo visible de tierra que desciende claramente por debajo del nivel del océano
- La banda de playa es visible como un anillo arenoso en el borde de cada bioma
- El borde del bioma es más definido (menos blur entre bioma y océano)

- [ ] **Step 5: Commit**
```bash
git add src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: sharper island form — deeper IslandBase, beach ring, tighter alpha fade"
```

---

### Task 2: BirdFlock component

**Files:**
- Create: `src/components/3d/world/BiomeAmbience.tsx`

**Interfaces:**
- Consumes: nada
- Produces:
  - `BirdFlock({ count, orbitRadius, orbitHeight, speed, color }: BirdFlockProps)` — componente exportado
  - El archivo `BiomeAmbience.tsx` está listo para recibir los demás componentes en tasks posteriores

- [ ] **Step 1: Crear BiomeAmbience.tsx con BirdFlock**

Crear `src/components/3d/world/BiomeAmbience.tsx`:
```tsx
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
```

- [ ] **Step 2: Importar y probar BirdFlock en WorldTerrain.tsx**

En `WorldTerrain.tsx`, añadir al bloque de imports:
```tsx
import { BirdFlock } from "./BiomeAmbience";
```

En el render de `WorldTerrain`, dentro del grupo de cada bioma (justo antes de `{Decor && <Decor />}`), añadir:
```tsx
{/* Ambient bird flock — per-biome color and orbit */}
{biome.id === "jungle"   && <BirdFlock count={7} orbitRadius={2.5} orbitHeight={2.5} speed={0.65} color="#e05530" />}
{biome.id === "forest"   && <BirdFlock count={6} orbitRadius={2.2} orbitHeight={2.2} speed={0.55} color="#5a3a1a" />}
{biome.id === "desert"   && <BirdFlock count={5} orbitRadius={2.8} orbitHeight={3.0} speed={0.5}  color="#c8a84b" />}
{biome.id === "arctic"   && <BirdFlock count={6} orbitRadius={2.5} orbitHeight={2.5} speed={0.7}  color="#ddeeff" />}
{biome.id === "volcanic" && <BirdFlock count={4} orbitRadius={2.0} orbitHeight={4.2} speed={0.45} color="#222222" />}
{biome.id === "ocean"    && <BirdFlock count={8} orbitRadius={3.0} orbitHeight={2.0} speed={0.8}  color="#ffffff" />}
```

- [ ] **Step 3: Verificar visualmente**

Confirmar en el preview que:
- Cada bioma tiene pájaros orbitando a su alrededor
- Los pájaros aletean y se inclinan en las curvas
- No hay errores de consola

- [ ] **Step 4: Commit**
```bash
git add src/components/3d/world/BiomeAmbience.tsx src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: BirdFlock ambient animation for all biomes"
```

---

### Task 3: VolcanoSmoke + AshParticles

**Files:**
- Modify: `src/components/3d/world/BiomeAmbience.tsx` (añadir al final del archivo)
- Modify: `src/components/3d/world/WorldTerrain.tsx` (añadir en VolcanicDecor o en render)

**Interfaces:**
- Consumes: nada nuevo
- Produces:
  - `VolcanoSmoke()` — componente sin props, posicionado en origen local (colocado por el llamador)
  - `AshParticles()` — componente sin props

- [ ] **Step 1: Añadir VolcanoSmoke a BiomeAmbience.tsx**

Añadir al final de `BiomeAmbience.tsx`:
```tsx
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

  // Set all instance matrices to identity (shader handles position/scale)
  useMemo(() => {
    const dummy = new THREE.Object3D();
    dummy.updateMatrix();
    // will be set after mount via useFrame
  }, []);

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
```

- [ ] **Step 2: Añadir VolcanoSmoke y AshParticles en VolcanicDecor**

En `WorldTerrain.tsx`, en la función `VolcanicDecor`, añadir al final del `<group>` de retorno (justo antes del `</group>` de cierre):
```tsx
import { BirdFlock, VolcanoSmoke, AshParticles } from "./BiomeAmbience";
```
(actualizar el import existente de BiomeAmbience)

Y dentro de `VolcanicDecor` al final:
```tsx
<VolcanoSmoke />
<AshParticles />
```

- [ ] **Step 3: Verificar visualmente**

Confirmar en el preview:
- Humo gris/blanco sube desde la cima del volcán en loop continuo
- Partículas naranja se ven cayendo en espiral sobre el volcán
- No hay errores de consola

- [ ] **Step 4: Commit**
```bash
git add src/components/3d/world/BiomeAmbience.tsx src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: volcano smoke particles and ash rain"
```

---

### Task 4: JungleMist + DesertHeatHaze

**Files:**
- Modify: `src/components/3d/world/BiomeAmbience.tsx`
- Modify: `src/components/3d/world/WorldTerrain.tsx`

**Interfaces:**
- Consumes: nada nuevo
- Produces:
  - `JungleMist()` — componente sin props
  - `DesertHeatHaze()` — componente sin props

- [ ] **Step 1: Añadir JungleMist a BiomeAmbience.tsx**

Añadir al final de `BiomeAmbience.tsx`:
```tsx
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
```

- [ ] **Step 2: Añadir en las funciones de decor correspondientes**

En `WorldTerrain.tsx`, actualizar el import:
```tsx
import { BirdFlock, VolcanoSmoke, AshParticles, JungleMist, DesertHeatHaze } from "./BiomeAmbience";
```

En `JungleDecor`, al final del `<group>` de retorno:
```tsx
<JungleMist />
```

En `DesertDecor`, al final del `<group>` de retorno:
```tsx
<DesertHeatHaze />
```

- [ ] **Step 3: Verificar visualmente**

Confirmar en el preview:
- Jungla: esfera de niebla verde translúcida sobre la superficie
- Desierto: sutil ondulación en el plano sobre la arena (puede ser difícil de ver, es intencionalmente sutil)
- No hay errores de consola

- [ ] **Step 4: Commit**
```bash
git add src/components/3d/world/BiomeAmbience.tsx src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: jungle mist and desert heat haze shaders"
```

---

### Task 5: ArcticAurora

**Files:**
- Modify: `src/components/3d/world/BiomeAmbience.tsx`
- Modify: `src/components/3d/world/WorldTerrain.tsx`

**Interfaces:**
- Consumes: nada nuevo
- Produces:
  - `ArcticAurora()` — componente sin props

- [ ] **Step 1: Añadir ArcticAurora a BiomeAmbience.tsx**

Añadir al final de `BiomeAmbience.tsx`:
```tsx
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
```

- [ ] **Step 2: Añadir en ArcticDecor**

En `WorldTerrain.tsx`, actualizar el import:
```tsx
import { BirdFlock, VolcanoSmoke, AshParticles, JungleMist, DesertHeatHaze, ArcticAurora } from "./BiomeAmbience";
```

En `ArcticDecor`, al final del `<group>` de retorno:
```tsx
<ArcticAurora />
```

- [ ] **Step 3: Verificar visualmente**

Confirmar en el preview:
- Ártico: cinta curva de aurora verde/violeta/cyan sobre el bioma, animándose suavemente
- No hay errores de consola

- [ ] **Step 4: Commit**
```bash
git add src/components/3d/world/BiomeAmbience.tsx src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: arctic aurora ribbon shader"
```

---

### Task 6: Más animales por bioma

**Files:**
- Modify: `src/components/3d/world/WorldTerrain.tsx`

**Interfaces:**
- Consumes: `RiggedAnimal`, `StaticAnimal` (ya importados), `Iguana`, `Seal` (ya importados)
- Produces: nada nuevo para otros componentes

- [ ] **Step 1: Añadir animales en JungleDecor**

En `JungleDecor`, el bloque de animales actualmente tiene:
```tsx
<StaticAnimal file="toucan.glb" position={[1.0, 1.0, -0.4]} ... />
<StaticAnimal file="toucan.glb" position={[-0.7, 1.2, 0.9]} ... />
<StaticAnimal file="toucan.glb" position={[1.6, 0.8, 1.1]} ... />
<RiggedAnimal file="monkey.glb" ... position={[1.2, 0.8, -0.6]} ... />
<RiggedAnimal file="monkey.glb" ... position={[-0.4, 0.6, -1.1]} ... />
```

Añadir después:
```tsx
<StaticAnimal file="toucan.glb" position={[-1.3, 0.9, 0.4]} scale={0.44} rotationY={1.8} bobSpeed={1.5} />
<RiggedAnimal file="monkey.glb" animationMatch="idle" position={[0.6, 1.1, 1.3]} scale={0.21} rotationY={3.2} />
<RiggedAnimal file="monkey.glb" animationMatch="idle" position={[-1.0, 0.7, -0.8]} scale={0.23} rotationY={0.9} />
```

- [ ] **Step 2: Añadir animales en ArcticDecor**

Buscar el bloque de animales en `ArcticDecor`. Actualmente tiene focas y similares. Añadir más focas:
```tsx
<Seal position={[-1.8, 0.08, 0.5]} rotationY={2.1} />
<Seal position={[0.6, 0.08, -1.9]} rotationY={0.3} />
<Seal position={[-0.3, 0.08, 1.6]} rotationY={4.5} />
```

- [ ] **Step 3: Añadir más iguanas en VolcanicDecor**

En `VolcanicDecor`, el bloque de iguanas actualmente tiene 3. Añadir:
```tsx
<Iguana position={[0.9, 0.07, 1.9]} />
<Iguana position={[2.3, 0.07, 0.8]} />
<Iguana position={[1.2, 0.07, 0.3]} />
```

- [ ] **Step 4: Añadir animales en ForestDecor**

En `ForestDecor`, añadir al final del `<group>`:
```tsx
<RiggedAnimal file="deer.glb" animationMatch="idle" position={[-1.3, 0.24, 0.7]} scale={0.22} rotationY={2.8} />
<RiggedAnimal file="deer.glb" animationMatch="idle" position={[0.4, 0.24, -1.5]} scale={0.20} rotationY={1.1} />
<RiggedAnimal file="rabbit.glb" animationMatch="sitting_idle" position={[1.4, 0.2, 0.9]} scale={0.16} rotationY={3.7} />
<RiggedAnimal file="rabbit.glb" animationMatch="idle" position={[-0.8, 0.2, -0.6]} scale={0.17} rotationY={0.2} />
```

- [ ] **Step 5: Verificar visualmente**

Confirmar en el preview:
- Jungla tiene más toucanes y monos visibles
- Ártico tiene más focas
- Volcán tiene más iguanas en posiciones naturales
- Bosque tiene ciervos y conejos adicionales
- No hay errores de consola

- [ ] **Step 6: Commit final**
```bash
git add src/components/3d/world/WorldTerrain.tsx
git commit -m "feat: more animals per biome — jungle, arctic, volcanic, forest"
```
