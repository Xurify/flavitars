import { PartComponent } from "./common";

export const MouthId = [
  "neutral",
  "smile",
  "smileDimples",
  "softTeethSmile",
  "brightGrin",
  "laughing",
  "neutralFullLips",
  "naturalNude",
  "naturalPinkSmile",
  "lipstickMouth",
  "softMatte",
  "softMatteSmile",
  "glossyMauveLips",
  "vibrantRedFull",
  "vibrantRedSmall",
  "smirk",
  "smirkRed",
  "pout",
  "oMouth",
] as const;
export type MouthId = (typeof MouthId)[number];

export const Mouths: Record<MouthId, PartComponent> = {
  smile: () => (
    <g transform="translate(50, 78)">
      <path d="M-15 -3 Q 0 7, 15 -3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M-12 -2 Q 0 5, 12 -2" fill="none" stroke="currentColor" opacity="0.15" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M-16 -4 L -14 -2 M 16 -4 L 14 -2"
        fill="none"
        stroke="currentColor"
        opacity="0.3"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </g>
  ),
  neutral: () => (
    <g transform="translate(50, 78)">
      <path d="M-10 0 H 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M-8 1.5 H 8" stroke="currentColor" opacity="0.1" strokeWidth="1" strokeLinecap="round" />
      <circle cx="-11" cy="0" r="0.8" fill="currentColor" opacity="0.4" />
      <circle cx="11" cy="0" r="0.8" fill="currentColor" opacity="0.4" />
    </g>
  ),
  oMouth: () => (
    <g transform="translate(50, 78)">
      <circle r="4.5" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <circle r="2.5" fill="none" stroke="currentColor" opacity="0.2" strokeWidth="1.2" />
    </g>
  ),
  smirk: () => (
    <g transform="translate(50, 78)">
      <path d="M-5 0 Q 5 4, 15 -4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  smirkRed: () => (
    <g transform="translate(50, 78)">
      <path d="M-5 0 Q 5 4, 15 -4" fill="none" stroke="#D0021B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M-5 0 Q 5 4, 15 -4" fill="none" stroke="#FF0526" opacity="0.6" strokeWidth="1" strokeLinecap="round" />
    </g>
  ),
  pout: () => (
    <g transform="translate(50, 78)">
      <path d="M-4 0 Q 0 3, 4 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M-2 3.5 Q 0 4.5, 2 3.5" fill="none" stroke="currentColor" opacity="0.2" strokeWidth="1" strokeLinecap="round" />
    </g>
  ),
  smileDimples: () => (
    <g transform="translate(50, 78)">
      <path d="M-15 -3 Q 0 7, 15 -3" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <g transform="translate(-18, -4)">
        <circle r="1" fill="currentColor" opacity="0.5" />
      </g>
      <g transform="translate(18, -4)">
        <circle r="1" fill="currentColor" opacity="0.5" />
      </g>
    </g>
  ),
  lipstickMouth: () => (
    <g transform="translate(50, 78)">
      {/* Upper Lip */}
      <path d="M -12 0 Q -6 -4, 0 -1 Q 6 -4, 12 0" fill="#D87D7D" stroke="#B25E5E" strokeWidth="1" />
      {/* Lower Lip */}
      <path d="M -12 0 Q 0 8, 12 0 Z" fill="#D87D7D" stroke="#B25E5E" strokeWidth="1" />
      {/* Center line */}
      <path d="M -10 0 H 10" stroke="#B25E5E" opacity="0.4" strokeWidth="0.5" />
    </g>
  ),
  softMatte: () => (
    <g transform="translate(50, 78)">
      {/* Upper Lip - Mauve/Nude */}
      <path d="M -12 0 Q -6 -3, 0 -0.5 Q 6 -3, 12 0" fill="#C08081" stroke="#A06060" strokeWidth="1" />
      {/* Lower Lip */}
      <path d="M -11 0 Q 0 7, 11 0 Z" fill="#C08081" stroke="#A06060" strokeWidth="1" />
      <path d="M -8 0 H 8" stroke="#704040" opacity="0.3" strokeWidth="0.5" />
    </g>
  ),
  softMatteSmile: () => (
    <g transform="translate(50, 78)">
      {/* Upper Lip */}
      <path d="M -13 0 Q -6 -4, 0 -1 Q 6 -4, 13 0" fill="#C08081" stroke="#A06060" strokeWidth="1" />
      {/* Teeth hint */}
      <rect x="-6" y="-0.5" width="12" height="2" rx="0.5" fill="white" opacity="0.9" />
      <path d="M 0 -0.5 V 1.5" stroke="black" opacity="0.1" strokeWidth="0.5" />
      {/* Lower Lip */}
      <path d="M -12 0 Q 0 8, 12 0 Z" fill="#C08081" stroke="#A06060" strokeWidth="1" />
    </g>
  ),
  naturalNude: () => (
    <g transform="translate(50, 78)">
      {/* Soft natural nude lips */}
      <path d="M -11 0 Q -5 -3, 0 -0.5 Q 5 -3, 11 0" fill="#E8A8A9" stroke="#B07070" strokeWidth="1" />
      <path d="M -10 0 Q 0 6, 10 0 Z" fill="#E8A8A9" stroke="#B07070" strokeWidth="1" />
      <path d="M -7 0 H 7" stroke="#804040" opacity="0.2" strokeWidth="0.5" />
    </g>
  ),
  naturalPinkSmile: () => (
    <g transform="translate(50, 78)">
      {/* Soft pink smiling lips */}
      <path d="M -13 0 Q -6 -5, 0 -1.5 Q 6 -5, 13 0" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
      <path d="M -12 0 Q 0 9, 12 0 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
      {/* Subtle teeth hint */}
      <rect x="-7" y="-1" width="14" height="2.5" rx="1" fill="white" opacity="0.95" />
      <path d="M -11 0 H 11" stroke="#DB2777" opacity="0.15" strokeWidth="0.5" />
    </g>
  ),
  glossyMauveLips: () => (
    <g transform="translate(50, 78)">
      {/* Full Mauve Lips */}
      <path d="M -13 0 Q -7 -4.5, 0 -1 Q 7 -4.5, 13 0" fill="#B18485" stroke="#8A5C5D" strokeWidth="1" />
      <path d="M -12 0 Q 0 8, 12 0 Z" fill="#B18485" stroke="#8A5C5D" strokeWidth="1" />
      {/* Gloss Highlight */}
      <path d="M -6 -1.5 Q 0 -3, 6 -1.5" fill="none" stroke="white" opacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M -8 2 Q 0 4, 8 2" fill="none" stroke="white" opacity="0.2" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  laughing: () => (
    <g transform="translate(50, 75)">
      {/* Open Mouth shape */}
      <path
        d="M -15 -5 Q 0 -10, 15 -5 Q 18 0, 12 15 Q 0 18, -12 15 Q -18 0, -15 -5 Z"
        fill="#752222" // Dark mouth interior
        stroke="#A05050"
        strokeWidth="1.5"
      />

      {/* Upper Teeth */}
      <path d="M -13 -4 Q 0 -8, 13 -4 L 11 2 Q 0 4, -11 2 Z" fill="white" />
      <path d="M 0 -6 V 2" stroke="#E5E5E5" strokeWidth="0.5" />
      <path d="M -5 -5 V 1" stroke="#E5E5E5" strokeWidth="0.5" />
      <path d="M 5 -5 V 1" stroke="#E5E5E5" strokeWidth="0.5" />

      {/* Tongue */}
      <path d="M -10 10 Q 0 6, 10 10 Q 6 14, 0 14 Q -6 14, -10 10" fill="#EF4444" opacity="0.8" />

      {/* Lips Outline - Glossy Pink/Red */}
      <path
        d="M -16 -6 Q 0 -12, 16 -6 Q 19 0, 13 16 Q 0 20, -13 16 Q -19 0, -16 -6 Z"
        fill="none"
        stroke="#D44D5C"
        strokeWidth="2"
      />

      {/* Lip Gloss Highlight */}
      <path d="M -12 16 Q 0 18, 12 16" fill="none" stroke="white" opacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  neutralFullLips: () => (
    <g transform="translate(50, 78)">
      {/* Upper Lip - fuller and natural toned */}
      <path d="M -13 0 Q -6-3, 0-1 Q 6-3, 13 0" fill="#9C6B5E" stroke="#7A4B3D" strokeWidth="1" />
      {/* Lower Lip - fuller but neutral */}
      <path d="M -11 0 Q 0 7.5, 11 0 Z" fill="#9C6B5E" stroke="#7A4B3D" strokeWidth="1" />
      {/* Center line with a slight downturn at ends */}
      <path d="M -9 0 L -11 1 M 9 0 L 11 1" stroke="#7A4B3D" opacity="0.4" strokeWidth="1" strokeLinecap="round" />
      <path d="M -8 0 H 8" stroke="#7A4B3D" opacity="0.3" strokeWidth="0.5" />
    </g>
  ),
  vibrantRedFull: () => (
    <g transform="translate(50, 78)">
      {/* Vibrant Red Full Lips - Precise and bold */}
      {/* Upper Lip */}
      <path d="M -14 0 Q -7 -5, 0 -1.5 Q 7 -5, 14 0" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
      {/* Lower Lip */}
      <path d="M -13 0 Q 0 9, 13 0 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />

      {/* Subtle shine/volume highlight */}
      <path d="M -8 3 Q 0 5, 8 3" fill="none" stroke="white" opacity="0.15" strokeWidth="2" strokeLinecap="round" />

      {/* Center line */}
      <path d="M -10 0 H 10" stroke="#7F1D1D" opacity="0.3" strokeWidth="0.5" />
    </g>
  ),
  brightGrin: () => (
    <g transform="translate(50, 74)">
      {/* Wide open smiling mouth */}
      <path
        d="M -18 -4 Q 0 -10, 18 -4 Q 20 5, 15 12 Q 0 18, -15 12 Q -20 5, -18 -4 Z"
        fill="#5C2020"
        stroke="#E8B4B4"
        strokeWidth="1.5"
      />

      {/* Upper teeth - full row */}
      <path d="M -15 -3 Q 0 -8, 15 -3 L 12 3 Q 0 5, -12 3 Z" fill="white" />
      {/* Teeth lines */}
      <g stroke="#E5E5E5" strokeWidth="0.5">
        <path d="M -9 -4 V 2" />
        <path d="M -4 -5 V 3" />
        <path d="M 0 -6 V 3" />
        <path d="M 4 -5 V 3" />
        <path d="M 9 -4 V 2" />
      </g>

      {/* Tongue */}
      <path d="M -8 10 Q 0 6, 8 10 Q 4 14, 0 13 Q -4 14, -8 10" fill="#E57373" opacity="0.9" />

      {/* Natural pink lips outline */}
      <path
        d="M -19 -5 Q 0 -12, 19 -5 Q 22 5, 16 14 Q 0 20, -16 14 Q -22 5, -19 -5 Z"
        fill="none"
        stroke="#E8A8A8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Lip gloss shine */}
      <path d="M -14 14 Q 0 16, 14 14" fill="none" stroke="white" opacity="0.3" strokeWidth="1.5" strokeLinecap="round" />

      {/* Dimples hint */}
      <circle cx="-20" cy="0" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="20" cy="0" r="1" fill="currentColor" opacity="0.2" />
    </g>
  ),
  softTeethSmile: () => (
    <g transform="translate(50, 78)">
      {/* Simple natural smile with teeth */}
      {/* Upper Lip */}
      <path d="M -14 0 Q -7 -4, 0 -1.5 Q 7 -4, 14 0" fill="#D4A4A4" stroke="#B07070" strokeWidth="1" />
      {/* Teeth hint - subtle */}
      <rect x="-8" y="-1" width="16" height="3" rx="1" fill="white" opacity="0.95" />
      <g stroke="#E8E8E8" strokeWidth="0.3" opacity="0.5">
        <path d="M -4 -1 V 2" />
        <path d="M 0 -1 V 2" />
        <path d="M 4 -1 V 2" />
      </g>
      {/* Lower Lip */}
      <path d="M -13 0 Q 0 8, 13 0 Z" fill="#D4A4A4" stroke="#B07070" strokeWidth="1" />
      {/* Subtle lip shine */}
      <path d="M -8 3 Q 0 5, 8 3" fill="none" stroke="white" opacity="0.15" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  vibrantRedSmall: () => (
    <g transform="translate(50, 78)">
      {/* Smaller Vibrant Red Lips */}
      {/* Upper Lip */}
      <path d="M -10 0 Q -5 -3.5, 0 -1 Q 5 -3.5, 10 0" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
      {/* Lower Lip */}
      <path d="M -9 0 Q 0 6, 9 0 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
      {/* Subtle shine */}
      <path d="M -5 2 Q 0 3.5, 5 2" fill="none" stroke="white" opacity="0.15" strokeWidth="1.5" strokeLinecap="round" />
      {/* Center line */}
      <path d="M -7 0 H 7" stroke="#7F1D1D" opacity="0.3" strokeWidth="0.4" />
    </g>
  ),
};
