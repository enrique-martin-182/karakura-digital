"use client";

import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
  className?: string;
}

/**
 * Defers rendering children until the element is near the viewport.
 * Prevents JS chunks from downloading before they're needed.
 */
export function LazySection({
  children,
  rootMargin = "300px",
  minHeight = "400px",
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={active ? undefined : { minHeight }}
    >
      {active && children}
    </div>
  );
}
