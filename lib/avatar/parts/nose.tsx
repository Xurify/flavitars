import { PartComponent } from "./common";

export const NoseId = ["hook", "lShape", "button", "triangle", "refinedButton", "smallButton"] as const;
export type NoseId = (typeof NoseId)[number];

export const Noses: Record<NoseId, PartComponent> = {
  hook: () => (
    <g transform="translate(50, 58)">
      <path d="M-2 -4 Q 1 -4, 1 0 Q 1 4, -2 4" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M-1 2 Q 0 3, 1 2" fill="none" stroke="currentColor" opacity="0.3" strokeWidth="1" strokeLinecap="round" />
    </g>
  ),
  lShape: () => (
    <g transform="translate(49, 58)">
      <path d="M0 -6 V 6 H 5" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-2 -4 L -2 4" fill="none" stroke="currentColor" opacity="0.15" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  ),
  button: () => (
    <g transform="translate(50, 62)">
      <path d="M-2 -2 Q 0 2, 2 -2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M-1 0.5 Q 0 1.5, 1 0.5" fill="none" stroke="white" opacity="0.2" strokeWidth="1" strokeLinecap="round" />
      <circle cx="2.5" cy="-2.5" r="0.8" fill="currentColor" opacity="0.2" />
      <circle cx="-2.5" cy="-2.5" r="0.8" fill="currentColor" opacity="0.2" />
    </g>
  ),
  triangle: () => (
    <g transform="translate(50, 57)">
      <path
        d="M0 -5 L 4 5 L 0 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1 -2 L 3 3" fill="none" stroke="currentColor" opacity="0.2" strokeWidth="1" strokeLinecap="round" />
    </g>
  ),
  refinedButton: () => (
    <g transform="translate(50, 61)">
      {/* Refined button nose - slightly higher and softer */}
      <path d="M-3 0 Q 0 3, 3 0" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="0" cy="0.5" r="0.5" fill="white" opacity="0.3" />
      <path d="M -4 -2 Q -3 -3, -2 -2 M 2 -2 Q 3 -3, 4 -2" fill="none" stroke="black" opacity="0.08" strokeWidth="0.8" />
    </g>
  ),
  smallButton: () => (
    <g transform="translate(50, 60)">
      <path d="M-2 0 Q 0 2, 2 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M-1 1 Q 0 2, 1 1" fill="none" stroke="currentColor" opacity="0.15" strokeWidth="1" />
    </g>
  ),
};
