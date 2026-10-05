import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

const leftFold = "M 43 58.5 C 40 60.5, 38.2 64, 37.8 68.5";

/** Smile lines framing the mouth and two faint lines across the forehead. */
const ursulaCheeks: PartComponent = () => (
  <g fill="none" stroke="#7A5C54" strokeLinecap="round">
    <path d="M 40 31 Q 50 29.8, 60 31 M 42 33.8 Q 50 32.9, 58 33.8" strokeWidth="0.5" opacity="0.18" />
    <path d={`${leftFold} ${mirrorPath(leftFold)}`} strokeWidth="0.9" opacity="0.35" />
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
