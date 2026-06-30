"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Project3D } from "./ProjectMarkers";

interface ProjectPanelProps {
  project: Project3D | null;
  onClose: () => void;
}

export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-6 right-6 w-[360px] z-20"
        >
          <div
            className="rounded-2xl border p-6 backdrop-blur-xl"
            style={{
              background: "rgba(0, 23, 17, 0.85)",
              borderColor: `${project.accentColor}33`,
              boxShadow: `0 0 40px ${project.accentColor}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: project.accentColor,
                    boxShadow: `0 0 12px ${project.accentColor}80`,
                  }}
                />
                <h3 className="text-lg font-bold text-white">{project.name}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Cerrar panel"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}33`,
                    backgroundColor: `${project.accentColor}10`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div
              className="h-px mb-5"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.accentColor}33, transparent)`,
              }}
            />

            {/* CTA */}
            <a
              href={project.url}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}cc, ${project.accentColor}88)`,
                boxShadow: `0 4px 15px ${project.accentColor}33`,
              }}
            >
              Ver Proyecto
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
