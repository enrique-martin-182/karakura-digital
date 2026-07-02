"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { BiomeData, ViewState } from "./types";
import { WorldTerrain } from "./WorldTerrain";
import { BiomeMarkers } from "./BiomeMarkers";
import { CameraController } from "./CameraController";
import { BiomeInfoPanel } from "./BiomeInfoPanel";
import { WorldOcean } from "./WorldOcean";
import { WorldStarfield } from "./WorldStarfield";
import { WorldAtmosphere } from "./WorldAtmosphere";

function WorldScene({
  viewState,
  activeBiome,
  onSelectBiome,
  onTransitionEnd,
  controlsRef,
}: {
  viewState: ViewState;
  activeBiome: BiomeData | null;
  onSelectBiome: (b: BiomeData) => void;
  onTransitionEnd: () => void;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  return (
    <>
      <CameraController
        viewState={viewState}
        activeBiome={activeBiome}
        onTransitionEnd={onTransitionEnd}
        controlsRef={controlsRef}
      />
      <OrbitControls
        ref={controlsRef}
        enabled={viewState !== "transitioning"}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={30}
        maxDistance={80}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI * 0.72}
        autoRotate={viewState === "map"}
        autoRotateSpeed={0.35}
      />

      <ambientLight intensity={0.8} color="#dff0ff" />
      {/* No castShadow — shadows disabled for performance */}
      <directionalLight position={[18, 26, 14]} intensity={1.9} color="#fff6e0" />
      <directionalLight position={[-14, 12, -10]} intensity={0.45} color="#b8d8ff" />
      <hemisphereLight color="#bfe3ff" groundColor="#4a7a3a" intensity={0.5} />

      <Environment resolution={32} background={false} environmentIntensity={0.5}>
        <Lightformer form="rect" intensity={2} color="#fff6e0" position={[8, 10, 4]} scale={[10, 6, 1]} />
        <Lightformer form="rect" intensity={1} color="#bfe3ff" position={[-8, 6, -4]} scale={[8, 5, 1]} />
        <Lightformer form="circle" intensity={1.5} color="#dff0ff" position={[0, 12, 0]} scale={6} />
      </Environment>

      <WorldStarfield />
      <WorldAtmosphere radius={13} />
      <WorldTerrain />
      <BiomeMarkers onSelect={onSelectBiome} viewState={viewState} />
      <WorldOcean />
    </>
  );
}

export function WorldDiorama() {
  const [viewState, setViewState] = useState<ViewState>("map");
  const [activeBiome, setActiveBiome] = useState<BiomeData | null>(null);
  const [dpr, setDpr] = useState(1);
  // Only mount the Canvas when the section is visible — stops the render loop
  // from running while the user reads other sections of the page.
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSelectBiome = useCallback((biome: BiomeData) => {
    if (viewState !== "map") return;
    setActiveBiome(biome);
    setViewState("transitioning");
  }, [viewState]);

  const handleTransitionEnd = useCallback(() => {
    setViewState("detail");
  }, []);

  const handleBack = useCallback(() => {
    setActiveBiome(null);
    setViewState("map");
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[700px] rounded-2xl overflow-hidden border border-white/[0.06]"
      style={{ background: "#02040a" }}
    >
      {visible && (
        <Canvas
          camera={{ position: [0, 32, 44], fov: 50, near: 0.1, far: 250 }}
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          dpr={dpr}
          shadows={false}
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={["#02040a"]} />
          <PerformanceMonitor
            onIncline={() => setDpr(Math.min(window.devicePixelRatio, 1.5))}
            onDecline={() => setDpr(0.85)}
            flipflops={3}
            onFallback={() => setDpr(0.7)}
          />
          <Suspense fallback={null}>
            <WorldScene
              viewState={viewState}
              activeBiome={activeBiome}
              onSelectBiome={handleSelectBiome}
              onTransitionEnd={handleTransitionEnd}
              controlsRef={controlsRef}
            />
            <EffectComposer multisampling={0}>
              <Bloom
                luminanceThreshold={0.8}
                luminanceSmoothing={0.4}
                intensity={0.5}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.15} darkness={0.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      )}

      <BiomeInfoPanel
        biome={activeBiome}
        viewState={viewState}
        onBack={handleBack}
      />

      <AnimatePresence>
        {viewState === "map" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="glass-panel flex items-center gap-2 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9l10.5-3-3 10.5L12 12l-3-3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9L4 4" />
              </svg>
              <p className="text-white text-sm font-medium">
                Haz clic en un bioma para explorarlo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
