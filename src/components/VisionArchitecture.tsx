import { useEffect, useRef, useState } from "react";
import { Microscope, Cpu, Users, ShieldCheck, Star } from "lucide-react";
import cretumLogo from "@/assets/Cretum_Logo.png";

type Pillar = {
  icon: typeof Microscope;
  label: string;
  desc: string;
  num: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Microscope,
    label: "Análisis Fundamental",
    desc: "Investigación profunda y validación sistemática en cada decisión. Rigor analítico, due diligence exhaustivo y perspectiva de largo plazo.",
    num: "I",
  },
  {
    icon: Cpu,
    label: "Tecnología Cuantitativa",
    desc: "Herramientas propias para decisiones de inversión y control de riesgo. Modelos que detectan señales antes que el mercado y miden exposiciones en tiempo real.",
    num: "II",
  },
  {
    icon: Users,
    label: "Red Institucional",
    desc: "Acceso a oportunidades y condiciones exclusivas en mercados globales. Relaciones de primer nivel con gestores, coinversionistas y contrapartes estratégicas.",
    num: "III",
  },
  {
    icon: ShieldCheck,
    label: "Preservación del Capital",
    desc: "Retornos competitivos sin comprometer la protección patrimonial. Disciplina en la asignación, cobertura de riesgos y enfoque multigeneracional.",
    num: "IV",
  },
];

export function VisionArchitecture() {
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
      {/* ══ DESKTOP BLUEPRINT ════════════════════════════════════════ */}
      <div className="hidden md:block relative">
        {/* Blueprint grid background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(214, 60%, 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(214, 60%, 32%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />

        <div className="relative">
        <svg
          viewBox="0 0 1200 660"
          className="w-full h-auto relative"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <radialGradient id="archStarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(214, 80%, 45%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(214, 80%, 45%)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="archColumn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(214, 60%, 32%)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(214, 60%, 32%)" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* ── Construction / dimension lines (dashed) ── */}
          <g stroke="hsl(214, 60%, 32%)" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 5">
            {/* Horizontal measurement line at top */}
            <line x1="60" y1="60" x2="1140" y2="60" />
            <line x1="60" y1="55" x2="60" y2="85" />
            <line x1="1140" y1="55" x2="1140" y2="85" />
            {/* Vertical measurement on right */}
            <line x1="1172" y1="200" x2="1172" y2="600" />
            <line x1="1167" y1="200" x2="1182" y2="200" />
            <line x1="1167" y1="600" x2="1182" y2="600" />
            {/* Vertical measurement on left */}
            <line x1="28" y1="200" x2="28" y2="600" />
            <line x1="23" y1="200" x2="38" y2="200" />
            <line x1="23" y1="600" x2="38" y2="600" />
          </g>
          <text
            x="600"
            y="52"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="hsl(214, 60%, 32%)"
            fillOpacity="0.55"
            letterSpacing="2"
          >
            VISIÓN · LARGO PLAZO
          </text>
          <text
            x="1190"
            y="404"
            fontSize="11"
            fontFamily="monospace"
            fill="hsl(214, 60%, 32%)"
            fillOpacity="0.55"
            letterSpacing="2"
            transform="rotate(90 1190 404)"
          >
            FUNDAMENTOS
          </text>
          <text
            x="10"
            y="404"
            fontSize="11"
            fontFamily="monospace"
            fill="hsl(214, 60%, 32%)"
            fillOpacity="0.55"
            letterSpacing="2"
            transform="rotate(-90 10 404)"
          >
            ESCALA 1:1
          </text>

          {/* ── Pediment (triangle) with North Star ── */}
          <g
            className="arch-reveal"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.8s ease-out 0.1s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
            }}
          >
            {/* Pediment triangle */}
            <path
              d="M 90 200 L 600 80 L 1110 200 Z"
              fill="none"
              stroke="hsl(214, 60%, 32%)"
              strokeOpacity="0.65"
              strokeWidth="1.5"
            />
            {/* Inner pediment decorative line — split to avoid cutting through logo */}
            <path
              d="M 140 200 L 470 137"
              fill="none"
              stroke="hsl(214, 60%, 32%)"
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <path
              d="M 730 137 L 1060 200"
              fill="none"
              stroke="hsl(214, 60%, 32%)"
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          </g>

          {/* ── Architrave / Beam ── */}
          <g
            className="arch-reveal"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "600px 220px",
              transition: "opacity 0.7s ease-out 0.4s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
            }}
          >
            <rect
              x="60"
              y="200"
              width="1080"
              height="48"
              fill="hsl(214, 60%, 32%)"
              fillOpacity="0.06"
              stroke="hsl(214, 60%, 32%)"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
            {/* Beam decorative line */}
            <line
              x1="60"
              y1="236"
              x2="1140"
              y2="236"
              stroke="hsl(214, 60%, 32%)"
              strokeOpacity="0.3"
              strokeWidth="0.8"
            />
          </g>

          {/* ── Four columns ── */}
          {[165, 465, 735, 1035].map((x, i) => {
            const delay = 0.6 + i * 0.18;
            return (
              <g
                key={x}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: `${x}px 600px`,
                  transition: `opacity 0.6s ease-out ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
                }}
              >
                {/* Capital (top of column) */}
                <rect
                  x={x - 54}
                  y="248"
                  width="108"
                  height="18"
                  fill="hsl(214, 60%, 32%)"
                  fillOpacity="0.08"
                  stroke="hsl(214, 60%, 32%)"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                />
                {/* Shaft */}
                <rect
                  x={x - 40}
                  y="266"
                  width="80"
                  height="316"
                  fill="url(#archColumn)"
                  stroke="hsl(214, 60%, 32%)"
                  strokeOpacity="0.5"
                  strokeWidth="1.2"
                />
                {/* Fluting (vertical decorative lines) */}
                {[-26, -13, 0, 13, 26].map((offset) => (
                  <line
                    key={offset}
                    x1={x + offset}
                    y1="278"
                    x2={x + offset}
                    y2="570"
                    stroke="hsl(214, 60%, 32%)"
                    strokeOpacity="0.18"
                    strokeWidth="0.8"
                  />
                ))}
                {/* Base (bottom of column) */}
                <rect
                  x={x - 54}
                  y="582"
                  width="108"
                  height="18"
                  fill="hsl(214, 60%, 32%)"
                  fillOpacity="0.08"
                  stroke="hsl(214, 60%, 32%)"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                />
                {/* Plinth */}
                <rect
                  x={x - 66}
                  y="600"
                  width="132"
                  height="12"
                  fill="hsl(214, 60%, 32%)"
                  fillOpacity="0.1"
                  stroke="hsl(214, 60%, 32%)"
                  strokeOpacity="0.5"
                  strokeWidth="1.2"
                />
                {/* Roman numeral on column */}
                <text
                  x={x}
                  y="430"
                  textAnchor="middle"
                  fontSize="44"
                  fontFamily="Playfair Display, serif"
                  fill="hsl(214, 60%, 32%)"
                  fillOpacity="0.35"
                  fontStyle="italic"
                >
                  {PILLARS[i].num}
                </text>
              </g>
            );
          })}

          {/* ── Stylobate / ground line ── */}
          <g
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.2s",
            }}
          >
            <line
              x1="50"
              y1="614"
              x2="1150"
              y2="614"
              stroke="hsl(214, 60%, 32%)"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
            <line
              x1="30"
              y1="624"
              x2="1170"
              y2="624"
              stroke="hsl(214, 60%, 32%)"
              strokeOpacity="0.25"
              strokeWidth="0.8"
              strokeDasharray="2 4"
            />
          </g>
        </svg>

        {/* ── Star overlay (HTML for crisp icon) ── */}
        <div
          className="absolute inset-0 pointer-events-none flex"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1)" : "scale(0.7)",
            transition: "opacity 0.6s ease-out 0.9s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.9s",
          }}
        >
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "21.2%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={cretumLogo}
              alt="Cretum Partners"
              className="relative w-28 h-28 lg:w-36 lg:h-36 object-contain"
            />
          </div>
        </div>

        {/* ── Beam label: Vision statement ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            top: "33.9%",
            transform: "translate(-50%, -50%)",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.8s",
          }}
        >
          <p className="text-[11px] lg:text-xs font-bold uppercase tracking-[0.3em] text-primary text-center whitespace-nowrap">
            Gestor de referencia · México y Latinoamérica
          </p>
        </div>
        </div>

        {/* ── Pillar labels (in normal flow below SVG) ── */}
        <div className="grid grid-cols-4 gap-6 mt-4 px-4 relative">
          {PILLARS.map((p, i) => {
            const delay = 1.0 + i * 0.1;
            return (
              <div
                key={p.label}
                className="text-center"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 border border-primary/25 mb-3">
                  <p.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary mb-1.5">
                  Pilar {p.num}
                </p>
                <p className="text-lg font-serif text-foreground leading-tight mb-2">
                  {p.label}
                </p>
                <p className="text-[0.82rem] text-muted-foreground leading-relaxed max-w-[260px] mx-auto">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ MOBILE — simplified architectural stack ══════════════════ */}
      <div className="md:hidden relative">
        {/* Blueprint grid bg */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(214, 60%, 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(214, 60%, 32%) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        {/* Pediment + Star */}
        <div
          className={`relative text-center pb-6 reveal-scale ${inView ? "reveal-visible" : ""}`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="relative inline-flex items-center justify-center mb-4">
            <img
              src={cretumLogo}
              alt="Cretum Partners"
              className="relative w-32 h-32 object-contain"
            />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-1.5">
            Visión
          </p>
          <h3 className="text-xl font-serif text-foreground leading-tight">
            Gestor de referencia
          </h3>
          <p className="text-sm text-muted-foreground">
            en México y Latinoamérica
          </p>
        </div>

        {/* Beam */}
        <div
          className={`h-2 bg-primary/10 border-y border-primary/40 reveal-hidden ${inView ? "reveal-visible" : ""}`}
          style={{ transitionDelay: "0.3s" }}
        />

        {/* Columns */}
        <div className="grid grid-cols-4 gap-1.5 pt-0">
          {PILLARS.map((p, i) => (
            <div
              key={p.label}
              className={`relative reveal-hidden ${inView ? "reveal-visible" : ""}`}
              style={{ transitionDelay: `${0.4 + i * 0.1}s` }}
            >
              {/* Capital */}
              <div className="h-2 bg-primary/8 border-x border-b border-primary/40 mx-0.5" />
              {/* Shaft */}
              <div className="relative h-28 bg-gradient-to-b from-primary/[0.06] to-primary/[0.02] border-x border-primary/40 mx-1.5 flex items-center justify-center">
                <span className="font-serif italic text-2xl text-primary/30">
                  {p.num}
                </span>
              </div>
              {/* Base */}
              <div className="h-2 bg-primary/8 border-x border-t border-primary/40 mx-0.5" />
            </div>
          ))}
        </div>

        {/* Stylobate */}
        <div
          className={`h-1 bg-primary/40 mt-1 reveal-hidden ${inView ? "reveal-visible" : ""}`}
          style={{ transitionDelay: "0.7s" }}
        />
        <div className="h-px bg-primary/20 mt-1 border-t border-dashed border-primary/30" />

        {/* Pillar descriptions */}
        <div className="mt-8 space-y-6">
          {PILLARS.map((p, i) => (
            <div
              key={p.label}
              className={`flex items-start gap-4 reveal-left ${inView ? "reveal-visible" : ""}`}
              style={{ transitionDelay: `${0.9 + i * 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                <p.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-1">
                  Pilar {p.num}
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
        </div>
      </div>
    </div>
  );
}
