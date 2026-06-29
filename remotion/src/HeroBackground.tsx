import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

const COLORS = {
  bg: "#001711",
  orange: "#FF7A00",
  orangeSoft: "#FFB68B",
  green: "#4EDEA3",
  greenDark: "#073026",
  line: "rgba(78, 222, 163, 0.15)",
};

interface Node {
  x: number;
  y: number;
  size: number;
  color: string;
  pulseOffset: number;
}

interface Connection {
  from: number;
  to: number;
  startFrame: number;
  duration: number;
  color: string;
}

interface Particle {
  connectionIndex: number;
  startFrame: number;
  speed: number;
  size: number;
  color: string;
}

const nodes: Node[] = [
  { x: 150, y: 200, size: 8, color: COLORS.orange, pulseOffset: 0 },
  { x: 400, y: 350, size: 10, color: COLORS.green, pulseOffset: 15 },
  { x: 700, y: 180, size: 7, color: COLORS.green, pulseOffset: 30 },
  { x: 950, y: 400, size: 12, color: COLORS.orange, pulseOffset: 45 },
  { x: 1200, y: 250, size: 9, color: COLORS.green, pulseOffset: 60 },
  { x: 1500, y: 380, size: 8, color: COLORS.orange, pulseOffset: 75 },
  { x: 1750, y: 200, size: 11, color: COLORS.green, pulseOffset: 90 },
  { x: 300, y: 600, size: 7, color: COLORS.green, pulseOffset: 20 },
  { x: 600, y: 700, size: 9, color: COLORS.orange, pulseOffset: 50 },
  { x: 900, y: 650, size: 8, color: COLORS.green, pulseOffset: 70 },
  { x: 1300, y: 700, size: 10, color: COLORS.orange, pulseOffset: 35 },
  { x: 1600, y: 600, size: 7, color: COLORS.green, pulseOffset: 55 },
  { x: 500, y: 500, size: 6, color: COLORS.orangeSoft, pulseOffset: 40 },
  { x: 1100, y: 500, size: 6, color: COLORS.orangeSoft, pulseOffset: 80 },
  { x: 200, y: 850, size: 8, color: COLORS.green, pulseOffset: 10 },
  { x: 800, y: 900, size: 10, color: COLORS.orange, pulseOffset: 65 },
  { x: 1400, y: 880, size: 7, color: COLORS.green, pulseOffset: 25 },
  { x: 1700, y: 800, size: 9, color: COLORS.orange, pulseOffset: 85 },
];

const connections: Connection[] = [
  { from: 0, to: 1, startFrame: 0, duration: 40, color: COLORS.green },
  { from: 1, to: 2, startFrame: 15, duration: 35, color: COLORS.green },
  { from: 2, to: 3, startFrame: 30, duration: 45, color: COLORS.orange },
  { from: 3, to: 4, startFrame: 50, duration: 35, color: COLORS.green },
  { from: 4, to: 5, startFrame: 65, duration: 40, color: COLORS.orange },
  { from: 5, to: 6, startFrame: 80, duration: 35, color: COLORS.green },
  { from: 0, to: 7, startFrame: 10, duration: 30, color: COLORS.green },
  { from: 7, to: 8, startFrame: 35, duration: 40, color: COLORS.orange },
  { from: 8, to: 9, startFrame: 55, duration: 35, color: COLORS.green },
  { from: 9, to: 10, startFrame: 75, duration: 40, color: COLORS.orange },
  { from: 10, to: 11, startFrame: 95, duration: 35, color: COLORS.green },
  { from: 1, to: 12, startFrame: 25, duration: 30, color: COLORS.orangeSoft },
  { from: 12, to: 9, startFrame: 45, duration: 35, color: COLORS.orangeSoft },
  { from: 3, to: 13, startFrame: 60, duration: 30, color: COLORS.orangeSoft },
  { from: 13, to: 10, startFrame: 85, duration: 35, color: COLORS.orangeSoft },
  { from: 7, to: 14, startFrame: 40, duration: 30, color: COLORS.green },
  { from: 14, to: 15, startFrame: 60, duration: 40, color: COLORS.orange },
  { from: 15, to: 16, startFrame: 90, duration: 35, color: COLORS.green },
  { from: 16, to: 17, startFrame: 110, duration: 40, color: COLORS.orange },
  { from: 11, to: 17, startFrame: 120, duration: 35, color: COLORS.green },
];

const particles: Particle[] = [
  { connectionIndex: 0, startFrame: 20, speed: 0.03, size: 4, color: COLORS.orange },
  { connectionIndex: 2, startFrame: 50, speed: 0.025, size: 5, color: COLORS.green },
  { connectionIndex: 4, startFrame: 80, speed: 0.03, size: 4, color: COLORS.orange },
  { connectionIndex: 6, startFrame: 30, speed: 0.028, size: 3, color: COLORS.green },
  { connectionIndex: 8, startFrame: 70, speed: 0.032, size: 4, color: COLORS.orange },
  { connectionIndex: 10, startFrame: 110, speed: 0.025, size: 5, color: COLORS.green },
  { connectionIndex: 1, startFrame: 40, speed: 0.03, size: 3, color: COLORS.orangeSoft },
  { connectionIndex: 3, startFrame: 65, speed: 0.028, size: 4, color: COLORS.green },
  { connectionIndex: 7, startFrame: 55, speed: 0.03, size: 3, color: COLORS.orange },
  { connectionIndex: 15, startFrame: 60, speed: 0.025, size: 4, color: COLORS.green },
  { connectionIndex: 17, startFrame: 100, speed: 0.03, size: 3, color: COLORS.orange },
  { connectionIndex: 19, startFrame: 130, speed: 0.028, size: 5, color: COLORS.green },
];

function CircuitNode({ node, frame, fps }: { node: Node; frame: number; fps: number }) {
  const loopFrame = (frame + node.pulseOffset) % (2 * fps);
  const pulse = interpolate(loopFrame, [0, fps, 2 * fps], [1, 1.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowOpacity = interpolate(loopFrame, [0, fps, 2 * fps], [0.3, 0.8, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <g>
      <circle
        cx={node.x}
        cy={node.y}
        r={node.size * pulse * 3}
        fill={node.color}
        opacity={glowOpacity * 0.2}
      />
      <circle
        cx={node.x}
        cy={node.y}
        r={node.size * pulse * 1.8}
        fill={node.color}
        opacity={glowOpacity * 0.4}
      />
      <circle cx={node.x} cy={node.y} r={node.size} fill={node.color} opacity={0.9} />
      <circle cx={node.x} cy={node.y} r={node.size * 0.4} fill="#ffffff" opacity={0.8} />
    </g>
  );
}

function ConnectionLine({
  connection,
  frame,
}: {
  connection: Connection;
  frame: number;
}) {
  const from = nodes[connection.from];
  const to = nodes[connection.to];
  const progress = interpolate(
    frame,
    [connection.startFrame, connection.startFrame + connection.duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  if (progress <= 0) return null;

  const midX = (from.x + to.x) / 2 + (to.y - from.y) * 0.15;
  const midY = (from.y + to.y) / 2 - (to.x - from.x) * 0.08;

  const pathD = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  const totalLength = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2) * 1.2;

  return (
    <path
      d={pathD}
      fill="none"
      stroke={connection.color}
      strokeWidth={1.5}
      opacity={0.4}
      strokeDasharray={totalLength}
      strokeDashoffset={totalLength * (1 - progress)}
      strokeLinecap="round"
    />
  );
}

function DataParticle({
  particle,
  frame,
}: {
  particle: Particle;
  frame: number;
}) {
  const connection = connections[particle.connectionIndex];
  const from = nodes[connection.from];
  const to = nodes[connection.to];

  const elapsed = frame - particle.startFrame;
  if (elapsed < 0) return null;

  const loopDuration = 60;
  const t = (elapsed * particle.speed * 30) % 1;

  const midX = (from.x + to.x) / 2 + (to.y - from.y) * 0.15;
  const midY = (from.y + to.y) / 2 - (to.x - from.x) * 0.08;

  const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
  const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;

  const opacity = interpolate(t, [0, 0.1, 0.9, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <g>
      <circle cx={x} cy={y} r={particle.size * 2.5} fill={particle.color} opacity={opacity * 0.3} />
      <circle cx={x} cy={y} r={particle.size} fill={particle.color} opacity={opacity} />
      <circle cx={x} cy={y} r={particle.size * 0.5} fill="#ffffff" opacity={opacity * 0.8} />
    </g>
  );
}

function GridLines() {
  const lines = [];
  for (let x = 0; x <= 1920; x += 60) {
    lines.push(
      <line key={`v${x}`} x1={x} y1={0} x2={x} y2={1080} stroke="rgba(255,255,255,0.02)" strokeWidth={1} />
    );
  }
  for (let y = 0; y <= 1080; y += 60) {
    lines.push(
      <line key={`h${y}`} x1={0} y1={y} x2={1920} y2={y} stroke="rgba(255,255,255,0.02)" strokeWidth={1} />
    );
  }
  return <g>{lines}</g>;
}

export const HeroBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = fps * 6;
  const half = totalFrames / 2;
  const loopFrame = frame % totalFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Ambient gradient blobs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.orange}22 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: interpolate(loopFrame, [0, half, totalFrames], [0.4, 0.7, 0.4], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.green}22 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: interpolate(loopFrame, [0, half, totalFrames], [0.5, 0.3, 0.5], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* SVG circuit layer */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <GridLines />

        {/* Connection lines */}
        {connections.map((conn, i) => (
          <ConnectionLine key={`conn-${i}`} connection={conn} frame={loopFrame} />
        ))}

        {/* Data particles */}
        {particles.map((particle, i) => (
          <DataParticle key={`particle-${i}`} particle={particle} frame={loopFrame} />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <CircuitNode key={`node-${i}`} node={node} frame={loopFrame} fps={fps} />
        ))}
      </svg>

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, #001711 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
