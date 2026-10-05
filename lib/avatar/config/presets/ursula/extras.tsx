import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

const leftFold = "M 43.6 61 C 41.4 63, 40.2 66, 40 69.4";

/** Lines that give her age without drooping: across the forehead and from nose to mouth. */
const ursulaCheeks: PartComponent = () => (
  <g fill="none" stroke="#7A5C54" strokeLinecap="round">
    <path d="M 40 29.5 Q 50 28.4, 60 29.5 M 42 32.4 Q 50 31.5, 58 32.4" strokeWidth="0.6" opacity="0.25" />
    <path d={`${leftFold} ${mirrorPath(leftFold)}`} strokeWidth="0.8" opacity="0.3" />
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
