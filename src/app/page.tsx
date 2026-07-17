import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LocalImpact } from "@/components/sections/LocalImpact";

const SectionSkeleton = ({ minHeight = "400px" }: { minHeight?: string }) => (
  <div style={{ minHeight }} className="w-full" aria-hidden="true" />
);

const Interactive3D = dynamic(() => import("@/components/sections/Interactive3D").then(m => ({ default: m.Interactive3D })), { loading: () => <SectionSkeleton minHeight="600px" /> });
const GapComparison = dynamic(() => import("@/components/sections/GapComparison").then(m => ({ default: m.GapComparison })), { loading: () => <SectionSkeleton /> });
const Services = dynamic(() => import("@/components/sections/Services").then(m => ({ default: m.Services })), { loading: () => <SectionSkeleton minHeight="500px" /> });
const TechStack = dynamic(() => import("@/components/sections/TechStack").then(m => ({ default: m.TechStack })), { loading: () => <SectionSkeleton minHeight="120px" /> });
const BentoServices = dynamic(() => import("@/components/sections/BentoServices").then(m => ({ default: m.BentoServices })), { loading: () => <SectionSkeleton minHeight="500px" /> });
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
        <Interactive3D />
        <LocalImpact />
        <GapComparison />
        <Services />
        <BentoServices />
        <TechStack />
        <Process />
        <Results />
        <Portfolio />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
