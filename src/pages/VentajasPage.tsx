import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

const ventajas = [
  {
    title: "Acceso Institucional",
    desc: "Nuestra red global nos permite ofrecer acceso a fondos, co-inversiones y oportunidades pre-IPO que normalmente están reservadas a grandes instituciones.",
  },
  {
    title: "Análisis Multidimensional",
    desc: "Combinamos análisis macro, fundamental y cuantitativo para construir portafolios robustos con cobertura en periodos de volatilidad.",
  },
  {
    title: "Plataforma Multiestrategia",
    desc: "Capital privado, mercados públicos y gestión patrimonial bajo un mismo paraguas, con la flexibilidad de adaptarnos al perfil de cada cliente.",
  },
  {
    title: "Tecnología Cuantitativa",
    desc: "A través de Trendrating, monitoreamos más de 17,000 activos en 12 regiones con 8 indicadores propietarios para anticipar tendencias con mayor precisión.",
  },
];

export default function VentajasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-24 bg-background">
        <div className="max-w-4xl mx-auto px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Metodología</p>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-10">Ventajas Competitivas</h1>
          </Reveal>
          <div className="space-y-8 mt-4">
            {ventajas.map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border border-border/40 rounded-xl p-8">
                  <h3 className="font-semibold text-foreground text-xl mb-3">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
