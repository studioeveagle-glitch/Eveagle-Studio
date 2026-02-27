"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code2, Boxes, Database, Globe, Server, 
  Cpu, Cloud, Layers, Zap, Sparkles
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TrustBarProps {
  isLoaded: boolean;
}

export default function TrustBar({ isLoaded }: TrustBarProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const techStack = [
    { name: "React / Next.js", Icon: Code2 },
    { name: "TypeScript", Icon: Layers },
    { name: "Python", Icon: Cpu },
    { name: "Node.js", Icon: Server },
    { name: "AWS / Cloud", Icon: Cloud },
    { name: "PostgreSQL", Icon: Database },
    { name: "Docker", Icon: Boxes },
    { name: "AI / ML", Icon: Sparkles },
    { name: "Edge", Icon: Globe },
    { name: "Lightning", Icon: Zap },
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-eveagle-bg py-12 overflow-hidden border-y border-eveagle-bg-secondary">
      {/* Diagonal stripe pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #FF4D2E 0, #FF4D2E 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      <div className="text-center mb-8 relative">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-eveagle-text-muted">
          Powered By Modern Tech
        </span>
      </div>
      
      {/* Scrolling tech stack */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee-slow">
          {[...techStack, ...techStack, ...techStack].map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 px-10 flex-shrink-0 group"
            >
              <div className="w-10 h-10 bg-eveagle-bg-secondary rounded-sm flex items-center justify-center group-hover:bg-eveagle-accent/10 transition-colors">
                <tech.Icon 
                  size={20} 
                  className="text-eveagle-text-muted/50 group-hover:text-eveagle-accent transition-colors duration-300" 
                />
              </div>
              <span className="text-eveagle-text-muted/50 group-hover:text-eveagle-text font-medium whitespace-nowrap transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
