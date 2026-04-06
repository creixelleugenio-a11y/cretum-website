import { useState, lazy, Suspense } from "react";
import { Reveal } from "@/components/Reveal";
import skyscrapersImg from "@/assets/trading-screens.jpg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface Partner {
  name: string;
  logo: string;
  roleKey: string;
  descKey: string;
}

const partnerDefs: Partner[] = [
  { name: "BNY Mellon",        logo: "/logos/bny-mellon.png",          roleKey: "partner.bny.role",       descKey: "partner.bny.desc"       },
  { name: "NAV Consulting",    logo: "/logos/nav-consulting-alt.svg",  roleKey: "partner.nav.role",       descKey: "partner.nav.desc"       },
  { name: "Deloitte",          logo: "/logos/deloitte.png",            roleKey: "partner.deloitte.role",  descKey: "partner.deloitte.desc"  },
  { name: "Bloomberg",         logo: "/logos/bloomberg.png",           roleKey: "partner.bloomberg.role", descKey: "partner.bloomberg.desc" },
  { name: "Goldman Sachs",     logo: "/logos/goldman-sachs.png",       roleKey: "partner.gs.role",        descKey: "partner.gs.desc"        },
  { name: "UBS",               logo: "/logos/ubs.png",                 roleKey: "partner.ubs.role",       descKey: "partner.ubs.desc"       },
  { name: "Morgan Stanley",    logo: "/logos/morgan-stanley.svg",      roleKey: "partner.ms.role",        descKey: "partner.ms.desc"        },
  { name: "Capital Economics", logo: "/logos/capital-economics.png",   roleKey: "partner.ce.role",        descKey: "partner.ce.desc"        },
  { name: "RGA Consulting",    logo: "/logos/rga-consulting.png",      roleKey: "partner.rga.role",       descKey: "partner.rga.desc"       },
  { name: "Trendrating",       logo: "/logos/trendrating.png",         roleKey: "partner.tr.role",        descKey: "partner.tr.desc"        },
];

const GVVModal = lazy(() => import("@/components/GVVModal").then(m => ({ default: m.GVVModal })));
const MVPModal = lazy(() => import("@/components/MVPModal").then(m => ({ default: m.MVPModal })));
const TrendratingModal = lazy(() => import("@/components/TrendratingModal").then(m => ({ default: m.TrendratingModal })));
const WealthManagementModal = lazy(() => import("@/components/WealthManagementModal").then(m => ({ default: m.WealthManagementModal })));


interface SelectedPartner { name: string; logo: string; role: string; desc: string; }

export function ServicesSection() {
  const [gvvOpen, setGvvOpen] = useState(false);
  const [mvpOpen, setMvpOpen] = useState(false);
  const [trOpen, setTrOpen] = useState(false);
  const [wmOpen, setWmOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<SelectedPartner | null>(null);
  const { t } = useLanguage();

  const partners = partnerDefs.map((p) => ({ ...p, role: t(p.roleKey), desc: t(p.descKey) }));

  const services = [
  { title: "GVV", subtitle: "Growth · Value · Volatility", onClick: () => setGvvOpen(true) },
  { title: "MVP Private Equity", subtitle: "", onClick: () => setMvpOpen(true) },
  { title: "Trendrating Licensing", subtitle: "", onClick: () => setTrOpen(true) },
  { title: "Wealth Management", subtitle: "", onClick: () => setWmOpen(true) }];


  return (
    <section id="servicios" className="pt-24 pb-16 bg-background relative overflow-hidden">
      <div className="hidden lg:block absolute right-0 top-0 w-[32%] h-full pointer-events-none select-none">
        <img src={skyscrapersImg} alt="" className="w-full h-full object-cover object-center grayscale opacity-15 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background" />
      </div>
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Two-column: title left, service list right */}
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start mb-12">

          {/* Left: label + title */}
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                {t("nav.servicios")}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-snug">
                <em className="text-primary not-italic font-bold">Cretum Partners</em>{" "}
                {t("services.intro")}
              </h2>
            </Reveal>
          </div>

          {/* Right: service list */}
          <div className="flex flex-col gap-2">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.12}>
                <button
                  onClick={service.onClick}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className="text-sm text-muted-foreground mt-0.5">{service.subtitle}</p>
                    )}
                  </div>
                  <span className="ml-6 shrink-0 w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary text-lg font-light group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">+</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Partners marquee */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            {t("met.partners.title")}
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee-fast w-max items-center">
              {[...partners, ...partners].map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedPartner(partners.find(x => x.name === p.name) ?? null); }}
                  className="shrink-0 h-14 w-40 rounded-xl flex items-center justify-center px-4 shadow-sm hover:shadow-md hover:scale-[1.04] transition-all duration-200"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="object-contain"
                    style={{ maxHeight: "32px", maxWidth: "112px" }}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      if (img.parentElement)
                        img.parentElement.innerHTML = `<span style="font-size:12px;font-weight:600;color:#64748b">${p.name}</span>`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <GVVModal open={gvvOpen} onOpenChange={setGvvOpen} />
        <MVPModal open={mvpOpen} onOpenChange={setMvpOpen} />
        <TrendratingModal open={trOpen} onOpenChange={setTrOpen} />
        <WealthManagementModal open={wmOpen} onOpenChange={setWmOpen} />
      </Suspense>

      <Dialog open={!!selectedPartner} onOpenChange={(v) => !v && setSelectedPartner(null)}>
        <DialogContent className="max-w-sm w-[calc(100vw-2rem)]">
          {selectedPartner && (
            <div className="pt-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-24 rounded-lg border border-border bg-white flex items-center justify-center px-3 shrink-0">
                  <img src={selectedPartner.logo} alt={selectedPartner.name} className="object-contain" style={{ maxHeight: "28px", maxWidth: "80px" }} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base leading-tight">{selectedPartner.name}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">{selectedPartner.role}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedPartner.desc}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>);

}
