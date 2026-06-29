import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Concept: Three hexagonal zones representing the three services
// Hexagons breathe/pulse with gentle rotation, connected by flowing energy lines

const TOTAL_FRAMES = 360;

interface Hexagon {
  cx: number;
  cy: number;
  radius: number;
  color: string;
  glowColor: string;
  phaseOffset: number;
}

const hexagons: Hexagon[] = [
  { cx: 320, cy: 540, radius: 120, color: "#FF7A00", glowColor: "rgba(255,122,0,0.15)", phaseOffset: 0 },
  { cx: 960, cy: 540, radius: 130, color: "#FF7A00", glowColor: "rgba(255,122,0,0.12)", phaseOffset: 60 },
  { cx: 1600, cy: 540, radius: 120, color: "#4EDEA3", glowColor: "rgba(78,222,163,0.15)", phaseOffset: 120 },
];

function hexPath(cx: number, cy: number, r: number): string {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    points.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return `M ${points.join(" L ")} Z`;
}

export const ServicesBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = (frame / TOTAL_FRAMES) * Math.PI * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "#001711" }}>
      {/* Subtle radial background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 100%, rgba(20,59,48,0.5) 0%, transparent 60%)",
        }}
      />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Grid dots */}
        {Array.from({ length: 20 }).map((_, xi) =>
          Array.from({ length: 12 }).map((_, yi) => (
            <circle
              key={`dot-${xi}-${yi}`}
              cx={xi * 100 + 60}
              cy={yi * 100 + 40}
              r={1}
              fill="rgba(255,255,255,0.04)"
            />
          ))
        )}

        {/* Connection lines between hexagons */}
        {hexagons.slice(0, -1).map((hex, i) => {
          const next = hexagons[i + 1];
          const progress = interpolate(
            Math.sin(angle + hex.phaseOffset * 0.01),
            [-1, 1],
            [0.2, 0.5]
          );
          return (
            <line
              key={`conn-${i}`}
              x1={hex.cx + hex.radius}
              y1={hex.cy}
              x2={next.cx - next.radius}
              y2={next.cy}
              stroke={hex.color}
              strokeWidth={1}
              opacity={progress}
              strokeDasharray="8 4"
              strokeDashoffset={frame * 0.5}
            />
          );
        })}

        {/* Hexagons */}
        {hexagons.map((hex, i) => {
          const pAngle = angle + (hex.phaseOffset / TOTAL_FRAMES) * Math.PI * 2;
          const scale = interpolate(Math.sin(pAngle), [-1, 1], [0.92, 1.08]);
          const rotation = interpolate(Math.sin(pAngle * 0.5), [-1, 1], [-3, 3]);
          const glowOpacity = interpolate(Math.sin(pAngle), [-1, 1], [0.3, 0.8]);

          return (
            <g
              key={i}
              transform={`translate(${hex.cx}, ${hex.cy}) scale(${scale}) rotate(${rotation}) translate(${-hex.cx}, ${-hex.cy})`}
            >
              {/* Outer glow */}
              <path
                d={hexPath(hex.cx, hex.cy, hex.radius * 1.3)}
                fill={hex.glowColor}
                opacity={glowOpacity * 0.3}
              />
              {/* Main hex outline */}
              <path
                d={hexPath(hex.cx, hex.cy, hex.radius)}
                fill="none"
                stroke={hex.color}
                strokeWidth={1.5}
                opacity={0.4}
              />
              {/* Inner hex */}
              <path
                d={hexPath(hex.cx, hex.cy, hex.radius * 0.6)}
                fill="none"
                stroke={hex.color}
                strokeWidth={0.8}
                opacity={0.2}
              />
              {/* Center dot */}
              <circle cx={hex.cx} cy={hex.cy} r={4} fill={hex.color} opacity={glowOpacity} />
              <circle cx={hex.cx} cy={hex.cy} r={8} fill={hex.color} opacity={glowOpacity * 0.2} />
            </g>
          );
        })}

        {/* Floating micro particles */}
        {Array.from({ length: 30 }).map((_, i) => {
          const pAngle = angle + (i * 0.4);
          const baseX = 100 + (i * 61) % 1720;
          const baseY = 100 + (i * 83) % 880;
          const x = baseX + Math.sin(pAngle) * 8;
          const y = baseY + Math.cos(pAngle * 1.3) * 6;
          const opacity = interpolate(Math.sin(pAngle + i), [-1, 1], [0.1, 0.4]);
          return (
            <circle
              key={`p-${i}`}
              cx={x}
              cy={y}
              r={2}
              fill={i % 3 === 0 ? "#FF7A00" : "#4EDEA3"}
              opacity={opacity}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, #001711 95%)",
        }}
      />
    </AbsoluteFill>
  );
};
