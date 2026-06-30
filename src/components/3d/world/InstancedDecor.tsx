"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const trunkGeo = new THREE.CylinderGeometry(0.05, 0.07, 1, 5);
const canopyGeoLow = new THREE.SphereGeometry(1, 5, 4);
const canopyGeoCone = new THREE.ConeGeometry(1, 1, 6);
const coralGeo = new THREE.ConeGeometry(1, 1, 5);

const dummy = new THREE.Object3D();

interface TreeSpec {
  x: number;
  z: number;
  terrainY: number;
  trunkH: number;
  canopyScale: number;
  hue: number;
}

// Instanced tree cluster (trunks + canopies as two draw calls total, regardless of count) — see tjs-geometry skill: InstancedMesh
export function TreeCluster({
  trees,
  canopyShape = "sphere",
  trunkColor = "#3a2a15",
}: {
  trees: TreeSpec[];
  canopyShape?: "sphere" | "cone";
  trunkColor?: string;
}) {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const canopyRef = useRef<THREE.InstancedMesh>(null);
  const canopyGeo = canopyShape === "cone" ? canopyGeoCone : canopyGeoLow;

  useEffect(() => {
    if (!trunkRef.current || !canopyRef.current) return;

    trees.forEach((t, i) => {
      dummy.position.set(t.x, t.terrainY + t.trunkH / 2, t.z);
      dummy.scale.set(1, t.trunkH, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      trunkRef.current!.setMatrixAt(i, dummy.matrix);

      dummy.position.set(t.x, t.terrainY + t.trunkH, t.z);
      dummy.scale.setScalar(t.canopyScale);
      dummy.updateMatrix();
      canopyRef.current!.setMatrixAt(i, dummy.matrix);
      canopyRef.current!.setColorAt(i, new THREE.Color(`hsl(${t.hue}, 60%, 18%)`));
    });

    trunkRef.current.instanceMatrix.needsUpdate = true;
    canopyRef.current.instanceMatrix.needsUpdate = true;
    if (canopyRef.current.instanceColor) canopyRef.current.instanceColor.needsUpdate = true;
  }, [trees]);

  return (
    <>
      <instancedMesh ref={trunkRef} args={[trunkGeo, undefined, trees.length]} castShadow>
        <meshStandardMaterial color={trunkColor} flatShading />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[canopyGeo, undefined, trees.length]} castShadow>
        <meshStandardMaterial flatShading />
      </instancedMesh>
    </>
  );
}

export function useTreeCluster(
  count: number,
  origin: [number, number, number],
  spread: number,
  heightFn: (x: number, z: number) => number,
  hueRange: [number, number] = [130, 30]
): TreeSpec[] {
  return useMemo(() => {
    const [bx, , bz] = origin;
    const out: TreeSpec[] = [];
    for (let i = 0; i < count; i++) {
      const x = bx + Math.sin(i * 7.3 + count) * spread;
      const z = bz + Math.cos(i * 5.1 + count) * spread;
      out.push({
        x,
        z,
        terrainY: heightFn(x - bx, z - bz),
        trunkH: 0.8 + Math.random() * 1.5,
        canopyScale: 0.5 + Math.random() * 0.3,
        hue: hueRange[0] + Math.random() * hueRange[1],
      });
    }
    return out;
  }, [count, origin, spread, heightFn, hueRange]);
}

interface CoralSpec {
  x: number;
  z: number;
  scale: [number, number, number];
  colorIdx: number;
}

const coralColors = [new THREE.Color("#e05050"), new THREE.Color("#e0a030"), new THREE.Color("#50c0a0")];

export function CoralCluster({ corals, y = -0.8 }: { corals: CoralSpec[]; y?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!ref.current) return;
    corals.forEach((c, i) => {
      dummy.position.set(c.x, y, c.z);
      dummy.scale.set(...c.scale);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
      ref.current!.setColorAt(i, coralColors[c.colorIdx]);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [corals, y]);

  return (
    <instancedMesh ref={ref} args={[coralGeo, undefined, corals.length]} castShadow>
      <meshStandardMaterial flatShading />
    </instancedMesh>
  );
}

export function useCoralCluster(count: number, origin: [number, number, number], spread: number): CoralSpec[] {
  return useMemo(() => {
    const [bx, , bz] = origin;
    const out: CoralSpec[] = [];
    for (let i = 0; i < count; i++) {
      const r = 0.15 + Math.random() * 0.2;
      out.push({
        x: bx + Math.sin(i * 5.3) * spread,
        z: bz + Math.cos(i * 3.7) * spread,
        scale: [r, 0.5 + Math.random() * 0.5, r],
        colorIdx: i % 3,
      });
    }
    return out;
  }, [count, origin, spread]);
}
