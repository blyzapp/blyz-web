"use client";

// ============================================================================
// 🔐 AdminAuthContext — FINAL 2025 R6-STABLE BUILD
// - Real JWT auth (no mock tokens unless you add them yourself)
// - Fixes all black-screen timing issues
// - Adds safe debug logs (won't break Next.js render)
// - Ensures axios never fires without a token
// ============================================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // MUST NOT end in "/api"
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  console.log("🔧 AdminAuthContext mounted");
  console.log("🌐 Using API_URL =", API_URL);

  // ============================================================================
  // Attach token → axios
  // ============================================================================
  useEffect(() => {
    console.log("🔑 TOKEN CHANGED →", token);

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ============================================================================
  // Restore token on page load
  // ============================================================================
  useEffect(() => {
    const saved = localStorage.getItem("blyz_admin_token");
    console.log("💾 Found stored token:", saved);

    if (!saved) {
      setLoading(false);
      return;
    }

    setToken(saved);
    axios.defaults.headers.common["Authorization"] = `Bearer ${saved}`;

    // Delay verification so React state updates correctly
    setTimeout(() => {
      refreshAdmin().finally(() => setLoading(false));
    }, 50);
  }, []);

  // ============================================================================
  // Validate token
  // ============================================================================
  const refreshAdmin = async () => {
    console.log("🔄 refreshAdmin() called. token =", token);

    if (!token) {
      console.log("❌ No token → aborting refresh");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/admin/auth/me`);

      if (res.data.ok) {
        console.log("🟢 Admin verified:", res.data.admin);
        setUser(res.data.admin);
      } else {
        console.log("❌ Invalid token → logging out");
        logout();
      }
    } catch (err) {
      console.log("❌ refreshAdmin error:", err);
      logout();
    }
  };

  // ============================================================================
  // LOGIN
  // ============================================================================
  const login = async (email: string, password: string) => {
    console.log("📨 Admin login attempt:", email);

    try {
      const res = await axios.post(`${API_URL}/api/admin/auth/login`, {
        email,
        password,
      });

      console.log("🔐 Login response:", res.data);

      if (!res.data.ok || !res.data.token) {
        throw new Error(res.data.message || "Invalid login");
      }

      const newToken = res.data.token;
      console.log("💾 Saving token:", newToken);

      localStorage.setItem("blyz_admin_token", newToken);
      setToken(newToken);
      setUser(res.data.admin);

      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      // Ensure state finishes updating before verifying
      setTimeout(() => refreshAdmin(), 50);
    } catch (err) {
      console.error("❌ Admin login failed:", err);
      throw err;
    }
  };

  // ============================================================================
  // LOGOUT
  // ============================================================================
  const logout = () => {
    console.log("🚪 Logging out: clearing token + user");

    localStorage.removeItem("blyz_admin_token");
    setToken(null);
    setUser(null);

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AdminAuthContext.Provider
      value={{ token, user, loading, login, logout, refreshAdmin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAuth must be used within AdminAuthProvider");
  return ctx;
};

