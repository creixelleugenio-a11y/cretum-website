import { useState } from "react";
import { FamilyOfficeHero } from "@/components/FamilyOfficeHero";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Plus, Minus } from "lucide-react";
import boardroomImg from "@/assets/fo-mandato.jpg";

const ROW_1 = ["s1", "s2", "s3"] as const;
const ROW_2 = ["s4", "s5", "s6"] as const;
const DISCIPLINES = [...ROW_1, ...ROW_2] as const;
type Disc = typeof DISCIPLINES[number];

// Alternating tile tones (Bessemer-inspired textured palette)
const TILE_TONES: Record<Disc, string> = {
  s1: "bg-primary/[0.06]",
  s2: "bg-muted/50",
  s3: "bg-primary/[0.09]",
  s4: "bg-muted/40",
  s5: "bg-primary/[0.07]",
  s6: "bg-muted/55",
};

export default function FamilyOfficePage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<Disc | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <FamilyOfficeHero />

        {/* ── Mandato (editorial — texto izq, imagen der) ─────────── */}
        <section className="py-28 md:py-36 bg-background">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center">
              {/* Left: editorial text */}
              <div className="md:col-span-7 lg:col-span-7">
                <Reveal>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-primary mb-10">
                    {t("fo.intro.label")}
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-2xl md:text-[26px] lg:text-[28px] font-serif text-foreground leading-[1.5] mb-8">
                    {t("fo.intro.body")}
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-base md:text-lg font-serif text-muted-foreground leading-[1.7]">
                    {t("fo.intro.body2")}
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      {t("fo.intro.audiences")}
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right: image */}
              <div className="md:col-span-5 lg:col-span-5">
                <Reveal delay={0.15}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={boardroomImg}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Las seis disciplinas (Bessemer-style tiles) ─────────── */}
        <section className="py-24 md:py-32 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-8">
            {/* Header */}
            <Reveal>
              <div className="max-w-3xl mb-16">
                <p className="text-[11px] uppercase tracking-[0.28em] text-primary mb-6">
                  {t("fo.disciplines.label")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif italic text-primary leading-[1.15]">
                  {t("fo.disciplines.title")}
                </h2>
              </div>
            </Reveal>

            {/* Helpers */}
            {(() => null)()}

            {/* Row 1 */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ROW_1.map((id) => (
                  <Tile
                    key={id}
                    id={id}
                    active={active === id}
                    onClick={() => setActive(active === id ? null : id)}
                    t={t}
                  />
                ))}
              </div>
            </Reveal>

            {/* Detail panel — between rows when row 1 is active */}
            <DetailPanel
              activeId={active && ROW_1.includes(active as typeof ROW_1[number]) ? active : null}
              t={t}
              position="between"
            />

            {/* Row 2 */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {ROW_2.map((id) => (
                  <Tile
                    key={id}
                    id={id}
                    active={active === id}
                    onClick={() => setActive(active === id ? null : id)}
                    t={t}
                  />
                ))}
              </div>
            </Reveal>

            {/* Detail panel — below when row 2 is active */}
            <DetailPanel
              activeId={active && ROW_2.includes(active as typeof ROW_2[number]) ? active : null}
              t={t}
              position="below"
            />

            {/* Hint */}
            {!active && (
              <Reveal delay={0.2}>
                <p className="text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground mt-12">
                  {t("fo.disciplines.hint")}
                </p>
              </Reveal>
            )}
          </div>
        </section>

        {/* ── Cierre — Fiduciary Standard (editorial) ─────────────── */}
        <section className="py-32 md:py-40 bg-background border-t border-border">
          <div className="max-w-3xl mx-auto px-8 text-center">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.32em] text-primary mb-10">
                {t("fo.close.label")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-2xl md:text-[32px] font-serif text-foreground leading-[1.45]">
                {t("fo.close.quote")}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-14 mx-auto w-12 h-px bg-primary/40" />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ── Tile ─────────────────────────────────────────────────────── */
function Tile({
  id,
  active,
  onClick,
  t,
}: {
  id: Disc;
  active: boolean;
  onClick: () => void;
  t: (k: string) => string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative ${TILE_TONES[id]} aspect-[5/4] flex flex-col items-center justify-center p-8 transition-all duration-300 hover:brightness-95 ${
        active ? "ring-1 ring-primary brightness-95" : ""
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.28em] text-primary/60 mb-4">
        {t(`fo.${id}.roman`)} &nbsp;·&nbsp; {t(`fo.${id}.short`)}
      </p>
      <h3 className="text-xl md:text-2xl font-serif text-foreground text-center leading-[1.25] max-w-[18ch] mb-6">
        {t(`fo.${id}.title`)}
      </h3>
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary/30 text-primary/70 transition-colors group-hover:border-primary group-hover:text-primary">
        {active ? <Minus className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
      </span>
    </button>
  );
}

/* ── Detail panel ─────────────────────────────────────────────── */
function DetailPanel({
  activeId,
  t,
  position,
}: {
  activeId: string | null;
  t: (k: string) => string;
  position: "between" | "below";
}) {
  const open = activeId !== null;
  const marginClass = position === "between" ? "my-4" : "mt-4";
  return (
    <div
      className={`overflow-hidden transition-all duration-500 ${
        open ? `max-h-[1200px] opacity-100 ${marginClass}` : "max-h-0 opacity-0"
      }`}
      style={{ transitionProperty: "max-height, opacity, margin" }}
    >
      {activeId && (
        <article className="bg-muted/20 border border-border rounded-sm px-8 md:px-12 py-12">
          <div className="grid grid-cols-12 gap-8 md:gap-12 max-w-5xl">
            <div className="col-span-12 md:col-span-3">
              <p className="text-7xl md:text-8xl font-serif text-primary/25 leading-none mb-3">
                {t(`fo.${activeId}.roman`)}
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {t(`fo.${activeId}.short`)}
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="text-[10px] uppercase tracking-[0.28em] text-primary mb-3">
                {t(`fo.${activeId}.sub`)}
              </p>
              <h3 className="text-2xl md:text-[34px] font-serif text-foreground leading-[1.2] mb-10">
                {t(`fo.${activeId}.title`)}
              </h3>

              <div className="space-y-7">
                <div>
                  <p className="text-[15px] font-semibold text-foreground mb-2">
                    {t(`fo.${activeId}.b1.title`)}
                  </p>
                  <p className="text-[15px] md:text-base text-muted-foreground leading-[1.75] font-serif">
                    {t(`fo.${activeId}.b1.desc`)}
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-foreground mb-2">
                    {t(`fo.${activeId}.b2.title`)}
                  </p>
                  <p className="text-[15px] md:text-base text-muted-foreground leading-[1.75] font-serif">
                    {t(`fo.${activeId}.b2.desc`)}
                  </p>
                </div>
              </div>

              {activeId === "s5" && (
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-base md:text-lg font-serif text-foreground leading-relaxed tracking-wide">
                    {t("fo.s5.roster")}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground italic">
                    {t("fo.s5.roster.note")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
