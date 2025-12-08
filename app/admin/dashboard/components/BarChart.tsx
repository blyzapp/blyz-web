"use client";

import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------------------- MOCK DATA ----------------------
// Replace with API data when backend is live
const data = [
  { operator: "Alex Martin", jobs: 5 },
  { operator: "Snow King Inc.", jobs: 4 },
  { operator: "Pat’s Plows", jobs: 3 },
];

export default function BarChart({ chartData = data }: { chartData?: typeof data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReBarChart data={chartData}>
        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
        <XAxis dataKey="operator" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "none", color: "#fff" }}
          labelStyle={{ color: "#94a3b8" }}
        />
        <Bar dataKey="jobs" fill="#00A9FF" />
      </ReBarChart>
    </ResponsiveContainer>
  );
}
