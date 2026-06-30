"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { BiomeData, ViewState } from "./types";

export function BiomeInfoPanel({
  biome,
  viewState,
  onBack,
}: {
  biome: BiomeData | null;
  viewState: ViewState;
  onBack: () => void;
}) {
  return (
    <AnimatePresence>
      {biome && viewState === "detail" && (
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-6 left-6 z-20 max-w-sm"
        >
          <div
            className="rounded-2xl p-6 border border-white/10"
            style={{
              background: "rgba(0, 15, 10, 0.85)",
              boxShadow: `0 0 40px ${biome.markerColor}22`,
            }}
          >
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al mapa
            </button>

            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: biome.markerColor }}
            >
              {biome.name}
            </h3>
            <p className="text-sm text-white/70 mb-5 leading-relaxed">
              {biome.description}
            </p>

            <div className="space-y-3">
              {biome.projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl p-4 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {project.name}
                  </h4>
                  <p className="text-white/50 text-xs leading-relaxed mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full border"
                        style={{
                          color: biome.markerColor,
                          borderColor: `${biome.markerColor}33`,
                          background: `${biome.markerColor}11`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
