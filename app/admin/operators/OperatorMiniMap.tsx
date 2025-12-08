"use client";

import React from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function OperatorMiniMap({ operator }: { operator: any }) {
  // Default to Toronto if no location provided
  const lat = operator?.lat ?? 43.6532;
  const lng = operator?.lng ?? -79.3832;

  const center: [number, number] = [lat, lng];

  const color =
    operator?.status === "online"
      ? "#22c55e"
      : operator?.status === "busy"
      ? "#eab308"
      : "#64748b";

  return (
    <div className="h-40 w-full overflow-hidden rounded-lg border border-slate-700/40">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker
          center={center}
          radius={12}
          pathOptions={{
            color,
            fillColor: color,
            fillOpacity: 0.85,
          }}
        >
          <Popup>
            <div className="text-xs">
              <div className="font-semibold">{operator?.name}</div>
              <div>Status: {operator?.status}</div>
              <div>Jobs: {operator?.jobsCompleted ?? 0}</div>
              <div>Rating: {operator?.rating?.toFixed(1) ?? "0.0"}</div>
            </div>
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
