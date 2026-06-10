import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  overline?: string;
  headline: string;
  subheadline?: string;
  align?: "center" | "left";
  overlineColor?: "orange" | "green";
}

export function SectionHeader({
  overline,
  headline,
  subheadline,
  align = "center",
  overlineColor = "orange",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const overlineColorClass =
    overlineColor === "orange"
      ? "text-primary-container drop-shadow-[0_0_8px_rgba(255,122,0,0.5)]"
      : "text-secondary drop-shadow-[0_0_8px_rgba(78,222,163,0.5)]";

  return (
    <div className={cn("mb-16 md:mb-20", alignClass)}>
      {overline && (
        <span
          className={cn(
            "text-label-sm tracking-widest uppercase mb-4 block",
            overlineColorClass
          )}
        >
          {overline}
        </span>
      )}
      <h2 className="text-headline-mobile md:text-headline-lg font-bold text-white">
        {headline}
      </h2>
      {subheadline && (
        <p className="text-body-lg text-on-surface-variant max-w-3xl mx-auto mt-6">
          {subheadline}
        </p>
      )}
    </div>
  );
}
