import { useState, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "/world-110m.json";

type CityType = "hq" | "office";

interface City {
  name: string;
  info: string;
  address: string | null;
  type: CityType;
  coords: [number, number];
  lx1: number; ly1: number; lx2: number; ly2: number;
  tx: number; ty: number; anchor: string;
}

const cities: City[] = [
  {
    name: "San Francisco", info: "West Coast Headquarters", address: null, type: "office",
    coords: [-122.419, 37.775],
    lx1: -5, ly1: -3, lx2: -22, ly2: -13,
    tx: -25, ty: -16, anchor: "end",
  },
  {
    name: "Los Angeles", info: "West Coast Office", address: null, type: "office",
    coords: [-118.244, 34.052],
    lx1: -5, ly1: 0, lx2: -18, ly2: 0,
    tx: -21, ty: 3, anchor: "end",
  },
  {
    name: "Mexico City", info: "Latam Operations", type: "office",
    address: "Av. Prol. Paseo de la Reforma 1015\nEdificio Punta Santa Fe, Piso 22\nCol. Desarrollo Santa Fe 01376\nCiudad de México",
    coords: [-99.133, 19.433],
    lx1: -5, ly1: 0, lx2: -18, ly2: 0,
    tx: -21, ty: 3, anchor: "end",
  },
  {
    name: "New York", info: "Global Headquarters", address: null, type: "hq",
    coords: [-74.006, 40.713],
    lx1: 6, ly1: 0, lx2: 20, ly2: 0,
    tx: 23, ty: 3, anchor: "start",
  },
  {
    name: "London", info: "European Operations", address: null, type: "office",
    coords: [-0.128, 51.507],
    lx1: -3, ly1: -5, lx2: -12, ly2: -18,
    tx: -15, ty: -21, anchor: "end",
  },
  {
    name: "Milan", info: "European Office", address: null, type: "office",
    coords: [9.190, 45.465],
    lx1: 5, ly1: 0, lx2: 16, ly2: 0,
    tx: 19, ty: 3, anchor: "start",
  },
  {
    name: "Istanbul", info: "European Office", address: null, type: "office",
    coords: [28.978, 41.008],
    lx1: 5, ly1: 0, lx2: 16, ly2: 0,
    tx: 19, ty: 3, anchor: "start",
  },
  {
    name: "Paris", info: "European Office", address: null, type: "office",
    coords: [2.352, 48.857],
    lx1: -3, ly1: 4, lx2: -12, ly2: 16,
    tx: -15, ty: 20, anchor: "end",
  },
  {
    name: "Dubai", info: "Middle East Operations", address: null, type: "office",
    coords: [55.271, 25.205],
    lx1: 5, ly1: 0, lx2: 20, ly2: 0,
    tx: 23, ty: 3, anchor: "start",
  },
];

const HQ_COLOR     = "hsl(214,80%,32%)";
const OFFICE_COLOR = "hsl(214,60%,52%)";
const LINE_COLOR   = "hsl(214,40%,55%)";

interface Popup { city: City; x: number; y: number }

export function MVPWorldMap() {
  const [hovered, setHovered]   = useState<string | null>(null);
  const [popup, setPopup]       = useState<Popup | null>(null);
  const containerRef            = useRef<HTMLDivElement>(null);

  const dotColor = (c: City) => c.type === "hq" ? HQ_COLOR : OFFICE_COLOR;
  const outerR   = (c: City, h: boolean) => c.type === "hq" ? (h ? 9 : 7.5) : (h ? 7 : 5.5);
  const coreR    = (c: City, h: boolean) => c.type === "hq" ? (h ? 5.5 : 4.5) : (h ? 4 : 3);
  const pulseR   = (c: City) => c.type === "hq" ? 14 : 10;

  const handleClick = (city: City, e: React.MouseEvent) => {
    if (popup?.city.name === city.name) { setPopup(null); return; }
    const rect = containerRef.current!.getBoundingClientRect();
    setPopup({ city, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="w-full">
      <div className="mb-1">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground">Alcance Global de MVP</h2>
        <p className="text-sm text-muted-foreground mt-1">30+ Investment Professionals Worldwide</p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg"
        style={{ marginTop: "-40px" }}
        onClick={(e) => { if (e.target === e.currentTarget) setPopup(null); }}
      >
        <ComposableMap
          width={800} height={380}
          projectionConfig={{ scale: 140, center: [10, 20] }}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.3" fill={HQ_COLOR} fillOpacity="0.55" />
            </pattern>
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="url(#dot-pattern)" stroke="none"
                  style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                />
              ))
            }
          </Geographies>

          {cities.map((city) => {
            const isHov   = hovered === city.name;
            const isOpen  = popup?.city.name === city.name;
            const color   = dotColor(city);
            return (
              <Marker
                key={city.name}
                coordinates={city.coords}
                onMouseEnter={() => setHovered(city.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => handleClick(city, e as unknown as React.MouseEvent)}
                style={{ cursor: "pointer" }}
              >
                <circle r={pulseR(city)} fill={color} fillOpacity={0.12}
                  className="animate-ping origin-center" style={{ transformBox: "fill-box" }} />
                <circle r={outerR(city, isHov || isOpen)} fill="white" stroke={isOpen ? color : color}
                  strokeWidth={city.type === "hq" ? 2.2 : 1.6}
                  strokeOpacity={isOpen ? 1 : 0.85}
                  style={{ transition: "r 0.2s" }} />
                <circle r={coreR(city, isHov || isOpen)} fill={color} style={{ transition: "r 0.2s" }} />
                <line x1={city.lx1} y1={city.ly1} x2={city.lx2} y2={city.ly2}
                  stroke={LINE_COLOR} strokeWidth={0.9} strokeOpacity={0.65} />
                <text textAnchor={city.anchor} x={city.tx} y={city.ty}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: city.type === "hq" ? "11px" : "10px",
                    fontWeight: city.type === "hq" ? 800 : 700,
                    fill: isHov || isOpen ? "hsl(0,0%,0%)" : "hsl(0,0%,10%)",
                    pointerEvents: "none",
                  }}
                >
                  {city.name}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Click popup */}
        {popup && (
          <div
            className="absolute z-10 bg-white border border-border rounded-lg shadow-lg px-4 py-3 w-52 pointer-events-auto"
            style={{
              left: Math.min(popup.x + 12, (containerRef.current?.offsetWidth ?? 800) - 220),
              top: Math.max(popup.y - 80, 8),
            }}
          >
            <button
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground text-xs leading-none"
              onClick={() => setPopup(null)}
            >✕</button>
            <p className="text-sm font-bold text-foreground font-serif pr-4">{popup.city.name}</p>
            <p className="text-[11px] text-primary font-medium mt-0.5">{popup.city.info}</p>
            {popup.city.address && (
              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed whitespace-pre-line">
                {popup.city.address}
              </p>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="white" stroke={HQ_COLOR} strokeWidth="2"/><circle cx="6" cy="6" r="3" fill={HQ_COLOR}/></svg>
            <span className="text-[10px] text-muted-foreground font-medium">Headquarters</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="10" height="10"><circle cx="5" cy="5" r="4" fill="white" stroke={OFFICE_COLOR} strokeWidth="1.5"/><circle cx="5" cy="5" r="2.2" fill={OFFICE_COLOR}/></svg>
            <span className="text-[10px] text-muted-foreground font-medium">Office</span>
          </div>
        </div>
      </div>
    </div>
  );
}
