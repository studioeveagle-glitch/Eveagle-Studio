"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Zap, Clock, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SpeedProps {
  isLoaded: boolean;
}

export default function Speed({ isLoaded }: SpeedProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

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
        ".compare-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: compareRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const softwareComparison = {
    title: "Software Development",
    without: [
      { stage: "Discovery", time: "2-3 wks" },
      { stage: "Arch", time: "2-3 wks" },
      { stage: "Dev", time: "8-12 wks" },
      { stage: "Test", time: "3-4 wks" },
      { stage: "Deploy", time: "1-2 wks" },
    ],
    with: [
      { stage: "Discovery", time: "2 days" },
      { stage: "Arch", time: "2 days" },
      { stage: "Dev", time: "5-7 days" },
      { stage: "Test", time: "2 days" },
      { stage: "Deploy", time: "Same day" },
    ],
  };

  const contentComparison = {
    title: "Content Production",
    without: [
      { stage: "Brief", time: "3-5 days" },
      { stage: "Script", time: "1 week" },
      { stage: "Production", time: "2-3 wks" },
      { stage: "Edit", time: "2-3 wks" },
      { stage: "Revisions", time: "1-2 wks" },
    ],
    with: [
      { stage: "Brief", time: "4 hrs" },
      { stage: "Script", time: "4 hrs" },
      { stage: "Production", time: "1-2 days" },
      { stage: "Edit", time: "2-3 days" },
      { stage: "Delivery", time: "Same day" },
    ],
  };

  const TimelineBlock = ({ 
    title, 
    without, 
    with: withEveagle,
    accent = "blue"
  }: { 
    title: string; 
    without: { stage: string; time: string }[]; 
    with: { stage: string; time: string }[];
    accent?: "blue" | "purple";
  }) => (
    <div className="compare-item">
      <h3 className="font-display text-lg md:text-xl font-bold text-eveagle-text mb-4 md:mb-6">{title}</h3>
      
      {/* Traditional - Vertical on mobile, horizontal on desktop */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-eveagle-bg rounded-sm flex items-center justify-center">
            <Clock size={14} className="text-eveagle-text-muted" />
          </div>
          <span className="text-xs md:text-sm text-eveagle-text-muted">Traditional</span>
          <span className="ml-auto text-xs md:text-sm text-red-400 font-mono font-bold">Months</span>
        </div>
        
        {/* Mobile: Vertical stack */}
        <div className="flex flex-col gap-1 md:hidden">
          {without.map((item, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between bg-eveagle-bg rounded-sm p-2"
            >
              <span className="text-xs text-eveagle-text-muted">{item.stage}</span>
              <span className="text-[10px] text-eveagle-text-muted/50 font-mono">{item.time}</span>
            </div>
          ))}
        </div>
        
        {/* Desktop: Horizontal bars */}
        <div className="hidden md:flex h-14 bg-eveagle-bg rounded-sm overflow-hidden">
          {without.map((item, i) => (
            <div 
              key={i} 
              className="flex-1 bg-eveagle-bg-secondary border-r border-eveagle-bg flex flex-col items-center justify-center relative group p-1"
            >
              <span className="text-[9px] lg:text-[10px] text-eveagle-text-muted font-medium text-center leading-tight">{item.stage}</span>
              <span className="text-[8px] lg:text-[9px] text-eveagle-text-muted/50 font-mono">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center mb-3 md:mb-4">
        <div className="w-7 h-7 md:w-8 md:h-8 bg-eveagle-accent/10 rounded-full flex items-center justify-center">
          <ArrowRight size={14} className="text-eveagle-accent rotate-90" />
        </div>
      </div>

      {/* With Eveagle */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-eveagle-accent/20 rounded-sm flex items-center justify-center">
            <Zap size={14} className="text-eveagle-accent" />
          </div>
          <span className="text-xs md:text-sm text-eveagle-text font-medium">With Eveagle</span>
          <span className="ml-auto text-xs md:text-sm text-eveagle-accent font-mono font-bold">Days</span>
        </div>
        
        {/* Mobile: Vertical stack */}
        <div className="flex flex-col gap-1 md:hidden">
          {withEveagle.map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center justify-between rounded-sm p-2 ${accent === "blue" ? "bg-blue-500" : "bg-purple-500"}`}
              style={{ opacity: 0.5 + (i * 0.1) }}
            >
              <span className="text-xs text-white font-medium">{item.stage}</span>
              <span className="text-[10px] text-white/70 font-mono">{item.time}</span>
            </div>
          ))}
        </div>
        
        {/* Desktop: Horizontal bars */}
        <div className="hidden md:flex h-14 bg-eveagle-bg rounded-sm overflow-hidden border border-eveagle-accent/30">
          {withEveagle.map((item, i) => (
            <div 
              key={i} 
              className={`flex-1 ${accent === "blue" ? "bg-blue-500" : "bg-purple-500"} border-r border-eveagle-bg/30 flex flex-col items-center justify-center relative group p-1`}
              style={{ opacity: 0.5 + (i * 0.1) }}
            >
              <span className="text-[9px] lg:text-[10px] text-white font-medium text-center leading-tight">{item.stage}</span>
              <span className="text-[8px] lg:text-[9px] text-white/70 font-mono">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="speed" ref={sectionRef} className="relative w-full bg-eveagle-bg-secondary py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-eveagle-accent/5 rounded-full blur-3xl" />
      </div>
      
      {/* Speed lines decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-eveagle-accent/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>
      <div className="w-full px-4 md:px-6 lg:px-20">
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="w-8 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">The Solution</span>
            <div className="w-8 h-[2px] bg-eveagle-accent" />
          </div>
          <h2 className="font-display font-bold text-eveagle-text leading-tight mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
            Ship Software.<br className="hidden md:block" />
            Ship Content.<br />
            <span className="text-eveagle-accent">10x Faster.</span>
          </h2>
          <p className="text-eveagle-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4 md:px-0">
            AI-native engineers and creative agents working in parallel. Strategy becomes execution in days, not quarters.
          </p>
        </div>

        <div ref={compareRef} className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
          <div className="p-4 md:p-8 bg-eveagle-bg rounded-sm border border-eveagle-bg-secondary">
            <TimelineBlock 
              title="Software" 
              without={softwareComparison.without} 
              with={softwareComparison.with}
              accent="blue"
            />
          </div>
          <div className="p-4 md:p-8 bg-eveagle-bg rounded-sm border border-eveagle-bg-secondary">
            <TimelineBlock 
              title="Content" 
              without={contentComparison.without} 
              with={contentComparison.with}
              accent="purple"
            />
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto mt-10 md:mt-16 px-4 md:px-0">
          {[
            { value: "85%", label: "Time Saved" },
            { value: "60%", label: "Cost Cut" },
            { value: "10x", label: "Output" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 md:p-6 bg-eveagle-bg rounded-sm border border-eveagle-bg-secondary">
              <div className="font-display text-2xl md:text-4xl font-bold text-eveagle-accent mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-eveagle-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-16 text-center px-4">
          <p className="text-eveagle-text-muted mb-4 text-sm md:text-base">From concept to production in under 2 weeks.</p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-eveagle-accent text-eveagle-bg font-medium rounded-sm hover:bg-eveagle-accent/90 transition-colors group text-sm md:text-base"
          >
            Start Your Sprint
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
