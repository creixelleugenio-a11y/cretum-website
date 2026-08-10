import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { pillarChips } from "@/lib/gvvData";

type Pillar = "growth" | "value" | "volatility";

interface PillarItem { title: string; desc: string; }
interface PillarData {
  id: Pillar;
  pillarLabel: string;
  name: string;
  oneliner: string;
  intro: string;
  items: PillarItem[];
  chipsLabel: string;
  chips: { name: string; sector: string; logo?: string }[];
}

const DATA: Record<"es" | "en", PillarData[]> = {
  es: [
    {
      id: "growth",
      pillarLabel: "Pilar 1",
      name: "Growth",
      oneliner: "Late-stage secondaries & pre-IPO",
      intro: "Identificamos compañías tecnológicas que están redefiniendo su industria y accedemos a ellas antes de su salida a bolsa, aprovechando la asimetría de información del mercado privado.",
      items: [
        { title: "Anticipación",           desc: "Oportunidades hasta 3 años antes de un IPO o adquisición." },
        { title: "Acceso privado",          desc: "Métricas que el mercado público aún no puede ver." },
        { title: "Solo líderes",            desc: "Empresas que no participan en su sector — lo definen." },
        { title: "Gestión activa post-IPO", desc: "Seguimiento continuo y gestión con derivados." },
      ],
      chipsLabel: "Algunas de nuestras posiciones",
      chips: [
        { name: "Spotify",   sector: "Streaming",   logo: "/logos/mvp/spotify.svg"   },
        { name: "Airbnb",    sector: "Hospitality", logo: "/logos/mvp/airbnb.svg"    },
        { name: "Palantir",  sector: "Data & AI",   logo: "/logos/mvp/palantir.svg"  },
        { name: "Coinbase",  sector: "Crypto",      logo: "/logos/mvp/coinbase.svg"  },
        { name: "SpaceX",    sector: "Aerospace",   logo: "/logos/mvp/spacex.svg"    },
        { name: "Anthropic", sector: "AI",          logo: "/logos/mvp/anthropic.svg" },
        { name: "Groq",      sector: "AI chips",    logo: "/logos/mvp/groq.png"      },
      ],
    },
    {
      id: "value",
      pillarLabel: "Pilar 2",
      name: "Value",
      oneliner: "Margin of safety en mercados globales",
      intro: "Identificamos compañías cuyo precio de mercado no refleja su valor real. Buscamos negocios sólidos con fundamentos comprobados y ventajas competitivas duraderas que el mercado está subvalorando.",
      items: [
        { title: "Margen de seguridad",       desc: "Precio significativamente por debajo de nuestro estimado de valor intrínseco." },
        { title: "Fundamentos, no narrativas", desc: "Flujos de caja, múltiplos y posición competitiva." },
        { title: "Diversificación global",    desc: "Oportunidades de México a Europa y Asia." },
        { title: "Visión de largo plazo",     desc: "Paciencia hasta que el mercado reconoce el valor." },
      ],
      chipsLabel: "Algunas de nuestras posiciones",
      chips: [
        { name: "BT Group",        sector: "Telecom · UK"     },
        { name: "Intesa Sanpaolo", sector: "Banca · Italia"   },
        { name: "Samsung",         sector: "Tech · Corea"     },
        { name: "MédicaSur",       sector: "Salud · México"   },
        { name: "Harley-Davidson", sector: "Consumer · USA"   },
        { name: "Nemak",           sector: "Industrial · MX"  },
      ],
    },
    {
      id: "volatility",
      pillarLabel: "Pilar 3",
      name: "Volatility",
      oneliner: "Delta hedging & generación de alfa",
      intro: "Gestionamos activamente la volatilidad mediante coberturas dinámicas y estrategias con opciones. No evitamos la volatilidad — la convertimos en protección y generación de alfa.",
      items: [
        { title: "Cobertura delta-neutral", desc: "Eliminamos exposición direccional, mantenemos exposición a volatilidad." },
        { title: "Modelo propietario",      desc: "Framework basado en Black-Scholes adaptado." },
        { title: "Estrategias con opciones",desc: "Calls, covered calls y puts protectivos." },
        { title: "Monitoreo de Greeks",     desc: "Delta, gamma, theta y vega en tiempo real." },
      ],
      chipsLabel: "Instrumentos que utilizamos",
      chips: [
        { name: "UVXY",            sector: "Índice de vol."  },
        { name: "Calls",           sector: "Posición"        },
        { name: "Covered calls",   sector: "Utilidades"      },
        { name: "Protective puts", sector: "Cobertura"       },
        { name: "Greeks",          sector: "Sensibilidades"  },
      ],
    },
  ],
  en: [
    {
      id: "growth",
      pillarLabel: "Pillar 1",
      name: "Growth",
      oneliner: "Late-stage secondaries & pre-IPO",
      intro: "We identify technology companies redefining their industry and access them before their public offering, leveraging private market information asymmetry.",
      items: [
        { title: "Anticipation",             desc: "Opportunities up to 3 years before an IPO or acquisition." },
        { title: "Private access",           desc: "Metrics the public market cannot yet see." },
        { title: "Leaders only",             desc: "Companies that don't participate in their sector — they define it." },
        { title: "Active post-IPO management",desc: "Continuous monitoring and management with derivatives." },
      ],
      chipsLabel: "Some of our positions",
      chips: [
        { name: "Spotify",   sector: "Streaming",   logo: "/logos/mvp/spotify.svg"   },
        { name: "Airbnb",    sector: "Hospitality", logo: "/logos/mvp/airbnb.svg"    },
        { name: "Palantir",  sector: "Data & AI",   logo: "/logos/mvp/palantir.svg"  },
        { name: "Coinbase",  sector: "Crypto",      logo: "/logos/mvp/coinbase.svg"  },
        { name: "SpaceX",    sector: "Aerospace",   logo: "/logos/mvp/spacex.svg"    },
        { name: "Anthropic", sector: "AI",          logo: "/logos/mvp/anthropic.svg" },
        { name: "Groq",      sector: "AI chips",    logo: "/logos/mvp/groq.png"      },
      ],
    },
    {
      id: "value",
      pillarLabel: "Pillar 2",
      name: "Value",
      oneliner: "Margin of safety across global markets",
      intro: "We identify companies whose market price does not reflect their real value. We seek solid businesses with proven fundamentals and lasting competitive advantages the market is undervaluing.",
      items: [
        { title: "Margin of safety",       desc: "Price significantly below our intrinsic value estimate." },
        { title: "Fundamentals, not narratives", desc: "Cash flows, multiples and competitive position." },
        { title: "Global diversification", desc: "Opportunities from Mexico to Europe and Asia." },
        { title: "Long-term vision",       desc: "Patience until the market recognizes the value." },
      ],
      chipsLabel: "Some of our positions",
      chips: [
        { name: "BT Group",        sector: "Telecom · UK"       },
        { name: "Intesa Sanpaolo", sector: "Banking · Italy"    },
        { name: "Samsung",         sector: "Technology · Korea" },
        { name: "MédicaSur",       sector: "Healthcare · Mexico"},
        { name: "Harley-Davidson", sector: "Consumer · USA"     },
        { name: "Nemak",           sector: "Industrial · Mexico"},
      ],
    },
    {
      id: "volatility",
      pillarLabel: "Pillar 3",
      name: "Volatility",
      oneliner: "Delta hedging & alpha generation",
      intro: "We actively manage volatility through dynamic hedging and options strategies. We don't avoid volatility — we turn it into protection and alpha generation.",
      items: [
        { title: "Delta-neutral hedging", desc: "We eliminate directional exposure, maintain volatility exposure." },
        { title: "Proprietary model",     desc: "Framework based on adapted Black-Scholes." },
        { title: "Options strategies",    desc: "Calls, covered calls and protective puts." },
        { title: "Greeks monitoring",     desc: "Delta, gamma, theta and vega in real time." },
      ],
      chipsLabel: "Instruments we use",
      chips: [
        { name: "UVXY",            sector: "Vol. index"   },
        { name: "Calls",           sector: "Position"     },
        { name: "Covered calls",   sector: "Profit"       },
        { name: "Protective puts", sector: "Hedging"      },
        { name: "Greeks",          sector: "Sensitivities"},
      ],
    },
  ],
};

export function GVVEngine() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<Pillar | null>(null);
  const pillars = DATA[lang as "es" | "en"].map((p) => {
    if (!pillarChips) return p;
    const chips = pillarChips[p.id] ?? p.chips;
    const chipsLabel = p.id === "volatility"
      ? (lang === "es" ? pillarChips.volatilityLabelEs : pillarChips.volatilityLabelEn) ?? p.chipsLabel
      : p.chipsLabel;
    return { ...p, chips, chipsLabel };
  });
  const activePillar = pillars.find((p) => p.id === active) ?? null;

  const handleClick = (id: Pillar) => setActive(active === id ? null : id);

  return (
    <div className="mt-20">
      {/* Nucleus */}
      <div className="flex justify-center">
        <div className="border border-primary rounded-xl px-8 py-4 text-center">
          <p className="text-xl font-serif font-semibold text-primary">GVV Fund</p>
          <p className="text-xs text-muted-foreground mt-1">Growth · Value · Volatility</p>
        </div>
      </div>

      {/* Connector lines — org chart */}
      <div className="relative h-8">
        {/* Vertical drop from GVV Fund */}
        <div className="absolute left-1/2 top-0 w-px h-4 bg-border -translate-x-px" />
        {/* Horizontal bar connecting all three */}
        <div className="absolute top-4 h-px bg-border" style={{ left: "calc(100% / 6)", right: "calc(100% / 6)" }} />
        {/* Vertical drop to Growth */}
        <div className="absolute top-4 w-px h-4 bg-border" style={{ left: "calc(100% / 6)", transform: "translateX(-50%)" }} />
        {/* Vertical drop to Value */}
        <div className="absolute left-1/2 top-4 w-px h-4 bg-border -translate-x-px" />
        {/* Vertical drop to Volatility */}
        <div className="absolute top-4 w-px h-4 bg-border" style={{ right: "calc(100% / 6)", transform: "translateX(50%)" }} />
      </div>

      {/* Pillar cards */}
      <div className="grid grid-cols-3 gap-3">
        {pillars.map((p, i) => {
          const isActive = active === p.id;
          const isDimmed = active !== null && !isActive;
          return (
            <Reveal key={p.id} delay={i * 0.12} className="reveal-scale">
            <div
              onClick={() => handleClick(p.id)}
              className={`border rounded-xl p-5 text-center cursor-pointer transition-all duration-300 ${
                isActive ? "border-primary border-[1.5px]" : "border-border hover:border-muted-foreground/30 hover:-translate-y-px"
              } ${isDimmed ? "opacity-35" : ""}`}
            >
              <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">{p.pillarLabel}</p>
              <p className="text-xl font-serif font-semibold text-primary mt-1">{p.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.oneliner}</p>
              <div className={`h-[2px] w-6 bg-primary mx-auto mt-2 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`} />
            </div>
            </Reveal>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          activePillar ? "max-h-[600px] opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        {activePillar && (
          <div className="border-t border-border pt-6">
            <p className="text-sm text-foreground leading-relaxed max-w-xl">{activePillar.intro}</p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-6">
              {activePillar.items.map((item) => (
                <div key={item.title} className="border-l-2 border-primary pl-3.5">
                  <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border my-4" />
            <p className="text-[10px] tracking-wide text-muted-foreground uppercase mb-3">{activePillar.chipsLabel}</p>
            <div className="flex flex-wrap gap-1.5 items-center">
              {activePillar.chips.map((c) => (
                <span key={c.name} className="inline-flex items-center px-3 py-1 rounded-full border border-border text-xs font-medium text-foreground">
                  {c.logo ? (
                    <img src={c.logo} alt={c.name} className="h-4 max-w-[80px] object-contain" />
                  ) : (
                    <span>{c.name}</span>
                  )}
                  <span className="text-[10px] text-muted-foreground ml-2">{c.sector}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
