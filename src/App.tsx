import { useEffect, useRef, useState } from "react";
import bgMusic from "./components/bgmusic.mp3";

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
  const [soundEnabled, setSoundEnabledState] = useState(() =>
    loadBool(SOUND_KEY, true)
  );

  // Background music
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState("");

  useEffect(() => {
    setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  // Try autoplay on startup, then retry after the first user interaction.
  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    let disposed = false;

    const startMusic = async () => {
      if (!audio.paused || disposed) return;

      try {
        await audio.play();
        if (!disposed) setMusicError("");
      } catch {
        // Autoplay may be blocked until the player interacts.
      }
    };

    const startAfterInteraction = () => {
      void startMusic();
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
    };

    void startMusic();

    window.addEventListener("pointerdown", startAfterInteraction);
    window.addEventListener("keydown", startAfterInteraction);

    return () => {
      disposed = true;
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
    };
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabledState(next);

    try {
      localStorage.setItem(SOUND_KEY, String(next));
    } catch {
      // Ignore storage errors.
    }
  };

  const toggleMusic = async () => {
    const audio = musicRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setMusicError("");
      return;
    }

    try {
      setMusicError("");
      await audio.play();
    } catch (error) {
      console.error("Background music failed:", error);
      setMusicError("Couldn't play music. Check the audio file.");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#FFF5E5]">
      {/* Background music */}
      <audio
        ref={musicRef}
        src={bgMusic}
        loop
        preload="auto"
        onPlay={() => {
          setMusicPlaying(true);
          setMusicError("");
        }}
        onPause={() => setMusicPlaying(false)}
        onError={() => {
          setMusicPlaying(false);
          setMusicError("Audio file could not be loaded.");
        }}
      />

      {/* Small square music button */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Turn music off" : "Turn music on"}
        aria-pressed={musicPlaying}
        title={musicPlaying ? "Turn music off" : "Turn music on"}
        className="fixed bottom-4 right-4 z-[9999] flex h-11 w-11 items-center justify-center rounded-lg border-2 border-[#49302C] bg-[#FFF5E5] text-2xl text-[#49302C] shadow-[0_3px_0_#49302C] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#FFB8CA] active:translate-y-0.5 active:shadow-none"
      >
        {musicPlaying ? "♫" : "♪"}
      </button>

      {/* Music error message */}
      {musicError && (
        <div
          role="status"
          className="fixed bottom-20 right-4 z-[9999] max-w-xs rounded-lg border-2 border-[#49302C] bg-[#FFF5E5] px-3 py-2 text-sm font-semibold text-[#49302C] shadow-lg"
        >
          {musicError}
        </div>
      )}

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