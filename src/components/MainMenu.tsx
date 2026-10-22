import { Volume2, VolumeX, GraduationCap, Play } from "lucide-react";
import { BobaCup } from "./BobaCup";
import { CafeBackground } from "./CafeBackground";
import { FLAVORS } from "@/game/constants";
import { FloatingBoba } from "./PixelIcons";
import { playClick } from "@/game/sounds";

interface MainMenuProps {
  onPlay: () => void;
  onTutorial: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function MainMenu({ onPlay, onTutorial, soundEnabled, onToggleSound }: MainMenuProps) {
  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden">
      <CafeBackground />
      {/* Dimming overlay for menu readability */}
      <div className="absolute inset-0 bg-[#FFF5E5]/40" />

      {/* Floating decorative boba */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${8 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `floatUp ${4 + i}s ease-in-out ${i * 0.5}s infinite alternate`,
            }}
          >
            <FloatingBoba size={16 + i * 4} />
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="relative z-10 mb-8 text-center">
        <h1
          className="font-['Press_Start_2P'] text-3xl tracking-wider text-[#49302C] sm:text-5xl"
          style={{ textShadow: "4px 4px 0 #FFC99F, 8px 8px 0 rgba(73,48,44,0.1)" }}
        >
          Boba Shop
        </h1>
        <h2
          className="mt-2 font-['Press_Start_2P'] text-xl tracking-widest text-[#B8743A] sm:text-3xl"
          style={{ textShadow: "3px 3px 0 #FFC99F" }}
        >
          TYCOON
        </h2>
      </div>

      {/* Boba cup display */}
      <div className="relative z-10 mb-8 flex gap-3">
        {FLAVORS.slice(0, 5).map((f, i) => (
          <div
            key={f.id}
            className="h-20 w-16 transition-transform sm:h-24 sm:w-20"
            style={{
              animation: `floatUp ${2 + i * 0.3}s ease-in-out ${i * 0.1}s infinite alternate`,
            }}
          >
            <BobaCup
              flavor={f}
              hasCup
              hasStraw
              hasPearls
              hasTea
              className="h-full w-full drop-shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Menu buttons */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <GameButton
          onClick={() => {
            playClick();
            onPlay();
          }}
          color="#C8E4AD"
          textColor="#49302C"
          className="w-56"
        >
          <Play size={20} strokeWidth={3} />
          <span>Play</span>
        </GameButton>

        <GameButton
          onClick={() => {
            playClick();
            onTutorial();
          }}
          color="#FFC99F"
          textColor="#49302C"
          className="w-56"
        >
          <GraduationCap size={20} strokeWidth={2.5} />
          <span>How to Play</span>
        </GameButton>

        <GameButton
          onClick={() => {
            playClick();
            onToggleSound();
          }}
          color="#D9BDFF"
          textColor="#49302C"
          className="w-56"
        >
          {soundEnabled ? <Volume2 size={20} strokeWidth={2.5} /> : <VolumeX size={20} strokeWidth={2.5} />}
          <span>Sound: {soundEnabled ? "On" : "Off"}</span>
        </GameButton>
      </div>

      {/* Footer credit */}
      <p className="relative z-10 mt-8 font-['Press_Start_2P'] text-[8px] text-[#49302C]/50">
        A cozy boba café adventure
      </p>
    </div>
  );
}

interface GameButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
  textColor: string;
  className?: string;
}

export function GameButton({ children, onClick, color, textColor, className = "" }: GameButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center justify-center gap-3 rounded-xl border-2 border-[#49302C] px-6 py-3 font-['Press_Start_2P'] text-xs tracking-wide shadow-[0_4px_0_#49302C] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_5px_0_#49302C] active:translate-y-1 active:shadow-[0_1px_0_#49302C] ${className}`}
      style={{ backgroundColor: color, color: textColor }}
    >
      {children}
    </button>
  );
}
