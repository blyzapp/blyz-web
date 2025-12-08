"use client";

// ============================================================================
// 🧩 Admin Layout — GUARANTEED WORKING VERSION (Next.js App Router)
// ============================================================================
// - Correct default export for Next.js layouts
// - Auth provider wraps layout correctly
// - Login page renders WITHOUT sidebar
// - No black screen / no hydration mismatch
// ============================================================================

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthProvider, useAuth } from "@/src/context/AdminAuthContext";

import {
  Grid,
  Briefcase,
  Users,
  DollarSign,
  Settings,
  LogOut,
  List,
  BarChart2,
} from "react-feather";

// ============================================================================
// NEXT.JS LAYOUT WRAPPER — required default export
// ============================================================================

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}

// ============================================================================
// INTERNAL ADMIN SHELL (actual UI rendering)
// ============================================================================

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { loading, token, logout } = useAuth();

  const isLogin = pathname === "/admin/login";

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !token && !isLogin) {
      router.replace("/admin/login");
    }
  }, [loading, token, isLogin, router]);

  // STILL LOADING AUTH → show temporary screen
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Checking admin session…
      </div>
    );
  }

  // NO TOKEN & not on login → allow redirect to happen silently
  if (!token && !isLogin) return null;

  // LOGIN PAGE → RENDER PAGE WITHOUT SIDEBAR
  if (isLogin) return <>{children}</>;

  // ========================================================================
  // SIDEBAR NAVIGATION LIST
  // ========================================================================
  const nav = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <Grid size={18} /> },
    { label: "Jobs", href: "/admin/jobs", icon: <Briefcase size={18} /> },
    { label: "Operators", href: "/admin/operators", icon: <Users size={18} /> },
    { label: "Payouts", href: "/admin/payouts", icon: <DollarSign size={18} /> },
    { label: "Waitlist", href: "/admin/waitlist", icon: <List size={18} /> },
    { label: "Analytics", href: "/admin/analytics", icon: <BarChart2 size={18} /> },
    { label: "Settings", href: "/admin/settings", icon: <Settings size={18} /> },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  // ========================================================================
  // RENDER ADMIN PANEL
  // ========================================================================
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-5 flex flex-col">
        <div className="text-2xl font-bold text-sky-400 mb-8">BLYZ ADMIN</div>

        <nav className="flex-1 space-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-[15px]
                ${
                  isActive(item.href)
                    ? "bg-sky-600/20 text-sky-300 border border-sky-500/30"
                    : "text-slate-300 hover:bg-slate-800/30"
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-6 flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>

        <footer className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} Blyz
        </footer>
      </aside>

      {/* MAIN PANEL */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="font-semibold text-lg text-slate-200">Admin Panel</div>
          <div className="px-3 py-1 text-sm rounded-full bg-sky-500/20 text-sky-300">
            Admin
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

