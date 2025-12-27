import { PartComponent } from "./common";

export const EyesId = [
  "standard",
  "lashes",
  "tired",
  "winking",
  "almond",
  "wingedLashes",
  "blueWinged",
  "lightHazel",
  "brightBlueGlam",
  "greenLavenderGlam",
  "softBlueGrey",
  "brightBlueNatural",
  "brownAlmond",
  "heavyLashes",
  "glamGreyEyes",
  "wingedGlamEyes",
  "blueGreyGlam",
  "warmBrownNatural",
  "warmBrownSoft",
  "happyBrownFeminine",
  "blueGreyNatural",
  "hazelGreenNatural",
  "aquaBlueNatural",
  "calmBlueGrey",
] as const;
export type EyesId = (typeof EyesId)[number];

export const Eyes: Record<EyesId, PartComponent> = {
  standard: () => (
    <g>
      <g transform="translate(35, 45)">
        <circle r="4" fill="currentColor" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        <path d="M-1.5 1.5 Q 0 2.5, 1.5 1.5" fill="none" stroke="white" opacity="0.2" strokeWidth="0.5" />
      </g>
      <g transform="translate(65, 45)">
        <circle r="4" fill="currentColor" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        <path d="M-1.5 1.5 Q 0 2.5, 1.5 1.5" fill="none" stroke="white" opacity="0.2" strokeWidth="0.5" />
      </g>
      <path d="M30 38 Q 35 36, 40 38" fill="none" stroke="currentColor" opacity="0.4" strokeWidth="1" />
      <path d="M60 38 Q 65 36, 70 38" fill="none" stroke="currentColor" opacity="0.4" strokeWidth="1" />
    </g>
  ),
  lashes: () => (
    <g>
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="currentColor" />
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        <circle cx="-1.5" cy="1.5" r="0.8" fill="white" opacity="0.3" />
        <path
          d="M -1 -4.5 L -2 -9 M -4 -4 L -7 -8 M -6.5 -2.5 L -10 -5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="currentColor" />
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        <circle cx="-1.5" cy="1.5" r="0.8" fill="white" opacity="0.3" />
        <path
          d="M 1 -4.5 L 2 -9 M 4 -4 L 7 -8 M 6.5 -2.5 L 10 -5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    </g>
  ),
  tired: () => (
    <g>
      <path d="M28 44 Q 35 40, 42 44" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M58 44 Q 65 40, 72 44" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <g transform="translate(35, 48)">
        <circle r="3" fill="currentColor" />
        <circle cx="1" cy="-1" r="0.8" fill="white" />
      </g>
      <g transform="translate(65, 48)">
        <circle r="3" fill="currentColor" />
        <circle cx="1" cy="-1" r="0.8" fill="white" />
      </g>
      <path d="M28 53 Q 35 55, 42 53" fill="none" stroke="currentColor" opacity="0.3" strokeWidth="1" />
      <path d="M58 53 Q 65 55, 72 53" fill="none" stroke="currentColor" opacity="0.3" strokeWidth="1" />
    </g>
  ),
  winking: () => (
    <g>
      <g transform="translate(35, 45)">
        <path d="M-6 4 Q 0 8, 6 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M-5 2 Q 0 0, 5 2" fill="none" stroke="currentColor" opacity="0.4" strokeWidth="1" />
      </g>
      <g transform="translate(65, 45)">
        <circle r="4" fill="currentColor" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        <path d="M7 2 L 11 -2 M 5 -4 L 8 -8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </g>
  ),
  almond: () => (
    <g>
      <g transform="translate(35, 45)">
        <path d="M-12 0 Q 0 -9, 12 0 Q 0 9, -12 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle r="4" fill="currentColor" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        <path d="M-9 -4 L -13 -8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        <path d="M-12 0 Q 0 -9, 12 0 Q 0 9, -12 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle r="4" fill="currentColor" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        <path d="M9 -4 L 13 -8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </g>
  ),
  wingedLashes: () => (
    <g>
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="currentColor" />
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Bold Winged Eyeliner */}
        <path d="M -10 -4 Q -6 -10, 2 -7" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -9 -3 L -12 -6 M -7 -5 L -10 -9 M -4 -6 L -6 -11" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="currentColor" />
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Bold Winged Eyeliner */}
        <path d="M 10 -4 Q 6 -10, -2 -7" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 9 -3 L 12 -6 M 7 -5 L 10 -9 M 4 -6 L 6 -11" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
    </g>
  ),
  blueWinged: () => (
    <g>
      <g transform="translate(35, 45)">
        {/* Iris - Brilliant Blue */}
        <circle r="4.5" fill="#3B82F6" />
        <circle r="2.2" fill="#1e293b" /> {/* Pupil */}
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Bold Winged Eyeliner */}
        <path d="M -10 -4 Q -6 -10, 2 -7" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -9 -3 L -12 -6 M -7 -5 L -10 -9 M -4 -6 L -6 -11" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        {/* Iris - Brilliant Blue */}
        <circle r="4.5" fill="#3B82F6" />
        <circle r="2.2" fill="#1e293b" /> {/* Pupil */}
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Bold Winged Eyeliner */}
        <path d="M 10 -4 Q 6 -10, -2 -7" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 9 -3 L 12 -6 M 7 -5 L 10 -9 M 4 -6 L 6 -11" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
    </g>
  ),
  lightHazel: () => (
    <g>
      <g transform="translate(35, 45)">
        {/* Iris - Hazel / Light Olive Green */}
        <circle r="4.5" fill="#A3E635" />
        <circle r="2.2" fill="#1e293b" /> {/* Pupil */}
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Glam Eyeliner */}
        <path d="M -11 -4 Q -6 -9, 3 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -10 -3 L -12 -6 M -8 -5 L -10 -8" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        {/* Iris - Hazel / Light Olive Green */}
        <circle r="4.5" fill="#A3E635" />
        <circle r="2.2" fill="#1e293b" /> {/* Pupil */}
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Glam Eyeliner */}
        <path d="M 11 -4 Q 6 -9, -3 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 10 -3 L 13 -6 M 8 -5 L 10 -8" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
    </g>
  ),
  brightBlueGlam: () => (
    <g>
      <g transform="translate(35, 45)">
        {/* Iris - Vibrant Blue */}
        <circle r="4.5" fill="#3B82F6" />
        <circle r="2.2" fill="#1e293b" /> {/* Pupil */}
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Glam Eyeliner */}
        <path d="M -11 -4 Q -6 -9, 3 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -10 -3 L -12 -6 M -8 -5 L -10 -8" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        {/* Iris - Vibrant Blue */}
        <circle r="4.5" fill="#3B82F6" />
        <circle r="2.2" fill="#1e293b" /> {/* Pupil */}
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Glam Eyeliner */}
        <path d="M 11 -4 Q 6 -9, -3 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 10 -3 L 13 -6 M 8 -5 L 10 -8" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
    </g>
  ),
  brownAlmond: () => (
    <g>
      <g transform="translate(35, 45)">
        <circle r="4.2" fill="#543b2b" />
        <circle r="2" fill="#1e293b" />
        <circle cx="1.5" cy="-1.5" r="1.5" fill="white" />
        <path d="M-9 -3 Q-4 -8, 4 -4" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        <circle r="4.2" fill="#543b2b" />
        <circle r="2" fill="#1e293b" />
        <circle cx="1.5" cy="-1.5" r="1.5" fill="white" />
        <path d="M 9 -3 Q 4 -8, -4 -4" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  ),
  greenLavenderGlam: () => (
    <g>
      {/* Lavender Eyeshadow Area */}
      <path d="M 22 42 Q 35 32, 48 42" fill="#A78BFA" opacity="0.4" />
      <path d="M 52 42 Q 65 32, 78 42" fill="#A78BFA" opacity="0.4" />
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="#22C55E" />
        <circle r="2.2" fill="#1e293b" />
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        <path d="M -11 -4 Q -6 -9, 3 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -10 -3 L -12 -6 M -8 -5 L -10 -8" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="#22C55E" />
        <circle r="2.2" fill="#1e293b" />
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        <path d="M 11 -4 Q 6 -9, -3 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 10 -3 L 13 -6 M 8 -5 L 10 -8" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
    </g>
  ),
  softBlueGrey: () => (
    <g>
      <g transform="translate(35, 45)">
        {/* Iris - Grey Blue */}
        <circle r="4.2" fill="#64748b" />
        <circle r="2" fill="#1e293b" />
        <circle cx="1.8" cy="-1.8" r="1.5" fill="white" />
        {/* Soft natural lashes */}
        <path d="M -9 -4 Q -5 -8, 2 -5" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M -8 -3 L -10 -5 M -6 -5 L -7 -8" stroke="black" opacity="0.6" strokeWidth="0.8" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        {/* Iris - Grey Blue */}
        <circle r="4.2" fill="#64748b" />
        <circle r="2" fill="#1e293b" />
        <circle cx="1.8" cy="-1.8" r="1.5" fill="white" />
        {/* Soft natural lashes */}
        <path d="M 9 -4 Q 5 -8, -2 -5" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 8 -3 L 10 -5 M 6 -5 L 7 -8" stroke="black" opacity="0.6" strokeWidth="0.8" strokeLinecap="round" />
      </g>
    </g>
  ),
  brightBlueNatural: () => (
    <g>
      <g transform="translate(35, 45)">
        {/* Iris - Bright Blue */}
        <circle r="4.2" fill="#3B82F6" />
        <circle r="2" fill="#1e293b" />
        <circle cx="1.8" cy="-1.8" r="1.5" fill="white" />
        {/* Natural lashes */}
        <path d="M -9 -3 Q -4 -7, 3 -4" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -8 -2 L -10 -4 M -5 -3.5 L -6 -6" stroke="black" opacity="0.4" strokeWidth="0.8" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        {/* Iris - Bright Blue */}
        <circle r="4.2" fill="#3B82F6" />
        <circle r="2" fill="#1e293b" />
        <circle cx="1.8" cy="-1.8" r="1.5" fill="white" />
        {/* Natural lashes */}
        <path d="M 9 -3 Q 4 -7, -3 -4" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 8 -2 L 10 -4 M 5 -3.5 L 6 -6" stroke="black" opacity="0.4" strokeWidth="0.8" strokeLinecap="round" />
      </g>
    </g>
  ),
  heavyLashes: () => (
    <g>
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="currentColor" />
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Extra Thick Long Lashes */}
        <path d="M -11 -5 Q -8 -14, 3 -8" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
        <g stroke="black" strokeWidth="1.5" strokeLinecap="round">
          <path d="M -10 -4 L -14 -9" />
          <path d="M -8 -6 L -11 -12" />
          <path d="M -5 -7 L -7 -14" />
          <path d="M -2 -7 L -3 -15" />
        </g>
      </g>
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="currentColor" />
        <circle cx="2" cy="-2" r="1.8" fill="white" />
        {/* Extra Thick Long Lashes */}
        <path d="M 11 -5 Q 8 -14, -3 -8" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
        <g stroke="black" strokeWidth="1.5" strokeLinecap="round">
          <path d="M 10 -4 L 14 -9" />
          <path d="M 8 -6 L 11 -12" />
          <path d="M 5 -7 L 7 -14" />
          <path d="M 2 -7 L 3 -15" />
        </g>
      </g>
    </g>
  ),
  glamGreyEyes: () => (
    <g>
      {/* Soft brown eyeshadow */}
      <path d="M 22 42 Q 35 30, 48 42" fill="#78350F" opacity="0.15" />
      <path d="M 52 42 Q 65 30, 78 42" fill="#78350F" opacity="0.15" />
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="#94A3B8" /> {/* Grey/Green Iris */}
        <circle r="2.2" fill="#1e293b" /> {/* Pupil */}
        <circle cx="1.8" cy="-1.8" r="1.5" fill="white" />
        {/* Glam winged lashes */}
        <path d="M -10 -4 Q -6 -9, 3 -6" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M -9 -3 L -12 -6 M -7 -4.5 L -9 -8" stroke="black" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
      </g>
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="#94A3B8" /> {/* Grey/Green Iris */}
        <circle r="2.2" fill="#1e293b" /> {/* Pupil */}
        <circle cx="1.8" cy="-1.8" r="1.5" fill="white" />
        {/* Glam winged lashes */}
        <path d="M 10 -4 Q 6 -9, -3 -6" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M 9 -3 L 12 -6 M 7 -4.5 L 9 -8" stroke="black" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
      </g>
    </g>
  ),
  wingedGlamEyes: () => (
    <g>
      {/* Left Eye */}
      <g transform="translate(35, 45)">
        <circle r="4.8" fill="#5E7B87" /> {/* Green-Grey Iris */}
        <circle r="2" fill="black" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        {/* Sharp Winged Liner */}
        <path d="M -9 -2 Q -12 -12, 5 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -8 -1 L -12 -10" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      {/* Right Eye */}
      <g transform="translate(65, 45)">
        <circle r="4.8" fill="#5E7B87" /> {/* Green-Grey Iris */}
        <circle r="2" fill="black" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        {/* Sharp Winged Liner */}
        <path d="M 9 -2 Q 12 -12, -5 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 8 -1 L 12 -10" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </g>
  ),
  blueGreyGlam: () => (
    <g>
      {/* Left Eye */}
      <g transform="translate(35, 45)">
        <circle r="4.8" fill="#64748B" /> {/* Blue-Grey Iris (Slate-500) */}
        <circle r="2" fill="black" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        {/* Sharp Winged Liner */}
        <path d="M -9 -2 Q -12 -12, 5 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -8 -1 L -12 -10" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      {/* Right Eye */}
      <g transform="translate(65, 45)">
        <circle r="4.8" fill="#64748B" /> {/* Blue-Grey Iris (Slate-500) */}
        <circle r="2" fill="black" />
        <circle cx="1.5" cy="-1.5" r="1.2" fill="white" />
        {/* Sharp Winged Liner */}
        <path d="M 9 -2 Q 12 -12, -5 -6" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 8 -1 L 12 -10" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </g>
  ),
  warmBrownNatural: () => (
    <g>
      {/* Left Eye */}
      <g transform="translate(35, 45)">
        {/* Iris - Warm Brown */}
        <circle r="4.5" fill="#8B5A2B" />
        {/* Inner darker ring */}
        <circle r="3" fill="#5D3A1A" />
        {/* Pupil */}
        <circle r="2" fill="#1e293b" />
        {/* Highlight */}
        <circle cx="1.5" cy="-1.5" r="1.5" fill="white" />
        <circle cx="-1" cy="1" r="0.5" fill="white" opacity="0.3" />
        {/* Natural feminine lashes */}
        <path d="M -9 -3 Q -5 -7, 2 -5" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M -8 -2 L -10 -5 M -6 -4 L -7 -7 M -3 -4.5 L -4 -8"
          stroke="black"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
      {/* Right Eye */}
      <g transform="translate(65, 45)">
        {/* Iris - Warm Brown */}
        <circle r="4.5" fill="#8B5A2B" />
        {/* Inner darker ring */}
        <circle r="3" fill="#5D3A1A" />
        {/* Pupil */}
        <circle r="2" fill="#1e293b" />
        {/* Highlight */}
        <circle cx="1.5" cy="-1.5" r="1.5" fill="white" />
        <circle cx="-1" cy="1" r="0.5" fill="white" opacity="0.3" />
        {/* Natural feminine lashes */}
        <path d="M 9 -3 Q 5 -7, -2 -5" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M 8 -2 L 10 -5 M 6 -4 L 7 -7 M 3 -4.5 L 4 -8"
          stroke="black"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </g>
  ),
  warmBrownSoft: () => (
    <g>
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="#78350F" />
        <circle r="2" fill="#1e293b" />
        <circle cx="1.8" cy="-1.8" r="1.5" fill="white" />
        <path d="M -9 -4 Q -5 -8, 2 -5" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M -8 -3 L -11 -6 M -5 -5 L -7 -9" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="#78350F" />
        <circle r="2" fill="#1e293b" />
        <circle cx="1.8" cy="-1.8" r="1.5" fill="white" />
        <path d="M 9 -4 Q 5 -8, -2 -5" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M 8 -3 L 11 -6 M 5 -5 L 7 -9" stroke="black" strokeWidth="1" strokeLinecap="round" />
      </g>
    </g>
  ),
  happyBrownFeminine: () => (
    <g>
      {/* Soft warm eyeshadow */}
      <path d="M 22 42 Q 35 34, 48 42" fill="#D6BCAB" opacity="0.3" />
      <path d="M 52 42 Q 65 34, 78 42" fill="#D6BCAB" opacity="0.3" />
      {/* Left Eye */}
      <g transform="translate(35, 45)">
        {/* Iris - Rich warm brown */}
        <circle r="4.8" fill="#6B4423" />
        {/* Inner amber ring */}
        <circle r="3.2" fill="#8B5A2B" />
        {/* Pupil */}
        <circle r="2" fill="#1a1a1a" />
        {/* Highlights for sparkle */}
        <circle cx="2" cy="-2" r="1.5" fill="white" />
        <circle cx="-1" cy="1.5" r="0.6" fill="white" opacity="0.4" />
        {/* Soft feminine lashes */}
        <path d="M -9 -2 Q -5 -6, 3 -4" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M -8 -1 L -10 -4 M -5 -3 L -6 -6 M -2 -4 L -2 -7"
          stroke="black"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>
      {/* Right Eye */}
      <g transform="translate(65, 45)">
        {/* Iris - Rich warm brown */}
        <circle r="4.8" fill="#6B4423" />
        {/* Inner amber ring */}
        <circle r="3.2" fill="#8B5A2B" />
        {/* Pupil */}
        <circle r="2" fill="#1a1a1a" />
        {/* Highlights for sparkle */}
        <circle cx="2" cy="-2" r="1.5" fill="white" />
        <circle cx="-1" cy="1.5" r="0.6" fill="white" opacity="0.4" />
        {/* Soft feminine lashes */}
        <path d="M 9 -2 Q 5 -6, -3 -4" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M 8 -1 L 10 -4 M 5 -3 L 6 -6 M 2 -4 L 2 -7"
          stroke="black"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>
    </g>
  ),
  blueGreyNatural: () => (
    <g>
      {/* Left Eye */}
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="#7D9AAA" />
        <circle r="3" fill="#5C7A8A" />
        <circle r="2" fill="#1a1a1a" />
        <circle cx="1.8" cy="-1.8" r="1.4" fill="white" />
        <circle cx="-0.5" cy="1" r="0.5" fill="white" opacity="0.3" />
        <path d="M -9 -3 Q -5 -6, 2 -4" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M -7 -2 L -9 -4 M -4 -4 L -5 -6" stroke="black" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Right Eye */}
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="#7D9AAA" />
        <circle r="3" fill="#5C7A8A" />
        <circle r="2" fill="#1a1a1a" />
        <circle cx="1.8" cy="-1.8" r="1.4" fill="white" />
        <circle cx="-0.5" cy="1" r="0.5" fill="white" opacity="0.3" />
        <path d="M 9 -3 Q 5 -6, -2 -4" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 7 -2 L 9 -4 M 4 -4 L 5 -6" stroke="black" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      </g>
    </g>
  ),
  hazelGreenNatural: () => (
    <g>
      {/* Left Eye */}
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="#7B8B6F" />
        <circle r="3" fill="#5A6B4F" />
        <circle r="2" fill="#1a1a1a" />
        <circle cx="1.8" cy="-1.8" r="1.4" fill="white" />
        <path d="M -9 -3 Q -5 -6, 2 -4" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M -7 -2 L -9 -4 M -4 -4 L -5 -6" stroke="black" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Right Eye */}
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="#7B8B6F" />
        <circle r="3" fill="#5A6B4F" />
        <circle r="2" fill="#1a1a1a" />
        <circle cx="1.8" cy="-1.8" r="1.4" fill="white" />
        <path d="M 9 -3 Q 5 -6, -2 -4" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 7 -2 L 9 -4 M 4 -4 L 5 -6" stroke="black" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      </g>
    </g>
  ),
  aquaBlueNatural: () => (
    <g>
      {/* Left Eye */}
      <g transform="translate(35, 45)">
        <circle r="4.5" fill="#5BA3B0" />
        <circle r="3" fill="#4A8A96" />
        <circle r="2" fill="#1a1a1a" />
        <circle cx="1.8" cy="-1.8" r="1.4" fill="white" />
        <path d="M -9 -3 Q -5 -6, 2 -4" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M -7 -2 L -9 -4 M -4 -4 L -5 -6" stroke="black" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Right Eye */}
      <g transform="translate(65, 45)">
        <circle r="4.5" fill="#5BA3B0" />
        <circle r="3" fill="#4A8A96" />
        <circle r="2" fill="#1a1a1a" />
        <circle cx="1.8" cy="-1.8" r="1.4" fill="white" />
        <path d="M 9 -3 Q 5 -6, -2 -4" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 7 -2 L 9 -4 M 4 -4 L 5 -6" stroke="black" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      </g>
    </g>
  ),
  calmBlueGrey: () => (
    <g>
      {/* Soft lavender/pink eyeshadow */}
      <path d="M 23 42 Q 35 35, 47 42" fill="#C8B8C4" opacity="0.35" />
      <path d="M 53 42 Q 65 35, 77 42" fill="#C8B8C4" opacity="0.35" />
      {/* Left Eye - Calm, slightly hooded */}
      <g transform="translate(35, 46)">
        {/* Upper eyelid creating calm expression */}
        <path d="M -8 -2 Q 0 -5, 8 -2" fill="none" stroke="#9CA3AF" strokeWidth="0.8" opacity="0.5" />
        {/* Iris - Blue-grey */}
        <ellipse rx="4.2" ry="4" fill="#8B9DB3" />
        <ellipse rx="2.8" ry="2.6" fill="#6B7D91" />
        {/* Pupil */}
        <circle r="1.8" fill="#1a1a1a" />
        {/* Soft highlight */}
        <circle cx="1.5" cy="-1.2" r="1.2" fill="white" opacity="0.9" />
        {/* Relaxed lash line */}
        <path d="M -8 -1 Q -4 -3, 2 -2" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -6 0 L -8 -2 M -3 -1 L -4 -3" stroke="black" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
      </g>
      {/* Right Eye - Calm, slightly hooded */}
      <g transform="translate(65, 46)">
        {/* Upper eyelid creating calm expression */}
        <path d="M -8 -2 Q 0 -5, 8 -2" fill="none" stroke="#9CA3AF" strokeWidth="0.8" opacity="0.5" />
        {/* Iris - Blue-grey */}
        <ellipse rx="4.2" ry="4" fill="#8B9DB3" />
        <ellipse rx="2.8" ry="2.6" fill="#6B7D91" />
        {/* Pupil */}
        <circle r="1.8" fill="#1a1a1a" />
        {/* Soft highlight */}
        <circle cx="1.5" cy="-1.2" r="1.2" fill="white" opacity="0.9" />
        {/* Relaxed lash line */}
        <path d="M 8 -1 Q 4 -3, -2 -2" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 6 0 L 8 -2 M 3 -1 L 4 -3" stroke="black" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
      </g>
    </g>
  ),
};
