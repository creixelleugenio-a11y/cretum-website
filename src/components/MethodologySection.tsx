import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-skyline.jpg";

const steps = [
  { num: 1, titleKey: "method.s1.title", descKey: "method.s1.desc" },
  { num: 2, titleKey: "method.s2.title", descKey: "method.s2.desc" },
  { num: 3, titleKey: "method.s3.title", descKey: "method.s3.desc" },
  { num: 4, titleKey: "method.s4.title", descKey: "method.s4.desc" },
  { num: 5, titleKey: "method.s5.title", descKey: "method.s5.desc" },
];


export function MethodologySection() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setVisible((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="metodologia" className="min-h-screen flex overflow-hidden bg-background">

      {/* Main: timeline left + image right */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: timeline content */}
        <div className="flex flex-col pt-16 pb-12 px-10 md:px-16 w-full md:w-3/5">
          <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-3">
            {t("method.label")}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
            {t("method.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md">
            {t("method.subtitle")}
          </p>

          <div className="flex flex-col">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              const isVisible = visible.has(i);

              return (
                <div
                  key={step.num}
                  ref={(el) => { refs.current[i] = el; }}
                  data-idx={i}
                  className={`grid grid-cols-[52px_1fr] transition-all duration-[2200ms] ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${i * 320}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
                      {step.num}
                    </div>
                    {!isLast && <div className="w-[1.5px] flex-1 bg-border my-1.5" />}
                  </div>
                  <div className={`pl-3 ${isLast ? "pb-1" : "pb-5"} pt-1.5`}>
                    <h4 className="text-base md:text-lg font-bold text-foreground">
                      {t(step.titleKey)}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: skyline image */}
        <div className="hidden md:block md:w-2/5 relative overflow-hidden">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-foreground/10" />
        </div>

      </div>

    </section>
  );
}
