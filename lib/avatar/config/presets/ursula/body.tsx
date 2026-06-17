import React from "react";
import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaBodyIds = ["ursulaRedBlazer", "ursulaPinkBlazer"] as const;
export type UrsulaBodyId = (typeof UrsulaBodyIds)[number];

const ursulaRedBlazer: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Inner White Shirt - wide and prominent background */}
    <path d="M -22 -10 L 22 -10 L 26 40 H -26 Z" fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="0.5" />

    {/* Neck Skin - V-shape showing inside the open shirt */}
    <path d="M -16 -12 Q 0 -8, 16 -12 L 10 6 Q 0 9, -10 6 Z" fill={skinTone || "#F5D0C5"} />

    {/* Simple Pearl Necklace lying on the neck skin */}
    <g fill="#FAFAFA" stroke="#D1D5DB" strokeWidth="0.5">
      <circle cx="-13" cy="1.2" r="2" />
      <circle cx="-9" cy="3.5" r="2.1" />
      <circle cx="-4.5" cy="5" r="2.2" />
      <circle cx="0" cy="5.5" r="2.2" />
      <circle cx="4.5" cy="5" r="2.2" />
      <circle cx="9" cy="3.5" r="2.1" />
      <circle cx="13" cy="1.2" r="2" />
    </g>

    {/* Shirt Placket & Buttons visible in the V-neck chest area */}
    <path d="M 0 6 V 16" fill="none" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="0" cy="11" r="0.8" fill="#D1D5DB" />

    {/* Red Blazer Main Body with wide V-Neck Cutout */}
    <path
      d="M -38 0 
         L -45 15 
         L -45 40 
         L 45 40 
         L 45 15 
         L 38 0 
         L 18 -6 
         L 10 16 
         L -10 16 
         L -18 -6 
         Z"
      fill="#C92F2F"
      stroke="#911F1F"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Blazer Lapels */}
    <path d="M -18 -6 L -10 16 L -24 16 Z" fill="#AC2727" stroke="#911F1F" strokeWidth="1" />
    <path d="M 18 -6 L 10 16 L 24 16 Z" fill="#AC2727" stroke="#911F1F" strokeWidth="1" />

    {/* Visible White Shirt Collar folding over blazer lapels */}
    <path d="M -15 -10 L -6 12 L -24 6 Z" fill="#FFFFFF" stroke="black" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M 15 -10 L 6 12 L 24 6 Z" fill="#FFFFFF" stroke="black" strokeWidth="1.2" strokeLinejoin="round" />

    {/* Seams and Creases */}
    <path d="M -38 12 Q -30 25, -32 40" fill="none" stroke="#911F1F" opacity="0.3" strokeWidth="1" />
    <path d="M 38 12 Q 30 25, 32 40" fill="none" stroke="#911F1F" opacity="0.3" strokeWidth="1" />

    {/* Buttons */}
    <circle cx="0" cy="28" r="2" fill="#C92F2F" stroke="#911F1F" strokeWidth="0.8" />
  </g>
);

const ursulaPinkBlazer: PartComponent = ({ skinTone }) => (
  <g transform="translate(50, 92)">
    {/* Inner White Shirt - wide and prominent background */}
    <path d="M -22 -10 L 22 -10 L 26 40 H -26 Z" fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="0.5" />

    {/* Neck Skin - V-shape showing inside the open shirt */}
    <path d="M -16 -12 Q 0 -8, 16 -12 L 10 6 Q 0 9, -10 6 Z" fill={skinTone || "#F5D0C5"} />

    {/* Simple Pearl Necklace lying on the neck skin */}
    <g fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5">
      <circle cx="-13" cy="1.2" r="2" />
      <circle cx="-9" cy="3.5" r="2.1" />
      <circle cx="-4.5" cy="5" r="2.2" />
      <circle cx="0" cy="5.5" r="2.2" />
      <circle cx="4.5" cy="5" r="2.2" />
      <circle cx="9" cy="3.5" r="2.1" />
      <circle cx="13" cy="1.2" r="2" />
    </g>

    {/* Pink Blazer Main Body with wide V-Neck Cutout */}
    <path
      d="M -38 0 
         L -45 15 
         L -45 40 
         L 45 40 
         L 45 15 
         L 38 0 
         L 18 -6 
         L 10 16 
         L -10 16 
         L -18 -6 
         Z"
      fill="#F3C8C8"
      stroke="#D29999"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Blazer Lapels */}
    <path d="M -18 -6 L -10 16 L -24 16 Z" fill="#E5B2B2" stroke="#D29999" strokeWidth="1" />
    <path d="M 18 -6 L 10 16 L 24 16 Z" fill="#E5B2B2" stroke="#D29999" strokeWidth="1" />

    {/* Visible White Shirt Collar folding over blazer lapels */}
    <path d="M -15 -10 L -6 12 L -24 6 Z" fill="#FFFFFF" stroke="black" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M 15 -10 L 6 12 L 24 6 Z" fill="#FFFFFF" stroke="black" strokeWidth="1.2" strokeLinejoin="round" />

    {/* Seams and Creases */}
    <path d="M -38 12 Q -30 25, -32 40" fill="none" stroke="#D29999" opacity="0.4" strokeWidth="1" />
    <path d="M 38 12 Q 30 25, 32 40" fill="none" stroke="#D29999" opacity="0.4" strokeWidth="1" />

    {/* Buttons */}
    <circle cx="0" cy="28" r="2" fill="#F3C8C8" stroke="#D29999" strokeWidth="0.8" />
  </g>
);

export const UrsulaBodies: PartRegistry<UrsulaBodyId> = {
  ursulaRedBlazer: {
    component: ursulaRedBlazer,
    label: "Ursula Red Blazer",
    presetOnly: true,
    isExclusive: true,
  },
  ursulaPinkBlazer: {
    component: ursulaPinkBlazer,
    label: "Ursula Pink Blazer",
    presetOnly: true,
    isExclusive: true,
  },
};
