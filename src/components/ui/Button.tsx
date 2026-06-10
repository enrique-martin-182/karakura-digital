import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-white border border-white/10 hover:shadow-[0_0_40px_-5px_rgba(255,122,0,0.7)]",
  secondary:
    "border border-outline-variant/50 bg-surface-variant/30 backdrop-blur-sm text-white hover:bg-surface-variant hover:border-outline-variant hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]",
  ghost: "text-on-surface-variant hover:text-white underline-offset-4 hover:underline",
};

export function Button({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-label-md font-semibold transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container",
    variants[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
