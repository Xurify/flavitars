import React from "react";
import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

const ursulaCheeks: PartComponent = () => (
  <g fill="none" stroke="#8A7A70" strokeWidth="0.6" strokeLinecap="round">
    {/* Faint under-eye creases hugging the lower lid */}
    <path d="M 31.5 50.3 Q 35 51.4, 38.5 50.3" opacity="0.12" />
    <path d="M 61.5 50.3 Q 65 51.4, 68.5 50.3" opacity="0.12" />

    {/* Soft nasolabial folds from the nostrils toward the mouth corners */}
    <path d="M 43.5 55 C 42.6 59, 41.6 62, 40 64.5" opacity="0.18" />
    <path d="M 56.5 55 C 57.4 59, 58.4 62, 60 64.5" opacity="0.18" />
  </g>
);

export const UrsulaExtras: PartRegistry<UrsulaExtrasId> = {
  ursulaCheeks: {
    component: ursulaCheeks,
    label: "Ursula Cheeks",
    presetOnly: true,
    isExclusive: true,
  },
};
