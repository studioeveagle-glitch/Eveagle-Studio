"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Clapperboard, Clock, DollarSign, AlertTriangle, TrendingDown, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProblemProps {
  isLoaded: boolean;
}

export default function Problem({ isLoaded }: ProblemProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

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
        ".problem-card",
        { y: 80, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const problems = [
    {
      icon: Clock,
      title: "6 Month Dev Cycles",
      desc: "By the time you ship, the market has moved on",
      stat: "6+ months",
      label: "Average time to launch",
      color: "blue",
    },
    {
      icon: DollarSign,
      title: "$200K+ Per Hire",
      desc: "Senior talent is expensive and hard to find",
      stat: "$200K+",
      label: "Annual engineer cost",
      color: "red",
    },
    {
      icon: AlertTriangle,
      title: "4-6 Week Production",
      desc: "Content backlog keeps growing while you wait",
      stat: "4-6 weeks",
      label: "One video production",
      color: "purple",
    },
    {
      icon: TrendingDown,
      title: "Missed Opportunities",
      desc: "Competitors capture market while you stall",
      stat: "70%",
      label: "Projects delayed",
      color: "orange",
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-blue-500/20" },
    red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30", glow: "shadow-red-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/20" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", glow: "shadow-orange-500/20" },
  };

  return (
    <section id="problem" ref={sectionRef} className="relative w-full bg-eveagle-bg py-20 lg:py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-eveagle-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      
      {/* Gradient mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-eveagle-accent/5 via-transparent to-blue-500/5" />
      </div>

      {/* Scrolling text marquee */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="flex animate-marquee-slow whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-display text-[200px] font-bold text-eveagle-text mx-8">
              DELAYED
            </span>
          ))}
        </div>
      </div>

      <div className="w-full px-4 md:px-6 lg:px-20 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-12 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-eveagle-bg-secondary rounded-full border border-eveagle-accent/20 mb-6">
            <AlertTriangle size={14} className="text-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-wider text-eveagle-accent">The Reality</span>
          </div>
          
          <h2 className="font-display font-bold text-eveagle-text leading-tight mb-6 text-4xl md:text-5xl lg:text-6xl">
            Your Competition Is<br />
            <span className="text-eveagle-accent">Moving Faster.</span>
          </h2>
          
          <p className="text-eveagle-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            While you're stuck in 6-month dev cycles and content backlogs, 
            others are shipping daily and capturing your market share.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const colors = colorClasses[problem.color];
            const isActive = activeCard === index;
            
            return (
              <div
                key={index}
                className={`problem-card group relative bg-eveagle-bg-secondary rounded-sm border ${colors.border} 
                  ${isActive ? `shadow-lg ${colors.glow} scale-105` : ''}
                  transition-all duration-500 cursor-pointer overflow-hidden`}
                onMouseEnter={() => setActiveCard(index)}
                style={{ perspective: "1000px" }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-5 md:p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 ${colors.bg} rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <problem.icon size={24} className={colors.text} />
                  </div>

                  {/* Stat big number */}
                  <div className={`font-display text-2xl md:text-3xl font-bold ${colors.text} mb-1`}>
                    {problem.stat}
                  </div>
                  
                  {/* Label */}
                  <div className="text-xs text-eveagle-text-muted mb-3 font-mono uppercase tracking-wider">
                    {problem.label}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base md:text-lg font-semibold text-eveagle-text mb-2">
                    {problem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-eveagle-text-muted leading-relaxed">
                    {problem.desc}
                  </p>

                  {/* Arrow indicator */}
                  <div className={`mt-4 flex items-center gap-1 text-sm ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <span>See solution</span>
                    <ChevronRight size={14} />
                  </div>
                </div>

                {/* Progress bar for auto-rotate */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-eveagle-bg">
                  <div 
                    className={`h-full ${colors.text.replace('text', 'bg')} transition-all duration-300`}
                    style={{ 
                      width: isActive ? '100%' : '0%',
                      transitionDuration: isActive ? '3000ms' : '300ms'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-eveagle-text-muted mb-4 text-sm md:text-base">
            There's a better way to ship.
          </p>
          <a 
            href="#speed"
            className="inline-flex items-center gap-2 px-6 py-3 bg-eveagle-accent text-eveagle-bg font-medium rounded-sm hover:bg-eveagle-accent/90 transition-colors group"
          >
            See How We Fix It
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
