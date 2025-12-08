"use client";

import React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  color?: "cyan" | "emerald" | "yellow" | "sky" | "purple";
}

const colorMap: Record<string, string> = {
  cyan: "border-cyan-400 text-cyan-300",
  emerald: "border-emerald-400 text-emerald-300",
  yellow: "border-yellow-400 text-yellow-300",
  sky: "border-sky-400 text-sky-300",
  purple: "border-purple-400 text-purple-300",
};

export default function KPICard({ title, value, color = "cyan" }: KPICardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 bg-slate-950/80 shadow-xl flex flex-col justify-between ${colorMap[color]}`}
    >
      <p className="text-xs text-slate-400 uppercase">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
