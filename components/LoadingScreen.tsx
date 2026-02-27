"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 300);
          return 100;
        }
        return prev + Math.random() * 20 + 8;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-eveagle-bg flex items-center justify-center transition-opacity duration-300 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Simple brand text */}
        <div className="font-display text-3xl font-bold text-eveagle-text">
          Eveagle
        </div>
        
        {/* Minimal progress line */}
        <div className="w-24 h-[2px] bg-eveagle-bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-eveagle-accent transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
