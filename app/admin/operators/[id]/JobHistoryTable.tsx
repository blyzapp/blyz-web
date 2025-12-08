"use client";

import React from "react";

interface Job {
  id: string;
  customerName: string;
  operatorName: string;
  status: string;
  price: number;
  createdAt: string;
  scheduledAt: string;
  address: string;
}

interface Props {
  jobs: Job[];
}

export default function JobHistoryTable({ jobs }: Props) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow">
      <h2 className="text-xs font-semibold uppercase text-slate-300 mb-2">
        Job History
      </h2>

      <p className="text-[11px] text-slate-500 mb-3">
        Latest jobs completed or assigned to this operator.
      </p>

      {jobs.length === 0 ? (
        <div className="text-[11px] text-slate-500">
          No job history yet for this operator.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border-separate border-spacing-0">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <Th>Job ID</Th>
                <Th>Customer</Th>
                <Th>Status</Th>
                <Th>Price</Th>
                <Th>Created</Th>
                <Th>Scheduled</Th>
                <Th>Address</Th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-slate-800 hover:bg-slate-900 transition"
                >
                  <Td>{job.id}</Td>
                  <Td>{job.customerName}</Td>

                  <Td>
                    <StatusPill status={job.status} />
                  </Td>

                  <Td>${job.price.toFixed(2)}</Td>
                  <Td>{new Date(job.createdAt).toLocaleDateString()}</Td>
                  <Td>{new Date(job.scheduledAt).toLocaleDateString()}</Td>

                  <Td className="max-w-xs truncate">{job.address}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// -------------------- Helpers --------------------

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-left text-[11px] border-b border-slate-800">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-3 py-2 text-xs text-slate-200 border-b border-slate-800">
      {children}
    </td>
  );
}

function StatusPill({ status }: { status: string }) {
  let label = status;
  let className =
    "px-2 py-0.5 rounded-full text-[10px] border bg-slate-800/70 text-slate-300 border-slate-600/70";

  switch (status) {
    case "completed":
      className =
        "px-2 py-0.5 rounded-full text-[10px] border bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
      label = "Completed";
      break;

    case "in_progress":
      className =
        "px-2 py-0.5 rounded-full text-[10px] border bg-sky-500/10 text-sky-300 border-sky-500/40";
      label = "In Progress";
      break;

    case "pending":
    case "accepted":
      className =
        "px-2 py-0.5 rounded-full text-[10px] border bg-yellow-500/10 text-yellow-300 border-yellow-500/40";
      label = status === "pending" ? "Pending" : "Accepted";
      break;

    case "cancelled":
      className =
        "px-2 py-0.5 rounded-full text-[10px] border bg-rose-500/10 text-rose-300 border-rose-500/40";
      label = "Cancelled";
      break;
  }

  return <span className={className}>{label}</span>;
}

