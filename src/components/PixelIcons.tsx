interface PixelIconProps {
  size?: number;
  className?: string;
}

export function CupIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
      <polygon points="6,6 26,6 23,29 9,29" fill="#49302C" />
      <rect x="9" y="9" width="14" height="17" fill="#FFF5E5" />
      <rect x="6" y="4" width="20" height="5" fill="#49302C" />
      <rect x="9" y="6" width="14" height="2" fill="#FFF5E5" />
      <rect x="11" y="11" width="2" height="13" fill="#FFFFFF" opacity="0.55" />
    </svg>
  );
}

export function StrawIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
      <rect x="12" y="1" width="8" height="30" fill="#49302C" />
      <rect x="14" y="1" width="4" height="30" fill="#FFB8CA" />
      <rect x="14" y="6" width="4" height="4" fill="#FFF5E5" opacity="0.8" />
      <rect x="14" y="15" width="4" height="4" fill="#FFF5E5" opacity="0.8" />
      <rect x="14" y="24" width="4" height="4" fill="#FFF5E5" opacity="0.8" />
    </svg>
  );
}

export function PearlIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
      <rect x="4" y="7" width="24" height="23" fill="#49302C" />
      <rect x="7" y="10" width="18" height="17" fill="#FFF5E5" />
      <rect x="9" y="18" width="6" height="6" fill="#49302C" />
      <rect x="17" y="21" width="6" height="6" fill="#49302C" />
      <rect x="14" y="13" width="6" height="6" fill="#49302C" />
      <rect x="10" y="18" width="2" height="2" fill="#FFFFFF" opacity="0.45" />
      <rect x="18" y="21" width="2" height="2" fill="#FFFFFF" opacity="0.45" />
    </svg>
  );
}

export function TeaIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
      <polygon points="6,7 26,7 23,29 9,29" fill="#49302C" />
      <rect x="9" y="10" width="14" height="16" fill="#FFC99F" />
      <rect x="6" y="5" width="20" height="5" fill="#49302C" />
      <rect x="9" y="7" width="14" height="2" fill="#FFE0BD" />
      <rect x="12" y="2" width="3" height="3" fill="#B9DDFF" />
      <rect x="18" y="1" width="3" height="4" fill="#B9DDFF" />
    </svg>
  );
}

export function BellIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
      <rect x="5" y="24" width="22" height="5" fill="#49302C" />
      <rect x="8" y="11" width="16" height="14" fill="#49302C" />
      <rect x="10" y="8" width="12" height="17" fill="#FFC99F" />
      <rect x="12" y="6" width="8" height="4" fill="#FFC99F" />
      <rect x="14" y="3" width="4" height="4" fill="#49302C" />
      <rect x="12" y="11" width="3" height="8" fill="#FFFFFF" opacity="0.35" />
    </svg>
  );
}

export function FloatingBoba({ size = 20, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className} shapeRendering="crispEdges">
      <rect x="4" y="4" width="12" height="12" fill="#49302C" />
      <rect x="6" y="6" width="8" height="8" fill="#FFC99F" />
      <rect x="7" y="7" width="2" height="2" fill="#FFFFFF" opacity="0.45" />
    </svg>
  );
}
