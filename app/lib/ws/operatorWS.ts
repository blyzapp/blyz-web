// ~/Desktop/blyz-web/app/lib/ws/operatorWS.ts
import { Server } from "socket.io";
import http from "http";

// ----------------------------
// Types
// ----------------------------
export type OperatorUpdate = {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  status?: "online" | "busy" | "offline";
  heading?: number;
  trail?: { lat: number; lng: number }[];
};

// ----------------------------
// Initialize WebSocket server
// ----------------------------
export function initOperatorWS(server: http.Server) {
  const io = new Server(server, {
    path: "/ws/operators",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
    },
  });

  // Track operator connections
  const operators: Record<string, OperatorUpdate> = {};

  io.on("connection", (socket) => {
    console.log("🟢 WS Client connected:", socket.id);

    // Operator sends live location
    socket.on("operator:update", (data: OperatorUpdate) => {
      if (!data.id) return;

      // Update operator state
      operators[data.id] = {
        ...operators[data.id],
        ...data,
        trail: [
          ...(operators[data.id]?.trail || []),
          { lat: data.lat ?? 0, lng: data.lng ?? 0 },
        ].slice(-50), // Keep last 50 points
      };

      // Broadcast to all admin clients
      io.emit("operator:update", operators[data.id]);
    });

    // Request all current operator positions
    socket.on("operator:getAll", () => {
      socket.emit("operator:all", Object.values(operators));
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("🔴 WS Client disconnected:", socket.id);
    });
  });

  console.log("🛰️ Operator WebSocket server initialized on /ws/operators");
}
