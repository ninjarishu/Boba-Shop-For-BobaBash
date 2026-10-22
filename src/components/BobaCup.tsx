import type { Flavor } from "@/game/types";

interface BobaCupProps {
  flavor: Flavor;
  hasCup: boolean;
  hasStraw: boolean;
  hasPearls: boolean;
  hasTea: boolean;
  fillLevel?: number;
  className?: string;
}

export function BobaCup({
  flavor,
  hasCup,
  hasStraw,
  hasPearls,
  hasTea,
  className = "",
}: BobaCupProps) {
  return (
    <div className={`relative flex items-end justify-center ${className}`}>
      <svg viewBox="0 0 120 180" className="h-full w-full overflow-visible" shapeRendering="crispEdges">
        {!hasCup ? (
          <g opacity="0.35">
            <polygon points="30,22 90,22 90,160 30,160" fill="none" stroke="#49302C" strokeWidth="4" strokeDasharray="6 5" />
            <rect x="47" y="86" width="26" height="5" fill="#49302C" />
            <rect x="53" y="78" width="14" height="5" fill="#49302C" />
          </g>
        ) : (
          <>
            <polygon points="30,22 90,22 90,160 30,160" fill="#FFF5E5" opacity="0.86" />

            {hasTea && (
              <>
                <polygon points="30,42 90,42 90,158 30,158" fill={flavor.color} />
                <rect x="30" y="38" width="60" height="9" fill={flavor.creamColor} />
                <rect x="38" y="31" width="44" height="5" fill="#FFFFFF" opacity="0.28" />
                <rect x="42" y="49" width="35" height="4" fill="#FFFFFF" opacity="0.16" />
              </>
            )}

            {hasPearls && (
              <g>{generatePearls(hasTea ? flavor.pearlColor : "#6B4A3A")}</g>
            )}

            <polygon points="30,22 90,22 90,160 30,160" fill="none" stroke="#49302C" strokeWidth="4" />
            <rect x="28" y="18" width="64" height="7" fill="#FFF5E5" stroke="#49302C" strokeWidth="3" />
            <rect x="35" y="30" width="4" height="111" fill="#FFFFFF" opacity="0.45" />
            <rect x="82" y="31" width="3" height="42" fill="#FFFFFF" opacity="0.24" />
            <rect x="41" y="160" width="38" height="5" fill="#49302C" opacity="0.18" />

            {hasStraw && (
              <g transform="rotate(8 72 52)">
                <rect x="67" y="-8" width="10" height="118" fill="#49302C" />
                <rect x="69" y="-8" width="6" height="118" fill="#FFB8CA" />
                <rect x="69" y="8" width="6" height="7" fill="#FFF5E5" opacity="0.7" />
                <rect x="69" y="31" width="6" height="7" fill="#FFF5E5" opacity="0.7" />
                <rect x="69" y="54" width="6" height="7" fill="#FFF5E5" opacity="0.7" />
                <rect x="69" y="77" width="6" height="7" fill="#FFF5E5" opacity="0.7" />
              </g>
            )}
          </>
        )}
      </svg>
    </div>
  );
}

function generatePearls(color: string) {
  const pearls: { x: number; y: number }[] = [
    { x: 41, y: 119 }, { x: 55, y: 120 }, { x: 69, y: 118 }, { x: 79, y: 124 },
    { x: 46, y: 133 }, { x: 61, y: 136 }, { x: 75, y: 134 }, { x: 40, y: 146 },
    { x: 54, y: 149 }, { x: 68, y: 147 }, { x: 80, y: 151 },
  ];

  return pearls.map((pearl, index) => (
    <g key={index}>
      <rect x={pearl.x - 5} y={pearl.y - 5} width="10" height="10" fill="#49302C" />
      <rect x={pearl.x - 3} y={pearl.y - 3} width="7" height="7" fill={color} />
      <rect x={pearl.x - 2} y={pearl.y - 2} width="2" height="2" fill="#FFFFFF" opacity="0.45" />
    </g>
  ));
}
