import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { X } from "lucide-react";
import wallStreetImg from "@/assets/wall-street.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

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

const SOCIOS_ES: Socio[] = [
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
    category: "GESTIÓN DE ESTRATEGIAS DE INVERSIÓN",
    description: "Firma basada en Canadá con amplia experiencia en el manejo de diferentes estrategias de inversión enfocadas principalmente en generar alfa — exceso de retorno sobre los índices de referencia del mercado bursátil. Cuenta con más de 10 años de experiencia y un track record sorprendente, con retornos muy superiores a los de los índices de referencia para cada estrategia.",
    facts: [
      { label: "Sede",         value: "Canadá" },
      { label: "Experiencia",  value: "+10 años" },
      { label: "Enfoque",      value: "Generación de alfa" },
      { label: "Track record", value: "Superior al índice" },
    ],
    services: ["Estrategias de inversión", "Generación de alfa", "Gestión activa", "Análisis bursátil", "Optimización de portafolio"],
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
    name: "The Wall Street Journal",
    logo: "/logos/wsj.png",
    scale: 1.4,
    category: "MEDIOS FINANCIEROS",
    description: "Diario económico y financiero estadounidense fundado en 1889 por Charles Dow, Edward Jones y Charles Bergstresser, propiedad de Dow Jones & Company (News Corp). Es el periódico de mayor circulación de pago en Estados Unidos y referencia global en cobertura de mercados, finanzas corporativas y política económica.",
    facts: [
      { label: "Fundado",      value: "1889" },
      { label: "Sede",         value: "Nueva York, EE.UU." },
      { label: "Suscriptores", value: "+4M digitales" },
      { label: "Pulitzers",    value: "+39 premios" },
    ],
    services: ["Noticias financieras", "Análisis de mercados", "Cobertura corporativa", "Reportajes de inversión", "Contenido digital"],
    url: "https://www.wsj.com",
  },
  {
    name: "Barron's",
    logo: "/logos/barrons.png",
    scale: 1.0,
    category: "ANÁLISIS BURSÁTIL Y MERCADOS",
    description: "Publicación financiera semanal estadounidense fundada en 1921 por Clarence W. Barron, propiedad de Dow Jones & Company. Reconocida por sus rankings anuales de asesores financieros, gestores y fondos, así como por sus análisis profundos de empresas, sectores y estrategias de inversión orientados a inversores sofisticados.",
    facts: [
      { label: "Fundada",   value: "1921" },
      { label: "Sede",      value: "Nueva York, EE.UU." },
      { label: "Frecuencia",value: "Semanal" },
      { label: "Audiencia", value: "Inversores institucionales" },
    ],
    services: ["Análisis bursátil", "Rankings financieros", "Selección de acciones", "Cobertura sectorial", "Estrategia de inversión"],
    url: "https://www.barrons.com",
  },
  {
    name: "Anthropic",
    logo: "/logos/mvp/anthropic.svg",
    scale: 1.3,
    category: "INTELIGENCIA ARTIFICIAL · INVESTIGACIÓN",
    description: "Compañía de investigación y seguridad en inteligencia artificial fundada en 2021 por ex-investigadores de OpenAI. Desarrolla Claude, una de las familias de modelos de lenguaje más avanzadas del mundo, con enfoque en IA confiable, interpretable y alineada con valores humanos para aplicaciones empresariales.",
    facts: [
      { label: "Fundada",  value: "2021" },
      { label: "Sede",     value: "San Francisco, EE.UU." },
      { label: "Producto", value: "Claude (LLM)" },
      { label: "Enfoque",  value: "AI Safety · Investigación" },
    ],
    services: ["Modelos de lenguaje", "API empresarial", "Investigación en seguridad", "Análisis automatizado", "AI alineada"],
    url: "https://www.anthropic.com",
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

const SOCIOS_EN: Socio[] = [
  {
    name: "Deloitte",
    logo: "/logos/deloitte-new.png",
    scale: 1.6,
    category: "AUDIT & CONSULTING",
    description: "One of the four largest professional services firms in the world. With a presence in more than 150 countries and over 450,000 professionals, it offers audit, strategic consulting, tax advisory and risk management services to corporations, governments and financial institutions across every sector.",
    facts: [
      { label: "Founded",    value: "1845" },
      { label: "Headquarters", value: "London, United Kingdom" },
      { label: "Employees",  value: "+450,000" },
      { label: "Presence",   value: "+150 countries" },
    ],
    services: ["Audit", "Strategic consulting", "Tax advisory", "Risk management", "Legal services"],
    url: "https://www.deloitte.com",
  },
  {
    name: "Bloomberg",
    logo: "/logos/bloomberg-new.png",
    category: "FINANCIAL DATA & INTELLIGENCE",
    description: "Global media and financial technology company founded by Michael Bloomberg in 1981. It operates the Bloomberg Terminal, the real-time financial data and information system most widely used by investment professionals, covering more than 35 million financial indicators worldwide.",
    facts: [
      { label: "Founded",      value: "1981" },
      { label: "Headquarters", value: "New York, USA" },
      { label: "Employees",    value: "+20,000" },
      { label: "Terminals",    value: "+325,000 active" },
    ],
    services: ["Bloomberg Terminal", "Data analytics", "Financial news", "Market indices", "Analytics"],
    url: "https://www.bloomberg.com",
  },
  {
    name: "Goldman Sachs",
    logo: "/logos/goldman-sachs.png",
    scale: 1.2,
    category: "INVESTMENT BANKING",
    description: "Global investment bank founded in 1869, headquartered in New York. One of the most influential investment banks in the world, it provides corporate banking, securities trading, asset management and financing services to corporations, governments and institutions in more than 40 countries.",
    facts: [
      { label: "Founded",      value: "1869" },
      { label: "Headquarters", value: "New York, USA" },
      { label: "Assets",       value: "$1.6 trillion" },
      { label: "Employees",    value: "+45,000" },
    ],
    services: ["Investment banking", "Equities", "Fixed income", "Asset management", "Prime brokerage"],
    url: "https://www.goldmansachs.com",
  },
  {
    name: "UBS",
    logo: "/logos/ubs.png",
    category: "ASSET MANAGEMENT",
    description: "Swiss multinational bank and the world's largest private wealth manager. Headquartered in Zurich and Basel, it manages more than $5 trillion in assets under management and provides wealth management, investment banking and institutional asset management services to clients in more than 50 countries.",
    facts: [
      { label: "Founded",      value: "1862" },
      { label: "Headquarters", value: "Zurich, Switzerland" },
      { label: "AUM",          value: "+$5 trillion" },
      { label: "Employees",    value: "+72,000" },
    ],
    services: ["Wealth management", "Investment banking", "Asset management", "Private banking", "Global markets"],
    url: "https://www.ubs.com",
  },
  {
    name: "Morgan Stanley",
    logo: "/logos/morgan-stanley-new.png",
    scale: 2.0,
    category: "INVESTMENT BANKING",
    description: "Global investment bank founded in 1935, headquartered in New York. Recognized as one of the world's leading investment banks, it offers corporate banking, equities, fixed income, asset management and wealth management services to institutional and corporate clients in more than 40 countries.",
    facts: [
      { label: "Founded",      value: "1935" },
      { label: "Headquarters", value: "New York, USA" },
      { label: "Assets",       value: "$1.2 trillion" },
      { label: "Employees",    value: "+80,000" },
    ],
    services: ["Investment banking", "Equities", "Fixed income", "Wealth management", "Asset management"],
    url: "https://www.morganstanley.com",
  },
  {
    name: "Capital Economics",
    logo: "/logos/capital-economics.png",
    scale: 1.4,
    category: "MACROECONOMIC RESEARCH",
    description: "Independent economic research firm founded in 1999 in London. Considered one of the world's most influential economic analysis firms, it produces macroeconomic forecasts and analysis on more than 40 economies, with particular focus on monetary policy, financial markets and global trends.",
    facts: [
      { label: "Founded",      value: "1999" },
      { label: "Headquarters", value: "London, United Kingdom" },
      { label: "Coverage",     value: "+40 economies" },
      { label: "Clients",      value: "+1,500 institutional" },
    ],
    services: ["Macroeconomic analysis", "Market forecasts", "Sector research", "Economic consulting", "Specialized reports"],
    url: "https://www.capitaleconomics.com",
  },
  {
    name: "RGA Consulting",
    logo: "/logos/rga-new.png",
    scale: 1.4,
    category: "INVESTMENT STRATEGY MANAGEMENT",
    description: "Canada-based firm with extensive experience managing a range of investment strategies focused primarily on generating alpha — excess return over stock market benchmarks. With more than 10 years of experience and a remarkable track record, its returns have consistently outperformed the benchmark indices for every strategy.",
    facts: [
      { label: "Headquarters", value: "Canada" },
      { label: "Experience",   value: "+10 years" },
      { label: "Focus",        value: "Alpha generation" },
      { label: "Track record", value: "Outperforms benchmark" },
    ],
    services: ["Investment strategies", "Alpha generation", "Active management", "Equity analysis", "Portfolio optimization"],
    url: "https://www.rgaconsultinginc.com",
  },
  {
    name: "BNY Mellon",
    logo: "/logos/bny-mellon-new.png",
    scale: 1.2,
    category: "CUSTODY & SECURITIES SERVICES",
    description: "The oldest custodian bank in the United States, founded in 1784 by Alexander Hamilton. With more than $47 trillion in assets under custody and administration, it is the world leader in securities custody services, fund administration, trade settlement and institutional treasury services.",
    facts: [
      { label: "Founded",      value: "1784" },
      { label: "Headquarters", value: "New York, USA" },
      { label: "AUC",          value: "+$47 trillion" },
      { label: "Employees",    value: "+50,000" },
    ],
    services: ["Securities custody", "Fund administration", "Settlement", "Treasury services", "Securities lending"],
    url: "https://www.bnymellon.com",
  },
  {
    name: "Manhattan Venture Partners",
    logo: "/logos/mvp-logo.png",
    scale: 1.3,
    category: "VENTURE CAPITAL · PRE-IPO",
    description: "Venture capital firm based in New York specializing in secondary and pre-IPO investments in high-potential technology companies. It connects institutional and high-net-worth investors with liquidity opportunities in private companies before they go public.",
    facts: [
      { label: "Headquarters", value: "New York, USA" },
      { label: "Focus",        value: "Pre-IPO · Technology" },
      { label: "Stage",        value: "Late-stage / Secondaries" },
      { label: "Market",       value: "Global" },
    ],
    services: ["Pre-IPO investment", "Secondary market", "Access to unicorns", "Liquidity advisory", "Growth capital"],
    url: "https://www.mvp.vc",
  },
  {
    name: "Trendrating",
    logo: "/logos/trendrating-new.png",
    scale: 1.3,
    category: "QUANTITATIVE ANALYSIS",
    description: "Quantitative analysis and portfolio management platform founded in Geneva. It offers a trend rating system that evaluates the momentum of more than 17,000 global assets, enabling investment managers to improve asset selection and reduce exposure to market risk.",
    facts: [
      { label: "Headquarters", value: "Geneva, Switzerland" },
      { label: "Coverage",     value: "+17,000 assets" },
      { label: "Focus",        value: "Quantitative momentum" },
      { label: "Clients",      value: "Institutional managers" },
    ],
    services: ["Trend rating", "Momentum analysis", "Risk management", "Asset selection", "Quantitative reports"],
    url: "https://www.trendrating.com",
  },
  {
    name: "CNBC",
    logo: "/logos/cnbc.png",
    scale: 1.6,
    category: "FINANCIAL MEDIA",
    description: "Cable television channel and digital platform specialized in financial and business news, owned by NBCUniversal. With real-time coverage of global markets, it is the most-watched source of economic and financial information for investors and executives around the world.",
    facts: [
      { label: "Founded",      value: "1989" },
      { label: "Headquarters", value: "Englewood Cliffs, USA" },
      { label: "Audience",     value: "+390M households" },
      { label: "Presence",     value: "+100 countries" },
    ],
    services: ["Real-time news", "Market analysis", "Executive interviews", "Earnings coverage", "Digital content"],
    url: "https://www.cnbc.com",
  },
  {
    name: "The Wall Street Journal",
    logo: "/logos/wsj.png",
    scale: 1.4,
    category: "FINANCIAL MEDIA",
    description: "American business and financial daily newspaper founded in 1889 by Charles Dow, Edward Jones and Charles Bergstresser, owned by Dow Jones & Company (News Corp). It is the largest paid-circulation newspaper in the United States and a global reference for market coverage, corporate finance and economic policy.",
    facts: [
      { label: "Founded",      value: "1889" },
      { label: "Headquarters", value: "New York, USA" },
      { label: "Subscribers",  value: "+4M digital" },
      { label: "Pulitzers",    value: "+39 awards" },
    ],
    services: ["Financial news", "Market analysis", "Corporate coverage", "Investment reporting", "Digital content"],
    url: "https://www.wsj.com",
  },
  {
    name: "Barron's",
    logo: "/logos/barrons.png",
    scale: 1.0,
    category: "STOCK MARKET ANALYSIS",
    description: "American weekly financial publication founded in 1921 by Clarence W. Barron, owned by Dow Jones & Company. Recognized for its annual rankings of financial advisors, asset managers and funds, as well as for its deep analysis of companies, sectors and investment strategies aimed at sophisticated investors.",
    facts: [
      { label: "Founded",      value: "1921" },
      { label: "Headquarters", value: "New York, USA" },
      { label: "Frequency",    value: "Weekly" },
      { label: "Audience",     value: "Institutional investors" },
    ],
    services: ["Stock analysis", "Financial rankings", "Stock selection", "Sector coverage", "Investment strategy"],
    url: "https://www.barrons.com",
  },
  {
    name: "Anthropic",
    logo: "/logos/mvp/anthropic.svg",
    scale: 1.3,
    category: "ARTIFICIAL INTELLIGENCE · RESEARCH",
    description: "AI safety and research company founded in 2021 by former OpenAI researchers. It develops Claude, one of the world's most advanced families of large language models, with a focus on reliable, interpretable AI aligned with human values for enterprise applications.",
    facts: [
      { label: "Founded",      value: "2021" },
      { label: "Headquarters", value: "San Francisco, USA" },
      { label: "Product",      value: "Claude (LLM)" },
      { label: "Focus",        value: "AI Safety · Research" },
    ],
    services: ["Language models", "Enterprise API", "Safety research", "Automated analysis", "Aligned AI"],
    url: "https://www.anthropic.com",
  },
  {
    name: "Visor Financiero",
    logo: "/logos/visor-financiero.png",
    scale: 2.2,
    category: "FINANCIAL EDUCATION & MEDIA",
    description: "Spanish-language financial education and information platform specialized in investing, stock markets and personal finance. It offers accessible, high-quality content for Latin American investors looking to make better financial decisions.",
    facts: [
      { label: "Focus",    value: "Finance in Spanish" },
      { label: "Market",   value: "Latin America" },
      { label: "Content",  value: "Educational & informational" },
      { label: "Reach",    value: "Retail investors" },
    ],
    services: ["Financial education", "Market analysis", "Stock investing", "Personal finance", "Spanish-language content"],
    url: "https://www.visorfinanciero.com",
  },
];

const COLS = 4;

export default function NuestrosSociosPage() {
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState<Socio | null>(null);
  const SOCIOS = lang === "en" ? SOCIOS_EN : SOCIOS_ES;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 sm:pt-32 md:pt-56 pb-16 md:pb-40 bg-background relative overflow-hidden">
        {/* Decorative image — right side */}
        <div className="hidden lg:block absolute right-0 top-0 w-[40%] h-full pointer-events-none select-none">
          <img src={wallStreetImg} alt="" className="w-full h-full object-cover object-center grayscale opacity-[0.13]" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background" />
          <div className="absolute top-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)" }} />
        </div>

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-8 mb-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">{t("socios.kicker")}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-10">{t("socios.title")}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("socios.subtitle")}
            </p>
          </Reveal>
        </div>

        {/* ── Partners grid ───────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-8">
          <Reveal delay={0.2}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
              {t("socios.section")}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="border border-border/40 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
                      <div className="flex items-center justify-center h-36 px-6 md:px-10 bg-background group-hover:bg-muted/30 transition-colors duration-200">
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
            <div className="flex items-center gap-6 px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-border/40">
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
            <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-6">
              {/* Description */}
              <p className="text-[0.9rem] text-muted-foreground leading-relaxed">{selected.description}</p>

              {/* Key facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {selected.facts.map((f) => (
                  <div key={f.label} className="bg-muted/30 rounded-xl px-4 py-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary mb-1">{f.label}</p>
                    <p className="text-[0.85rem] font-semibold text-foreground leading-snug">{f.value}</p>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-foreground/40 mb-3">{t("socios.services")}</p>
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
