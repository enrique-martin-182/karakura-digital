# Volcanic Biome Overhaul — Design Spec

**Fecha:** 2026-07-02  
**Estado:** Aprobado

## Objetivo

Transformar el bioma volcánico del diorama planetario en un volcán creíble y dramático: geometría de volcán real (no un cono uniforme), ríos de lava, pool de lava en el cráter, iluminación naranja dinámica, chispas balísticas, halo de resplandor, y coherencia visual (sin palmeras — tocones carbonizados en su lugar).

## Contexto actual

- `VolcanicDecor` en `WorldTerrain.tsx`: cono simple `ConeGeometry(1.5, 2.4, 16)`, una esfera de lava en la cima, un cilindro de lava stream, 6 palmeras (incongruentes), 6 iguanas, 3 cangrejos
- `LavaMaterial` en `LavaMaterial.tsx`: ya existe, shader de lava animado — reutilizar
- `BiomeAmbience.tsx`: ya tiene `VolcanoSmoke` y `AshParticles` — conservar sin cambios
- `HEIGHT_FN.volcanic`: cono procedural centrado — la geometría nueva debe seguir este mismo perfil

---

## Sección 1 — Geometría del volcán (`VolcanoCone`)

### Componente nuevo: `VolcanoCone`

Ubicación: `src/components/3d/world/VolcanoCone.tsx` (archivo propio por complejidad).

**Geometría base:** `THREE.LatheGeometry` con perfil radial de 12 puntos que define la silueta del volcán:

```
Puntos [radio, y] del perfil (de base a cráter):
[1.80, 0.00]  — base exterior
[1.65, 0.15]  — arranque de ladera
[1.30, 0.50]  — ladera media-baja
[0.95, 0.90]  — ladera media
[0.70, 1.35]  — ladera alta
[0.52, 1.75]  — hombros
[0.45, 2.10]  — cuello
[0.50, 2.25]  — reborde exterior del cráter
[0.35, 2.30]  — labio interior del cráter
[0.25, 2.20]  — pared interior del cráter
```

Segmentos azimutales: 24.

**Perturbación de vértices:** Después de generar la LatheGeometry, iterar sobre `positions` y añadir noise radial: `r += sin(angle * freq + phase) * amp` donde `freq` y `phase` varían por anillo de altura (más irregularidad a media ladera, menos en base y cráter). Amplitud máxima: 0.12 en la zona media.

**Vertex colors:** Transición por altura normalizada (0=base, 1=cráter):
- 0.0–0.3: basalto oscuro `#1a1209`
- 0.3–0.7: roca volcánica `#2d1608`
- 0.7–1.0: roca candente `#5a1a08`

**Material:** `meshStandardMaterial` con `vertexColors`, `roughness=0.85`, `metalness=0.05`.

### Ríos de lava

3 `PlaneGeometry(0.18, 2.2, 1, 12)` con `LavaMaterial`. Posicionados en la ladera a Y≈0.8, angulados para seguir la pendiente (rotation.x ≈ -PI/3), separados 120° entre sí (rotations Y: 0, 2π/3, 4π/3). Cada uno ligeramente offset radial: `position = [sin(angle)*0.7, 0.9, cos(angle)*0.7]`.

---

## Sección 2 — Interior del cráter + iluminación dinámica

### Pool de lava en el cráter

`CircleGeometry(0.45, 24)` con shader custom (similar a LavaMaterial pero adaptado a UV circulares):
- FBM noise en UV + tiempo → mezcla de colores: `#ff2200`, `#ff6600`, `#ffaa00`
- Pulso de brillo: `emissiveIntensity = 2.0 + sin(t * 1.8) * 0.8`
- `toneMapped={false}`

Posición: `[0, 2.28, 0]` (en el fondo del cráter), `rotation={[-Math.PI/2, 0, 0]}`.

### PointLight naranja

```tsx
<pointLight
  position={[0, 3.2, 0]}
  intensity={4}
  color="#ff5500"
  distance={14}
  decay={2}
  castShadow={false}
/>
```

### Halo de resplandor ambiental

`SphereGeometry(3.5, 16, 16)` con `ShaderMaterial`:
- Fragment: color `#ff3300`, opacity `= (1.0 - dist/3.5) * 0.10` donde `dist = length(vPos)`
- `AdditiveBlending`, `depthWrite={false}`, `side=BackSide`

---

## Sección 3 — Chispas balísticas del cráter

### `CraterSparks` (en `BiomeAmbience.tsx`)

40 partículas con shader de trayectoria balística:

**Datos por partícula (en buffers Float32Array, calculados en `useMemo`):**
- `aV0`: velocidad inicial Y (0.8–1.8, determinista por semilla)
- `aVx`, `aVz`: velocidad lateral inicial (-0.4 a 0.4)
- `aOffset`: phase offset 0→1 (distribuido uniformemente)
- `aLifetime`: duración del ciclo (1.5–2.5s)

**Vertex shader:**
```glsl
uniform float uTime;
attribute float aOffset;
attribute float aV0;
attribute float aVx;
attribute float aVz;
attribute float aLifetime;

void main() {
  float t = mod(uTime * 0.8 + aOffset * aLifetime, aLifetime);
  float g = 2.5; // gravedad local
  float x = aVx * t;
  float y = aV0 * t - 0.5 * g * t * t;
  float z = aVz * t;
  float alive = step(0.0, y); // desaparece al tocar suelo
  vec3 pos = vec3(x, y + 2.3, z) * alive;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (1.0 - t / aLifetime) * 4.0;
}
```

**Fragment shader:** color `#ffaa22` con fade: `alpha = 1.0 - t/lifetime`. `AdditiveBlending`, `depthWrite={false}`.

---

## Sección 4 — Coherencia visual

### Quitar palmeras

Eliminar el bloque `{[0,1,2,3,4,5].map(...PhysicsNatureTree palm...)}` de `VolcanicDecor`.

### Tocones carbonizados (`CharredStump`)

Componente nuevo en `VolcanoCone.tsx` (o inline en WorldTerrain). Geometría procedural pura, sin GLTF:

- **Tronco:** `CylinderGeometry(0.055, 0.075, 0.55, 6)` — material `#171210`, `roughness=0.95`
- **Rama A:** `CylinderGeometry(0.025, 0.035, 0.3, 5)` rotada ~45° hacia arriba y lateral
- **Rama B:** `CylinderGeometry(0.02, 0.03, 0.22, 5)` rotada hacia el otro lado

5 tocones en posiciones scatter deterministas alrededor del bioma (radio 1.2–2.0).

---

## Archivos a crear/modificar

| Archivo | Cambio |
|---|---|
| `src/components/3d/world/VolcanoCone.tsx` | NUEVO — VolcanoCone, CharredStump, CraterLavaPool |
| `src/components/3d/world/BiomeAmbience.tsx` | Añadir CraterSparks al final |
| `src/components/3d/world/WorldTerrain.tsx` | VolcanicDecor: importar y usar nuevos componentes, quitar palmeras |

## Restricciones de rendimiento

- `VolcanoCone` LatheGeometry con 24 segmentos: ~240 triángulos — negligible
- `CraterSparks`: 40 puntos con `Points` — un solo draw call
- `PointLight` sin sombras (`castShadow={false}`) — sin coste de shadow map
- Halo: esfera de 16×16 segmentos con shader simple — negligible
- Sin `backdrop-filter`, sin CSS blur
