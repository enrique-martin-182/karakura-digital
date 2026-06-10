"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#services", label: "Servicios" },
    { href: "#process", label: "Proceso" },
    { href: "#solutions", label: "Soluciones" },
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
        <a href="#" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Karakura Digital" width={40} height={40} />
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary tracking-tight hidden sm:inline">
            Karakura Digital
          </span>
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-outline-variant/10 pb-6">
          <div className="flex flex-col space-y-4 px-gutter pt-4">
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
        </div>
      )}
    </nav>
  );
}
