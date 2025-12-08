"use client";

// ============================================================================
// 🔐 Admin Login Page — FINAL 2025 BUILD
// ============================================================================
// - Works with AdminAuthContext
// - Stores VALID admin token automatically (no DevTools needed)
// - Redirects to /admin/dashboard
// - Lets real login flow continue normally
// ============================================================================

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AdminAuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@blyzapp.com");
  const [password, setPassword] = useState("blyzadmin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================================================
  // ⭐ AUTO-SET ADMIN TOKEN (NO DEVTOOLS REQUIRED)
  // ==========================================================================
  useEffect(() => {
    const FIXED_ADMIN_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRhMzgyZmE5YzEyZjIxOWQ0NGY1OSIsImVtYWlsIjoiYWRtaW5AYmx5emFwcC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3NjUxMzQ4MDksImV4cCI6MTc2NTczOTYwOX0.ebf04TQcMj66kLRN6Of9i0fd7P3fpTWAfseDKkwSvXI";

    // Only set token if missing
    const existing = localStorage.getItem("blyz_admin_token");

    if (!existing) {
      console.log("🟦 Admin token injected automatically");
      localStorage.setItem("blyz_admin_token", FIXED_ADMIN_TOKEN);
    }
  }, []);

  // ==========================================================================
  // LOGIN HANDLER
  // ==========================================================================
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================================
  // UI
  // ==========================================================================
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl shadow-xl border border-slate-800">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          BLYZ ADMIN
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded bg-red-600 text-white text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 rounded text-white font-semibold transition"
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

