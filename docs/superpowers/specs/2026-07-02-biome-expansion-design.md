# Biome Expansion + Coherence — Design Spec

**Fecha:** 2026-07-02
**Estado:** Aprobado

## Objetivo

Añadir 4 biomas nuevos al diorama planetario (sabana, pantano, taiga, arrecife) y mejorar la coherencia visual de los 5 biomas existentes que tienen elementos prometidos en su descripción pero ausentes en la escena (ruinas en jungla, pirámide en desierto, icebergs en ártico, diferenciación forestal, coral en océano).

## Contexto actual

- 6 biomas en `BIOMES` (types.ts): jungle, desert, arctic, ocean, forest, volcanic
- Cada bioma tiene: entrada en BIOMES[], HEIGHT_FN en WorldTerrain.tsx, BiomeRegion (color + alpha), función DecorXxx, entradas en BiomeAmbience/BiomeAnimals
- Esfera planeta R=10; biomas son parches en la superficie orientados con quaternion
- Modelos disponibles: pinos (tree_pine*), robles (tree_oak, tree_fat), palmas, rocas (rock_large*, rock_small*, stone_large*, cliff_*), troncos (log, log_large, log_stack), hongos (mushroom_red, mushroom_tan), flores (flower_*), hierba (grass, grass_large), cactus, stumps — todos en `/public/assets/models/nature/`
- Animales disponibles: fox, rabbit, monkey, toucan, camel, penguin, turtle — en `/public/assets/models/animals/`
- Componentes procedurales ya establecidos: VolcanoCone (LatheGeometry), CharredStump, CraterLavaPool, IslandBase

---

## Parte 1 — Biomas nuevos

### 1.1 Savanna (`savanna`)

**Posición esfera:** lat=−10°, lon=30° → `[4.9, -1.7, 8.5]`
**Color terrain:** `#c9a84c` (dorado seco)
**Color marker:** `#E8B84B`

**HEIGHT_FN:** Llanura plana con ondulaciones suaves — `0.05 + sin(x*2.1)*0.06 + sin(z*1.8)*0.05`. Sin pico central.

**DecorSavanna:**
- 8 `AcaciaTree` procedurales (ver abajo) en scatter radio 1.0–2.2
- 2 `Termite Mound` procedurales: `CylinderGeometry(0.15, 0.35, 0.8, 8)` color `#b8864e`, con pequeños salientes laterales (esferas)
- 6 rocas (`rock_largeA.glb`, `rock_largeB.glb`) dispersas, escala 0.3–0.5
- `grass_large.glb` × 10, escala 0.5–0.8
- 2 camel.glb

**AcaciaTree (procedural):**
- Tronco: `CylinderGeometry(0.04, 0.07, 0.9, 6)` color `#6b4226`
- Copa: `CylinderGeometry(0.7, 0.1, 0.15, 8)` plana, color `#4a7a2a` — la acacia tiene copa en forma de parasol, no esférica
- Posición copa: `[0, 0.95, 0]`

**BiomeAmbience:** `BirdFlock` count=6, color=`#c8a020`, radio=2.5, altura=3.0

---

### 1.2 Swamp / Manglares (`swamp`)

**Posición esfera:** lat=5°, lon=−100° → `[−9.8, 0.9, −1.7]`
**Color terrain:** `#3d5a2a` (verde oscuro fangoso)
**Color marker:** `#7BC67E`

**HEIGHT_FN:** `0.12 + sin(x*3.1+0.5)*0.08 + cos(z*2.7)*0.06` — pantano irregular con zonas bajas (agua) y montículos.

**DecorSwamp:**
- 6 `MangroveTree` procedurales (ver abajo)
- `mushroom_red.glb` × 4, `mushroom_tan.glb` × 3, escala 0.4–0.6
- `log.glb` × 3, `log_large.glb` × 2 — troncos caídos en el fango
- `stump_old.glb` × 3
- Charco central: `CircleGeometry(1.2, 16)` horizontal color `#2d3d1a`, opacidad 0.7, `rotation={[-Math.PI/2,0,0]}` en `[0, 0.01, 0]`
- 3 turtle.glb en posiciones scatter cerca del charco

**MangroveTree (procedural):**
- Tronco principal: `CylinderGeometry(0.05, 0.06, 0.7, 5)` color `#2d1f10`
- 4 raíces: `CylinderGeometry(0.02, 0.03, 0.45, 4)` inclinadas hacia afuera (rotation.z ±0.5) desde [0, 0.1, 0]
- Copa: `SphereGeometry(0.45, 8, 6)` color `#2d5a1a`, aplastada con scale `[1, 0.6, 1]`

**BiomeAmbience:** `SwampMist` — esfera `SphereGeometry(2.5, 16, 16)` con shader FBM similar a JungleMist pero color `vec3(0.2, 0.3, 0.1)`, opacidad más densa (0.10). `BirdFlock` count=4, color=`#1a3a1a`, radio=2.0, altura=1.8.

---

### 1.3 Taiga / Bosque boreal (`taiga`)

**Posición esfera:** lat=55°, lon=−40° → `[−4.1, 8.2, 3.8]`
**Color terrain:** `#e8eeee` (blanco nieve con tinte frío)
**Color marker:** `#A8D8EA`

**HEIGHT_FN:** `0.10 + abs(sin(x*2.3))*0.12 + abs(cos(z*2.1))*0.10` — colinas suaves nevadas.

**DecorTaiga:**
- 12 pinos nevados: `tree_pineTallA.glb` × 4, `tree_pineRoundA.glb` × 4, `tree_pineRoundB.glb` × 4, escala 0.5–0.8, scatter radio 0.5–2.3
- `rock_smallA.glb` × 4, `stone_smallA.glb` × 3, escala 0.3–0.5 (piedras nevadas)
- `log_stack.glb` × 2 (troncos apilados)
- 4 fox.glb, 4 rabbit.glb
- `SnowDrift` procedural × 3: `CapsuleGeometry` o `SphereGeometry(0.4, 8, 6)` muy aplastada (scale Y=0.15), color `#f0f4f8`, en base de los pinos

**BiomeAmbience:** `ArcticAurora` reciclada (ya existe — añadir a taiga también). `BirdFlock` count=5, color=`#ccddee`, radio=2.0, altura=2.5.

**Nieve en pinos:** El efecto de nieve en ramas se logra con la propia textura de los modelos tree_pine* (ya son modelos low-poly de pinos, color verde claro/nevado) combinado con SnowDrift en su base.

---

### 1.4 Arrecife / Fondo marino (`reef`)

**Posición esfera:** lat=−20°, lon=60° → `[7.5, −3.4, 5.0]`
**Color terrain:** `#ffe8a0` (arena tropical clara)
**Color marker:** `#00CED1`

**HEIGHT_FN:** Casi plano con suaves dunas de arena — `0.04 + sin(x*3.0)*0.05 + cos(z*2.5)*0.04`.

**DecorReef:**
- 8 `CoralHead` procedurales (ver abajo) en scatter radio 0.6–2.0
- `rock_smallA.glb` × 5, `ground_riverRocks.glb` × 3 (piedras marinas)
- `SeaAnemone` procedural × 5: cilindro delgado `CylinderGeometry(0.04, 0.06, 0.3, 5)` color `#cc2288` con 6 tentáculos `CylinderGeometry(0.01, 0.01, 0.18, 3)` inclinados en corona
- 3 turtle.glb

**CoralHead (procedural):**
- Rama principal: `CylinderGeometry(0.06, 0.10, 0.45, 6)` color determinista por índice — alterna entre `#ff6644`, `#ff2288`, `#ffaa22`, `#cc44ff`
- 3 ramas secundarias: `CylinderGeometry(0.04, 0.06, 0.28, 5)` inclinadas 30° hacia afuera desde la mitad del tronco
- Material: `meshStandardMaterial roughness=0.7, metalness=0.05`

**BiomeAmbience:** `FishSchool` — 20 conos instanciados `ConeGeometry(0.04, 0.14, 4)` color `#88ddff`, rotados en eje X (nariz adelante), orbitan en elipse horizontal a Y=0.8–1.5, animados en `useFrame` con desfase de fase por índice. Similar a BirdFlock pero más compactos y a baja altura.
`BirdFlock` count=7, color=`#ffffff`, radio=3.0, altura=1.8 (gaviotas).

---

## Parte 2 — Mejoras de coherencia en biomas existentes

### 2.1 Jungle — Ruinas ancestrales

Añadir a `JungleDecor`:
- 3 `RuinPillar` procedurales: `CylinderGeometry(0.18, 0.20, 1.4, 8)` color `#7a6a4a`, con capitel (`CylinderGeometry(0.22, 0.18, 0.12, 8)`) en la cima. Material `roughness=0.95`. Posiciones scatter radio 1.0–2.0, ligeramente inclinados (`rotation.z ±0.05`).
- 1 `RuinWall` procedural: `BoxGeometry(1.2, 0.8, 0.2)` color `#7a6a4a`, posición `[1.8, 0.4, 0.5]`
- `plant_bush.glb` × 4 cubriendo parcialmente las ruinas (escala 0.3–0.5)

### 2.2 Desert — Pirámide ancestral + oasis

Añadir a `DesertDecor`:
- `Pyramid` procedural: `ConeGeometry(1.2, 1.0, 4)` (cuatro caras = pirámide), color `#c8a060`, `roughness=0.9`. Posición `[0, 0.5, 0]` (centro del bioma). Rotación Y=Math.PI/4 para que las caras miren a los ejes.
- Bloque base de la pirámide: `BoxGeometry(2.0, 0.12, 2.0)` mismo color, en `[0, 0.06, 0]`
- Oasis: `CircleGeometry(0.5, 16)` color `#2a6a8a`, opacidad 0.9, en `[1.8, 0.05, 0.8]`
- `plant_bushSmall.glb` × 3 alrededor del oasis
- `cactus_tall.glb` × 2 adicionales junto a la pirámide

### 2.3 Arctic — Icebergs + pingüinos

Añadir a `ArcticDecor`:
- 2 `Iceberg` procedurales: `LatheGeometry` con perfil irregular de 6 puntos `[[0.6,0],[0.8,0.3],[0.55,0.7],[0.3,1.1],[0.15,1.5],[0.05,1.7]]`, 10 segmentos azimutales, color `#ddeeff`, `roughness=0.1, metalness=0.05`. Perturbación radial leve (amp=0.06).
- `penguin.glb` ya existe — añadir 5 en posiciones scatter

### 2.4 Forest — Diferenciación visual

Cambios en `ForestDecor`:
- Reemplazar `tree_default.glb` por `tree_oak.glb` y `tree_fat.glb` (árboles caducifolios)
- Añadir `mushroom_red.glb` × 3, `mushroom_tan.glb` × 2 (setas del suelo)
- Añadir `flower_redA.glb` × 4, `flower_yellowA.glb` × 3 (flores del sotobosque)
- Añadir `log_stack.glb` × 2, `log_large.glb` × 1 (troncos caídos)
- Mantener fox.glb y rabbit.glb existentes

### 2.5 Ocean — Coral y vida marina

Cambios en el bioma `ocean` (actualmente solo `OceanDecor` básico):
- Añadir 5 `CoralHead` (mismo componente del bioma reef — importar de donde esté definido, o definir en WorldTerrain)
- Añadir `SeaAnemone` × 4
- `rock_smallA.glb` × 6, `ground_riverRocks.glb` × 3
- `FishSchool` (mismo de reef) — el océano también tiene cardumen

---

## Archivos a crear/modificar

| Archivo | Cambio |
|---|---|
| `src/components/3d/world/types.ts` | +4 entradas en BIOMES[] (savanna, swamp, taiga, reef) |
| `src/components/3d/world/WorldTerrain.tsx` | +4 HEIGHT_FN, +4 DecorXxx functions, +4 biome-specific ambience wires, coherence fixes en JungleDecor/DesertDecor/ArcticDecor/ForestDecor/OceanDecor |
| `src/components/3d/world/BiomeAmbience.tsx` | +SwampMist, +FishSchool (nuevo componente), +AcaciaTree/MangroveTree/CoralHead/Iceberg/Pyramid/RuinPillar van en WorldTerrain inline |
| `src/components/3d/world/VolcanoCone.tsx` | Sin cambios |

**Nota de arquitectura:** Los componentes procedurales nuevos (AcaciaTree, MangroveTree, CoralHead, SeaAnemone, Iceberg, Pyramid, RuinPillar, RuinWall) se definen en `WorldTerrain.tsx` como funciones locales del módulo — siguen el patrón existente de CharredStump que está en VolcanoCone.tsx. Si el archivo crece demasiado (>600 líneas añadidas), extraer a `BiomeProcedural.tsx`.

---

## Posicionamiento en la esfera

Los 4 biomas nuevos deben ocupar posiciones no colindantes con los existentes:

| Bioma | Lat | Lon | Vector xyz |
|---|---|---|---|
| savanna | −10° | 30° | `[4.9, -1.7, 8.5]` |
| swamp | 5° | −100° | `[-9.8, 0.9, -1.7]` |
| taiga | 55° | −40° | `[-4.1, 8.2, 3.8]` |
| reef | −20° | 60° | `[7.5, -3.4, 5.0]` |

Verificar que ninguna colisiona con biomas existentes (distancia mínima en esfera > 3.5 unidades).

## Restricciones de rendimiento

- Todos los componentes procedurales nuevos: geometrías primitivas, sin GLTF, máximo 500 triángulos por bioma añadido
- FishSchool: `InstancedMesh` o `Points`, un solo draw call para los 20 peces
- SwampMist: `AdditiveBlending + depthWrite=false` — igual que JungleMist
- Sin `Math.random()` en render — seeds deterministas `Math.sin(i * seed) * 43758.5453`
- SnowDrift: geometría simple SphereGeometry aplastada, sin shader extra
