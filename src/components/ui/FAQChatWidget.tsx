"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    id: "tiempo",
    chip: "¿Cuánto tarda?",
    answer:
      "Para proyectos sencillos mostramos avances desde la primera semana. En proyectos medios, 2-4 semanas. Los más grandes, entre 6-8 semanas — siempre con entregas parciales.",
  },
  {
    id: "coste",
    chip: "¿Cuánto cuesta?",
    answer:
      "Depende del alcance. La consultoría inicial es gratuita y damos un presupuesto cerrado antes de empezar. Sin sorpresas, sin costes ocultos.",
  },
  {
    id: "herramientas",
    chip: "¿Cambio mis herramientas?",
    answer:
      "No. Nos integramos con lo que ya usas: Excel, SAP, HubSpot, Notion... Conectamos, no reemplazamos. Sin migraciones traumáticas.",
  },
  {
    id: "equipo",
    chip: "Mi equipo no es técnico",
    answer:
      "Todo lo que construimos viene con interfaz simple y formación incluida. Si saben usar WhatsApp, pueden usar nuestro software.",
  },
  {
    id: "postventa",
    chip: "¿Y después de entregar?",
    answer:
      "Soporte continuo y optimización. No desaparecemos tras el deploy. Monitorizamos, iteramos y escalamos contigo.",
  },
  {
    id: "inicio",
    chip: "¿Cómo empezamos?",
    answer:
      "Reserva una llamada gratuita de 30 minutos. Analizamos tu situación, definimos el alcance y enviamos propuesta en 48h.",
    isCta: true,
  },
];

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  isCta?: boolean;
}

export function FAQChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      text: "Hola, soy el asistente de Karakura Digital. ¿Qué te puedo explicar?",
    },
  ]);
  const [usedChips, setUsedChips] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setHasUnread(true), 4000);
      return () => clearTimeout(timer);
    }
    setHasUnread(false);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleChipClick(faq: (typeof FAQS)[number]) {
    if (isTyping) return;

    setUsedChips((prev) => new Set(prev).add(faq.id));
    setMessages((prev) => [
      ...prev,
      { id: `user-${faq.id}`, type: "user", text: faq.chip },
    ]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${faq.id}`,
          type: "bot",
          text: faq.answer,
          isCta: faq.isCta,
        },
      ]);
    }, 850);
  }

  const availableChips = FAQS.filter((f) => !usedChips.has(f.id));

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-40 flex flex-col items-end gap-3">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="glass-panel rounded-2xl overflow-hidden flex flex-col"
            style={{
              width: "min(340px, calc(100vw - 32px))",
              maxHeight: 480,
              border: "1px solid rgba(78,222,163,0.15)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(78,222,163,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                borderBottom: "1px solid rgba(78,222,163,0.1)",
                background: "rgba(78,222,163,0.04)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 select-none"
                style={{
                  background: "linear-gradient(135deg, #ff7a00 0%, #4edea3 100%)",
                  color: "#001711",
                }}
              >
                KD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-none truncate">
                  Karakura Digital
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-secondary text-xs">En línea</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-white hover:bg-white/10 transition-all"
                aria-label="Cerrar asistente"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ minHeight: 0 }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.type === "user"
                        ? "bg-primary-container/25 border border-primary-container/30 text-white rounded-br-sm"
                        : "bg-secondary/[0.07] border border-secondary/[0.12] text-on-surface rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                    {msg.isCta && (
                      <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="block mt-2 text-center py-1.5 px-3 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 text-secondary"
                        style={{
                          background: "rgba(78,222,163,0.15)",
                          border: "1px solid rgba(78,222,163,0.35)",
                        }}
                      >
                        Reservar llamada gratuita →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex justify-start"
                  >
                    <div
                      className="px-3.5 py-2.5 rounded-xl rounded-bl-sm flex items-center gap-1"
                      style={{
                        background: "rgba(78,222,163,0.07)",
                        border: "1px solid rgba(78,222,163,0.12)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-secondary"
                          animate={{ opacity: [0.25, 1, 0.25] }}
                          transition={{
                            duration: 0.85,
                            repeat: Infinity,
                            delay: i * 0.18,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {availableChips.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-3 shrink-0"
                  style={{ borderTop: "1px solid rgba(78,222,163,0.08)" }}
                >
                  <p className="text-xs text-on-surface-variant mb-2">
                    Preguntas frecuentes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availableChips.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => handleChipClick(faq)}
                        disabled={isTyping}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all
                                   bg-secondary/[0.08] border border-secondary/25 text-secondary
                                   hover:bg-secondary/[0.15] hover:border-secondary/40
                                   disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {faq.chip}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                !isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 py-3 shrink-0 text-center"
                    style={{ borderTop: "1px solid rgba(78,222,163,0.08)" }}
                  >
                    <p className="text-xs text-on-surface-variant">
                      ¿Más dudas? Cuéntanoslo directamente.
                    </p>
                    <a
                      href="#contact"
                      onClick={() => setIsOpen(false)}
                      className="inline-block mt-1 text-xs font-semibold text-secondary hover:opacity-75 transition-opacity"
                    >
                      Ir al contacto →
                    </a>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex items-center gap-2.5 pl-3 pr-4 h-11 rounded-full text-sm font-semibold text-secondary transition-colors"
        style={{
          background: isOpen
            ? "rgba(78,222,163,0.12)"
            : "linear-gradient(135deg, rgba(78,222,163,0.15) 0%, rgba(255,122,0,0.08) 100%)",
          border: "1px solid rgba(78,222,163,0.28)",
          boxShadow: "0 0 20px rgba(78,222,163,0.1)",
        }}
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente virtual"}
        aria-expanded={isOpen}
      >
        {/* Unread dot */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary-container"
              style={{ border: "2px solid #001711" }}
            />
          )}
        </AnimatePresence>

        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4v-4z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        <span className="whitespace-nowrap">{isOpen ? "Cerrar" : "¿Tienes dudas?"}</span>
      </motion.button>
    </div>
  );
}
