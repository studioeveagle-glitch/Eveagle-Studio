"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const text = "Eveagle";
    let index = 0;

    // Type out letters
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        // Blink cursor a few times then complete
        setTimeout(() => {
          setShowCursor(false);
          setTimeout(() => {
            setShow(false);
            setTimeout(onLoadingComplete, 300);
          }, 400);
        }, 600);
      }
    }, 120);

    return () => clearInterval(typeInterval);
  }, [mounted, onLoadingComplete]);

  // Cursor blink
  useEffect(() => {
    if (!mounted || displayed === "Eveagle") return;
    
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, [mounted, displayed]);

  if (!mounted || !show) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#0B0B0D] flex items-center justify-center"
      style={{ opacity: show ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      <div className="flex items-baseline">
        <span className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight">
          {displayed}
        </span>
        <span 
          className="font-display text-5xl md:text-7xl font-bold text-eveagle-accent ml-0.5"
          style={{ 
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.1s'
          }}
        >
          .
        </span>
      </div>
    </div>
  );
}
