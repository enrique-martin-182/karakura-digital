"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const waterVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float wave1 = sin(pos.x * 2.0 + uTime * 1.5) * 0.05;
    float wave2 = sin(pos.y * 3.0 + uTime * 2.0) * 0.03;
    float wave3 = cos(pos.x * 1.5 + pos.y * 2.0 + uTime) * 0.04;
    pos.z += wave1 + wave2 + wave3;
    vElevation = wave1 + wave2 + wave3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const waterFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 deepColor = vec3(0.02, 0.12, 0.15);
    vec3 shallowColor = vec3(0.05, 0.25, 0.3);
    vec3 foamColor = vec3(0.4, 0.6, 0.6);

    float mixFactor = vElevation * 5.0 + 0.5;
    vec3 color = mix(deepColor, shallowColor, clamp(mixFactor, 0.0, 1.0));

    // Shimmer
    float shimmer = sin(vUv.x * 40.0 + uTime * 3.0) * sin(vUv.y * 30.0 + uTime * 2.0);
    color += foamColor * max(0.0, shimmer) * 0.15;

    // Foam at edges
    float foam = smoothstep(0.04, 0.06, vElevation);
    color = mix(color, foamColor, foam * 0.3);

    gl_FragColor = vec4(color, 0.85);
  }
`;

function River() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(6, 60, 32, 128);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const z = pos.getY(i);
      const offset = Math.sin(z * 0.3) * 3;
      pos.setX(i, pos.getX(i) + offset);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.3, 0]}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function WaterfallStream() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 800;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const rng = (seed: number) => Math.abs(Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = -5 + rng(i * 6) * 2.5;
      pos[i * 3 + 1] = 3 + rng(i * 6 + 1) * 4;
      pos[i * 3 + 2] = -8 + rng(i * 6 + 2) * 1;
      vel[i * 3] = (rng(i * 6 + 3) - 0.5) * 0.02;
      vel[i * 3 + 1] = -0.03 - rng(i * 6 + 4) * 0.05;
      vel[i * 3 + 2] = (rng(i * 6 + 5) - 0.5) * 0.02;
    }

    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    const pos = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset particles that fall below terrain
      if (arr[i * 3 + 1] < -0.5) {
        arr[i * 3] = -5 + Math.random() * 2.5;
        arr[i * 3 + 1] = 3 + Math.random() * 4;
        arr[i * 3 + 2] = -8 + Math.random() * 1;
      }
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7ac8d8"
        size={0.08}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Waterfall cliff rocks
function WaterfallRocks() {
  const rocks = useMemo(() => {
    const r: { pos: [number, number, number]; scale: [number, number, number]; rot: number; tiltX: number; tiltZ: number }[] = [];
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 0.8 - Math.PI * 0.2;
      // Seeded pseudo-random per rock index
      const rng = (offset: number) => Math.abs((Math.sin(i * 127.1 + offset) * 43758.5453) % 1);
      r.push({
        pos: [
          -5 + Math.cos(angle) * (2 + rng(1)),
          1.5 + rng(2) * 3,
          -8 + Math.sin(angle) * (1 + rng(3)),
        ],
        scale: [
          0.5 + rng(4) * 1,
          0.5 + rng(5) * 1.5,
          0.5 + rng(6) * 0.8,
        ],
        rot: rng(7) * Math.PI,
        tiltX: rng(8) * 0.3,
        tiltZ: rng(9) * 0.2,
      });
    }
    return r;
  }, []);

  return (
    <group>
      {rocks.map((rock, i) => (
        <mesh
          key={i}
          position={rock.pos}
          scale={rock.scale}
          rotation={[rock.tiltX, rock.rot, rock.tiltZ]}
          castShadow
        >
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#3a3a30"
            roughness={0.95}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

// Splash mist at waterfall base
function WaterfallMist() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rng = (seed: number) => Math.abs(Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = -5 + (rng(i * 3) - 0.5) * 4;
      pos[i * 3 + 1] = rng(i * 3 + 1) * 1.5;
      pos[i * 3 + 2] = -8 + (rng(i * 3 + 2) - 0.5) * 3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t + i) * 0.003;
      if (arr[i * 3 + 1] > 2) arr[i * 3 + 1] = 0;
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#aaddee"
        size={0.15}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function Water() {
  return (
    <group>
      <River />
      <WaterfallRocks />
      <WaterfallStream />
      <WaterfallMist />
    </group>
  );
}
