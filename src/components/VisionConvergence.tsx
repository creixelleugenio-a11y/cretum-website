import { useEffect, useRef, useState } from "react";
import { Microscope, Cpu, Users, Star } from "lucide-react";

const PILLARS = [
  {
    icon: Microscope,
    label: "Análisis Fundamental",
    desc: "Riguroso, estructurado y basado en evidencia.",
  },
  {
    icon: Cpu,
    label: "Tecnología Cuantitativa",
    desc: "Sistemas propios para detectar señales antes que el mercado.",
  },
  {
    icon: Users,
    label: "Red Institucional",
    desc: "Relaciones de primer nivel para acceder a oportunidades globales.",
  },
];

export function VisionConvergence() {
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
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* ══ DESKTOP DIAGRAM ════════════════════════════════════════ */}
      <div className="hidden md:block relative min-h-[520px]">
        {/* Background SVG — converging lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 520"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* Soft radial glow behind star */}
          <defs>
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(214, 80%, 45%)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="hsl(214, 80%, 45%)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="820" cy="260" r="140" fill="url(#starGlow)" />

          {/* Converging lines — each pillar to the star */}
          <line
            x1="300"
            y1="95"
            x2="800"
            y2="260"
            stroke="hsl(214, 60%, 32%)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            className={`vision-line ${inView ? "is-visible" : ""}`}
            style={{ ["--line-length" as string]: "600", animationDelay: "0.3s" }}
          />
          <line
            x1="300"
            y1="260"
            x2="800"
            y2="260"
            stroke="hsl(214, 60%, 32%)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            className={`vision-line ${inView ? "is-visible" : ""}`}
            style={{ ["--line-length" as string]: "520", animationDelay: "0.5s" }}
          />
          <line
            x1="300"
            y1="425"
            x2="800"
            y2="260"
            stroke="hsl(214, 60%, 32%)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            className={`vision-line ${inView ? "is-visible" : ""}`}
            style={{ ["--line-length" as string]: "600", animationDelay: "0.7s" }}
          />
        </svg>

        {/* Pillars — left column */}
        <div className="relative grid grid-cols-12 items-stretch h-[520px]">
          <div className="col-span-5 flex flex-col justify-between py-4">
            {PILLARS.map((p, i) => (
              <div
                key={p.label}
                className={`flex items-center gap-5 reveal-left ${inView ? "reveal-visible" : ""}`}
                style={{ transitionDelay: `${0.15 + i * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0 shadow-sm">
                  <p.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div className="max-w-xs">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-1.5">
                    {`0${i + 1}`}
                  </p>
                  <p className="text-lg font-serif text-foreground leading-tight mb-1.5">
                    {p.label}
                  </p>
                  <p className="text-[0.82rem] text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Spacer for lines */}
          <div className="col-span-3" />

          {/* North Star destination — right column */}
          <div className="col-span-4 flex items-center justify-center">
            <div
              className={`relative text-center reveal-scale ${inView ? "reveal-visible" : ""}`}
              style={{ transitionDelay: "1.1s" }}
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 -m-6 rounded-full bg-primary/20 blur-2xl vision-star-glow" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-[hsl(214,80%,45%)] flex items-center justify-center shadow-xl shadow-primary/25">
                  <Star className="w-11 h-11 text-white fill-white" strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">
                Norte · Visión
              </p>
              <h3 className="text-2xl lg:text-3xl font-serif text-foreground leading-tight mb-2">
                Gestor de referencia
              </h3>
              <p className="text-sm text-muted-foreground">
                en México y Latinoamérica
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MOBILE DIAGRAM ════════════════════════════════════════ */}
      <div className="md:hidden space-y-6">
        {PILLARS.map((p, i) => (
          <div
            key={p.label}
            className={`flex items-start gap-4 reveal-left ${inView ? "reveal-visible" : ""}`}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
              <p.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-1">
                {`0${i + 1}`}
              </p>
              <p className="text-base font-serif text-foreground leading-tight mb-1">
                {p.label}
              </p>
              <p className="text-[0.82rem] text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Vertical connector */}
        <div className="flex justify-[3rem] pl-6">
          <div className="w-px h-10 border-l border-dashed border-primary/30" />
        </div>

        {/* North Star — mobile */}
        <div
          className={`text-center pt-2 reveal-scale ${inView ? "reveal-visible" : ""}`}
          style={{ transitionDelay: "0.6s" }}
        >
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="absolute inset-0 -m-4 rounded-full bg-primary/20 blur-xl vision-star-glow" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[hsl(214,80%,45%)] flex items-center justify-center shadow-xl shadow-primary/25">
              <Star className="w-9 h-9 text-white fill-white" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-2">
            Norte · Visión
          </p>
          <h3 className="text-2xl font-serif text-foreground leading-tight mb-1">
            Gestor de referencia
          </h3>
          <p className="text-sm text-muted-foreground">
            en México y Latinoamérica
          </p>
        </div>
      </div>
    </div>
  );
}
