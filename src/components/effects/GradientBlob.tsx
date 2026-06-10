interface GradientBlobProps {
  color: "orange" | "green";
  position: string;
  size?: string;
}

export function GradientBlob({ color, position, size = "500px" }: GradientBlobProps) {
  const colorClass =
    color === "orange"
      ? "bg-primary-container/30"
      : "bg-secondary/20";

  return (
    <div
      className={`absolute ${position} rounded-full blur-[140px] pointer-events-none animate-pulse-slow ${colorClass}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
