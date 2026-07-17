"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// ─── GLSL ───────────────────────────────────────────────────────────────────

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2  vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Multi-layer sine waves — organic, not mechanical
    float wave1 = sin(pos.x * 2.8 + uTime * 0.7  + uMouse.x * 1.8) * 0.07;
    float wave2 = cos(pos.y * 3.6 + uTime * 1.1  + uMouse.y * 1.8) * 0.05;
    float wave3 = sin(pos.x * 1.4 - pos.y * 2.1  + uTime * 0.5)    * 0.04;
    float wave4 = cos(pos.x * 4.5 + pos.y * 3.2  + uTime * 1.4)    * 0.02;

    // Mouse proximity ripple centered on text
    float dist   = length(vec2(pos.x, pos.y * 1.8) - uMouse * 2.5);
    float ripple = sin(dist * 4.0 - uTime * 2.5) * exp(-dist * 0.6) * 0.12;

    pos.z += wave1 + wave2 + wave3 + wave4 + ripple;
    pos.y += sin(pos.x * 1.8 + uTime * 0.55) * 0.015;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float     uTime;
  varying vec2      vUv;

  void main() {
    // Chromatic aberration — split RGB channels slightly
    float ca = 0.004 + sin(uTime * 0.4) * 0.002;
    float r  = texture2D(uTexture, vUv + vec2( ca, 0.0)).r;
    float g  = texture2D(uTexture, vUv                 ).g;
    float b  = texture2D(uTexture, vUv - vec2( ca, 0.0)).b;
    float a  = texture2D(uTexture, vUv                 ).a;

    if (a < 0.04) discard;

    // Subtle luminance pulse
    float pulse = 0.92 + sin(uTime * 1.2) * 0.08;
    gl_FragColor = vec4(vec3(r, g, b) * pulse, a * 0.97);
  }
`;

// ─── Canvas texture ──────────────────────────────────────────────────────────

function buildTexture(): THREE.CanvasTexture {
  const W = 2048, H = 560;
  const canvas = document.createElement("canvas");
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Gradient fill: orange → green (brand colors)
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0,    "#ff7a00");
  grad.addColorStop(0.55, "#ff9a33");
  grad.addColorStop(1,    "#4edea3");

  ctx.font = `900 ${Math.round(H * 0.52)}px "Arial Black", "Impact", Arial, sans-serif`;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle    = grad;
  ctx.fillText("KARAKURA", W / 2, H / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ─── Warp mesh ───────────────────────────────────────────────────────────────

function WarpMesh() {
  const matRef    = useRef<THREE.ShaderMaterial>(null);
  const mouseSmooth = useRef(new THREE.Vector2());
  const { pointer, viewport } = useThree();

  const texture = useMemo(() => {
    if (typeof window === "undefined") return new THREE.Texture();
    return buildTexture();
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime:    { value: 0 },
      uMouse:   { value: new THREE.Vector2() },
      uTexture: { value: texture },
    }),
    [texture]
  );

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    mouseSmooth.current.lerp(pointer, 0.04);
    matRef.current.uniforms.uTime.value  = clock.getElapsedTime();
    matRef.current.uniforms.uMouse.value.copy(mouseSmooth.current);
  });

  // Keep aspect ratio of canvas texture: 2048/560 ≈ 3.657
  const ASPECT = 2048 / 560;
  const w = Math.min(viewport.width * 0.92, 11);
  const h = w / ASPECT;

  return (
    <mesh>
      {/* High subdivision = smooth vertex displacement */}
      <planeGeometry args={[w, h, 160, 48]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────

function Scene() {
  return (
    <>
      <WarpMesh />
    </>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface HeroWebGLProps {
  /** Content rendered on top of the canvas (buttons, copy, etc.) */
  children?: React.ReactNode;
  className?: string;
}

export function HeroWebGL({ children, className = "" }: HeroWebGLProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: "100vh" }}
    >
      {/* WebGL canvas — always behind content */}
      {!shouldReduceMotion && (
        <Canvas
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            // Isolated GPU layer — no paint-triggering
            willChange: "transform",
            contain: "strict",
          }}
          camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          frameloop="always"
          aria-hidden="true"
        >
          <Scene />
        </Canvas>
      )}

      {/* Reduced-motion fallback: static gradient text */}
      {shouldReduceMotion && (
        <p
          className="text-gradient-primary font-black text-[clamp(4rem,12vw,9rem)] tracking-tighter select-none pointer-events-none absolute"
          aria-hidden="true"
        >
          KARAKURA
        </p>
      )}

      {/* Foreground slot */}
      {children && (
        <div className="relative z-10 w-full">{children}</div>
      )}
    </div>
  );
}
