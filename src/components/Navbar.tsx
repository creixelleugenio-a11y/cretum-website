import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import cretumLogo from "@/assets/Cretum_Logo.png";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GVVModal = lazy(() => import("@/components/GVVModal").then(m => ({ default: m.GVVModal })));
const MVPModal = lazy(() => import("@/components/MVPModal").then(m => ({ default: m.MVPModal })));
const WealthManagementModal = lazy(() => import("@/components/WealthManagementModal").then(m => ({ default: m.WealthManagementModal })));

/* ── Panel data ───────────────────────────────────────────────── */
type PanelItem =
  | { labelKey: string; descKey: string; href: string }
  | { labelKey: string; descKey: string; action: string };

const PANELS: Record<string, PanelItem[]> = {
  "quienes-somos": [
    { labelKey: "nav.panel.historia.label",     descKey: "nav.panel.historia.desc",     href: "/quienes-somos/historia" },
    { labelKey: "nav.panel.equipo.label",       descKey: "nav.panel.equipo.desc",       href: "/nuestro-equipo" },
    { labelKey: "nav.panel.proveedores.label",  descKey: "nav.panel.proveedores.desc",  href: "/quienes-somos/socios" },
  ],
  "que-hacemos": [
    { labelKey: "nav.panel.gvv.label",  descKey: "nav.panel.gvv.desc",  href: "/que-hacemos/gvv" },
    { labelKey: "nav.panel.mvp.label",  descKey: "nav.panel.mvp.desc",  href: "/que-hacemos/mvp" },
    { labelKey: "nav.panel.wm.label",   descKey: "nav.panel.wm.desc",   href: "/que-hacemos/gestion-patrimonial" },
    { labelKey: "nav.panel.fo.label",   descKey: "nav.panel.fo.desc",   href: "/que-hacemos/family-office" },
  ],
  "metodologia": [
    { labelKey: "nav.panel.vision.label",   descKey: "nav.panel.vision.desc",   href: "/metodologia/vision" },
    { labelKey: "nav.panel.ventajas.label", descKey: "nav.panel.ventajas.desc", href: "/metodologia/ventajas" },
  ],
};

type PanelKey = keyof typeof PANELS;

const NAV_ITEMS: { key: string; labelKey: string; href?: string }[] = [
  { key: "quienes-somos", labelKey: "nav.quienes" },
  { key: "que-hacemos",   labelKey: "nav.quehacemos", href: "/servicios" },
  { key: "metodologia",   labelKey: "nav.metodologia" },
];

/* ── Component ────────────────────────────────────────────────── */
export function Navbar() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [gvvOpen, setGvvOpen]         = useState(false);
  const [mvpOpen, setMvpOpen]         = useState(false);
  const [wmOpen,  setWmOpen]          = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang, setLang, t } = useLanguage();

  const modalActions: Record<string, () => void> = {
    gvv: () => setGvvOpen(true),
    mvp: () => setMvpOpen(true),
    wm:  () => setWmOpen(true),
  };

  const openPanel   = (key: PanelKey) => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setActivePanel(key); };
  const scheduleClose = () => { timeoutRef.current = setTimeout(() => setActivePanel(null), 180); };
  const cancelClose   = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  const closeAll      = () => { setActivePanel(null); setMobileOpen(false); };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  /* close panel on scroll */
  useEffect(() => {
    const onScroll = () => setActivePanel(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cols = (key: PanelKey) => {
    const n = PANELS[key].length;
    if (n === 2) return "grid-cols-2";
    if (n === 3) return "grid-cols-3";
    return "grid-cols-4";
  };

  return (
    <>
      {/* ── Navbar bar ──────────────────────────────────────── */}
      <nav className="bg-card/80 backdrop-blur-md border-b border-border fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-16 md:h-24">

          {/* Logo */}
          <Link to="/" className="flex items-center mr-8 shrink-0" onClick={() => { closeAll(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img src={cretumLogo} alt="Cretum Partners" className="h-14 md:h-20 w-auto" />
          </Link>

          {/* Nav items centered */}
          <div className="hidden md:flex items-center justify-center flex-1 h-full gap-8">
            <Link
              to="/"
              className="flex items-center px-4 h-full text-base font-medium text-foreground/60 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={closeAll}
            >
              {t("nav.inicio")}
            </Link>

            {NAV_ITEMS.map((item) => {
              const navClass = `flex items-center h-full px-4 text-base font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-primary after:transition-transform after:duration-300 ${
                activePanel === item.key
                  ? "text-primary after:scale-x-100 after:origin-left"
                  : "text-foreground/60 hover:text-primary after:scale-x-0 after:origin-left hover:after:scale-x-100"
              }`;
              return (
                <div
                  key={item.key}
                  className="h-full flex items-center"
                  onMouseEnter={() => openPanel(item.key as PanelKey)}
                  onMouseLeave={scheduleClose}
                >
                  {item.href ? (
                    <Link to={item.href} className={navClass} onClick={closeAll}>
                      {t(item.labelKey)}
                    </Link>
                  ) : (
                    <button className={navClass}>
                      {t(item.labelKey)}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Contacto — plain link, no panel */}
            <a
              href="/contacto"
              className="flex items-center h-full px-4 text-base font-medium text-foreground/60 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={closeAll}
            >
              {t("nav.contacto")}
            </a>
          </div>

          {/* Language switcher */}
          <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
            <button onClick={() => setLang("en")} className={`w-9 h-9 rounded-full border border-primary text-xs font-semibold transition-all duration-200 active:scale-90 ${lang === "en" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary hover:text-primary-foreground"}`}>EN</button>
            <button onClick={() => setLang("es")} className={`w-9 h-9 rounded-full border border-primary text-xs font-semibold transition-all duration-200 active:scale-90 ${lang === "es" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary hover:text-primary-foreground"}`}>ES</button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-foreground ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mega panel ──────────────────────────────────────── */}
      <div
        className={`fixed left-0 right-0 z-40 bg-card/98 backdrop-blur-md border-b border-border shadow-xl transition-all duration-200 ${
          activePanel ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        style={{ top: "6rem" }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {activePanel && (
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className={`grid divide-x divide-border/50 ${cols(activePanel)}`}>
              {PANELS[activePanel].map((item) =>
                "href" in item ? (
                  <Link
                    key={item.labelKey}
                    to={item.href}
                    className="group flex flex-col px-8 py-5 hover:bg-primary/5 transition-colors duration-200 first:pl-2"
                    onClick={closeAll}
                  >
                    <h4 className="font-semibold text-foreground text-[1.2rem] mb-2.5 group-hover:text-primary transition-colors duration-200 leading-snug">
                      {t(item.labelKey)}
                    </h4>
                    <p className="text-[0.9rem] text-muted-foreground leading-relaxed flex-1">{t(item.descKey)}</p>
                    <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-primary border border-primary/40 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 mt-5 px-3 py-1.5 rounded-md self-start">
                      {t("nav.cta.vermas")} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ) : (
                  <button
                    key={item.labelKey}
                    onClick={() => { modalActions[item.action]?.(); closeAll(); }}
                    className="group flex flex-col w-full text-left px-8 py-5 hover:bg-primary/5 transition-colors duration-200 first:pl-2"
                  >
                    <h4 className="font-semibold text-foreground text-[1.2rem] mb-2.5 group-hover:text-primary transition-colors duration-200 leading-snug">
                      {t(item.labelKey)}
                    </h4>
                    <p className="text-[0.9rem] text-muted-foreground leading-relaxed flex-1">{t(item.descKey)}</p>
                    <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-primary border border-primary/40 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 mt-5 px-3 py-1.5 rounded-md self-start">
                      {t("nav.cta.vermas")} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile menu ─────────────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-[100] bg-[hsl(215,60%,30%)] px-6 py-6 flex flex-col gap-4 overflow-y-auto transition-all duration-300 ease-out ${
          mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ top: "4rem" }}
      >
        <Link to="/" className="block py-2 text-lg font-semibold text-white" onClick={closeAll}>{t("nav.inicio")}</Link>

        <div>
          <p className="py-2 text-lg font-semibold text-white">{t("nav.quienes")}</p>
          <div className="pl-5 mt-1 space-y-2 border-l-2 border-white/30">
            <Link to="/quienes-somos/historia" className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.historia.label")}</Link>
            <Link to="/nuestro-equipo"          className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.equipo.label")}</Link>
            <Link to="/quienes-somos/socios"    className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.proveedores.label")}</Link>
          </div>
        </div>

        <div>
          <p className="py-2 text-lg font-semibold text-white">{t("nav.quehacemos")}</p>
          <div className="pl-5 mt-1 space-y-2 border-l-2 border-white/30">
            <Link to="/que-hacemos/gvv" className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.gvv.label")}</Link>
            <Link to="/que-hacemos/mvp" className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.mvp.label")}</Link>
            <Link to="/que-hacemos/gestion-patrimonial" className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.wm.label")}</Link>
            <Link to="/que-hacemos/family-office" className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.fo.label")}</Link>
          </div>
        </div>

        <div>
          <p className="py-2 text-lg font-semibold text-white">{t("nav.metodologia")}</p>
          <div className="pl-5 mt-1 space-y-2 border-l-2 border-white/30">
            <Link to="/metodologia/vision"   className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.vision.label")}</Link>
            <Link to="/metodologia/ventajas" className="block py-1.5 text-sm text-white/80 hover:text-white" onClick={closeAll}>{t("nav.panel.ventajas.label")}</Link>
          </div>
        </div>

        <a href="/contacto" className="block py-2 text-lg font-semibold text-white" onClick={closeAll}>{t("nav.contacto")}</a>

        <div className="flex gap-3 pt-4 border-t border-white/20 mt-auto">
          <button onClick={() => setLang("en")} className={`w-11 h-11 rounded-full border border-white/50 text-sm font-semibold ${lang === "en" ? "bg-white text-[hsl(215,60%,30%)]" : "text-white"}`}>EN</button>
          <button onClick={() => setLang("es")} className={`w-11 h-11 rounded-full border border-white/50 text-sm font-semibold ${lang === "es" ? "bg-white text-[hsl(215,60%,30%)]" : "text-white"}`}>ES</button>
        </div>
      </div>

      <Suspense fallback={null}>
        <GVVModal open={gvvOpen} onOpenChange={setGvvOpen} />
        <MVPModal open={mvpOpen} onOpenChange={setMvpOpen} />
        <WealthManagementModal open={wmOpen} onOpenChange={setWmOpen} />
      </Suspense>
    </>
  );
}
