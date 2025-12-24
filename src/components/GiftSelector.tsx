import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../contexts/ThemeContext";
import { themes } from "../config/themes";
import TabSelector from "./TabSelector";
import CouponCard from "./CouponCard";
import ExplosionTransition from "./ExplosionTransition";
import IntroScreen from "./IntroScreen";

const gameThemes = [
  { id: 1, themeId: "expedition33", name: themes.expedition33.name },
  { id: 2, themeId: "baldursgate3", name: themes.baldursgate3.name },
];

export default function GiftSelector() {
  const { currentTheme, setTheme, fadeOutCurrentAudio, startChristmasMusic } =
    useTheme();
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const hasPlayedExplosion = useRef(false);

  const handleIntroComplete = () => {
    console.log("Starting Christmas music on View Gift click...");
    // Start Christmas music immediately on user interaction
    startChristmasMusic();

    // Hide intro screen to reveal the neutral Christmas view underneath
    setShowIntro(false);
  };

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const elements =
      containerRef.current?.querySelectorAll(".animate-on-mount");
    if (elements) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    }
  }, [isVisible]);

  const handleTabChange = (tab: number) => {
    if (tab === activeTab) return;

    // If first selection from neutral state, trigger explosion animation
    if (activeTab === null && !hasPlayedExplosion.current) {
      hasPlayedExplosion.current = true;

      // Fade out Christmas music FIRST
      fadeOutCurrentAudio();

      // Apply theme INSTANTLY (will start new audio)
      const gameTheme = gameThemes.find((t) => t.id === tab);
      if (gameTheme) {
        setTheme(gameTheme.themeId);
      }
      setActiveTab(tab);

      // Show explosion (theme already applied)
      setShowExplosion(true);
      return;
    }

    // Normal theme switching (after first selection)
    const gameTheme = gameThemes.find((t) => t.id === tab);
    if (gameTheme) {
      setTheme(gameTheme.themeId);
    }

    // Switching between selections
    const currentCoupon = containerRef.current?.querySelector(
      `#coupon-${activeTab}`
    );
    const nextCoupon = containerRef.current?.querySelector(`#coupon-${tab}`);

    if (currentCoupon && nextCoupon) {
      gsap.to(currentCoupon, {
        opacity: 0,
        x: -30,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(tab);
          gsap.fromTo(
            nextCoupon,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }
          );
        },
      });
    } else {
      setActiveTab(tab);
    }
  };

  const handleBeforeFadeOut = () => {
    // Theme already applied instantly, nothing to do
  };

  const handleExplosionComplete = () => {
    console.log("Explosion complete, revealing theme...");
    setShowExplosion(false);

    // Animate in content with smooth transitions
    setTimeout(() => {
      const nextCoupon = containerRef.current?.querySelector(
        `#coupon-${activeTab}`
      );
      if (nextCoupon) {
        gsap.fromTo(
          nextCoupon,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power2.out" }
        );
      }

      const header = containerRef.current?.querySelector("h2");
      const subtitle = containerRef.current?.querySelector("p");
      if (header && subtitle) {
        gsap.fromTo(
          [header, subtitle],
          { opacity: 0, y: -15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
          }
        );
      }
    }, 300);
  };

  const coupon1 = themes.expedition33.couponData;
  const coupon2 = themes.baldursgate3.couponData;

  return (
    <>
      {/* Neutral Christmas view - always rendered underneath */}
      <div ref={containerRef} className="max-w-md mx-auto py-6 px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-2 animate-on-mount opacity-0 theme-transition"
          style={{
            color: "var(--theme-text)",
            textTransform: "var(--text-transform)",
          }}
        >
          {activeTab === null
            ? "Choose your coupon"
            : currentTheme.couponData.name}
        </h2>
        <p
          className="text-center mb-8 animate-on-mount opacity-0 theme-transition"
          style={{
            color: "var(--theme-text-secondary)",
            textTransform: "var(--text-transform)",
          }}
        >
          {activeTab === null ? "" : currentTheme.couponData.description}
        </p>

        <div className="mb-8 animate-on-mount opacity-0">
          <TabSelector
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tab1Label={activeTab === null ? "Coupon 1" : gameThemes[0].name}
            tab2Label={activeTab === null ? "Coupon 2" : gameThemes[1].name}
          />

          <div className="relative min-h-[500px]">
            {activeTab === null && (
              <div className="flex items-center justify-center h-[500px]">
                <div
                  className="text-center theme-transition"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  <div className="text-6xl mb-4">🎁</div>
                  <p className="text-lg">Select a gift above to begin</p>
                  <p
                    className="text-sm mt-8"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    🎄 Merry Christmas! 🎄
                  </p>
                </div>
              </div>
            )}
            <div
              id="coupon-1"
              className={`${activeTab === 1 ? "block" : "hidden"}`}
            >
              <CouponCard {...coupon1} />
            </div>
            <div
              id="coupon-2"
              className={`${activeTab === 2 ? "block" : "hidden"}`}
            >
              <CouponCard {...coupon2} />
            </div>
          </div>
        </div>

        {activeTab !== null && (
          <div
            className="text-center text-sm animate-on-mount opacity-0 theme-transition"
            style={{ color: "var(--theme-text-secondary)", opacity: 0.8 }}
          >
            <p>🎮 Happy Gaming! 🎮</p>
          </div>
        )}
      </div>

      {showIntro && <IntroScreen onEnter={handleIntroComplete} />}

      {showExplosion && (
        <ExplosionTransition
          onComplete={handleExplosionComplete}
          onBeforeFadeOut={handleBeforeFadeOut}
        />
      )}
    </>
  );
}
