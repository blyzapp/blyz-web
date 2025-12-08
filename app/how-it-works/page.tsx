"use client";

import Image from "next/image";

export default function HowItWorks() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Snow */}
      <div className="snow" />

      {/* Glow behind header */}
      <div className="absolute inset-0 flex justify-center pt-20 pointer-events-none">
        <div className="w-[550px] h-[550px] bg-blue-600/20 blur-[180px] rounded-full"></div>
      </div>

      {/* Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-[0_0_25px_rgba(0,150,255,0.45)]">
          How Blyz Works
        </h1>
        <p className="text-white/70 mt-3">
          Fast. Simple. Reliable. Here’s how your driveway gets cleared in minutes.
        </p>

        {/* Steps Container */}
        <div className="mt-16 grid gap-16">

          {/* Step 1 */}
          <div className="flex flex-col items-center fade-in-step">
            <div className="text-5xl mb-4">📍</div>
            <h2 className="text-2xl font-semibold">1. Request Snow Removal</h2>
            <p className="text-white/70 max-w-xl mt-2">
              Enter your address, choose your driveway size, and confirm. It takes under 10 seconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center fade-in-step">
            <div className="text-5xl mb-4">👷‍♂️</div>
            <h2 className="text-2xl font-semibold">2. Operator Accepts</h2>
            <p className="text-white/70 max-w-xl mt-2">
              A nearby Blyz operator accepts your job and heads your way immediately.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center fade-in-step">
            <div className="text-5xl mb-4">📡</div>
            <h2 className="text-2xl font-semibold">3. Track in Real Time</h2>
            <p className="text-white/70 max-w-xl mt-2">
              Watch your operator approach your home with live GPS tracking.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center fade-in-step">
            <div className="text-5xl mb-4">📸</div>
            <h2 className="text-2xl font-semibold">4. Receive Photo Proof</h2>
            <p className="text-white/70 max-w-xl mt-2">
              Once cleared, you get before & after photos right inside Blyz — guaranteed quality.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20">
          <a
            href="/"
            className="px-8 py-3 bg-blue-600 text-black rounded-full font-semibold hover:bg-blue-500 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </main>
  );
}
