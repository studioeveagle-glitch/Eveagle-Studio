"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Bot, Boxes, Code2, TestTube, GitBranch,
  PenTool, Scissors, Palette, Music, Zap, ArrowRight, Sparkles
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AgentsProps {
  isLoaded: boolean;
}

export default function Agents({ isLoaded }: AgentsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"dev" | "creative">("dev");

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
        ".pipeline-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: pipelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".flow-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pipelineRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const devPipeline = [
    { id: "arch", icon: Boxes, name: "Architecture", color: "#3B82F6", desc: "Designs APIs & data models" },
    { id: "code", icon: Code2, name: "Code Gen", color: "#60A5FA", desc: "Writes production code" },
    { id: "test", icon: TestTube, name: "QA", color: "#93C5FD", desc: "Auto-tests everything" },
    { id: "deploy", icon: GitBranch, name: "DevOps", color: "#2563EB", desc: "Deploys to production" },
  ];

  const creativePipeline = [
    { id: "script", icon: PenTool, name: "Script", color: "#A855F7", desc: "Writes hooks & copy" },
    { id: "edit", icon: Scissors, name: "Edit", color: "#C084FC", desc: "Cuts & sequences" },
    { id: "color", icon: Palette, name: "Color", color: "#D8B4FE", desc: "Cinematic grading" },
    { id: "sound", icon: Music, name: "Audio", color: "#7C3AED", desc: "Mixes & masters" },
  ];

  const activePipeline = activeCategory === "dev" ? devPipeline : creativePipeline;

  const marqueeItems = [
    { icon: Bot, label: "8 AI Agents", value: "Working 24/7" },
    { icon: Zap, label: "∞ Uptime", value: "Always Online" },
    { icon: Sparkles, label: "10x Speed", value: "Faster Delivery" },
    { icon: Code2, label: "100K+", value: "Lines Generated" },
    { icon: Scissors, label: "500+", value: "Videos Shipped" },
    { icon: Boxes, label: "50+", value: "Apps Deployed" },
  ];

  return (
    <section id="agents" ref={sectionRef} className="relative w-full bg-eveagle-bg py-24 lg:py-32 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,77,46,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,77,46,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Connection lines background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#FF4D2E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="w-full px-6 lg:px-20 relative">
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">The Engine</span>
            <div className="w-8 h-[2px] bg-eveagle-accent" />
          </div>
          <h2 className="font-display font-bold text-eveagle-text leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Meet Your <span className="text-eveagle-accent">AI Workforce</span>
          </h2>
          <p className="text-eveagle-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Eight specialized agents working 24/7. They don't sleep, they don't miss details, and they ship at machine speed.
          </p>
        </div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-eveagle-bg-secondary rounded-sm p-1 border border-eveagle-bg">
            <button
              onClick={() => setActiveCategory("dev")}
              className={`px-8 py-4 rounded-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === "dev" 
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
                  : "text-eveagle-text-muted hover:text-eveagle-text"
              }`}
            >
              <Code2 size={18} />
              Dev Agents
            </button>
            <button
              onClick={() => setActiveCategory("creative")}
              className={`px-8 py-4 rounded-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === "creative" 
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" 
                  : "text-eveagle-text-muted hover:text-eveagle-text"
              }`}
            >
              <Palette size={18} />
              Creative Agents
            </button>
          </div>
        </div>

        {/* Visual Pipeline */}
        <div ref={pipelineRef} className="max-w-5xl mx-auto mb-20">
          <div className="relative flex items-center justify-between">
            {/* Connection lines */}
            <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 flex">
              {activePipeline.slice(0, -1).map((_, i) => (
                <div key={i} className="flex-1 flex items-center">
                  <div 
                    className="flow-line flex-1 h-0.5 origin-left"
                    style={{ 
                      background: `linear-gradient(90deg, ${activePipeline[i].color}, ${activePipeline[i+1].color})`,
                    }}
                  />
                  <ArrowRight size={16} className="text-eveagle-text-muted mx-1" />
                </div>
              ))}
            </div>

            {/* Agent Nodes */}
            {activePipeline.map((agent, index) => (
              <div
                key={agent.id}
                className="pipeline-node relative z-10"
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
              >
                {/* Pulse ring */}
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ backgroundColor: agent.color, animationDuration: '2s' }}
                />
                
                {/* Main node */}
                <div 
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: `${agent.color}20`,
                    border: `2px solid ${hoveredAgent === agent.id ? agent.color : `${agent.color}40`}`,
                    boxShadow: hoveredAgent === agent.id ? `0 0 40px ${agent.color}40` : 'none'
                  }}
                >
                  <agent.icon 
                    size={28} 
                    style={{ color: agent.color }}
                    className="transition-transform duration-300"
                  />
                </div>

                {/* Label */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center w-32">
                  <div className="font-display font-semibold text-eveagle-text text-sm mb-1">
                    {agent.name}
                  </div>
                  <div 
                    className={`text-xs transition-all duration-300 ${
                      hoveredAgent === agent.id ? 'opacity-100 text-eveagle-text' : 'opacity-0'
                    }`}
                  >
                    {agent.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Detail Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
          {activePipeline.map((agent, index) => (
            <div
              key={agent.id}
              className="group relative p-6 bg-eveagle-bg-secondary/50 rounded-sm border border-eveagle-bg-secondary hover:border-eveagle-accent/30 transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
            >
              {/* Glow effect */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-opacity duration-300"
                style={{ 
                  backgroundColor: agent.color,
                  opacity: hoveredAgent === agent.id ? 0.15 : 0
                }}
              />
              
              {/* Status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: agent.color }}
                />
                <span className="text-[10px] text-eveagle-text-muted font-mono">ONLINE</span>
              </div>

              <div className="relative">
                <div 
                  className="w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ 
                    backgroundColor: hoveredAgent === agent.id ? `${agent.color}30` : `${agent.color}15`,
                  }}
                >
                  <agent.icon size={24} style={{ color: agent.color }} />
                </div>
                
                <h3 className="font-display text-lg font-semibold text-eveagle-text mb-2 group-hover:text-eveagle-accent transition-colors">
                  {agent.name} Agent
                </h3>
                <p className="text-sm text-eveagle-text-muted leading-relaxed mb-4">
                  {agent.desc}
                </p>

                {/* Task tags */}
                <div className="flex flex-wrap gap-1.5">
                  {['AI', '24/7', 'Parallel'].map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 bg-eveagle-bg rounded text-[10px] text-eveagle-text-muted border border-eveagle-bg-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling Stats Marquee */}
      <div className="relative w-full overflow-hidden py-8 bg-eveagle-bg-secondary border-y border-eveagle-bg">
        <div className="flex animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 px-8 border-r border-eveagle-bg flex-shrink-0"
            >
              <div className="w-12 h-12 bg-eveagle-accent/10 rounded-full flex items-center justify-center">
                <item.icon size={24} className="text-eveagle-accent" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-eveagle-text">{item.label}</div>
                <div className="text-xs text-eveagle-text-muted font-mono">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
