import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

const leftFold = "M 44.4 64 C 41.4 66, 39.4 69.4, 38.6 73.6";

/** The lines of the reference: across the forehead, under the eyes and from nose to mouth. */
const ursulaCheeks: PartComponent = () => (
  <g fill="none" stroke="#9C7466" strokeLinecap="round">
    <path d="M 38 28.4 Q 46 26.8, 56 27.6 M 41 31.4 Q 49 30.4, 58 31.2" strokeWidth="0.7" opacity="0.35" />
    <path d={`${leftFold} ${mirrorPath(leftFold)}`} strokeWidth="0.9" opacity="0.4" />
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
