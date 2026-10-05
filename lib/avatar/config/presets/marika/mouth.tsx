import { PartRegistry, PartComponent } from "../../../parts/common";

export const MarikaMouthIds = ["marikaDefinedRedSmile", "marikaAtelier"] as const;

export type MarikaMouthId = (typeof MarikaMouthIds)[number];

const marikaDefinedRedSmile: PartComponent = () => (
  <g transform="translate(50, 78)">
    <path
      d="M -12.5 -2 Q -6.5 -5.8, 0 -3.4 Q 6.5 -5.8, 12.5 -2 Q 7 7.2, 0 7.4 Q -7 7.2, -12.5 -2 Z"
      fill="#CF3448"
      stroke="#93182B"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path d="M -10.2 -1.4 Q 0 0.6, 10.2 -1.4 Q 6 4, 0 4.4 Q -6 4, -10.2 -1.4 Z" fill="#5E1020" />
    <path d="M -9.6 -1.2 Q 0 0.7, 9.6 -1.2 Q 6 2.4, 0 2.7 Q -6 2.4, -9.6 -1.2 Z" fill="white" />
    <path d="M -4.5 5.6 Q 0 6.5, 4.5 5.6" fill="none" stroke="white" opacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
  </g>
);

const marikaAtelier: PartComponent = () => (
  <g transform="translate(50, 78)">
    <path d="M -13 -1 Q -7 -5, 0 -2 Q 7 -5, 13 -1" fill="#D90429" stroke="#9B2226" strokeWidth="1" />

    <path d="M -10 -0.5 Q 0 1, 10 -0.5 L 8 2 Q 0 3, -8 2 Z" fill="#4A0404" />

    <path d="M -12 2 Q 0 9, 12 2 Q 12 2, 8 2 Q 0 3, -8 2" fill="#D90429" stroke="#9B2226" strokeWidth="1" />

    <path d="M -6 5 Q 0 6, 6 5" fill="none" stroke="white" opacity="0.35" strokeWidth="2" strokeLinecap="round" />
    <circle cx="-5" cy="4" r="1" fill="white" opacity="0.4" />
  </g>
);

export const MarikaMouths: PartRegistry<MarikaMouthId> = {
  marikaDefinedRedSmile: {
    component: marikaDefinedRedSmile,
    label: "Marika Red Smile",
    presetOnly: true,
    isExclusive: true,
  },
  marikaAtelier: { component: marikaAtelier, label: "Marika Atelier", presetOnly: true, isExclusive: true },
};
