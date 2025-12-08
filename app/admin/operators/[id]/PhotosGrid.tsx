// ~/Desktop/blyz-web/app/admin/operators/[id]/PhotosGrid.tsx
"use client";

import React from "react";

interface Job {
  id: string;
  customerName: string;
  address: string;
  // future: photos: string[]
}

interface Props {
  jobs: Job[];
}

// For now this is a mock photo grid that derives "cards" from jobs.
// Later we can plug in real job.photoUrls from the backend.
export default function PhotosGrid({ jobs }: Props) {
  const limitedJobs = jobs.slice(0, 6); // show up to 6 recent jobs

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow">
      <h2 className="text-xs font-semibold uppercase text-slate-300 mb-2">
        Recent Job Photos
      </h2>
      <p className="text-[11px] text-slate-500 mb-3">
        Placeholder cards for now. Later: real before/after photos pulled from
        operator uploads.
      </p>

      {limitedJobs.length === 0 ? (
        <div className="text-[11px] text-slate-500">
          No jobs yet to show photos from.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {limitedJobs.map((job) => (
            <div
              key={job.id}
              className="relative rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden"
            >
              <div className="h-20 bg-slate-800/60 flex items-center justify-center text-[10px] text-slate-400">
                {/* Placeholder "photo" area */}
                Photo placeholder
              </div>
              <div className="px-3 py-2 space-y-1">
                <div className="text-[11px] text-slate-300 font-medium truncate">
                  {job.customerName}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {job.address}
                </div>
                <div className="text-[10px] text-sky-400 mt-1 truncate">
                  View job #{job.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
