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
  const spiralRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !giftRef.current ||
      !particlesRef.current ||
      !glowRef.current ||
      !spiralRef.current ||
      !overlayRef.current
    )
      return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // ===== PHASE 1: BUILDUP (1.5s) =====
    // Clean, focused buildup - only the gift scales
    tl.to(
      giftRef.current,
      {
        scale: 18,
        duration: 1.5,
        ease: "power2.in",
      },
      "buildup"
    );

    // Subtle glow builds behind gift
    tl.to(
      glowRef.current,
      {
        opacity: 0.5,
        scale: 2.5,
        duration: 1.5,
        ease: "power2.in",
      },
      "buildup"
    );

    // ===== PHASE 2: EXPLOSION (1.2s) =====
    // Gift bursts with blur
    tl.to(
      giftRef.current,
      {
        scale: 35,
        opacity: 0,
        filter: "blur(60px)",
        duration: 0.6,
        ease: "power3.out",
      },
      "explode"
    );

    // Glow explodes outward
    tl.to(
      glowRef.current,
      {
        scale: 10,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      "explode"
    );

    // White flash at explosion moment
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      {
        opacity: 0.95,
        duration: 0.1,
        ease: "power2.out",
      },
      "explode"
    );

    // Flash fades quickly
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "explode+=0.1"
    );

    // Make particles container visible at explosion moment
    tl.set(particlesRef.current, { opacity: 1 }, "explode");

    // Particles appear and burst outward - ONLY during explosion
    const particles = particlesRef.current.children;
    tl.fromTo(
      particles,
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 2.5,
        x: (i) => Math.cos((i / particles.length) * Math.PI * 2) * 350,
        y: (i) => Math.sin((i / particles.length) * Math.PI * 2) * 350,
        rotation: (i) => i * 90,
        duration: 1.4,
        ease: "power1.out",
        stagger: 0.025,
      },
      "explode+=0.05"
    );

    // Particles fade out - slower and later
    tl.to(
      particles,
      {
        opacity: 0,
        scale: 1.5,
        duration: 0.7,
        ease: "power1.in",
      },
      "explode+=1.0"
    );

    // Make spiral container visible at explosion moment
    tl.set(spiralRef.current, { opacity: 1 }, "explode");

    // Icon spiral effect - appears during explosion
    const spiralIcons = spiralRef.current.children;
    tl.fromTo(
      spiralIcons,
      {
        opacity: 0,
        scale: 0,
        rotation: 0,
      },
      {
        opacity: 0.9,
        scale: (i) => 1.8 - i * 0.1,
        x: (i) =>
          Math.cos((i / spiralIcons.length) * Math.PI * 4) * (180 + i * 25),
        y: (i) =>
          Math.sin((i / spiralIcons.length) * Math.PI * 4) * (180 + i * 25),
        rotation: (i) => i * 50,
        duration: 1.2,
        ease: "power1.out",
        stagger: 0.04,
      },
      "explode+=0.1"
    );

    // Spiral fades out - slower
    tl.to(
      spiralIcons,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power1.in",
      },
      "explode+=0.9"
    );

    // ===== PHASE 3: REVEAL (1.0s) =====
    // Apply theme change during the calm after explosion
    tl.call(
      () => {
        if (onBeforeFadeOut) {
          onBeforeFadeOut();
        }
      },
      [],
      "reveal"
    );

    // Smooth fade out of entire explosion container to reveal new theme
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut",
      },
      "reveal+=0.2"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete, onBeforeFadeOut]);

  // Create particle and spiral elements
  const particleCount = 30;
  const spiralCount = 15;
  const particleEmojis = ["✨", "⭐", "🎁", "🎄", "❄️", "🎉"];
  const spiralEmojis = ["🎮", "🎯", "🎪", "🎨"];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "var(--theme-background)",
        pointerEvents: "none",
      }}
    >
      {/* White flash overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          opacity: 0,
        }}
      />

      {/* Glow effect behind gift */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0) 70%)",
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

      {/* Particles container - HIDDEN until explosion */}
      <div
        ref={particlesRef}
        className="absolute"
        style={{ opacity: 0, zIndex: 10 }}
      >
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className="absolute text-5xl"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              willChange: "transform, opacity",
              filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
            }}
          >
            {particleEmojis[i % particleEmojis.length]}
          </div>
        ))}
      </div>

      {/* Spiral icons container - HIDDEN until explosion */}
      <div
        ref={spiralRef}
        className="absolute"
        style={{ opacity: 0, zIndex: 15 }}
      >
        {Array.from({ length: spiralCount }).map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              willChange: "transform, opacity",
              filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))",
            }}
          >
            {spiralEmojis[i % spiralEmojis.length]}
          </div>
        ))}
      </div>
    </div>
  );
}
