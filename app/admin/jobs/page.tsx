"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import { getAdminToken } from "@/lib/adminAuth";

interface Job {
  _id: string;
  customerName?: string;
  operatorName?: string;
  address?: string;
  status?: string;
  price?: number;
  createdAt?: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
      return { ok: false, message: "Server error loading jobs" };
    }
  }

  useEffect(() => {
    async function load() {
      if (!BASE_URL) {
        setError("Missing API URL");
        setLoading(false);
        return;
      }

      setLoading(true);

      // ⭐ FIXED — correct backend API route
      const data = await authGet(`${BASE_URL}/api/admin/jobs`);

      if (!data.ok) {
        setError(data.message || "Failed to fetch jobs");
        setLoading(false);
        return;
      }

      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      setLoading(false);
    }

    load();
  }, [BASE_URL]);

  const filteredJobs = useMemo(() => {
    let list = [...jobs];
    const s = search.toLowerCase();

    if (search.trim() !== "") {
      list = list.filter((job) => {
        return (
          job.customerName?.toLowerCase().includes(s) ||
          job.operatorName?.toLowerCase().includes(s) ||
          job.address?.toLowerCase().includes(s) ||
          job._id?.toLowerCase().includes(s)
        );
      });
    }

    if (statusFilter !== "all") {
      list = list.filter((job) => job.status === statusFilter);
    }

    if (dateFilter !== "all") {
      const now = new Date();

      list = list.filter((job) => {
        const created = new Date(job.createdAt || 0);
        const diff =
          (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

        if (dateFilter === "today") return diff < 1;
        if (dateFilter === "7") return diff <= 7;
        if (dateFilter === "30") return diff <= 30;
        return true;
      });
    }

    return list;
  }, [jobs, search, statusFilter, dateFilter]);

  const statusColors: Record<string, string> = {
    pending: "bg-slate-700/40 text-slate-300 border-slate-600/40",
    accepted: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
    in_progress: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    completed: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    cancelled: "bg-red-500/20 text-red-300 border-red-400/40",
    unknown: "bg-slate-600/40 text-slate-300 border-slate-500/40",
  };

  return (
    <main className="min-h-screen text-slate-100">
      <h1 className="text-2xl font-semibold mb-6">Jobs</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search jobs…"
          className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-sm"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/40 shadow-xl">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-800/70 text-slate-300">
            <tr>
              <th className="px-3 py-2 text-left">Customer</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Operator</th>
              <th className="px-3 py-2 text-left">Price</th>
              <th className="px-3 py-2 text-left">Created</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.map((job) => {
              const safeStatus = job.status || "unknown";

              return (
                <tr
                  key={job._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-3 py-2">{job.customerName || "-"}</td>
                  <td className="px-3 py-2">{job.address || "-"}</td>

                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] border ${
                        statusColors[safeStatus] || statusColors["unknown"]
                      }`}
                    >
                      {safeStatus.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-3 py-2">{job.operatorName || "-"}</td>

                  <td className="px-3 py-2">${(job.price ?? 0).toFixed(2)}</td>

                  <td className="px-3 py-2">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "-"}
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
              );
            })}

            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-slate-500 py-4">
                  No jobs match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
