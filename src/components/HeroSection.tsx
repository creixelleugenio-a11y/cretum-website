import { useRef } from "react";
import heroImage from "@/assets/hero-skyline-2.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* Full-screen title */}
      <section
        id="inicio"
        className="relative h-screen flex items-center justify-center overflow-hidden pt-28">

        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }} />

        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight animate-fade-in mt-12">
            <em className="not-italic font-serif font-medium block text-7xl relative -top-4" style={{color:"red"}}>
              {t("hero.title.1")}
            </em>
            <span className="text-foreground text-6xl block mt-6">{t("hero.title.2")}</span>
          </h1>

          <div
            className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}>

            <a
              href="#servicios"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200">

              {t("hero.cta1")}
            </a>
            <a
              href="#contacto"
              className="px-8 py-3 border border-primary text-primary rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-200">

              {t("hero.cta2")}
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in"
            style={{ animationDelay: "1s", animationFillMode: "both" }}>
          </div>
        </div>
      </section>

    </>);

}
