import { useState } from "react";
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
  type: CityType;
  coords: [number, number];
  lx1: number; ly1: number; lx2: number; ly2: number;
  tx: number; ty: number; anchor: string;
}

const cities: City[] = [
  {
    name: "San Francisco", info: "West Coast Headquarters", type: "hq",
    coords: [-122.419, 37.775],
    lx1: -6, ly1: 0, lx2: -24, ly2: 0,
    tx: -27, ty: 3, anchor: "end",
  },
  {
    name: "Los Angeles", info: "West Coast Office", type: "office",
    coords: [-118.244, 34.052],
    lx1: -5, ly1: 0, lx2: -18, ly2: 0,
    tx: -21, ty: 3, anchor: "end",
  },
  {
    name: "Mexico City", info: "Latam Operations", type: "office",
    coords: [-99.133, 19.433],
    lx1: -5, ly1: 0, lx2: -18, ly2: 0,
    tx: -21, ty: 3, anchor: "end",
  },
  {
    name: "New York", info: "Global Headquarters", type: "hq",
    coords: [-74.006, 40.713],
    lx1: 6, ly1: 0, lx2: 20, ly2: 0,
    tx: 23, ty: 3, anchor: "start",
  },
  {
    name: "London", info: "European Operations", type: "office",
    coords: [-0.128, 51.507],
    lx1: -3, ly1: -5, lx2: -12, ly2: -18,
    tx: -15, ty: -21, anchor: "end",
  },
  {
    name: "Milan", info: "European Office", type: "office",
    coords: [9.190, 45.465],
    lx1: 5, ly1: 0, lx2: 16, ly2: 0,
    tx: 19, ty: 3, anchor: "start",
  },
  {
    name: "Istanbul", info: "European Office", type: "office",
    coords: [28.978, 41.008],
    lx1: 5, ly1: 0, lx2: 16, ly2: 0,
    tx: 19, ty: 3, anchor: "start",
  },
  {
    name: "Paris", info: "European Office", type: "office",
    coords: [2.352, 48.857],
    lx1: -3, ly1: 4, lx2: -12, ly2: 16,
    tx: -15, ty: 20, anchor: "end",
  },
  {
    name: "Dubai", info: "Middle East Operations", type: "office",
    coords: [55.271, 25.205],
    lx1: 5, ly1: 0, lx2: 20, ly2: 0,
    tx: 23, ty: 3, anchor: "start",
  },
];

const HQ_COLOR     = "hsl(214,80%,32%)";
const OFFICE_COLOR = "hsl(214,60%,52%)";
const LINE_COLOR   = "hsl(214,40%,55%)";

export function MVPWorldMap() {
  const [hovered, setHovered] = useState<City | null>(null);

  const dotColor  = (c: City) => c.type === "hq" ? HQ_COLOR : OFFICE_COLOR;
  const outerR    = (c: City, isHov: boolean) => c.type === "hq" ? (isHov ? 9 : 7.5) : (isHov ? 7 : 5.5);
  const coreR     = (c: City, isHov: boolean) => c.type === "hq" ? (isHov ? 5.5 : 4.5) : (isHov ? 4 : 3);
  const pulseR    = (c: City) => c.type === "hq" ? 14 : 10;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-1">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground">
          Alcance Global de MVP
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          30+ Investment Professionals Worldwide
        </p>
      </div>

      {/* Map */}
      <div className="relative w-full overflow-hidden rounded-lg" style={{ marginTop: "-40px" }}>
        <ComposableMap
          width={800}
          height={380}
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
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="url(#dot-pattern)"
                  stroke="none"
                  style={{
                    default: { outline: "none" },
                    hover:   { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {cities.map((city) => {
            const isHov = hovered?.name === city.name;
            const color = dotColor(city);
            return (
              <Marker
                key={city.name}
                coordinates={city.coords}
                onMouseEnter={() => setHovered(city)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Radar pulse */}
                <circle
                  r={pulseR(city)}
                  fill={color}
                  fillOpacity={0.12}
                  className="animate-ping origin-center"
                  style={{ transformBox: "fill-box" }}
                />
                {/* Outer ring */}
                <circle
                  r={outerR(city, isHov)}
                  fill="white"
                  stroke={color}
                  strokeWidth={city.type === "hq" ? 2.2 : 1.6}
                  style={{ transition: "r 0.2s" }}
                />
                {/* Core dot */}
                <circle r={coreR(city, isHov)} fill={color} style={{ transition: "r 0.2s" }} />

                {/* Connector line */}
                <line
                  x1={city.lx1} y1={city.ly1}
                  x2={city.lx2} y2={city.ly2}
                  stroke={LINE_COLOR}
                  strokeWidth={0.9}
                  strokeOpacity={0.65}
                />

                {/* Label */}
                <text
                  textAnchor={city.anchor}
                  x={city.tx}
                  y={city.ty}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: city.type === "hq" ? "11px" : "10px",
                    fontWeight: city.type === "hq" ? 800 : 700,
                    fill: isHov ? "hsl(0,0%,0%)" : "hsl(0,0%,10%)",
                    pointerEvents: "none",
                    letterSpacing: "0.01em",
                  }}
                >
                  {city.name}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Tooltip */}
        {hovered && (
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-lg px-4 py-2.5 shadow-sm pointer-events-none">
            <p className="text-xs font-semibold text-foreground font-serif">{hovered.name}</p>
            <p className="text-[11px] text-primary/80 mt-0.5">{hovered.info}</p>
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
