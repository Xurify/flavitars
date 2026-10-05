import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

/** Lower lid pushed up by the smile; the iris is clipped to stay above it. */
const LOWER_LID = "M 5.8 2.6 Q 0 0.6, -5.8 2.6";

/**
 * Warm, smiling blue-grey eyes: a bold upper lid with a small flick, the lower lid lifted into the
 * iris and a couple of laugh lines at the outer corner. Lids are drawn with +x pointing away from
 * the nose; the iris and its highlight are not mirrored, so the gaze stays straight.
 */
const UrsulaEye = ({ x, uid }: { x: number; uid: string }) => {
  const outward = x < 50 ? "scale(-1, 1)" : undefined;
  const clipId = `${uid}-ursula-eye-${x}`;
  return (
    <g transform={`translate(${x}, 46)`}>
      <defs>
        <clipPath id={clipId}>
          <path d={`M -12 -12 L 12 -12 L 12 2.6 L ${LOWER_LID.slice(2)} L -12 2.6 Z`} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle r="4.2" fill="#7FA6C9" stroke="currentColor" strokeWidth="1.1" />
        <circle r="2" fill="#1F2933" />
        <circle cx="1.4" cy="-1.5" r="1.2" fill="white" />
      </g>
      <g transform={outward} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -6.2 -0.8 Q -0.5 -6.8, 6.4 -1.6 L 8.4 -3" strokeWidth="2" />
        <path d={LOWER_LID} strokeWidth="1.3" />
        <path d="M 8.8 0.4 L 10.8 0 M 8.4 2.2 L 10.2 2.9" strokeWidth="0.7" strokeOpacity="0.4" />
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
