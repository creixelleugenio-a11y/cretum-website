import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { track } from "@/lib/analytics";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  perfil: string;
  intereses: string[];
  mensaje: string;
  calificado: boolean;
};

const PERFIL_KEYS = [
  "contact.perfil.1",
  "contact.perfil.2",
  "contact.perfil.3",
  "contact.perfil.4",
  "contact.perfil.5",
];

const INTERES_KEYS = [
  "contact.interes.1",
  "contact.interes.2",
  "contact.interes.3",
  "contact.interes.4",
  "contact.interes.5",
  "contact.interes.6",
];

// Web3Forms — recibe en investor@cretumpartners.com + auto-reply al prospecto
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "bc66be62-a5d3-439c-99de-489b70c346cd";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="flex items-center gap-5 mt-20 mb-8">
        <div className="h-[1.5px] w-5 bg-primary" />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary whitespace-nowrap">
          {children}
        </h3>
        <div className="h-[1.5px] flex-1 bg-border" />
      </div>
    </Reveal>
  );
}

export default function ContactoPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>({
    nombre: "",
    email: "",
    telefono: "",
    perfil: "",
    intereses: [],
    mensaje: "",
    calificado: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function toggleInteres(item: string) {
    setForm((f) => ({
      ...f,
      intereses: f.intereses.includes(item)
        ? f.intereses.filter((x) => x !== item)
        : [...f.intereses, item],
    }));
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.nombre.trim()) e.nombre = t("contact.form.err.required");
    if (!form.email.trim()) e.email = t("contact.form.err.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("contact.form.err.email");
    if (!form.perfil) e.perfil = t("contact.form.err.profile");
    if (!form.mensaje.trim()) e.mensaje = t("contact.form.err.required");
    if (!form.calificado) e.calificado = t("contact.form.err.qualified");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      const interesesText = form.intereses.length
        ? form.intereses.map((k) => t(k)).join(", ")
        : "—";
      const perfilText = form.perfil ? t(form.perfil) : "—";

      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `Nuevo contacto desde cretumpartners.com — ${form.nombre}`,
        from_name: "Cretum Partners — Sitio web",
        replyto: form.email,
        botcheck: "",
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono || "—",
        perfil: perfilText,
        intereses: interesesText,
        mensaje: form.mensaje,
        inversionista_calificado: form.calificado ? "Sí" : "No",
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Network error");
      setStatus("sent");
      track("contacto-enviado", { perfil: perfilText, intereses: interesesText });
    } catch {
      setStatus("error");
    }
  }

  const contactCards = [
    {
      icon: MapPin,
      label: t("contact.card.office"),
      value: t("contact.card.office.value"),
      sub: t("contact.card.office.sub"),
      href: "https://www.google.com/maps/search/Cretum+Partners+Reforma+1015+Santa+Fe+CDMX/",
      external: true,
    },
    {
      icon: Phone,
      label: t("contact.card.phone"),
      value: "+52 55 5292 4950",
      sub: "+52 55 5292 4906",
      href: "tel:+525552924950",
      external: false,
    },
    {
      icon: Mail,
      label: t("contact.card.email"),
      value: "investor@cretumpartners.com",
      sub: t("contact.card.email.sub"),
      href: "mailto:investor@cretumpartners.com",
      external: false,
    },
    {
      icon: Clock,
      label: t("contact.card.hours"),
      value: t("contact.card.hours.value"),
      sub: t("contact.card.hours.sub"),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 sm:pt-32 md:pt-56 pb-16 md:pb-40 bg-background">
        {/* ══ Header ══════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
              {t("contact.kicker")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              {t("contact.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              {t("contact.subtitle")}
            </p>
          </Reveal>
        </div>

        {/* ══ Contact Info Cards ═════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-8">
          <SectionTitle>{t("contact.channels")}</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {contactCards.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <div className="border border-border rounded-lg px-4 py-5 bg-background h-full hover:border-primary/40 transition-colors">
                  <Icon className="w-4 h-4 text-primary mb-3" strokeWidth={2} />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {c.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {c.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {c.sub}
                  </p>
                </div>
              );
              return (
                <Reveal key={c.label} delay={i * 0.08} className="reveal-scale">
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="block h-full"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ══ Form ═══════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-8">
          <SectionTitle>{t("contact.send")}</SectionTitle>

          {status === "sent" ? (
            <Reveal>
              <div className="bg-primary/5 border border-primary/15 rounded-lg px-8 py-14 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/25 mb-5">
                  <CheckCircle2 className="w-7 h-7 text-primary" strokeWidth={1.75} />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3">
                  {t("contact.success.title")}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto mb-7">
                  {t("contact.success.body.pre")}
                  <span className="text-foreground font-medium">
                    {t("contact.success.body.bold")}
                  </span>
                  {t("contact.success.body.post")}
                </p>
                <button
                  onClick={() => {
                    setForm({
                      nombre: "",
                      email: "",
                      telefono: "",
                      perfil: "",
                      intereses: [],
                      mensaje: "",
                      calificado: false,
                    });
                    setErrors({});
                    setStatus("idle");
                  }}
                  className="text-sm font-medium text-primary hover:text-primary/70 transition-colors inline-flex items-center gap-1.5"
                >
                  {t("contact.success.again")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form
                onSubmit={handleSubmit}
                className="border border-border rounded-lg bg-background p-6 md:p-10"
                noValidate
              >
                {/* Datos de contacto */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-6">
                  <FormField
                    label={t("contact.form.name")}
                    required
                    value={form.nombre}
                    onChange={(v) => setForm({ ...form, nombre: v })}
                    error={errors.nombre}
                  />
                  <FormField
                    label={t("contact.form.email")}
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={errors.email}
                  />
                  <FormField
                    label={t("contact.form.phone")}
                    type="tel"
                    value={form.telefono}
                    onChange={(v) => setForm({ ...form, telefono: v })}
                  />
                  <FormField
                    label={t("contact.form.profile")}
                    required
                    select
                    placeholder={t("contact.form.select")}
                    options={PERFIL_KEYS.map((k) => ({ value: t(k), label: t(k) }))}
                    value={form.perfil}
                    onChange={(v) => setForm({ ...form, perfil: v })}
                    error={errors.perfil}
                  />
                </div>

                {/* Intereses */}
                <div className="mb-6">
                  <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {t("contact.form.interest")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {INTERES_KEYS.map((key) => {
                      const item = t(key);
                      const active = form.intereses.includes(item);
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => toggleInteres(item)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 text-left text-[0.82rem] rounded-md border transition-colors ${
                            active
                              ? "bg-primary/5 border-primary/40 text-foreground"
                              : "bg-background border-border text-foreground/75 hover:border-primary/30"
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                              active
                                ? "bg-primary border-primary"
                                : "border-border"
                            }`}
                          >
                            {active && (
                              <svg
                                className="w-3 h-3 text-primary-foreground"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M2 6 L5 9 L10 3" />
                              </svg>
                            )}
                          </span>
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mensaje */}
                <div className="mb-6">
                  <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {t("contact.form.message")} <span className="text-primary">*</span>
                  </label>
                  <textarea
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    rows={5}
                    placeholder={t("contact.form.msg.placeholder")}
                    className={`w-full bg-background border rounded-md px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none ${
                      errors.mensaje ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.mensaje && (
                    <p className="text-[0.72rem] text-red-500 mt-1.5">{errors.mensaje}</p>
                  )}
                </div>

                {/* Disclaimer */}
                <label className="flex items-start gap-2.5 mb-6 cursor-pointer group">
                  <span
                    className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                      form.calificado
                        ? "bg-primary border-primary"
                        : "border-border group-hover:border-primary/50"
                    }`}
                  >
                    {form.calificado && (
                      <svg
                        className="w-3 h-3 text-primary-foreground"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 6 L5 9 L10 3" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.calificado}
                    onChange={(e) =>
                      setForm({ ...form, calificado: e.target.checked })
                    }
                  />
                  <span className="text-[0.78rem] text-muted-foreground leading-relaxed">
                    {t("contact.form.disclaimer")}
                  </span>
                </label>
                {errors.calificado && (
                  <p className="text-[0.72rem] text-red-500 -mt-4 mb-4 ml-6">
                    {errors.calificado}
                  </p>
                )}

                {/* Submit */}
                <div className="flex items-center gap-5 flex-wrap pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex md:inline-flex w-full md:w-auto justify-center items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {status === "error" && (
                    <p className="text-[0.82rem] text-red-500">
                      {t("contact.form.error")}
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ══ Helpers ═══════════════════════════════════════════════ */

function FormField({
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  select,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  select?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {select ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-background border rounded-md px-3.5 py-3 sm:py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors ${
            error ? "border-red-400" : "border-border"
          } ${!value ? "text-muted-foreground/60" : ""}`}
        >
          <option value="">{placeholder ?? "Select…"}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-foreground">
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-background border rounded-md px-3.5 py-3 sm:py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors ${
            error ? "border-red-400" : "border-border"
          }`}
        />
      )}
      {error && <p className="text-[0.72rem] text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
