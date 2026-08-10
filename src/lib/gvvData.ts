// ─────────────────────────────────────────────────────────────────────────
// FUENTE ÚNICA de los datos del fondo GVV para la página que-hacemos/gvv.
//
// Cada bloque trae el valor ACTUAL como RESPALDO horneado, y se sobrescribe
// con `window.__GVVDATA.<clave>` si existe. El robot de la Mini escribe
// /gvv-data.js (que define window.__GVVDATA) del Excel + carta + Finnhub +
// dashboard, y lo sube por FTP. Si el JS no carga o viene malformado, la
// página muestra EXACTAMENTE estos valores de respaldo (nunca peor que hoy).
//
// Los componentes (GVVHero, GVVPage, GVVModal) importan de aquí -> una sola
// fuente elimina la duplicación y la inconsistencia de KPIs entre archivos.
// ─────────────────────────────────────────────────────────────────────────

type GVVData = Record<string, unknown>;

function ov<T>(key: string, fallback: T): T {
  try {
    const g = (typeof window !== "undefined" ? (window as unknown as { __GVVDATA?: GVVData }).__GVVDATA : undefined);
    if (g && key in g && g[key] != null) return g[key] as T;
  } catch { /* ignore */ }
  return fallback;
}

// La fecha de corte de los datos (para un sello "Datos al…"), opcional.
export const asOf = ov<string | null>("asOf", null);

// ── KPIs del hero / página (una sola versión, adiós inconsistencia) ─────────
export type Kpi = { val: string; sub?: string };
export const kpis = ov<{ cagr5: string; hist: string; sharpe: string; vol: string }>("kpis", {
  cagr5: "14.76%",   // 5Y CAGR (Excel/carta)
  hist:  "3.87x",    // retorno histórico desde inicio (carta: Cumulative Return)
  sharpe:"0.77",     // Sharpe (carta)
  vol:   "4.60%",    // volatilidad anualizada / std dev (carta)
});

// ── Comparación anual GVV vs S&P 500 ────────────────────────────────────────
export const annualComparison = ov("annualComparison", [
  { year: "2021", gvv: 4.51,  sp: 26.89 },
  { year: "2022", gvv: 6.85,  sp: -19.44 },
  { year: "2023", gvv: 22.02, sp: 24.23 },
  { year: "2024", gvv: 9.88,  sp: 23.31 },
  { year: "2025", gvv: 38.02, sp: 16.39 },
]);

// ── Asignación por clase de activo (mismo orden que las etiquetas i18n) ─────
export const allocationValues = ov<number[]>("allocationValues", [26.8, 24, 19, 10.5, 9.8, 3.4, 1.9, 4.6]);

// ── Concentración de divisas ────────────────────────────────────────────────
export const currencies = ov("currencies", [
  { name: "USD",  value: 85.5 },
  { name: "MXN",  value: 10.6 },
  { name: "GBP",  value: 2.2  },
  { name: "EUR",  value: 1.6  },
  { name: "ASIA", value: 0.2  },
]);

// ── Retornos mensuales brutos (grid 2013–hoy) ───────────────────────────────
export const monthlyReturns = ov("monthlyReturns", [
  { year:"2013", m:[null,null,null,null,null,null,2.65,-12.72,15.92,14.82,5.99,10.47],   ytd:39.61 },
  { year:"2014", m:[-2.29,2.90,0.42,1.10,0.10,1.89,-1.51,10.32,-1.49,0.99,null,null],    ytd:12.56 },
  { year:"2015", m:[null,null,null,null,null,null,null,null,null,null,null,null],       ytd:0     },
  { year:"2016", m:[null,null,null,null,null,null,-0.40,3.01,-1.74,-0.97,1.77,2.31],     ytd:3.94  },
  { year:"2017", m:[1.16,-0.61,1.92,-1.20,-5.84,5.57,1.13,3.79,-1.39,-0.86,0.78,-0.08],  ytd:3.99  },
  { year:"2018", m:[3.05,3.20,4.38,-0.30,-2.63,1.13,1.28,0.70,-1.01,-1.01,2.47,-7.78],   ytd:2.90  },
  { year:"2019", m:[1.60,0.98,-1.16,2.85,-5.78,4.73,-4.06,-4.49,0.37,-0.65,0.77,0.03],   ytd:-5.21 },
  { year:"2020", m:[-0.03,-7.95,-1.11,-5.21,1.27,8.13,-7.47,4.50,15.44,-3.51,8.34,0.80], ytd:11.08 },
  { year:"2021", m:[7.70,5.16,-3.47,6.23,0.46,13.05,-8.71,-2.62,-5.46,1.57,-8.83,1.82],  ytd:4.51  },
  { year:"2022", m:[-3.17,-2.16,4.86,-9.41,3.98,-1.68,1.16,11.53,-1.94,1.94,2.76,0.22],  ytd:6.85  },
  { year:"2023", m:[4.88,1.29,1.55,-0.72,3.10,3.45,3.64,-1.53,-1.10,-3.05,5.81,3.17],    ytd:22.02 },
  { year:"2024", m:[0.29,2.88,2.76,-2.13,3.27,-2.19,0.69,2.27,4.67,-0.70,0.41,-2.46],    ytd:9.88  },
  { year:"2025", m:[5.18,0.90,-2.92,-0.27,3.19,3.06,3.88,3.03,9.13,1.49,4.35,2.11],      ytd:38.02 },
  { year:"2026", m:[0.17,-2.70,-2.73,7.27,2.93,null,null,null,null,null,null,null],      ytd:4.68  },
]);

// ── Pre-IPO (Growth) — sincronizado con los privados del dashboard ──────────
export const preIpoEs = ov("preIpoEs", [
  { name:"Anthropic", year:"2021", focus:"IA ética y segura",    product:"Claude — modelo de lenguaje avanzado", diff:"IA con límites claros. B2B y B2C."          },
  { name:"SpaceX",    year:"2002", focus:"Exploración espacial", product:"Falcon 9, Starlink, Starship",         diff:"Cohetes reutilizables. Líder aeroespacial." },
  { name:"Groq",      year:"2016", focus:"Chips de IA",          product:"LPU — acelerador de inferencia",       diff:"Más rápido y eficiente que NVIDIA."         },
]);
export const preIpoEn = ov("preIpoEn", [
  { name:"Anthropic", year:"2021", focus:"Ethical and safe AI",  product:"Claude — advanced language model",     diff:"AI with clear limits. B2B and B2C."         },
  { name:"SpaceX",    year:"2002", focus:"Space exploration",    product:"Falcon 9, Starlink, Starship",         diff:"Reusable rockets. Aerospace leader."        },
  { name:"Groq",      year:"2016", focus:"AI chips",             product:"LPU — inference accelerator",          diff:"Faster and more efficient than NVIDIA."     },
]);

// ── Historias de éxito pre-IPO (editorial, cambio raro) ─────────────────────
export const successStories = ov("successStories", [
  { name:"Spotify",  entry:"$6.5B",  ipo:"$26.5B", cap:"$114.46B" },
  { name:"Coinbase", entry:"$8.0B",  ipo:"$93.0B", cap:"$66.68B"  },
  { name:"Airbnb",   entry:"$24.0B", ipo:"$47B",   cap:"$84.85B"  },
  { name:"Palantir", entry:"$4.0B",  ipo:"$16B",   cap:"$418.68B" },
]);

// ── Retornos realizados (Value) ─────────────────────────────────────────────
export const realizedReturns = ov("realizedReturns", [
  { name:"BT Group",        ret:"+100.70%" },
  { name:"Intesa Sanpaolo", ret:"+82.69%"  },
  { name:"Samsung",         ret:"+60.05%"  },
  { name:"MédicaSur",       ret:"+45.11%"  },
]);

// ── Posiciones activas Value — MISMAS que la sección Value del dashboard ────
export const activePositionsEs = ov("activePositionsEs", [
  { name:"Harley-Davidson (HOG)", thesis:"Marca icónica, FCF sólido, valuación comprimida. Exposición vía opciones a $17.45/acción.", metrics:[["P/B","0.66x (1.09x)"],["P/E","4.85x (11.11x)"],["EV/EBITDA","8.43x (9.54x)"]] },
  { name:"Nemak", thesis:"Líder en componentes automotrices, altas barreras de entrada. Entrada a $2.71/acción.", metrics:[["P/B","0.16x (1.19x)"],["P/E","3.51x (17x)"],["Retorno","+42% en 1 año"]] },
]);
export const activePositionsEn = ov("activePositionsEn", [
  { name:"Harley-Davidson (HOG)", thesis:"Iconic brand, solid FCF, compressed valuation. Options exposure at $17.45/share.", metrics:[["P/B","0.66x (1.09x)"],["P/E","4.85x (11.11x)"],["EV/EBITDA","8.43x (9.54x)"]] },
  { name:"Nemak", thesis:"Leader in automotive components, high barriers to entry. Entry at $2.71/share.", metrics:[["P/B","0.16x (1.19x)"],["P/E","3.51x (17x)"],["Return","+42% in 1 year"]] },
]);

// ── Estrategias algorítmicas (Volatility) — del RGA del dashboard ───────────
export const algoStrategies = ov("algoStrategies", [
  { name:"S&P 500 Strategy",     cagr:21.66, bench:11.45, alpha:"+10.21%", y26:"10.93%", y25:"19.35%",  y24:"33.76%"  },
  { name:"Russell 2000 Strategy",cagr:59.81, bench:8.79,  alpha:"+51.02%", y26:"4.94%",  y25:"17.42%",  y24:"50.44%"  },
  { name:"ADR Strategy",         cagr:51.57, bench:10.57, alpha:"+41.00%", y26:"14.81%", y25:"115.38%", y24:"119.98%" },
]);

// ── Skin in the game (carta) ────────────────────────────────────────────────
export const skinPct = ov<number>("skinPct", 61);

// ── Chips de los pilares (GVVEngine) — mismas empresas que el dashboard ──────
// null => se usan las listas horneadas en GVVEngine. El robot inyecta:
// { growth: [{name,sector}], value: [...], volatility: [...],
//   volatilityLabelEs/En: string } (el diseño del chip NO cambia).
export type PillarChip = { name: string; sector: string; logo?: string };
export const pillarChips = ov<{
  growth?: PillarChip[]; value?: PillarChip[]; volatility?: PillarChip[];
  volatilityLabelEs?: string; volatilityLabelEn?: string;
} | null>("pillarChips", null);

// ── Carta mensual (descargable) — el robot sube el PDF y actualiza este link ─
export const letterDoc = ov<{ name: string; file_url: string } | null>("letterDoc", {
  name: "Cretum Letter - May 2026",
  file_url: "/docs/Cretum-Letter-May-2026.pdf",
});

// ── Valor acumulado 5Y (base 100 = Ene 2021) GVV vs S&P ─────────────────────
export const cumulativeData = ov("cumulativeData", [
  { l:"Ene '21", gvv:107.70, sp:99.00 },  { l:"Feb '21", gvv:113.26, sp:101.97 },
  { l:"Mar '21", gvv:109.33, sp:106.05 },  { l:"Abr '21", gvv:116.14, sp:111.35 },
  { l:"May '21", gvv:116.68, sp:112.46 },  { l:"Jun '21", gvv:131.90, sp:114.71 },
  { l:"Jul '21", gvv:120.41, sp:117.00 },  { l:"Ago '21", gvv:117.25, sp:120.51 },
  { l:"Sep '21", gvv:110.85, sp:114.48 },  { l:"Oct '21", gvv:112.59, sp:122.49 },
  { l:"Nov '21", gvv:102.65, sp:121.27 },  { l:"Dic '21", gvv:104.52, sp:126.55 },
  { l:"Ene '22", gvv:101.20, sp:120.22 },  { l:"Feb '22", gvv:98.99,  sp:116.61 },
  { l:"Mar '22", gvv:103.80, sp:121.27 },  { l:"Abr '22", gvv:94.04,  sp:110.36 },
  { l:"May '22", gvv:97.78,  sp:110.36 },  { l:"Jun '22", gvv:96.14,  sp:101.53 },
  { l:"Jul '22", gvv:97.25,  sp:110.67 },  { l:"Ago '22", gvv:108.47, sp:106.24 },
  { l:"Sep '22", gvv:106.37, sp:96.68  },  { l:"Oct '22", gvv:108.43, sp:104.41 },
  { l:"Nov '22", gvv:111.42, sp:109.63 },  { l:"Dic '22", gvv:111.67, sp:103.05 },
  { l:"Ene '23", gvv:117.12, sp:109.23 },  { l:"Feb '23", gvv:118.63, sp:105.95 },
  { l:"Mar '23", gvv:120.47, sp:110.19 },  { l:"Abr '23", gvv:119.60, sp:111.29 },
  { l:"May '23", gvv:123.31, sp:111.29 },  { l:"Jun '23", gvv:127.57, sp:117.97 },
  { l:"Jul '23", gvv:132.21, sp:121.51 },  { l:"Ago '23", gvv:130.19, sp:119.08 },
  { l:"Sep '23", gvv:128.76, sp:113.13 },  { l:"Oct '23", gvv:124.83, sp:110.87 },
  { l:"Nov '23", gvv:132.09, sp:121.96 },  { l:"Dic '23", gvv:136.28, sp:127.45 },
  { l:"Ene '24", gvv:136.67, sp:130.00 },  { l:"Feb '24", gvv:140.61, sp:136.50 },
  { l:"Mar '24", gvv:144.49, sp:140.60 },  { l:"Abr '24", gvv:141.41, sp:134.98 },
  { l:"May '24", gvv:146.04, sp:141.73 },  { l:"Jun '24", gvv:142.84, sp:145.98 },
  { l:"Jul '24", gvv:143.83, sp:147.44 },  { l:"Ago '24", gvv:147.10, sp:150.39 },
  { l:"Sep '24", gvv:153.97, sp:153.40 },  { l:"Oct '24", gvv:152.89, sp:151.87 },
  { l:"Nov '24", gvv:153.52, sp:162.50 },  { l:"Dic '24", gvv:149.74, sp:158.44 },
  { l:"Ene '25", gvv:157.50, sp:163.19 },  { l:"Feb '25", gvv:158.92, sp:161.56 },
  { l:"Mar '25", gvv:154.28, sp:155.10 },  { l:"Abr '25", gvv:153.86, sp:147.35 },
  { l:"May '25", gvv:158.77, sp:157.66 },  { l:"Jun '25", gvv:163.63, sp:163.97 },
  { l:"Jul '25", gvv:169.98, sp:167.25 },  { l:"Ago '25", gvv:175.13, sp:170.60 },
  { l:"Sep '25", gvv:191.12, sp:174.01 },  { l:"Oct '25", gvv:193.97, sp:179.23 },
  { l:"Nov '25", gvv:202.41, sp:189.98 },  { l:"Dic '25", gvv:206.68, sp:184.66 },
  { l:"Ene '26", gvv:207.03, sp:190.20 },  { l:"Feb '26", gvv:201.43, sp:187.35 },
  { l:"Mar '26", gvv:195.93, sp:178.11 },  { l:"Abr '26", gvv:210.18, sp:196.83 },
  { l:"May '26", gvv:216.34, sp:207.18 },
]);
