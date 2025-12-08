"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";

// ================================
// React Leaflet — SSR Safe Imports
// ================================
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((m) => m.CircleMarker),
  { ssr: false }
);

// Leaflet core CSS
import "leaflet/dist/leaflet.css";

// ================================
// FIX MISSING LEAFLET ICONS
// ================================
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [13, 41],
});

// ================================
// TYPES
// ================================
export interface Operator {
  name: string;
  lat: number;
  lng: number;
  status: "online" | "busy" | "offline";
  trail?: { lat: number; lng: number }[];
}

interface OperatorMapProps {
  operators?: Operator[];
}

// ================================
// CUSTOM STATUS ICONS
// ================================
const statusRing = (status: Operator["status"]) => {
  if (status === "online") return "0 0 10px rgba(56,189,248,0.9)";
  if (status === "busy") return "0 0 10px rgba(234,179,8,0.9)";
  return "0 0 10px rgba(239,68,68,0.9)"; // offline/red
};

const makePulseIcon = (status: Operator["status"]) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width:16px;
        height:16px;
        border-radius:9999px;
        background:${status === "offline" ? "red" : "rgba(56,189,248,1)"};
        box-shadow:${statusRing(status)};
        animation:blyz-pulse 1.5s infinite;
      "></div>
    `,
    iconSize: [16, 16],
  });

// ================================
// TRAIL STYLE
// ================================
const trailStyle = {
  color: "#38bdf8",
  weight: 3,
  opacity: 0.5,
};

export default function OperatorMap({ operators = [] }: OperatorMapProps) {
  const defaultCenter: [number, number] = [43.6532, -79.3832];

  // Fix map resizing in flex layouts
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }, []);

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
      <MapContainer
        center={
          operators.length
            ? [operators[0].lat, operators[0].lng]
            : defaultCenter
        }
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* TILE LAYER */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        />

        {/* OPERATORS */}
        {operators.map((op, idx) => {
          const icon = makePulseIcon(op.status);

          // Build breadcrumb points
          const trail = op.trail || [];
          const trailCoords = trail.map((p) => [p.lat, p.lng]);

          return (
            <React.Fragment key={idx}>
              {/* Line showing operator movement */}
              {trailCoords.length > 1 && (
                <Polyline positions={trailCoords as any} pathOptions={trailStyle} />
              )}

              {/* Dots for breadcrumb */}
              {trail.map((t, i) => (
                <CircleMarker
                  key={`trail-${idx}-${i}`}
                  center={[t.lat, t.lng] as any}
                  radius={4}
                  pathOptions={{
                    color: "#38bdf8",
                    fillColor: "#38bdf8",
                    fillOpacity: 0.7,
                  }}
                />
              ))}

              {/* MAIN MARKER */}
              <Marker position={[op.lat, op.lng] as any} icon={icon}>
                <Popup>
                  <div className="text-sm font-medium">{op.name}</div>
                  <div className="text-xs text-slate-500">
                    Status: {op.status}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Lat: {op.lat.toFixed(4)} <br />
                    Lng: {op.lng.toFixed(4)}
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
