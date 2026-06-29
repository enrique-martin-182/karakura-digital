"use client";

import { motion, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GradientBlob } from "@/components/effects/GradientBlob";

export function Hero() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const yOrange = useTransform(scrollY, [0, 800], [0, 160]);
  const yGreen = useTransform(scrollY, [0, 800], [0, -120]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Remotion-generated circuit animation background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-bg.webm" type="video/webm" />
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Aurora Effect */}
      <div className="aurora-container">
        <div className="aurora-blob text-primary/20 w-[600px] h-[600px] top-[-10%] left-[-10%]" />
        <div className="aurora-blob text-secondary/20 w-[500px] h-[500px] bottom-[-10%] right-[-10%] animation-delay-2000" />
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/50" />

      <GradientBlob
        color="orange"
        position="top-1/4 left-1/4"
        y={shouldReduceMotion ? undefined : yOrange}
      />
      <GradientBlob
        color="green"
        position="bottom-1/4 right-1/4"
        y={shouldReduceMotion ? undefined : yGreen}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter w-full relative z-10 py-16 md:py-24">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-variant/70 text-white border border-white/10 mb-8 shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-label-sm uppercase tracking-widest text-on-surface-variant font-extrabold">
                Desde Córdoba al mundo
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-headline-mobile md:text-headline-xl text-gradient mb-8 leading-[1.1] tracking-tight">
              Transformamos negocios con tecnología que <span className="text-primary-container inline-block">escala sin fronteras</span>.
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-body-lg text-on-surface-variant/90 mb-12 max-w-2xl md:text-xl leading-relaxed font-medium">
              Desde Córdoba, creamos software, automatización e IA
              que simplifican operaciones y multiplican tu alcance digital. Sin fronteras.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <Button href="#contact" className="group">
                Unirse a la Iniciativa
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Button>
              <Button variant="secondary" href="#services">
                Nuestros Servicios
              </Button>
            </div>
            <motion.p
              className="text-sm text-on-surface-variant/60 mt-6 flex items-center gap-2"
              variants={itemVariants}
            >
              <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Impulso local · Sin cuotas ocultas · Tecnología de vanguardia
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
