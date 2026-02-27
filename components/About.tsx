"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Lightbulb, Rocket } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutProps {
  isLoaded: boolean;
}

export default function About({ isLoaded }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Image reveal - EXACTLY like original
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Content reveal - EXACTLY like original
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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

  const values = [
    { icon: Target, title: "Precision", desc: "Every pixel, every line of code, every word—crafted with intention." },
    { icon: Lightbulb, title: "Innovation", desc: "Pushing boundaries while staying true to your brand essence." },
    { icon: Rocket, title: "Performance", desc: "Solutions that don't just look good—they deliver results." },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-eveagle-bg py-24 lg:py-32">
      <div className="w-full px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image src="/approach_portrait.jpg" alt="Our Approach" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-eveagle-bg/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-eveagle-bg-secondary p-6 rounded-sm border border-eveagle-accent/20 shadow-cinematic">
              <div className="font-display text-4xl font-bold text-eveagle-accent mb-1">2014</div>
              <div className="font-mono text-xs uppercase tracking-widest text-eveagle-text-muted">Established</div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-eveagle-accent/30 rounded-sm -z-10" />
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-eveagle-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">About Us</span>
            </div>

            <h2 className="font-display font-bold text-eveagle-text leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              We Create Digital<br /><span className="text-eveagle-accent">Experiences</span> That Matter
            </h2>

            <div className="space-y-4 text-eveagle-text-muted leading-relaxed">
              <p>Founded in 2014, Eveagle Studio has grown from a small team of passionate creatives into a full-service digital agency.</p>
              <p>Our approach combines artistic vision with technical excellence. We believe great design is about solving problems and telling stories.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-eveagle-bg-secondary">
              {values.map((value, index) => (
                <div key={index} className="group">
                  <value.icon size={28} className="text-eveagle-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-semibold text-eveagle-text mb-2">{value.title}</h3>
                  <p className="text-sm text-eveagle-text-muted leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
