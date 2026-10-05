import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

/** Almond eye opening, inner corner at -x; the iris is clipped to it so the hooded lid covers its top. */
const OPENING = "M -6.6 0.4 C -4.2 -3.4, 3.8 -3.9, 7 -0.7 C 4 2.4, -3.6 2.9, -6.6 0.4 Z";

/** Blue-grey almond eyes under a hooded lid, with crow's feet at the outer corners. */
const UrsulaEye = ({ x, uid }: { x: number; uid: string }) => {
  const outward = x < 50 ? "scale(-1, 1)" : undefined;
  const clipId = `${uid}-ursula-eye-${x}`;
  return (
    <g transform={`translate(${x}, 46)`}>
      <defs>
        <clipPath id={clipId}>
          <path d={OPENING} transform={outward} />
        </clipPath>
      </defs>
      <path d={OPENING} transform={outward} fill="white" />
      <g clipPath={`url(#${clipId})`}>
        <circle cy="-0.3" r="3.5" fill="#7E9FBC" />
        <circle cy="-0.3" r="1.7" fill="#1F2933" />
        <circle cx="1.2" cy="-1.5" r="0.9" fill="white" />
      </g>
      <g transform={outward} fill="none" stroke="#3E3230" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -6.6 0.4 C -4.2 -3.4, 3.8 -3.9, 7 -0.7 L 8.6 -1.9" strokeWidth="1.5" />
        <path d="M 7 -0.7 C 4 2.4, -3.6 2.9, -6.6 0.4" strokeWidth="0.6" opacity="0.55" />
        <path d="M -5.6 -3.4 C -2.8 -6, 3.2 -6.3, 6.6 -3.4" strokeWidth="0.7" opacity="0.45" />
        <path d="M -4.4 4.4 Q 0 5.8, 4.2 4.2" strokeWidth="0.5" opacity="0.25" />
        <path d="M 8.6 0.4 L 10.8 -0.3 M 8.4 2.2 L 10.4 3" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  );
};

const ursulaEyes: PartComponent = ({ uid = "fv" }) => (
  <g>
    <UrsulaEye x={35} uid={uid} />
    <UrsulaEye x={65} uid={uid} />
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
