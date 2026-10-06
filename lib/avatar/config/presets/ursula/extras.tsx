import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

const FOREHEAD = "M 55.2 27.4 C 58.4 26.8, 62.2 27.2, 65 28.6 M 36.9 32.4 C 40.6 31.2, 44.6 31, 47.6 31.6 C 50 32.1, 52.4 32, 54.6 31.5 C 56.2 31.2, 57.6 31, 59 31";
/** Smile folds from the nose wings around the corners of the mouth, and the faint lines below them. */
const FOLDS = "M 43.7 59.6 C 41.4 62, 38.3 65.8, 36.4 69 C 35.6 70.6, 35.6 72.6, 36.3 73.9 M 57.3 59.4 C 59.6 61.8, 62.7 65.6, 64.4 68.6 C 65.3 70.2, 65.3 72.2, 64.7 73.9";
const MARIONETTE = "M 37 73.2 C 36.8 75, 37 76.8, 37.6 78.4 M 64 73.2 C 64.2 75, 64 76.8, 63.4 78.4";

/** Her age lines (two across the forehead, the smile folds and below them) and warm, lifted cheeks. */
const ursulaCheeks: PartComponent = ({ uid = "fv" }) => (
  <g>
    <defs>
      <radialGradient id={`${uid}-ursula-blush`}>
        <stop offset="0" stopColor="#EE8E80" stopOpacity="0.34" />
        <stop offset="1" stopColor="#EE8E80" stopOpacity="0" />
      </radialGradient>
    </defs>
    <g fill={`url(#${uid}-ursula-blush)`}>
      <ellipse cx="32.4" cy="59.4" rx="5.6" ry="3.6" />
      <ellipse cx="68.4" cy="59.4" rx="5.6" ry="3.6" />
    </g>
    <g fill="none" stroke="#C4947C" strokeLinecap="round">
      <path d={FOREHEAD} strokeWidth="0.85" strokeOpacity="0.65" />
      <path d={FOLDS} strokeWidth="1" strokeOpacity="0.68" />
      <path d={MARIONETTE} strokeWidth="0.85" strokeOpacity="0.36" />
    </g>
  </g>
);

export const UrsulaExtras: PartRegistry<UrsulaExtrasId> = {
  ursulaCheeks: {
    component: ursulaCheeks,
    label: "Ursula Cheeks",
    presetOnly: true,
    isExclusive: true,
  },
};
