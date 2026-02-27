"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Code2, Smartphone, TrendingUp, ArrowUpRight } from "lucide-react";
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
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation - EXACTLY like original
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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

  const services = [
    { icon: Palette, title: "Brand Identity", description: "Complete brand systems including logo design, visual guidelines, and brand strategy.", features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"], image: "/statement_portrait.jpg" },
    { icon: Code2, title: "Web Development", description: "Custom websites and web applications built with modern technologies.", features: ["React/Next.js", "E-commerce", "CMS Integration", "Web Apps"], image: "/workspace_scene.jpg" },
    { icon: Smartphone, title: "Mobile Apps", description: "Native and cross-platform mobile applications that deliver exceptional experiences.", features: ["iOS Development", "Android Development", "React Native", "Flutter"], image: "/portrait_scale.jpg" },
    { icon: TrendingUp, title: "Digital Marketing", description: "Strategic marketing campaigns that drive growth and measurable results.", features: ["SEO/SEM", "Social Media", "Content Strategy", "Analytics"], image: "/portrait_realworld.jpg" },
  ];

  return (
    <section id="services" ref={sectionRef} className="relative w-full bg-eveagle-bg py-24 lg:py-32">
      <div className="w-full px-6 lg:px-20">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">Our Services</span>
            <div className="w-8 h-[2px] bg-eveagle-accent" />
          </div>
          <h2 className="font-display font-bold text-eveagle-text leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            What We <span className="text-eveagle-accent">Do Best</span>
          </h2>
          <p className="text-eveagle-text-muted text-lg leading-relaxed">
            From concept to launch, we provide end-to-end digital solutions that help businesses thrive.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative bg-eveagle-bg-secondary rounded-sm overflow-hidden border border-eveagle-bg-secondary hover:border-eveagle-accent/30 transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-eveagle-bg-secondary via-eveagle-bg-secondary/50 to-transparent" />
                <div className="absolute bottom-4 left-6 w-12 h-12 bg-eveagle-accent rounded-sm flex items-center justify-center">
                  <service.icon size={24} className="text-eveagle-bg" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-xl font-semibold text-eveagle-text group-hover:text-eveagle-accent transition-colors">{service.title}</h3>
                  <ArrowUpRight size={20} className="text-eveagle-text-muted group-hover:text-eveagle-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <p className="text-eveagle-text-muted text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, fIndex) => (
                    <span key={fIndex} className="px-3 py-1 bg-eveagle-bg rounded-full text-xs text-eveagle-text-muted border border-eveagle-bg-secondary">{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
