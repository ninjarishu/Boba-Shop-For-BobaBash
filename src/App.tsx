import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MainMenu } from "@/components/MainMenu";
import { ShopScene } from "@/components/ShopScene";
import { TutorialModal } from "@/components/TutorialModal";
import { SOUND_KEY } from "@/game/constants";
import { setSoundEnabled } from "@/game/sounds";
import type { Screen } from "@/game/types";

function loadBool(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === "true";
  } catch {
    return fallback;
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [showMenuTutorial, setShowMenuTutorial] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(() => loadBool(SOUND_KEY, true));

  useEffect(() => {
    setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabledState(next);
    try { localStorage.setItem(SOUND_KEY, String(next)); } catch { /* ignore */ }
  };

  return (
    <div className="fixed inset-0 bg-[#FFF5E5]">
      {screen === "loading" && (
        <LoadingScreen onComplete={() => setScreen("menu")} />
      )}

      {screen === "menu" && (
        <div className="screen-fade">
          <MainMenu
            onPlay={() => setScreen("shop")}
            onTutorial={() => setShowMenuTutorial(true)}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
          />
          {showMenuTutorial && (
            <TutorialModal
              onClose={() => setShowMenuTutorial(false)}
              onStart={() => setShowMenuTutorial(false)}
            />
          )}
        </div>
      )}

      {screen === "shop" && (
        <div className="screen-fade">
          <ShopScene />
        </div>
      )}
    </div>
  );
}
