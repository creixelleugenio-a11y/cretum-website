import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HomeKPIsSection } from "@/components/HomeKPIsSection";
import { MethodologySection } from "@/components/MethodologySection";
import { CorporateStructureSection } from "@/components/CorporateStructureSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="h-screen overflow-y-auto [scroll-padding-top:7rem]">
      <Navbar />
      <HeroSection />
      <HomeKPIsSection />
      <MethodologySection />
      <CorporateStructureSection />
      <Footer />
    </div>
  );
};

export default Index;
