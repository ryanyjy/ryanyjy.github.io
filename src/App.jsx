import { useEffect, useRef, useState } from "react";
import MovingLines from "./components/MovingLines";
import SocialLinks from "./components/SocialLinks";

const TEAL = "#3397c1";
const BACKGROUND_INTERVAL_MS = 15_000;

export default function App() {
  const [isTeal, setIsTeal] = useState(false);
  const audioRef = useRef(null);
  const resumeOnVisibleRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTeal((prev) => !prev);
    }, BACKGROUND_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;

    const tryPlay = () => {
      audio.play().catch(() => {});
    };

    tryPlay();

    const startOnInteraction = () => {
      tryPlay();
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };

    document.addEventListener("click", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);

    const onVisibilityChange = () => {
      if (document.hidden) {
        resumeOnVisibleRef.current = !audio.paused;
        audio.pause();
      } else if (resumeOnVisibleRef.current) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden transition-colors duration-5000"
      style={{ backgroundColor: isTeal ? TEAL : "#ffffff" }}
    >
      <audio
        ref={audioRef}
        src="/music/sci-fi-movie-by-everything-is-dead.mp3"
        preload="auto"
      />
      <MovingLines isTeal={isTeal} />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/65"
        aria-hidden="true"
      />
      {/* <SocialLinks isTeal={isTeal} /> */}
      <main className="pointer-events-none relative z-30 flex h-full items-center justify-center px-6">
        <h1
          className="relative z-30 font-xirod text-center text-4xl tracking-wide transition-colors duration-1000 sm:text-5xl md:text-6xl lg:text-7xl lg:leading-none text-white"
        >
          OFFLINE FOR UPGRADES
        </h1>
      </main>
    </div>
  );
}
