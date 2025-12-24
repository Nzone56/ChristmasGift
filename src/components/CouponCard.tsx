import { useState } from "react";

interface CouponCardProps {
  name: string;
  instructions: string[];
  image?: string;
  logo: string;
}

export default function CouponCard({
  name,
  instructions,
  image,
  logo,
}: CouponCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="coupon-wrapper">
      <div
        className={`coupon-card ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="coupon-inner theme-transition">
          <div className="coupon-front">
            <div
              className="rounded-2xl shadow-2xl p-6 h-full flex flex-col items-center justify-center overflow-hidden relative theme-transition"
              style={{ backgroundColor: "var(--theme-card-bg)" }}
            >
              {logo && (
                <div className="">
                  <img
                    src={logo}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="coupon-back">
            <div
              className="rounded-2xl shadow-2xl p-6 h-full flex flex-col items-center justify-center theme-transition"
              style={{ background: "var(--theme-card-bg)" }}
            >
              {image && (
                <div className="">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {instructions.length > 0 && (
        <div
          className="mt-6 backdrop-blur-sm rounded-xl p-4 theme-transition"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <h4
            className="font-bold mb-2 theme-transition"
            style={{
              color: "var(--theme-secondary)",
              textTransform: "var(--text-transform)",
            }}
          >
            Coupon Instructions:
          </h4>
          <ul
            className="text-xs space-y-2 list-none theme-transition"
            style={{ color: "var(--theme-text)" }}
          >
            {instructions.map((instruction, index) => (
              <li key={index} className="leading-relaxed">
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
