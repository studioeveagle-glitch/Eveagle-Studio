"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send, ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactProps {
  isLoaded: boolean;
}

export default function Contact({ isLoaded }: ContactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    company: "", 
    service: "", 
    budget: "", 
    message: "" 
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
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
        formRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will get back to you within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "enquiry@eveaglestudio.com", href: "mailto:enquiry@eveaglestudio.com" },
    { icon: Phone, label: "Phone", value: "+852 9519 0597", href: "tel:+85295190597" },
    { icon: MapPin, label: "Studio", value: "Hong Kong", href: "#" },
  ];

  const services = [
    "Brand Identity",
    "Web Development", 
    "Mobile Apps",
    "Digital Marketing",
    "UI/UX Design",
    "Creative Direction"
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative w-full bg-eveagle-bg py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-eveagle-accent/30 to-transparent" />
      
      <div className="w-full px-6 lg:px-20">
        {/* Header */}
        <div ref={contentRef} className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-eveagle-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-eveagle-accent">Start a Project</span>
          </div>
          <h2 className="font-display font-bold text-eveagle-text leading-[1.1] mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Let&apos;s Create<br />
            <span className="text-eveagle-accent">Something Great</span>
          </h2>
          <p className="text-eveagle-text-muted text-lg max-w-xl leading-relaxed">
            Ready to elevate your brand? We&apos;re here to help you build digital experiences that matter.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left side - Contact info */}
          <div ref={contentRef} className="lg:col-span-2 space-y-8">
            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href} 
                  className="group flex items-center gap-4 p-5 bg-eveagle-bg-secondary/50 border border-eveagle-bg-secondary hover:border-eveagle-accent/50 rounded-sm transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-eveagle-accent/10 rounded-sm flex items-center justify-center group-hover:bg-eveagle-accent/20 transition-colors">
                    <item.icon size={18} className="text-eveagle-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-eveagle-text-muted mb-1">{item.label}</div>
                    <div className="text-eveagle-text group-hover:text-eveagle-accent transition-colors">{item.value}</div>
                  </div>
                  <ArrowUpRight size={16} className="text-eveagle-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-8 border-t border-eveagle-bg-secondary">
              <div className="font-mono text-[10px] uppercase tracking-wider text-eveagle-text-muted mb-4">Follow Us</div>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com/eveaglestudio" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/eveaglestudio" },
                  { icon: Twitter, label: "X", href: "https://x.com/eveaglestudio" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-eveagle-bg-secondary border border-eveagle-bg-secondary hover:border-eveagle-accent/50 rounded-sm flex items-center justify-center text-eveagle-text-muted hover:text-eveagle-accent transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="bg-eveagle-bg-secondary/30 border border-eveagle-bg-secondary p-8 lg:p-10 rounded-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="relative">
                  <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-[10px] uppercase tracking-wider ${
                    focusedField === 'name' || formData.name 
                      ? 'top-2 text-eveagle-accent text-[9px]' 
                      : 'top-4 text-eveagle-text-muted'
                  }`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-eveagle-bg border border-eveagle-bg-secondary focus:border-eveagle-accent rounded-sm px-4 pt-6 pb-3 text-eveagle-text outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-[10px] uppercase tracking-wider ${
                    focusedField === 'email' || formData.email 
                      ? 'top-2 text-eveagle-accent text-[9px]' 
                      : 'top-4 text-eveagle-text-muted'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-eveagle-bg border border-eveagle-bg-secondary focus:border-eveagle-accent rounded-sm px-4 pt-6 pb-3 text-eveagle-text outline-none transition-colors"
                  />
                </div>

                {/* Company */}
                <div className="relative">
                  <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-[10px] uppercase tracking-wider ${
                    focusedField === 'company' || formData.company 
                      ? 'top-2 text-eveagle-accent text-[9px]' 
                      : 'top-4 text-eveagle-text-muted'
                  }`}>
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-eveagle-bg border border-eveagle-bg-secondary focus:border-eveagle-accent rounded-sm px-4 pt-6 pb-3 text-eveagle-text outline-none transition-colors"
                  />
                </div>

                {/* Service */}
                <div className="relative">
                  <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-[10px] uppercase tracking-wider z-10 ${
                    focusedField === 'service' || formData.service 
                      ? 'top-2 text-eveagle-accent text-[9px]' 
                      : 'top-4 text-eveagle-text-muted'
                  }`}>
                    Service Interested
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-eveagle-bg border border-eveagle-bg-secondary focus:border-eveagle-accent rounded-sm px-4 pt-6 pb-3 text-eveagle-text outline-none transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: "none" }}
                  >
                    <option value="" disabled></option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-eveagle-text-muted">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <label className="font-mono text-[10px] uppercase tracking-wider text-eveagle-text-muted mb-3 block">Project Budget (USD)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: "10k-25k", label: "$10k - $25k" },
                    { value: "25k-50k", label: "$25k - $50k" },
                    { value: "50k-100k", label: "$50k - $100k" },
                    { value: "100k+", label: "$100k+" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`cursor-pointer relative overflow-hidden rounded-sm border transition-all duration-200 ${
                        formData.budget === option.value
                          ? "border-eveagle-accent bg-eveagle-accent/10"
                          : "border-eveagle-bg-secondary bg-eveagle-bg hover:border-eveagle-accent/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={option.value}
                        checked={formData.budget === option.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="block text-center py-3 text-sm text-eveagle-text font-medium">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="relative mb-8">
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-[10px] uppercase tracking-wider ${
                  focusedField === 'message' || formData.message 
                    ? 'top-2 text-eveagle-accent text-[9px]' 
                    : 'top-4 text-eveagle-text-muted'
                }`}>
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  required
                  className="w-full bg-eveagle-bg border border-eveagle-bg-secondary focus:border-eveagle-accent rounded-sm px-4 pt-6 pb-3 text-eveagle-text outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full btn-primary py-4 flex items-center justify-center gap-3 group text-base"
              >
                <span>Send Inquiry</span>
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
