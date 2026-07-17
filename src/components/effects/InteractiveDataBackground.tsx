"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// ─── Tuning ──────────────────────────────────────────────────────────────────

const NODE_COUNT     = 150;
const CONN_RADIUS    = 3.6;   // world units — max edge length
const MOUSE_RADIUS   = 3.0;   // world units — glow zone
const MAX_PULSES     = 10;
const PULSE_SPEED    = 0.75;  // fraction of edge / second
const SPAWN_INTERVAL = 0.55;  // seconds between new pulse spawns

// ─── Palette ─────────────────────────────────────────────────────────────────

const C_NODE_OFF = new THREE.Color("#060f0a");
const C_NODE_ON  = new THREE.Color("#4edea3");
const C_LINE_OFF = new THREE.Color("#091408");
const C_LINE_ON  = new THREE.Color("#4edea3");
const C_PULSE    = new THREE.Color("#ff7a00");

// ─── Precomputed topology (stable across renders) ─────────────────────────────

const POSITIONS: THREE.Vector3[] = Array.from({ length: NODE_COUNT }, () =>
  new THREE.Vector3(
    (Math.random() - 0.5) * 26,
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 6,
  )
);

const EDGES: [number, number][] = [];
for (let i = 0; i < NODE_COUNT; i++) {
  let deg = 0;
  for (let j = i + 1; j < NODE_COUNT; j++) {
    if (deg >= 5) break; // cap degree to avoid hairball
    if (POSITIONS[i].distanceTo(POSITIONS[j]) < CONN_RADIUS) {
      EDGES.push([i, j]);
      deg++;
    }
  }
}

const EDGE_LENGTHS = EDGES.map(([a, b]) => POSITIONS[a].distanceTo(POSITIONS[b]));

// Reusable scratch objects — allocated once, never recreated
const _tmpColor = new THREE.Color();
const _tmpPos   = new THREE.Vector3();
const _tmpMat   = new THREE.Matrix4();
const _q0       = new THREE.Quaternion();
const _pScale   = new THREE.Vector3(0.16, 0.16, 0.16);
const _hide     = new THREE.Vector3(0, 0, 0);

// ─── Scene ───────────────────────────────────────────────────────────────────

interface Pulse { edge: number; t: number }

function DataNetwork() {
  const { viewport } = useThree();

  const nodesMesh  = useRef<THREE.InstancedMesh>(null);
  const pulsesMesh = useRef<THREE.InstancedMesh>(null);
  const lineColRef = useRef<THREE.BufferAttribute>(null);

  const mouseNDC   = useRef({ x: 0, y: 0 });
  const pulses     = useRef<Pulse[]>([]);
  const lastSpawn  = useRef(0);

  // ── Build initial InstancedMesh matrices ──────────────────────────────────
  useEffect(() => {
    const mesh = nodesMesh.current;
    if (!mesh) return;
    POSITIONS.forEach((pos, i) => {
      _tmpMat.setPosition(pos);
      mesh.setMatrixAt(i, _tmpMat);
      mesh.setColorAt(i, C_NODE_OFF);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, []);

  useEffect(() => {
    const mesh = pulsesMesh.current;
    if (!mesh) return;
    _tmpMat.compose(_hide, _q0, _hide); // scale-zero = invisible
    for (let i = 0; i < MAX_PULSES; i++) mesh.setMatrixAt(i, _tmpMat);
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, []);

  // ── Track mouse via window (Canvas has pointer-events:none) ──────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNDC.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Line geometry (colors updated every frame) ────────────────────────────
  const lineColors = useMemo(() => {
    const buf = new Float32Array(EDGES.length * 6);
    for (let i = 0; i < EDGES.length; i++) {
      C_LINE_OFF.toArray(buf, i * 6);
      C_LINE_OFF.toArray(buf, i * 6 + 3);
    }
    return buf;
  }, []);

  const linePositions = useMemo(() => {
    const buf = new Float32Array(EDGES.length * 6);
    EDGES.forEach(([a, b], i) => {
      POSITIONS[a].toArray(buf, i * 6);
      POSITIONS[b].toArray(buf, i * 6 + 3);
    });
    return buf;
  }, []);

  // ── Main loop ─────────────────────────────────────────────────────────────
  useFrame(({ clock }, delta) => {
    const nodes  = nodesMesh.current;
    const pulseM = pulsesMesh.current;
    const lineCols = lineColRef.current;
    if (!nodes || !pulseM || !lineCols) return;

    const t    = clock.getElapsedTime();
    const hwx  = viewport.width  / 2;
    const hwy  = viewport.height / 2;
    const mx   = mouseNDC.current.x * hwx;
    const my   = mouseNDC.current.y * hwy;
    const mr2  = MOUSE_RADIUS * MOUSE_RADIUS;

    // ── 1. Node colors ────────────────────────────────────────────────────
    const active = new Uint8Array(NODE_COUNT); // 0 = off, 1 = on
    for (let i = 0; i < NODE_COUNT; i++) {
      const p  = POSITIONS[i];
      const dx = p.x - mx;
      const dy = p.y - my;
      const on = dx * dx + dy * dy < mr2;
      active[i] = on ? 1 : 0;

      // Subtle ambient flicker on inactive nodes
      if (on) {
        nodes.setColorAt(i, C_NODE_ON);
      } else {
        const flicker = 0.35 + Math.sin(t * 1.4 + i * 0.9) * 0.2;
        _tmpColor.copy(C_NODE_OFF).multiplyScalar(flicker + 0.65);
        nodes.setColorAt(i, _tmpColor);
      }
    }
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;

    // ── 2. Line colors ────────────────────────────────────────────────────
    const lca = lineCols.array as Float32Array;
    for (let i = 0; i < EDGES.length; i++) {
      const [a, b] = EDGES[i];
      const col = (active[a] || active[b]) ? C_LINE_ON : C_LINE_OFF;
      col.toArray(lca, i * 6);
      col.toArray(lca, i * 6 + 3);
    }
    lineCols.needsUpdate = true;

    // ── 3. Spawn pulse ────────────────────────────────────────────────────
    if (t - lastSpawn.current > SPAWN_INTERVAL && pulses.current.length < MAX_PULSES) {
      pulses.current.push({
        edge: Math.floor(Math.random() * EDGES.length),
        t: 0,
      });
      lastSpawn.current = t;
    }

    // ── 4. Advance + render pulses ────────────────────────────────────────
    const next: Pulse[] = [];
    for (const pulse of pulses.current) {
      pulse.t += PULSE_SPEED * delta / (EDGE_LENGTHS[pulse.edge] || 1);
      if (pulse.t > 1) continue;

      const [a, b] = EDGES[pulse.edge];
      _tmpPos.lerpVectors(POSITIONS[a], POSITIONS[b], pulse.t);
      _tmpMat.compose(_tmpPos, _q0, _pScale);
      pulseM.setMatrixAt(next.length, _tmpMat);
      next.push(pulse);
    }
    // Zero out vacated slots
    _tmpMat.compose(_hide, _q0, _hide);
    for (let i = next.length; i < MAX_PULSES; i++) pulseM.setMatrixAt(i, _tmpMat);
    pulses.current = next;
    pulseM.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      {/* Nodes */}
      <instancedMesh ref={nodesMesh} args={[undefined, undefined, NODE_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.065, 6, 6]} />
        <meshBasicMaterial vertexColors />
      </instancedMesh>

      {/* Orange data-flow pulses */}
      <instancedMesh ref={pulsesMesh} args={[undefined, undefined, MAX_PULSES]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={C_PULSE} />
      </instancedMesh>

      {/* Edges */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            ref={lineColRef}
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors />
      </lineSegments>
    </>
  );
}

// ─── Fallback skeleton ────────────────────────────────────────────────────────

function Fallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(78,222,163,0.03), transparent 70%)",
      }}
    />
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function InteractiveDataBackground({ className = "", style }: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <Fallback />;

  return (
    <Canvas
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        willChange: "transform",
        contain: "strict",
        ...style,
      }}
      camera={{ position: [0, 0, 18], fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      dpr={[1, 1]}
      frameloop="always"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <DataNetwork />
      </Suspense>
    </Canvas>
  );
}
