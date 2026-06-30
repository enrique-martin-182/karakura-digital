"use client";

import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { BIOMES } from "./types";
import { Toucan, Monkey, Camel, Scorpion, Penguin, Seal, Turtle, FishSchool, Fox, Rabbit, Iguana, Crab } from "./BiomeAnimals";
import { TreeCluster, useTreeCluster, CoralCluster, useCoralCluster } from "./InstancedDecor";
import { LavaMaterial } from "./LavaMaterial";

function BiomeRegion({
  position,
  color,
  id,
}: {
  position: [number, number, number];
  color: string;
  id: string;
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 56, 56);
    const pos = geo.attributes.position;
    const col = new Float32Array(pos.count * 3);
    const base = new THREE.Color(color);
    const dark = new THREE.Color(color).multiplyScalar(0.72);
    const temp = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);

      let height = 0;
      switch (id) {
        case "jungle":
          height =
            Math.sin(x * 0.8) * Math.cos(z * 0.6) * 1.2 +
            Math.sin(x * 1.5 + z) * 0.4;
          break;
        case "desert":
          height =
            Math.abs(Math.sin(x * 0.4 + z * 0.3)) * 1.8 +
            Math.sin(x * 0.2) * 0.5;
          break;
        case "arctic":
          height =
            Math.cos(x * 0.5) * Math.sin(z * 0.4) * 0.8 +
            Math.random() * 0.15;
          break;
        case "ocean":
          height =
            Math.sin(x * 0.6 + z * 0.5) * 0.3 - 1.2;
          break;
        case "forest":
          height =
            Math.sin(x * 0.5) * Math.cos(z * 0.7) * 1.0 +
            Math.sin(x * 1.2) * 0.3;
          break;
        case "volcanic":
          const dist = Math.sqrt(x * x + z * z);
          height = Math.max(0, 3 - dist * 0.8) + Math.sin(x * 0.8) * 0.3;
          break;
      }

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
    <mesh
      geometry={geometry}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      userData={{ biomeId: id }}
    >
      <meshStandardMaterial vertexColors roughness={0.75} metalness={0.02} flatShading />
    </mesh>
  );
}

function OceanFloor() {
  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#0a1a2a" roughness={1} />
    </mesh>
  );
}

function JungleDecor({ position }: { position: [number, number, number] }) {
  const trees = useTreeCluster(20, position, 3, (x, z) => Math.sin(x * 0.8) * Math.cos(z * 0.6) * 1.2, [130, 30]);
  const [bx, , bz] = position;

  return (
    <group>
      <TreeCluster trees={trees} canopyShape="cone" trunkColor="#3a2a15" />
      <mesh position={[bx - 1, 0.8, bz + 1]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#5a5a4a" roughness={0.95} flatShading />
      </mesh>
      <Toucan position={[bx + 1.6, 1.6, bz - 0.6]} />
      <Toucan position={[bx - 1.2, 1.9, bz + 1.4]} />
      <Monkey position={[bx + 2, 1.3, bz - 1]} />
      <Monkey position={[bx - 0.6, 0.9, bz - 1.8]} />
    </group>
  );
}

function DesertDecor({ position }: { position: [number, number, number] }) {
  const [bx, , bz] = position;
  return (
    <group>
      <mesh position={[bx, 1.5, bz]} castShadow>
        <coneGeometry args={[2, 3, 4]} />
        <meshStandardMaterial color="#d4a84a" flatShading />
      </mesh>
      <mesh position={[bx + 2, 0.02, bz + 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 12]} />
        <meshPhysicalMaterial color="#2a6a8a" transparent opacity={0.75} roughness={0.15} clearcoat={0.6} />
      </mesh>
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <group key={i} position={[bx + 2 + Math.cos(angle) * 1.2, 0, bz + 2 + Math.sin(angle) * 1.2]}>
            <mesh position={[0, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.07, 1.6, 5]} />
              <meshStandardMaterial color="#6a4a2a" flatShading />
            </mesh>
            <mesh position={[0, 1.7, 0]} castShadow>
              <sphereGeometry args={[0.4, 5, 4]} />
              <meshStandardMaterial color="#2a6a1a" flatShading />
            </mesh>
          </group>
        );
      })}
      <Camel position={[bx - 2, 1.0, bz + 1]} />
      <Camel position={[bx - 1.4, 0.95, bz + 1.6]} />
      <Scorpion position={[bx + 0.6, 0.85, bz - 1.2]} />
    </group>
  );
}

function ArcticDecor({ position }: { position: [number, number, number] }) {
  const [bx, , bz] = position;
  const icebergs = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        pos: [bx + Math.sin(i * 4) * 3, 0.3 + Math.random() * 0.8, bz + Math.cos(i * 3) * 2.5] as [number, number, number],
        scale: 0.4 + Math.random() * 0.5,
      })),
    [bx, bz]
  );

  return (
    <group>
      {icebergs.map((ice, i) => (
        <mesh key={i} position={ice.pos} castShadow>
          <dodecahedronGeometry args={[ice.scale, 0]} />
          {/* Physical material with transmission for a true frosted-glass iceberg look — tjs-materials skill */}
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
      <group position={[bx + 1, 0.4, bz + 1]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.4, 0.5]} />
          <meshStandardMaterial color="#d0d0d0" flatShading />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <coneGeometry args={[0.5, 0.3, 4]} />
          <meshStandardMaterial color="#cc3333" flatShading />
        </mesh>
      </group>
      <Seal position={[bx - 1.5, 0.3, bz - 1]} />
      <Seal position={[bx - 0.9, 0.32, bz - 1.6]} />
      {[0, 1, 2, 3].map((i) => (
        <Penguin key={i} position={[bx - 2 + i * 0.4, 0.2, bz + 2]} />
      ))}
    </group>
  );
}

function OceanDecor({ position }: { position: [number, number, number] }) {
  const [bx, , bz] = position;
  const corals = useCoralCluster(12, position, 3);

  return (
    <group>
      <CoralCluster corals={corals} y={-0.8} />
      <Turtle position={[bx + 1, 0.1, bz - 1]} />
      <Turtle position={[bx - 1.5, -0.1, bz - 0.5]} />
      <FishSchool center={[bx + 0.5, -0.4, bz + 0.5]} count={10} />
      <group position={[bx - 2, -1, bz + 2]} rotation={[0, 0.5, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.3, 1]} />
          <meshStandardMaterial color="#5a4a30" flatShading />
        </mesh>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 4]} />
          <meshStandardMaterial color="#4a3a20" flatShading />
        </mesh>
      </group>
    </group>
  );
}

function ForestDecor({ position }: { position: [number, number, number] }) {
  const trees = useTreeCluster(18, position, 3.2, (x, z) => Math.sin(x * 0.5) * Math.cos(z * 0.7) * 1.0, [40, 70]);
  const [bx, , bz] = position;

  return (
    <group>
      <TreeCluster trees={trees} canopyShape="sphere" trunkColor="#4a3520" />
      <group position={[bx, 0.6, bz + 1]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.5, 0.6]} />
          <meshStandardMaterial color="#6a4a2a" flatShading />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <coneGeometry args={[0.55, 0.4, 4]} />
          <meshStandardMaterial color="#8a3a1a" flatShading />
        </mesh>
      </group>
      <Fox position={[bx + 2, 0.5, bz - 1]} />
      <Rabbit position={[bx + 1.4, 0.4, bz - 0.4]} />
      <Rabbit position={[bx - 1, 0.35, bz + 0.6]} />
    </group>
  );
}

function VolcanicDecor({ position }: { position: [number, number, number] }) {
  const [bx, , bz] = position;

  return (
    <group>
      <group position={[bx, 0, bz]}>
        <mesh castShadow>
          <coneGeometry args={[2.5, 4, 8]} />
          <meshStandardMaterial color="#3a2a1a" flatShading />
        </mesh>
        {/* Animated noise-based lava crater — tjs-shaders skill */}
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <LavaMaterial />
        </mesh>
        <mesh position={[0.8, 1, 0.5]} rotation={[0.3, 0, 0.5]}>
          <cylinderGeometry args={[0.05, 0.15, 2, 8]} />
          <LavaMaterial />
        </mesh>
      </group>
      <mesh position={[bx + 3, 0.05, bz + 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 10]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.95} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[bx + 2.5 + Math.sin(i) * 1.5, 0.3, bz + 2 + Math.cos(i) * 1]}>
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 1.2, 5]} />
            <meshStandardMaterial color="#5a3a1a" flatShading />
          </mesh>
          <mesh position={[0, 1.3, 0]} castShadow>
            <sphereGeometry args={[0.35, 5, 4]} />
            <meshStandardMaterial color="#1a5a1a" flatShading />
          </mesh>
        </group>
      ))}
      <Iguana position={[bx + 2.8, 0.1, bz + 1.6]} />
      <Iguana position={[bx + 3.4, 0.1, bz + 2.4]} />
      <Crab position={[bx + 3, 0.06, bz + 1.2]} />
      <Crab position={[bx + 2.4, 0.06, bz + 2.6]} />
    </group>
  );
}

const DECOR_BY_BIOME: Record<string, (props: { position: [number, number, number] }) => ReactNode> = {
  jungle: JungleDecor,
  desert: DesertDecor,
  arctic: ArcticDecor,
  ocean: OceanDecor,
  forest: ForestDecor,
  volcanic: VolcanicDecor,
};

export function WorldTerrain() {
  return (
    <group>
      <OceanFloor />
      {BIOMES.map((biome) => {
        const Decor = DECOR_BY_BIOME[biome.id];
        return (
          <group key={biome.id}>
            <BiomeRegion position={biome.position} color={biome.color} id={biome.id} />
            {Decor && <Decor position={biome.position} />}
          </group>
        );
      })}
    </group>
  );
}
