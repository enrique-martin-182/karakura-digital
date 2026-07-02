"use client";

import { useState, useCallback, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, N8AO } from "@react-three/postprocessing";
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
      {/* Lets visitors drag to orbit the diorama. Disabled mid-flight ("transitioning") so user
          input can't fight the cinematic camera move; CameraController hands control back here
          once it settles at the map or biome-detail framing. */}
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

      <ambientLight intensity={0.65} color="#dff0ff" />
      <directionalLight
        position={[18, 26, 14]}
        intensity={1.9}
        color="#fff6e0"
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-near={20}
        shadow-camera-far={65}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-14, 12, -10]} intensity={0.45} color="#b8d8ff" />
      <hemisphereLight color="#bfe3ff" groundColor="#4a7a3a" intensity={0.5} />

      {/* Procedural IBL built from Lightformers — no external HDR fetch (preset="..." downloads
          from a CDN and hard-crashes the scene if that request fails, which it did in testing; a
          synthetic sky offline is more reliable in production anyway). Gives PBR/physical
          materials (ice, water, rocks) a believable ambient reflection instead of flat-lit. */}
      <Environment resolution={64} background={false} environmentIntensity={0.6}>
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
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

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
      style={{ background: "#02040a" }}
    >
      <Canvas
        camera={{ position: [0, 32, 44], fov: 50, near: 0.1, far: 250 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={dpr}
        shadows
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
          {dpr > 1 && (
            <EffectComposer multisampling={0}>
              {/* Real screen-space AO: darkens contact creases between every tree/rock/prop and the
                  ground automatically, on top of the per-island baked ContactShadows blobs. This is
                  the single biggest "looks professionally rendered" lever left at this asset tier. */}
              <N8AO aoRadius={0.9} intensity={2.2} distanceFalloff={1} color="#0a1f14" />
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
