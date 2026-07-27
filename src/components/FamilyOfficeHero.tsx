import foImage from "@/assets/fo-thun.avif";
import { useLanguage } from "@/contexts/LanguageContext";

export function FamilyOfficeHero() {
  const { t } = useLanguage();

  const marks = [
    { l: "fo.hero.mark1.label", b: "fo.hero.mark1.body" },
    { l: "fo.hero.mark2.label", b: "fo.hero.mark2.body" },
    { l: "fo.hero.mark3.label", b: "fo.hero.mark3.body" },
  ];

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-40 md:pt-56 pb-12 sm:pb-24 md:pb-36">
      {/* Photo background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${foImage})` }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-background/75 to-background" />

      {/* Top-right signature */}
      <div className="absolute top-36 md:top-44 right-8 md:right-12 z-10 text-right hidden md:block animate-fade-in">
        <p className="text-[10px] uppercase tracking-[0.32em] text-foreground/55 leading-tight">
          {t("fo.hero.signature.line1")}
        </p>
        <p className="text-[10px] uppercase tracking-[0.32em] text-primary/80 mt-1.5 leading-tight">
          {t("fo.hero.signature.line2")}
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase mb-10 font-semibold animate-fade-in">
          {t("fo.subtitle")}
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight mb-12 max-w-2xl animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          {t("fo.title")}
        </h1>
        <p
          className="text-base text-muted-foreground leading-relaxed max-w-lg mb-24 animate-fade-in"
          style={{ animationDelay: "0.25s", animationFillMode: "both" }}
        >
          {t("fo.hero.desc")}
        </p>

        {/* Editorial markers — same position as KPI bar in MVP/WM */}
        <div
          className="border-t border-foreground/15 pt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          {marks.map((m, i) => (
            <div
              key={i}
              className={`${i > 0 ? "md:pl-8 md:border-l md:border-foreground/10" : ""}`}
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-primary/70 mb-2">
                {t(m.l)}
              </p>
              <p className="text-sm font-serif text-foreground leading-snug">
                {t(m.b)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
