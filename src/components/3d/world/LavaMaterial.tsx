"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Noise-based flowing lava — see tjs-shaders skill for the value-noise pattern this is built on
const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 flow = vUv * 4.0 + vec2(0.0, uTime * 0.4);
    float n = noise(flow) * 0.6 + noise(flow * 2.3 + uTime * 0.2) * 0.4;

    vec3 hot = vec3(1.0, 0.85, 0.2);
    vec3 mid = vec3(1.0, 0.35, 0.0);
    vec3 cool = vec3(0.35, 0.05, 0.0);

    vec3 color = mix(cool, mid, smoothstep(0.2, 0.55, n));
    color = mix(color, hot, smoothstep(0.6, 0.85, n));

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function LavaMaterial() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (ref.current) ref.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <shaderMaterial
      ref={ref}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      toneMapped={false}
    />
  );
}
