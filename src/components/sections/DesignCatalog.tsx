"use client";

import { useState } from "react";

// ── Demo components ────────────────────────────────────────────────────────

function SkeumorphismDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #2d1b0a 0%, #4a2f15 50%, #1a0f05 100%)",
        backgroundImage:
          "linear-gradient(135deg, #2d1b0a 0%, #4a2f15 50%, #1a0f05 100%), " +
          "repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 7px), " +
          "repeating-linear-gradient(-45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 7px)",
        backgroundBlendMode: "normal, overlay, overlay",
      }}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Device */}
        <div
          className="w-52 rounded-2xl p-4 border border-amber-900/50"
          style={{
            background: "linear-gradient(180deg, #7a4820 0%, #4a2810 100%)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,200,100,0.22), inset 0 -1px 0 rgba(0,0,0,0.4)",
          }}
        >
          <p className="text-[9px] font-mono text-amber-400/80 mb-3 tracking-widest">KARAKURA OS v2.4</p>
          {/* Screen with stronger inset shadow */}
          <div
            className="rounded-xl p-3 mb-3"
            style={{
              background: "linear-gradient(180deg, #080808 0%, #141414 100%)",
              boxShadow: "inset 0 4px 14px rgba(0,0,0,0.9), inset 0 -1px 0 rgba(255,255,255,0.02), inset 2px 0 6px rgba(0,0,0,0.5), inset -2px 0 6px rgba(0,0,0,0.5)",
            }}
          >
            <p className="text-green-400 text-[10px] font-mono">$ npm run build</p>
            <p className="text-green-400/55 text-[10px] font-mono">✓ compilado en 1.4s</p>
          </div>
          {/* Button with physical press depth */}
          <button
            className="w-full rounded-xl py-2 text-xs font-bold text-amber-100 border border-amber-900/70"
            style={{
              background: "linear-gradient(180deg, #d4882c 0%, #7a4a0a 100%)",
              boxShadow: "0 4px 0 rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,220,150,0.32)",
            }}
          >
            EJECUTAR
          </button>
        </div>

        {/* Spheres with strong specular */}
        <div className="flex gap-3">
          {["#ff6b35", "#4ecdc4", "#4edea3"].map((c, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full"
              style={{
                background: `radial-gradient(circle at 32% 28%, ${c}ff 0%, ${c}bb 45%, ${c}44 100%)`,
                boxShadow: `0 6px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.45), inset -1px -1px 4px rgba(0,0,0,0.2)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NeumorphismDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{ background: "#e0e5ec" }}
    >
      <div className="flex flex-col items-center gap-5 w-full max-w-xs">
        <div
          className="rounded-2xl p-5 w-full"
          style={{ background: "#e0e5ec", boxShadow: "8px 8px 18px #b8bec7, -8px -8px 18px #ffffff" }}
        >
          <p className="text-slate-500 text-[10px] font-bold mb-4 tracking-[0.18em] uppercase">
            Métricas · Q4
          </p>
          {[
            { label: "Conversión", w: "75%", color: "#6366f1" },
            { label: "Retención", w: "55%", color: "#06b6d4" },
            { label: "Satisfacción", w: "88%", color: "#10b981" },
          ].map(({ label, w, color }) => (
            <div key={label} className="mb-3 last:mb-0">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
                <span>{label}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{w}</span>
              </div>
              <div
                className="h-2.5 rounded-full"
                style={{ background: "#e0e5ec", boxShadow: "inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff" }}
              >
                <div className="h-full rounded-full" style={{ width: w, background: color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Neu card with stats */}
        <div
          className="rounded-2xl p-4 w-full grid grid-cols-3 gap-3"
          style={{ background: "#e0e5ec", boxShadow: "6px 6px 14px #b8bec7, -6px -6px 14px #ffffff" }}
        >
          {[["28", "Proyectos", "#6366f1"], ["4.9", "Rating", "#10b981"], ["100", "% Sat.", "#06b6d4"]].map(([v, l, c]) => (
            <div key={l} className="text-center">
              <p className="font-bold text-slate-700 text-base" style={{ fontVariantNumeric: "tabular-nums" }}>{v}</p>
              <p className="text-[9px] text-slate-400 font-medium">{l}</p>
              <div className="w-4 h-0.5 mx-auto mt-1 rounded-full" style={{ background: c }} />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          {/* Skip back */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#e0e5ec", boxShadow: "6px 6px 12px #b8bec7, -6px -6px 12px #ffffff" }}
            aria-label="Anterior"
          >
            <div className="flex gap-0.5">
              <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: "8px solid #94a3b8" }} />
              <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: "8px solid #94a3b8" }} />
            </div>
          </button>
          {/* Pause — pressed state */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#e0e5ec", boxShadow: "inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff" }}
            aria-label="Pausar"
          >
            <div className="flex gap-1">
              <div style={{ width: 3, height: 12, background: "#6366f1", borderRadius: 2 }} />
              <div style={{ width: 3, height: 12, background: "#6366f1", borderRadius: 2 }} />
            </div>
          </button>
          {/* Skip forward */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#e0e5ec", boxShadow: "6px 6px 12px #b8bec7, -6px -6px 12px #ffffff" }}
            aria-label="Siguiente"
          >
            <div className="flex gap-0.5">
              <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "8px solid #94a3b8" }} />
              <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "8px solid #94a3b8" }} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function GlassmorphismDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #db2777 100%)" }}
    >
      {/* Orb blobs */}
      <div className="absolute w-52 h-52 rounded-full -top-14 -left-14" style={{ background: "rgba(255,255,255,0.14)" }} />
      <div className="absolute w-40 h-40 rounded-full -bottom-12 -right-12" style={{ background: "rgba(255,255,255,0.1)" }} />
      <div className="absolute w-24 h-24 rounded-full top-1/2 right-4" style={{ background: "rgba(255,255,255,0.07)" }} />

      <div
        className="relative rounded-2xl p-5 w-full max-w-xs border border-white/20 backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)" }}
      >
        {/* Top highlight */}
        <div
          className="absolute inset-x-6 top-2 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
        />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-xs font-bold">
            KD
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Karakura Digital</p>
            <p className="text-white/55 text-[11px]">Agencia · Córdoba</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
        </div>
        <div className="space-y-3 mb-4">
          {[
            { label: "Conversión", v: 85 },
            { label: "Retención", v: 62 },
            { label: "NPS", v: 91 },
          ].map(({ label, v }) => (
            <div key={label}>
              <div className="flex justify-between text-white/65 text-[10px] mb-1.5">
                <span>{label}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/15">
                <div className="h-full rounded-full bg-white/70" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2 rounded-xl text-white text-xs font-semibold border border-white/25 bg-white/15">
          Ver informe →
        </button>
      </div>
    </div>
  );
}

function ClaymorphismDemo() {
  const cards = [
    {
      color: "#ff6b6b", shadow: "rgba(255,107,107,0.5)", label: "Campañas", value: "+42%",
      icon: (
        <div style={{ width: 14, height: 16, background: "rgba(255,255,255,0.65)", clipPath: "polygon(50% 0%,100% 55%,68% 55%,68% 100%,32% 100%,32% 55%,0% 55%)" }} />
      ),
    },
    {
      color: "#4ecdc4", shadow: "rgba(78,205,196,0.5)", label: "Clientes", value: "1.2k",
      icon: (
        <div className="flex items-end gap-1">
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.55)" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(255,255,255,0.7)", marginBottom: -1 }} />
        </div>
      ),
    },
    {
      color: "#a855f7", shadow: "rgba(168,85,247,0.5)", label: "Proyectos", value: "28",
      icon: (
        <div style={{ width: 14, height: 14, background: "rgba(255,255,255,0.65)", transform: "rotate(45deg)", borderRadius: 3 }} />
      ),
    },
  ];

  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{ background: "linear-gradient(145deg, #fff0e8 0%, #fde8b2 50%, #eaf4ff 100%)" }}
    >
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {cards.map((item) => (
          <div
            key={item.label}
            className="rounded-[22px] p-4 flex items-center gap-4"
            style={{
              background: `linear-gradient(145deg, ${item.color}f0, ${item.color}cc)`,
              boxShadow: `5px 5px 0 ${item.shadow}, inset 0 1px 0 rgba(255,255,255,0.35), 0 12px 24px rgba(0,0,0,0.07)`,
            }}
          >
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0"
              style={{
                background: "rgba(255,255,255,0.28)",
                boxShadow: "inset 0 3px 6px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.06)",
              }}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-white/70 text-xs font-semibold">{item.label}</p>
              <p className="text-white text-2xl font-black" style={{ letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MinimalismDemo() {
  return (
    <div className="h-full flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-xs">
        <div className="text-[9px] tracking-[0.32em] text-stone-400 uppercase mb-7" style={{ letterSpacing: "0.32em" }}>
          Karakura Digital / 2026
        </div>
        <h2
          className="text-3xl font-light text-stone-900 leading-tight mb-6"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Diseño
          <br />
          <span className="text-stone-400">que respira.</span>
        </h2>
        <div className="w-8 h-px bg-stone-900 mb-6" />
        <p className="text-[11px] text-stone-400 leading-relaxed mb-8" style={{ lineHeight: "1.8" }}>
          El espacio en blanco no es vacío. Es silencio intencional que hace
          que cada elemento hable por sí solo.
        </p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[9px] text-stone-400 tracking-[0.2em] uppercase mb-0.5">
              Contacto
            </p>
            <p className="text-[11px] text-stone-600">hola@karakura.es</p>
          </div>
          <button
            className="text-[10px] border border-stone-900 px-4 py-2 text-stone-900 tracking-widest"
            style={{ transition: "background 150ms ease, color 150ms ease" }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

function MaximalismDemo() {
  return (
    <div className="h-full relative overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Full-bleed gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #ff006e 0%, #8338ec 33%, #3a86ff 66%, #06d6a0 100%)" }}
      />
      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      {/* Dark wash on upper half */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "45%", background: "rgba(8,8,8,0.55)" }}
      />

      {/* Competing type composition */}
      <div className="absolute inset-0 flex flex-col justify-between p-3.5 z-10">
        <div>
          <p className="font-black text-white uppercase" style={{ fontSize: 8, letterSpacing: "0.32em", opacity: 0.5 }}>
            KARAKURA × DIGITAL × 2026
          </p>
          <p
            className="font-black text-white"
            style={{ fontSize: 52, lineHeight: 0.82, letterSpacing: "-0.04em", textShadow: "4px 4px 0 #ff006e" }}
          >
            DIS<span style={{ WebkitTextStroke: "2.5px white", color: "transparent" }}>EÑO</span>
          </p>
        </div>

        <div>
          <p className="font-black uppercase" style={{ fontSize: 44, lineHeight: 0.82, letterSpacing: "-0.03em" }}>
            <span style={{ color: "#ffe66d" }}>SIN</span>
            <br />
            <span style={{ color: "#ff006e" }}>LÍMI</span>
            <span style={{ color: "#06d6a0" }}>TES</span>
          </p>
        </div>

        <div>
          {/* 8-color rule */}
          <div className="flex mb-1.5" style={{ height: 5 }}>
            {["#ff006e","#8338ec","#3a86ff","#06d6a0","#ffe66d","#ff6b35","#a855f7","#4ecdc4"].map((c, i) => (
              <div key={i} className="flex-1" style={{ background: c }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.28)" }} />
            <p className="font-black text-white" style={{ fontSize: 9, letterSpacing: "0.2em" }}>
              ✦ TODO ✦ AHORA ✦
            </p>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.28)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BrutalismDemo() {
  return (
    <div className="h-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-xs border-4 border-black">
        <div className="bg-black text-white p-3 font-mono text-xs uppercase tracking-widest">
          KARAKURA DIGITAL — AGENCIA WEB
        </div>
        <div className="p-4 border-b-4 border-black">
          <p className="font-mono text-4xl font-black leading-none text-black">
            WEB
          </p>
          <p
            className="font-mono text-4xl font-black leading-none"
            style={{ WebkitTextStroke: "2px black", color: "transparent" }}
          >
            WORK
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-3 border-r-4 border-black border-b-4">
            <p className="font-mono text-[10px] text-black/40 uppercase">
              Fundada
            </p>
            <p className="font-mono font-black text-lg" style={{ fontVariantNumeric: "tabular-nums" }}>2024</p>
          </div>
          <div className="p-3 border-b-4 border-black">
            <p className="font-mono text-[10px] text-black/40 uppercase">
              Proyectos
            </p>
            <p className="font-mono font-black text-lg" style={{ fontVariantNumeric: "tabular-nums" }}>28+</p>
          </div>
        </div>
        <div className="p-3">
          <button className="w-full bg-black text-white font-mono text-xs py-2.5 uppercase tracking-widest">
            [CONTACTAR] →
          </button>
        </div>
      </div>
    </div>
  );
}

function LiquidGlassDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #08081a 0%, #180a2e 60%, #0a1828 100%)" }}
    >
      {/* Ambient orbs */}
      <div className="absolute w-64 h-64 rounded-full -top-12 -left-12 opacity-30"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />
      <div className="absolute w-52 h-52 rounded-full -bottom-10 -right-10 opacity-25"
        style={{ background: "radial-gradient(circle, #67e8f9, transparent 70%)" }} />
      <div className="absolute w-36 h-36 rounded-full top-1/3 right-8 opacity-15"
        style={{ background: "radial-gradient(circle, #f0abfc, transparent 70%)" }} />

      <div
        className="relative w-full max-w-xs rounded-3xl p-5 backdrop-blur-2xl"
        style={{
          background: "rgba(255,255,255,0.055)",
          border: "0.5px solid rgba(255,255,255,0.15)",
          boxShadow: "0 0 0 0.5px rgba(255,255,255,0.07) inset, 0 28px 56px rgba(0,0,0,0.5)",
        }}
      >
        {/* Glass top shimmer */}
        <div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            inset: 0,
            background: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 55%)",
          }}
        />
        {/* Specular top edge */}
        <div
          className="absolute inset-x-8 top-0 pointer-events-none"
          style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
        />

        <div className="flex items-center justify-between mb-5 relative">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 text-xs font-medium"
            style={{ background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.22)" }}
          >
            KD
          </div>
          <div
            className="h-px flex-1 mx-3"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)" }}
          />
          <span className="text-white/30 text-[10px]" style={{ fontVariantNumeric: "tabular-nums" }}>09:41</span>
        </div>
        <p className="text-white text-lg font-light mb-1 relative">Buenos días,</p>
        <p className="text-white/40 text-xs mb-5 relative">3 proyectos activos · 1 reunión hoy</p>
        <div className="flex gap-2 relative">
          {["Diseño", "Dev", "Launch"].map((t, i) => (
            <div
              key={t}
              className="flex-1 rounded-2xl py-2 text-center text-[10px] text-white/60"
              style={{
                background: i === 0 ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.06)",
                border: i === 0 ? "0.5px solid rgba(167,139,250,0.3)" : "0.5px solid rgba(255,255,255,0.1)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpatialUIDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #0d1117 0%, #020408 100%)" }}
    >
      <div className="relative" style={{ width: 230 }}>
        {/* Layer 3 — furthest */}
        <div
          className="absolute rounded-xl"
          style={{
            inset: 0,
            transform: "translateY(28px) translateX(14px) scale(0.84)",
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(99,102,241,0.1)",
          }}
        />
        {/* Layer 2 — middle, shows content hint */}
        <div
          className="absolute rounded-xl overflow-hidden"
          style={{
            inset: 0,
            transform: "translateY(14px) translateX(7px) scale(0.93)",
            background: "rgba(10,14,30,0.8)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div className="p-4 opacity-45">
            <div className="flex gap-2 mb-2.5">
              <div className="h-1.5 rounded-full bg-indigo-400/30" style={{ width: "55%" }} />
              <div className="h-1.5 rounded-full bg-white/10" style={{ width: "30%" }} />
            </div>
            <div className="h-1.5 rounded-full bg-white/10 mb-1.5" style={{ width: "80%" }} />
            <div className="h-1.5 rounded-full bg-white/8" style={{ width: "60%" }} />
          </div>
        </div>
        {/* Layer 1 — front */}
        <div
          className="relative rounded-xl p-5"
          style={{
            background: "rgba(13,17,32,0.97)",
            border: "1px solid rgba(99,102,241,0.38)",
            boxShadow: "0 0 40px rgba(99,102,241,0.1), 0 28px 56px rgba(0,0,0,0.75)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500" style={{ boxShadow: "0 0 6px #6366f1" }} />
            <span className="text-indigo-300/60 text-[10px] tracking-widest uppercase">Panel de control</span>
            <div className="ml-auto flex items-center gap-1">
              {["#6366f1","#06b6d4","#8b5cf6"].map((c, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c, opacity: 1 - i * 0.3 }} />
              ))}
            </div>
          </div>
          <p className="text-white text-sm font-light mb-4">Sistema operativo</p>
          <div className="space-y-3">
            {[
              { label: "Núcleo", v: "98%", color: "#6366f1" },
              { label: "Red", v: "71%", color: "#06b6d4" },
              { label: "Memoria", v: "44%", color: "#8b5cf6" },
            ].map(({ label, v, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-white/35 text-[10px]" style={{ width: 52 }}>{label}</span>
                <div className="flex-1 h-1 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: v, background: color, boxShadow: `0 0 6px ${color}80` }}
                  />
                </div>
                <span className="text-white/35 text-[10px] text-right" style={{ width: 28, fontVariantNumeric: "tabular-nums" }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConstructivismDemo() {
  return (
    <div
      className="h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "#f0ece0" }}
    >
      {/* Main diagonal red band */}
      <div
        className="absolute bg-red-600"
        style={{ width: "170%", height: 52, top: "20%", left: "-35%", transform: "rotate(-8deg)" }}
      />
      {/* Thin black rule under red band */}
      <div
        className="absolute bg-black"
        style={{ width: "170%", height: 4, top: "calc(20% + 50px)", left: "-35%", transform: "rotate(-8deg)" }}
      />
      {/* Bottom-right black block */}
      <div className="absolute bottom-0 right-0" style={{ width: "36%", height: 48, background: "#000" }} />
      <div className="absolute" style={{ bottom: 48, right: 0, width: "22%", height: 5, background: "#dc2626" }} />
      {/* Bottom-left CSS triangle */}
      <div
        className="absolute bottom-0 left-0"
        style={{ width: 0, height: 0, borderBottom: "72px solid #000", borderRight: "54px solid transparent" }}
      />
      {/* Top-right square stack */}
      <div className="absolute" style={{ top: 12, right: 12, width: 28, height: 28, border: "3px solid #000", zIndex: 1 }} />
      <div className="absolute" style={{ top: 18, right: 18, width: 28, height: 28, background: "#dc2626" }} />

      <div className="relative z-10 text-center px-4">
        <p className="font-black text-black uppercase" style={{ fontSize: 9, letterSpacing: "0.44em", marginBottom: 2 }}>
          Agencia
        </p>
        <p className="font-black text-black" style={{ fontSize: 64, lineHeight: 0.82, letterSpacing: "-0.04em" }}>
          KA
        </p>
        <p className="font-black text-red-600" style={{ fontSize: 64, lineHeight: 0.82, letterSpacing: "-0.04em", marginTop: -4 }}>
          RA
        </p>
        <div className="w-full bg-black mb-1.5" style={{ height: 3, marginTop: 6 }} />
        <p className="font-black text-black uppercase" style={{ fontSize: 8, letterSpacing: "0.22em" }}>
          CÓRDOBA · ESPAÑA · 2024
        </p>
      </div>
    </div>
  );
}

function NeobrutalistDemo() {
  return (
    <div className="h-full flex items-center justify-center p-4 bg-[#f9f4ef]">
      <div className="w-full max-w-xs">
        <div
          className="border-4 border-black p-4 bg-yellow-300 mb-3"
          style={{ boxShadow: "6px 6px 0 #000" }}
        >
          <p className="font-black text-2xl text-black uppercase leading-tight">
            Diseño
            <br />
            sin
            <br />
            filtros
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div
            className="border-4 border-black p-3 bg-pink-400"
            style={{ boxShadow: "4px 4px 0 #000" }}
          >
            <p className="font-black text-[10px] text-black uppercase">
              Proyectos
            </p>
            <p className="font-black text-3xl text-black" style={{ fontVariantNumeric: "tabular-nums" }}>28</p>
          </div>
          <div
            className="border-4 border-black p-3 bg-cyan-400"
            style={{ boxShadow: "4px 4px 0 #000" }}
          >
            <p className="font-black text-[10px] text-black uppercase">
              Clientes
            </p>
            <p className="font-black text-3xl text-black">∞</p>
          </div>
        </div>
        <button
          className="w-full border-4 border-black py-3 bg-black text-white font-black text-sm uppercase"
          style={{ boxShadow: "4px 4px 0 #555" }}
        >
          ¡Hablemos! →
        </button>
      </div>
    </div>
  );
}

function BentoGridDemo() {
  return (
    <div className="h-full p-4 flex items-center justify-center" style={{ background: "#f7f5f2" }}>
      <div
        className="grid gap-2 w-full max-w-xs"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(4, 52px)" }}
      >
        {/* Hero tile */}
        <div
          className="rounded-2xl p-3 flex flex-col justify-between"
          style={{ gridColumn: "1 / 3", gridRow: "1 / 3", background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
        >
          <p className="text-white/50 text-[9px] uppercase tracking-widest">Destacado</p>
          <div>
            <p className="text-white text-lg font-bold leading-tight">Desarrollo<br />Web</p>
            <div className="flex gap-1 mt-1.5">
              {["#a78bfa","#c4b5fd","#ddd6fe"].map((c, i) => (
                <div key={i} className="h-1 rounded-full" style={{ width: 16 + i * 8, background: c, opacity: 0.7 }} />
              ))}
            </div>
          </div>
        </div>
        {/* Small tiles */}
        <div className="rounded-2xl flex flex-col items-center justify-center gap-0.5" style={{ background: "#f97316" }}>
          <div className="w-3 h-4 rounded-sm" style={{ background: "rgba(255,255,255,0.6)", clipPath: "polygon(50% 0%,100% 55%,65% 55%,65% 100%,35% 100%,35% 55%,0% 55%)" }} />
          <p className="text-white text-[9px] font-bold">Lanzar</p>
        </div>
        <div className="rounded-2xl flex flex-col items-center justify-center gap-0.5" style={{ background: "#1c1917" }}>
          <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg, #a78bfa, #3b82f6)" }} />
          <p className="text-white text-[9px] font-bold">IA</p>
        </div>
        {/* Full-width status */}
        <div
          className="rounded-2xl bg-white border border-stone-200 p-3 flex items-center gap-2"
          style={{ gridColumn: "1 / 4" }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" style={{ boxShadow: "0 0 5px #10b981" }} />
          <p className="text-stone-600 text-[11px]" style={{ fontVariantNumeric: "tabular-nums" }}>28 proyectos completados</p>
          <p className="text-stone-400 text-xs ml-auto">→</p>
        </div>
        {/* Bottom trio */}
        <div className="rounded-2xl flex flex-col items-center justify-center" style={{ background: "#fef08a" }}>
          <p className="text-amber-900 font-black text-[11px]">SEO</p>
        </div>
        <div className="rounded-2xl flex flex-col items-center justify-center" style={{ background: "#fb7185" }}>
          <p className="text-white text-[11px] font-bold">UI/UX</p>
        </div>
        <div className="rounded-2xl flex flex-col items-center justify-center" style={{ background: "#22d3ee" }}>
          <p className="text-cyan-950 text-[11px] font-bold">3D</p>
        </div>
      </div>
    </div>
  );
}

function AuroraMeshDemo() {
  return (
    <div className="h-full relative overflow-hidden" style={{ background: "#03030e" }}>
      {/* Richer mesh — 5 overlapping radial-gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 25%, rgba(124,58,237,0.65), transparent), " +
            "radial-gradient(ellipse 60% 50% at 82% 15%, rgba(6,182,212,0.55), transparent), " +
            "radial-gradient(ellipse 65% 55% at 60% 78%, rgba(236,72,153,0.5), transparent), " +
            "radial-gradient(ellipse 55% 60% at 5% 85%, rgba(16,185,129,0.45), transparent), " +
            "radial-gradient(ellipse 45% 45% at 88% 70%, rgba(245,158,11,0.35), transparent)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className="relative rounded-2xl p-5 w-full max-w-xs backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Top specular */}
          <div
            className="absolute inset-x-6 top-0 pointer-events-none"
            style={{ height: "0.5px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
          />
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }} />
            <span className="text-white/45 text-[10px] tracking-[0.18em] uppercase">Aurora Studio</span>
          </div>
          <p className="text-white text-lg font-semibold mb-0.5">Karakura Digital</p>
          <p className="text-white/40 text-xs mb-4">Diseño en movimiento</p>
          {/* Color spectrum bar */}
          <div className="flex gap-1 mb-4" style={{ height: 3 }}>
            {["#7c3aed","#06b6d4","#ec4899","#10b981","#f59e0b"].map((c, i) => (
              <div key={i} className="flex-1 rounded-full" style={{ background: c, opacity: 0.85 }} />
            ))}
          </div>
          <div className="flex gap-2">
            {["Branding", "Web", "Motion"].map((t, i) => (
              <div
                key={t}
                className="flex-1 rounded-xl py-1.5 text-center text-[10px] text-white/55"
                style={{
                  background: i === 0 ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.05)",
                  border: i === 0 ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalDemo() {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: "#0a0a0a" }}>
      <div className="w-full max-w-sm rounded-xl overflow-hidden" style={{ border: "1px solid #1a1a1a" }}>
        {/* Chrome */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: "#141414", borderBottom: "1px solid #1a1a1a" }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="flex-1 text-center text-[10px] font-mono text-white/20">
            karakura — zsh
          </span>
        </div>
        {/* Body */}
        <div className="p-4 font-mono text-[11px] leading-relaxed" style={{ background: "#0a0a0a" }}>
          <p style={{ color: "#4ade80" }}>
            <span style={{ color: "#22c55e" }}>karakura</span>
            <span style={{ color: "#60a5fa" }}>@</span>
            <span style={{ color: "#34d399" }}>studio</span>
            <span style={{ color: "#ffffff88" }}> ~</span>
            <span style={{ color: "#ffffff44" }}> $</span>
            <span style={{ color: "#f0f0f0" }}> npm run deploy</span>
          </p>
          <p className="mt-1" style={{ color: "#4ade8088" }}>▶ Building for production...</p>
          <p style={{ color: "#4ade8066" }}>✓ Routes compiled (0.8s)</p>
          <p style={{ color: "#4ade8066" }}>✓ Assets optimized</p>
          <p style={{ color: "#4ade8066" }}>✓ Static export complete</p>
          <p className="mt-1" style={{ color: "#34d399" }}>
            ✓ Deployed → karakuradigital.es
          </p>
          <p className="mt-2" style={{ color: "#4ade80" }}>
            <span style={{ color: "#22c55e" }}>karakura</span>
            <span style={{ color: "#60a5fa" }}>@</span>
            <span style={{ color: "#34d399" }}>studio</span>
            <span style={{ color: "#ffffff88" }}> ~</span>
            <span style={{ color: "#ffffff44" }}> $</span>
            <span className="ml-1 inline-block w-2 h-3.5 align-middle" style={{ background: "#4ade80", animation: "none" }}>
              &nbsp;
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function DarkLuxuryDemo() {
  return (
    <div className="h-full flex items-center justify-center px-8 py-6" style={{ background: "#080808" }}>
      <div className="w-full max-w-xs">
        {/* Monogram */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-8 h-8 flex items-center justify-center shrink-0"
            style={{ border: "1px solid rgba(201,169,110,0.35)", color: "rgba(201,169,110,0.7)", fontFamily: "Georgia, serif", fontSize: 13, letterSpacing: "0.04em" }}
          >
            K
          </div>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(201,169,110,0.3), transparent)" }} />
          <p className="text-[9px] tracking-[0.32em] uppercase" style={{ color: "rgba(201,169,110,0.5)", fontFamily: "Georgia, serif" }}>
            Est. 2024
          </p>
        </div>

        <h2
          className="text-4xl leading-tight mb-4"
          style={{ color: "#f5f0e8", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300, letterSpacing: "-0.01em" }}
        >
          Sin<br />
          <em>compromiso.</em>
        </h2>

        <div style={{ borderBottom: "1px solid rgba(201,169,110,0.18)" }} className="mb-4" />

        {/* Stats row */}
        <div className="grid grid-cols-3 mb-4" style={{ gap: "1px", background: "rgba(201,169,110,0.12)" }}>
          {[["28", "Proyectos"], ["100%", "Satisfacción"], ["4.9", "Rating"]].map(([v, l]) => (
            <div key={l} className="text-center py-3" style={{ background: "#080808" }}>
              <p className="text-base font-light" style={{ color: "rgba(201,169,110,0.85)", fontVariantNumeric: "tabular-nums" }}>{v}</p>
              <p className="text-[8px] tracking-[0.18em] uppercase mt-0.5" style={{ color: "rgba(245,240,232,0.25)" }}>{l}</p>
            </div>
          ))}
        </div>

        <div style={{ borderBottom: "1px solid rgba(201,169,110,0.18)" }} className="mb-4" />

        <p
          className="text-xs leading-relaxed mb-5"
          style={{ color: "rgba(245,240,232,0.3)", letterSpacing: "0.05em" }}
        >
          Desarrollo web de alto nivel para marcas que no aceptan mediocridad.
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(201,169,110,0.5)" }}>
              Córdoba
            </p>
            <p className="text-xs" style={{ color: "rgba(245,240,232,0.4)" }}>
              karakuradigital.es
            </p>
          </div>
          <button
            className="text-[10px] tracking-[0.15em] uppercase py-2.5 px-5"
            style={{
              border: "1px solid rgba(201,169,110,0.4)",
              color: "rgba(201,169,110,0.8)",
              background: "transparent",
            }}
          >
            Contactar
          </button>
        </div>
      </div>
    </div>
  );
}

function Y2KDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e8e0f8 0%, #c8e8f8 50%, #e8c8f8 100%)",
      }}
    >
      {/* Star decorations */}
      {["top-4 left-8", "top-6 right-12", "bottom-8 left-16", "bottom-4 right-6"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} text-white/60 text-xs select-none`} style={{ textShadow: "0 0 6px rgba(180,120,255,0.8)" }}>
          ✦
        </div>
      ))}
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        {/* Metallic card */}
        <div
          className="w-full rounded-2xl p-5 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(200,220,240,0.7) 40%, rgba(220,200,240,0.8) 100%)",
            border: "1px solid rgba(255,255,255,0.95)",
            boxShadow: "0 4px 24px rgba(160,100,255,0.2), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(180,150,220,0.3)",
          }}
        >
          {/* Glossy sheen */}
          <div
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7), transparent)" }}
          />
          <p
            className="relative text-xl font-black mb-1"
            style={{
              background: "linear-gradient(180deg, #9060d0, #5080e0, #30c0e8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            KARAKURA
          </p>
          <p className="relative text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: "#8060b0" }}>
            Digital Studio ✧ 2026
          </p>
        </div>
        {/* Chrome pill buttons */}
        <div className="flex gap-3">
          {["Proyectos", "Contacto"].map((t, i) => (
            <button
              key={t}
              className="px-4 py-2 rounded-full text-xs font-bold relative overflow-hidden"
              style={
                i === 0
                  ? {
                      background: "linear-gradient(180deg, #a078e0, #6050c0)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.4)",
                      boxShadow: "0 4px 12px rgba(100,80,200,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
                    }
                  : {
                      background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(200,220,240,0.8))",
                      color: "#7060b0",
                      border: "1px solid rgba(255,255,255,0.9)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
                    }
              }
            >
              {t}
            </button>
          ))}
        </div>
        {/* Y2K loading bar */}
        <div className="w-full">
          <div className="flex justify-between mb-1">
            <p className="text-[9px] font-bold tracking-widest" style={{ color: "#9060c0" }}>Conectando...</p>
            <p className="text-[9px] font-bold" style={{ color: "#9060c0", fontVariantNumeric: "tabular-nums" }}>99%</p>
          </div>
          <div
            className="w-full rounded-full overflow-hidden"
            style={{
              height: 8,
              background: "linear-gradient(180deg, rgba(180,150,220,0.25), rgba(200,180,240,0.15))",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: "99%",
                background: "linear-gradient(180deg, #c090f0, #9060d0, #6040b0)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            />
          </div>
        </div>
        <p className="text-[10px] font-bold tracking-widest" style={{ color: "#9060c0", textShadow: "0 0 8px rgba(160,100,255,0.4)" }}>
          ★ Bienvenido al futuro ★
        </p>
      </div>
    </div>
  );
}

function FrutigerAeroDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #a8d8f0 0%, #6ec6e8 40%, #c8eed8 100%)",
      }}
    >
      {/* Sun glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,240,180,0.7), transparent 70%)" }}
      />
      {/* Bottom grass strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 rounded-b-none"
        style={{
          background: "linear-gradient(180deg, rgba(80,180,100,0.6), rgba(50,140,70,0.8))",
        }}
      />
      {/* Main glass panel */}
      <div
        className="relative w-full max-w-xs rounded-3xl p-5 backdrop-blur-md"
        style={{
          background: "rgba(255,255,255,0.55)",
          border: "1.5px solid rgba(255,255,255,0.85)",
          boxShadow: "0 8px 32px rgba(80,160,200,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Gloss sheen */}
        <div
          className="absolute inset-x-3 top-2 h-8 rounded-2xl"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.65), transparent)" }}
        />
        <div className="flex items-center gap-3 mb-4 relative">
          {/* Leaf icon via CSS */}
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #6ecf7a, #3aab5a)",
              boxShadow: "0 3px 10px rgba(60,160,80,0.4), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            <div style={{
              width: 18, height: 18,
              background: "linear-gradient(135deg, #d4f5d8, #a8e8b0)",
              borderRadius: "50% 0 50% 0",
              transform: "rotate(-30deg)",
              boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.6)",
            }} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#1a5c3a" }}>
              Karakura Digital
            </p>
            <p className="text-[10px]" style={{ color: "#3a8c5c" }}>
              Tecnología y naturaleza
            </p>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 relative">
          {[["28", "Proyectos"], ["4.9", "Rating"], ["100%", "Eco"]].map(([v, l]) => (
            <div
              key={l}
              className="rounded-2xl p-2 text-center"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <p className="font-bold text-sm" style={{ color: "#1a5c3a", fontVariantNumeric: "tabular-nums" }}>{v}</p>
              <p className="text-[9px]" style={{ color: "#3a8c5c" }}>{l}</p>
            </div>
          ))}
        </div>
        {/* Aqua button */}
        <button
          className="relative w-full rounded-2xl py-2.5 font-bold text-xs text-white overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #4ab8e8 0%, #1a88c8 50%, #0a68a8 100%)",
            boxShadow: "0 4px 16px rgba(20,120,200,0.4), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="absolute inset-x-4 top-1 h-3 rounded-full"
            style={{ background: "rgba(255,255,255,0.4)" }}
          />
          Contactar ahora
        </button>
      </div>
    </div>
  );
}

function Glassmorphism2Demo() {
  const bars = [30, 45, 38, 60, 52, 70, 65, 80, 72, 90, 85, 100];
  return (
    <div
      className="h-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg,#0f0c29,#302b63,#24243e)" }}
    >
      {/* Noise */}
      <div className="absolute inset-0" style={{ opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "160px" }} />
      {/* Orbs */}
      <div className="absolute rounded-full pointer-events-none" style={{ width: 180, height: 180, top: -50, right: 20, background: "radial-gradient(circle,rgba(139,92,246,.18),transparent 70%)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 140, height: 140, bottom: -30, left: 30, background: "radial-gradient(circle,rgba(59,130,246,.14),transparent 70%)" }} />
      {/* Layout */}
      <div className="relative z-10 flex gap-2" style={{ width: 280 }}>
        {/* Sidebar */}
        <div className="flex flex-col items-center gap-2 py-2.5 px-0 rounded-[18px]" style={{ width: 52, background: "rgba(255,255,255,.05)", border: ".5px solid rgba(255,255,255,.1)", backdropFilter: "blur(20px)" }}>
          {/* Bar chart icon — active */}
          <div className="w-8 h-8 rounded-[10px] flex items-end justify-center gap-[2px] pb-1.5" style={{ background: "rgba(139,92,246,.25)", border: ".5px solid rgba(139,92,246,.4)" }}>
            {[55, 80, 65, 100].map((h, i) => (
              <div key={i} style={{ width: 3, height: `${h * 0.14}px`, background: i === 3 ? "rgba(167,139,250,.9)" : "rgba(139,92,246,.5)", borderRadius: 1 }} />
            ))}
          </div>
          {/* Folder icon */}
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{}}>
            <div style={{ position: "relative", width: 16, height: 12 }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 9, borderRadius: "0 2px 2px 2px", background: "rgba(255,255,255,.2)", border: ".5px solid rgba(255,255,255,.15)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: 8, height: 4, borderRadius: "2px 2px 0 0", background: "rgba(255,255,255,.2)", border: ".5px solid rgba(255,255,255,.15)", borderBottom: "none" }} />
            </div>
          </div>
          {/* Bell icon */}
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{}}>
            <div style={{ position: "relative", width: 12, height: 14 }}>
              <div style={{ position: "absolute", top: 1, left: 0, right: 0, height: 10, borderRadius: "6px 6px 2px 2px", background: "rgba(255,255,255,.2)", border: ".5px solid rgba(255,255,255,.15)" }} />
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 5, height: 2, borderRadius: "0 0 3px 3px", background: "rgba(255,255,255,.2)" }} />
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 3, height: 2, borderRadius: 2, background: "rgba(255,255,255,.2)" }} />
            </div>
          </div>
          <div className="flex-1" />
          {/* Gear / settings icon */}
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{}}>
            <div style={{ position: "relative", width: 14, height: 14 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,.2)", boxSizing: "border-box" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,.2)" }} />
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="flex-1 rounded-[18px] p-3.5" style={{ background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.1)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: ".12em", textTransform: "uppercase" }}>Analytics / Q4</span>
            <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>KD</div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mb-2.5">
            {[["€12.4k", "MRR", "+18%"], ["2,841", "Usuarios", "+6%"]].map(([v, l, d]) => (
              <div key={l} className="rounded-[10px] p-2" style={{ background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.07)" }}>
                <div className="text-base font-bold text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{v}</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em" }}>{l}</div>
                <div style={{ fontSize: 8, fontWeight: 600, color: "#4ade80" }}>{d}</div>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-[3px] mb-2" style={{ height: 32 }}>
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 11 ? "rgba(139,92,246,.8)" : "rgba(139,92,246,.35)" }} />
            ))}
          </div>
          <div className="flex gap-1">
            {["Sem actual", "+18.3%", "Live"].map((t, i) => (
              <span key={t} className="px-2 py-0.5 rounded-[6px] text-[9px]" style={{ background: "rgba(255,255,255,.05)", border: ".5px solid rgba(255,255,255,.08)", color: i === 2 ? "rgba(139,92,246,.7)" : "rgba(255,255,255,.4)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AceternityDemo() {
  return (
    <div className="h-full flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "#000" }}>
      {/* Grid */}
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      {/* Beams */}
      <div className="absolute pointer-events-none" style={{ width: 1, height: "100%", top: 0, left: "30%", background: "linear-gradient(180deg,transparent,rgba(139,92,246,.4),transparent)", boxShadow: "0 0 8px rgba(139,92,246,.3)" }} />
      <div className="absolute pointer-events-none" style={{ width: 1, height: "100%", top: 0, right: "25%", background: "linear-gradient(180deg,transparent,rgba(59,130,246,.3),transparent)" }} />
      {/* Card */}
      <div className="relative z-10 rounded-2xl p-5" style={{ width: 250, border: "1px solid rgba(255,255,255,.1)", background: "rgba(10,10,10,.8)", backdropFilter: "blur(8px)" }}>
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full mb-3.5 text-[10px]" style={{ background: "rgba(139,92,246,.12)", border: ".5px solid rgba(139,92,246,.3)", color: "rgba(139,92,246,.9)", letterSpacing: ".06em" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#8b5cf6", boxShadow: "0 0 6px #8b5cf6" }} />
          Nuevo — IA Generativa
        </div>
        <div className="text-[22px] font-bold text-white leading-tight tracking-tight mb-2">
          <span style={{ background: "linear-gradient(90deg,#fff 0%,rgba(255,255,255,.4) 40%,#fff 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundSize: "200% 100%" }}>Karakura</span>
          <br />Intelligence
        </div>
        <p className="text-[11px] mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,.35)" }}>Automatización avanzada para equipos que construyen el futuro.</p>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", boxShadow: "0 0 20px rgba(139,92,246,.35)" }}>
          Empezar gratis →
        </button>
        <div className="flex gap-1.5 mt-3">
          {["Next.js", "OpenAI", "Edge"].map(t => (
            <span key={t} className="px-2 py-0.5 rounded-[6px] text-[10px]" style={{ background: "rgba(255,255,255,.05)", border: ".5px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.45)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CorporateMemphisDemo() {
  return (
    <div className="h-full flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute rounded-full" style={{ width: 180, height: 180, top: -60, right: -50, background: "#fef08a" }} />
      <div className="absolute rounded-full" style={{ width: 100, height: 100, bottom: -30, left: -20, background: "#bbf7d0" }} />
      <div className="absolute rounded-full" style={{ width: 60, height: 60, bottom: 24, right: 16, background: "#fed7aa", opacity: .85 }} />

      <div className="relative z-10" style={{ width: 250 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#f97316", marginBottom: 6 }}>
          Karakura Digital
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.2, marginBottom: 12 }}>
          Tu equipo digital,<br />sin complicaciones
        </p>

        {/* Memphis CSS illustration */}
        <div className="w-full rounded-2xl mb-3 relative overflow-hidden" style={{ height: 80, background: "#fef3c7" }}>
          {/* Person 1 — orange */}
          <div className="absolute flex flex-col items-center" style={{ left: 16, top: 8 }}>
            <div className="rounded-full" style={{ width: 18, height: 18, background: "#f97316" }} />
            <div style={{ width: 26, height: 20, background: "#f97316", borderRadius: "12px 12px 0 0", marginTop: 2 }} />
          </div>
          {/* Person 2 — purple, centered, taller */}
          <div className="absolute flex flex-col items-center" style={{ left: "50%", top: 4, transform: "translateX(-50%)" }}>
            <div className="rounded-full" style={{ width: 22, height: 22, background: "#8b5cf6" }} />
            <div style={{ width: 30, height: 24, background: "#8b5cf6", borderRadius: "14px 14px 0 0", marginTop: 2 }} />
          </div>
          {/* Person 3 — cyan */}
          <div className="absolute flex flex-col items-center" style={{ right: 16, top: 8 }}>
            <div className="rounded-full" style={{ width: 18, height: 18, background: "#06b6d4" }} />
            <div style={{ width: 26, height: 20, background: "#06b6d4", borderRadius: "12px 12px 0 0", marginTop: 2 }} />
          </div>
          {/* Decorative accents */}
          <div className="absolute" style={{ left: 8, bottom: 8, width: 10, height: 10, background: "#f59e0b", borderRadius: "50%" }} />
          <div className="absolute" style={{ right: 10, bottom: 10, width: 12, height: 12, background: "#4ade80", transform: "rotate(45deg)" }} />
          <div className="absolute" style={{ bottom: 14, left: "50%", transform: "translateX(-50%)", width: 20, height: 3, background: "#f97316", borderRadius: 2, opacity: .5 }} />
        </div>

        <div className="flex gap-2.5">
          {[["28+", "Proyectos", "#f97316"], ["100%", "Satisfacción", "#8b5cf6"], ["4.9", "Rating", "#06b6d4"]].map(([v, l, c]) => (
            <div key={l as string} className="text-center flex-1">
              <div style={{ fontSize: 18, fontWeight: 800, color: c as string, fontVariantNumeric: "tabular-nums" }}>{v}</div>
              <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorialDemo() {
  return (
    <div className="h-full flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "#f5f3ee" }}>
      <div style={{ width: 280 }}>
        {/* Masthead */}
        <div className="flex items-center justify-between pb-2 mb-2.5" style={{ borderBottom: "3px solid #1a1a1a" }}>
          <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: "-.02em", color: "#1a1a1a", textTransform: "uppercase" }}>Karakura Review</span>
          <div className="text-right">
            <div style={{ fontSize: 8, color: "#999", letterSpacing: ".14em", textTransform: "uppercase", fontVariantNumeric: "tabular-nums" }}>Vol. 03 · Nº 12</div>
            <div style={{ fontSize: 8, color: "#999" }}>Julio 2025</div>
          </div>
        </div>
        {/* Hero grid */}
        <div className="grid gap-0 mb-0" style={{ gridTemplateColumns: "1fr 1.4fr" }}>
          <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", background: "linear-gradient(145deg,#1a1a1a,#2a2a2a,#383838)" }}>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-black" style={{ color: "rgba(255,255,255,.1)" }}>K</div>
            <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1" style={{ fontSize: 7, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", background: "linear-gradient(0deg,rgba(0,0,0,.7),transparent)" }}>Córdoba, 2025</div>
          </div>
          <div className="pl-3 py-2.5 flex flex-col justify-between">
            <div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: ".24em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>Diseño Digital</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1a1a", lineHeight: 1, letterSpacing: "-.025em", textTransform: "uppercase", marginBottom: 8 }}>El<br />arte<br /><em style={{ fontStyle: "italic", fontWeight: 300 }}>de</em><br />menos</div>
            </div>
            <div>
              <div style={{ fontSize: 8, color: "#aaa", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 8 }}>por Karakura Digital</div>
              <div style={{ fontSize: 9, color: "#555", lineHeight: 1.65 }}>Cuando cada elemento tiene un propósito, el silencio se convierte en el mejor diseñador.</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 pt-1.5" style={{ borderTop: "1px solid #d5d0c8" }}>
          <span className="px-1.5" style={{ fontSize: 8, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#1a1a1a", background: "#f0d060" }}>Estrategia</span>
          <span style={{ fontSize: 8, color: "#bbb", fontVariantNumeric: "tabular-nums" }}>08 — 09</span>
        </div>
      </div>
    </div>
  );
}

function DatavizDemo() {
  const barHeights = [40, 55, 38, 70, 62, 85, 100];
  const channels: [string, string, string][] = [["Orgánico", "72%", "#06b6d4"], ["Directo", "18%", "#8b5cf6"], ["Referral", "10%", "#f97316"]];
  return (
    <div className="h-full flex items-center justify-center p-4" style={{ background: "#0d0d14" }}>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(3,1fr)", width: 270 }}>
        {[["€12.4k", "Ingresos", "+18.3%", true], ["2,841", "Usuarios", "+6.1%", true], ["1.2%", "Churn", "+0.3%", false]].map(([v, l, d, pos]) => (
          <div key={l as string} className="rounded-[10px] p-2.5" style={{ background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.07)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>{l}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{v}</div>
            <div style={{ fontSize: 9, fontWeight: 600, marginTop: 2, color: pos ? "#4ade80" : "#f87171" }}>{d}</div>
          </div>
        ))}
        <div className="rounded-[10px] p-2.5" style={{ gridColumn: "1/4", background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Tráfico — últimas 7 semanas</div>
          <div className="flex items-end gap-[3px]" style={{ height: 42 }}>
            {barHeights.map((h, i) => (
              <div key={i} className="flex-1 rounded-[2px_2px_0_0]" style={{ height: `${h}%`, background: i === 6 ? "#06b6d4" : "rgba(6,182,212,.3)" }} />
            ))}
          </div>
        </div>
        <div className="rounded-[10px] p-2.5" style={{ gridColumn: "1/3", background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>Conversión por canal</div>
          <div className="flex flex-col gap-1.5 mt-1">
            {channels.map(([l, v, c]) => (
              <div key={l} className="flex items-center gap-2">
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", width: 50 }}>{l}</span>
                <div className="flex-1 rounded-full" style={{ height: 4, background: "rgba(255,255,255,.07)" }}>
                  <div style={{ width: v, height: "100%", borderRadius: 2, background: c }} />
                </div>
                <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,.6)", width: 28, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[10px] p-2.5" style={{ background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>NPS</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>87</div>
          <div style={{ fontSize: 9, fontWeight: 600, marginTop: 2, color: "#4ade80" }}>Excelente</div>
        </div>
      </div>
    </div>
  );
}

function VaporwaveDemo() {
  return (
    <div className="h-full flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#1a0533 0%,#2d0a5e 50%,#0d1a5c 100%)" }}>
      {/* Sun */}
      <div className="absolute pointer-events-none overflow-hidden" style={{ width: 120, height: 60, borderRadius: "60px 60px 0 0", background: "linear-gradient(180deg,#ff6ec7,#ff9a00)", bottom: "44%", left: "50%", transform: "translateX(-50%)" }}>
        {[40, 52, 64, 76, 88].map(y => (
          <div key={y} className="absolute left-0 right-0" style={{ top: `${y}%`, height: "6%", background: "rgba(26,5,51,.7)" }} />
        ))}
      </div>
      {/* Grid lines */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: "55%" }}>
        <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line key={i} x1="150" y1="0" x2={i * 60} y2="150" stroke="rgba(255,113,206,.35)" strokeWidth=".8" />
          ))}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y * 1.5} x2="300" y2={y * 1.5} stroke="rgba(255,113,206,.25)" strokeWidth=".6" />
          ))}
        </svg>
      </div>
      {/* Card */}
      <div className="relative z-10 text-center" style={{ width: 240 }}>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4, lineHeight: 1 }}>
          <span className="block" style={{ background: "linear-gradient(90deg,#ff71ce,#b967ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>KARAKURA</span>
          <span className="block" style={{ background: "linear-gradient(90deg,#01cdfe,#05ffa1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>DIGITAL</span>
        </div>
        <div style={{ fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(255,200,255,.55)", marginBottom: 14 }}>A E S T H E T I C S · 2 0 2 5</div>
        <div className="mx-auto mb-3.5" style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(255,100,255,.6),transparent)" }} />
        <div className="flex justify-center gap-2">
          {[["✦ WEB", "#ff71ce", "rgba(255,113,206,.4)"], ["✦ DESIGN", "#01cdfe", "rgba(1,205,254,.4)"], ["✦ AI", "#05ffa1", "rgba(5,255,161,.4)"]].map(([t, c, bc]) => (
            <span key={t} className="px-2.5 py-1 rounded-sm font-bold" style={{ fontSize: 9, letterSpacing: ".15em", textTransform: "uppercase", color: c, border: `1px solid ${bc}` }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SwissDemo() {
  return (
    <div className="h-full flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "#fff" }}>
      {/* Red bar */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 4, background: "#e63329" }} />
      <div style={{ width: 260, paddingTop: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".28em", textTransform: "uppercase", color: "#e63329", marginBottom: 10 }}>Karakura Digital — Córdoba, España</div>
        <div style={{ height: 1, background: "#1a1a1a", marginBottom: 10 }} />
        <div style={{ fontSize: 30, fontWeight: 900, color: "#1a1a1a", lineHeight: 1, letterSpacing: "-.03em", textTransform: "uppercase", marginBottom: 10 }}>DISEÑO<br />SIN<br />RUIDO.</div>
        <div className="grid mb-2.5" style={{ gridTemplateColumns: "1fr 2px 1fr", gap: 0 }}>
          <div className="pr-2.5">
            <div style={{ fontSize: 28, fontWeight: 900, color: "#e63329", lineHeight: 1, letterSpacing: "-.02em", marginBottom: 2, fontVariantNumeric: "tabular-nums" }}>28</div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em", color: "#999" }}>Proyectos</div>
            <div className="mt-2">
              <div style={{ fontSize: 20, fontWeight: 900, color: "#e63329", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>100%</div>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em", color: "#999" }}>Satisfacción</div>
            </div>
          </div>
          <div style={{ background: "#1a1a1a", height: "100%" }} />
          <div className="px-2.5">
            <p style={{ fontSize: 10, color: "#333", lineHeight: 1.65 }}>Desarrollo web, CRM y automatización con IA. Sin promesas vagas, sin agencias creativas. Solo trabajo medible.</p>
            <div className="flex gap-1 mt-2">
              {[["#e63329", ""], ["#1a1a1a", ""], ["#e5e5e5", "1px solid #ccc"]].map(([bg, border], i) => (
                <div key={i} className="rounded-full" style={{ width: 10, height: 10, background: bg, border }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: "#1a1a1a", marginBottom: 8 }} />
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".12em", color: "#1a1a1a" }}>Karakura</span>
          <div className="flex items-center gap-1">
            <div className="rounded-full" style={{ width: 10, height: 10, background: "#e63329" }} />
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#e63329" }}>ES</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClaymorphismDarkDemo() {
  const tasks = [
    { name: "Revisar propuesta cliente", tag: "Completado", tagColor: "rgba(167,139,250,.6)", bg: "linear-gradient(135deg,rgba(124,58,237,.25),rgba(79,70,229,.2))", checkBg: "linear-gradient(135deg,#7c3aed,#4f46e5)", checkContent: "✓", done: true, dotColor: "#7c3aed" },
    { name: "Diseñar landing page", tag: "En progreso", tagColor: "rgba(251,146,60,.7)", bg: "linear-gradient(135deg,rgba(236,72,153,.2),rgba(251,146,60,.15))", checkBg: "rgba(255,255,255,.08)", checkBorder: "1.5px solid rgba(236,72,153,.4)", done: false, dotColor: "#ec4899" },
    { name: "Deploy a producción", tag: "Pendiente", tagColor: "rgba(6,182,212,.6)", bg: "linear-gradient(135deg,rgba(6,182,212,.18),rgba(59,130,246,.12))", checkBg: "rgba(255,255,255,.06)", checkBorder: "1.5px solid rgba(6,182,212,.3)", done: false, dotColor: "#06b6d4" },
  ];
  return (
    <div className="h-full flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "#120820" }}>
      {/* Blobs — static, filter allowed */}
      <div className="absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, top: -60, left: -40, background: "#7c3aed", opacity: .4, filter: "blur(50px)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 160, height: 160, bottom: -40, right: -30, background: "#4f46e5", opacity: .35, filter: "blur(50px)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 120, height: 120, top: "40%", right: -20, background: "#ec4899", opacity: .2, filter: "blur(50px)" }} />
      {/* Widget */}
      <div className="relative z-10" style={{ width: 236 }}>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-bold text-white">Mis tareas</span>
          <button className="w-[26px] h-[26px] rounded-[10px] flex items-center justify-center text-sm text-white font-bold" style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow: "0 4px 12px rgba(124,58,237,.5),inset 0 1px 0 rgba(255,255,255,.2)" }}>+</button>
        </div>
        <div className="flex flex-col gap-1.5">
          {tasks.map(t => (
            <div key={t.name} className="rounded-2xl px-3 py-2.5 flex items-center gap-2.5" style={{ background: t.bg, boxShadow: "0 6px 20px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.12)" }}>
              <div className="rounded-[8px] shrink-0 flex items-center justify-center" style={{ width: 20, height: 20, background: t.checkBg, border: (t as { checkBorder?: string }).checkBorder, boxShadow: "0 3px 8px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.2)" }}>
                {t.done && (
                  <div style={{ width: 5, height: 9, borderRight: "2px solid rgba(255,255,255,0.9)", borderBottom: "2px solid rgba(255,255,255,0.9)", transform: "rotate(40deg) translateY(-1px)" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate" style={t.done ? { textDecoration: "line-through", opacity: .5 } : {}}>{t.name}</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".08em", marginTop: 1, color: t.tagColor }}>{t.tag}</div>
              </div>
              <div className="rounded-full shrink-0" style={{ width: 6, height: 6, background: t.dotColor }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaterialDesign3Demo() {
  return (
    <div className="h-full flex items-center justify-center p-5" style={{ background: "#FFFBFE" }}>
      <div style={{ width: 252 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p style={{ fontSize: 9, letterSpacing: ".16em", color: "#6750A4", textTransform: "uppercase", fontWeight: 600 }}>Karakura Digital</p>
            <p style={{ fontSize: 22, fontWeight: 400, color: "#1C1B1F", lineHeight: 1.2 }}>Proyectos</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#EADDFF" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6750A4" }}>KD</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {[["Web Corporativa", "En progreso", 80], ["CRM Personalizado", "Revisión", 58]].map(([title, status, pct]) => (
            <div key={title as string} className="rounded-3xl p-4" style={{ background: "#F3EDF7" }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#1C1B1F" }}>{title as string}</p>
                  <p style={{ fontSize: 11, color: "#49454F", marginTop: 1 }}>{status as string}</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6750A4", fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
              </div>
              <div className="rounded-full" style={{ height: 4, background: "#D0BCFF" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "#6750A4", borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-4">
          <button className="flex-1 py-2.5 rounded-full text-xs font-semibold" style={{ background: "#6750A4", color: "#fff" }}>Nuevo proyecto</button>
          <button className="flex-1 py-2.5 rounded-full text-xs font-semibold" style={{ background: "#ECE6F0", color: "#6750A4" }}>Ver todos</button>
        </div>
        <div className="rounded-[28px] px-2 py-2 flex" style={{ background: "#ECE6F0" }}>
          {[["Inicio", true], ["Tareas", false], ["Equipo", false]].map(([label, active]) => (
            <div key={label as string} className="flex-1 flex justify-center">
              <div className="rounded-full px-3 py-1" style={{ background: (active as boolean) ? "#6750A4" : "transparent" }}>
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: (active as boolean) ? "#fff" : "#49454F" }}>{label as string}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NeonCyberpunkDemo() {
  return (
    <div className="h-full flex items-center justify-center p-5 relative overflow-hidden" style={{ background: "#050812" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, top: -60, left: -40, background: "radial-gradient(circle,rgba(0,255,255,.08),transparent 70%)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, bottom: -60, right: -40, background: "radial-gradient(circle,rgba(255,0,110,.08),transparent 70%)" }} />
      <div className="relative z-10" style={{ width: 256 }}>
        <div className="flex items-center gap-2 mb-3">
          <div style={{ width: 6, height: 6, background: "#00FFFF", boxShadow: "0 0 8px #00FFFF" }} />
          <span style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "rgba(0,255,255,.6)", fontFamily: "monospace" }}>SYS://KARAKURA.ES</span>
          <div className="flex-1 h-px" style={{ background: "rgba(0,255,255,.15)" }} />
        </div>
        <div className="mb-3 rounded p-4 relative" style={{ border: "1px solid rgba(0,255,255,.2)", background: "rgba(0,255,255,.03)" }}>
          <div className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: "1.5px solid #00FFFF", borderLeft: "1.5px solid #00FFFF" }} />
          <div className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: "1.5px solid #00FFFF", borderRight: "1.5px solid #00FFFF" }} />
          <div className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: "1.5px solid #00FFFF", borderLeft: "1.5px solid #00FFFF" }} />
          <div className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: "1.5px solid #00FFFF", borderRight: "1.5px solid #00FFFF" }} />
          <p style={{ fontSize: 9, color: "rgba(0,255,255,.4)", letterSpacing: ".2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 4 }}>RENDIMIENTO SISTEMA</p>
          <p style={{ fontSize: 36, fontWeight: 900, color: "#00FFFF", textShadow: "0 0 20px #00FFFF, 0 0 60px rgba(0,255,255,.4)", letterSpacing: "-.02em", fontVariantNumeric: "tabular-nums" }}>98.7%</p>
          <p style={{ fontSize: 9, color: "rgba(0,255,255,.5)", fontFamily: "monospace" }}>ONLINE · LATENCIA 2ms</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[["Proyectos", "28", "#00FFFF"], ["Uptime", "99.9%", "#FF006E"]].map(([label, value, color]) => (
            <div key={label as string} className="rounded p-3" style={{ border: `1px solid ${color as string}30`, background: `${color as string}08` }}>
              <p style={{ fontSize: 8, letterSpacing: ".18em", textTransform: "uppercase", color: `${color as string}60`, fontFamily: "monospace" }}>{label as string}</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: color as string, textShadow: `0 0 12px ${color}`, fontVariantNumeric: "tabular-nums" }}>{value as string}</p>
            </div>
          ))}
        </div>
        <button className="w-full rounded py-2.5 text-xs font-black uppercase tracking-widest" style={{ background: "rgba(0,255,255,.08)", color: "#00FFFF", border: "1px solid rgba(0,255,255,.35)", textShadow: "0 0 8px #00FFFF", boxShadow: "inset 0 0 20px rgba(0,255,255,.05)" }}>
          ▶ INICIAR MISIÓN
        </button>
      </div>
    </div>
  );
}

function RetroVintageDemo() {
  return (
    <div className="h-full flex items-center justify-center p-6 relative overflow-hidden" style={{ background: "#f0e6cc" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E\")", backgroundSize: "150px" }} />
      <div className="relative z-10 text-center" style={{ width: 260 }}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex-1 h-px" style={{ background: "#8b5e3c" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#8b5e3c" }} />
          <div className="flex-1 h-px" style={{ background: "#8b5e3c" }} />
        </div>
        <div className="rounded-sm p-5 mb-4 relative" style={{ border: "2px solid #8b5e3c", background: "#faf0d8" }}>
          <div className="absolute" style={{ inset: 4, border: "1px solid rgba(139,94,60,.3)", borderRadius: 2, pointerEvents: "none" }} />
          <p style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "#8b5e3c", marginBottom: 6, fontFamily: "Georgia, serif" }}>ESTABLECIDA</p>
          <p style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "#c8860a", marginBottom: 2, fontFamily: "Georgia, serif" }}>✦ ANNO MMXXIV ✦</p>
          <div className="my-3 flex items-center justify-center gap-2">
            <div style={{ flex: 1, height: 1, background: "#8b5e3c" }} />
            <span style={{ fontSize: 26, fontWeight: 900, color: "#3a1a0a", letterSpacing: "-.02em", fontFamily: "Georgia, serif" }}>Karakura</span>
            <div style={{ flex: 1, height: 1, background: "#8b5e3c" }} />
          </div>
          <p style={{ fontSize: 14, color: "#6b3a2a", letterSpacing: ".14em", fontFamily: "Georgia, serif", fontStyle: "italic" }}>Digital Studio</p>
          <div className="mt-3 flex items-center gap-1 justify-center">
            <div style={{ flex: 1, height: 1, background: "rgba(139,94,60,.3)" }} />
            <span style={{ fontSize: 8, color: "#8b5e3c", letterSpacing: ".28em", textTransform: "uppercase", fontFamily: "Georgia, serif" }}>Córdoba · España</span>
            <div style={{ flex: 1, height: 1, background: "rgba(139,94,60,.3)" }} />
          </div>
        </div>
        <div className="flex justify-center gap-8">
          {[["28+", "Proyectos"], ["100%", "Calidad"], ["4.9★", "Rating"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <p style={{ fontSize: 16, fontWeight: 700, color: "#3a1a0a", fontFamily: "Georgia, serif", fontVariantNumeric: "tabular-nums" }}>{v}</p>
              <p style={{ fontSize: 8, letterSpacing: ".18em", textTransform: "uppercase", color: "#8b5e3c", marginTop: 1 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PastelSoftDemo() {
  return (
    <div className="h-full flex items-center justify-center p-5" style={{ background: "linear-gradient(145deg, #fdf4ff 0%, #f0f9ff 100%)" }}>
      <div style={{ width: 256 }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#e9d5ff", color: "#7c3aed" }}>Karakura Digital</div>
          <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#d1fae5", color: "#059669" }}>✓ Activo</div>
        </div>
        <div className="rounded-3xl p-5 mb-3" style={{ background: "#fff", boxShadow: "0 4px 24px rgba(139,92,246,.08)" }}>
          <p style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 6, fontWeight: 600 }}>Tu espacio digital</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#1e1b4b", lineHeight: 1.2, letterSpacing: "-.02em", marginBottom: 8 }}>Webs que enamoran desde el primer segundo</p>
          <button className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: "#ede9fe", color: "#7c3aed" }}>Explorar proyectos →</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {[["Diseño Web", "#fce7f3", "#be185d"], ["IA & CRM", "#d1fae5", "#059669"], ["3D & Motion", "#e0f2fe", "#0369a1"], ["Branding", "#fef3c7", "#b45309"]].map(([label, bg, color]) => (
            <div key={label as string} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: bg as string, color: color as string }}>{label as string}</div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["28+", "Proyectos", "#ede9fe"], ["4.9", "Rating", "#d1fae5"], ["100%", "Sat.", "#fce7f3"]].map(([v, l, bg]) => (
            <div key={l as string} className="rounded-2xl p-3 text-center" style={{ background: bg as string }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: "#1e1b4b", fontVariantNumeric: "tabular-nums" }}>{v as string}</p>
              <p style={{ fontSize: 9, color: "#6b7280", marginTop: 2 }}>{l as string}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DoodleDemo() {
  return (
    <div className="h-full flex items-center justify-center p-5 relative overflow-hidden" style={{ background: "#fafaf5" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e0e0d4 27px, #e0e0d4 28px)", backgroundPosition: "0 16px" }} />
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: 40, width: 1, background: "#ffb3b3", opacity: .6 }} />
      <div className="relative z-10" style={{ width: 256 }}>
        <div className="mb-4" style={{ transform: "rotate(-1deg)" }}>
          <p style={{ fontSize: 20, fontWeight: 900, color: "#1a1a1a", fontFamily: "'Courier New', monospace", letterSpacing: "-.01em" }}>Karakura Digital</p>
          <svg width="160" height="8" viewBox="0 0 160 8" fill="none" className="mt-0.5">
            <path d="M2 5 Q20 1 40 5 Q60 9 80 5 Q100 1 120 5 Q140 9 158 5" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div className="flex gap-3 mb-4">
          {[["Diseño UI", "#fef08a", 1.5], ["Dev Web", "#bbf7d0", -1]].map(([label, bg, rot]) => (
            <div key={label as string} className="flex-1 rounded-sm p-3 relative" style={{ background: bg as string, transform: `rotate(${rot}deg)`, boxShadow: "2px 3px 8px rgba(0,0,0,.12)" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1" style={{ width: 20, height: 4, background: "rgba(0,0,0,.15)", borderRadius: 1 }} />
              <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Courier New', monospace" }}>{label as string}</p>
              <p style={{ fontSize: 9, color: "#555", marginTop: 4, fontFamily: "'Courier New', monospace" }}>✓ En proceso</p>
            </div>
          ))}
        </div>
        <div className="rounded-sm p-3 mb-4" style={{ border: "2px solid #1a1a1a", background: "rgba(255,255,255,.7)", transform: "rotate(0.5deg)" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", fontFamily: "'Courier New', monospace", marginBottom: 6, letterSpacing: ".06em", textTransform: "uppercase" }}>TODO</p>
          {[["Diseñar landing", true], ["Conectar CRM", true], ["Deploy prod", false]].map(([task, done]) => (
            <div key={task as string} className="flex items-center gap-2 mb-1.5">
              <div className="w-4 h-4 rounded-sm shrink-0 flex items-center justify-center" style={{ border: "2px solid #1a1a1a", background: (done as boolean) ? "#2563EB" : "transparent" }}>
                {(done as boolean) && <span style={{ fontSize: 8, color: "#fff", fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ fontSize: 11, color: "#1a1a1a", fontFamily: "'Courier New', monospace", textDecoration: (done as boolean) ? "line-through" : "none", opacity: (done as boolean) ? .5 : 1 }}>{task as string}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-sm px-4 py-2 font-bold text-xs text-white" style={{ background: "#2563EB", border: "2px solid #1e40af", boxShadow: "3px 3px 0 #1e40af", fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: ".06em" }}>¡Hablemos!</button>
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
            <path d="M2 10 C10 5, 20 15, 34 10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M30 6 L36 10 L30 14" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

interface StyleDef {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ideal: string;
  accent: string;
  Demo: React.FC;
}

const STYLES: StyleDef[] = [
  {
    id: "skeumorphism",
    name: "Skeumorphism",
    tagline: "Lo digital imita lo físico",
    description:
      "Reproduce materiales y texturas del mundo real mediante gradientes, sombras y detalles táctiles. Los elementos parecen tener peso, relieve y profundidad física.",
    ideal:
      "Marcas premium, apps de productividad y herramientas creativas que buscan una interfaz intuitiva y familiar para el usuario.",
    accent: "#c47c28",
    Demo: SkeumorphismDemo,
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    tagline: "Suave, emergente, minimalista",
    description:
      "Evolución del skeumorphismo: elementos que emergen o se hunden en la misma superficie mediante sombras dobles simétricas. Paleta completamente monocromática.",
    ideal:
      "Apps de bienestar, finanzas personales y dashboards donde prima la elegancia sobre la densidad de información.",
    accent: "#6366f1",
    Demo: NeumorphismDemo,
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    tagline: "Transparencia y profundidad en capas",
    description:
      "Paneles de cristal esmerilado sobre fondos vibrantes: transparencia, backdrop blur y bordes sutiles crean una jerarquía visual de capas flotantes.",
    ideal:
      "Productos tech, dashboards y apps de datos que quieren comunicar innovación, apertura y modernidad.",
    accent: "#8b5cf6",
    Demo: GlassmorphismDemo,
  },
  {
    id: "claymorphism",
    name: "Claymorphism",
    tagline: "Plastilina digital, amigable y táctil",
    description:
      "Elementos inflados con apariencia 3D esponjosa, colores saturados y sombras gruesas de color. Transmite calidez, accesibilidad y una sensación lúdica.",
    ideal:
      "Startups, apps de consumo y marcas que quieren ser percibidas como cercanas, divertidas y sin fricciones.",
    accent: "#ff6b6b",
    Demo: ClaymorphismDemo,
  },
  {
    id: "minimalism",
    name: "Minimalismo",
    tagline: "El espacio vacío también comunica",
    description:
      "Espacio generoso, tipografía refinada y paleta reducida al mínimo. Cada elemento tiene un único propósito: la ausencia comunica tanto como la presencia.",
    ideal:
      "Marcas de lujo, estudios de diseño, consultoras de alto nivel y portfolios donde la sofisticación es la propuesta de valor.",
    accent: "#1c1c1c",
    Demo: MinimalismDemo,
  },
  {
    id: "maximalism",
    name: "Maximalismo",
    tagline: "Todo a la vez, todo a tope",
    description:
      "Capas, colores, texturas y tipografías compitiendo por atención. La densidad visual extrema es la propuesta estética: más siempre es más.",
    ideal:
      "Festivales, marcas streetwear, e-commerce de moda y campañas que necesitan impacto inmediato y máxima recordación.",
    accent: "#ff6b35",
    Demo: MaximalismDemo,
  },
  {
    id: "brutalism",
    name: "Brutalismo",
    tagline: "Crudo, honesto, sin decoración",
    description:
      "Estructura visible, tipografía monoespaciada, bordes duros y contraste extremo. La funcionalidad es la estética: ningún elemento existe sin razón.",
    ideal:
      "Estudios independientes, publicaciones culturales y marcas tech que rechazan activamente lo genérico y lo corporativo.",
    accent: "#000000",
    Demo: BrutalismDemo,
  },
  {
    id: "liquid-glass",
    name: "Liquid Glass",
    tagline: "El nuevo lenguaje visual de Apple",
    description:
      "Lanzado en iOS 26 / macOS Tahoe: transparencia extrema, refracción de contenido y desenfoque adaptativo. El cristal no solo deja pasar la luz, la moldea.",
    ideal:
      "Apps Apple-first, herramientas creativas premium y cualquier marca que quiera señalar vanguardia tecnológica absoluta.",
    accent: "#a78bfa",
    Demo: LiquidGlassDemo,
  },
  {
    id: "spatial-ui",
    name: "Spatial UI",
    tagline: "Interfaz en el espacio tridimensional",
    description:
      "Diseñado para Apple Vision Pro y AR/VR: capas con profundidad de campo real, materiales que reaccionan al entorno y jerarquía espacial 3D.",
    ideal:
      "Apps para visionOS, experiencias AR/VR y plataformas de visualización de datos que operan más allá de la pantalla plana.",
    accent: "#6366f1",
    Demo: SpatialUIDemo,
  },
  {
    id: "constructivism",
    name: "Constructivismo",
    tagline: "Bauhaus y el avant-garde soviético",
    description:
      "Inspirado en el arte constructivista de los años 20: geometría pura, tipografía bold, paleta roja/negra/blanca y diagonales con energía cinética.",
    ideal:
      "Marcas culturales, festivales, editoriales y proyectos que quieren transmitir fuerza ideológica e impacto histórico.",
    accent: "#dc2626",
    Demo: ConstructivismDemo,
  },
  {
    id: "neobrutalism",
    name: "Neobrutalism",
    tagline: "Bordes negros, sombras duras, sin piedad",
    description:
      "Brutalismo moderno con colores planos vibrantes: bordes negros gruesos, sombras de offset sólido y tipografía pesada. Cero gradientes, cero sutileza.",
    ideal:
      "SaaS tools, startups B2B y marcas que quieren destacar mediante irreverencia visual calculada y personalidad fuerte.",
    accent: "#f59e0b",
    Demo: NeobrutalistDemo,
  },
  {
    id: "bento-grid",
    name: "Bento Grid",
    tagline: "Módulos, jerarquía, información densa",
    description:
      "Grid de tarjetas heterogéneas de distintos tamaños (inspirado en la caja bento japonesa) que organiza información con máxima eficiencia y jerarquía visual.",
    ideal:
      "Páginas de marketing, dashboards y secciones de features donde hay que mostrar mucha información de forma elegante y scannable.",
    accent: "#6366f1",
    Demo: BentoGridDemo,
  },
  {
    id: "aurora-mesh",
    name: "Aurora Mesh",
    tagline: "Gradientes orgánicos como luz del norte",
    description:
      "Mallas de color fluidas generadas por múltiples radial-gradients superpuestos. Stripe, Linear y Vercel popularizaron este lenguaje: profundidad sin bordes, ambiente sin estructura.",
    ideal:
      "SaaS, startups tech, herramientas de productividad y cualquier producto que quiera transmitir modernidad y energía sin caer en clichés corporativos.",
    accent: "#7c3aed",
    Demo: AuroraMeshDemo,
  },
  {
    id: "terminal",
    name: "Terminal / Hacker",
    tagline: "La pantalla que los devs llaman hogar",
    description:
      "Fondo negro absoluto, tipografía monoespaciada, salidas de CLI y cursores parpadeantes. La estética de la productividad técnica elevada a lenguaje visual de marca.",
    ideal:
      "Herramientas developer, plataformas de ciberseguridad, APIs, CLIs y marcas B2B tech que hablan directamente a ingenieros.",
    accent: "#22c55e",
    Demo: TerminalDemo,
  },
  {
    id: "dark-luxury",
    name: "Dark Luxury",
    tagline: "Opulencia sin ruido",
    description:
      "Fondo casi negro, tipografía serif de peso ligero, detalles en oro y abundante espacio. El silencio visual como señal de precio. Nada compite con nada.",
    ideal:
      "Moda de lujo, inmobiliaria premium, joyería, relojes, servicios de consultoría de alto valor y cualquier marca donde el cliente espera exclusividad.",
    accent: "#c9a96e",
    Demo: DarkLuxuryDemo,
  },
  {
    id: "y2k",
    name: "Y2K / Retro-web",
    tagline: "El futuro que imaginamos en el año 2000",
    description:
      "Plásticos translúcidos, gradientes cromados, botones con brillo especular y tipografía en 3D. La estética de Windows XP, iPod mini y Winamp revive como movimiento cultural.",
    ideal:
      "Moda, música, streetwear, marcas de consumo dirigidas a Gen Z y millennials nostálgicos que reconocen la referencia y la valoran.",
    accent: "#a078e0",
    Demo: Y2KDemo,
  },
  {
    id: "frutiger-aero",
    name: "Frutiger Aero",
    tagline: "Naturaleza + tecnología, era Vista/7",
    description:
      "La estética 2004-2013: cielo azul, césped verde, cristal traslúcido con brillo interno, iconos 3D fotorrealistas y una sensación de optimismo tecnológico que nunca llegó.",
    ideal:
      "Marcas eco-tech, wellness, apps de salud, productos B2C con valores de sostenibilidad y cualquier proyecto que quiera evocar calidez humana en lo digital.",
    accent: "#4ab8e8",
    Demo: FrutigerAeroDemo,
  },
  {
    id: "glass2",
    name: "Glassmorphism 2.0",
    tagline: "Cristal ultra oscuro, blur dramático",
    description:
      "Evolución del glassmorphism clásico: fondos casi negros, blur más profundo (20-30px), bordes casi invisibles y sin gradientes de fondo saturados. Apple, Figma y Linear lideran esta versión más madura y sofisticada.",
    ideal:
      "Aplicaciones SaaS de alto nivel, herramientas de productividad, dashboards premium y cualquier producto que quiera proyectar seriedad técnica con elegancia visual.",
    accent: "#8b5cf6",
    Demo: Glassmorphism2Demo,
  },
  {
    id: "aceternity",
    name: "Aceternity / Magic UI",
    tagline: "Partículas, grids y shimmers brillantes",
    description:
      "Fondos negros con grids de líneas finas, beams de luz de colores, texto con efecto shimmer metálico y microanimaciones de partículas. Tendencia dominante en SaaS tech 2024-2025 popularizada por Aceternity UI y Magic UI.",
    ideal:
      "Startups de IA, herramientas para desarrolladores, plataformas de infraestructura cloud y cualquier producto tech que quiera comunicar innovación de vanguardia.",
    accent: "#8b5cf6",
    Demo: AceternityDemo,
  },
  {
    id: "memphis",
    name: "Corporate Memphis",
    tagline: "Ilustraciones planas con personas orgánicas",
    description:
      "Figuras humanas con formas orgánicas redondeadas, colores saturados sin sombras, composiciones simples y tipografía bold. Airbnb, Slack y Notion lo popularizaron. Muy demandado por startups y apps B2C.",
    ideal:
      "Apps de consumo, plataformas educativas, marketplaces, startups de HR y cualquier producto que quiera proyectar calidez, diversidad e inclusión.",
    accent: "#f97316",
    Demo: CorporateMemphisDemo,
  },
  {
    id: "editorial",
    name: "Editorial / Magazine",
    tagline: "Tipografía masiva, columnas, blanco y negro",
    description:
      "Herencia del diseño editorial impreso: tipografías display en negrita extrema, grids de columnas asimétricas, blanco y negro como base con un acento de color opcional. Comunicación de autoridad y sofisticación cultural.",
    ideal:
      "Agencias creativas, estudios de diseño, publicaciones digitales, portfolios de fotografía y marcas de lujo que hablan a audiencias con cultura visual elevada.",
    accent: "#1a1a1a",
    Demo: EditorialDemo,
  },
  {
    id: "dataviz",
    name: "Dataviz / Dashboard",
    tagline: "Métricas, gráficas, tema oscuro B2B",
    description:
      "Diseño orientado a datos: tema oscuro profundo, tarjetas de métricas con deltas, gráficas sparkline, tipografía tabular y densidad de información alta. Vercel Analytics, Grafana y Linear definen el estándar.",
    ideal:
      "SaaS B2B, herramientas de análisis, plataformas de monitorización, dashboards internos y cualquier producto donde los datos son el producto.",
    accent: "#06b6d4",
    Demo: DatavizDemo,
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    tagline: "Síntesis 80s, neón y nostalgia digital",
    description:
      "Degradados entre púrpura oscuro y azul marino, sol retrowave con líneas horizontales, tipografía bold cromada en magenta y cyan, cuadrícula de perspectiva 3D. Estética synthwave/retrowave con ironía posmoderna.",
    ideal:
      "Marcas de entretenimiento, música electrónica, eventos nocturnos, juegos indie y cualquier proyecto creativo que quiera un tono irónico y culturalmente específico.",
    accent: "#ff71ce",
    Demo: VaporwaveDemo,
  },
  {
    id: "swiss",
    name: "Swiss / International",
    tagline: "Helvetica, grid estricto, rojo suizo",
    description:
      "Tipografía sans-serif pesada en negro, grid rígido con columnas bien definidas, barra roja como único acento de color y espaciado milimétrico. Diseño gráfico suizo de los 50s-70s aplicado a pantallas. Máxima legibilidad y autoridad.",
    ideal:
      "Marcas corporativas europeas, museos y instituciones culturales, consultorias de alto nivel, editoriales y productos que quieren comunicar rigor y atemporalidad.",
    accent: "#e63329",
    Demo: SwissDemo,
  },
  {
    id: "clay2",
    name: "Claymorphism Oscuro",
    tagline: "Arcilla 3D sobre fondos nocturnos",
    description:
      "Versión nocturna del claymorphism: fondos púrpura oscuro o negro, sombras profundas que exageran el volumen 3D, colores pasteles saturados en las piezas clay y brillo interno con inset shadows. Notion AI y Linear lo han adoptado.",
    ideal:
      "Apps de productividad con dark mode, herramientas creativas, plataformas de IA y cualquier producto tech que quiera diferenciarse del glassmorphism estándar con más personalidad.",
    accent: "#7c3aed",
    Demo: ClaymorphismDarkDemo,
  },
  {
    id: "material-design-3",
    name: "Material Design 3",
    tagline: "Google's dynamic color system",
    description:
      "El sistema de diseño de Google en su versión más madura: colores tonales dinámicos que se adaptan al contenido, formas redondeadas en tres variantes (filled, outlined, tonal) y jerarquía tipográfica estricta. Domina el ecosistema Android, Flutter y apps web de consumo.",
    ideal:
      "Apps móviles y web de consumo, plataformas educativas, herramientas de productividad y cualquier producto que necesite inclusividad, accesibilidad y un lenguaje visual familiar para miles de millones de usuarios.",
    accent: "#6750A4",
    Demo: MaterialDesign3Demo,
  },
  {
    id: "neon-cyberpunk",
    name: "Neon / Cyberpunk",
    tagline: "Neón sobre oscuridad total",
    description:
      "Fondos casi negros, colores neón saturados en cyan, magenta y verde chartreuse, glows con text-shadow y box-shadow multicapa, HUD corners decorativos y tipografía monoespaciada. Más radical que el vaporwave: sin gradientes de cielo, solo circuitos y neón.",
    ideal:
      "Gaming, plataformas crypto y DeFi, ciberseguridad, eventos nocturnos, marcas de esports y herramientas para developers que quieran proyectar poder tecnológico extremo.",
    accent: "#00FFFF",
    Demo: NeonCyberpunkDemo,
  },
  {
    id: "retro-vintage",
    name: "Retro / Vintage",
    tagline: "Artesanía atemporal, papel envejecido",
    description:
      "Paleta sepia y mostaza sobre papel envejecido, tipografía serif con peso editorial, ornamentos de división, bordes dobles y composición centrada de escudo. La antítesis del look digital genérico: comunica historia y autenticidad.",
    ideal:
      "Restaurantes y bodegas premium, marcas de café y cerveza artesanal, estudios de tatuaje, marcas de ropa heritage, portfolios de fotografía analógica y cualquier proyecto que venda autenticidad.",
    accent: "#8b5e3c",
    Demo: RetroVintageDemo,
  },
  {
    id: "pastel-soft",
    name: "Pastel Soft",
    tagline: "Píldoras de color, redondez extrema",
    description:
      "Fondos en gradiente pastel suave, tarjetas blancas con sombra difusa de color, píldoras de colores distintos para categorías y métricas, y un lenguaje visual amable que no intimida. Lemon Squeezy, Framer y Superhuman lideran este estilo.",
    ideal:
      "SaaS B2C, marketplaces, herramientas creativas, plataformas de e-learning, apps de salud y bienestar y cualquier producto que quiera eliminar la fricción visual y hacer que el onboarding se sienta cercano.",
    accent: "#c084fc",
    Demo: PastelSoftDemo,
  },
  {
    id: "doodle",
    name: "Doodle / Mano alzada",
    tagline: "Cuaderno, rotulador, post-its",
    description:
      "Fondo de papel rayado, trazos SVG dibujados a mano, post-its con rotación leve, tipografía monoespaciada tipo Courier, checkboxes cuadrados y flechas orgánicas. Excalidraw, Whimsical y Linear popularizaron esta estética de whiteboard digital.",
    ideal:
      "Herramientas de colaboración y brainstorming, startups early-stage que quieren proyectar agilidad y humanidad, agencias creativas y portfolios que rechazan el look corporativo pulido.",
    accent: "#2563eb",
    Demo: DoodleDemo,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function accentRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function visibleAccent(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 60 ? "#a0a0a0" : hex;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DesignCatalog() {
  const [activeId, setActiveId] = useState(STYLES[0].id);
  const active = STYLES.find((s) => s.id === activeId) ?? STYLES[0];
  const activeIdx = STYLES.findIndex((s) => s.id === activeId);
  const prevIdx = (activeIdx - 1 + STYLES.length) % STYLES.length;
  const nextIdx = (activeIdx + 1) % STYLES.length;
  const accent = visibleAccent(active.accent);

  return (
    <>
      <style>{`
        @keyframes catalogEnter {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .catalog-enter {
          animation: catalogEnter 200ms ease forwards;
          will-change: transform, opacity;
        }
      `}</style>
      <section className="py-20 px-4" style={{ background: "#001711" }}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-12 text-center">
            <div
              className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#ff7a00", background: "rgba(255,122,0,0.08)", border: "1px solid rgba(255,122,0,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#ff7a00" }} />
              Catálogo de estilos · 30
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ letterSpacing: "-0.025em", lineHeight: 1.1 }}
            >
              ¿Qué lenguaje visual
              <br className="hidden md:block" />
              {" "}habla tu marca?
            </h2>
            <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: "rgba(224,192,175,0.5)" }}>
              Cada estilo es una decisión estratégica sobre cómo percibe tu cliente tu marca.
              Explóralos y encuentra el que encaja.
            </p>
          </div>

          {/* ── Grid selector ── */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5 mb-6">
            {STYLES.map((s) => {
              const isActive = s.id === activeId;
              const va = visibleAccent(s.accent);
              const rgb = accentRgb(va);
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className="flex items-center gap-2 px-2.5 py-2.5 rounded-xl text-left text-xs font-medium truncate transition-all duration-150 hover:opacity-75"
                  style={
                    isActive
                      ? {
                          background: `rgba(${rgb},0.12)`,
                          color: va,
                          border: `1px solid rgba(${rgb},0.4)`,
                        }
                      : {
                          background: "rgba(255,255,255,0.03)",
                          color: "rgba(224,192,175,0.45)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: va,
                      boxShadow: isActive ? `0 0 6px rgba(${rgb},0.7)` : "none",
                    }}
                  />
                  <span className="truncate">{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* ── Detail panel ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(0,23,17,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex flex-col lg:flex-row">

              {/* Demo */}
              <div
                className="lg:w-[55%] h-[280px] md:h-[320px] lg:h-auto lg:min-h-[420px] shrink-0"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  borderRight: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div key={activeId} className="h-full catalog-enter">
                  <active.Demo />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-6 md:p-8">
                <div key={activeId} className="catalog-enter flex flex-col justify-between h-full">
                  <div>
                    {/* Title block */}
                    <div className="flex items-start gap-3 mb-5">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0 mt-2"
                        style={{
                          background: accent,
                          boxShadow: `0 0 10px rgba(${accentRgb(accent)},0.6)`,
                        }}
                      />
                      <div>
                        <p
                          className="text-[10px] uppercase tracking-widest mb-1.5"
                          style={{ color: "rgba(224,192,175,0.35)" }}
                        >
                          Estilo {activeIdx + 1} de {STYLES.length}
                        </p>
                        <h3
                          className="text-white text-2xl font-bold mb-1"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          {active.name}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: accent }}>
                          {active.tagline}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-sm mb-5"
                      style={{ color: "rgba(224,192,175,0.65)", lineHeight: "1.8" }}
                    >
                      {active.description}
                    </p>

                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,122,0,0.05)",
                        border: "1px solid rgba(255,122,0,0.15)",
                      }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-widest mb-2"
                        style={{ color: "rgba(255,122,0,0.6)" }}
                      >
                        Ideal para
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "rgba(224,192,175,0.6)", lineHeight: "1.7" }}
                      >
                        {active.ideal}
                      </p>
                    </div>
                  </div>

                  {/* Nav + CTA */}
                  <div
                    className="mt-6 pt-5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveId(STYLES[prevIdx].id)}
                        className="px-3 py-2 rounded-lg text-sm transition-opacity hover:opacity-70"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(224,192,175,0.4)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        aria-label="Estilo anterior"
                      >
                        ←
                      </button>
                      <a
                        href="/#contact"
                        className="flex-1 py-2 rounded-xl text-xs font-semibold text-center transition-opacity hover:opacity-80"
                        style={{
                          background: "rgba(255,122,0,0.12)",
                          color: "#ff7a00",
                          border: "1px solid rgba(255,122,0,0.25)",
                        }}
                      >
                        Pedir este estilo →
                      </a>
                      <button
                        onClick={() => setActiveId(STYLES[nextIdx].id)}
                        className="px-3 py-2 rounded-lg text-sm transition-opacity hover:opacity-70"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(224,192,175,0.4)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        aria-label="Siguiente estilo"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
