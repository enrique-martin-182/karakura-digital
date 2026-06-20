"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src: string;
  overlay?: string;
}

export function VideoBackground({ src, overlay = "bg-background/30" }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div ref={containerRef}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        {isVisible && (
          <>
            <source src={`/${src}.webm`} type="video/webm" />
            <source src={`/${src}.mp4`} type="video/mp4" />
          </>
        )}
      </video>
      <div className={`absolute inset-0 ${overlay}`} aria-hidden="true" />
    </div>
  );
}
