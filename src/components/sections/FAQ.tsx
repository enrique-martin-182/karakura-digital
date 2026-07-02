"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    question: "¿Cuánto tiempo toma ver resultados?",
    answer:
      "Para una web o un producto sencillo, podemos ir mostrándote partes del proceso desde la primera semana, dependiendo del volumen de trabajo que tenga nuestro equipo de desarrollo. En proyectos más largos se ven resultados en las primeras 2-4 semanas, y los de mayor envergadura entre 6-8 semanas.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    question: "¿Necesito cambiar mis herramientas actuales?",
    answer:
      "No. Nos integramos con lo que ya usas (Excel, SAP, HubSpot, Notion, lo que sea). Sin migración traumática. Conectamos, no reemplazamos.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    question: "¿Qué pasa si mi equipo no es técnico?",
    answer:
      "Todo lo que construimos viene con interfaz simple y capacitación incluida. Si pueden usar WhatsApp, pueden usar nuestro software.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende del alcance. La consultoría inicial es gratuita y te damos un presupuesto cerrado antes de empezar. Sin sorpresas, sin costes ocultos.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    question: "¿Qué pasa después de la entrega?",
    answer:
      "Soporte continuo + optimización. No desaparecemos tras el deploy. Monitorizamos, iteramos y escalamos contigo.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-outline-variant/20 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 py-6 text-left group focus-visible:outline-2 focus-visible:outline-primary-container rounded"
        aria-expanded={isOpen}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-primary-container/20 text-primary-container shadow-[0_0_15px_rgba(255,122,0,0.2)]"
              : "bg-white/5 text-on-surface-variant group-hover:bg-primary-container/10 group-hover:text-primary-container"
          }`}
        >
          {faq.icon}
        </div>
        <span className="text-white font-semibold text-body-lg group-hover:text-primary pr-4 flex-1">
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 text-on-surface-variant shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-on-surface-variant text-body-md leading-relaxed pb-6 pl-14">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-section relative" aria-label="Preguntas frecuentes">
      <div className="max-w-[800px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader headline="Preguntas que ya te estás haciendo" />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass-panel rounded-2xl p-6 md:p-10">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
