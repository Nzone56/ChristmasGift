export interface GameTheme {
  id: string;
  name: string;
  font: string;
  textTransform?: "uppercase" | "none";
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundGradient: string;
    text: string;
    textSecondary: string;
    cardBg: string;
    cardBgGradient: string;
  };
  audio: string;
  couponData: {
    name: string;
    description: string;
    instructions: string[];
    image: string;
    logo: string;
  };
}

export const themes: Record<string, GameTheme> = {
  neutral: {
    id: "neutral",
    name: "Choose your coupon",
    font: "system-ui, -apple-system, sans-serif",
    colors: {
      primary: "#c41e3a",
      secondary: "#2d5016",
      accent: "#ffd700",
      background: "#1a1a2e",
      backgroundGradient:
        "linear-gradient(135deg, #c41e3a 0%, #8b2635 30%, #2d5016 70%, #1e3a0f 100%)",
      text: "#ffffff",
      textSecondary: "#ffd700",
      cardBg: "#2a1a1a",
      cardBgGradient: "linear-gradient(135deg, #c41e3a 0%, #2d5016 100%)",
    },
    audio: "/audio/christmas.mp3",
    couponData: {
      name: "placeholder",
      description: "",
      instructions: [],
      image: "",
      logo: "",
    },
  },
  expedition33: {
    id: "expedition33",
    name: "Clair Obscur: Expedition 33",
    font: "'Cinzel', serif",
    colors: {
      primary: "#2a2a2a",
      secondary: "#b8945f",
      accent: "#6b4c9a",
      background: "#1a1a1a",
      backgroundGradient:
        "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #3d3154 100%)",
      text: "#e8e8e8",
      textSecondary: "#b8945f",
      cardBg: "#2a2a2a",
      cardBgGradient: "linear-gradient(135deg, #2a2a2a 0%, #3d3154 100%)",
    },
    audio: "/audio/alicia.mp3",
    couponData: {
      name: "Clair Obscur: Expedition 33",
      description: "F-JRPG AKA: The only good thing the French have done",
      instructions: [
        "📜 This coupon grants the bearer the sacred and unquestionable right to claim one (1) copy of Clair Obscur: Expedition 33 for PS5 🎮✨",
        "⏳ This coupon is valid for 3 months from the date of issue",
        "🤝😌 After expiration, please contact Administration to negotiate a possible gift exchange (no guarantees, no promises, no refunds)",
        "💥🎂 This coupon can be combined with the Birthday Coupon, increasing its power level and allowing the user to obtain both gifts at the same time, avoiding the suffering of choosing only one",
        "❌ Non-transferable (unless Administration randomly approves it)",
        "💸 No cash value",
        "🥲🍽️ Void if lost, eaten, or if it suffers emotional damage",
      ],
      image: "/images/ex33-coupon.png",
      logo: "/images/ex33-logo.webp",
    },
  },
  baldursgate3: {
    id: "baldursgate3",
    name: "Baldur's Gate 3",
    font: "'Alegreya', serif",
    textTransform: "uppercase",
    colors: {
      primary: "#744979",
      secondary: "#e0a40b",
      accent: "#b84028",
      background: "#2d1b2e",
      backgroundGradient:
        "linear-gradient(135deg, #2d1b2e 0%, #744979 50%, #d0a1d3 100%)",
      text: "#f0d794",
      textSecondary: "#d0a1d3",
      cardBg: "#3d2940",
      cardBgGradient: "linear-gradient(135deg, #3d2940 0%, #744979 100%)",
    },
    audio: "/audio/down-by-the-river.mp3",
    couponData: {
      name: "Baldur's Gate 3",
      description: "Undoubtedly the GOTC",
      instructions: [
        "📜 This coupon grants the bearer the sacred and unquestionable right to claim one (1) copy of Baldur's Gate 3 for PS5 🎮✨",
        "⏳ This coupon is valid for 3 months from the date of issue",
        "🤝😌 After expiration, please contact Administration to negotiate a possible gift exchange (no guarantees, no promises, no refunds)",
        "💥🎂 This coupon can be combined with the Birthday Coupon, increasing its power level and allowing the user to obtain both gifts at the same time, avoiding the suffering of choosing only one",
        "❌ Non-transferable (unless Administration randomly approves it)",
        "💸 No cash value",
        "🥲🍽️ Void if lost, eaten, or if it suffers emotional damage",
      ],
      image: "/images/baldursgate3.jpg",
      logo: "/images/bg3-logo.png",
    },
  },
};

export const defaultTheme = themes.neutral;
