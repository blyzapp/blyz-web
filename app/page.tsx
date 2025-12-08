"use client";

import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import WaitlistSection from "./components/WaitlistSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden scroll-smooth">
      <HeroSection />
      <HowItWorksSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
