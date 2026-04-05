import { Zap, Shield, Users, Radar, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const aumData = [
  { name: "Venture Capital US",       value: 25000, pct: "77.8%" },
  { name: "Mandatos Gubernamentales", value: 5900,  pct: "18.4%" },
  { name: "Crédito Privado",          value: 550,   pct: "1.7%"  },
  { name: "HF GVV",                   value: 350,   pct: "1.1%"  },
  { name: "Mandatos Familias",        value: 310,   pct: "1.0%"  },
];

const COLORS = ["hsl(214,60%,65%)", "hsl(214,50%,72%)", "hsl(214,40%,78%)", "hsl(214,30%,84%)", "hsl(214,20%,90%)"];

const advantages = [
  { icon: Zap,      titleKey: "about.adv1.title", descKey: "about.adv1.desc" },
  { icon: Shield,   titleKey: "about.adv2.title", descKey: "about.adv2.desc" },
  { icon: Users,    titleKey: "about.adv3.title", descKey: "about.adv3.desc" },
  { icon: Radar,    titleKey: "about.adv4.title", descKey: "about.adv4.desc" },
  { icon: Settings, titleKey: "about.adv5.title", descKey: "about.adv5.desc" },
];

const orgGroups = [
  {
    parent: { name: "Cretum Capital Partners", sub: "SAPI de CV · LP Delaware" },
    children: [
      { name: "GVV", sub: "Hedge Fund" },
    ],
  },
  {
    parent: { name: "Cretum Advisory Partners", sub: "SAPI de CV" },
    children: [
      { name: "Manhattan Venture Partners", sub: "Pre-IPO" },
      { name: "Wealth Management",          sub: "Gestión Patrimonial" },
    ],
  },
  {
    parent: { name: "Trendrating America's", sub: "SAPI de CV · Cayman" },
    children: [
      { name: "Trendrating", sub: "Investment Discipline" },
    ],
  },
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <>
    <section id="nosotros" className="pt-28 pb-20 bg-muted/20">
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
                    Distribución
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

              <div className="grid grid-cols-2 gap-x-0 gap-y-6">
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
            </div>

          </div>

      </div>
    </section>

    <section id="estructura" className="py-16 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 w-full">

        {/* Estructura Corporativa */}
        <div className="mb-10">
          <Reveal>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-8">
              {t("about.structure.title")}
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orgGroups.map((group, gi) => (
              <Reveal key={group.parent.name} delay={gi * 0.32}>
                <div className="flex flex-col items-center gap-0">
                  {/* Parent */}
                  <div className="w-full border-2 border-primary rounded-xl p-5 text-center bg-primary/5">
                    <p className="font-bold text-foreground text-sm">{group.parent.name}</p>
                    <p className="text-xs text-primary mt-1">{group.parent.sub}</p>
                  </div>

                  {/* Connector */}
                  <div className="w-px h-6 bg-border" />

                  {/* Children */}
                  <div className={`w-full flex gap-2 ${group.children.length > 1 ? "relative" : ""}`}>
                    {group.children.length > 1 && (
                      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-border -translate-y-0" />
                    )}
                    {group.children.map((child, ci) => (
                      <div key={child.name} className="flex-1 flex flex-col items-center gap-0">
                        {group.children.length > 1 && <div className="w-px h-4 bg-border" />}
                        <div className="w-full border border-border rounded-xl p-4 text-center bg-background hover:border-primary/40 transition-colors duration-200">
                          <p className="font-semibold text-foreground text-xs">{child.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{child.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Ventajas Competitivas */}
        <div>
          <Reveal>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-8">
              {t("about.advantages.title")}
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {advantages.map(({ icon: Icon, titleKey, descKey }, i) => (
              <Reveal key={titleKey} delay={i * 0.32}>
                <div className="border border-border rounded-xl p-5 bg-background hover:border-primary/40 hover:shadow-sm transition-all duration-200 h-full">
                  <Icon className="w-6 h-6 text-primary mb-3" />
                  <h4 className="font-bold text-foreground text-sm mb-2">{t(titleKey)}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(descKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
    </>
  );
}
