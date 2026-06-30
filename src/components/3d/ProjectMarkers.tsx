"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export interface Project3D {
  id: number;
  name: string;
  description: string;
  tech: string[];
  url: string;
  location: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  accentColor: string;
}

export const portfolioProjects: Project3D[] = [
  {
    id: 1,
    name: "Diorama Bosque Místico",
    description:
      "Escena 3D interactiva con terreno procedural, sistema de agua con shaders, fauna animada y atmosfera volumetrica. Todo generado por codigo.",
    tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "Procedural"],
    url: "#",
    location: [-4, 5.5, -7],
    cameraTarget: [-4, 4, -7],
    cameraPosition: [-2, 6, -4],
    accentColor: "#4EDEA3",
  },
  {
    id: 2,
    name: "Configurador de Producto 3D",
    description:
      "Visualizador interactivo que permite personalizar productos en tiempo real: colores, materiales y variantes con renderizado PBR.",
    tech: ["WebGL", "React Three Fiber", "Drei", "PBR Materials"],
    url: "#",
    location: [6, 2.5, 4],
    cameraTarget: [6, 2, 4],
    cameraPosition: [8, 3.5, 7],
    accentColor: "#FF7A00",
  },
  {
    id: 3,
    name: "Dashboard de Datos 3D",
    description:
      "Visualizacion de datos empresariales en un entorno tridimensional inmersivo. Graficos interactivos flotantes con transiciones fluidas.",
    tech: ["Three.js", "D3.js", "WebGL", "Data Viz"],
    url: "#",
    location: [12, 3.5, -3],
    cameraTarget: [12, 3, -3],
    cameraPosition: [14, 4.5, 0],
    accentColor: "#6366F1",
  },
  {
    id: 4,
    name: "Landing Page Inmersiva",
    description:
      "Paginas de aterrizaje con scroll-driven 3D animations, transiciones cinematicas y parallax volumetrico que aumentan la conversion.",
    tech: ["React Three Fiber", "Framer Motion", "GSAP", "Scroll Sync"],
    url: "#",
    location: [-8, 3, 6],
    cameraTarget: [-8, 2.5, 6],
    cameraPosition: [-6, 4, 9],
    accentColor: "#F59E0B",
  },
];

function RuneMarker({
  project,
  onSelect,
  isSelected,
}: {
  project: Project3D;
  onSelect: (project: Project3D | null) => void;
  isSelected: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Float animation
    groupRef.current.position.y =
      project.location[1] + Math.sin(t * 1.2 + project.id) * 0.15;

    // Rotate ring
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.5;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }

    // Pulse glow
    if (glowRef.current) {
      const scale = isSelected
        ? 1.5 + Math.sin(t * 3) * 0.2
        : hovered
          ? 1.3 + Math.sin(t * 2) * 0.15
          : 1 + Math.sin(t * 1.5) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  const color = new THREE.Color(project.accentColor);

  return (
    <group
      ref={groupRef}
      position={project.location}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(isSelected ? null : project);
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
      {/* Core orb */}
      <mesh>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 2 : hovered ? 1.5 : 0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Rotating rune ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.35, 0.02, 8, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.15 : hovered ? 0.1 : 0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Vertical beam */}
      <mesh position={[0, -project.location[1] / 2, 0]}>
        <cylinderGeometry args={[0.005, 0.005, project.location[1], 4]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Label on hover */}
      {(hovered || isSelected) && (
        <Html
          position={[0, 0.7, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: "none" }}
        >
          <div
            className="px-3 py-1.5 rounded-lg text-white text-xs font-bold whitespace-nowrap"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}cc, ${project.accentColor}66)`,
              backdropFilter: "blur(8px)",
              border: `1px solid ${project.accentColor}44`,
              boxShadow: `0 0 20px ${project.accentColor}33`,
            }}
          >
            {project.name}
          </div>
        </Html>
      )}
    </group>
  );
}

export function ProjectMarkers({
  onSelect,
  selectedId,
}: {
  onSelect: (project: Project3D | null) => void;
  selectedId: number | null;
}) {
  return (
    <group>
      {portfolioProjects.map((project) => (
        <RuneMarker
          key={project.id}
          project={project}
          onSelect={onSelect}
          isSelected={selectedId === project.id}
        />
      ))}
    </group>
  );
}
