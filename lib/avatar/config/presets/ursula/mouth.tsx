import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

/** Her warm, confident closed smile: rose lips curving up at the corners, which tuck into dimples. */
const ursulaSmile: PartComponent = () => (
  <g transform="translate(50, 75)">
    <path
      d="M -11.5 -3.6 Q -6 -4, -1.6 -2.6 Q 0 -2, 1.6 -2.6 Q 6 -4, 11.5 -3.6 Q 6.6 4, 0 4.2 Q -6.6 4, -11.5 -3.6 Z"
      fill="#D46A82"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M -11.5 -3.6 Q 0 3, 11.5 -3.6" strokeWidth="1.3" />
      <path d="M -11.5 -3.6 Q -13 -3.8, -13.6 -5.2 M 11.5 -3.6 Q 13 -3.8, 13.6 -5.2" strokeWidth="1" strokeOpacity="0.6" />
    </g>
    <path d="M -3.2 2.6 Q 0 3.3, 3.2 2.6" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
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
