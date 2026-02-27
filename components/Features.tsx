"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Clapperboard, Palette, LineChart, ArrowLeft, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturesProps {
  isLoaded: boolean;
}

export default function Features({ isLoaded }: FeaturesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".carousel-card",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const services = [
    { 
      icon: Code2, 
      title: "AI-Native Development", 
      description: "Full-stack applications built with AI acceleration. From MVPs to enterprise systems—shipped in weeks, not months.", 
      features: ["React/Next.js", "Node/Python", "Cloud Native", "AI Integration"], 
      image: "/workspace_scene.jpg",
      accent: "blue",
      stat: "1-2 Wks"
    },
    { 
      icon: Clapperboard, 
      title: "Content at Scale", 
      description: "High-velocity video production for brands that need to own the feed. Social clips to cinematic brand films.", 
      features: ["Social Content", "Brand Films", "Product Videos", "Ad Creative"], 
      image: "/portrait_scale.jpg",
      accent: "purple",
      stat: "3-5 Days"
    },
    { 
      icon: Palette, 
      title: "Brand Systems", 
      description: "Complete brand identity that works everywhere—from your app interface to your TikTok presence.", 
      features: ["Visual Identity", "Design Systems", "Brand Strategy", "Motion Graphics"], 
      image: "/statement_portrait.jpg",
      accent: "orange",
      stat: "Full Package"
    },
    { 
      icon: LineChart, 
      title: "Growth Engineering", 
      description: "Performance-driven solutions designed to convert. We build what moves the revenue needle.", 
      features: ["Conversion Design", "A/B Testing", "Analytics", "CRO"], 
      image: "/portrait_realworld.jpg",
      accent: "green",
      stat: "10x ROI"
    },
  ];

  const accentColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    blue: { bg: "bg-blue-500", text: "text-blue-400", border: "border-blue-500/30", gradient: "from-blue-500/20" },
    purple: { bg: "bg-purple-500", text: "text-purple-400", border: "border-purple-500/30", gradient: "from-purple-500/20" },
    orange: { bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/30", gradient: "from-orange-500/20" },
    green: { bg: "bg-green-500", text: "text-green-400", border: "border-green-500/30", gradient: "from-green-500/20" },
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section id="services" ref={sectionRef} className="relative w-full bg-eveagle-bg py-20 lg:py-32 overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23FF4D2E' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-eveagle-accent/5 to-transparent" />

      <div className="w-full px-4 md:px-6 lg:px-20 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="w-8 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">What We Do</span>
            <div className="w-8 h-[2px] bg-eveagle-accent" />
          </div>
          <h2 className="font-display font-bold text-eveagle-text leading-tight mb-4 text-3xl md:text-4xl lg:text-5xl">
            Software. Content. Brand.<br />
            <span className="text-eveagle-accent">All At Mach Speed.</span>
          </h2>
          <p className="text-eveagle-text-muted text-base md:text-lg leading-relaxed">
            We don't just build apps or edit videos—we ship complete digital ecosystems that drive revenue and own attention.
          </p>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-eveagle-bg-secondary border border-eveagle-bg rounded-full flex items-center justify-center hover:bg-eveagle-accent hover:border-eveagle-accent hover:text-eveagle-bg transition-all group hidden lg:flex"
          >
            <ArrowLeft size={20} className="text-eveagle-text group-hover:text-eveagle-bg" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-eveagle-bg-secondary border border-eveagle-bg rounded-full flex items-center justify-center hover:bg-eveagle-accent hover:border-eveagle-accent hover:text-eveagle-bg transition-all group hidden lg:flex"
          >
            <ArrowRight size={20} className="text-eveagle-text group-hover:text-eveagle-bg" />
          </button>

          {/* Cards Container */}
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {services.map((service, index) => {
                const colors = accentColors[service.accent];
                const isActive = index === activeIndex;
                
                return (
                  <div
                    key={index}
                    className="carousel-card w-full flex-shrink-0 px-2 md:px-4"
                  >
                    <div className={`group relative bg-eveagle-bg-secondary rounded-sm overflow-hidden border ${colors.border} transition-all duration-500 ${isActive ? 'shadow-2xl scale-100' : 'shadow-lg scale-95 opacity-70'}`}>
                      {/* Image Section */}
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <Image 
                          src={service.image} 
                          alt={service.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-eveagle-bg-secondary via-eveagle-bg-secondary/50 to-transparent" />
                        
                        {/* Stat Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1.5 ${colors.bg} text-white text-sm font-bold rounded-sm`}>
                            {service.stat}
                          </span>
                        </div>

                        {/* Icon */}
                        <div className={`absolute bottom-4 left-4 w-14 h-14 ${colors.bg} rounded-sm flex items-center justify-center shadow-lg`}>
                          <service.icon size={28} className="text-white" />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 md:p-8">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-eveagle-text mb-3 group-hover:text-eveagle-accent transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-eveagle-text-muted leading-relaxed mb-6 text-base">
                          {service.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, fIndex) => (
                            <span key={fIndex} className={`px-3 py-1.5 bg-eveagle-bg rounded-full text-xs ${colors.text} border ${colors.border} flex items-center gap-1.5`}>
                              <Zap size={10} />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-eveagle-accent' 
                    : 'w-2 bg-eveagle-text-muted/30 hover:bg-eveagle-text-muted/50'
                }`}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6 lg:hidden">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-eveagle-bg-secondary border border-eveagle-bg rounded-full flex items-center justify-center"
            >
              <ArrowLeft size={20} className="text-eveagle-text" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-eveagle-bg-secondary border border-eveagle-bg rounded-full flex items-center justify-center"
            >
              <ArrowRight size={20} className="text-eveagle-text" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-eveagle-text-muted mb-4">Need something else? We customize.</p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-eveagle-accent text-eveagle-bg font-medium rounded-sm hover:bg-eveagle-accent/90 transition-colors"
          >
            Let's Talk
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
