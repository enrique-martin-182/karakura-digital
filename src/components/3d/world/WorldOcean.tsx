"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Spherical ocean: a closed sphere of radius 9.8 (slightly inside the R=10 terrain tiles so
// island terrain surfaces stick up above the waterline). Waves are noise-based radial displace-
// ment along the sphere normal — no Gerstner needed for a globe, spherical UVs give natural
// tiling. Fragment shader keeps the same vivid turquoise + fresnel + sparkle look.

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vWaveHeight;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0; float amp = 0.5;
    for (int i = 0; i < 5; i++) { v += noise(p) * amp; p *= 2.07; amp *= 0.55; }
    return v;
  }

  void main() {
    // Spherical UVs from the vertex position direction — avoids seam at the prime meridian
    // because our geometry sphere is closed and UVs are baked in by Three.js.
    vec2 sphereUV = uv * vec2(6.28318, 3.14159);

    // Two overlapping fbm layers at different scales and speeds for natural ocean chop.
    float wave1 = fbm(sphereUV * 1.2 + vec2(uTime * 0.055, uTime * 0.038));
    float wave2 = fbm(sphereUV * 2.5 + vec2(-uTime * 0.03, uTime * 0.06));
    float waveH = (wave1 * 0.7 + wave2 * 0.3 - 0.5) * 0.18;

    vec3 displaced = position + normal * waveH;
    vNormal = normalize(normalMatrix * normal);
    vWaveHeight = waveH;

    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uCameraPosition;
  uniform vec3 uSunDirection;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vWaveHeight;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0; float amp = 0.5;
    for (int i = 0; i < 4; i++) { v += noise(p) * amp; p *= 2.07; amp *= 0.55; }
    return v;
  }

  void main() {
    vec2 flow = vWorldPos.xz * 1.6 + vec2(uTime * 0.06, uTime * 0.04);
    float n = fbm(flow) - 0.5;
    float sparkleN = fbm(vWorldPos.xz * 9.0 + vec2(uTime * 0.15, -uTime * 0.1));

    // Perturb the sphere normal slightly with noise for micro-surface detail.
    vec3 normal = normalize(vNormal + vec3(n * 0.4, 0.0, n * 0.4));
    vec3 sparkleNormal = normalize(vNormal + vec3((sparkleN - 0.5) * 1.2, 0.0, (sparkleN - 0.5) * 1.2));
    vec3 viewDir = normalize(uCameraPosition - vWorldPos);
    vec3 sunDir = normalize(uSunDirection);

    vec3 deep    = vec3(0.01, 0.10, 0.22);
    vec3 shallow = vec3(0.03, 0.30, 0.50);
    vec3 skyColor = vec3(0.08, 0.28, 0.55);
    vec3 foam    = vec3(0.96, 0.99, 1.0);

    // Fresnel uses the sphere surface normal — naturally varies from deep (top-down)
    // to sky-reflective (edge-on) around the entire globe.
    float fresnel = pow(1.0 - clamp(dot(viewDir, normalize(vNormal)), 0.0, 1.0), 5.0);
    vec3 base = mix(deep, shallow, clamp(n * 0.7 + 0.3, 0.0, 1.0));
    vec3 color = mix(base, skyColor, fresnel * 0.35);

    // Broad specular
    vec3 halfDir = normalize(sunDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 50.0);
    color += vec3(1.0, 0.97, 0.85) * spec * 0.45;

    // Glitter
    float glintDot = pow(max(dot(sparkleNormal, halfDir), 0.0), 30.0);
    float glint = smoothstep(0.82, 0.95, sparkleN) * glintDot;
    color += vec3(1.0, 0.99, 0.92) * glint * 4.5;

    // Foam at wave crests
    float crest = smoothstep(0.02, 0.07, vWaveHeight + n * 0.04);
    color = mix(color, foam, crest * 0.7);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function WorldOcean() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();

  // Sphere slightly inside R=10 so terrain tiles poke above the waterline.
  // 96 subdivisions: enough resolution for smooth wave displacement without GPU strain.
  const geometry = useMemo(() => new THREE.SphereGeometry(9.8, 96, 96), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() },
      uSunDirection: { value: new THREE.Vector3(18, 26, 14).normalize() },
    }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.uniforms.uTime.value = state.clock.elapsedTime;
    ref.current.uniforms.uCameraPosition.value.copy(camera.position);
  });

  return (
    <mesh geometry={geometry} receiveShadow>
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        toneMapped={false}
      />
    </mesh>
  );
}
