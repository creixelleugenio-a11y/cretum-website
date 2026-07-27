import manhattanImage from "@/assets/mvp-manhattan.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const kpiKeys = [
  { labelKey: "mvp.kpi1.label", subKey: "mvp.kpi1.sub" },
  { labelKey: "mvp.kpi2.label", subKey: "mvp.kpi2.sub" },
  { labelKey: "mvp.kpi3.label", subKey: "mvp.kpi3.sub" },
  { labelKey: "mvp.kpi4.label", subKey: "mvp.kpi4.sub" },
  { labelKey: "mvp.kpi5.label", subKey: "mvp.kpi5.sub" },
  { labelKey: "mvp.kpi6.label", subKey: "mvp.kpi6.sub" },
];

export function MVPHero() {
  const { t } = useLanguage();
  const kpiValues = ["$2.6B", "70+", "~2.2x", t("mvp.kpi4.value"), "$2.7B", "1,100+"];

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-48 pb-12 sm:pb-20 md:pb-28">

      {/* Photo background */}
      <div
        className="absolute inset-0 bg-cover bg-bottom scale-110"
        style={{ backgroundImage: `url(${manhattanImage})` }}
      />

      {/* Gradient overlay: left-heavy so text reads clearly, image bleeds right */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      {/* Bottom fade — covers KPI area so text is readable while image shows through */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-background/75 to-background" />

      {/* Top-right signature */}
      <div className="absolute top-36 md:top-44 right-8 md:right-12 z-10 text-right hidden md:block animate-fade-in">
        <p className="text-[10px] uppercase tracking-[0.32em] text-foreground/55 leading-tight">
          {t("mvp.hero.signature.line1")}
        </p>
        <p className="text-[10px] uppercase tracking-[0.32em] text-primary/80 mt-1.5 leading-tight">
          {t("mvp.hero.signature.line2")}
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase mb-5 font-semibold animate-fade-in">
          {t("mvp.subtitle")}
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight mb-6 max-w-2xl animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          {t("mvp.title")}
        </h1>
        <p
          className="text-base text-muted-foreground leading-relaxed max-w-lg mb-12 animate-fade-in"
          style={{ animationDelay: "0.25s", animationFillMode: "both" }}
        >
          {t("mvp.desc")}
        </p>

        {/* KPI grid — 6 stats, mismo estilo que la sección de abajo */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          {kpiKeys.map((k, i) => (
            <div key={k.labelKey} className="border-l-2 border-primary pl-5 py-3">
              <p className="text-xl sm:text-2xl md:text-[30px] font-bold text-primary leading-none">{kpiValues[i]}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mt-3 leading-snug">{t(k.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
