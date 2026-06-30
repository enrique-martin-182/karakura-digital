"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float e = sin(pos.x * 0.6 + uTime * 0.8) * 0.06
            + sin(pos.y * 0.9 + uTime * 1.1) * 0.04
            + cos(pos.x * 0.3 + pos.y * 0.4 + uTime * 0.5) * 0.05;
    pos.z += e;
    vElevation = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 deep = vec3(0.04, 0.32, 0.62);
    vec3 shallow = vec3(0.15, 0.62, 0.86);
    vec3 foam = vec3(0.92, 0.98, 1.0);

    float mixFactor = vElevation * 4.0 + 0.5;
    vec3 color = mix(deep, shallow, clamp(mixFactor, 0.0, 1.0));

    float sparkle = sin(vUv.x * 60.0 + uTime * 2.0) * sin(vUv.y * 50.0 + uTime * 1.4);
    color += foam * max(0.0, sparkle) * 0.08;

    float crest = smoothstep(0.05, 0.09, vElevation);
    color = mix(color, foam, crest * 0.5);

    gl_FragColor = vec4(color, 0.92);
  }
`;

export function WorldOcean() {
  const ref = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(100, 100, 80, 80), []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (ref.current) ref.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
