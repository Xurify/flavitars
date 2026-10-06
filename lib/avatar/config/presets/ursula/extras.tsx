import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

const FOREHEAD = "M 55.2 27.4 C 58.4 26.8, 62.2 27.2, 65 28.6 M 36.9 32.4 C 40.6 31.2, 44.6 31, 47.6 31.6 C 50 32.1, 52.4 32, 54.6 31.5 C 56.2 31.2, 57.6 31, 59 31";
const FOLDS = "M 43.5 59.4 C 40.9 61.6, 37.4 65.4, 35.5 68.8 C 34.6 70.6, 34.8 72.8, 35.6 74.4 M 57.5 59.2 C 60.1 61.6, 63.6 65.4, 65.3 68.6 C 66.2 70.4, 66.2 72.6, 65.4 74.4";
const MARIONETTE = "M 37 75.6 C 37 77, 37.4 78.4, 38.2 79.6 M 64 75.6 C 64 77, 63.6 78.4, 62.8 79.6";

/** Her age lines (two across the forehead, the smile folds and below them) and warm, lifted cheeks. */
const ursulaCheeks: PartComponent = ({ uid = "fv" }) => (
  <g>
    <defs>
      <radialGradient id={`${uid}-ursula-blush`}>
        <stop offset="0" stopColor="#EE8E80" stopOpacity="0.4" />
        <stop offset="1" stopColor="#EE8E80" stopOpacity="0" />
      </radialGradient>
    </defs>
    <g fill={`url(#${uid}-ursula-blush)`}>
      <ellipse cx="32.8" cy="58.6" rx="5.6" ry="3.6" />
      <ellipse cx="68" cy="58.6" rx="5.6" ry="3.6" />
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
