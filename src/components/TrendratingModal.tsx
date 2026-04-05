import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BarChart3, Search, History, TrendingUp, Globe, Award, Cpu } from "lucide-react";
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

// ── Static data ───────────────────────────────────────────────────────────

const kpis = [
  { value: "17,000+", label: "Activos monitoreados",      sub: "Acciones, ETFs, índices globales" },
  { value: "300+",    label: "Clientes institucionales",  sub: "Fondos, bancos privados, family offices" },
  { value: "8",       label: "Indicadores técnicos",      sub: "Evaluados diariamente con IA" },
  { value: "25 años", label: "Historial de datos",        sub: "Backtesting con datos reales" },
  { value: "350+",    label: "Indicadores probados",      sub: "En R&D antes de seleccionar los 8" },
  { value: "6–18m",   label: "Horizonte de tendencia",    sub: "Ciclos institucionales de capital" },
];

const tcrRatings = [
  { grade: "A", label: "Tendencia alcista muy fuerte", border: "#15803d", bg: "rgba(21,128,61,0.06)",  text: "#15803d", desc: "Sobreponderación máxima. Capital institucional fluyendo fuertemente." },
  { grade: "B", label: "Tendencia alcista",            border: "#16a34a", bg: "rgba(22,163,74,0.04)",  text: "#16a34a", desc: "Señal de compra / sobreponderación. Momentum positivo confirmado."   },
  { grade: "C", label: "Fase bajista",                 border: "#b45309", bg: "rgba(180,83,9,0.05)",   text: "#b45309", desc: "Subponderación / evitar. Tendencia negativa en curso."              },
  { grade: "D", label: "Tendencia bajista muy fuerte", border: "#b91c1c", bg: "rgba(185,28,28,0.05)",  text: "#b91c1c", desc: "Señal de venta / salida. Capital institucional saliendo."             },
];

const indicators = [
  { name: "Average Directional Index",       abbr: "ADX",  desc: "Mide la fuerza de la tendencia, independientemente de su dirección." },
  { name: "Triple Exp. Moving Averages",     abbr: "TEMA", desc: "Suaviza precios eliminando ruido de corto plazo." },
  { name: "Klinger Oscillator",              abbr: "KVO",  desc: "Analiza el flujo de volumen para anticipar reversiones de tendencia." },
  { name: "Money Flow Index",                abbr: "MFI",  desc: "RSI ponderado por volumen — detecta sobrecompra/sobreventa." },
  { name: "Polarized Fractal Efficiency",    abbr: "PFE",  desc: "Mide la eficiencia del movimiento del precio en el tiempo." },
  { name: "Price Rate of Change",            abbr: "ROC",  desc: "Velocidad del movimiento de precios en un período determinado." },
  { name: "Relative Vigor Index",            abbr: "RVI",  desc: "Compara precio de cierre vs rango de la vela para medir vigor." },
  { name: "Aroon Indicator",                 abbr: "ARN",  desc: "Identifica inicio de nuevas tendencias y su fortaleza relativa." },
];

// S&P 500 constituent performance dispersion
const dispersionData = [
  { year: "2022", top: 23.9,  index: -18.7, bot: -44.3 },
  { year: "2023", top: 50.3,  index: 23.9,  bot: -17.2 },
  { year: "2024", top: 56.9,  index: 25.0,  bot: -20.4 },
];

const regions = [
  { code: "🇺🇸", name: "USA" },   { code: "🇬🇧", name: "UK" },
  { code: "🇯🇵", name: "Japón" }, { code: "🇨🇳", name: "China" },
  { code: "🇩🇪", name: "Alemania" }, { code: "🇫🇷", name: "Francia" },
  { code: "🇨🇦", name: "Canadá" }, { code: "🇮🇳", name: "India" },
  { code: "🇨🇭", name: "Suiza" }, { code: "🇦🇺", name: "Australia" },
  { code: "🇰🇷", name: "Corea" }, { code: "🇸🇦", name: "Arabia" },
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
            Fundada en 2013 por <span className="font-semibold">Rocco Pellegrinelli</span> — creador de Brainpower (adquirida por Bloomberg en 2006). Sede en Lugano, con oficinas en Londres y Boston. Socios estratégicos: <span className="font-semibold">Bloomberg, Euronext y FactSet</span>.
          </div>

          {/* ── KPI Metrics ───────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-6">
            {kpis.map((k) => (
              <div key={k.label} className="border-l-2 border-primary pl-4">
                <p className="text-3xl font-bold text-foreground">{k.value}</p>
                <p className="text-[11px] font-semibold text-primary uppercase tracking-wide mt-1">{k.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* ── TCR Rating System ─────────────────────────────────────── */}
          <SectionTitle>Sistema de calificación TCR — Trend Capture Rating</SectionTitle>
          <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed">
            El TCR mide la dirección y calidad de las tendencias en un horizonte de <strong>6 a 18 meses</strong> — capturando flujos institucionales de capital y filtrando el ruido de corto plazo.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tcrRatings.map((r) => (
              <div key={r.grade} className="rounded-xl border p-4"
                style={{ borderColor: r.border, backgroundColor: r.bg, borderLeftWidth: 3 }}>
                <p className="text-4xl font-bold" style={{ color: r.text }}>{r.grade}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide mt-2 text-foreground">{r.label}</p>
                <p className="text-[10px] mt-2 text-muted-foreground leading-tight">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="border border-border rounded-lg px-3 py-2.5 text-center bg-background">
              <p className="text-xs font-semibold text-foreground">A + B = Señal positiva</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Sobreponderación / Compra</p>
            </div>
            <div className="border border-border rounded-lg px-3 py-2.5 text-center bg-background">
              <p className="text-xs font-semibold text-foreground">C + D = Señal negativa</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Subponderación / Venta / Evitar</p>
            </div>
          </div>

          {/* ── Performance Dispersion ────────────────────────────────── */}
          <SectionTitle>La oportunidad — dispersión en el S&P 500</SectionTitle>
          <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed">
            Dentro de cualquier índice existe una brecha de <strong>40–70 puntos porcentuales</strong> entre los mejores y peores activos cada año. El TCR permite identificar esa diferencia antes que el mercado.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="border-l-2 pl-4" style={{ borderColor: "#15803d" }}>
              <p className="text-2xl font-bold text-foreground">+43.7%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Spread Top 25%<br/>vs Índice (promedio)</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="text-2xl font-bold text-foreground">93–95%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Fondos activos que<br/>no baten al benchmark</p>
            </div>
            <div className="border-l-2 pl-4" style={{ borderColor: "#b91c1c" }}>
              <p className="text-2xl font-bold text-foreground">−27%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Spread Bottom 25%<br/>vs Índice (promedio)</p>
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
          <p className="text-[10px] text-muted-foreground mt-1">Fuente: Trendrating / datos de constituyentes del S&P 500</p>

          {/* ── 8 Technical Indicators ────────────────────────────────── */}
          <SectionTitle>8 indicadores técnicos — evaluados diariamente</SectionTitle>
          <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 mb-3 text-[12px] text-foreground">
            De más de <strong>350 indicadores probados</strong> durante R&D, el algoritmo seleccionó estos 8 como los de mayor capacidad predictiva para identificar tendencias sostenidas de 6 a 18 meses.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {indicators.map((ind) => (
              <div key={ind.abbr} className="flex items-start gap-3 border border-border rounded-lg px-3 py-3 bg-background hover:border-primary/40 transition-colors">
                <div className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-[10px] font-bold shrink-0 min-w-[40px] text-center">
                  {ind.abbr}
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">{ind.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── International Coverage ────────────────────────────────── */}
          <SectionTitle>Cobertura internacional de mercados</SectionTitle>
          <p className="text-[12px] text-muted-foreground mb-3 leading-relaxed">
            La plataforma monitorea acciones, ETFs e índices en mercados globales, clasificando por sector e industria con calificaciones TCR en tiempo real para <strong>comparaciones entre países y sectores</strong>.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
            {regions.map((r) => (
              <div key={r.name} className="bg-secondary/50 border border-border rounded-lg py-2 text-center">
                <p className="text-xl">{r.code}</p>
                <p className="text-[10px] font-semibold text-foreground mt-1">{r.name}</p>
              </div>
            ))}
          </div>
          <div className="bg-secondary/30 border border-border rounded-lg p-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Sectores cubiertos</p>
            <div className="flex flex-wrap gap-1.5">
              {sectors.map((s) => (
                <span key={s} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-background border border-border rounded-md px-2 py-2 text-center">
              <p className="text-[11px] font-semibold text-foreground">Stocks</p>
              <p className="text-[10px] text-muted-foreground">Acciones comunes</p>
            </div>
            <div className="bg-background border border-border rounded-md px-2 py-2 text-center">
              <p className="text-[11px] font-semibold text-foreground">ETFs</p>
              <p className="text-[10px] text-muted-foreground">Fondos cotizados</p>
            </div>
            <div className="bg-background border border-border rounded-md px-2 py-2 text-center">
              <p className="text-[11px] font-semibold text-foreground">Índices</p>
              <p className="text-[10px] text-muted-foreground">Benchmarks globales</p>
            </div>
          </div>

          {/* ── Recognition ───────────────────────────────────────────── */}
          <SectionTitle>Reconocimientos</SectionTitle>
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
