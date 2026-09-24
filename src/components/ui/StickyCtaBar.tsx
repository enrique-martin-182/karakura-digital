"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const SESSION_KEY = "kd_cta_dismissed";

export function StickyCtaBar() {
  const t = useTranslations("stickyBar");
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setDismissed(true);
        return;
      }
    } catch { /* sessionStorage blocked */ }

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.4) setVisible(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function dismiss() {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed top-20 left-0 right-0 z-40 flex items-center justify-center
                     gap-3 px-4 pr-12 py-2.5"
          style={{
            background: "rgba(0, 23, 17, 0.88)",
            borderBottom: "1px solid rgba(78,222,163,0.18)",
            backdropFilter: "blur(16px)",
          }}
          role="banner"
          aria-label="Llamada a la acción"
        >
          <p className="text-sm text-center">
            <span className="text-white font-semibold">{t("text")}</span>
            <span className="text-on-surface-variant hidden sm:inline">
              {" "}{t("subtitle")}
            </span>
          </p>

          <a
            href="/#contact"
            className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold
                       text-on-secondary bg-secondary hover:opacity-90 transition-opacity
                       whitespace-nowrap"
          >
            {t("cta")}
          </a>

          <button
            onClick={dismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center
                       justify-center rounded-lg text-on-surface-variant hover:text-white
                       hover:bg-white/10 transition-all"
            aria-label={t("close")}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
