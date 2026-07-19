"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { BiomeData, ViewState } from "./types";

const MAP_CAMERA_POS = new THREE.Vector3(0, 32, 44);
const MAP_CAMERA_TARGET = new THREE.Vector3(0, 0, 0);

// Frame-rate-independent smoothing factor (tjs-animation skill): position settles slower
// than the look-at target so the camera "leads" into frame, a subtle follow-through cue.
const POS_SMOOTHING = 0.0028;
const LOOK_SMOOTHING = 0.012;

export function CameraController({
  viewState,
  activeBiome,
  onTransitionEnd,
  controlsRef,
}: {
  viewState: ViewState;
  activeBiome: BiomeData | null;
  onTransitionEnd: () => void;
  controlsRef: RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const targetPos = useRef(MAP_CAMERA_POS.clone());
  const targetLook = useRef(MAP_CAMERA_TARGET.clone());
  const lookAt = useRef(MAP_CAMERA_TARGET.clone());
  // Starts true so the camera flies into its initial position on mount; after that, it only
  // re-engages on a genuine view change, so OrbitControls owns the camera the rest of the time —
  // this is what makes the diorama rotatable without fighting the cinematic transitions.
  const easing = useRef(true);
  const prevViewState = useRef<ViewState>(viewState);

  useEffect(() => {
    if (prevViewState.current !== viewState) {
      easing.current = true;
      prevViewState.current = viewState;
    }
  }, [viewState]);

  useFrame((_, delta) => {
    if (viewState === "map") {
      targetPos.current.copy(MAP_CAMERA_POS);
      targetLook.current.copy(MAP_CAMERA_TARGET);
    } else if (activeBiome) {
      const bp = activeBiome.detailCameraPosition;
      const bt = activeBiome.detailCameraTarget;
      targetPos.current.set(bp[0], bp[1], bp[2]);
      targetLook.current.set(bt[0], bt[1], bt[2]);
    }

    if (!easing.current) return;

    const posAlpha = 1 - Math.pow(POS_SMOOTHING, delta);
    const lookAlpha = 1 - Math.pow(LOOK_SMOOTHING, delta);
    camera.position.lerp(targetPos.current, posAlpha);
    lookAt.current.lerp(targetLook.current, lookAlpha);

    const controls = controlsRef.current;
    if (controls) {
      controls.target.copy(lookAt.current);
      controls.update();
    } else {
      camera.lookAt(lookAt.current);
    }

    const dist = camera.position.distanceTo(targetPos.current);
    if (dist < 0.15) {
      easing.current = false;
      if (viewState === "transitioning") onTransitionEnd();
    }
  });

  return null;
}
