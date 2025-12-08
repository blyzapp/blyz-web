"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Image from "next/image";
import MapPlaceholder from "@/app/admin/components/MapPlaceholder";

type JobStatus = "pending" | "accepted" | "in_progress" | "completed" | "cancelled";

interface JobDetail {
  _id: string;
  status: JobStatus;
  createdAt: string;
  scheduledAt?: string;
  completedAt?: string;
  price: number;
  address: string;
  unit?: string;
  city: string;
  customer: { name: string; email: string; phone?: string };
  operator?: { _id?: string; name: string; email: string; phone?: string; rating?: number };
  snowType: "driveway" | "driveway_walkway" | "commercial" | "custom";
  vehicleAccess: "yes" | "limited" | "no";
  notes?: string;
  timeline: { label: string; at: string; type: string }[];
  beforePhotos: string[];
  afterPhotos: string[];
}

export default function AdminJobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch job from backend
  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await api.get(`/admin/jobs/${id}`);
        if (!res.data.ok) return setError(res.data.message || "Failed to load job");
        setJob(res.data.job);
      } catch (err) {
        console.error(err);
        setError("Server error loading job");
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  if (loading) return <div className="p-6 text-slate-300">Loading job...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;
  if (!job) return <div className="p-6 text-slate-400">Job not found</div>;

  // ---------- Handlers ----------
  const markCompleted = async () => {
    if (actionLoading || job.status === "completed") return;
    setActionLoading(true);
    try {
      const res = await api.post(`/admin/jobs/${job._id}/status`, { status: "completed" });
      if (res.data.ok) setJob(res.data.job);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  const assignOperator = async () => {
    if (actionLoading) return;
    const operatorId = prompt("Enter Operator ID to assign:");
    if (!operatorId) return;
    setActionLoading(true);
    try {
      const res = await api.post(`/admin/jobs/${job._id}/reassign`, { operatorId });
      if (res.data.ok) setJob(res.data.job);
    } catch (err) {
      console.error(err);
      alert("Failed to reassign operator");
    } finally {
      setActionLoading(false);
    }
  };

  // ---------- Status Label ----------
  const statusLabel = (status: JobStatus) => {
    const base = "px-2 py-1 rounded-full text-xs border";
    switch (status) {
      case "pending":
        return <span className={`${base} bg-yellow-500/15 text-yellow-300 border-yellow-400/50`}>Pending</span>;
      case "accepted":
        return <span className={`${base} bg-blue-500/15 text-blue-300 border-blue-400/50`}>Accepted</span>;
      case "in_progress":
        return <span className={`${base} bg-sky-500/15 text-sky-300 border-sky-400/50`}>In Progress</span>;
      case "completed":
        return <span className={`${base} bg-emerald-500/15 text-emerald-300 border-emerald-400/50`}>Completed</span>;
      case "cancelled":
        return <span className={`${base} bg-red-500/15 text-red-300 border-red-400/50`}>Cancelled</span>;
      default:
        return <span className={`${base} bg-slate-700/80 text-slate-100 border-slate-500/60`}>{status}</span>;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50 p-6">
      {/* Header */}
      <div className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold">{job.address}, {job.city}</h1>
            <div className="mt-1">{statusLabel(job.status)}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={markCompleted}
              disabled={actionLoading || job.status === "completed"}
              className="px-3 py-1.5 rounded-full text-[11px] border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10 transition disabled:opacity-50"
            >
              Mark as Completed
            </button>
            <button
              onClick={assignOperator}
              disabled={actionLoading}
              className="px-3 py-1.5 rounded-full text-[11px] border border-sky-500 text-sky-300 hover:bg-sky-500/10 transition disabled:opacity-50"
            >
              Assign Operator
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6 grid gap-6 lg:grid-cols-3">
        {/* LEFT Column */}
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-black/40 space-y-4">
            <p><span className="text-slate-400">Customer:</span> {job.customer.name}</p>
            <p><span className="text-slate-400">Phone:</span> {job.customer.phone || "N/A"}</p>
            <p><span className="text-slate-400">Notes:</span> {job.notes || "None"}</p>
            <p><span className="text-slate-400">Type:</span> {job.snowType}</p>
            <p><span className="text-slate-400">Vehicle Access:</span> {job.vehicleAccess}</p>

            {/* Timeline */}
            <div className="mt-4">
              <h2 className="text-xs font-semibold uppercase text-slate-300">Timeline</h2>
              <ul className="mt-1 text-[11px] space-y-1">
                {job.timeline.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{t.label} ({t.at})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photos */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {job.beforePhotos.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg border border-slate-800 overflow-hidden">
                  <Image src={src} alt="Before" fill className="object-cover" />
                  <div className="absolute bottom-1 left-1 text-[10px] bg-black/50 px-2 py-0.5 rounded">Before</div>
                </div>
              ))}
              {job.afterPhotos.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg border border-slate-800 overflow-hidden">
                  <Image src={src} alt="After" fill className="object-cover" />
                  <div className="absolute bottom-1 left-1 text-[10px] bg-black/50 px-2 py-0.5 rounded">After</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT Column */}
        <div className="space-y-4">
          {/* Customer */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-black/40 space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Customer</h2>
            <p className="text-sm font-medium text-slate-100">{job.customer.name}</p>
            <p className="text-[11px] text-slate-400">{job.customer.email} {job.customer.phone ? `· ${job.customer.phone}` : ""}</p>
          </section>

          {/* Operator */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-black/40 space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Operator</h2>
            {job.operator ? (
              <>
                <p className="text-sm font-medium text-slate-100">{job.operator.name}</p>
                <p className="text-[11px] text-slate-400">{job.operator.email}{job.operator.phone ? ` · ${job.operator.phone}` : ""}</p>
                {typeof job.operator.rating === "number" && <p className="text-[11px] text-slate-400 mt-1">⭐ {job.operator.rating.toFixed(1)}</p>}
              </>
            ) : (
              <>
                <p className="text-sm text-slate-300">No operator assigned.</p>
                <button
                  onClick={assignOperator}
                  disabled={actionLoading}
                  className="mt-2 px-3 py-1.5 rounded-full text-[11px] border border-sky-500 text-sky-300 hover:bg-sky-500/10 transition disabled:opacity-50"
                >
                  Assign operator
                </button>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
