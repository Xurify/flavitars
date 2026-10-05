import React from "react";
import { PartRegistry, PartComponent } from "./common";
import { HEADS, HatSeat, getHead } from "../anatomy";

export const HatIds = [
  "none",
  "beanie",
  "baseballCap",
  "bucketHat",
  "flagsCap",
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

/**
 * How a hat sits on the avatar:
 * - `seat`: worn on the head. Head and hair above the seat curve are clipped away and the hat's
 *   band covers the cut. Hair below the seat (fringes, sides, lengths) stays visible.
 * - `rest`: small item resting on top of the hair (or head when bald). Drawn with its base at y=0.
 * - `float`: hovers above the hair. Drawn with its centre at y=0.
 * - `band`: worn over the hair without clipping anything.
 * - `mask`: covers the whole head; hair, ears and face are hidden.
 * - `helmet`: encloses the head; hair is clipped to the `keep` region.
 */
export type HatFit =
  | { kind: "none" }
  | { kind: "seat"; seat: HatSeat }
  | { kind: "rest"; sink: number }
  | { kind: "float"; gap: number }
  | { kind: "band" }
  | { kind: "mask" }
  | { kind: "helmet"; keep: string };

const ASTRONAUT_GLASS = { cx: 50, cy: 52, r: 44 };

export const HAT_FITS: Record<HatId, HatFit> = {
  none: { kind: "none" },
  beanie: { kind: "seat", seat: { mid: 30, edge: 30 } },
  baseballCap: { kind: "seat", seat: { mid: 30, edge: 29 } },
  bucketHat: { kind: "seat", seat: { mid: 30, edge: 30 } },
  flagsCap: { kind: "seat", seat: { mid: 30, edge: 29 } },
  patternedHeadband: { kind: "band" },
  cowboyHat: { kind: "seat", seat: { mid: 30, edge: 30 } },
  detectiveHat: { kind: "seat", seat: { mid: 30, edge: 30 } },
  nurseCap: { kind: "rest", sink: 3 },
  chefHat: { kind: "seat", seat: { mid: 30, edge: 30 } },
  astronautHelmet: {
    kind: "helmet",
    keep: `M ${ASTRONAUT_GLASS.cx - ASTRONAUT_GLASS.r + 1} ${ASTRONAUT_GLASS.cy} a ${ASTRONAUT_GLASS.r - 1} ${ASTRONAUT_GLASS.r - 1} 0 1 1 ${2 * (ASTRONAUT_GLASS.r - 1)} 0 a ${ASTRONAUT_GLASS.r - 1} ${ASTRONAUT_GLASS.r - 1} 0 1 1 ${-2 * (ASTRONAUT_GLASS.r - 1)} 0 Z`,
  },
  militaryHelmet: { kind: "seat", seat: { mid: 30, edge: 30 } },
  topHat: { kind: "seat", seat: { mid: 29, edge: 29 } },
  pirateHat: { kind: "seat", seat: { mid: 30, edge: 29 } },
  vikingHelmet: { kind: "seat", seat: { mid: 31, edge: 31 } },
  samuraiHelmet: { kind: "seat", seat: { mid: 31, edge: 31 } },
  wizardHat: { kind: "seat", seat: { mid: 29, edge: 29 } },
  propellerHat: { kind: "seat", seat: { mid: 27, edge: 27 } },
  beret: { kind: "seat", seat: { mid: 25, edge: 26 } },
  strawHat: { kind: "seat", seat: { mid: 30, edge: 30 } },
  ushanka: { kind: "seat", seat: { mid: 31, edge: 31 } },
  skiMask: { kind: "mask" },
  crown: { kind: "rest", sink: 4 },
  halo: { kind: "float", gap: 7 },
};

export const getHatFit = (hatId: HatId | string | undefined): HatFit => HAT_FITS[(hatId ?? "none") as HatId] ?? HAT_FITS.none;

const ink = { stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" } as const;
const shade = { fill: "black", opacity: 0.15 } as const;
const shine = { fill: "none", stroke: "white", strokeOpacity: 0.3, strokeWidth: 2, strokeLinecap: "round" } as const;

/** Rest/float hats are authored around (50, 0); this places them on the hair. */
const restTransform = (hatId: HatId, hairTop: number | undefined, headId: string) => {
  const fit = HAT_FITS[hatId];
  const top = hairTop ?? getHead(headId).top;
  const offset = fit.kind === "rest" ? fit.sink : fit.kind === "float" ? -fit.gap : 0;
  return `translate(0, ${top + offset})`;
};

const noneHat: PartComponent = () => null;

const Beanie: PartComponent = ({ fill = "#334155" }) => (
  <g>
    <path d="M 17 27 C 16 2, 84 2, 83 27 Z" fill={fill} {...ink} />
    <path d="M 30 9 V 26 M 40 6 V 26 M 50 5 V 26 M 60 6 V 26 M 70 9 V 26" stroke="black" strokeOpacity="0.15" strokeWidth="1.2" />
    <path d="M 14 24 Q 50 19, 86 24 L 86 31 Q 86 35, 82 35 Q 50 31, 18 35 Q 14 35, 14 31 Z" fill={fill} {...ink} />
    <path d="M 14 24 Q 50 19, 86 24 L 86 31 Q 86 35, 82 35 Q 50 31, 18 35 Q 14 35, 14 31 Z" {...shade} />
    <path
      d="M 22 25 V 32 M 30 24 V 31.5 M 38 23.5 V 31 M 46 23 V 31 M 54 23 V 31 M 62 23.5 V 31 M 70 24 V 31.5 M 78 25 V 32"
      stroke="black"
      strokeOpacity="0.15"
      strokeWidth="1"
    />
  </g>
);

const capCrown = "M 16 29 C 15 3, 85 3, 84 29 Z";
const capVisor = "M 13 29 Q 50 23, 87 29 Q 90 36, 82 38 Q 50 32, 18 38 Q 10 36, 13 29 Z";

const BaseballCap: PartComponent = ({ fill = "#334155" }) => (
  <g>
    <path d={capCrown} fill={fill} {...ink} />
    <path
      d="M 50 6 V 28 M 33 9 Q 37 18, 35 28 M 67 9 Q 63 18, 65 28"
      fill="none"
      stroke="black"
      strokeOpacity="0.18"
      strokeWidth="1.2"
    />
    <path d="M 28 12 Q 40 7, 50 7" {...shine} />
    <circle cx="50" cy="5.5" r="2" fill={fill} {...ink} strokeWidth={1.5} />
    <path d={capVisor} fill={fill} {...ink} />
    <path d={capVisor} {...shade} />
  </g>
);

const FlagsLogo = () => (
  <g transform="translate(50, 18) scale(0.012) translate(-500, -500)">
    <rect x="0" y="0" width="1000" height="1000" rx="150" fill="white" />
    <rect x="0" y="0" width="1000" height="333" rx="150" fill="#ED1C24" />
    <rect x="0" y="200" width="1000" height="133" fill="#ED1C24" />
    <rect x="0" y="667" width="1000" height="333" rx="150" fill="#005BAC" />
    <rect x="0" y="667" width="1000" height="133" fill="#005BAC" />
    <g transform="translate(500, 500)" fill="none" stroke="#005BAC" strokeWidth="45">
      <circle r="340" fill="white" strokeWidth="50" />
      <line x1="-340" y1="0" x2="340" y2="0" />
      <ellipse rx="340" ry="170" />
      <line x1="0" y1="-340" x2="0" y2="340" />
      <ellipse rx="170" ry="340" />
    </g>
  </g>
);

const FlagsCap: PartComponent = () => (
  <g>
    <path d={capCrown} fill="#111111" {...ink} />
    <path d="M 33 9 Q 37 18, 35 28 M 67 9 Q 63 18, 65 28" fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="1.2" />
    <circle cx="50" cy="5.5" r="2" fill="#111111" {...ink} strokeWidth={1.5} />
    <FlagsLogo />
    <path d={capVisor} fill="#111111" {...ink} />
    <path d="M 18 33 Q 50 28, 82 33" fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="1.2" />
  </g>
);

const BucketHat: PartComponent = ({ fill = "#334155" }) => (
  <g>
    <path d="M 22 28 L 25 9 Q 50 1, 75 9 L 78 28 Z" fill={fill} {...ink} />
    <path d="M 24 21 Q 50 17, 76 21" fill="none" stroke="black" strokeOpacity="0.2" strokeWidth="2.5" />
    <path d="M 7 37 Q 12 25, 22 24 Q 50 20, 78 24 Q 88 25, 93 37 Q 50 29, 7 37 Z" fill={fill} {...ink} />
    <path d="M 7 37 Q 12 25, 22 24 Q 50 20, 78 24 Q 88 25, 93 37 Q 50 29, 7 37 Z" {...shade} />
  </g>
);

const PatternedHeadband: PartComponent = ({ fill = "#E9D5FF", uid = "fv" }) => {
  const d = "M 14 34 C 13 8, 87 8, 86 34 L 80 34 C 80 16, 20 16, 20 34 Z";
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-headband`}>
          <path d={d} />
        </clipPath>
      </defs>
      <path d={d} fill={fill} {...ink} />
      <g fill="white" opacity="0.6" clipPath={`url(#${uid}-headband)`}>
        <circle cx="20" cy="24" r="1.6" />
        <circle cx="30" cy="15" r="1.6" />
        <circle cx="42" cy="12" r="1.6" />
        <circle cx="58" cy="12" r="1.6" />
        <circle cx="70" cy="15" r="1.6" />
        <circle cx="80" cy="24" r="1.6" />
        <path d="M 17 30 l 1.5 2.5 l 1.5 -2.5 Z M 35 13 l 1.5 2.5 l 1.5 -2.5 Z M 48.5 11 l 1.5 2.5 l 1.5 -2.5 Z M 62 13 l 1.5 2.5 l 1.5 -2.5 Z M 80 30 l 1.5 2.5 l 1.5 -2.5 Z" />
      </g>
    </g>
  );
};

const CowboyHat: PartComponent = ({ fill = "#78350F" }) => (
  <g>
    <path d="M 26 28 C 24 14, 28 3, 38 4 Q 44 4, 50 9 Q 56 4, 62 4 C 72 3, 76 14, 74 28 Z" fill={fill} {...ink} />
    <path d="M 50 9 Q 49 15, 50 20" fill="none" stroke="black" strokeOpacity="0.2" strokeWidth="1.5" />
    <path d="M 26 22 Q 50 18, 74 22 L 74 28 Q 50 25, 26 28 Z" fill="black" opacity="0.3" />
    <path
      d="M 3 26 Q 6 36, 20 34 Q 50 39, 80 34 Q 94 36, 97 26 Q 90 30, 80 28 Q 50 22, 20 28 Q 10 30, 3 26 Z"
      fill={fill}
      {...ink}
    />
    <path d="M 3 26 Q 6 36, 20 34 Q 50 39, 80 34 Q 94 36, 97 26 Q 90 30, 80 28 Q 50 22, 20 28 Q 10 30, 3 26 Z" {...shade} />
  </g>
);

const DetectiveHat: PartComponent = ({ fill = "#78350F" }) => (
  <g>
    <path d="M 21 28 L 23 10 Q 30 3, 42 6 L 50 9 L 58 6 Q 70 3, 77 10 L 79 28 Z" fill={fill} {...ink} />
    <path d="M 50 9 L 50 15" stroke="black" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 21 22 Q 50 19, 79 22 L 79 28 Q 50 26, 21 28 Z" fill="black" opacity="0.35" />
    <path d="M 8 33 Q 12 26, 22 26 Q 50 23, 78 26 Q 88 26, 92 33 Q 50 30, 8 33 Z" fill={fill} {...ink} />
    <path d="M 8 33 Q 12 26, 22 26 Q 50 23, 78 26 Q 88 26, 92 33 Q 50 30, 8 33 Z" {...shade} />
  </g>
);

const NurseCap: PartComponent = ({ hairTop, headId }) => (
  <g transform={restTransform("nurseCap", hairTop, headId)}>
    <path d="M 34 2 L 38 -10 H 62 L 66 2 Q 50 -1, 34 2 Z" fill="white" {...ink} />
    <rect x="47" y="-7" width="6" height="2" rx="0.5" fill="#EF4444" />
    <rect x="49" y="-9" width="2" height="6" rx="0.5" fill="#EF4444" />
  </g>
);

const ChefHat: PartComponent = () => (
  <g>
    <path
      d="M 24 22 C 10 20, 10 2, 24 2 C 22 -12, 40 -16, 46 -8 C 52 -18, 72 -14, 70 -2 C 86 -4, 90 18, 76 22 Z"
      fill="white"
      {...ink}
    />
    <path
      d="M 36 -4 Q 38 8, 36 18 M 60 -4 Q 58 8, 60 18"
      fill="none"
      stroke="black"
      strokeOpacity="0.1"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M 20 21 Q 50 18, 80 21 L 81 33 Q 50 30, 19 33 Z" fill="white" {...ink} />
    <path d="M 20 27 Q 50 24, 80 27" fill="none" stroke="black" strokeOpacity="0.08" strokeWidth="1" />
  </g>
);

const AstronautHelmet: PartComponent = () => {
  const { cx, cy, r } = ASTRONAUT_GLASS;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#BAE6FD" fillOpacity="0.18" {...ink} strokeWidth={2.5} />
      <path
        d={`M ${cx - 26} ${cy - 30} Q ${cx - 12} ${cy - 40}, ${cx + 6} ${cy - 41}`}
        fill="none"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx + 34} ${cy - 6} Q ${cx + 37} ${cy + 6}, ${cx + 33} ${cy + 16}`}
        fill="none"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="12" y="90" width="76" height="12" rx="6" fill="#CBD5E1" {...ink} strokeWidth={2.5} />
      <path d="M 24 96 H 34 M 66 96 H 76" stroke="black" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
};

const MilitaryHelmet: PartComponent = ({ fill = "#52663B" }) => (
  <g>
    <path d="M 15 30 C 13 1, 87 1, 85 30 Z" fill={fill} {...ink} />
    <path d="M 26 10 Q 38 4, 50 4" {...shine} strokeOpacity={0.2} />
    <path
      d="M 22 18 h 4 M 40 10 h 5 M 60 14 h 4 M 72 20 h 4 M 32 22 h 4 M 52 22 h 5"
      stroke="black"
      strokeOpacity="0.25"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M 10 32 Q 12 27, 18 27 Q 50 24, 82 27 Q 88 27, 90 32 Q 90 35, 85 35 Q 50 31, 15 35 Q 10 35, 10 32 Z"
      fill={fill}
      {...ink}
    />
    <path d="M 10 32 Q 12 27, 18 27 Q 50 24, 82 27 Q 88 27, 90 32 Q 90 35, 85 35 Q 50 31, 15 35 Q 10 35, 10 32 Z" {...shade} />
  </g>
);

const TopHat: PartComponent = ({ fill = "#B91C1C" }) => (
  <g>
    <path d="M 26 27 L 27 -14 Q 50 -17, 73 -14 L 74 27 Z" fill="#1a1a1a" {...ink} />
    <path d="M 26.5 14 Q 50 11, 73.5 14 L 73.8 22 Q 50 19, 26.2 22 Z" fill={fill} />
    <path d="M 33 -8 V 10" stroke="white" strokeOpacity="0.15" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M 10 29 Q 12 24, 24 25 Q 50 22, 76 25 Q 88 24, 90 29 Q 90 33, 84 33 Q 50 30, 16 33 Q 10 33, 10 29 Z"
      fill="#1a1a1a"
      {...ink}
    />
  </g>
);

const PirateHat: PartComponent = ({ fill = "#1A1A1A" }) => (
  <g>
    <path
      d="M 6 26 Q 12 10, 26 12 Q 34 -2, 50 -2 Q 66 -2, 74 12 Q 88 10, 94 26 Q 82 30, 70 31 Q 50 34, 30 31 Q 18 30, 6 26 Z"
      fill={fill}
      {...ink}
    />
    <path
      d="M 8 25 Q 18 28, 30 29 Q 50 32, 70 29 Q 82 28, 92 25"
      fill="none"
      stroke="#EAB308"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <g transform="translate(50, 15)">
      <path d="M -7 -4 L 7 4 M -7 4 L 7 -4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="0" cy="-2" rx="4.5" ry="4" fill="white" />
      <rect x="-2.5" y="1" width="5" height="3" rx="1" fill="white" />
      <circle cx="-1.7" cy="-2.4" r="1.1" fill="#1a1a1a" />
      <circle cx="1.7" cy="-2.4" r="1.1" fill="#1a1a1a" />
    </g>
  </g>
);

const VikingHelmet: PartComponent = ({ fill = "#71717A" }) => (
  <g>
    <path d="M 22 20 Q 6 10, 6 -12 Q 14 -2, 28 8 Z" fill="#F5F5F4" {...ink} strokeWidth={1.5} />
    <path d="M 78 20 Q 94 10, 94 -12 Q 86 -2, 72 8 Z" fill="#F5F5F4" {...ink} strokeWidth={1.5} />
    <path d="M 16 30 C 14 0, 86 0, 84 30 Z" fill={fill} {...ink} />
    <path d="M 45 4 Q 50 2, 55 4 L 55 30 L 45 30 Z" fill="black" opacity="0.2" />
    <path d="M 26 10 Q 36 4, 46 4" {...shine} strokeOpacity={0.25} />
    <path d="M 13 27 Q 50 22, 87 27 L 87 34 Q 50 30, 13 34 Z" fill={fill} {...ink} />
    <path d="M 13 27 Q 50 22, 87 27 L 87 34 Q 50 30, 13 34 Z" {...shade} />
    <g fill="black" opacity="0.4">
      <circle cx="20" cy="30" r="1.2" />
      <circle cx="35" cy="28.5" r="1.2" />
      <circle cx="50" cy="28" r="1.2" />
      <circle cx="65" cy="28.5" r="1.2" />
      <circle cx="80" cy="30" r="1.2" />
    </g>
  </g>
);

const SamuraiHelmet: PartComponent = () => (
  <g>
    <path d="M 12 30 L 8 46 Q 18 48, 24 42 L 24 30 Z M 88 30 L 92 46 Q 82 48, 76 42 L 76 30 Z" fill="#7F1D1D" {...ink} />
    <path d="M 10 38 Q 16 40, 24 37 M 90 38 Q 84 40, 76 37" fill="none" stroke="#FBBF24" strokeOpacity="0.6" strokeWidth="1.2" />
    <path d="M 17 30 C 15 0, 85 0, 83 30 Z" fill="#991B1B" {...ink} />
    <path d="M 24 12 Q 34 5, 46 4" {...shine} strokeOpacity={0.2} />
    <path
      d="M 44 10 L 30 -12 Q 28 -14, 30 -10 L 42 12 Z M 56 10 L 70 -12 Q 72 -14, 70 -10 L 58 12 Z"
      fill="#FBBF24"
      stroke="#B45309"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="10" r="4" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
    <path d="M 12 27 Q 50 22, 88 27 L 88 34 Q 50 30, 12 34 Z" fill="#1a1a1a" {...ink} />
  </g>
);

const WizardHat: PartComponent = ({ fill = "#6D28D9" }) => (
  <g>
    <path d="M 22 27 Q 34 -4, 50 -28 Q 56 -36, 64 -34 Q 58 -26, 60 -12 Q 66 8, 78 27 Z" fill={fill} {...ink} />
    <path d="M 54 -20 L 56 -15 L 61 -14 L 57 -11 L 58 -6 L 54 -9 L 50 -6 L 51 -11 L 47 -14 L 52 -15 Z" fill="#FDE68A" />
    <circle cx="40" cy="8" r="1.4" fill="#FDE68A" />
    <circle cx="64" cy="12" r="1" fill="#F9A8D4" />
    <circle cx="46" cy="-6" r="0.9" fill="#67E8F9" />
    <path
      d="M 8 30 Q 10 24, 24 24 Q 50 21, 76 24 Q 90 24, 92 30 Q 92 34, 86 34 Q 50 30, 14 34 Q 8 34, 8 30 Z"
      fill={fill}
      {...ink}
    />
    <path d="M 8 30 Q 10 24, 24 24 Q 50 21, 76 24 Q 90 24, 92 30 Q 92 34, 86 34 Q 50 30, 14 34 Q 8 34, 8 30 Z" {...shade} />
  </g>
);

const PropellerHat: PartComponent = () => (
  <g>
    <defs />
    <path d="M 18 29 C 17 6, 50 4, 50 4 L 50 29 Z" fill="#EF4444" {...ink} />
    <path d="M 82 29 C 83 6, 50 4, 50 4 L 50 29 Z" fill="#3B82F6" {...ink} />
    <path d="M 34 7 Q 42 4.5, 50 4 L 50 29 L 34 29 Z" fill="#22C55E" />
    <path d="M 50 4 Q 58 4.5, 66 7 L 66 29 L 50 29 Z" fill="#FACC15" />
    <path d="M 18 29 C 17 6, 83 6, 82 29 Z" fill="none" {...ink} />
    <path d="M 15 27 Q 50 22, 85 27 L 85 31 Q 50 27, 15 31 Z" fill="#1E3A8A" {...ink} />
    <path d="M 50 4 V -4" {...ink} />
    <path
      d="M 37 -5 Q 43 -9, 50 -5 Q 57 -1, 63 -5"
      fill="#FACC15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="-5" r="1.6" fill="#1a1a1a" />
  </g>
);

const Beret: PartComponent = ({ fill = "#991B1B" }) => (
  <g transform="rotate(-6, 50, 20)">
    <path d="M 10 22 C 4 8, 30 0, 54 2 C 80 3, 96 12, 88 24 Q 50 30, 10 22 Z" fill={fill} {...ink} />
    <path d="M 26 8 Q 40 3, 56 4" {...shine} strokeOpacity={0.2} />
    <path d="M 15 22 Q 50 28, 85 23 L 84 29 Q 50 33, 16 28 Z" fill={fill} {...ink} />
    <path d="M 15 22 Q 50 28, 85 23 L 84 29 Q 50 33, 16 28 Z" {...shade} />
    <path d="M 52 2 L 53 -3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </g>
);

const StrawHat: PartComponent = ({ fill = "#B91C1C" }) => (
  <g>
    <path d="M 26 28 C 25 8, 34 2, 50 2 C 66 2, 75 8, 74 28 Z" fill="#FDE68A" {...ink} />
    <path d="M 26 19 Q 50 16, 74 19 L 74 25 Q 50 22, 26 25 Z" fill={fill} />
    <path
      d="M 4 31 Q 8 24, 24 25 Q 50 21, 76 25 Q 92 24, 96 31 Q 94 37, 80 36 Q 50 32, 20 36 Q 6 37, 4 31 Z"
      fill="#FDE68A"
      {...ink}
    />
    <path
      d="M 12 30 Q 30 27, 50 27 Q 70 27, 88 30"
      fill="none"
      stroke="#B45309"
      strokeOpacity="0.3"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
  </g>
);

const Ushanka: PartComponent = ({ fill = "#475569" }) => (
  <g>
    <path
      d="M 10 30 L 10 58 Q 10 64, 17 64 Q 25 64, 25 58 L 25 30 Z M 90 30 L 90 58 Q 90 64, 83 64 Q 75 64, 75 58 L 75 30 Z"
      fill="#94A3B8"
      {...ink}
    />
    <path
      d="M 14 40 V 58 M 20 40 V 60 M 86 40 V 58 M 80 40 V 60"
      stroke="black"
      strokeOpacity="0.12"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path d="M 18 27 C 16 2, 84 2, 82 27 Z" fill={fill} {...ink} />
    <path d="M 28 10 Q 38 5, 50 5" {...shine} strokeOpacity={0.15} />
    <path d="M 9 25 Q 50 18, 91 25 L 91 34 Q 91 37, 87 37 Q 50 31, 13 37 Q 9 37, 9 34 Z" fill="#94A3B8" {...ink} />
    <path
      d="M 16 28 l 3 3 M 28 26 l 3 3 M 42 25 l 3 3 M 56 25 l 3 3 M 70 26 l 3 3 M 82 28 l 3 3"
      stroke="black"
      strokeOpacity="0.15"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </g>
);

const SkiMask: PartComponent = ({ fill = "#1e293b", headId }) => {
  const head = HEADS[headId] ?? HEADS.square;
  const offset = head.faceOffset;
  const hole = fill.toLowerCase() === "#1a1a1a" ? "#434244" : "#1a1a1a";
  return (
    <g>
      <g transform="translate(50, 52) scale(1.04) translate(-50, -52)">
        <path d={head.path} fill={fill} {...ink} />
      </g>
      <path d="M 26 36 Q 50 32, 74 36" fill="none" stroke="black" strokeOpacity="0.15" strokeWidth="1.5" />
      <g transform={`translate(0, ${offset})`}>
        <rect x="24" y="38" width="52" height="14" rx="7" fill={hole} />
        <rect x="38" y="70" width="24" height="10" rx="5" fill={hole} />
      </g>
    </g>
  );
};

const Crown: PartComponent = ({ hairTop, headId }) => (
  <g transform={restTransform("crown", hairTop, headId)}>
    <path
      d="M 30 2 L 28 -18 L 39 -8 L 50 -22 L 61 -8 L 72 -18 L 70 2 Q 50 -1, 30 2 Z"
      fill="#FBBF24"
      stroke="#92400E"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M 30 -3 Q 50 -6, 70 -3" fill="none" stroke="#92400E" strokeOpacity="0.4" strokeWidth="1" />
    <circle cx="50" cy="-8" r="2" fill="#EF4444" />
    <circle cx="39" cy="-3" r="1.3" fill="#3B82F6" />
    <circle cx="61" cy="-3" r="1.3" fill="#3B82F6" />
  </g>
);

const Halo: PartComponent = ({ hairTop, headId }) => (
  <g transform={restTransform("halo", hairTop, headId)}>
    <ellipse cx="50" cy="0" rx="24" ry="5.5" fill="none" stroke="#FDE047" strokeWidth="3.5" />
    <ellipse cx="50" cy="0" rx="24" ry="5.5" fill="none" stroke="#CA8A04" strokeOpacity="0.4" strokeWidth="0.8" />
  </g>
);

export const Hats: PartRegistry<HatId> = {
  none: { component: noneHat, label: "None" },
  beanie: { component: Beanie, label: "Beanie" },
  baseballCap: { component: BaseballCap, label: "Baseball Cap" },
  bucketHat: { component: BucketHat, label: "Bucket Hat" },
  flagsCap: { component: FlagsCap, label: "Flags Cap" },
  patternedHeadband: { component: PatternedHeadband, label: "Patterned Headband" },
  cowboyHat: { component: CowboyHat, label: "Cowboy Hat", tags: ["brown", "black", "orange", "khaki"] },
  detectiveHat: { component: DetectiveHat, label: "Detective Hat", tags: ["brown", "black", "khaki"] },
  nurseCap: { component: NurseCap, label: "Nurse Cap" },
  chefHat: { component: ChefHat, label: "Chef Hat" },
  astronautHelmet: { component: AstronautHelmet, label: "Astronaut Helmet" },
  militaryHelmet: { component: MilitaryHelmet, label: "Military Helmet" },
  topHat: { component: TopHat, label: "Top Hat" },
  pirateHat: { component: PirateHat, label: "Pirate Hat", tags: ["black", "orange", "red", "purple", "green", "pink", "blue"] },
  vikingHelmet: { component: VikingHelmet, label: "Viking Helmet" },
  samuraiHelmet: { component: SamuraiHelmet, label: "Samurai Helmet", tags: ["red", "black"] },
  wizardHat: { component: WizardHat, label: "Wizard Hat" },
  propellerHat: { component: PropellerHat, label: "Propeller Hat" },
  beret: { component: Beret, label: "Beret" },
  strawHat: { component: StrawHat, label: "Straw Hat", tags: ["khaki", "brown", "black"] },
  ushanka: { component: Ushanka, label: "Ushanka" },
  skiMask: { component: SkiMask, label: "Ski Mask" },
  crown: { component: Crown, label: "Crown" },
  halo: { component: Halo, label: "Halo" },
};
