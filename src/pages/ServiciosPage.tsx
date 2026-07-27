import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowRight,
  Search,
  ClipboardList,
  Network,
  Activity,
  Compass,
  ShieldCheck,
  Users,
  GitBranch,
  LineChart,
  Layers,
  type LucideIcon,
} from "lucide-react";

import gvvImg from "@/assets/gvv-glass-tower.jpg";
import mvpImg from "@/assets/mvp-manhattan.jpg";
import foImg from "@/assets/fo-thun.avif";
import wmImg from "@/assets/fo-study.jpg";

type Step = { icon: LucideIcon; es: string; en: string };

type Service = {
  tag: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  image: string;
  steps: Step[];
  href: string;
};

const SERVICES: Service[] = [
  {
    tag: "GVV",
    title: { es: "Mercados Públicos", en: "Public Markets" },
    subtitle: { es: "Growth · Value · Volatility", en: "Growth · Value · Volatility" },
    description: {
      es:
        "Estrategia activa en mercados líquidos globales que combina disciplina fundamental, gestión de volatilidad y rotación dinámica entre tres motores complementarios.",
      en:
        "Active strategy in global liquid markets that combines fundamental discipline, volatility management and dynamic rotation across three complementary engines.",
    },
    image: gvvImg,
    href: "/que-hacemos/gvv",
    steps: [
      { icon: Search, es: "Investigación", en: "Research" },
      { icon: LineChart, es: "Análisis cuantitativo", en: "Quantitative analysis" },
      { icon: Layers, es: "Construcción de portafolio", en: "Portfolio construction" },
      { icon: Activity, es: "Monitoreo continuo", en: "Continuous monitoring" },
    ],
  },
  {
    tag: "MVP",
    title: { es: "Capital Privado", en: "Private Equity" },
    subtitle: { es: "Coinversión pre-IPO en compañías selectas", en: "Pre-IPO co-investment in selected companies" },
    description: {
      es:
        "Acceso a oportunidades de coinversión en compañías privadas de alto crecimiento, originadas a través de una red institucional de gestores y operadores en EE. UU.",
      en:
        "Access to co-investment opportunities in high-growth private companies, sourced through an institutional network of managers and operators in the U.S.",
    },
    image: mvpImg,
    href: "/que-hacemos/mvp",
    steps: [
      { icon: Network, es: "Originación", en: "Sourcing" },
      { icon: ClipboardList, es: "Due diligence", en: "Due diligence" },
      { icon: GitBranch, es: "Estructuración", en: "Structuring" },
      { icon: Users, es: "Acompañamiento", en: "Active monitoring" },
    ],
  },
  {
    tag: "Wealth Management",
    title: { es: "Gestión Patrimonial", en: "Wealth Management" },
    subtitle: { es: "Acompañamiento integral del patrimonio", en: "Comprehensive wealth advisory" },
    description: {
      es:
        "Diseño y supervisión de soluciones patrimoniales a la medida de cada familia o institución, con foco en preservación, gobernanza y planeación a largo plazo.",
      en:
        "Design and oversight of bespoke wealth solutions for each family or institution, focused on preservation, governance and long-term planning.",
    },
    image: wmImg,
    href: "/que-hacemos/gestion-patrimonial",
    steps: [
      { icon: Compass, es: "Diagnóstico", en: "Diagnostic" },
      { icon: ClipboardList, es: "Plan personalizado", en: "Personalized plan" },
      { icon: Layers, es: "Asignación de activos", en: "Asset allocation" },
      { icon: ShieldCheck, es: "Revisión periódica", en: "Periodic review" },
    ],
  },
  {
    tag: "Family Offices",
    title: { es: "Family Offices", en: "Family Offices" },
    subtitle: { es: "Preservación de legado y estrategia multigeneracional", en: "Legacy preservation and multigenerational strategy" },
    description: {
      es:
        "Núcleo estratégico para la gestión y protección de estructuras patrimoniales complejas, sirviendo a familias globales, fideicomisos y entidades off-shore con sofisticación analítica y ejecución disciplinada.",
      en:
        "Strategic core for the management and protection of complex wealth structures, serving global families, trusts and off-shore entities with analytical sophistication and disciplined execution.",
    },
    image: foImg,
    href: "/que-hacemos/family-office",
    steps: [
      { icon: Layers,        es: "Diversificación",      en: "Diversification" },
      { icon: GitBranch,     es: "Eficiencia fiscal",    en: "Tax efficiency" },
      { icon: Activity,      es: "Monitoreo global",     en: "Global monitoring" },
      { icon: ShieldCheck,   es: "Gobierno familiar",    en: "Family governance" },
    ],
  },
];

function ServiceBlock({ service, reverse }: { service: Service; reverse: boolean }) {
  const { lang } = useLanguage();
  const ctaLabel = lang === "es" ? "Conocer más" : "Learn more";

  return (
    <Reveal>
      <div
        className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-2xl shadow-lg">
          <img
            src={service.image}
            alt={service.title[lang]}
            className="w-full h-full object-cover scale-[1.15]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-primary">
            {service.tag}
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
            {service.subtitle[lang]}
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-tight mb-5">
            {service.title[lang]}
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            {service.description[lang]}
          </p>

          {/* Methodology steps */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {lang === "es" ? "Nuestra metodología" : "Our methodology"}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {service.steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center text-center gap-2 p-3 rounded-xl border border-border bg-background/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-medium text-foreground leading-tight">
                      {step[lang]}
                    </span>
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-primary/40">
                      0{i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            to={service.href}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

const ServiciosPage = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page intro */}
      <section className="pt-24 md:pt-36 pb-8 md:pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              {lang === "es" ? "Nuestros Servicios" : "Our Services"}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight max-w-3xl">
              {lang === "es"
                ? "Cuatro disciplinas, una misma filosofía de inversión."
                : "Four disciplines, one investment philosophy."}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
              {lang === "es"
                ? "Cada área de Cretum Partners se construye sobre una metodología propia, rigurosa y replicable, diseñada para alinear los intereses de nuestros clientes con resultados sostenibles en el largo plazo."
                : "Each Cretum Partners area is built on a proprietary, rigorous and replicable methodology, designed to align our clients' interests with sustainable long-term outcomes."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16 sm:gap-20 md:gap-32">
          {SERVICES.map((s, i) => (
            <ServiceBlock key={s.tag} service={s} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              {lang === "es"
                ? "¿Te gustaría conocer cuál de nuestras estrategias se adapta mejor a tu perfil?"
                : "Want to find out which of our strategies best fits your profile?"}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground mb-8">
              {lang === "es"
                ? "Conversemos. Un representante de Cretum Partners se pondrá en contacto contigo."
                : "Let's talk. A Cretum Partners representative will reach out to you."}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              {lang === "es" ? "Contáctanos" : "Contact us"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiciosPage;
