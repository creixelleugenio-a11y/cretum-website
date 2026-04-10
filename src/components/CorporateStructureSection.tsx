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
    nameMb: "mb-10",
    bullets: [
      { label: "",    text: "Invirtiendo en empresas tecnológicas de alto potencial en etapas pre-IPO, aprovechando nuestra red para identificar tendencias clave de forma anticipada" },
    ],
  },
  {
    icon: Activity,
    name: "GVV Fund",
    split: false,
    span: 2,
    subgrid: true,
    bullets: [
      { label: "Growth",     text: "Late-Stage Secondaries & Pre-IPO Investments" },
      { label: "Value",      text: "Value Investing Thesis with Margin of Safety" },
      { label: "Volatility", text: "Delta Hedging and Alpha Generation Strategies" },
    ],
  },
  {
    icon: Landmark,
    name: "Gestión Patrimonial",
    split: false,
    nameMb: "mb-10",
    bullets: [
      { label: "", text: "Construyendo portafolios estructurados a partir de análisis macro y fundamental, con ejecución disciplinada y cobertura en periodos de volatilidad." },
    ],
  },
];

/* ── Main section ─────────────────────────────────────────────── */
export function CorporateStructureSection() {
  const { t } = useLanguage();

  return (
    <section id="estructura" className="pt-16 pb-64 bg-background relative overflow-hidden">
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
            style={{ left: 0, right: "57%", top: "2.5rem", bottom: "1rem" }}
          />

          {/* Right — Público (above cards) */}
          <div
            className="absolute z-20 rounded-2xl border-2 border-dashed border-foreground/20 pointer-events-none"
            style={{ left: "30.2%", right: 0, top: 0, bottom: 0 }}
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
          <div className="relative z-10 grid gap-6 px-8 pt-8 pb-0 items-stretch" style={{ gridTemplateColumns: "3fr 2fr 2fr 3fr" }}>
            {CARDS.map((card, i) => (
              <div key={i} style={"span" in card ? { gridColumn: `span ${card.span}` } : undefined} className="h-full">
              <Reveal delay={i * 0.08} className="h-full">
                {"subgrid" in card ? (
                  /* GVV card: title centered inside, horizontal divider, 3 columns */
                  <div className="border border-border/40 rounded-xl flex flex-col h-full overflow-hidden" style={{ background: "hsl(215,60%,95%)" }}>
                    {/* Header: icon + title centered */}
                    <div className="flex items-center justify-center gap-3 px-8 pt-7 pb-5">
                      <card.icon className="w-8 h-8 text-primary shrink-0" strokeWidth={1.4} />
                      <p className="font-semibold text-[1.05rem] text-foreground leading-snug">{card.name}</p>
                    </div>
                    {/* Horizontal divider */}
                    <div className="h-px bg-foreground/15 mx-6" />
                    {/* 3 columns */}
                    <div className="grid grid-cols-3 flex-1 pt-2 pb-16">
                      {card.bullets.map((b, bi) => (
                        <div key={b.label} className="relative px-6 flex flex-col gap-9">
                          {bi > 0 && <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/15" />}
                          <span className="font-semibold text-[1rem] text-foreground/80">{b.label}</span>
                          <span className="text-[0.85rem] text-muted-foreground leading-relaxed">{b.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                <div
                  className="border border-border/40 rounded-xl px-8 pt-8 pb-16 flex flex-col h-full"
                  style={{ background: "var(--background)" }}
                >
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
                  ) : "subgrid" in card ? (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <card.icon className="w-8 h-8 text-primary shrink-0" strokeWidth={1.4} />
                        <p className="font-semibold text-[1.05rem] text-foreground leading-snug">{card.name}</p>
                      </div>
                      <div className="grid grid-cols-3 flex-1">
                        {card.bullets.map((b, bi) => (
                          <div key={b.label} className="relative px-5 flex flex-col gap-2">
                            {bi > 0 && <div className="absolute left-0 top-2 bottom-2 w-px bg-foreground/15" />}
                            <span className="font-semibold text-[1rem] text-foreground/80">{b.label}</span>
                            <span className="text-[0.85rem] text-muted-foreground leading-relaxed">{b.text}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <card.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.4} />
                      <p className={`font-semibold text-[1.05rem] text-foreground leading-snug ${"nameMb" in card ? card.nameMb : "mb-4"}`}>{card.name}</p>
                      <ul className="space-y-3">
                        {card.bullets.map((b) => (
                          <li key={b.label} className="text-[0.85rem] text-muted-foreground leading-relaxed">
                            {b.label && <><span className="font-semibold text-foreground/70">{b.label}</span>{" · "}</>}
                            {b.text}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                )}
              </Reveal>
              </div>
            ))}
          </div>

          {/* CTA — bottom-left inside Privado region */}
          <div className="relative z-20 pl-8 pt-4 pb-4">
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
