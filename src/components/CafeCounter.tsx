/**
 * Pixel-art café counter rendered as SVG.
 * Anchored to the bottom of the screen with espresso-brown wood texture.
 */
export function CafeCounter() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
      <svg
        viewBox="0 0 1280 180"
        preserveAspectRatio="xMidYMax meet"
        className="w-full max-w-[1600px]"
      >
        {/* Counter top surface */}
        <rect x="0" y="0" width="1280" height="20" fill="#8B5E3C" stroke="#49302C" strokeWidth="3" />
        <rect x="0" y="0" width="1280" height="6" fill="#A87858" />

        {/* Counter body */}
        <rect x="0" y="20" width="1280" height="160" fill="#D4A88A" />
        {/* wood grain */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={i * 220}
            y="20"
            width="200"
            height="160"
            fill="#C0986E"
            opacity="0.5"
          />
        ))}
        {/* panel lines */}
        {[220, 440, 660, 880, 1100].map((x) => (
          <line key={x} x1={x} y1="20" x2={x} y2="180" stroke="#A87858" strokeWidth="2" opacity="0.5" />
        ))}
        {/* panel outlines */}
        {[0, 220, 440, 660, 880, 1100].map((x) => (
          <g key={x}>
            <rect x={x + 10} y="30" width="195" height="140" rx="6" fill="none" stroke="#A87858" strokeWidth="2" opacity="0.4" />
          </g>
        ))}

        {/* Decorative boba jars on counter */}
        {[140, 280].map((x, i) => (
          <g key={i} transform={`translate(${x}, -60)`}>
            <rect x="0" y="10" width="40" height="50" rx="4" fill="#FFF5E5" opacity="0.7" stroke="#49302C" strokeWidth="2" />
            <rect x="4" y="4" width="32" height="10" rx="2" fill="#8B5E3C" stroke="#49302C" strokeWidth="2" />
            {/* pearls inside */}
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={6 + col * 8}
                  cy={38 + row * 8}
                  r="3"
                  fill={i === 0 ? "#3B2418" : "#7A5A9E"}
                  stroke="#49302C"
                  strokeWidth="0.8"
                />
              ))
            )}
            {/* label */}
            <rect x="6" y="26" width="28" height="10" fill="#FFF5E5" opacity="0.9" />
          </g>
        ))}

        {/* Bell on counter right */}
        <g transform="translate(990, -10)">
          {/* bell base */}
          <ellipse cx="40" cy="25" rx="36" ry="8" fill="#8B5E3C" stroke="#49302C" strokeWidth="2" />
          {/* bell dome */}
          <path d="M 8 25 Q 8 -5 40 -5 Q 72 -5 72 25 Z" fill="#FFC99F" stroke="#49302C" strokeWidth="2.5" />
          {/* bell highlight */}
          <ellipse cx="25" cy="10" rx="6" ry="10" fill="#FFFFFF" opacity="0.3" />
          {/* bell top knob */}
          <circle cx="40" cy="-8" r="4" fill="#49302C" />
        </g>

        {/* Tea kettle on counter */}
        <g transform="translate(850, -20)">
          <ellipse cx="35" cy="30" rx="32" ry="6" fill="#49302C" opacity="0.2" />
          <path d="M 10 30 Q 10 0 35 0 Q 60 0 60 30 Z" fill="#D9BDFF" stroke="#49302C" strokeWidth="2.5" />
          <path d="M 60 10 Q 75 10 75 22 Q 75 28 68 28" fill="none" stroke="#49302C" strokeWidth="2.5" />
          <ellipse cx="35" cy="2" rx="8" ry="3" fill="#49302C" />
          <ellipse cx="25" cy="15" rx="5" ry="8" fill="#FFFFFF" opacity="0.25" />
        </g>

        {/* Counter bottom shadow */}
        <rect x="0" y="175" width="1280" height="5" fill="#49302C" opacity="0.3" />
      </svg>
    </div>
  );
}
