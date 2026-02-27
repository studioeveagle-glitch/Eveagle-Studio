"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

// 100+ dramatic text styles
const textStyles = [
  { fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-0.05em", transform: "scale(1.2) rotate(-2deg)", textShadow: "2px 2px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 100, letterSpacing: "0.3em", transform: "scale(0.8) skewX(15deg)", textShadow: "none", filter: "blur(0.5px)", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.1em", transform: "scale(1.1) rotate(3deg)", textShadow: "-2px -2px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "-0.02em", transform: "scale(0.9) skewY(-5deg)", textShadow: "0 0 10px #FF4D2E", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.2em", transform: "scale(1.05) rotate(-5deg)", textShadow: "3px 3px 0 rgba(255,77,46,0.3)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 300, letterSpacing: "0.15em", transform: "scale(1.3) skewX(-10deg)", textShadow: "none", filter: "blur(1px)", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 800, letterSpacing: "-0.08em", transform: "scale(0.85) rotate(8deg)", textShadow: "1px 1px 0 #FF4D2E, -1px -1px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 200, letterSpacing: "0.25em", transform: "scale(1.15) skewY(8deg)", textShadow: "0 4px 8px rgba(0,0,0,0.5)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.05em", transform: "scale(0.95) rotate(-10deg)", textShadow: "-3px 3px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 900, letterSpacing: "0.08em", transform: "scale(1.4) skewX(20deg)", textShadow: "none", filter: "blur(0.3px)", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "-0.1em", transform: "scale(0.7) rotate(15deg)", textShadow: "2px -2px 0 rgba(255,77,46,0.5)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.12em", transform: "scale(1.1) skewY(-12deg)", textShadow: "0 0 20px rgba(255,77,46,0.6)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.18em", transform: "scale(0.88) rotate(-15deg)", textShadow: "4px 0 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 800, letterSpacing: "-0.15em", transform: "scale(1.25) skewX(-25deg)", textShadow: "none", filter: "blur(1.5px)", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 200, letterSpacing: "0.22em", transform: "scale(0.75) rotate(20deg)", textShadow: "0 -3px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.03em", transform: "scale(1.35) skewY(15deg)", textShadow: "-2px -2px 0 rgba(0,0,0,0.5)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 900, letterSpacing: "0.28em", transform: "scale(0.82) rotate(-20deg)", textShadow: "3px 3px 6px rgba(255,77,46,0.4)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 300, letterSpacing: "-0.12em", transform: "scale(1.5) skewX(30deg)", textShadow: "none", filter: "blur(2px)", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.06em", transform: "scale(0.65) rotate(25deg)", textShadow: "-4px 4px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.32em", transform: "scale(1.08) skewY(-18deg)", textShadow: "0 2px 4px rgba(0,0,0,0.8)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.06em", transform: "scale(0.92) rotate(-25deg)", textShadow: "2px 0 0 #FF4D2E, -2px 0 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 100, letterSpacing: "0.35em", transform: "scale(1.45) skewX(-35deg)", textShadow: "none", filter: "blur(0.8px)", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.0em", transform: "scale(0.72) rotate(30deg)", textShadow: "0 -4px 0 rgba(255,77,46,0.3)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "0.16em", transform: "scale(1.2) skewY(20deg)", textShadow: "-3px -3px 0 #000", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 900, letterSpacing: "-0.2em", transform: "scale(0.78) rotate(-30deg)", textShadow: "4px 4px 0 rgba(255,77,46,0.5)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 300, letterSpacing: "0.38em", transform: "scale(1.55) skewX(40deg)", textShadow: "none", filter: "blur(1.2px)", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.02em", transform: "scale(0.68) rotate(35deg)", textShadow: "0 3px 0 #FF4D2E, 0 6px 0 rgba(255,77,46,0.3)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 400, letterSpacing: "0.24em", transform: "scale(1.12) skewY(-22deg)", textShadow: "-4px 0 0 rgba(0,0,0,0.6)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 800, letterSpacing: "-0.18em", transform: "scale(0.87) rotate(-35deg)", textShadow: "2px -2px 8px #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 200, letterSpacing: "0.42em", transform: "scale(1.6) skewX(-45deg)", textShadow: "none", filter: "blur(2.5px)", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.09em", transform: "scale(0.62) rotate(40deg)", textShadow: "-2px 4px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.3em", transform: "scale(1.18) skewY(25deg)", textShadow: "0 -2px 4px rgba(0,0,0,0.7)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-0.25em", transform: "scale(0.82) rotate(-40deg)", textShadow: "3px 0 0 #FF4D2E, -3px 0 0 rgba(255,77,46,0.5)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 300, letterSpacing: "0.45em", transform: "scale(1.7) skewX(50deg)", textShadow: "none", filter: "blur(0.6px)", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "-0.08em", transform: "scale(0.58) rotate(45deg)", textShadow: "-3px -3px 0 rgba(255,77,46,0.4)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.2em", transform: "scale(1.25) skewY(-28deg)", textShadow: "4px -2px 0 #000", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 800, letterSpacing: "0.14em", transform: "scale(0.75) rotate(-45deg)", textShadow: "0 4px 8px rgba(255,77,46,0.5)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 200, letterSpacing: "0.48em", transform: "scale(1.75) skewX(-55deg)", textShadow: "none", filter: "blur(1.8px)", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.01em", transform: "scale(0.55) rotate(50deg)", textShadow: "2px 4px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 900, letterSpacing: "0.36em", transform: "scale(1.22) skewY(30deg)", textShadow: "-4px -2px 4px rgba(0,0,0,0.5)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 100, letterSpacing: "-0.22em", transform: "scale(0.88) rotate(-50deg)", textShadow: "3px -3px 0 rgba(255,77,46,0.6)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.52em", transform: "scale(1.8) skewX(60deg)", textShadow: "none", filter: "blur(3px)", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.07em", transform: "scale(0.52) rotate(55deg)", textShadow: "-2px -4px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 800, letterSpacing: "0.4em", transform: "scale(1.28) skewY(-32deg)", textShadow: "0 -3px 6px rgba(0,0,0,0.6)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 300, letterSpacing: "-0.3em", transform: "scale(0.78) rotate(-55deg)", textShadow: "4px 2px 0 #FF4D2E, -2px -2px 0 rgba(255,77,46,0.3)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.55em", transform: "scale(1.85) skewX(-65deg)", textShadow: "none", filter: "blur(0.4px)", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "-0.05em", transform: "scale(0.48) rotate(60deg)", textShadow: "-3px 3px 8px rgba(255,77,46,0.7)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "0.26em", transform: "scale(1.3) skewY(35deg)", textShadow: "2px -4px 0 #000", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 200, letterSpacing: "0.18em", transform: "scale(0.72) rotate(-60deg)", textShadow: "0 5px 10px rgba(255,77,46,0.4)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.58em", transform: "scale(1.9) skewX(70deg)", textShadow: "none", filter: "blur(2.2px)", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.28em", transform: "scale(0.45) rotate(65deg)", textShadow: "-4px -4px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 800, letterSpacing: "0.11em", transform: "scale(1.35) skewY(-38deg)", textShadow: "3px 3px 0 rgba(0,0,0,0.8)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 300, letterSpacing: "0.44em", transform: "scale(0.82) rotate(-65deg)", textShadow: "-2px -2px 4px rgba(255,77,46,0.8)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.62em", transform: "scale(1.95) skewX(-75deg)", textShadow: "none", filter: "blur(1.5px)", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 100, letterSpacing: "0.04em", transform: "scale(0.42) rotate(70deg)", textShadow: "4px -4px 0 #FF4D2E, 2px 2px 0 rgba(255,77,46,0.5)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 900, letterSpacing: "-0.32em", transform: "scale(1.38) skewY(40deg)", textShadow: "0 -4px 8px rgba(0,0,0,0.9)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.5em", transform: "scale(0.68) rotate(-70deg)", textShadow: "-3px 4px 0 rgba(255,77,46,0.5)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.24em", transform: "scale(2) skewX(80deg)", textShadow: "none", filter: "blur(3.5px)", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 200, letterSpacing: "-0.15em", transform: "scale(0.38) rotate(75deg)", textShadow: "3px 4px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "0.66em", transform: "scale(1.42) skewY(-42deg)", textShadow: "-4px 0 0 rgba(0,0,0,0.7)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.0em", transform: "scale(0.78) rotate(-75deg)", textShadow: "2px -3px 6px rgba(255,77,46,0.6)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.56em", transform: "scale(2.05) skewX(-85deg)", textShadow: "none", filter: "blur(0.9px)", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 300, letterSpacing: "-0.35em", transform: "scale(0.35) rotate(80deg)", textShadow: "-4px -3px 0 #FF4D2E, 1px 1px 0 rgba(255,77,46,0.4)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 900, letterSpacing: "0.29em", transform: "scale(1.45) skewY(45deg)", textShadow: "0 3px 0 #000", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.14em", transform: "scale(0.75) rotate(-80deg)", textShadow: "-2px -3px 8px rgba(255,77,46,0.9)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.7em", transform: "scale(2.1) skewX(90deg)", textShadow: "none", filter: "blur(2.8px)", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 100, letterSpacing: "-0.2em", transform: "scale(0.32) rotate(85deg)", textShadow: "4px 3px 0 rgba(255,77,46,0.7), -2px -1px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 800, letterSpacing: "0.33em", transform: "scale(1.48) skewY(-48deg)", textShadow: "3px -2px 4px rgba(0,0,0,0.8)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "0.08em", transform: "scale(0.68) rotate(-85deg)", textShadow: "0 -5px 0 rgba(255,77,46,0.5)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.74em", transform: "scale(2.15) skewX(-95deg)", textShadow: "none", filter: "blur(1px)", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 300, letterSpacing: "-0.38em", transform: "scale(0.28) rotate(90deg)", textShadow: "-4px 2px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "0.37em", transform: "scale(1.52) skewY(50deg)", textShadow: "2px 4px 0 rgba(0,0,0,0.9)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 200, letterSpacing: "0.21em", transform: "scale(0.72) rotate(-90deg)", textShadow: "-3px -4px 6px rgba(255,77,46,0.7)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.78em", transform: "scale(2.2) skewX(100deg)", textShadow: "none", filter: "blur(4px)", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.4em", transform: "scale(0.25) rotate(95deg)", textShadow: "4px -2px 0 #FF4D2E, -1px 3px 0 rgba(255,77,46,0.3)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 800, letterSpacing: "0.46em", transform: "scale(1.55) skewY(-52deg)", textShadow: "0 4px 0 #000", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.03em", transform: "scale(0.65) rotate(-95deg)", textShadow: "3px 3px 10px rgba(255,77,46,0.8)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.82em", transform: "scale(2.25) skewX(-105deg)", textShadow: "none", filter: "blur(2px)", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 100, letterSpacing: "-0.25em", transform: "scale(0.22) rotate(100deg)", textShadow: "-4px -2px 0 rgba(255,77,46,0.6), 2px -2px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-mono)", fontWeight: 900, letterSpacing: "0.4em", transform: "scale(1.58) skewY(55deg)", textShadow: "-2px 4px 4px rgba(0,0,0,0.9)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-display)", fontWeight: 300, letterSpacing: "0.17em", transform: "scale(0.62) rotate(-100deg)", textShadow: "0 -4px 0 rgba(255,77,46,0.8)", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.86em", transform: "scale(2.3) skewX(110deg)", textShadow: "none", filter: "blur(1.5px)", fontStyle: "italic" },
  { fontFamily: "var(--font-mono)", fontWeight: 200, letterSpacing: "-0.42em", transform: "scale(0.18) rotate(105deg)", textShadow: "4px 4px 0 #FF4D2E", filter: "none", fontStyle: "normal" },
  { fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "0.5em", transform: "scale(1.62) skewY(-58deg)", textShadow: "3px -3px 0 rgba(0,0,0,0.8)", filter: "none", fontStyle: "italic" },
  { fontFamily: "var(--font-sans)", fontWeight: 400, letterSpacing: "0.12em", transform: "scale(0.58) rotate(-105deg)", textShadow: "-3px 3px 8px rgba(255,77,46,1)", filter: "none", fontStyle: "normal" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const studioRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rafId: number;
    let targetStyleIndex = 0;
    let currentStyleIndex = 0;

    const animate = () => {
      const diff = targetStyleIndex - currentStyleIndex;
      if (Math.abs(diff) > 0.005) {
        currentStyleIndex += diff * 0.08;
        
        const index1 = Math.floor(currentStyleIndex) % textStyles.length;
        const index2 = (index1 + 1) % textStyles.length;
        const progress = currentStyleIndex - Math.floor(currentStyleIndex);
        
        const style1 = textStyles[index1];
        const style2 = textStyles[index2];
        
        if (studioRef.current) {
          const scale1 = parseFloat(style1.transform.match(/scale\(([-\d.]+)\)/)?.[1] || 1);
          const scale2 = parseFloat(style2.transform.match(/scale\(([-\d.]+)\)/)?.[1] || 1);
          const rotate1 = parseFloat(style1.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] || 0);
          const rotate2 = parseFloat(style2.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] || 0);
          const skewX1 = parseFloat(style1.transform.match(/skewX\(([-\d.]+)deg\)/)?.[1] || 0);
          const skewX2 = parseFloat(style2.transform.match(/skewX\(([-\d.]+)deg\)/)?.[1] || 0);
          const skewY1 = parseFloat(style1.transform.match(/skewY\(([-\d.]+)deg\)/)?.[1] || 0);
          const skewY2 = parseFloat(style2.transform.match(/skewY\(([-\d.]+)deg\)/)?.[1] || 0);

          gsap.to(studioRef.current, {
            fontFamily: progress > 0.5 ? style2.fontFamily : style1.fontFamily,
            fontWeight: Math.round(style1.fontWeight + (style2.fontWeight - style1.fontWeight) * progress),
            letterSpacing: style1.letterSpacing,
            textShadow: progress > 0.5 ? style2.textShadow : style1.textShadow,
            filter: progress > 0.5 ? style2.filter : style1.filter,
            fontStyle: progress > 0.5 ? style2.fontStyle : style1.fontStyle,
            scale: scale1 + (scale2 - scale1) * progress,
            rotation: rotate1 + (rotate2 - rotate1) * progress,
            skewX: skewX1 + (skewX2 - skewX1) * progress,
            skewY: skewY1 + (skewY2 - skewY1) * progress,
            duration: 0.12,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      const totalHeight = document.body.scrollHeight - window.innerHeight || 1;
      targetStyleIndex = (scrollY / totalHeight) * textStyles.length;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-eveagle-bg/95 backdrop-blur-md py-4 border-b border-eveagle-bg-secondary/50"
            : "bg-transparent py-6"
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-2xl font-bold text-eveagle-text tracking-tight hover:text-eveagle-accent transition-colors"
          >
            <span>Eveagle</span>
            <span className="text-eveagle-accent">.</span>
            <span 
              ref={studioRef}
              className="inline-block will-change-transform origin-center"
              style={{ 
                display: "inline-block",
                transformOrigin: "center center",
              }}
            >
              Studio
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="nav-hover-btn text-sm uppercase tracking-widest text-eveagle-text-muted hover:text-eveagle-text transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn-primary text-sm"
            >
              Start Project
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-eveagle-text hover:text-eveagle-accent transition-colors p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-eveagle-bg/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-display text-3xl font-bold text-eveagle-text hover:text-eveagle-accent transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("#contact")}
            className="btn-primary mt-8"
          >
            Start Project
          </button>
        </div>
      </div>
    </>
  );
}
