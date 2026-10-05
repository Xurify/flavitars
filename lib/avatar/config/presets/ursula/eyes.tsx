import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

/** Almond eye opening, inner corner at -x, outer corner slightly higher. */
const OPENING = "M -7 0.6 C -4.4 -2.8, 3.6 -3.4, 7.4 -1 C 4.6 2.2, -3.6 2.8, -7 0.6 Z";

/**
 * Calm, grown-up eyes: an almond opening with the grey-blue iris tucked under a slightly heavy
 * upper lid, a crease above, a thin lower lid, a soft line beneath and crow's feet. No lashes.
 * Lid lines are drawn with +x pointing away from the nose; the iris is not mirrored.
 */
const UrsulaEye = ({ x, uid }: { x: number; uid: string }) => {
  const outward = x < 50 ? "scale(-1, 1)" : undefined;
  const clipId = `${uid}-ursula-eye-${x}`;
  return (
    <g transform={`translate(${x}, 48.5)`}>
      <defs>
        <clipPath id={clipId}>
          <path d={OPENING} transform={outward} />
        </clipPath>
      </defs>
      <path d={OPENING} transform={outward} fill="white" />
      <g clipPath={`url(#${clipId})`}>
        <circle cy="-0.2" r="3.3" fill="#8DA3B4" />
        <circle cy="-0.2" r="1.6" fill="#1F2933" />
        <circle cx="1.1" cy="-1.3" r="0.8" fill="white" />
      </g>
      <g transform={outward} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -7 0.6 C -4.4 -2.8, 3.6 -3.4, 7.4 -1" strokeWidth="1.7" />
        <path d="M 7.4 -1 C 4.6 2.2, -3.6 2.8, -7 0.6" strokeWidth="0.8" strokeOpacity="0.6" />
        <path d="M -5.8 -3.4 C -2.6 -5.8, 3.4 -6, 6.8 -3.6" strokeWidth="0.8" strokeOpacity="0.45" />
        <path d="M -4.6 4.6 Q 0 6, 4.6 4.4" strokeWidth="0.6" strokeOpacity="0.3" />
        <path d="M 9 -1.2 L 11.4 -2 M 9.2 0.8 L 11.8 1 M 8.8 2.8 L 11 3.8" strokeWidth="0.6" strokeOpacity="0.4" />
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
