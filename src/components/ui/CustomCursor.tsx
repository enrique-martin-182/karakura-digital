"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useAnimationControls,
} from "framer-motion";

// ─── Code snippets shown through the X-Ray cursor ────────────────────────────

const CODE_LINES = [
  'import anthropic, os, asyncio',
  'client = Anthropic(api_key=os.getenv("KD_KEY"))',
  'MODEL = "claude-opus-4-8"',
  '',
  'async def extract_leads(sector: str):',
  '    prompt = f"Extrae 10 leads B2B del sector {sector}"',
  '    response = await client.messages.create(',
  '        model=MODEL, max_tokens=4096,',
  '        messages=[{"role":"user","content":prompt}]',
  '    )',
  '    return parse_leads(response.content[0].text)',
  '',
  'SCORE_THRESHOLD = 78  # ROI visible <4 semanas',
  'UPTIME = 0.999',
  '',
  'leads_df.to_csv(f"leads_{sector}.csv")',
  'await webhook.send(payload={"leads": leads})',
  'await asyncio.gather(*pipeline_tasks)',
  '',
  'print(f"✓ {len(leads)} leads | score > {SCORE_THRESHOLD}")',
  '# karakuradigital.es — automatización real',
];

// ─── Constants ────────────────────────────────────────────────────────────────

const CURSOR_RADIUS   = 64;
const SPRING_OPTS     = { stiffness: 600, damping: 42, mass: 0.4 };
const DOT_SPRING      = { stiffness: 900, damping: 35, mass: 0.2 };

/** Distance threshold (px) at which the magnetic pulse begins */
const NEAR_THRESHOLD  = 100;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Shortest distance from point (px, py) to a rectangle.
 *  Returns 0 when the point is inside the rectangle. */
function distanceToRect(px: number, py: number, rect: DOMRect): number {
  const dx = Math.max(rect.left - px, 0, px - rect.right);
  const dy = Math.max(rect.top  - py, 0, py - rect.bottom);
  return Math.sqrt(dx * dx + dy * dy);
}

type ProximityState = "far" | "near" | "inside";

// ─── Component ───────────────────────────────────────────────────────────────

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  const cx = useSpring(rawX, SPRING_OPTS);
  const cy = useSpring(rawY, SPRING_OPTS);

  // Faster dot — tracks raw position with less lag
  const dx = useSpring(rawX, DOT_SPRING);
  const dy = useSpring(rawY, DOT_SPRING);

  // Code overlay ref — mask updated directly via motion value subscriptions
  const overlayRef   = useRef<HTMLDivElement>(null);

  // Animation controllers — driven imperatively from mousemove, zero re-renders
  const ringControls  = useAnimationControls();
  const sonarControls = useAnimationControls();

  // Cache of [data-xray-target] elements; refreshed via MutationObserver
  const targetsRef   = useRef<Element[]>([]);
  // Track current proximity state to avoid redundant animation calls
  const proximityRef = useRef<ProximityState>("far");

  // ── Discover xray targets ──────────────────────────────────────────────────

  useEffect(() => {
    const refresh = () => {
      targetsRef.current = Array.from(
        document.querySelectorAll("[data-xray-target]")
      );
    };
    refresh();

    const observer = new MutationObserver(refresh);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // ── Proximity-driven animations ────────────────────────────────────────────

  function enterNear() {
    // Main ring: slow pulsing scale — "something is here"
    ringControls.start({
      scale: [1, 1.15, 1],
      transition: {
        repeat: Infinity,
        duration: 1.35,
        ease: "easeInOut" as const,
      },
    });

    // Sonar ping: expands outward and fades — "magnetic pull"
    sonarControls.start({
      scale: [1, 2.8],
      opacity: [0.65, 0],
      transition: {
        repeat: Infinity,
        duration: 1.6,
        ease: "easeOut" as const,
      },
    });
  }

  function exitNear() {
    ringControls.start({
      scale: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 28 },
    });
    sonarControls.start({
      opacity: 0,
      transition: { duration: 0.2 },
    });
  }

  // ── Mouse tracking ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (shouldReduceMotion) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      // Compute min distance to every xray target
      let minDist = Infinity;
      for (const el of targetsRef.current) {
        const rect = el.getBoundingClientRect();
        minDist = Math.min(minDist, distanceToRect(e.clientX, e.clientY, rect));
      }

      const next: ProximityState =
        minDist === 0              ? "inside"
        : minDist < NEAR_THRESHOLD ? "near"
        :                            "far";

      if (next === proximityRef.current) return; // no state change — skip
      proximityRef.current = next;

      if (next === "near")   enterNear();
      else                   exitNear();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawX, rawY, shouldReduceMotion]);

  // ── Mask sync ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (shouldReduceMotion || !overlayRef.current) return;

    function applyMask() {
      if (!overlayRef.current) return;
      const x = cx.get();
      const y = cy.get();
      const mask = `radial-gradient(circle ${CURSOR_RADIUS}px at ${x}px ${y}px, black 55%, transparent 100%)`;
      overlayRef.current.style.webkitMaskImage = mask;
      (overlayRef.current.style as CSSStyleDeclaration & { maskImage: string }).maskImage = mask;
    }

    const unsubX = cx.on("change", applyMask);
    const unsubY = cy.on("change", applyMask);

    return () => { unsubX(); unsubY(); };
  }, [cx, cy, shouldReduceMotion]);

  // ── Hide default cursor ────────────────────────────────────────────────────

  useEffect(() => {
    if (shouldReduceMotion) return;
    document.documentElement.style.cursor = "none";
    return () => { document.documentElement.style.cursor = ""; };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <>
      {/* ── Sonar ping ring — expands outward when cursor nears a target ── */}
      <motion.div
        aria-hidden="true"
        className="fixed pointer-events-none z-[9988] rounded-full"
        style={{
          width:    CURSOR_RADIUS * 2,
          height:   CURSOR_RADIUS * 2,
          x:        cx,
          y:        cy,
          translateX: "-50%",
          translateY: "-50%",
          border:   "1.5px solid rgba(255,122,0,0.7)",
          willChange: "transform, opacity",
        }}
        initial={{ scale: 1, opacity: 0 }}
        animate={sonarControls}
      />

      {/* ── Main invert ring — pulses gently when near a target ── */}
      <motion.div
        aria-hidden="true"
        className="fixed pointer-events-none z-[9990] rounded-full"
        style={{
          width:    CURSOR_RADIUS * 2,
          height:   CURSOR_RADIUS * 2,
          x:        cx,
          y:        cy,
          translateX: "-50%",
          translateY: "-50%",
          backdropFilter: "invert(1)",
          WebkitBackdropFilter: "invert(1)",
          willChange: "transform",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.15)",
        }}
        initial={{ scale: 1 }}
        animate={ringControls}
      />

      {/* ── Small precise dot ── */}
      <motion.div
        aria-hidden="true"
        className="fixed pointer-events-none z-[9991] rounded-full bg-white mix-blend-difference"
        style={{
          width:  6,
          height: 6,
          x: dx,
          y: dy,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />

      {/* ── X-Ray code overlay — revealed through cursor mask ── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9989] overflow-hidden select-none"
        style={{
          WebkitMaskImage: "radial-gradient(circle 0px at -300px -300px, black 55%, transparent 100%)",
          maskImage:        "radial-gradient(circle 0px at -300px -300px, black 55%, transparent 100%)",
        }}
      >
        {/* Dark background inside circle */}
        <div className="absolute inset-0 bg-[#030a06]" />

        {/* Code content */}
        <div
          className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 gap-0.5"
          style={{ fontFamily: "'Fira Code', 'Cascadia Code', monospace" }}
        >
          {CODE_LINES.map((line, i) =>
            line === "" ? (
              <div key={i} className="h-3" />
            ) : (
              <p
                key={i}
                className="text-[11px] md:text-[12px] leading-relaxed whitespace-nowrap"
                style={{
                  color: line.startsWith("#")
                    ? "rgba(78,222,163,0.5)"
                    : line.startsWith("    ")
                    ? "rgba(200,220,200,0.85)"
                    : "#4edea3",
                  textShadow: "0 0 8px rgba(78,222,163,0.6)",
                }}
              >
                {line}
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}
