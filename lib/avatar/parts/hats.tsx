import React from "react";
import { PartComponent } from "./common";
import { HEAD_PATHS, HeadId } from "./head";

export const HatIds = [
  "none",
  "beanie",
  "baseballCap",
  "bucketHat",
  "cowboyHat",
  "beret",
  "crown",
  "wizardHat",
  "vikingHelmet",
  "astronautHelmet",
  "halo",
  "propellerHat",
  "chefHat",
  "pirateHat",
  "samuraiHelmet",
  "topHat",
  "detectiveHat",
  "strawHat",
  "militaryHelmet",
  "ushanka",
  "nurseCap",
  "skiMask",
  "patternedHeadband",
  "brandedFittedCap",
  "plainBlackHeadband",
] as const;
export type HatId = (typeof HatIds)[number];

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
  "brandedFittedCap",
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
  brandedFittedCap: { clippingY: 30 },
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
  headId: HeadId,
  hatId: HatId | undefined,
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

  const isFloating = hatId && FLOATING_HATS.includes(hatId);
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

export const Hats: Record<HatId, PartComponent> = {
  none: () => null,
  beanie: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M20 15 Q 50 -10, 80 15 L 80 30 Q 50 35, 20 30 Z" fill={fill || "#334155"} stroke="currentColor" strokeWidth="2" />
      <path d="M30 5 V 25 M 40 0 V 23 M 50 -2 V 22 M 60 0 V 23 M 70 5 V 25" stroke="black" opacity="0.15" strokeWidth="1" />
    </g>
  ),
  baseballCap: ({ fill, headId, hatId }) => (
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
  ),
  bucketHat: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 4, 1.1)}>
      <path d="M30 20 L 35 0 Q 50 -5, 65 0 L 70 20 Z" fill={fill || "#334155"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 35 Q 50 25, 85 35 L 80 20 Q 50 15, 20 20 Z" fill={fill || "#334155"} stroke="currentColor" strokeWidth="2.5" />
    </g>
  ),
  cowboyHat: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -2, 1.1)}>
      <path d="M35 15 Q 50 -10, 65 15 L 70 25 Q 50 20, 30 25 Z" fill={fill || "#78350F"} stroke="currentColor" strokeWidth="2" />
      <path
        d="M18 35 Q 18 25, 30 25 H 70 Q 82 25, 82 35 Q 50 45, 18 35 Z"
        fill={fill || "#78350F"}
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
  ),
  beret: ({ fill, headId, hatId }) => (
    <g transform={`${getHeadHatTransform(headId, hatId, 25, 1)} rotate(-10, 50, 15)`}>
      <path
        d="M15 15 Q 10 -5, 50 -15 Q 95 -10, 90 20 Q 50 15, 15 15 Z"
        fill={fill || "#991B1B"}
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="49" y="-20" width="2" height="6" fill="black" opacity="0.4" />
    </g>
  ),
  crown: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 15, 0.4, true)}>
      <path
        d="M20 15 L 15 -10 L 35 3 L 50 -15 L 65 3 L 85 -10 L 80 15 Z"
        fill="#EAB308"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="-15" r="2" fill="#FDE047" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="8" r="1.5" fill="#FDE047" stroke="currentColor" strokeWidth="1" />
      <circle cx="72" cy="8" r="1.5" fill="#FDE047" stroke="currentColor" strokeWidth="1" />
    </g>
  ),
  wizardHat: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 2, 1.1)}>
      {/* Main hat cone */}
      <path d="M15 35 Q 50 30, 85 35 L 50 -45 Z" fill={fill} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 35 Q 50 30, 80 35" fill="none" stroke="black" opacity="0.2" strokeWidth="2" />

      {/* Pixel art crescent moon */}
      <g opacity="0.9">
        <rect x="58" y="-5" width="3" height="3" fill="#FDE68A" />
        <rect x="61" y="-8" width="3" height="3" fill="#FDE68A" />
        <rect x="64" y="-11" width="3" height="3" fill="#FDE68A" />
        <rect x="64" y="-5" width="3" height="3" fill="#FDE68A" />
        <rect x="61" y="-2" width="3" height="3" fill="#FDE68A" />
        <rect x="58" y="1" width="3" height="3" fill="#FDE68A" />
      </g>

      {/* Pixel art stars scattered on hat */}
      {/* Star 1 - small */}
      <g opacity="0.85">
        <rect x="32" y="8" width="2" height="2" fill="#FBBF24" />
        <rect x="30" y="10" width="2" height="2" fill="#FBBF24" />
        <rect x="34" y="10" width="2" height="2" fill="#FBBF24" />
        <rect x="32" y="12" width="2" height="2" fill="#FBBF24" />
      </g>

      {/* Star 2 - medium */}
      <g opacity="0.9">
        <rect x="70" y="15" width="2" height="2" fill="#FDE68A" />
        <rect x="68" y="17" width="2" height="2" fill="#FDE68A" />
        <rect x="72" y="17" width="2" height="2" fill="#FDE68A" />
        <rect x="70" y="19" width="2" height="2" fill="#FDE68A" />
      </g>

      {/* Star 3 - tiny sparkle */}
      <g opacity="0.75">
        <rect x="42" y="-20" width="2" height="2" fill="#F9A8D4" />
        <rect x="40" y="-18" width="2" height="2" fill="#F9A8D4" />
        <rect x="44" y="-18" width="2" height="2" fill="#F9A8D4" />
        <rect x="42" y="-16" width="2" height="2" fill="#F9A8D4" />
      </g>

      {/* Magical sparkle dots */}
      <rect x="26" y="20" width="1.5" height="1.5" fill="#A78BFA" opacity="0.8" />
      <rect x="55" y="25" width="1.5" height="1.5" fill="#F9A8D4" opacity="0.7" />
      <rect x="38" y="-8" width="1.5" height="1.5" fill="#67E8F9" opacity="0.8" />
      <rect x="75" y="8" width="1.5" height="1.5" fill="#A78BFA" opacity="0.6" />
    </g>
  ),
  vikingHelmet: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.25)}>
      {/* Large Curved Horns - Ivory/Bone color with subtle shading */}
      <path d="M28 15 Q 0 -20, 12 -40 Q 25 -25, 32 5 Z" fill="#F5F5F4" stroke="black" strokeWidth="1.5" />
      <path d="M72 15 Q 100 -20, 88 -40 Q 75 -25, 68 5 Z" fill="#F5F5F4" stroke="black" strokeWidth="1.5" />
      {/* Horn root shadows */}
      <path d="M28 15 Q 15 5, 32 5" fill="black" opacity="0.1" />
      <path d="M72 15 Q 85 5, 68 5" fill="black" opacity="0.1" />

      {/* Main Dome */}
      <path d="M22 15 Q 50 -15, 78 15 L 78 35 Q 50 40, 22 35 Z" fill={fill || "#71717A"} stroke="currentColor" strokeWidth="2" />

      {/* Reinforcing Bands */}
      {/* Central Vertical Band */}
      <path d="M44 -5 Q 50 -8, 56 -5 L 56 38 Q 50 41, 44 38 Z" fill="black" opacity="0.2" />
      {/* Bottom Horizontal Band */}
      <path d="M22 25 H 78 V 35 Q 50 40, 22 35 Z" fill="black" opacity="0.15" />

      {/* Top Spike */}
      <path d="M46 -2 L 50 -18 L 54 -2 Z" fill={fill || "#71717A"} stroke="black" strokeWidth="1.5" />
      <circle cx="50" cy="-2" r="4" fill={fill || "#71717A"} stroke="black" strokeWidth="1" />

      {/* Detailed Rivets */}
      {/* Horizontal rivets */}
      <circle cx="28" cy="30" r="1.5" fill="black" opacity="0.4" />
      <circle cx="38" cy="30" r="1.5" fill="black" opacity="0.4" />
      <circle cx="50" cy="33" r="1.5" fill="black" opacity="0.4" />
      <circle cx="62" cy="30" r="1.5" fill="black" opacity="0.4" />
      <circle cx="72" cy="30" r="1.5" fill="black" opacity="0.4" />

      {/* Vertical rivets */}
      <circle cx="50" cy="5" r="1.5" fill="black" opacity="0.4" />
      <circle cx="50" cy="15" r="1.5" fill="black" opacity="0.4" />
      <circle cx="50" cy="25" r="1.5" fill="black" opacity="0.4" />
    </g>
  ),
  astronautHelmet: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 35, 1)}>
      <circle cx="50" cy="15" r="42" fill="rgba(255,255,255,0.15)" stroke="currentColor" strokeWidth="2.5" />
      <path d="M25 5 Q 50 -10, 75 5" stroke="white" opacity="0.4" strokeWidth="5" strokeLinecap="round" fill="none" />
      <rect x="15" y="48" width="70" height="12" rx="6" fill="#CBD5E1" stroke="currentColor" strokeWidth="2.5" />
    </g>
  ),
  halo: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1, true)}>
      <ellipse cx="50" cy="18" rx="24" ry="7" fill="none" stroke="#FDE047" strokeWidth="4" />
    </g>
  ),
  propellerHat: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 2, 1.15, false)}>
      {/* Red Panel (Left) */}
      <path d="M22 18 Q 35 10, 50 10 L 50 32 Q 35 33, 22 30 Z" fill="#EF4444" stroke="currentColor" strokeWidth="2.5" />

      {/* Blue Panel (Right) */}
      <path d="M50 10 Q 65 10, 78 18 L 78 30 Q 65 33, 50 32 Z" fill="#3B82F6" stroke="currentColor" strokeWidth="2.5" />

      {/* Green Detail (Mid-Left) - widened */}
      <path d="M32 14 Q 50 12, 68 14 L 68 31 Q 50 33, 32 31 Z" fill="#22C55E" opacity="0.8" />

      {/* Yellow Center Strip - slightly wider */}
      <path d="M45 11 Q 50 10, 55 11 L 55 32 H 45 Z" fill="#FACC15" />

      {/* Main Cap Outline - defining the new wider shape */}
      <path d="M22 18 Q 50 9, 78 18 L 78 30 Q 50 35, 22 30 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />

      {/* Propeller */}
      <path d="M50 10 V 0" stroke="currentColor" strokeWidth="2" />
      <path d="M38 0 H 62" stroke="#FACC15" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="50" cy="0" r="1.5" fill="black" />
    </g>
  ),
  chefHat: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -11)}>
      <path d="M30 15 Q 20 0, 35 -10 Q 50 -15, 65 -10 Q 80 0, 70 15 Z" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <rect x="30" y="15" width="40" height="15" fill={"white"} stroke="currentColor" strokeWidth="2.5" />
    </g>
  ),
  pirateHat: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 8, 1.15)}>
      {/* Main Hat Body */}
      <path d="M12 28 Q 50 35, 88 28 L 78 5 Q 50 -8, 22 5 Z" fill={fill || "#1A1A1A"} stroke="black" strokeWidth="1.5" />

      {/* Golden Trim on top */}
      <path d="M24 6 Q 50 -6, 76 6" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 7 Q 50 -5, 76 7" fill="none" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

      {/* Skull and Crossbones Logo */}
      <g transform="translate(50, 12)">
        {/* Crossbones */}
        <line x1="-8" y1="-4" x2="8" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="-8" y1="4" x2="8" y2="-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Bone Ends */}
        <circle cx="-8" cy="-4" r="1.5" fill="white" />
        <circle cx="-8" cy="4" r="1.5" fill="white" />
        <circle cx="8" cy="-4" r="1.5" fill="white" />
        <circle cx="8" cy="4" r="1.5" fill="white" />

        {/* Skull Head */}
        <ellipse cx="0" cy="-3.5" rx="5" ry="4.5" fill="white" />
        <rect x="-3" y="0" width="6" height="4" rx="1.5" fill="white" />

        {/* Facial Features */}
        <circle cx="-2" cy="-4" r="1.2" fill="black" />
        <circle cx="2" cy="-4" r="1.2" fill="black" />
        <path d="M0 -1.5 L -0.5 0.5 M 0 -1.5 L 0.5 0.5" stroke="black" strokeWidth="0.8" strokeLinecap="round" />

        {/* Teeth styling */}
        <line x1="-1.5" y1="1" x2="-1.5" y2="3" stroke="black" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="1" x2="0" y2="3" stroke="black" strokeWidth="0.5" opacity="0.3" />
        <line x1="1.5" y1="1" x2="1.5" y2="3" stroke="black" strokeWidth="0.5" opacity="0.3" />
      </g>
    </g>
  ),
  samuraiHelmet: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -1, 1.25)}>
      <path d="M25 10 Q 50 -10, 75 10 L 80 40 H 20 Z" fill="#991B1B" stroke="currentColor" strokeWidth="2.5" />
      {/* Gold crest */}
      <path d="M45 5 L 35 -15 M 55 5 L 65 -15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="5" r="4" fill="#FBBF24" stroke="currentColor" strokeWidth="1.5" />
      <rect x="25" y="25" width="50" height="6" fill="black" opacity="0.4" />
    </g>
  ),
  topHat: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 9, 1.1)}>
      <rect x="30" y="-15" width="40" height="30" fill="black" stroke="currentColor" strokeWidth="2.5" />
      <rect x="20" y="15" width="60" height="6" rx="2" fill="black" stroke="currentColor" strokeWidth="2.5" />
      {/* Ribbon - Controlled by Hat Color */}
      <rect x="30" y="5" width="40" height="7" fill={fill || "#B91C1C"} />
      <path d="M30 5 H 70" stroke="black" opacity="0.1" strokeWidth="1" />
    </g>
  ),
  detectiveHat: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M20 15 Q 50 -5, 80 15 L 80 35 H 20 Z" fill="#78350F" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 35 H 85 Q 85 42, 50 42 Q 15 42, 15 35" fill="#78350F" stroke="currentColor" strokeWidth="2.5" />
      <rect x="20" y="28" width="60" height="4" fill="black" opacity="0.2" />
    </g>
  ),
  strawHat: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -10, 1.1)}>
      <path d="M35 15 Q 50 5, 65 15 L 70 30 Q 50 35, 30 30 Z" fill="#FDE68A" stroke="currentColor" strokeWidth="2.5" />
      <path d="M18 35 Q 50 50, 82 35 Q 50 20, 18 35 Z" fill="#FDE68A" stroke="currentColor" strokeWidth="2.5" />
      <rect x="31" y="26" width="38" height="4" fill="#EF4444" opacity="0.6" />
    </g>
  ),
  nurseCap: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 7, 1.1)}>
      <path d="M35 15 L 40 5 H 60 L 65 15 Z" fill="white" stroke="currentColor" strokeWidth="2" />
      {/* Perfectly centered medic symbol */}
      <rect x="47" y="8.5" width="6" height="2" rx="0.5" fill="red" />
      <rect x="49" y="6.5" width="2" height="6" rx="0.5" fill="red" />
    </g>
  ),
  militaryHelmet: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M25 15 Q 50 -5, 75 15 L 80 30 H 20 Z" fill={fill || "#365314"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M25 18 H 75" stroke="black" opacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
    </g>
  ),
  ushanka: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      <path d="M25 15 Q 50 -5, 75 15 L 75 35 H 25 Z" fill={fill || "#475569"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M25 15 L 15 35 Q 20 40, 30 35 Z" fill={fill || "#94A3B8"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M75 15 L 85 35 Q 80 40, 70 35 Z" fill={fill || "#94A3B8"} stroke="currentColor" strokeWidth="2.5" />
      <rect x="40" y="5" width="20" height="12" rx="2" fill={fill || "#94A3B8"} stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  skiMask: ({ fill, headId }) => {
    const isDarkMask = fill === "#1a1a1a";
    const holeFill = isDarkMask ? "#434244ff" : "black"; // Lighter gray for dark masks

    return (
      <g transform="translate(50, 50) scale(1.02) translate(-50, -50)">
        <path d={HEAD_PATHS[headId || "angular"]} fill={fill || "#1e293b"} stroke="currentColor" strokeWidth="2.5" />
        <circle cx="35" cy="45" r="5" fill={holeFill} />
        <circle cx="65" cy="45" r="5" fill={holeFill} />
        <rect x="42" y="65" width="16" height="7" rx="3.5" fill={holeFill} />
      </g>
    );
  },
  patternedHeadband: ({ fill, headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      {/* Define clipPath for the headband shape */}
      <defs>
        <clipPath id="headbandClip">
          <path d="M 15 25 C 15 5, 85 5, 85 25 L 85 40 C 85 20, 15 20, 15 40 Z" />
        </clipPath>
      </defs>

      {/* Base Band - Wide coverage over forehead/hairline */}
      <path
        d="M 15 25 C 15 5, 85 5, 85 25 L 85 40 C 85 20, 15 20, 15 40 Z"
        fill={fill || "#E9D5FF"} // Pale purple/pink default
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Pattern - Monogram Style (LV-ish) - Clipped to headband */}
      <g fill="white" opacity="0.6" clipPath="url(#headbandClip)">
        {/* Row 1 */}
        <circle cx="30" cy="15" r="2" />
        <path d="M 48 13 L 50 17 L 52 13 L 50 15 Z" /> {/* Diamond-ish */}
        <circle cx="70" cy="15" r="2" />
        {/* Row 2 */}
        <path d="M 38 22 L 40 26 L 42 22 L 40 24 Z" />
        <circle cx="60" cy="24" r="2" />
        {/* Row 3 */}
        <circle cx="30" cy="32" r="2" />
        <path d="M 48 30 L 50 34 L 52 30 L 50 32 Z" />
        <circle cx="70" cy="32" r="2" />
      </g>

      {/* Fabric Fold / Texture Lines */}
      <path d="M 20 25 Q 35 22, 50 25 T 80 25" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
    </g>
  ),
  brandedFittedCap: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, -12, 1.12)}>
      {/* Cap Body - worn straight and low */}
      <path d="M18 30 Q 50 -5, 82 30 L 82 38 H 18 Z" fill="#111111" stroke="currentColor" strokeWidth="2" />
      {/* flags.games Logo - More Defined, Scaled & Positioned */}
      <g transform="translate(50, 24) scale(0.012)">
        <g transform="translate(-500, -500)">
          {/* Rounded Square Background bands */}
          <rect x="0" y="0" width="1000" height="333" rx="150" ry="150" fill="#ED1C24" />
          <rect x="0" y="333" width="1000" height="334" fill="white" />
          <rect x="0" y="667" width="1000" height="333" rx="150" ry="150" fill="#005BAC" />
          {/* Fill in the corners that rounding leaves transparent on middle band */}
          <rect x="0" y="150" width="1000" height="700" fill="transparent" />
          {/* Better approach: Clipping */}
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
            {/* Horizontal Lines (Equator and Latitudes) */}
            <line x1="-340" y1="0" x2="340" y2="0" stroke="#005BAC" strokeWidth="50" />
            <ellipse cx="0" cy="0" rx="340" ry="170" fill="none" stroke="#005BAC" strokeWidth="45" />

            {/* Vertical Lines (Prime Meridian and Longitudes) */}
            <line x1="0" y1="-340" x2="0" y2="340" stroke="#005BAC" strokeWidth="50" />
            <ellipse cx="0" cy="0" rx="170" ry="340" fill="none" stroke="#005BAC" strokeWidth="45" />
          </g>
        </g>
      </g>

      {/* Brim - more defined with highlights and shadows */}
      <g>
        {/* Main Brim Shape */}
        <path d="M18 38 H 82 Q 85 41, 50 43 Q 15 41, 18 38" fill="#111111" stroke="black" strokeWidth="1" />
        {/* Top Highlight - Subtle gray to define the upper edge */}
        <path
          d="M20 38.5 H 80 Q 82 39.5, 50 41 Q 18 39.5, 20 38.5"
          fill="none"
          stroke="#333333"
          strokeWidth="0.8"
          opacity="0.6"
        />
        {/* Bottom Shadow - Dark black to define the depth */}
        <path d="M18 41 Q 50 44, 82 41" fill="none" stroke="black" strokeWidth="1.5" opacity="0.8" />
      </g>
    </g>
  ),
  plainBlackHeadband: ({ headId, hatId }) => (
    <g transform={getHeadHatTransform(headId, hatId, 0, 1.1)}>
      {/* Simple solid black headband */}
      <path d="M 15 25 C 15 12, 85 12, 85 25 L 85 35 C 85 22, 15 22, 15 35 Z" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1.5" />
      {/* Subtle fabric shine */}
      <path d="M 25 18 Q 50 15, 75 18" fill="none" stroke="white" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
};

Hats.pirateHat.colors = ["black", "orange", "red", "purple", "green", "pink", "blue"];
Hats.cowboyHat.colors = ["brown", "black", "orange", "khaki"];
Hats.strawHat.colors = ["blonde", "khaki", "white"];
Hats.detectiveHat.colors = ["brown", "black", "khaki"];
Hats.samuraiHelmet.colors = ["red", "black"];
