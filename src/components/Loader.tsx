import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      },
    });

    tl.fromTo(
      text1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(
        text2Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        text3Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .to([text1Ref.current, text2Ref.current, text3Ref.current], {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.in",
        delay: 1,
      });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-christmas-red via-red-900 to-christmas-green"
    >
      <div className="text-center">
        <h1
          ref={text1Ref}
          className="text-4xl md:text-6xl font-bold text-white mb-4 opacity-0"
        >
          Merry
        </h1>
        <h1
          ref={text2Ref}
          className="text-4xl md:text-6xl font-bold text-christmas-gold mb-4 opacity-0"
        >
          Christmas!
        </h1>
        <p ref={text3Ref} className="text-xl md:text-2xl text-white opacity-0">
          🎄 Your gift awaits... 🎁
        </p>
      </div>
    </div>
  );
}
