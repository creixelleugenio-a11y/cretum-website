import { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/Reveal";
import cityImg from "@/assets/city-night.jpg";

const aforesData = [
  { year: "2021", advantage: "+0.86%" },
  { year: "2022", advantage: "+7.25%" },
  { year: "2023", advantage: "+2.89%" },
  { year: "2024", advantage: "+0.05%" },
];

const aumDataBase = [
  { nameKey: null,                    staticName: "Venture Capital US", value: 25000, pct: "77.8%" },
  { nameKey: "aum.mandatos_gov",      staticName: "",                   value: 5900,  pct: "18.4%" },
  { nameKey: "aum.credito_privado",   staticName: "",                   value: 550,   pct: "1.7%"  },
  { nameKey: null,                    staticName: "HF GVV",             value: 350,   pct: "1.1%"  },
  { nameKey: "aum.mandatos_familias", staticName: "",                   value: 310,   pct: "1.0%"  },
];

const COLORS = ["hsl(214,60%,65%)", "hsl(214,50%,72%)", "hsl(214,40%,78%)", "hsl(214,30%,84%)", "hsl(214,20%,90%)"];

const partners: { name: string; logo: string }[] = [
  { name: "BNY Mellon",        logo: "/logos/bny-mellon.png"         },
  { name: "NAV Consulting",    logo: "/logos/nav-consulting-alt.svg" },
  { name: "Deloitte",          logo: "/logos/deloitte.png"           },
  { name: "Bloomberg",         logo: "/logos/bloomberg.png"          },
  { name: "Goldman Sachs",     logo: "/logos/goldman-sachs.png"      },
  { name: "UBS",               logo: "/logos/ubs.jpg"                },
  { name: "Morgan Stanley",    logo: "/logos/morgan-stanley.png"     },
  { name: "Capital Economics", logo: "/logos/capital-economics.png"  },
  { name: "RGA Consulting",    logo: "/logos/rga-consulting.png"     },
  { name: "Trendrating",       logo: "/logos/trendrating.png"        },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [active, target, duration]);
  return count;
}

function Stat({ prefix = "", target, suffix = "", label, delay = 0, size = "lg" }: {
  prefix?: string; target: number; suffix?: string; label: string; delay?: number; size?: "lg" | "sm";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(target, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal-hidden" style={{ transitionDelay: `${delay}s` }}>
      <p className={`font-bold leading-none text-white ${size === "lg" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
        {prefix}{count.toLocaleString("es-MX")}{suffix}
      </p>
      <p className="mt-2 text-xs md:text-sm text-white/50 leading-snug">{label}</p>
    </div>
  );
}

export function TrackRecordSection() {
  const { t } = useLanguage();

  const aumData = aumDataBase.map((d) => ({
    ...d,
    name: d.nameKey ? t(d.nameKey) : d.staticName,
  }));

  return (
    <section id="track-record" className="min-h-screen bg-foreground text-white relative overflow-hidden">
      <img src={cityImg} alt="" className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-[0.07] scale-105 pointer-events-none select-none" />
      <div className="w-full max-w-6xl mx-auto px-6 pt-28 pb-12">

        {/* ── Fila 1: Título + Stats principales ─────────── */}
        <div className="grid md:grid-cols-2 gap-10 mb-8">

          {/* Título */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                {t("tr_section.title")}
              </p>
            </Reveal>
            <Reveal delay={0.9}>
              <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
                {t("tr_section.subtitle")}
              </h2>
            </Reveal>
          </div>

          {/* Stats principales */}
          <div className="grid grid-cols-2 gap-8 items-center">
            <Stat target={3802}  suffix="%"      label={t("tr_section.stat3.label")} delay={0.9} />
            <Stat prefix="+$" target={32110} suffix=" MDP" label={t("tr_section.stat1.label")} delay={0.75} />
          </div>
        </div>

        {/* ── Fila 2: Stats secundarios ───────────────────── */}
        <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/10 mb-8">
          <Stat prefix="+" target={12}  suffix={t("tr_section.stat2.suffix")} label={t("tr_section.stat2.label")} delay={0.9}  size="sm" />
          <Stat prefix="+$" target={370} suffix=" MDD"  label={t("tr_section.stat4.label")} delay={0.9}  size="sm" />
          <Stat prefix="+" target={400} suffix=""       label={t("tr_section.stat5.label")} delay={0.9}  size="sm" />
        </div>

        {/* ── Fila 3: AFORES + AUM ────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* AFORES */}
          <Reveal>
            <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5 h-full">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
                {t("tr_section.afores.advantage")}
              </p>
              <h3 className="font-serif text-base text-white mb-4 leading-snug">
                {t("tr_section.afores.title")}
              </h3>
              <div>
                {aforesData.map((row, i) => (
                  <Reveal key={row.year} delay={i * 0.32}>
                    <div className="flex items-center justify-between py-2.5 border-b border-white/8 last:border-0">
                      <span className="text-sm font-medium text-white/60">{row.year}</span>
                      <span className="text-sm font-bold text-emerald-400">{row.advantage}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* AUM */}
          <Reveal delay={0.4}>
            <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5 h-full">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
                {t("common.distribucion")}
              </p>
              <h3 className="font-serif text-base text-white mb-4">
                {t("tr_section.aum.title")}
              </h3>
              <div className="flex gap-5 items-center">
                <div className="w-28 h-28 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={aumData} cx="50%" cy="50%" innerRadius={28} outerRadius={52} dataKey="value" stroke="none">
                        {aumData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }}
                        formatter={(v: number) => [`$${v.toLocaleString("es-MX")} MDP`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 flex-1">
                  {aumData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
                      <p className="text-xs text-white/50 leading-tight flex-1">{d.name}</p>
                      <p className="text-xs font-bold text-white shrink-0">{d.pct}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Fila 4: Logos socios ────────────────────────── */}
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
              {t("tr_section.partners.title")}
            </p>
          </Reveal>
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee items-center">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="shrink-0 h-11 w-36 rounded-lg border border-white/15 bg-white flex items-center justify-center px-3 hover:border-white/40 transition-all duration-200"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="object-contain"
                    style={{ maxHeight: "28px", maxWidth: "110px", mixBlendMode: "multiply" }}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.parentElement)
                        img.parentElement.innerHTML = `<span style="font-size:11px;font-weight:600;color:#64748b">${p.name}</span>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
