import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Building2, Globe, FileText, TrendingUp, Shield, Search, Briefcase, ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ── Static data (numbers, logos — not translated) ─────────────────────────

const kpiValues = ["$1.7B", "70+", "~2.2x", "<4 años", "$2.7B", "1,100+"];

const kpiKeys = [
  { labelKey: "mvp.kpi1.label", subKey: "mvp.kpi1.sub" },
  { labelKey: "mvp.kpi2.label", subKey: "mvp.kpi2.sub" },
  { labelKey: "mvp.kpi3.label", subKey: "mvp.kpi3.sub" },
  { labelKey: "mvp.kpi4.label", subKey: "mvp.kpi4.sub" },
  { labelKey: "mvp.kpi5.label", subKey: "mvp.kpi5.sub" },
  { labelKey: "mvp.kpi6.label", subKey: "mvp.kpi6.sub" },
];

const platformDefs = [
  { icon: Briefcase,  title: "Principal", descKey: "mvp.platform.principal.desc" },
  { icon: TrendingUp, title: "Advisor",   descKey: "mvp.platform.advisor.desc"   },
  { icon: Globe,      title: "Agent",     descKey: "mvp.platform.agent.desc"     },
  { icon: Search,     title: "Research",  descKey: "mvp.platform.research.desc"  },
];

const dpiData = [
  { fund: "Fund I",   mvp: 1.8, vc: 1.6, sec: null },
  { fund: "Fund II",  mvp: 2.1, vc: 1.2, sec: null },
  { fund: "Fund III", mvp: 2.1, vc: 1.2, sec: 1.4  },
];

const irrData = [
  { fund: "Fund I",   mvp: 23, vc: 14, sec: null },
  { fund: "Fund II",  mvp: 34, vc: 12, sec: null },
  { fund: "Fund III", mvp: 56, vc: 12, sec: 28   },
];

const volumeData = [
  { year:"'12", v:13 }, { year:"'13", v:14 }, { year:"'14", v:16 },
  { year:"'15", v:19 }, { year:"'16", v:23 }, { year:"'17", v:28 },
  { year:"'18", v:33 }, { year:"'19", v:42 }, { year:"'20", v:34 },
  { year:"'21", v:60 }, { year:"'22", v:53 }, { year:"'23", v:63 },
  { year:"'24", v:69 },
];

const tenderOffers = [
  { company: "Databricks", volume: 10000 },
  { company: "OpenAI",     volume: 9700  },
  { company: "SpaceX",     volume: 2300  },
  { company: "Canva",      volume: 1600  },
  { company: "Stripe",     volume: 1333  },
  { company: "CoreWeave",  volume: 1292  },
  { company: "Figma",      volume: 900   },
  { company: "Revolut",    volume: 500   },
];

const sectorReturns = [
  { sector: "Technology",    ret: 23 },
  { sector: "Industrials",   ret: 13 },
  { sector: "Consumer Disc.",ret: 13 },
  { sector: "Financials",    ret: 12 },
  { sector: "Utilities",     ret: 11 },
  { sector: "Health Care",   ret: 9  },
  { sector: "Energy",        ret: 7  },
];

const privMag7 = [
  { name: "SpaceX",     val: "$1.25T"  },
  { name: "OpenAI",     val: "$852B"   },
  { name: "Anthropic",  val: "$380B"   },
  { name: "Stripe",     val: "$159B"   },
  { name: "Databricks", val: "$134B"   },
  { name: "Revolut",    val: "$75B"    },
  { name: "Canva",      val: "$42B"    },
];

interface CompanyBase {
  name: string;
  logo: string;
  darkBg?: boolean;
  founded: string;
  valuation: string;
}

interface CompanyTexts {
  sector: string;
  desc: string;
  status: string;
  note: string;
}

const companiesBase: CompanyBase[] = [
  { name: "Spotify",          logo: "/logos/mvp/spotify.svg",     founded: "2006", valuation: "~$97B market cap"      },
  { name: "Coinbase",         logo: "/logos/mvp/coinbase.svg",    founded: "2012", valuation: "~$44B market cap"      },
  { name: "SpaceX",           logo: "/logos/mvp/spacex.svg",      founded: "2002", valuation: "~$800B (dic 2025)"     },
  { name: "Anthropic",        logo: "/logos/mvp/anthropic.svg",   founded: "2021", valuation: "$380B (feb 2026)"      },
  { name: "Airbnb",           logo: "/logos/mvp/airbnb.svg",      founded: "2008", valuation: "~$75B market cap"      },
  { name: "Palantir",         logo: "/logos/mvp/palantir.svg",    founded: "2003", valuation: "~$313B market cap"     },
  { name: "Pinterest",        logo: "/logos/mvp/pinterest.svg",   founded: "2010", valuation: "~$11.8B market cap"    },
  { name: "DraftKings",       logo: "/logos/mvp/draftkings.png",  founded: "2012", valuation: "~$11B market cap"      },
  { name: "Groq",             logo: "/logos/mvp/groq.png",        founded: "2016", valuation: "$20B (dic 2025)"       },
  { name: "DocuSign",         logo: "/logos/mvp/docusign.svg",    founded: "2003", valuation: "~$9.4B market cap"     },
  { name: "SoFi",             logo: "/logos/mvp/sofi.svg",        founded: "2011", valuation: "~$20B market cap"      },
  { name: "Figure AI",        logo: "/logos/mvp/figure-ai.svg",   founded: "2022", valuation: "$39B (sep 2025)"       },
  { name: "Kodiak Robotics",  logo: "/logos/mvp/kodiak.svg",      founded: "2018", valuation: "~$1.3B market cap"     },
  { name: "Epirus",           logo: "/logos/mvp/epirus.svg",      darkBg: true, founded: "2018", valuation: ">$1B (mar 2025)" },
];

const companyTextsEs: Record<string, CompanyTexts> = {
  "Spotify":         { sector: "Entretenimiento · Streaming",     desc: "Plataforma líder global de streaming de música y podcasts con más de 600M de usuarios activos.",               status: "Pública (NYSE: SPOT)",          note: "IPO directo en abril 2018. Primer año rentable en 2024." },
  "Coinbase":        { sector: "Fintech · Cripto",                desc: "Exchange de criptomonedas más grande de EE.UU. y principal plataforma regulada para activos digitales.",       status: "Pública (NASDAQ: COIN)",        note: "IPO directo en abril 2021 a $328/acción. Regulada por la SEC." },
  "SpaceX":          { sector: "Aeroespacial · Defensa",          desc: "Empresa líder en cohetes reutilizables, satélites Starlink y la misión comercial a Marte.",                   status: "Privada (IPO esperado 2026)",   note: "S-1 confidencial presentado ante la SEC en abril 2026. Starlink superó 10M suscriptores y $10B en ingresos." },
  "Anthropic":       { sector: "Inteligencia Artificial",         desc: "Laboratorio de IA de seguridad que desarrolla Claude, uno de los modelos de lenguaje más avanzados.",         status: "Privada",                       note: "Serie G de $30B — segunda ronda de VC más grande de la historia. Ingresos anualizados de $14B." },
  "Airbnb":          { sector: "Hospitalidad · Marketplace",      desc: "Marketplace global de alojamiento con 7M+ de listados activos en 220 países.",                               status: "Pública (NASDAQ: ABNB)",        note: "IPO en diciembre 2020 a $68/acción, cerró el primer día en $144. Rentable desde 2022." },
  "Palantir":        { sector: "Software · Análisis de datos",    desc: "Plataforma de análisis de datos para gobiernos y empresas Fortune 500. Clave en defensa y contrainteligencia.", status: "Pública (NASDAQ: PLTR)",     note: "IPO directo en septiembre 2020. Ingresó al S&P 500 en 2024. Uno de los mejores desempeños del índice en 2025." },
  "Pinterest":       { sector: "Redes Sociales · E-commerce",     desc: "Red social visual con 500M+ usuarios mensuales enfocada en inspiración y descubrimiento de productos.",       status: "Pública (NYSE: PINS)",          note: "IPO en abril 2019 a $19/acción. Monetización vía publicidad y shopping integrado." },
  "DraftKings":      { sector: "Gaming · Apuestas deportivas",    desc: "Plataforma líder de apuestas deportivas y fantasy sports en EE.UU. con 6M+ clientes activos.",               status: "Pública (NASDAQ: DKNG)",        note: "Salida a bolsa en marzo 2020 vía SPAC. Opera en 25+ estados de EE.UU." },
  "Groq":            { sector: "Hardware · IA",                   desc: "Diseña chips LPU (Language Processing Unit) para inferencia de IA ultrarrápida.",                            status: "Adquirida por Nvidia",          note: "Nvidia adquirió su IP y equipo directivo por ~$20B. El fundador Jonathan Ross se incorporó a Nvidia. Deal bajo revisión antimonopolio." },
  "DocuSign":        { sector: "SaaS · Legal Tech",               desc: "Líder global en firma electrónica y gestión de acuerdos digitales con 1M+ clientes en 180 países.",          status: "Pública (NASDAQ: DOCU)",        note: "IPO en abril 2018. Controla ~70% del mercado de firma electrónica en EE.UU. Programa de recompra de $2.6B anunciado en 2026." },
  "SoFi":            { sector: "Fintech · Banca digital",         desc: "Banco digital que ofrece préstamos estudiantiles, hipotecas, inversiones y tarjetas de crédito.",            status: "Pública (NASDAQ: SOFI)",        note: "Salida a bolsa en junio 2021 vía SPAC. Obtuvo licencia bancaria en 2022. Market cap duplicado en 2025." },
  "Figure AI":       { sector: "Robótica · IA",                   desc: "Desarrolla robots humanoides autónomos para trabajo industrial. Colaboración activa con BMW.",                status: "Privada",                       note: "Serie C de +$1B. Respaldada por Nvidia, Microsoft, Jeff Bezos y el OpenAI Startup Fund. Funding total: ~$1.9B." },
  "Kodiak Robotics": { sector: "Transporte · Autonomía",          desc: "Desarrolla camiones autónomos de largo recorrido para logística comercial en EE.UU.",                        status: "Pública (NASDAQ: KDK)",         note: "Salida a bolsa vía SPAC en septiembre 2025. Contratos activos con el Departamento de Defensa de EE.UU." },
  "Epirus":          { sector: "Defensa · Energía dirigida",       desc: "Fabrica sistemas de energía dirigida de alta potencia (HPM) para neutralizar drones y electrónica enemiga.", status: "Privada",                       note: "Serie D de $250M (mar 2025) con participación de General Dynamics. Financiamiento total: ~$595M." },
};

const companyTextsEn: Record<string, CompanyTexts> = {
  "Spotify":         { sector: "Entertainment · Streaming",       desc: "Leading global music and podcast streaming platform with over 600M active users.",                            status: "Public (NYSE: SPOT)",           note: "Direct IPO in April 2018. First profitable year in 2024." },
  "Coinbase":        { sector: "Fintech · Crypto",                desc: "Largest US cryptocurrency exchange and leading regulated platform for digital assets.",                       status: "Public (NASDAQ: COIN)",         note: "Direct IPO in April 2021 at $328/share. Regulated by the SEC." },
  "SpaceX":          { sector: "Aerospace · Defense",             desc: "Leading company in reusable rockets, Starlink satellites and the commercial mission to Mars.",                status: "Private (IPO expected 2026)",   note: "Confidential S-1 filed with the SEC in April 2026. Starlink surpassed 10M subscribers and $10B in revenue." },
  "Anthropic":       { sector: "Artificial Intelligence",         desc: "AI safety laboratory developing Claude, one of the most advanced language models.",                           status: "Private",                       note: "Series G of $30B — second largest VC round in history. Annualized revenue of $14B." },
  "Airbnb":          { sector: "Hospitality · Marketplace",       desc: "Global accommodation marketplace with 7M+ active listings in 220 countries.",                               status: "Public (NASDAQ: ABNB)",         note: "IPO in December 2020 at $68/share, closed the first day at $144. Profitable since 2022." },
  "Palantir":        { sector: "Software · Data Analytics",       desc: "Data analytics platform for governments and Fortune 500 companies. Key in defense and counterintelligence.", status: "Public (NASDAQ: PLTR)",         note: "Direct IPO in September 2020. Added to S&P 500 in 2024. One of the index's best performers in 2025." },
  "Pinterest":       { sector: "Social Media · E-commerce",       desc: "Visual social network with 500M+ monthly users focused on inspiration and product discovery.",               status: "Public (NYSE: PINS)",           note: "IPO in April 2019 at $19/share. Monetization via advertising and integrated shopping." },
  "DraftKings":      { sector: "Gaming · Sports Betting",         desc: "Leading sports betting and fantasy sports platform in the US with 6M+ active customers.",                    status: "Public (NASDAQ: DKNG)",         note: "Went public in March 2020 via SPAC. Operates in 25+ US states." },
  "Groq":            { sector: "Hardware · AI",                   desc: "Designs LPU (Language Processing Unit) chips for ultra-fast AI inference.",                                  status: "Acquired by Nvidia",            note: "Nvidia acquired its IP and executive team for ~$20B. Founder Jonathan Ross joined Nvidia. Deal under antitrust review." },
  "DocuSign":        { sector: "SaaS · Legal Tech",               desc: "Global leader in e-signature and digital agreement management with 1M+ customers in 180 countries.",         status: "Public (NASDAQ: DOCU)",         note: "IPO in April 2018. Controls ~70% of the US e-signature market. $2.6B buyback program announced in 2026." },
  "SoFi":            { sector: "Fintech · Digital Banking",       desc: "Digital bank offering student loans, mortgages, investments and credit cards.",                              status: "Public (NASDAQ: SOFI)",         note: "Went public in June 2021 via SPAC. Obtained banking license in 2022. Market cap doubled in 2025." },
  "Figure AI":       { sector: "Robotics · AI",                   desc: "Develops autonomous humanoid robots for industrial work. Active collaboration with BMW.",                     status: "Private",                       note: "Series C of +$1B. Backed by Nvidia, Microsoft, Jeff Bezos and the OpenAI Startup Fund. Total funding: ~$1.9B." },
  "Kodiak Robotics": { sector: "Transportation · Autonomy",       desc: "Develops long-haul autonomous trucks for commercial logistics in the US.",                                    status: "Public (NASDAQ: KDK)",          note: "Went public via SPAC in September 2025. Active contracts with the US Department of Defense." },
  "Epirus":          { sector: "Defense · Directed Energy",       desc: "Manufactures high-power microwave (HPM) directed energy systems to neutralize drones and enemy electronics.", status: "Private",                      note: "Series D of $250M (Mar 2025) with General Dynamics participation. Total funding: ~$595M." },
};

// ── Helpers ───────────────────────────────────────────────────────────────

function AccordionSection({ title, children, defaultOpen = false, className = "mt-4" }: { title: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; className?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={className}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 py-3 px-4 rounded-lg border border-border bg-secondary/40 hover:bg-secondary/70 transition-colors duration-200 group"
      >
        <div className="h-[1.5px] w-4 bg-primary shrink-0" />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary whitespace-nowrap flex-1 text-left">{title}</h3>
        <ChevronDown
          className={`w-4 h-4 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "9999px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="pt-6 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────

interface SelectedCompany extends CompanyBase, CompanyTexts {}

export default function MVPPage() {
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState<SelectedCompany | null>(null);

  const companyTexts = lang === "es" ? companyTextsEs : companyTextsEn;
  const companies: SelectedCompany[] = companiesBase.map((c) => ({
    ...c,
    ...(companyTexts[c.name] ?? { sector: "", desc: "", status: "", note: "" }),
  }));
  const allCompanies = [...companies, ...companies];

  const platforms = platformDefs.map((p) => ({ ...p, desc: t(p.descKey) }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-48 pb-32 bg-background">
        <div className="max-w-6xl mx-auto px-8">
          <div className="w-full min-w-0">

            {/* ── Header ────────────────────────────────────────────────── */}
            <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">{t("mvp.title")}</h1>
            <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-6">{t("mvp.subtitle")}</p>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">{t("mvp.desc")}</p>

            {/* ── KPI Metrics ───────────────────────────────────────────── */}
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {kpiKeys.map((k, i) => (
                <div key={k.labelKey} className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
                  <p className="text-2xl font-bold">{kpiValues[i]}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide mt-1 opacity-80">{t(k.labelKey)}</p>
                  <p className="text-[10px] opacity-60 mt-0.5">{t(k.subKey)}</p>
                </div>
              ))}
            </div>

            {/* ── Platform Pillars ──────────────────────────────────────── */}
            <AccordionSection title={t("mvp.section.platform")} className="mt-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {platforms.map((p) => (
                  <div key={p.title} className="flex items-start gap-5 bg-secondary/60 border border-border rounded-md px-5 py-4">
                    <p.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-foreground">{p.title}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionSection>

            {/* ── Recognition ───────────────────────────────────────────── */}
            <AccordionSection title={t("mvp.section.recognition")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="border border-border rounded-xl p-6 bg-background">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Bloomberg</p>
                  <p className="text-base font-bold text-primary leading-tight">Top 10 Venture Funds</p>
                  <p className="text-[11px] text-muted-foreground mt-4">Under $500M — Vintages 2017–2022</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between bg-primary/5 border border-primary/15 rounded-lg px-3 py-1.5">
                      <span className="text-[11px] font-semibold text-foreground">#7 MVP All-Star Fund III</span>
                      <span className="text-[10px] text-primary font-bold">Net IRR Top 10</span>
                    </div>
                    <div className="flex items-center justify-between bg-primary/5 border border-primary/15 rounded-lg px-3 py-1.5">
                      <span className="text-[11px] font-semibold text-foreground">#8 MVP All-Star Fund II</span>
                      <span className="text-[10px] text-primary font-bold">Net IRR Top 10</span>
                    </div>
                  </div>
                </div>
                <div className="border border-border rounded-xl p-6 bg-background">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">PitchBook</p>
                  <p className="text-base font-bold text-primary leading-tight">Top 10 Global Secondaries Buyer</p>
                  <p className="text-[11px] text-muted-foreground mt-4">Top 5 en USA — Deal count 2015–2025</p>
                  <div className="mt-3 bg-secondary/40 rounded-lg px-3 py-2">
                    <p className="text-[11px] text-foreground">{t("mvp.pitchbook.desc")}</p>
                  </div>
                  <div className="mt-2 flex gap-4">
                    <div className="flex-1 bg-primary/5 border border-primary/15 rounded-md px-2 py-1.5 text-center">
                      <p className="text-sm font-bold text-primary">#9</p>
                      <p className="text-[10px] text-muted-foreground">Global</p>
                    </div>
                    <div className="flex-1 bg-primary/5 border border-primary/15 rounded-md px-2 py-1.5 text-center">
                      <p className="text-sm font-bold text-primary">Top 5</p>
                      <p className="text-[10px] text-muted-foreground">USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* ── Fund Performance ──────────────────────────────────────── */}
            <AccordionSection title={t("mvp.section.trackrecord")}>
              <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-2.5 mb-4 text-[12px] text-foreground">
                {t("mvp.trackrecord.desc")}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* DPI Chart */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">Net DPI vs Benchmark</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dpiData} barCategoryGap="30%" barGap={3}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                        <XAxis dataKey="fund" tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" />
                        <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}x`} domain={[0, 2.5]} />
                        <Tooltip
                          contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                          formatter={(v: number, name: string) => [`${v}x`, name === "mvp" ? "MVP DPI" : name === "vc" ? "VC Top Decile" : "VC Secondary"]}
                        />
                        <Bar dataKey="mvp" name="mvp" fill="hsl(214 60% 32%)" radius={[3,3,0,0]}>
                          <LabelList dataKey="mvp" position="top" formatter={(v: number) => `${v}x`} style={{ fontSize: 10, fontWeight: 700, fill: "hsl(214 60% 32%)" }} />
                        </Bar>
                        <Bar dataKey="vc" name="vc" fill="hsl(214 30% 68%)" radius={[3,3,0,0]} />
                        <Bar dataKey="sec" name="sec" fill="hsl(214 20% 82%)" radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-5 mt-4">
                    {[["hsl(214,60%,32%)","MVP"], ["hsl(214,30%,68%)","VC Top Decile"], ["hsl(214,20%,82%)","VC Secondary"]].map(([c,l]) => (
                      <span key={l} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c }} />{l}
                      </span>
                    ))}
                  </div>
                </div>

                {/* IRR Chart */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">Net IRR vs Benchmark</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={irrData} barCategoryGap="30%" barGap={3}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                        <XAxis dataKey="fund" tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" />
                        <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}%`} domain={[0, 65]} />
                        <Tooltip
                          contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                          formatter={(v: number, name: string) => [`${v}%`, name === "mvp" ? "MVP IRR" : name === "vc" ? "VC Median" : "VC Secondary"]}
                        />
                        <Bar dataKey="mvp" name="mvp" fill="hsl(214 60% 32%)" radius={[3,3,0,0]}>
                          <LabelList dataKey="mvp" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: 10, fontWeight: 700, fill: "hsl(214 60% 32%)" }} />
                        </Bar>
                        <Bar dataKey="vc" name="vc" fill="hsl(214 30% 68%)" radius={[3,3,0,0]} />
                        <Bar dataKey="sec" name="sec" fill="hsl(214 20% 82%)" radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-5 mt-4">
                    {[["hsl(214,60%,32%)","MVP"], ["hsl(214,30%,68%)","VC Median"], ["hsl(214,20%,82%)","VC Secondary"]].map(([c,l]) => (
                      <span key={l} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c }} />{l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* ── Secondary Market Volume ────────────────────────────────── */}
            <AccordionSection title={t("mvp.section.secondary")}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-primary/5 border border-primary/15 rounded-lg px-5 py-4">
                  <p className="text-xl font-bold text-primary">$69B</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t("mvp.vol.2024")}</p>
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-lg px-5 py-4">
                  <p className="text-xl font-bold text-primary">~$3.4T</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t("mvp.vol.universe")}</p>
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-lg px-5 py-4">
                  <p className="text-xl font-bold text-primary">$311B</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t("mvp.vol.drypowder")}</p>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `$${v}B`} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                      formatter={(v: number) => [`$${v}B`, t("mvp.tooltip.volume")]}
                    />
                    <Bar dataKey="v" name="v" radius={[3,3,0,0]}>
                      {volumeData.map((_, i) => (
                        <Cell key={i} fill={i === volumeData.length - 1 ? "hsl(214 60% 32%)" : "hsl(214 40% 55%)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4">{t("mvp.source.iv")}</p>
            </AccordionSection>

            {/* ── Tender Offers ─────────────────────────────────────────── */}
            <AccordionSection title={t("mvp.section.tender")}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
                {tenderOffers.map((item) => (
                  <div key={item.company} className="border border-border rounded-lg p-5 text-center bg-background">
                    <p className="text-sm font-bold text-foreground">{item.company}</p>
                    <p className="text-base font-bold text-primary mt-4">${item.volume >= 1000 ? `${(item.volume/1000).toFixed(1)}B` : `${item.volume}M`}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">{t("mvp.source.pitchbook")}</p>
            </AccordionSection>

            {/* ── Tech Sector Returns ───────────────────────────────────── */}
            <AccordionSection title={t("mvp.section.returns")}>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorReturns} layout="vertical" barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}%`} domain={[0, 26]} />
                    <YAxis type="category" dataKey="sector" tick={{ fontSize: 10 }} stroke="hsl(215 12% 60%)" width={100} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                      formatter={(v: number) => [`${v}%`, t("mvp.tooltip.returns")]}
                    />
                    <Bar dataKey="ret" radius={[0,3,3,0]}>
                      {sectorReturns.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "hsl(214 60% 32%)" : "hsl(214 35% 60%)"} />
                      ))}
                      <LabelList dataKey="ret" position="right" formatter={(v: number) => `${v}%`} style={{ fontSize: 10, fontWeight: 600, fill: "hsl(215 30% 30%)" }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4">{t("mvp.source.spdr")}</p>
            </AccordionSection>

            {/* ── Private Mag 7 ─────────────────────────────────────────── */}
            <AccordionSection title={t("mvp.section.mag7")}>
              <div className="bg-primary/5 border border-primary/15 rounded-lg px-6 py-5 mb-3 text-[12px] text-foreground leading-relaxed">
                {t("mvp.mag7.desc")}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
                {privMag7.slice(0, 4).map((c) => (
                  <div key={c.name} className="border border-border rounded-lg p-5 text-center bg-background hover:border-primary/40 transition-colors">
                    <p className="text-sm font-bold text-foreground">{c.name}</p>
                    <p className="text-base font-bold text-primary mt-4">{c.val}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {privMag7.slice(4).map((c) => (
                  <div key={c.name} className="border border-border rounded-lg p-5 text-center bg-background hover:border-primary/40 transition-colors">
                    <p className="text-sm font-bold text-foreground">{c.name}</p>
                    <p className="text-base font-bold text-primary mt-4">{c.val}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-5 mt-6">
                <div className="bg-secondary/40 rounded-lg p-5 text-center">
                  <p className="text-[11px] text-muted-foreground">{t("mvp.age.public.label")}</p>
                  <p className="text-xl font-bold text-foreground mt-4">6 {lang === "es" ? "años" : "years"}</p>
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-lg p-5 text-center">
                  <p className="text-[11px] text-muted-foreground">{t("mvp.age.private.label")}</p>
                  <p className="text-xl font-bold text-primary mt-4">13 {lang === "es" ? "años" : "years"}</p>
                </div>
              </div>
            </AccordionSection>

            {/* ── Portfolio Marquee ──────────────────────────────────────── */}
            <AccordionSection title={t("mvp.portfolio")}>
              <div className="overflow-hidden rounded-xl border border-border bg-slate-50 py-4 px-2">
                <div className="flex animate-marquee-slow gap-4 w-max items-center">
                  {allCompanies.map((company, i) => (
                    <button
                      key={`${company.name}-${i}`}
                      onClick={() => setSelected(companies.find(c => c.name === company.name) ?? null)}
                      className="shrink-0 flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div
                        className="h-14 w-36 rounded-xl border flex items-center justify-center px-4 shadow-sm group-hover:shadow-md group-hover:scale-[1.04] transition-all duration-200"
                        style={{
                          backgroundColor: company.darkBg ? "#111827" : "#ffffff",
                          borderColor: company.darkBg ? "#374151" : "#e5e7eb",
                        }}
                      >
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="object-contain"
                          style={{ maxHeight: "32px", maxWidth: "112px" }}
                          onError={(e) => {
                            const el = e.currentTarget;
                            el.style.display = "none";
                            if (el.parentElement)
                              el.parentElement.innerHTML = `<span style="font-size:12px;font-weight:600;color:#64748b">${company.name}</span>`;
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-muted-foreground text-center leading-tight w-36 truncate px-1 group-hover:text-primary transition-colors">{company.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </AccordionSection>

          </div>
        </div>
      </main>

      {/* ── Company detail popup ─────────────────────────────────────────── */}
      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="max-w-sm w-[calc(100vw-2rem)]">
          {selected && (
            <div className="pt-1">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-12 w-20 rounded-lg border flex items-center justify-center px-2 shrink-0"
                  style={{ backgroundColor: selected.darkBg ? "#111827" : "#f8fafc", borderColor: selected.darkBg ? "#374151" : "#e5e7eb" }}
                >
                  <img src={selected.logo} alt={selected.name} className="object-contain" style={{ maxHeight: "28px", maxWidth: "68px" }} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base leading-tight">{selected.name}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">{selected.sector}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{selected.desc}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/50 rounded-lg p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{t("mvp.popup.founded")}</p>
                  <p className="text-sm font-bold text-foreground">{selected.founded}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{t("mvp.popup.status")}</p>
                  <p className="text-sm font-bold text-foreground leading-tight">{selected.status}</p>
                </div>
                <div className="bg-primary/8 rounded-lg p-5 col-span-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{t("mvp.popup.valuation")}</p>
                  <p className="text-sm font-bold text-primary">{selected.valuation}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground/80 border-t border-border pt-3 leading-relaxed">{selected.note}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
