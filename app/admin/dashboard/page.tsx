"use client";

// ============================================================================
// 📊 Admin Dashboard — FINAL 2025 R6 BUILD
// - Injects Bearer token before axios calls
// - Fixes 403 unauthorized errors
// - Fully compatible with Express: /api/admin/dashboard
// ============================================================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/src/context/AdminAuthContext";

// --------------------------------------------
// Types
// --------------------------------------------
interface DayPoint {
  date: string;
  jobs: number;
  revenue: number;
}

interface RecentJob {
  _id?: string;
  customerName?: string;
  operatorName?: string;
  status?: string;
  price?: number;
  createdAt?: string;
}

interface RecentOperator {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  isOnline?: boolean;
  createdAt?: string;
}

interface DashboardResponse {
  ok?: boolean;
  stats?: {
    totalOperators: number;
    onlineOperators: number;
    totalJobs: number;
    pendingJobs: number;
    inProgressJobs: number;
    completedJobs: number;
    totalRevenueLast7Days: number;
    payoutsPending: number;
  };
  charts?: {
    last7Days?: DayPoint[];
  };
  recentJobs?: RecentJob[];
  recentOperators?: RecentOperator[];
}

export default function AdminDashboardPage() {
  const { token } = useAuth();

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // --------------------------------------------
  // Load Dashboard Data
  // --------------------------------------------
  useEffect(() => {
    if (!token) return;

    // ⭐ Inject token for ALL axios requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    async function load() {
      try {
        const res = await axios.get(`${API_URL}/api/admin/dashboard`);

        if (res.data.ok) {
          setData({
            stats: res.data.stats ?? {},
            charts: res.data.charts ?? {},
            recentJobs: Array.isArray(res.data.recentJobs)
              ? res.data.recentJobs
              : [],
            recentOperators: Array.isArray(res.data.recentOperators)
              ? res.data.recentOperators
              : [],
          });
        } else {
          console.error("❌ Dashboard Error:", res.data.message);
          setData(null);
        }
      } catch (err) {
        console.error("❌ Dashboard Load Error:", err);
        setData(null);
      }

      setLoading(false);
    }

    load();
  }, [token, API_URL]);

  if (loading)
    return <div className="p-8 text-slate-300">Loading dashboard…</div>;
  if (!data)
    return (
      <div className="p-8 text-red-400">Failed to load dashboard data.</div>
    );

  const { stats = {}, charts = {}, recentJobs = [], recentOperators = [] } =
    data;

  const last7Days = charts.last7Days ?? [];
  const maxJobs = Math.max(...last7Days.map((d) => d.jobs || 0), 1);
  const maxRevenue = Math.max(...last7Days.map((d) => d.revenue || 0), 1);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Live analytics for all Blyz operations.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard label="Total Operators" value={stats.totalOperators ?? 0} />
        <StatCard label="Online Operators" value={stats.onlineOperators ?? 0} />
        <StatCard label="Active Jobs" value={stats.inProgressJobs ?? 0} />
        <StatCard
          label="Revenue (7 Days)"
          value={`$${(stats.totalRevenueLast7Days ?? 0).toFixed(2)}`}
        />
        <StatCard
          label="Payouts Pending"
          value={`$${(stats.payoutsPending ?? 0).toFixed(2)}`}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard title="Jobs — Last 7 Days" subtitle="Job volume trend">
          <BarChart
            data={last7Days.map((d) => ({
              label: d.date?.slice(5) || "—",
              value: d.jobs || 0,
            }))}
            max={maxJobs}
            color="bg-sky-500"
          />
        </ChartCard>

        <ChartCard title="Revenue — Last 7 Days" subtitle="Completed job value">
          <BarChart
            data={last7Days.map((d) => ({
              label: d.date?.slice(5) || "—",
              value: d.revenue || 0,
            }))}
            max={maxRevenue}
            color="bg-emerald-500"
            money
          />
        </ChartCard>
      </div>

      {/* RECENT JOBS & OPERATORS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TableCard title="Recent Jobs" count={recentJobs.length}>
          <table className="w-full text-xs">
            <thead className="text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2 text-left">Job ID</th>
                <th className="py-2 text-left">Customer</th>
                <th className="py-2 text-left">Operator</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-slate-600 text-center py-4">
                    No recent jobs.
                  </td>
                </tr>
              )}

              {recentJobs.map((job, idx) => (
                <tr key={job._id || idx} className="border-b border-slate-900/60">
                  <td className="py-2">{job._id || "-"}</td>
                  <td className="py-2">{job.customerName || "-"}</td>
                  <td className="py-2">{job.operatorName || "-"}</td>
                  <td className="py-2">
                    <StatusPill status={job.status || "-"} />
                  </td>
                  <td className="py-2 text-right">
                    {job.price ? `$${job.price.toFixed(2)}` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard title="Recent Operators" count={recentOperators.length}>
          <table className="w-full text-xs">
            <thead className="text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Email</th>
                <th className="py-2 text-left">Phone</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOperators.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-slate-600 text-center py-4">
                    No operators found.
                  </td>
                </tr>
              )}

              {recentOperators.map((op, idx) => (
                <tr key={op._id || idx} className="border-b border-slate-900/60">
                  <td className="py-2">{op.name || "-"}</td>
                  <td className="py-2">{op.email || "-"}</td>
                  <td className="py-2">{op.phone || "-"}</td>
                  <td className="py-2">
                    {op.isOnline ? (
                      <span className="text-emerald-400">Online</span>
                    ) : (
                      <span className="text-slate-400">Offline</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
      <div className="text-xs uppercase text-slate-400">{label}</div>
      <div className="text-2xl font-semibold text-slate-100 mt-1">{value}</div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function TableCard({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        <span className="text-xs text-slate-500">{count} results</span>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function BarChart({
  data,
  max,
  money,
  color,
}: {
  data: { label: string; value: number }[];
  max: number;
  money?: boolean;
  color: string;
}) {
  return (
    <div className="space-y-2">
      {data.map((d, idx) => {
        const pct = max ? (d.value / max) * 100 : 0;
        return (
          <div key={`${d.label}-${idx}`} className="flex items-center gap-3 text-xs">
            <div className="w-12 text-slate-500">{d.label}</div>
            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 ${color} rounded-full`}
                style={{ width: `${Math.max(pct, 6)}%` }}
              />
            </div>
            <div className="w-20 text-right text-slate-300">
              {money ? `$${d.value.toFixed(0)}` : d.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const s = (status || "").toLowerCase();
  if (s === "pending")
    return (
      <span className="px-2 py-1 rounded-full text-[11px] bg-amber-500/20 text-amber-300">
        {status}
      </span>
    );
  if (s === "in_progress")
    return (
      <span className="px-2 py-1 rounded-full text-[11px] bg-sky-500/20 text-sky-300">
        {status}
      </span>
    );
  if (s === "completed")
    return (
      <span className="px-2 py-1 rounded-full text-[11px] bg-emerald-500/20 text-emerald-300">
        {status}
      </span>
    );
  return (
    <span className="px-2 py-1 rounded-full text-[11px] border border-slate-600 text-slate-300">
      {status}
    </span>
  );
}
