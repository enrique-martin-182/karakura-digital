"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "kd_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage blocked (private mode, etc.)
    }
  }, []);

  function save(value: "accepted" | "necessary") {
    try { localStorage.setItem(STORAGE_KEY, value); } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-5"
          role="dialog"
          aria-label="Aviso de cookies"
          aria-live="polite"
        >
          <div
            className="glass-panel max-w-[960px] mx-auto rounded-2xl px-5 py-4
                        flex flex-col sm:flex-row sm:items-center gap-4"
            style={{ border: "1px solid rgba(78,222,163,0.12)" }}
          >
            {/* Cookie icon */}
            <svg
              aria-hidden="true"
              className="w-5 h-5 shrink-0 text-secondary opacity-70 hidden sm:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx={12} cy={12} r={10} strokeWidth={1.5} />
              <circle cx={8.5} cy={10} r={1} fill="currentColor" stroke="none" />
              <circle cx={14} cy={8} r={1} fill="currentColor" stroke="none" />
              <circle cx={15} cy={14} r={1} fill="currentColor" stroke="none" />
              <circle cx={10} cy={15} r={1} fill="currentColor" stroke="none" />
            </svg>

            <p className="text-sm text-on-surface-variant flex-1 leading-relaxed">
              Usamos cookies propias para el funcionamiento del sitio y de terceros para analizar
              el tráfico. Puedes aceptar todas o continuar solo con las necesarias.{" "}
              <a
                href="/politica-de-cookies"
                className="text-secondary underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Política de cookies
              </a>
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => save("necessary")}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all
                           text-on-surface-variant hover:text-white
                           border border-outline-variant/20 hover:border-outline-variant/40
                           bg-transparent hover:bg-white/5"
              >
                Solo necesarias
              </button>
              <button
                onClick={() => save("accepted")}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-opacity
                           hover:opacity-90 text-on-secondary bg-secondary"
              >
                Aceptar todo
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
