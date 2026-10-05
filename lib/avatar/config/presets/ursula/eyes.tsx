import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

/** Almond eye opening, inner corner at -x; the iris is clipped to it so the lid covers its top. */
const OPENING = "M -7.4 0.4 C -4.7 -3.9, 4.3 -4.4, 7.8 -0.8 C 4.5 2.7, -4 3.3, -7.4 0.4 Z";

/** Bright blue-grey almond eyes with a soft crease above and faint laugh lines at the outer corners. */
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
        <circle cy="-0.3" r="3.9" fill="#7FA6C9" />
        <circle cy="-0.3" r="1.85" fill="#1F2933" />
        <circle cx="1.3" cy="-1.6" r="1.1" fill="white" />
      </g>
      <g transform={outward} fill="none" stroke="#3E3230" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -7.4 0.4 C -4.7 -3.9, 4.3 -4.4, 7.8 -0.8 L 9.6 -2.1" strokeWidth="1.6" />
        <path d="M 7.8 -0.8 C 4.5 2.7, -4 3.3, -7.4 0.4" strokeWidth="0.6" opacity="0.45" />
        <path d="M -6.2 -3.9 C -3 -6.7, 3.6 -7, 7.4 -3.9" strokeWidth="0.7" opacity="0.35" />
        <path d="M 9.6 0.2 L 11.6 -0.4 M 9.3 2 L 11.1 2.8" strokeWidth="0.5" opacity="0.3" />
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
