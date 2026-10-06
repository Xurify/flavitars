import { PartRegistry, PartComponent, getHead } from "../../../parts/common";

/**
 * Prvy, masked and unmasked. The mask's eye and mouth openings sit exactly where her own eyes and
 * mouth are, so both looks read as the same face. Preset-only parts.
 */
export const PrvyEyesIds = ["prvyEyes", "prvyLashEyes"] as const;
export const PrvyEyebrowsIds = ["prvyBrows"] as const;
export const PrvyMouthIds = ["prvyMouth", "prvyOh"] as const;
export const PrvyExtrasIds = ["prvyKnit", "prvyBlush"] as const;
export const PrvyNoseIds = ["prvyKnitNose", "prvyNose"] as const;

const EYE_Y = 45;
const MOUTH_Y = 70;

const prvyEyes: PartComponent = () => (
  <g fill="currentColor">
    <ellipse cx="35" cy={EYE_Y} rx="5.6" ry="6" />
    <ellipse cx="65" cy={EYE_Y} rx="5.6" ry="6" />
    <g fill="white" opacity="0.85">
      <circle cx="36.8" cy={EYE_Y - 2.2} r="1.3" />
      <circle cx="66.8" cy={EYE_Y - 2.2} r="1.3" />
    </g>
  </g>
);

const prvyMouth: PartComponent = () => <rect x="42" y={MOUTH_Y - 3.6} width="16" height="7.2" rx="3.6" fill="currentColor" />;

/** The knit stretched over her nose: no outline, just the shadow the bump casts. */
const prvyKnitNose: PartComponent = () => (
  <g fill="none" strokeLinecap="round">
    <path d="M 46.6 60.4 Q 50 62.6, 53.4 60.4" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" />
    <path d="M 50.6 51 Q 51.4 55, 51.2 58" stroke="white" strokeOpacity="0.35" strokeWidth="1.4" />
  </g>
);

/** Extras are drawn in face space, so the head outline is shifted back by the face offset to clip. */
const prvyKnit: PartComponent = ({ headId, uid = "fv" }) => {
  const head = getHead(headId);
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-prvy-knit`}>
          <path d={head.path} transform={`translate(0, ${-head.faceOffset})`} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-prvy-knit)`} stroke="black" strokeOpacity="0.07" strokeWidth="1.4">
        <path d="M 30 0 V 100 M 40 0 V 100 M 50 0 V 100 M 60 0 V 100 M 70 0 V 100" />
      </g>
    </g>
  );
};

/** Determined eyes: a heavy lid that dips toward the nose, a winged flick and warm brown irises. */
const PrvyEye = ({ x }: { x: number }) => {
  const outward = x < 50 ? "scale(-1, 1)" : undefined;
  return (
    <g transform={`translate(${x}, ${EYE_Y})`}>
      <circle r="4.6" fill="#7A4A2B" stroke="currentColor" strokeWidth="1.2" />
      <circle r="2.1" fill="#1F1512" />
      <circle cx="1.6" cy="-1.7" r="1.5" fill="white" />
      <circle cx="-1.5" cy="1.6" r="0.6" fill="white" opacity="0.6" />
      <g transform={outward} fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
        <path d="M -6.2 -1.4 C -4 -5.6, 2.6 -6.8, 6.2 -3.4" fill="none" strokeWidth="2.6" />
        <path d="M 5.4 -4.2 L 9.8 -6.4 L 6.4 -2.4 Z" strokeWidth="0.8" />
        <path d="M 2.6 -5.6 L 4.4 -8.4 L 4 -5.2 Z M -0.2 -6 L 0.8 -9 L 1.2 -5.8 Z" strokeWidth="0.6" />
        <path d="M -3.4 5.6 Q 0 6.8, 3.6 5.4" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.9" />
      </g>
    </g>
  );
};

const prvyLashEyes: PartComponent = () => (
  <g>
    <PrvyEye x={35} />
    <PrvyEye x={65} />
  </g>
);

const BROW = "M 57.6 36.6 C 61.4 34.6, 66.4 33.4, 71.4 33.6 C 72.2 33.7, 72.3 34.5, 71.6 34.8 C 67 35.2, 62.4 36.4, 58.6 38.2 C 57.6 38.6, 56.9 37.2, 57.6 36.6 Z";

const prvyBrows: PartComponent = () => (
  <g fill="currentColor">
    <path d={BROW} />
    <path d={BROW} transform="translate(100, 0) scale(-1, 1)" />
  </g>
);

/** Her L-shaped nose, rounded off, with a soft shadow down the bridge. */
const prvyNose: PartComponent = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 46.8 54 Q 46.3 57, 46.6 59.4" strokeOpacity="0.15" strokeWidth="1.2" />
    <path d="M 49.8 52.6 C 49.6 55.4, 48.9 57.6, 48.7 59.2 C 48.5 60.8, 49.5 61.5, 51 61.3 C 52 61.2, 52.8 60.8, 53.4 60.2" strokeWidth="2" />
  </g>
);

/** A small, relaxed "oh": the same opening the mask's mouth hole shows. */
const prvyOh: PartComponent = () => (
  <g transform={`translate(50, ${MOUTH_Y})`}>
    <ellipse rx="5.4" ry="3.6" fill="#B85B62" stroke="currentColor" strokeWidth="1.9" />
    <ellipse cy="-0.5" rx="3.3" ry="1.6" fill="#4A1A22" />
    <ellipse cx="1.6" cy="2" rx="1.4" ry="0.45" fill="white" opacity="0.45" />
  </g>
);

const prvyBlush: PartComponent = () => (
  <g fill="#E0705E" opacity="0.28">
    <ellipse cx="30" cy="56" rx="5" ry="2.6" />
    <ellipse cx="70" cy="56" rx="5" ry="2.6" />
  </g>
);

const preset = { presetOnly: true, isExclusive: true };

export const PrvyEyes: PartRegistry<(typeof PrvyEyesIds)[number]> = {
  prvyEyes: { component: prvyEyes, label: "Prvy Mask Eyes", ...preset },
  prvyLashEyes: { component: prvyLashEyes, label: "Prvy Eyes", ...preset },
};
export const PrvyEyebrows: PartRegistry<(typeof PrvyEyebrowsIds)[number]> = {
  prvyBrows: { component: prvyBrows, label: "Prvy Brows", ...preset },
};
export const PrvyMouths: PartRegistry<(typeof PrvyMouthIds)[number]> = {
  prvyMouth: { component: prvyMouth, label: "Prvy Mask Mouth", ...preset },
  prvyOh: { component: prvyOh, label: "Prvy Oh", ...preset },
};
export const PrvyExtras: PartRegistry<(typeof PrvyExtrasIds)[number]> = {
  prvyKnit: { component: prvyKnit, label: "Prvy Knit", ...preset },
  prvyBlush: { component: prvyBlush, label: "Prvy Blush", ...preset },
};
export const PrvyNoses: PartRegistry<(typeof PrvyNoseIds)[number]> = {
  prvyKnitNose: { component: prvyKnitNose, label: "Prvy Knit Nose", ...preset },
  prvyNose: { component: prvyNose, label: "Prvy Nose", ...preset },
};
