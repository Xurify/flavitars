import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

/** Blue-grey eyes narrowed by a smile: the lower lid lifts into the iris. */
const UrsulaEye = ({ x }: { x: number }) => {
  const side = `translate(${x}, 46) scale(${x < 50 ? 1 : -1}, 1)`;
  return (
    <g>
      <g transform={`translate(${x}, 46)`}>
        <circle r="3.9" fill="#7E9FBC" />
        <circle r="1.8" fill="#1F2933" />
        <circle cx="1.3" cy="-1.5" r="1.1" fill="white" />
      </g>
      <g transform={side} fill="none" stroke="#3E3230" strokeLinecap="round">
        <path d="M -6.6 -1.8 C -4.2 -5.4, 3.6 -5.8, 6.8 -2.4" strokeWidth="1.1" />
        <path d="M 6.8 -2.4 L 8.8 -3.8" strokeWidth="0.9" />
        <path d="M 4.6 -4.2 L 5.4 -5.8" strokeWidth="0.55" />
        <path d="M -5.4 2.4 Q 0 4.4, 5.6 2.2" strokeWidth="0.8" opacity="0.75" />
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
