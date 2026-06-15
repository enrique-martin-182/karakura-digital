"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { MapPin, Users, Zap, Globe } from "lucide-react";

const impactStats = [
  {
    icon: <Users className="w-6 h-6" />,
    label: "Comercios Apoyados",
    value: "+50",
    color: "text-primary-container",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    label: "Eficiencia Operativa",
    value: "+40%",
    color: "text-secondary",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    label: "Alcance Digital",
    value: "Global",
    color: "text-primary-container",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    label: "Foco Local",
    value: "Córdoba",
    color: "text-secondary",
  },
];

export function LocalImpact() {
  return (
    <section className="py-section bg-grid-pattern relative" id="iniciativa">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader
            overline="Nuestra Iniciativa"
            overlineColor="orange"
            headline="Fortaleciendo el Corazón Digital de Córdoba"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
              ¿Por qué Córdoba? Porque creemos en el potencial de nuestra tierra.
            </h3>
            <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Karakura Digital no es solo una agencia; es una iniciativa nacida para transformar la manera en que los negocios cordobeses interactúan con el mundo digital.
              España está en plena transformación, y queremos que Córdoba sea el referente de esta evolución.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 border border-primary-container/30">
                  <Zap className="w-5 h-5 text-primary-container" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Facilidad Operativa</h4>
                  <p className="text-on-surface-variant text-sm">Simplificamos las tareas administrativas y de gestión mediante automatización inteligente.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Mayor Alcance</h4>
                  <p className="text-on-surface-variant text-sm">Llevamos tu escaparate de la Judería o de las Tendillas a pantallas de todo el mundo.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <StaggerContainer className="grid grid-cols-2 gap-4 md:gap-6">
            {impactStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <GlassCard className="p-6 md:p-8 text-center" hover>
                  <div className={`flex justify-center mb-4 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-2">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs md:text-sm uppercase tracking-widest text-on-surface-variant/70 font-bold">
                    {stat.label}
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
