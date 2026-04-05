import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { MethodologySection } from "@/components/MethodologySection";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const AboutSection = lazy(() => import("@/components/AboutSection").then(m => ({ default: m.AboutSection })));

const Index = () => {
  return (
    <LanguageProvider>
      <div className="h-screen overflow-y-auto [scroll-padding-top:7rem]">
        <Navbar />
        <HeroSection />
        <Suspense fallback={<div className="snap-start min-h-screen" />}>
          <AboutSection />
        </Suspense>
        <ServicesSection />
        <MethodologySection />
        <TeamSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
