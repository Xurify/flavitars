import { PartRegistry, PartComponent } from "../../../parts/common";

export const UrsulaMouthIds = ["ursulaSmile"] as const;
export type UrsulaMouthId = (typeof UrsulaMouthIds)[number];

/** Her wide, warm smile: rose lips, top teeth showing, little creases at the corners. */
const ursulaSmile: PartComponent = () => (
  <g transform="translate(50, 77)">
    <path
      d="M -11.5 -2.2 Q -6 -4.6, 0 -3.4 Q 6 -4.6, 11.5 -2.2 Q 6.8 5.2, 0 5.6 Q -6.8 5.2, -11.5 -2.2 Z"
      fill="#D06A82"
      stroke="#A8485F"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <path d="M -9.6 -1.5 Q 0 0.3, 9.6 -1.5 Q 5.6 2.9, 0 3.2 Q -5.6 2.9, -9.6 -1.5 Z" fill="#8A4350" />
    <path d="M -9 -1.3 Q 0 0.5, 9 -1.3 Q 5.3 2, 0 2.3 Q -5.3 2, -9 -1.3 Z" fill="#FDFBF7" />
    <g stroke="#C9B5B0" strokeWidth="0.3" opacity="0.5" strokeLinecap="round">
      <line x1="0" y1="0.5" x2="0" y2="2.2" />
      <line x1="-3.1" y1="0.1" x2="-3.2" y2="1.9" />
      <line x1="3.1" y1="0.1" x2="3.2" y2="1.9" />
    </g>
    <path d="M -11.5 -2.2 q -1.2 -0.9 -1.5 -2.3 M 11.5 -2.2 q 1.2 -0.9 1.5 -2.3" fill="none" stroke="#A8485F" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
    <path d="M -4 4 Q 0 4.8, 4 4" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
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
