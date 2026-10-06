import { PartRegistry, PartComponent, getHead } from "../../../parts/common";

/** Prvy's knit-mask face: glossy round eye openings, a pill mouth, ribbing and a knit-covered nose. Preset-only parts. */
export const PrvyEyesIds = ["prvyEyes"] as const;
export const PrvyMouthIds = ["prvyMouth"] as const;
export const PrvyExtrasIds = ["prvyKnit"] as const;
export const PrvyNoseIds = ["prvyKnitNose"] as const;

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

const preset = { presetOnly: true, isExclusive: true };

export const PrvyEyes: PartRegistry<(typeof PrvyEyesIds)[number]> = {
  prvyEyes: { component: prvyEyes, label: "Prvy Eyes", ...preset },
};
export const PrvyMouths: PartRegistry<(typeof PrvyMouthIds)[number]> = {
  prvyMouth: { component: prvyMouth, label: "Prvy Mouth", ...preset },
};
export const PrvyExtras: PartRegistry<(typeof PrvyExtrasIds)[number]> = {
  prvyKnit: { component: prvyKnit, label: "Prvy Knit", ...preset },
};
export const PrvyNoses: PartRegistry<(typeof PrvyNoseIds)[number]> = {
  prvyKnitNose: { component: prvyKnitNose, label: "Prvy Knit Nose", ...preset },
};
