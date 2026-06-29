"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { MapPin, Users, Zap, Globe, Sparkles } from "lucide-react";

const impactStats = [
  {
    icon: <Users className="w-6 h-6" />,
    label: "Comercios Apoyados",
    value: "+50",
    color: "text-primary-container",
    bgColor: "bg-primary-container/10",
    borderColor: "border-primary-container/20",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    label: "Eficiencia Operativa",
    value: "+40%",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    label: "Alcance Digital",
    value: "Global",
    color: "text-primary-container",
    bgColor: "bg-primary-container/10",
    borderColor: "border-primary-container/20",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    label: "Sede Central",
    value: "Córdoba",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
  },
];

const features = [
  {
    icon: <Zap className="w-5 h-5 text-primary-container" />,
    iconBg: "bg-primary-container/20 border-primary-container/30",
    title: "Facilidad Operativa",
    description: "Simplificamos las tareas administrativas y de gestión mediante automatización inteligente.",
  },
  {
    icon: <Users className="w-5 h-5 text-secondary" />,
    iconBg: "bg-secondary/20 border-secondary/30",
    title: "Mayor Alcance",
    description: "Llevamos tu escaparate local a pantallas de todo el mundo, estés donde estés en España.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-primary-container" />,
    iconBg: "bg-primary-container/20 border-primary-container/30",
    title: "Tecnología Accesible",
    description: "Herramientas modernas adaptadas a negocios de cualquier tamaño, sin barreras técnicas.",
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
            headline="Impulsando la Transformación Digital en España"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
              Nacidos en Córdoba, con visión nacional.
            </h3>
            <p className="text-body-lg text-on-surface-variant mb-10 leading-relaxed">
              Karakura Digital es una iniciativa nacida en Córdoba para transformar la manera en que los negocios de toda España interactúan con el mundo digital.
              El tejido empresarial del país está en plena evolución, y queremos ser parte activa de ese cambio.
            </p>

            <div className="space-y-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 items-start p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full ${feature.iconBg} flex items-center justify-center shrink-0 border`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{feature.title}</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <StaggerContainer className="grid grid-cols-2 gap-4 md:gap-6">
            {impactStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <GlassCard className="p-6 md:p-8 text-center" hover>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} ${stat.color} border ${stat.borderColor} flex items-center justify-center mx-auto mb-4`}>
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
