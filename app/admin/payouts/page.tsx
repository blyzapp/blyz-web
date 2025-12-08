// ~/Desktop/blyz-web/app/admin/payouts/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { MOCK_PAYOUT_WEEKS } from "../mockData"; // Ensure path is correct

// -------------------------------------------------------------
// Types
// -------------------------------------------------------------
type PayoutStatus = "draft" | "processing" | "paid";

interface OperatorPayout {
  operatorId: string;
  operatorName: string;
  jobsCount: number;
  amount: number;
  status: PayoutStatus;
}

interface WeeklyPayout {
  weekKey: string;
  label: string;
  jobsCount: number;
  operatorsCount: number;
  totalAmount: number;
  status: PayoutStatus;
  generatedAt: string;
  operatorBreakdown: OperatorPayout[];
}

// -------------------------------------------------------------
// Page Component
// -------------------------------------------------------------
export default function AdminPayoutsPage() {
  const [selectedWeekKey, setSelectedWeekKey] = useState(
    MOCK_PAYOUT_WEEKS[0]?.weekKey ?? ""
  );

  const selectedWeek =
    MOCK_PAYOUT_WEEKS.find((w) => w.weekKey === selectedWeekKey) ??
    MOCK_PAYOUT_WEEKS[0];

  const maxTotal = useMemo(
    () => Math.max(...MOCK_PAYOUT_WEEKS.map((w) => w.totalAmount), 0),
    []
  );

  const totalThisSeason = MOCK_PAYOUT_WEEKS.reduce(
    (sum, w) => sum + (w.totalAmount ?? 0),
    0
  );

  const totalJobs = MOCK_PAYOUT_WEEKS.reduce(
    (sum, w) => sum + (w.jobsCount ?? 0),
    0
  );

  const totalOperators = MOCK_PAYOUT_WEEKS.reduce(
    (sum, w) => sum + (w.operatorsCount ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 pb-20">

      {/* HEADER */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="text-[11px] text-slate-400">Admin / Payouts</div>
          <h1 className="text-xl font-semibold tracking-tight">Operator Payouts</h1>
          <p className="text-xs text-slate-400">
            Weekly payout runs · Operator breakdown · Earnings summary
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* KPI Row */}
        <section className="grid gap-4 md:grid-cols-4">
          <KpiCard
            label="Total Payouts This Season"
            value={`$${totalThisSeason.toFixed(2)}`}
          />
          <KpiCard
            label="Total Jobs"
            value={`${totalJobs}`}
          />
          <KpiCard
            label="Total Operators"
            value={`${totalOperators}`}
          />
          <KpiCard
            label="Selected Week"
            value={`$${selectedWeek?.totalAmount?.toFixed(2) ?? "0.00"}`}
            sub={`${selectedWeek?.jobsCount ?? 0} jobs · ${selectedWeek?.operatorsCount ?? 0} operators`}
          />
        </section>

        {/* WEEK TREND LIST */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <h2 className="text-xs uppercase font-semibold text-slate-300">Weekly Trend</h2>

          <div className="mt-3 space-y-2">
            {MOCK_PAYOUT_WEEKS.map((week) => {
              const pct = Math.max(10, ((week.totalAmount ?? 0) / (maxTotal || 1)) * 100);
              const active = week.weekKey === selectedWeekKey;

              return (
                <button
                  key={week.weekKey}
                  onClick={() => setSelectedWeekKey(week.weekKey)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left ${
                    active
                      ? "border-sky-500/80 bg-sky-500/10"
                      : "border-slate-800 bg-slate-950/80 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="text-slate-100 font-medium">{week.label}</div>
                    <div className="font-mono text-slate-300">${week.totalAmount?.toFixed(2) ?? "0.00"}</div>
                  </div>

                  <div className="mt-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${active ? "bg-sky-400" : "bg-sky-700/70"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SELECTED WEEK BREAKDOWN */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <h2 className="text-xs font-semibold uppercase text-slate-300">Selected Week Breakdown</h2>

          <div className="mt-3 text-xs">
            <div className="font-medium text-slate-100">{selectedWeek?.label}</div>
            <div className="text-[11px] text-slate-400">
              Generated: {selectedWeek?.generatedAt ?? "N/A"}
            </div>

            <div className="mt-3">
              <div className="text-[11px] text-slate-400 uppercase">Total Payout</div>
              <div className="text-lg font-semibold text-slate-50">
                ${selectedWeek?.totalAmount?.toFixed(2) ?? "0.00"}
              </div>
            </div>

            {/* Operator Breakdown */}
            <div className="mt-6 space-y-3">
              {selectedWeek?.operatorBreakdown?.map((op) => (
                <div
                  key={op.operatorId}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 flex justify-between"
                >
                  <div>
                    <div className="font-medium text-slate-100">{op.operatorName}</div>
                    <div className="text-[11px] text-slate-400">{op.jobsCount} jobs</div>
                  </div>

                  <div className="text-right">
                    <div className="text-slate-100 font-mono text-sm">
                      ${op.amount.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500">{op.status}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

// -------------------------------------------------------------
// KPI Card Component
// -------------------------------------------------------------
function KpiCard(props: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 shadow">
      <span className="text-[11px] uppercase text-slate-400">{props.label}</span>
      <span className="text-xl font-semibold text-slate-50">{props.value}</span>
      {props.sub && <span className="text-[11px] text-slate-500">{props.sub}</span>}
    </div>
  );
}
