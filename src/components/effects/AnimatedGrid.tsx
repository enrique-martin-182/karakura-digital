"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const SPACING = 38;
const DOT_MIN = 0.8;
const DOT_MAX = 2.4;
const INFLUENCE = 180;
const BASE_ALPHA = 0.10;
const LIT_ALPHA = 0.55;

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my } = mouseRef.current;
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = c * SPACING;
          const py = r * SPACING;
          const dist = Math.hypot(px - mx, py - my);
          const t = Math.max(0, 1 - dist / INFLUENCE);
          const t2 = t * t;

          const radius = DOT_MIN + t2 * (DOT_MAX - DOT_MIN);
          const alpha = BASE_ALPHA + t2 * (LIT_ALPHA - BASE_ALPHA);

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);

          if (t > 0.08) {
            // orange glow near cursor
            ctx.fillStyle = `rgba(255,122,0,${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          }
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduce]);

  if (shouldReduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ contain: "strict", willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
