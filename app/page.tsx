"use client";

// ============================================================
// 🏠 Blyz Landing Page — Home
// ============================================================

import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import WaitlistSection from "./components/WaitlistSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden scroll-smooth">
      
      {/* HERO SECTION */}
      <HeroSection />

      {/* HOW IT WORKS */}
      <HowItWorksSection />

      {/* WAITLIST */}
      <WaitlistSection />

      {/* FOOTER */}
      <Footer />

    </main>
  );
}
