import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { X } from "lucide-react";

type Socio = {
  name: string;
  logo: string;
  scale?: number;
  category: string;
  description: string;
  facts: { label: string; value: string }[];
  services: string[];
  url: string;
};

const SOCIOS: Socio[] = [
  {
    name: "Deloitte",
    logo: "/logos/deloitte-new.png",
    scale: 1.6,
    category: "AUDITORÍA Y CONSULTORÍA",
    description: "Una de las cuatro grandes firmas de servicios profesionales del mundo. Con presencia en más de 150 países y más de 450,000 profesionales, ofrece servicios de auditoría, consultoría estratégica, asesoría fiscal y gestión de riesgos a corporaciones, gobiernos e instituciones financieras de todos los sectores.",
    facts: [
      { label: "Fundada",    value: "1845" },
      { label: "Sede",       value: "Londres, Reino Unido" },
      { label: "Empleados",  value: "+450,000" },
      { label: "Presencia",  value: "+150 países" },
    ],
    services: ["Auditoría", "Consultoría estratégica", "Asesoría fiscal", "Gestión de riesgos", "Servicios legales"],
    url: "https://www.deloitte.com",
  },
  {
    name: "Bloomberg",
    logo: "/logos/bloomberg-new.png",
    category: "DATOS E INTELIGENCIA FINANCIERA",
    description: "Empresa global de medios y tecnología financiera fundada por Michael Bloomberg en 1981. Opera el Bloomberg Terminal, el sistema de datos e información financiera en tiempo real más utilizado por profesionales de inversión, con cobertura de más de 35 millones de indicadores financieros en todo el mundo.",
    facts: [
      { label: "Fundada",    value: "1981" },
      { label: "Sede",       value: "Nueva York, EE.UU." },
      { label: "Empleados",  value: "+20,000" },
      { label: "Terminales", value: "+325,000 activas" },
    ],
    services: ["Bloomberg Terminal", "Análisis de datos", "Noticias financieras", "Índices de mercado", "Analytics"],
    url: "https://www.bloomberg.com",
  },
  {
    name: "Goldman Sachs",
    logo: "/logos/goldman-sachs.png",
    scale: 1.2,
    category: "BANCA DE INVERSIÓN",
    description: "Banco de inversión global fundado en 1869 con sede en Nueva York. Es uno de los bancos de inversión más influyentes del mundo, ofreciendo servicios de banca corporativa, trading de valores, gestión de activos y financiamiento a corporaciones, gobiernos e instituciones en más de 40 países.",
    facts: [
      { label: "Fundado",    value: "1869" },
      { label: "Sede",       value: "Nueva York, EE.UU." },
      { label: "Activos",    value: "$1.6 billones" },
      { label: "Empleados",  value: "+45,000" },
    ],
    services: ["Banca de inversión", "Renta variable", "Renta fija", "Gestión de activos", "Prime brokerage"],
    url: "https://www.goldmansachs.com",
  },
  {
    name: "UBS",
    logo: "/logos/ubs.png",
    category: "GESTIÓN DE ACTIVOS",
    description: "Banco multinacional suizo y mayor gestor de patrimonio privado del mundo. Con sede en Zúrich y Basilea, administra más de $5 billones en activos bajo gestión y ofrece servicios de wealth management, banca de inversión y gestión de activos institucionales para clientes en más de 50 países.",
    facts: [
      { label: "Fundado",    value: "1862" },
      { label: "Sede",       value: "Zúrich, Suiza" },
      { label: "AUM",        value: "+$5 billones" },
      { label: "Empleados",  value: "+72,000" },
    ],
    services: ["Wealth management", "Banca de inversión", "Gestión de activos", "Banca privada", "Mercados globales"],
    url: "https://www.ubs.com",
  },
  {
    name: "Morgan Stanley",
    logo: "/logos/morgan-stanley-new.png",
    scale: 2.0,
    category: "BANCA DE INVERSIÓN",
    description: "Banco de inversión global fundado en 1935 con sede en Nueva York. Reconocido como uno de los bancos de inversión más importantes del mundo, ofrece servicios de banca corporativa, renta variable, renta fija, gestión de activos y wealth management a clientes institucionales y corporativos en más de 40 países.",
    facts: [
      { label: "Fundado",    value: "1935" },
      { label: "Sede",       value: "Nueva York, EE.UU." },
      { label: "Activos",    value: "$1.2 billones" },
      { label: "Empleados",  value: "+80,000" },
    ],
    services: ["Banca de inversión", "Renta variable", "Renta fija", "Wealth management", "Gestión de activos"],
    url: "https://www.morganstanley.com",
  },
  {
    name: "Capital Economics",
    logo: "/logos/capital-economics.png",
    scale: 1.4,
    category: "INVESTIGACIÓN MACROECONÓMICA",
    description: "Firma independiente de investigación económica fundada en 1999 en Londres. Considerada una de las firmas de análisis económico más influyentes del mundo, produce pronósticos y análisis macroeconómicos sobre más de 40 economías, con especial enfoque en política monetaria, mercados financieros y tendencias globales.",
    facts: [
      { label: "Fundada",    value: "1999" },
      { label: "Sede",       value: "Londres, Reino Unido" },
      { label: "Cobertura",  value: "+40 economías" },
      { label: "Clientes",   value: "+1,500 institucionales" },
    ],
    services: ["Análisis macroeconómico", "Pronósticos de mercado", "Investigación sectorial", "Consultoría económica", "Reportes especializados"],
    url: "https://www.capitaleconomics.com",
  },
  {
    name: "RGA Consulting",
    logo: "/logos/rga-new.png",
    scale: 1.4,
    category: "CONSULTORÍA FISCAL Y CONTABLE",
    description: "Firma de contabilidad y consultoría especializada en servicios fiscales, cumplimiento regulatorio y estructuración corporativa. Atiende a empresas e individuos de alto patrimonio con necesidades complejas en planificación tributaria, auditoría contable y administración financiera en mercados de Norteamérica.",
    facts: [
      { label: "Especialidad", value: "Fiscal y contable" },
      { label: "Mercado",      value: "Norteamérica" },
      { label: "Enfoque",      value: "Empresas e individuos" },
      { label: "Servicios",    value: "Integrales" },
    ],
    services: ["Planeación fiscal", "Auditoría contable", "Estructuración corporativa", "Cumplimiento regulatorio", "Administración financiera"],
    url: "https://www.rgaconsultinginc.com",
  },
  {
    name: "BNY Mellon",
    logo: "/logos/bny-mellon-new.png",
    scale: 1.2,
    category: "CUSTODIA Y SERVICIOS DE VALORES",
    description: "El banco custodio más antiguo de los Estados Unidos, fundado en 1784 por Alexander Hamilton. Con más de $47 billones de dólares en activos bajo custodia y administración, es líder mundial en servicios de custodia de valores, administración de fondos, liquidación de operaciones y servicios de tesorería institucional.",
    facts: [
      { label: "Fundado",    value: "1784" },
      { label: "Sede",       value: "Nueva York, EE.UU." },
      { label: "AUC",        value: "+$47 billones" },
      { label: "Empleados",  value: "+50,000" },
    ],
    services: ["Custodia de valores", "Administración de fondos", "Liquidación", "Servicios de tesorería", "Préstamo de valores"],
    url: "https://www.bnymellon.com",
  },
  {
    name: "Manhattan Venture Partners",
    logo: "/logos/mvp-logo.png",
    scale: 1.3,
    category: "CAPITAL DE RIESGO · PRE-IPO",
    description: "Firma de capital de riesgo con sede en Nueva York especializada en inversiones secundarias y pre-IPO en empresas tecnológicas de alto potencial. Conecta a inversores institucionales y de alto patrimonio con oportunidades de liquidez en compañías privadas antes de su salida al mercado público.",
    facts: [
      { label: "Sede",        value: "Nueva York, EE.UU." },
      { label: "Enfoque",     value: "Pre-IPO · Tecnología" },
      { label: "Etapa",       value: "Late-stage / Secundarios" },
      { label: "Mercado",     value: "Global" },
    ],
    services: ["Inversión pre-IPO", "Mercado secundario", "Acceso a unicornios", "Asesoría de liquidez", "Capital de crecimiento"],
    url: "https://www.mvp.vc",
  },
  {
    name: "Trendrating",
    logo: "/logos/trendrating-new.png",
    scale: 1.3,
    category: "ANÁLISIS CUANTITATIVO",
    description: "Plataforma de análisis cuantitativo y gestión de carteras fundada en Ginebra. Ofrece un sistema de calificación de tendencias que evalúa el momentum de más de 17,000 activos globales, permitiendo a los gestores de inversión mejorar la selección de activos y reducir la exposición al riesgo de mercado.",
    facts: [
      { label: "Sede",       value: "Ginebra, Suiza" },
      { label: "Cobertura",  value: "+17,000 activos" },
      { label: "Enfoque",    value: "Momentum cuantitativo" },
      { label: "Clientes",   value: "Gestores institucionales" },
    ],
    services: ["Calificación de tendencias", "Análisis de momentum", "Gestión de riesgo", "Selección de activos", "Reportes cuantitativos"],
    url: "https://www.trendrating.com",
  },
  {
    name: "CNBC",
    logo: "/logos/cnbc.png",
    scale: 1.6,
    category: "MEDIOS FINANCIEROS",
    description: "Canal de televisión por cable y plataforma digital especializada en noticias financieras y de negocios, propiedad de NBCUniversal. Con cobertura en tiempo real de los mercados globales, es la fuente de información económica y financiera más vista por inversores y ejecutivos en el mundo.",
    facts: [
      { label: "Fundada",    value: "1989" },
      { label: "Sede",       value: "Englewood Cliffs, EE.UU." },
      { label: "Audiencia",  value: "+390M hogares" },
      { label: "Presencia",  value: "+100 países" },
    ],
    services: ["Noticias en tiempo real", "Análisis de mercados", "Entrevistas ejecutivas", "Cobertura de earnings", "Contenido digital"],
    url: "https://www.cnbc.com",
  },
  {
    name: "Visor Financiero",
    logo: "/logos/visor-financiero.png",
    scale: 2.2,
    category: "EDUCACIÓN Y MEDIOS FINANCIEROS",
    description: "Plataforma de educación e información financiera en español especializada en inversiones, mercados bursátiles y finanzas personales. Ofrece contenido accesible y de alta calidad para inversores latinoamericanos que buscan tomar mejores decisiones financieras.",
    facts: [
      { label: "Enfoque",   value: "Finanzas en español" },
      { label: "Mercado",   value: "Latinoamérica" },
      { label: "Contenido", value: "Educativo e informativo" },
      { label: "Alcance",   value: "Inversores retail" },
    ],
    services: ["Educación financiera", "Análisis de mercados", "Inversiones bursátiles", "Finanzas personales", "Contenido en español"],
    url: "https://www.visorfinanciero.com",
  },
];

const COLS = 4;

export default function NuestrosSociosPage() {
  const [selected, setSelected] = useState<Socio | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-56 pb-44 bg-background">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-8 mb-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Quiénes Somos</p>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-10">Nuestros Socios Comerciales</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Cretum Partners mantiene alianzas estratégicas con instituciones financieras y gestores de activos de clase mundial, lo que nos permite ofrecer acceso preferencial a oportunidades de inversión globales.
            </p>
          </Reveal>
        </div>

        {/* ── Partners grid ───────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-8">
          <Reveal delay={0.2}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
              Socios Institucionales
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="border border-border/40 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {SOCIOS.map((socio, i) => {
                  const remainder  = SOCIOS.length % COLS || COLS;
                  const lastRowStart = SOCIOS.length - remainder;
                  const isLastCol = (i + 1) % COLS === 0 || i === SOCIOS.length - 1;
                  const isLastRow = i >= lastRowStart;
                  return (
                    <button
                      key={socio.name}
                      onClick={() => setSelected(socio)}
                      className={[
                        "text-left group cursor-pointer",
                        !isLastCol ? "border-r border-border/40" : "",
                        !isLastRow ? "border-b border-border/40" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-center h-36 px-10 bg-background group-hover:bg-muted/30 transition-colors duration-200">
                        <img
                          src={socio.logo}
                          alt={socio.name}
                          className="w-36 h-10 object-contain"
                          style={socio.scale ? { transform: `scale(${socio.scale})` } : undefined}
                        />
                      </div>
                      <div className="border-t border-border/40 px-6 py-5 bg-muted/20 group-hover:bg-muted/40 transition-colors duration-200 flex items-center justify-center">
                        <p className="text-[0.95rem] font-semibold text-foreground/70 text-center">{socio.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

      </main>
      <Footer />

      {/* ── Modal ───────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-6 px-8 pt-8 pb-6 border-b border-border/40">
              <div className="border border-border/40 rounded-xl flex items-center justify-center w-28 h-16 shrink-0 bg-background overflow-hidden">
                <img
                  src={selected.logo}
                  alt={selected.name}
                  className="w-20 h-10 object-contain"
                  style={selected.scale ? { transform: `scale(${selected.scale * 0.65})` } : undefined}
                />
              </div>
              <div className="flex-1">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-semibold text-foreground leading-snug hover:underline"
                >
                  {selected.name}
                </a>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-primary mt-1">{selected.category}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border/40 text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-6 space-y-6">
              {/* Description */}
              <p className="text-[0.9rem] text-muted-foreground leading-relaxed">{selected.description}</p>

              {/* Key facts */}
              <div className="grid grid-cols-4 gap-4">
                {selected.facts.map((f) => (
                  <div key={f.label} className="bg-muted/30 rounded-xl px-4 py-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary mb-1">{f.label}</p>
                    <p className="text-[0.85rem] font-semibold text-foreground leading-snug">{f.value}</p>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-foreground/40 mb-3">Servicios principales</p>
                <div className="flex flex-wrap gap-2">
                  {selected.services.map((s) => (
                    <span key={s} className="text-[0.75rem] px-3 py-1 rounded-full border border-border/40 text-foreground/60 bg-background">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
