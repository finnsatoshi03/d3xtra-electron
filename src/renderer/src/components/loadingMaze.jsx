import { useState, useEffect } from "react";

function Loading() {
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    const texts = [
      "Loading...",
      "Plotting Vertices",
      "Tracing available paths",
      "Finding obstacles",
      "Determining best path",
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className="text fade-in">{loadingText}</div>
    </div>
  );
}

export default Loading;
