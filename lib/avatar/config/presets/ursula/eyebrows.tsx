import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Fairly straight brown brows, set close to the eyes, with a slight arch towards the outer end. */
const leftBrow = "M 44.5 39.2 C 41 37.8, 36.5 36.8, 32.5 37 C 30 37.2, 28 37.8, 26.8 38.8 C 29 38.6, 31.5 38.7, 34 38.9 C 37.5 39.2, 41 39.8, 43.8 40.4 C 44.4 40.4, 44.6 39.6, 44.5 39.2 Z";

const ursulaEyebrows: PartComponent = () => (
  <path d={`${leftBrow} ${mirrorPath(leftBrow)}`} fill="#8B6A4A" stroke="#6F5239" strokeWidth="0.3" strokeLinejoin="round" opacity="0.9" />
);

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
