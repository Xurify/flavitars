import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

const leftFold = "M 43.5 56 C 42.4 60, 41.4 63.5, 39.6 67";

/** Faint lines that age the face: two across the forehead and the folds from nose to mouth. */
const ursulaCheeks: PartComponent = () => (
  <g fill="none" stroke="#8A6E66" strokeLinecap="round">
    <path d="M 38 32.5 Q 50 31.2, 62 32.5 M 40 35.2 Q 50 34.2, 60 35.2" strokeWidth="0.5" opacity="0.16" />
    <path d={`${leftFold} ${mirrorPath(leftFold)}`} strokeWidth="0.65" opacity="0.26" />
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
