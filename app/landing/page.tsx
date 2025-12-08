"use client";

import Image from "next/image";

export default function Landing() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Snow */}
      <div className="snow" />

      {/* Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">

        {/* Top badge */}
        <div className="px-5 py-2 bg-white/10 border border-white/20 rounded-full text-sm tracking-wide backdrop-blur-md">
          ON-DEMAND SNOW REMOVAL
        </div>

        {/* Logo */}
        <div className="flex justify-center mt-4">
          <div className="glow-wrapper">
            <Image
              src="/blyz-max-glow.png"
              alt="Blyz Logo"
              width={480}
              height={480}
              className="glow-logo"
            />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-semibold text-blue-300 mt-4">
          Tap. Track. Relax.
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-4 justify-center text-white/60 text-sm mt-4">
          <span>• Trusted Local Operators</span>
          <span>• Live Job Tracking</span>
          <span>• Photo Proof of Completion</span>
          <span>• 24/7 Winter Support</span>
        </div>

        {/* Email Field */}
        <div className="mt-8 w-full max-w-md flex items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent outline-none text-white placeholder-white/40"
          />
          <button className="ml-3 px-5 py-2 rounded-full bg-blue-500 text-black font-semibold">
            Join the Waitlist
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 flex gap-4">
          <button className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white">
            Try Demo
          </button>

          <button className="px-6 py-2 rounded-full bg-blue-600 text-black font-semibold">
            Join Waitlist
          </button>
        </div>

        {/* Footer */}
        <p className="text-white/40 text-sm mt-14">
          Launching soon in Toronto & the GTA
        </p>
      </div>
    </main>
  );
}
