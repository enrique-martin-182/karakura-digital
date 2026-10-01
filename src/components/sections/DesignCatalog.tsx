"use client";

import { useState, useEffect } from "react";

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
    <div className="h-full relative overflow-hidden flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse 80% 100% at 50% 110%, #08091a 0%, #010204 100%)" }}>
      {/* Floor ambient — visionOS characteristic underlighting */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "28%", background: "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(99,102,241,.13), transparent)" }} />

      <div className="relative" style={{ width: 250, height: 210 }}>
        {/* Back panel — analytics chart, small and dim */}
        <div style={{
          position: "absolute", width: 178, top: 4, right: 6,
          background: "rgba(6,10,30,.65)",
          border: ".5px solid rgba(99,102,241,.14)",
          borderRadius: 13, padding: "9px 11px",
          opacity: 0.52, boxShadow: "0 4px 20px rgba(0,0,0,.45)",
        }}>
          <div style={{ fontSize: 7, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(99,102,241,.4)", marginBottom: 7 }}>Tráfico semanal</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 34 }}>
            {[28, 44, 35, 58, 50, 72, 65, 84, 78, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i >= 8 ? "rgba(99,102,241,.75)" : "rgba(99,102,241,.28)", borderRadius: "1px 1px 0 0" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            <span style={{ fontSize: 7, color: "rgba(255,255,255,.18)", fontVariantNumeric: "tabular-nums" }}>Lun</span>
            <span style={{ fontSize: 7, color: "rgba(255,255,255,.18)", fontVariantNumeric: "tabular-nums" }}>Dom</span>
          </div>
        </div>

        {/* Mid panel — widget stats grid */}
        <div style={{
          position: "absolute", width: 204, top: 42, left: 4,
          background: "rgba(10,14,36,.85)",
          border: ".5px solid rgba(99,102,241,.22)",
          borderRadius: 16, padding: "11px 13px",
          opacity: 0.74,
          backdropFilter: "blur(14px)",
          boxShadow: "0 10px 36px rgba(0,0,0,.55)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 5px #6366f1" }} />
            <span style={{ fontSize: 8, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(99,102,241,.45)" }}>Widgets activos</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
            {[["28", "Proyectos", "#6366f1"], ["4.9", "Rating", "#10b981"], ["€12k", "MRR", "#06b6d4"]].map(([v, l, c]) => (
              <div key={l as string} style={{ borderRadius: 8, padding: "5px 6px", background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: c as string, fontVariantNumeric: "tabular-nums" }}>{v as string}</div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,.28)" }}>{l as string}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Front panel — main control, fully opaque */}
        <div style={{
          position: "absolute", width: 244, bottom: 0, left: "50%", transform: "translateX(-50%)",
          background: "rgba(8,12,30,.98)",
          border: "1px solid rgba(99,102,241,.38)",
          borderRadius: 20, padding: "14px 17px",
          boxShadow: "0 0 0 .5px rgba(99,102,241,.1), 0 30px 60px rgba(0,0,0,.9), 0 0 55px rgba(99,102,241,.07)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(99,102,241,.52)", marginBottom: 2 }}>Panel activo</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Sistema activo</div>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(99,102,241,.18)", border: "1px solid rgba(99,102,241,.32)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 8px #6366f1" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[["Núcleo", "98%", "#6366f1"], ["Red", "71%", "#06b6d4"], ["Memoria", "44%", "#8b5cf6"]].map(([l, v, c]) => (
              <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 46, fontSize: 9, color: "rgba(255,255,255,.3)" }}>{l as string}</span>
                <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.05)" }}>
                  <div style={{ width: v as string, height: "100%", borderRadius: 2, background: c as string, boxShadow: `0 0 6px ${c as string}70` }} />
                </div>
                <span style={{ width: 26, fontSize: 9, textAlign: "right", color: "rgba(255,255,255,.38)", fontVariantNumeric: "tabular-nums" }}>{v as string}</span>
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
            {/* Sparkline bar chart */}
            <div className="flex gap-0.5 mt-2 items-end" style={{ height: 14 }}>
              {[4, 6, 5, 8, 6, 10, 7, 12, 9, 14].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${(h / 14) * 100}%`,
                    background: i === 9 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.32)",
                  }}
                />
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
          <p className="text-stone-600 text-[11px]" style={{ fontVariantNumeric: "tabular-nums" }}>28 proyectos</p>
          {/* Avatar cluster */}
          <div className="ml-auto flex items-center gap-1">
            <div className="flex -space-x-1.5">
              {["#7c3aed", "#06b6d4", "#ec4899", "#10b981"].map((c, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[6px] font-bold text-white"
                  style={{ background: c, zIndex: 4 - i, position: "relative" }}
                >
                  {["A", "B", "C", "D"][i]}
                </div>
              ))}
            </div>
            <span className="text-stone-400 text-[9px] ml-0.5">+5</span>
          </div>
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
      {/* Mesh gradient IS the hero — no card, gradient bleeds full */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 18% 28%, rgba(124,58,237,0.72), transparent), " +
            "radial-gradient(ellipse 70% 60% at 85% 12%, rgba(6,182,212,0.62), transparent), " +
            "radial-gradient(ellipse 75% 65% at 58% 88%, rgba(236,72,153,0.58), transparent), " +
            "radial-gradient(ellipse 65% 70% at 3% 82%, rgba(16,185,129,0.48), transparent), " +
            "radial-gradient(ellipse 55% 55% at 92% 68%, rgba(245,158,11,0.38), transparent)",
        }}
      />
      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Typography directly on the gradient */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        {/* Top: label */}
        <div className="flex items-center justify-between">
          <span className="text-white/55 text-[9px] tracking-[0.22em] uppercase font-bold">
            Aurora Mesh
          </span>
          <div className="flex gap-1">
            {["#7c3aed", "#06b6d4", "#ec4899"].map((c) => (
              <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Center: bold editorial type */}
        <div>
          <p className="text-white/30 text-[8px] uppercase tracking-[0.24em] mb-2 font-semibold">
            Design System
          </p>
          <p
            className="text-white font-black leading-none tracking-tighter"
            style={{ fontSize: "clamp(28px, 6vw, 38px)" }}
          >
            Karakura
          </p>
          <p
            className="font-black leading-none tracking-tighter"
            style={{
              fontSize: "clamp(28px, 6vw, 38px)",
              WebkitTextStroke: "1px rgba(255,255,255,0.5)",
              color: "transparent",
            }}
          >
            Digital
          </p>
        </div>

        {/* Bottom: tags */}
        <div className="flex gap-1.5 flex-wrap">
          {["Brand", "Web", "Motion", "3D"].map((tag) => (
            <div
              key={tag}
              className="text-[9px] text-white/70 px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              {tag}
            </div>
          ))}
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

function FlatDesign2Demo() {
  return (
    <div className="h-full flex overflow-hidden" style={{ background: "#f4f4f6" }}>
      {/* Sidebar */}
      <div style={{ width: 44, background: "#fff", borderRight: "1px solid #e5e7eb", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 14, gap: 14 }}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: "#0066FF" }} />
        {([["#0066FF","#eff6ff",true],["#6b7280","transparent",false],["#6b7280","transparent",false],["#6b7280","transparent",false]] as const).map(([c,bg,active],i)=>(
          <div key={i} style={{ width: 32, height: 32, borderRadius: 7, background: bg, display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ width: 11, height: 11, borderRadius: 2.5, background: active?"#0066FF":"#d1d5db" }} />
          </div>
        ))}
        <div style={{ flex:1 }}/>
        <div style={{ width:28, height:28, borderRadius:"50%", background:"#0066FF", marginBottom:12 }}/>
      </div>
      {/* Main */}
      <div style={{ flex:1, padding:"14px 12px", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <p style={{ color:"#111", fontSize:13, fontWeight:800 }}>Dashboard</p>
          <div style={{ background:"#0066FF", borderRadius:6, padding:"4px 9px" }}>
            <p style={{ color:"#fff", fontSize:8, fontWeight:700 }}>Oct 2025</p>
          </div>
        </div>
        {/* KPI grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:8 }}>
          {([["Visitas","12.4K","#0066FF","#dbeafe"],["Leads","384","#22C55E","#dcfce7"],
            ["Conv.","3.1%","#F59E0B","#fef9c3"],["MRR","€8.2K","#8b5cf6","#ede9fe"]] as const).map(([l,v,c,bg])=>(
            <div key={l} style={{ background:"#fff", borderRadius:8, padding:"9px 10px", border:"1px solid #e5e7eb" }}>
              <p style={{ color:"#6b7280", fontSize:7.5, fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase" }}>{l}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:4 }}>
                <p style={{ color:"#111", fontSize:15, fontWeight:800 }}>{v}</p>
                <div style={{ width:18, height:18, borderRadius:4, background:bg, display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <div style={{ width:7,height:7,borderRadius:1.5,background:c }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div style={{ background:"#fff", borderRadius:8, padding:"9px 10px", border:"1px solid #e5e7eb", flex:1 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <p style={{ color:"#111", fontSize:8.5, fontWeight:700 }}>Visitantes semanales</p>
            <div style={{ background:"#dcfce7", borderRadius:4, padding:"2px 7px" }}>
              <p style={{ color:"#16a34a", fontSize:7.5, fontWeight:700 }}>+12%</p>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:36 }}>
            {([38,62,44,80,52,92,68] as const).map((h,i)=>(
              <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:"2px 2px 0 0", background:i===5?"#0066FF":"#dbeafe" }}/>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
            {["L","M","X","J","V","S","D"].map(d=>(
              <p key={d} style={{ flex:1, textAlign:"center", color:"#9ca3af", fontSize:7 }}>{d}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IsometricDemo() {
  // col, row, height — height drives both placement AND face height
  const bldgs: [number,number,number][] = [
    [0,0,2],[1,0,4],[2,0,2],
    [0,1,1],[1,1,5],[2,1,3],
    [0,2,3],[1,2,4],[2,2,2],
  ];
  const sorted = [...bldgs].sort((a,b)=>(a[0]+a[1])-(b[0]+b[1]));

  // Color palette per depth (back → front: indigo → violet → blue)
  const pal: Record<number,[string,string,string]> = {
    0: ["#c7d2fe","#4338ca","#1e1b4b"],
    1: ["#a5b4fc","#4f46e5","#312e81"],
    2: ["#d8b4fe","#7c3aed","#4c1d95"],
    3: ["#93c5fd","#2563eb","#1e3a8a"],
    4: ["#bfdbfe","#1d4ed8","#1e3a8a"],
  };

  // Unit: half-width=17, height-per-unit=20
  // Correct face formula: rh = h*20 (face height spans from top to ground)
  // Bounds: x [-51,51], y top=-100 (h=5 at 1,1), y bottom=40 (h=2 at 2,2)
  return (
    <div className="h-full flex items-center justify-center" style={{ background:"#060c1a", overflow:"hidden", position:"relative" }}>
      {/* Subtle dot grid */}
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.08 }} aria-hidden="true">
        <defs>
          <pattern id="iso-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1" fill="#818cf8"/>
            <circle cx="24" cy="0" r="1" fill="#818cf8"/>
            <circle cx="0" cy="24" r="1" fill="#818cf8"/>
            <circle cx="24" cy="24" r="1" fill="#818cf8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-dots)"/>
      </svg>
      <svg width="100%" height="100%" viewBox="-55 -108 110 155" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {sorted.map(([c,r,h],i)=>{
          const tx=(c-r)*17, ty=(c+r)*10-h*20;
          const [top,right,left]=pal[Math.min(c+r,4)];
          const rh=h*20; // face spans full height from top to ground
          return (
            <g key={i} transform={`translate(${tx},${ty})`}>
              {/* right face — full height rh */}
              <polygon points={`17,-10 17,${rh-10} 0,${rh} 0,0`} fill={right}/>
              {/* left face — full height rh */}
              <polygon points={`-17,-10 -17,${rh-10} 0,${rh} 0,0`} fill={left}/>
              {/* top face */}
              <polygon points="0,-20 17,-10 0,0 -17,-10" fill={top}/>
              {/* edge highlights */}
              <line x1="0" y1="-20" x2="17" y2="-10" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7"/>
              <line x1="0" y1="-20" x2="-17" y2="-10" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7"/>
              <line x1="0" y1="0" x2="0" y2={rh} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </g>
          );
        })}
        {/* Floating nodes above tallest buildings */}
        <circle cx="0" cy="-114" r="3" fill="#f0abfc" opacity="0.9"/>
        <circle cx="-17" cy="-109" r="2" fill="#86efac" opacity="0.8"/>
        <circle cx="17" cy="-107" r="2" fill="#fcd34d" opacity="0.8"/>
        <line x1="-17" y1="-109" x2="0" y2="-114" stroke="rgba(240,171,252,0.4)" strokeWidth="0.6"/>
        <line x1="17" y1="-107" x2="0" y2="-114" stroke="rgba(240,171,252,0.4)" strokeWidth="0.6"/>
      </svg>
    </div>
  );
}

function HoloDemo() {
  return (
    <div className="h-full flex items-center justify-center" style={{ background:"#03000d", position:"relative", overflow:"hidden" }}>
      {/* Ambient glow blobs */}
      <div style={{ position:"absolute", width:180, height:180, borderRadius:"50%", top:"5%", left:"10%", background:"radial-gradient(circle,#7c3aed33 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", width:160, height:160, borderRadius:"50%", bottom:"5%", right:"5%", background:"radial-gradient(circle,#0e7490330 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ width:220, padding:"0 8px", position:"relative" }}>
        {/* Outer glow */}
        <div style={{ position:"absolute", inset:-6, borderRadius:28, background:"linear-gradient(135deg,#ff6b6b,#ffd93d,#6bcb77,#48dbfb,#c084fc,#ff6b6b)", opacity:0.5, filter:"blur(10px)", pointerEvents:"none" }}/>
        {/* Rainbow border */}
        <div style={{ position:"relative", padding:2, borderRadius:24, background:"linear-gradient(135deg,#ff6b6b,#ffd93d,#6bcb77,#48dbfb,#c084fc,#ff6b6b)" }}>
          <div style={{ borderRadius:22, padding:"22px 20px 20px", background:"linear-gradient(160deg,#0d001f,#050118)" }}>
            {/* Prismatic stripe */}
            <div style={{ height:2, borderRadius:2, background:"linear-gradient(90deg,#ff6b6b,#ffd93d,#6bcb77,#48dbfb,#c084fc)", marginBottom:16, opacity:0.95 }}/>
            <p style={{ color:"rgba(255,255,255,0.28)", fontSize:8.5, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:6 }}>Limited Collection</p>
            <p style={{ fontSize:28, fontWeight:900, letterSpacing:"-0.02em", lineHeight:1.0, marginBottom:4, background:"linear-gradient(110deg,#ff9ff3 0%,#48dbfb 45%,#ffd93d 85%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              HOLO<br/>CARD
            </p>
            {/* Spectrum bars */}
            <div style={{ display:"flex", gap:4, marginTop:10, marginBottom:14 }}>
              {(["#ff6b6b","#ffd93d","#6bcb77","#48dbfb","#c084fc"] as const).map((c,i)=>(
                <div key={i} style={{ flex:1, height:4, borderRadius:2, background:c, opacity:0.8-i*0.08 }}/>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
              {([["SERIE","001"],["AÑO","2025"]] as const).map(([l,v])=>(
                <div key={l}>
                  <p style={{ color:"rgba(255,255,255,0.22)", fontSize:7.5, letterSpacing:"0.12em", textTransform:"uppercase" }}>{l}</p>
                  <p style={{ color:"rgba(255,255,255,0.75)", fontSize:14, fontWeight:800, fontFamily:"monospace", letterSpacing:"0.08em" }}>{v}</p>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <p style={{ color:"rgba(255,255,255,0.22)", fontSize:9, fontFamily:"monospace", letterSpacing:"0.12em" }}>**** **** 2025</p>
              <div style={{ position:"relative", width:40, height:26 }}>
                <div style={{ position:"absolute", left:0, width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#ff6b6b,#ffd93d)", opacity:0.9 }}/>
                <div style={{ position:"absolute", right:0, width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#48dbfb,#c084fc)", opacity:0.9 }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtDecoDemo() {
  const gold="#c9a84c";
  return (
    <div className="h-full flex items-center justify-center" style={{ background:"#050300", overflow:"hidden", position:"relative" }}>
      {/* Background chevron pattern */}
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.06,pointerEvents:"none" }} aria-hidden="true">
        <defs>
          <pattern id="ad-v" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M0,12 L12,0 L24,12" fill="none" stroke={gold} strokeWidth="0.8"/>
            <path d="M0,24 L12,12 L24,24" fill="none" stroke={gold} strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ad-v)"/>
      </svg>
      <div style={{ textAlign:"center", width:224, position:"relative" }}>
        {/* Top sunburst ornament */}
        <svg width="224" height="58" viewBox="0 0 224 58" style={{ display:"block" }} aria-hidden="true">
          {([-70,-50,-30,-10,10,30,50,70] as const).map((a,i)=>(
            <line key={i} x1="112" y1="58" x2={112+Math.sin(a*Math.PI/180)*96} y2={58-Math.cos(a*Math.PI/180)*56}
              stroke={gold} strokeWidth={i===3||i===4?"0.8":"0.5"} opacity={i===3||i===4?"0.65":"0.28"}/>
          ))}
          <line x1="22" y1="52" x2="202" y2="52" stroke={gold} strokeWidth="0.8" opacity="0.5"/>
          <line x1="40" y1="46" x2="184" y2="46" stroke={gold} strokeWidth="0.4" opacity="0.3"/>
          <polygon points="112,4 119,18 112,32 105,18" fill="none" stroke={gold} strokeWidth="1.4"/>
          <polygon points="112,10 117,18 112,26 107,18" fill={gold} opacity="0.4"/>
          <polygon points="82,44 87,52 82,60 77,52" fill={gold} opacity="0.5"/>
          <polygon points="142,44 147,52 142,60 137,52" fill={gold} opacity="0.5"/>
        </svg>
        {/* Center content */}
        <div style={{ position:"relative", padding:"14px 22px", borderLeft:`1px solid ${gold}33`, borderRight:`1px solid ${gold}33` }}>
          {/* Corner brackets */}
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h])=>(
            <div key={`${v}${h}`} style={{ position:"absolute", [v]:0, [h]:0, width:10, height:10,
              borderTop:v==="top"?`1px solid ${gold}55`:"none", borderBottom:v==="bottom"?`1px solid ${gold}55`:"none",
              borderLeft:h==="left"?`1px solid ${gold}55`:"none", borderRight:h==="right"?`1px solid ${gold}55`:"none" }}/>
          ))}
          <p style={{ color:`${gold}70`, fontSize:8, letterSpacing:"0.5em", textTransform:"uppercase", marginBottom:10, fontFamily:"Georgia,serif" }}>Maison Créative</p>
          <p style={{ color:gold, fontSize:34, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"Georgia,serif", lineHeight:1.0, textShadow:`0 0 50px rgba(201,168,76,0.35)` }}>ÉLITE</p>
          <p style={{ color:`${gold}90`, fontSize:11, letterSpacing:"0.55em", fontFamily:"Georgia,serif", marginTop:3 }}>◆ STUDIO ◆</p>
          <div style={{ height:1, background:`linear-gradient(to right,transparent,${gold}99,transparent)`, margin:"12px 0" }}/>
          <p style={{ color:`${gold}45`, fontSize:7.5, letterSpacing:"0.28em", textTransform:"uppercase" }}>Córdoba · España · Est. MMXXIV</p>
        </div>
        {/* Bottom ornament (mirrored) */}
        <svg width="224" height="58" viewBox="0 0 224 58" style={{ display:"block", transform:"scaleY(-1)" }} aria-hidden="true">
          {([-70,-50,-30,-10,10,30,50,70] as const).map((a,i)=>(
            <line key={i} x1="112" y1="58" x2={112+Math.sin(a*Math.PI/180)*96} y2={58-Math.cos(a*Math.PI/180)*56}
              stroke={gold} strokeWidth={i===3||i===4?"0.8":"0.5"} opacity={i===3||i===4?"0.65":"0.28"}/>
          ))}
          <line x1="22" y1="52" x2="202" y2="52" stroke={gold} strokeWidth="0.8" opacity="0.5"/>
          <line x1="40" y1="46" x2="184" y2="46" stroke={gold} strokeWidth="0.4" opacity="0.3"/>
          <polygon points="112,4 119,18 112,32 105,18" fill="none" stroke={gold} strokeWidth="1.4"/>
          <polygon points="112,10 117,18 112,26 107,18" fill={gold} opacity="0.4"/>
          <polygon points="82,44 87,52 82,60 77,52" fill={gold} opacity="0.5"/>
          <polygon points="142,44 147,52 142,60 137,52" fill={gold} opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

function HandcraftedDemo() {
  return (
    <div className="h-full flex items-center justify-center p-5" style={{ background:"linear-gradient(145deg,#f0e4cc,#e8d8b8)" }}>
      <div style={{ position:"relative", width:216, padding:"18px 18px 14px", background:"#fdf8ed" }}>
        {/* Hand-drawn border */}
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible",pointerEvents:"none" }} viewBox="0 0 216 238" preserveAspectRatio="none" aria-hidden="true">
          <path d="M7,7 Q11,3 18,6 Q68,2 108,5 Q148,2 198,6 Q211,3 212,9 Q215,38 213,90 Q216,140 213,196 Q215,226 208,230 Q168,235 108,232 Q48,235 10,230 Q3,225 4,196 Q2,140 4,90 Q2,38 5,9 Q6,7 7,7Z"
            fill="none" stroke="#7a5020" strokeWidth="1.6" strokeDasharray="7,4" strokeLinecap="round" opacity="0.32"/>
          <path d="M14,14 Q108,9 202,14 Q208,108 202,224 Q108,229 14,224 Q8,130 14,14Z"
            fill="none" stroke="#7a5020" strokeWidth="0.5" opacity="0.1"/>
        </svg>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
          {/* Wax seal */}
          <div style={{ position:"relative", flexShrink:0 }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"radial-gradient(circle at 38% 32%,#d4843c,#7a3210)", boxShadow:"inset 0 -3px 5px rgba(0,0,0,0.25),0 3px 8px rgba(100,40,10,0.4)" }}/>
            <div style={{ position:"absolute", inset:7, borderRadius:"50%", border:"1px solid rgba(255,210,150,0.3)", display:"flex",alignItems:"center",justifyContent:"center" }}>
              <p style={{ color:"rgba(255,210,140,0.85)", fontSize:8.5, fontWeight:900 }}>KD</p>
            </div>
          </div>
          <div>
            <p style={{ color:"#3a1e05", fontSize:18, fontWeight:800, fontFamily:"Georgia,serif", lineHeight:1.2 }}>Artesano</p>
            <p style={{ color:"#7a5020", fontSize:9, letterSpacing:"0.07em" }}>Córdoba · España</p>
          </div>
        </div>
        {/* Wavy divider */}
        <svg width="180" height="10" viewBox="0 0 180 10" style={{ display:"block", marginBottom:10 }} aria-hidden="true">
          <path d="M0,5 C18,2 36,8 54,5 C72,2 90,8 108,5 C126,2 144,8 162,5 C171,3 178,5 180,5" stroke="#7a5020" strokeWidth="1.4" fill="none" opacity="0.38" strokeLinecap="round"/>
          <path d="M0,8 C18,5 36,11 54,8 C72,5 90,11 108,8 C126,5 144,11 162,8" stroke="#7a5020" strokeWidth="0.6" fill="none" opacity="0.18" strokeLinecap="round"/>
        </svg>
        {/* Quote */}
        <p style={{ color:"#3a1e05", fontSize:10.5, lineHeight:1.85, marginBottom:12, fontFamily:"Georgia,serif", fontStyle:"italic", opacity:0.9 }}>
          "Cada proyecto nace de la escucha atenta y el trabajo cuidadoso."
        </p>
        {/* Tags */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
          {["Sostenible","Local","Artesanal"].map(t=>(
            <span key={t} style={{ padding:"4px 10px", border:"1.5px solid rgba(122,80,32,0.4)", borderRadius:3, color:"#7a5020", fontSize:8, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", background:"rgba(122,80,32,0.05)" }}>{t}</span>
          ))}
        </div>
        {/* Footer */}
        <div style={{ paddingTop:10, borderTop:"1px dashed rgba(122,80,32,0.25)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <path d="M5,1 C5,1 1,3.5 1,7 C1,10.5 5,11 5,11 C5,11 9,10.5 9,7 C9,3.5 5,1 5,1Z" fill="none" stroke="#7a5020" strokeWidth="0.8" opacity="0.55"/>
            <circle cx="5" cy="7" r="1.5" fill="#7a5020" opacity="0.4"/>
          </svg>
          <p style={{ color:"#7a5020", fontSize:8.5, letterSpacing:"0.1em", textTransform:"uppercase", opacity:0.6 }}>Descubre nuestra historia →</p>
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
  {
    id: "flat2",
    name: "Flat Design 2.0",
    tagline: "Claridad radical, sin ornamento",
    description:
      "La evolución del flat design original. Colores puros, sombras cero o casi cero, jerarquía visual construida exclusivamente con tamaño, peso tipográfico y color. Sin gradientes innecesarios. La comunicación es la estética. Google, Apple y Stripe lo elevan como estándar de producto digital.",
    ideal:
      "Apps SaaS, dashboards de gestión, herramientas B2B y de productividad, plataformas donde la densidad de información y la claridad cognitiva importan más que la expresión visual.",
    accent: "#0066FF",
    Demo: FlatDesign2Demo,
  },
  {
    id: "isometric",
    name: "Isométrico / 3D plano",
    tagline: "Profundidad sin renderizador",
    description:
      "Perspectiva axonométrica a 30° que crea ilusión de tridimensionalidad sin distorsión de punto de fuga. Los elementos flotan en un espacio visual ordenado. Dominante en ilustraciones hero de startups, fintechs y productos SaaS que quieren transmitir complejidad de forma accesible y memorable.",
    ideal:
      "Páginas de producto SaaS, secciones de características técnicas, fintechs y herramientas B2B que necesitan ilustrar conceptos abstractos de forma visual sin recurrir a fotografía ni render 3D.",
    accent: "#6C63FF",
    Demo: IsometricDemo,
  },
  {
    id: "holo",
    name: "Holo / Iridiscente",
    tagline: "Prismas digitales que no se olvidan",
    description:
      "Superficies que imitan la refracción de luz en hologramas. Gradientes que van del violeta al cyan al dorado. Efectos iridiscentes donde cada ángulo revela un color diferente. Dominante en gaming, Web3, moda digital y marcas de lujo joven que buscan impacto visual instantáneo en audiencias nativas digitales.",
    ideal:
      "Marcas de gaming, crypto/Web3, moda streetwear, festivales, artistas digitales, lanzamientos de producto premium y cualquier marca que necesite impactar en menos de un segundo.",
    accent: "#c084fc",
    Demo: HoloDemo,
  },
  {
    id: "artdeco",
    name: "Art Deco",
    tagline: "La elegancia geométrica del siglo XX",
    description:
      "Simetría absoluta, motivos geométricos repetitivos, dorados sobre fondos oscuros profundos. Tipografías serifadas con tracking exagerado. Inspirado en los años 20-30 y traducido al lenguaje web contemporáneo. El lujo que comunica permanencia, distinción y una historia detrás de cada línea.",
    ideal:
      "Hoteles de lujo, restaurantes fine dining, joyerías, boutiques de alta gama, bufetes de abogados y marcas donde la sofisticación atemporal y la exclusividad son el mensaje principal.",
    accent: "#c9a84c",
    Demo: ArtDecoDemo,
  },
  {
    id: "handcrafted",
    name: "Handcrafted / Artesanal",
    tagline: "La calidez de lo hecho a mano, en pantalla",
    description:
      "Papel rugoso, trazos irregulares, sellos y etiquetas con imperfecciones deliberadas. El antídoto visual a la frialdad algorítmica. Comunica proceso, autenticidad y cuidado. Está ganando fuerza como reacción al diseño corporativo homogéneo y los templates generados por IA.",
    ideal:
      "Restaurantes y cafeterías artesanales, marcas ecológicas, productores locales, estudios creativos independientes, vitivinicultores y cualquier negocio donde 'hecho con manos' es el diferenciador real.",
    accent: "#b45309",
    Demo: HandcraftedDemo,
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

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setActiveId(STYLES[prevIdx].id);
      if (e.key === "ArrowRight") setActiveId(STYLES[nextIdx].id);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prevIdx, nextIdx]);

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
        @media (prefers-reduced-motion: reduce) {
          .catalog-enter { animation: none; }
        }
        .catalog-pill:hover {
          background: rgba(255,255,255,0.07) !important;
          color: rgba(224,192,175,0.7) !important;
          border-color: rgba(255,255,255,0.14) !important;
        }
        .catalog-pill-active:hover {
          opacity: 0.88;
        }
        .catalog-pill:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.22);
        }
        .catalog-pill-active:focus-visible {
          box-shadow: 0 0 0 2px rgba(255,122,0,0.45);
        }
        .catalog-nav-btn:hover {
          background: rgba(255,255,255,0.09) !important;
          color: rgba(224,192,175,0.8) !important;
        }
        .catalog-nav-btn:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.22);
        }
        .catalog-cta:hover {
          background: rgba(255,122,0,0.2) !important;
          color: #ffaa44 !important;
        }
        .catalog-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255,122,0,0.45);
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
              <span className="w-1.5 h-1.5 rounded-full shrink-0" aria-hidden="true" style={{ background: "#ff7a00" }} />
              Catálogo de estilos · {STYLES.length}
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ letterSpacing: "-0.025em", lineHeight: 1.1, textWrap: "balance" } as React.CSSProperties}
            >
              ¿Qué lenguaje visual habla tu marca?
            </h2>
            <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: "rgba(224,192,175,0.5)" }}>
              Cada estilo es una decisión estratégica sobre cómo percibe tu cliente tu marca.
              Explóralos y encuentra el que encaja.
            </p>
          </div>

          {/* ── Grid selector ── */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5 mb-6" role="listbox" aria-label="Estilos de diseño">
            {STYLES.map((s) => {
              const isActive = s.id === activeId;
              const va = visibleAccent(s.accent);
              const rgb = accentRgb(va);
              return (
                <button
                  key={s.id}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setActiveId(s.id)}
                  className={`catalog-pill${isActive ? " catalog-pill-active" : ""} flex items-center gap-2 px-2.5 py-2.5 rounded-xl text-left text-xs font-medium truncate transition-[background,color,border-color] duration-150`}
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
                    aria-hidden="true"
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
                    {/* Progress bar */}
                    <div className="flex items-center gap-2.5 mb-5">
                      <div
                        className="flex-1 h-0.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <div
                          className="h-full rounded-full transition-[width] duration-300"
                          style={{
                            width: `${((activeIdx + 1) / STYLES.length) * 100}%`,
                            background: accent,
                          }}
                        />
                      </div>
                      <span
                        className="text-[10px] shrink-0 tabular-nums"
                        style={{ color: "rgba(224,192,175,0.3)", fontVariantNumeric: "tabular-nums" }}
                      >
                        {activeIdx + 1}/{STYLES.length}
                      </span>
                    </div>

                    {/* Title block */}
                    <div className="flex items-start gap-3 mb-5">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0 mt-2"
                        aria-hidden="true"
                        style={{
                          background: accent,
                          boxShadow: `0 0 10px rgba(${accentRgb(accent)},0.6)`,
                        }}
                      />
                      <div>
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
                        className="catalog-nav-btn w-11 h-11 flex items-center justify-center rounded-lg text-sm transition-[background,color] duration-150"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(224,192,175,0.4)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        aria-label={`Estilo anterior: ${STYLES[prevIdx].name}`}
                        title={STYLES[prevIdx].name}
                      >
                        ←
                      </button>
                      <a
                        href="/#contact"
                        className="catalog-cta flex-1 py-2.5 rounded-xl text-xs font-semibold text-center transition-[background,color] duration-150"
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
                        className="catalog-nav-btn w-11 h-11 flex items-center justify-center rounded-lg text-sm transition-[background,color] duration-150"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(224,192,175,0.4)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        aria-label={`Siguiente estilo: ${STYLES[nextIdx].name}`}
                        title={STYLES[nextIdx].name}
                      >
                        →
                      </button>
                    </div>
                    <p className="mt-3 text-center text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>
                      Usa ← → para navegar
                    </p>
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
