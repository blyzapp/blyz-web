"use client";

export default function ComingSoon() {
  return (
    <section className="w-full py-28 flex flex-col items-center text-center gap-10 bg-black relative z-30">

      <h2 className="text-3xl md:text-4xl font-semibold text-white">
        Download the App — <span className="text-[var(--blyz-cyan)]">Coming Soon</span>
      </h2>

      <p className="text-white/60 max-w-xl leading-relaxed">
        The fastest way to book snow removal. Real-time tracking, photo proof,
        and trusted operators — all from your phone.
      </p>

      {/* APP BADGES */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">

        {/* APP STORE */}
        <div className="group cursor-pointer">
          <img
            src="/app-store.svg"
            alt="App Store"
            className="w-40 md:w-48 transition group-hover:drop-shadow-[0_0_12px_rgba(0,169,255,0.9)]"
          />
        </div>

        {/* GOOGLE PLAY */}
        <div className="group cursor-pointer">
          <img
            src="/google-play.svg"
            alt="Google Play"
            className="w-40 md:w-48 transition group-hover:drop-shadow-[0_0_12px_rgba(0,169,255,0.9)]"
          />
        </div>

      </div>

      <p className="text-xs text-white/30 mt-4">
        iOS & Android launch early 2025
      </p>
    </section>
  );
}
