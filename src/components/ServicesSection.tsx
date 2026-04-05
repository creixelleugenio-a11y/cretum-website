import { useState, lazy, Suspense } from "react";
import { Reveal } from "@/components/Reveal";
import skyscrapersImg from "@/assets/trading-screens.jpg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface Partner {
  name: string;
  logo: string;
  role: string;
  desc: string;
}

const partners: Partner[] = [
  {
    name: "BNY Mellon",
    logo: "/logos/bny-mellon.png",
    role: "Custodia y administración de activos",
    desc: "Uno de los bancos custodios más grandes del mundo con $50T+ en activos bajo custodia. Provee servicios de liquidación, custodia y administración de fondos para Cretum.",
  },
  {
    name: "NAV Consulting",
    logo: "/logos/nav-consulting-alt.svg",
    role: "Administración de fondos",
    desc: "Firma especializada en cálculo de NAV (Net Asset Value), contabilidad de fondos y reporting para gestoras de activos. Garantiza precisión y transparencia en la valuación diaria.",
  },
  {
    name: "Deloitte",
    logo: "/logos/deloitte.png",
    role: "Auditoría externa",
    desc: "Big 4 global con presencia en 150+ países. Provee auditoría independiente de los estados financieros de los fondos de Cretum, garantizando estándares internacionales.",
  },
  {
    name: "Bloomberg",
    logo: "/logos/bloomberg.png",
    role: "Datos de mercado y análisis",
    desc: "Proveedor líder de datos financieros en tiempo real, noticias y analítica. La terminal Bloomberg es la herramienta central del equipo de inversión de Cretum.",
  },
  {
    name: "Goldman Sachs",
    logo: "/logos/goldman-sachs.png",
    role: "Prime broker y ejecución",
    desc: "Banco de inversión global líder. Actúa como prime broker y contraparte de ejecución para operaciones de renta variable y derivados.",
  },
  {
    name: "UBS",
    logo: "/logos/ubs.png",
    role: "Prime broker y custodia",
    desc: "Banco suizo con presencia en 50+ países. Provee servicios de prime brokerage, custodia internacional y acceso a mercados globales.",
  },
  {
    name: "Morgan Stanley",
    logo: "/logos/morgan-stanley.svg",
    role: "Ejecución y brokerage",
    desc: "Banco de inversión global con capacidad de ejecución en todos los mercados. Cretum lo utiliza como intermediario bursátil para optimizar el precio de ejecución.",
  },
  {
    name: "Capital Economics",
    logo: "/logos/capital-economics.png",
    role: "Investigación macroeconómica",
    desc: "Firma independiente de análisis macroeconómico con cobertura de 200+ economías. Sus reportes fundamentan el análisis top-down del equipo de inversión de Cretum.",
  },
  {
    name: "RGA Consulting",
    logo: "/logos/rga-consulting.png",
    role: "Asesoría fiscal y contable",
    desc: "Firma de consultoría especializada en contabilidad y planeación fiscal para empresas del sector financiero. Provee asesoría regulatoria y cumplimiento fiscal.",
  },
  {
    name: "Trendrating",
    logo: "/logos/trendrating.png",
    role: "Plataforma de análisis cuantitativo",
    desc: "Fintech suiza con algoritmos de machine learning para identificar tendencias en 17,000+ activos. Cretum licencia su plataforma para análisis cuantitativo sistemático.",
  },
];

const GVVModal = lazy(() => import("@/components/GVVModal").then(m => ({ default: m.GVVModal })));
const MVPModal = lazy(() => import("@/components/MVPModal").then(m => ({ default: m.MVPModal })));
const TrendratingModal = lazy(() => import("@/components/TrendratingModal").then(m => ({ default: m.TrendratingModal })));
const WealthManagementModal = lazy(() => import("@/components/WealthManagementModal").then(m => ({ default: m.WealthManagementModal })));


export function ServicesSection() {
  const [gvvOpen, setGvvOpen] = useState(false);
  const [mvpOpen, setMvpOpen] = useState(false);
  const [trOpen, setTrOpen] = useState(false);
  const [wmOpen, setWmOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const { t } = useLanguage();

  const services = [
  { title: "GVV", subtitle: "Growth · Value · Volatility", onClick: () => setGvvOpen(true) },
  { title: "MVP Private Equity", subtitle: "", onClick: () => setMvpOpen(true) },
  { title: "Trendrating Licensing", subtitle: "", onClick: () => setTrOpen(true) },
  { title: "Wealth Management", subtitle: "", onClick: () => setWmOpen(true) }];


  return (
    <section id="servicios" className="pt-24 pb-16 bg-background relative overflow-hidden">
      <div className="hidden lg:block absolute right-0 top-0 w-[32%] h-full pointer-events-none select-none">
        <img src={skyscrapersImg} alt="" className="w-full h-full object-cover object-center grayscale opacity-15 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background" />
      </div>
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Two-column: title left, service list right */}
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start mb-12">

          {/* Left: label + title */}
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                {t("nav.servicios")}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-snug">
                <em className="text-primary not-italic font-bold">Cretum Partners</em>{" "}
                {t("services.intro")}
              </h2>
            </Reveal>
          </div>

          {/* Right: service list */}
          <div className="flex flex-col gap-2">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.12}>
                <button
                  onClick={service.onClick}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className="text-sm text-muted-foreground mt-0.5">{service.subtitle}</p>
                    )}
                  </div>
                  <span className="ml-6 shrink-0 w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary text-lg font-light group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">+</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Partners marquee */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            {t("met.partners.title")}
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee-fast w-max items-center">
              {[...partners, ...partners].map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPartner(partners.find(x => x.name === p.name) ?? null)}
                  className="shrink-0 h-14 w-40 rounded-xl flex items-center justify-center px-4 shadow-sm hover:shadow-md hover:scale-[1.04] transition-all duration-200"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="object-contain"
                    style={{ maxHeight: "32px", maxWidth: "112px" }}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      if (img.parentElement)
                        img.parentElement.innerHTML = `<span style="font-size:12px;font-weight:600;color:#64748b">${p.name}</span>`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <GVVModal open={gvvOpen} onOpenChange={setGvvOpen} />
        <MVPModal open={mvpOpen} onOpenChange={setMvpOpen} />
        <TrendratingModal open={trOpen} onOpenChange={setTrOpen} />
        <WealthManagementModal open={wmOpen} onOpenChange={setWmOpen} />
      </Suspense>

      <Dialog open={!!selectedPartner} onOpenChange={(v) => !v && setSelectedPartner(null)}>
        <DialogContent className="max-w-sm w-[calc(100vw-2rem)]">
          {selectedPartner && (
            <div className="pt-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-24 rounded-lg border border-border bg-white flex items-center justify-center px-3 shrink-0">
                  <img src={selectedPartner.logo} alt={selectedPartner.name} className="object-contain" style={{ maxHeight: "28px", maxWidth: "80px" }} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base leading-tight">{selectedPartner.name}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">{selectedPartner.role}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedPartner.desc}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>);

}
