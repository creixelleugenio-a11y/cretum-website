import { useEffect, useRef, useState } from "react";
import { Network, Layers, LayoutGrid, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Ventaja = {
  icon: typeof Network;
  title: string;
  tagline: string;
  desc: string;
  num: string;
};

export function VentajasDiamante() {
  const { t } = useLanguage();
  const VENTAJAS: Ventaja[] = [
    {
      icon: Network,
      title: t("vd.1.title"),
      tagline: t("vd.1.tagline"),
      desc: t("vd.1.desc"),
      num: "I",
    },
    {
      icon: Layers,
      title: t("vd.2.title"),
      tagline: t("vd.2.tagline"),
      desc: t("vd.2.desc"),
      num: "II",
    },
    {
      icon: LayoutGrid,
      title: t("vd.3.title"),
      tagline: t("vd.3.tagline"),
      desc: t("vd.3.desc"),
      num: "III",
    },
    {
      icon: Activity,
      title: t("vd.4.title"),
      tagline: t("vd.4.tagline"),
      desc: t("vd.4.desc"),
      num: "IV",
    },
  ];
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Card positions for desktop — N, E, S, W (diamond cardinals)
  const positions = [
    "top-0 left-1/2 -translate-x-1/2",       // N
    "top-1/2 right-0 -translate-y-1/2",       // E
    "bottom-0 left-1/2 -translate-x-1/2",     // S
    "top-1/2 left-0 -translate-y-1/2",        // W
  ];

  return (
    <div ref={ref} className="relative">
      {/* ══ DESKTOP — DIAMOND LAYOUT ═══════════════════════════════ */}
      <div className="hidden md:block">
        <div
          className="relative mx-auto"
          style={{ maxWidth: "58rem", aspectRatio: "1000 / 720" }}
        >
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(hsl(214, 60%, 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(214, 60%, 32%) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden
          />

          {/* SVG — diamond frame + central gem */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 720"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <radialGradient id="gemGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(214, 80%, 45%)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="hsl(214, 80%, 45%)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="gemFacetTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(214, 60%, 32%)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="hsl(214, 60%, 32%)" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {/* Outer diamond frame connecting card centers */}
            <path
              d="M 500 80 L 880 360 L 500 640 L 120 360 Z"
              fill="none"
              stroke="hsl(214, 60%, 32%)"
              strokeOpacity="0.3"
              strokeWidth="1.2"
              strokeDasharray="4 8"
              className={`vision-line ${inView ? "is-visible" : ""}`}
              style={{
                ["--line-length" as string]: "2000",
                animationDuration: "2s",
              }}
            />

            {/* Dashed connecting lines from each cardinal to center */}
            <g stroke="hsl(214, 60%, 32%)" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6">
              <line x1="500" y1="160" x2="500" y2="280" />
              <line x1="800" y1="360" x2="600" y2="360" />
              <line x1="500" y1="560" x2="500" y2="440" />
              <line x1="200" y1="360" x2="400" y2="360" />
            </g>

            {/* Central gem glow */}
            <circle cx="500" cy="360" r="130" fill="url(#gemGlow)" className="vision-star-glow" />

            {/* Central diamond — cut gem with facets */}
            <g
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0.5)",
                transformOrigin: "500px 360px",
                transition: "opacity 0.8s ease-out 0.6s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.6s",
              }}
            >
              {/* Outer gem outline */}
              <path
                d="M 500 280 L 580 360 L 500 440 L 420 360 Z"
                fill="url(#gemFacetTop)"
                stroke="hsl(214, 60%, 32%)"
                strokeOpacity="0.65"
                strokeWidth="1.5"
              />
              {/* Inner facet lines (creating the cut-diamond look) */}
              <g stroke="hsl(214, 60%, 32%)" strokeOpacity="0.4" strokeWidth="1">
                {/* Horizontal girdle */}
                <line x1="420" y1="360" x2="580" y2="360" />
                {/* Vertical center */}
                <line x1="500" y1="280" x2="500" y2="440" />
                {/* Upper facets */}
                <line x1="460" y1="320" x2="500" y2="360" />
                <line x1="540" y1="320" x2="500" y2="360" />
                {/* Lower facets */}
                <line x1="460" y1="400" x2="500" y2="360" />
                <line x1="540" y1="400" x2="500" y2="360" />
              </g>
              {/* Inner highlight (polished center) */}
              <circle cx="500" cy="360" r="3" fill="hsl(214, 60%, 32%)" />
            </g>

            {/* Blueprint dimension ticks on outer diamond tips */}
            <g stroke="hsl(214, 60%, 32%)" strokeOpacity="0.5" strokeWidth="1.2">
              <line x1="485" y1="80" x2="515" y2="80" />
              <line x1="880" y1="345" x2="880" y2="375" />
              <line x1="485" y1="640" x2="515" y2="640" />
              <line x1="120" y1="345" x2="120" y2="375" />
            </g>
          </svg>

          {/* 4 cards at N, E, S, W positions */}
          {VENTAJAS.map((v, i) => {
            const Icon = v.icon;
            const delay = 0.25 + i * 0.12;
            return (
              <div
                key={v.num}
                className={`absolute w-[17rem] ${positions[i]}`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: `${positions[i].includes("-translate-x-1/2") ? "translateX(-50%)" : ""} ${
                    positions[i].includes("-translate-y-1/2") ? "translateY(-50%)" : ""
                  } ${inView ? "scale(1)" : "scale(0.92)"}`,
                  transition: `opacity 0.6s ease-out ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
                }}
              >
                <div className="bg-background border border-primary/20 rounded-lg p-5 shadow-sm relative overflow-hidden">
                  {/* Watermark numeral */}
                  <span className="absolute top-1 right-3 font-serif italic text-5xl text-primary/[0.08] leading-none pointer-events-none select-none">
                    {v.num}
                  </span>

                  <div className="flex items-start gap-3 relative">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/5 border border-primary/25 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-mono uppercase tracking-[0.24em] text-primary/65 mb-1">
                        {t("vd.facet")} · {v.num}
                      </p>
                      <h3 className="text-base font-serif text-foreground leading-tight mb-1">
                        {v.title}
                      </h3>
                      <p className="text-[0.72rem] text-muted-foreground leading-snug">
                        {v.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Descriptions below diamond */}
        <div className="grid grid-cols-4 gap-6 mt-12">
          {VENTAJAS.map((v, i) => {
            const delay = 0.9 + i * 0.08;
            return (
              <div
                key={v.num}
                className="text-center"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-px w-6 bg-primary/30" />
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">
                    {v.num}
                  </p>
                  <div className="h-px w-6 bg-primary/30" />
                </div>
                <p className="text-[0.82rem] text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ MOBILE — stacked list with diamond markers ══════════════ */}
      <div className="md:hidden space-y-5">
        {VENTAJAS.map((v, i) => {
          const Icon = v.icon;
          return (
            <div
              key={v.num}
              className={`relative bg-background border border-primary/20 rounded-xl p-5 reveal-hidden ${
                inView ? "reveal-visible" : ""
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Diamond marker at top-left */}
              <div className="absolute -top-2 left-5 flex items-center gap-1.5">
                <svg
                  className="w-3 h-3 text-primary"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M6 0 L12 6 L6 12 L0 6 Z" />
                </svg>
                <p className="text-[9px] font-mono uppercase tracking-[0.24em] text-primary bg-background px-1">
                  {t("vd.facet")} · {v.num}
                </p>
              </div>

              <div className="flex items-start gap-4 pt-1">
                <div className="shrink-0 w-11 h-11 rounded-full bg-primary/5 border border-primary/25 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-serif text-foreground leading-tight mb-1">
                    {v.title}
                  </h3>
                  <p className="text-[0.78rem] font-medium text-primary/80 mb-2">
                    {v.tagline}
                  </p>
                  <p className="text-[0.85rem] text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
