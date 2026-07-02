# Biome Islands: Forma Real + Vida Ambiental

**Fecha:** 2026-07-02  
**Estado:** Aprobado

## Objetivo

Hacer que cada bioma del diorama planetario parezca una isla real emergiendo del océano, con vida ambiental animada (bandadas de pájaros, humo, niebla, aurora, distorsión de calor, cenizas) y efectos atmosféricos únicos por bioma.

## Contexto actual

- `IslandBase.tsx`: ya existe y se usa en `WorldTerrain.tsx`. Genera la geometría lateral (acantilado/tierra) debajo de cada bioma. Problema: `depth=1.8/2.5` es insuficiente — el océano está en R=9.8 y el terrain en R=10, por lo que el cuerpo de isla no sobresale claramente.
- `BiomeRegion`: PlaneGeometry 5×5 con alpha fade muy gradual (0.52→1.0). El borde es difuso y se mezcla con el océano sin definición.
- No existe ningún componente de vida ambiental (pájaros, partículas, efectos atmosféricos).

---

## Parte 1 — Forma de Isla Real

### 1.1 Profundidad de IslandBase

En `WorldTerrain.tsx`, cambiar `depth` de `IslandBase`:
- Biomas normales: `depth=4.0` (antes 1.8)
- Volcánico: `depth=4.0` (antes 2.5)

Esto hace que el cuerpo de tierra descienda claramente por debajo del nivel del océano (R=9.8), haciendo las islas visualmente sólidas.

### 1.2 Banda de playa/arena

Añadir un `TorusGeometry` fino alrededor del borde de cada bioma (excepto ocean) en `WorldTerrain.tsx`:
- Radio: `2.4`, tubo: `0.12`, segmentos: `32`
- Posición local: `[0, -0.05, 0]`, rotación: `[-Math.PI/2, 0, 0]`
- Material: `color="#d4b483"`, `roughness=0.9`, sin metalness
- Propósito: línea de playa/orilla que separa visualmente el bioma del océano

### 1.3 Borde más definido en BiomeRegion

En `BiomeRegion`, ajustar el `alphaMap` canvas gradient:
- `addColorStop(0.0, "rgba(255,255,255,1)")`
- `addColorStop(0.60, "rgba(255,255,255,1)")` (antes 0.52)
- `addColorStop(0.80, "rgba(255,255,255,0.5)")` (antes 0.78 / 0.6)
- `addColorStop(1.0, "rgba(0,0,0,0)")`

Resultado: el bioma es opaco hasta el 60% del radio y tiene una transición más corta hacia transparente.

---

## Parte 2 — Vida Ambiental

### Nuevo archivo: `BiomeAmbience.tsx`

Contiene todos los componentes de vida ambiental. Se importa en `WorldTerrain.tsx` y se renderiza dentro del grupo de cada bioma.

#### 2.1 BirdFlock

Componente que anima N pájaros en órbita elíptica alrededor del centro del bioma.

- **Geometría:** cono pequeño (`ConeGeometry(0.06, 0.18, 4)`) por cada pájaro, color configurable
- **Animación (useFrame):** cada pájaro sigue una trayectoria elíptica con `sin/cos`, inclinada en el eje X (~20°). Velocidad ligeramente diferente por índice (semilla determinista). Rotación Z oscilante para simular aleteo (`sin(t*8 + seed) * 0.4`). Inclinación lateral proporcional a la curvatura de la trayectoria.
- **Parámetros:** `count`, `orbitRadius`, `orbitHeight`, `speed`, `color`
- **Por bioma:**
  - Jungla: 7 pájaros, rojo/naranja, radio 2.5, altura 2.5
  - Bosque: 6 pájaros, marrón oscuro, radio 2.2, altura 2.2
  - Desierto: 5 pájaros, beige, radio 2.8, altura 3.0
  - Ártico: 6 pájaros, blanco, radio 2.5, altura 2.5
  - Volcánico: 4 pájaros, negro, radio 2.0, altura 4.0 (orbitan alto sobre el volcán)
  - Océano: 8 pájaros, blanco, radio 3.0, altura 2.0

#### 2.2 VolcanoSmoke

Partículas de humo del volcán. Solo en bioma `volcanic`.

- **Geometría:** 24 quads (`PlaneGeometry(0.5, 0.5)`) instanciados con `InstancedMesh`
- **Shader:** `ShaderMaterial` con `blending=AdditiveBlending`, `depthWrite=false`. Uniform `uTime`. Fragment: ruido 2D para textura de humo, fade out radial, color gris claro. Vertex: desplazamiento Y y escala crecientes según `uAge` (ciclo 0→1 de duración ~3s).
- **Animación:** cada instancia tiene `age` offset determinista (distribuido uniformemente). En `useFrame`, calcular posición Y = `age * 2.0` sobre la cima del cono, escala = `0.8 + age * 1.5`, opacidad = `sin(age * PI) * 0.6`.
- **Posición base:** `[0, 2.5, 0]` (cima del cono volcánico)

#### 2.3 AshParticles

Partículas de ceniza cayendo en espiral. Solo en bioma `volcanic`.

- **Geometría:** `Points` con 30 posiciones distribuidas en cilindro sobre el volcán
- **Shader:** `PointsMaterial` con `color="#cc6622"`, `size=0.04`, `transparent`, `opacity=0.7`
- **Animación:** cada partícula se mueve en Y decreciente y rota en XZ. Al llegar a Y=0, reinicia en la cima. Movimiento determinista por índice.

#### 2.4 JungleMist

Esfera de niebla sobre la jungla.

- **Geometría:** `SphereGeometry(2.2, 16, 16)`
- **Material:** `ShaderMaterial` custom. Fragment: ruido FBM + tiempo → color `vec3(0.2, 0.6, 0.3)` con `opacity = 0.06 + noise * 0.04`. `blending=AdditiveBlending`, `depthWrite=false`, `side=DoubleSide`.
- **Posición:** `[0, 0.5, 0]` (flota ligeramente sobre la superficie)
- **Animación:** uniform `uTime` en vertex shader desplaza el ruido suavemente

#### 2.5 ArcticAurora

Cinta de aurora boreal sobre el bioma ártico.

- **Geometría:** `PlaneGeometry(6, 1.5, 32, 8)` curvada en arco. En `useMemo`, modificar los vértices del plano para curvarlos en arco semicircular horizontal a Y=3.5 sobre la superficie.
- **Material:** `ShaderMaterial`. Fragment: UV scroll en X con `uTime * 0.2`, mezcla de colores verde `#00ff88` → violeta `#8833ff` → cyan `#00ffcc`. Opacidad sinusoidal. `blending=AdditiveBlending`, `depthWrite=false`, `side=DoubleSide`.
- **Posición:** `[0, 3.5, 0]`

#### 2.6 DesertHeatHaze

Distorsión de calor sobre el desierto.

- **Geometría:** `PlaneGeometry(4, 4, 1, 1)` horizontal
- **Material:** `ShaderMaterial`. Vertex: desplazamiento Y sinusoidal por posición X/Z + tiempo, amplitud 0.02. Fragment: completamente transparente (`gl_FragColor = vec4(0,0,0,0)`).
- **Propósito:** la ondulación del mesh distorsiona ligeramente los objetos renderizados detrás al traversar el depth buffer
- **Posición:** `[0, 0.8, 0]`

---

## Parte 3 — Más animales

Añadir en las funciones de decor de `WorldTerrain.tsx`:

- **JungleDecor:** +2 `RiggedAnimal` monkey, +1 `StaticAnimal` toucan (total: 4 monos, 4 tucanes)
- **ForestDecor:** +2 `RiggedAnimal` deer, +2 `RiggedAnimal` rabbit (total: más población del bosque)
- **ArcticDecor:** +3 `RiggedAnimal` seal en posiciones scatter
- **VolcanicDecor:** +3 `Iguana` en posiciones scatter

---

## Archivos a modificar / crear

| Archivo | Cambio |
|---|---|
| `src/components/3d/world/BiomeAmbience.tsx` | NUEVO — todos los efectos ambientales |
| `src/components/3d/world/WorldTerrain.tsx` | Importar BiomeAmbience, aumentar depth IslandBase, añadir banda de playa, afinar alpha fade, añadir animales |

## Restricciones de rendimiento

- Todos los shaders de partículas usan `blending=AdditiveBlending` y `depthWrite=false` — sin coste en el z-buffer
- BirdFlock usa geometrías primitivas (conos), no GLTFs — instanciable fácilmente
- JungleMist, ArcticAurora y DesertHeatHaze son meshes únicos (no instanciados) con shaders simples
- VolcanoSmoke usa `InstancedMesh` — un solo draw call para 24 quads
- Sin `backdrop-filter` ni CSS blur en ningún elemento (constraint del proyecto)
