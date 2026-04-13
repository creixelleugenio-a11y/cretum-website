import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "/world-110m.json";

const cities = [
  { name: "New York",      coords: [-74.006,  40.713] as [number, number], anchor: "start"  },
  { name: "San Francisco", coords: [-122.419, 37.775] as [number, number], anchor: "end"    },
  { name: "Los Angeles",   coords: [-118.244, 34.052] as [number, number], anchor: "end"    },
  { name: "Mexico City",   coords: [-99.133,  19.433] as [number, number], anchor: "end"    },
  { name: "London",        coords: [-0.128,   51.507] as [number, number], anchor: "start"  },
  { name: "Paris",         coords: [2.352,    48.857] as [number, number], anchor: "start"  },
  { name: "Milan",         coords: [9.190,    45.465] as [number, number], anchor: "start"  },
  { name: "Istanbul",      coords: [28.978,   41.008] as [number, number], anchor: "start"  },
  { name: "Dubai",         coords: [55.271,   25.205] as [number, number], anchor: "start"  },
];

export function MVPWorldMap() {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="relative w-full bg-[hsl(214,40%,10%)] rounded-xl overflow-hidden py-10 px-6">
      {/* Header */}
      <div className="mb-2 px-2">
        <h2 className="text-2xl md:text-3xl font-serif text-white">
          Alcance Global de MVP
        </h2>
        <p className="text-sm text-white/50 mt-1">
          30+ Investment Professionals Worldwide
        </p>
      </div>

      {/* Map */}
      <ComposableMap
        projectionConfig={{ scale: 147, center: [10, 10] }}
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="hsl(214,60%,52%)" fillOpacity="0.45" />
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

        {cities.map((city) => (
          <Marker
            key={city.name}
            coordinates={city.coords}
            onMouseEnter={() => setTooltip(city.name)}
            onMouseLeave={() => setTooltip(null)}
          >
            {/* Pulse ring */}
            <circle r={8} fill="hsl(214,60%,52%)" fillOpacity={0.2} className="animate-ping origin-center" style={{ transformBox: "fill-box" }} />
            {/* Outer ring */}
            <circle r={5} fill="none" stroke="hsl(214,60%,72%)" strokeWidth={1} strokeOpacity={0.7} />
            {/* Core dot */}
            <circle r={3} fill="hsl(214,60%,72%)" />
            {/* Label */}
            <text
              textAnchor={city.anchor}
              x={city.anchor === "end" ? -8 : 8}
              y={-8}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                fill: "rgba(255,255,255,0.85)",
                pointerEvents: "none",
              }}
            >
              {city.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
          {tooltip}
        </div>
      )}
    </div>
  );
}
