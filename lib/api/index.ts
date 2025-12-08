// ~/Desktop/blyz-web/lib/api/index.ts
import axios from "axios";

// ============================================================================
// ⚡ Axios API Instance — Blyz Frontend
// ============================================================================
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

// ============================================================================
// 🔐 Attach Admin Token Automatically
// ============================================================================
// - Uses MOCK_ADMIN_TOKEN in development
// - Uses NEXT_PUBLIC_ADMIN_TOKEN in production
// - Automatically sets Authorization header for all requests
// ============================================================================
api.interceptors.request.use((config) => {
  const token =
    process.env.NEXT_PUBLIC_MOCK_ADMIN_TOKEN || // DEV token
    process.env.NEXT_PUBLIC_ADMIN_TOKEN ||      // PROD token
    null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
