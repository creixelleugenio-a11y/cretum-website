import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const aumDataBase = [
  { nameKey: null,                    staticName: "Venture Capital US", value: 25000, pct: "77.8%" },
  { nameKey: "aum.mandatos_gov",      staticName: "",                   value: 5900,  pct: "18.4%" },
  { nameKey: "aum.credito_privado",   staticName: "",                   value: 550,   pct: "1.7%"  },
  { nameKey: null,                    staticName: "HF GVV",             value: 350,   pct: "1.1%"  },
  { nameKey: "aum.mandatos_familias", staticName: "",                   value: 310,   pct: "1.0%"  },
];

const COLORS = ["hsl(214,60%,65%)", "hsl(214,50%,72%)", "hsl(214,40%,78%)", "hsl(214,30%,84%)", "hsl(214,20%,90%)"];

export function AboutSection() {
  const { t } = useLanguage();

  const aumData = aumDataBase.map((d) => ({
    ...d,
    name: d.nameKey ? t(d.nameKey) : d.staticName,
  }));

  return (
    <section id="nosotros" className="pt-28 pb-40 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 w-full">

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Left: label + title + description + mission */}
            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                  {t("about.founded")}
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <h2 className="text-5xl md:text-6xl font-serif text-foreground mb-8 max-w-xl leading-tight">
                  {t("about.title")}
                </h2>
              </Reveal>
              <Reveal delay={0.45} className="reveal-left">
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

            {/* Right: AUM chart + stats */}
            <div className="flex flex-col gap-6 self-end">
              <Reveal delay={0.75}>
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
              </Reveal>

            </div>

          </div>

      </div>
    </section>
  );
}
