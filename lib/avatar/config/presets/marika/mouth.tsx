import { PartRegistry, PartComponent } from "../../../parts/common";

export const MarikaMouthIds = ["marikaRedSmile", "marikaDefinedRedSmile", "marikaAtelier"] as const;

export type MarikaMouthId = (typeof MarikaMouthIds)[number];

/** Full red lips, closed, with a sharp cupid's bow; the corners only just lift. */
const marikaRedSmile: PartComponent = () => (
  <g transform="translate(50, 78)">
    <path
      d="M -12 -0.6 C -8.5 -1.6, -5.2 -4.4, -2.3 -4.3 Q -1 -4.2, 0 -3.1 Q 1 -4.2, 2.3 -4.3 C 5.2 -4.4, 8.5 -1.6, 12 -0.6 C 7 0.2, 3 0, 0 0.5 C -3 0, -7 0.2, -12 -0.6 Z"
      fill="#C51F31"
    />
    <path
      d="M -12 -0.6 C -7 0.2, -3 0, 0 0.5 C 3 0, 7 0.2, 12 -0.6 C 9.2 3.6, 4.6 5.6, 0 5.7 C -4.6 5.6, -9.2 3.6, -12 -0.6 Z"
      fill="#D9303F"
    />
    <path
      d="M -12 -0.6 C -8.5 -1.6, -5.2 -4.4, -2.3 -4.3 Q -1 -4.2, 0 -3.1 Q 1 -4.2, 2.3 -4.3 C 5.2 -4.4, 8.5 -1.6, 12 -0.6 C 9.2 3.6, 4.6 5.6, 0 5.7 C -4.6 5.6, -9.2 3.6, -12 -0.6 Z"
      fill="none"
      stroke="#9E1E2C"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <path d="M -12 -0.6 C -7 0.2, -3 0, 0 0.5 C 3 0, 7 0.2, 12 -0.6" fill="none" stroke="#7E1320" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M -12 -0.6 q -0.8 -0.3 -1.2 -1 M 12 -0.6 q 0.8 -0.3 1.2 -1" fill="none" stroke="#9E1E2C" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
    <path d="M -4.5 2.9 Q 0 4.1, 4.5 2.9" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    <path d="M -2.6 -3.4 Q -1.2 -3.2, -0.6 -2.4" fill="none" stroke="white" strokeWidth="0.6" strokeLinecap="round" opacity="0.3" />
  </g>
);

/** Warm berry smile showing the top teeth. */
const marikaDefinedRedSmile: PartComponent = () => (
  <g transform="translate(50, 78)">
    <path
      d="M -11.5 -2.4 Q -6 -5.4, 0 -3.6 Q 6 -5.4, 11.5 -2.4 Q 6.5 5.8, 0 6.1 Q -6.5 5.8, -11.5 -2.4 Z"
      fill="#C2485C"
      stroke="#8E2F42"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    <path d="M -9.6 -1.6 Q 0 0.5, 9.6 -1.6 Q 5.6 3.4, 0 3.7 Q -5.6 3.4, -9.6 -1.6 Z" fill="#6E2A38" />
    <path d="M -9 -1.4 Q 0 0.6, 9 -1.4 Q 5.2 1.9, 0 2.2 Q -5.2 1.9, -9 -1.4 Z" fill="#FBF8F3" />
    <path d="M -11.5 -2.4 q -1 -0.7 -1.3 -1.8 M 11.5 -2.4 q 1 -0.7 1.3 -1.8" fill="none" stroke="#8E2F42" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
    <path d="M -4 4.4 Q 0 5.2, 4 4.4" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
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

const preset = { presetOnly: true, isExclusive: true };

export const MarikaMouths: PartRegistry<MarikaMouthId> = {
  marikaRedSmile: { component: marikaRedSmile, label: "Marika Red Lips", ...preset },
  marikaDefinedRedSmile: { component: marikaDefinedRedSmile, label: "Marika Berry Smile", ...preset },
  marikaAtelier: { component: marikaAtelier, label: "Marika Atelier", ...preset },
};
