"use client";

import { Suspense, useRef, useEffect, useCallback, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Terrain } from "./Terrain";
import { Trees } from "./Trees";
import { Water } from "./Water";
import { Animals } from "./Animals";
import { Atmosphere } from "./Atmosphere";
import { ProjectMarkers, type Project3D } from "./ProjectMarkers";
import { ProjectPanel } from "./ProjectPanel";

// Smooth camera animation to project markers
function CameraAnimator({
  target,
  onAnimationComplete,
}: {
  target: Project3D | null;
  onAnimationComplete: () => void;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(15, 12, 15));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);
  const progress = useRef(0);

  useEffect(() => {
    if (target) {
      targetPos.current.set(...target.cameraPosition);
      targetLookAt.current.set(...target.cameraTarget);
      isAnimating.current = true;
      progress.current = 0;
    } else {
      targetPos.current.set(15, 12, 15);
      targetLookAt.current.set(0, 0, 0);
      isAnimating.current = true;
      progress.current = 0;
    }
  }, [target]);

  useFrame(() => {
    if (!isAnimating.current) return;

    progress.current += 0.015;
    const t = Math.min(progress.current, 1);
    // Ease in-out cubic
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    camera.position.lerp(targetPos.current, ease * 0.05);
    const currentLookAt = new THREE.Vector3();
    currentLookAt.lerp(targetLookAt.current, ease * 0.05);

    camera.lookAt(
      camera.position.x + (targetLookAt.current.x - camera.position.x) * ease * 0.05,
      camera.position.y + (targetLookAt.current.y - camera.position.y) * ease * 0.05,
      camera.position.z + (targetLookAt.current.z - camera.position.z) * ease * 0.05
    );

    if (t >= 1) {
      isAnimating.current = false;
      onAnimationComplete();
    }
  });

  return null;
}

// Scene lighting setup
function Lighting() {
  return (
    <>
      {/* Warm sunset ambient */}
      <ambientLight intensity={0.15} color="#ffd4a0" />

      {/* Main sun (golden hour angle) */}
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.2}
        color="#ffc070"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={60}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.001}
      />

      {/* Cool fill from opposite side */}
      <directionalLight
        position={[-10, 8, -10]}
        intensity={0.3}
        color="#6090c0"
      />

      {/* Waterfall area accent light */}
      <pointLight
        position={[-5, 4, -8]}
        intensity={8}
        color="#70c8e0"
        distance={12}
        decay={2}
      />

      {/* Warm ground bounce */}
      <pointLight
        position={[0, 0.5, 0]}
        intensity={3}
        color="#ffa050"
        distance={20}
        decay={2}
      />
    </>
  );
}

function SceneContent({
  selectedProject,
  onSelectProject,
}: {
  selectedProject: Project3D | null;
  onSelectProject: (p: Project3D | null) => void;
}) {
  return (
    <>
      <Lighting />
      <Stars radius={80} depth={40} count={1500} factor={3} saturation={0.2} />

      <Terrain />
      <Trees />
      <Water />
      <Animals />
      <Atmosphere />

      <ProjectMarkers
        onSelect={onSelectProject}
        selectedId={selectedProject?.id ?? null}
      />

      <CameraAnimator
        target={selectedProject}
        onAnimationComplete={() => {}}
      />

      {/* Fog */}
      <fog attach="fog" args={["#0a1a12", 15, 55]} />
    </>
  );
}

export function ForestScene() {
  const [selectedProject, setSelectedProject] = useState<Project3D | null>(
    null
  );

  const handleSelect = useCallback((p: Project3D | null) => {
    setSelectedProject(p);
  }, []);

  return (
    <div className="relative w-full h-[700px] rounded-2xl overflow-hidden border border-white/[0.06]">
      {/* Loading overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs text-white/40">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span>Arrastra para explorar · Haz clic en los orbes para ver proyectos</span>
        </div>
      </div>

      {/* Project info panel */}
      <ProjectPanel
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Canvas
        shadows
        camera={{ position: [15, 12, 15], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8,
        }}
        style={{ background: "#0a1a12" }}
      >
        <Suspense fallback={null}>
          <SceneContent
            selectedProject={selectedProject}
            onSelectProject={handleSelect}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom
          enableRotate
          minDistance={5}
          maxDistance={35}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={0.3}
          autoRotate={!selectedProject}
          autoRotateSpeed={0.3}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
