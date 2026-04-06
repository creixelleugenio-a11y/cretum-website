import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Award } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  LabelList,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Static data (language-independent) ───────────────────────────────────

const kpiValues = ["17,000+", "300+", "8", "25 años", "350+", "6–18m"];

const tcrGrades = [
  { grade: "A", border: "#15803d", bg: "rgba(21,128,61,0.06)",  text: "#15803d", labelKey: "tr.tcr.a.label", descKey: "tr.tcr.a.desc" },
  { grade: "B", border: "#16a34a", bg: "rgba(22,163,74,0.04)",  text: "#16a34a", labelKey: "tr.tcr.b.label", descKey: "tr.tcr.b.desc" },
  { grade: "C", border: "#b45309", bg: "rgba(180,83,9,0.05)",   text: "#b45309", labelKey: "tr.tcr.c.label", descKey: "tr.tcr.c.desc" },
  { grade: "D", border: "#b91c1c", bg: "rgba(185,28,28,0.05)",  text: "#b91c1c", labelKey: "tr.tcr.d.label", descKey: "tr.tcr.d.desc" },
];

const indicatorDefs = [
  { name: "Average Directional Index",    abbr: "ADX",  descKey: "tr.ind.adx.desc"  },
  { name: "Triple Exp. Moving Averages",  abbr: "TEMA", descKey: "tr.ind.tema.desc" },
  { name: "Klinger Oscillator",           abbr: "KVO",  descKey: "tr.ind.kvo.desc"  },
  { name: "Money Flow Index",             abbr: "MFI",  descKey: "tr.ind.mfi.desc"  },
  { name: "Polarized Fractal Efficiency", abbr: "PFE",  descKey: "tr.ind.pfe.desc"  },
  { name: "Price Rate of Change",         abbr: "ROC",  descKey: "tr.ind.roc.desc"  },
  { name: "Relative Vigor Index",         abbr: "RVI",  descKey: "tr.ind.rvi.desc"  },
  { name: "Aroon Indicator",              abbr: "ARN",  descKey: "tr.ind.arn.desc"  },
];

const regionDefs = [
  { code: "🇺🇸", nameKey: null,               staticName: "USA"   },
  { code: "🇬🇧", nameKey: null,               staticName: "UK"    },
  { code: "🇯🇵", nameKey: "tr.region.japan",  staticName: ""      },
  { code: "🇨🇳", nameKey: null,               staticName: "China" },
  { code: "🇩🇪", nameKey: "tr.region.germany",staticName: ""      },
  { code: "🇫🇷", nameKey: "tr.region.france", staticName: ""      },
  { code: "🇨🇦", nameKey: "tr.region.canada", staticName: ""      },
  { code: "🇮🇳", nameKey: null,               staticName: "India" },
  { code: "🇨🇭", nameKey: "tr.region.swiss",  staticName: ""      },
  { code: "🇦🇺", nameKey: "tr.region.australia" as null, staticName: "Australia" },
  { code: "🇰🇷", nameKey: "tr.region.korea",  staticName: ""      },
  { code: "🇸🇦", nameKey: "tr.region.arabia", staticName: ""      },
];

const sectors = [
  "Communication Services", "Consumer Discretionary", "Consumer Staples",
  "Energy", "Financials", "Health Care", "Industrials",
  "Information Technology", "Materials",
];

const awards = [
  { year: "2026", title: "Best Performance Management System" },
  { year: "2025", title: "European CEO of the Year — FinTech Innovation" },
  { year: "2024", title: "Most Innovative Companies to Watch" },
  { year: "2022", title: "Best Strategy Management Solution Provider" },
  { year: "2021", title: "Best Data Analytics Company of the Year" },
];

const dispersionData = [
  { year: "2022", top: 23.9,  index: -18.7, bot: -44.3 },
  { year: "2023", top: 50.3,  index: 23.9,  bot: -17.2 },
  { year: "2024", top: 56.9,  index: 25.0,  bot: -20.4 },
];

const kpiKeys = [
  { labelKey: "tr.kpi1.label", subKey: "tr.kpi1.sub" },
  { labelKey: "tr.kpi2.label", subKey: "tr.kpi2.sub" },
  { labelKey: "tr.kpi3.label", subKey: "tr.kpi3.sub" },
  { labelKey: "tr.kpi4.label", subKey: "tr.kpi4.sub" },
  { labelKey: "tr.kpi5.label", subKey: "tr.kpi5.sub" },
  { labelKey: "tr.kpi6.label", subKey: "tr.kpi6.sub" },
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

interface TrendratingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TrendratingModal({ open, onOpenChange }: TrendratingModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="w-full min-w-0">

          {/* ── Header ────────────────────────────────────────────────── */}
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-3xl font-serif text-primary">{t("tr.title")}</DialogTitle>
            <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">{t("tr.subtitle")}</p>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">{t("tr.desc")}</p>

          <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 mt-3 text-[12px] text-foreground leading-relaxed">
            {t("tr.founded")}
          </div>

          {/* ── KPI Metrics ───────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-6">
            {kpiKeys.map((k, i) => (
              <div key={k.labelKey} className="border-l-2 border-primary pl-4">
                <p className="text-3xl font-bold text-foreground">{kpiValues[i]}</p>
                <p className="text-[11px] font-semibold text-primary uppercase tracking-wide mt-1">{t(k.labelKey)}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t(k.subKey)}</p>
              </div>
            ))}
          </div>

          {/* ── TCR Rating System ─────────────────────────────────────── */}
          <SectionTitle>{t("tr.section.tcr")}</SectionTitle>
          <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed">
            {t("tr.tcr.desc")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tcrGrades.map((r) => (
              <div key={r.grade} className="rounded-xl border p-4"
                style={{ borderColor: r.border, backgroundColor: r.bg, borderLeftWidth: 3 }}>
                <p className="text-4xl font-bold" style={{ color: r.text }}>{r.grade}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide mt-2 text-foreground">{t(r.labelKey)}</p>
                <p className="text-[10px] mt-2 text-muted-foreground leading-tight">{t(r.descKey)}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="border border-border rounded-lg px-3 py-2.5 text-center bg-background">
              <p className="text-xs font-semibold text-foreground">{t("tr.signal.pos.title")}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{t("tr.signal.pos.sub")}</p>
            </div>
            <div className="border border-border rounded-lg px-3 py-2.5 text-center bg-background">
              <p className="text-xs font-semibold text-foreground">{t("tr.signal.neg.title")}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{t("tr.signal.neg.sub")}</p>
            </div>
          </div>

          {/* ── Performance Dispersion ────────────────────────────────── */}
          <SectionTitle>{t("tr.section.oportunidad")}</SectionTitle>
          <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed">
            {t("tr.oport.desc")}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="border-l-2 pl-4" style={{ borderColor: "#15803d" }}>
              <p className="text-2xl font-bold text-foreground">+43.7%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5" style={{ whiteSpace: "pre-line" }}>{t("tr.oport.spread_top.sub")}</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="text-2xl font-bold text-foreground">93–95%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5" style={{ whiteSpace: "pre-line" }}>{t("tr.oport.funds.sub")}</p>
            </div>
            <div className="border-l-2 pl-4" style={{ borderColor: "#b91c1c" }}>
              <p className="text-2xl font-bold text-foreground">−27%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5" style={{ whiteSpace: "pre-line" }}>{t("tr.oport.spread_bot.sub")}</p>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dispersionData} barCategoryGap="25%" barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215 12% 60%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                  formatter={(v: number, name: string) => [
                    `${v > 0 ? "+" : ""}${v}%`,
                    name === "top" ? "Top 25%" : name === "index" ? "S&P 500" : "Bottom 25%",
                  ]}
                />
                <ReferenceLine y={0} stroke="hsl(215 12% 55%)" strokeWidth={1} />
                <Bar dataKey="top"   name="top"   fill="hsl(214 45% 45%)" radius={[3,3,0,0]}>
                  <LabelList dataKey="top" position="top" formatter={(v: number) => `+${v}%`}
                    style={{ fontSize: 10, fontWeight: 700, fill: "hsl(214 60% 32%)" }} />
                </Bar>
                <Bar dataKey="index" name="index" fill="hsl(214 60% 32%)" radius={[3,3,0,0]} />
                <Bar dataKey="bot"   name="bot"   fill="hsl(214 20% 72%)" radius={[3,3,0,0]}>
                  <LabelList dataKey="bot" position="bottom" formatter={(v: number) => `${v}%`}
                    style={{ fontSize: 10, fontWeight: 700, fill: "hsl(215 12% 40%)" }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-5 justify-end mt-1">
            {[["hsl(214,45%,45%)","Top 25%"],["hsl(214,60%,32%)","S&P 500"],["hsl(214,20%,72%)","Bottom 25%"]].map(([c,l]) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: c }} />{l}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{t("tr.source")}</p>

          {/* ── 8 Technical Indicators ────────────────────────────────── */}
          <SectionTitle>{t("tr.section.indicadores")}</SectionTitle>
          <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 mb-3 text-[12px] text-foreground">
            {t("tr.ind.desc")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {indicatorDefs.map((ind) => (
              <div key={ind.abbr} className="flex items-start gap-3 border border-border rounded-lg px-3 py-3 bg-background hover:border-primary/40 transition-colors">
                <div className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-[10px] font-bold shrink-0 min-w-[40px] text-center">
                  {ind.abbr}
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">{ind.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{t(ind.descKey)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── International Coverage ────────────────────────────────── */}
          <SectionTitle>{t("tr.section.cobertura")}</SectionTitle>
          <p className="text-[12px] text-muted-foreground mb-3 leading-relaxed">
            {t("tr.coverage.desc")}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
            {regionDefs.map((r) => {
              const name = r.nameKey ? t(r.nameKey) : r.staticName;
              return (
                <div key={name} className="bg-secondary/50 border border-border rounded-lg py-2 text-center">
                  <p className="text-xl">{r.code}</p>
                  <p className="text-[10px] font-semibold text-foreground mt-1">{name}</p>
                </div>
              );
            })}
          </div>
          <div className="bg-secondary/30 border border-border rounded-lg p-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">{t("tr.coverage.sectores")}</p>
            <div className="flex flex-wrap gap-1.5">
              {sectors.map((s) => (
                <span key={s} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-background border border-border rounded-md px-2 py-2 text-center">
              <p className="text-[11px] font-semibold text-foreground">Stocks</p>
              <p className="text-[10px] text-muted-foreground">{t("tr.coverage.stocks")}</p>
            </div>
            <div className="bg-background border border-border rounded-md px-2 py-2 text-center">
              <p className="text-[11px] font-semibold text-foreground">ETFs</p>
              <p className="text-[10px] text-muted-foreground">{t("tr.coverage.etfs")}</p>
            </div>
            <div className="bg-background border border-border rounded-md px-2 py-2 text-center">
              <p className="text-[11px] font-semibold text-foreground">{t("tr.coverage.indices")}</p>
              <p className="text-[10px] text-muted-foreground">Benchmarks</p>
            </div>
          </div>

          {/* ── Recognition ───────────────────────────────────────────── */}
          <SectionTitle>{t("tr.section.reconocimientos")}</SectionTitle>
          <div className="space-y-2">
            {awards.map((a) => (
              <div key={a.year} className="flex items-center gap-3 border border-border rounded-lg px-3 py-2.5 bg-background">
                <Award className="w-4 h-4 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-foreground">{a.title}</p>
                </div>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold shrink-0">{a.year}</span>
              </div>
            ))}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
