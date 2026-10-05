import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

/** Her calm closed smile: thin, muted rose lips with the corners gently lifted. */
const ursulaSmile: PartComponent = () => (
  <g transform="translate(50, 77)">
    <path
      d="M -10 -1.6 Q -5 -3.2, -1.4 -2.4 Q 0 -2, 1.4 -2.4 Q 5 -3.2, 10 -1.6 Q 5.6 3.6, 0 3.8 Q -5.6 3.6, -10 -1.6 Z"
      fill="#C98089"
    />
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M -10.8 -2 Q 0 2.2, 10.8 -2" strokeWidth="1.4" />
      <path d="M -10.8 -2 Q -12 -2.4, -12.6 -3.4 M 10.8 -2 Q 12 -2.4, 12.6 -3.4" strokeWidth="0.9" strokeOpacity="0.5" />
      <path d="M -4.6 3.6 Q 0 4.8, 4.6 3.6" strokeWidth="0.9" strokeOpacity="0.3" />
    </g>
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
