"use client";

import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------------------- MOCK DATA ----------------------
// Replace with API data when backend is live
const data = [
  { day: "Mon", revenue: 200, jobs: 5 },
  { day: "Tue", revenue: 350, jobs: 8 },
  { day: "Wed", revenue: 400, jobs: 9 },
  { day: "Thu", revenue: 300, jobs: 6 },
  { day: "Fri", revenue: 450, jobs: 10 },
  { day: "Sat", revenue: 500, jobs: 12 },
  { day: "Sun", revenue: 350, jobs: 7 },
];

export default function LineChart({ chartData = data }: { chartData?: typeof data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReLineChart data={chartData}>
        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
        <XAxis dataKey="day" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "none", color: "#fff" }}
          labelStyle={{ color: "#94a3b8" }}
        />
        <Line type="monotone" dataKey="revenue" stroke="#00A9FF" strokeWidth={2} />
        <Line type="monotone" dataKey="jobs" stroke="#10B981" strokeWidth={2} />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
