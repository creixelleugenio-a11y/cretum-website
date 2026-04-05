import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Globe, FileText, TrendingUp, Shield, Search, Briefcase } from "lucide-react";
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

// ── Static data ───────────────────────────────────────────────────────────

const kpis = [
  { value: "$1.7B",   label: "Capital desplegado",          sub: "En empresas privadas de tecnología" },
  { value: "70+",     label: "Empresas en portafolio",       sub: "Activas y exitadas" },
  { value: "~2.2x",  label: "DPI (fondos maduros)",         sub: "Distributed to paid-in capital" },
  { value: "<4 años", label: "Holding period",               sub: "Retorno de capital más rápido" },
  { value: "$2.7B",   label: "Volumen histórico ITD",        sub: "Transacciones facilitadas" },
  { value: "1,100+",  label: "Inversores globales",          sub: "Clientes institucionales" },
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

const platforms = [
  { icon: Briefcase, title: "Principal",  desc: "Fondos VC diversificados y co-inversiones vía RIA registrada ante la SEC."           },
  { icon: TrendingUp,title: "Advisor",    desc: "Secondary-as-a-Service™ — soluciones de liquidez a compañías privadas."              },
  { icon: Globe,     title: "Agent",      desc: "Brokerage institucional ($10M+) a través de VNTR Securities LLC (Broker-Dealer)."     },
  { icon: Search,    title: "Research",   desc: "Manhattan Venture Research — informes privados y reporte mensual Venture Bytes."      },
];

interface CompanyDetail {
  name: string;
  logo: string;
  darkBg?: boolean;
  sector: string;
  desc: string;
  founded: string;
  status: string;
  valuation: string;
  note: string;
}

// darkBg: logo blanco, necesita fondo oscuro
const companies: CompanyDetail[] = [
  {
    name: "Spotify", logo: "/logos/mvp/spotify.svg",
    sector: "Entretenimiento · Streaming",
    desc: "Plataforma líder global de streaming de música y podcasts con más de 600M de usuarios activos.",
    founded: "2006", status: "Pública (NYSE: SPOT)", valuation: "~$97B market cap",
    note: "IPO directo en abril 2018. Primer año rentable en 2024.",
  },
  {
    name: "Coinbase", logo: "/logos/mvp/coinbase.svg",
    sector: "Fintech · Cripto",
    desc: "Exchange de criptomonedas más grande de EE.UU. y principal plataforma regulada para activos digitales.",
    founded: "2012", status: "Pública (NASDAQ: COIN)", valuation: "~$44B market cap",
    note: "IPO directo en abril 2021 a $328/acción. Regulada por la SEC.",
  },
  {
    name: "SpaceX", logo: "/logos/mvp/spacex.svg",
    sector: "Aeroespacial · Defensa",
    desc: "Empresa líder en cohetes reutilizables, satélites Starlink y la misión comercial a Marte.",
    founded: "2002", status: "Privada (IPO esperado 2026)", valuation: "~$800B (dic 2025)",
    note: "S-1 confidencial presentado ante la SEC en abril 2026. Starlink superó 10M suscriptores y $10B en ingresos.",
  },
  {
    name: "Anthropic", logo: "/logos/mvp/anthropic.svg",
    sector: "Inteligencia Artificial",
    desc: "Laboratorio de IA de seguridad que desarrolla Claude, uno de los modelos de lenguaje más avanzados.",
    founded: "2021", status: "Privada", valuation: "$380B (feb 2026)",
    note: "Serie G de $30B — segunda ronda de VC más grande de la historia. Ingresos anualizados de $14B.",
  },
  {
    name: "Airbnb", logo: "/logos/mvp/airbnb.svg",
    sector: "Hospitalidad · Marketplace",
    desc: "Marketplace global de alojamiento con 7M+ de listados activos en 220 países.",
    founded: "2008", status: "Pública (NASDAQ: ABNB)", valuation: "~$75B market cap",
    note: "IPO en diciembre 2020 a $68/acción, cerró el primer día en $144. Rentable desde 2022.",
  },
  {
    name: "Palantir", logo: "/logos/mvp/palantir.svg",
    sector: "Software · Análisis de datos",
    desc: "Plataforma de análisis de datos para gobiernos y empresas Fortune 500. Clave en defensa y contrainteligencia.",
    founded: "2003", status: "Pública (NASDAQ: PLTR)", valuation: "~$313B market cap",
    note: "IPO directo en septiembre 2020. Ingresó al S&P 500 en 2024. Uno de los mejores desempeños del índice en 2025.",
  },
  {
    name: "Pinterest", logo: "/logos/mvp/pinterest.svg",
    sector: "Redes Sociales · E-commerce",
    desc: "Red social visual con 500M+ usuarios mensuales enfocada en inspiración y descubrimiento de productos.",
    founded: "2010", status: "Pública (NYSE: PINS)", valuation: "~$11.8B market cap",
    note: "IPO en abril 2019 a $19/acción. Monetización vía publicidad y shopping integrado.",
  },
  {
    name: "DraftKings", logo: "/logos/mvp/draftkings.png",
    sector: "Gaming · Apuestas deportivas",
    desc: "Plataforma líder de apuestas deportivas y fantasy sports en EE.UU. con 6M+ clientes activos.",
    founded: "2012", status: "Pública (NASDAQ: DKNG)", valuation: "~$11B market cap",
    note: "Salida a bolsa en marzo 2020 vía SPAC. Opera en 25+ estados de EE.UU.",
  },
  {
    name: "Groq", logo: "/logos/mvp/groq.png",
    sector: "Hardware · IA",
    desc: "Diseña chips LPU (Language Processing Unit) para inferencia de IA ultrarrápida.",
    founded: "2016", status: "Adquirida por Nvidia", valuation: "$20B (dic 2025)",
    note: "Nvidia adquirió su IP y equipo directivo por ~$20B. El fundador Jonathan Ross se incorporó a Nvidia. Deal bajo revisión antimonopolio.",
  },
  {
    name: "DocuSign", logo: "/logos/mvp/docusign.svg",
    sector: "SaaS · Legal Tech",
    desc: "Líder global en firma electrónica y gestión de acuerdos digitales con 1M+ clientes en 180 países.",
    founded: "2003", status: "Pública (NASDAQ: DOCU)", valuation: "~$9.4B market cap",
    note: "IPO en abril 2018. Controla ~70% del mercado de firma electrónica en EE.UU. Programa de recompra de $2.6B anunciado en 2026.",
  },
  {
    name: "SoFi", logo: "/logos/mvp/sofi.svg",
    sector: "Fintech · Banca digital",
    desc: "Banco digital que ofrece préstamos estudiantiles, hipotecas, inversiones y tarjetas de crédito.",
    founded: "2011", status: "Pública (NASDAQ: SOFI)", valuation: "~$20B market cap",
    note: "Salida a bolsa en junio 2021 vía SPAC. Obtuvo licencia bancaria en 2022. Market cap duplicado en 2025.",
  },
  {
    name: "Figure AI", logo: "/logos/mvp/figure-ai.svg",
    sector: "Robótica · IA",
    desc: "Desarrolla robots humanoides autónomos para trabajo industrial. Colaboración activa con BMW.",
    founded: "2022", status: "Privada", valuation: "$39B (sep 2025)",
    note: "Serie C de +$1B. Respaldada por Nvidia, Microsoft, Jeff Bezos y el OpenAI Startup Fund. Funding total: ~$1.9B.",
  },
  {
    name: "Kodiak Robotics", logo: "/logos/mvp/kodiak.svg",
    sector: "Transporte · Autonomía",
    desc: "Desarrolla camiones autónomos de largo recorrido para logística comercial en EE.UU.",
    founded: "2018", status: "Pública (NASDAQ: KDK)", valuation: "~$1.3B market cap",
    note: "Salida a bolsa vía SPAC en septiembre 2025. Contratos activos con el Departamento de Defensa de EE.UU.",
  },
  {
    name: "Epirus", logo: "/logos/mvp/epirus.svg", darkBg: true,
    sector: "Defensa · Energía dirigida",
    desc: "Fabrica sistemas de energía dirigida de alta potencia (HPM) para neutralizar drones y electrónica enemiga.",
    founded: "2018", status: "Privada", valuation: ">$1B (mar 2025)",
    note: "Serie D de $250M (mar 2025) con participación de General Dynamics. Financiamiento total: ~$595M.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mt-8 mb-4">
      <div className="h-[1.5px] w-5 bg-primary" />
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary whitespace-nowrap">{children}</h3>
      <div className="h-[1.5px] flex-1 bg-border" />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────

interface MVPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MVPModal({ open, onOpenChange }: MVPModalProps) {
  const allCompanies = [...companies, ...companies];
  const { t } = useLanguage();
  const [selected, setSelected] = useState<CompanyDetail | null>(null);

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="w-full min-w-0">

          {/* ── Header ────────────────────────────────────────────────── */}
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-3xl font-serif text-primary">{t("mvp.title")}</DialogTitle>
            <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">{t("mvp.subtitle")}</p>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">{t("mvp.desc")}</p>

          {/* ── KPI Metrics ───────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
            {kpis.map((k) => (
              <div key={k.label} className="bg-primary text-primary-foreground rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{k.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide mt-1 opacity-80">{k.label}</p>
                <p className="text-[10px] opacity-60 mt-0.5">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Platform Pillars ──────────────────────────────────────── */}
          <SectionTitle>Plataforma integrada</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {platforms.map((p) => (
              <div key={p.title} className="flex items-start gap-3 bg-secondary/60 border border-border rounded-md px-4 py-3">
                <p.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-foreground">{p.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Recognition ───────────────────────────────────────────── */}
          <SectionTitle>Reconocimiento institucional</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-border rounded-xl p-4 bg-background">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Bloomberg</p>
              <p className="text-base font-bold text-primary leading-tight">Top 10 Venture Funds</p>
              <p className="text-[11px] text-muted-foreground mt-1">Under $500M — Vintages 2017–2022</p>
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
            <div className="border border-border rounded-xl p-4 bg-background">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">PitchBook</p>
              <p className="text-base font-bold text-primary leading-tight">Top 10 Global Secondaries Buyer</p>
              <p className="text-[11px] text-muted-foreground mt-1">Top 5 en USA — Deal count 2015–2025</p>
              <div className="mt-3 bg-secondary/40 rounded-lg px-3 py-2">
                <p className="text-[11px] text-foreground"><span className="font-bold text-primary">25 transacciones</span> como comprador institucional directo de VC secondaries a nivel global</p>
              </div>
              <div className="mt-2 flex gap-2">
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

          {/* ── Fund Performance ──────────────────────────────────────── */}
          <SectionTitle>Track record — All-Star Funds</SectionTitle>
          <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-2.5 mb-4 text-[12px] text-foreground">
            Consistentemente supera el top decil de los competidores <span className="font-bold text-primary">en la mitad del tiempo</span> — duración promedio de fondos: <span className="font-bold">3.7 años</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* DPI Chart */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Net DPI vs Benchmark</p>
              <div className="h-52">
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
              <div className="flex gap-3 mt-1">
                {[["hsl(214,60%,32%)","MVP"], ["hsl(214,30%,68%)","VC Top Decile"], ["hsl(214,20%,82%)","VC Secondary"]].map(([c,l]) => (
                  <span key={l} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c }} />{l}
                  </span>
                ))}
              </div>
            </div>

            {/* IRR Chart */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Net IRR vs Benchmark</p>
              <div className="h-52">
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
              <div className="flex gap-3 mt-1">
                {[["hsl(214,60%,32%)","MVP"], ["hsl(214,30%,68%)","VC Median"], ["hsl(214,20%,82%)","VC Secondary"]].map(([c,l]) => (
                  <span key={l} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c }} />{l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Secondary Market Volume ────────────────────────────────── */}
          <SectionTitle>Mercado secundario de VC — volumen directo</SectionTitle>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-primary/5 border border-primary/15 rounded-lg px-3 py-2.5">
              <p className="text-xl font-bold text-primary">$69B</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Volumen en 2024</p>
            </div>
            <div className="bg-primary/5 border border-primary/15 rounded-lg px-3 py-2.5">
              <p className="text-xl font-bold text-primary">~$3.4T</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Universo de inversión MVP</p>
            </div>
            <div className="bg-primary/5 border border-primary/15 rounded-lg px-3 py-2.5">
              <p className="text-xl font-bold text-primary">$311B</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">VC Dry Powder (Q1 2025)</p>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `$${v}B`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                  formatter={(v: number) => [`$${v}B`, "Volumen"]}
                />
                <Bar dataKey="v" name="v" radius={[3,3,0,0]}>
                  {volumeData.map((_, i) => (
                    <Cell key={i} fill={i === volumeData.length - 1 ? "hsl(214 60% 32%)" : "hsl(214 40% 55%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">Fuente: Industry Ventures, PitchBook</p>

          {/* ── Tender Offers + Sector Returns ────────────────────────── */}
          <SectionTitle>Demanda institucional — Tender offers (últimos 24 meses)</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
            {tenderOffers.map((t) => (
              <div key={t.company} className="border border-border rounded-lg p-3 text-center bg-background">
                <p className="text-sm font-bold text-foreground">{t.company}</p>
                <p className="text-base font-bold text-primary mt-1">${(t.volume / 1000).toFixed(1) === t.volume.toString() ? t.volume : (t.volume >= 1000 ? `${(t.volume/1000).toFixed(1)}B` : `${t.volume}M`)}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Fuente: PitchBook, Bloomberg, CNBC</p>

          {/* ── Tech Sector Returns ───────────────────────────────────── */}
          <SectionTitle>Retorno anualizado a 10 años por sector</SectionTitle>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorReturns} layout="vertical" barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}%`} domain={[0, 26]} />
                <YAxis type="category" dataKey="sector" tick={{ fontSize: 10 }} stroke="hsl(215 12% 60%)" width={100} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                  formatter={(v: number) => [`${v}%`, "Retorno anualizado"]}
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
          <p className="text-[10px] text-muted-foreground mt-1">Retorno anualizado de ETFs SPDR — 10 años a 10/31/2025</p>

          {/* ── Private Mag 7 ─────────────────────────────────────────── */}
          <SectionTitle>El nuevo "Magnificent 7" — privado</SectionTitle>
          <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 mb-3 text-[12px] text-foreground leading-relaxed">
            Las empresas más valiosas del mundo ya no están en bolsa. El acceso a estas compañías requiere exposición en mercados privados — exactamente donde MVP opera.
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
            {privMag7.slice(0, 4).map((c) => (
              <div key={c.name} className="border border-border rounded-lg p-3 text-center bg-background hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-foreground">{c.name}</p>
                <p className="text-base font-bold text-primary mt-1">{c.val}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {privMag7.slice(4).map((c) => (
              <div key={c.name} className="border border-border rounded-lg p-3 text-center bg-background hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-foreground">{c.name}</p>
                <p className="text-base font-bold text-primary mt-1">{c.val}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-secondary/40 rounded-lg p-3 text-center">
              <p className="text-[11px] text-muted-foreground">Edad media en IPO — Mag 7 público</p>
              <p className="text-xl font-bold text-foreground mt-1">6 años</p>
            </div>
            <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 text-center">
              <p className="text-[11px] text-muted-foreground">Edad media actual — Mag 7 privado</p>
              <p className="text-xl font-bold text-primary mt-1">13 años</p>
            </div>
          </div>

          {/* ── Portfolio Marquee ──────────────────────────────────────── */}
          <SectionTitle>{t("mvp.portfolio")}</SectionTitle>
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

        </div>
      </DialogContent>
    </Dialog>

    {/* ── Company detail popup ─────────────────────────────────────────── */}
    <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
      <DialogContent className="max-w-sm w-[calc(100vw-2rem)]">
        {selected && (
          <div className="pt-1">
            <div className="flex items-center gap-4 mb-4">
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

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{selected.desc}</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Fundada</p>
                <p className="text-sm font-bold text-foreground">{selected.founded}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Estado</p>
                <p className="text-sm font-bold text-foreground leading-tight">{selected.status}</p>
              </div>
              <div className="bg-primary/8 rounded-lg p-3 col-span-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Valuación</p>
                <p className="text-sm font-bold text-primary">{selected.valuation}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground/80 border-t border-border pt-3 leading-relaxed">{selected.note}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}
