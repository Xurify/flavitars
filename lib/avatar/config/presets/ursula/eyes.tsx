import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyesIds = ["ursulaEyes"] as const;
export type UrsulaEyesId = (typeof UrsulaEyesIds)[number];

/* Drawn around the iris centre with +x pointing away from the nose (the left eye is mirrored). */
const OPENING = "M -6 1.9 C -4.6 0.85, -2.9 -0.95, 0 -0.98 C 2.4 -0.95, 4.3 0.55, 5.6 1.6 C 3.6 1.9, 1.6 2.2, 0 2.2 C -2.2 2.2, -4.2 2, -6 1.9 Z";
/** Heavy upper lid: thin toward the nose, thickest over the iris, ending in a short wing. */
const LID =
  "M -6.7 1.5 C -5.5 0.2, -3.9 -1.3, -2.3 -2.25 C -1.2 -2.85, 0.8 -3, 2.4 -2.5 C 4.4 -1.75, 6.3 -0.3, 8 0.95 C 7.3 1.4, 6.4 1.65, 5.6 1.6 C 4.3 0.55, 2.4 -0.95, 0 -0.98 C -2.9 -0.95, -4.6 0.85, -5.9 2.05 C -6.3 2.25, -6.9 2, -6.7 1.5 Z";
/** The crease that splits off the lid toward the nose. */
const CREASE = "M -2.2 -2.45 C -3.6 -2.05, -5 -1.35, -6.1 -0.3";
/** Lower lid pushed up by the smile, the softer line under it, and crow's feet. */
const LOWER_LID = "M -4.8 2.35 C -1.6 3.05, 1.6 3.05, 4.8 2.2";
/** Shadow the lid casts on the eye. */
const LID_SHADOW = "M -6 1.9 C -4.6 0.85, -2.9 -0.95, 0 -0.98 C 2.4 -0.95, 4.3 0.55, 5.6 1.6";
const SMILE_LINES = "M -4.4 4.3 C -1.8 5.3, 1.2 5.6, 3.4 5.4 M 7 2.1 L 9.6 1.6 M 6.9 3.6 L 9.1 4.4 M 6.1 5 L 7.9 6.3";

/**
 * Her eyes from the reference: a heavy, winged upper lid with a crease splitting off toward the
 * nose, grey-blue irises tucked under it, and smile lines below. No lashes.
 */
const UrsulaEye = ({ x, uid }: { x: number; uid: string }) => {
  const outward = x < 50 ? "scale(-1, 1)" : undefined;
  const clipId = `${uid}-ursula-eye-${x}`;
  return (
    <g transform={`translate(${x}, 46.6)`}>
      <defs>
        <clipPath id={clipId}>
          <path d={OPENING} transform={outward} />
        </clipPath>
      </defs>
      <g transform={outward} fill="none" stroke="#C4947C" strokeLinecap="round">
        <path d={LOWER_LID} strokeWidth="1.3" strokeOpacity="0.5" />
        <path d={SMILE_LINES} strokeWidth="0.7" strokeOpacity="0.45" />
      </g>
      <path d={OPENING} transform={outward} fill="#F8F5F2" />
      <g clipPath={`url(#${clipId})`}>
        <circle r="2.4" fill="#6B7A80" />
        <circle r="1.05" fill="#1A1C1D" />
        <circle cx="0.85" cy="-0.45" r="0.48" fill="white" />
        <path d={LID_SHADOW} transform={outward} fill="none" stroke="black" strokeOpacity="0.18" strokeWidth="1.1" />
      </g>
      <g transform={outward}>
        <path d={LID} fill="currentColor" />
        <path d={CREASE} fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" />
      </g>
    </g>
  );
};

const ursulaEyes: PartComponent = ({ uid = "fv" }) => (
  <g>
    <UrsulaEye x={37.2} uid={uid} />
    <UrsulaEye x={63.6} uid={uid} />
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
