import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ExplosionTransitionProps {
  onComplete: () => void;
  onBeforeFadeOut?: () => void;
}

export default function ExplosionTransition({
  onComplete,
  onBeforeFadeOut,
}: ExplosionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const giftRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !giftRef.current ||
      !particlesRef.current ||
      !glowRef.current
    )
      return;

    const tl = gsap.timeline({
      onComplete: () => {
        console.log("Explosion animation complete");
        onComplete();
      },
    });

    // ===== PHASE 1: BUILDUP (1.2s) =====
    // Dramatic scaling with anticipation
    tl.to(giftRef.current, {
      scale: 20,
      duration: 1.2,
      ease: "power2.in",
    });

    // Glow builds up
    tl.to(
      glowRef.current,
      {
        opacity: 0.6,
        scale: 2,
        duration: 1.2,
        ease: "power2.in",
      },
      0
    );

    // ===== PHASE 2: EXPLOSION (1.0s) =====
    // Clear, visible explosion burst
    tl.to(
      giftRef.current,
      {
        scale: 40,
        opacity: 0,
        filter: "blur(50px)",
        duration: 0.5,
        ease: "power3.out",
      },
      "explosion"
    );

    // Glow explodes outward
    tl.to(
      glowRef.current,
      {
        scale: 8,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "explosion"
    );

    // Particles burst outward - CLEARLY VISIBLE
    const particles = particlesRef.current.children;
    tl.to(
      particles,
      {
        scale: 3.5,
        opacity: 0,
        x: (i) => Math.cos((i / particles.length) * Math.PI * 2) * 600,
        y: (i) => Math.sin((i / particles.length) * Math.PI * 2) * 600,
        rotation: (i) => i * 90,
        duration: 1.0,
        ease: "power2.out",
        stagger: 0.02,
      },
      "explosion+=0.1"
    );

    // Multiple flash effects for impact
    tl.to(
      containerRef.current,
      {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        duration: 0.15,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 2,
      },
      "explosion"
    );

    // ===== PHASE 3: POST-EXPLOSION TRANSITION (0.8s) =====
    // Apply theme change before fade-out starts
    tl.call(
      () => {
        console.log("Applying theme change before fade-out...");
        if (onBeforeFadeOut) {
          onBeforeFadeOut();
        }
      },
      [],
      "+=0.2"
    );

    // Smooth fade to reveal theme (theme already applied)
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "+=0.3"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // Create particle elements
  const particleCount = 20;
  const particleEmojis = ["✨", "⭐", "🎁", "🎄", "❄️", "🎉"];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "var(--theme-background)",
        pointerEvents: "none",
      }}
    >
      {/* Glow effect behind gift */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0) 70%)",
          opacity: 0,
        }}
      />

      {/* Main gift icon that scales up */}
      <div
        ref={giftRef}
        className="text-9xl"
        style={{
          position: "absolute",
          filter: "drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))",
        }}
      >
        🎁
      </div>

      {/* Particles container */}
      <div ref={particlesRef} className="absolute">
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className="absolute text-5xl"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {particleEmojis[i % particleEmojis.length]}
          </div>
        ))}
      </div>
    </div>
  );
}
