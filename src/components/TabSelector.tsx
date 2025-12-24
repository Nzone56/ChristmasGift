interface TabSelectorProps {
  activeTab: number | null;
  onTabChange: (tab: number) => void;
  tab1Label?: string;
  tab2Label?: string;
}

export default function TabSelector({
  activeTab,
  onTabChange,
  tab1Label = "Gift 1",
  tab2Label = "Gift 2",
}: TabSelectorProps) {
  return (
    <div
      className="flex gap-2 backdrop-blur-sm rounded-full p-1 mb-6 theme-transition"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      <button
        onClick={() => onTabChange(1)}
        className={`flex-1 py-3 px-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base theme-transition ${
          activeTab === 1 ? "text-white" : "hover:bg-white/20"
        }`}
        style={
          activeTab === 1
            ? {
                backgroundColor: "var(--theme-primary)",
                color: "var(--theme-text)",
              }
            : {
                color: "var(--theme-text)",
                opacity: activeTab === null ? 0.7 : 1,
              }
        }
      >
        {tab1Label}
      </button>
      <button
        onClick={() => onTabChange(2)}
        className={`flex-1 py-3 px-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base theme-transition ${
          activeTab === 2 ? "text-white" : "hover:bg-white/20"
        }`}
        style={
          activeTab === 2
            ? {
                backgroundColor: "var(--theme-primary)",
                color: "var(--theme-text)",
              }
            : {
                color: "var(--theme-text)",
                opacity: activeTab === null ? 0.7 : 1,
              }
        }
      >
        {tab2Label}
      </button>
    </div>
  );
}
