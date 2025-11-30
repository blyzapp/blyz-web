"use client";

import Image from "next/image";

export default function Landing() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-[#050A0F] to-black text-white overflow-hidden px-6">

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[520px] h-[520px] bg-blue-600/20 blur-[180px] rounded-full"></div>
      </div>

      {/* Container */}
      <div className="relative z-10 max-w-5xl mx-auto py-24 flex flex-col items-center text-center gap-6">

        {/* Logo */}
        <Image
          src="/blyz-logo-light.png"
          alt="Blyz Logo"
          width={150}
          height={150}
          className="drop-shadow-[0_0_25px_rgba(0,150,255,0.4)]"
        />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
          Your Driveway, Cleared in Minutes.
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
          Blyz connects you instantly with nearby snow removal operators. 
          Get fast service, live GPS tracking, and photo proof — all in one tap.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="/"
            className="px-6 py-3 rounded-full bg-blue-600 text-black font-semibold hover:bg-blue-500 transition"
          >
            Go to Homepage
          </a>

          <a
            href="#"
            className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition">
            Join Waitlist
          </a>
        </div>

        {/* Footer */}
        <p className="text-white/40 text-sm mt-16">
          Powered by Blyz • Toronto & GTA
        </p>
      </div>
    </main>
  );
}
