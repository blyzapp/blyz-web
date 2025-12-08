// ~/Desktop/blyz-web/app/admin/operators/[id]/edit/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function EditOperatorPage() {
  const params = useParams();
  const router = useRouter();

  const operatorId = typeof params?.id === "string" ? params.id : "";

  const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Operator fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<"online" | "offline" | "busy">("offline");

  // ============================================
  // Load operator
  // ============================================
  useEffect(() => {
    if (!operatorId || !BASE_URL || !ADMIN_TOKEN) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    const loadOperator = async () => {
      try {
        const res = await api.get(`${BASE_URL}/admin/operators/${operatorId}`, {
          headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
        });

        if (!res.data?.ok) {
          setError(res.data?.message || "Failed to load operator");
          return;
        }

        const op = res.data.operator;

        setName(op.name || "");
        setEmail(op.email || "");
        setPhone(op.phone || "");
        setCity(op.city || "");
        setStatus((op.status as any) || "offline");

        setError(null);
      } catch (err) {
        console.error("❌ Load error:", err);
        setError("Server error loading operator");
      } finally {
        setLoading(false);
      }
    };

    loadOperator();
  }, [operatorId, BASE_URL, ADMIN_TOKEN]);

  // ============================================
  // Save operator changes
  // ============================================
  const saveChanges = async () => {
    setSaving(true);
    setError(null);

    try {
      const res = await api.put(
        `${BASE_URL}/admin/operators/${operatorId}`,
        { name, email, phone, city, status },
        {
          headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
        }
      );

      if (!res.data?.ok) {
        setError(res.data?.message || "Failed to save");
        setSaving(false);
        return;
      }

      router.push(`/admin/operators/${operatorId}`);
    } catch (err) {
      console.error("❌ Save error:", err);
      setError("Server error saving operator");
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // UI
  // ============================================
  if (loading) {
    return <div className="text-slate-300 text-sm p-4">Loading operator…</div>;
  }

  return (
    <main className="space-y-8 max-w-2xl">
      <Link
        href={`/admin/operators/${operatorId}`}
        className="text-sky-400 underline"
      >
        ← Back to Operator
      </Link>

      <h1 className="text-2xl font-semibold">Edit Operator</h1>

      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 p-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-6 space-y-6">
        {/* NAME */}
        <Field label="Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Operator name"
          />
        </Field>

        {/* EMAIL */}
        <Field label="Email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Email address"
          />
        </Field>

        {/* PHONE */}
        <Field label="Phone">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            placeholder="Phone number"
          />
        </Field>

        {/* CITY */}
        <Field label="City">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
            placeholder="City"
          />
        </Field>

        {/* STATUS */}
        <Field label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="input"
          >
            <option value="online">Online</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </Field>

        {/* SAVE BUTTON */}
        <button
          disabled={saving}
          onClick={saveChanges}
          className={`w-full py-3 rounded text-center font-semibold transition ${
            saving
              ? "bg-slate-600 text-slate-300"
              : "bg-sky-600 hover:bg-sky-700 text-white"
          }`}
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </main>
  );
}

// ============================================
// REUSABLE FIELD COMPONENT
// ============================================
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">
        {label}
      </div>
      {children}
    </div>
  );
}
