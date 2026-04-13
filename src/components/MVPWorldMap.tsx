import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "/world-110m.json";

// anchor: text-anchor, dx/dy: label offset from dot
const cities = [
  { name: "New York",      coords: [-74.006,  40.713] as [number, number], dx:  9, dy: -7  },
  { name: "San Francisco", coords: [-122.419, 37.775] as [number, number], dx: -9, dy: -7  },
  { name: "Los Angeles",   coords: [-118.244, 34.052] as [number, number], dx: -9, dy:  14 },
  { name: "Mexico City",   coords: [-99.133,  19.433] as [number, number], dx: -9, dy: -7  },
  { name: "London",        coords: [-0.128,   51.507] as [number, number], dx:  9, dy: -7  },
  { name: "Paris",         coords: [2.352,    48.857] as [number, number], dx:  9, dy:  14 },
  { name: "Milan",         coords: [9.190,    45.465] as [number, number], dx:  9, dy: -7  },
  { name: "Istanbul",      coords: [28.978,   41.008] as [number, number], dx:  9, dy: -7  },
  { name: "Dubai",         coords: [55.271,   25.205] as [number, number], dx:  9, dy: -7  },
];

export function MVPWorldMap() {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="relative w-full py-8 px-2">
      {/* Header */}
      <div className="mb-4 px-4">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground">
          Alcance Global de MVP
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          30+ Investment Professionals Worldwide
        </p>
      </div>

      {/* Map — cropped to remove excess bottom (Antarctica) */}
      <div className="w-full overflow-hidden" style={{ maxHeight: "420px" }}>
        <ComposableMap
          projectionConfig={{ scale: 160, center: [10, 15] }}
          style={{ width: "100%", height: "auto", marginBottom: "-80px" }}
        >
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.1" fill="hsl(214,70%,42%)" fillOpacity="0.6" />
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
              <circle
                r={10}
                fill="hsl(214,70%,42%)"
                fillOpacity={0.18}
                className="animate-ping origin-center"
                style={{ transformBox: "fill-box" }}
              />
              {/* Outer ring */}
              <circle r={6} fill="none" stroke="hsl(214,70%,42%)" strokeWidth={1.5} strokeOpacity={0.8} />
              {/* Core dot */}
              <circle r={3.5} fill="hsl(214,70%,42%)" />
              {/* Label */}
              <text
                textAnchor={city.dx < 0 ? "end" : "start"}
                x={city.dx}
                y={city.dy}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "10px",
                  fill: "hsl(214,60%,22%)",
                  pointerEvents: "none",
                  fontWeight: 700,
                }}
              >
                {city.name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-10 left-6 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full border border-primary/20 font-medium">
          {tooltip}
        </div>
      )}
    </div>
  );
}
