import { useEffect, useState } from "react";
import { GVVEngine } from "@/components/GVVEngine";
import { GVVHero } from "@/components/GVVHero";
import { Reveal } from "@/components/Reveal";
import { Download } from "lucide-react";
import gvvMarketImg from "@/assets/gvv-market-data.jpg";
import gvvTowerImg from "@/assets/gvv-glass-tower.jpg";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { track } from "@/lib/analytics";

// ── Static data (language-independent) ───────────────────────────────────

const annualComparison = [
  { year: "2021", gvv: 4.51, sp: 26.89 },
  { year: "2022", gvv: 6.85, sp: -19.44 },
  { year: "2023", gvv: 22.02, sp: 24.23 },
  { year: "2024", gvv: 9.88, sp: 23.31 },
  { year: "2025", gvv: 38.02, sp: 16.39 },
];

const allocationValues = [26.8, 24, 19, 10.5, 9.8, 3.4, 1.9, 4.6];

const PIE_COLORS = ["#1e3a5f","#2563a8","#6b9dd1","#4a7fb5","#8fb8d8","#b8d4ea","#c5ddf0","#dceef8"];

const currencies = [
  { name: "USD",  value: 85.5 },
  { name: "MXN",  value: 10.6 },
  { name: "GBP",  value: 2.2  },
  { name: "EUR",  value: 1.6  },
  { name: "ASIA", value: 0.2  },
];

const monthLabelsEs = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const monthLabelsEn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const monthlyReturns = [
  { year:"2013", m:[null,null,null,null,null,null,2.65,-12.72,15.92,14.82,5.99,10.47],   ytd:39.61 },
  { year:"2014", m:[-2.29,2.90,0.42,1.10,0.10,1.89,-1.51,10.32,-1.49,0.99,null,null],    ytd:12.56 },
  { year:"2015", m:[null,null,null,null,null,null,null,null,null,null,null,null],       ytd:0     },
  { year:"2016", m:[null,null,null,null,null,null,-0.40,3.01,-1.74,-0.97,1.77,2.31],     ytd:3.94  },
  { year:"2017", m:[1.16,-0.61,1.92,-1.20,-5.84,5.57,1.13,3.79,-1.39,-0.86,0.78,-0.08],  ytd:3.99  },
  { year:"2018", m:[3.05,3.20,4.38,-0.30,-2.63,1.13,1.28,0.70,-1.01,-1.01,2.47,-7.78],   ytd:2.90  },
  { year:"2019", m:[1.60,0.98,-1.16,2.85,-5.78,4.73,-4.06,-4.49,0.37,-0.65,0.77,0.03],   ytd:-5.21 },
  { year:"2020", m:[-0.03,-7.95,-1.11,-5.21,1.27,8.13,-7.47,4.50,15.44,-3.51,8.34,0.80], ytd:11.08 },
  { year:"2021", m:[7.70,5.16,-3.47,6.23,0.46,13.05,-8.71,-2.62,-5.46,1.57,-8.83,1.82],  ytd:4.51  },
  { year:"2022", m:[-3.17,-2.16,4.86,-9.41,3.98,-1.68,1.16,11.53,-1.94,1.94,2.76,0.22],  ytd:6.85  },
  { year:"2023", m:[4.88,1.29,1.55,-0.72,3.10,3.45,3.64,-1.53,-1.10,-3.05,5.81,3.17],    ytd:22.02 },
  { year:"2024", m:[0.29,2.88,2.76,-2.13,3.27,-2.19,0.69,2.27,4.67,-0.70,0.41,-2.46],    ytd:9.88  },
  { year:"2025", m:[5.18,0.90,-2.92,-0.27,3.19,3.06,3.88,3.03,9.13,1.49,4.35,2.11],      ytd:38.02 },
  { year:"2026", m:[0.17,-2.70,-2.73,7.27,2.93,null,null,null,null,null,null,null],      ytd:4.68  },
];

const preIpoEs = [
  { name:"Anthropic", year:"2021", focus:"IA ética y segura",       product:"Claude — modelo de lenguaje avanzado",   diff:"IA con límites claros. B2B y B2C."          },
  { name:"SpaceX",    year:"2002", focus:"Exploración espacial",    product:"Falcon 9, Starlink, Starship",           diff:"Cohetes reutilizables. Líder aeroespacial."  },
  { name:"Groq",      year:"2016", focus:"Chips de IA",             product:"LPU — acelerador de inferencia",        diff:"Más rápido y eficiente que NVIDIA."          },
];
const preIpoEn = [
  { name:"Anthropic", year:"2021", focus:"Ethical and safe AI",     product:"Claude — advanced language model",      diff:"AI with clear limits. B2B and B2C."         },
  { name:"SpaceX",    year:"2002", focus:"Space exploration",       product:"Falcon 9, Starlink, Starship",          diff:"Reusable rockets. Aerospace leader."         },
  { name:"Groq",      year:"2016", focus:"AI chips",                product:"LPU — inference accelerator",           diff:"Faster and more efficient than NVIDIA."      },
];

const successStories = [
  { name:"Spotify",  entry:"$6.5B",  ipo:"$26.5B", cap:"$114.46B" },
  { name:"Coinbase", entry:"$8.0B",  ipo:"$93.0B", cap:"$66.68B"  },
  { name:"Airbnb",   entry:"$24.0B", ipo:"$47B",   cap:"$84.85B"  },
  { name:"Palantir", entry:"$4.0B",  ipo:"$16B",   cap:"$418.68B" },
];

const realizedReturns = [
  { name:"BT Group",          ret:"+100.70%" },
  { name:"Intesa Sanpaolo",   ret:"+82.69%"  },
  { name:"Samsung",           ret:"+60.05%"  },
  { name:"MédicaSur",         ret:"+45.11%"  },
];

const activePositionsEs = [
  {
    name: "Harley-Davidson (HOG)",
    thesis: "Marca icónica, FCF sólido, valuación comprimida. Exposición vía opciones a $17.45/acción.",
    metrics: [["P/B","0.66x (1.09x)"],["P/E","4.85x (11.11x)"],["EV/EBITDA","8.43x (9.54x)"]],
  },
  {
    name: "Nemak",
    thesis: "Líder en componentes automotrices, altas barreras de entrada. Entrada a $2.71/acción.",
    metrics: [["P/B","0.16x (1.19x)"],["P/E","3.51x (17x)"],["Retorno","+42% en 1 año"]],
  },
];
const activePositionsEn = [
  {
    name: "Harley-Davidson (HOG)",
    thesis: "Iconic brand, solid FCF, compressed valuation. Options exposure at $17.45/share.",
    metrics: [["P/B","0.66x (1.09x)"],["P/E","4.85x (11.11x)"],["EV/EBITDA","8.43x (9.54x)"]],
  },
  {
    name: "Nemak",
    thesis: "Leader in automotive components, high barriers to entry. Entry at $2.71/share.",
    metrics: [["P/B","0.16x (1.19x)"],["P/E","3.51x (17x)"],["Return","+42% in 1 year"]],
  },
];

const algoStrategies = [
  { name:"S&P 500 Strategy",    cagr:21.66, bench:11.45, alpha:"+10.21%", y26:"10.93%", y25:"19.35%", y24:"33.76%"  },
  { name:"Russell 2000 Strategy",cagr:59.81, bench:8.79,  alpha:"+51.02%", y26:"4.94%",  y25:"17.42%", y24:"50.44%"  },
  { name:"ADR Strategy",         cagr:51.57, bench:10.57, alpha:"+41.00%", y26:"14.81%", y25:"115.38%",y24:"119.98%" },
];

// ── 5Y cumulative performance (base 100 = Jan 2021) ──────────────────────
// GVV: computed from exact monthly returns in the institutional presentation
// S&P: computed from historical monthly returns calibrated to match annual totals
const cumulativeData = [
  { l:"Ene '21", gvv:107.70, sp:99.00 },  { l:"Feb '21", gvv:113.26, sp:101.97 },
  { l:"Mar '21", gvv:109.33, sp:106.05 },  { l:"Abr '21", gvv:116.14, sp:111.35 },
  { l:"May '21", gvv:116.68, sp:112.46 },  { l:"Jun '21", gvv:131.90, sp:114.71 },
  { l:"Jul '21", gvv:120.41, sp:117.00 },  { l:"Ago '21", gvv:117.25, sp:120.51 },
  { l:"Sep '21", gvv:110.85, sp:114.48 },  { l:"Oct '21", gvv:112.59, sp:122.49 },
  { l:"Nov '21", gvv:102.65, sp:121.27 },  { l:"Dic '21", gvv:104.52, sp:126.55 },
  { l:"Ene '22", gvv:101.20, sp:120.22 },  { l:"Feb '22", gvv:98.99,  sp:116.61 },
  { l:"Mar '22", gvv:103.80, sp:121.27 },  { l:"Abr '22", gvv:94.04,  sp:110.36 },
  { l:"May '22", gvv:97.78,  sp:110.36 },  { l:"Jun '22", gvv:96.14,  sp:101.53 },
  { l:"Jul '22", gvv:97.25,  sp:110.67 },  { l:"Ago '22", gvv:108.47, sp:106.24 },
  { l:"Sep '22", gvv:106.37, sp:96.68  },  { l:"Oct '22", gvv:108.43, sp:104.41 },
  { l:"Nov '22", gvv:111.42, sp:109.63 },  { l:"Dic '22", gvv:111.67, sp:103.05 },
  { l:"Ene '23", gvv:117.12, sp:109.23 },  { l:"Feb '23", gvv:118.63, sp:105.95 },
  { l:"Mar '23", gvv:120.47, sp:110.19 },  { l:"Abr '23", gvv:119.60, sp:111.29 },
  { l:"May '23", gvv:123.31, sp:111.29 },  { l:"Jun '23", gvv:127.57, sp:117.97 },
  { l:"Jul '23", gvv:132.21, sp:121.51 },  { l:"Ago '23", gvv:130.19, sp:119.08 },
  { l:"Sep '23", gvv:128.76, sp:113.13 },  { l:"Oct '23", gvv:124.83, sp:110.87 },
  { l:"Nov '23", gvv:132.09, sp:121.96 },  { l:"Dic '23", gvv:136.28, sp:127.45 },
  { l:"Ene '24", gvv:136.67, sp:130.00 },  { l:"Feb '24", gvv:140.61, sp:136.50 },
  { l:"Mar '24", gvv:144.49, sp:140.60 },  { l:"Abr '24", gvv:141.41, sp:134.98 },
  { l:"May '24", gvv:146.04, sp:141.73 },  { l:"Jun '24", gvv:142.84, sp:145.98 },
  { l:"Jul '24", gvv:143.83, sp:147.44 },  { l:"Ago '24", gvv:147.10, sp:150.39 },
  { l:"Sep '24", gvv:153.97, sp:153.40 },  { l:"Oct '24", gvv:152.89, sp:151.87 },
  { l:"Nov '24", gvv:153.52, sp:162.50 },  { l:"Dic '24", gvv:149.74, sp:158.44 },
  { l:"Ene '25", gvv:157.50, sp:163.19 },  { l:"Feb '25", gvv:158.92, sp:161.56 },
  { l:"Mar '25", gvv:154.28, sp:155.10 },  { l:"Abr '25", gvv:153.86, sp:147.35 },
  { l:"May '25", gvv:158.77, sp:157.66 },  { l:"Jun '25", gvv:163.63, sp:163.97 },
  { l:"Jul '25", gvv:169.98, sp:167.25 },  { l:"Ago '25", gvv:175.13, sp:170.60 },
  { l:"Sep '25", gvv:191.12, sp:174.01 },  { l:"Oct '25", gvv:193.97, sp:179.23 },
  { l:"Nov '25", gvv:202.41, sp:189.98 },  { l:"Dic '25", gvv:206.68, sp:184.66 },
  { l:"Ene '26", gvv:207.03, sp:190.20 },  { l:"Feb '26", gvv:201.43, sp:187.35 },
  { l:"Mar '26", gvv:195.93, sp:178.11 },  { l:"Abr '26", gvv:210.18, sp:196.83 },
  { l:"May '26", gvv:216.34, sp:207.18 },
];


// ── Helpers ───────────────────────────────────────────────────────────────

const RADIAN = Math.PI / 180;

function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, value }: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; value: number;
}) {
  if (value < 5) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={10} fontWeight={700}>{value}%</text>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="flex items-center gap-5 mt-20 mb-8">
        <div className="h-[1.5px] w-5 bg-primary" />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary whitespace-nowrap">{children}</h3>
        <div className="h-[1.5px] flex-1 bg-border" />
      </div>
    </Reveal>
  );
}

// ── Component ─────────────────────────────────────────────────────────────

export default function GVVPage() {
  const [docFile, setDocFile] = useState<{ name: string; file_url: string } | null>({
    name: "Cretum Letter - May 2026",
    file_url: "/docs/Cretum-Letter-May-2026.pdf",
  });
  const { t, lang } = useLanguage();

  const kpis = [
    { label: t("gvv.kpi1.label"), value: "12.20%", sub: t("gvv.kpi1.sub") },
    { label: t("gvv.kpi2.label"), value: "3.98x",  sub: t("gvv.kpi2.sub") },
    { label: t("gvv.kpi3.label"), value: "0.74",   sub: t("gvv.kpi3.sub") },
    { label: t("gvv.kpi4.label"), value: "4.63%",  sub: t("gvv.kpi4.sub") },
  ];

  const allocationData = [
    { name: "Private Equity",                   value: 26.8 },
    { name: t("gvv.alloc.acciones_usa"),        value: 24   },
    { name: "Cash",                             value: 19   },
    { name: lang === "es" ? "Algorítmicos" : "Algorithmic", value: 10.5 },
    { name: t("gvv.alloc.acciones_mx"),         value: 9.8  },
    { name: t("gvv.alloc.acciones_eur"),        value: 3.4  },
    { name: lang === "es" ? "Acciones Asia" : "Asian Shares", value: 1.9 },
    { name: t("gvv.alloc.otros"),               value: 4.6  },
  ];

  const monthLabels = lang === "es" ? monthLabelsEs : monthLabelsEn;
  const preIpo = lang === "es" ? preIpoEs : preIpoEn;
  const activePositions = lang === "es" ? activePositionsEs : activePositionsEn;

  const chartData = lang === "es" ? cumulativeData : cumulativeData.map((d) => ({
    ...d,
    l: d.l
      .replace(/^Ene /, "Jan ").replace(/^Abr /, "Apr ")
      .replace(/^Ago /, "Aug ").replace(/^Dic /, "Dec "),
  }));

  const structureItems = [
    { label: t("gvv.struct.legal"),     value: "Cretum Partners GVV Fund, LP", sub: lang === "es" ? "Ontario, Canadá" : "Ontario, Canada" },
    { label: t("gvv.struct.gp"),        value: "Cretum Advisory LLC",           sub: "Delaware, USA"         },
    { label: t("gvv.struct.custodian"), value: "Bank of New York Mellon",       sub: t("gvv.struct.custodian.sub") },
    { label: t("gvv.struct.nav"),       value: "NAV Consulting",                sub: t("gvv.struct.nav.sub") },
    { label: t("gvv.struct.auditor"),   value: "Deloitte",                      sub: t("gvv.struct.auditor.sub") },
    { label: t("gvv.struct.valued"),    value: "USD",                           sub: t("gvv.struct.multicurrency") },
  ];

  useEffect(() => {
    supabase.from("gvv_documents").select("name, file_url")
      .order("created_at", { ascending: false }).limit(1).maybeSingle()
      .then(({ data }) => { if (data) setDocFile(data); });
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-40 bg-background">

        {/* ── Visual Hero ─────────────────────────────────────────────── */}
        <div data-track-section="gvv-hero"><GVVHero /></div>

        {/* ── GVV Engine ──────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-8" data-track-section="gvv-engine">
          <GVVEngine />
        </div>

        {/* ══ Group 1: Annual + Portfolio Value — right image ═══════════ */}
        <div className="relative overflow-hidden" data-track-section="gvv-rendimientos">
          <div className="hidden lg:block absolute right-0 top-20 w-[30%] h-[calc(100%-5rem)] pointer-events-none select-none">
            <img src={gvvMarketImg} alt="" className="w-full h-full object-cover object-center grayscale opacity-[0.08] blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="max-w-6xl mx-auto px-8 relative z-10">

            {/* ── Rendimiento Anual vs S&P 500 ──────────────────────────── */}
            <SectionTitle>{t("gvv.section.annual")}</SectionTitle>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { val: "+38.02%", sub: "GVV 2025 vs S&P +16.39%" },
                { val: "+6.85%",  sub: "GVV 2022 vs S&P −19.44%" },
                { val: "~130%",   sub: t("gvv.hl3.sub") },
              ].map((h, i) => (
                <Reveal key={h.val} delay={i * 0.1} className="reveal-scale">
                  <div className="bg-primary/5 border border-primary/15 rounded-lg px-5 py-4">
                    <p className="text-xl font-bold text-primary">{h.val}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{h.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          <Reveal>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={annualComparison} barGap={4} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215 12% 60%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                  formatter={(value: number, name: string) => [
                    `${value > 0 ? "+" : ""}${value.toFixed(2)}%`,
                    name === "gvv" ? "GVV" : "S&P 500",
                  ]}
                />
                <ReferenceLine y={0} stroke="hsl(215 12% 55%)" strokeWidth={1} />
                <Bar dataKey="gvv" name="gvv" fill="hsl(214 60% 32%)" radius={[3,3,0,0]} />
                <Bar dataKey="sp"  name="sp"  fill="hsl(214 30% 72%)" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-5 justify-end mt-4">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "hsl(214,60%,32%)" }} />GVV
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "hsl(214,30%,72%)" }} />S&P 500
            </span>
          </div>
          </Reveal>

          {/* ── Valor del Portafolio — 5Y vs S&P 500 ────────────────────── */}
          <SectionTitle>{t("gvv.section.port_value")}</SectionTitle>
          <Reveal>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                <XAxis
                  dataKey="l"
                  tick={{ fontSize: 10 }}
                  stroke="hsl(215 12% 60%)"
                  interval={11}
                  tickFormatter={(v) => v.split(" ")[1]}
                />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" domain={[85, 215]}
                  tickFormatter={(v) => `${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(214 20% 85%)", borderRadius: 6, fontSize: 12 }}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(1)}`,
                    name === "gvv" ? "GVV" : "S&P 500",
                  ]}
                  labelFormatter={(l) => l}
                />
                <Line type="monotone" dataKey="gvv" name="gvv" stroke="hsl(214 60% 32%)"
                  strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="sp" name="sp" stroke="hsl(214 30% 68%)"
                  strokeWidth={2} dot={false} activeDot={{ r: 4 }} strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-5 justify-end mt-4">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="w-5 h-[2.5px] inline-block rounded" style={{ background: "hsl(214,60%,32%)" }} />GVV
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="w-5 h-[2px] inline-block rounded" style={{ background: "hsl(214,30%,68%)", borderTop: "2px dashed hsl(214,30%,68%)" }} />S&P 500
            </span>
          </div>
          </Reveal>

          </div>{/* end max-w-6xl group 1 */}
        </div>{/* end group 1 relative */}

        {/* ══ Group 2: Portfolio Structure + Monthly + Institutional — left image ═ */}
        <div className="relative overflow-hidden" data-track-section="gvv-composicion">
          <div className="hidden lg:block absolute left-0 top-0 w-[30%] h-full pointer-events-none select-none">
            <img src={gvvTowerImg} alt="" className="w-full h-full object-cover object-center grayscale opacity-[0.07]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 0%, transparent 10%, var(--background, white) 55%)" }} />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-background" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="max-w-6xl mx-auto px-8 relative z-10">

          {/* ── Portfolio Structure ──────────────────────────────────────── */}
          <SectionTitle>{t("gvv.section.port_struct")}</SectionTitle>

          <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pie */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("gvv.alloc.by_asset")}</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocationData} cx="50%" cy="50%" outerRadius={75}
                      dataKey="value" labelLine={false}
                      label={(props) => <PieLabel {...props} />}
                    >
                      {allocationData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number, name: string) => [`${v}%`, name]}
                      contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-4">
                {allocationData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-[11px] text-muted-foreground">{d.name}: <strong className="text-foreground">{d.value}%</strong></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Currency + Skin in the game */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">{t("gvv.currency.label")}</p>
                <div className="space-y-2.5">
                  {currencies.map((c) => (
                    <div key={c.name} className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-foreground w-10">{c.name}</span>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${c.value}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary text-primary-foreground rounded-xl p-6 mt-auto">
                <p className="text-2xl font-bold">76%</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide mt-1 opacity-80">Skin in the Game</p>
                <p className="text-[11px] opacity-70 mt-1.5 leading-relaxed">{t("gvv.skin.desc")}</p>
              </div>
            </div>
          </div>
          </Reveal>

          {/* ── Monthly Returns Table ────────────────────────────────────── */}
          <SectionTitle>{t("gvv.section.monthly")}</SectionTitle>
          <Reveal>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="text-left px-3 py-2 font-semibold text-foreground">{t("gvv.table.year")}</th>
                  {monthLabels.map((m) => (
                    <th key={m} className="px-1.5 py-2 font-semibold text-muted-foreground text-center">{m}</th>
                  ))}
                  <th className="px-3 py-2 font-semibold text-foreground text-center">YTD</th>
                </tr>
              </thead>
              <tbody>
                {monthlyReturns.map((row) => {
                  const hasData = row.m.some((v) => v !== null);
                  return (
                  <tr key={row.year} className="border-t border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-3 py-1.5 font-semibold text-foreground">{row.year}</td>
                    {row.m.map((v, i) => (
                      <td key={i} className={`px-1.5 py-1.5 text-center font-medium ${
                        v === null ? "text-muted-foreground/30"
                        : v >= 0   ? "text-emerald-700 dark:text-emerald-400"
                                   : "text-red-600 dark:text-red-400"
                      }`}>
                        {v === null ? "—" : `${v > 0 ? "+" : ""}${v.toFixed(2)}%`}
                      </td>
                    ))}
                    <td className={`px-3 py-1.5 text-center font-bold ${
                      !hasData            ? "text-muted-foreground/30"
                      : row.ytd >= 0      ? "text-emerald-700 dark:text-emerald-400"
                                          : "text-red-600 dark:text-red-400"
                    }`}>
                      {!hasData ? "—" : `${row.ytd > 0 ? "+" : ""}${row.ytd.toFixed(2)}%`}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </Reveal>
          <p className="text-[10px] text-muted-foreground mt-1.5">{t("gvv.table.disclaimer")}</p>

          {/* ── Institutional Structure ──────────────────────────────────── */}

          <SectionTitle>{t("gvv.section.inst")}</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {structureItems.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} className="reveal-scale">
                <div className="border border-border rounded-lg px-3 py-3 bg-background">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
                  <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>

          </div>{/* end max-w-6xl group 2 */}
        </div>{/* end group 2 relative */}

        {/* ── Philosophy + Download ────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-8" data-track-section="gvv-descarga">
          <Reveal>
          {docFile ? (
            <a href={docFile.file_url} target="_blank" rel="noopener noreferrer"
              onClick={() => track("descarga-gvv", { documento: docFile.name })}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity w-full justify-center mt-16">
              <Download className="w-4 h-4" />
              {t("gvv.download")}
            </a>
          ) : (
            <button disabled
              className="flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-md text-sm font-medium w-full justify-center cursor-not-allowed mt-16">
              <Download className="w-4 h-4" />
              {t("gvv.noDoc")}
            </button>
          )}
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
