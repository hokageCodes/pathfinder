'use client';

import { useEffect } from 'react';
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import FAQSection from "../components/sections/FAQSection";

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when page loads
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Run on mount
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <FAQSection />
    </main>
  );
}