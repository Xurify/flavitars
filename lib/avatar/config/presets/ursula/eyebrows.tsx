import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Tapered brow, fuller at the inner end, arching gently towards the outer end. */
const leftBrow =
  "M 44.6 37.2 C 41.4 34.6, 36.6 33.2, 32.4 33.8 C 29.8 34.2, 27.8 35.4, 26.6 37 C 28.8 36.2, 31 35.9, 33 36 C 37 36.2, 41 37.4, 44 38.8 C 44.8 38.6, 45 37.7, 44.6 37.2 Z";

/** Light brown, softly lifted brows: open and engaged rather than stern. */
const ursulaEyebrows: PartComponent = () => (
  <path d={`${leftBrow} ${mirrorPath(leftBrow)}`} fill="#94704F" stroke="#94704F" strokeWidth="0.6" strokeLinejoin="round" />
);

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
