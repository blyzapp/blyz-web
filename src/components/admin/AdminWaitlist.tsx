"use client";

// ============================================================================
// 📝 Admin Waitlist Component — FINAL 2025 R5 BUILD
// - FIXED: correct backend URL → /api/admin/waitlist
// - Uses Axios with auto-injected Authorization header
// - Stable error handling
// - Fully compatible with AdminAuthContext
// ============================================================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/src/context/AdminAuthContext";

interface WaitlistEntry {
  _id: string;
  name: string;
  email: string;
  joinedAt: string;
}

export default function AdminWaitlist() {
  const { token } = useAuth();

  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // ⭐ FIX: Correct backend API route
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/waitlist`;

  // ============================================================================
  // 📌 LOAD WAITLIST
  // ============================================================================
  const fetchWaitlist = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.ok) {
        setEntries(res.data.data || []);
      } else {
        setError(res.data.message || "Failed to load waitlist.");
      }
    } catch (err: any) {
      console.error("❌ Waitlist fetch error:", err);
      setError(err?.response?.data?.message || "Failed to fetch waitlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchWaitlist();
  }, [token]);

  // ============================================================================
  // ➕ ADD ENTRY
  // ============================================================================
  const addEntry = async () => {
    if (!newName || !newEmail) {
      alert("Name and Email are required");
      return;
    }

    try {
      setAdding(true);

      const res = await axios.post(
        API,
        {
          name: newName,
          email: newEmail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.ok) {
        setNewName("");
        setNewEmail("");
        fetchWaitlist();
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      console.error("❌ Add entry error:", err);
      alert(err?.response?.data?.message || "Failed to add entry.");
    } finally {
      setAdding(false);
    }
  };

  // ============================================================================
  // ❌ DELETE ENTRY
  // ============================================================================
  const deleteEntry = async (id: string) => {
    if (!confirm("Delete this entry?")) return;

    try {
      const res = await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.ok) {
        setEntries((prev) => prev.filter((e) => e._id !== id));
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      console.error("❌ Delete entry error:", err);
      alert(err?.response?.data?.message || "Failed to delete entry.");
    }
  };

  // ============================================================================
  // 🖼️ RENDER
  // ============================================================================
  if (loading) return <p className="text-gray-500">Loading waitlist...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-6">Waitlist</h2>

      {/* Add Entry Form */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />

        <button
          onClick={addEntry}
          disabled={adding}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300 rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Joined</th>
            <th className="px-4 py-2 border w-32 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{entry.name}</td>
              <td className="px-4 py-2 border">{entry.email}</td>
              <td className="px-4 py-2 border">
                {new Date(entry.joinedAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 border text-center">
                <button
                  onClick={() => deleteEntry(entry._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {entries.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                No waitlist entries yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


