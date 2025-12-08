"use client";

import { useEffect } from "react";

export default function ResetAllStorage() {
  useEffect(() => {
    console.log("🔥 Clearing ALL admin storage…");

    // Local + session storage
    localStorage.clear();
    sessionStorage.clear();

    // Clear all caches
    if (window.caches) {
      caches.keys().then((names) => {
        for (let name of names) caches.delete(name);
      });
    }

    // Force clear cookies
    document.cookie
      .split(";")
      .forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;");
      });

    alert("All admin tokens + caches cleared! Refresh now.");
  }, []);

  return (
    <div style={{ padding: 40, fontSize: 20 }}>
      Admin token reset complete. Refresh your browser.
    </div>
  );
}
