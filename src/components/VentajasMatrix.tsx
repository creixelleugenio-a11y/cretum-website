import { useEffect, useRef, useState } from "react";
import { Network, Layers, LayoutGrid, Activity } from "lucide-react";

type Ventaja = {
  icon: typeof Network;
  title: string;
  desc: string;
  num: string;
  kicker: string;
};

const VENTAJAS: Ventaja[] = [
  {
    icon: Network,
    title: "Acceso Institucional",
    desc: "Nuestra red global nos permite ofrecer acceso a fondos, co-inversiones y oportunidades pre-IPO que normalmente están reservadas a grandes instituciones.",
    num: "I",
    kicker: "Red",
  },
  {
    icon: Layers,
    title: "Análisis Multidimensional",
    desc: "Combinamos análisis macro, fundamental y cuantitativo para construir portafolios robustos con cobertura en periodos de volatilidad.",
    num: "II",
    kicker: "Método",
  },
  {
    icon: LayoutGrid,
    title: "Plataforma Multiestrategia",
    desc: "Capital privado, mercados públicos y gestión patrimonial bajo un mismo paraguas, con la flexibilidad de adaptarnos al perfil de cada cliente.",
    num: "III",
    kicker: "Plataforma",
  },
  {
    icon: Activity,
    title: "Tecnología Cuantitativa",
    desc: "A través de Trendrating, monitoreamos más de 17,000 activos en 12 regiones con 8 indicadores propietarios para anticipar tendencias con mayor precisión.",
    num: "IV",
    kicker: "Tecnología",
  },
];

export function VentajasMatrix() {
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

  return (
    <div ref={ref} className="relative">
      {/* ══ DESKTOP MATRIX ════════════════════════════════════════ */}
      <div className="hidden md:block relative">
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

        {/* Top blueprint label */}
        <div className="absolute -top-8 left-0 right-0 flex items-center gap-3 pointer-events-none">
          <div className="h-px flex-1 bg-primary/25" />
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/55">
            Matriz · Ventajas · Escala 1:1
          </p>
          <div className="h-px flex-1 bg-primary/25" />
        </div>

        {/* Side axis labels */}
        <div
          className="absolute top-1/2 -left-2 -translate-y-1/2 -translate-x-full origin-center pointer-events-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translate(0, 50%)" }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/55 whitespace-nowrap">
            Método
          </p>
        </div>
        <div
          className="absolute top-1/2 -right-2 -translate-y-1/2 translate-x-full origin-center pointer-events-none"
          style={{ writingMode: "vertical-rl" }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/55 whitespace-nowrap">
            Alcance
          </p>
        </div>

        {/* Outer frame corner marks */}
        <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-primary/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-primary/50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-primary/50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-primary/50 pointer-events-none" />

        {/* 2x2 grid of advantages */}
        <div className="grid grid-cols-2 relative">
          {VENTAJAS.map((v, i) => {
            const delay = 0.2 + i * 0.15;
            const Icon = v.icon;
            // inner borders: right on col-1, bottom on row-1
            const isRightCol = i % 2 === 1;
            const isBottomRow = i >= 2;
            const border = [
              !isRightCol ? "md:border-r" : "",
              !isBottomRow ? "md:border-b" : "",
            ].join(" ");
            return (
              <div
                key={v.num}
                className={`relative p-9 lg:p-12 ${border} border-primary/15`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
                }}
              >
                {/* Watermark numeral */}
                <span className="absolute top-4 right-6 font-serif italic text-7xl lg:text-8xl text-primary/[0.07] leading-none pointer-events-none select-none">
                  {v.num}
                </span>

                {/* Coordinate label */}
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-primary/65 mb-5">
                  Q · {v.num}
                  <span className="text-primary/35 mx-2">/</span>
                  {v.kicker}
                </p>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 border border-primary/25 mb-5 shadow-sm">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif text-foreground leading-tight mb-3">
                  {v.title}
                </h3>

                {/* Description */}
                <p className="text-[0.93rem] text-muted-foreground leading-relaxed max-w-md">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Central hub — sits at crosshair */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none z-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.5)",
            transition: "opacity 0.6s ease-out 0.85s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.85s",
          }}
        >
          <div className="w-14 h-14 rounded-full bg-background border-2 border-primary/45 flex items-center justify-center shadow-md">
            <div className="w-3 h-3 rotate-45 bg-primary" />
          </div>
        </div>
      </div>

      {/* ══ MOBILE STACK ══════════════════════════════════════════ */}
      <div className="md:hidden space-y-5">
        {VENTAJAS.map((v, i) => {
          const Icon = v.icon;
          return (
            <div
              key={v.num}
              className={`relative p-6 border border-primary/15 rounded-xl bg-background reveal-hidden ${inView ? "reveal-visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="absolute top-3 right-5 font-serif italic text-5xl text-primary/[0.08] leading-none pointer-events-none select-none">
                {v.num}
              </span>
              <div className="flex items-start gap-4 relative">
                <div className="shrink-0 w-11 h-11 rounded-full bg-primary/5 border border-primary/25 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-primary/65 mb-1.5">
                    Q · {v.num}
                    <span className="text-primary/35 mx-1.5">/</span>
                    {v.kicker}
                  </p>
                  <h3 className="text-lg font-serif text-foreground leading-tight mb-2">
                    {v.title}
                  </h3>
                  <p className="text-[0.87rem] text-muted-foreground leading-relaxed">
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
