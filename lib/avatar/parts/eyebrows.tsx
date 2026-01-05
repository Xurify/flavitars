import { PartRegistry, PartComponent } from "./common";

export const EyebrowsId = [
  "none",
  "neutral",
  "softArch",
  "definedBrows",
  "glam",
  "glamWide",
  "raised",
  "angry",
  "quirky",
] as const;
export type EyebrowsId = (typeof EyebrowsId)[number];

const noneBrows: PartComponent = () => null;

const neutralBrows: PartComponent = () => (
  <g opacity="0.8">
    <path d="M28 32 Q 35 30, 42 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M58 32 Q 65 30, 72 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </g>
);

const raisedBrows: PartComponent = () => (
  <g opacity="0.8">
    <path d="M28 34 Q 35 28, 42 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M58 30 Q 65 28, 72 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </g>
);

const angryBrows: PartComponent = () => (
  <g opacity="0.8">
    <path d="M30 30 L 42 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M58 35 L 70 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </g>
);

const quirkyBrows: PartComponent = () => (
  <g opacity="0.8">
    <path d="M28 32 Q 35 30, 42 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M58 25 Q 65 22, 72 26"
      fill="none"
      stroke="currentColor"
      strokeDasharray="3 1"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </g>
);

const definedBrows: PartComponent = () => (
  <g opacity="0.9">
    <path d="M26 33 Q 35 28, 44 32" fill="none" stroke="#4B2C20" strokeWidth="2" strokeLinecap="round" />
    <path d="M56 32 Q 65 28, 74 33" fill="none" stroke="#4B2C20" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 31 L 30 30 M 34 29 L 36 29 M 64 29 L 66 29" stroke="black" opacity="0.2" strokeWidth="1" />
  </g>
);

const glamBrows: PartComponent = () => (
  <g opacity="0.95">
    <path d="M 22 32 Q 35 25, 48 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 52 32 Q 65 25, 78 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </g>
);

const glamWideBrows: PartComponent = () => (
  <g opacity="0.95">
    <path d="M 19 32 Q 32 25, 45 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 55 32 Q 68 25, 81 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </g>
);

const softArchBrows: PartComponent = () => (
  <g opacity="0.85">
    <path d="M 25 33 Q 35 27, 45 32" fill="none" stroke="#5D4037" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M 55 32 Q 65 27, 75 33" fill="none" stroke="#5D4037" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M 28 30 Q 32 28, 36 30 M 40 30 Q 43 29, 46 31" fill="none" stroke="#5D4037" opacity="0.3" strokeWidth="0.8" />
    <path d="M 54 31 Q 57 29, 60 30 M 64 30 Q 68 28, 72 30" fill="none" stroke="#5D4037" opacity="0.3" strokeWidth="0.8" />
  </g>
);

export const Eyebrows: PartRegistry<EyebrowsId> = {
  none: { component: noneBrows, label: "None" },
  neutral: { component: neutralBrows, label: "Neutral" },
  softArch: { component: softArchBrows, label: "Soft Arch" },
  definedBrows: { component: definedBrows, label: "Defined" },
  glam: { component: glamBrows, label: "Glam" },
  glamWide: { component: glamWideBrows, label: "Glam Wide" },
  raised: { component: raisedBrows, label: "Raised" },
  angry: { component: angryBrows, label: "Angry" },
  quirky: { component: quirkyBrows, label: "Quirky" },
};
