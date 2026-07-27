import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import cretumLogo from "@/assets/Cretum_Logo.png";
import { Reveal } from "@/components/Reveal";

export function Footer() {
  const { t, lang } = useLanguage();

  const links = lang === "es"
    ? [
        { label: "Inicio", href: "/" },
        { label: "Nosotros", href: "/nosotros" },
        { label: "Servicios", href: "/servicios" },
        { label: "Nuestro Equipo", href: "/nuestro-equipo" },
        { label: "Contacto", href: "/contacto" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About", href: "/nosotros" },
        { label: "Services", href: "/servicios" },
        { label: "Our Team", href: "/nuestro-equipo" },
        { label: "Contact", href: "/contacto" },
      ];

  return (
    <footer id="contacto" className="bg-foreground pt-24 md:pt-64 pb-16 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <Reveal className="reveal-left">
            <div>
              <img src={cretumLogo} alt="Cretum Partners" className="h-16 md:h-24 w-auto brightness-0 invert mb-4" />
              <p className="text-sm text-background/70 leading-relaxed">{t("footer.desc")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <h4 className="font-semibold text-background mb-4 text-sm">{t("footer.links")}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link to={l.href} className="text-sm text-background/60 hover:text-background transition-colors">{l.label}</Link>
                    ) : (
                      <a href={l.href} className="text-sm text-background/60 hover:text-background transition-colors">{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="reveal-right">
            <div>
              <h4 className="font-semibold text-background mb-4 text-sm">{t("footer.contact")}</h4>
              <p className="text-sm text-background/70 leading-relaxed mb-3">
                Av. Prol. Paseo de la Reforma 1015<br />
                Edificio Punta Santa Fe, Piso 22<br />
                Col. Desarrollo Santa Fe 01376<br />
                Ciudad de México
              </p>
              <p className="text-sm text-background/70">+52 55 5292 4950</p>
              <p className="text-sm text-background/70 mt-0.5">+52 55 5292 4906</p>
              <p className="text-sm text-background/70 mt-1">investor@cretumpartners.com</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10">
          <p className="text-xs text-background/40 leading-relaxed mb-4">{t("footer.disclaimer")}</p>
          <div className="text-center">
            <p className="text-xs text-background/40">{t("footer.rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
