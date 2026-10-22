interface CoinProps {
  className?: string;
  size?: number;
}

export function Coin({ className = "", size = 24 }: CoinProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
      <rect x="6" y="3" width="20" height="26" fill="#49302C" />
      <rect x="3" y="8" width="26" height="16" fill="#49302C" />
      <rect x="7" y="5" width="18" height="22" fill="#FFC99F" />
      <rect x="5" y="10" width="22" height="12" fill="#FFC99F" />
      <rect x="9" y="8" width="14" height="16" fill="#FFE0BD" />
      <rect x="13" y="11" width="6" height="10" fill="#49302C" />
      <rect x="11" y="13" width="10" height="6" fill="#49302C" />
      <rect x="9" y="8" width="3" height="3" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
}
