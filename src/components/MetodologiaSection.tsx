import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const partners: { name: string; logo: string }[] = [
  { name: "BNY Mellon",        logo: "/logos/bny-mellon.png"         },
  { name: "NAV Consulting",    logo: "/logos/nav-consulting-alt.svg" },
  { name: "Deloitte",          logo: "/logos/deloitte.png"           },
  { name: "Bloomberg",         logo: "/logos/bloomberg.png"          },
  { name: "Goldman Sachs",     logo: "/logos/goldman-sachs.png"      },
  { name: "UBS",               logo: "/logos/ubs.jpg"                },
  { name: "Morgan Stanley",    logo: "/logos/morgan-stanley.png"     },
  { name: "Capital Economics", logo: "/logos/capital-economics.png"  },
  { name: "RGA Consulting",    logo: "/logos/rga-consulting.png"     },
  { name: "Trendrating",       logo: "/logos/trendrating.png"        },
];

const ejecucionKeys = ["precio", "modelacion", "ejecucion", "control"] as const;
const monitoreoKeys = ["emisoras", "parametros", "medidas_riesgo", "duracion", "performance"] as const;

export function MetodologiaSection() {
  const { t } = useLanguage();

  return (
    <section id="metodologia" className="snap-start min-h-screen bg-foreground text-white flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
              {t("met.label")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
              {t("met.title")}
            </h2>
          </Reveal>
        </div>

        {/* Two-column methodology */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* Ejecución */}
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
                {t("met.ejecucion.label")}
              </p>
            </Reveal>
            <div className="space-y-3">
              {ejecucionKeys.map((k, i) => (
                <Reveal key={k} delay={i * 0.07}>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-sm leading-relaxed text-white/75">
                      <span className="font-bold text-white">{t(`met.exec.${k}.title`)}.- </span>
                      {t(`met.exec.${k}.desc`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Monitoreo */}
          <div>
            <Reveal delay={0.05}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
                {t("met.monitoreo.label")}
              </p>
            </Reveal>
            <div className="space-y-3">
              {monitoreoKeys.map((k, i) => (
                <Reveal key={k} delay={0.05 + i * 0.07}>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-sm leading-relaxed text-white/75">
                      <span className="font-bold text-white">{t(`met.mon.${k}.title`)}.- </span>
                      {t(`met.mon.${k}.desc`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Partners marquee */}
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
              {t("met.partners.title")}
            </p>
          </Reveal>
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee items-center">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="shrink-0 h-11 w-36 rounded-lg border border-white/15 bg-white flex items-center justify-center px-3 hover:border-white/40 transition-all duration-200"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="object-contain"
                    style={{ maxHeight: "28px", maxWidth: "110px", mixBlendMode: "multiply" }}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.parentElement)
                        img.parentElement.innerHTML = `<span style="font-size:11px;font-weight:600;color:#64748b">${p.name}</span>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
