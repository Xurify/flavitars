import React from "react";
import { PartRegistry, PartComponent } from "./common";
import { HEADS, HatSeat, getHead, mirrorPath } from "../anatomy";
import { Point, scallop } from "./shapes";

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
  pirateHat: { kind: "seat", seat: { mid: 30, edge: 28 } },
  vikingHelmet: { kind: "seat", seat: { mid: 31, edge: 31 } },
  samuraiHelmet: { kind: "seat", seat: { mid: 31, edge: 31 } },
  wizardHat: { kind: "seat", seat: { mid: 29, edge: 29 } },
  propellerHat: { kind: "seat", seat: { mid: 27, edge: 27 } },
  beret: { kind: "seat", seat: { mid: 25, edge: 26 } },
  strawHat: { kind: "seat", seat: { mid: 30, edge: 30 } },
  ushanka: { kind: "seat", seat: { mid: 30, edge: 30 } },
  skiMask: { kind: "mask" },
  crown: { kind: "rest", sink: 4 },
  halo: { kind: "float", gap: 5 },
};

export const getHatFit = (hatId: HatId | string | undefined): HatFit => HAT_FITS[(hatId ?? "none") as HatId] ?? HAT_FITS.none;

const ink = { stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" } as const;
const shade = { fill: "black", opacity: 0.15 } as const;
const shine = { fill: "none", stroke: "white", strokeOpacity: 0.3, strokeWidth: 2, strokeLinecap: "round" } as const;

/** Highest a floating item may sit (centre y) and still stay inside the avatar frame. */
const FLOAT_CEILING = -10.5;

/** Rest hats sit on the hair surface; float hats hover over its peak. Both are authored around (50, 0). */
const restTransform = (hatId: HatId, headId: string, hairTop?: number, hairPeak?: number) => {
  const fit = HAT_FITS[hatId];
  const headTop = getHead(headId).top;
  if (fit.kind === "float") return `translate(0, ${Math.max(FLOAT_CEILING, (hairPeak ?? hairTop ?? headTop) - fit.gap)})`;
  const sink = fit.kind === "rest" ? fit.sink : 0;
  return `translate(0, ${(hairTop ?? headTop) + sink})`;
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

/** flags.games badge, drawn in a 0–1000 box and placed by the caller. */
const FlagsLogo = ({ uid }: { uid: string }) => (
  <g>
    <defs>
      <clipPath id={`${uid}-flags-logo`}>
        <rect x="0" y="0" width="1000" height="1000" rx="170" />
      </clipPath>
    </defs>
    <g clipPath={`url(#${uid}-flags-logo)`}>
      <rect x="0" y="0" width="1000" height="333" fill="#ED1C24" />
      <rect x="0" y="333" width="1000" height="334" fill="white" />
      <rect x="0" y="667" width="1000" height="333" fill="#005BAC" />
    </g>
    <g transform="translate(500, 500)" fill="none" stroke="#005BAC" strokeWidth="45">
      <circle r="340" fill="white" strokeWidth="55" />
      <line x1="-340" y1="0" x2="340" y2="0" />
      <ellipse rx="340" ry="170" />
      <line x1="0" y1="-340" x2="0" y2="340" />
      <ellipse rx="170" ry="340" />
    </g>
  </g>
);

const FLAGS_CAP_CROWN = "M 15.5 29.5 C 14 -3.5, 86 -3.5, 84.5 29.5 Z";

const FlagsCap: PartComponent = ({ uid = "fv" }) => {
  const sheen = `${uid}-flagscap-sheen`;
  const crownClip = `${uid}-flagscap-crown`;
  return (
    <g>
      <defs>
        <radialGradient id={sheen} cx="36%" cy="18%" r="80%">
          <stop offset="0%" stopColor="#50535E" />
          <stop offset="50%" stopColor="#1D1E23" />
          <stop offset="100%" stopColor="#0D0D10" />
        </radialGradient>
        <clipPath id={crownClip}>
          <path d={FLAGS_CAP_CROWN} />
        </clipPath>
      </defs>
      <path d={FLAGS_CAP_CROWN} fill={`url(#${sheen})`} {...ink} />
      <g clipPath={`url(#${crownClip})`} fill="none" strokeLinecap="round">
        <path d="M 50 4.5 Q 36 9, 30.5 30 M 50 4.5 Q 64 9, 69.5 30" stroke="#07070A" strokeWidth="1" />
        <path
          d="M 49 5.5 Q 35.2 10, 29.4 30 M 51 5.5 Q 64.8 10, 70.6 30"
          stroke="#62666F"
          strokeWidth="0.6"
          strokeDasharray="1.2 1"
        />
        <path d="M 50 4.5 Q 26 6, 17 26 M 50 4.5 Q 74 6, 83 26" stroke="#07070A" strokeWidth="0.9" />
        <circle cx="24" cy="15" r="0.9" fill="#0B0B0D" stroke="#62666F" strokeWidth="0.5" />
        <circle cx="76" cy="15" r="0.9" fill="#0B0B0D" stroke="#62666F" strokeWidth="0.5" />
        <path d="M 22 13 Q 33 5, 46 4.5" stroke="white" strokeOpacity="0.2" strokeWidth="1.8" />
      </g>
      <path d="M 16.4 25.6 Q 50 21, 83.6 25.6" fill="none" stroke="#ED1C24" strokeWidth="1.25" />
      <path d="M 16.2 27 Q 50 22.4, 83.8 27" fill="none" stroke="white" strokeWidth="1.05" />
      <path d="M 16 28.4 Q 50 23.8, 84 28.4" fill="none" stroke="#005BAC" strokeWidth="1.25" />
      <g transform="translate(50, 14.2)">
        <rect x="-8.6" y="-6.9" width="17.2" height="15" rx="3.6" fill="black" opacity="0.45" />
        <rect x="-8.2" y="-7.6" width="16.4" height="14.4" rx="3.4" fill="#F8F8F6" stroke="#C9CBD1" strokeWidth="0.6" />
        <rect
          x="-7.3"
          y="-6.7"
          width="14.6"
          height="12.6"
          rx="2.8"
          fill="none"
          stroke="#9EA2AA"
          strokeWidth="0.35"
          strokeDasharray="0.8 0.6"
        />
        <g transform="translate(-6, -6) scale(0.012)">
          <FlagsLogo uid={uid} />
        </g>
      </g>
      <circle cx="50" cy="4.3" r="2.2" fill="#1C1D22" {...ink} strokeWidth={1.3} />
      <circle cx="49.4" cy="3.7" r="0.65" fill="white" opacity="0.5" />
      <path d={capVisor} fill="#121215" {...ink} />
      <path d="M 15 30.6 Q 50 25, 85 30.6" fill="none" stroke="white" strokeOpacity="0.16" strokeWidth="1" />
      <path d="M 16.5 32.6 Q 50 27.2, 83.5 32.6" fill="none" stroke="#62666F" strokeWidth="0.55" strokeDasharray="1.2 0.9" />
      <path d="M 18 34.6 Q 50 29.4, 82 34.6" fill="none" stroke="#62666F" strokeWidth="0.55" strokeDasharray="1.2 0.9" />
    </g>
  );
};

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
  <g transform={restTransform("nurseCap", headId, hairTop)}>
    <path d="M 34 2 L 38 -10 H 62 L 66 2 Q 50 -1, 34 2 Z" fill="white" {...ink} />
    <rect x="47" y="-7" width="6" height="2" rx="0.5" fill="#EF4444" />
    <rect x="49" y="-9" width="2" height="6" rx="0.5" fill="#EF4444" />
  </g>
);

const ChefHat: PartComponent = () => (
  <g>
    <path
      d="M 23 22 C 9 21, 9 3, 22 3 C 21 -9, 37 -13, 44 -6 C 50 -15, 68 -12, 69 -2 C 84 -4, 90 18, 77 22 Z"
      fill="white"
      {...ink}
    />
    <path
      d="M 36 -1 Q 38 9, 36 19 M 60 0 Q 58 10, 60 19"
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
    <path d="M 26 27 L 27 -12 Q 50 -14.5, 73 -12 L 74 27 Z" fill="#1a1a1a" {...ink} />
    <path d="M 26.5 14 Q 50 11, 73.5 14 L 73.8 22 Q 50 19, 26.2 22 Z" fill={fill} />
    <path d="M 33 -6 V 10" stroke="white" strokeOpacity="0.15" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M 10 29 Q 12 24, 24 25 Q 50 22, 76 25 Q 88 24, 90 29 Q 90 33, 84 33 Q 50 30, 16 33 Q 10 33, 10 29 Z"
      fill="#1a1a1a"
      {...ink}
    />
  </g>
);

const PirateHat: PartComponent = ({ fill = "#1A1A1A" }) => {
  const outline =
    "M 5 27 C 6 18, 9 10, 13 5 C 20 11, 30 12, 36 9 C 40 0, 45 -3, 50 -3 C 55 -3, 60 0, 64 9 C 70 12, 80 11, 87 5 C 91 10, 94 18, 95 27 C 80 31.5, 65 33.5, 50 33.5 C 35 33.5, 20 31.5, 5 27 Z";
  return (
    <g>
      <path d={outline} fill={fill} {...ink} />
      <path
        d="M 7 27 C 22 31, 36 32.5, 50 32.5 C 64 32.5, 78 31, 93 27 L 93 24 C 78 28, 64 29.5, 50 29.5 C 36 29.5, 22 28, 7 24 Z"
        {...shade}
      />
      <path
        d="M 9 24 C 9.5 17, 11.5 11.5, 14 8.5 C 21 14, 31 15, 37.5 12 C 41 4, 45.5 1, 50 1 C 54.5 1, 59 4, 62.5 12 C 69 15, 79 14, 86 8.5 C 88.5 11.5, 90.5 17, 91 24"
        fill="none"
        stroke="#E2B13C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 9 27.5 C 23 31, 36 32, 50 32 C 64 32, 77 31, 91 27.5"
        fill="none"
        stroke="#E2B13C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M 40 6 Q 45 2.5, 50 2.5" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
      <g transform="translate(50, 17.5) scale(0.95)">
        <path d="M -8 -4.5 L 8 5 M -8 5 L 8 -4.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="-8.3" cy="-4.7" r="1.5" fill="white" />
        <circle cx="-8.3" cy="5.2" r="1.5" fill="white" />
        <circle cx="8.3" cy="-4.7" r="1.5" fill="white" />
        <circle cx="8.3" cy="5.2" r="1.5" fill="white" />
        <ellipse cx="0" cy="-1.8" rx="5" ry="4.6" fill="white" />
        <rect x="-2.8" y="1.6" width="5.6" height="3.4" rx="1.2" fill="white" />
        <circle cx="-1.9" cy="-2.2" r="1.3" fill={fill} />
        <circle cx="1.9" cy="-2.2" r="1.3" fill={fill} />
        <path d="M -1.3 2.7 V 4.6 M 0 2.7 V 4.6 M 1.3 2.7 V 4.6" stroke={fill} strokeWidth="0.5" />
      </g>
    </g>
  );
};

const vikingHorn =
  "M 22 23 C 12 22, 4 14, 3 1 C 2.6 -5, 4.5 -10, 8 -13 C 8 -5, 10.5 4, 17.5 10.5 C 20 12.5, 22.5 13.5, 25 13.5 Z";

const VikingHelmet: PartComponent = ({ fill = "#8E949C" }) => (
  <g>
    {[vikingHorn, mirrorPath(vikingHorn)].map((horn) => (
      <g key={horn}>
        <path d={horn} fill="#F3EAD6" {...ink} strokeWidth={1.8} />
      </g>
    ))}
    <g fill="none" stroke="#B9A889" strokeWidth="1.1" strokeLinecap="round">
      <path d="M 6.5 -1 Q 9 0.5, 11 -1.5 M 6 5 Q 9 7, 12.5 5 M 8 11 Q 11 13, 15 11" />
      <path d="M 93.5 -1 Q 91 0.5, 89 -1.5 M 94 5 Q 91 7, 87.5 5 M 92 11 Q 89 13, 85 11" />
    </g>
    <path d="M 18 22.5 L 25 13.5 L 27 21 Z M 82 22.5 L 75 13.5 L 73 21 Z" fill="#D4A23A" {...ink} strokeWidth={1.4} />
    <path d="M 15.5 29.5 C 13.5 1.5, 86.5 1.5, 84.5 29.5 Z" fill={fill} {...ink} />
    <path d="M 15.5 29.5 C 14.5 15, 22 7, 31 4.5 C 25 10, 22 19, 22.5 29.5 Z" fill="white" opacity="0.12" />
    <path d="M 45.5 4 Q 50 2.6, 54.5 4 L 55.5 29.5 L 44.5 29.5 Z" fill={fill} {...ink} strokeWidth={1.6} />
    <path d="M 45.5 4 Q 50 2.6, 54.5 4 L 55.5 29.5 L 44.5 29.5 Z" fill="black" opacity="0.18" />
    <g fill="black" opacity="0.35">
      <circle cx="50" cy="8" r="1" />
      <circle cx="50" cy="14" r="1" />
      <circle cx="50" cy="20" r="1" />
    </g>
    <path d="M 12.5 27 Q 50 22, 87.5 27 L 87.5 34 Q 50 29.5, 12.5 34 Z" fill={fill} {...ink} />
    <path d="M 12.5 27 Q 50 22, 87.5 27 L 87.5 34 Q 50 29.5, 12.5 34 Z" fill="black" opacity="0.2" />
    <g fill="#E8E4DA" opacity="0.75">
      <circle cx="19" cy="29.6" r="1.1" />
      <circle cx="31" cy="28.1" r="1.1" />
      <circle cx="43" cy="27.4" r="1.1" />
      <circle cx="57" cy="27.4" r="1.1" />
      <circle cx="69" cy="28.1" r="1.1" />
      <circle cx="81" cy="29.6" r="1.1" />
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
    <path
      d="M 22 27 C 28 11, 40 -3, 56 -10 C 64 -13.5, 74 -13.5, 80 -6 C 82 -3, 82 1, 79.5 3 C 76 -3.5, 70 -4.5, 64.5 -1.5 C 66 9, 71 18, 78 27 Z"
      fill={fill}
      {...ink}
    />
    <path
      d="M 64.5 -1.5 C 62 4, 58 7, 54 9"
      fill="none"
      stroke="black"
      strokeOpacity="0.2"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M 38 2 L 39.6 6 L 44 6.4 L 40.6 9.1 L 41.8 13.4 L 38 11 L 34.2 13.4 L 35.4 9.1 L 32 6.4 L 36.4 6 Z" fill="#FDE68A" />
    <circle cx="56" cy="14" r="1.3" fill="#FDE68A" />
    <circle cx="66" cy="20" r="1" fill="#F9A8D4" />
    <circle cx="48" cy="20" r="0.9" fill="#67E8F9" />
    <circle cx="80" cy="3.5" r="2.2" fill="#FDE68A" {...ink} strokeWidth={1.2} />
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
    <path d="M 17.5 29 C 16.5 6, 50 4, 50 4 L 50 29 Z" fill="#EF4444" {...ink} />
    <path d="M 82.5 29 C 83.5 6, 50 4, 50 4 L 50 29 Z" fill="#3B82F6" {...ink} />
    <path d="M 33.5 7 Q 41.5 4.6, 50 4 L 50 29 L 33.5 29 Z" fill="#22C55E" />
    <path d="M 50 4 Q 58.5 4.6, 66.5 7 L 66.5 29 L 50 29 Z" fill="#FACC15" />
    <path d="M 17.5 29 C 16.5 6, 83.5 6, 82.5 29 Z" fill="none" {...ink} />
    <path d="M 26 12 Q 34 7, 42 6" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M 14.5 26.5 Q 50 21.5, 85.5 26.5 L 85.5 31 Q 50 26.5, 14.5 31 Z" fill="#1E3A8A" {...ink} />
    <path d="M 50 4 V -3" {...ink} />
    <path d="M 50 -3.5 C 44 -8.5, 33 -8, 31 -5 C 33 -2, 44 -1.5, 50 -3.5 Z" fill="#FACC15" {...ink} strokeWidth={1.5} />
    <path d="M 50 -3.5 C 56 1.5, 67 1, 69 -2 C 67 -5, 56 -5.5, 50 -3.5 Z" fill="#F97316" {...ink} strokeWidth={1.5} />
    <circle cx="50" cy="-3.5" r="2" fill="#EF4444" {...ink} strokeWidth={1.3} />
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

/** Fur edge: a closed outline through `points` with small fluffy bumps every ~`step` units. */
const furOutline = (points: readonly Point[], step = 3.2) => {
  const dense: Point[] = [];
  points.forEach(([x, y], index) => {
    const [nx, ny] = points[(index + 1) % points.length];
    const count = Math.max(1, Math.round(Math.hypot(nx - x, ny - y) / step));
    for (let i = 0; i < count; i++) dense.push([x + ((nx - x) * i) / count, y + ((ny - y) * i) / count]);
  });
  return scallop(dense, { bulge: 0.58 });
};

const ushankaFlap = furOutline([
  [11, 31],
  [26, 31],
  [26, 58],
  [23, 64],
  [18.5, 66],
  [14, 64],
  [11, 58],
]);

const ushankaBand = furOutline([
  [9, 34],
  [8, 26],
  [11, 20],
  [22, 17],
  [36, 15.5],
  [50, 15],
  [64, 15.5],
  [78, 17],
  [89, 20],
  [92, 26],
  [91, 34],
  [70, 32.5],
  [50, 32],
  [30, 32.5],
]);

const Ushanka: PartComponent = ({ fill = "#6B4423" }) => (
  <g>
    {[ushankaFlap, mirrorPath(ushankaFlap)].map((flap) => (
      <path key={flap} d={flap} fill={fill} {...ink} strokeWidth={1.6} />
    ))}
    <g fill="none" stroke="black" strokeOpacity="0.18" strokeWidth="1" strokeLinecap="round">
      <path d="M 15 37 l 0.8 3 M 21 36 l -0.8 3 M 14.5 46 l 0.8 3 M 22 45 l -0.8 3 M 16 54 l 0.8 3 M 21 55 l -0.8 3" />
      <path d="M 85 37 l -0.8 3 M 79 36 l 0.8 3 M 85.5 46 l -0.8 3 M 78 45 l 0.8 3 M 84 54 l -0.8 3 M 79 55 l 0.8 3" />
    </g>
    <path d="M 17.5 22 C 16 0, 84 0, 82.5 22 Z" fill={fill} {...ink} />
    <path d="M 17.5 22 C 16 0, 84 0, 82.5 22 Z" fill="black" opacity="0.28" />
    <path d="M 50 7 V 16" stroke="black" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M 28 8 Q 37 3.5, 47 3" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1.8" strokeLinecap="round" />
    <path d={ushankaBand} fill={fill} {...ink} strokeWidth={1.6} />
    <g fill="none" stroke="black" strokeOpacity="0.18" strokeWidth="1" strokeLinecap="round">
      <path d="M 15 24 l 1 2.5 M 24 21 l -0.8 2.8 M 33 20 l 0.8 2.8 M 42 19.5 l -0.6 2.8 M 51 19.5 l 0.6 2.8 M 60 19.5 l -0.6 2.8 M 69 20 l 0.8 2.8 M 78 21 l -0.8 2.8 M 86 24 l -1 2.5" />
      <path d="M 20 29 l 0.8 2 M 30 28 l -0.8 2 M 40 27.5 l 0.6 2 M 55 27.5 l -0.6 2 M 65 28 l 0.8 2 M 75 28.5 l -0.8 2" />
    </g>
    <path d="M 20 21 Q 35 17.5, 50 17.2" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
  </g>
);

/** Eye and mouth openings of the ski mask; the face is drawn underneath and shows through. */
const skiMaskHoles = (faceOffset: number) => {
  const eyeY = 45 + faceOffset;
  const mouthY = 77.5 + faceOffset;
  const eye = (x: number) => `M ${x - 8.5} ${eyeY} a 8.5 6.8 0 1 0 17 0 a 8.5 6.8 0 1 0 -17 0 Z`;
  const mouth = `M 38 ${mouthY} a 5.5 5.5 0 0 1 5.5 -5.5 h 13 a 5.5 5.5 0 0 1 0 11 h -13 a 5.5 5.5 0 0 1 -5.5 -5.5 Z`;
  return `${eye(34.5)} ${eye(65.5)} ${mouth}`;
};

const SkiMask: PartComponent = ({ fill = "#D33C3C", headId, uid = "fv" }) => {
  const head = HEADS[headId] ?? HEADS.square;
  const clip = `${uid}-skimask`;
  const scale = "translate(50, 52) scale(1.05) translate(-50, -52)";
  const holes = skiMaskHoles(head.faceOffset);
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={head.path} transform={scale} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <path d={`M -50 -50 H 150 V 150 H -50 Z ${holes}`} fillRule="evenodd" fill={fill} />
        <path
          d={`M 30 -10 V 120 M 40 -10 V 120 M 50 -10 V 120 M 60 -10 V 120 M 70 -10 V 120 M 20 -10 V 120 M 80 -10 V 120`}
          stroke="black"
          strokeOpacity="0.08"
          strokeWidth="1.4"
        />
        <path d={holes} fill="none" stroke="black" strokeOpacity="0.18" strokeWidth="3.5" />
      </g>
      <path d={head.path} transform={scale} fill="none" {...ink} />
      <path d={holes} fill="none" {...ink} />
      <path
        d="M 27 18 Q 50 13, 73 18"
        transform={scale}
        fill="none"
        stroke="white"
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
};

const Crown: PartComponent = ({ hairTop, headId }) => (
  <g transform={restTransform("crown", headId, hairTop)}>
    <path
      d="M 32 2 L 30 -11 L 40 -4.5 L 50 -14 L 60 -4.5 L 70 -11 L 68 2 Q 50 -1, 32 2 Z"
      fill="#FBBF24"
      stroke="#92400E"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M 31.5 -2.5 Q 50 -5.5, 68.5 -2.5" fill="none" stroke="#92400E" strokeOpacity="0.4" strokeWidth="1" />
    <circle cx="50" cy="-6" r="1.8" fill="#EF4444" />
    <circle cx="40" cy="-1.5" r="1.2" fill="#3B82F6" />
    <circle cx="60" cy="-1.5" r="1.2" fill="#3B82F6" />
    <circle cx="30" cy="-11" r="1.2" fill="#FBBF24" stroke="#92400E" strokeWidth="1" />
    <circle cx="50" cy="-14" r="1.2" fill="#FBBF24" stroke="#92400E" strokeWidth="1" />
    <circle cx="70" cy="-11" r="1.2" fill="#FBBF24" stroke="#92400E" strokeWidth="1" />
  </g>
);

const Halo: PartComponent = ({ hairTop, hairPeak, headId }) => (
  <g transform={restTransform("halo", headId, hairTop, hairPeak)}>
    <ellipse cx="50" cy="0" rx="22" ry="4.5" fill="none" stroke="#FDE047" strokeWidth="3.2" />
    <ellipse cx="50" cy="0" rx="22" ry="4.5" fill="none" stroke="#CA8A04" strokeOpacity="0.4" strokeWidth="0.8" />
  </g>
);

export const Hats: PartRegistry<HatId> = {
  none: { component: noneHat, label: "None" },
  beanie: { component: Beanie, label: "Beanie", colorable: true },
  baseballCap: { component: BaseballCap, label: "Baseball Cap", colorable: true },
  bucketHat: { component: BucketHat, label: "Bucket Hat", colorable: true },
  flagsCap: { component: FlagsCap, label: "Flags Cap" },
  patternedHeadband: { component: PatternedHeadband, label: "Patterned Headband", colorable: true },
  cowboyHat: { component: CowboyHat, label: "Cowboy Hat", colorable: true, tags: ["brown", "black", "orange", "khaki"] },
  detectiveHat: { component: DetectiveHat, label: "Detective Hat", colorable: true, tags: ["brown", "black", "khaki"] },
  nurseCap: { component: NurseCap, label: "Nurse Cap" },
  chefHat: { component: ChefHat, label: "Chef Hat" },
  astronautHelmet: { component: AstronautHelmet, label: "Astronaut Helmet" },
  militaryHelmet: { component: MilitaryHelmet, label: "Military Helmet", colorable: true },
  topHat: { component: TopHat, label: "Top Hat", colorable: true },
  pirateHat: {
    component: PirateHat,
    label: "Pirate Hat",
    colorable: true,
    tags: ["black", "orange", "red", "purple", "green", "pink", "blue"],
  },
  vikingHelmet: { component: VikingHelmet, label: "Viking Helmet", colorable: true },
  samuraiHelmet: { component: SamuraiHelmet, label: "Samurai Helmet", tags: ["red", "black"] },
  wizardHat: { component: WizardHat, label: "Wizard Hat", colorable: true },
  propellerHat: { component: PropellerHat, label: "Propeller Hat" },
  beret: { component: Beret, label: "Beret", colorable: true },
  strawHat: { component: StrawHat, label: "Straw Hat", colorable: true, tags: ["khaki", "brown", "black"] },
  ushanka: { component: Ushanka, label: "Ushanka", colorable: true },
  skiMask: { component: SkiMask, label: "Ski Mask", colorable: true },
  crown: { component: Crown, label: "Crown" },
  halo: { component: Halo, label: "Halo" },
};
