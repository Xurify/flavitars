import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

const ursulaEyes: PartComponent = () => (
  <g>
    {/* Left Eye */}
    <g transform="translate(35, 46)">
      {/* Iris and Pupil */}
      <circle r="4" fill="#88A4BE" />
      <circle r="1.8" fill="#1a1a1a" />
      <circle cx="0.9" cy="-1.4" r="1" fill="white" />
      
      {/* Subtle upper lid resting along the top of the eye */}
      <path d="M -6.8 -2.2 Q 0 -5.2, 6.8 -2.2" fill="none" stroke="#4A3A33" strokeWidth="1" strokeLinecap="round" />

      {/* Fuller feminine lashes, upswept and denser toward the outer corner */}
      <path d="M -6.8 -2.2 Q -8.3 -2.5, -9.2 -3.4" fill="none" stroke="#3E322C" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M -4.9 -3.0 Q -5.3 -3.6, -5.6 -4.1" fill="none" stroke="#3E322C" strokeWidth="0.5" strokeLinecap="round" />
      <path d="M -3.4 -3.35 Q -3.7 -3.9, -3.9 -4.4" fill="none" stroke="#3E322C" strokeWidth="0.45" strokeLinecap="round" />
      <path d="M -2.0 -3.55 Q -2.2 -4.1, -2.3 -4.5" fill="none" stroke="#3E322C" strokeWidth="0.42" strokeLinecap="round" />
      <path d="M -0.9 -3.65 Q -1.0 -4.1, -1.0 -4.4" fill="none" stroke="#3E322C" strokeWidth="0.4" strokeLinecap="round" />
    </g>

    {/* Right Eye */}
    <g transform="translate(65, 46)">
      {/* Iris and Pupil */}
      <circle r="4" fill="#88A4BE" />
      <circle r="1.8" fill="#1a1a1a" />
      <circle cx="0.9" cy="-1.4" r="1" fill="white" />
      
      {/* Subtle upper lid resting along the top of the eye */}
      <path d="M -6.8 -2.2 Q 0 -5.2, 6.8 -2.2" fill="none" stroke="#4A3A33" strokeWidth="1" strokeLinecap="round" />

      {/* Fuller feminine lashes, upswept and denser toward the outer corner */}
      <path d="M 6.8 -2.2 Q 8.3 -2.5, 9.2 -3.4" fill="none" stroke="#3E322C" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M 4.9 -3.0 Q 5.3 -3.6, 5.6 -4.1" fill="none" stroke="#3E322C" strokeWidth="0.5" strokeLinecap="round" />
      <path d="M 3.4 -3.35 Q 3.7 -3.9, 3.9 -4.4" fill="none" stroke="#3E322C" strokeWidth="0.45" strokeLinecap="round" />
      <path d="M 2.0 -3.55 Q 2.2 -4.1, 2.3 -4.5" fill="none" stroke="#3E322C" strokeWidth="0.42" strokeLinecap="round" />
      <path d="M 0.9 -3.65 Q 1.0 -4.1, 1.0 -4.4" fill="none" stroke="#3E322C" strokeWidth="0.4" strokeLinecap="round" />
    </g>
  </g>
);

export const UrsulaEyes: PartRegistry<UrsulaEyesId> = {
  ursulaEyes: {
    component: ursulaEyes,
    label: "Ursula Eyes",
    presetOnly: true,
    isExclusive: true,
  },
};
