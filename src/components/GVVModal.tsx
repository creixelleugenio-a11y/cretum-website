import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrendingUp, Shield, BarChart3, Download } from "lucide-react";
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
  cumulativeData,
} from "@/lib/gvvData";

// ── Static data (language-independent) ───────────────────────────────────

const PIE_COLORS = ["#1e3a5f","#2563a8","#6b9dd1","#4a7fb5","#8fb8d8","#b8d4ea","#c5ddf0","#dceef8"];

const monthLabelsEs = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const monthLabelsEn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── 5Y cumulative performance (base 100 = Jan 2021) ──────────────────────
// GVV: computed from exact monthly returns in the institutional presentation
// S&P: computed from historical monthly returns calibrated to match annual totals
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
    <div className="flex items-center gap-3 mt-8 mb-4">
      <div className="h-[1.5px] w-5 bg-primary" />
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary whitespace-nowrap">{children}</h3>
      <div className="h-[1.5px] flex-1 bg-border" />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────

interface GVVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GVVModal({ open, onOpenChange }: GVVModalProps) {
  const [docFile, setDocFile] = useState<{ name: string; file_url: string } | null>({
    name: "Cretum Letter - May 2026",
    file_url: "/docs/Cretum-Letter-May-2026.pdf",
  });
  const { t, lang } = useLanguage();

  const kpis = [
    { label: t("gvv.kpi1.label"), value: kpiVals.cagr5,  sub: t("gvv.kpi1.sub") },
    { label: t("gvv.kpi2.label"), value: kpiVals.hist,   sub: t("gvv.kpi2.sub") },
    { label: t("gvv.kpi3.label"), value: kpiVals.sharpe, sub: t("gvv.kpi3.sub") },
    { label: t("gvv.kpi4.label"), value: kpiVals.vol,    sub: t("gvv.kpi4.sub") },
  ];

  const allocationData = [
    { name: t("gvv.alloc.private_equity"),                   value: allocationValues[0] },
    { name: t("gvv.alloc.acciones_usa"),                     value: allocationValues[1] },
    { name: t("gvv.alloc.cash"),                             value: allocationValues[2] },
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
    { label: t("gvv.struct.gp"),        value: "Cretum Advisory LLC",           sub: t("gvv.struct.gp.sub")  },
    { label: t("gvv.struct.custodian"), value: "Bank of New York Mellon",       sub: t("gvv.struct.custodian.sub") },
    { label: t("gvv.struct.nav"),       value: "NAV Consulting",                sub: t("gvv.struct.nav.sub") },
    { label: t("gvv.struct.auditor"),   value: "Deloitte",                      sub: t("gvv.struct.auditor.sub") },
    { label: t("gvv.struct.valued"),    value: "USD",                           sub: t("gvv.struct.multicurrency") },
  ];

  useEffect(() => {
    if (!open) return;
    supabase.from("gvv_documents").select("name, file_url")
      .order("created_at", { ascending: false }).limit(1).maybeSingle()
      .then(({ data }) => { if (data) setDocFile(data); });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif text-primary">{t("gvv.title")}</DialogTitle>
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mt-1">{t("gvv.subtitle")}</p>
        </DialogHeader>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">{t("gvv.desc")}</p>

        {/* ── 3 Strategy Pillars ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          {[
            { icon: TrendingUp, title: t("gvv.growth"), desc: t("gvv.growth.desc") },
            { icon: BarChart3,  title: t("gvv.value"),  desc: t("gvv.value.desc")  },
            { icon: Shield,     title: t("gvv.hedge"),  desc: t("gvv.hedge.desc")  },
          ].map((s) => (
            <div key={s.title} className="flex items-center gap-3 bg-secondary/60 border border-border rounded-md px-4 py-3 flex-1">
              <s.icon className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">{s.title}</p>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── KPI Metrics ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
          {kpis.map((k) => (
            <div key={k.label} className="bg-primary text-primary-foreground rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{k.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide mt-1 opacity-80">{k.label}</p>
              <p className="text-[10px] opacity-60 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Rendimiento Anual vs S&P 500 ────────────────────────────── */}
        <SectionTitle>{t("gvv.section.annual")}</SectionTitle>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-primary/5 border border-primary/15 rounded-lg px-3 py-2.5">
            <p className="text-xl font-bold text-primary">+38.02%</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">GVV 2025 vs S&P +16.39%</p>
          </div>
          <div className="bg-primary/5 border border-primary/15 rounded-lg px-3 py-2.5">
            <p className="text-xl font-bold text-primary">+6.85%</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">GVV 2022 vs S&P −19.44%</p>
          </div>
          <div className="bg-primary/5 border border-primary/15 rounded-lg px-3 py-2.5">
            <p className="text-xl font-bold text-primary">~130%</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{t("gvv.hl3.sub")}</p>
          </div>
        </div>

        <div className="h-48 sm:h-56 w-full">
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
        <div className="flex gap-5 justify-end mt-1">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "hsl(214,60%,32%)" }} />GVV
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "hsl(214,30%,72%)" }} />S&P 500
          </span>
        </div>

        {/* ── Valor del Portafolio — 5Y vs S&P 500 ────────────────────── */}
        <SectionTitle>{t("gvv.section.port_value")}</SectionTitle>
        <div className="h-48 sm:h-56 md:h-64 w-full">
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
        <div className="flex gap-5 justify-end mt-1">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="w-5 h-[2.5px] inline-block rounded" style={{ background: "hsl(214,60%,32%)" }} />GVV
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="w-5 h-[2px] inline-block rounded" style={{ background: "hsl(214,30%,68%)", borderTop: "2px dashed hsl(214,30%,68%)" }} />S&P 500
          </span>
        </div>

        {/* ── Portfolio Structure ──────────────────────────────────────── */}
        <SectionTitle>{t("gvv.section.port_struct")}</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pie */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("gvv.alloc.by_asset")}</p>
            <div className="h-40 sm:h-48">
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
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
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t("gvv.currency.label")}</p>
              <div className="space-y-2.5">
                {currencies.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground w-10">{c.name}</span>
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${c.value}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary text-primary-foreground rounded-xl p-4 mt-auto">
              <p className="text-2xl font-bold">{skinPct}%</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide mt-1 opacity-80">{t("gvv.skin.label")}</p>
              <p className="text-[11px] opacity-70 mt-1.5 leading-relaxed">{t("gvv.skin.desc")}</p>
            </div>
          </div>
        </div>

        {/* ── Monthly Returns Table ────────────────────────────────────── */}
        <SectionTitle>{t("gvv.section.monthly")}</SectionTitle>
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
                    !hasData         ? "text-muted-foreground/30"
                    : row.ytd >= 0   ? "text-emerald-700 dark:text-emerald-400"
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
        <p className="text-[10px] text-muted-foreground mt-1.5">{t("gvv.table.disclaimer")}</p>

        {/* ── Growth: Pre-IPO ──────────────────────────────────────────── */}
        <SectionTitle>{t("gvv.section.preipo")}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {preIpo.map((p) => (
            <div key={p.name} className="border border-border rounded-xl p-4 bg-background hover:border-primary/40 transition-colors">
              <p className="text-base font-bold text-foreground">{p.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">{t("gvv.preipo.founded")} {p.year}</p>
              <div className="mt-2 space-y-1">
                <p className="text-[11px] text-muted-foreground"><span className="font-semibold text-foreground">{t("gvv.preipo.focus")}</span> {p.focus}</p>
                <p className="text-[11px] text-muted-foreground"><span className="font-semibold text-foreground">{t("gvv.preipo.product")}</span> {p.product}</p>
                <p className="text-[11px] text-muted-foreground"><span className="font-semibold text-foreground">{t("gvv.preipo.diff")}</span> {p.diff}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">{t("gvv.preipo.success")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {successStories.map((s) => (
              <div key={s.name} className="bg-secondary/40 rounded-lg p-3 text-center border border-border">
                <p className="font-bold text-sm text-foreground">{s.name}</p>
                <div className="mt-1.5 space-y-0.5">
                  <p className="text-[10px] text-muted-foreground">{t("gvv.preipo.entry")} <span className="font-semibold text-foreground">{s.entry}</span></p>
                  <p className="text-[10px] text-muted-foreground">IPO: <span className="font-semibold text-foreground">{s.ipo}</span></p>
                  <p className="text-[10px] text-muted-foreground">{t("gvv.preipo.cap")} <span className="font-semibold text-primary">{s.cap}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Value: Realized + Active ─────────────────────────────────── */}
        <SectionTitle>{t("gvv.section.realized")}</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {realizedReturns.map((r) => (
            <div key={r.name} className="border border-border rounded-lg p-3 text-center bg-background">
              <p className="text-xl font-bold text-primary">{r.ret}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{r.name}</p>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">{t("gvv.realized.label")}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">{t("gvv.active.title")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activePositions.map((p) => (
            <div key={p.name} className="border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-sm text-foreground">{p.name}</p>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{t("gvv.active.badge")}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{p.thesis}</p>
              <div className="grid grid-cols-3 gap-1">
                {p.metrics.map(([k, v]) => (
                  <div key={k} className="bg-secondary/50 rounded-md px-2 py-1.5 text-center">
                    <p className="text-[10px] text-muted-foreground">{k}</p>
                    <p className="text-[11px] font-semibold text-foreground">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Volatility: Algorithmic Strategies ──────────────────────── */}
        <SectionTitle>{t("gvv.section.algo")}</SectionTitle>
        <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 mb-3 text-[12px] text-foreground leading-relaxed">
          {t("gvv.algo.desc")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {algoStrategies.map((s) => (
            <div key={s.name} className="border border-border rounded-xl p-4 bg-background">
              <p className="font-bold text-sm text-foreground mb-3">{s.name}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted-foreground">{t("gvv.algo.strategy_cagr")}</span>
                  <span className="text-[11px] font-bold text-primary">{s.cagr.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted-foreground">{t("gvv.algo.cagr_benchmark")}</span>
                  <span className="text-[11px] text-muted-foreground">{s.bench.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between border-t border-border pt-1.5 mt-1">
                  <span className="text-[11px] font-semibold text-foreground">{t("gvv.algo.alpha")}</span>
                  <span className="text-[11px] font-bold text-emerald-600">{s.alpha}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-3">
                {[["2024", s.y24],["2025", s.y25],["2026 YTD", s.y26]].map(([yr, val]) => (
                  <div key={yr} className="bg-secondary/50 rounded-md px-1 py-1.5 text-center">
                    <p className="text-[9px] text-muted-foreground">{yr}</p>
                    <p className="text-[10px] font-semibold text-foreground">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Institutional Structure ──────────────────────────────────── */}
        <SectionTitle>{t("gvv.section.inst")}</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {structureItems.map((item) => (
            <div key={item.label} className="border border-border rounded-lg px-3 py-3 bg-background">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
              <p className="text-[11px] text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Philosophy + Download ────────────────────────────────────── */}
        <div className="bg-primary/5 rounded-lg px-5 py-4 border border-primary/15 mt-2">
          <p className="text-sm text-foreground leading-relaxed italic">{t("gvv.philosophy")}</p>
        </div>

        {docFile ? (
          <a href={docFile.file_url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity w-full justify-center mt-1">
            <Download className="w-4 h-4" />
            {t("gvv.download")}
          </a>
        ) : (
          <button disabled
            className="flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-md text-sm font-medium w-full justify-center cursor-not-allowed mt-1">
            <Download className="w-4 h-4" />
            {t("gvv.noDoc")}
          </button>
        )}

      </DialogContent>
    </Dialog>
  );
}
