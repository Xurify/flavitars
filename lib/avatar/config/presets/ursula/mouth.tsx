import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

/** Closed-lip smile: thin dusty-rose lips, corners turned up. */
const ursulaSmile: PartComponent = () => (
  <g transform="translate(50, 77)">
    <path
      d="M -10.5 -1.6 Q -5.5 -3.6, 0 -2.4 Q 5.5 -3.6, 10.5 -1.6 Q 5.8 3, 0 3.3 Q -5.8 3, -10.5 -1.6 Z"
      fill="#CF8A95"
      stroke="#A8606E"
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    <path d="M -10.5 -1.6 Q 0 0.6, 10.5 -1.6" fill="none" stroke="#8F4B58" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M -10.5 -1.6 q -1 -0.7 -1.3 -1.9 M 10.5 -1.6 q 1 -0.7 1.3 -1.9" fill="none" stroke="#A8606E" strokeWidth="0.55" strokeLinecap="round" opacity="0.7" />
    <path d="M -3.5 1.8 Q 0 2.5, 3.5 1.8" fill="none" stroke="white" strokeWidth="0.9" strokeLinecap="round" opacity="0.3" />
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
