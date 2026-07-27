import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { VentajasDiamante } from "@/components/VentajasDiamante";
import { useLanguage } from "@/contexts/LanguageContext";

export default function VentajasPage() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 sm:pt-32 md:pt-56 pb-16 md:pb-40 bg-background">
        {/* ══ Header ══════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
              {t("ventajas.kicker")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              {t("ventajas.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              {t("ventajas.subtitle")}
            </p>
          </Reveal>
        </div>

        {/* ══ Diamante de Ventajas ═══════════════════════════════ */}
        <div className="max-w-[70rem] mx-auto px-4 md:px-8 mt-16 md:mt-20">
          <VentajasDiamante />
        </div>
      </main>
      <Footer />
    </>
  );
}
