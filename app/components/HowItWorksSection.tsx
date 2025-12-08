"use client";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative bg-black text-white py-32 px-6 text-center"
    >
      {/* Glow behind header */}
      <div className="absolute inset-0 flex justify-center pt-10 pointer-events-none">
        <div className="w-[550px] h-[550px] bg-blue-600/20 blur-[180px] rounded-full"></div>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold relative z-10 drop-shadow-[0_0_25px_rgba(0,150,255,0.45)]">
        How Blyz Works
      </h2>
      <p className="text-white/70 mt-3 relative z-10">
        Fast. Simple. Reliable.
      </p>

      {/* Steps Container */}
      <div className="relative z-10 mt-16 grid gap-16">

        {/* Step 1 */}
        <div className="fade-in-step flex flex-col items-center">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-2xl font-semibold">1. Request Snow Removal</h3>
          <p className="text-white/70 max-w-xl mt-2">
            Enter your address and confirm your driveway type.
          </p>
        </div>

        {/* Step 2 */}
        <div className="fade-in-step flex flex-col items-center">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-2xl font-semibold">2. Operator Accepts</h3>
          <p className="text-white/70 max-w-xl mt-2">
            A nearby Blyz operator takes the job and heads your way.
          </p>
        </div>

        {/* Step 3 */}
        <div className="fade-in-step flex flex-col items-center">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-2xl font-semibold">3. Track in Real Time</h3>
          <p className="text-white/70 max-w-xl mt-2">
            Watch your operator approach your home on live GPS.
          </p>
        </div>

        {/* Step 4 */}
        <div className="fade-in-step flex flex-col items-center">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-2xl font-semibold">4. Receive Photo Proof</h3>
          <p className="text-white/70 max-w-xl mt-2">
            Get before & after images right inside Blyz.
          </p>
        </div>
      </div>
    </section>
  );
}
