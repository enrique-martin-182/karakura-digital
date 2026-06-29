import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

// Concept: Two opposing force fields — chaos (red/error side) dissolving into order (green side)
// Particles drift from left chaotic pattern to right organized grid

const TOTAL_FRAMES = 360;

interface FloatingParticle {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  phaseOffset: number;
  amplitude: number;
  side: "chaos" | "order";
}

function generateParticles(): FloatingParticle[] {
  const particles: FloatingParticle[] = [];
  for (let i = 0; i < 40; i++) {
    const side = i < 20 ? "chaos" : "order";
    const baseX = side === "chaos"
      ? 100 + (i % 5) * 160 + ((i * 37) % 80)
      : 1020 + ((i - 20) % 5) * 160 + ((i * 23) % 40);
    const baseY = 100 + ((i * 67) % 880);
    particles.push({
      id: i,
      baseX,
      baseY,
      size: 3 + (i % 4) * 1.5,
      phaseOffset: (i * 31) % TOTAL_FRAMES,
      amplitude: side === "chaos" ? 30 + (i % 3) * 15 : 5 + (i % 3) * 3,
      side,
    });
  }
  return particles;
}

const particles = generateParticles();

export const GapBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const loopProgress = frame / TOTAL_FRAMES;
  const angle = loopProgress * Math.PI * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "#00110c" }}>
      {/* Dividing line / gradient in the center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: 2,
          height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(78,222,163,0.3), transparent)",
          transform: "translateX(-50%)",
        }}
      />

      {/* Left ambient — error red subtle */}
      <div
        style={{
          position: "absolute",
          left: "15%",
          top: "30%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,180,171,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: interpolate(Math.sin(angle), [-1, 1], [0.3, 0.7]),
        }}
      />

      {/* Right ambient — green success */}
      <div
        style={{
          position: "absolute",
          right: "15%",
          top: "30%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(78,222,163,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: interpolate(Math.sin(angle + Math.PI), [-1, 1], [0.4, 0.8]),
        }}
      />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Chaos side: particles move erratically */}
        {particles.filter(p => p.side === "chaos").map((p) => {
          const pAngle = angle + (p.phaseOffset / TOTAL_FRAMES) * Math.PI * 2;
          const x = p.baseX + Math.sin(pAngle * 2.3) * p.amplitude;
          const y = p.baseY + Math.cos(pAngle * 1.7) * p.amplitude * 0.8;
          const opacity = interpolate(Math.sin(pAngle), [-1, 1], [0.2, 0.6]);
          return (
            <g key={p.id}>
              <circle cx={x} cy={y} r={p.size * 2} fill="rgba(255,180,171,0.1)" />
              <circle cx={x} cy={y} r={p.size} fill="#ffb4ab" opacity={opacity} />
            </g>
          );
        })}

        {/* Order side: particles move gently in formation */}
        {particles.filter(p => p.side === "order").map((p) => {
          const pAngle = angle + (p.phaseOffset / TOTAL_FRAMES) * Math.PI * 2;
          const x = p.baseX + Math.sin(pAngle) * p.amplitude;
          const y = p.baseY + Math.cos(pAngle) * p.amplitude;
          const opacity = interpolate(Math.sin(pAngle), [-1, 1], [0.4, 0.9]);
          return (
            <g key={p.id}>
              <circle cx={x} cy={y} r={p.size * 2.5} fill="rgba(78,222,163,0.08)" />
              <circle cx={x} cy={y} r={p.size} fill="#4edea3" opacity={opacity} />
              <circle cx={x} cy={y} r={p.size * 0.4} fill="#ffffff" opacity={opacity * 0.6} />
            </g>
          );
        })}

        {/* Connecting threads on the order side */}
        {particles.filter(p => p.side === "order").slice(0, 10).map((p, i, arr) => {
          if (i === arr.length - 1) return null;
          const next = arr[i + 1];
          const pAngle = angle + (p.phaseOffset / TOTAL_FRAMES) * Math.PI * 2;
          const nAngle = angle + (next.phaseOffset / TOTAL_FRAMES) * Math.PI * 2;
          const x1 = p.baseX + Math.sin(pAngle) * p.amplitude;
          const y1 = p.baseY + Math.cos(pAngle) * p.amplitude;
          const x2 = next.baseX + Math.sin(nAngle) * next.amplitude;
          const y2 = next.baseY + Math.cos(nAngle) * next.amplitude;
          return (
            <line
              key={`line-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(78,222,163,0.15)"
              strokeWidth={1}
            />
          );
        })}
      </svg>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, #00110c 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
