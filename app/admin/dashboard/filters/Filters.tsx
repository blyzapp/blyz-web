"use client";

import React from "react";

interface FiltersProps {
  timeRange?: "week" | "month" | "year";
  statusFilter?: "all" | "pending" | "in_progress" | "completed" | "cancelled";
  operatorFilter?: string;
  onTimeRangeChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onOperatorChange?: (value: string) => void;
  operatorsList?: string[];
}

export default function Filters({
  timeRange = "week",
  statusFilter = "all",
  operatorFilter = "all",
  onTimeRangeChange,
  onStatusChange,
  onOperatorChange,
  operatorsList = [],
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Time Range */}
      <select
        value={timeRange}
        onChange={(e) => onTimeRangeChange?.(e.target.value)}
        className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200"
      >
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>

      {/* Job Status */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange?.(e.target.value)}
        className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* Operator Filter */}
      <select
        value={operatorFilter}
        onChange={(e) => onOperatorChange?.(e.target.value)}
        className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200"
      >
        <option value="all">All Operators</option>
        {operatorsList.map((op, idx) => (
          <option key={idx} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
