import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Concept: Converging energy — particles and lines flow inward toward center
// Represents the call to action, energy focusing, decision point

const TOTAL_FRAMES = 180;

interface ConvergingLine {
  startX: number;
  startY: number;
  angle: number;
  length: number;
  phaseOffset: number;
  color: string;
}

const convergingLines: ConvergingLine[] = Array.from({ length: 24 }).map((_, i) => {
  const a = (i / 24) * Math.PI * 2;
  const dist = 700 + (i % 3) * 100;
  return {
    startX: 960 + Math.cos(a) * dist,
    startY: 540 + Math.sin(a) * dist,
    angle: a,
    length: 150 + (i * 17) % 100,
    phaseOffset: (i * 7.5) % TOTAL_FRAMES,
    color: i % 3 === 0 ? "#FF7A00" : "#4EDEA3",
  };
});

export const ContactBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = (frame / TOTAL_FRAMES) * Math.PI * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "#143b30" }}>
      {/* Central radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,122,0,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: interpolate(Math.sin(angle), [-1, 1], [0.5, 1]),
        }}
      />

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Converging lines — travel inward */}
        {convergingLines.map((line, i) => {
          const elapsed = (frame - line.phaseOffset + TOTAL_FRAMES) % TOTAL_FRAMES;
          const progress = elapsed / TOTAL_FRAMES;

          // Particle travels from outer edge toward center
          const travelDist = 400;
          const t = progress;
          const currentX = line.startX - Math.cos(line.angle) * travelDist * t;
          const currentY = line.startY - Math.sin(line.angle) * travelDist * t;

          const opacity = interpolate(t, [0, 0.1, 0.8, 1], [0, 0.6, 0.6, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Trail line
          const trailLength = 60;
          const trailX = currentX + Math.cos(line.angle) * trailLength;
          const trailY = currentY + Math.sin(line.angle) * trailLength;

          return (
            <g key={i}>
              <line
                x1={trailX} y1={trailY}
                x2={currentX} y2={currentY}
                stroke={line.color}
                strokeWidth={1.5}
                opacity={opacity * 0.4}
                strokeLinecap="round"
              />
              <circle cx={currentX} cy={currentY} r={3} fill={line.color} opacity={opacity} />
              <circle cx={currentX} cy={currentY} r={8} fill={line.color} opacity={opacity * 0.2} />
            </g>
          );
        })}

        {/* Center pulsing ring */}
        {[1, 2, 3].map((ring) => {
          const ringAngle = angle + ring * 0.5;
          const radius = interpolate(Math.sin(ringAngle), [-1, 1], [40 + ring * 30, 60 + ring * 40]);
          const opacity = interpolate(Math.sin(ringAngle), [-1, 1], [0.1, 0.3]);
          return (
            <circle
              key={`ring-${ring}`}
              cx={960} cy={540}
              r={radius}
              fill="none"
              stroke="#FF7A00"
              strokeWidth={1}
              opacity={opacity}
            />
          );
        })}

        {/* Central bright dot */}
        <circle cx={960} cy={540} r={6} fill="#FF7A00" opacity={interpolate(Math.sin(angle * 2), [-1, 1], [0.5, 1])} />
        <circle cx={960} cy={540} r={15} fill="#FF7A00" opacity={interpolate(Math.sin(angle * 2), [-1, 1], [0.1, 0.3])} />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 30%, #143b30 85%)",
        }}
      />
    </AbsoluteFill>
  );
};
