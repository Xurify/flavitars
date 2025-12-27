import { PartComponent } from "../../../parts/common";

export const MarikaEyebrowsIds = ["marikaArch", "marikaDefinedArch"] as const;

export type MarikaEyebrowsId = (typeof MarikaEyebrowsIds)[number];

export const MarikaEyebrows: Record<MarikaEyebrowsId, PartComponent> = {
  marikaArch: () => (
    <g opacity="0.9">
      {/* Lowered, natural thin arch matching 1:1 replica - FIXED BROWN COLOR */}
      <path d="M 24 38 Q 35 31, 46 37" fill="none" stroke="#5D4037" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 54 37 Q 65 31, 76 38" fill="none" stroke="#5D4037" strokeWidth="1.6" strokeLinecap="round" />
      {/* Subtle definition strand */}
      <path d="M 30 34 Q 35 33, 40 34" fill="none" stroke="#5D4037" opacity="0.3" strokeWidth="0.5" />
      <path d="M 60 34 Q 65 33, 70 34" fill="none" stroke="#5D4037" opacity="0.3" strokeWidth="0.5" />
    </g>
  ),
  marikaDefinedArch: () => (
    <g opacity="0.95">
      {/* Very defined, thin arch - Dark Brown/Black */}
      <path d="M 24 35 Q 35 28, 46 34" fill="none" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />
      <path d="M 54 34 Q 65 28, 76 35" fill="none" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />

      {/* Sharp tail definition */}
      <path d="M 40 30 L 46 34" fill="none" stroke="#3E2723" strokeWidth="1" />
      <path d="M 60 30 L 54 34" fill="none" stroke="#3E2723" strokeWidth="1" />
    </g>
  ),
};
