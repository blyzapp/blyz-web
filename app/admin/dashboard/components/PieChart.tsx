"use client";

import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------------------- MOCK DATA ----------------------
// Replace with API data when backend is live
const data = [
  { name: "Completed", value: 50 },
  { name: "In Progress", value: 30 },
  { name: "Pending", value: 15 },
  { name: "Cancelled", value: 5 },
];

const COLORS = ["#10B981", "#0EA5E9", "#FACC15", "#EF4444"];

export default function PieChart({ chartData = data }: { chartData?: typeof data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RePieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={40}
          outerRadius={70}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "none", color: "#fff" }}
          labelStyle={{ color: "#94a3b8" }}
        />
      </RePieChart>
    </ResponsiveContainer>
  );
}
