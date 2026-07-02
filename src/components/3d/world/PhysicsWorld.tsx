"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  RigidBody,
  HeightfieldCollider,
  CuboidCollider,
  BallCollider,
  useRapier,
  useBeforePhysicsStep,
} from "@react-three/rapier";
import { Clone, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { HEIGHT_FN } from "./WorldTerrain";

const MODEL_BASE = "/assets/models/nature/";

// Computes the quaternion that aligns +Y with the terrain surface normal at (x, z).
// Composed with an extra rotationY for random azimuthal variation.
function surfaceNormalQuat(
  x: number,
  z: number,
  heightFn: (x: number, z: number) => number,
  rotationY = 0
): THREE.Quaternion {
  const eps = 0.06;
  const dx = (heightFn(x + eps, z) - heightFn(x - eps, z)) / (2 * eps);
  const dz = (heightFn(x, z + eps) - heightFn(x, z - eps)) / (2 * eps);
  const normal = new THREE.Vector3(-dx, 1, -dz).normalize();
  const normalQ = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    normal
  );
  const rotYQ = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    rotationY
  );
  return normalQ.multiply(rotYQ);
}

// Applies spherical gravity (centripetal force toward world origin) to every
// awake dynamic body each physics step. Rapier's built-in gravity is set to
// [0,0,0] so this is the only downward pull — it works on any hemisphere.
export function SphericalGravity() {
  const { world } = useRapier();
  const G = 13; // tuned for planet radius R=10

  useBeforePhysicsStep(() => {
    world.bodies.forEach((body) => {
      if (!body.isDynamic() || body.isSleeping()) return;
      const { x, y, z } = body.translation();
      const r = Math.sqrt(x * x + y * y + z * z);
      if (r < 0.1) return;
      const mass = body.mass();
      const scale = (-G * mass) / r;
      body.addForce({ x: x * scale, y: y * scale, z: z * scale }, true);
    });
  });

  return null;
}

// Physics click interaction: native canvas listener casts a Rapier ray and
// applies an outward impulse to the first dynamic body it hits.
export function PhysicsInteraction({ enabled }: { enabled: boolean }) {
  const { rapier, world } = useRapier();
  const { camera, gl } = useThree();
  const enabledRef = useRef(enabled);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  useEffect(() => {
    const canvas = gl.domElement;
    const onClick = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const { origin, direction } = raycaster.ray;
      const ray = new rapier.Ray(
        { x: origin.x, y: origin.y, z: origin.z },
        { x: direction.x, y: direction.y, z: direction.z }
      );
      // Only hit dynamic bodies (props), skip fixed terrain colliders
      const hit = world.castRay(ray, 80, true, undefined, undefined, undefined, undefined,
        (collider) => collider.parent()?.isDynamic() === true
      );
      if (!hit) return;
      const body = hit.collider.parent();
      if (!body) return;
      const pos = body.translation();
      const r = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z);
      if (r < 0.1) return;
      const strength = 9;
      body.applyImpulse(
        { x: (pos.x / r) * strength, y: (pos.y / r) * strength, z: (pos.z / r) * strength },
        true
      );
      body.wakeUp();
    };
    canvas.addEventListener("click", onClick);
    return () => canvas.removeEventListener("click", onClick);
  }, [rapier, world, camera, gl]);

  return null;
}

// HeightfieldCollider matching BiomeRegion's displacement function.
// Placed inside the biome's <group> so its quaternion transforms to world space.
// MUST be inside a Physics context.
const HF_COLS = 28;
const HF_ROWS = 28;

export function BiomeTerrainCollider({ biomeId }: { biomeId: string }) {
  const heightFn = HEIGHT_FN[biomeId];
  const heights = useMemo(() => {
    const arr: number[] = [];
    for (let row = 0; row <= HF_ROWS; row++) {
      for (let col = 0; col <= HF_COLS; col++) {
        // Plane geometry uses its X and Y coords as the terrain x and z.
        // After BiomeRegion's [-PI/2,0,0] rotation they become local biome X and Z.
        const px = (col / HF_COLS - 0.5) * 5;
        const pz = (row / HF_ROWS - 0.5) * 5;
        arr.push(heightFn(px, pz));
      }
    }
    return arr;
  }, [heightFn]);

  return (
    <RigidBody type="fixed" colliders={false}>
      <HeightfieldCollider
        args={[HF_COLS, HF_ROWS, heights, { x: 5, y: 1, z: 5 }]}
      />
    </RigidBody>
  );
}

// Shared rigid body config for all dynamic props
const DYNAMIC_BODY_PROPS = {
  type: "dynamic" as const,
  colliders: false as const,
  linearDamping: 0.9,
  angularDamping: 0.8,
  restitution: 0.08,
  friction: 1.1,
  ccd: true,
};

// Physics-enabled replacement for NatureProp.
// Starts DROP_HEIGHT above terrain, falls via spherical gravity onto the
// biome heightfield collider. Initial orientation matches terrain slope.
const PROP_DROP = 0.7;

export function PhysicsNatureProp({
  file,
  position,
  scale = 1,
  rotationY = 0,
  heightFn,
}: {
  file: string;
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  heightFn: (x: number, z: number) => number;
}) {
  const [x, , z] = position;
  const surfaceY = heightFn(x, z);
  const q = useMemo(() => surfaceNormalQuat(x, z, heightFn, rotationY), [x, z, rotationY, heightFn]);
  const { scene } = useGLTF(MODEL_BASE + file);

  const hs = scale * 0.3; // half-size of cuboid collider

  return (
    <RigidBody
      {...DYNAMIC_BODY_PROPS}
      position={[x, surfaceY + PROP_DROP, z]}
      quaternion={[q.x, q.y, q.z, q.w]}
    >
      {/* Collider centered at hs above body origin so base sits at terrain */}
      <CuboidCollider args={[hs, hs, hs]} position={[0, hs, 0]} />
      <group rotation={[0, rotationY, 0]} scale={scale}>
        <Clone object={scene} castShadow receiveShadow />
      </group>
    </RigidBody>
  );
}

// Physics-enabled replacement for NatureTree.
// Taller CuboidCollider + wind sway preserved via a child group ref.
const TREE_DROP = 1.0;

export function PhysicsNatureTree({
  file,
  position,
  scale = 1,
  rotationY = 0,
  heightFn,
}: {
  file: string;
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  heightFn: (x: number, z: number) => number;
}) {
  const [x, , z] = position;
  const surfaceY = heightFn(x, z);
  const q = useMemo(() => surfaceNormalQuat(x, z, heightFn, rotationY), [x, z, rotationY, heightFn]);
  const { scene } = useGLTF(MODEL_BASE + file);
  const swayRef = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.sin(x * 127.1 + z * 311.7) * 10, [x, z]);

  useFrame((state) => {
    if (!swayRef.current) return;
    const t = state.clock.elapsedTime;
    swayRef.current.rotation.z =
      Math.sin(t * 0.7 + seed) * 0.025 + Math.sin(t * 1.3 + seed) * 0.012;
  });

  const halfW = scale * 0.2;
  const halfH = scale * 0.65;

  return (
    <RigidBody
      {...DYNAMIC_BODY_PROPS}
      position={[x, surfaceY + TREE_DROP, z]}
      quaternion={[q.x, q.y, q.z, q.w]}
    >
      {/* Tall thin box — bottom at body origin (terrain surface), top at 2*halfH */}
      <CuboidCollider args={[halfW, halfH, halfW]} position={[0, halfH, 0]} />
      <group rotation={[0, rotationY, 0]} scale={scale}>
        <group ref={swayRef}>
          <Clone object={scene} castShadow receiveShadow />
        </group>
      </group>
    </RigidBody>
  );
}
