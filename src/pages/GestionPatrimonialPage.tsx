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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const aforesData = [
  { year: "2021", cretum: 7.56, afores: 6.64 },
  { year: "2022", cretum: 3.95, afores: -3.07 },
  { year: "2023", cretum: 8.29, afores: 5.25 },
  { year: "2024", cretum: 3.50, afores: 3.46 },
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

export default function GestionPatrimonialPage() {
  const { t } = useLanguage();

  const ventajas = [
    { title: t("wm.ventaja.1.title"), desc: t("wm.ventaja.1.desc") },
    { title: t("wm.ventaja.2.title"), desc: t("wm.ventaja.2.desc") },
    { title: t("wm.ventaja.3.title"), desc: t("wm.ventaja.3.desc") },
    { title: t("wm.ventaja.4.title"), desc: t("wm.ventaja.4.desc") },
    { title: t("wm.ventaja.5.title"), desc: t("wm.ventaja.5.desc") },
  ];

  const analysisItems = [
    { title: t("wm.analisis.topdown.title"), desc: t("wm.analisis.topdown.desc") },
    { title: t("wm.analisis.valrel.title"),  desc: t("wm.analisis.valrel.desc")  },
  ];

  const execSteps = [
    { step: "01", title: t("wm.exec.01.title"), desc: t("wm.exec.01.desc") },
    { step: "02", title: t("wm.exec.02.title"), desc: t("wm.exec.02.desc") },
    { step: "03", title: t("wm.exec.03.title"), desc: t("wm.exec.03.desc") },
    { step: "04", title: t("wm.exec.04.title"), desc: t("wm.exec.04.desc") },
  ];

  const monItems = [
    { title: t("wm.mon.emisoras.title"),    desc: t("wm.mon.emisoras.desc")    },
    { title: t("wm.mon.parametros.title"),  desc: t("wm.mon.parametros.desc")  },
    { title: t("wm.mon.medidas.title"),     desc: t("wm.mon.medidas.desc")     },
    { title: t("wm.mon.duracion.title"),    desc: t("wm.mon.duracion.desc")    },
    { title: t("wm.mon.performance.title"), desc: t("wm.mon.performance.desc") },
  ];

  const structureNodes = [
    { label: t("wm.node.cliente.label"),    sub: t("wm.node.cliente.sub")    },
    { label: t("wm.node.fiduciaria.label"), sub: t("wm.node.fiduciaria.sub") },
    { label: t("wm.node.mandato.label"),    sub: t("wm.node.mandato.sub")    },
    { label: t("wm.node.custodio.label"),   sub: t("wm.node.custodio.sub")   },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-48 pb-32 bg-background">
        <div className="max-w-6xl mx-auto px-8">
          <div className="w-full min-w-0 space-y-16">

            {/* Header */}
            <div className="mb-10">
              <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">{t("wm.title")}</h1>
              <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-6">{t("wm.subtitle")}</p>
              <p className="text-base text-foreground leading-relaxed">{t("wm.desc1")}</p>
            </div>

            {/* Metodología de Análisis */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">{t("wm.section.analisis")}</h3>
              <div className="grid grid-cols-2 gap-6">
                {analysisItems.map((item) => (
                  <div key={item.title} className="border-l-2 border-primary/40 pl-4">
                    <p className="text-xs font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Metodología de Ejecución */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">{t("wm.section.ejecucion")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {execSteps.map((s) => (
                  <div key={s.step} className="bg-muted/40 border border-border rounded-lg p-5">
                    <p className="text-[10px] font-bold text-primary/60 mb-1">{s.step}</p>
                    <p className="text-xs font-semibold text-foreground mb-1">{s.title}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitoreo de Riesgos */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">{t("wm.section.monitoreo")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {monItems.map((item) => (
                  <div key={item.title} className="border-l-2 border-primary/30 pl-3">
                    <p className="text-[11px] font-semibold text-foreground mb-0.5">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cretum vs AFORES */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">{t("wm.section.afores")}</h3>
              <p className="text-[10px] text-muted-foreground mb-6">{t("wm.afores.subtitle")}</p>
              <div className="h-72">
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
              <div className="grid grid-cols-4 gap-2 mt-6">
                {aforesData.map((d) => {
                  const diff = d.cretum - d.afores;
                  return (
                    <div key={d.year} className="text-center">
                      <p className="text-[10px] text-muted-foreground">{d.year}</p>
                      <p className={`text-xs font-bold ${diff >= 0 ? "text-primary" : "text-destructive"}`}>
                        {diff >= 0 ? "+" : ""}{diff.toFixed(2)}%
                      </p>
                      <p className="text-[9px] text-muted-foreground">{t("wm.afores.note")}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ventajas Competitivas */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">{t("wm.section.ventajas")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                {ventajas.map((v) => (
                  <div key={v.title} className="bg-primary/5 border border-primary/15 rounded-lg p-5">
                    <p className="text-xs font-bold text-primary mb-1">{v.title}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Estructura Operativa */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">{t("wm.section.estructura")}</h3>
              <div className="flex flex-col md:flex-row items-center gap-2 justify-center">
                {structureNodes.map((node, i, arr) => (
                  <div key={node.label} className="flex items-center gap-4">
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
              <div className="mt-4 bg-primary/5 border border-primary/15 rounded-lg px-6 py-5 text-center">
                <p className="text-xs font-semibold text-primary">Cretum Advisory Partners</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{t("wm.cretum.role")}</p>
              </div>
            </div>

            {/* Filosofía */}
            <div className="bg-primary/5 rounded-lg px-6 py-5 border border-primary/15">
              <p className="text-xs text-foreground leading-relaxed">{t("wm.desc2")}</p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
