import { useState } from "react";
import Loader from "./Loader";
import GiftSelector from "./GiftSelector";

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      {!showLoader && (
        <main className="min-h-screen px-4 py-8 md:py-12">
          <GiftSelector />
        </main>
      )}
    </>
  );
}
