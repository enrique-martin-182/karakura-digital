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

export function IcebergMesh({ scale = 1 }: { scale?: number }) {
  const geo = useMemo(() => buildIcebergGeo(), []);
  return (
    <mesh geometry={geo} scale={scale} castShadow>
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
