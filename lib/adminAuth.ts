// ============================================================================
// 🔐 Blyz Admin Token Manager — FINAL 2025 (EMPTY-TOKEN SAFE BUILD)
// - Uses stored JWT normally
// - In DEV MODE: falls back to "dev-admin-token"
// - Prevents empty Authorization headers (fixes jwt malformed)
// ============================================================================

const ADMIN_TOKEN_KEY = "blyz_admin_token";

/**
 * Get the admin token safely.
 *
 * NEVER returns an empty string.
 * ALWAYS returns:
 *   - Stored JWT (prod)
 *   - dev-admin-token (dev mode)
 *   - null (SSR only)
 */
export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;

  const devMode = process.env.NEXT_PUBLIC_DEV_ADMIN === "true";

  let token = localStorage.getItem(ADMIN_TOKEN_KEY);

  // Normalize empty strings → null
  if (token === "" || token === " " || token === "undefined") {
    token = null;
  }

  // DEV MODE: automatic mock token
  if (!token && devMode) {
    token = "dev-admin-token";
    console.log("⚠️ DEV MODE: Using mock admin token");
  }

  // Safety: never allow empty token to be returned
  if (!token) return null;

  console.log("🔑 Admin token retrieved:", token);
  return token;
}

/**
 * Save the admin token in localStorage (real JWT only).
 */
export function setAdminToken(token: string) {
  if (typeof window === "undefined") return;

  if (token && token.trim() !== "") {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    console.log("✅ Admin token saved:", token);
  } else {
    console.warn("⚠️ Attempted to save empty admin token — ignored");
  }
}

/**
 * Remove the admin token from localStorage.
 */
export function clearAdminToken() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ADMIN_TOKEN_KEY);
  console.log("❌ Admin token cleared");
}


