import wmNightImage from "@/assets/fo-study.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function WMHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden min-h-screen pt-28 sm:pt-36 md:pt-48 pb-12 sm:pb-20 md:pb-28">

      {/* Photo background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${wmNightImage})` }}
      />

      {/* Gradient overlay: left-heavy so text reads clearly, image bleeds right */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      {/* Bottom fade — covers lower area while keeping image visible */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-background/75 to-background" />

      {/* Top-right signature */}
      <div className="absolute top-36 md:top-44 right-8 md:right-12 z-10 text-right hidden md:block animate-fade-in">
        <p className="text-[10px] uppercase tracking-[0.32em] text-foreground/55 leading-tight">
          {t("wm.hero.signature.line1")}
        </p>
        <p className="text-[10px] uppercase tracking-[0.32em] text-primary/80 mt-1.5 leading-tight">
          {t("wm.hero.signature.line2")}
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase mb-8 font-semibold animate-fade-in">
          {t("wm.subtitle")}
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight mb-10 max-w-2xl animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          {t("wm.title")}
        </h1>
        <p
          className="text-base text-muted-foreground leading-relaxed max-w-lg mb-20 animate-fade-in"
          style={{ animationDelay: "0.25s", animationFillMode: "both" }}
        >
          {t("wm.desc1")}
        </p>

        {/* KPI grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          {[
            { val: "5.83%",  label: t("wm.kpi1.label") },
            { val: "+2.76%", label: t("wm.kpi2.label") },
            { val: "4/4",    label: t("wm.kpi4.label") },
          ].map((s) => (
            <div key={s.val} className="border-l-2 border-primary pl-5 py-3">
              <p className="text-xl sm:text-2xl md:text-[30px] font-bold text-primary leading-none">{s.val}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mt-3 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
