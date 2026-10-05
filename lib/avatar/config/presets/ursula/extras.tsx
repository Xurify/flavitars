import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaExtrasIds = ["ursulaCheeks"] as const;
export type UrsulaExtrasId = (typeof UrsulaExtrasIds)[number];

const leftFold = "M 43.5 59 C 41 60.8, 39.6 63.4, 39.2 66.8";

/** A soft warm flush on the cheeks and faint smile lines from the nose. */
const ursulaCheeks: PartComponent = () => (
  <g>
    <g fill="#F2A08C" opacity="0.14" filter="blur(2px)">
      <circle cx="31" cy="57" r="6" />
      <circle cx="69" cy="57" r="6" />
    </g>
    <path d={`${leftFold} ${mirrorPath(leftFold)}`} fill="none" stroke="#7A5C54" strokeWidth="0.7" strokeLinecap="round" opacity="0.22" />
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
