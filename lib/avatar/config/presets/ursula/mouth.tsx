import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

/** Her broad closed smile: an ink smile line with thin rose lips around it, the corners lifted. */
const ursulaSmile: PartComponent = () => (
  <g transform="translate(50, 77)">
    <path
      d="M -11.5 -3.4 Q -6 -4.6, -1.6 -3.8 Q 0 -3.2, 1.6 -3.8 Q 6 -4.6, 11.5 -3.4 Q 6.5 3.2, 0 3.4 Q -6.5 3.2, -11.5 -3.4 Z"
      fill="#D4637C"
    />
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M -12.2 -3.8 Q 0 1.4, 12.2 -3.8" strokeWidth="1.5" />
      <path d="M -12.2 -3.8 q -0.9 -0.4 -1.4 -1.3 M 12.2 -3.8 q 0.9 -0.4 1.4 -1.3" strokeWidth="0.9" strokeOpacity="0.5" />
      <path d="M -5.5 3.1 Q 0 4.3, 5.5 3.1" strokeWidth="0.9" strokeOpacity="0.3" />
    </g>
    <path d="M -3 2 Q 0 2.6, 3 2" fill="none" stroke="white" strokeWidth="0.9" strokeLinecap="round" opacity="0.35" />
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
