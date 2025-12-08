"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center px-6"
    >

      {/* Snow (behind everything) */}
      <div className="snow pointer-events-none absolute inset-0 z-0" />

      {/* Logo (raw HTML test) */}
<div className="glow-wrapper mb-6 relative z-50">
  <img 
    src="/Blyzlogo.png"
    alt="Blyz Logo Raw"
    style={{ 
      width: "480px",
      height: "auto",
      zIndex: 50,
      position: "relative",
      display: "block"
    }}
  />
</div>


      {/* Title */}
      <h1
        className="text-3xl md:text-5xl font-semibold text-blue-300 mt-4"
        style={{ zIndex: 50, position: "relative" }}
      >
        Tap. Track. Relax.
      </h1>

      {/* Feature line */}
      <div
        className="flex flex-wrap gap-4 mt-6 text-white/60 text-sm justify-center"
        style={{ zIndex: 50, position: "relative" }}
      >
        <span>• Trusted Local Operators</span>
        <span>• Live Job Tracking</span>
        <span>• Photo Proof</span>
        <span>• 24/7 Support</span>
      </div>
    </section>
  );
}
