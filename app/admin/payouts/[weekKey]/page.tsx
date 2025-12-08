"use client";

import { useEffect, useState } from "react";

interface PayoutOperator {
  operatorId: string;
  operatorName: string;
  jobsCount: number;
  amount: number;
  status: "draft" | "processing" | "paid";
}

interface PayoutWeek {
  weekKey: string;
  label: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  pendingAmount: number;
  jobsCount: number;
  operatorsCount: number;
  status: "draft" | "processing" | "paid";
  generatedAt: string;
  operatorBreakdown: PayoutOperator[];
}

interface PageProps {
  params: { weekKey: string };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function AdminPayoutWeekPage({ params }: PageProps) {
  const [week, setWeek] = useState<PayoutWeek | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeek() {
      try {
        const weekKey = encodeURIComponent(params.weekKey);

        // For now: load local mock JSON file
        const res = await fetch(
          "/Users/patricia/Desktop/blyz-server/uploads/mock-payout-week.json"
        );
        const data: PayoutWeek = await res.json();

        setWeek(data);
      } catch (err) {
        console.error("Failed to load payout week:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeek();
  }, [params.weekKey]);

  if (loading) return <div className="p-4 text-slate-200">Loading...</div>;
  if (!week) return <div className="p-4 text-red-400">Week not found</div>;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-xl font-semibold mb-4">{week.label} ({week.weekKey})</h1>

      <div className="space-y-4">
        <div className="rounded-xl bg-slate-900/80 p-4 border border-slate-700">
          <div>Total Amount: ${week.totalAmount.toFixed(2)}</div>
          <div>Pending Amount: ${week.pendingAmount.toFixed(2)}</div>
          <div>Jobs Count: {week.jobsCount}</div>
          <div>Operators Count: {week.operatorsCount}</div>
          <div>Status: {week.status}</div>
        </div>

        <section className="rounded-xl bg-slate-900/80 p-4 border border-slate-700">
          <h2 className="text-lg font-semibold mb-2">Operator Breakdown</h2>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-700">
                <th className="pb-1">Operator</th>
                <th className="pb-1">Jobs</th>
                <th className="pb-1">Amount</th>
                <th className="pb-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {week.operatorBreakdown.map((op) => (
                <tr key={op.operatorId} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="py-1">{op.operatorName}</td>
                  <td className="py-1">{op.jobsCount}</td>
                  <td className="py-1">${op.amount.toFixed(2)}</td>
                  <td className="py-1">{op.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
