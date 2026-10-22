import { X } from "lucide-react";
import { CupIcon, PearlIcon, StrawIcon, TeaIcon, BellIcon } from "./PixelIcons";
import { playClick } from "@/game/sounds";

interface TutorialModalProps {
  onClose: () => void;
  onStart: () => void;
}

const TUTORIAL_STEPS = [
  {
    title: "Choose a Cup",
    desc: "Click the Cup button to grab an empty glass for the drink.",
    icon: CupIcon,
  },
  {
    title: "Add a Straw",
    desc: "Click the Straw button to pop a colorful straw into the cup.",
    icon: StrawIcon,
  },
  {
    title: "Scoop Pearls",
    desc: "Click the Tapioca button to add chewy boba pearls at the bottom.",
    icon: PearlIcon,
  },
  {
    title: "Pour the Tea",
    desc: "Pick the flavor the customer ordered. Get it right to continue!",
    icon: TeaIcon,
  },
  {
    title: "Ring & Serve",
    desc: "Click the Bell to serve and earn coins. Then the next customer arrives!",
    icon: BellIcon,
  },
];

export function TutorialModal({ onClose, onStart }: TutorialModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#49302C]/60 p-4 backdrop-blur-sm">
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border-4 border-[#49302C] bg-[#FFF5E5] shadow-[0_8px_0_#49302C]"
        style={{ animation: "modalIn 0.25s ease-out" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-[#49302C] bg-[#FFC99F] px-5 py-3">
          <h2 className="font-['Press_Start_2P'] text-sm text-[#49302C] sm:text-base">
            How to Play
          </h2>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="rounded-lg border-2 border-[#49302C] bg-[#FFF5E5] p-1.5 text-[#49302C] transition-transform hover:scale-110 active:scale-95"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-4 p-5">
          <p className="mb-2 text-center font-['Press_Start_2P'] text-[10px] text-[#49302C]">
            Make the perfect boba in 5 steps!
          </p>

          {TUTORIAL_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border-2 border-[#49302C]/15 bg-white/60 p-3"
                style={{ animation: `slideIn 0.3s ease-out ${i * 0.08}s both` }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#49302C] shadow-[0_3px_0_#49302C]"
                  style={{
                    backgroundColor: [
                      "#FFB8CA", "#FFC99F", "#C8E4AD", "#D9BDFF", "#B9DDFF",
                    ][i],
                  }}
                >
                  <Icon size={28} />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#49302C] bg-[#49302C] font-['Press_Start_2P'] text-[8px] text-[#FFF5E5]">
                      {i + 1}
                    </span>
                    <h3 className="font-['Press_Start_2P'] text-[10px] text-[#49302C]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 pl-7 text-xs leading-relaxed text-[#49302C]/80">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Start button */}
        <div className="sticky bottom-0 border-t-2 border-[#49302C] bg-[#FFF5E5] p-4">
          <button
            onClick={() => {
              playClick();
              onStart();
            }}
            className="w-full rounded-xl border-2 border-[#49302C] bg-[#C8E4AD] px-6 py-3 font-['Press_Start_2P'] text-xs text-[#49302C] shadow-[0_4px_0_#49302C] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_5px_0_#49302C] active:translate-y-1 active:shadow-[0_1px_0_#49302C]"
          >
            Let's Start!
          </button>
        </div>
      </div>
    </div>
  );
}
