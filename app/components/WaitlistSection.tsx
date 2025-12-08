"use client";

import { useState } from "react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // -----------------------------
  // 🌐 Live Render Backend
  // -----------------------------
  const API_URL = "https://blyz-api.onrender.com/api";

  // -----------------------------
  // Join waitlist function
  // -----------------------------
  const joinWaitlist = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(`${API_URL}/waitlist/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });

      const data = await res.json();

      if (data.ok) {
        setSuccess("✅ You're officially on the waitlist!");
        setEmail("");
        setPhone("");
      } else {
        setError(data.msg || "Something went wrong.");
      }
    } catch (err) {
      console.error("Waitlist submission error:", err);
      setError("⚠ Server unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative bg-black text-white py-32 px-6 text-center">
      <div className="absolute inset-0 flex justify-center pt-10 pointer-events-none">
        <div className="w-[550px] h-[550px] bg-blue-600/20 blur-[180px] rounded-full"></div>
      </div>

      <h2 className="text-4xl font-bold relative z-10 drop-shadow-[0_0_25px_rgba(0,150,255,0.45)]">
        Get Started with Blyz
      </h2>

      <p className="text-white/70 mt-3 relative z-10">
        Join the waitlist — launching soon across Toronto & GTA.
      </p>

      {/* Email + Phone */}
      <div className="relative z-10 mt-10 mx-auto max-w-md flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white placeholder-white/40 outline-none"
        />

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)"
          className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white placeholder-white/40 outline-none"
        />

        <button
          onClick={joinWaitlist}
          disabled={loading}
          className="px-5 py-3 rounded-full bg-blue-500 text-black font-semibold hover:bg-blue-400 transition disabled:opacity-40"
        >
          {loading ? "Joining..." : "Join Waitlist"}
        </button>
      </div>

      {success && <p className="text-green-400 text-sm mt-4">{success}</p>}
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </section>
  );
}
