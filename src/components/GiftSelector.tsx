import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import TabSelector from "./TabSelector";
import CouponCard from "./CouponCard";

const coupons = [
  {
    id: 1,
    frontIcon: "🎁",
    frontTitle: "Premium Gift",
    frontSubtitle: "Tap to reveal your bonus",
    frontStars: "★",
    backIcon: "✨",
    backTitle: "Extra Day Off",
    backDescription: "Enjoy an additional vacation day in 2025!",
    backValue: "Bonus Value: 1 Day",
    backGradient: "bg-gradient-to-br from-christmas-gold to-yellow-500",
    instructions: [
      "Present this coupon to HR",
      "Valid for the entire year 2025",
      "Must be used in one full day",
      "Requires 2 weeks advance notice",
    ],
  },
  {
    id: 2,
    frontIcon: "🎄",
    frontTitle: "Deluxe Gift",
    frontSubtitle: "Tap to reveal your bonus",
    frontStars: "★★",
    backIcon: "💰",
    backTitle: "Cash Bonus",
    backDescription: "Receive a special year-end cash bonus!",
    backValue: "Bonus Value: $500",
    backGradient: "bg-gradient-to-br from-christmas-green to-green-600",
    instructions: [
      "Present this coupon to Finance",
      "Will be added to January paycheck",
      "Subject to standard tax withholding",
      "Must redeem by December 31, 2024",
    ],
  },
];

export default function GiftSelector() {
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

    const currentCoupon = containerRef.current?.querySelector(
      `#coupon-${activeTab}`
    );
    const nextCoupon = containerRef.current?.querySelector(`#coupon-${tab}`);

    if (currentCoupon && nextCoupon) {
      gsap.to(currentCoupon, {
        opacity: 0,
        x: -30,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(tab);
          gsap.fromTo(
            nextCoupon,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }
          );
        },
      });
    }
  };

  return (
    <div ref={containerRef} className="max-w-md mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2 animate-on-mount opacity-0">
        Choose Your Gift
      </h2>
      <p className="text-center text-christmas-gold mb-8 animate-on-mount opacity-0">
        Select one coupon to redeem your Christmas bonus
      </p>

      <div className="mb-8 animate-on-mount opacity-0">
        <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="relative min-h-[500px]">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              id={`coupon-${coupon.id}`}
              className={`${activeTab === coupon.id ? "block" : "hidden"}`}
            >
              <CouponCard {...coupon} />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-white/80 text-sm animate-on-mount opacity-0">
        <p>🎅 Happy Holidays! 🎅</p>
      </div>
    </div>
  );
}
