"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

// Array of fonts to cycle through
const fonts = [
  "font-mono",
  "font-sans",
  "font-serif",
  "font-display",
];

// Font style variations for inline styles
const fontFamilies = [
  "monospace",
  "system-ui",
  "Georgia",
  "Impact",
  "Courier New",
  "Arial Black",
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState("Studio");
  const [currentFont, setCurrentFont] = useState(0);
  const [letterFonts, setLetterFonts] = useState<number[]>([0, 0, 0, 0, 0]);
  const targetText = "Studio";
  const animationRef = useRef<number>();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY.current;
      setIsScrolled(scrollY > 50);

      // Change font based on scroll position
      const fontIndex = Math.floor(scrollY / 150) % fontFamilies.length;
      setCurrentFont(fontIndex);

      // Each letter gets a different font based on scroll + position
      setLetterFonts(
        targetText.split("").map((_, i) => 
          Math.floor((scrollY + i * 50) / 100) % fontFamilies.length
        )
      );

      // Trigger letter scramble on significant scroll
      if (Math.abs(scrollDelta) > 5) {
        scrambleText();
      }

      lastScrollY.current = scrollY;
    };

    const scrambleText = () => {
      let iteration = 0;
      const maxIterations = 8;
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const animate = () => {
        setDisplayText(
          targetText
            .split("")
            .map((char, index) => {
              if (index < iteration / 2) {
                return targetText[index];
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("")
        );

        iteration++;

        if (iteration < maxIterations) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(targetText);
        }
      };

      animate();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
            <span className="inline-block">
              {displayText.split("").map((char, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: fontFamilies[letterFonts[i] || 0],
                    transition: "font-family 0.3s ease",
                  }}
                >
                  {char}
                </span>
              ))}
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
