import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LocalImpact } from "@/components/sections/LocalImpact";

const SectionSkeleton = ({ minHeight = "400px" }: { minHeight?: string }) => (
  <div style={{ minHeight }} className="w-full" aria-hidden="true" />
);

const HeroWebGL   = dynamic(() => import("@/components/sections/HeroWebGL").then(m => ({ default: m.HeroWebGL })), { loading: () => <SectionSkeleton minHeight="100vh" /> });
const Interactive3D = dynamic(() => import("@/components/sections/Interactive3D").then(m => ({ default: m.Interactive3D })), { loading: () => <SectionSkeleton minHeight="600px" /> });
const GapComparison = dynamic(() => import("@/components/sections/GapComparison").then(m => ({ default: m.GapComparison })), { loading: () => <SectionSkeleton /> });
const Services = dynamic(() => import("@/components/sections/Services").then(m => ({ default: m.Services })), { loading: () => <SectionSkeleton minHeight="500px" /> });
const TechStack = dynamic(() => import("@/components/sections/TechStack").then(m => ({ default: m.TechStack })), { loading: () => <SectionSkeleton minHeight="120px" /> });
const TechStackPhysics = dynamic(() => import("@/components/sections/TechStackPhysics").then(m => ({ default: m.TechStackPhysics })), { loading: () => <SectionSkeleton minHeight="320px" /> });
const BentoServices = dynamic(() => import("@/components/sections/BentoServices").then(m => ({ default: m.BentoServices })), { loading: () => <SectionSkeleton minHeight="500px" /> });
const InteractiveDataBackground = dynamic(() => import("@/components/effects/InteractiveDataBackground").then(m => ({ default: m.InteractiveDataBackground })), { loading: () => null });
const B2BTerminalPreview = dynamic(() => import("@/components/sections/B2BTerminalPreview").then(m => ({ default: m.B2BTerminalPreview })), { loading: () => <SectionSkeleton minHeight="400px" /> });
const Process = dynamic(() => import("@/components/sections/Process").then(m => ({ default: m.Process })), { loading: () => <SectionSkeleton /> });
const Results = dynamic(() => import("@/components/sections/Results").then(m => ({ default: m.Results })), { loading: () => <SectionSkeleton /> });
const Portfolio = dynamic(() => import("@/components/sections/Portfolio").then(m => ({ default: m.Portfolio })), { loading: () => <SectionSkeleton minHeight="600px" /> });
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })), { loading: () => <SectionSkeleton /> });
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA").then(m => ({ default: m.ContactCTA })), { loading: () => <SectionSkeleton /> });
const DesignCatalog = dynamic(() => import("@/components/sections/DesignCatalog"), { loading: () => <SectionSkeleton minHeight="600px" /> });

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        <Hero />
        <HeroWebGL />
        <Interactive3D />
        <LocalImpact />
        <GapComparison />
        <Services />
        <BentoServices />

        {/* Data topology demo section */}
        <section className="relative py-32 overflow-hidden">
          <InteractiveDataBackground />
          {/* Gradient vignette so edges don't look cut off */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, var(--color-background) 100%)" }}
          />
          <div className="relative z-10 flex flex-col items-center gap-12 px-gutter">
            <div className="text-center space-y-2 max-w-xl">
              <p className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: "rgba(78,222,163,0.5)" }}>
                Automatización B2B en tiempo real
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Tu pipeline de datos,<br />corriendo ahora mismo.
              </h2>
            </div>
            <B2BTerminalPreview />
          </div>
        </section>

        <TechStackPhysics />
        <TechStack />
        <Process />
        <Results />
        <Portfolio />
        <DesignCatalog />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
