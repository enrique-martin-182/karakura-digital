"use client";

import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import type { BiomeData, ViewState } from "./types";
import { WorldTerrain } from "./WorldTerrain";
import { BiomeMarkers } from "./BiomeMarkers";
import { CameraController } from "./CameraController";
import { BiomeInfoPanel } from "./BiomeInfoPanel";
import { WorldOcean } from "./WorldOcean";

function WorldScene({
  viewState,
  activeBiome,
  onSelectBiome,
  onTransitionEnd,
}: {
  viewState: ViewState;
  activeBiome: BiomeData | null;
  onSelectBiome: (b: BiomeData) => void;
  onTransitionEnd: () => void;
}) {
  return (
    <>
      <CameraController
        viewState={viewState}
        activeBiome={activeBiome}
        onTransitionEnd={onTransitionEnd}
      />

      <ambientLight intensity={0.65} color="#dff0ff" />
      <directionalLight
        position={[18, 26, 14]}
        intensity={1.9}
        color="#fff6e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-14, 12, -10]} intensity={0.45} color="#b8d8ff" />
      <hemisphereLight color="#bfe3ff" groundColor="#4a7a3a" intensity={0.5} />

      <fog attach="fog" args={["#bfe3ff", 45, 95]} />

      <WorldTerrain />
      <BiomeMarkers onSelect={onSelectBiome} viewState={viewState} />
      <WorldOcean />
    </>
  );
}

export function WorldDiorama() {
  const [viewState, setViewState] = useState<ViewState>("map");
  const [activeBiome, setActiveBiome] = useState<BiomeData | null>(null);
  const [dpr, setDpr] = useState(1.5);

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
      className="relative w-full h-[700px] rounded-2xl overflow-hidden border border-white/[0.06]"
      style={{ background: "linear-gradient(180deg, #5ec8f0 0%, #bfe3ff 55%, #e8f6ff 100%)" }}
    >
      <Canvas
        camera={{ position: [0, 25, 30], fov: 50, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={dpr}
        shadows
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={["#7cd0f0"]} />
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
          flipflops={3}
          onFallback={() => setDpr(0.85)}
        />
        <Suspense fallback={null}>
          <WorldScene
            viewState={viewState}
            activeBiome={activeBiome}
            onSelectBiome={handleSelectBiome}
            onTransitionEnd={handleTransitionEnd}
          />
          {dpr > 1 && (
            <EffectComposer multisampling={0}>
              <Bloom
                luminanceThreshold={0.7}
                luminanceSmoothing={0.3}
                intensity={0.6}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.15} darkness={0.5} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      <BiomeInfoPanel
        biome={activeBiome}
        viewState={viewState}
        onBack={handleBack}
      />

      {/* Map hint — glass-panel pattern, not a translucent label, so it reads on the bright sky background */}
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
