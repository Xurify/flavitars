import { PartRegistry, PartComponent } from "./common";

export const MouthId = [
  "neutral",
  "smile",
  "smileDimples",
  "softTeethSmile",
  "brightGrin",
  "laughing",
  "neutralFullLips",
  "naturalNude",
  "naturalPinkSmile",
  "lipstickMouth",
  "softMatte",
  "softMatteSmile",
  "glossyMauveLips",
  "vibrantRedFull",
  "vibrantRedSmall",
  "smirk",
  "smirkRed",
  "pout",
  "oMouth",
] as const;
export type MouthId = (typeof MouthId)[number];

const INK = { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const LINE = { ...INK, fill: "none" } as const;

/**
 * Lip mouths share one shape: a bow-shaped top lip, a rounder bottom lip, an ink outline like
 * every other part, a dark centre line and a gloss highlight.
 */
interface LipStyle {
  color: string;
  /** Half the mouth width. */
  width: number;
  /** How far the corners sit above the centre line. */
  smile?: number;
  /** Bottom lip depth as a fraction of the width. */
  fullness?: number;
  teeth?: boolean;
}

const lips = ({ color, width: w, smile: s = 1.2, fullness = 0.5, teeth }: LipStyle): PartComponent => {
  const h = w * fullness;
  const Lips: PartComponent = () => (
    <g transform="translate(50, 78)">
      <path
        d={`M ${-w} ${-s} Q ${-w / 2} -4.2, 0 -2.2 Q ${w / 2} -4.2, ${w} ${-s} Q ${w / 2} ${h}, 0 ${h + 0.4} Q ${-w / 2} ${h}, ${-w} ${-s} Z`}
        fill={color}
        {...INK}
        strokeWidth="1.5"
      />
      {teeth && <path d={`M ${-w + 2.5} ${-s + 0.4} Q 0 1.4, ${w - 2.5} ${-s + 0.4} Q ${w / 2.2} ${h / 2.4}, 0 ${h / 2.2} Q ${-w / 2.2} ${h / 2.4}, ${-w + 2.5} ${-s + 0.4} Z`} fill="white" />}
      <path d={`M ${-w} ${-s} Q 0 ${teeth ? 1.6 : 1.2}, ${w} ${-s}`} {...LINE} strokeWidth="1" strokeOpacity="0.45" />
      <path d={`M ${-w / 3} ${h * 0.55} Q 0 ${h * 0.72}, ${w / 3} ${h * 0.55}`} fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    </g>
  );
  return Lips;
};

/** Wide-open mouth: dark inside, a row of top teeth, a tongue, and an ink outline. */
const openMouth = ({ width: w, depth: h, tongue }: { width: number; depth: number; tongue?: boolean }): PartComponent => {
  const Mouth: PartComponent = () => (
    <g transform="translate(50, 76)">
      <path
        d={`M ${-w} -3 Q 0 -9, ${w} -3 Q ${w + 1.5} 4, ${w - 4} ${h} Q 0 ${h + 4}, ${-w + 4} ${h} Q ${-w - 1.5} 4, ${-w} -3 Z`}
        fill="#6B2430"
        {...INK}
        strokeWidth="2"
      />
      <path d={`M ${-w + 2.5} -2.4 Q 0 -6.8, ${w - 2.5} -2.4 L ${w - 5} 2.6 Q 0 4.6, ${-w + 5} 2.6 Z`} fill="white" />
      <path d="M -4.5 -5.2 V 3.6 M 0 -5.8 V 4.2 M 4.5 -5.2 V 3.6" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
      {tongue && <path d={`M -7 ${h - 3} Q 0 ${h - 7}, 7 ${h - 3} Q 4 ${h + 1}, 0 ${h + 1} Q -4 ${h + 1}, -7 ${h - 3} Z`} fill="#E8636F" />}
    </g>
  );
  return Mouth;
};

const neutral: PartComponent = () => (
  <g transform="translate(50, 78)" {...LINE} strokeWidth="2.2">
    <path d="M -9 0 H 9" />
  </g>
);

const smile: PartComponent = () => (
  <g transform="translate(50, 78)" {...LINE} strokeWidth="2.2">
    <path d="M -14 -3 Q 0 7, 14 -3" />
  </g>
);

const smileDimples: PartComponent = () => (
  <g transform="translate(50, 78)" {...LINE} strokeWidth="2.2">
    <path d="M -14 -3 Q 0 7, 14 -3" />
    <path d="M -17 -5.5 q -1 1.5 0 3 M 17 -5.5 q 1 1.5 0 3" strokeWidth="1.6" />
  </g>
);

const smirk: PartComponent = () => (
  <g transform="translate(50, 78)" {...LINE} strokeWidth="2.2">
    <path d="M -5 0 Q 5 4, 15 -4" />
  </g>
);

const smirkRed: PartComponent = () => (
  <g transform="translate(50, 78)" fill="none" strokeLinecap="round">
    <path d="M -5 0 Q 5 4, 15 -4" stroke="currentColor" strokeWidth="4.2" />
    <path d="M -5 0 Q 5 4, 15 -4" stroke="#E0233A" strokeWidth="2.4" />
  </g>
);

/** Small pursed kiss. */
const pout = lips({ color: "#D98A8A", width: 4.5, smile: 0, fullness: 0.75 });

const oMouth: PartComponent = () => (
  <g transform="translate(50, 78)">
    <ellipse rx="4" ry="4.8" fill="#6B2430" {...INK} strokeWidth="2.2" />
  </g>
);

export const Mouths: PartRegistry<MouthId> = {
  neutral: { component: neutral, label: "Neutral" },
  smile: { component: smile, label: "Smile" },
  smileDimples: { component: smileDimples, label: "Smile with Dimples" },
  softTeethSmile: { component: lips({ color: "#D9A3A3", width: 13, smile: 2, teeth: true }), label: "Soft Teeth Smile" },
  brightGrin: { component: openMouth({ width: 17, depth: 11 }), label: "Bright Grin" },
  laughing: { component: openMouth({ width: 15, depth: 13, tongue: true }), label: "Laughing" },
  neutralFullLips: { component: lips({ color: "#A46F62", width: 12.5, smile: 0.8, fullness: 0.62 }), label: "Neutral Full Lips" },
  naturalNude: { component: lips({ color: "#E8A8A9", width: 10.5, smile: 1 }), label: "Natural Nude" },
  naturalPinkSmile: { component: lips({ color: "#F472B6", width: 12.5, smile: 2, teeth: true }), label: "Natural Pink Smile" },
  lipstickMouth: { component: lips({ color: "#E07A7A", width: 12 }), label: "Lipstick" },
  softMatte: { component: lips({ color: "#C27B7C", width: 11.5, smile: 0.8 }), label: "Soft Matte" },
  softMatteSmile: { component: lips({ color: "#C27B7C", width: 12.5, smile: 1.5, teeth: true }), label: "Soft Matte Smile" },
  glossyMauveLips: { component: lips({ color: "#B18485", width: 12.5, fullness: 0.58 }), label: "Glossy Mauve" },
  vibrantRedFull: { component: lips({ color: "#DC2626", width: 13.5, smile: 0.8, fullness: 0.62 }), label: "Vibrant Red Full" },
  vibrantRedSmall: { component: lips({ color: "#DC2626", width: 9.5, smile: 0.8 }), label: "Vibrant Red Small" },
  smirk: { component: smirk, label: "Smirk" },
  smirkRed: { component: smirkRed, label: "Smirk Red" },
  pout: { component: pout, label: "Pout" },
  oMouth: { component: oMouth, label: "O Mouth" },
};
