import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

/** Closed-lip smile in rose lipstick: thin upper lip, fuller lower lip, corners lifted. */
const ursulaSmile: PartComponent = () => (
  <g transform="translate(50, 77)">
    <path
      d="M -10.5 -1.8 Q -5.5 -4.6, 0 -2.8 Q 5.5 -4.6, 10.5 -1.8 Q 5.8 4.6, 0 4.9 Q -5.8 4.6, -10.5 -1.8 Z"
      fill="#C55267"
      stroke="#963648"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <path d="M -10.5 -1.8 Q 0 1.4, 10.5 -1.8" fill="none" stroke="#7A2536" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M -10.5 -1.8 q -0.9 -0.5 -1.3 -1.4 M 10.5 -1.8 q 0.9 -0.5 1.3 -1.4" fill="none" stroke="#963648" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
    <path d="M -3.6 2.8 Q 0 3.6, 3.6 2.8" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
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
