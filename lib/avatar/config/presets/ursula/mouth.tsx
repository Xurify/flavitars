import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

/** A wide closed smile, traced from the reference with the corners lifted a little higher. */
const LINE = "M 36.8 70.3 C 38.4 71.6, 40.6 72.6, 43.4 73.1 C 46 73.6, 48.4 73.8, 50.5 73.8 C 52.6 73.8, 55 73.6, 57.6 73.1 C 60.4 72.6, 62.6 71.6, 64 70.2";
const UPPER_LIP = "M 39.6 71.98 C 41.4 71, 43.8 70.4, 46.2 70.4 C 47.8 70.4, 49.3 70.9, 50.5 71.3 C 51.7 70.9, 53.2 70.4, 54.8 70.4 C 57.2 70.4, 59.6 71, 61.4 71.95 C 60.31 72.46, 59.03 72.84, 57.6 73.1 C 55 73.6, 52.6 73.8, 50.5 73.8 C 48.4 73.8, 46 73.6, 43.4 73.1 C 41.98 72.85, 40.71 72.46, 39.6 71.98 Z";
const LOWER_LIP = "M 40.4 72.3 C 41.31 72.63, 42.31 72.91, 43.4 73.1 C 46 73.6, 48.4 73.8, 50.5 73.8 C 52.6 73.8, 55 73.6, 57.6 73.1 C 58.7 72.9, 59.7 72.63, 60.6 72.29 C 59.6 74.6, 57 76.5, 53.8 77.1 C 52.6 77.3, 51.4 77.35, 50.5 77.35 C 49.6 77.35, 48.4 77.3, 47.2 77.1 C 44 76.5, 41.4 74.6, 40.4 72.3 Z";

const ursulaSmile: PartComponent = () => (
  <g>
    <path d={LOWER_LIP} fill="#C27A73" />
    <path d={UPPER_LIP} fill="#B86F69" />
    <ellipse cx="53.2" cy="75.7" rx="1.8" ry="0.62" fill="#EBA99E" />
    <path d={LINE} fill="none" stroke="#45201A" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

export const UrsulaMouths: PartRegistry<UrsulaMouthId> = {
  ursulaSmile: {
    component: ursulaSmile,
    label: "Ursula Smile",
    presetOnly: true,
    isExclusive: true,
  },
};
