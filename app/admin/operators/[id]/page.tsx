"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { getAdminToken } from "@/lib/adminAuth";
import { OperatorPoint } from "@/app/admin/components/OperatorMap";

const OperatorMap = dynamic(() => import("@/app/admin/components/OperatorMap"), {
  ssr: false,
});

interface JobSummary {
  _id: string;
  customerName?: string;
  address?: string;
  status?: string;
  price?: number;
  createdAt?: string;
}

interface OperatorData {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  status?: string;
  joinedAt?: string;
  totalJobs?: number;
  completedJobs?: number;
  cancelledJobs?: number;
  lifetimeEarnings?: number;
  last30DaysEarnings?: number;
  lat?: number;
  lng?: number;
  lastLocationAt?: string;
}

export default function AdminOperatorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const operatorId = typeof params?.id === "string" ? params.id : "";

  const [operator, setOperator] = useState<OperatorData | null>(null);
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔐 Safe Auth Wrappers
  async function authGet(url: string) {
    const token = getAdminToken();
    if (!token) return { ok: false, message: "Missing admin token" };

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.error("❌ Auth GET error:", err);
      return { ok: false, message: "Server error" };
    }
  }

  async function authDelete(url: string) {
    const token = getAdminToken();
    if (!token) return { ok: false, message: "Missing admin token" };

    try {
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.error("❌ Auth DELETE error:", err);
      return { ok: false, message: "Delete failed" };
    }
  }

  async function authPatch(url: string, body: any = {}) {
    const token = getAdminToken();
    if (!token) return { ok: false, message: "Missing admin token" };

    try {
      const res = await axios.patch(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.error("❌ Auth PATCH error:", err);
      return { ok: false, message: "Update failed" };
    }
  }

  // ==========================================================================
  // LOAD OPERATOR DETAILS → FIXED API ROUTES
  // ==========================================================================
  useEffect(() => {
    if (!operatorId || !BASE_URL) {
      setError("Missing operator ID or API URL");
      setLoading(false);
      return;
    }

    let mounted = true;

    const loadOperator = async () => {
      // ⭐ FIXED ROUTE
      const res = await authGet(`${BASE_URL}/api/admin/operators/${operatorId}`);

      if (!mounted) return;

      if (!res.ok) {
        setError(res.message || "Failed to load operator");
        setLoading(false);
        return;
      }

      setOperator(res.operator);
      setJobs(res.jobHistory || []);
      setError(null);
      setLoading(false);
    };

    loadOperator();
    const interval = setInterval(loadOperator, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [operatorId, BASE_URL]);

  // ==========================================================================
  // DELETE OPERATOR → FIXED ROUTE
  // ==========================================================================
  const handleDeleteOperator = async () => {
    if (!operator || !BASE_URL) return;

    setDeleting(true);
    setDeleteError(null);

    const res = await authDelete(`${BASE_URL}/api/admin/operators/${operator._id}`);

    if (!res.ok) {
      setDeleteError(res.message || "Failed to delete operator.");
      setDeleting(false);
      return;
    }

    router.push("/admin/operators");
  };

  // ==========================================================================
  // RESET GPS → FIXED ROUTE
  // ==========================================================================
  const handleResetGPS = async () => {
    if (!operator || !BASE_URL) return;

    await authPatch(`${BASE_URL}/api/admin/operators/${operator._id}/reset-location`);

    setOperator({
      ...operator,
      lat: undefined,
      lng: undefined,
      lastLocationAt: undefined,
    });
  };

  // Computed Stats
  const computedStats = useMemo(() => {
    if (!operator) return { completionRate: 0, avgJobValue: 0 };

    const totalJobs = operator.totalJobs ?? jobs.length;
    const completedJobs =
      operator.completedJobs ??
      jobs.filter((j) => j.status === "completed").length;

    const completionRate =
      totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

    const totalRevenue = jobs.reduce(
      (sum, j) => sum + (j.price ?? 0),
      0
    );

    const avgJobValue = jobs.length > 0 ? totalRevenue / jobs.length : 0;

    return { completionRate, avgJobValue };
  }, [operator, jobs]);

  // Live Map
  const operatorPoints: OperatorPoint[] = useMemo(() => {
    if (!operator) return [];
    return [
      {
        name: operator.name,
        lat: operator.lat,
        lng: operator.lng,
        status: operator.status || "offline",
        trail: [],
      },
    ];
  }, [operator]);

  // UI
  if (loading && !operator)
    return <div className="text-slate-300 text-sm">Loading operator…</div>;

  if (error || !operator)
    return (
      <div>
        <Link href="/admin/operators" className="text-sky-400 underline mb-4 inline-block">
          ← Back to Operators
        </Link>
        <div className="text-red-400 mt-2">{error || "Failed to load operator"}</div>
      </div>
    );

  const lastLocationLabel = operator.lastLocationAt
    ? new Date(operator.lastLocationAt).toLocaleTimeString()
    : "No location";

  return (
    <main className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/operators" className="text-sky-400 underline mb-3 inline-block">
            ← Back to Operators
          </Link>
          <h1 className="text-2xl font-semibold">{operator.name}</h1>
          <p className="text-sm text-slate-400 mt-1">Operator ID: {operator._id}</p>
          <p className="text-xs text-slate-500 mt-1">
            Status: <span className="text-slate-200">{operator.status}</span>
          </p>
          {deleteError && <p className="text-xs text-red-400 mt-2">{deleteError}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetGPS}
            className="px-3 py-2 rounded-lg border border-yellow-500/60 text-yellow-300 text-xs font-semibold bg-yellow-500/10 hover:bg-yellow-500/20 transition"
          >
            Reset Location
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-2 rounded-lg border border-red-500/60 text-red-300 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 transition"
          >
            Delete Operator
          </button>
        </div>
      </div>

      {/* Top Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileCard operator={operator} />
        <JobStatsCard operator={operator} jobs={jobs} computed={computedStats} />
        <EarningsCard operator={operator} computed={computedStats} />
      </section>

      {/* Map */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Live Location</h2>
          <p className="text-xs text-slate-500">
            Last updated: {lastLocationLabel}
          </p>
        </div>
        <OperatorMap operators={operatorPoints} />
      </section>

      {/* Jobs Table */}
      <JobsTable jobs={jobs} />

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
          <div className="bg-slate-950 border border-red-500/40 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-semibold text-red-300 mb-2">
              Delete Operator
            </h2>
            <p className="text-sm text-slate-300 mb-4">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold">{operator.name}</span>? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="px-3 py-1.5 rounded-lg text-xs border border-slate-600 text-slate-200 hover:bg-slate-800/60 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteOperator}
                disabled={deleting}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white disabled:opacity-60 transition"
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ---------------------------
// COMPONENTS
// ---------------------------

function ProfileCard({ operator }: { operator: OperatorData }) {
  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5">
      <h2 className="text-sm font-semibold mb-3 text-slate-200">Profile</h2>
      <div className="space-y-1 text-sm text-slate-300">
        <p>
          <span className="text-slate-500">Email:</span> {operator.email || "—"}
        </p>
        <p>
          <span className="text-slate-500">Phone:</span> {operator.phone || "—"}
        </p>
        <p>
          <span className="text-slate-500">City:</span> {operator.city || "—"}
        </p>
        <p>
          <span className="text-slate-500">Status:</span> {operator.status}
        </p>
        <p>
          <span className="text-slate-500">Joined:</span>{" "}
          {operator.joinedAt
            ? new Date(operator.joinedAt).toLocaleDateString()
            : "—"}
        </p>
      </div>
    </div>
  );
}

function JobStatsCard({ operator, jobs, computed }) {
  const completed =
    operator.completedJobs ??
    jobs.filter((j) => j.status === "completed").length;

  const cancelled =
    operator.cancelledJobs ??
    jobs.filter((j) => j.status === "cancelled").length;

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5">
      <h2 className="text-sm font-semibold mb-3 text-slate-200">Job Stats</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <StatBlock
          label="Total Jobs"
          value={operator.totalJobs ?? jobs.length}
        />
        <StatBlock label="Completed" value={completed} />
        <StatBlock label="Cancelled" value={cancelled} />
        <StatBlock label="Completion Rate" value={`${computed.completionRate}%`} />
      </div>
    </div>
  );
}

function EarningsCard({ operator, computed }) {
  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5">
      <h2 className="text-sm font-semibold mb-3 text-slate-200">Earnings</h2>
      <div className="space-y-2 text-sm">
        <p>
          <span className="text-slate-500">Lifetime:</span>{" "}
          ${(operator.lifetimeEarnings ?? 0).toFixed(2)}
        </p>
        <p>
          <span className="text-slate-500">Last 30 Days:</span>{" "}
          ${(operator.last30DaysEarnings ?? 0).toFixed(2)}
        </p>
        <p>
          <span className="text-slate-500">Avg Job Value:</span> $
          {computed.avgJobValue.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function JobsTable({ jobs }: { jobs: JobSummary[] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Recent Jobs</h2>
      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/40">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-800/70 text-slate-300">
            <tr>
              <th className="px-3 py-2 text-left">Customer</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Price</th>
              <th className="px-3 py-2 text-left">Created</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-slate-500 py-4">
                  No recent jobs for this operator.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-3 py-2">{job.customerName || "—"}</td>
                  <td className="px-3 py-2">{job.address || "—"}</td>
                  <td className="px-3 py-2">
                    {job.status?.replace("_", " ") || "—"}
                  </td>
                  <td className="px-3 py-2">
                    ${(job.price ?? 0).toFixed(2)}
                  </td>
                  <td className="px-3 py-2">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/jobs/${job._id}`}
                      className="text-sky-400 underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatBlock({ label, value }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
      <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </div>
      <div className="text-base font-semibold text-slate-100">{value}</div>
    </div>
  );
}

