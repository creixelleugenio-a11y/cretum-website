import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AboutSection = lazy(() => import("@/components/AboutSection").then(m => ({ default: m.AboutSection })));

const NosotrosPage = () => {
  return (
    <div className="h-screen overflow-y-auto [scroll-padding-top:7rem]">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <AboutSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default NosotrosPage;
