import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Building2, Globe, FileText, TrendingUp, Shield, Search, Briefcase, ChevronDown, X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MVPWorldMap } from "@/components/MVPWorldMap";

// ── Static data (numbers, logos — not translated) ─────────────────────────

const kpiValues = ["$1.7B", "70+", "~2.2x", "<4 años", "$2.7B", "1,100+"];

const kpiKeys = [
  { labelKey: "mvp.kpi1.label", subKey: "mvp.kpi1.sub" },
  { labelKey: "mvp.kpi2.label", subKey: "mvp.kpi2.sub" },
  { labelKey: "mvp.kpi3.label", subKey: "mvp.kpi3.sub" },
  { labelKey: "mvp.kpi4.label", subKey: "mvp.kpi4.sub" },
  { labelKey: "mvp.kpi5.label", subKey: "mvp.kpi5.sub" },
  { labelKey: "mvp.kpi6.label", subKey: "mvp.kpi6.sub" },
];

const platformDefs = [
  { icon: Briefcase,  title: "Principal", descKey: "mvp.platform.principal.desc" },
  { icon: TrendingUp, title: "Advisor",   descKey: "mvp.platform.advisor.desc"   },
  { icon: Globe,      title: "Agent",     descKey: "mvp.platform.agent.desc"     },
  { icon: Search,     title: "Research",  descKey: "mvp.platform.research.desc"  },
];

const dpiData = [
  { fund: "Fund I",   mvp: 1.8, vc: 1.6, sec: null },
  { fund: "Fund II",  mvp: 2.1, vc: 1.2, sec: null },
  { fund: "Fund III", mvp: 2.1, vc: 1.2, sec: 1.4  },
];

const irrData = [
  { fund: "Fund I",   mvp: 23, vc: 14, sec: null },
  { fund: "Fund II",  mvp: 34, vc: 12, sec: null },
  { fund: "Fund III", mvp: 56, vc: 12, sec: 28   },
];

const volumeData = [
  { year:"'12", v:13 }, { year:"'13", v:14 }, { year:"'14", v:16 },
  { year:"'15", v:19 }, { year:"'16", v:23 }, { year:"'17", v:28 },
  { year:"'18", v:33 }, { year:"'19", v:42 }, { year:"'20", v:34 },
  { year:"'21", v:60 }, { year:"'22", v:53 }, { year:"'23", v:63 },
  { year:"'24", v:69 },
];

const tenderOffers = [
  { company: "Databricks", volume: 10000 },
  { company: "OpenAI",     volume: 9700  },
  { company: "SpaceX",     volume: 2300  },
  { company: "Canva",      volume: 1600  },
  { company: "Stripe",     volume: 1333  },
  { company: "CoreWeave",  volume: 1292  },
  { company: "Figma",      volume: 900   },
  { company: "Revolut",    volume: 500   },
];

const sectorReturns = [
  { sector: "Technology",    ret: 23 },
  { sector: "Industrials",   ret: 13 },
  { sector: "Consumer Disc.",ret: 13 },
  { sector: "Financials",    ret: 12 },
  { sector: "Utilities",     ret: 11 },
  { sector: "Health Care",   ret: 9  },
  { sector: "Energy",        ret: 7  },
];

const privMag7 = [
  { name: "SpaceX",     val: "$1.25T"  },
  { name: "OpenAI",     val: "$852B"   },
  { name: "Anthropic",  val: "$380B"   },
  { name: "Stripe",     val: "$159B"   },
  { name: "Databricks", val: "$134B"   },
  { name: "Revolut",    val: "$75B"    },
  { name: "Canva",      val: "$42B"    },
];

interface CompanyBase {
  name: string;
  logo: string;
  darkBg?: boolean;
  founded: string;
  services: string[];
  section: "current" | "exits";
}

interface CompanyTexts {
  sector: string;
  desc: string;
  status: string;
  note: string;
}

const companiesBase: CompanyBase[] = [
  // ── Current Portfolio ──────────────────────────────────────────────────
  { section: "current", name: "SpaceX",           logo: "/logos/mvp/spacex.svg",          founded: "2002", services: ["Rocket Launch", "Starlink", "Satellite Services", "Space Tourism", "Govt. Contracts"] },
  { section: "current", name: "Anthropic",         logo: "/logos/mvp/anthropic.svg",       founded: "2021", services: ["Claude AI", "API Access", "Enterprise AI", "AI Safety Research", "Model Development"] },
  { section: "current", name: "Groq",              logo: "/logos/mvp/groq.png",            founded: "2016", services: ["LPU Chips", "AI Inference API", "Cloud Inference", "LLM Acceleration", "Enterprise AI"] },
  { section: "current", name: "Figure AI",         logo: "/logos/mvp/figure-ai.svg",       founded: "2022", services: ["Humanoid Robots", "Warehouse Automation", "AI Motor Control", "Manufacturing", "Industrial AI"] },
  { section: "current", name: "Epirus",            logo: "/logos/mvp/epirus.png",          founded: "2018", services: ["HPM Systems", "Counter-Drone", "Electronic Warfare", "Power Electronics", "Defense Tech"] },
  { section: "current", name: "Addepar",           logo: "/logos/mvp/addepar.png",         founded: "2009", services: ["Portfolio Analytics", "Reporting", "Data Aggregation", "Client Portal", "Risk Analysis"] },
  { section: "current", name: "Agility Robotics",  logo: "/logos/mvp/agility-robotics.png",founded: "2015", services: ["Bipedal Robots", "Warehouse Automation", "Robot-as-a-Service", "Manufacturing", "Logistics"] },
  { section: "current", name: "Automattic",        logo: "/logos/mvp/automattic.png",      founded: "2005", services: ["WordPress.com", "WooCommerce", "Tumblr", "Jetpack", "Akismet"] },
  { section: "current", name: "Base Power",        logo: "/logos/mvp/base-power.png",      founded: "2022", services: ["Home Batteries", "Grid Services", "Energy Storage", "Virtual Power Plant", "Demand Response"] },
  { section: "current", name: "BlueVoyant",        logo: "/logos/mvp/bluevoyant.png",      founded: "2017", services: ["Supply Chain Defense", "Internal Defense", "MSSP", "Threat Intelligence", "SOC-as-a-Service"] },
  { section: "current", name: "Bolt",              logo: "/logos/mvp/bolt.png",            founded: "2014", services: ["One-Click Checkout", "Fraud Detection", "Payment Processing", "Merchant Network", "SSO Commerce"] },
  { section: "current", name: "Capella Space",     logo: "/logos/mvp/capella-space.png",   founded: "2016", services: ["SAR Imagery", "Satellite Tasking", "Geospatial Analytics", "Defense Intelligence", "Environmental Monitoring"] },
  { section: "current", name: "CHAOS Industries",  logo: "/logos/mvp/chaos-industries.png",founded: "2021", services: ["AI Defense Systems", "Electronic Warfare", "C-sUAS", "Autonomy", "Counter-Drone"] },
  { section: "current", name: "Cohere",            logo: "/logos/mvp/cohere.png",          founded: "2019", services: ["Command LLM", "Embed", "Rerank", "RAG Solutions", "Enterprise AI"] },
  { section: "current", name: "Cohesity",          logo: "/logos/mvp/cohesity.png",        founded: "2013", services: ["Data Backup", "Ransomware Protection", "Data Security", "Multi-Cloud Mgmt.", "DataHawk"] },
  { section: "current", name: "Databricks",        logo: "/logos/mvp/databricks.png",      founded: "2013", services: ["Data Lakehouse", "Apache Spark", "MLflow", "Delta Lake", "Unity Catalog"] },
  { section: "current", name: "Discord",           logo: "/logos/mvp/discord.png",         founded: "2015", services: ["Voice Chat", "Text Channels", "Community Servers", "Nitro Subscriptions", "Developer Tools"] },
  { section: "current", name: "Epic Games",        logo: "/logos/mvp/epic-games.png",      founded: "1991", services: ["Fortnite", "Unreal Engine", "Epic Games Store", "MetaHuman", "UEFN"] },
  { section: "current", name: "Flexport",          logo: "/logos/mvp/flexport.png",        founded: "2013", services: ["Freight Forwarding", "Supply Chain Visibility", "Customs Brokerage", "Warehousing", "Ocean & Air Freight"] },
  { section: "current", name: "Forto",             logo: "/logos/mvp/forto.png",           founded: "2016", services: ["Digital Freight", "Supply Chain Mgmt.", "Ocean Freight", "Air Freight", "Customs"] },
  { section: "current", name: "HawkEye 360",       logo: "/logos/mvp/hawkeye360.png",      founded: "2015", services: ["RF Analytics", "Maritime Monitoring", "Spectrum Mapping", "Signal Intelligence", "Satellite Tasking"] },
  { section: "current", name: "Impossible Foods",  logo: "/logos/mvp/impossible.png",      founded: "2011", services: ["Plant-Based Burgers", "Ground Beef Alternative", "Food Service", "Retail Products", "R&D"] },
  { section: "current", name: "Job and Talent",    logo: "/logos/mvp/job-and-talent.png",  founded: "2009", services: ["Temp Staffing", "Workforce Management", "Shift Scheduling", "Payroll", "Industrial Jobs"] },
  { section: "current", name: "Kraken",            logo: "/logos/mvp/kraken.png",          founded: "2011", services: ["Crypto Exchange", "Futures Trading", "Staking", "OTC Desk", "Kraken Pro"] },
  { section: "current", name: "Loft",              logo: "/logos/mvp/loft.png",            founded: "2018", services: ["Residential Listings", "Buyer Financing", "Property Valuations", "iBuying", "Data Analytics"] },
  { section: "current", name: "Patreon",           logo: "/logos/mvp/patreon.png",         founded: "2013", services: ["Creator Subscriptions", "Membership Tiers", "Podcast Hosting", "Creator Tools", "Fan Monetization"] },
  { section: "current", name: "Plaid",             logo: "/logos/mvp/plaid.png",           founded: "2013", services: ["Bank Connectivity API", "Identity Verification", "Income Verification", "Transactions API", "Assets"] },
  { section: "current", name: "Quantstamp",        logo: "/logos/mvp/quantstamp.png",      founded: "2017", services: ["Smart Contract Audits", "Protocol Security", "Token Due Diligence", "Web3 Security", "Automated Scanning"] },
  { section: "current", name: "Radiant Nuclear",   logo: "/logos/mvp/radiant.png",         founded: "2020", services: ["Microreactors", "Remote Power", "Military Energy", "Off-Grid Solutions", "Reactor Design"] },
  { section: "current", name: "RapidSOS",          logo: "/logos/mvp/rapidsos.png",        founded: "2012", services: ["Emergency Data Platform", "911 Integration", "IoT Safety", "Wearables Integration", "Crisis Intelligence"] },
  { section: "current", name: "Rappi",             logo: "/logos/mvp/rappi.png",           founded: "2015", services: ["Food Delivery", "Grocery", "Financial Services", "Express Delivery", "RappiPay"] },
  { section: "current", name: "Revolut",           logo: "/logos/mvp/revolut.png",         founded: "2015", services: ["Digital Banking", "Forex", "Crypto Trading", "Stock Trading", "Business Accounts"] },
  { section: "current", name: "Transfix",          logo: "/logos/mvp/transfix.png",        founded: "2013", services: ["Freight Matching", "Carrier Network", "Spot Rates", "Analytics", "Load Optimization"] },
  { section: "current", name: "Turo",              logo: "/logos/mvp/turo.png",            founded: "2010", services: ["Car Sharing", "Host Platform", "Vehicle Subscriptions", "Insurance", "Airport Rentals"] },
  { section: "current", name: "Wefox",             logo: "/logos/mvp/wefox.png",           founded: "2015", services: ["Digital Insurance", "Broker Platform", "Motor Insurance", "Home Insurance", "White-label"] },
  { section: "current", name: "xAI",               logo: "/logos/mvp/xai.png",             founded: "2023", services: ["Grok AI", "API Access", "X Integration", "AI Research", "Supercomputer (Colossus)"] },
  { section: "current", name: "Zocdoc",            logo: "/logos/mvp/zocdoc.png",          founded: "2007", services: ["Doctor Appointments", "Insurance Discovery", "Telehealth", "Provider Management", "Patient Reviews"] },
  { section: "current", name: "ZED RUN",           logo: "/logos/mvp/zed-run.png",         founded: "2018", services: ["Digital Horse Racing", "NFT Horses", "Breeding", "Tournaments", "Web3 Gaming"] },

  // ── Exits / Distributed ────────────────────────────────────────────────
  { section: "exits", name: "Spotify",          logo: "/logos/mvp/spotify.svg",         founded: "2006", services: ["Music Streaming", "Podcasts", "Audiobooks", "Creator Tools", "Ad Platform"] },
  { section: "exits", name: "Coinbase",         logo: "/logos/mvp/coinbase.svg",        founded: "2012", services: ["Crypto Exchange", "Institutional Custody", "DeFi", "Staking", "NFT Marketplace"] },
  { section: "exits", name: "Airbnb",           logo: "/logos/mvp/airbnb.svg",          founded: "2008", services: ["Short-term Rentals", "Experiences", "Host Platform", "Travel Insurance", "Rooms"] },
  { section: "exits", name: "Palantir",         logo: "/logos/mvp/palantir.svg",        founded: "2003", services: ["Palantir Gotham", "Palantir Foundry", "AIP (AI Platform)", "Govt. Analytics", "Commercial Data"] },
  { section: "exits", name: "Pinterest",        logo: "/logos/mvp/pinterest.svg",       founded: "2010", services: ["Visual Discovery", "Shoppable Pins", "Creator Tools", "Advertising", "Idea Pins"] },
  { section: "exits", name: "DocuSign",         logo: "/logos/mvp/docusign.svg",        founded: "2003", services: ["eSignature", "Contract Lifecycle", "Identity Verification", "Notary", "Payments"] },
  { section: "exits", name: "SoFi",             logo: "/logos/mvp/sofi.svg",            founded: "2011", services: ["Student Loans", "Personal Loans", "Investing", "Digital Banking", "Credit Cards"] },
  { section: "exits", name: "Kodiak Robotics", logo: "/logos/mvp/kodiak.svg",           founded: "2018", services: ["Autonomous Trucks", "Long-haul Logistics", "Defense Vehicles", "Fleet Software", "Safety Systems"] },
  { section: "exits", name: "Asana",            logo: "/logos/mvp/asana.png",           founded: "2008", services: ["Task Management", "Project Tracking", "Team Collaboration", "Workflow Automation", "Reporting"] },
  { section: "exits", name: "Cloudera",         logo: "/logos/mvp/cloudera.png",        founded: "2008", services: ["Data Platform", "Hadoop", "Apache Spark", "Machine Learning", "Cloud Data Warehouse"] },
  { section: "exits", name: "Flipkart",         logo: "/logos/mvp/flipkart.png",        founded: "2007", services: ["E-commerce", "Marketplace", "Flipkart Pay", "Grocery", "Fashion (Myntra)"] },
  { section: "exits", name: "HotelTonight",     logo: "/logos/mvp/hotel-tonight.png",   founded: "2010", services: ["Last-Minute Hotels", "Mobile Booking", "Flash Deals", "Loyalty Program", "Travel"] },
  { section: "exits", name: "Instacart",        logo: "/logos/mvp/instacart.png",       founded: "2012", services: ["Grocery Delivery", "Pickup", "Ad Platform", "Instacart+ Membership", "Enterprise Solutions"] },
  { section: "exits", name: "Klarna",           logo: "/logos/mvp/klarna.png",          founded: "2005", services: ["Buy Now Pay Later", "Pay in 4", "Checkout", "Shopping App", "Banking"] },
  { section: "exits", name: "Lyft",             logo: "/logos/mvp/lyft.png",            founded: "2012", services: ["Ridesharing", "Electric Bikes", "Scooters", "Driver App", "Enterprise Rides"] },
  { section: "exits", name: "Platform Science", logo: "/logos/mvp/platform-science.png",founded: "2015", services: ["Fleet Management", "Driver Apps", "Compliance (ELD)", "Vehicle Intelligence", "Connectivity"] },
  { section: "exits", name: "Rent the Runway",  logo: "/logos/mvp/rent-the-runway.png", founded: "2009", services: ["Dress Rentals", "Subscription Memberships", "Designer Fashion", "Dry Cleaning", "Resale"] },
  { section: "exits", name: "Rivian",           logo: "/logos/mvp/rivian.png",          founded: "2009", services: ["Electric Pickup Trucks", "Electric Vans", "Fleet Delivery", "Amazon Partnership", "Charging Network"] },
  { section: "exits", name: "Scopely",          logo: "/logos/mvp/scopely.png",         founded: "2011", services: ["Mobile Games", "Star Trek Fleet Command", "Monopoly GO!", "Stumble Guys", "Game Dev"] },
  { section: "exits", name: "Udemy",            logo: "/logos/mvp/udemy.png",           founded: "2010", services: ["Online Courses", "Business Training", "Instructor Platform", "Certification Prep", "Corporate Learning"] },
  { section: "exits", name: "Wish",             logo: "/logos/mvp/wish.png",            founded: "2010", services: ["E-commerce Marketplace", "Budget Shopping", "Fashion", "Electronics", "Wish Clips"] },
  { section: "exits", name: "X (Twitter)",      logo: "/logos/mvp/x-twitter.png",       founded: "2006", services: ["Microblogging", "X Premium", "Creator Monetization", "Spaces", "Advertising"] },
];

const companyTextsEs: Record<string, CompanyTexts> = {
  // Current
  "SpaceX":           { sector: "Aeroespacial · Defensa",          desc: "Empresa líder en cohetes reutilizables, satélites Starlink y la misión comercial a Marte.",                       status: "Privada (IPO esperado 2026)",   note: "S-1 confidencial presentado ante la SEC en abril 2026. Starlink superó 10M suscriptores y $10B en ingresos." },
  "Anthropic":        { sector: "Inteligencia Artificial",          desc: "Laboratorio de IA de seguridad que desarrolla Claude, uno de los modelos de lenguaje más avanzados.",             status: "Privada",                       note: "Serie G de $30B — segunda ronda de VC más grande de la historia. Ingresos anualizados de $14B." },
  "Groq":             { sector: "Hardware · IA",                    desc: "Diseña chips LPU (Language Processing Unit) para inferencia de IA ultrarrápida a escala cloud.",                  status: "Privada",                       note: "Valoración de $20B. Fundador Jonathan Ross ex-Google TPU. API de inferencia de LLMs más rápida del mercado." },
  "Figure AI":        { sector: "Robótica · IA",                    desc: "Desarrolla robots humanoides autónomos para trabajo industrial. Colaboración activa con BMW.",                    status: "Privada",                       note: "Serie C de +$1B. Respaldada por Nvidia, Microsoft, Jeff Bezos y el OpenAI Startup Fund. Funding total: ~$1.9B." },
  "Epirus":           { sector: "Defensa · Energía dirigida",       desc: "Fabrica sistemas de energía dirigida de alta potencia (HPM) para neutralizar drones y electrónica enemiga.",      status: "Privada",                       note: "Serie D de $250M (mar 2025) con participación de General Dynamics. Financiamiento total: ~$595M." },
  "Addepar":          { sector: "Fintech · Gestión Patrimonial",    desc: "Plataforma de tecnología financiera que conecta y analiza datos de portafolios complejos para family offices y gestores patrimoniales.", status: "Privada", note: "Gestiona más de $7T en activos bajo análisis. Respaldada por a16z, Viking Global y 8VC." },
  "Agility Robotics": { sector: "Robótica · IA",                    desc: "Desarrolla robots bípedos autónomos para automatizar tareas de logística y manufactura en almacenes y fábricas.", status: "Privada",                       note: "Su robot Digit opera en plantas de Amazon. Serie B liderada por DCVC y Amazon Industrial Innovation Fund." },
  "Automattic":       { sector: "Software · CMS",                   desc: "Empresa detrás de WordPress.com, WooCommerce y Tumblr, responsable de una parte significativa del contenido publicado en internet.", status: "Privada", note: "WordPress impulsa más del 40% de todos los sitios web del mundo. Financiamiento total superior a $1.1B." },
  "Base Power":       { sector: "Energía · Almacenamiento",         desc: "Desarrolla sistemas de almacenamiento de energía residencial para estabilizar la red eléctrica y reducir costos para los hogares.", status: "Privada", note: "Con sede en Austin, TX. Serie A de $200M+ liderada por Kleiner Perkins. Foco en mercados de alta demanda energética." },
  "BlueVoyant":       { sector: "Ciberseguridad",                   desc: "Plataforma de ciberseguridad empresarial que protege cadenas de suministro y operaciones internas contra amenazas externas.", status: "Privada", note: "Financiamiento de $250M+ con participación de BMO y fondos institucionales. Clientes en gobiernos y grandes corporativos." },
  "Bolt":             { sector: "Fintech · E-commerce",             desc: "Plataforma de pagos que acelera el checkout para comercios en línea mediante tecnología de un solo clic y prevención de fraude.", status: "Privada", note: "Red de más de 80M de compradores registrados. Valoración de ~$11B en serie E (2022). Habilitó $5B+ en ventas de e-commerce." },
  "Capella Space":    { sector: "Aeroespacial · Datos",             desc: "Opera una constelación de satélites SAR que captura imágenes de la Tierra en cualquier condición climática, día o noche.", status: "Privada", note: "Imágenes de 50cm de resolución disponibles en horas. Contratos activos con agencias de defensa e inteligencia de EE.UU." },
  "CHAOS Industries": { sector: "Defensa · IA",                     desc: "Desarrolla sistemas de defensa basados en inteligencia artificial para guerra electrónica y neutralización de drones.", status: "Privada", note: "Fundada por veteranos de Anduril, SpaceX y DARPA. Respaldada por Andreessen Horowitz y Sequoia Capital." },
  "Cohere":           { sector: "Inteligencia Artificial",          desc: "Plataforma de IA empresarial que ofrece modelos de lenguaje avanzados para automatización de procesos y análisis de datos.", status: "Privada", note: "Serie D de $500M (2024), valoración de ~$5.5B. Clientes incluyen Oracle, McKinsey y Salesforce." },
  "Cohesity":         { sector: "Software · Seguridad de datos",    desc: "Plataforma de gestión y seguridad de datos que simplifica backup, recuperación y protección contra ransomware.", status: "Privada", note: "Se fusionó con Veritas en 2024 para crear la empresa líder en gestión de datos con más de $1.5B en ingresos combinados." },
  "Databricks":       { sector: "Software · Datos · IA",            desc: "Plataforma líder de datos e IA unificada que permite a las empresas construir, escalar y gobernar sus iniciativas de inteligencia artificial.", status: "Privada (IPO esperado)", note: "Serie J de $15.3B (2024), valoración de $62B. Fundadores de Apache Spark. Ingresos anualizados superiores a $2.4B." },
  "Discord":          { sector: "Redes Sociales · Gaming",          desc: "Plataforma de comunicación por voz, video y texto utilizada por 500M+ de usuarios, principalmente en gaming y comunidades de nicho.", status: "Privada", note: "Rechazó oferta de adquisición de Microsoft por $12B en 2021. Generó ~$700M en ingresos en 2024." },
  "Epic Games":       { sector: "Gaming · Software",                desc: "Desarrolladora de Fortnite y Unreal Engine, el motor gráfico más utilizado en juegos y producción cinematográfica 3D del mundo.", status: "Privada", note: "Valoración de ~$31.5B (2022). Fortnite generó más de $26B en ingresos desde su lanzamiento. Unreal Engine impulsa más del 50% de los juegos AAA." },
  "Flexport":         { sector: "Logística · Supply Chain",         desc: "Plataforma digital de freight forwarding que moderniza la cadena de suministro global con visibilidad en tiempo real.", status: "Privada", note: "Ryan Petersen volvió como CEO en 2023 para reestructurar la empresa. Respaldada por SoftBank y Andreessen Horowitz." },
  "Forto":            { sector: "Logística · Tech",                 desc: "Plataforma europea de logística digital que conecta a cargadores con transportistas marítimos y aéreos para simplificar el comercio internacional.", status: "Privada", note: "Con sede en Berlín. Serie E de $240M (2022). Procesa más de $1.5B en carga anualmente para clientes como BASF y Schenker." },
  "HawkEye 360":      { sector: "Aeroespacial · Defensa",           desc: "Opera satélites de detección de radio-frecuencia para monitoreo marítimo, inteligencia de señales y seguridad nacional.", status: "Privada", note: "Contratos con la Agencia de Inteligencia de Defensa (DIA) y el USCG. Datos usados por múltiples agencias de inteligencia aliadas." },
  "Impossible Foods": { sector: "Foodtech · Sostenibilidad",        desc: "Pionera en carne de origen vegetal que replica el sabor y textura de la carne animal usando proteína de soja y hemo vegetal.", status: "Privada", note: "Serie F de $500M (2021), valoración de $7B. Disponible en más de 30,000 restaurantes y cadenas como Burger King y Starbucks." },
  "Job and Talent":   { sector: "HR Tech · Marketplace",            desc: "Plataforma de trabajo flexible que conecta a trabajadores con empleos temporales en logística, manufactura y retail en Europa y EE.UU.", status: "Privada", note: "Con sede en Madrid. Serie D de $500M (2021), valoración de $2.35B. Más de 140,000 trabajadores activos en 10+ países." },
  "Kraken":           { sector: "Fintech · Cripto",                 desc: "Uno de los exchanges de criptomonedas más grandes y seguros del mundo, reconocido por su solidez regulatoria y liquidez institucional.", status: "Privada (IPO esperado)", note: "Opera en 190+ países con más de 10M de clientes. Adquirió NinjaTrader en 2024 para expandirse a futuros tradicionales." },
  "Loft":             { sector: "Proptech · Marketplace",           desc: "Marketplace inmobiliario líder en Brasil que simplifica la compraventa de departamentos usados con financiamiento propio.", status: "Privada", note: "Valoración de ~$2.9B (2021). Respaldada por Andreessen Horowitz, SoftBank y David Vélez (fundador de Nubank)." },
  "Patreon":          { sector: "Creator Economy · Fintech",        desc: "Plataforma de membresías que permite a creadores — artistas, podcasters, escritores — monetizar su audiencia directamente.", status: "Privada", note: "5M+ creadores activos que han generado más de $3.5B en pagos a sus comunidades. Valoración de $4B (2021)." },
  "Plaid":            { sector: "Fintech · Infraestructura",        desc: "Red de datos financieros que conecta cuentas bancarias con aplicaciones de terceros, siendo la infraestructura del fintech moderno.", status: "Privada", note: "Bloqueada adquisición de Visa por $5.3B (2021). Conecta más de 12,000 instituciones financieras y 8,000+ apps en EE.UU." },
  "Quantstamp":       { sector: "Cripto · Seguridad",               desc: "Empresa líder en auditorías de seguridad para contratos inteligentes y protocolos blockchain, protegiendo activos digitales.", status: "Privada", note: "Ha auditado más de $200B en activos digitales. Clientes: Ethereum 2.0, Binance, OpenSea y Maker Protocol." },
  "Radiant Nuclear":  { sector: "Energía · Nuclear",                desc: "Desarrolla microreactores nucleares compactos y transportables para energía remota, aplicaciones militares y suministro fuera de red.", status: "Privada", note: "Financiada por Peter Thiel, Founders Fund y el Departamento de Defensa de EE.UU. Primer microreactor previsto para 2026-2027." },
  "RapidSOS":         { sector: "Safety Tech · SaaS",               desc: "Plataforma que conecta dispositivos conectados — autos, smartwatches, sensores — con los centros de respuesta de emergencias 911.", status: "Privada", note: "Conectada a 4,700+ agencias de emergencias en EE.UU. Procesa 150M+ contactos anuales. Clientes: Apple, GM, ADT." },
  "Rappi":            { sector: "Marketplace · Latam",              desc: "Super-app latinoamericana de delivery y servicios financieros operando en 9 países con más de 250 ciudades activas.", status: "Privada", note: "Primer unicornio colombiano. Respaldado por SoftBank con más de $2B invertidos. Compite con iFood y Uber Eats en Latam." },
  "Revolut":          { sector: "Fintech · Neobanking",             desc: "Neobanco global con más de 45M de clientes que ofrece bancaria digital, divisas, cripto e inversiones en una sola app.", status: "Privada (valoración $45B)", note: "Licencia bancaria en EE.UU. obtenida en 2025. IPO esperado en 2025-2026. Ingresos superiores a $3.1B en 2024." },
  "Transfix":         { sector: "Logística · Tech",                 desc: "Plataforma digital de transporte de carga que conecta cargadores con transportistas mediante IA para optimizar rutas y precios.", status: "Privada", note: "Transformación a plataforma SaaS en 2022. Socios: Anheuser-Busch, Unilever, Nationwide. Respaldada por NEA y Canvas." },
  "Turo":             { sector: "Marketplace · Movilidad",          desc: "El mayor marketplace peer-to-peer de alquiler de autos del mundo, con más de 350,000 vehículos disponibles en EE.UU., Canadá, UK y Alemania.", status: "Privada (IPO retrasado)", note: "Confidential S-1 presentado ante la SEC múltiples veces. Respaldada por August Capital y Kleiner Perkins." },
  "Wefox":            { sector: "Insurtech",                        desc: "Plataforma insurtech europea que distribuye y gestiona seguros digitalmente a través de corredores independientes y canales directos.", status: "Privada", note: "Con sede en Berlín. Valoración pico de $4.5B (2022). Reestructuración en 2024 con foco en rentabilidad operativa." },
  "xAI":              { sector: "Inteligencia Artificial",          desc: "Laboratorio de IA fundado por Elon Musk con el objetivo de desarrollar la comprensión más profunda del universo y construir la IA más poderosa.", status: "Privada", note: "Serie C de $6B (2024), valoración de $50B. Grok 3 supera benchmarks clave. Colossus: supercomputador de 100,000 GPUs." },
  "Zocdoc":           { sector: "Health Tech · Marketplace",        desc: "Plataforma de búsqueda y reserva de citas médicas en línea con más de 12M de pacientes y 10,000+ proveedores de salud en EE.UU.", status: "Privada", note: "Procesó más de 9M de citas médicas en 2023. Respaldada por Khosla Ventures, Founders Fund y Goldman Sachs." },
  "ZED RUN":          { sector: "Web3 · Gaming",                    desc: "Plataforma de carreras de caballos digitales basada en blockchain donde los jugadores poseen, crían y corren caballos NFT.", status: "Privada", note: "Desarrollada por Virtually Human Studio. Más de $20M en volumen de transacciones NFT en su apogeo. Expandiéndose a nuevas mecánicas." },

  // Exits
  "Spotify":          { sector: "Entretenimiento · Streaming",      desc: "Plataforma líder global de streaming de música y podcasts con más de 600M de usuarios activos.",                  status: "Pública (NYSE: SPOT)",          note: "IPO directo en abril 2018. Primer año rentable en 2024." },
  "Coinbase":         { sector: "Fintech · Cripto",                 desc: "Exchange de criptomonedas más grande de EE.UU. y principal plataforma regulada para activos digitales.",           status: "Pública (NASDAQ: COIN)",        note: "IPO directo en abril 2021 a $328/acción. Regulada por la SEC." },
  "Airbnb":           { sector: "Hospitalidad · Marketplace",       desc: "Marketplace global de alojamiento con 7M+ de listados activos en 220 países.",                                    status: "Pública (NASDAQ: ABNB)",        note: "IPO en diciembre 2020 a $68/acción, cerró el primer día en $144. Rentable desde 2022." },
  "Palantir":         { sector: "Software · Análisis de datos",     desc: "Plataforma de análisis de datos para gobiernos y empresas Fortune 500. Clave en defensa y contrainteligencia.",    status: "Pública (NASDAQ: PLTR)",        note: "IPO directo en septiembre 2020. Ingresó al S&P 500 en 2024. Uno de los mejores desempeños del índice en 2025." },
  "Pinterest":        { sector: "Redes Sociales · E-commerce",      desc: "Red social visual con 500M+ usuarios mensuales enfocada en inspiración y descubrimiento de productos.",            status: "Pública (NYSE: PINS)",          note: "IPO en abril 2019 a $19/acción. Monetización vía publicidad y shopping integrado." },
  "DocuSign":         { sector: "SaaS · Legal Tech",                desc: "Líder global en firma electrónica y gestión de acuerdos digitales con 1M+ clientes en 180 países.",               status: "Pública (NASDAQ: DOCU)",        note: "IPO en abril 2018. Controla ~70% del mercado de firma electrónica en EE.UU. Programa de recompra de $2.6B en 2026." },
  "SoFi":             { sector: "Fintech · Banca digital",          desc: "Banco digital que ofrece préstamos estudiantiles, hipotecas, inversiones y tarjetas de crédito.",                  status: "Pública (NASDAQ: SOFI)",        note: "Salida a bolsa en junio 2021 vía SPAC. Obtuvo licencia bancaria en 2022. Market cap duplicado en 2025." },
  "Kodiak Robotics":  { sector: "Transporte · Autonomía",           desc: "Desarrolla camiones autónomos de largo recorrido para logística comercial en EE.UU.",                             status: "Pública (NASDAQ: KDK)",         note: "Salida a bolsa vía SPAC en septiembre 2025. Contratos activos con el Departamento de Defensa de EE.UU." },
  "Asana":            { sector: "SaaS · Productividad",             desc: "Plataforma de gestión de trabajo en equipo usada por 150,000+ organizaciones para coordinar proyectos y flujos de trabajo.", status: "Pública (NASDAQ: ASAN)", note: "Listado directo en septiembre 2020. Co-fundada por Dustin Moskovitz (co-fundador de Facebook). Market cap de ~$3.5B." },
  "Cloudera":         { sector: "Software · Big Data",              desc: "Plataforma de datos empresariales basada en Hadoop y Apache Spark que migró a soluciones cloud híbridas.",         status: "Privada (adquirida por KKR y CD&R, 2021)", note: "IPO en NYSE en abril 2018. Privatizada por KKR y Clayton Dubilier & Rice por $5.3B en 2021." },
  "Flipkart":         { sector: "E-commerce · Marketplace",         desc: "Mayor plataforma de e-commerce de India con más de 400M de usuarios registrados y 150M+ de productos en venta.",   status: "Adquirida por Walmart (2018)",  note: "Walmart adquirió el 77% de Flipkart por $16B en 2018 — la mayor adquisición tecnológica de India." },
  "HotelTonight":     { sector: "Travel Tech · Marketplace",        desc: "App de reservas de hotel de último minuto especializada en ofertas flash para viajeros que necesitan hospedaje ese día.", status: "Adquirida por Airbnb (2019)", note: "Airbnb adquirió HotelTonight por ~$465M en marzo de 2019 para expandir su oferta de hospedaje tradicional." },
  "Instacart":        { sector: "Grocery Tech · Marketplace",       desc: "Plataforma de entrega de comestibles a domicilio que conecta a compradores personales con supermercados en EE.UU. y Canadá.", status: "Pública (NASDAQ: CART)", note: "IPO en septiembre 2023. Opera con más de 1,400 retailers y 80,000+ tiendas. Ingresos de $3.0B en 2024." },
  "Klarna":           { sector: "Fintech · BNPL",                   desc: "Neobanco y plataforma Buy Now Pay Later con más de 150M de usuarios globales que transforma la forma de pagar en e-commerce.", status: "Pública (NYSE: KLAR, IPO jul 2025)", note: "IPO en NYSE en julio 2025, valorada en ~$15B. Antes valorada en $45.6B en 2021. Opera en 45+ países." },
  "Lyft":             { sector: "Transporte · Marketplace",         desc: "Segunda plataforma de ridesharing más grande de EE.UU. con presencia en 600+ ciudades y 40M+ de pasajeros activos.", status: "Pública (NASDAQ: LYFT)",       note: "IPO en marzo 2019 a $72/acción. Fusión de su división autónoma con Toyota Woven en 2021. Rentable en 2024." },
  "Platform Science":  { sector: "Transporte · SaaS",               desc: "Plataforma tecnológica para gestión de flotas de camiones que integra apps de conductores, cumplimiento regulatorio e inteligencia vehicular.", status: "Adquirida por TRATON (2022)", note: "Adquirida por Volkswagen Truck & Bus (TRATON) en 2022. Desplegada en decenas de miles de vehículos comerciales." },
  "Rent the Runway":  { sector: "Fashion · Marketplace",            desc: "Plataforma de alquiler de moda de diseñador que ofrece membresías de suscripción para rotar prendas de lujo.", status: "Pública (NASDAQ: RENT)",        note: "IPO en octubre 2021. Pionera en la economía circular de moda. 1M+ prendas de 700+ marcas en circulación." },
  "Rivian":           { sector: "Automotriz · EV",                  desc: "Fabricante de camionetas y vans eléctricas para consumo y logística, conocido por la R1T y las vans de reparto para Amazon.", status: "Pública (NASDAQ: RIVN)", note: "IPO en noviembre 2021, uno de los más grandes en la historia de EE.UU. ($12B). Contrato con Amazon para 100,000 vans eléctricas." },
  "Scopely":          { sector: "Gaming · Mobile",                  desc: "Estudio de videojuegos móviles responsable de Monopoly GO! y Star Trek Fleet Command, con más de 150M de descargas.", status: "Adquirida por Savvy Games ($4.9B, 2023)", note: "Adquirida por el fondo soberano saudita Savvy Games Group por $4.9B en 2023. Monopoly GO! generó más de $2B en 18 meses." },
  "Udemy":            { sector: "EdTech · Marketplace",             desc: "Marketplace global de aprendizaje en línea con 250,000+ cursos y 70M+ de estudiantes en más de 200 países.",       status: "Pública (NASDAQ: UDMY)",        note: "IPO en octubre 2021. Udemy Business atiende a 17,000+ empresas. Catálogo en 75+ idiomas." },
  "Wish":             { sector: "E-commerce · Marketplace",         desc: "Marketplace de e-commerce orientado al precio bajo con más de 500M de usuarios registrados.",                       status: "Adquirida por Qoo10 ($173M, 2023)", note: "IPO en diciembre 2020. Adquirida por la plataforma asiática Qoo10 de Singapur por $173M en 2023." },
  "X (Twitter)":      { sector: "Redes Sociales · Media",           desc: "Red social de microblogging rebautizada como X tras la adquisición de Elon Musk, con 500M+ de usuarios activos mensuales.", status: "Privada (adquirida por Elon Musk, 2022)", note: "Adquirida por Elon Musk por $44B en octubre 2022. Rebranding a X en julio 2023. Integración de pagos en desarrollo." },
};

const companyTextsEn: Record<string, CompanyTexts> = {
  // Current
  "SpaceX":           { sector: "Aerospace · Defense",              desc: "Leading company in reusable rockets, Starlink satellites and the commercial mission to Mars.",                       status: "Private (IPO expected 2026)",   note: "Confidential S-1 filed with the SEC in April 2026. Starlink surpassed 10M subscribers and $10B in revenue." },
  "Anthropic":        { sector: "Artificial Intelligence",          desc: "AI safety laboratory developing Claude, one of the most advanced language models.",                                  status: "Private",                       note: "Series G of $30B — second largest VC round in history. Annualized revenue of $14B." },
  "Groq":             { sector: "Hardware · AI",                    desc: "Designs LPU (Language Processing Unit) chips for ultra-fast AI inference at cloud scale.",                           status: "Private",                       note: "Valued at $20B. Founder Jonathan Ross ex-Google TPU. Fastest LLM inference API on the market." },
  "Figure AI":        { sector: "Robotics · AI",                    desc: "Develops autonomous humanoid robots for industrial work. Active collaboration with BMW.",                             status: "Private",                       note: "Series C of +$1B. Backed by Nvidia, Microsoft, Jeff Bezos and the OpenAI Startup Fund. Total funding: ~$1.9B." },
  "Epirus":           { sector: "Defense · Directed Energy",        desc: "Manufactures high-power microwave (HPM) directed energy systems to neutralize drones and enemy electronics.",        status: "Private",                       note: "Series D of $250M (Mar 2025) with General Dynamics participation. Total funding: ~$595M." },
  "Addepar":          { sector: "Fintech · Wealth Management",      desc: "Financial technology platform connecting and analyzing complex portfolio data for family offices and wealth managers.", status: "Private", note: "Manages over $7T in assets under analysis. Backed by a16z, Viking Global and 8VC." },
  "Agility Robotics": { sector: "Robotics · AI",                    desc: "Develops autonomous bipedal robots to automate logistics and manufacturing tasks in warehouses and factories.",       status: "Private",                       note: "Its Digit robot operates in Amazon facilities. Series B led by DCVC and Amazon Industrial Innovation Fund." },
  "Automattic":       { sector: "Software · CMS",                   desc: "Company behind WordPress.com, WooCommerce, and Tumblr, responsible for a significant portion of published internet content.", status: "Private", note: "WordPress powers over 40% of all websites globally. Total funding exceeds $1.1B." },
  "Base Power":       { sector: "Energy · Storage",                 desc: "Develops residential energy storage systems to stabilize the electrical grid and reduce costs for households.",       status: "Private", note: "Headquartered in Austin, TX. Series A of $200M+ led by Kleiner Perkins. Focus on high energy-demand markets." },
  "BlueVoyant":       { sector: "Cybersecurity",                    desc: "Enterprise cybersecurity platform protecting supply chains and internal operations against external threats.",          status: "Private", note: "$250M+ in funding with participation from BMO and institutional funds. Clients include governments and large corporations." },
  "Bolt":             { sector: "Fintech · E-commerce",             desc: "Payments platform that accelerates checkout for online merchants using one-click technology and fraud prevention.",    status: "Private", note: "Network of over 80M registered shoppers. Valued at ~$11B in Series E (2022). Enabled $5B+ in e-commerce sales." },
  "Capella Space":    { sector: "Aerospace · Data",                 desc: "Operates a SAR satellite constellation capturing Earth imagery in any weather condition, day or night.",               status: "Private", note: "50cm resolution imagery available within hours. Active contracts with US defense and intelligence agencies." },
  "CHAOS Industries": { sector: "Defense · AI",                     desc: "Develops AI-based defense systems for electronic warfare applications and drone neutralization.",                       status: "Private", note: "Founded by veterans from Anduril, SpaceX, and DARPA. Backed by Andreessen Horowitz and Sequoia Capital." },
  "Cohere":           { sector: "Artificial Intelligence",          desc: "Enterprise AI platform offering advanced language models for process automation, search, and data analysis.",          status: "Private", note: "Series D of $500M (2024), valued at ~$5.5B. Clients include Oracle, McKinsey, and Salesforce." },
  "Cohesity":         { sector: "Software · Data Security",         desc: "Enterprise data management and security platform simplifying backup, recovery, and ransomware protection.",             status: "Private", note: "Merged with Veritas in 2024 to create the leading data management company with over $1.5B in combined revenue." },
  "Databricks":       { sector: "Software · Data · AI",             desc: "Leading unified data and AI platform enabling companies to build, scale and govern their data and AI initiatives.",    status: "Private (IPO expected)", note: "Series J of $15.3B (2024), valued at $62B. Founders of Apache Spark. Annualized revenues exceeding $2.4B." },
  "Discord":          { sector: "Social Media · Gaming",            desc: "Voice, video, and text communication platform used by 500M+ users, primarily in gaming and niche communities.",        status: "Private", note: "Rejected a $12B acquisition offer from Microsoft in 2021. Generated ~$700M in revenue in 2024." },
  "Epic Games":       { sector: "Gaming · Software",                desc: "Developer of Fortnite and Unreal Engine, the most widely used graphics engine in games and 3D film production worldwide.", status: "Private", note: "Valued at ~$31.5B (2022). Fortnite generated over $26B in revenue since launch. Unreal Engine powers over 50% of AAA games." },
  "Flexport":         { sector: "Logistics · Supply Chain",         desc: "Digital freight forwarding platform modernizing the global supply chain with real-time visibility and automation.",     status: "Private", note: "Ryan Petersen returned as CEO in 2023 to restructure the company. Backed by SoftBank and Andreessen Horowitz." },
  "Forto":            { sector: "Logistics · Tech",                 desc: "European digital logistics platform connecting shippers with ocean and air carriers to simplify international trade.", status: "Private", note: "Headquartered in Berlin. Series E of $240M (2022). Processes over $1.5B in cargo annually for clients like BASF and Schenker." },
  "HawkEye 360":      { sector: "Aerospace · Defense",              desc: "Operates radio-frequency detection satellites for maritime monitoring, signal intelligence, and national security.",    status: "Private", note: "Contracts with the Defense Intelligence Agency (DIA) and USCG. Data used by multiple allied intelligence agencies." },
  "Impossible Foods": { sector: "Foodtech · Sustainability",        desc: "Pioneer in plant-based meat that replicates the taste and texture of animal meat using soy protein and plant heme.",   status: "Private", note: "Series F of $500M (2021), valued at $7B. Available in over 30,000 restaurants and chains like Burger King and Starbucks." },
  "Job and Talent":   { sector: "HR Tech · Marketplace",            desc: "Flexible work platform connecting workers with temporary jobs in logistics, manufacturing, and retail in Europe and the US.", status: "Private", note: "Headquartered in Madrid. Series D of $500M (2021), valued at $2.35B. 140,000+ active workers in 10+ countries." },
  "Kraken":           { sector: "Fintech · Crypto",                 desc: "One of the world's largest and most secure cryptocurrency exchanges, recognized for its regulatory soundness and institutional liquidity.", status: "Private (IPO expected)", note: "Operates in 190+ countries with over 10M clients. Acquired NinjaTrader in 2024 to expand into traditional futures." },
  "Loft":             { sector: "Proptech · Marketplace",           desc: "Leading real estate marketplace in Brazil simplifying the buying and selling of used apartments with own financing.",   status: "Private", note: "Valued at ~$2.9B (2021). Backed by Andreessen Horowitz, SoftBank, and David Vélez (founder of Nubank)." },
  "Patreon":          { sector: "Creator Economy · Fintech",        desc: "Membership platform enabling content creators — artists, podcasters, writers — to monetize their audience directly.",  status: "Private", note: "5M+ active creators who have generated over $3.5B in payments to their communities. Valued at $4B (2021)." },
  "Plaid":            { sector: "Fintech · Infrastructure",         desc: "Financial data network connecting bank accounts with third-party applications, the plumbing infrastructure of modern fintech.", status: "Private", note: "Blocked $5.3B acquisition by Visa (2021). Connects over 12,000 financial institutions and 8,000+ apps in the US." },
  "Quantstamp":       { sector: "Crypto · Security",                desc: "Leading security audit company for smart contracts and blockchain protocols, protecting digital assets from vulnerabilities.", status: "Private", note: "Has audited over $200B in digital assets. Clients include Ethereum 2.0, Binance, OpenSea, and Maker Protocol." },
  "Radiant Nuclear":  { sector: "Energy · Nuclear",                 desc: "Develops compact and transportable nuclear microreactors for remote power, military applications, and off-grid supply.", status: "Private", note: "Funded by Peter Thiel, Founders Fund, and the US Department of Defense. First microreactor planned for 2026-2027." },
  "RapidSOS":         { sector: "Safety Tech · SaaS",               desc: "Platform connecting connected devices — cars, smartwatches, sensors — with 911 emergency response centers in the US.", status: "Private", note: "Connected to 4,700+ emergency agencies in the US. Processes 150M+ emergency contacts annually. Clients: Apple, GM, ADT." },
  "Rappi":            { sector: "Marketplace · Latam",              desc: "Latin American super-app for delivery and financial services operating in 9 countries across 250+ cities.",              status: "Private", note: "First Colombian unicorn. Backed by SoftBank with over $2B invested. Competes with iFood and Uber Eats in Latam." },
  "Revolut":          { sector: "Fintech · Neobanking",             desc: "Global neobank with over 45M customers offering digital banking, forex, crypto, and investments in one app.",            status: "Private ($45B valuation)", note: "US banking license obtained in 2025. IPO expected in 2025-2026. Revenue exceeding $3.1B in 2024." },
  "Transfix":         { sector: "Logistics · Tech",                 desc: "Digital freight transportation platform connecting shippers with carriers via AI to optimize routes and prices in real time.", status: "Private", note: "Transitioned to SaaS platform in 2022. Partners: Anheuser-Busch, Unilever, Nationwide. Backed by NEA and Canvas." },
  "Turo":             { sector: "Marketplace · Mobility",           desc: "The world's largest peer-to-peer car rental marketplace, with over 350,000 vehicles available in the US, Canada, UK, and Germany.", status: "Private (IPO delayed)", note: "Confidential S-1 filed with the SEC multiple times. Backed by August Capital and Kleiner Perkins." },
  "Wefox":            { sector: "Insurtech",                        desc: "European insurtech platform distributing and managing insurance digitally through independent brokers and direct channels.", status: "Private", note: "Headquartered in Berlin. Peak valuation of $4.5B (2022). Strategic restructuring in 2024 focused on operational profitability." },
  "xAI":              { sector: "Artificial Intelligence",          desc: "AI laboratory founded by Elon Musk with the goal of developing a profound understanding of the universe and building the most powerful AI.", status: "Private", note: "Series C of $6B (2024), valued at $50B. Grok 3 surpasses key benchmarks. Colossus: 100,000-GPU supercomputer." },
  "Zocdoc":           { sector: "Health Tech · Marketplace",        desc: "Online medical appointment search and booking platform, with over 12M patients and 10,000+ healthcare providers in the US.", status: "Private", note: "Processed over 9M medical appointments in 2023. Backed by Khosla Ventures, Founders Fund, and Goldman Sachs." },
  "ZED RUN":          { sector: "Web3 · Gaming",                    desc: "Blockchain-based digital horse racing platform where players own, breed, and race NFT horses.",                          status: "Private", note: "Developed by Virtually Human Studio. Over $20M in NFT transaction volume at its peak. Expanding to new gaming mechanics." },

  // Exits
  "Spotify":          { sector: "Entertainment · Streaming",        desc: "Leading global music and podcast streaming platform with over 600M active users.",                                     status: "Public (NYSE: SPOT)",           note: "Direct IPO in April 2018. First profitable year in 2024." },
  "Coinbase":         { sector: "Fintech · Crypto",                 desc: "Largest US cryptocurrency exchange and leading regulated platform for digital assets.",                                status: "Public (NASDAQ: COIN)",         note: "Direct IPO in April 2021 at $328/share. Regulated by the SEC." },
  "Airbnb":           { sector: "Hospitality · Marketplace",        desc: "Global accommodation marketplace with 7M+ active listings in 220 countries.",                                         status: "Public (NASDAQ: ABNB)",         note: "IPO in December 2020 at $68/share, closed the first day at $144. Profitable since 2022." },
  "Palantir":         { sector: "Software · Data Analytics",        desc: "Data analytics platform for governments and Fortune 500 companies. Key in defense and counterintelligence.",          status: "Public (NASDAQ: PLTR)",         note: "Direct IPO in September 2020. Added to S&P 500 in 2024. One of the index's best performers in 2025." },
  "Pinterest":        { sector: "Social Media · E-commerce",        desc: "Visual social network with 500M+ monthly users focused on inspiration and product discovery.",                         status: "Public (NYSE: PINS)",           note: "IPO in April 2019 at $19/share. Monetization via advertising and integrated shopping." },
  "DocuSign":         { sector: "SaaS · Legal Tech",                desc: "Global leader in e-signature and digital agreement management with 1M+ customers in 180 countries.",                  status: "Public (NASDAQ: DOCU)",         note: "IPO in April 2018. Controls ~70% of the US e-signature market. $2.6B buyback program announced in 2026." },
  "SoFi":             { sector: "Fintech · Digital Banking",        desc: "Digital bank offering student loans, mortgages, investments and credit cards.",                                        status: "Public (NASDAQ: SOFI)",         note: "Went public in June 2021 via SPAC. Obtained banking license in 2022. Market cap doubled in 2025." },
  "Kodiak Robotics":  { sector: "Transportation · Autonomy",        desc: "Develops long-haul autonomous trucks for commercial logistics in the US.",                                             status: "Public (NASDAQ: KDK)",          note: "Went public via SPAC in September 2025. Active contracts with the US Department of Defense." },
  "Asana":            { sector: "SaaS · Productivity",              desc: "Team work management platform used by 150,000+ organizations to coordinate projects, tasks, and workflows.",           status: "Public (NASDAQ: ASAN)",         note: "Direct listing in September 2020. Co-founded by Dustin Moskovitz (Facebook co-founder). Market cap of ~$3.5B." },
  "Cloudera":         { sector: "Software · Big Data",              desc: "Enterprise data platform based on Hadoop and Apache Spark that migrated to hybrid cloud solutions for advanced analytics.", status: "Private (acquired by KKR and CD&R, 2021)", note: "IPO on NYSE in April 2018. Taken private by KKR and Clayton Dubilier & Rice for $5.3B in 2021." },
  "Flipkart":         { sector: "E-commerce · Marketplace",         desc: "India's largest e-commerce platform with over 400M registered users and 150M+ products for sale.",                    status: "Acquired by Walmart (2018)",    note: "Walmart acquired 77% of Flipkart for $16B in 2018 — India's largest tech acquisition." },
  "HotelTonight":     { sector: "Travel Tech · Marketplace",        desc: "Last-minute hotel booking app specializing in flash deals connecting travelers with available rooms same day.",        status: "Acquired by Airbnb (2019)",     note: "Airbnb acquired HotelTonight for ~$465M in March 2019 to expand its traditional accommodation offering." },
  "Instacart":        { sector: "Grocery Tech · Marketplace",       desc: "Same-day grocery delivery platform connecting personal shoppers with supermarkets in the US and Canada.",              status: "Public (NASDAQ: CART)",         note: "IPO in September 2023. Operates with 1,400+ retailers and 80,000+ stores. Revenue of $3.0B in 2024." },
  "Klarna":           { sector: "Fintech · BNPL",                   desc: "Neobank and Buy Now Pay Later platform with over 150M global users transforming how people pay in e-commerce.",       status: "Public (NYSE: KLAR, IPO Jul 2025)", note: "IPO on NYSE in July 2025, valued at ~$15B. Previously valued at $45.6B in 2021. Operates in 45+ countries." },
  "Lyft":             { sector: "Transportation · Marketplace",     desc: "Second largest ridesharing platform in the US with presence in 600+ cities and 40M+ active riders.",                  status: "Public (NASDAQ: LYFT)",         note: "IPO in March 2019 at $72/share. Merged autonomous division with Toyota Woven in 2021. Returned to profitability in 2024." },
  "Platform Science":  { sector: "Transportation · SaaS",           desc: "Technology platform for truck fleet management integrating driver apps, regulatory compliance, and vehicle intelligence.", status: "Acquired by TRATON (2022)", note: "Acquired by Volkswagen Truck & Bus (TRATON) in 2022. Deployed in tens of thousands of commercial vehicles in the US." },
  "Rent the Runway":  { sector: "Fashion · Marketplace",            desc: "Designer fashion rental platform offering subscription memberships to rotate luxury garments without purchasing them.",  status: "Public (NASDAQ: RENT)",         note: "IPO in October 2021. Pioneer in the circular economy model for fashion. 1M+ garments from 700+ brands in circulation." },
  "Rivian":           { sector: "Automotive · EV",                  desc: "Electric truck and van manufacturer for consumer and logistics use, known for the R1T and Amazon delivery vans.",       status: "Public (NASDAQ: RIVN)",         note: "IPO in November 2021, one of the largest in US history ($12B). Contract with Amazon for 100,000 electric delivery vans." },
  "Scopely":          { sector: "Gaming · Mobile",                  desc: "Mobile game studio behind Monopoly GO! and Star Trek Fleet Command, with over 150M downloads across its titles.",       status: "Acquired by Savvy Games ($4.9B, 2023)", note: "Acquired by Saudi sovereign fund Savvy Games Group for $4.9B in 2023. Monopoly GO! generated over $2B in 18 months." },
  "Udemy":            { sector: "EdTech · Marketplace",             desc: "Global online learning marketplace with 250,000+ courses and 70M+ students in more than 200 countries.",               status: "Public (NASDAQ: UDMY)",         note: "IPO in October 2021. Udemy Business serves 17,000+ companies. Catalog in 75+ languages covering AI, development, and business." },
  "Wish":             { sector: "E-commerce · Marketplace",         desc: "Price-focused e-commerce marketplace with over 500M registered users connecting buyers with Asian sellers.",            status: "Acquired by Qoo10 ($173M, 2023)", note: "IPO in December 2020. Acquired by Singapore's Qoo10 in 2023 for $173M." },
  "X (Twitter)":      { sector: "Social Media · Media",             desc: "Microblogging social network rebranded as X after Elon Musk's acquisition, with 500M+ monthly active users.",          status: "Private (acquired by Elon Musk, 2022)", note: "Acquired by Elon Musk for $44B in October 2022. Rebranded to X in July 2023. Integration of payments and financial services in development." },
};

// ── Helpers ───────────────────────────────────────────────────────────────

function AccordionSection({ title, subtitle, index, children, defaultOpen = false, className = "mt-4" }: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  index?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={className}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-4 py-4 px-5 rounded-lg border transition-colors duration-200 hover:bg-muted/30 ${open ? "border-primary bg-white" : "border-border bg-secondary/40"}`}
      >
        {index !== undefined && (
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-medium transition-colors duration-200 ${open ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
            {String(index).padStart(2, "0")}
          </div>
        )}
        <div className="flex-1 text-left">
          <h3 className="text-base font-bold text-foreground leading-snug">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-250 shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "9999px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="pt-6 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
}

function CompanyGrid({ companies, onSelect }: { companies: SelectedCompany[]; onSelect: (c: SelectedCompany) => void }) {
  const COLS = 4;
  const remainder = companies.length % COLS || COLS;
  const lastRowStart = companies.length - remainder;
  return (
    <div className="border border-border/40 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {companies.map((company, i) => {
          const isLastCol = (i + 1) % COLS === 0 || i === companies.length - 1;
          const isLastRow = i >= lastRowStart;
          return (
            <button
              key={company.name}
              onClick={() => onSelect(company)}
              className={[
                "text-left group cursor-pointer",
                !isLastCol ? "border-r border-border/40" : "",
                !isLastRow ? "border-b border-border/40" : "",
              ].join(" ")}
            >
              <div
                className="flex items-center justify-center h-36 px-10 group-hover:bg-muted/30 transition-colors duration-200"
                style={{ backgroundColor: company.darkBg ? "#111827" : "transparent" }}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-36 h-10 object-contain"
                />
              </div>
              <div className="border-t border-border/40 px-6 py-5 bg-muted/20 group-hover:bg-muted/40 transition-colors duration-200 flex items-center justify-center">
                <p className="text-[0.95rem] font-semibold text-foreground/70 text-center">{company.name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────

interface SelectedCompany extends CompanyBase, CompanyTexts {}

type GPMember = { name: string; role: string; img: string; bio: string | null };

const gpTeam: GPMember[] = [
  { name: "Eric Brachfeld",  role: "Managing Partner & General Partner", img: "/team/mvp-eric-brachfeld.png",  bio: "Con más de 30 años de experiencia como banquero de inversión y emprendedor, Eric Brachfeld es cofundador y Managing Partner de Manhattan Venture Partners. A lo largo de su carrera ha asesorado y estructurado transacciones para una amplia gama de empresas e inversionistas. Anteriormente fue Partner en Citizen VC, cofundó Gentry New York y lideró esfuerzos de banca de inversión en Ledgemont Capital Group e Indigo Ventures. Es licenciado en Economía por la Universidad de Pennsylvania y cuenta con un MBA con honores de la Stern School of Business de NYU." },
  { name: "Jared Carmel",    role: "Managing Partner & General Partner", img: "/team/mvp-jared-carmel.png",    bio: "Pionero en el desarrollo del mercado secundario para empresas tecnológicas respaldadas por venture capital. Desde 2010 asesora a accionistas pre-IPO en necesidades de liquidez y diversificación. Cofundó citizen.vc, una plataforma fintech para democratizar el capital de riesgo. Anteriormente fue Director de Mercados Secundarios en G Squared, donde estructuró y lanzó G Squared I. Su experiencia abarca venture capital, private equity, SPACs y operaciones M&A." },
  { name: "Bradley Fishman", role: "Managing Partner & General Partner", img: "/team/mvp-bradley-fishman.png", bio: "En Manhattan Venture Partners lidera desarrollo de negocio en el lado comprador y vendedor. Anteriormente fue Partner en Citizen VC y VP en Gentry Financial Holding Group, donde captó capital para oportunidades de venture capital primario y secundario. Fue CEO y fundador de una startup de tecnología móvil empresarial. Inició su carrera en Morgan Stanley Smith Barney. Es licenciado en Marketing Empresarial por la Universidad de Maryland y posee licencias FINRA Series 7, 66 y 31." },
  { name: "Adam Ingram",     role: "Chief Operating Officer",            img: "/team/mvp-adam-ingram.png",     bio: "Con más de 15 años liderando operaciones, finanzas e iniciativas estratégicas en venture capital, startups tecnológicas y servicios financieros. Antes de MVP fue VP de Operaciones en EquityBee, donde supervisó administración de fondos, operaciones de inversión y cumplimiento normativo. Inició su carrera en PwC. Es licenciado en Contabilidad por la Universidad de Tel Aviv y cuenta con un Executive MBA de la Haas School of Business de UC Berkeley." },
  { name: "SooMan Wolffs",   role: "General Partner",                    img: "/team/mvp-sooman-wolffs.png",   bio: "Se incorporó a Manhattan Venture Partners en 2019 desde San Francisco, enfocado en due diligence, estructuración de inversiones y el negocio de Secondary as a Service. Anteriormente fue miembro fundador del equipo de valuaciones de Carta, convirtiéndola en el mayor proveedor de valuaciones en mercados privados. Previamente trabajó en Smartbiz Loans, fintech especializada en préstamos SBA. Es licenciado en Finanzas por Santa Clara University, cuenta con un MS en Finanzas de la Universidad de San Francisco y posee licencias FINRA Series 7, 63 y 79." },
];

export default function MVPPage() {
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState<SelectedCompany | null>(null);
  const [selectedGP, setSelectedGP] = useState<GPMember | null>(null);

  const companyTexts = lang === "es" ? companyTextsEs : companyTextsEn;
  const allCompanies: SelectedCompany[] = companiesBase.map((c) => ({
    ...c,
    ...(companyTexts[c.name] ?? { sector: "", desc: "", status: "", note: "" }),
  }));

  const currentCompanies = allCompanies.filter((c) => c.section === "current");
  const exitCompanies    = allCompanies.filter((c) => c.section === "exits");

  const platforms = platformDefs.map((p) => ({ ...p, desc: t(p.descKey) }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-48 pb-40 bg-background">
        <div className="max-w-6xl mx-auto px-8">
          <div className="w-full min-w-0">

            {/* ── Header ────────────────────────────────────────────────── */}
            <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">{t("mvp.title")}</h1>
            <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-6">{t("mvp.subtitle")}</p>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">{t("mvp.desc")}</p>

            {/* ── KPI Metrics ───────────────────────────────────────────── */}
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {kpiKeys.map((k, i) => (
                <div key={k.labelKey} className="border-l-2 border-primary pl-5 py-3">
                  <p className="text-[30px] font-bold text-primary leading-none">{kpiValues[i]}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mt-3 leading-snug">{t(k.labelKey)}</p>
                </div>
              ))}
            </div>

            {/* ── Leadership Team ───────────────────────────────────────── */}
            <div className="mt-16">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-10">{t("mvp.leadership.title")}</h2>
              <div className="grid grid-cols-5 gap-6">
                {gpTeam.map((gp) => (
                  <div key={gp.name} className="flex flex-col items-center text-center cursor-pointer" onClick={() => setSelectedGP(gp)}>
                    <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-primary/20 mb-4 shrink-0">
                      <img src={gp.img} alt={gp.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <h4 className="font-bold text-foreground text-sm md:text-base leading-tight">{gp.name}</h4>
                    <p className="text-xs text-muted-foreground/70 mt-1">{gp.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Global Reach Map ──────────────────────────────────────── */}
            <div className="mt-16">
              <MVPWorldMap />
            </div>

            {/* ── Recognition ───────────────────────────────────────────── */}
            <AccordionSection index={1} title={t("mvp.section.recognition")} subtitle={t("mvp.section.recognition.sub")} className="mt-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="border border-border rounded-xl p-6 bg-background">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Bloomberg</p>
                  <p className="text-base font-bold text-primary leading-tight">Top 10 Venture Funds</p>
                  <p className="text-[11px] text-muted-foreground mt-4">Under $500M — Vintages 2017–2022</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between bg-primary/5 border border-primary/15 rounded-lg px-3 py-1.5">
                      <span className="text-[11px] font-semibold text-foreground">#7 MVP All-Star Fund III</span>
                      <span className="text-[10px] text-primary font-bold">Net IRR Top 10</span>
                    </div>
                    <div className="flex items-center justify-between bg-primary/5 border border-primary/15 rounded-lg px-3 py-1.5">
                      <span className="text-[11px] font-semibold text-foreground">#8 MVP All-Star Fund II</span>
                      <span className="text-[10px] text-primary font-bold">Net IRR Top 10</span>
                    </div>
                  </div>
                </div>
                <div className="border border-border rounded-xl p-6 bg-background">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">PitchBook</p>
                  <p className="text-base font-bold text-primary leading-tight">Top 10 Global Secondaries Buyer</p>
                  <p className="text-[11px] text-muted-foreground mt-4">Top 5 en USA — Deal count 2015–2025</p>
                  <div className="mt-3 bg-secondary/40 rounded-lg px-3 py-2">
                    <p className="text-[11px] text-foreground">{t("mvp.pitchbook.desc")}</p>
                  </div>
                  <div className="mt-2 flex gap-4">
                    <div className="flex-1 bg-primary/5 border border-primary/15 rounded-md px-2 py-1.5 text-center">
                      <p className="text-sm font-bold text-primary">#9</p>
                      <p className="text-[10px] text-muted-foreground">Global</p>
                    </div>
                    <div className="flex-1 bg-primary/5 border border-primary/15 rounded-md px-2 py-1.5 text-center">
                      <p className="text-sm font-bold text-primary">Top 5</p>
                      <p className="text-[10px] text-muted-foreground">USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* ── Fund Performance ──────────────────────────────────────── */}
            <AccordionSection index={2} title={t("mvp.section.trackrecord")} subtitle={t("mvp.section.trackrecord.sub")}>
              <div className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-2.5 mb-4 text-[12px] text-foreground">
                {t("mvp.trackrecord.desc")}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* DPI Chart */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">Net DPI vs Benchmark</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dpiData} barCategoryGap="30%" barGap={3}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                        <XAxis dataKey="fund" tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" />
                        <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}x`} domain={[0, 2.5]} />
                        <Tooltip
                          contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                          formatter={(v: number, name: string) => [`${v}x`, name === "mvp" ? "MVP DPI" : name === "vc" ? "VC Top Decile" : "VC Secondary"]}
                        />
                        <Bar dataKey="mvp" name="mvp" fill="hsl(214 60% 32%)" radius={[3,3,0,0]}>
                          <LabelList dataKey="mvp" position="top" formatter={(v: number) => `${v}x`} style={{ fontSize: 10, fontWeight: 700, fill: "hsl(214 60% 32%)" }} />
                        </Bar>
                        <Bar dataKey="vc" name="vc" fill="hsl(214 30% 68%)" radius={[3,3,0,0]} />
                        <Bar dataKey="sec" name="sec" fill="hsl(214 20% 82%)" radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-5 mt-4">
                    {[["hsl(214,60%,32%)","MVP"], ["hsl(214,30%,68%)","VC Top Decile"], ["hsl(214,20%,82%)","VC Secondary"]].map(([c,l]) => (
                      <span key={l} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c }} />{l}
                      </span>
                    ))}
                  </div>
                </div>

                {/* IRR Chart */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">Net IRR vs Benchmark</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={irrData} barCategoryGap="30%" barGap={3}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                        <XAxis dataKey="fund" tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" />
                        <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}%`} domain={[0, 65]} />
                        <Tooltip
                          contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                          formatter={(v: number, name: string) => [`${v}%`, name === "mvp" ? "MVP IRR" : name === "vc" ? "VC Median" : "VC Secondary"]}
                        />
                        <Bar dataKey="mvp" name="mvp" fill="hsl(214 60% 32%)" radius={[3,3,0,0]}>
                          <LabelList dataKey="mvp" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: 10, fontWeight: 700, fill: "hsl(214 60% 32%)" }} />
                        </Bar>
                        <Bar dataKey="vc" name="vc" fill="hsl(214 30% 68%)" radius={[3,3,0,0]} />
                        <Bar dataKey="sec" name="sec" fill="hsl(214 20% 82%)" radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-5 mt-4">
                    {[["hsl(214,60%,32%)","MVP"], ["hsl(214,30%,68%)","VC Median"], ["hsl(214,20%,82%)","VC Secondary"]].map(([c,l]) => (
                      <span key={l} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c }} />{l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* ── Secondary Market Volume ────────────────────────────────── */}
            <AccordionSection index={3} title={t("mvp.section.secondary")} subtitle={t("mvp.section.secondary.sub")}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-primary/5 border border-primary/15 rounded-lg px-5 py-4">
                  <p className="text-xl font-bold text-primary">$69B</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t("mvp.vol.2024")}</p>
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-lg px-5 py-4">
                  <p className="text-xl font-bold text-primary">~$3.4T</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t("mvp.vol.universe")}</p>
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-lg px-5 py-4">
                  <p className="text-xl font-bold text-primary">$311B</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t("mvp.vol.drypowder")}</p>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `$${v}B`} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                      formatter={(v: number) => [`$${v}B`, t("mvp.tooltip.volume")]}
                    />
                    <Bar dataKey="v" name="v" radius={[3,3,0,0]}>
                      {volumeData.map((_, i) => (
                        <Cell key={i} fill={i === volumeData.length - 1 ? "hsl(214 60% 32%)" : "hsl(214 40% 55%)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4">{t("mvp.source.iv")}</p>
            </AccordionSection>

            {/* ── Tech Sector Returns ───────────────────────────────────── */}
            <AccordionSection index={4} title={t("mvp.section.returns")} subtitle={t("mvp.section.returns.sub")}>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorReturns} layout="vertical" barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(215 12% 60%)" tickFormatter={(v) => `${v}%`} domain={[0, 26]} />
                    <YAxis type="category" dataKey="sector" tick={{ fontSize: 10 }} stroke="hsl(215 12% 60%)" width={100} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(214 20% 85%)" }}
                      formatter={(v: number) => [`${v}%`, t("mvp.tooltip.returns")]}
                    />
                    <Bar dataKey="ret" radius={[0,3,3,0]}>
                      {sectorReturns.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "hsl(214 60% 32%)" : "hsl(214 35% 60%)"} />
                      ))}
                      <LabelList dataKey="ret" position="right" formatter={(v: number) => `${v}%`} style={{ fontSize: 10, fontWeight: 600, fill: "hsl(215 30% 30%)" }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4">{t("mvp.source.spdr")}</p>
            </AccordionSection>

            {/* ── Portfolio — Current ────────────────────────────────────── */}
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">{t("mvp.section.portfolio")}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">{t("mvp.section.portfolio.current")}</p>
              <CompanyGrid companies={currentCompanies} onSelect={setSelected} />
            </div>

            {/* ── Portfolio — Exits ──────────────────────────────────────── */}
            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">{t("mvp.section.portfolio.exits")}</p>
              <CompanyGrid companies={exitCompanies} onSelect={setSelected} />
            </div>

          </div>
        </div>
      </main>

      {/* ── Company detail popup ─────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-6 px-8 pt-8 pb-6 border-b border-border/40">
              <div
                className="border border-border/40 rounded-xl flex items-center justify-center w-28 h-16 shrink-0 overflow-hidden"
                style={{ backgroundColor: selected.darkBg ? "#111827" : "#f8fafc" }}
              >
                <img src={selected.logo} alt={selected.name} className="w-20 h-10 object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-semibold text-foreground leading-snug">{selected.name}</p>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-primary mt-1">{selected.sector}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border/40 text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Body */}
            <div className="px-8 py-6 space-y-6">
              <p className="text-[0.9rem] text-muted-foreground leading-relaxed">{selected.desc}</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: t("mvp.popup.founded"), value: selected.founded },
                  { label: t("mvp.popup.sector"),  value: selected.sector  },
                  { label: t("mvp.popup.status"),  value: selected.status  },
                ].map((f) => (
                  <div key={f.label} className="bg-muted/30 rounded-xl px-4 py-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary mb-1">{f.label}</p>
                    <p className="text-[0.85rem] font-semibold text-foreground leading-snug">{f.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-foreground/40 mb-3">{t("mvp.popup.services")}</p>
                <div className="flex flex-wrap gap-2">
                  {selected.services.map((s) => (
                    <span key={s} className="text-[0.75rem] px-3 py-1 rounded-full border border-border/40 text-foreground/60 bg-background">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground/70 border-t border-border/40 pt-4 leading-relaxed">{selected.note}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── GP popup ─────────────────────────────────────────────────────── */}
      <Dialog open={!!selectedGP} onOpenChange={(v) => !v && setSelectedGP(null)}>
        <DialogContent className="max-w-md w-[calc(100vw-2rem)]">
          {selectedGP && (
            <div className="flex flex-col items-center text-center pt-2">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                <img src={selectedGP.img} alt={selectedGP.name} className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{selectedGP.name}</h3>
              <p className="text-sm text-primary/80 mb-4">{selectedGP.role}</p>
              {selectedGP.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedGP.bio}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
