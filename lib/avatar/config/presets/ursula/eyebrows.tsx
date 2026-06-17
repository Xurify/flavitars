import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaEyebrowsIds = ["ursulaEyebrows"] as const;
export type UrsulaEyebrowsId = (typeof UrsulaEyebrowsIds)[number];

const ursulaEyebrows: PartComponent = () => (
  <g opacity="0.85">
    <path
      d="M 44 40.0
         C 39 39.4, 32 39.0, 27 38.0
         C 31 36.9, 38 36.7, 43 38.0
         C 43.6 38.4, 44 39.2, 44 40.0 Z"
      fill="#8A6347"
      stroke="#6A4A33"
      strokeWidth="0.3"
      strokeLinejoin="round"
    />
    <path
      d="M 56 40.0
         C 61 39.4, 68 39.0, 73 38.0
         C 69 36.9, 62 36.7, 57 38.0
         C 56.4 38.4, 56 39.2, 56 40.0 Z"
      fill="#8A6347"
      stroke="#6A4A33"
      strokeWidth="0.3"
      strokeLinejoin="round"
    />
  </g>
);

export const UrsulaEyebrows: PartRegistry<UrsulaEyebrowsId> = {
  ursulaEyebrows: {
    component: ursulaEyebrows,
    label: "Ursula Eyebrows",
    presetOnly: true,
    isExclusive: true,
  },
};
