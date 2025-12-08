// ~/Desktop/blyz-web/app/admin/components/OperatorMap.tsx
"use client";

import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* -----------------------------------------------------
   Dynamic imports (SSR OFF)
------------------------------------------------------ */
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

/* -----------------------------------------------------
   Types
------------------------------------------------------ */
export type OperatorPoint = {
  name: string;
  lat?: number;
  lng?: number;
  status?: string;
  accuracy?: number;
  heading?: number;
  trail?: { lat: number; lng: number }[];
};

type Props = {
  operators: OperatorPoint[];
};

const DEFAULT_CENTER: [number, number] = [43.6532, -79.3832];

/* -----------------------------------------------------
   OperatorMap Component
------------------------------------------------------ */
export default function OperatorMap({ operators }: Props) {
  const mapRef = useRef<any>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const [ready, setReady] = useState(false);

  // Filter valid operators
  const validOperators = operators.filter(
    (o) =>
      typeof o.lat === "number" &&
      typeof o.lng === "number" &&
      !Number.isNaN(o.lat) &&
      !Number.isNaN(o.lng)
  );

  const center: [number, number] = validOperators.length
    ? [validOperators[0].lat!, validOperators[0].lng!]
    : DEFAULT_CENTER;

  /* -----------------------------------------------------
     Initialize map only once
  ------------------------------------------------------ */
  const handleMapCreated = (map: any) => {
    if (!mapRef.current) {
      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      setReady(true);
    }
  };

  /* -----------------------------------------------------
     Update markers dynamically without remounting map
  ------------------------------------------------------ */
  useEffect(() => {
    if (!ready) return;
    const layer = layerRef.current;
    if (!layer) return;

    layer.clearLayers();

    validOperators.forEach((op) => {
      const pos = L.latLng(op.lat!, op.lng!);
      const heading = op.heading ?? 0;
      const accuracy = op.accuracy ?? 12;

      const icon = L.divIcon({
        html: `<div style="transform: rotate(${heading}deg); display: flex; align-items: center; justify-content: center;">
                 <svg width="26" height="26" viewBox="0 0 24 24" fill="#38bdf8">
                   <path d="M12 2L15 14H9L12 2Z"/>
                 </svg>
               </div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      // Marker
      L.marker(pos, { icon }).addTo(layer);

      // Accuracy circle
      L.circle(pos, {
        radius: accuracy,
        color: "#38bdf8",
        fillColor: "#38bdf8",
        fillOpacity: 0.12,
      }).addTo(layer);

      // Trail (breadcrumb)
      if (op.trail?.length) {
        const coords = op.trail.map((p) => [p.lat, p.lng]) as any;
        L.polyline(coords, { color: "#38bdf8", weight: 3, opacity: 0.4 }).addTo(layer);
      }
    });
  }, [operators, ready]);

  /* -----------------------------------------------------
     Render
  ------------------------------------------------------ */
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden border border-slate-800 relative">
      {!validOperators.length && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80 pointer-events-none">
          <div className="text-center px-4 py-2 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-300 text-xs">
            No live GPS data yet
          </div>
        </div>
      )}

      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
        whenCreated={handleMapCreated}
        style={{ background: "#020617" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap & CARTO"
        />
      </MapContainer>
    </div>
  );
}
