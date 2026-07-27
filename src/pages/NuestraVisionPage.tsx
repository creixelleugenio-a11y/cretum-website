import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { VisionArchitecture } from "@/components/VisionArchitecture";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NuestraVisionPage() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 sm:pt-32 md:pt-56 pb-16 md:pb-40 bg-background">
        {/* ══ Header ══════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
              {t("vision.kicker")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              {t("vision.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              {t("vision.subtitle")}
            </p>
          </Reveal>
        </div>

        {/* ══ Convergence Diagram ════════════════════════════════ */}
        <div className="max-w-[70rem] mx-auto px-4 md:px-8 mt-14 md:mt-16">
          <VisionArchitecture />
        </div>

        {/* ══ Manifiesto — two-act editorial ═════════════════════ */}
        <div className="max-w-4xl mx-auto px-8 mt-14 md:mt-16">
          <Reveal>
            {/* Kicker */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-10 bg-primary/40" />
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-primary">
                {t("vision.manifesto")}
              </p>
              <div className="h-px w-10 bg-primary/40" />
            </div>
          </Reveal>

          {/* ── Acto I — Visión ─────────────────────────────────── */}
          <Reveal delay={0.05}>
            <div className="grid md:grid-cols-[7rem_1fr] gap-6 md:gap-10 items-start">
              <div className="flex md:flex-col items-baseline md:items-end gap-3 md:gap-2 md:text-right md:pt-1">
                <span className="font-serif italic text-6xl md:text-7xl text-primary/25 leading-none">
                  I
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                  {t("vision.act1.label")}
                </p>
              </div>
              <div>
                <p className="font-serif text-xl md:text-[1.7rem] text-foreground leading-snug mb-4">
                  {t("vision.act1.pre")}
                  <span className="text-primary">{t("vision.act1.bold")}</span>
                  {t("vision.act1.post")}
                </p>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {t("vision.act1.sub")}
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Ornamental divider ──────────────────────────────── */}
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center gap-3 my-12 md:my-14">
              <div className="h-px flex-1 max-w-[160px] bg-gradient-to-r from-transparent to-primary/25" />
              <svg
                className="w-3 h-3 text-primary/50"
                viewBox="0 0 12 12"
                fill="currentColor"
                aria-hidden
              >
                <path d="M6 0 L12 6 L6 12 L0 6 Z" />
              </svg>
              <div className="h-px flex-1 max-w-[160px] bg-gradient-to-l from-transparent to-primary/25" />
            </div>
          </Reveal>

          {/* ── Acto II — Promesa ───────────────────────────────── */}
          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-[7rem_1fr] gap-6 md:gap-10 items-start">
              <div className="flex md:flex-col items-baseline md:items-end gap-3 md:gap-2 md:text-right md:pt-1">
                <span className="font-serif italic text-6xl md:text-7xl text-primary/25 leading-none">
                  II
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                  {t("vision.act2.label")}
                </p>
              </div>
              <div>
                <p className="font-serif text-xl md:text-[1.7rem] text-foreground leading-snug mb-4">
                  <span className="text-primary">{t("vision.act2.bold")}</span>
                  {t("vision.act2.post")}
                </p>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {t("vision.act2.sub")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
