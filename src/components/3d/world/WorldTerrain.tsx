"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BIOMES, type BiomeData, type ViewState } from "./types";
import { Scorpion, Seal, FishSchool, Iguana, Crab } from "./BiomeAnimals";
import { CoralCluster, useCoralCluster } from "./InstancedDecor";
import { LavaMaterial } from "./LavaMaterial";
import { RiggedAnimal, StaticAnimal } from "./GLTFAnimal";
import { NatureTree, NatureProp, GrassField, useGrassField } from "./NatureProp";
import { IslandBase } from "./IslandBase";
import { BirdFlock, VolcanoSmoke, AshParticles, JungleMist, DesertHeatHaze, ArcticAurora, CraterSparks, SwampMist } from "./BiomeAmbience";
import { AcaciaTree, MangroveTree, CoralHead, SeaAnemone, IcebergMesh, RuinPillar, RuinWall } from "./BiomeProcedural";
import { VolcanoCone, CraterLavaPool, VolcanoGlow, CharredStump } from "./VolcanoCone";

// Physics removed for performance — heightFn is accepted but ignored (was used for collider placement)
type WithHeightFn<T> = T & { heightFn?: (x: number, z: number) => number };
function PhysicsNatureProp({ heightFn: _h, ...props }: WithHeightFn<React.ComponentProps<typeof NatureProp>>) { return <NatureProp {...props} />; }
function PhysicsNatureTree({ heightFn: _h, ...props }: WithHeightFn<React.ComponentProps<typeof NatureTree>>) { return <NatureTree {...props} />; }
function BiomeTerrainCollider(_: { biomeId: string }) { return null; }

// Terrain height functions — mirror BiomeRegion's vertex displacement so real props sit on the
// ground instead of floating or clipping into the hills. All coordinates are LOCAL to the biome
// group: (0,0) = center of the biome tile, axes are tangent to the sphere surface.
// Heights are scaled down relative to the old flat-island layout so terrain bumps are
// proportional to the planet (R=10). Max height ≈1.5 units = 15% radial extension.
// Exported so PhysicsWorld.tsx can build matching HeightfieldColliders.
export const HEIGHT_FN: Record<string, (x: number, z: number) => number> = {
  jungle: (x, z) => Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.55 + Math.sin(x * 1.5 + z) * 0.18,
  desert: (x, z) => Math.abs(Math.sin(x * 0.4 + z * 0.3)) * 0.8 + Math.sin(x * 0.2) * 0.22,
  arctic: (x, z) => Math.cos(x * 0.5) * Math.sin(z * 0.4) * 0.35,
  ocean: (x, z) => Math.sin(x * 0.6 + z * 0.5) * 0.1,
  forest: (x, z) => Math.sin(x * 0.5) * Math.cos(z * 0.7) * 0.45 + Math.sin(x * 1.2) * 0.14,
  volcanic: (x, z) => Math.max(0, 1.5 - Math.sqrt(x * x + z * z) * 0.6) + Math.sin(x * 0.8) * 0.14,
  savanna: (x, z) => 0.05 + Math.sin(x * 2.1) * 0.06 + Math.sin(z * 1.8) * 0.05,
  swamp:   (x, z) => 0.12 + Math.sin(x * 3.1 + 0.5) * 0.08 + Math.cos(z * 2.7) * 0.06,
  taiga:   (x, z) => 0.10 + Math.abs(Math.sin(x * 2.3)) * 0.12 + Math.abs(Math.cos(z * 2.1)) * 0.10,
  reef:    (x, z) => 0.04 + Math.sin(x * 3.0) * 0.05 + Math.cos(z * 2.5) * 0.04,
};

// LOCAL_ORIGIN used as the scatter center in all decor functions. scatter() offsets from this
// so all returned positions are in biome-local space (centered around 0,0,0).
const LOCAL_ORIGIN: [number, number, number] = [0, 0, 0];

// Deterministic pseudo-random scatter within a radius. Returns positions in the same space
// as origin — all decor functions now pass LOCAL_ORIGIN so results are biome-local.
function scatter(
  count: number,
  origin: [number, number, number],
  spread: number,
  heightFn: (x: number, z: number) => number,
  seedOffset = 0,
  minRadius = 0
) {
  const [bx, , bz] = origin;
  return Array.from({ length: count }).map((_, i) => {
    const a = Math.sin((i + seedOffset) * 12.9898) * 43758.5453;
    const b = Math.sin((i + seedOffset) * 78.233) * 12345.678;
    const angle = (a - Math.floor(a)) * Math.PI * 2;
    const r = minRadius + (b - Math.floor(b)) * (spread - minRadius);
    const x = bx + Math.cos(angle) * r;
    const z = bz + Math.sin(angle) * r;
    return { x, z, y: heightFn(x - bx, z - bz), rand: b - Math.floor(b) };
  });
}

export { blobSeedFor, blobRadiusNorm, ISLAND_HALF } from "./blobUtils";
import { blobSeedFor, blobRadiusNorm, ISLAND_HALF } from "./blobUtils";

// BiomeRegion renders at local (0,0,0) inside its biome group. The group's position and
// quaternion (computed in WorldTerrain) place it on the sphere surface with correct orientation.
function BiomeRegion({ color, id }: { color: string; id: string }) {
  const alphaMap = useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const cx = size / 2;
    const seed = blobSeedFor(id);
    const imageData = ctx.createImageData(size, size);
    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        const nx = (px - cx) / cx;
        const ny = (py - cx) / cx;
        const angle = Math.atan2(ny, nx);
        const dist = Math.sqrt(nx * nx + ny * ny);
        const br = blobRadiusNorm(angle, seed);
        const t = (dist - br) / 0.22;
        const alpha = t < 0 ? 255 : t > 1 ? 0 : Math.round(255 * (1 - t * t * (3 - 2 * t)));
        const idx = (py * size + px) * 4;
        imageData.data[idx]     = 255;
        imageData.data[idx + 1] = 255;
        imageData.data[idx + 2] = 255;
        imageData.data[idx + 3] = alpha;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(canvas);
  }, [id]);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(6, 6, 48, 48);
    const pos = geo.attributes.position;
    const col = new Float32Array(pos.count * 3);
    const base = new THREE.Color(color);
    const dark = new THREE.Color(color).multiplyScalar(0.72);
    const sand = new THREE.Color("#c8aa6e");
    const temp = new THREE.Color();
    const heightFn = HEIGHT_FN[id];
    const blobSeed = blobSeedFor(id);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);
      const arcticNoise = (Math.sin(i * 127.1 + x * 311.7 + z * 74.7) * 43758.5453) % 1;
      const height = heightFn(x, z) + (id === "arctic" ? Math.abs(arcticNoise) * 0.15 : 0);

      pos.setZ(i, height);

      const noise = Math.sin(x * 3.1 + z * 2.7) * 0.5 + 0.5;
      temp.lerpColors(dark, base, noise * 0.6 + 0.45);
      if (height > 1.5) temp.lerp(new THREE.Color("#ffffff"), (height - 1.5) * 0.22);

      // Sandy shore: blend toward sand color near the blob edge
      const dist = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);
      const edgeR = blobRadiusNorm(angle, blobSeed) * ISLAND_HALF;
      const beachT = Math.max(0, 1 - Math.abs(dist - edgeR) / 0.55);
      if (beachT > 0) temp.lerp(sand, beachT * 0.85);

      col[i * 3] = temp.r;
      col[i * 3 + 1] = temp.g;
      col[i * 3 + 2] = temp.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    geo.computeVertexNormals();
    return geo;
  }, [color, id]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow userData={{ biomeId: id }}>
      <meshStandardMaterial
        vertexColors
        roughness={0.7}
        metalness={0.02}
        transparent
        alphaMap={alphaMap}
        alphaTest={0.01}
      />
    </mesh>
  );
}


function JungleDecor() {
  const heightFn = HEIGHT_FN.jungle;

  const treeFiles = ["tree_detailed.glb", "tree_oak.glb", "tree_default.glb", "tree_fat.glb", "tree_cone.glb"];
  const trees = useMemo(
    () => scatter(22, LOCAL_ORIGIN, 2.20, heightFn, 0).map((p, i) => ({ ...p, file: treeFiles[i % treeFiles.length], scale: 0.5 + p.rand * 0.35, rot: p.rand * Math.PI * 4 })),
    []
  );
  const rockFiles = ["rock_smallA.glb", "rock_smallB.glb", "rock_smallC.glb", "rock_smallD.glb", "rock_largeA.glb", "rock_largeB.glb"];
  const rocks = useMemo(
    () => scatter(10, LOCAL_ORIGIN, 2.20, heightFn, 50).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], scale: 0.45 + p.rand * 0.4, rot: p.rand * Math.PI * 4 })),
    []
  );
  const flowerFiles = ["flower_yellowA.glb", "flower_redA.glb", "flower_purpleA.glb", "flower_purpleB.glb", "flower_redB.glb"];
  const flowers = useMemo(
    () => scatter(16, LOCAL_ORIGIN, 2.00, heightFn, 100).map((p, i) => ({ ...p, file: flowerFiles[i % flowerFiles.length] })),
    []
  );
  const bushes = useMemo(
    () => scatter(8, LOCAL_ORIGIN, 2.10, heightFn, 150).map((p, i) => ({ ...p, file: i % 2 === 0 ? "plant_bush.glb" : "plant_bushLarge.glb" })),
    []
  );
  const grass = useGrassField(70, LOCAL_ORIGIN, 2.20, heightFn);

  const ruins = useMemo(() => [
    { pos: [-1.8, heightFn(-1.8, 0.5), 0.5]   as [number,number,number], rotY: 0.4,  lean: 0.08  },
    { pos: [ 1.5, heightFn( 1.5, 1.1), 1.1]   as [number,number,number], rotY: 1.8,  lean: -0.06 },
    { pos: [-0.6, heightFn(-0.6, -1.7), -1.7] as [number,number,number], rotY: 3.1,  lean: 0.05  },
  ], []);

  return (
    <group>
      {trees.map((t, i) => (
        <PhysicsNatureTree key={i} file={t.file} position={[t.x, t.y, t.z]} scale={t.scale} rotationY={t.rot} heightFn={heightFn} />
      ))}
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={r.scale} rotationY={r.rot} heightFn={heightFn} />
      ))}
      {flowers.map((f, i) => (
        <PhysicsNatureProp key={i} file={f.file} position={[f.x, f.y, f.z]} scale={0.6 + f.rand * 0.3} heightFn={heightFn} />
      ))}
      {bushes.map((b, i) => (
        <PhysicsNatureProp key={i} file={b.file} position={[b.x, b.y, b.z]} scale={0.6 + b.rand * 0.3} rotationY={b.rand * Math.PI * 4} heightFn={heightFn} />
      ))}
      <GrassField blades={grass} />
      {/* Ruinas ancestrales */}
      {ruins.map((r, i) => (
        <RuinPillar key={i} position={r.pos} rotY={r.rotY} lean={r.lean} />
      ))}
      <RuinWall position={[1.8, heightFn(1.8, 0.4), 0.4]} rotY={0.7} />
      <NatureProp file="plant_bush.glb" position={[1.4, heightFn(1.4, 0.6) + 0.05, 0.6]} scale={0.35} rotationY={1.1} />
      <NatureProp file="plant_bush.glb" position={[2.94, heightFn(2.94, 0.28) + 0.05, 0.28]} scale={0.30} rotationY={2.4} />
      <NatureProp file="path_stone.glb" position={[-0.5, heightFn(-0.5, 1) + 0.01, 1]} scale={0.7} rotationY={0.5} />
      <NatureProp file="path_stoneCorner.glb" position={[0.2, heightFn(0.2, 0.4) + 0.01, 0.4]} scale={0.7} rotationY={1.2} />
      <StaticAnimal file="toucan.glb" position={[1.0, 1.0, -0.4]} scale={0.5} rotationY={0.6} bobSpeed={1.6} />
      <StaticAnimal file="toucan.glb" position={[-0.7, 1.2, 0.9]} scale={0.42} rotationY={-1.2} bobSpeed={1.4} />
      <StaticAnimal file="toucan.glb" position={[1.6, 0.8, 1.1]} scale={0.46} rotationY={2.1} bobSpeed={1.8} />
      <RiggedAnimal file="monkey.glb" animationMatch="idle" position={[1.2, 0.8, -0.6]} scale={0.22} rotationY={2.4} />
      <RiggedAnimal file="monkey.glb" animationMatch="idle" position={[-0.4, 0.6, -1.1]} scale={0.2} rotationY={0.4} />
      <StaticAnimal file="toucan.glb" position={[-1.3, 0.9, 0.4]} scale={0.44} rotationY={1.8} bobSpeed={1.5} />
      <RiggedAnimal file="monkey.glb" animationMatch="idle" position={[0.6, 1.1, 1.3]} scale={0.21} rotationY={3.2} />
      <RiggedAnimal file="monkey.glb" animationMatch="idle" position={[-1.0, 0.7, -0.8]} scale={0.23} rotationY={0.9} />
      <JungleMist />
    </group>
  );
}

function DesertDecor() {
  const heightFn = HEIGHT_FN.desert;

  const rockFiles = ["rock_tallA.glb", "stone_largeA.glb", "stone_largeB.glb", "cliff_rock.glb", "cliff_large_rock.glb"];
  const rocks = useMemo(
    () => scatter(11, LOCAL_ORIGIN, 2.20, heightFn, 0).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], scale: 0.45 + p.rand * 0.45, rot: p.rand * Math.PI * 4 })),
    []
  );
  const cacti = useMemo(
    () => scatter(6, LOCAL_ORIGIN, 2.00, heightFn, 60).map((p, i) => ({ ...p, file: i % 2 === 0 ? "cactus_tall.glb" : "cactus_short.glb", scale: 0.5 + p.rand * 0.3, rot: p.rand * Math.PI * 4 })),
    []
  );

  return (
    <group>
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={r.scale} rotationY={r.rot} heightFn={heightFn} />
      ))}
      {cacti.map((c, i) => (
        <PhysicsNatureTree key={i} file={c.file} position={[c.x, c.y, c.z]} scale={c.scale} rotationY={c.rot} heightFn={heightFn} />
      ))}
      <mesh position={[0, 0.9, 0]} castShadow>
        <coneGeometry args={[1.2, 1.8, 4]} />
        <meshStandardMaterial color="#d4a84a" flatShading />
      </mesh>
      <mesh position={[-1.6, 0.3, -0.9]} castShadow rotation={[0, 0.6, 0]}>
        <coneGeometry args={[0.4, 0.7, 4]} />
        <meshStandardMaterial color="#c89a4a" flatShading />
      </mesh>
      <mesh position={[1.2, 0.02, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 24]} />
        <meshPhysicalMaterial color="#2a6a8a" transparent opacity={0.75} roughness={0.15} clearcoat={0.6} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = 1.2 + Math.cos(angle) * 0.8;
        const z = 1.2 + Math.sin(angle) * 0.8;
        const seed = Math.sin(i * 127.1) * 0.5 + 0.5;
        return (
          <PhysicsNatureTree
            key={i}
            file={i % 2 === 0 ? "tree_palmTall.glb" : "tree_palmDetailedShort.glb"}
            position={[x, heightFn(x, z), z]}
            scale={0.55 + seed * 0.2}
            rotationY={seed * Math.PI * 2}
            heightFn={heightFn}
          />
        );
      })}
      <StaticAnimal file="camel.glb" position={[-1.2, 0.45, 0.6]} scale={0.0026} rotationY={0.8} bobAmount={0.02} bobSpeed={0.9} />
      <StaticAnimal file="camel.glb" position={[-0.8, 0.42, 1.0]} scale={0.0022} rotationY={-0.4} bobAmount={0.02} bobSpeed={0.85} />
      <Scorpion position={[0.4, 0.55, -0.7]} />
      <Scorpion position={[-0.3, 0.55, -1.4]} />
      <DesertHeatHaze />
    </group>
  );
}

function ArcticDecor() {
  const heightFn = HEIGHT_FN.arctic;
  const icebergs = useMemo(
    () =>
      scatter(5, LOCAL_ORIGIN, 2.10, heightFn, 5).map((p) => ({
        pos: [p.x, 0.05 + p.rand * 0.1, p.z] as [number, number, number],
        scale: 0.22 + p.rand * 0.20,
        rotY: p.rand * Math.PI * 2,
      })),
    []
  );
  const rockFiles = ["rock_smallC.glb", "rock_smallD.glb", "stone_smallA.glb", "stone_smallB.glb", "stone_smallC.glb"];
  const rocks = useMemo(
    () => scatter(9, LOCAL_ORIGIN, 2.20, heightFn, 80).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], rot: p.rand * Math.PI * 4 })),
    []
  );

  return (
    <group>
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={0.35 + r.rand * 0.25} rotationY={r.rot} heightFn={heightFn} />
      ))}
      {icebergs.map((ice, i) => (
        <group key={i} position={ice.pos} rotation={[0, ice.rotY, 0]}>
          <IcebergMesh scale={ice.scale} />
        </group>
      ))}
      <group position={[1, 0.4, 1]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.4, 0.5]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <coneGeometry args={[0.5, 0.3, 8]} />
          <meshStandardMaterial color="#cc3333" roughness={0.7} />
        </mesh>
      </group>
      <mesh position={[1.8, 0.15, 0.7]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#a8a8a8" roughness={0.8} />
      </mesh>
      <Seal position={[-0.9, 0.2, -0.6]} />
      <Seal position={[-0.55, 0.22, -1.0]} />
      <Seal position={[0.25, 0.2, -1.4]} />
      <Seal position={[-1.8, 0.08, 0.5]} rotationY={2.1} />
      <Seal position={[0.6, 0.08, -1.9]} rotationY={0.3} />
      <Seal position={[-0.3, 0.08, 1.6]} rotationY={4.5} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <StaticAnimal
          key={i}
          file="penguin.glb"
          position={[-1.4 + i * 0.28, 0.2, 1.2 + (i % 2) * 0.2]}
          scale={0.0014}
          rotationY={i * 0.9}
          bobSpeed={2 + i * 0.3}
          bobAmount={0.025}
        />
      ))}
      <ArcticAurora />
    </group>
  );
}

function OceanDecor() {
  const heightFn = HEIGHT_FN.ocean;
  const corals = useCoralCluster(28, LOCAL_ORIGIN, 2.94);
  const rockFiles = ["rock_largeA.glb", "rock_largeB.glb", "rock_largeC.glb", "rock_largeD.glb"];
  const reefRocks = useMemo(
    () => scatter(8, LOCAL_ORIGIN, 2.00, heightFn, 0).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], rot: p.rand * Math.PI * 4 })),
    []
  );
  const kelp = useGrassField(50, LOCAL_ORIGIN, 2.10, heightFn);

  return (
    <group>
      <CoralCluster corals={corals} y={0.2} />
      <GrassField blades={kelp.map((k) => ({ ...k, y: k.y + 0.5, scale: k.scale * 2.2 }))} file="grass_large.glb" />
      {reefRocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y + 0.2, r.z]} scale={0.4 + r.rand * 0.35} rotationY={r.rot} heightFn={heightFn} />
      ))}
      <StaticAnimal file="turtle.glb" position={[0.6, 0.25, -0.6]} scale={0.022} rotationY={1.1} bobAmount={0.06} bobSpeed={0.7} />
      <StaticAnimal file="turtle.glb" position={[-0.9, 0.2, -0.3]} scale={0.018} rotationY={-0.6} bobAmount={0.06} bobSpeed={0.6} />
      <StaticAnimal file="turtle.glb" position={[1.3, 0.15, 1.0]} scale={0.016} rotationY={2.3} bobAmount={0.06} bobSpeed={0.5} />
      <FishSchool center={[0.3, 0.5, 0.3]} count={14} />
      <FishSchool center={[-1.1, 0.4, -1.1]} count={10} />
      <FishSchool center={[1.2, 0.55, -0.9]} count={8} />
      <group position={[-1.2, 0.2, 1.2]} rotation={[0, 0.5, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.2, 0.7]} />
          <meshStandardMaterial color="#5a4a30" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
          <meshStandardMaterial color="#4a3a20" roughness={0.85} />
        </mesh>
      </group>
      <NatureProp file="log.glb" position={[-1.6, 0.15, 0.9]} scale={0.5} rotationY={1.3} />
    </group>
  );
}

function ForestDecor() {
  const heightFn = HEIGHT_FN.forest;

  const treeFiles = ["tree_oak.glb", "tree_fat.glb", "tree_detailed.glb", "tree_default.glb", "tree_oak.glb", "tree_fat.glb"];
  const trees = useMemo(
    () => scatter(22, LOCAL_ORIGIN, 2.20, heightFn, 0).map((p, i) => ({ ...p, file: treeFiles[i % treeFiles.length], scale: 0.5 + p.rand * 0.35, rot: p.rand * Math.PI * 4 })),
    []
  );
  const clutterFiles = ["mushroom_redGroup.glb", "stump_round.glb", "stump_old.glb", "mushroom_tan.glb", "mushroom_red.glb", "log.glb"];
  const clutter = useMemo(
    () => scatter(12, LOCAL_ORIGIN, 2.00, heightFn, 100).map((p, i) => ({ ...p, file: clutterFiles[i % clutterFiles.length], rot: p.rand * Math.PI * 4 })),
    []
  );
  const bushes = useMemo(
    () => scatter(7, LOCAL_ORIGIN, 2.10, heightFn, 200).map((p, i) => ({ ...p, file: i % 2 === 0 ? "plant_bushSmall.glb" : "plant_bushTriangle.glb" })),
    []
  );
  const grass = useGrassField(70, LOCAL_ORIGIN, 2.20, heightFn);

  return (
    <group>
      {trees.map((t, i) => (
        <PhysicsNatureTree key={i} file={t.file} position={[t.x, t.y, t.z]} scale={t.scale} rotationY={t.rot} heightFn={heightFn} />
      ))}
      {clutter.map((s, i) => (
        <PhysicsNatureProp key={i} file={s.file} position={[s.x, s.y, s.z]} scale={0.7} rotationY={s.rot} heightFn={heightFn} />
      ))}
      {bushes.map((b, i) => (
        <PhysicsNatureProp key={i} file={b.file} position={[b.x, b.y, b.z]} scale={0.6 + b.rand * 0.3} rotationY={b.rand * Math.PI * 4} heightFn={heightFn} />
      ))}
      <GrassField blades={grass} />
      <NatureProp file="path_stone.glb" position={[0, heightFn(0, 0.6) + 0.01, 0.6]} scale={0.8} rotationY={Math.PI / 2} />
      <NatureProp file="path_stoneEnd.glb" position={[0, heightFn(0, 1.2) + 0.01, 1.2]} scale={0.8} rotationY={Math.PI / 2} />
      <group position={[0, 0.6, 1]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.5, 0.6]} />
          <meshStandardMaterial color="#6a4a2a" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <coneGeometry args={[0.55, 0.4, 4]} />
          <meshStandardMaterial color="#8a3a1a" flatShading />
        </mesh>
      </group>
      <NatureProp file="campfire_stones.glb" position={[0.8, 0.55, 1.3]} scale={0.6} />
      <RiggedAnimal file="fox.glb" animationMatch="idle_2" position={[1.2, 0.35, -0.6]} scale={0.22} rotationY={-1.8} />
      <RiggedAnimal file="rabbit.glb" animationMatch="sitting_idle" position={[0.9, 0.28, -0.25]} scale={0.18} rotationY={0.5} />
      <RiggedAnimal file="rabbit.glb" animationMatch="idle" position={[-0.6, 0.24, 0.4]} scale={0.16} rotationY={2.1} />
      <RiggedAnimal file="rabbit.glb" animationMatch="run" position={[-1.2, 0.28, -0.5]} scale={0.17} rotationY={1.4} />
      <RiggedAnimal file="fox.glb" animationMatch="idle_2" position={[-1.3, 0.24, 0.7]} scale={0.22} rotationY={2.8} />
      <RiggedAnimal file="fox.glb" animationMatch="idle_2" position={[0.4, 0.24, -1.5]} scale={0.20} rotationY={1.1} />
      <RiggedAnimal file="rabbit.glb" animationMatch="sitting_idle" position={[1.4, 0.2, 0.9]} scale={0.16} rotationY={3.7} />
      <RiggedAnimal file="rabbit.glb" animationMatch="idle" position={[-0.8, 0.2, -0.6]} scale={0.17} rotationY={0.2} />
    </group>
  );
}

function VolcanicDecor() {
  const heightFn = HEIGHT_FN.volcanic;
  const rockFiles = ["rock_tallA.glb", "cliff_large_rock.glb", "stone_largeA.glb", "stone_largeB.glb", "cliff_rock.glb"];
  const rocks = useMemo(
    () => scatter(14, LOCAL_ORIGIN, 2.10, heightFn, 0).map((p, i) => ({
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

function SavannaDecor() {
  const heightFn = HEIGHT_FN.savanna;

  const acacias = useMemo(() =>
    scatter(8, LOCAL_ORIGIN, 2.10, heightFn, 10).map((p) => ({
      position: [p.x, p.y, p.z] as [number, number, number],
      scale: 0.7 + p.rand * 0.5,
      rotY: p.rand * Math.PI * 2,
    })), []);

  const rockFiles = ["rock_largeA.glb", "rock_largeB.glb", "rock_largeC.glb", "rock_largeD.glb"];
  const rocks = useMemo(() =>
    scatter(6, LOCAL_ORIGIN, 2.20, heightFn, 30).map((p, i) => ({
      ...p, file: rockFiles[i % rockFiles.length], scale: 0.3 + p.rand * 0.25, rot: p.rand * Math.PI * 4
    })), []);

  const grass = useGrassField(60, LOCAL_ORIGIN, 2.20, heightFn);

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

function SwampDecor() {
  const heightFn = HEIGHT_FN.swamp;

  const mangroves = useMemo(() =>
    scatter(6, LOCAL_ORIGIN, 1.90, heightFn, 20).map((p) => ({
      position: [p.x, p.y, p.z] as [number, number, number],
      scale: 0.65 + p.rand * 0.45,
      rotY: p.rand * Math.PI * 2,
    })), []);

  const clutterFiles = ["mushroom_red.glb", "mushroom_tan.glb", "mushroom_redGroup.glb", "stump_old.glb", "log.glb", "log_large.glb"];
  const clutter = useMemo(() =>
    scatter(10, LOCAL_ORIGIN, 2.00, heightFn, 40).map((p, i) => ({
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

function TaigaDecor() {
  const heightFn = HEIGHT_FN.taiga;

  const pineFiles = ["tree_pineTallA.glb", "tree_pineRoundA.glb", "tree_pineRoundB.glb", "tree_pineRoundC.glb", "tree_pineRoundD.glb", "tree_pineSmallA.glb"];
  const pines = useMemo(() =>
    scatter(14, LOCAL_ORIGIN, 2.20, heightFn, 60).map((p, i) => ({
      ...p, file: pineFiles[i % pineFiles.length], scale: 0.45 + p.rand * 0.35, rot: p.rand * Math.PI * 4
    })), []);

  const rockFiles = ["rock_smallA.glb", "rock_smallB.glb", "stone_smallA.glb", "stone_smallB.glb"];
  const rocks = useMemo(() =>
    scatter(5, LOCAL_ORIGIN, 2.00, heightFn, 80).map((p, i) => ({
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

function ReefDecor() {
  const heightFn = HEIGHT_FN.reef;
  const corals = useCoralCluster(22, LOCAL_ORIGIN, 2.80);

  const coralHeads = useMemo(() =>
    scatter(8, LOCAL_ORIGIN, 1.90, heightFn, 15).map((p, i) => ({
      position: [p.x, p.y + 0.22, p.z] as [number, number, number],
      scale: 0.6 + p.rand * 0.5,
      colorIndex: i,
    })), []);

  const anemones = useMemo(() =>
    scatter(5, LOCAL_ORIGIN, 1.70, heightFn, 55).map((p) => ({
      position: [p.x, p.y + 0.14, p.z] as [number, number, number],
      scale: 0.7 + p.rand * 0.4,
    })), []);

  const rockFiles = ["rock_smallA.glb", "rock_smallB.glb", "rock_smallC.glb", "rock_smallD.glb"];
  const rocks = useMemo(() =>
    scatter(6, LOCAL_ORIGIN, 2.10, heightFn, 0).map((p, i) => ({
      ...p, file: rockFiles[i % rockFiles.length], scale: 0.35 + p.rand * 0.3, rot: p.rand * Math.PI * 4
    })), []);

  const kelp = useGrassField(40, LOCAL_ORIGIN, 2.00, heightFn);
  const kelpBlades = useMemo(
    () => kelp.map((k) => ({ ...k, y: k.y + 0.4, scale: k.scale * 1.8 })),
    [kelp]
  );

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
      <GrassField blades={kelpBlades} file="grass_large.glb" />
      <StaticAnimal file="turtle.glb" position={[0.6, 0.22, -0.5]}  scale={0.022} rotationY={1.1} bobAmount={0.06} bobSpeed={0.7} />
      <StaticAnimal file="turtle.glb" position={[-1.0, 0.18, 0.4]}  scale={0.018} rotationY={-0.5} bobAmount={0.06} bobSpeed={0.6} />
      <FishSchool center={[0.5, 0.5, 0.5]}   count={12} />
      <FishSchool center={[-1.2, 0.4, -0.8]} count={9} />
    </group>
  );
}

const DECOR_BY_BIOME: Record<string, () => ReactNode> = {
  jungle: JungleDecor,
  desert: DesertDecor,
  arctic: ArcticDecor,
  ocean: OceanDecor,
  forest: ForestDecor,
  volcanic: VolcanicDecor,
  savanna:  SavannaDecor,
  swamp:    SwampDecor,
  taiga:    TaigaDecor,
  reef:     ReefDecor,
};

// Per-biome quaternions: align local +Y (the terrain normal in flat tile space) with the
// outward sphere normal at the biome's surface point. After this rotation, the flat terrain
// tile becomes tangent to the sphere, mountains grow radially outward, and the dirt underside
// (IslandBase) hangs inward toward the planet core.
const BIOME_QUATERNIONS = BIOMES.map((biome) => {
  const outward = new THREE.Vector3(biome.position[0], biome.position[1], biome.position[2]).normalize();
  return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward);
});

const _camDir = new THREE.Vector3();
const _biomeDir = new THREE.Vector3();

const PLANET_RADIUS = 10.0;
// Surface positions: all biomes normalised to exactly PLANET_RADIUS so none float or sink.
const BIOME_SURFACE_POS = BIOMES.map((biome) =>
  new THREE.Vector3(...biome.position).normalize().multiplyScalar(PLANET_RADIUS)
);

export function WorldTerrain({
  onSelect,
  viewState,
}: {
  onSelect?: (b: BiomeData) => void;
  viewState?: ViewState;
}) {
  // Track camera position to cull biomes on the back hemisphere.
  const [camPos, setCamPos] = useState(() => new THREE.Vector3(0, 32, 44));
  useFrame(({ camera }) => {
    if (!camera.position.equals(camPos)) setCamPos(camera.position.clone());
  });

  return (
    <group>
      {BIOMES.map((biome, i) => {
        const Decor = DECOR_BY_BIOME[biome.id];
        const heightFn = HEIGHT_FN[biome.id];
        const q = BIOME_QUATERNIONS[i];
        const surfacePos = BIOME_SURFACE_POS[i];

        // Dot product between camera direction and biome direction from origin.
        // Negative dot = biome faces away from camera = skip rendering.
        _camDir.copy(camPos).normalize();
        _biomeDir.set(...biome.position).normalize();
        const dot = _camDir.dot(_biomeDir);
        if (dot < -0.2) return null;

        const clickable = viewState === "map" && onSelect;

        return (
          <group
            key={biome.id}
            position={surfacePos.toArray()}
            quaternion={q}
            onClick={clickable ? (e) => { e.stopPropagation(); onSelect(biome); } : undefined}
            onPointerEnter={clickable ? () => { document.body.style.cursor = "pointer"; } : undefined}
            onPointerLeave={clickable ? () => { document.body.style.cursor = "auto"; } : undefined}
          >
            {/* Ocean biome has no terrain tile — the planet's ocean sphere already covers it.
                We only render its surface decorations (reef, coral, turtles). */}
            {biome.id !== "ocean" && <BiomeRegion color={biome.color} id={biome.id} />}
            {/* Physics terrain collider — fixed body matching the heightfield so dynamic
                props land exactly on the visible surface instead of floating or sinking. */}
            {biome.id !== "ocean" && <BiomeTerrainCollider biomeId={biome.id} />}
            {biome.id !== "ocean" && (
              <IslandBase
                position={[0, 0, 0]}
                heightFn={heightFn}
                size={6}
                depth={4.0}
                seed={i}
                biomeId={biome.id}
              />
            )}
            {/* Ambient bird flock — per-biome color and orbit */}
            {biome.id === "jungle"   && <BirdFlock count={7} orbitRadius={2.5} orbitHeight={2.5} speed={0.65} color="#e05530" />}
            {biome.id === "forest"   && <BirdFlock count={6} orbitRadius={2.2} orbitHeight={2.2} speed={0.55} color="#5a3a1a" />}
            {biome.id === "desert"   && <BirdFlock count={5} orbitRadius={2.8} orbitHeight={3.0} speed={0.5}  color="#c8a84b" />}
            {biome.id === "arctic"   && <BirdFlock count={6} orbitRadius={2.5} orbitHeight={2.5} speed={0.7}  color="#ddeeff" />}
            {biome.id === "volcanic" && <BirdFlock count={4} orbitRadius={2.0} orbitHeight={4.2} speed={0.45} color="#222222" />}
            {biome.id === "ocean"    && <BirdFlock count={8} orbitRadius={3.0} orbitHeight={2.0} speed={0.8}  color="#ffffff" />}
            {biome.id === "savanna" && <BirdFlock count={6} orbitRadius={2.5} orbitHeight={3.0} speed={0.5}  color="#c8a020" />}
            {biome.id === "swamp"   && <BirdFlock count={4} orbitRadius={2.0} orbitHeight={1.8} speed={0.45} color="#1a3a1a" />}
            {biome.id === "taiga"   && <BirdFlock count={5} orbitRadius={2.0} orbitHeight={2.5} speed={0.6}  color="#ccddee" />}
            {biome.id === "reef"    && <BirdFlock count={7} orbitRadius={3.0} orbitHeight={1.8} speed={0.8}  color="#ffffff" />}
            {Decor && <Decor />}
          </group>
        );
      })}
    </group>
  );
}
