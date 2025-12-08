// ============================================================================
// 📝 Waitlist Debug Script — Live Render Backend
// ============================================================================
const API_URL = "https://blyz-api.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlist-form");
  const emailInput = document.getElementById("waitlist-email");
  const phoneInput = document.getElementById("waitlist-phone");
  const submitBtn = document.getElementById("waitlist-submit");
  const statusMsg = document.getElementById("waitlist-status");

  if (!form || !emailInput || !submitBtn || !statusMsg) {
    console.warn("Waitlist form elements not found. Script not attached.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const phone = phoneInput ? phoneInput.value.trim() : "";

    if (!email || !email.includes("@")) {
      statusMsg.textContent = "Please enter a valid email.";
      statusMsg.style.color = "red";
      console.warn("Blocked submission: invalid email");
      return;
    }

    submitBtn.disabled = true;
    statusMsg.textContent = "Joining…";
    statusMsg.style.color = "#000";

    console.log("[DEBUG] Submitting waitlist email:", email);

    try {
      const res = await fetch(`${API_URL}/waitlist/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });

      console.log("[DEBUG] Response status:", res.status);

      const data = await res.json();
      console.log("[DEBUG] Response JSON:", data);

      if (data.ok) {
        statusMsg.textContent = "✅ You're officially on the waitlist!";
        statusMsg.style.color = "green";
        emailInput.value = "";
        if (phoneInput) phoneInput.value = "";
        console.log("[DEBUG] Waitlist signup success");
      } else {
        statusMsg.textContent = "⚠ " + (data.msg || "Failed to join waitlist");
        statusMsg.style.color = "red";
        console.error("[DEBUG] Waitlist API error:", data);
      }
    } catch (err) {
      console.error("[DEBUG] Fetch error:", err);
      statusMsg.textContent = "⚠ Server unavailable. Please try again later.";
      statusMsg.style.color = "red";
    } finally {
      submitBtn.disabled = false;
      console.log("[DEBUG] Button re-enabled");
    }
  });
});
