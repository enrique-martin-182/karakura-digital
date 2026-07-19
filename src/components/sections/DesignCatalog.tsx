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
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function DesignCatalog() {
  const [activeId, setActiveId] = useState(STYLES[0].id);
  const active = STYLES.find((s) => s.id === activeId) ?? STYLES[0];

  return (
    <section className="py-20 px-4" style={{ background: "#001711" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#ff7a00" }}
          >
            Catálogo de estilos de diseño
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Qué lenguaje visual habla tu marca?
          </h2>
          <p
            className="max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: "rgba(224,192,175,0.55)" }}
          >
            12 corrientes de diseño web. Cada estilo es una decisión
            estratégica sobre cómo percibe tu cliente tu marca. Explóralos y
            encuentra el que encaja con tu propuesta de valor.
          </p>
        </div>

        {/* Mobile pills */}
        <div
          className="lg:hidden flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 mb-6"
          style={{ scrollbarWidth: "none" }}
        >
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={
                activeId === s.id
                  ? { background: "#ff7a00", color: "#fff" }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(224,192,175,0.55)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Desktop: sidebar + content */}
        <div className="flex gap-6 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-0.5 w-52 shrink-0 sticky top-24">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className="text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={
                  activeId === s.id
                    ? {
                        background: "rgba(255,122,0,0.12)",
                        color: "#ff7a00",
                        fontWeight: 600,
                      }
                    : {
                        color: "rgba(224,192,175,0.45)",
                      }
                }
              >
                {s.name}
              </button>
            ))}
          </aside>

          {/* Content panel */}
          <div className="flex-1 min-w-0">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(0,23,17,0.6)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Demo area */}
              <div className="h-72 md:h-80">
                <active.Demo />
              </div>

              {/* Info */}
              <div
                className="p-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-0.5">
                      {active.name}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "rgba(224,192,175,0.45)" }}
                    >
                      {active.tagline}
                    </p>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1.5"
                    style={{ background: active.accent }}
                  />
                </div>

                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(224,192,175,0.65)" }}
                >
                  {active.description}
                </p>

                <div
                  className="pl-3"
                  style={{
                    borderLeft: "2px solid rgba(255,122,0,0.35)",
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-widest mb-1"
                    style={{ color: "rgba(255,122,0,0.65)" }}
                  >
                    Ideal para
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(224,192,175,0.55)" }}
                  >
                    {active.ideal}
                  </p>
                </div>
              </div>
            </div>

            {/* Style counter */}
            <p
              className="text-[10px] text-right mt-3 pr-1"
              style={{ color: "rgba(224,192,175,0.25)" }}
            >
              {STYLES.findIndex((s) => s.id === activeId) + 1} / {STYLES.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
