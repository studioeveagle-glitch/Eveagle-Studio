"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import TrustBar from "@/components/TrustBar";
import Speed from "@/components/Speed";
import Agents from "@/components/Agents";
import Features from "@/components/Features";
import Story from "@/components/Story";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <main 
        className={`relative min-h-screen w-full overflow-x-hidden bg-eveagle-bg transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <Hero isLoaded={!isLoading} />
        <Problem isLoaded={!isLoading} />
        <TrustBar isLoaded={!isLoading} />
        <Speed isLoaded={!isLoading} />
        <Agents isLoaded={!isLoading} />
        <Features isLoaded={!isLoading} />
        <Story isLoaded={!isLoading} />
        <FAQ isLoaded={!isLoading} />
        <Contact isLoaded={!isLoading} />
        <Footer />
      </main>
    </>
  );
}
