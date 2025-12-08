"use client";

export default function MapPlaceholder() {
  return (
    <div className="w-full h-full rounded-xl border border-slate-800 bg-slate-900/80 relative overflow-hidden flex items-center justify-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0ea5e9_0,_#020617_60%)] opacity-40" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Text */}
      <div className="relative text-center text-[11px] text-slate-300">
        <p>Map Preview</p>
        <p className="text-[10px] text-slate-500">Google Maps / Leaflet here</p>
      </div>
    </div>
  );
}
