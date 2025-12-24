import { useState } from "react";

interface CouponCardProps {
  frontIcon: string;
  frontTitle: string;
  frontSubtitle: string;
  frontStars: string;
  backIcon: string;
  backTitle: string;
  backDescription: string;
  backValue: string;
  backGradient: string;
  instructions: string[];
}

export default function CouponCard({
  frontIcon,
  frontTitle,
  frontSubtitle,
  frontStars,
  backIcon,
  backTitle,
  backDescription,
  backValue,
  backGradient,
  instructions,
}: CouponCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="coupon-wrapper">
      <div
        className={`coupon-card ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="coupon-inner">
          <div className="coupon-front">
            <div className="bg-white rounded-2xl shadow-2xl p-6 h-full flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">{frontIcon}</div>
              <h3 className="text-2xl font-bold text-christmas-red mb-2">
                {frontTitle}
              </h3>
              <p className="text-gray-600 text-center">{frontSubtitle}</p>
              <div className="mt-4 text-4xl font-bold text-christmas-gold">
                {frontStars}
              </div>
            </div>
          </div>
          <div className="coupon-back">
            <div
              className={`${backGradient} rounded-2xl shadow-2xl p-6 h-full flex flex-col items-center justify-center text-white`}
            >
              <div className="text-5xl mb-4">{backIcon}</div>
              <h3 className="text-2xl font-bold mb-3">{backTitle}</h3>
              <p className="text-center text-lg mb-4">{backDescription}</p>
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-sm font-semibold">{backValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
        <h4 className="font-bold mb-2 text-christmas-gold">How to Redeem:</h4>
        <ul className="text-sm space-y-1 list-disc list-inside">
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
