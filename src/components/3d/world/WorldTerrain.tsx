"use client";

import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { BIOMES } from "./types";
import { Scorpion, Seal, FishSchool, Iguana, Crab } from "./BiomeAnimals";
import { CoralCluster, useCoralCluster } from "./InstancedDecor";
import { LavaMaterial } from "./LavaMaterial";
import { RiggedAnimal, StaticAnimal } from "./GLTFAnimal";
import { NatureTree, NatureProp, GrassField, useGrassField } from "./NatureProp";
import { IslandBase } from "./IslandBase";
import { BirdFlock, VolcanoSmoke, AshParticles, JungleMist, DesertHeatHaze, ArcticAurora, CraterSparks } from "./BiomeAmbience";

import {
  PhysicsNatureProp,
  PhysicsNatureTree,
  BiomeTerrainCollider,
} from "./PhysicsWorld";

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
    const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
    grad.addColorStop(0.0,  "rgba(255,255,255,1)");
    grad.addColorStop(0.60, "rgba(255,255,255,1)");
    grad.addColorStop(0.80, "rgba(255,255,255,0.5)");
    grad.addColorStop(1.0,  "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(5, 5, 48, 48);
    const pos = geo.attributes.position;
    const col = new Float32Array(pos.count * 3);
    const base = new THREE.Color(color);
    const dark = new THREE.Color(color).multiplyScalar(0.72);
    const temp = new THREE.Color();
    const heightFn = HEIGHT_FN[id];

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);
      const height = heightFn(x, z) + (id === "arctic" ? Math.random() * 0.15 : 0);

      pos.setZ(i, height);

      const noise = Math.sin(x * 3.1 + z * 2.7) * 0.5 + 0.5;
      temp.lerpColors(dark, base, noise * 0.6 + 0.45);
      if (height > 1.5) temp.lerp(new THREE.Color("#ffffff"), (height - 1.5) * 0.22);
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
    () => scatter(22, LOCAL_ORIGIN, 2.2, heightFn, 0).map((p, i) => ({ ...p, file: treeFiles[i % treeFiles.length], scale: 0.5 + p.rand * 0.35, rot: p.rand * Math.PI * 4 })),
    []
  );
  const rockFiles = ["rock_smallA.glb", "rock_smallB.glb", "rock_smallC.glb", "rock_smallD.glb", "rock_largeA.glb", "rock_largeB.glb"];
  const rocks = useMemo(
    () => scatter(10, LOCAL_ORIGIN, 2.2, heightFn, 50).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], scale: 0.45 + p.rand * 0.4, rot: p.rand * Math.PI * 4 })),
    []
  );
  const flowerFiles = ["flower_yellowA.glb", "flower_redA.glb", "flower_purpleA.glb", "flower_purpleB.glb", "flower_redB.glb"];
  const flowers = useMemo(
    () => scatter(16, LOCAL_ORIGIN, 2.0, heightFn, 100).map((p, i) => ({ ...p, file: flowerFiles[i % flowerFiles.length] })),
    []
  );
  const bushes = useMemo(
    () => scatter(8, LOCAL_ORIGIN, 2.1, heightFn, 150).map((p, i) => ({ ...p, file: i % 2 === 0 ? "plant_bush.glb" : "plant_bushLarge.glb" })),
    []
  );
  const grass = useGrassField(70, LOCAL_ORIGIN, 2.2, heightFn);

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
    () => scatter(11, LOCAL_ORIGIN, 2.2, heightFn, 0).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], scale: 0.45 + p.rand * 0.45, rot: p.rand * Math.PI * 4 })),
    []
  );
  const cacti = useMemo(
    () => scatter(6, LOCAL_ORIGIN, 2.0, heightFn, 60).map((p, i) => ({ ...p, file: i % 2 === 0 ? "cactus_tall.glb" : "cactus_short.glb", scale: 0.5 + p.rand * 0.3, rot: p.rand * Math.PI * 4 })),
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
      scatter(8, LOCAL_ORIGIN, 2.1, heightFn, 0).map((p) => ({
        pos: [p.x, 0.1 + p.rand * 0.2, p.z] as [number, number, number],
        scale: 0.18 + p.rand * 0.17,
      })),
    []
  );
  const rockFiles = ["rock_smallC.glb", "rock_smallD.glb", "stone_smallA.glb", "stone_smallB.glb", "stone_smallC.glb"];
  const rocks = useMemo(
    () => scatter(9, LOCAL_ORIGIN, 2.2, heightFn, 80).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], rot: p.rand * Math.PI * 4 })),
    []
  );

  return (
    <group>
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={0.35 + r.rand * 0.25} rotationY={r.rot} heightFn={heightFn} />
      ))}
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
  const corals = useCoralCluster(28, LOCAL_ORIGIN, 2.1);
  const rockFiles = ["rock_largeA.glb", "rock_largeB.glb", "rock_largeC.glb", "rock_largeD.glb"];
  const reefRocks = useMemo(
    () => scatter(8, LOCAL_ORIGIN, 2.0, heightFn, 0).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], rot: p.rand * Math.PI * 4 })),
    []
  );
  const kelp = useGrassField(50, LOCAL_ORIGIN, 2.1, heightFn);

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

  const treeFiles = ["tree_pineRoundA.glb", "tree_pineRoundB.glb", "tree_pineRoundC.glb", "tree_pineRoundD.glb", "tree_pineTallA.glb", "tree_pineSmallA.glb"];
  const trees = useMemo(
    () => scatter(22, LOCAL_ORIGIN, 2.2, heightFn, 0).map((p, i) => ({ ...p, file: treeFiles[i % treeFiles.length], scale: 0.5 + p.rand * 0.35, rot: p.rand * Math.PI * 4 })),
    []
  );
  const clutterFiles = ["mushroom_redGroup.glb", "stump_round.glb", "stump_old.glb", "mushroom_tan.glb", "mushroom_red.glb", "log.glb"];
  const clutter = useMemo(
    () => scatter(12, LOCAL_ORIGIN, 2.0, heightFn, 100).map((p, i) => ({ ...p, file: clutterFiles[i % clutterFiles.length], rot: p.rand * Math.PI * 4 })),
    []
  );
  const bushes = useMemo(
    () => scatter(7, LOCAL_ORIGIN, 2.1, heightFn, 200).map((p, i) => ({ ...p, file: i % 2 === 0 ? "plant_bushSmall.glb" : "plant_bushTriangle.glb" })),
    []
  );
  const grass = useGrassField(70, LOCAL_ORIGIN, 2.2, heightFn);

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
    () => scatter(11, LOCAL_ORIGIN, 2.2, heightFn, 0).map((p, i) => ({ ...p, file: rockFiles[i % rockFiles.length], scale: 0.4 + p.rand * 0.35, rot: p.rand * Math.PI * 4 })),
    []
  );

  return (
    <group>
      {rocks.map((r, i) => (
        <PhysicsNatureProp key={i} file={r.file} position={[r.x, r.y, r.z]} scale={r.scale} rotationY={r.rot} heightFn={heightFn} />
      ))}
      <group position={[0, 0, 0]}>
        <mesh castShadow>
          <coneGeometry args={[1.5, 2.4, 16]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <LavaMaterial />
        </mesh>
        <mesh position={[0.5, 0.6, 0.3]} rotation={[0.3, 0, 0.5]}>
          <cylinderGeometry args={[0.05, 0.12, 1.3, 8]} />
          <LavaMaterial />
        </mesh>
      </group>
      <mesh position={[1.8, 0.05, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 20]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = 1.6 + Math.cos(angle) * 0.8;
        const z = 1.4 + Math.sin(angle) * 0.8;
        const seed = Math.sin(i * 311.7) * 0.5 + 0.5;
        return (
          <PhysicsNatureTree
            key={i}
            file={i % 2 === 0 ? "tree_palmTall.glb" : "tree_palmDetailedTall.glb"}
            position={[x, heightFn(x, z), z]}
            scale={0.5 + seed * 0.2}
            rotationY={seed * Math.PI * 2}
            heightFn={heightFn}
          />
        );
      })}
      <Iguana position={[1.7, 0.07, 1.0]} />
      <Iguana position={[2.1, 0.07, 1.5]} />
      <Iguana position={[1.4, 0.07, 1.7]} />
      <Iguana position={[0.9, 0.07, 1.9]} />
      <Iguana position={[2.3, 0.07, 0.8]} />
      <Iguana position={[1.2, 0.07, 0.3]} />
      <Crab position={[1.8, 0.04, 0.7]} />
      <Crab position={[1.5, 0.04, 1.6]} />
      <Crab position={[2.2, 0.04, 1.1]} />
      <VolcanoSmoke />
      <AshParticles />
      <CraterSparks />
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
};

// Per-biome quaternions: align local +Y (the terrain normal in flat tile space) with the
// outward sphere normal at the biome's surface point. After this rotation, the flat terrain
// tile becomes tangent to the sphere, mountains grow radially outward, and the dirt underside
// (IslandBase) hangs inward toward the planet core.
const BIOME_QUATERNIONS = BIOMES.map((biome) => {
  const outward = new THREE.Vector3(biome.position[0], biome.position[1], biome.position[2]).normalize();
  return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward);
});

export function WorldTerrain() {
  return (
    <group>
      {BIOMES.map((biome, i) => {
        const Decor = DECOR_BY_BIOME[biome.id];
        const heightFn = HEIGHT_FN[biome.id];
        const q = BIOME_QUATERNIONS[i];

        return (
          <group key={biome.id} position={biome.position} quaternion={q}>
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
                size={5}
                depth={4.0}
                seed={i}
              />
            )}
            {biome.id !== "ocean" && (
              <>
                {/* Beach/shoreline ring at island edge */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
                  <torusGeometry args={[2.4, 0.12, 8, 32]} />
                  <meshStandardMaterial color="#d4b483" roughness={0.9} metalness={0} />
                </mesh>
              </>
            )}
            {/* Ambient bird flock — per-biome color and orbit */}
            {biome.id === "jungle"   && <BirdFlock count={7} orbitRadius={2.5} orbitHeight={2.5} speed={0.65} color="#e05530" />}
            {biome.id === "forest"   && <BirdFlock count={6} orbitRadius={2.2} orbitHeight={2.2} speed={0.55} color="#5a3a1a" />}
            {biome.id === "desert"   && <BirdFlock count={5} orbitRadius={2.8} orbitHeight={3.0} speed={0.5}  color="#c8a84b" />}
            {biome.id === "arctic"   && <BirdFlock count={6} orbitRadius={2.5} orbitHeight={2.5} speed={0.7}  color="#ddeeff" />}
            {biome.id === "volcanic" && <BirdFlock count={4} orbitRadius={2.0} orbitHeight={4.2} speed={0.45} color="#222222" />}
            {biome.id === "ocean"    && <BirdFlock count={8} orbitRadius={3.0} orbitHeight={2.0} speed={0.8}  color="#ffffff" />}
            {Decor && <Decor />}
          </group>
        );
      })}
    </group>
  );
}
