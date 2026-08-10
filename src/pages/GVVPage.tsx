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
import {
  kpis as kpiVals,
  annualComparison,
  allocationValues,
  currencies,
  monthlyReturns,
  preIpoEs, preIpoEn,
  successStories,
  realizedReturns,
  activePositionsEs, activePositionsEn,
  algoStrategies,
  skinPct,
  letterDoc,
  cumulativeData,
} from "@/lib/gvvData";

// ── Static data (language-independent) — el resto vive en @/lib/gvvData ──
const PIE_COLORS = ["#1e3a5f","#2563a8","#6b9dd1","#4a7fb5","#8fb8d8","#b8d4ea","#c5ddf0","#dceef8"];

const monthLabelsEs = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const monthLabelsEn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


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
  const [docFile, setDocFile] = useState<{ name: string; file_url: string } | null>(letterDoc);
  const { t, lang } = useLanguage();

  const kpis = [
    { label: t("gvv.kpi1.label"), value: kpiVals.cagr5,  sub: t("gvv.kpi1.sub") },
    { label: t("gvv.kpi2.label"), value: kpiVals.hist,   sub: t("gvv.kpi2.sub") },
    { label: t("gvv.kpi3.label"), value: kpiVals.sharpe, sub: t("gvv.kpi3.sub") },
    { label: t("gvv.kpi4.label"), value: kpiVals.vol,    sub: t("gvv.kpi4.sub") },
  ];

  const allocationData = [
    { name: "Private Equity",                                value: allocationValues[0] },
    { name: t("gvv.alloc.acciones_usa"),                     value: allocationValues[1] },
    { name: "Cash",                                          value: allocationValues[2] },
    { name: lang === "es" ? "Algorítmicos" : "Algorithmic",  value: allocationValues[3] },
    { name: t("gvv.alloc.acciones_mx"),                      value: allocationValues[4] },
    { name: t("gvv.alloc.acciones_eur"),                     value: allocationValues[5] },
    { name: lang === "es" ? "Acciones Asia" : "Asian Shares",value: allocationValues[6] },
    { name: t("gvv.alloc.otros"),                            value: allocationValues[7] },
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
    // Si el robot ya inyecto la carta vigente via gvv-data.js, esa manda.
    if ((window as unknown as { __GVVDATA?: { letterDoc?: unknown } }).__GVVDATA?.letterDoc) return;
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
                <p className="text-2xl font-bold">{skinPct}%</p>
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
