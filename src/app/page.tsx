import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LocalImpact } from "@/components/sections/LocalImpact";

const Interactive3D = dynamic(() => import("@/components/sections/Interactive3D").then(m => ({ default: m.Interactive3D })));
const GapComparison = dynamic(() => import("@/components/sections/GapComparison").then(m => ({ default: m.GapComparison })));
const Services = dynamic(() => import("@/components/sections/Services").then(m => ({ default: m.Services })));
const Process = dynamic(() => import("@/components/sections/Process").then(m => ({ default: m.Process })));
const Results = dynamic(() => import("@/components/sections/Results").then(m => ({ default: m.Results })));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio").then(m => ({ default: m.Portfolio })));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })));
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA").then(m => ({ default: m.ContactCTA })));

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
