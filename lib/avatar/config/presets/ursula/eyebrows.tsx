import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

/** Thick, softly arched brows in a warm taupe, full and rounded at the inner end, tapering to the tail. */
const BROWS = "M 45.2 42.85 C 45.6 41.9, 45.3 40.85, 44.3 40.15 C 42.6 38.95, 39.8 38.55, 37 38.2 C 34 37.85, 31.2 38, 29.4 39.2 C 28.2 40, 27.4 41.45, 26.9 43.2 C 27.8 42.4, 28.8 41.5, 30.2 40.95 C 32 40.3, 34.2 40.4, 36.4 40.8 C 39.2 41.3, 42 42, 44 42.8 C 44.5 43, 44.9 43, 45.2 42.85 Z M 55.4 42.85 C 55 41.9, 55.3 40.85, 56.3 40.15 C 58 38.95, 60.8 38.55, 63.6 38.2 C 66.6 37.85, 69.4 38, 71.2 39.2 C 72.4 40, 73.2 41.45, 73.7 43.2 C 72.8 42.4, 71.8 41.5, 70.4 40.95 C 68.6 40.3, 66.4 40.4, 64.2 40.8 C 61.4 41.3, 58.6 42, 56.6 42.8 C 56.1 43, 55.7 43, 55.4 42.85 Z";

const ursulaEyebrows: PartComponent = () => <path d={BROWS} fill="#805F47" />;

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
