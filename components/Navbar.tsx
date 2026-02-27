"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const studioRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Smooth roll effect based on scroll
      if (studioRef.current) {
        const totalHeight = document.body.scrollHeight - window.innerHeight || 1;
        const progress = scrollY / totalHeight;
        // Full 360 degree roll as you scroll through page
        const rotation = progress * 360;
        
        studioRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
            className="font-display text-2xl font-bold text-eveagle-text tracking-tight hover:text-eveagle-accent transition-colors flex items-baseline gap-0"
          >
            <span>Eveagle</span>
            <span className="text-eveagle-accent">.</span>
            <span 
              ref={studioRef}
              className="inline-block origin-center transition-transform duration-100 will-change-transform"
              style={{ display: "inline-block" }}
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
