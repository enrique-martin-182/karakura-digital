"use client";

interface VideoBackgroundProps {
  src: string;
  overlay?: string;
}

export function VideoBackground({ src, overlay = "bg-background/30" }: VideoBackgroundProps) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden="true"
      >
        <source src={`/${src}.webm`} type="video/webm" />
        <source src={`/${src}.mp4`} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${overlay}`} aria-hidden="true" />
    </>
  );
}
