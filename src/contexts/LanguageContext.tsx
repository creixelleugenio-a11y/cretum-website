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
  "about.structure.title": { es: "Estructura Corporativa", en: "Corporate Structure" },
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
