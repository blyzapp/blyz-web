// ~/Desktop/blyz-web/app/admin/operators/[id]/EarningsChart.tsx
"use client";

import React, { useMemo } from "react";

interface Job {
  id: string;
  status: string;
  price: number;
  createdAt: string;
}

interface Props {
  jobs: Job[];
  totalEarnings: number;
}

export default function EarningsChart({ jobs, totalEarnings }: Props) {
  // ------------------------------
  // Group earnings by date
  // ------------------------------
  const daily = useMemo(() => {
    const map = new Map<string, number>();

    jobs.forEach((job) => {
      const date = job.createdAt?.split(" ")[0] || job.createdAt || "";
      const amount = job.price || 0;
      map.set(date, (map.get(date) || 0) + amount);
    });

    return Array.from(map.entries())
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  }, [jobs]);

  const maxAmount = daily.length ? Math.max(...daily.map((d) => d.amount)) : 0;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xs font-semibold uppercase text-slate-300">
            Earnings Overview
          </h2>
          <p className="text-[11px] text-slate-500">
            Simple bar chart based on job prices
          </p>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-slate-400 uppercase">Total</div>
          <div className="text-lg font-semibold text-slate-50">
            ${totalEarnings.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Bar chart */}
      {daily.length === 0 ? (
        <div className="text-[11px] text-slate-500 mt-3">
          No jobs yet for this operator.
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          {daily.map((entry) => {
            const pct = maxAmount ? Math.max(8, (entry.amount / maxAmount) * 100) : 0;
            return (
              <div key={entry.date} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>{entry.date}</span>
                  <span className="font-mono">${entry.amount.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
