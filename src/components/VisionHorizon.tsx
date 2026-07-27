import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

type Waypoint = {
  kicker: string;
  title: string;
  desc: string;
  /** x,y in viewBox units (0-1200 × 0-400) */
  cx: number;
  cy: number;
};

const WAYPOINTS: Waypoint[] = [
  {
    kicker: "Hoy",
    title: "Fundamentos",
    desc: "Proceso riguroso, equipo consolidado, red institucional activa.",
    cx: 110,
    cy: 335,
  },
  {
    kicker: "Fase II",
    title: "Presencia Regional",
    desc: "Ampliación de mandatos y cobertura en mercados LatAm.",
    cx: 430,
    cy: 255,
  },
  {
    kicker: "Fase III",
    title: "Liderazgo LatAm",
    desc: "Franquicia de referencia en gestión de activos alternativos.",
    cx: 770,
    cy: 155,
  },
  {
    kicker: "Visión",
    title: "Gestor de referencia",
    desc: "en México y Latinoamérica.",
    cx: 1090,
    cy: 75,
  },
];

// Path length (approx) for stroke-dashoffset animation
const PATH_LENGTH = 1400;

export function VisionHorizon() {
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

  const lastIdx = WAYPOINTS.length - 1;

  return (
    <div ref={ref} className="relative">
      {/* ══ DESKTOP HORIZON ═══════════════════════════════════════ */}
      <div className="hidden md:block relative">
        <svg
          viewBox="0 0 1200 420"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          {/* Soft baseline grid — dotted horizon lines */}
          <g stroke="currentColor" className="text-foreground/5">
            <line x1="0" y1="100" x2="1200" y2="100" strokeDasharray="2 6" />
            <line x1="0" y1="200" x2="1200" y2="200" strokeDasharray="2 6" />
            <line x1="0" y1="300" x2="1200" y2="300" strokeDasharray="2 6" />
          </g>

          <defs>
            <radialGradient id="horizonStarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(214, 80%, 45%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(214, 80%, 45%)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Trajectory — dotted ascending curve */}
          <path
            d="M 110 335 C 260 320, 320 280, 430 255 C 560 225, 650 195, 770 155 C 900 110, 970 95, 1090 75"
            fill="none"
            stroke="hsl(214, 60%, 32%)"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeDasharray="2 8"
            strokeLinecap="round"
            className={`vision-line ${inView ? "is-visible" : ""}`}
            style={{
              ["--line-length" as string]: String(PATH_LENGTH),
              animationDuration: "2.2s",
            }}
          />

          {/* Glow behind final waypoint */}
          <circle cx="1090" cy="75" r="60" fill="url(#horizonStarGlow)" />

          {/* Waypoint markers */}
          {WAYPOINTS.map((w, i) => {
            const isLast = i === lastIdx;
            const delay = 0.4 + i * 0.35;
            return (
              <g
                key={w.title}
                className="reveal-scale"
                style={{
                  transitionDelay: `${delay}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scale(1)" : "scale(0.6)",
                  transformOrigin: `${w.cx}px ${w.cy}px`,
                  transition: "opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: `${delay}s`,
                }}
              >
                {/* Outer ring */}
                <circle
                  cx={w.cx}
                  cy={w.cy}
                  r={isLast ? 14 : 8}
                  fill="white"
                  stroke="hsl(214, 60%, 32%)"
                  strokeWidth={isLast ? 2 : 1.5}
                />
                {/* Inner dot */}
                <circle
                  cx={w.cx}
                  cy={w.cy}
                  r={isLast ? 6 : 3.5}
                  fill="hsl(214, 60%, 32%)"
                />
              </g>
            );
          })}
        </svg>

        {/* HTML labels absolute positioned over the SVG */}
        <div className="absolute inset-0 pointer-events-none">
          {WAYPOINTS.map((w, i) => {
            const isLast = i === lastIdx;
            // Convert viewBox coords (1200×420) to percentages
            const leftPct = (w.cx / 1200) * 100;
            const topPct = (w.cy / 420) * 100;
            const delay = 0.6 + i * 0.35;
            return (
              <div
                key={w.title}
                className={`absolute reveal-hidden ${inView ? "reveal-visible" : ""}`}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: isLast
                    ? "translate(-100%, -140%)"
                    : i === 0
                    ? "translate(-20%, 20%)"
                    : "translate(-50%, -135%)",
                  transitionDelay: `${delay}s`,
                  width: isLast ? "280px" : "180px",
                }}
              >
                {isLast ? (
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-primary fill-primary" strokeWidth={1.5} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {w.kicker}
                      </p>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-serif text-foreground leading-tight mb-2">
                      {w.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                ) : (
                  <div className={i === 0 ? "text-left" : "text-center"}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-1.5">
                      {w.kicker}
                    </p>
                    <p className="text-base font-serif text-foreground leading-tight mb-1">
                      {w.title}
                    </p>
                    <p className="text-[0.78rem] text-muted-foreground leading-snug">
                      {w.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ MOBILE HORIZON — vertical stack ═══════════════════════ */}
      <div className="md:hidden relative pl-10">
        {/* Vertical dotted line */}
        <div
          className="absolute left-5 top-2 bottom-2 border-l-2 border-dashed border-primary/40"
          aria-hidden
        />

        <div className="space-y-10">
          {WAYPOINTS.map((w, i) => {
            const isLast = i === lastIdx;
            return (
              <div
                key={w.title}
                className={`relative reveal-hidden ${inView ? "reveal-visible" : ""}`}
                style={{ transitionDelay: `${i * 0.18}s` }}
              >
                {/* Marker dot */}
                <div
                  className={`absolute -left-10 top-1 flex items-center justify-center ${
                    isLast ? "w-7 h-7" : "w-4 h-4"
                  }`}
                >
                  {isLast && (
                    <div className="absolute inset-0 -m-1 rounded-full bg-primary/25 blur-md vision-star-glow" />
                  )}
                  <div
                    className={`relative rounded-full bg-white border-2 border-primary flex items-center justify-center ${
                      isLast ? "w-7 h-7" : "w-4 h-4"
                    }`}
                  >
                    <div
                      className={`rounded-full bg-primary ${
                        isLast ? "w-3 h-3" : "w-1.5 h-1.5"
                      }`}
                    />
                  </div>
                </div>

                {/* Label */}
                {isLast ? (
                  <div>
                    <div className="inline-flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-primary fill-primary" strokeWidth={1.5} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {w.kicker}
                      </p>
                    </div>
                    <h3 className="text-2xl font-serif text-foreground leading-tight mb-2">
                      {w.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-1">
                      {w.kicker}
                    </p>
                    <p className="text-base font-serif text-foreground leading-tight mb-1">
                      {w.title}
                    </p>
                    <p className="text-[0.82rem] text-muted-foreground leading-relaxed">
                      {w.desc}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
