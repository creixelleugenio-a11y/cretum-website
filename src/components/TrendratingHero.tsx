import trSunsetImage from "@/assets/tr-hero.avif";
import { useLanguage } from "@/contexts/LanguageContext";

const kpiValues = ["17,000+", "300+", "8", "25 años", "350+", "6–18m"];
const kpiKeys = [
  { labelKey: "tr.kpi1.label" },
  { labelKey: "tr.kpi2.label" },
  { labelKey: "tr.kpi3.label" },
  { labelKey: "tr.kpi4.label" },
  { labelKey: "tr.kpi5.label" },
  { labelKey: "tr.kpi6.label" },
];

export function TrendratingHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden min-h-screen pt-48 pb-28">

      {/* Photo background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${trSunsetImage})` }}
      />

      {/* Gradient overlay: left-heavy so text reads clearly, image bleeds right */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      {/* Bottom fade — covers KPI area while keeping image visible */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-background/75 to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase mb-8 font-semibold animate-fade-in">
          {t("tr.subtitle")}
        </p>
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight mb-10 max-w-2xl animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          {t("tr.title")}
        </h1>
        <p
          className="text-base text-muted-foreground leading-relaxed max-w-lg mb-20 animate-fade-in"
          style={{ animationDelay: "0.25s", animationFillMode: "both" }}
        >
          {t("tr.desc")}
        </p>

        {/* KPI grid */}
        <div
          className="grid grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          {kpiKeys.map((k, i) => (
            <div key={k.labelKey} className="border-l-2 border-primary pl-5 py-3">
              <p className="text-[30px] font-bold text-primary leading-none">{kpiValues[i]}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mt-3 leading-snug">{t(k.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
