import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Concept: 4 concentric orbital rings rotating at different speeds
// Particles orbit each ring — represents iterative methodology phases interlocking
// Inner ring = Discovery, outer = Optimization — all connected by radial spokes

const TOTAL_FRAMES = 180;

interface OrbitalParticle {
  ring: number;
  angleOffset: number;
  size: number;
  color: string;
}

const rings = [
  { radius: 120, speed: 1, color: "#FF7A00", label: "01" },
  { radius: 220, speed: -0.7, color: "#FF7A00", label: "02" },
  { radius: 320, speed: 0.5, color: "#FF7A00", label: "03" },
  { radius: 420, speed: -0.35, color: "#4EDEA3", label: "04" },
];

const particles: OrbitalParticle[] = [];
for (let r = 0; r < 4; r++) {
  const count = 5 + r * 2;
  for (let p = 0; p < count; p++) {
    particles.push({
      ring: r,
      angleOffset: (p / count) * Math.PI * 2,
      size: 3 + Math.random() * 3,
      color: r === 3 ? "#4EDEA3" : "#FF7A00",
    });
  }
}

export const ProcessBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const baseAngle = (frame / TOTAL_FRAMES) * Math.PI * 2;

  const cx = 960;
  const cy = 540;

  return (
    <AbsoluteFill style={{ backgroundColor: "#001711" }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Radial connection spokes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const spokeAngle = (i / 8) * Math.PI * 2 + baseAngle * 0.1;
          const x1 = cx + Math.cos(spokeAngle) * 80;
          const y1 = cy + Math.sin(spokeAngle) * 80;
          const x2 = cx + Math.cos(spokeAngle) * 460;
          const y2 = cy + Math.sin(spokeAngle) * 460;
          const opacity = interpolate(
            Math.sin(baseAngle + i * 0.8),
            [-1, 1],
            [0.02, 0.08]
          );
          return (
            <line
              key={`spoke-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,1)"
              strokeWidth={0.5}
              opacity={opacity}
            />
          );
        })}

        {/* Orbital rings */}
        {rings.map((ring, i) => {
          const ringAngle = baseAngle * ring.speed;
          const breathe = interpolate(
            Math.sin(baseAngle + i * 1.2),
            [-1, 1],
            [0.95, 1.05]
          );
          const currentRadius = ring.radius * breathe;
          const ringOpacity = interpolate(
            Math.sin(baseAngle + i * 0.7),
            [-1, 1],
            [0.15, 0.35]
          );

          // Dashed ring path (elliptical for depth)
          const ry = currentRadius * 0.6;
          const rx = currentRadius;

          return (
            <g key={`ring-${i}`}>
              {/* Ring ellipse */}
              <ellipse
                cx={cx} cy={cy}
                rx={rx} ry={ry}
                fill="none"
                stroke={ring.color}
                strokeWidth={1}
                strokeDasharray="8 12"
                opacity={ringOpacity}
                transform={`rotate(${(ringAngle * 180) / Math.PI + i * 20}, ${cx}, ${cy})`}
              />

              {/* Glow ring */}
              <ellipse
                cx={cx} cy={cy}
                rx={rx} ry={ry}
                fill="none"
                stroke={ring.color}
                strokeWidth={4}
                opacity={ringOpacity * 0.15}
                transform={`rotate(${(ringAngle * 180) / Math.PI + i * 20}, ${cx}, ${cy})`}
              />

              {/* Phase node on ring */}
              {(() => {
                const nodeAngle = ringAngle + i * (Math.PI / 2);
                const nx = cx + Math.cos(nodeAngle) * rx;
                const ny = cy + Math.sin(nodeAngle) * ry * 0.6;
                const rotDeg = (ringAngle * 180) / Math.PI + i * 20;
                const rad = (rotDeg * Math.PI) / 180;
                const finalX = cx + (nx - cx) * Math.cos(rad) - (ny - cy) * Math.sin(rad);
                const finalY = cy + (nx - cx) * Math.sin(rad) + (ny - cy) * Math.cos(rad);
                const nodePulse = interpolate(
                  Math.sin(baseAngle * 2 + i),
                  [-1, 1],
                  [0.6, 1]
                );

                return (
                  <g>
                    <circle
                      cx={finalX} cy={finalY}
                      r={18}
                      fill={ring.color}
                      opacity={nodePulse * 0.15}
                    />
                    <circle
                      cx={finalX} cy={finalY}
                      r={8}
                      fill={ring.color}
                      opacity={nodePulse * 0.7}
                    />
                    <circle
                      cx={finalX} cy={finalY}
                      r={3}
                      fill="#ffffff"
                      opacity={nodePulse * 0.9}
                    />
                  </g>
                );
              })()}
            </g>
          );
        })}

        {/* Orbiting particles */}
        {particles.map((p, idx) => {
          const ring = rings[p.ring];
          const ringAngle = baseAngle * ring.speed;
          const breathe = interpolate(
            Math.sin(baseAngle + p.ring * 1.2),
            [-1, 1],
            [0.95, 1.05]
          );
          const rx = ring.radius * breathe;
          const ry = rx * 0.6;
          const rotDeg = (ringAngle * 180) / Math.PI + p.ring * 20;
          const rad = (rotDeg * Math.PI) / 180;

          const particleAngle = baseAngle * ring.speed * 1.5 + p.angleOffset;
          const localX = Math.cos(particleAngle) * rx;
          const localY = Math.sin(particleAngle) * ry;

          const finalX = cx + localX * Math.cos(rad) - localY * Math.sin(rad);
          const finalY = cy + localX * Math.sin(rad) + localY * Math.cos(rad);

          const opacity = interpolate(
            Math.sin(baseAngle * 2 + idx * 0.3),
            [-1, 1],
            [0.2, 0.7]
          );

          return (
            <circle
              key={`particle-${idx}`}
              cx={finalX} cy={finalY}
              r={p.size}
              fill={p.color}
              opacity={opacity}
            />
          );
        })}

        {/* Center core */}
        {(() => {
          const corePulse = interpolate(
            Math.sin(baseAngle * 1.5),
            [-1, 1],
            [0.7, 1]
          );
          return (
            <g>
              <circle cx={cx} cy={cy} r={50 * corePulse} fill="#FF7A00" opacity={0.03} />
              <circle cx={cx} cy={cy} r={30 * corePulse} fill="#FF7A00" opacity={0.06} />
              <circle cx={cx} cy={cy} r={12} fill="none" stroke="#FF7A00" strokeWidth={1.5} opacity={corePulse * 0.5} />
              <circle cx={cx} cy={cy} r={5} fill="#FF7A00" opacity={corePulse * 0.8} />
            </g>
          );
        })()}

        {/* Ambient dust */}
        {Array.from({ length: 30 }).map((_, i) => {
          const dustAngle = baseAngle * 0.2 + i * 2.1;
          const dist = 80 + (i * 137) % 400;
          const x = cx + Math.cos(dustAngle + i) * dist;
          const y = cy + Math.sin(dustAngle + i * 0.7) * dist * 0.6;
          const opacity = interpolate(
            Math.sin(baseAngle + i * 0.4),
            [-1, 1],
            [0.03, 0.12]
          );
          return (
            <circle
              key={`dust-${i}`}
              cx={x} cy={y}
              r={1}
              fill="rgba(255,255,255,0.8)"
              opacity={opacity}
            />
          );
        })}
      </svg>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 35%, #001711 85%)",
        }}
      />
    </AbsoluteFill>
  );
};
