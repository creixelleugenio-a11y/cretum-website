import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="h-screen overflow-y-auto snap-y snap-mandatory">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <TeamSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
