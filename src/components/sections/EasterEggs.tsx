"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSecretStore, SECRET_COMMANDS } from "@/store/useSecretStore";

const descriptions: Record<string, string> = {
  zelda:
    "Una visitante sigilosa aparece en la pantalla y la cruza de punta a punta. Se activa una sola vez por visita.",
  pikachu:
    "Cada clic del ratón genera una descarga eléctrica. Modo toggle: actívalo y desactívalo cuando quieras.",
  sonic:
    "El scroll se vuelve ultrasónico. La página vuela a velocidad de Sonic. Otro clic lo desactiva.",
};

const actionLabels: Record<string, string> = {
  zelda:   "Activar y ver",
  pikachu: "Encender Volt Mode",
  sonic:   "Encender Blast Mode",
};

const activeLabels: Record<string, string> = {
  zelda:   "Activo — vuelve al inicio",
  pikachu: "Apagar Volt Mode",
  sonic:   "Apagar Blast Mode",
};

const cardColors: Record<string, { bg: string; border: string; glow: string }> = {
  zelda:   { bg: "rgba(255,122,0,0.07)",  border: "rgba(255,122,0,0.25)",  glow: "rgba(255,122,0,0.15)"  },
  pikachu: { bg: "rgba(250,204,21,0.07)", border: "rgba(250,204,21,0.25)", glow: "rgba(250,204,21,0.15)" },
  sonic:   { bg: "rgba(78,222,163,0.07)", border: "rgba(78,222,163,0.25)", glow: "rgba(78,222,163,0.15)" },
};

export function EasterEggs() {
  const router = useRouter();
  const { isZeldaActive, isVoltMode, isBlastMode, activateZelda, toggleVolt, toggleBlast } = useSecretStore();

  const isActive: Record<string, boolean> = {
    zelda:   isZeldaActive,
    pikachu: isVoltMode,
    sonic:   isBlastMode,
  };

  function handleClick(id: string) {
    if (id === "zelda")   { activateZelda(); router.push("/"); return; }
    if (id === "pikachu") { toggleVolt(); router.push("/"); return; }
    if (id === "sonic")   { toggleBlast(); router.push("/"); return; }
  }

  return (
    <section className="py-section max-w-[1280px] mx-auto px-4 md:px-gutter">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-container mb-3">
          Modo Secreto
        </p>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          Easter Eggs
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-xl mx-auto">
          Tres efectos ocultos en la web. Actívalos desde aquí o desde la paleta de comandos con{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/25 font-mono text-[11px]">⌘K</kbd>
          {" "}escribiendo <code className="text-primary-container">/zelda</code>,{" "}
          <code className="text-yellow-400">/pikachu</code> o{" "}
          <code className="text-secondary">/sonic</code>.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {SECRET_COMMANDS.map((secret, i) => {
          const active = isActive[secret.id];
          const colors = cardColors[secret.id];
          return (
            <motion.div
              key={secret.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-6 flex flex-col gap-4 border"
              style={{
                background: colors.bg,
                borderColor: active ? colors.border : "rgba(255,255,255,0.07)",
                boxShadow: active ? `0 0 32px ${colors.glow}` : "none",
                transition: "box-shadow 0.4s ease, border-color 0.3s ease",
              }}
            >
              {/* Status badge */}
              {active && (
                <span
                  className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: colors.border, color: "#fff" }}
                >
                  Activo
                </span>
              )}

              {/* Emoji */}
              <div className="text-5xl">{secret.emoji}</div>

              {/* Info */}
              <div>
                <h2 className="text-white font-bold text-lg mb-1">{secret.label}</h2>
                <code className="text-[11px] font-mono text-on-surface-variant/50 mb-3 block">
                  {secret.command}
                </code>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {descriptions[secret.id]}
                </p>
              </div>

              {/* Action button */}
              <button
                onClick={() => handleClick(secret.id)}
                className="mt-auto w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 border"
                style={
                  active
                    ? {
                        background: colors.bg,
                        borderColor: colors.border,
                        color: "#fff",
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.10)",
                        color: "rgba(224,192,175,0.7)",
                      }
                }
              >
                {active ? activeLabels[secret.id] : actionLabels[secret.id]}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-on-surface-variant/30 mt-10">
        Los efectos se activan en la página principal. Al pulsar el botón serás redirigido allí.
      </p>
    </section>
  );
}
