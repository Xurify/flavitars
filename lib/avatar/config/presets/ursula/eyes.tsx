import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

/** Blue-grey eyes with a heavier lid, a crease above it, a soft line beneath and faint crow's feet. */
const UrsulaEye = ({ x }: { x: number }) => {
  const side = `translate(${x}, 46) scale(${x < 50 ? 1 : -1}, 1)`;
  return (
    <g>
      <g transform={`translate(${x}, 46)`}>
        <circle r="3.8" fill="#7E9FBC" />
        <circle r="1.7" fill="#1F2933" />
        <circle cx="1.3" cy="-1.4" r="1" fill="white" />
      </g>
      <g transform={side} fill="none" stroke="#3E3230" strokeLinecap="round">
        <path d="M -7 -1.4 C -4.5 -5, 3.5 -5.4, 7.2 -2.2" strokeWidth="1.3" />
        <path d="M 7.2 -2.2 L 8.8 -3.4" strokeWidth="0.8" />
        <path d="M -6.2 -4.2 C -3.5 -7.2, 3.5 -7.6, 7 -4.6" strokeWidth="0.6" opacity="0.45" />
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
