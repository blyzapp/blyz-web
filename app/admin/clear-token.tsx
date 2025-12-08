"use client";

import { useEffect } from "react";

export default function ClearToken() {
  useEffect(() => {
    console.log("Clearing blyz_admin_token…");
    localStorage.removeItem("blyz_admin_token");
  }, []);

  return (
    <div style={{ padding: 40, fontSize: 20 }}>
      Token cleared. You can close this page.
    </div>
  );
}
