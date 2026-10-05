import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Tapered brow, fuller at the inner end, nearly straight with a slight dip at the outer end. */
const leftBrow =
  "M 44.6 39 C 41 37.2, 36.4 36.4, 32.4 36.8 C 30 37, 28 37.8, 26.6 39.2 C 28.8 38.8, 31 38.8, 33 39 C 37 39.3, 41 39.9, 44 40.8 C 44.8 40.6, 45 39.6, 44.6 39 Z";

/** Medium-brown brows set close to the eyes. */
const ursulaEyebrows: PartComponent = () => (
  <path d={`${leftBrow} ${mirrorPath(leftBrow)}`} fill="#8A6648" stroke="#8A6648" strokeWidth="0.6" strokeLinejoin="round" />
);

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
