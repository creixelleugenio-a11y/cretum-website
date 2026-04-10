import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function NuestraVisionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-24 bg-background">
        <div className="max-w-4xl mx-auto px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Metodología</p>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-10">Nuestra Visión</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Nuestra visión es ser el gestor de activos alternativos de referencia en México y Latinoamérica, conectando el capital de nuestros clientes con las mejores oportunidades globales a través de un proceso de inversión disciplinado y transparente.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Creemos que la combinación de análisis fundamental riguroso, tecnología cuantitativa y una red de relaciones institucionales de primer nivel es la base para generar retornos superiores y preservar el capital de nuestros clientes en el largo plazo.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
