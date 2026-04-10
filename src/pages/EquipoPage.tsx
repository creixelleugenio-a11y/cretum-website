import { Navbar } from "@/components/Navbar";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";

const EquipoPage = () => {
  return (
    <div className="h-screen overflow-y-auto [scroll-padding-top:7rem]">
      <Navbar />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default EquipoPage;
