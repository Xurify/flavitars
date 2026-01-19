import { PartRegistry, createAvatarItem } from "./common";

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

export const NoneBrows = createAvatarItem({
  id: "none",
  name: "None",
  svg: () => null
});

export const NeutralBrows = createAvatarItem({
  id: "neutral",
  name: "Neutral",
  svg: () => (
    <g opacity="0.8">
      <path d="M28 32 Q 35 30, 42 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 32 Q 65 30, 72 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
});

export const RaisedBrows = createAvatarItem({
  id: "raised",
  name: "Raised",
  svg: () => (
    <g opacity="0.8">
      <path d="M28 34 Q 35 28, 42 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 30 Q 65 28, 72 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
});

export const AngryBrows = createAvatarItem({
  id: "angry",
  name: "Angry",
  svg: () => (
    <g opacity="0.8">
      <path d="M30 30 L 42 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 35 L 70 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
});

export const QuirkyBrows = createAvatarItem({
  id: "quirky",
  name: "Quirky",
  svg: () => (
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
  )
});

export const DefinedBrows = createAvatarItem({
  id: "definedBrows",
  name: "Defined",
  svg: () => (
    <g opacity="0.9">
      <path d="M26 33 Q 35 28, 44 32" fill="none" stroke="#4B2C20" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 32 Q 65 28, 74 33" fill="none" stroke="#4B2C20" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 31 L 30 30 M 34 29 L 36 29 M 64 29 L 66 29" stroke="black" opacity="0.2" strokeWidth="1" />
    </g>
  )
});

export const GlamBrows = createAvatarItem({
  id: "glam",
  name: "Glam",
  svg: () => (
    <g opacity="0.95">
      <path d="M 22 32 Q 35 25, 48 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 52 32 Q 65 25, 78 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
});

export const GlamWideBrows = createAvatarItem({
  id: "glamWide",
  name: "Glam Wide",
  svg: () => (
    <g opacity="0.95">
      <path d="M 19 32 Q 32 25, 45 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 55 32 Q 68 25, 81 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
});

export const SoftArchBrows = createAvatarItem({
  id: "softArch",
  name: "Soft Arch",
  svg: () => (
    <g opacity="0.85">
      <path d="M 25 33 Q 35 27, 45 32" fill="none" stroke="#5D4037" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 55 32 Q 65 27, 75 33" fill="none" stroke="#5D4037" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 28 30 Q 32 28, 36 30 M 40 30 Q 43 29, 46 31" fill="none" stroke="#5D4037" opacity="0.3" strokeWidth="0.8" />
      <path d="M 54 31 Q 57 29, 60 30 M 64 30 Q 68 28, 72 30" fill="none" stroke="#5D4037" opacity="0.3" strokeWidth="0.8" />
    </g>
  )
});

export const Eyebrows: PartRegistry<EyebrowsId> = {
  none: { component: NoneBrows.svg, label: NoneBrows.name },
  neutral: { component: NeutralBrows.svg, label: NeutralBrows.name },
  softArch: { component: SoftArchBrows.svg, label: SoftArchBrows.name },
  definedBrows: { component: DefinedBrows.svg, label: DefinedBrows.name },
  glam: { component: GlamBrows.svg, label: GlamBrows.name },
  glamWide: { component: GlamWideBrows.svg, label: GlamWideBrows.name },
  raised: { component: RaisedBrows.svg, label: RaisedBrows.name },
  angry: { component: AngryBrows.svg, label: AngryBrows.name },
  quirky: { component: QuirkyBrows.svg, label: QuirkyBrows.name },
};
