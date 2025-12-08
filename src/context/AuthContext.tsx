"use client";

// ============================================================================
// ⭐ Blyz Admin AuthContext — FINAL 2025 R3 BUILD
// - Fixes ALL 401s
// - Auto-loads token + admin profile
// - Globally attaches Authorization header
// - DEV mock token works instantly
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.EXPO_PUBLIC_API_URL ||
    "http://localhost:4000";

  // =============================================================================
  // 🔐 GLOBAL AXIOS CONFIG — ALWAYS ATTACH TOKEN
  // =============================================================================
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // =============================================================================
  // 🟨 LOAD TOKEN ON BOOT + SELF-VERIFY
  // =============================================================================
  useEffect(() => {
    const saved = localStorage.getItem("blyz_admin_token");

    if (saved) {
      setToken(saved);
      axios.defaults.headers.common["Authorization"] = `Bearer ${saved}`;
      refreshAdmin().finally(() => setLoading(false));
    } else {
      // DEV AUTO-INJECT MODE
      if (process.env.NODE_ENV === "development") {
        const mockToken =
          process.env.NEXT_PUBLIC_MOCK_ADMIN_TOKEN || "dev-admin-token";

        localStorage.setItem("blyz_admin_token", mockToken);
        setToken(mockToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mockToken}`;

        // Set mock admin instantly
        setUser({
          email: "dev@blyzapp.com",
          role: "admin",
          name: "DEV Admin",
        });

        console.log("⚠️ DEV MODE: Injected mock admin token.");
      }

      setLoading(false);
    }
  }, []);

  // =============================================================================
  // 🔄 REFRESH ADMIN PROFILE (used on boot + dashboard refresh)
  // =============================================================================
  const refreshAdmin = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/api/admin/auth/me`);
      if (res.data.ok) {
        setUser(res.data.admin);
      } else {
        console.warn("Invalid admin token — clearing.");
        logout();
      }
    } catch (err) {
      console.warn("Admin verification failed:", err);
      logout();
    }
  };

  // =============================================================================
  // 🔐 LOGIN
  // =============================================================================
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/auth/login`, {
        email,
        password,
      });

      if (res.data.ok) {
        const t = res.data.token;
        localStorage.setItem("blyz_admin_token", t);
        setToken(t);
        setUser(res.data.admin);

        axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      throw err;
    }
  };

  // =============================================================================
  // 🚪 LOGOUT
  // =============================================================================
  const logout = () => {
    localStorage.removeItem("blyz_admin_token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        refreshAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =============================================================================
// 🪝 useAuth Hook
// =============================================================================
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

