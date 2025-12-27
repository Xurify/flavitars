import { PartComponent } from "../../../parts/common";

export const MarikaMouthIds = ["marikaDefinedRedSmile", "marikaAtelier"] as const;

export type MarikaMouthId = (typeof MarikaMouthIds)[number];

export const MarikaMouths: Record<MarikaMouthId, PartComponent> = {
  marikaDefinedRedSmile: () => (
    <g transform="translate(50, 78)">
      {/* Defined Dark Red with Teeth */}
      {/* Upper Lip - Sharp cupid's bow */}
      <path d="M -13 0 Q -6 -5, 0 -1.5 Q 6 -5, 13 0" fill="#881337" stroke="#4C0519" strokeWidth="1" />

      {/* Teeth Area */}
      <path d="M -10 0.5 L -9 3 Q 0 4, 9 3 L 10 0.5 Z" fill="white" />
      <path d="M -9 0.5 H 9" stroke="#4C0519" opacity="0.2" strokeWidth="0.5" />

      {/* Lower Lip - Full but contained */}
      <path
        d="M -12 2 Q 0 10, 12 2 Q 13 0, 10 0.5 Q 0 2, -10 0.5 Q -13 0, -12 2"
        fill="#881337"
        stroke="#4C0519"
        strokeWidth="1"
      />

      {/* Gloss/Highlight */}
      <path d="M -6 4 Q 0 6, 6 4" fill="none" stroke="white" opacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  marikaAtelier: () => (
    <g transform="translate(50, 78)">
      {/* 80s Red Glossy Lips */}
      {/* Upper Lip - Slightly parted */}
      <path d="M -13 -1 Q -7 -5, 0 -2 Q 7 -5, 13 -1" fill="#D90429" stroke="#9B2226" strokeWidth="1" />

      {/* Dark interior for slight open mouth */}
      <path d="M -10 -0.5 Q 0 1, 10 -0.5 L 8 2 Q 0 3, -8 2 Z" fill="#4A0404" />

      {/* Lower Lip */}
      <path d="M -12 2 Q 0 9, 12 2 Q 12 2, 8 2 Q 0 3, -8 2" fill="#D90429" stroke="#9B2226" strokeWidth="1" />

      {/* Intense Gloss Highlight */}
      <path d="M -6 5 Q 0 6, 6 5" fill="none" stroke="white" opacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <circle cx="-5" cy="4" r="1" fill="white" opacity="0.4" />
    </g>
  ),
};
