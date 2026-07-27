import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HomeKPIsSection } from "@/components/HomeKPIsSection";
import { MethodologySection } from "@/components/MethodologySection";
import { CorporateStructureSection } from "@/components/CorporateStructureSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="h-screen overflow-y-auto [scroll-padding-top:4rem] md:[scroll-padding-top:7rem]">
      <Navbar />
      <div data-track-section="inicio-hero"><HeroSection /></div>
      <div data-track-section="inicio-kpis"><HomeKPIsSection /></div>
      <div data-track-section="inicio-metodologia"><MethodologySection /></div>
      <div data-track-section="inicio-estructura"><CorporateStructureSection /></div>
      <Footer />
    </div>
  );
};

export default Index;
