interface TabSelectorProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export default function TabSelector({
  activeTab,
  onTabChange,
}: TabSelectorProps) {
  return (
    <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1 mb-6">
      <button
        onClick={() => onTabChange(1)}
        className={`flex-1 py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
          activeTab === 1
            ? "bg-white text-christmas-red"
            : "text-white hover:bg-white/20"
        }`}
      >
        Gift 1
      </button>
      <button
        onClick={() => onTabChange(2)}
        className={`flex-1 py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
          activeTab === 2
            ? "bg-white text-christmas-red"
            : "text-white hover:bg-white/20"
        }`}
      >
        Gift 2
      </button>
    </div>
  );
}
