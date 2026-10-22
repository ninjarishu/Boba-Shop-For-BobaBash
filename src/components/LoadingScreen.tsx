import { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "@/game/constants";
import { BobaCup } from "./BobaCup";
import { FLAVORS } from "@/game/constants";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, p + 2 + Math.random() * 3);
      });
    }, 80);

    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF5E5]">
      {/* Floating decorative bubbles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border-2 border-[#49302C]/20"
          style={{
            width: `${10 + i * 6}px`,
            height: `${10 + i * 6}px`,
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 4) * 20}%`,
            backgroundColor: [
              "#FFB8CA", "#FFC99F", "#C8E4AD", "#D9BDFF", "#B9DDFF",
            ][i % 5],
            opacity: 0.3,
            animation: `floatUp ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite alternate`,
          }}
        />
      ))}

      {/* Title */}
      <h1
        className="mb-2 text-center font-['Press_Start_2P'] text-2xl tracking-wider text-[#49302C] sm:text-4xl"
        style={{ textShadow: "3px 3px 0 #FFC99F, 6px 6px 0 rgba(73,48,44,0.15)" }}
      >
        Boba Shop
      </h1>
      <h2
        className="mb-6 text-center font-['Press_Start_2P'] text-lg tracking-widest text-[#B8743A] sm:text-2xl"
        style={{ textShadow: "2px 2px 0 #FFC99F" }}
      >
        TYCOON
      </h2>

      {/* Boba cup illustration */}
      <div className="mb-6 h-40 w-32 animate-bounce" style={{ animationDuration: "2s" }}>
        <BobaCup
          flavor={FLAVORS[0]}
          hasCup
          hasStraw
          hasPearls
          hasTea
          className="h-full w-full"
        />
      </div>

      {/* Progress bar */}
      <div className="w-72 max-w-[80vw]">
        <div className="relative h-6 overflow-hidden rounded-full border-2 border-[#49302C] bg-[#FFE8D0] shadow-[0_4px_0_#49302C]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FFC99F] to-[#FFB8CA] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* progress shine */}
          <div
            className="absolute top-0 left-0 h-1/2 w-full bg-white opacity-20 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <p className="font-['Press_Start_2P'] text-[8px] text-[#49302C] sm:text-[10px]">
            {LOADING_MESSAGES[msgIndex]}
          </p>
          <p className="font-['Press_Start_2P'] text-[8px] text-[#49302C] sm:text-[10px]">
            {Math.floor(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
