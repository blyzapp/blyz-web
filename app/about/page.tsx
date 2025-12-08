"use client";

export default function About() {
  // Smooth scroll for CTA button
  const scrollToWaitlist = () => {
    if (typeof document !== "undefined") {
      const form = document.getElementById("waitlist-form");
      if (form) {
        form.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(0,169,255,0.15),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,15,15,1),_rgba(0,0,0,1))]" />

      {/* Snow Overlay */}
      <div className="snow" />

      {/* PAGE WRAPPER */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 flex flex-col gap-32">

        {/* HEADER */}
        <section className="text-center flex flex-col items-center gap-6">

          {/* Glowing Logo */}
          <div className="flex justify-center">
            <img
              src="/blyz-max-glow.png"
              alt="BLYZ Logo"
              className="blyz-glow select-none"
              style={{ width: "460px", height: "auto" }}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mt-4">
            About BLYZ
          </h1>

          <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
            BLYZ was created to bring <strong>modern technology, transparency,
            and reliability</strong> to winter services. We're building the fastest,
            cleanest, and most trusted on-demand snow removal platform in Canada.
          </p>
        </section>

        {/* WHY WE STARTED */}
        <section className="flex flex-col gap-10">
          <h2 className="text-2xl font-semibold text-center">
            Why We Built BLYZ
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-medium text-[var(--blyz-cyan)]">❄️ Snow Removal is Broken</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Long wait times. No updates. No proof. No transparency.
                The industry has stayed the same for decades.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-medium text-[var(--blyz-cyan)]">📍 Technology Makes It Better</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Live GPS tracking, instant booking, fair pricing, verified operators,
                and photo proof bring winter services into 2025.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-medium text-[var(--blyz-cyan)]">🚜 Operators Deserve Better</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fair payouts, simple job flows, real-time alerts, and less driving
                between jobs. When operators win, everyone wins.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-medium text-[var(--blyz-cyan)]">👨‍👩‍👧 Homeowners Want Peace of Mind</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                One tap. Live updates. Before & after photos. You always know exactly
                what's happening — and when it’s done.
              </p>
            </div>

          </div>
        </section>

        {/* OUR MISSION */}
        <section className="text-center flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Our Mission at BLYZ</h2>

          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            To make winter maintenance <strong>effortless</strong>, 
            <strong>transparent</strong>, and <strong>accessible</strong> —
            for both homeowners and operators. BLYZ brings modern technology
            to a service that desperately needs an upgrade.
          </p>
        </section>

        {/* CTA SECTION */}
        <section className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold">
            Be First in Line When BLYZ Launches ❄️
          </h2>

          <p className="text-gray-400 max-w-xl">
            Join the waitlist and get early-access, priority booking, and launch updates.
          </p>

          <button
            onClick={scrollToWaitlist}
            className="px-8 py-4 mt-2 rounded-full bg-[var(--blyz-cyan)] text-black text-lg font-semibold shadow-[0_0_20px_rgba(0,169,255,0.5)] hover:bg-[#26baff] transition"
          >
            Join the Waitlist
          </button>
        </section>
      </div>
    </main>
  );
}
