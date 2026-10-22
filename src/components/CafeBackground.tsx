export function CafeBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#49302C]">
      <img
        src="/images/assets/Background.png"
        alt="Warm pixel-art boba café interior"
        className="h-full w-full object-cover object-center"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#49302C]/10" />
    </div>
  );
}
