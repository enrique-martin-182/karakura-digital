import { cn } from "@/lib/cn";

interface GlassCardProps {
  children: React.ReactNode;
  variant?: "default" | "glow-orange" | "glow-green" | "error";
  hover?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "border border-outline-variant/30 hover:border-primary-container/50",
  "glow-orange": "glow-accent border border-primary-container/30",
  "glow-green": "green-glow border border-secondary/30",
  error: "border border-error/20",
};

export function GlassCard({
  children,
  variant = "default",
  hover = true,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-8 md:p-10 relative overflow-hidden group",
        hover && "hover:-translate-y-2 transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
