import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface WealthManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const aforesData = [
  { year: "2021", cretum: 7.56, afores: 6.64 },
  { year: "2022", cretum: 3.95, afores: -3.07 },
  { year: "2023", cretum: 8.29, afores: 5.25 },
  { year: "2024", cretum: 3.50, afores: 3.46 },
];

const ventajas = [
  { title: "Agilidad", desc: "2–3× más rápido que otros manejadores para ejecutar decisiones de inversión." },
  { title: "Independencia", desc: "No dependemos de ninguna casa de bolsa; trabajamos con todas ellas." },
  { title: "Atención Personalizada", desc: "Update mensual y reuniones periódicas con cada cliente." },
  { title: "Radar", desc: "Anticipamos cambios y tendencias antes que los demás." },
  { title: "Flexibilidad", desc: "Nos adecuamos al régimen de inversión de cualquier mandato." },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md px-3 py-2 text-xs shadow-md">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.name === "cretum" ? "#1d4ed8" : "#94a3b8" }}>
            {p.name === "cretum" ? "Cretum" : "AFORES"}: {p.value > 0 ? "+" : ""}{p.value.toFixed(2)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function WealthManagementModal({ open, onOpenChange }: WealthManagementModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="w-full min-w-0 space-y-10">

          {/* Header */}
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-2xl font-serif text-primary">{t("wm.title")}</DialogTitle>
            <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">{t("wm.subtitle")}</p>
            <p className="text-sm text-foreground leading-relaxed pt-1">{t("wm.desc1")}</p>
          </DialogHeader>

          {/* Metodología de Análisis */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Metodología de Análisis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-2 border-primary/40 pl-4">
                <p className="text-xs font-semibold text-foreground mb-1">Enfoque Top-Down</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Partimos del análisis macroeconómico global y local para identificar los sectores y activos con mayor potencial, filtrando de lo general a lo particular.
                </p>
              </div>
              <div className="border-l-2 border-primary/40 pl-4">
                <p className="text-xs font-semibold text-foreground mb-1">Valor Relativo</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Comparamos emisoras y clases de activos dentro de su universo para seleccionar los instrumentos con la mejor relación riesgo-rendimiento en cada momento del ciclo.
                </p>
              </div>
            </div>
          </div>

          {/* Metodología de Ejecución */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Metodología de Ejecución</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { step: "01", title: "Precio", desc: "Determinamos niveles de entrada y salida con base en análisis técnico y fundamental." },
                { step: "02", title: "Modelación", desc: "Construimos modelos de portafolio que optimizan el binomio riesgo-rendimiento del mandato." },
                { step: "03", title: "Ejecución", desc: "Operamos con agilidad a través de múltiples intermediarios bursátiles para obtener el mejor precio." },
                { step: "04", title: "Control de Riesgos", desc: "Aplicamos límites de concentración, stop-loss y métricas de drawdown en tiempo real." },
              ].map((s) => (
                <div key={s.step} className="bg-muted/40 border border-border rounded-lg p-3">
                  <p className="text-[10px] font-bold text-primary/60 mb-1">{s.step}</p>
                  <p className="text-xs font-semibold text-foreground mb-1">{s.title}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoreo de Riesgos */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Monitoreo de Riesgos</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {[
                { title: "Emisoras", desc: "Seguimiento continuo de fundamentales, calificaciones y eventos corporativos." },
                { title: "Parámetros", desc: "VaR, CVaR, tracking error y límites de concentración por emisora y sector." },
                { title: "Medidas de Riesgo", desc: "Volatilidad, correlaciones y análisis de escenarios de stress." },
                { title: "Duración y Convexidad", desc: "Gestión activa de la sensibilidad a tasas de interés en carteras de renta fija." },
                { title: "Performance", desc: "Alpha, Sharpe, Sortino y atribución de retornos vs. benchmark." },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-primary/30 pl-3">
                  <p className="text-[11px] font-semibold text-foreground mb-0.5">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cretum vs AFORES */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Rendimiento vs. AFORES</h3>
            <p className="text-[10px] text-muted-foreground mb-4">Retorno anual neto del portafolio Cretum vs. promedio AFORES Siefore Básica Pensiones.</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aforesData} barCategoryGap="30%" barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                    domain={[-5, 10]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(value) => (
                      <span className="text-[10px]">{value === "cretum" ? "Cretum" : "AFORES"}</span>
                    )}
                    wrapperStyle={{ fontSize: 10 }}
                  />
                  <Bar dataKey="cretum" name="cretum" fill="#1d4ed8" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="afores" name="afores" fill="#cbd5e1" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {aforesData.map((d) => {
                const diff = d.cretum - d.afores;
                return (
                  <div key={d.year} className="text-center">
                    <p className="text-[10px] text-muted-foreground">{d.year}</p>
                    <p className={`text-xs font-bold ${diff >= 0 ? "text-primary" : "text-destructive"}`}>
                      {diff >= 0 ? "+" : ""}{diff.toFixed(2)}%
                    </p>
                    <p className="text-[9px] text-muted-foreground">vs. AFORES</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ventajas Competitivas */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Ventajas Competitivas</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {ventajas.map((v) => (
                <div key={v.title} className="bg-primary/5 border border-primary/15 rounded-lg p-3">
                  <p className="text-xs font-bold text-primary mb-1">{v.title}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Estructura */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Estructura Operativa</h3>
            <div className="flex flex-col md:flex-row items-center gap-2 justify-center">
              {[
                { label: "Cliente", sub: "Institución o persona" },
                { label: "Entidad Fiduciaria", sub: "Administración del fideicomiso" },
                { label: "Mandato / Intermediario", sub: "Ejecución bursátil" },
                { label: "Custodio", sub: "Resguardo de valores" },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-2">
                  <div className="bg-muted border border-border rounded-lg px-3 py-2 text-center min-w-[110px]">
                    <p className="text-[11px] font-semibold text-foreground">{node.label}</p>
                    <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">{node.sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-muted-foreground text-sm hidden md:inline">→</span>
                  )}
                  {i < arr.length - 1 && (
                    <span className="text-muted-foreground text-sm md:hidden">↓</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 text-center">
              <p className="text-xs font-semibold text-primary">Cretum Advisory Partners</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Planeación de Riesgos y Estrategia de Inversión</p>
            </div>
          </div>

          {/* Filosofía */}
          <div className="bg-primary/5 rounded-lg px-4 py-3 border border-primary/15">
            <p className="text-xs text-foreground leading-relaxed">{t("wm.desc2")}</p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
