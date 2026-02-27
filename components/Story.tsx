"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Lightbulb, PenTool, Rocket, CheckCircle } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoryProps {
  isLoaded: boolean;
}

export default function Story({ isLoaded }: StoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Header animation - EXACTLY like original
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

      // Timeline items animation - EXACTLY like original
      const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
      if (timelineItems) {
        gsap.fromTo(
          timelineItems,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image animation - EXACTLY like original
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const steps = [
    { number: "01", icon: MessageSquare, title: "Discovery", description: "We start by understanding your business, goals, and target audience through in-depth consultations and research." },
    { number: "02", icon: Lightbulb, title: "Strategy", description: "Based on our findings, we develop a comprehensive strategy that aligns with your objectives and market position." },
    { number: "03", icon: PenTool, title: "Design & Develop", description: "Our team brings the strategy to life with meticulous design and robust development, keeping you involved at every step." },
    { number: "04", icon: Rocket, title: "Launch & Optimize", description: "We launch your project with precision and continue to monitor, analyze, and optimize for ongoing success." },
  ];

  return (
    <section id="process" ref={sectionRef} className="relative w-full bg-eveagle-bg-secondary py-24 lg:py-32">
      <div className="w-full px-6 lg:px-20">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">Our Process</span>
            <div className="w-8 h-[2px] bg-eveagle-accent" />
          </div>
          <h2 className="font-display font-bold text-eveagle-text leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            From Brief to <span className="text-eveagle-accent">Launch</span>
          </h2>
          <p className="text-eveagle-text-muted text-lg leading-relaxed">Our proven four-step process ensures every project is delivered on time, on budget, and beyond expectations.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={timelineRef} className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="timeline-item group flex gap-6 p-6 rounded-sm bg-eveagle-bg border border-eveagle-bg-secondary hover:border-eveagle-accent/30 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-eveagle-accent/10 rounded-sm flex items-center justify-center mb-2 group-hover:bg-eveagle-accent/20 transition-colors">
                    <step.icon size={20} className="text-eveagle-accent" />
                  </div>
                  {index < steps.length - 1 && <div className="w-[2px] flex-1 bg-eveagle-bg-secondary group-hover:bg-eveagle-accent/30 transition-colors" />}
                </div>
                <div className="flex-1 pb-8">
                  <span className="font-mono text-xs text-eveagle-accent">Step {step.number}</span>
                  <h3 className="font-display text-xl font-semibold text-eveagle-text mb-3 group-hover:text-eveagle-accent transition-colors">{step.title}</h3>
                  <p className="text-eveagle-text-muted text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={imageRef} className="relative">
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image src="/portrait_collab.jpg" alt="Our Process" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-eveagle-bg/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 right-6 bg-eveagle-bg p-6 rounded-sm border border-eveagle-accent/20 shadow-cinematic">
              <div className="grid grid-cols-3 gap-6">
                {[{ val: "98%", label: "On Time" }, { val: "100%", label: "Satisfaction" }, { val: "24/7", label: "Support" }].map((stat, i) => (
                  <div key={i} className="text-center">
                    <CheckCircle size={16} className="text-eveagle-accent mx-auto mb-1" />
                    <div className="font-display text-2xl font-bold text-eveagle-text">{stat.val}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-eveagle-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-eveagle-accent/20 rounded-sm -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
