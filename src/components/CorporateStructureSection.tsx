import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";
import { TrendingUp, Landmark, Activity, Rocket, ArrowRight } from "lucide-react";
import buildingImg from "@/assets/building-corporate.jpg";

/* ── Card data ────────────────────────────────────────────────── */
const CARDS = [
  {
    icon: Rocket,
    name: "Manhattan Venture Partners",
    split: false,
    bullets: [
      { label: "",    text: "Invirtiendo en empresas tecnológicas de alto potencial en etapas pre-IPO, aprovechando nuestra red para identificar tendencias clave de forma anticipada" },
    ],
  },
  {
    icon: Activity,
    name: "GVV Fund",
    split: false,
    bullets: [
      { label: "Growth",     text: "Late-Stage Secondaries & Pre-IPO Investments" },
      { label: "Value",      text: "Value Investing Thesis with Margin of Safety" },
      { label: "Volatility", text: "Delta Hedging and Alpha Generation Strategies" },
    ],
  },
  {
    icon: TrendingUp,
    name: "Trendrating",
    split: false,
    bullets: [
      { label: "Cobertura", text: "17,000+ activos en 12 regiones globales" },
      { label: "Señales",   text: "8 indicadores cuantitativos propietarios" },
      { label: "Adopción",  text: "350+ instituciones" },
    ],
  },
  {
    icon: Landmark,
    name: "Gestión Patrimonial",
    split: false,
    bullets: [
      { label: "", text: "Construyendo portafolios estructurados a partir de análisis macro y fundamental, con ejecución disciplinada y cobertura en periodos de volatilidad." },
    ],
  },
];

/* ── Main section ─────────────────────────────────────────────── */
export function CorporateStructureSection() {
  const { t } = useLanguage();

  return (
    <section id="estructura" className="pt-24 pb-44 bg-background relative overflow-hidden">
      {/* Building image — right edge of section, behind everything */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none select-none">
        <img src={buildingImg} alt="" className="absolute left-0 top-0 w-[35%] h-full object-cover object-center grayscale opacity-[0.07]" style={{ WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 20% 50%, black 30%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 80% at 20% 50%, black 30%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 0%, transparent 15%, var(--background, white) 50%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">

        <Reveal>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-12">
            {t("about.structure.title")}
          </h2>
        </Reveal>

        {/* ══ DESKTOP ══════════════════════════════════════════════

            Architecture mirrors Coatue.com exactly:
            · Two transparent dashed-border boxes as absolute overlays
            · 5 cards in a flat grid row — always visible (z:10)
            · Privado box  (left, larger): top:2.5rem, right:"42%"
            · Público  box (right, taller): top:0, left:"38%"
            · Overlap zone 38–58% = GVV card exactly between both borders
            · "Privado" heading inside left box, "Público" inside right box
            · CTA at bottom-left inside Privado region
        ══════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block relative overflow-visible">

          {/* Left — Privado (covers 0–37 % from right) */}
          <div
            className="absolute z-20 rounded-2xl border-2 border-dashed border-foreground/20 pointer-events-none"
            style={{ left: 0, right: "50%", top: "2.5rem", bottom: "1rem" }}
          />

          {/* Right — Público (above cards) */}
          <div
            className="absolute z-20 rounded-2xl border-2 border-dashed border-foreground/20 pointer-events-none"
            style={{ left: "25.8%", right: 0, top: 0, bottom: 0 }}
          />

          {/* Zone label — Privado (top-left of left box) */}
          <div className="absolute z-20" style={{ top: "4rem", left: "2rem" }}>
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
                Capital Privado
              </p>
              <h3 className="text-[2.2rem] font-serif text-foreground leading-none">
                Privado
              </h3>
            </Reveal>
          </div>

          {/* Zone label — Público (top-right of right box) */}
          <div className="absolute z-20 text-right" style={{ top: "1.25rem", right: "2rem" }}>
            <Reveal delay={0.15}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
                Mercados Públicos
              </p>
              <h3 className="text-[2.2rem] font-serif text-foreground leading-none">
                Público
              </h3>
            </Reveal>
          </div>

          {/* Spacer: clears both labels before the card row */}
          <div style={{ height: "7rem" }} aria-hidden />

          {/* Cards — 4 equal columns, z above both boxes */}
          <div className="relative z-10 grid gap-6 px-8 pt-8 pb-12 items-stretch" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            {CARDS.map((card, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="bg-background border border-border/40 rounded-xl px-8 pt-8 pb-28 flex flex-col h-full">
                  {card.split ? (
                    <div className="flex gap-4 flex-1">
                      {/* Left side: Growth */}
                      <ul className="space-y-2.5 flex-1 pt-[5.5rem]">
                        <li className="text-[0.8rem] text-muted-foreground leading-snug">
                          <span className="font-semibold text-foreground/70">{card.bullets[0].label}</span>
                          {" · "}
                          {card.bullets[0].text}
                        </li>
                      </ul>
                      {/* Right side: Icon + Name + Value + Volatility */}
                      <div className="flex-1 flex flex-col">
                        <card.icon className="w-7 h-7 text-primary mb-5" strokeWidth={1.4} />
                        <p className="font-semibold text-[1rem] text-foreground leading-snug mb-4">{card.name}</p>
                        <ul className="space-y-2.5 mt-20">
                          {card.bullets.slice(1).map((b) => (
                            <li key={b.label} className="text-[0.8rem] text-muted-foreground leading-snug">
                              <span className="font-semibold text-foreground/70">{b.label}</span>
                              {" · "}
                              {b.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                      <card.icon className="w-9 h-9 text-primary mb-6" strokeWidth={1.3} />
                      <p className="font-semibold text-[1.15rem] text-foreground leading-snug mb-5">{card.name}</p>
                      <ul className="space-y-3.5">
                        {card.bullets.map((b) => (
                          <li key={b.label} className="text-[0.9rem] text-muted-foreground leading-relaxed">
                            {b.label && <><span className="font-semibold text-foreground/70">{b.label}</span>{" · "}</>}
                            {b.text}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA — bottom-left inside Privado region */}
          <div className="relative z-20 pl-8 pb-5">
            <Reveal delay={0.3}>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 text-xs text-foreground/35 hover:text-primary transition-colors duration-200"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {t("home.kpi.cta")}
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ══ TABLET ══════════════════════════════════════════════ */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
          <div className="border-2 border-dashed border-foreground/20 rounded-2xl p-6 space-y-4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-primary">Capital Privado</p>
            {CARDS.slice(0, 3).map((card, i) => (
              <div key={i} className="border border-border/40 rounded-xl p-4 flex flex-col gap-3">
                <card.icon className="w-5 h-5 text-primary" strokeWidth={1.4} />
                <p className="font-semibold text-sm text-foreground">{card.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
              </div>
            ))}
          </div>
          <div className="border-2 border-dashed border-foreground/20 rounded-2xl p-6 space-y-4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-primary">Mercados Públicos</p>
            {CARDS.slice(3).map((card, i) => (
              <div key={i} className="border border-border/40 rounded-xl p-4 flex flex-col gap-3">
                <card.icon className="w-5 h-5 text-primary" strokeWidth={1.4} />
                <p className="font-semibold text-sm text-foreground">{card.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ MOBILE ══════════════════════════════════════════════ */}
        <div className="md:hidden space-y-3">
          <div className="border-2 border-dashed border-foreground/20 rounded-2xl p-5 space-y-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-primary">Capital Privado</p>
            {CARDS.slice(0, 3).map((card, i) => (
              <div key={i} className="border border-border/40 rounded-xl p-4 flex flex-col gap-2">
                <card.icon className="w-5 h-5 text-primary" strokeWidth={1.4} />
                <p className="font-semibold text-sm text-foreground">{card.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
              </div>
            ))}
          </div>
          <div className="border-2 border-dashed border-foreground/20 rounded-2xl p-5 space-y-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-primary">Mercados Públicos</p>
            {CARDS.slice(3).map((card, i) => (
              <div key={i} className="border border-border/40 rounded-xl p-4 flex flex-col gap-2">
                <card.icon className="w-5 h-5 text-primary" strokeWidth={1.4} />
                <p className="font-semibold text-sm text-foreground">{card.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-start pt-1">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-xs text-foreground/35 hover:text-primary transition-colors duration-200"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              {t("home.kpi.cta")}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
