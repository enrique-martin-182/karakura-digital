"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="w-10 h-10 rounded-full border-2 border-primary-container/30 border-t-primary-container animate-spin" />
    </div>
  ),
});

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? (
        <Spline scene={scene} className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="w-10 h-10 rounded-full border-2 border-primary-container/30 border-t-primary-container animate-spin" />
        </div>
      )}
    </div>
  );
}
