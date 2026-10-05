import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

/** Narrow, hooded blue-grey eyes: a heavy lid with the fold close above it, a soft line beneath and faint crow's feet. */
const UrsulaEye = ({ x }: { x: number }) => {
  const side = `translate(${x}, 46) scale(${x < 50 ? -1 : 1}, 1)`;
  return (
    <g>
      <g transform={`translate(${x}, 46)`}>
        <circle r="3.6" fill="#7E9FBC" />
        <circle r="1.7" fill="#1F2933" />
        <circle cx="1.3" cy="-1.4" r="1" fill="white" />
      </g>
      <g transform={side} fill="none" stroke="#3E3230" strokeLinecap="round">
        <path d="M -7 -1 C -4.5 -4.4, 3.5 -4.8, 7.2 -1.8" strokeWidth="1.3" />
        <path d="M 7.2 -1.8 L 8.8 -3" strokeWidth="0.8" />
        <path d="M -6.5 -3.6 C -3.5 -6.4, 3.5 -6.8, 7.2 -4" strokeWidth="0.7" opacity="0.5" />
        <path d="M -5.6 2.6 Q 0 4.2, 5.8 2.4" strokeWidth="0.6" opacity="0.5" />
        <path d="M -4.8 5.2 Q 0 6.6, 4.6 5" strokeWidth="0.5" opacity="0.28" />
        <path d="M 8.2 -0.4 L 10.8 -1.2 M 8.4 1.6 L 10.8 2.6" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  );
};

const ursulaEyes: PartComponent = () => (
  <g>
    <UrsulaEye x={35} />
    <UrsulaEye x={65} />
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
