import React from "react";
import { PartRegistry, PartComponent, createAvatarItem } from "./common";
import { HEAD_PATHS, HeadId } from "./head";

export const HatIds = [
  "none",
  "beanie",
  "baseballCap",
  "bucketHat",
  "flagsCap",
  "plainBlackHeadband",
  "patternedHeadband",
  "cowboyHat",
  "detectiveHat",
  "nurseCap",
  "chefHat",
  "astronautHelmet",
  "militaryHelmet",
  "topHat",
  "pirateHat",
  "vikingHelmet",
  "samuraiHelmet",
  "wizardHat",
  "propellerHat",
  "beret",
  "strawHat",
  "ushanka",
  "skiMask",
  "crown",
  "halo",
] as const;
export type HatId = (typeof HatIds)[number];

export const getHatClippingY = (hatId: HatId | undefined, faceId: string): number | null => {
  if (!hatId || NO_CLIPPING_HATS.includes(hatId)) return null;
  let clippingY = DEFAULT_HAT_CLIPPING_CONFIG[hatId]?.clippingY;
  if (["rounded", "oval"].includes(faceId)) {
    clippingY = 24;
  }
  return clippingY ?? null;
};

export const NO_HAIR_HATS: HatId[] = ["none", "beret"];
export const SMALL_HATS: HatId[] = ["crown", "halo", "propellerHat", "nurseCap"];
export const NO_CLIPPING_HATS: HatId[] = ["none", "crown", "propellerHat", "nurseCap", "halo", "astronautHelmet", "chefHat"];
export const FLOATING_HATS: HatId[] = ["halo"];
export const HATS_THAT_CAN_CONTAIN_HAIR: HatId[] = [
  "beanie",
  "baseballCap",
  "bucketHat",
  "cowboyHat",
  "wizardHat",
  "vikingHelmet",
  "samuraiHelmet",
  "militaryHelmet",
  "ushanka",
  "detectiveHat",
  "strawHat",
  "topHat",
  "chefHat",
  "pirateHat",
  "astronautHelmet",
  "skiMask",
  "patternedHeadband",
  "flagsCap",
  "plainBlackHeadband",
];

export const DEFAULT_HAT_CLIPPING_CONFIG: Record<HatId, { clippingY: number }> = {
  none: { clippingY: 0 },
  beanie: { clippingY: 24 },
  baseballCap: { clippingY: 28 },
  bucketHat: { clippingY: 22 },
  cowboyHat: { clippingY: 34 },
  beret: { clippingY: 25 },
  wizardHat: { clippingY: 30 },
  vikingHelmet: { clippingY: 35 },
  pirateHat: { clippingY: 0 },
  samuraiHelmet: { clippingY: 35 },
  topHat: { clippingY: 0 },
  detectiveHat: { clippingY: 35 },
  strawHat: { clippingY: 20 },
  militaryHelmet: { clippingY: 0 },
  ushanka: { clippingY: 0 },
  nurseCap: { clippingY: 0 },
  skiMask: { clippingY: 90 },
  astronautHelmet: { clippingY: 0 },
  halo: { clippingY: 2 },
  propellerHat: { clippingY: 0 },
  chefHat: { clippingY: 0 },
  crown: { clippingY: 0 },
  patternedHeadband: { clippingY: 18 },
  flagsCap: { clippingY: 30 },
  plainBlackHeadband: { clippingY: 18 },
};

/**
 * Calculates dynamic hat positioning based on the head shape.
 * Angular is baseline (y=15 top).
 * Rounded/Oval have y=10 top (needs -5 shift to sink deeper).
 * Square has y=12 center top (needs -3 shift).
 * @param headId - The current head shape ID
 * @param hatId - The current hat shape ID
 * @param baseTranslateY - The base vertical offset to align the hat's rim with y=15
 * @param squareStretch - How much to stretch the hat for square heads
 * @param uniformScale - Whether to apply uniform scaling to the hat
 */
export const getHeadHatTransform = (
  headId: string,
  hatId: string | undefined,
  baseTranslateY: number = 0,
  squareStretch: number = 1.15,
  uniformScale: boolean = false
) => {
  const yOffsets: Record<string, number> = {
    square: 0,
    rounded: 0,
    oval: 0,
    angular: 0,
  };

  if (["square", "angular"].includes(headId)) {
    yOffsets[headId] = 0;
  }

  const isFloating = hatId && (FLOATING_HATS as readonly string[]).includes(hatId);
  const headOffset = isFloating ? 0 : yOffsets[headId] || 0;

  const isSquare = ["square", "angular"].includes(headId);
  const scale = isSquare ? squareStretch : 1;
  const translateX = isSquare ? 50 * (1 - scale) : 0;

  const scaleY = uniformScale ? scale : 1;
  const translateY = baseTranslateY + headOffset;

  return `translate(${translateX}, ${translateY}) scale(${scale}, ${scaleY})`;
};

/**
 * Adjusts the hair position based on the character's head shape.
 * @param headId - The ID of the current head shape (e.g., 'rounded', 'square')
 * @param hairId - The ID of the hair style (useful for style-specific tweaks)
 * @param offset - An additional vertical nudge (usually -1 to -5)
 */
export const getHeadHairTransform = (headId: string, hairId: string | undefined, offset: number = 0): string => {
  const adjustments: Record<string, { x: number; y: number; scaleX: number }> = {
    rounded: { x: 0, y: 0, scaleX: 1.0 },
    oval: { x: 0, y: 0, scaleX: 1.0 },
    square: { x: 0, y: 0, scaleX: 1.0 },
    angular: { x: 0, y: 0, scaleX: 1.0 },
  };

  const adj = adjustments[headId] || adjustments.rounded;

  let styleY = 0;
  if (hairId === "doubleSpaceBuns" && headId === "square") {
    styleY = -2;
  }

  const finalY = adj.y + styleY + offset;

  return `translate(${adj.x}, ${finalY}) scale(${adj.scaleX}, 1)`;
};

const noneHat: PartComponent = () => null;

export const Beanie = createAvatarItem({
  id: "beanie",
  name: "Beanie",
  config: { clippingY: 24 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M20 15 Q 50 -10, 80 15 L 80 30 Q 50 35, 20 30 Z" fill={fill || "#334155"} stroke="currentColor" strokeWidth="2" />
      <path d="M30 5 V 25 M 40 0 V 23 M 50 -2 V 22 M 60 0 V 23 M 70 5 V 25" stroke="black" opacity="0.15" strokeWidth="1" />
    </g>
  )
});

export const BaseballCap = createAvatarItem({
  id: "baseballCap",
  name: "Baseball Cap",
  config: { clippingY: 28 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -10, 1.1)}>
      <path d="M20 25 Q 47.5 -5, 75 25 L 75 35 H 20 Z" fill={fill || "#334155"} stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M74.1 25.9 H 90 Q 95 38, 50 35"
        fill={fill || "#334155"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  )
});

export const BucketHat = createAvatarItem({
  id: "bucketHat",
  name: "Bucket Hat",
  config: { clippingY: 22 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 4, 1.1)}>
      <path d="M30 20 L 35 0 Q 50 -5, 65 0 L 70 20 Z" fill={fill || "#334155"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 35 Q 50 25, 85 35 L 80 20 Q 50 15, 20 20 Z" fill={fill || "#334155"} stroke="currentColor" strokeWidth="2.5" />
    </g>
  )
});


export const Beret = createAvatarItem({
  id: "beret",
  name: "Beret",
  config: { clippingY: 25 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={`${getHeadHatTransform(headId, hatId, 25, 1)} rotate(-10, 50, 15)`}>
      <path
        d="M15 15 Q 10 -5, 50 -15 Q 95 -10, 90 20 Q 50 15, 15 15 Z"
        fill={fill || "#991B1B"}
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="49" y="-20" width="2" height="6" fill="black" opacity="0.4" />
    </g>
  )
});


export const WizardHat = createAvatarItem({
  id: "wizardHat",
  name: "Wizard Hat",
  config: { clippingY: 30 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 2, 1.1)}>
      <path d="M15 35 Q 50 30, 85 35 L 50 -45 Z" fill={fill} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 35 Q 50 30, 80 35" fill="none" stroke="black" opacity="0.2" strokeWidth="2" />
      <g opacity="0.9">
        <rect x="58" y="-5" width="3" height="3" fill="#FDE68A" />
        <rect x="61" y="-8" width="3" height="3" fill="#FDE68A" />
        <rect x="64" y="-11" width="3" height="3" fill="#FDE68A" />
        <rect x="64" y="-5" width="3" height="3" fill="#FDE68A" />
        <rect x="61" y="-2" width="3" height="3" fill="#FDE68A" />
        <rect x="58" y="1" width="3" height="3" fill="#FDE68A" />
      </g>
      <g opacity="0.85">
        <rect x="32" y="8" width="2" height="2" fill="#FBBF24" />
        <rect x="30" y="10" width="2" height="2" fill="#FBBF24" />
        <rect x="34" y="10" width="2" height="2" fill="#FBBF24" />
        <rect x="32" y="12" width="2" height="2" fill="#FBBF24" />
      </g>
      <g opacity="0.9">
        <rect x="70" y="15" width="2" height="2" fill="#FDE68A" />
        <rect x="68" y="17" width="2" height="2" fill="#FDE68A" />
        <rect x="72" y="17" width="2" height="2" fill="#FDE68A" />
        <rect x="70" y="19" width="2" height="2" fill="#FDE68A" />
      </g>
      <g opacity="0.75">
        <rect x="42" y="-20" width="2" height="2" fill="#F9A8D4" />
        <rect x="40" y="-18" width="2" height="2" fill="#F9A8D4" />
        <rect x="44" y="-18" width="2" height="2" fill="#F9A8D4" />
        <rect x="42" y="-16" width="2" height="2" fill="#F9A8D4" />
      </g>
      <rect x="26" y="20" width="1.5" height="1.5" fill="#A78BFA" opacity="0.8" />
      <rect x="55" y="25" width="1.5" height="1.5" fill="#F9A8D4" opacity="0.7" />
      <rect x="38" y="-8" width="1.5" height="1.5" fill="#67E8F9" opacity="0.8" />
      <rect x="75" y="8" width="1.5" height="1.5" fill="#A78BFA" opacity="0.6" />
    </g>
  )
});

export const VikingHelmet = createAvatarItem({
  id: "vikingHelmet",
  name: "Viking Helmet",
  config: { clippingY: 35 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.25)}>
      <path d="M28 15 Q 0 -20, 12 -40 Q 25 -25, 32 5 Z" fill="#F5F5F4" stroke="black" strokeWidth="1.5" />
      <path d="M72 15 Q 100 -20, 88 -40 Q 75 -25, 68 5 Z" fill="#F5F5F4" stroke="black" strokeWidth="1.5" />
      <path d="M28 15 Q 15 5, 32 5" fill="black" opacity="0.1" />
      <path d="M72 15 Q 85 5, 68 5" fill="black" opacity="0.1" />
      <path d="M22 15 Q 50 -15, 78 15 L 78 35 Q 50 40, 22 35 Z" fill={fill || "#71717A"} stroke="currentColor" strokeWidth="2" />
      <path d="M44 -5 Q 50 -8, 56 -5 L 56 38 Q 50 41, 44 38 Z" fill="black" opacity="0.2" />
      <path d="M22 25 H 78 V 35 Q 50 40, 22 35 Z" fill="black" opacity="0.15" />
      <path d="M46 -2 L 50 -18 L 54 -2 Z" fill={fill || "#71717A"} stroke="black" strokeWidth="1.5" />
      <circle cx="50" cy="-2" r="4" fill={fill || "#71717A"} stroke="black" strokeWidth="1" />
      <circle cx="28" cy="30" r="1.5" fill="black" opacity="0.4" />
      <circle cx="38" cy="30" r="1.5" fill="black" opacity="0.4" />
      <circle cx="50" cy="33" r="1.5" fill="black" opacity="0.4" />
      <circle cx="62" cy="30" r="1.5" fill="black" opacity="0.4" />
      <circle cx="72" cy="30" r="1.5" fill="black" opacity="0.4" />
      <circle cx="50" cy="5" r="1.5" fill="black" opacity="0.4" />
      <circle cx="50" cy="15" r="1.5" fill="black" opacity="0.4" />
      <circle cx="50" cy="25" r="1.5" fill="black" opacity="0.4" />
    </g>
  )
});

export const AstronautHelmet = createAvatarItem({
  id: "astronautHelmet",
  name: "Astronaut Helmet",
  config: { clippingY: 0 },
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 35, 1)}>
      <circle cx="50" cy="15" r="42" fill="rgba(255,255,255,0.15)" stroke="currentColor" strokeWidth="2.5" />
      <path d="M25 5 Q 50 -10, 75 5" stroke="white" opacity="0.4" strokeWidth="5" strokeLinecap="round" fill="none" />
      <rect x="15" y="48" width="70" height="12" rx="6" fill="#CBD5E1" stroke="currentColor" strokeWidth="2.5" />
    </g>
  )
});


export const PropellerHat = createAvatarItem({
  id: "propellerHat",
  name: "Propeller Hat",
  config: { clippingY: 0 },
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 2, 1.15, false)}>
      <path d="M22 18 Q 35 10, 50 10 L 50 32 Q 35 33, 22 30 Z" fill="#EF4444" stroke="currentColor" strokeWidth="2.5" />
      <path d="M50 10 Q 65 10, 78 18 L 78 30 Q 65 33, 50 32 Z" fill="#3B82F6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 14 Q 50 12, 68 14 L 68 31 Q 50 33, 32 31 Z" fill="#22C55E" opacity="0.8" />
      <path d="M45 11 Q 50 10, 55 11 L 55 32 H 45 Z" fill="#FACC15" />
      <path d="M22 18 Q 50 9, 78 18 L 78 30 Q 50 35, 22 30 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M50 10 V 0" stroke="currentColor" strokeWidth="2" />
      <path d="M38 0 H 62" stroke="#FACC15" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="50" cy="0" r="1.5" fill="black" />
    </g>
  )
});

export const ChefHat = createAvatarItem({
  id: "chefHat",
  name: "Chef Hat",
  config: { clippingY: 0 },
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -11)}>
      <path d="M30 15 Q 20 0, 35 -10 Q 50 -15, 65 -10 Q 80 0, 70 15 Z" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <rect x="30" y="15" width="40" height="15" fill={"white"} stroke="currentColor" strokeWidth="2.5" />
    </g>
  )
});

export const PirateHat = createAvatarItem({
  id: "pirateHat",
  name: "Pirate Hat",
  tags: ["black", "orange", "red", "purple", "green", "pink", "blue"],
  config: { clippingY: 0 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 8, 1.15)}>
      <path d="M12 28 Q 50 35, 88 28 L 78 5 Q 50 -8, 22 5 Z" fill={fill || "#1A1A1A"} stroke="black" strokeWidth="1.5" />
      <path d="M24 6 Q 50 -6, 76 6" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 7 Q 50 -5, 76 7" fill="none" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <g transform="translate(50, 12)">
        <line x1="-8" y1="-4" x2="8" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="-8" y1="4" x2="8" y2="-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="-8" cy="-4" r="1.5" fill="white" />
        <circle cx="-8" cy="4" r="1.5" fill="white" />
        <circle cx="8" cy="-4" r="1.5" fill="white" />
        <circle cx="8" cy="4" r="1.5" fill="white" />
        <ellipse cx="0" cy="-3.5" rx="5" ry="4.5" fill="white" />
        <rect x="-3" y="0" width="6" height="4" rx="1.5" fill="white" />
        <circle cx="-2" cy="-4" r="1.2" fill="black" />
        <circle cx="2" cy="-4" r="1.2" fill="black" />
        <path d="M0 -1.5 L -0.5 0.5 M 0 -1.5 L 0.5 0.5" stroke="black" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="-1.5" y1="1" x2="-1.5" y2="3" stroke="black" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="1" x2="0" y2="3" stroke="black" strokeWidth="0.5" opacity="0.3" />
        <line x1="1.5" y1="1" x2="1.5" y2="3" stroke="black" strokeWidth="0.5" opacity="0.3" />
      </g>
    </g>
  )
});

export const SamuraiHelmet = createAvatarItem({
  id: "samuraiHelmet",
  name: "Samurai Helmet",
  tags: ["red", "black"],
  config: { clippingY: 35 },
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -1, 1.25)}>
      <path d="M25 10 Q 50 -10, 75 10 L 80 40 H 20 Z" fill="#991B1B" stroke="currentColor" strokeWidth="2.5" />
      <path d="M45 5 L 35 -15 M 55 5 L 65 -15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="5" r="4" fill="#FBBF24" stroke="currentColor" strokeWidth="1.5" />
      <rect x="25" y="25" width="50" height="6" fill="black" opacity="0.4" />
    </g>
  )
});


export const TopHat = createAvatarItem({
  id: "topHat",
  name: "Top Hat",
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 9, 1.1)}>
      <rect x="30" y="-15" width="40" height="30" fill="black" stroke="currentColor" strokeWidth="2.5" />
      <rect x="20" y="15" width="60" height="6" rx="2" fill="black" stroke="currentColor" strokeWidth="2.5" />
      {/* Ribbon - Controlled by Hat Color */}
      <rect x="30" y="5" width="40" height="7" fill={fill || "#B91C1C"} />
      <path d="M30 5 H 70" stroke="black" opacity="0.1" strokeWidth="1" />
    </g>
  ),
});

export const CowboyHat = createAvatarItem({
  id: "cowboyHat",
  name: "Cowboy Hat",
  tags: ["brown", "black", "orange", "khaki"],
  config: { clippingY: 34 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -2, 1.1)}>
      <path d="M35 15 Q 50 -10, 65 15 L 70 25 Q 50 20, 30 25 Z" fill={fill || "#78350F"} stroke="currentColor" strokeWidth="2" />
      <path
        d="M18 35 Q 18 25, 30 25 H 70 Q 82 25, 82 35 Q 50 45, 18 35 Z"
        fill={fill || "#78350F"}
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
  )
});
// Note: Colors are not yet migrated to item config, keeping strictly 1:1 for now.
// Ideally colors would move to `AvatarItem.colors` property.

export const DetectiveHat = createAvatarItem({
  id: "detectiveHat",
  name: "Detective Hat",
  tags: ["brown", "black", "khaki"],
  config: { clippingY: 35 },
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M20 15 Q 50 -5, 80 15 L 80 35 H 20 Z" fill="#78350F" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 35 H 85 Q 85 42, 50 42 Q 15 42, 15 35" fill="#78350F" stroke="currentColor" strokeWidth="2.5" />
      <rect x="20" y="28" width="60" height="4" fill="black" opacity="0.2" />
    </g>
  )
});

export const NurseCap = createAvatarItem({
  id: "nurseCap",
  name: "Nurse Cap",
  // no-clipping hat, config empty/implicit
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 7, 1.1)}>
      <path d="M35 15 L 40 5 H 60 L 65 15 Z" fill="white" stroke="currentColor" strokeWidth="2" />
      <rect x="47" y="8.5" width="6" height="2" rx="0.5" fill="red" />
      <rect x="49" y="6.5" width="2" height="6" rx="0.5" fill="red" />
    </g>
  )
});

export const MilitaryHelmet = createAvatarItem({
  id: "militaryHelmet",
  name: "Military Helmet",
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M25 15 Q 50 -5, 75 15 L 80 30 H 20 Z" fill={fill || "#365314"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M25 18 H 75" stroke="black" opacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
    </g>
  ),
});

export const StrawHat = createAvatarItem({
  id: "strawHat",
  name: "Straw Hat",
  tags: ["khaki", "brown", "black"],
  config: { clippingY: 20 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 6, 1.15)}>
      <path d="M30 15 Q 50 -5, 70 15 L 75 30 Q 50 25, 25 30 Z" fill="#FDE68A" stroke="currentColor" strokeWidth="2" />
      <path d="M10 30 Q 50 20, 90 30 Q 95 40, 50 40 Q 5 40, 10 30" fill="#FDE68A" stroke="currentColor" strokeWidth="2" />
      <path d="M30 22 Q 50 18, 70 22" fill={fill || "#B91C1C"} stroke="black" opacity="0.1" strokeWidth="1" />
    </g>
  ),
});

export const Ushanka = createAvatarItem({
  id: "ushanka",
  name: "Ushanka",
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M25 15 Q 50 -5, 75 15 L 75 35 H 25 Z" fill={fill || "#475569"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M25 15 L 15 35 Q 20 40, 30 35 Z" fill={fill || "#94A3B8"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M75 15 L 85 35 Q 80 40, 70 35 Z" fill={fill || "#94A3B8"} stroke="currentColor" strokeWidth="2.5" />
      <rect x="40" y="5" width="20" height="12" rx="2" fill={fill || "#94A3B8"} stroke="currentColor" strokeWidth="2" />
    </g>
  ),
});

export const SkiMask = createAvatarItem({
  id: "skiMask",
  name: "Ski Mask",
  svg: ({ fill, headId }) => {
    const isDarkMask = fill === "#1a1a1a";
    const holeFill = isDarkMask ? "#434244ff" : "black";

    return (
      <g transform="translate(50, 50) scale(1.02) translate(-50, -50)">
        <path d={HEAD_PATHS[headId || "angular"]} fill={fill || "#1e293b"} stroke="currentColor" strokeWidth="2.5" />
        <circle cx="35" cy="45" r="5" fill={holeFill} />
        <circle cx="65" cy="45" r="5" fill={holeFill} />
        <rect x="42" y="65" width="16" height="7" rx="3.5" fill={holeFill} />
      </g>
    );
  },
});

export const PatternedHeadband = createAvatarItem({
  id: "patternedHeadband",
  name: "Patterned Headband",
  config: { clippingY: 18 },
  svg: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <defs>
        <clipPath id="headbandClip">
          <path d="M 15 25 C 15 5, 85 5, 85 25 L 85 40 C 85 20, 15 20, 15 40 Z" />
        </clipPath>
      </defs>
      <path
        d="M 15 25 C 15 5, 85 5, 85 25 L 85 40 C 85 20, 15 20, 15 40 Z"
        fill={fill || "#E9D5FF"}
        stroke="currentColor"
        strokeWidth="2"
      />
      <g fill="white" opacity="0.6" clipPath="url(#headbandClip)">
        <circle cx="30" cy="15" r="2" />
        <path d="M 48 13 L 50 17 L 52 13 L 50 15 Z" />
        <circle cx="70" cy="15" r="2" />
        <path d="M 38 22 L 40 26 L 42 22 L 40 24 Z" />
        <circle cx="60" cy="24" r="2" />
        <circle cx="30" cy="32" r="2" />
        <path d="M 48 30 L 50 34 L 52 30 L 50 32 Z" />
        <circle cx="70" cy="32" r="2" />
      </g>
      <path d="M 20 25 Q 35 22, 50 25 T 80 25" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
    </g>
  ),
});

export const FlagsCap = createAvatarItem({
  id: "flagsCap",
  name: "Flags Cap",
  config: { clippingY: 30 },
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -12, 1.12)}>
      {/* Cap Body - worn straight and low */}
      <path d="M18 30 Q 50 -5, 82 30 L 82 38 H 18 Z" fill="#111111" stroke="currentColor" strokeWidth="2" />
      {/* flags.games Logo */}
      <g transform="translate(50, 24) scale(0.012)">
        <g transform="translate(-500, -500)">
          <rect x="0" y="0" width="1000" height="333" rx="150" ry="150" fill="#ED1C24" />
          <rect x="0" y="333" width="1000" height="334" fill="white" />
          <rect x="0" y="667" width="1000" height="333" rx="150" ry="150" fill="#005BAC" />
          <rect x="0" y="150" width="1000" height="700" fill="transparent" />
          <clipPath id="logoClip">
            <rect x="0" y="0" width="1000" height="1000" rx="150" />
          </clipPath>
          <g clipPath="url(#logoClip)">
            <rect x="0" y="0" width="1000" height="333" fill="#ED1C24" />
            <rect x="0" y="333" width="1000" height="334" fill="white" />
            <rect x="0" y="667" width="1000" height="333" fill="#005BAC" />
          </g>
          {/* Detailed Globe Wireframe */}
          <g transform="translate(500, 500)">
            <circle r="340" fill="white" stroke="#005BAC" strokeWidth="50" />
            <line x1="-340" y1="0" x2="340" y2="0" stroke="#005BAC" strokeWidth="50" />
            <ellipse cx="0" cy="0" rx="340" ry="170" fill="none" stroke="#005BAC" strokeWidth="45" />
            <line x1="0" y1="-340" x2="0" y2="340" stroke="#005BAC" strokeWidth="50" />
            <ellipse cx="0" cy="0" rx="170" ry="340" fill="none" stroke="#005BAC" strokeWidth="45" />
          </g>
        </g>
      </g>

      {/* Brim - more defined with highlights and shadows */}
      <g>
        <path d="M18 38 H 82 Q 85 41, 50 43 Q 15 41, 18 38" fill="#111111" stroke="black" strokeWidth="1" />
        <path d="M20 38.5 H 80 Q 82 39.5, 50 41 Q 18 39.5, 20 38.5" fill="none" stroke="#333333" strokeWidth="0.8" opacity="0.6" />
        <path d="M18 41 Q 50 44, 82 41" fill="none" stroke="black" strokeWidth="1.5" opacity="0.8" />
      </g>
    </g>
  )
});

export const PlainBlackHeadband = createAvatarItem({
  id: "plainBlackHeadband",
  name: "Plain Black Headband",
  config: { clippingY: 18 },
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M 15 25 C 15 12, 85 12, 85 25 L 85 35 C 85 22, 15 22, 15 35 Z" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1.5" />
      <path d="M 25 18 Q 50 15, 75 18" fill="none" stroke="white" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
});

export const Crown = createAvatarItem({
  id: "crown",
  name: "Crown",
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M20 30 L 20 10 L 35 22 L 50 5 L 65 22 L 80 10 L 80 30 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="50" cy="5" r="2.5" fill="#EF4444" />
      <rect x="45" y="20" width="10" height="4" rx="1" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.5" />
    </g>
  ),
});

export const Halo = createAvatarItem({
  id: "halo",
  name: "Halo",
  svg: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <ellipse cx="50" cy="0" rx="30" ry="8" fill="none" stroke="#FDE047" strokeWidth="3" opacity="0.8">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <path d="M50 0 L 50 15" stroke="#FDE047" strokeWidth="1" strokeDasharray="2 2" />
    </g>
  ),
});

export const Hats: PartRegistry<HatId> = {
  none: { component: noneHat, label: "None" },
  beanie: { component: Beanie.svg, label: Beanie.name },
  baseballCap: { component: BaseballCap.svg, label: BaseballCap.name },
  bucketHat: { component: BucketHat.svg, label: BucketHat.name },
  flagsCap: { component: FlagsCap.svg, label: FlagsCap.name },
  plainBlackHeadband: { component: PlainBlackHeadband.svg, label: PlainBlackHeadband.name },
  patternedHeadband: { component: PatternedHeadband.svg, label: PatternedHeadband.name },
  cowboyHat: { component: CowboyHat.svg, label: CowboyHat.name },
  detectiveHat: { component: DetectiveHat.svg, label: DetectiveHat.name },
  nurseCap: { component: NurseCap.svg, label: NurseCap.name },
  chefHat: { component: ChefHat.svg, label: ChefHat.name },
  astronautHelmet: { component: AstronautHelmet.svg, label: AstronautHelmet.name },
  militaryHelmet: { component: MilitaryHelmet.svg, label: MilitaryHelmet.name },
  topHat: { component: TopHat.svg, label: TopHat.name },
  pirateHat: { component: PirateHat.svg, label: PirateHat.name, tags: PirateHat.tags },
  vikingHelmet: { component: VikingHelmet.svg, label: VikingHelmet.name },
  samuraiHelmet: { component: SamuraiHelmet.svg, label: SamuraiHelmet.name, tags: SamuraiHelmet.tags },
  wizardHat: { component: WizardHat.svg, label: WizardHat.name },
  propellerHat: { component: PropellerHat.svg, label: PropellerHat.name },
  beret: { component: Beret.svg, label: Beret.name },
  strawHat: { component: StrawHat.svg, label: StrawHat.name, tags: StrawHat.tags },
  ushanka: { component: Ushanka.svg, label: Ushanka.name },
  skiMask: { component: SkiMask.svg, label: SkiMask.name },
  crown: { component: Crown.svg, label: Crown.name },
  halo: { component: Halo.svg, label: Halo.name },
};
