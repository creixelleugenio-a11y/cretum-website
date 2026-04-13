import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "/world-110m.json";

const cities = [
  { name: "New York",      coords: [-74.006,  40.713] as [number, number], dx:  10, dy: -9,  anchor: "start" },
  { name: "San Francisco", coords: [-122.419, 37.775] as [number, number], dx: -10, dy: -9,  anchor: "end"   },
  { name: "Los Angeles",   coords: [-118.244, 34.052] as [number, number], dx: -10, dy:  16, anchor: "end"   },
  { name: "Mexico City",   coords: [-99.133,  19.433] as [number, number], dx: -10, dy: -9,  anchor: "end"   },
  { name: "London",        coords: [-0.128,   51.507] as [number, number], dx: -10, dy: -9,  anchor: "end"   },
  { name: "Paris",         coords: [2.352,    48.857] as [number, number], dx:  10, dy:  16, anchor: "start" },
  { name: "Milan",         coords: [9.190,    45.465] as [number, number], dx:  10, dy: -9,  anchor: "start" },
  { name: "Istanbul",      coords: [28.978,   41.008] as [number, number], dx:  10, dy: -9,  anchor: "start" },
  { name: "Dubai",         coords: [55.271,   25.205] as [number, number], dx:  10, dy: -9,  anchor: "start" },
];

export function MVPWorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground">
          Alcance Global de MVP
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          30+ Investment Professionals Worldwide
        </p>
      </div>

      {/* Map container — viewBox crops SVG to remove whitespace */}
      <div className="w-full overflow-hidden rounded-lg">
        <ComposableMap
          width={800}
          height={380}
          projectionConfig={{ scale: 140, center: [10, 20] }}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.3" fill="hsl(214,72%,40%)" fillOpacity="0.65" />
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
            const isHovered = hovered === city.name;
            return (
              <Marker
                key={city.name}
                coordinates={city.coords}
                onMouseEnter={() => setHovered(city.name)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Pulse ring */}
                <circle
                  r={10}
                  fill="hsl(214,72%,40%)"
                  fillOpacity={0.15}
                  className="animate-ping origin-center"
                  style={{ transformBox: "fill-box" }}
                />
                {/* Outer ring */}
                <circle
                  r={isHovered ? 7 : 5.5}
                  fill="hsl(214,72%,95%)"
                  stroke="hsl(214,72%,40%)"
                  strokeWidth={1.8}
                  style={{ transition: "r 0.2s" }}
                />
                {/* Core dot */}
                <circle r={isHovered ? 4 : 3} fill="hsl(214,72%,40%)" style={{ transition: "r 0.2s" }} />
                {/* Label */}
                <text
                  textAnchor={city.anchor}
                  x={city.dx}
                  y={city.dy}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    fill: isHovered ? "hsl(214,72%,30%)" : "hsl(214,55%,25%)",
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
      </div>
    </div>
  );
}
