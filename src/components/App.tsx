import { ThemeProvider } from "../contexts/ThemeContext";
import GiftSelector from "./GiftSelector";

export default function App() {
  return (
    <ThemeProvider>
      <main className="min-h-screen theme-transition">
        <GiftSelector />
      </main>
    </ThemeProvider>
  );
}
