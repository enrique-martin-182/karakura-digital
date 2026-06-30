"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { BiomeData, ViewState } from "./types";

const MAP_CAMERA_POS = new THREE.Vector3(0, 25, 30);
const MAP_CAMERA_TARGET = new THREE.Vector3(0, 0, 0);

// Frame-rate-independent smoothing factor (tjs-animation skill): position settles slower
// than the look-at target so the camera "leads" into frame, a subtle follow-through cue.
const POS_SMOOTHING = 0.0028;
const LOOK_SMOOTHING = 0.012;

export function CameraController({
  viewState,
  activeBiome,
  onTransitionEnd,
}: {
  viewState: ViewState;
  activeBiome: BiomeData | null;
  onTransitionEnd: () => void;
}) {
  const { camera } = useThree();
  const targetPos = useRef(MAP_CAMERA_POS.clone());
  const targetLook = useRef(MAP_CAMERA_TARGET.clone());
  const lookAt = useRef(MAP_CAMERA_TARGET.clone());
  const hasSettled = useRef(false);

  useFrame((_, delta) => {
    if (viewState === "map") {
      targetPos.current.copy(MAP_CAMERA_POS);
      targetLook.current.copy(MAP_CAMERA_TARGET);
      hasSettled.current = false;
    } else if (activeBiome && (viewState === "transitioning" || viewState === "detail")) {
      const bp = activeBiome.detailCameraPosition;
      const bt = activeBiome.detailCameraTarget;
      targetPos.current.set(bp[0], bp[1], bp[2]);
      targetLook.current.set(bt[0], bt[1], bt[2]);
    }

    const posAlpha = 1 - Math.pow(POS_SMOOTHING, delta);
    const lookAlpha = 1 - Math.pow(LOOK_SMOOTHING, delta);
    camera.position.lerp(targetPos.current, posAlpha);
    lookAt.current.lerp(targetLook.current, lookAlpha);
    camera.lookAt(lookAt.current);

    if (viewState === "transitioning" && !hasSettled.current) {
      const dist = camera.position.distanceTo(targetPos.current);
      if (dist < 0.4) {
        hasSettled.current = true;
        onTransitionEnd();
      }
    }
  });

  return null;
}
