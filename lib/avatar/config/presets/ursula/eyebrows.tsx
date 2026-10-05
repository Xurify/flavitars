import { PartRegistry, PartComponent } from "../../../parts/common";
import { mirrorPath } from "../../../anatomy";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Light, softly arched brows with the peak towards the outer end; tapered, never stern. */
const leftBrow = "M 44.2 39.4 C 41 37.6, 36.5 36.2, 32.6 36.6 C 30.2 36.9, 28.3 37.6, 27 38.6 C 29.2 38.2, 31.4 38.2, 33.6 38.4 C 37.2 38.7, 40.8 39.4, 43.6 40.4 C 44.2 40.4, 44.4 39.8, 44.2 39.4 Z";

const ursulaEyebrows: PartComponent = () => (
  <path d={`${leftBrow} ${mirrorPath(leftBrow)}`} fill="#A47C58" stroke="#8A6546" strokeWidth="0.3" strokeLinejoin="round" opacity="0.9" />
);

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
