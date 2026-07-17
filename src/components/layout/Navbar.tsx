"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

function openCommandPalette() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
  );
}

function CommandPaletteAffordance() {
  const [isMac, setIsMac] = useState(false);
  const [pulse, setPulse] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  // Every 10 s: trigger a subtle badge lift to attract attention
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 10_000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <button
      onClick={openCommandPalette}
      aria-label="Abrir paleta de comandos"
      className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg
                 border border-outline-variant/20 bg-surface-variant/10
                 hover:bg-surface-variant/20 hover:border-outline-variant/40
                 transition-all duration-200 text-on-surface-variant hover:text-on-surface
                 group"
    >
      <svg
        aria-hidden="true"
        className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
        fill="none" stroke="currentColor" strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <span className="text-xs font-medium tracking-wide">Búsqueda</span>
      <motion.kbd
        aria-hidden="true"
        animate={pulse
          ? { y: -3, boxShadow: "0 4px 0 0 rgba(0,0,0,0.5)", opacity: 1 }
          : { y: 0,  boxShadow: "0 2px 0 0 rgba(0,0,0,0.4)", opacity: 0.75 }
        }
        transition={{ type: "spring", stiffness: 500, damping: 22, mass: 0.4 }}
        className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px]
                   font-mono font-medium leading-none
                   bg-surface-variant/30 border border-outline-variant/25
                   text-on-surface-variant/70 select-none"
        style={{ boxShadow: "0 2px 0 0 rgba(0,0,0,0.4)" }}
      >
        {isMac ? "⌘" : "Ctrl"} K
      </motion.kbd>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const prefix = isHome ? "" : "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: `${prefix}#iniciativa`, label: "Iniciativa" },
    { href: `${prefix}#services`, label: "Servicios" },
    { href: `${prefix}#process`, label: "Proceso" },
    { href: `${prefix}#results`, label: "Resultados" },
    { href: `${prefix}#portfolio`, label: "Portfolio" },
  ];

  return (
    <nav
      aria-label="Navegación principal"
      className={`fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-outline-variant/10 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-gutter max-w-[1280px] mx-auto h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/KD LOGO 3.png" alt="Karakura Digital logo" width={40} height={40} className="rounded-full" />
          <Image src="/assets/logo-kd.png" alt="Karakura Digital" width={180} height={40} className="hidden sm:block object-contain" />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-white transition-all text-body-md"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <CommandPaletteAffordance />
          <Button href="#contact" className="px-6 py-2.5 text-sm">
            Contáctanos
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-on-surface p-2 hover:text-white transition-colors"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          <div className="w-6 h-6 flex flex-col items-center justify-center gap-1.5">
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-outline-variant/10 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 px-gutter pt-4 pb-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-on-surface-variant hover:text-white transition-colors py-2 text-body-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="bg-primary-container text-white px-6 py-3 rounded-xl text-label-md font-semibold text-center mt-2"
              >
                Contáctanos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
