import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Thick, softly arched brows in a warm taupe, full and rounded at the inner end, tapering to the tail. */
const BROWS = "M 45.2 43.35 C 45.6 42.4, 45.3 41.35, 44.3 40.65 C 42.6 39.45, 39.8 39.05, 37 38.7 C 34 38.35, 31.2 38.5, 29.4 39.7 C 28.2 40.5, 27.4 41.95, 26.9 43.7 C 27.8 42.9, 28.8 42, 30.2 41.45 C 32 40.8, 34.2 40.9, 36.4 41.3 C 39.2 41.8, 42 42.5, 44 43.3 C 44.5 43.5, 44.9 43.5, 45.2 43.35 Z M 55.4 43.35 C 55 42.4, 55.3 41.35, 56.3 40.65 C 58 39.45, 60.8 39.05, 63.6 38.7 C 66.6 38.35, 69.4 38.5, 71.2 39.7 C 72.4 40.5, 73.2 41.95, 73.7 43.7 C 72.8 42.9, 71.8 42, 70.4 41.45 C 68.6 40.8, 66.4 40.9, 64.2 41.3 C 61.4 41.8, 58.6 42.5, 56.6 43.3 C 56.1 43.5, 55.7 43.5, 55.4 43.35 Z";

const ursulaEyebrows: PartComponent = () => <path d={BROWS} fill="#805F47" />;

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
