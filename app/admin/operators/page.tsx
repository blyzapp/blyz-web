"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getAdminToken } from "@/lib/adminAuth";

interface Operator {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  jobsCompleted: number;
  rating: number;
  createdAt: string;
}

export default function AdminOperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // AUTH wrapper
  async function authGet(url: string) {
    const token = getAdminToken();
    if (!token) return { ok: false, message: "Missing admin token" };

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      console.error("❌ Admin request failed:", err);
      return { ok: false, message: "Server error fetching admin data" };
    }
  }

  useEffect(() => {
    async function loadOperators() {
      setLoading(true);

      if (!BASE_URL) {
        setError("Missing API URL");
        setLoading(false);
        return;
      }

      // ⭐ CORRECT BACKEND ROUTE
      const data = await authGet(`${BASE_URL}/api/admin/operators`);

      if (!data.ok) {
        setError(data.message || "Failed to fetch operators");
        setLoading(false);
        return;
      }

      setOperators(data.operators ?? []);
      setLoading(false);
    }

    loadOperators();
  }, [BASE_URL]);

  const statusPill = (status: string) => {
    const base = "px-2 py-1 rounded-full text-[11px] border";
    switch (status) {
      case "online":
        return (
          <span
            className={`${base} bg-emerald-500/20 text-emerald-300 border-emerald-400/40`}
          >
            Online
          </span>
        );
      case "busy":
        return (
          <span
            className={`${base} bg-yellow-500/20 text-yellow-300 border-yellow-400/40`}
          >
            Busy
          </span>
        );
      default:
        return (
          <span
            className={`${base} bg-slate-700/30 text-slate-300 border-slate-500/40`}
          >
            Offline
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 p-6">
      <Link href="/admin" className="text-sky-400 underline mb-6 inline-block">
        ← Back to Admin Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-4">Operators</h1>

      {loading && <div className="text-slate-400">Loading operators...</div>}
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {!loading && !error && operators.length === 0 && (
        <div className="text-slate-400">No operators found.</div>
      )}

      {!loading && !error && operators.length > 0 && (
        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/40 shadow-xl">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-800/70 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Jobs Completed</th>
                <th className="px-3 py-2 text-left">Rating</th>
                <th className="px-3 py-2 text-left">Joined</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {operators.map((op) => (
                <tr
                  key={op._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-3 py-2">{op.name}</td>
                  <td className="px-3 py-2">{op.email}</td>
                  <td className="px-3 py-2">{op.phone || "-"}</td>
                  <td className="px-3 py-2">{statusPill(op.status)}</td>
                  <td className="px-3 py-2">{op.jobsCompleted ?? 0}</td>
                  <td className="px-3 py-2">
                    {op.rating ? op.rating.toFixed(1) : "0.0"}
                  </td>
                  <td className="px-3 py-2">
                    {new Date(op.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/operators/${op._id}`}
                      className="text-sky-400 underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
