"use client";

// ============================================================================
// 📝 Admin Waitlist Page — FINAL 2025 R5 BUILD
// - Uses AdminAuthContext with real JWT auth
// - Prevents flicker while loading
// - Redirects cleanly to /admin/login if not authenticated
// ============================================================================

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AdminAuthContext";
import AdminWaitlist from "@/src/components/admin/AdminWaitlist";

export default function AdminWaitlistPage() {
  const router = useRouter();
  const { token, loading } = useAuth();

  // Redirect unauthorized users AFTER loading finishes
  useEffect(() => {
    if (!loading && !token) {
      router.replace("/admin/login");
    }
  }, [loading, token, router]);

  // While checking session, avoid flicker
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300">
        Loading admin session…
      </div>
    );
  }

  // If not authenticated, return null during redirect
  if (!token) return null;

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <h1 className="text-2xl font-bold mb-6">Admin Waitlist Management</h1>
      <AdminWaitlist />
    </div>
  );
}

