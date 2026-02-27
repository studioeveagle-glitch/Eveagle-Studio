"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, HelpCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQProps {
  isLoaded: boolean;
}

export default function FAQ({ isLoaded }: FAQProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        faqRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const faqs = [
    {
      question: "What exactly do you build?",
      answer: "We ship complete digital products—full-stack applications, web platforms, mobile apps, brand identity systems, and high-velocity content. Think of us as your AI-powered product studio. Need a SaaS platform with a brand film to launch it? We do both."
    },
    {
      question: "How fast is '10x faster' in reality?",
      answer: "Traditional agencies take 3-6 months to ship software and 4-6 weeks for content. We deliver MVPs in 1-2 weeks and content in 3-5 days. Our AI agents handle the repetitive work—coding, testing, editing, rendering—while our senior team focuses on strategy and quality."
    },
    {
      question: "What's your pricing model?",
      answer: "Fixed price per project or sprint—never hourly. Software projects start at $15K for MVPs. Content packages start at $2K per video. Retainers available for ongoing partnerships. You pay for outcomes, not time spent."
    },
    {
      question: "How does AI actually improve quality?",
      answer: "AI doesn't replace creativity—it accelerates execution. Our agents catch bugs humans miss, maintain consistency across hundreds of assets, and work 24/7. Senior engineers and creative directors review everything. Result: fewer errors, faster delivery, lower cost."
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely. We integrate with your engineering, marketing, and product teams. Our agents can work in your repos, your cloud, your workflows. We become an extension of your team—just way faster."
    },
    {
      question: "What technologies do you use?",
      answer: "Modern, scalable stacks: React/Next.js, Node.js, Python, AWS/GCP/Vercel. For content: After Effects, DaVinci Resolve, Cinema 4D. We choose the right tool for the job—and our AI agents are trained on your specific tech stack."
    },
    {
      question: "How do we get started?",
      answer: "Book a free strategy call. We'll audit your current situation, define success metrics, and propose a sprint plan. First delivery typically happens within 7 days of kickoff."
    },
  ];

  return (
    <section id="faq" ref={sectionRef} className="relative w-full bg-eveagle-bg-secondary py-24 lg:py-32 overflow-hidden">
      {/* Question mark pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='60' font-size='40' fill='%23FF4D2E' text-anchor='middle'%3E?%3C/text%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>
      <div className="w-full px-6 lg:px-20">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-eveagle-accent">Questions</span>
            <div className="w-8 h-[2px] bg-eveagle-accent" />
          </div>
          <h2 className="font-display font-bold text-eveagle-text leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Everything You Need<br />To <span className="text-eveagle-accent">Know</span>
          </h2>
        </div>

        <div ref={faqRef} className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-eveagle-bg rounded-sm border transition-all duration-300 ${
                openIndex === index ? "border-eveagle-accent/30" : "border-eveagle-bg-secondary hover:border-eveagle-accent/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-lg font-medium text-eveagle-text pr-4">{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-eveagle-accent flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-eveagle-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-eveagle-text-muted mb-4">Still curious?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-eveagle-accent hover:text-eveagle-text transition-colors font-medium"
          >
            <HelpCircle size={18} />
            Let's talk strategy
          </a>
        </div>
      </div>
    </section>
  );
}
