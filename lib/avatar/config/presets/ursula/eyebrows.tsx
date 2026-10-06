import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Full, softly arched brows in a warm taupe, square at the inner end and tapering to the tail. */
const BROWS = "M 45.3 43.1 C 45.2 42.3, 44.7 41.6, 44 40.9 C 42.4 39.7, 39.6 39.4, 37 38.95 C 34 38.6, 31.4 38.9, 29.7 40 C 28.6 40.8, 27.8 42, 27.2 43.5 C 28 42.9, 29 42, 30.4 41.2 C 32 40.5, 34 40.5, 36.2 41 C 39 41.6, 42 42.2, 45.3 43.1 Z M 55.3 43.1 C 55.4 42.3, 55.9 41.6, 56.6 40.9 C 58.2 39.7, 61 39.4, 63.6 38.95 C 66.6 38.6, 69.2 38.9, 70.9 40 C 72 40.8, 72.8 42, 73.4 43.5 C 72.6 42.9, 71.6 42, 70.2 41.2 C 68.6 40.5, 66.6 40.5, 64.4 41 C 61.6 41.6, 58.6 42.2, 55.3 43.1 Z";

const ursulaEyebrows: PartComponent = () => <path d={BROWS} fill="#805F47" />;

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
