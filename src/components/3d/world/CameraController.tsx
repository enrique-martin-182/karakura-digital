"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { BiomeData, ViewState } from "./types";

const MAP_CAMERA_POS = new THREE.Vector3(0, 25, 30);
const MAP_CAMERA_TARGET = new THREE.Vector3(0, 0, 0);
const LERP_SPEED = 0.025;

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
  const transitionProgress = useRef(0);

  useFrame(() => {
    if (viewState === "map") {
      targetPos.current.copy(MAP_CAMERA_POS);
      targetLook.current.copy(MAP_CAMERA_TARGET);
      transitionProgress.current = 0;
    } else if (activeBiome && (viewState === "transitioning" || viewState === "detail")) {
      const bp = activeBiome.detailCameraPosition;
      const bt = activeBiome.detailCameraTarget;
      targetPos.current.set(bp[0], bp[1], bp[2]);
      targetLook.current.set(bt[0], bt[1], bt[2]);
    }

    camera.position.lerp(targetPos.current, LERP_SPEED);
    lookAt.current.lerp(targetLook.current, LERP_SPEED);
    camera.lookAt(lookAt.current);

    if (viewState === "transitioning") {
      const dist = camera.position.distanceTo(targetPos.current);
      if (dist < 0.3) {
        transitionProgress.current = 1;
        onTransitionEnd();
      }
    }
  });

  return null;
}
