import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Tapered brow, fuller at the inner end, with a soft arch over the outer half. */
const leftBrow =
  "M 44.6 42.6 C 41.4 40.6, 37 39.6, 33 40 C 30.4 40.3, 28.2 41.4, 26.8 43 C 29 42.4, 31.2 42.3, 33.4 42.4 C 37.2 42.6, 41 43.4, 44 44.4 C 44.8 44.2, 45 43.2, 44.6 42.6 Z";

/** Taupe brows, lower and straighter than a glamour arch. */
const ursulaEyebrows: PartComponent = () => (
  <path d={`${leftBrow} ${mirrorPath(leftBrow)}`} fill="#8A6A52" stroke="#8A6A52" strokeWidth="0.6" strokeLinejoin="round" />
);

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
