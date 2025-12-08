// ~/Desktop/blyz-web/lib/api/admin/payouts.ts
import api from "@/lib/api";

// ============================================================================
// 🌨️ BLYZ ADMIN — PAYOUTS API CLIENT
// FINAL 2025 BUILD — FULLY TYPED + UI-SAFE FALLBACKS
// ============================================================================

// -------------------------------------------------------
// GET ALL WEEKS — /admin/payouts
// -------------------------------------------------------
export async function getWeeklyPayouts() {
  try {
    const res = await api.get("/admin/payouts");

    return res.data || {
      ok: false,
      weeks: [],
    };
  } catch (err) {
    console.error("❌ Error fetching payout weeks:", err);
    return { ok: false, weeks: [] };
  }
}

// -------------------------------------------------------
// GET SPECIFIC WEEK — /admin/payouts/:weekKey
// -------------------------------------------------------
export async function getPayoutWeek(weekKey: string) {
  try {
    const res = await api.get(`/admin/payouts/${weekKey}`);

    return res.data || {
      ok: false,
      week: null,
      operators: [],
    };
  } catch (err) {
    console.error(`❌ Error fetching payout week ${weekKey}:`, err);

    return {
      ok: false,
      message: "Failed to fetch payout week",
      week: null,
      operators: [],
    };
  }
}

// -------------------------------------------------------
// UPDATE WEEK — /admin/payouts/:weekKey/update
// -------------------------------------------------------
export async function updatePayoutWeek(weekKey: string) {
  try {
    const res = await api.post(`/admin/payouts/${weekKey}/update`);

    return res.data || {
      ok: false,
      updated: false,
    };
  } catch (err) {
    console.error(`❌ Error updating payout week ${weekKey}:`, err);

    return {
      ok: false,
      updated: false,
      message: "Failed to update payout week",
    };
  }
}
