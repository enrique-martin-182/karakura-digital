"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const faqs = [
  {
    question: "¿Cuánto tiempo toma ver resultados?",
    answer:
      "Las primeras automatizaciones están en producción en 2-4 semanas. Proyectos completos de software: 6-12 semanas dependiendo del alcance.",
  },
  {
    question: "¿Necesito cambiar mis herramientas actuales?",
    answer:
      "No. Nos integramos con lo que ya usas (Excel, SAP, HubSpot, Notion, lo que sea). Sin migración traumática. Conectamos, no reemplazamos.",
  },
  {
    question: "¿Qué pasa si mi equipo no es técnico?",
    answer:
      "Todo lo que construimos viene con interfaz simple y capacitación incluida. Si pueden usar WhatsApp, pueden usar nuestro software.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende del alcance. La consultoría inicial es gratuita y te damos un presupuesto cerrado antes de empezar. Sin sorpresas, sin costes ocultos.",
  },
  {
    question: "¿Qué pasa después de la entrega?",
    answer:
      "Soporte continuo + optimización. No desaparecemos tras el deploy. Monitorizamos, iteramos y escalamos contigo.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-outline-variant/20 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-6 text-left group focus-visible:outline-2 focus-visible:outline-primary-container rounded"
        aria-expanded={isOpen}
      >
        <span className="text-white font-semibold text-body-lg group-hover:text-primary pr-4">
          {question}
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
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-48 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-on-surface-variant text-body-md leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-section relative">
      <div className="max-w-[800px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader headline="Preguntas que ya te estás haciendo" />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass-panel rounded-2xl p-6 md:p-10">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.question}
                answer={faq.answer}
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
