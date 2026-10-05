import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Medium-brown brows, fuller at the inner end, with a soft arch towards the outer end. */
const leftBrow =
  "M 44.6 38.6 C 41.5 36.4, 37 34.8, 32.8 35 C 30.2 35.1, 28.2 35.9, 26.8 37.2 C 29 36.9, 31.4 37, 33.6 37.4 C 37.4 38, 41 39.2, 43.8 40.4 C 44.6 40.3, 45 39.3, 44.6 38.6 Z";

const ursulaEyebrows: PartComponent = () => (
  <path d={`${leftBrow} ${mirrorPath(leftBrow)}`} fill="#7E5D40" stroke="#5E4430" strokeWidth="0.4" strokeLinejoin="round" />
);

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
