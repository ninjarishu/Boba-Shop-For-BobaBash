import { useEffect, useState } from "react";
import { Coffee, GraduationCap, Volume2, VolumeX } from "lucide-react";
import { BobaCup } from "./BobaCup";
import { CafeBackground } from "./CafeBackground";
import { Coin } from "./Coin";
import { BellIcon, CupIcon, PearlIcon, StrawIcon, TeaIcon } from "./PixelIcons";
import { TutorialModal } from "./TutorialModal";
import { COIN_REWARD, FLAVORS } from "@/game/constants";
import { playBell, playClick, playCoin, playError, playSuccess } from "@/game/sounds";
import { useGame } from "@/game/useGame";
import type { Flavor, PrepStep } from "@/game/types";

const FEEDBACK_STYLES = {
  info: "bg-[#B9DDFF] text-[#49302C] border-[#49302C]/30",
  success: "bg-[#C8E4AD] text-[#49302C] border-[#49302C]/40",
  error: "bg-[#FFB8CA] text-[#49302C] border-[#49302C]/40",
};

function useTypewriter(text: string, speed: number): string {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, speed]);

  return visibleText;
}

export function ShopScene() {
  const game = useGame();
  const [showTutorial, setShowTutorial] = useState(false);
  const typedDialogue = useTypewriter(game.customer.dialogue, 48);
  const typedFeedback = useTypewriter(game.feedback || "Use the control unit to build the order.", 24);

  useEffect(() => {
    if (!game.tutorialSeen) setShowTutorial(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCup = () => {
    playClick();
    game.selectCup();
  };
  const handleStraw = () => {
    playClick();
    game.addStraw();
  };
  const handlePearls = () => {
    playClick();
    game.addPearls();
  };
  const handleTea = () => {
    playClick();
    game.openFlavorPicker();
  };
  const handleFlavorSelect = (flavor: Flavor) => {
    if (flavor.id === game.customer.flavorId && game.currentStep === "tea") {
      playSuccess();
    } else {
      playError();
    }
    game.selectFlavor(flavor);
  };
  const handleServe = () => {
    playBell();
    game.serve();
    window.setTimeout(() => playCoin(), 400);
  };

  const controls = {
    cup: { label: "CUP", Icon: CupIcon, handler: handleCup, color: "#B9DDFF" },
    straw: { label: "STRAW", Icon: StrawIcon, handler: handleStraw, color: "#FFB8CA" },
    pearls: { label: "TAPIOCA", Icon: PearlIcon, handler: handlePearls, color: "#FFC99F" },
    tea: { label: "TEA", Icon: TeaIcon, handler: handleTea, color: "#D9BDFF" },
  } as const;
  const orderedControls = game.buttonOrder.map((key: PrepStep) => controls[key as keyof typeof controls]);
  const orderLabel = game.customer.needsTea
    ? `${game.currentFlavor.name}${game.customer.needsPearls ? "" : " · no tapioca"}`
    : "Tapioca only";

  return (
    <div className="fixed inset-0 z-20 overflow-hidden">
      <CafeBackground />

      <div className="absolute left-3 top-3 z-30 flex items-center gap-2 border-2 border-[#49302C] bg-[#FFF5E5]/95 px-3 py-2 shadow-[0_3px_0_#49302C]">
        <div className="h-8 w-8">
          <BobaCup flavor={FLAVORS[0]} hasCup hasStraw hasPearls hasTea className="h-full w-full" />
        </div>
        <div>
          <p className="font-['Press_Start_2P'] text-[10px] leading-tight text-[#49302C]">Boba Shop</p>
          <p className="font-['Press_Start_2P'] text-[7px] leading-tight text-[#B8743A]">TYCOON</p>
        </div>
      </div>

      <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
        <div className="flex items-center gap-2 border-2 border-[#49302C] bg-[#FFF5E5]/95 px-3 py-2 shadow-[0_3px_0_#49302C]">
          <Coin size={22} />
          <span className="font-['Press_Start_2P'] text-xs text-[#49302C]">{game.coins}</span>
        </div>
        <div className="flex items-center gap-1.5 border-2 border-[#49302C] bg-[#FFF5E5]/95 px-3 py-2 shadow-[0_3px_0_#49302C]">
          <Coffee size={18} strokeWidth={2.5} className="text-[#B8743A]" />
          <span className="font-['Press_Start_2P'] text-[10px] text-[#49302C]">{game.completedOrders}</span>
        </div>
        <button onClick={() => { playClick(); setShowTutorial(true); }} className="border-2 border-[#49302C] bg-[#D9BDFF] p-2 text-[#49302C] shadow-[0_3px_0_#49302C] transition-transform hover:scale-105 active:scale-95" title="How to Play">
          <GraduationCap size={18} strokeWidth={2.5} />
        </button>
        <button onClick={() => { playClick(); game.toggleSound(); }} className="border-2 border-[#49302C] bg-[#FFC99F] p-2 text-[#49302C] shadow-[0_3px_0_#49302C] transition-transform hover:scale-105 active:scale-95" title="Toggle Sound">
          {game.soundEnabled ? <Volume2 size={18} strokeWidth={2.5} /> : <VolumeX size={18} strokeWidth={2.5} />}
        </button>
      </div>

      <div className="absolute left-1/2 top-3 z-20 w-[min(42rem,92vw)] -translate-x-1/2">
        <div className={`border-2 border-[#49302C] bg-[#FFF5E5]/95 px-5 py-4 shadow-[0_5px_0_#49302C] sm:px-6 sm:py-5 ${game.isServing ? "animate-bounce" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#49302C] bg-[#FFC99F] text-3xl shadow-[0_3px_0_#49302C] sm:h-16 sm:w-16 sm:text-4xl">
              {game.customer.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-['Press_Start_2P'] text-[10px] text-[#49302C]">{game.customer.name}</p>
              <p className="mt-1 min-h-[2.5rem] text-sm leading-relaxed text-[#49302C]/80 sm:text-base">
                "{typedDialogue}<span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#49302C]/60 align-middle" />"
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 border-2 border-[#49302C]/20 bg-[#FFE8D0] px-3 py-1.5">
            <span className="font-['Press_Start_2P'] text-[7px] text-[#49302C]/60">ORDER:</span>
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-4 border-2 border-[#49302C]" style={{ backgroundColor: game.currentFlavor.color }} />
              <span className="font-['Press_Start_2P'] text-[8px] text-[#49302C] sm:text-[9px]">{orderLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-[38%] z-15 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-48 w-36 sm:h-56 sm:w-44">
          <BobaCup
            flavor={game.selectedFlavor ?? game.currentFlavor}
            hasCup={game.drink.hasCup}
            hasStraw={game.drink.hasStraw}
            hasPearls={game.drink.hasPearls}
            hasTea={game.drink.hasTea}
            className="h-full w-full drop-shadow-2xl"
          />
          {game.showCoinAnim && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute" style={{ animation: `coinFly 1s ease-out ${i * 0.1}s forwards`, ["--dx" as string]: `${(i - 2) * 30}px`, ["--dy" as string]: `${-60 - i * 10}px` }}>
                  <Coin size={28} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-30 w-[96vw] max-w-4xl -translate-x-1/2">
        <div className="border-4 border-[#49302C] bg-[#FFF5E5]/95 p-4 shadow-[0_7px_0_#49302C] sm:p-5">
          <div className="mb-3 flex items-center justify-between border-b-2 border-[#49302C] pb-2">
            <span className="font-['Press_Start_2P'] text-[9px] text-[#49302C]">CONTROL UNIT // BOBA ASSEMBLY</span>
            <span className="font-['Press_Start_2P'] text-[8px] text-[#49302C]/70">ERRORS {game.mistakes}/3</span>
          </div>

          <div className={`mb-3 border-2 px-3 py-2 text-center ${FEEDBACK_STYLES[game.feedbackType]}`}>
            <p className="font-['Press_Start_2P'] text-[8px] leading-relaxed sm:text-[9px]">
              {typedFeedback}<span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-[#49302C]/60 align-middle" />
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
            {orderedControls.map((control) => {
              const ControlIcon = control.Icon;
              return (
                <button key={control.label} onClick={control.handler} className="flex min-h-[78px] flex-col items-center justify-center gap-1 border-2 border-[#49302C] bg-[#FFE8D0] px-2 py-2 text-[#49302C] shadow-[0_4px_0_#49302C] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_#49302C]">
                  <ControlIcon size={30} />
                  <span className="font-['Press_Start_2P'] text-[7px] sm:text-[8px]">{control.label}</span>
                </button>
              );
            })}
            <button onClick={handleServe} className="col-span-1 flex min-h-[100px] flex-col items-center justify-center gap-1 border-2 border-[#49302C] bg-[#C8E4AD] px-4 py-3 text-[#49302C] shadow-[0_4px_0_#49302C] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_#49302C]">
              <BellIcon size={42} />
              <span className="font-['Press_Start_2P'] text-[7px] sm:text-[8px]">RING BELL</span>
            </button>
          </div>

          <div className="mt-3 border-t-2 border-dashed border-[#49302C]/40 pt-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-['Press_Start_2P'] text-[8px] text-[#49302C]">TEA FLAVOR CONSOLE</span>
              <span className="font-['Press_Start_2P'] text-[7px] text-[#49302C]/60">SELECT AFTER TEA CONTROL</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {FLAVORS.map((flavor) => (
                <button key={flavor.id} onClick={() => handleFlavorSelect(flavor)} className="flex items-center justify-center gap-1.5 border-2 border-[#49302C] px-2 py-2 text-[#49302C] shadow-[0_3px_0_#49302C] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_#49302C]" style={{ backgroundColor: flavor.creamColor }}>
                  <div className="h-4 w-4 shrink-0 border-2 border-[#49302C]" style={{ backgroundColor: flavor.color }} />
                  <span className="font-['Press_Start_2P'] text-[7px] sm:text-[8px]">{flavor.shortName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {game.isServing && (
        <div className="pointer-events-none absolute left-1/2 top-[30%] z-40 -translate-x-1/2">
          <div className="flex items-center gap-2 border-2 border-[#49302C] bg-[#C8E4AD] px-5 py-3 shadow-[0_5px_0_#49302C]">
            <Coin size={28} />
            <span className="font-['Press_Start_2P'] text-sm text-[#49302C]">+{COIN_REWARD} coins!</span>
          </div>
        </div>
      )}

      {showTutorial && (
        <TutorialModal
          onClose={() => setShowTutorial(false)}
          onStart={() => {
            game.markTutorialSeen();
            setShowTutorial(false);
          }}
        />
      )}
    </div>
  );
}
