"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

type ProjectType = "web" | "software" | "crm" | "ia";
type Complexity = "basico" | "estandar" | "avanzado";

const BASE: Record<ProjectType, Record<Complexity, [number, number]>> = {
  web:      { basico: [1500,3500],  estandar: [3500,8000],   avanzado: [8000,20000]  },
  software: { basico: [5000,12000], estandar: [12000,35000], avanzado: [35000,80000] },
  crm:      { basico: [3000,8000],  estandar: [8000,22000],  avanzado: [22000,55000] },
  ia:       { basico: [3500,9000],  estandar: [9000,25000],  avanzado: [25000,60000] },
};

const ADDON_DELTAS: Record<string, [number, number]> = {
  seo:          [500,  1500],
  analytics:    [800,  2500],
  maint:        [150,  400],
  integrations: [500,  2000],
};

const fmt = (n: number) => {
  if (n < 1000) return `${n}€`;
  const k = n / 1000;
  return k % 1 === 0 ? `${k}k€` : `${k.toFixed(1)}k€`;
};

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  open: boolean;
  onClose: () => void;
}

export function BudgetCalculator({ open, onClose }: Props) {
  const t = useTranslations("calculator");
  const [step, setStep] = useState(0);
  const [type, setType] = useState<ProjectType | null>(null);
  const [complexity, setComplexity] = useState<Complexity | null>(null);
  const [addons, setAddons] = useState<Set<string>>(new Set());

  function reset() {
    setStep(0);
    setType(null);
    setComplexity(null);
    setAddons(new Set());
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  function toggleAddon(id: string) {
    setAddons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selectedAddonKeys = Array.from(addons);
  const addonMin = selectedAddonKeys.reduce((s, id) => s + (ADDON_DELTAS[id]?.[0] ?? 0), 0);
  const addonMax = selectedAddonKeys.reduce((s, id) => s + (ADDON_DELTAS[id]?.[1] ?? 0), 0);
  const [baseMin, baseMax] = type && complexity ? BASE[type][complexity] : [0, 0];
  const totalMin = baseMin + addonMin;
  const totalMax = baseMax + addonMax;

  const PROJECT_TYPES: { id: ProjectType }[] = [
    { id: "web" },
    { id: "software" },
    { id: "crm" },
    { id: "ia" },
  ];
  const COMPLEXITIES: { id: Complexity }[] = [
    { id: "basico" },
    { id: "estandar" },
    { id: "avanzado" },
  ];
  const ADDON_IDS = ["seo", "analytics", "maint", "integrations"];
  const STEP_IDS = ["tipo", "complejidad", "extras", "resultado"] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="glass-panel w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(78,222,163,0.12)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-secondary/60 mb-0.5">
                  {t("overline")}
                </p>
                <h2 className="text-white font-bold text-lg">{t("title")}</h2>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-white hover:bg-white/10 transition-all"
                aria-label={t("close")}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex gap-1 px-6 mb-6">
              {STEP_IDS.map((sid, i) => (
                <div key={sid} className="flex-1 flex flex-col gap-1">
                  <div
                    className="h-0.5 rounded-full transition-colors duration-300"
                    style={{
                      background: i <= step
                        ? "var(--color-secondary, #4edea3)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  />
                  <span
                    className="text-[9px] uppercase tracking-widest transition-colors duration-300"
                    style={{ color: i === step ? "rgba(78,222,163,0.8)" : "rgba(255,255,255,0.2)" }}
                  >
                    {t(`steps.${sid}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="px-6 pb-6" style={{ minHeight: 260 }}>
              <AnimatePresence mode="wait">
                {/* Step 0: Project type */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-on-surface-variant text-sm mb-4">{t("step0")}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PROJECT_TYPES.map((pt) => (
                        <button
                          key={pt.id}
                          onClick={() => { setType(pt.id); setStep(1); }}
                          className="text-left p-3.5 rounded-xl border transition-all duration-200 hover:scale-[1.02]"
                          style={{
                            background: type === pt.id ? "rgba(78,222,163,0.08)" : "rgba(255,255,255,0.03)",
                            border: type === pt.id
                              ? "1px solid rgba(78,222,163,0.35)"
                              : "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <p className="text-white text-sm font-semibold mb-0.5">
                            {t(`types.${pt.id}.label`)}
                          </p>
                          <p className="text-on-surface-variant text-[11px]">
                            {t(`types.${pt.id}.desc`)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Complexity */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-on-surface-variant text-sm mb-4">{t("step1")}</p>
                    <div className="flex flex-col gap-2">
                      {COMPLEXITIES.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => { setComplexity(c.id); setStep(2); }}
                          className="text-left p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01] flex items-center gap-4"
                          style={{
                            background: complexity === c.id ? "rgba(78,222,163,0.08)" : "rgba(255,255,255,0.03)",
                            border: complexity === c.id
                              ? "1px solid rgba(78,222,163,0.35)"
                              : "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <div className="flex-1">
                            <p className="text-white text-sm font-semibold">
                              {t(`complexity.${c.id}.label`)}
                            </p>
                            <p className="text-on-surface-variant text-[11px] mt-0.5">
                              {t(`complexity.${c.id}.desc`)}
                            </p>
                          </div>
                          {type && (
                            <span className="text-secondary text-xs font-mono shrink-0">
                              {fmt(BASE[type][c.id][0])} – {fmt(BASE[type][c.id][1])}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(0)}
                      className="mt-4 text-xs text-on-surface-variant hover:text-white transition-colors"
                    >
                      {t("changeType")}
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Add-ons */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-on-surface-variant text-sm mb-4">{t("step2")}</p>
                    <div className="flex flex-col gap-2">
                      {ADDON_IDS.map((id) => {
                        const selected = addons.has(id);
                        const [dMin] = ADDON_DELTAS[id] ?? [0, 0];
                        return (
                          <button
                            key={id}
                            onClick={() => toggleAddon(id)}
                            className="flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200"
                            style={{
                              background: selected ? "rgba(78,222,163,0.08)" : "rgba(255,255,255,0.03)",
                              border: selected
                                ? "1px solid rgba(78,222,163,0.35)"
                                : "1px solid rgba(255,255,255,0.07)",
                            }}
                          >
                            <div
                              className="w-4 h-4 rounded-md shrink-0 flex items-center justify-center border transition-all"
                              style={{
                                background: selected ? "#4edea3" : "transparent",
                                border: selected ? "1px solid #4edea3" : "1px solid rgba(255,255,255,0.2)",
                              }}
                            >
                              {selected && (
                                <svg className="w-2.5 h-2.5" fill="none" stroke="#001711" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="flex-1 text-white text-sm">
                              {t(`addons.${id}` as `addons.seo`)}
                            </span>
                            <span className="text-on-surface-variant text-[11px] font-mono">
                              +{fmt(dMin)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-2.5 rounded-xl text-sm text-on-surface-variant border border-outline-variant/20 hover:text-white hover:bg-white/5 transition-all"
                      >
                        {t("back")}
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-secondary text-on-secondary hover:opacity-90 transition-opacity"
                      >
                        {t("seeEstimate")}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Result */}
                {step === 3 && type && complexity && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ background: "rgba(78,222,163,0.12)", border: "1px solid rgba(78,222,163,0.25)" }}
                    >
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-2">{t("resultTitle")}</p>
                    <div className="mb-1">
                      <span className="text-white font-black" style={{ fontSize: "2.2rem" }}>
                        {fmt(totalMin)}
                      </span>
                      <span className="text-on-surface-variant text-lg mx-2">–</span>
                      <span className="text-white font-black" style={{ fontSize: "2.2rem" }}>
                        {fmt(totalMax)}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-xs mb-6 max-w-xs">
                      {t("resultDisclaimer")}
                    </p>

                    <div className="flex flex-col gap-2 w-full max-w-xs">
                      <a
                        href="/#contact"
                        onClick={handleClose}
                        className="w-full py-3 rounded-xl text-sm font-semibold bg-secondary text-on-secondary hover:opacity-90 transition-opacity text-center"
                      >
                        {t("ctaConsult")}
                      </a>
                      <button
                        onClick={() => { reset(); }}
                        className="w-full py-2.5 rounded-xl text-sm text-on-surface-variant border border-outline-variant/20 hover:text-white hover:bg-white/5 transition-all"
                      >
                        {t("ctaNew")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
