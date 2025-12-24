import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Animate in the intro content
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.3,
      }
    );
  }, []);

  const handleClick = () => {
    if (!containerRef.current) return;

    // Animate out the intro screen
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        onEnter();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #c41e3a 0%, #8b2635 30%, #2d5016 70%, #1e3a0f 100%)",
      }}
    >
      <div ref={contentRef} className="text-center px-6 max-w-lg">
        {/* Christmas decorations */}
        <div className="text-6xl mb-6 opacity-0">🎄✨🎁✨🎄</div>

        {/* Main title */}
        <h1
          className="text-5xl md:text-6xl font-bold mb-4 opacity-0"
          style={{
            color: "#ffffff",
          }}
        >
          Merry Christmassssss!
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl mb-8 opacity-0"
          style={{ color: "#ffd700" }}
        >
          🎄 Your gift awaits... 🎁
        </p>

        {/* View Gift button */}
        <button
          onClick={handleClick}
          className="opacity-0 group relative px-8 py-4 text-lg font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
            color: "#1a1a2e",
            boxShadow: "0 10px 30px rgba(255, 215, 0, 0.3)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            🎁 View Gift
          </span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #ffed4e 0%, #ffd700 100%)",
            }}
          />
        </button>

        {/* Snowflakes decoration */}
        <div className="text-4xl mt-8 opacity-0">❄️ ❄️ ❄️</div>
      </div>
    </div>
  );
}
