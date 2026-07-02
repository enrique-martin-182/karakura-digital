"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 128, 128);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);

      // River channel carved through center
      const riverDist = Math.abs(x - Math.sin(z * 0.3) * 3);
      const riverDepth = Math.max(0, 1 - riverDist / 3) * -1.2;

      // Rolling hills
      const hills =
        Math.sin(x * 0.15) * Math.cos(z * 0.12) * 2.5 +
        Math.sin(x * 0.08 + 1) * Math.sin(z * 0.06 + 2) * 1.5 +
        Math.sin(x * 0.4) * Math.cos(z * 0.35) * 0.3;

      // Waterfall cliff on one side
      const cliffX = x + 5;
      const cliffZ = z + 8;
      const cliffDist = Math.sqrt(cliffX * cliffX + cliffZ * cliffZ);
      const cliff = cliffDist < 6 ? Math.max(0, (6 - cliffDist) * 0.8) : 0;

      pos.setZ(i, hills + riverDepth + cliff);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  useMemo(() => {
    const pos = geometry.attributes.position;
    const colorsArr = new Float32Array(pos.count * 3);
    const baseGreen = new THREE.Color(0x1a3a1a);
    const darkGreen = new THREE.Color(0x0d2a0d);
    const moss = new THREE.Color(0x2d5a1e);
    const dirt = new THREE.Color(0x3a2a1a);
    const riverBed = new THREE.Color(0x1a2a2a);
    const temp = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);
      const height = pos.getZ(i);

      const riverDist = Math.abs(x - Math.sin(z * 0.3) * 3);

      if (riverDist < 2) {
        temp.copy(riverBed);
      } else if (height > 2) {
        temp.lerpColors(moss, dirt, Math.min(1, (height - 2) * 0.3));
      } else {
        const noise = Math.sin(x * 2.3) * Math.cos(z * 1.7) * 0.5 + 0.5;
        temp.lerpColors(darkGreen, baseGreen, noise);
        if (noise > 0.6) temp.lerp(moss, 0.3);
      }

      colorsArr[i * 3] = temp.r;
      colorsArr[i * 3 + 1] = temp.g;
      colorsArr[i * 3 + 2] = temp.b;
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));
  }, [geometry]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.9} />
    </mesh>
  );
}
