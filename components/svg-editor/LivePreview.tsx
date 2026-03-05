"use client";

import React from "react";
import { HatId, HAT_CLIP_ZONES } from "@/lib/avatar/parts/hats";

interface LivePreviewProps {
  frontPath: string;
  backPath: string;
  selectedHat: HatId;
  hairColor?: string;
}

export function LivePreview({ frontPath, backPath, selectedHat, hairColor = "#4a4a4a" }: LivePreviewProps) {
  const hatClip = HAT_CLIP_ZONES[selectedHat];

  return (
    <div className="w-full aspect-square bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden relative shadow-2xl group">
      <div className="absolute top-3 left-3 px-2 py-0.5 bg-zinc-800/80 rounded text-[10px] font-bold text-zinc-500 uppercase tracking-widest z-10 transition-colors group-hover:text-amber-500">
        Live Preview
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
        {backPath && <path d={backPath} fill={hairColor} />}

        <path d="M35 85 Q 50 90, 65 85 L 65 95 H 35 Z" fill="#E5C1B1" />

        <path d="M20 40 Q 20 10, 50 10 Q 80 10, 80 40 L 80 70 Q 80 95, 50 95 Q 20 95, 20 70 Z" fill="#F3D4C7" />

        <g opacity="0.8">
          <circle cx="38" cy="48" r="2.5" fill="#18181b" />
          <circle cx="62" cy="48" r="2.5" fill="#18181b" />
          <path d="M32 42 Q 38 40, 44 42" fill="none" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M56 42 Q 62 40, 68 42" fill="none" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 75 Q 50 82, 60 75" fill="none" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {frontPath && <path d={frontPath} fill={hairColor} />}

        {selectedHat !== "none" && (
          <g transform={`translate(50, 50) scale(${hatClip?.scale || 1}) translate(-50, -50)`}>
            <HatSilhouette hatId={selectedHat} />
          </g>
        )}
      </svg>
    </div>
  );
}

function HatSilhouette({ hatId }: { hatId: HatId }) {
  const clipPath = HAT_CLIP_ZONES[hatId]?.clipPath ?? "";
  if (!clipPath) return null;

  return <path d={clipPath} fill="#27272a" stroke="#18181b" strokeWidth="1" />;
}
