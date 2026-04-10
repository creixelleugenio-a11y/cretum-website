import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/Reveal";

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

function KpiNum({ prefix = "", target, suffix = "", active }: { prefix?: string; target: number; suffix?: string; active: boolean }) {
  const count = useCountUp(target, active);
  return (
    <span className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-none tabular-nums">
      {prefix}{count.toLocaleString("es-MX")}{suffix}
    </span>
  );
}

export function HomeKPIsSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const kpis = [
    { prefix: "+$", target: 32110, suffix: " MDP", label: t("about.stat.aum") },
    { prefix: "+",  target: 12,    suffix: "",      label: t("about.stat.years") },
    { prefix: "+",  target: 400,   suffix: "",      label: t("about.stat.investors") },
  ];

  return (
    <section className="bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {kpis.map((kpi, i) => (
            <div key={i} className="px-6 md:px-10 py-10 flex flex-col items-center text-center">
              <Reveal delay={i * 0.15}>
                <div>
                  <KpiNum prefix={kpi.prefix} target={kpi.target} suffix={kpi.suffix} active={active} />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-5 max-w-[180px] mx-auto leading-relaxed">
                    {kpi.label}
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/30 py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-5">
              {t("home.kpi.tagline")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground mb-8 text-base leading-relaxed">
              {t("home.kpi.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-sm hover:gap-4 transition-all duration-200"
            >
              {t("home.kpi.cta")} <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
