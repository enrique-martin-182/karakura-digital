import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Concept: Soft conversation bubbles / speech ripples emanating outward
// Represents voices, testimonials, social proof — organic and human

const TOTAL_FRAMES = 360;

interface Ripple {
  cx: number;
  cy: number;
  maxRadius: number;
  phaseOffset: number;
  color: string;
}

const ripples: Ripple[] = [
  { cx: 300, cy: 400, maxRadius: 200, phaseOffset: 0, color: "#4EDEA3" },
  { cx: 960, cy: 300, maxRadius: 250, phaseOffset: 40, color: "#FF7A00" },
  { cx: 1620, cy: 450, maxRadius: 200, phaseOffset: 80, color: "#4EDEA3" },
  { cx: 500, cy: 750, maxRadius: 180, phaseOffset: 100, color: "#FFB68B" },
  { cx: 1400, cy: 700, maxRadius: 220, phaseOffset: 60, color: "#95D3BA" },
];

export const TestimonialsBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = (frame / TOTAL_FRAMES) * Math.PI * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "#001711" }}>
      {/* Soft ambient light */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(78,222,163,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Expanding ripples */}
        {ripples.map((ripple, ri) => {
          return Array.from({ length: 3 }).map((_, wave) => {
            const waveOffset = wave * (TOTAL_FRAMES / 3);
            const elapsed = (frame - ripple.phaseOffset - waveOffset + TOTAL_FRAMES * 3) % TOTAL_FRAMES;
            const progress = elapsed / TOTAL_FRAMES;
            const radius = progress * ripple.maxRadius;
            const opacity = interpolate(progress, [0, 0.1, 0.7, 1], [0, 0.3, 0.1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <circle
                key={`ripple-${ri}-${wave}`}
                cx={ripple.cx}
                cy={ripple.cy}
                r={radius}
                fill="none"
                stroke={ripple.color}
                strokeWidth={1.5}
                opacity={opacity}
              />
            );
          });
        })}

        {/* Center dots for ripple origins */}
        {ripples.map((ripple, i) => {
          const pAngle = angle + (ripple.phaseOffset / TOTAL_FRAMES) * Math.PI * 2;
          const pulse = interpolate(Math.sin(pAngle), [-1, 1], [0.7, 1.3]);
          return (
            <g key={`center-${i}`}>
              <circle cx={ripple.cx} cy={ripple.cy} r={6 * pulse} fill={ripple.color} opacity={0.4} />
              <circle cx={ripple.cx} cy={ripple.cy} r={3} fill={ripple.color} opacity={0.8} />
            </g>
          );
        })}

        {/* Gentle floating particles */}
        {Array.from({ length: 25 }).map((_, i) => {
          const pAngle = angle + i * 0.45;
          const x = 80 + (i * 79) % 1760;
          const y = 80 + (i * 53) % 920;
          const dx = Math.sin(pAngle) * 10;
          const dy = Math.cos(pAngle * 0.8) * 8;
          const opacity = interpolate(Math.sin(pAngle), [-1, 1], [0.05, 0.25]);

          return (
            <circle
              key={`float-${i}`}
              cx={x + dx}
              cy={y + dy}
              r={2}
              fill={i % 3 === 0 ? "#FFB68B" : "#95D3BA"}
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
