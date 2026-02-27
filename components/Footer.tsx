"use client";

import { ArrowUp, Instagram, Linkedin, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Brand Identity", href: "#services" },
      { name: "Web Development", href: "#services" },
      { name: "Mobile Apps", href: "#services" },
      { name: "Digital Marketing", href: "#services" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Process", href: "#process" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
  };

  const socialLinks = [
    { name: "Instagram", handle: "@eveaglestudio", icon: Instagram, href: "https://instagram.com/eveaglestudio" },
    { name: "LinkedIn", handle: "@eveaglestudio", icon: Linkedin, href: "https://linkedin.com/company/eveaglestudio" },
    { name: "X / Twitter", handle: "@eveaglestudio", icon: Twitter, href: "https://x.com/eveaglestudio" },
    { name: "Email", handle: "enquiry@eveaglestudio.com", icon: Mail, href: "mailto:enquiry@eveaglestudio.com" },
  ];

  // Duplicate for seamless loop
  const marqueeItems = [...socialLinks, ...socialLinks, ...socialLinks];

  return (
    <footer className="relative w-full bg-eveagle-bg-secondary border-t border-eveagle-bg">
      {/* Scrolling Marquee */}
      <div className="w-full overflow-hidden py-6 border-b border-eveagle-bg">
        <div className="flex animate-marquee">
          {marqueeItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mx-8 group shrink-0"
            >
              <item.icon size={16} className="text-eveagle-accent" />
              <span className="font-mono text-sm text-eveagle-text-muted group-hover:text-eveagle-text transition-colors uppercase tracking-wider">
                {item.name}
              </span>
              <span className="text-eveagle-text/50">—</span>
              <span className="font-mono text-sm text-eveagle-text group-hover:text-eveagle-accent transition-colors">
                {item.handle}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-6 lg:px-20 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="font-display text-3xl font-bold text-eveagle-text tracking-tight hover:text-eveagle-accent transition-colors inline-block mb-6">
              Eveagle
            </a>
            <p className="text-eveagle-text-muted leading-relaxed text-sm mb-6">
              A creative studio crafting digital experiences that move people. Based in Hong Kong, working worldwide.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-eveagle-text-muted">
                Available for projects
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-eveagle-text-muted mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-eveagle-text hover:text-eveagle-accent transition-colors text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-eveagle-text-muted mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-eveagle-text hover:text-eveagle-accent transition-colors text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-eveagle-text-muted mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <a href="mailto:enquiry@eveaglestudio.com" className="flex items-center gap-3 text-eveagle-text hover:text-eveagle-accent transition-colors group">
                <Mail size={16} className="text-eveagle-accent" />
                <span className="text-sm">enquiry@eveaglestudio.com</span>
              </a>
              <a href="tel:+85295190597" className="flex items-center gap-3 text-eveagle-text hover:text-eveagle-accent transition-colors group">
                <Phone size={16} className="text-eveagle-accent" />
                <span className="text-sm">+852 9519 0597</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-eveagle-bg">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-eveagle-text-muted">
            <span>&copy; {currentYear} Eveagle Studio</span>
            <span className="hidden md:inline text-eveagle-bg-secondary">|</span>
            <a href="#" className="hover:text-eveagle-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-eveagle-text transition-colors">Terms</a>
          </div>

          <button onClick={scrollToTop} className="group flex items-center gap-2 text-eveagle-text-muted hover:text-eveagle-accent transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-wider">Back to top</span>
            <div className="w-8 h-8 border border-eveagle-bg rounded-sm flex items-center justify-center group-hover:border-eveagle-accent group-hover:bg-eveagle-accent/10 transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* Add marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </footer>
  );
}
