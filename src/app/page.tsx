import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LocalImpact } from "@/components/sections/LocalImpact";
import { LazySection } from "@/components/effects/LazySection";

const SectionSkeleton = ({ minHeight = "400px" }: { minHeight?: string }) => (
  <div style={{ minHeight }} className="w-full" aria-hidden="true" />
);

const HeroWebGL   = dynamic(() => import("@/components/sections/HeroWebGL").then(m => ({ default: m.HeroWebGL })), { loading: () => <SectionSkeleton minHeight="100vh" /> });
const Interactive3D = dynamic(() => import("@/components/sections/Interactive3D").then(m => ({ default: m.Interactive3D })), { loading: () => <SectionSkeleton minHeight="600px" /> });
const GapComparison = dynamic(() => import("@/components/sections/GapComparison").then(m => ({ default: m.GapComparison })), { loading: () => <SectionSkeleton /> });
const Services = dynamic(() => import("@/components/sections/Services").then(m => ({ default: m.Services })), { loading: () => <SectionSkeleton minHeight="500px" /> });
const TechStack = dynamic(() => import("@/components/sections/TechStack").then(m => ({ default: m.TechStack })), { loading: () => <SectionSkeleton minHeight="120px" /> });
const InteractiveDataBackground = dynamic(() => import("@/components/effects/InteractiveDataBackground").then(m => ({ default: m.InteractiveDataBackground })), { loading: () => null });
const B2BTerminalPreview = dynamic(() => import("@/components/sections/B2BTerminalPreview").then(m => ({ default: m.B2BTerminalPreview })), { loading: () => <SectionSkeleton minHeight="400px" /> });
const Process = dynamic(() => import("@/components/sections/Process").then(m => ({ default: m.Process })), { loading: () => <SectionSkeleton /> });
const Results = dynamic(() => import("@/components/sections/Results").then(m => ({ default: m.Results })), { loading: () => <SectionSkeleton /> });
const Portfolio = dynamic(() => import("@/components/sections/Portfolio").then(m => ({ default: m.Portfolio })), { loading: () => <SectionSkeleton minHeight="600px" /> });
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })), { loading: () => <SectionSkeleton /> });
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA").then(m => ({ default: m.ContactCTA })), { loading: () => <SectionSkeleton /> });

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        <Hero />

        {/* Three.js shader — gated: only loads when 400px from viewport */}
        <LazySection rootMargin="400px" minHeight="100vh">
          <HeroWebGL />
        </LazySection>

        {/* Spline 3D (~2MB runtime) — gated */}
        <LazySection rootMargin="300px" minHeight="600px">
          <Interactive3D />
        </LazySection>

        <LocalImpact />
        <GapComparison />
        <Services />

        {/* Data topology demo section — canvas heavy, gated */}
        <LazySection rootMargin="200px" minHeight="500px">
          <section className="relative py-32 overflow-hidden">
            <InteractiveDataBackground />
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
        </LazySection>

        <TechStack />
        <Process />

        <LazySection rootMargin="200px" minHeight="400px">
          <Results />
        </LazySection>

        <LazySection rootMargin="200px" minHeight="600px">
          <Portfolio />
        </LazySection>

        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
