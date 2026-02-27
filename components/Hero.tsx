"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  // Entry animation - SMOOTH with GPU acceleration
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        delay: 0.3,
        defaults: { ease: "power2.out" } // Smoother easing
      });

      // Video fade in
      tl.fromTo(
        videoRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
      )
      // Tag line
      .fromTo(
        tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.8"
      )
      // Title - split for smoother effect
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      // Subtitle
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      )
      // CTAs
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, [isLoaded]);

  // Scroll parallax - SMOOTH with RAF optimization
  useEffect(() => {
    if (!isLoaded) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    if (!section || !video || !content) return;

    let rafId: number;
    let isActive = true;

    const handleScroll = () => {
      if (!isActive) return;
      
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      
      if (progress > 0 && progress <= 1) {
        // Use transform3d for GPU acceleration
        video.style.transform = `translate3d(0, ${progress * 100}px, 0) scale(${1 + progress * 0.08})`;
        content.style.transform = `translate3d(0, ${progress * 60}px, 0)`;
        content.style.opacity = String(1 - progress * 1.2);
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      isActive = false;
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLoaded]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-eveagle-bg"
    >
      {/* Video Background - GPU accelerated */}
      <div className="absolute inset-0 z-0 will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-eveagle-bg/60 via-eveagle-bg/40 to-eveagle-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-eveagle-bg/80 via-transparent to-eveagle-bg/60" />
      </div>

      {/* Content - GPU accelerated */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-20 will-change-transform"
        style={{ transform: "translateZ(0)" }}
      >
        <div className="max-w-5xl">
          {/* Tag */}
          <div ref={tagRef} className="flex items-center gap-3 mb-8">
            <div className="w-12 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">
              Creative Studio
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="font-display font-bold text-eveagle-text leading-[0.95] tracking-tight mb-8 text-shadow-cinematic"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            We Build Brands
            <br />
            <span className="text-eveagle-accent">That Move</span> People
          </h1>

          {/* Subhead */}
          <p
            ref={subtitleRef}
            className="text-eveagle-text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-10 text-shadow-cinematic"
          >
            Eveagle is a creative studio for brand systems, digital experiences,
            and campaigns—crafted with clarity and built to perform.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection("#services")}
              className="btn-primary flex items-center gap-2 group"
            >
              Explore Services
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => scrollToSection("#process")}
              className="btn-secondary flex items-center gap-2"
            >
              <Play size={16} />
              Watch Showreel
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-eveagle-text-muted">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-eveagle-text-muted/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-eveagle-accent animate-bounce" />
          </div>
        </div>
      </div>

      {/* Side Stats */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
        <div className="text-right">
          <div className="font-display text-3xl font-bold text-eveagle-text">
            10+
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-eveagle-text-muted">
            Years
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl font-bold text-eveagle-text">
            200+
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-eveagle-text-muted">
            Projects
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl font-bold text-eveagle-text">
            50+
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-eveagle-text-muted">
            Clients
          </div>
        </div>
      </div>
    </section>
  );
}
