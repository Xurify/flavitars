import { PartRegistry, PartComponent, getHead } from "../../../parts/common";

/** Prvy's knit-mask face: solid round eyes, a pill mouth, ribbing, no nose. Preset-only parts. */
export const PrvyEyesIds = ["prvyEyes"] as const;
export const PrvyMouthIds = ["prvyMouth"] as const;
export const PrvyExtrasIds = ["prvyKnit"] as const;
export const PrvyNoseIds = ["prvyNoNose"] as const;

const prvyEyes: PartComponent = () => (
  <g fill="currentColor">
    <circle cx="35" cy="46" r="5.6" />
    <circle cx="65" cy="46" r="5.6" />
  </g>
);

const prvyMouth: PartComponent = () => <rect x="40" y="71" width="20" height="9" rx="4.5" fill="currentColor" />;

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
  prvyNoNose: { component: () => null, label: "No Nose", ...preset },
};
