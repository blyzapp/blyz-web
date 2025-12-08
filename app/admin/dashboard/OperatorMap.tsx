// ~/Desktop/blyz-web/app/admin/dashboard/OperatorMap.tsx
"use client";

import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// -------------------------------
// Operator location type
// -------------------------------
export type OperatorLocation = {
  id: string;
  name: string;
  status: "online" | "busy" | "offline";
  jobsCompleted: number;
  rating: number;
  lat: number;
  lng: number;
};

// -------------------------------
// Mock data for development
// -------------------------------
const MOCK_OPERATOR_LOCATIONS: OperatorLocation[] = [
  {
    id: "OP-1",
    name: "Alex Martin",
    status: "online",
    jobsCompleted: 142,
    rating: 4.9,
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    id: "OP-2",
    name: "Snow King Inc.",
    status: "busy",
    jobsCompleted: 89,
    rating: 4.7,
    lat: 43.645,
    lng: -79.395,
  },
  {
    id: "OP-3",
    name: "Pat’s Plows",
    status: "offline",
    jobsCompleted: 34,
    rating: 4.5,
    lat: 43.66,
    lng: -79.4,
  },
];

// -------------------------------
// Component props
// -------------------------------
interface OperatorMapProps {
  operators?: OperatorLocation[]; // Optional prop for live data
}

export default function OperatorMap({ operators = MOCK_OPERATOR_LOCATIONS }: OperatorMapProps) {
  const center: [number, number] = [43.6532, -79.3832]; // Default center (Toronto)

  return (
    <div className="h-48 overflow-hidden rounded-lg border border-slate-700/40">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {operators.map((op) => {
          const color =
            op.status === "online"
              ? "#22c55e"
              : op.status === "busy"
              ? "#eab308"
              : "#64748b"; // Offline

          return (
            <CircleMarker
              key={op.id}
              center={[op.lat, op.lng]}
              radius={10}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.8 }}
            >
              <Popup>
                <div className="text-xs">
                  <div className="font-semibold">{op.name}</div>
                  <div>Status: {op.status}</div>
                  <div>Jobs: {op.jobsCompleted}</div>
                  <div>Rating: {op.rating.toFixed(1)}</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
