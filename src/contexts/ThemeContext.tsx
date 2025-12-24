import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { GameTheme } from "../config/themes";
import { themes, defaultTheme } from "../config/themes";
import { gsap } from "gsap";

interface ThemeContextType {
  currentTheme: GameTheme;
  setTheme: (themeId: string) => void;
  isTransitioning: boolean;
  fadeOutCurrentAudio: () => void;
  startChristmasMusic: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<GameTheme>(defaultTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousAudioRef = useRef<HTMLAudioElement | null>(null);

  const startChristmasMusic = () => {
    if (typeof window === "undefined") return;
    if (audioRef.current && !audioRef.current.paused) return; // Already playing

    console.log("Starting Christmas music...");
    const audio = new Audio("/audio/christmas.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    audio
      .play()
      .then(() => console.log("Christmas music playing!"))
      .catch((error) => {
        console.error("Failed to play Christmas music:", error);
      });
  };

  const fadeOutCurrentAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      console.log("Fading out Christmas music...");
      const currentAudio = audioRef.current;
      gsap.to(currentAudio, {
        volume: 0,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          currentAudio.pause();
          console.log("Christmas music stopped");
        },
      });
    }
  };

  const setTheme = (themeId: string) => {
    const newTheme = themes[themeId];
    if (!newTheme || newTheme.id === currentTheme.id) return;

    setIsTransitioning(true);

    // Stop and fade out previous audio immediately (only if not already fading)
    if (
      audioRef.current &&
      audioRef.current.src &&
      audioRef.current.volume > 0
    ) {
      const currentAudio = audioRef.current;
      gsap.to(currentAudio, {
        volume: 0,
        duration: 0.5,
        onComplete: () => {
          currentAudio.pause();
          currentAudio.src = "";
        },
      });
    }

    // Clear any lingering previous audio
    if (previousAudioRef.current) {
      previousAudioRef.current.pause();
      previousAudioRef.current.src = "";
      previousAudioRef.current = null;
    }

    // Update theme and CSS variables immediately for synchronization
    setCurrentTheme(newTheme);

    // Update CSS variables synchronously
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(
        "--theme-primary",
        newTheme.colors.primary
      );
      document.documentElement.style.setProperty(
        "--theme-secondary",
        newTheme.colors.secondary
      );
      document.documentElement.style.setProperty(
        "--theme-accent",
        newTheme.colors.accent
      );
      document.documentElement.style.setProperty(
        "--theme-background",
        newTheme.colors.background
      );
      document.documentElement.style.setProperty(
        "--theme-text",
        newTheme.colors.text
      );
      document.documentElement.style.setProperty(
        "--theme-text-secondary",
        newTheme.colors.textSecondary
      );
      document.documentElement.style.setProperty(
        "--theme-card-bg",
        newTheme.colors.cardBg
      );
      document.documentElement.style.setProperty(
        "--font-family",
        newTheme.font
      );
      document.documentElement.style.setProperty(
        "--text-transform",
        newTheme.textTransform || "none"
      );
    }

    // Start new audio if theme has audio
    if (newTheme.audio) {
      console.log("Starting theme audio:", newTheme.audio);
      const newAudio = new Audio(newTheme.audio);
      newAudio.loop = true;
      newAudio.volume = 0;

      newAudio
        .play()
        .then(() => {
          console.log("Theme audio playing successfully!");
          gsap.to(newAudio, {
            volume: 0.4,
            duration: 1.5,
          });
        })
        .catch((error) => {
          console.error("Audio autoplay prevented:", error);
        });

      audioRef.current = newAudio;
    } else {
      audioRef.current = null;
    }

    // End transition state
    setTimeout(() => setIsTransitioning(false), 100);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(
        "--theme-primary",
        currentTheme.colors.primary
      );
      document.documentElement.style.setProperty(
        "--theme-secondary",
        currentTheme.colors.secondary
      );
      document.documentElement.style.setProperty(
        "--theme-accent",
        currentTheme.colors.accent
      );
      document.documentElement.style.setProperty(
        "--theme-background",
        currentTheme.colors.background
      );
      document.documentElement.style.setProperty(
        "--theme-text",
        currentTheme.colors.text
      );
      document.documentElement.style.setProperty(
        "--theme-text-secondary",
        currentTheme.colors.textSecondary
      );
      document.documentElement.style.setProperty(
        "--theme-card-bg",
        currentTheme.colors.cardBg
      );
      document.documentElement.style.setProperty(
        "--font-family",
        currentTheme.font
      );
      document.documentElement.style.setProperty(
        "--text-transform",
        currentTheme.textTransform || "none"
      );
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        isTransitioning,
        fadeOutCurrentAudio,
        startChristmasMusic,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
