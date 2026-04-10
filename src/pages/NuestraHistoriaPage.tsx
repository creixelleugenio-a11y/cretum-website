import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const aumDataBase = [
  { nameKey: null,                    staticName: "Venture Capital US", value: 25000 },
  { nameKey: "aum.mandatos_gov",      staticName: "",                   value: 5900  },
  { nameKey: "aum.credito_privado",   staticName: "",                   value: 550   },
  { nameKey: null,                    staticName: "HF GVV",             value: 350   },
  { nameKey: "aum.mandatos_familias", staticName: "",                   value: 310   },
];

const COLORS = ["hsl(214,60%,65%)", "hsl(214,50%,72%)", "hsl(214,40%,78%)", "hsl(214,30%,84%)", "hsl(214,20%,90%)"];

export default function NuestraHistoriaPage() {
  const { t } = useLanguage();

  const aumData = aumDataBase.map((d) => ({
    ...d,
    name: d.nameKey ? t(d.nameKey) : d.staticName,
  }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-56 pb-44 bg-background">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Left: label + title + description + mission */}
            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                  {t("about.founded")}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-8 leading-tight">
                  {t("about.title")}
                </h1>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="text-lg text-foreground/60 leading-relaxed mb-4">
                  {t("about.brief1")}
                </p>
                <p className="text-lg text-foreground/60 leading-relaxed mb-6">
                  {t("about.brief2")}
                </p>
                <div className="pt-5 border-t border-border">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                    {t("about.mission.label")}
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-base font-light">
                    {t("about.mission")}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: AUM chart + stats grid */}
            <div className="flex flex-col gap-6 self-end">
              <Reveal delay={0.4}>
                {/* Donut chart card */}
                <div className="bg-foreground rounded-2xl px-7 py-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
                    {t("common.distribucion")}
                  </p>
                  <h3 className="font-serif text-base text-white mb-5">
                    {t("tr_section.aum.title")}
                  </h3>
                  <div className="flex gap-6 items-center">
                    <div className="w-32 h-32 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={aumData} cx="50%" cy="50%" innerRadius={30} outerRadius={58} dataKey="value" stroke="none">
                            {aumData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                          </Pie>
                          <Tooltip
                            contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#1e293b", fontSize: 12 }}
                            separator=""
                            formatter={(v: number) => [`$${v.toLocaleString("es-MX")} MDP`, ""]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2.5 flex-1">
                      {aumData.map((d, i) => (
                        <div key={d.name} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
                          <p className="text-xs text-white/50 leading-tight flex-1">{d.name}</p>
                          <p className="text-xs font-bold text-white shrink-0">${d.value.toLocaleString("es-MX")} MDP</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-x-0 gap-y-6 mt-6">
                  {[
                    { num: "+12",      desc: t("about.stat.years")    },
                    { num: "+$32,110", desc: t("about.stat.aum")      },
                    { num: "+400",     desc: t("about.stat.investors") },
                    { num: t("about.stat.one"), desc: t("about.stat.philosophy") },
                  ].map((s, i) => (
                    <Reveal key={i} delay={0.4 + i * 0.32}>
                      <div className="border-l-2 border-primary pl-5">
                        <p className="text-4xl md:text-5xl font-light text-foreground leading-none" style={{ fontFamily: "'Source Serif 4', serif" }}>
                          {s.num}
                        </p>
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
