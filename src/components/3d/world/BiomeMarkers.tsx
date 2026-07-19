"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { BiomeData, ViewState } from "./types";
import { BIOMES } from "./types";

// Overshoot-and-settle easing for click feedback (tjs-animation skill: outBack)
function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function BiomeMarker({
  biome,
  onSelect,
  viewState,
}: {
  biome: BiomeData;
  onSelect: (biome: BiomeData) => void;
  viewState: ViewState;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const clickStart = useRef(-1);
  const pendingClick = useRef(false);

  // Unit vector pointing outward from sphere center through this biome's surface point.
  // Markers float along this direction (not global Y) so they appear above the correct
  // face of the planet regardless of which hemisphere the biome is on.
  const outward = useMemo(
    () => new THREE.Vector3(biome.position[0], biome.position[1], biome.position[2]).normalize(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [biome.position[0], biome.position[1], biome.position[2]]
  );

  // Align marker group's local +Y with the sphere outward normal so the vertical beam
  // and label both point in the right direction for any hemisphere.
  const quaternion = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward),
    [outward]
  );

  const baseRadius = biome.id === "ocean" ? 11.8 : 13.5;
  const beamLength = biome.id === "ocean" ? 1.8 : 3.5;
  const biomeIndex = BIOMES.indexOf(biome);

  useFrame((state) => {
    if (!groupRef.current || viewState !== "map") return;
    const t = state.clock.elapsedTime;

    const floatRadius = baseRadius + Math.sin(t * 1.5 + biomeIndex) * 0.15;
    groupRef.current.position.copy(outward).multiplyScalar(floatRadius);
    groupRef.current.quaternion.copy(quaternion);

    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.8;
      ringRef.current.rotation.z = Math.sin(t * 0.4) * 0.15;
    }

    if (pendingClick.current) {
      pendingClick.current = false;
      clickStart.current = t;
    }
    if (coreRef.current) {
      if (clickStart.current >= 0) {
        const elapsed = t - clickStart.current;
        const progress = Math.min(elapsed / 0.3, 1);
        const scale = 1 + easeOutBack(progress) * 0.5 * (1 - progress);
        coreRef.current.scale.setScalar(scale);
        if (progress >= 1) clickStart.current = -1;
      }
    }
  });

  if (viewState !== "map") return null;

  const color = new THREE.Color(biome.markerColor);

  return (
    <group
      ref={groupRef}
      position={[biome.position[0], biome.position[1] + 3, biome.position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        pendingClick.current = true;
        onSelect(biome);
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2.5 : 1.4}
            toneMapped={false}
          />
        </mesh>
      </group>

      <mesh ref={ringRef}>
        <torusGeometry args={[0.7, 0.035, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.55, 0.018, 6, 24]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          toneMapped={false}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.85, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.18 : 0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Invisible hitbox — larger than the visible aura so the marker is easy to click */}
      <mesh>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Beam pointing inward toward sphere surface (local -Y = toward planet center) */}
      <mesh position={[0, -beamLength / 2, 0]}>
        <cylinderGeometry args={[0.008, 0.008, beamLength, 4]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {hovered && (
        <Html position={[0, 1, 0]} center distanceFactor={12} style={{ pointerEvents: "none" }}>
          <div
            className="px-4 py-2 rounded-xl text-white text-sm font-bold whitespace-nowrap text-center"
            style={{
              background: `linear-gradient(135deg, ${biome.markerColor}f0, rgba(0,15,10,0.9))`,
              border: `1px solid ${biome.markerColor}55`,
              boxShadow: `0 0 25px ${biome.markerColor}33`,
            }}
          >
            <div>{biome.name}</div>
            <div className="text-[10px] font-normal text-white/70 mt-1">Clic para explorar</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export function BiomeMarkers({
  onSelect,
  viewState,
}: {
  onSelect: (biome: BiomeData) => void;
  viewState: ViewState;
}) {
  return (
    <group>
      {BIOMES.map((biome) => (
        <BiomeMarker
          key={biome.id}
          biome={biome}
          onSelect={onSelect}
          viewState={viewState}
        />
      ))}
    </group>
  );
}
