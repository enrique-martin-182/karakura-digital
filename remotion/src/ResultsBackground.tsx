import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Concept: Rising bar chart / growth indicators — abstract vertical lines growing and pulsing
// Represents metrics, data, measurable results

const TOTAL_FRAMES = 180;

interface Bar {
  x: number;
  maxHeight: number;
  color: string;
  phaseOffset: number;
  width: number;
}

const bars: Bar[] = Array.from({ length: 40 }).map((_, i) => ({
  x: 48 * i + 24,
  maxHeight: 100 + ((i * 67 + 30) % 400),
  color: i % 5 === 0 ? "#FF7A00" : i % 3 === 0 ? "#4EDEA3" : "rgba(78,222,163,0.3)",
  phaseOffset: (i * 23) % TOTAL_FRAMES,
  width: i % 5 === 0 ? 4 : 2,
}));

export const ResultsBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = (frame / TOTAL_FRAMES) * Math.PI * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "#00110c" }}>
      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(7,48,38,0.3) 0%, transparent 100%)",
        }}
      />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Horizontal reference lines */}
        {[200, 400, 600, 800].map((y) => (
          <line
            key={`ref-${y}`}
            x1={0} y1={y} x2={1920} y2={y}
            stroke="rgba(255,255,255,0.02)"
            strokeWidth={1}
          />
        ))}

        {/* Rising bars */}
        {bars.map((bar, i) => {
          const pAngle = angle + (bar.phaseOffset / TOTAL_FRAMES) * Math.PI * 2;
          const heightFactor = interpolate(Math.sin(pAngle), [-1, 1], [0.4, 1]);
          const height = bar.maxHeight * heightFactor;
          const opacity = interpolate(Math.sin(pAngle), [-1, 1], [0.15, 0.6]);
          const baseY = 1000;

          return (
            <g key={i}>
              {/* Bar glow */}
              <rect
                x={bar.x - bar.width}
                y={baseY - height}
                width={bar.width * 3}
                height={height}
                fill={bar.color}
                opacity={opacity * 0.1}
                rx={bar.width}
              />
              {/* Bar */}
              <rect
                x={bar.x}
                y={baseY - height}
                width={bar.width}
                height={height}
                fill={bar.color}
                opacity={opacity}
                rx={bar.width / 2}
              />
              {/* Top cap */}
              <circle
                cx={bar.x + bar.width / 2}
                cy={baseY - height}
                r={bar.width}
                fill={bar.color}
                opacity={opacity * 0.8}
              />
            </g>
          );
        })}

        {/* Floating data points */}
        {Array.from({ length: 15 }).map((_, i) => {
          const pAngle = angle + i * 0.7;
          const x = 100 + (i * 127) % 1720;
          const baseY = 150 + (i * 53) % 400;
          const y = baseY + Math.sin(pAngle) * 15;
          const opacity = interpolate(Math.sin(pAngle), [-1, 1], [0.1, 0.5]);

          return (
            <g key={`fp-${i}`}>
              <circle cx={x} cy={y} r={3} fill={i % 2 === 0 ? "#FF7A00" : "#4EDEA3"} opacity={opacity} />
              <circle cx={x} cy={y} r={8} fill={i % 2 === 0 ? "#FF7A00" : "#4EDEA3"} opacity={opacity * 0.15} />
            </g>
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center bottom, transparent 30%, #00110c 90%)",
        }}
      />
    </AbsoluteFill>
  );
};
