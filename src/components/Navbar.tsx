import { useState, useRef, useEffect } from "react";
import cretumLogo from "@/assets/Cretum_Logo.png";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { lazy, Suspense } from "react";
const GVVModal = lazy(() => import("@/components/GVVModal").then(m => ({ default: m.GVVModal })));
const MVPModal = lazy(() => import("@/components/MVPModal").then(m => ({ default: m.MVPModal })));
const TrendratingModal = lazy(() => import("@/components/TrendratingModal").then(m => ({ default: m.TrendratingModal })));
const WealthManagementModal = lazy(() => import("@/components/WealthManagementModal").then(m => ({ default: m.WealthManagementModal })));
const TeamModal = lazy(() => import("@/components/TeamModal").then(m => ({ default: m.TeamModal })));
const CreditoPrivadoModal = lazy(() => import("@/components/CreditoPrivadoModal").then(m => ({ default: m.CreditoPrivadoModal })));

interface SubMenuItem {
  labelKey: string;
  href?: string;
  action?: string;
}

interface MenuItem {
  labelKey: string;
  href?: string;
  submenu?: SubMenuItem[];
  action?: string;
}

const menuItems: MenuItem[] = [
  { labelKey: "nav.inicio", href: "#inicio" },
  { labelKey: "nav.nosotros", href: "#nosotros" },
  {
    labelKey: "nav.servicios",
    href: "#servicios",
    submenu: [
      { labelKey: "nav.gvv", action: "gvv" },
      { labelKey: "nav.mvp", action: "mvp" },
      { labelKey: "nav.trendrating", action: "tr" },
      { labelKey: "nav.wealth", action: "wm" },
    ],
  },
  { labelKey: "nav.trackrecord", href: "#metodologia" },
  { labelKey: "nav.equipo", href: "#nuestro-equipo" },
  { labelKey: "nav.contacto", href: "#contacto" },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gvvOpen, setGvvOpen] = useState(false);
  const [mvpOpen, setMvpOpen] = useState(false);
  const [trOpen, setTrOpen] = useState(false);
  const [wmOpen, setWmOpen] = useState(false);
  const [cpOpen, setCpOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang, setLang, t } = useLanguage();


  const modalActions: Record<string, () => void> = {
    gvv: () => setGvvOpen(true),
    mvp: () => setMvpOpen(true),
    tr: () => setTrOpen(true),
    wm: () => setWmOpen(true),
    cp: () => setCpOpen(true),
    team: () => setTeamOpen(true),
  };

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubClick = (sub: SubMenuItem) => {
    if (sub.action) {
      modalActions[sub.action]?.();
    }
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <>
    <nav className="bg-card/95 backdrop-blur-md border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-28">
        <a href="#inicio" className="flex items-center">
          <img src={cretumLogo} alt="Cretum Partners" className="h-24 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => {
            const label = t(item.labelKey);
            return (
              <div
                key={item.labelKey}
                className="relative"
                onMouseEnter={() => item.submenu && handleEnter(item.labelKey)}
                onMouseLeave={handleLeave}
              >
                {item.action && !item.submenu ? (
                  <button
                    onClick={() => modalActions[item.action!]?.()}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {label}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {label}
                    {item.submenu && <ChevronDown className="w-3 h-3" />}
                  </a>
                )}

                {item.submenu && openMenu === item.labelKey && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-md shadow-lg py-1 z-50 animate-fade-in">
                    {item.submenu.map((sub) =>
                      sub.href ? (
                        <a
                          key={sub.labelKey}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                        >
                          {t(sub.labelKey)}
                        </a>
                      ) : (
                        <button
                          key={sub.labelKey}
                          onClick={() => handleSubClick(sub)}
                          className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                        >
                          {t(sub.labelKey)}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setLang("en")}
            className={`w-9 h-9 rounded-full border border-primary text-xs font-semibold transition-all duration-200 active:scale-90 ${
              lang === "en" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("es")}
            className={`w-9 h-9 rounded-full border border-primary text-xs font-semibold transition-all duration-200 active:scale-90 ${
              lang === "es" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            ES
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </nav>

    <div
      className={`md:hidden fixed inset-x-0 top-28 bottom-0 z-[100] bg-[hsl(215,60%,30%)] px-8 py-10 flex flex-col gap-6 overflow-y-auto transition-all duration-300 ease-out ${
        mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}
    >
        {menuItems.map((item, i) => (
          <div key={item.labelKey} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            {item.action && !item.submenu ? (
              <button
                onClick={() => { modalActions[item.action!]?.(); setMobileOpen(false); }}
                className="block py-2 text-lg font-semibold text-white w-full text-left active:scale-95 transition-transform duration-150"
              >
                {t(item.labelKey)}
              </button>
            ) : (
              <a href={item.href} className="block py-2 text-lg font-semibold text-white active:scale-95 transition-transform duration-150" onClick={() => !item.submenu && setMobileOpen(false)}>
                {t(item.labelKey)}
              </a>
            )}
            {item.submenu && (
              <div className="pl-5 mt-2 space-y-2 border-l-2 border-white/30">
                {item.submenu.map((sub) =>
                  sub.href ? (
                    <a key={sub.labelKey} href={sub.href} className="block py-2 text-base text-white/80 hover:text-white active:scale-95 transition-all duration-150" onClick={() => setMobileOpen(false)}>
                      {t(sub.labelKey)}
                    </a>
                  ) : (
                    <button key={sub.labelKey} onClick={() => handleSubClick(sub)} className="block w-full text-left py-2 text-base text-white/80 hover:text-white active:scale-95 transition-all duration-150">
                      {t(sub.labelKey)}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
        <div className="flex gap-3 pt-4 border-t border-white/20 mt-auto animate-fade-in" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
          <button onClick={() => setLang("en")} className={`w-10 h-10 rounded-full border border-white/50 text-sm font-semibold active:scale-90 transition-all duration-200 ${lang === "en" ? "bg-white text-[hsl(215,60%,30%)]" : "text-white"}`}>EN</button>
          <button onClick={() => setLang("es")} className={`w-10 h-10 rounded-full border border-white/50 text-sm font-semibold active:scale-90 transition-all duration-200 ${lang === "es" ? "bg-white text-[hsl(215,60%,30%)]" : "text-white"}`}>ES</button>
        </div>
      </div>

    <Suspense fallback={null}>
      <GVVModal open={gvvOpen} onOpenChange={setGvvOpen} />
      <MVPModal open={mvpOpen} onOpenChange={setMvpOpen} />
      <TrendratingModal open={trOpen} onOpenChange={setTrOpen} />
      <WealthManagementModal open={wmOpen} onOpenChange={setWmOpen} />
      <TeamModal open={teamOpen} onOpenChange={setTeamOpen} />
      <CreditoPrivadoModal open={cpOpen} onOpenChange={setCpOpen} />
    </Suspense>
    </>
  );
}
