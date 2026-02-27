"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Boxes, Code2, Rocket, Clapperboard, Sparkles, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoryProps {
  isLoaded: boolean;
}

export default function Story({ isLoaded }: StoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"dev" | "content">("dev");

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
        ".step-card",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const devSteps = [
    { 
      icon: MessageSquare, 
      title: "Discovery", 
      desc: "AI analyzes requirements, codebase, and goals in hours.",
      time: "Day 1"
    },
    { 
      icon: Boxes, 
      title: "Architecture", 
      desc: "AI designs systems. Engineers review and lock approach.",
      time: "Day 2"
    },
    { 
      icon: Code2, 
      title: "Development", 
      desc: "AI generates code & tests. Engineers handle complex logic.",
      time: "Days 3-7"
    },
    { 
      icon: Rocket, 
      title: "Deploy", 
      desc: "CI/CD automates deployment. Monitoring agents watch 24/7.",
      time: "Day 7"
    },
  ];

  const contentSteps = [
    { 
      icon: MessageSquare, 
      title: "Brief", 
      desc: "AI analyzes brand voice, audience, and content needs.",
      time: "Hour 1"
    },
    { 
      icon: Sparkles, 
      title: "Creative", 
      desc: "AI drafts scripts. Directors lock the creative angle.",
      time: "Hour 4"
    },
    { 
      icon: Clapperboard, 
      title: "Production", 
      desc: "AI handles edit, color, sound. Editors add polish.",
      time: "Days 1-3"
    },
    { 
      icon: Rocket, 
      title: "Ship", 
      desc: "Delivered in all formats. Performance feeds next iteration.",
      time: "Day 3"
    },
  ];

  const steps = activeTab === "dev" ? devSteps : contentSteps;
  const accentColor = activeTab === "dev" ? "blue" : "purple";
  const accentClass = activeTab === "dev" ? "bg-blue-500" : "bg-purple-500";
  const accentText = activeTab === "dev" ? "text-blue-400" : "text-purple-400";
  const accentBg = activeTab === "dev" ? "bg-blue-500/10" : "bg-purple-500/10";

  return (
    <section id="process" ref={sectionRef} className="relative w-full bg-eveagle-bg-secondary py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-eveagle-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-eveagle-accent/5 rounded-full blur-3xl" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-eveagle-accent/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-blue-500/10 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      
      <div className="w-full px-4 md:px-6 lg:px-20 relative">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="w-8 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">How We Work</span>
            <div className="w-8 h-[2px] bg-eveagle-accent" />
          </div>
          <h2 className="font-display font-bold text-eveagle-text leading-tight mb-4 text-3xl md:text-4xl lg:text-5xl">
            From Brief To <span className="text-eveagle-accent">Shipped</span>
          </h2>
          <p className="text-eveagle-text-muted text-base md:text-lg leading-relaxed px-4 md:px-0">
            AI accelerates every step. Humans ensure quality.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex bg-eveagle-bg rounded-sm p-1 border border-eveagle-bg-secondary">
            <button
              onClick={() => setActiveTab("dev")}
              className={`px-4 md:px-6 py-2.5 md:py-3 rounded-sm font-medium transition-all text-sm md:text-base ${
                activeTab === "dev" 
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
                  : "text-eveagle-text-muted hover:text-eveagle-text"
              }`}
            >
              Software
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`px-4 md:px-6 py-2.5 md:py-3 rounded-sm font-medium transition-all text-sm md:text-base ${
                activeTab === "content" 
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" 
                  : "text-eveagle-text-muted hover:text-eveagle-text"
              }`}
            >
              Content
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="steps-container max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {steps.map((step, index) => (
              <div 
                key={`${activeTab}-${index}`}
                className="step-card group relative"
              >
                {/* Connector line (hidden on mobile, shown on lg) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] z-0">
                    <div className={`h-full ${accentBg} relative`}>
                      <ArrowRight 
                        size={14} 
                        className={`absolute right-0 -top-[6px] ${accentText}`}
                      />
                    </div>
                  </div>
                )}
                
                {/* Card */}
                <div className="relative bg-eveagle-bg rounded-sm border border-eveagle-bg-secondary p-4 md:p-5 h-full group-hover:border-eveagle-accent/30 transition-all duration-300">
                  {/* Step number badge */}
                  <div className={`absolute -top-3 -left-1 w-6 h-6 md:w-7 md:h-7 ${accentClass} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-xs md:text-sm font-bold">{index + 1}</span>
                  </div>
                  
                  {/* Time badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] md:text-xs font-mono ${accentText} bg-eveagle-bg-secondary px-2 py-1 rounded`}>
                      {step.time}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${accentBg} rounded-sm flex items-center justify-center mb-3 mt-2`}>
                    <step.icon size={20} className={accentText} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-base md:text-lg font-semibold text-eveagle-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-eveagle-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-10 md:mt-16 grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto">
          {[
            { value: "1-2", unit: "Wks", label: "Delivery" },
            { value: "24/7", unit: "", label: "AI Running" },
            { value: "100%", unit: "", label: "Reviewed" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 md:p-6 bg-eveagle-bg rounded-sm border border-eveagle-bg-secondary">
              <div className="font-display text-xl md:text-3xl font-bold text-eveagle-accent">
                {stat.value}<span className="text-sm md:text-xl">{stat.unit}</span>
              </div>
              <div className="text-xs md:text-sm text-eveagle-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
