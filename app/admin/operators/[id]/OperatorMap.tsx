// ~/Desktop/blyz-web/app/admin/operators/[id]/OperatorMap.tsx
"use client";

import React from "react";

interface Props {
  operatorName: string;
  address: string;
}

// -----------------------------------------------------------------------------
// NOTE: Simple embedded Google Maps search. For now, it uses the operator's
// most recent job address. Can be upgraded later to live GPS coords.
// -----------------------------------------------------------------------------
export default function OperatorMap({ operatorName, address }: Props) {
  const mapQuery = encodeURIComponent(address || "Ottawa, ON");
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow flex flex-col gap-3">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-semibold uppercase text-slate-300">
            Live Map (Dispatch View)
          </h2>
          <p className="text-[11px] text-slate-500">
            Approximate service area based on most recent job address.
          </p>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div className="font-medium text-slate-200 truncate max-w-[140px]">
            {operatorName}
          </div>
          <div className="truncate max-w-[140px]">{address}</div>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/80 h-48">
        <iframe
          title="Operator Location Map"
          src={mapSrc}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Footer */}
      <div className="text-[10px] text-slate-500">
        Future upgrade: use live GPS from operator app + WebSockets to show
        moving location in real time.
      </div>
    </section>
  );
}
