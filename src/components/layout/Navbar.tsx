"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#iniciativa", label: "Iniciativa" },
    { href: "#services", label: "Servicios" },
    { href: "#process", label: "Proceso" },
    { href: "#results", label: "Resultados" },
    { href: "#portfolio", label: "Portfolio" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-outline-variant/10 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-gutter max-w-[1280px] mx-auto h-20">
        <a href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Icono" width={40} height={40} />
          <Image src="/assets/logo-kd.png" alt="Karakura Digital" width={180} height={40} className="hidden sm:block object-contain" />
        </a>

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

        <Button href="#contact" className="hidden md:inline-flex px-6 py-2.5 text-sm">
          Contáctanos
        </Button>

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
