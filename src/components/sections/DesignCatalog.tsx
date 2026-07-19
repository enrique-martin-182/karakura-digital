"use client";

import { useState } from "react";

// ── Demo components ────────────────────────────────────────────────────────

function SkeumorphismDemo() {
  return (
    <div
      className="h-full flex items-center justify-center gap-6 p-6"
      style={{
        background:
          "linear-gradient(135deg, #2d1b0a 0%, #4a2f15 50%, #1a0f05 100%)",
        backgroundImage:
          "linear-gradient(135deg, #2d1b0a 0%, #4a2f15 50%, #1a0f05 100%), repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 8px)",
        backgroundBlendMode: "normal, overlay",
      }}
    >
      <div className="flex flex-col items-center gap-5">
        <div
          className="w-52 rounded-2xl p-4 border border-amber-900/60"
          style={{
            background: "linear-gradient(180deg, #6b3e1a 0%, #4a2810 100%)",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,200,100,0.15)",
          }}
        >
          <p className="text-[10px] font-mono text-amber-400/80 mb-3 tracking-widest">
            KARAKURA OS v2.4
          </p>
          <div
            className="rounded-xl p-3 mb-3"
            style={{
              background:
                "linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)",
              boxShadow:
                "inset 0 3px 10px rgba(0,0,0,0.8), inset 0 -1px 0 rgba(255,255,255,0.03)",
            }}
          >
            <p className="text-green-400 text-[10px] font-mono">
              $ npm run build
            </p>
            <p className="text-green-400/60 text-[10px] font-mono">
              ✓ compilado en 1.4s
            </p>
          </div>
          <button
            className="w-full rounded-xl py-2 text-xs font-bold text-amber-100 border border-amber-900/80"
            style={{
              background:
                "linear-gradient(180deg, #c47c28 0%, #7a4a0a 100%)",
              boxShadow:
                "0 4px 0 rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.25)",
            }}
          >
            EJECUTAR
          </button>
        </div>
        <div className="flex gap-3">
          {["#ff6b35", "#4ecdc4", "#4edea3"].map((c, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full"
              style={{
                background: `radial-gradient(circle at 35% 30%, ${c}dd, ${c}55)`,
                boxShadow: `0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.35)`,
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
      <div className="flex flex-col items-center gap-6 w-full max-w-xs">
        <div
          className="rounded-2xl p-6 w-full"
          style={{
            background: "#e0e5ec",
            boxShadow: "8px 8px 16px #b8bec7, -8px -8px 16px #ffffff",
          }}
        >
          <p className="text-slate-500 text-xs font-medium mb-4 tracking-widest uppercase">
            Rendimiento
          </p>
          {[
            { label: "Conversión", w: "75%", color: "#6366f1" },
            { label: "Retención", w: "55%", color: "#06b6d4" },
            { label: "Satisfacción", w: "88%", color: "#10b981" },
          ].map(({ label, w, color }) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>{label}</span>
                <span>{w}</span>
              </div>
              <div
                className="h-2 rounded-full"
                style={{
                  background: "#e0e5ec",
                  boxShadow:
                    "inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff",
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: w, background: color }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {["◀", "▶", "⏸"].map((icon, i) => (
            <button
              key={i}
              className="w-12 h-12 rounded-full text-slate-500 flex items-center justify-center text-sm"
              style={{
                background: "#e0e5ec",
                boxShadow:
                  i === 2
                    ? "inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff"
                    : "6px 6px 12px #b8bec7, -6px -6px 12px #ffffff",
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function GlassmorphismDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      <div
        className="absolute w-44 h-44 rounded-full -top-12 -left-12"
        style={{ background: "rgba(255,255,255,0.18)" }}
      />
      <div
        className="absolute w-36 h-36 rounded-full -bottom-10 -right-10"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />
      <div
        className="relative rounded-2xl p-5 w-full max-w-xs border border-white/20 backdrop-blur-md"
        style={{
          background: "rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-xs font-bold">
            KD
          </div>
          <div>
            <p className="text-white text-sm font-semibold">
              Karakura Digital
            </p>
            <p className="text-white/60 text-xs">Agencia · Córdoba</p>
          </div>
        </div>
        <div className="space-y-2.5 mb-4">
          {[
            { label: "Conversión", v: 85 },
            { label: "Retención", v: 62 },
            { label: "NPS", v: 91 },
          ].map(({ label, v }) => (
            <div key={label}>
              <div className="flex justify-between text-white/70 text-[10px] mb-1">
                <span>{label}</span>
                <span>{v}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white/70"
                  style={{ width: `${v}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2 rounded-xl text-white text-xs font-medium border border-white/30 bg-white/15">
          Ver informe completo
        </button>
      </div>
    </div>
  );
}

function ClaymorphismDemo() {
  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(135deg, #fff1eb 0%, #fde68a 100%)",
      }}
    >
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {[
          {
            color: "#ff6b6b",
            shadow: "rgba(255,107,107,0.45)",
            label: "Campañas",
            value: "+42%",
            icon: "🚀",
          },
          {
            color: "#4ecdc4",
            shadow: "rgba(78,205,196,0.45)",
            label: "Clientes",
            value: "1.2k",
            icon: "👥",
          },
          {
            color: "#a855f7",
            shadow: "rgba(168,85,247,0.45)",
            label: "Proyectos",
            value: "28",
            icon: "✨",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[20px] p-4 flex items-center gap-4"
            style={{
              background: item.color,
              boxShadow: `6px 6px 0 ${item.shadow}, 0 12px 24px rgba(0,0,0,0.08)`,
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center text-2xl shrink-0"
              style={{ boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4)" }}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">
                {item.label}
              </p>
              <p className="text-white text-xl font-bold">{item.value}</p>
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
        <div className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-6">
          Karakura Digital / 2026
        </div>
        <h2 className="text-3xl font-light text-stone-900 leading-tight mb-6">
          Diseño
          <br />
          <span className="text-stone-400">que respira.</span>
        </h2>
        <div className="w-10 h-px bg-stone-900 mb-6" />
        <p className="text-xs text-stone-400 leading-relaxed mb-8">
          El espacio en blanco no es vacío. Es silencio intencional que hace
          que cada elemento hable por sí solo.
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] text-stone-400 tracking-widest uppercase">
              Contacto
            </p>
            <p className="text-xs text-stone-600">hola@karakura.es</p>
          </div>
          <button className="text-xs border border-stone-900 px-4 py-2">
            →
          </button>
        </div>
      </div>
    </div>
  );
}

function MaximalismDemo() {
  return (
    <div
      className="h-full relative overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div
        className="absolute top-3 left-3 w-20 h-20 rounded-full opacity-70"
        style={{ background: "linear-gradient(45deg, #ff6b35, #f7c59f)" }}
      />
      <div
        className="absolute top-8 right-4 w-16 h-16 rotate-45 opacity-60"
        style={{ background: "linear-gradient(45deg, #4ecdc4, #45b7d1)" }}
      />
      <div
        className="absolute bottom-4 left-6 w-24 h-8 rounded opacity-50"
        style={{ background: "#e63946" }}
      />
      <div
        className="absolute bottom-10 right-2 w-10 h-20 rotate-12 opacity-40"
        style={{ background: "linear-gradient(180deg, #ffe66d, #ff6b35)" }}
      />
      <div className="relative text-center px-4">
        <div
          className="text-5xl font-black text-white mb-2"
          style={{
            textShadow: "3px 3px 0 #ff6b35, 6px 6px 0 #4ecdc4",
          }}
        >
          KD!
        </div>
        <div className="grid grid-cols-3 gap-1 mb-3">
          {[
            "#ff6b35",
            "#4ecdc4",
            "#ffe66d",
            "#a855f7",
            "#06d6a0",
            "#ff006e",
          ].map((c, i) => (
            <div
              key={i}
              className="h-3 rounded-sm"
              style={{ background: c }}
            />
          ))}
        </div>
        <p className="text-yellow-300 text-xs font-black tracking-widest uppercase">
          MÁS ES MÁS
        </p>
        <p className="text-pink-400 text-xs mt-1">
          ✦ Todo. ✦ Ahora. ✦ Aquí. ✦
        </p>
        <p className="text-white/40 text-[10px] font-mono mt-3">
          v∞.∞.∞-ALPHA
        </p>
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
            <p className="font-mono font-black text-lg">2024</p>
          </div>
          <div className="p-3 border-b-4 border-black">
            <p className="font-mono text-[10px] text-black/40 uppercase">
              Proyectos
            </p>
            <p className="font-mono font-black text-lg">28+</p>
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
      style={{
        background:
          "linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 60%, #0a1a2e 100%)",
      }}
    >
      <div
        className="absolute w-56 h-56 rounded-full -top-8 -left-8 opacity-25"
        style={{
          background: "radial-gradient(circle, #a78bfa, transparent 70%)",
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full -bottom-8 -right-8 opacity-20"
        style={{
          background: "radial-gradient(circle, #67e8f9, transparent 70%)",
        }}
      />
      <div
        className="relative w-full max-w-xs rounded-3xl p-5 backdrop-blur-2xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "0.5px solid rgba(255,255,255,0.14)",
          boxShadow:
            "0 0 0 0.5px rgba(255,255,255,0.06) inset, 0 24px 48px rgba(0,0,0,0.45)",
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 60%)",
          }}
        />
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "0.5px solid rgba(255,255,255,0.2)",
            }}
          >
            KD
          </div>
          <div
            className="h-px flex-1 mx-3"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }}
          />
          <span className="text-white/35 text-[10px]">09:41</span>
        </div>
        <p className="text-white text-lg font-light mb-1">Buenos días,</p>
        <p className="text-white/45 text-xs mb-5">
          3 proyectos activos · 1 reunión hoy
        </p>
        <div className="flex gap-2">
          {["Diseño", "Dev", "Launch"].map((t) => (
            <div
              key={t}
              className="flex-1 rounded-2xl py-2 text-center text-[10px] text-white/65"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "0.5px solid rgba(255,255,255,0.1)",
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
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #0d1117 0%, #020408 100%)",
      }}
    >
      <div className="relative w-full max-w-xs">
        <div
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            transform: "translateY(20px) translateX(6px)",
            background: "rgba(99,102,241,0.25)",
            border: "1px solid rgba(99,102,241,0.15)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl opacity-55"
          style={{
            transform: "translateY(10px) translateX(3px)",
            background: "rgba(15,20,40,0.75)",
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        />
        <div
          className="relative rounded-2xl p-5"
          style={{
            background: "rgba(15,20,35,0.95)",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow:
              "0 0 40px rgba(99,102,241,0.08), 0 20px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-indigo-300/60 text-[10px] tracking-widest uppercase">
              Panel de control
            </span>
          </div>
          <p className="text-white text-base font-light mb-4">
            Sistema operativo
          </p>
          <div className="space-y-3">
            {[
              { label: "Núcleo", v: "98%", color: "#6366f1" },
              { label: "Red", v: "71%", color: "#06b6d4" },
              { label: "Memoria", v: "44%", color: "#8b5cf6" },
            ].map(({ label, v, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-white/35 text-[10px] w-14">{label}</span>
                <div className="flex-1 h-1 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: v, background: color }}
                  />
                </div>
                <span className="text-white/35 text-[10px] w-8 text-right">
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
      style={{ background: "#f5f0e8" }}
    >
      <div
        className="absolute w-[140%] h-12 bg-red-600"
        style={{
          top: "22%",
          left: "-20%",
          transform: "rotate(-10deg)",
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black" />
      <div
        className="absolute bottom-0 right-0 w-1/3 h-10 bg-red-600"
        style={{ transform: "skewX(-15deg)", transformOrigin: "right bottom" }}
      />
      <div className="relative text-center px-6 z-10">
        <p className="text-[9px] font-black tracking-[0.4em] uppercase text-black mb-0.5">
          Agencia
        </p>
        <p className="text-[56px] font-black leading-none text-black">KA</p>
        <p className="text-[56px] font-black leading-none text-red-600 -mt-3">
          RA
        </p>
        <div className="w-full h-1 bg-black mt-1 mb-1.5" />
        <p className="text-[9px] tracking-[0.18em] font-bold text-black uppercase">
          CÓRDOBA · ESPAÑA · 2024
        </p>
      </div>
      <div className="absolute top-4 right-4 w-7 h-7 border-[3px] border-black z-10" />
      <div className="absolute top-6 right-6 w-7 h-7 bg-red-600 z-0" />
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
            <p className="font-black text-3xl text-black">28</p>
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
    <div className="h-full p-4 bg-stone-100 flex items-center justify-center">
      <div
        className="grid gap-2 w-full max-w-xs"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(4, 52px)",
        }}
      >
        <div
          className="rounded-2xl bg-indigo-600 p-3 flex flex-col justify-between"
          style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}
        >
          <p className="text-white/60 text-[9px] uppercase tracking-widest">
            Destacado
          </p>
          <p className="text-white text-lg font-bold leading-tight">
            Desarrollo
            <br />
            Web
          </p>
        </div>
        <div className="rounded-2xl bg-orange-400 flex items-center justify-center text-xl">
          🚀
        </div>
        <div className="rounded-2xl bg-stone-800 flex items-center justify-center">
          <p className="text-white text-xs font-bold">AI</p>
        </div>
        <div
          className="rounded-2xl bg-white border border-stone-200 p-3 flex items-center gap-2"
          style={{ gridColumn: "1 / 4" }}
        >
          <div className="w-5 h-5 rounded-full bg-green-500 shrink-0" />
          <p className="text-stone-600 text-[11px]">
            28 proyectos completados
          </p>
          <p className="text-stone-400 text-xs ml-auto">→</p>
        </div>
        <div className="rounded-2xl bg-yellow-300 flex items-center justify-center">
          <p className="text-yellow-900 font-black text-[11px]">SEO</p>
        </div>
        <div className="rounded-2xl bg-pink-500 flex items-center justify-center">
          <p className="text-white text-xs font-bold">UI</p>
        </div>
        <div className="rounded-2xl bg-cyan-500 flex items-center justify-center">
          <p className="text-white text-xs font-bold">3D</p>
        </div>
      </div>
    </div>
  );
}

function AuroraMeshDemo() {
  return (
    <div className="h-full relative overflow-hidden" style={{ background: "#04040f" }}>
      {/* Mesh — static radial-gradients, no animation per CLAUDE.md constraint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 18% 28%, rgba(124,58,237,0.55), transparent), " +
            "radial-gradient(ellipse 55% 45% at 78% 18%, rgba(6,182,212,0.45), transparent), " +
            "radial-gradient(ellipse 60% 50% at 62% 72%, rgba(236,72,153,0.4), transparent), " +
            "radial-gradient(ellipse 50% 55% at 8% 82%, rgba(16,185,129,0.35), transparent)",
        }}
      />
      {/* Frosted card over mesh */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className="relative rounded-2xl p-6 w-full max-w-xs backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
            />
            <span className="text-white/45 text-[10px] tracking-[0.18em] uppercase">
              Aurora Studio
            </span>
          </div>
          <p className="text-white text-lg font-semibold mb-1">Karakura Digital</p>
          <p className="text-white/45 text-xs mb-5">Diseño en movimiento</p>
          <div className="flex gap-1.5 mb-4">
            {["#7c3aed", "#06b6d4", "#ec4899", "#10b981", "#f59e0b"].map((c, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full"
                style={{ background: c, opacity: 0.75 }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {["Branding", "Web", "Motion"].map((t) => (
              <div
                key={t}
                className="flex-1 rounded-xl py-1.5 text-center text-[10px] text-white/55"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
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
            🚀 Deployed → karakuradigital.es
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
    <div className="h-full flex items-center justify-center p-8" style={{ background: "#080808" }}>
      <div className="w-full max-w-xs">
        <div className="text-center mb-6">
          <p
            className="text-[9px] tracking-[0.35em] uppercase mb-6"
            style={{ color: "rgba(201,169,110,0.6)", fontFamily: "Georgia, serif" }}
          >
            Desde 2024
          </p>
          <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)" }} className="mb-6" />
          <h2
            className="text-4xl leading-tight mb-4"
            style={{ color: "#f5f0e8", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 300, letterSpacing: "-0.01em" }}
          >
            Sin<br />
            <em>compromiso.</em>
          </h2>
          <div style={{ borderBottom: "1px solid rgba(201,169,110,0.2)" }} className="mb-6" />
          <p
            className="text-xs leading-relaxed mb-8"
            style={{ color: "rgba(245,240,232,0.35)", letterSpacing: "0.06em" }}
          >
            Desarrollo web de alto nivel para marcas que no aceptan mediocridad.
          </p>
        </div>
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
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0"
            style={{
              background: "linear-gradient(135deg, #6ecf7a, #3aab5a)",
              boxShadow: "0 3px 10px rgba(60,160,80,0.4), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            🌿
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
          {[["28", "Proyectos"], ["5★", "Rating"], ["100%", "Eco"]].map(([v, l]) => (
            <div
              key={l}
              className="rounded-2xl p-2 text-center"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <p className="font-bold text-sm" style={{ color: "#1a5c3a" }}>{v}</p>
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
          {[["📊", true], ["🗂️", false], ["🔔", false]].map(([icon, active], i) => (
            <div key={i} className="w-8 h-8 rounded-[10px] flex items-center justify-center text-sm" style={active ? { background: "rgba(139,92,246,.25)", border: ".5px solid rgba(139,92,246,.4)" } : {}}>{icon}</div>
          ))}
          <div className="flex-1" />
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-sm">⚙️</div>
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
      <div className="absolute rounded-full" style={{ width: 180, height: 180, top: -60, right: -50, background: "#fef08a", opacity: .9 }} />
      <div className="absolute rounded-full" style={{ width: 100, height: 100, bottom: -30, left: -20, background: "#bbf7d0", opacity: .9 }} />
      <div className="relative z-10" style={{ width: 250 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#f97316", marginBottom: 8 }}>Karakura Digital</p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.25, marginBottom: 10 }}>Tu equipo digital,<br />sin complicaciones</p>
        <div className="w-full rounded-2xl flex items-center justify-center gap-3 mb-3" style={{ height: 80, background: "#fef3c7" }}>
          <span style={{ fontSize: 32 }}>🧑‍💻</span>
          <div className="flex flex-col gap-1.5">
            {[["56px", "#f97316"], ["40px", "#8b5cf6"], ["48px", "#06b6d4"]].map(([w, c], i) => (
              <div key={i} className="rounded" style={{ width: w, height: 8, background: c, opacity: .8 }} />
            ))}
          </div>
          <span style={{ fontSize: 28 }}>🚀</span>
        </div>
        <div className="flex gap-2.5">
          {[["28+", "Proyectos", "#f97316"], ["100%", "Satisfacción", "#8b5cf6"], ["5⭐", "Rating", "#06b6d4"]].map(([v, l, c]) => (
            <div key={l} className="text-center flex-1">
              <div style={{ fontSize: 18, fontWeight: 800, color: c }}>{v}</div>
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
            <div style={{ fontSize: 8, color: "#999", letterSpacing: ".14em", textTransform: "uppercase" }}>Vol. 03 · Nº 12</div>
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
                <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,.6)", width: 28, textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[10px] p-2.5" style={{ background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.07)" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>NPS</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>87</div>
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
            <div style={{ fontSize: 28, fontWeight: 900, color: "#e63329", lineHeight: 1, letterSpacing: "-.02em", marginBottom: 2 }}>28</div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em", color: "#999" }}>Proyectos</div>
            <div className="mt-2">
              <div style={{ fontSize: 20, fontWeight: 900, color: "#e63329", lineHeight: 1 }}>100%</div>
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
              <div className="rounded-[8px] shrink-0 flex items-center justify-center text-[11px]" style={{ width: 20, height: 20, background: t.checkBg, border: (t as { checkBorder?: string }).checkBorder, boxShadow: "0 3px 8px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.2)" }}>{t.done ? "✓" : ""}</div>
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
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function DesignCatalog() {
  const [activeId, setActiveId] = useState(STYLES[0].id);
  const active = STYLES.find((s) => s.id === activeId) ?? STYLES[0];
  const activeIdx = STYLES.findIndex((s) => s.id === activeId);

  return (
    <section className="py-20 px-4" style={{ background: "#001711" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#ff7a00" }}>
            Catálogo de estilos de diseño
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Qué lenguaje visual habla tu marca?
          </h2>
          <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "rgba(224,192,175,0.55)" }}>
            25 corrientes de diseño web. Cada estilo es una decisión
            estratégica sobre cómo percibe tu cliente tu marca. Explóralos y
            encuentra el que encaja con tu propuesta de valor.
          </p>
        </div>

        {/* ── Grid selector — all 25 styles visible at once ── */}
        <div
          className="grid gap-1.5 mb-8"
          style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
        >
          {STYLES.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all duration-150 text-xs font-medium truncate"
                style={
                  isActive
                    ? {
                        background: "rgba(255,122,0,0.14)",
                        color: "#ff7a00",
                        border: "1px solid rgba(255,122,0,0.35)",
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        color: "rgba(224,192,175,0.5)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
                }
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: s.accent, opacity: isActive ? 1 : 0.55 }}
                />
                <span className="truncate">{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── Content: demo (left) + info (right) ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(0,23,17,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex flex-col lg:flex-row">

            {/* Demo — fixed height on desktop, preserves aspect on mobile */}
            <div className="lg:w-[55%] h-72 md:h-80 lg:h-auto lg:min-h-[380px] shrink-0" style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="h-full">
                <active.Demo />
              </div>
            </div>

            {/* Info panel */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1">{active.name}</h3>
                    <p className="text-sm" style={{ color: "rgba(224,192,175,0.45)" }}>{active.tagline}</p>
                  </div>
                  <div className="w-3 h-3 rounded-full shrink-0 mt-1.5" style={{ background: active.accent }} />
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(224,192,175,0.65)" }}>
                  {active.description}
                </p>

                <div className="pl-3" style={{ borderLeft: "2px solid rgba(255,122,0,0.35)" }}>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,122,0,0.65)" }}>
                    Ideal para
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(224,192,175,0.55)" }}>
                    {active.ideal}
                  </p>
                </div>
              </div>

              {/* Nav arrows + counter */}
              <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button
                  onClick={() => setActiveId(STYLES[(activeIdx - 1 + STYLES.length) % STYLES.length].id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(224,192,175,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  ← Anterior
                </button>
                <span className="text-[11px]" style={{ color: "rgba(224,192,175,0.25)", fontVariantNumeric: "tabular-nums" }}>
                  {activeIdx + 1} / {STYLES.length}
                </span>
                <button
                  onClick={() => setActiveId(STYLES[(activeIdx + 1) % STYLES.length].id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(224,192,175,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  Siguiente →
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
