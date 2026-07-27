// Eventos personalizados de Umami (self-hosted en la Mac Mini).
// El script se carga con <script defer> en index.html; puede no existir
// (bloqueadores, o Chrome dentro del tailnet lo bloquea por Local Network
// Access), por eso el optional chaining: analytics nunca rompe la UI.
type EventData = Record<string, string | number | boolean>;

export function track(event: string, data?: EventData) {
  const w = window as { umami?: { track: (e: string, d?: EventData) => void } };
  try {
    w.umami?.track(event, data);
  } catch {
    // silencioso a propósito
  }
}

// ─── Medición de engagement ─────────────────────────────────────────────────
// Cuenta SOLO tiempo activo: la pestaña visible y con actividad (mouse/scroll/
// teclado) en los últimos 60s. Un tick de 1s acumula tiempo de página y de la
// sección bajo el centro del viewport (elementos con data-track-section).
// Al salir de la ruta o esconder la pestaña se emiten:
//   tiempo-pagina  { pagina, segundos, rango, scroll }
//   tiempo-seccion { pagina, seccion, segundos, rango }  (solo secciones ≥3s)
//   link-externo   { destino, pagina }  (click en <a> hacia otro dominio)

const IDLE_MS = 60_000;

let currentPath = "";
let pageSeconds = 0;
let maxScrollPct = 0;
let lastActivity = 0;
let sectionSeconds: Record<string, number> = {};
let started = false;

function rango(s: number): string {
  if (s < 10) return "0-10s";
  if (s < 30) return "10-30s";
  if (s < 60) return "30-60s";
  if (s < 180) return "1-3min";
  if (s < 600) return "3-10min";
  return "10min+";
}

function scrollBucket(p: number): string {
  if (p >= 90) return "90-100%";
  if (p >= 75) return "75%";
  if (p >= 50) return "50%";
  if (p >= 25) return "25%";
  return "<25%";
}

// Algunas páginas (Index) scrollean en un div interno, no en window: se mide
// desde el elemento que de verdad scrolleó (capturado en el listener) con
// fallback al documento.
let scroller: Element | null = null;

function updateScroll() {
  const el = (scroller && scroller.isConnected ? scroller : document.scrollingElement) as Element | null;
  if (!el || el.scrollHeight <= 0) return;
  const visible = el === document.scrollingElement ? window.innerHeight : el.clientHeight;
  if (el.scrollHeight <= visible) return; // sin scroll: no cuenta como 100%
  const pct = Math.min(100, Math.round(((el.scrollTop + visible) / el.scrollHeight) * 100));
  if (pct > maxScrollPct) maxScrollPct = pct;
}

function tick() {
  if (document.visibilityState !== "visible") return;
  if (Date.now() - lastActivity > IDLE_MS) return;
  pageSeconds += 1;
  // Sección bajo el centro del viewport (secciones apiladas de ancho completo)
  const midEl = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
  const sec = midEl?.closest("[data-track-section]");
  const name = sec?.getAttribute("data-track-section");
  if (name) sectionSeconds[name] = (sectionSeconds[name] || 0) + 1;
}

function flush() {
  if (pageSeconds >= 3 && currentPath && !currentPath.startsWith("/admin")) {
    track("tiempo-pagina", {
      pagina: currentPath,
      segundos: pageSeconds,
      rango: rango(pageSeconds),
      scroll: scrollBucket(maxScrollPct),
    });
    for (const [seccion, segundos] of Object.entries(sectionSeconds)) {
      if (segundos >= 3) {
        track("tiempo-seccion", { pagina: currentPath, seccion, segundos, rango: rango(segundos) });
      }
    }
  }
  pageSeconds = 0;
  maxScrollPct = 0;
  sectionSeconds = {};
}

// Llamar en cada cambio de ruta del router (emite lo acumulado de la ruta anterior).
export function onRouteChange(path: string) {
  flush();
  currentPath = path;
  lastActivity = Date.now();
  scroller = null;
  updateScroll();
}

// Inicializa el motor una sola vez (idempotente).
export function initEngagement() {
  if (started || typeof window === "undefined") return;
  started = true;
  currentPath = window.location.pathname;
  lastActivity = Date.now();

  const activity = () => { lastActivity = Date.now(); };
  window.addEventListener("pointermove", activity, { passive: true });
  window.addEventListener("pointerdown", activity, { passive: true });
  window.addEventListener("keydown", activity, { passive: true });
  // capture: los scrolls de contenedores internos no burbujean, pero sí pasan
  // por la fase de captura del documento
  document.addEventListener("scroll", (e) => {
    activity();
    if (e.target instanceof Element) scroller = e.target;
    updateScroll();
  }, { capture: true, passive: true });

  setInterval(tick, 1000);

  // La pestaña se esconde (cambio de pestaña, cierre, minimizar): emitir lo
  // acumulado. pagehide es poco confiable en móvil; visibilitychange sí corre.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });

  // Clicks a dominios externos (LinkedIn, etc.)
  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.("a[href]");
    if (!a) return;
    try {
      const url = new URL((a as HTMLAnchorElement).href, window.location.href);
      if (url.host && url.host !== window.location.host) {
        track("link-externo", { destino: url.host, pagina: currentPath });
      }
    } catch {
      // href inválido: ignorar
    }
  }, { capture: true, passive: true });
}
