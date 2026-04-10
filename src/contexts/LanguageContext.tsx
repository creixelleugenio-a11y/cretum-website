import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.inicio": { es: "Inicio", en: "Home" },
  "nav.nosotros": { es: "Nosotros", en: "About Us" },
  "nav.servicios": { es: "Servicios", en: "Services" },
  "nav.trackrecord": { es: "Metodología", en: "Methodology" },
  "nav.equipo": { es: "Nuestro Equipo", en: "Our Team" },
  "nav.contacto": { es: "Contacto", en: "Contact" },
  "nav.gvv": { es: "GVV", en: "GVV" },
  "nav.mvp": { es: "MVP Private Equity", en: "MVP Private Equity" },
  "nav.trendrating": { es: "Trendrating Licensing", en: "Trendrating Licensing" },
  "nav.wealth": { es: "Wealth Management", en: "Wealth Management" },
  "nav.credito": { es: "Crédito Privado", en: "Private Credit" },

  // Hero
  "hero.title.1": { es: "Passion", en: "Passion" },
  "hero.title.2": { es: "Beyond Money", en: "Beyond Money" },
  "hero.p1": {
    es: "Cretum Advisory Partners S.A.P.I. de C.V., fundada en 2014, se especializa en la inversión de activos financieros con un enfoque integral en la creación de valor, la preservación del capital y la generación de rendimientos constantes.",
    en: "Cretum Advisory Partners S.A.P.I. de C.V., founded in 2014, specializes in the investment of financial assets with a comprehensive focus on value creation, capital preservation, and the generation of consistent returns.",
  },
  "hero.p2": {
    es: "Establecida en Ciudad de México, nuestra firma combina experiencia probada y soluciones personalizadas para tesoreroías gubernamentales, personas de alto patrimonio, fondos de pensiones, mandatos privados y familias. Hemos gestionado un total acumulado que supera los $32 mil millones de pesos.",
    en: "Based in Mexico City, our firm combines proven expertise and personalized solutions for government treasuries, high-net-worth individuals, pension funds, private mandates, and families. We have managed a cumulative total exceeding $32 billion pesos.",
  },
  "hero.cta1": { es: "Nuestros Servicios", en: "Our Services" },
  "hero.cta2": { es: "Contáctanos", en: "Contact Us" },

  // Services
  "services.intro": {
    es: "ofrece las herramientas ideales para alcanzar tus objetivos.",
    en: "offers the ideal tools to achieve your goals.",
  },

  // Metrics Bar
  "metrics.stat1.value": { es: "$32,110", en: "$32,110" },
  "metrics.stat1.label": { es: "MDP en activos gestionados", en: "MDP in managed assets" },
  "metrics.stat2.value": { es: "+12", en: "+12" },
  "metrics.stat2.label": { es: "años de trayectoria en mercados", en: "years of market track record" },
  "metrics.stat3.value": { es: "$370", en: "$370" },
  "metrics.stat3.label": { es: "MDD movilizados vía MVP", en: "MDD mobilized via MVP" },
  "metrics.stat4.value": { es: "+400", en: "+400" },
  "metrics.stat4.label": { es: "inversionistas en la plataforma", en: "investors on the platform" },

  // About Section
  "about.title": { es: "Nuestra Historia", en: "Our Story" },
  "about.founded": { es: "Fundada en 2014", en: "Founded in 2014" },
  "about.mission.label": { es: "Misión", en: "Mission" },
  "about.mission": {
    es: "Ofrecer gestión activa y confiable de activos financieros, diseñada para proteger y hacer crecer el patrimonio mediante estrategias éticas, transparentes y enfocadas en el largo plazo.",
    en: "To offer active and reliable financial asset management, designed to protect and grow wealth through ethical, transparent strategies focused on the long term.",
  },
  "about.brief1": {
    es: "Cretum Advisory Partners S.A.P.I. de C.V., fundada en 2014, se especializa en la inversión de activos financieros con un enfoque integral en la creación de valor, la preservación del capital y la generación de rendimientos constantes.",
    en: "Cretum Advisory Partners S.A.P.I. de C.V., founded in 2014, specializes in the investment of financial assets with a comprehensive focus on value creation, capital preservation, and consistent returns.",
  },
  "about.brief2": {
    es: "Establecida en Ciudad de México, nuestra firma combina experiencia probada y soluciones personalizadas para tesorerías gubernamentales, personas de alto patrimonio, fondos de pensiones, mandatos privados y familias. Hemos gestionado un total acumulado que supera los $32 mil millones de pesos.",
    en: "Based in Mexico City, our firm combines proven expertise and personalized solutions for government treasuries, high-net-worth individuals, pension funds, private mandates, and families. We have managed a cumulative total exceeding $32 billion pesos.",
  },
  "about.short1": {
    es: "Fundada en 2014 en Ciudad de México, Cretum Partners es una gestora de activos independiente enfocada en la creación de valor, la preservación del capital y la generación de rendimientos constantes para tesorerías gubernamentales, familias de alto patrimonio, fondos de pensiones y mandatos privados.",
    en: "Founded in 2014 in Mexico City, Cretum Partners is an independent asset manager focused on value creation, capital preservation, and consistent returns for government treasuries, high-net-worth families, pension funds, and private mandates.",
  },
  "about.short2": {
    es: "Con más de 12 años de trayectoria y $32,000 MDP gestionados, operamos sin conflictos de interés — independientes de cualquier casa de bolsa — ofreciendo soluciones personalizadas, transparentes y alineadas con el largo plazo de cada cliente.",
    en: "With over 12 years of experience and $32,000 MDP under management, we operate free of conflicts of interest — independent of any brokerage — delivering personalized, transparent solutions aligned with each client's long-term goals.",
  },
  "about.desc1.bold": { es: "Cretum Advisory Partners S.A.P.I. de C.V.,", en: "Cretum Advisory Partners S.A.P.I. de C.V.," },
  "about.desc1": {
    es: "es una empresa fundada en 2014, especializada en la inversión de activos financieros con un enfoque integral en la creación de valor, la preservación del capital, la liquidez y la generación de rendimientos constantes en cualquier entorno macroeconómico.",
    en: "is a company founded in 2014, specializing in the investment of financial assets with a comprehensive focus on value creation, capital preservation, liquidity, and the generation of consistent returns in any macroeconomic environment.",
  },
  "about.desc2": {
    es: "Establecida en Ciudad de México, nuestra firma combina experiencia probada, conocimiento profundo de los mercados y soluciones personalizadas para tesorerías gubernamentales, personas de alto patrimonio, fondos de pensiones, mandatos privados y familias.",
    en: "Based in Mexico City, our firm combines proven expertise, deep market knowledge, and personalized solutions for government treasuries, high-net-worth individuals, pension funds, private mandates, and families.",
  },
  "about.desc3.pre": { es: "A lo largo de nuestra trayectoria, hemos gestionado un total acumulado de activos que supera los", en: "Throughout our track record, we have successfully managed a cumulative total of assets exceeding" },
  "about.desc3.bold": { es: "32 mil millones de pesos,", en: "32 billion pesos," },
  "about.desc3.post": {
    es: "diversificados estratégicamente entre mercados públicos y privados, estrategias de cobertura y crédito privado.",
    en: "strategically diversified across public and private markets, hedging strategies, and private credit.",
  },
  "about.desc4": {
    es: "Nuestra misión es ofrecer una gestión activa y confiable de activos financieros, diseñada para proteger y hacer crecer el patrimonio de nuestros clientes, promoviendo el crecimiento económico mediante estrategias de inversión éticas, transparentes y enfocadas en el largo plazo.",
    en: "Our mission is to offer active and reliable financial asset management, designed to protect and grow our clients' wealth, promoting economic growth through ethical, transparent, and long-term focused investment strategies.",
  },
  "about.aum": { es: "+$32,000 MDP gestionados", en: "+$32,000 MDP managed" },
  "about.stat.years":     { es: "Años de experiencia en activos institucionales.", en: "Years of institutional asset management experience." },
  "about.stat.aum":       { es: "MDP en activos gestionados acumulados.", en: "MDP in cumulative assets under management." },
  "about.stat.investors": { es: "Inversionistas activos en la plataforma.", en: "Active investors on the platform." },
  "about.stat.one":       { es: "Una", en: "One" },
  "about.stat.philosophy":{ es: "Filosofía de inversión.", en: "Investment philosophy." },
  "home.kpi.tagline": { es: "Diseñados para crear más valor", en: "Designed to create more value" },
  "home.kpi.subtitle": { es: "Construimos estrategias integrales para que nuestros clientes descubran, accedan y realicen más oportunidades.", en: "We build comprehensive strategies to help our clients discover, access, and realize more opportunities." },
  "home.kpi.cta": { es: "Nuestros Servicios", en: "Our Services" },
  "about.structure.title": { es: "Estrategia", en: "Strategy" },
  "about.advantages.title": { es: "Ventajas Competitivas", en: "Competitive Advantages" },
  "about.adv1.title": { es: "Agilidad", en: "Agility" },
  "about.adv1.desc": { es: "Reaccionamos de manera rápida y eficiente ante situaciones donde otros manejadores tardarían 2x–3x más en tomar una decisión.", en: "We react quickly and efficiently where other managers would take 2x–3x longer to decide." },
  "about.adv2.title": { es: "Independencia", en: "Independence" },
  "about.adv2.desc": { es: "No dependemos de alguna casa de bolsa; trabajamos con todas en beneficio exclusivo del cliente.", en: "We are not tied to any brokerage; we work with all of them exclusively in the client's interest." },
  "about.adv3.title": { es: "Atención Personalizada", en: "Personalized Service" },
  "about.adv3.desc": { es: "Update mensual de posiciones y reuniones en línea o presenciales cuando el cliente lo considere necesario.", en: "Monthly position updates and in-person or virtual meetings whenever the client requires." },
  "about.adv4.title": { es: "Radar de Mercado", en: "Market Radar" },
  "about.adv4.desc": { es: "Al estar en diferentes sectores del medio financiero, anticipamos cambios y tendencias antes que los demás.", en: "Operating across multiple financial sectors, we anticipate changes and trends before the market does." },
  "about.adv5.title": { es: "Flexibilidad", en: "Flexibility" },
  "about.adv5.desc": { es: "Nos adecuamos al régimen de inversión de cualquier mandato en tiempo y forma, sin importar su complejidad.", en: "We adapt to the investment framework of any mandate on time and in full, regardless of its complexity." },

  // GVV Modal
  "gvv.title": { es: "Growth, Value and Volatility (GVV)", en: "Growth, Value and Volatility (GVV)" },
  "gvv.subtitle": { es: "Fondo Multiestratégico · Multidivisas · Valuado en USD", en: "Multi-Strategy Fund · Multi-Currency · Valued in USD" },
  "gvv.desc": {
    es: "Fondo que invierte en tres estrategias complementarias para maximizar rendimientos ajustados al riesgo en mercados globales.",
    en: "Fund that invests in three complementary strategies to maximize risk-adjusted returns in global markets.",
  },
  "gvv.growth": { es: "Crecimiento", en: "Growth" },
  "gvv.growth.desc": { es: "Compañías de tecnología de alto crecimiento.", en: "High-growth technology companies." },
  "gvv.value": { es: "Valor", en: "Value" },
  "gvv.value.desc": { es: "Compañías que generen valor a largo plazo.", en: "Companies that generate long-term value." },
  "gvv.hedge": { es: "Coberturas de Volatilidad", en: "Volatility Hedging" },
  "gvv.hedge.desc": { es: "Reducción de riesgo vía Delta Hedging.", en: "Risk reduction via Delta Hedging." },
  "gvv.pillar4": { es: "Enfoque Largo Plazo", en: "Long-Term Focus" },
  "gvv.pillar4.desc": { es: "Diversificación geográfica y sectorial para rendimientos sostenibles.", en: "Geographic and sector diversification for sustainable returns." },
  "gvv.chart.title": { es: "Valor del Portafolio", en: "Portfolio Value" },
  "gvv.chart.label": { es: "Valor", en: "Value" },
  "gvv.philosophy": {
    es: "Cretum Partners invierte bajo la filosofía de crecimiento e inversión a largo plazo, rodeado de confianza, seguridad y transparencia en un ambiente protegido. Alcanzamos a ver lo que otros no pueden, esa es nuestra ventaja competitiva.",
    en: "Cretum Partners invests under a philosophy of long-term growth and investment, surrounded by trust, security and transparency in a protected environment. We see what others cannot, that is our competitive advantage.",
  },
  "gvv.providers": { es: "Proveedores institucionales", en: "Institutional providers" },
  "gvv.download": { es: "Descargar Carta Mensual de GVV", en: "Download GVV Monthly Letter" },
  "gvv.noDoc": { es: "Carta Mensual no disponible aún", en: "Monthly Letter not yet available" },

  // GVV Modal — KPIs
  "gvv.kpi1.label": { es: "CAGR 5Y", en: "CAGR 5Y" },
  "gvv.kpi1.sub":   { es: "Rendimiento anualizado", en: "Annualized return" },
  "gvv.kpi2.label": { es: "Retorno histórico", en: "Historical return" },
  "gvv.kpi2.sub":   { es: "Desde inicio (2014)", en: "Since inception (2014)" },
  "gvv.kpi3.label": { es: "Sharpe Ratio", en: "Sharpe Ratio" },
  "gvv.kpi3.sub":   { es: "Ajustado al riesgo", en: "Risk-adjusted" },
  "gvv.kpi4.label": { es: "Vol. anualizada", en: "Ann. Volatility" },
  "gvv.kpi4.sub":   { es: "Últimos 5 años", en: "Last 5 years" },

  // GVV Modal — Section titles
  "gvv.section.annual":     { es: "Rendimiento anual vs S&P 500", en: "Annual Return vs S&P 500" },
  "gvv.section.port_value": { es: "Valor del Portafolio — últimos 5 años (base 100)", en: "Portfolio Value — last 5 years (base 100)" },
  "gvv.section.port_struct":{ es: "Estructura del Portafolio", en: "Portfolio Structure" },
  "gvv.section.monthly":    { es: "Retornos mensuales brutos", en: "Gross Monthly Returns" },
  "gvv.section.preipo":     { es: "Growth — Posiciones Pre-IPO actuales", en: "Growth — Current Pre-IPO Positions" },
  "gvv.section.realized":   { es: "Value — Retornos realizados", en: "Value — Realized Returns" },
  "gvv.section.algo":       { es: "Volatilidad — Estrategias algorítmicas", en: "Volatility — Algorithmic Strategies" },
  "gvv.section.inst":       { es: "Estructura institucional", en: "Institutional Structure" },

  // GVV Modal — highlights row
  "gvv.hl3.sub": { es: "Retorno acumulado 5 años", en: "5-year cumulative return" },

  // GVV Modal — allocation / currency
  "gvv.alloc.by_asset":     { es: "Por clase de activo", en: "By asset class" },
  "gvv.alloc.acciones_usa": { es: "Acciones USA", en: "US Equities" },
  "gvv.alloc.acciones_mx":  { es: "Acciones MX", en: "MX Equities" },
  "gvv.alloc.bonos_mx":     { es: "Bonos MX", en: "MX Bonds" },
  "gvv.alloc.bonos_usa":    { es: "Bonos USA", en: "US Bonds" },
  "gvv.alloc.otros":        { es: "Otros", en: "Others" },
  "gvv.currency.label":     { es: "Concentración de divisas", en: "Currency Concentration" },
  "gvv.skin.desc":          { es: "Cretum Capital Partners mantiene el 76% del fondo, alineando sus intereses directamente con los inversores.", en: "Cretum Capital Partners holds 76% of the fund, directly aligning their interests with investors." },

  // GVV Modal — monthly table
  "gvv.table.year":        { es: "Año", en: "Year" },
  "gvv.table.disclaimer":  { es: "* Retornos brutos. El rendimiento pasado no garantiza resultados futuros.", en: "* Gross returns. Past performance does not guarantee future results." },

  // GVV Modal — Pre-IPO section
  "gvv.preipo.founded":   { es: "Fundada", en: "Founded" },
  "gvv.preipo.focus":     { es: "Enfoque:", en: "Focus:" },
  "gvv.preipo.product":   { es: "Producto:", en: "Product:" },
  "gvv.preipo.diff":      { es: "Diferenciador:", en: "Differentiator:" },
  "gvv.preipo.success":   { es: "Historias de éxito — Pre-IPO", en: "Success Stories — Pre-IPO" },
  "gvv.preipo.entry":     { es: "Entrada:", en: "Entry:" },
  "gvv.preipo.cap":       { es: "Cap. actual:", en: "Current Cap.:" },

  // GVV Modal — Value section
  "gvv.realized.label":   { es: "Retorno realizado", en: "Realized Return" },
  "gvv.active.title":     { es: "Posiciones activas", en: "Active Positions" },
  "gvv.active.badge":     { es: "Activa", en: "Active" },

  // GVV Modal — Algo section
  "gvv.algo.desc": {
    es: "Delta Hedging dinámico mediante UVXY — elimina la exposición direccional manteniendo exposición a volatilidad. Modelo propietario basado en Black-Scholes con gestión activa de Greeks (calls, covered calls, protective puts).",
    en: "Dynamic Delta Hedging via UVXY — eliminates directional exposure while maintaining volatility exposure. Proprietary model based on Black-Scholes with active management of Greeks (calls, covered calls, protective puts).",
  },
  "gvv.algo.strategy_cagr": { es: "CAGR Estrategia", en: "Strategy CAGR" },
  "gvv.algo.alpha":          { es: "Alpha generado", en: "Generated Alpha" },

  // GVV Modal — Structure
  "gvv.struct.legal":        { es: "Entidad legal", en: "Legal Entity" },
  "gvv.struct.custodian":    { es: "Custodio", en: "Custodian" },
  "gvv.struct.nav":          { es: "Administrador NAV", en: "NAV Administrator" },
  "gvv.struct.valued":       { es: "Valorado en", en: "Valued in" },
  "gvv.struct.multicurrency":{ es: "Fondo multidivisas", en: "Multi-currency fund" },

  // MVP Modal
  "mvp.title": { es: "Manhattan Venture Partners", en: "Manhattan Venture Partners" },
  "mvp.subtitle": { es: "Tomorrow's IPOs · Today", en: "Tomorrow's IPOs · Today" },
  "mvp.desc": {
    es: "Es una firma que invierte en empresas privadas dentro del sector de tecnología. MVP es regulado por FINRA y SEC. La tesis de inversión se enfoca en compañías en etapa PRE-IPO mediante una estrategia secundaria.",
    en: "A firm that invests in private companies within the technology sector. MVP is regulated by FINRA and SEC. The investment thesis focuses on PRE-IPO stage companies through a secondary strategy.",
  },
  "mvp.h1": { es: "Regulado por FINRA y SEC", en: "Regulated by FINRA and SEC" },
  "mvp.h2": { es: "+10 ciudades alrededor del mundo", en: "+10 cities around the world" },
  "mvp.h3": { es: "Estrategia Pre-IPO secundaria", en: "Secondary Pre-IPO Strategy" },
  "mvp.h4": { es: "Informe mensual: Venture Bytes", en: "Monthly report: Venture Bytes" },
  "mvp.hq": {
    es: "Los headquarters se encuentran en Nueva York y San Francisco; también contamos con presencia en +10 ciudades alrededor del mundo.",
    en: "Headquarters are located in New York and San Francisco; we also have a presence in +10 cities around the world.",
  },
  "mvp.analysis": {
    es: "MVP cuenta con un departamento de análisis que reduce la asimetría de mercados privados. A través de su informe mensual, Venture Bytes, se destacan tendencias y oportunidades emergentes en el panorama tecnológico global.",
    en: "MVP has an analysis department that reduces private market asymmetry. Through its monthly report, Venture Bytes, it highlights trends and emerging opportunities in the global technology landscape.",
  },
  "mvp.impact": {
    es: "+$370 MDD movilizados · +400 inversionistas · Colaboración con BBVA en BIVA desde $100 USD",
    en: "+$370M USD mobilized · +400 investors · Collaboration with BBVA on BIVA from $100 USD",
  },
  "mvp.liquidity": {
    es: "Liquidez en 3.7 años — 3x más rápido que fondos promedio de VC.",
    en: "Liquidity in 3.7 years — 3x faster than average VC funds.",
  },
  "mvp.portfolio": {
    es: "Empresas en portafolio — invirtiendo siempre en etapa privada",
    en: "Portfolio companies — always investing at the private stage",
  },

  // Trendrating Modal
  "tr.title": { es: "TrendRating", en: "TrendRating" },
  "tr.subtitle": { es: "Alpha Generating Software", en: "Alpha Generating Software" },
  "tr.desc": {
    es: "TrendRating es una empresa de tecnología financiera que ofrece una plataforma de análisis de tendencias para el mercado de valores. La plataforma utiliza un algoritmo de aprendizaje automático para identificar tendencias en los precios de las acciones, los índices y otros activos.",
    en: "TrendRating is a financial technology company that offers a trend analysis platform for the stock market. The platform uses a machine learning algorithm to identify trends in stock prices, indices, and other assets.",
  },
  "tr.h1": { es: "Análisis de tendencias con IA", en: "AI-powered trend analysis" },
  "tr.h2": { es: "Análisis de fundamentos", en: "Fundamental analysis" },
  "tr.h3": { es: "Herramienta de backtesting", en: "Backtesting tool" },
  "tr.h4": { es: "Estrategias de inversión", en: "Investment strategies" },
  "tr.clients": { es: "+250 clientes globales · +17,000 activos monitoreados", en: "+250 global clients · +17,000 monitored assets" },
  "tr.algo": {
    es: "La plataforma de TrendRating proporciona un análisis fundamental de cada activo. Su herramienta de backtesting permite a los inversores probar diferentes estrategias con datos históricos. Las estrategias Trendrating han superado rendimientos de fondos de Goldman Sachs.",
    en: "TrendRating's platform provides fundamental analysis of each asset. Its backtesting tool allows investors to test different strategies with historical data. Trendrating strategies have outperformed Goldman Sachs fund returns.",
  },

  // Wealth Management Modal
  "wm.title": { es: "Wealth Management", en: "Wealth Management" },
  "wm.subtitle": { es: "Beyond Money", en: "Beyond Money" },
  "wm.desc1": {
    es: "Cretum Partners redefine la gestión de patrimonio con un enfoque centrado en la confianza como su valor central para el crecimiento sostenible. Su propuesta de Valor Agregado se manifiesta a través de la simplificación de situaciones y procesos financieros complejos, permitiendo a los clientes comprender, manejar y administrar sus activos de manera efectiva.",
    en: "Cretum Partners redefines wealth management with an approach centered on trust as its core value for sustainable growth. Its Value-Added proposition is manifested through the simplification of complex financial situations and processes, enabling clients to understand, manage, and administer their assets effectively.",
  },
  "wm.desc2": {
    es: "El equipo de Cretum Partners, con una trayectoria destacada, ha cultivado relaciones duraderas con clientes, intermediarios y contrapartes. La independencia de conflictos de interés nos posiciona para ofrecer soluciones personalizadas maximizando resultados y minimizando riesgos.",
    en: "The Cretum Partners team, with an outstanding track record, has cultivated lasting relationships with clients, intermediaries, and counterparts. Independence from conflicts of interest positions us to offer personalized solutions maximizing results and minimizing risks.",
  },
  "wm.h1": { es: "Confianza como valor central", en: "Trust as a core value" },
  "wm.h2": { es: "Simplificación de procesos complejos", en: "Simplification of complex processes" },
  "wm.h3": { es: "Independencia de conflictos de interés", en: "Independence from conflicts of interest" },
  "wm.h4": { es: "Relaciones duraderas con clientes", en: "Lasting client relationships" },
  "wm.methodology": { es: "Metodología Top-Down · Valor Relativo · Control de Riesgos (VAR, GARCH, Monte Carlo)", en: "Top-Down Methodology · Relative Value · Risk Control (VaR, GARCH, Monte Carlo)" },

  // Crédito Privado Modal
  "cp.title": { es: "Crédito Privado", en: "Private Credit" },
  "cp.subtitle": { es: "$550 MDP en financiamiento estructurado", en: "$550 MDP in structured financing" },
  "cp.desc": {
    es: "Cretum Partners ofrece soluciones de crédito privado diseñadas para empresas que buscan financiamiento estructurado fuera de los canales bancarios tradicionales, con flexibilidad, rapidez y términos competitivos.",
    en: "Cretum Partners offers private credit solutions designed for companies seeking structured financing outside traditional banking channels, with flexibility, speed, and competitive terms.",
  },
  "cp.h1": { es: "Financiamiento estructurado", en: "Structured financing" },
  "cp.h2": { es: "Fuera de canales bancarios", en: "Outside traditional banking" },
  "cp.h3": { es: "$550 MDP gestionados", en: "$550 MDP managed" },
  "cp.h4": { es: "Términos competitivos y flexibles", en: "Competitive and flexible terms" },

  // Track Record Section
  "tr_section.title": { es: "Track Record", en: "Track Record" },
  "tr_section.subtitle": {
    es: "Más de una década de resultados comprobados gestionando activos institucionales.",
    en: "Over a decade of proven results managing institutional assets.",
  },
  "tr_section.stat1.value": { es: "+$32,110 MDP", en: "+$32,110 MDP" },
  "tr_section.stat1.label": { es: "en activos gestionados", en: "in managed assets" },
  "tr_section.stat2.value": { es: "+12 años", en: "+12 years" },
  "tr_section.stat2.label": { es: "de trayectoria", en: "of track record" },
  "tr_section.stat3.value": { es: "38.02%", en: "38.02%" },
  "tr_section.stat3.label": { es: "retorno GVV 2025", en: "GVV return 2025" },
  "tr_section.stat4.value": { es: "+$370 MDD", en: "+$370 MDD" },
  "tr_section.stat4.label": { es: "movilizados vía MVP", en: "mobilized via MVP" },
  "tr_section.stat5.value": { es: "+400", en: "+400" },
  "tr_section.stat5.label": { es: "inversionistas", en: "investors" },
  "tr_section.afores.title": { es: "Cretum supera consistentemente al promedio de AFORES", en: "Cretum consistently outperforms AFORES average" },
  "tr_section.afores.advantage": { es: "Ventaja sobre AFORES", en: "Advantage over AFORES" },
  "tr_section.aum.title": { es: "Activos Bajo Gestión", en: "Assets Under Management" },
  "tr_section.partners.title": { es: "Socios y Proveedores Institucionales", en: "Partners & Institutional Providers" },

  // Team Section
  "team.title": { es: "Nuestro Equipo", en: "Our Team" },
  "team.subtitle": { es: "Conoce a los profesionales detrás de Cretum Partners", en: "Meet the professionals behind Cretum Partners" },
  "team.directivos": { es: "Equipo Directivo", en: "Executive Team" },
  "team.operativo": { es: "Equipo Operativo", en: "Operations Team" },
  "team.consejeros": { es: "Consejeros Independientes", en: "Independent Advisors" },

  // Directivos
  "team.d1.name": { es: "Alejandro Creixell", en: "Alejandro Creixell" },
  "team.d1.role": { es: "Founder & CEO", en: "Founder & CEO" },
  "team.d1.bio": {
    es: "25 años en el sector financiero al frente de Cretum Partners, firma que administra ~$34 mil MDP. Fundó Pretmex y Lendera, y co-fundó Bulltick, destacado broker dealer en Latinoamérica. Representación de MVP para Latam desde 2016. Estudios en Columbia e Instituto de Finanzas de Nueva York. Consejero en Afore Pensionissste y Afianzadora Aserta.",
    en: "25 years in the financial sector leading Cretum Partners, which manages ~$34B MXN. Founded Pretmex and Lendera, and co-founded Bulltick, a leading broker-dealer in Latin America. MVP representative for Latam since 2016. Studies at Columbia and the New York Institute of Finance. Board advisor at Afore Pensionissste and Afianzadora Aserta.",
  },
  "team.d2.name": { es: "Elliott Olmedo", en: "Elliott Olmedo" },
  "team.d2.role": { es: "Chief Investment Officer", en: "Chief Investment Officer" },
  "team.d2.bio": {
    es: "CIO y socio de Cretum Partners con +10 años de experiencia en renta fija, variable, derivados y divisas. Lic. Contaduría UNAM, Esp. Economía UNAM, Maestría Finanzas ITAM. Ha gestionado portafolios por +$5.9 mil MDP. Lidera la aplicación de modelos de Machine Learning para análisis de sensibilidad y estrategias de cobertura en períodos de alta volatilidad.",
    en: "CIO and partner at Cretum Partners with +10 years of experience in fixed income, equities, derivatives and FX. Accounting degree from UNAM, Economics specialization UNAM, Finance Master's from ITAM. Managed portfolios exceeding $5.9B MXN. Leads Machine Learning models for sensitivity analysis and volatility hedging strategies.",
  },
  "team.d3.name": { es: "Kevin Solórzano", en: "Kevin Solórzano" },
  "team.d3.role": { es: "Investment Manager", en: "Investment Manager" },
  "team.d3.bio": {
    es: "Lic. Finanzas UIA (mención honorífica), Maestría Finanzas ITAM, certificado AMIB Figura III. Ha liderado bursatilizaciones por +$350 MDP y gestionado transacciones de financiamiento privado y estructurado por +$900 MDP. Desde 2024 en Cretum lidera la mesa de renta variable y derivados, diseñando estrategias sofisticadas de inversión y monitoreo de riesgo.",
    en: "Finance degree from UIA (honors), Finance Master's from ITAM, AMIB Figure III certified. Led securitizations of +$350M MXN and managed private/structured financing transactions exceeding +$900M MXN. Since 2024 at Cretum leads the equity and derivatives desk, designing sophisticated investment strategies and risk monitoring.",
  },

  // Equipo Operativo
  "team.o1.name": { es: "Alejandro Ontiveros", en: "Alejandro Ontiveros" },
  "team.o1.role": { es: "Chief Sales Officer", en: "Chief Sales Officer" },
  "team.o1.bio": {
    es: "Lic. Finanzas ITAM y Posgrado en Private Equity & M&A en ESSEC Business School (París). En Cretum desde 2021, especializado en estructuración de CERPIs, fideicomisos y SPVs, levantamiento de capital institucional y relaciones con inversionistas. En paralelo distribuye oportunidades pre-IPO de tecnología de MVP a inversionistas institucionales en América Latina.",
    en: "Finance degree from ITAM and Postgraduate in Private Equity & M&A from ESSEC Business School (Paris). At Cretum since 2021, specializing in structuring CERPIs, trusts and SPVs, institutional capital raising and investor relations. Also distributes MVP's pre-IPO technology opportunities to institutional investors across Latin America.",
  },
  "team.o2.name": { es: "Idalia Gutierrez", en: "Idalia Gutierrez" },
  "team.o2.role": { es: "Chief Administrative Officer", en: "Chief Administrative Officer" },
  "team.o3.name": { es: "Hannah Hernandez", en: "Hannah Hernandez" },
  "team.o3.role": { es: "Sales & Administration Manager", en: "Sales & Administration Manager" },
  "team.o4.name": { es: "Armando Narchi", en: "Armando Narchi" },
  "team.o4.role": { es: "Sales Executive Latam", en: "Sales Executive Latam" },
  "team.o5.name": { es: "Alejandro Magaña", en: "Alejandro Magaña" },
  "team.o5.role": { es: "Sales Executive Latam", en: "Sales Executive Latam" },
  "team.o6.name": { es: "Eugenio Creixell", en: "Eugenio Creixell" },
  "team.o6.role": { es: "Sales Executive Latam", en: "Sales Executive Latam" },
  "team.o7.name": { es: "Melissa Samaniego", en: "Melissa Samaniego" },
  "team.o7.role": { es: "Head of Sales", en: "Head of Sales" },
  "team.o7.bio": {
    es: "+20 años de experiencia en banca privada y asesoría patrimonial para clientes de alto y ultra alto patrimonio en BAC International Bank, Citibank y Scotiabank. Directora de Ventas en Cretum, donde lidera el relacionamiento con inversionistas, desarrollo de nuevos negocios y posicionamiento de soluciones de inversión para clientes institucionales y privados.",
    en: "+20 years of experience in private banking and wealth management for high and ultra-high net worth clients at BAC International Bank, Citibank and Scotiabank. Head of Sales at Cretum, leading investor relations, new business development and positioning investment solutions for institutional and private clients.",
  },
  "team.o8.name": { es: "Angel Gutierrez", en: "Angel Gutierrez" },
  "team.o8.role": { es: "Software Engineer", en: "Software Engineer" },

  // Consejeros Independientes
  "team.c1.name": { es: "Joel Martínez", en: "Joel Martínez" },
  "team.c1.role": { es: "Technical Committee Member", en: "Technical Committee Member" },
  "team.c1.bio": {
    es: "Lic. Economía UNAM y director general de Visor Financiero. Asesora a BlackRock, Afore XXI-Banorte, SIF-ICAP, BMV e IPG Casa de Bolsa. Head Trader de opciones y futuros peso-dólar en Banca Serfín-Santander (1995–1999). Director de redacción de negocios en Infosel (1999–2015). Autor de la columna semanal 'En el Dinero' en Reforma desde 1999 y comentarista financiero en W Radio.",
    en: "Economics degree from UNAM, CEO of Visor Financiero. Advisor to BlackRock, Afore XXI-Banorte, SIF-ICAP, BMV and IPG Casa de Bolsa. Head Trader of peso-dollar options and futures at Banca Serfín-Santander (1995–1999). Business news director at Infosel (1999–2015). Weekly columnist 'En el Dinero' at Reforma since 1999 and financial commentator on W Radio.",
  },
  "team.c2.name": { es: "Vanessa Ramirez de la O", en: "Vanessa Ramirez de la O" },
  "team.c2.role": { es: "Technical Committee Member", en: "Technical Committee Member" },
  "team.c2.bio": {
    es: "Directora de Análisis Económico en ECANAL desde el año 2000. CFO de PMI Comercio Internacional (Pemex) 2019–2021. Trayectoria internacional en Bulltick Capital Markets, Banque Internationale à Luxembourg y Brevan Howard. MBA en Finanzas por INSEAD y Licenciatura en Economía del College of William and Mary.",
    en: "Director of Economic Analysis at ECANAL since 2000. CFO of PMI Comercio Internacional (Pemex) 2019–2021. International career at Bulltick Capital Markets, Banque Internationale à Luxembourg and Brevan Howard. MBA in Finance from INSEAD and Economics degree from the College of William and Mary.",
  },
  "team.c3.name": { es: "Guillermo Reyes-Varela", en: "Guillermo Reyes-Varela" },
  "team.c3.role": { es: "Technical Committee Member", en: "Technical Committee Member" },
  "team.c3.bio": {
    es: "+12 años en gestión de inversiones para Afores y Fondos en México, administrando carteras de deuda, monedas y derivados con activos de 10,000 a 120,000 MDP. Intermediario en el mercado de derivados por +5 años (futuros del peso, Bonos M, swaps MexDer, IRS, Udi-Libor, Udi-TIIE). En los últimos cinco años ha comercializado productos financieros a Afores, fondos de inversión y aseguradoras.",
    en: "+12 years managing investments for Afores and Funds in Mexico, overseeing debt, currency and derivatives portfolios of MXN 10,000–120,000M. Derivatives market intermediary for +5 years (peso futures, Bonos M, MexDer swaps, IRS, Udi-Libor, Udi-TIIE). In the past five years has distributed financial products to Afores, investment funds and insurers.",
  },
  "team.c4.name": { es: "Sergio Zermeño", en: "Sergio Zermeño" },
  "team.c4.role": { es: "Technical Committee Member", en: "Technical Committee Member" },
  "team.c4.bio": {
    es: "Director general y socio fundador de Signus Capital (Wealth Management y Family Office). +30 años de experiencia en mercados locales e internacionales. Managing Director de Mercados y Tesorería en Banco Santander, donde mantuvo a Santander en el top 3 del mercado OTC. Director ejecutivo de Negocios Institucionales en Banco Interacciones, gestionando fondos de pensiones privados a nivel regional.",
    en: "CEO and founding partner of Signus Capital (Wealth Management and Family Office). +30 years of experience in local and international markets. Managing Director of Markets and Treasury at Banco Santander, keeping Santander in the top 3 of the OTC market. Executive Director of Institutional Business at Banco Interacciones, managing regional private pension fund investments.",
  },

  // Metodología Section
  "met.label": { es: "Nuestra Metodología", en: "Our Methodology" },
  "met.title": { es: "Cómo gestionamos su capital", en: "How we manage your capital" },
  "met.ejecucion.label": { es: "Metodología de Ejecución", en: "Execution Methodology" },
  "met.monitoreo.label": { es: "Monitoreo de Riesgos", en: "Risk Monitoring" },

  "met.exec.precio.title": { es: "Precio", en: "Pricing" },
  "met.exec.precio.desc": {
    es: "Determinación del precio deseado para cada instrumento que se desea comprar o vender, comparando precios teóricos vs precios de mercado.",
    en: "Determination of the desired price for each instrument to be bought or sold, comparing theoretical prices vs market prices.",
  },
  "met.exec.modelacion.title": { es: "Modelación de ejecución", en: "Execution modeling" },
  "met.exec.modelacion.desc": {
    es: "Simulación de la posible posición en el portafolio verificando que cumpla con el régimen de inversión, los parámetros del comité y las medidas de riesgo.",
    en: "Simulation of the potential portfolio position, verifying compliance with the investment regime, committee parameters, and risk measures.",
  },
  "met.exec.ejecucion.title": { es: "Ejecución", en: "Execution" },
  "met.exec.ejecucion.desc": {
    es: "Se cotiza con al menos 2 intermediarios bursátiles especializados para lograr el mejor precio posible en cada instrumento.",
    en: "Quotes are obtained from at least 2 specialized brokers to achieve the best possible price for each instrument.",
  },
  "met.exec.control.title": { es: "Control de riesgos", en: "Risk control" },
  "met.exec.control.desc": {
    es: "Estrategias de cobertura para acciones, índices, derivados y monedas durante períodos de estrés y alta volatilidad.",
    en: "Hedging strategies for equities, indices, derivatives, and currencies during periods of stress and high volatility.",
  },

  "met.mon.emisoras.title": { es: "Emisoras", en: "Issuers" },
  "met.mon.emisoras.desc": {
    es: "Seguimiento continuo a eventos relevantes y revisiones a las calificaciones de cada emisor y/o emisión del portafolio.",
    en: "Continuous tracking of relevant events and rating reviews for each issuer and/or issuance in the portfolio.",
  },
  "met.mon.parametros.title": { es: "Parámetros", en: "Parameters" },
  "met.mon.parametros.desc": {
    es: "Se cumple en todo momento con el régimen pre-establecido por el cliente. Si las condiciones de mercado rompen un parámetro, se activa un plan para reestablecerlo.",
    en: "The client's pre-established investment regime is maintained at all times. If market conditions break a parameter, a plan is activated to restore it.",
  },
  "met.mon.medidas_riesgo.title": { es: "Medidas de Riesgo", en: "Risk Measures" },
  "met.mon.medidas_riesgo.desc": {
    es: "Monitoreo continuo del VAR (Value at Risk) mediante metodologías como Simulación Histórica, GARCH, Monte Carlo y RiskMetrics.",
    en: "Continuous monitoring of VAR (Value at Risk) using methodologies such as Historical Simulation, GARCH, Monte Carlo, and RiskMetrics.",
  },
  "met.mon.duracion.title": { es: "Duración y Convexidad", en: "Duration & Convexity" },
  "met.mon.duracion.desc": {
    es: "Se ajusta a los rangos permitidos por el comité técnico, en función del horizonte de inversión, la volatilidad y la política monetaria prevaleciente.",
    en: "Adjusted to the ranges permitted by the technical committee, based on the investment horizon, volatility, and prevailing monetary policy.",
  },
  "met.mon.performance.title": { es: "Medidas de performance", en: "Performance measures" },
  "met.mon.performance.desc": {
    es: "Se analiza el rendimiento por unidad de riesgo de los activos del portafolio respecto a su Benchmark o valor de referencia.",
    en: "Return per unit of risk is analyzed for each portfolio asset against its Benchmark or reference value.",
  },

  "met.partners.title": { es: "Socios Institucionales", en: "Institutional Partners" },

  "method.label": { es: "Nuestra metodología", en: "Our methodology" },
  "method.title": { es: "Cómo gestionamos su capital", en: "How we manage your capital" },
  "method.subtitle": { es: "Cada decisión sigue un proceso riguroso de análisis, ejecución y monitoreo continuo.", en: "Every decision follows a rigorous process of analysis, execution and continuous monitoring." },
  "method.s1.title": { es: "Análisis macro y fundamental", en: "Macro and fundamental analysis" },
  "method.s1.desc": { es: "Evaluamos variables macroeconómicas (PIB, inflación, política monetaria, riesgos geopolíticos) y analizamos la composición óptima por clase de activo según el régimen de cada cliente.", en: "We evaluate macroeconomic variables (GDP, inflation, monetary policy, geopolitical risks) and analyze optimal composition by asset class according to each client's investment regime." },
  "method.s2.title": { es: "Selección de inversiones", en: "Investment selection" },
  "method.s2.desc": { es: "El portfolio manager presenta al comité de inversiones un análisis técnico y fundamental de las emisoras candidatas, optimizando la relación riesgo-retorno.", en: "The portfolio manager presents the investment committee with a technical and fundamental analysis of candidate issuers, optimizing the risk-return ratio." },
  "method.s3.title": { es: "Modelación y mejor ejecución", en: "Modeling and best execution" },
  "method.s3.desc": { es: "Simulamos la posición en portafolio, verificamos cumplimiento del régimen y cotizamos con al menos 2 intermediarios bursátiles para garantizar el mejor precio.", en: "We simulate the portfolio position, verify regime compliance and quote with at least 2 broker-dealers to guarantee the best price." },
  "method.s4.title": { es: "Cobertura y control de riesgos", en: "Hedging and risk control" },
  "method.s4.desc": { es: "Implementamos estrategias de cobertura en acciones, índices, derivados y monedas durante periodos de estrés y alta volatilidad.", en: "We implement hedging strategies in equities, indices, derivatives and currencies during periods of stress and high volatility." },
  "method.s5.title": { es: "Monitoreo continuo", en: "Continuous monitoring" },
  "method.s5.desc": { es: "Seguimiento de emisoras, monitoreo de VaR (Simulación Histórica, GARCH, Monte Carlo), ajuste de duración y convexidad, y medición de performance vs. benchmark.", en: "Issuer tracking, VaR monitoring (Historical Simulation, GARCH, Monte Carlo), duration and convexity adjustment, and performance measurement vs. benchmark." },

  "footer.desc": {
    es: "Passion Beyond Money — Gestión independiente de activos institucionales desde 2014.",
    en: "Passion Beyond Money — Independent institutional asset management since 2014.",
  },
  "footer.links": { es: "Enlaces", en: "Links" },
  "footer.contact": { es: "Contacto", en: "Contact" },
  "footer.disclaimer": {
    es: "La información contenida en este sitio es solo para fines informativos y no constituye asesoría de inversión ni una oferta de venta de valores.",
    en: "The information contained on this site is for informational purposes only and does not constitute investment advice or an offer to sell securities.",
  },
  "footer.rights": {
    es: "© 2026 Cretum Partners. Todos los derechos reservados.",
    en: "© 2026 Cretum Partners. All rights reserved.",
  },

  // WealthManagementModal — extended sections
  "wm.section.analisis":       { es: "Metodología de Análisis",  en: "Analysis Methodology"   },
  "wm.section.ejecucion":      { es: "Metodología de Ejecución", en: "Execution Methodology"  },
  "wm.section.monitoreo":      { es: "Monitoreo de Riesgos",     en: "Risk Monitoring"        },
  "wm.section.afores":         { es: "Rendimiento vs. AFORES",   en: "Performance vs. AFORES" },
  "wm.section.ventajas":       { es: "Ventajas Competitivas",    en: "Competitive Advantages" },
  "wm.section.estructura":     { es: "Estructura Operativa",     en: "Operational Structure"  },
  "wm.analisis.topdown.title": { es: "Enfoque Top-Down",         en: "Top-Down Approach"      },
  "wm.analisis.topdown.desc":  { es: "Partimos del análisis macroeconómico global y local para identificar los sectores y activos con mayor potencial, filtrando de lo general a lo particular.", en: "We start from global and local macroeconomic analysis to identify sectors and assets with the highest potential, filtering from the general to the specific." },
  "wm.analisis.valrel.title":  { es: "Valor Relativo",           en: "Relative Value"         },
  "wm.analisis.valrel.desc":   { es: "Comparamos emisoras y clases de activos dentro de su universo para seleccionar los instrumentos con la mejor relación riesgo-rendimiento en cada momento del ciclo.", en: "We compare issuers and asset classes within their universe to select instruments with the best risk-return ratio at each point in the cycle." },
  "wm.exec.01.title": { es: "Precio",            en: "Pricing"      },
  "wm.exec.01.desc":  { es: "Determinamos niveles de entrada y salida con base en análisis técnico y fundamental.", en: "We determine entry and exit levels based on technical and fundamental analysis." },
  "wm.exec.02.title": { es: "Modelación",        en: "Modeling"     },
  "wm.exec.02.desc":  { es: "Construimos modelos de portafolio que optimizan el binomio riesgo-rendimiento del mandato.", en: "We build portfolio models that optimize the risk-return trade-off of the mandate." },
  "wm.exec.03.title": { es: "Ejecución",         en: "Execution"    },
  "wm.exec.03.desc":  { es: "Operamos con agilidad a través de múltiples intermediarios bursátiles para obtener el mejor precio.", en: "We operate swiftly through multiple broker-dealers to obtain the best price." },
  "wm.exec.04.title": { es: "Control de Riesgos", en: "Risk Control" },
  "wm.exec.04.desc":  { es: "Aplicamos límites de concentración, stop-loss y métricas de drawdown en tiempo real.", en: "We apply concentration limits, stop-loss levels and real-time drawdown metrics." },
  "wm.mon.emisoras.title":    { es: "Emisoras",             en: "Issuers"           },
  "wm.mon.emisoras.desc":     { es: "Seguimiento continuo de fundamentales, calificaciones y eventos corporativos.", en: "Continuous tracking of fundamentals, ratings and corporate events." },
  "wm.mon.parametros.title":  { es: "Parámetros",          en: "Parameters"        },
  "wm.mon.parametros.desc":   { es: "VaR, CVaR, tracking error y límites de concentración por emisora y sector.", en: "VaR, CVaR, tracking error and concentration limits by issuer and sector." },
  "wm.mon.medidas.title":     { es: "Medidas de Riesgo",   en: "Risk Measures"     },
  "wm.mon.medidas.desc":      { es: "Volatilidad, correlaciones y análisis de escenarios de stress.", en: "Volatility, correlations and stress scenario analysis." },
  "wm.mon.duracion.title":    { es: "Duración y Convexidad", en: "Duration & Convexity" },
  "wm.mon.duracion.desc":     { es: "Gestión activa de la sensibilidad a tasas de interés en carteras de renta fija.", en: "Active management of interest rate sensitivity in fixed income portfolios." },
  "wm.mon.performance.title": { es: "Performance",         en: "Performance"       },
  "wm.mon.performance.desc":  { es: "Alpha, Sharpe, Sortino y atribución de retornos vs. benchmark.", en: "Alpha, Sharpe, Sortino and return attribution vs. benchmark." },
  "wm.afores.subtitle": { es: "Retorno anual neto del portafolio Cretum vs. promedio AFORES Siefore Básica Pensiones.", en: "Annual net return of Cretum portfolio vs. AFORES Siefore Básica Pensiones average." },
  "wm.afores.note":     { es: "vs. AFORES", en: "vs. AFORES" },
  "wm.ventaja.1.title": { es: "Agilidad",               en: "Agility"             },
  "wm.ventaja.1.desc":  { es: "2–3× más rápido que otros manejadores para ejecutar decisiones de inversión.", en: "2–3× faster than other managers to execute investment decisions." },
  "wm.ventaja.2.title": { es: "Independencia",           en: "Independence"        },
  "wm.ventaja.2.desc":  { es: "No dependemos de ninguna casa de bolsa; trabajamos con todas ellas.", en: "We are not tied to any brokerage; we work with all of them." },
  "wm.ventaja.3.title": { es: "Atención Personalizada",  en: "Personalized Service"},
  "wm.ventaja.3.desc":  { es: "Update mensual y reuniones periódicas con cada cliente.", en: "Monthly updates and periodic meetings with each client." },
  "wm.ventaja.4.title": { es: "Radar",                   en: "Market Radar"        },
  "wm.ventaja.4.desc":  { es: "Anticipamos cambios y tendencias antes que los demás.", en: "We anticipate changes and trends before others." },
  "wm.ventaja.5.title": { es: "Flexibilidad",            en: "Flexibility"         },
  "wm.ventaja.5.desc":  { es: "Nos adecuamos al régimen de inversión de cualquier mandato.", en: "We adapt to the investment regime of any mandate." },
  "wm.node.cliente.label":    { es: "Cliente",                  en: "Client"                  },
  "wm.node.cliente.sub":      { es: "Institución o persona",    en: "Institution or individual"},
  "wm.node.fiduciaria.label": { es: "Entidad Fiduciaria",       en: "Fiduciary Entity"         },
  "wm.node.fiduciaria.sub":   { es: "Administración del fideicomiso", en: "Trust administration" },
  "wm.node.mandato.label":    { es: "Mandato / Intermediario",  en: "Mandate / Intermediary"   },
  "wm.node.mandato.sub":      { es: "Ejecución bursátil",       en: "Brokerage execution"      },
  "wm.node.custodio.label":   { es: "Custodio",                 en: "Custodian"                },
  "wm.node.custodio.sub":     { es: "Resguardo de valores",     en: "Securities custody"       },
  "wm.cretum.role":           { es: "Planeación de Riesgos y Estrategia de Inversión", en: "Risk Planning and Investment Strategy" },

  // TrendratingModal — extended
  "tr.kpi1.label": { es: "Activos monitoreados",       en: "Monitored assets"            },
  "tr.kpi1.sub":   { es: "Acciones, ETFs, índices globales", en: "Equities, ETFs, global indices" },
  "tr.kpi2.label": { es: "Clientes institucionales",   en: "Institutional clients"       },
  "tr.kpi2.sub":   { es: "Fondos, bancos privados, family offices", en: "Funds, private banks, family offices" },
  "tr.kpi3.label": { es: "Indicadores técnicos",       en: "Technical indicators"        },
  "tr.kpi3.sub":   { es: "Evaluados diariamente con IA", en: "Evaluated daily with AI"   },
  "tr.kpi4.label": { es: "Historial de datos",         en: "Data history"                },
  "tr.kpi4.sub":   { es: "Backtesting con datos reales", en: "Backtesting with real data"},
  "tr.kpi5.label": { es: "Indicadores probados",       en: "Tested indicators"           },
  "tr.kpi5.sub":   { es: "En R&D antes de seleccionar los 8", en: "In R&D before selecting the 8" },
  "tr.kpi6.label": { es: "Horizonte de tendencia",     en: "Trend horizon"               },
  "tr.kpi6.sub":   { es: "Ciclos institucionales de capital", en: "Institutional capital cycles" },
  "tr.tcr.a.label": { es: "Tendencia alcista muy fuerte", en: "Very strong uptrend"   },
  "tr.tcr.a.desc":  { es: "Sobreponderación máxima. Capital institucional fluyendo fuertemente.", en: "Maximum overweight. Institutional capital flowing strongly." },
  "tr.tcr.b.label": { es: "Tendencia alcista",            en: "Uptrend"                },
  "tr.tcr.b.desc":  { es: "Señal de compra / sobreponderación. Momentum positivo confirmado.", en: "Buy signal / overweight. Positive momentum confirmed." },
  "tr.tcr.c.label": { es: "Fase bajista",                 en: "Bearish phase"          },
  "tr.tcr.c.desc":  { es: "Subponderación / evitar. Tendencia negativa en curso.", en: "Underweight / avoid. Negative trend in progress." },
  "tr.tcr.d.label": { es: "Tendencia bajista muy fuerte", en: "Very strong downtrend"  },
  "tr.tcr.d.desc":  { es: "Señal de venta / salida. Capital institucional saliendo.", en: "Sell signal / exit. Institutional capital exiting." },
  "tr.signal.pos.title": { es: "A + B = Señal positiva",       en: "A + B = Positive Signal"      },
  "tr.signal.pos.sub":   { es: "Sobreponderación / Compra",    en: "Overweight / Buy"             },
  "tr.signal.neg.title": { es: "C + D = Señal negativa",       en: "C + D = Negative Signal"      },
  "tr.signal.neg.sub":   { es: "Subponderación / Venta / Evitar", en: "Underweight / Sell / Avoid"},
  "tr.section.tcr":           { es: "Sistema de calificación TCR — Trend Capture Rating", en: "TCR Rating System — Trend Capture Rating" },
  "tr.section.oportunidad":   { es: "La oportunidad — dispersión en el S&P 500", en: "The Opportunity — S&P 500 Dispersion" },
  "tr.section.indicadores":   { es: "8 indicadores técnicos — evaluados diariamente", en: "8 Technical Indicators — Evaluated Daily" },
  "tr.section.cobertura":     { es: "Cobertura internacional de mercados", en: "International Market Coverage" },
  "tr.section.reconocimientos": { es: "Reconocimientos", en: "Awards & Recognition" },
  "tr.founded": {
    es: "Fundada en 2013 por Rocco Pellegrinelli — creador de Brainpower (adquirida por Bloomberg en 2006). Sede en Lugano, con oficinas en Londres y Boston. Socios estratégicos: Bloomberg, Euronext y FactSet.",
    en: "Founded in 2013 by Rocco Pellegrinelli — creator of Brainpower (acquired by Bloomberg in 2006). Headquartered in Lugano, with offices in London and Boston. Strategic partners: Bloomberg, Euronext and FactSet.",
  },
  "tr.tcr.desc": {
    es: "El TCR mide la dirección y calidad de las tendencias en un horizonte de 6 a 18 meses — capturando flujos institucionales de capital y filtrando el ruido de corto plazo.",
    en: "The TCR measures the direction and quality of trends over a 6 to 18-month horizon — capturing institutional capital flows and filtering out short-term noise.",
  },
  "tr.oport.desc": {
    es: "Dentro de cualquier índice existe una brecha de 40–70 puntos porcentuales entre los mejores y peores activos cada año. El TCR permite identificar esa diferencia antes que el mercado.",
    en: "Within any index there is a 40–70 percentage point gap between the best and worst assets each year. The TCR allows you to identify that difference ahead of the market.",
  },
  "tr.oport.spread_top.sub": { es: "Spread Top 25%\nvs Índice (promedio)", en: "Top 25% Spread\nvs Index (avg)" },
  "tr.oport.funds.sub":      { es: "Fondos activos que\nno baten al benchmark", en: "Active funds that\nfail to beat the benchmark" },
  "tr.oport.spread_bot.sub": { es: "Spread Bottom 25%\nvs Índice (promedio)", en: "Bottom 25% Spread\nvs Index (avg)" },
  "tr.ind.desc": {
    es: "De más de 350 indicadores probados durante R&D, el algoritmo seleccionó estos 8 como los de mayor capacidad predictiva para identificar tendencias sostenidas de 6 a 18 meses.",
    en: "Of more than 350 indicators tested during R&D, the algorithm selected these 8 as having the highest predictive capacity for identifying sustained 6 to 18-month trends.",
  },
  "tr.ind.adx.desc":  { es: "Mide la fuerza de la tendencia, independientemente de su dirección.", en: "Measures trend strength regardless of its direction." },
  "tr.ind.tema.desc": { es: "Suaviza precios eliminando ruido de corto plazo.", en: "Smooths prices by eliminating short-term noise." },
  "tr.ind.kvo.desc":  { es: "Analiza el flujo de volumen para anticipar reversiones de tendencia.", en: "Analyzes volume flow to anticipate trend reversals." },
  "tr.ind.mfi.desc":  { es: "RSI ponderado por volumen — detecta sobrecompra/sobreventa.", en: "Volume-weighted RSI — detects overbought/oversold conditions." },
  "tr.ind.pfe.desc":  { es: "Mide la eficiencia del movimiento del precio en el tiempo.", en: "Measures the efficiency of price movement over time." },
  "tr.ind.roc.desc":  { es: "Velocidad del movimiento de precios en un período determinado.", en: "Speed of price movement over a given period." },
  "tr.ind.rvi.desc":  { es: "Compara precio de cierre vs rango de la vela para medir vigor.", en: "Compares closing price vs candle range to measure vigor." },
  "tr.ind.arn.desc":  { es: "Identifica inicio de nuevas tendencias y su fortaleza relativa.", en: "Identifies the start of new trends and their relative strength." },
  "tr.region.japan":   { es: "Japón",    en: "Japan"       },
  "tr.region.germany": { es: "Alemania", en: "Germany"     },
  "tr.region.france":  { es: "Francia",  en: "France"      },
  "tr.region.canada":  { es: "Canadá",   en: "Canada"      },
  "tr.region.swiss":   { es: "Suiza",    en: "Switzerland" },
  "tr.region.korea":   { es: "Corea",    en: "S. Korea"    },
  "tr.region.arabia":  { es: "Arabia",   en: "Arabia"      },
  "tr.coverage.desc": {
    es: "La plataforma monitorea acciones, ETFs e índices en mercados globales, clasificando por sector e industria con calificaciones TCR en tiempo real para comparaciones entre países y sectores.",
    en: "The platform monitors equities, ETFs and indices across global markets, classifying by sector and industry with real-time TCR ratings for country and sector comparisons.",
  },
  "tr.coverage.sectores": { es: "Sectores cubiertos",  en: "Covered sectors"       },
  "tr.coverage.stocks":   { es: "Acciones comunes",    en: "Common stocks"         },
  "tr.coverage.etfs":     { es: "Fondos cotizados",    en: "Exchange-traded funds" },
  "tr.coverage.indices":  { es: "Benchmarks globales", en: "Global benchmarks"     },
  "tr.source": { es: "Fuente: Trendrating / datos de constituyentes del S&P 500", en: "Source: Trendrating / S&P 500 constituent data" },

  // ServicesSection — Partners
  "partner.bny.role":       { es: "Custodia y administración de activos", en: "Asset custody and administration" },
  "partner.bny.desc":       { es: "Uno de los bancos custodios más grandes del mundo con $50T+ en activos bajo custodia. Provee servicios de liquidación, custodia y administración de fondos para Cretum.", en: "One of the world's largest custodian banks with $50T+ in assets under custody. Provides settlement, custody and fund administration services for Cretum." },
  "partner.nav.role":       { es: "Administración de fondos", en: "Fund administration" },
  "partner.nav.desc":       { es: "Firma especializada en cálculo de NAV (Net Asset Value), contabilidad de fondos y reporting para gestoras de activos. Garantiza precisión y transparencia en la valuación diaria.", en: "Firm specialized in NAV calculation, fund accounting and reporting for asset managers. Ensures accuracy and transparency in daily valuation." },
  "partner.deloitte.role":  { es: "Auditoría externa", en: "External audit" },
  "partner.deloitte.desc":  { es: "Big 4 global con presencia en 150+ países. Provee auditoría independiente de los estados financieros de los fondos de Cretum, garantizando estándares internacionales.", en: "Global Big 4 with presence in 150+ countries. Provides independent audit of Cretum's fund financial statements, ensuring international standards." },
  "partner.bloomberg.role": { es: "Datos de mercado y análisis", en: "Market data and analytics" },
  "partner.bloomberg.desc": { es: "Proveedor líder de datos financieros en tiempo real, noticias y analítica. La terminal Bloomberg es la herramienta central del equipo de inversión de Cretum.", en: "Leading provider of real-time financial data, news and analytics. The Bloomberg terminal is the core tool of Cretum's investment team." },
  "partner.gs.role":        { es: "Prime broker y ejecución", en: "Prime brokerage and execution" },
  "partner.gs.desc":        { es: "Banco de inversión global líder. Actúa como prime broker y contraparte de ejecución para operaciones de renta variable y derivados.", en: "Leading global investment bank. Acts as prime broker and execution counterparty for equity and derivatives operations." },
  "partner.ubs.role":       { es: "Prime broker y custodia", en: "Prime brokerage and custody" },
  "partner.ubs.desc":       { es: "Banco suizo con presencia en 50+ países. Provee servicios de prime brokerage, custodia internacional y acceso a mercados globales.", en: "Swiss bank with presence in 50+ countries. Provides prime brokerage, international custody and access to global markets." },
  "partner.ms.role":        { es: "Ejecución y brokerage", en: "Execution and brokerage" },
  "partner.ms.desc":        { es: "Banco de inversión global con capacidad de ejecución en todos los mercados. Cretum lo utiliza como intermediario bursátil para optimizar el precio de ejecución.", en: "Global investment bank with execution capabilities in all markets. Cretum uses it as a broker-dealer to optimize execution price." },
  "partner.ce.role":        { es: "Investigación macroeconómica", en: "Macroeconomic research" },
  "partner.ce.desc":        { es: "Firma independiente de análisis macroeconómico con cobertura de 200+ economías. Sus reportes fundamentan el análisis top-down del equipo de inversión de Cretum.", en: "Independent macroeconomic analysis firm covering 200+ economies. Its reports underpin the top-down analysis of Cretum's investment team." },
  "partner.rga.role":       { es: "Asesoría fiscal y contable", en: "Tax and accounting advisory" },
  "partner.rga.desc":       { es: "Firma de consultoría especializada en contabilidad y planeación fiscal para empresas del sector financiero. Provee asesoría regulatoria y cumplimiento fiscal.", en: "Consulting firm specializing in accounting and tax planning for financial sector companies. Provides regulatory advisory and tax compliance." },
  "partner.tr.role":        { es: "Plataforma de análisis cuantitativo", en: "Quantitative analysis platform" },
  "partner.tr.desc":        { es: "Fintech suiza con algoritmos de machine learning para identificar tendencias en 17,000+ activos. Cretum licencia su plataforma para análisis cuantitativo sistemático.", en: "Swiss fintech with machine learning algorithms to identify trends in 17,000+ assets. Cretum licenses its platform for systematic quantitative analysis." },

  // Shared — AUM chart & org structure
  "common.distribucion":     { es: "Distribución",             en: "Distribution"      },
  "aum.mandatos_gov":        { es: "Mandatos Gubernamentales", en: "Government Mandates"},
  "aum.credito_privado":     { es: "Crédito Privado",          en: "Private Credit"    },
  "aum.mandatos_familias":   { es: "Mandatos Familias",        en: "Family Mandates"   },
  "org.gestion_patrimonial": { es: "Gestión Patrimonial",      en: "Wealth Management" },
  "org.gvv.desc": { es: "Fondo de cobertura con estrategias en renta variable larga y corta.", en: "Hedge fund with long and short equity strategies." },
  "org.mvp.desc": { es: "Acceso a pre-IPO de las principales empresas tecnológicas de EE.UU.", en: "Access to pre-IPO opportunities in leading U.S. technology companies." },
  "org.wm.desc":  { es: "Gestión patrimonial personalizada para familias de alto patrimonio.", en: "Personalized wealth management for high-net-worth families." },
  "org.tr.desc":  { es: "Sistema cuantitativo de señales de tendencia para toma de decisiones.", en: "Quantitative trend signal system for investment decision-making." },
  "org.tr.stat":  { es: "17,000+ acciones · 350+ clientes institucionales · 12 regiones", en: "17,000+ stocks · 350+ institutional clients · 12 regions" },
  "org.tr.feat1": { es: "Rating TCR: A-B-C-D por convicción", en: "TCR Rating: A-B-C-D by conviction" },
  "org.tr.feat2": { es: "8 indicadores técnicos propietarios", en: "8 proprietary technical indicators" },
  "org.tr.feat3": { es: "Cobertura en EE.UU., Europa y Asia", en: "Coverage across US, Europe and Asia" },
  "org.wm.stat":  { es: "+7.02% vs AFORES en 2022 · Renta fija, variable y ETFs", en: "+7.02% vs AFORES in 2022 · Fixed income, equities and ETFs" },
  "org.wm.feat1": { es: "Análisis top-down + selección de valores", en: "Top-down analysis + stock selection" },
  "org.wm.feat2": { es: "Portafolios diversificados en instrumentos públicos", en: "Diversified portfolios in public instruments" },
  "org.wm.feat3": { es: "Monitoreo de riesgo: VaR, duración y performance", en: "Risk monitoring: VaR, duration and performance" },
  "org.mvp.stat": { es: "$1.7B AUM · 70+ compañías · Bloomberg Top 10", en: "$1.7B AUM · 70+ companies · Bloomberg Top 10" },
  "org.mvp.feat1":{ es: "IRR 56% (Fund III) vs 12% benchmark VC", en: "IRR 56% (Fund III) vs 12% VC benchmark" },
  "org.mvp.feat2":{ es: "Portfolio: SpaceX, Anthropic, Groq, Figure AI", en: "Portfolio: SpaceX, Anthropic, Groq, Figure AI" },
  "org.mvp.feat3":{ es: "#9 Global Top Secondaries Buyer (PitchBook)", en: "#9 Global Top Secondaries Buyer (PitchBook)" },
  "org.gvv.stat": { es: "+14.57% anualizado · 3.71x Sharpe · 76% skin-in-game", en: "+14.57% annualized · 3.71x Sharpe · 76% skin-in-game" },
  "org.gvv.growth.label": { es: "Growth", en: "Growth" },
  "org.gvv.growth.desc":  { es: "Posiciones pre-IPO: Anthropic, SpaceX, Groq — 29% del portafolio vía co-inversión con Manhattan VP.", en: "Pre-IPO positions: Anthropic, SpaceX, Groq — 29% of portfolio via co-investment with Manhattan VP." },
  "org.gvv.value.label":  { es: "Value", en: "Value" },
  "org.gvv.value.desc":   { es: "Acciones de valor en mercados públicos. Retornos realizados: BT Group +100.7%, Intesa Sanpaolo +82.7%.", en: "Value stocks in public markets. Realized returns: BT Group +100.7%, Intesa Sanpaolo +82.7%." },
  "org.gvv.hedge.label":  { es: "Volatility", en: "Volatility" },
  "org.gvv.hedge.desc":   { es: "Estrategias algorítmicas con derivados. S&P 500 CAGR 21.66%, Russell 2000 CAGR 59.81%.", en: "Algorithmic derivative strategies. S&P 500 CAGR 21.66%, Russell 2000 CAGR 59.81%." },

  // Org structure — short card descriptions
  "org.mvp.short": {
    es: "Acceso a las principales tecnológicas antes de su IPO a través de operaciones secundarias: SpaceX, Anthropic, OpenAI, Databricks.",
    en: "Access to leading tech companies before their IPO via secondary transactions: SpaceX, Anthropic, OpenAI, Databricks.",
  },
  "org.cp.desc": {
    es: "Financiamiento privado directo y estructurado para empresas en etapas de crecimiento, fuera de los canales bancarios tradicionales.",
    en: "Direct and structured private financing for growth-stage companies, outside traditional banking channels.",
  },
  "org.gvv.short": {
    es: "Fondo multi-estrategia con posiciones en pre-IPO (Growth), renta variable pública (Value) y derivados algorítmicos (Volatility).",
    en: "Multi-strategy fund with pre-IPO positions (Growth), public equities (Value) and algorithmic derivatives (Volatility).",
  },
  "org.tr.short": {
    es: "Plataforma cuantitativa con 8 indicadores propietarios sobre 17,000+ activos en 12 regiones. Utilizada por 350+ instituciones.",
    en: "Quantitative platform with 8 proprietary indicators across 17,000+ assets in 12 regions. Used by 350+ institutions.",
  },
  "org.wm.short": {
    es: "Gestión patrimonial institucional para familias de alto patrimonio, con rendimientos consistentemente superiores al benchmark AFORES.",
    en: "Institutional wealth management for high-net-worth families, with returns consistently above the AFORES benchmark.",
  },
  "tr_section.stat2.suffix": { es: " años",                    en: " years"            },

  // MVPModal — extended
  "mvp.kpi1.label": { es: "Capital desplegado",         en: "Capital deployed"             },
  "mvp.kpi1.sub":   { es: "En empresas privadas de tecnología", en: "In private technology companies" },
  "mvp.kpi2.label": { es: "Empresas en portafolio",     en: "Portfolio companies"          },
  "mvp.kpi2.sub":   { es: "Activas y exitadas",         en: "Active and exited"            },
  "mvp.kpi3.label": { es: "DPI (fondos maduros)",       en: "DPI (mature funds)"           },
  "mvp.kpi3.sub":   { es: "Distributed to paid-in capital", en: "Distributed to paid-in capital" },
  "mvp.kpi4.label": { es: "Holding period",             en: "Holding period"               },
  "mvp.kpi4.sub":   { es: "Retorno de capital más rápido", en: "Faster capital return"     },
  "mvp.kpi5.label": { es: "Volumen histórico ITD",      en: "Historical volume ITD"        },
  "mvp.kpi5.sub":   { es: "Transacciones facilitadas",  en: "Transactions facilitated"     },
  "mvp.kpi6.label": { es: "Inversores globales",        en: "Global investors"             },
  "mvp.kpi6.sub":   { es: "Clientes institucionales",   en: "Institutional clients"        },
  "mvp.platform.principal.desc": { es: "Fondos VC diversificados y co-inversiones vía RIA registrada ante la SEC.", en: "Diversified VC funds and co-investments via SEC-registered RIA." },
  "mvp.platform.advisor.desc":   { es: "Secondary-as-a-Service™ — soluciones de liquidez a compañías privadas.", en: "Secondary-as-a-Service™ — liquidity solutions for private companies." },
  "mvp.platform.agent.desc":     { es: "Brokerage institucional ($10M+) a través de VNTR Securities LLC (Broker-Dealer).", en: "Institutional brokerage ($10M+) through VNTR Securities LLC (Broker-Dealer)." },
  "mvp.platform.research.desc":  { es: "Manhattan Venture Research — informes privados y reporte mensual Venture Bytes.", en: "Manhattan Venture Research — private reports and monthly Venture Bytes report." },
  "mvp.section.platform":    { es: "Plataforma integrada",           en: "Integrated platform"          },
  "mvp.section.recognition": { es: "Reconocimiento institucional",   en: "Institutional recognition"    },
  "mvp.section.trackrecord": { es: "Track record — All-Star Funds",  en: "Track record — All-Star Funds" },
  "mvp.section.secondary":   { es: "Mercado secundario de VC — volumen directo", en: "VC secondary market — direct volume" },
  "mvp.section.tender":      { es: "Demanda institucional — Tender offers (últimos 24 meses)", en: "Institutional demand — Tender offers (last 24 months)" },
  "mvp.section.returns":     { es: "Retorno anualizado a 10 años por sector", en: "10-year annualized return by sector" },
  "mvp.section.mag7":        { es: "El nuevo \"Magnificent 7\" — privado", en: "The new \"Magnificent 7\" — private" },
  "mvp.trackrecord.desc": {
    es: "Consistentemente supera el top decil de los competidores en la mitad del tiempo — duración promedio de fondos: 3.7 años",
    en: "Consistently outperforms the top decile of competitors in half the time — average fund duration: 3.7 years",
  },
  "mvp.vol.2024":      { es: "Volumen en 2024",           en: "Volume in 2024"          },
  "mvp.vol.universe":  { es: "Universo de inversión MVP", en: "MVP investment universe" },
  "mvp.vol.drypowder": { es: "VC Dry Powder (Q1 2025)",   en: "VC Dry Powder (Q1 2025)" },
  "mvp.source.pitchbook": { es: "Fuente: PitchBook, Bloomberg, CNBC",    en: "Source: PitchBook, Bloomberg, CNBC"    },
  "mvp.source.iv":        { es: "Fuente: Industry Ventures, PitchBook",  en: "Source: Industry Ventures, PitchBook"  },
  "mvp.source.spdr":      { es: "Retorno anualizado de ETFs SPDR — 10 años a 10/31/2025", en: "SPDR ETF annualized return — 10 years to 10/31/2025" },
  "mvp.mag7.desc": {
    es: "Las empresas más valiosas del mundo ya no están en bolsa. El acceso a estas compañías requiere exposición en mercados privados — exactamente donde MVP opera.",
    en: "The world's most valuable companies are no longer listed. Access requires exposure to private markets — exactly where MVP operates.",
  },
  "mvp.age.public.label":  { es: "Edad media en IPO — Mag 7 público",  en: "Median age at IPO — public Mag 7"   },
  "mvp.age.private.label": { es: "Edad media actual — Mag 7 privado",  en: "Current median age — private Mag 7" },
  "mvp.pitchbook.desc":    { es: "25 transacciones como comprador institucional directo de VC secondaries a nivel global", en: "25 transactions as a direct institutional buyer of VC secondaries globally" },
  "mvp.tooltip.volume":    { es: "Volumen",            en: "Volume"            },
  "mvp.tooltip.returns":   { es: "Retorno anualizado", en: "Annualized return" },
  "mvp.popup.founded":     { es: "Fundada",            en: "Founded"           },
  "mvp.popup.status":      { es: "Estado",             en: "Status"            },
  "mvp.popup.valuation":   { es: "Valuación",          en: "Valuation"         },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const t = (key: string) => translations[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
