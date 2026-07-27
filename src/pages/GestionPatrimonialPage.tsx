import { WMHero } from "@/components/WMHero";
import { Reveal } from "@/components/Reveal";
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
import imgGobierno from "@/assets/inst-gobierno.jpg";
import imgUniversidades from "@/assets/inst-universidades.jpg";
import imgPensiones from "@/assets/inst-pensiones.jpg";
import imgTesorerias from "@/assets/inst-tesorerias.jpg";
import imgFundaciones from "@/assets/inst-fundaciones.jpg";
import { Landmark, GraduationCap, PiggyBank, Briefcase, HeartHandshake } from "lucide-react";
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
          <p key={p.name} style={{ color: p.name === "cretum" ? "#205280" : "#94a3b8" }}>
            {p.name === "cretum" ? "Cretum" : "Benchmark"}: {p.value > 0 ? "+" : ""}{p.value.toFixed(2)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GestionPatrimonialPage() {
  const { t, lang } = useLanguage();

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

  const clientesInstitucionales = [
    { image: imgGobierno,      Icon: Landmark,        sector: lang === "es" ? "Patrimonio público"      : "Public capital",        label: t("wm.cliente.gobierno.label"),      desc: t("wm.cliente.gobierno.desc")      },
    { image: imgUniversidades, Icon: GraduationCap,   sector: lang === "es" ? "Endowments académicos"   : "Academic endowments",   label: t("wm.cliente.universidades.label"), desc: t("wm.cliente.universidades.desc") },
    { image: imgPensiones,     Icon: PiggyBank,       sector: lang === "es" ? "AFORES y planes privados": "Pension funds",         label: t("wm.cliente.pensiones.label"),     desc: t("wm.cliente.pensiones.desc")     },
    { image: imgTesorerias,    Icon: Briefcase,       sector: lang === "es" ? "Excedentes corporativos" : "Corporate reserves",    label: t("wm.cliente.tesorerias.label"),    desc: t("wm.cliente.tesorerias.desc")    },
    { image: imgFundaciones,   Icon: HeartHandshake,  sector: lang === "es" ? "Capital filantrópico"    : "Philanthropic capital", label: t("wm.cliente.fundaciones.label"),   desc: t("wm.cliente.fundaciones.desc")   },
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
      <main className="min-h-screen pb-32 bg-background">

        <WMHero />

        {/* Filosofía — cita de apertura */}
        <section className="py-20 md:py-24 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                {lang === "es" ? "Filosofía" : "Philosophy"}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-xl md:text-2xl font-serif text-foreground/90 leading-relaxed italic">
                &ldquo;{t("wm.desc2")}&rdquo;
              </p>
            </Reveal>
          </div>
        </section>

        {/* Metodología — Análisis · Ejecución · Monitoreo */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                {lang === "es" ? "Metodología" : "Methodology"}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight max-w-2xl mb-16">
                {lang === "es"
                  ? "Un proceso disciplinado, replicable y centrado en el cliente."
                  : "A disciplined, replicable and client-centric process."}
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">

              {/* Análisis */}
              <Reveal delay={0.2}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
                    01 · {t("wm.section.analisis")}
                  </p>
                  <h3 className="text-xl font-serif text-foreground mb-6 leading-tight">
                    {lang === "es" ? "Cómo analizamos" : "How we analyze"}
                  </h3>
                  <div className="space-y-6">
                    {analysisItems.map((item) => (
                      <div key={item.title} className="border-l-2 border-primary/40 pl-5">
                        <h4 className="text-[15px] font-semibold text-foreground mb-1.5 leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Ejecución */}
              <Reveal delay={0.3}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
                    02 · {t("wm.section.ejecucion")}
                  </p>
                  <h3 className="text-xl font-serif text-foreground mb-6 leading-tight">
                    {lang === "es" ? "Cómo ejecutamos" : "How we execute"}
                  </h3>
                  <div className="space-y-4">
                    {execSteps.map((s) => (
                      <div key={s.step} className="flex gap-4">
                        <span className="text-[11px] font-bold text-primary/50 w-7 shrink-0 pt-1 tracking-widest">
                          {s.step}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground leading-tight mb-1">
                            {s.title}
                          </h4>
                          <p className="text-[13px] text-muted-foreground leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Monitoreo */}
              <Reveal delay={0.4}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
                    03 · {t("wm.section.monitoreo")}
                  </p>
                  <h3 className="text-xl font-serif text-foreground mb-6 leading-tight">
                    {lang === "es" ? "Cómo supervisamos" : "How we monitor"}
                  </h3>
                  <div className="space-y-4">
                    {monItems.map((item, i) => (
                      <div key={item.title} className="flex gap-4">
                        <span className="text-[11px] font-bold text-primary/50 w-7 shrink-0 pt-1 tracking-widest">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground leading-tight mb-1">
                            {item.title}
                          </h4>
                          <p className="text-[13px] text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* Track record — Cretum vs Benchmark */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                {lang === "es" ? "Track record" : "Track record"}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight mb-3">
                {t("wm.section.afores")}
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-base text-muted-foreground max-w-2xl mb-12 leading-relaxed">
                {t("wm.afores.subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="bg-background border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="h-72 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aforesData} barCategoryGap="30%" barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                        domain={[-5, 10]}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={(value) => (
                          <span className="text-xs">{value === "cretum" ? "Cretum" : "Benchmark"}</span>
                        )}
                        wrapperStyle={{ fontSize: 11 }}
                      />
                      <Bar dataKey="cretum" name="cretum" fill="#205280" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="afores" name="afores" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border">
                  {aforesData.map((d) => {
                    const diff = d.cretum - d.afores;
                    return (
                      <div key={d.year} className="text-center">
                        <p className="text-[11px] text-muted-foreground tracking-wider mb-1">{d.year}</p>
                        <p className={`text-2xl md:text-3xl font-serif ${diff >= 0 ? "text-primary" : "text-destructive"}`}>
                          {diff >= 0 ? "+" : ""}{diff.toFixed(2)}%
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">{t("wm.afores.note")}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Ventajas Competitivas */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                {t("wm.section.ventajas")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight mb-12 max-w-2xl">
                {lang === "es" ? "¿Por qué Cretum?" : "Why Cretum?"}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {ventajas.map((v, i) => (
                <Reveal key={v.title} delay={0.2 + i * 0.08}>
                  <div className="relative h-full rounded-xl border border-border bg-background/50 p-6 hover:border-primary/40 transition-colors duration-200">
                    <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest text-primary/40">
                      0{i + 1}
                    </span>
                    <h3 className="text-base font-serif text-primary mb-3 leading-tight pr-8">
                      {v.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Clientes Institucionales — Pillars of Trust */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 md:mb-20">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  {t("wm.section.clientes")}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-5">
                  {lang === "es" ? "A quiénes servimos" : "Who we serve"}
                </h2>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="w-12 h-px bg-primary/50 mx-auto mb-6" />
              </Reveal>
              <Reveal delay={0.35}>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-serif italic">
                  {lang === "es"
                    ? "Cinco pilares institucionales que confían su patrimonio a un mandato disciplinado."
                    : "Five institutional pillars entrusting their capital to a disciplined mandate."}
                </p>
              </Reveal>
            </div>

            {/* Pillars row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border">
              {clientesInstitucionales.map(({ Icon, sector, label, desc }, i) => (
                <Reveal key={label} delay={0.15 + i * 0.08}>
                  <article className="group relative h-full bg-background hover:bg-primary/[0.03] transition-colors duration-500 px-6 py-10 md:px-5 md:py-12 text-center flex flex-col items-center">
                    {/* Top accent line that grows on hover */}
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary/30 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />

                    {/* Sector tag */}
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70 mb-6">
                      {sector}
                    </p>

                    {/* Icon */}
                    <div className="relative mb-5">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Icon className="relative w-10 h-10 md:w-11 md:h-11 text-primary stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    {/* Divider */}
                    <div className="w-8 h-px bg-border group-hover:bg-primary/40 transition-colors duration-500 mb-4" />

                    {/* Label */}
                    <h3 className="text-lg md:text-xl font-serif text-foreground leading-tight mb-3">
                      {label}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Estructura Operativa */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                {t("wm.section.estructura")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight mb-12 max-w-2xl">
                {lang === "es" ? "Cómo trabajamos" : "How we work"}
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 justify-center">
                {structureNodes.map((node, i, arr) => (
                  <div key={node.label} className="flex flex-col md:flex-row items-center gap-3 md:gap-2 flex-1 md:flex-none">
                    <div className="relative w-full md:w-auto rounded-xl border border-border bg-background px-5 py-4 text-center md:min-w-[150px]">
                      <span className="absolute top-2 left-3 text-[9px] font-bold tracking-widest text-primary/40">
                        0{i + 1}
                      </span>
                      <p className="text-sm font-serif text-foreground mt-1">
                        {node.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-tight">
                        {node.sub}
                      </p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-primary/40 text-lg hidden md:inline">→</span>
                    )}
                    {i < arr.length - 1 && (
                      <span className="text-primary/40 text-lg md:hidden">↓</span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-12 max-w-2xl mx-auto text-center bg-background border border-primary/20 rounded-xl px-6 py-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary/70 mb-2">
                  {lang === "es" ? "Coordinación" : "Coordination"}
                </p>
                <p className="text-xl font-serif text-foreground mb-2">
                  Cretum Capital &amp; Advisory
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("wm.cretum.role")}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
