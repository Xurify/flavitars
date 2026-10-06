import React from "react";
import { mirrorPath } from "../anatomy";
import { PartRegistry } from "./common";
import { arcPoints, scallop } from "./shapes";
import { HairSpec, renderHairBack, renderHairFront } from "./hair-engine";
import { HairIds, type HairId } from "./hair-ids";

export { HairIds, type HairId };
export type { HairSpec };

/** Region above a hairline. The hairline runs left to right in absolute coordinates. */
export const capAbove = (hairline: string) => {
  const nums = (hairline.match(/-?\d*\.?\d+/g) ?? []).map(Number);
  const [x0, y0] = nums;
  const [x1, y1] = nums.slice(-2);
  const rest = hairline.trim().replace(/^M\s*-?[\d.]+[\s,]+-?[\d.]+/, "");
  return `M -40 -60 L -40 ${y0} L ${x0} ${y0} ${rest} L ${x1} ${y1} L 140 ${y1} L 140 -60 Z`;
};

const both = (leftSide: string) => `${leftSide} ${mirrorPath(leftSide)}`;

const capsule = (x: number, y0: number, y1: number, w: number) =>
  `M ${x - w / 2} ${y0} L ${x - w / 2} ${y1} A ${w / 2} ${w / 2} 0 0 0 ${x + w / 2} ${y1} L ${x + w / 2} ${y0} A ${w / 2} ${w / 2} 0 0 0 ${x - w / 2} ${y0} Z`;

const HAIRLINE = {
  natural: "M 14 46 L 24 46 C 23 38, 26 31, 34 29 Q 50 26, 66 29 C 74 31, 77 38, 76 46 L 86 46",
  high: "M 14 42 L 23 42 C 23 35, 27 30, 35 28 Q 50 25, 65 28 C 73 30, 77 35, 77 42 L 86 42",
  pulledBack: "M 14 46 L 23 46 C 23 37, 27 30, 35 28 Q 50 25.5, 65 28 C 73 30, 77 37, 77 46 L 86 46",
  middlePart:
    "M 12 70 L 21 70 L 21 42 C 24 36, 34 31, 42 29.5 Q 48 28, 50 24 Q 52 28, 58 29.5 C 66 31, 76 36, 79 42 L 79 70 L 88 70",
};

/** Sides that run down the skull to `y` (so long hair covers the temples). */
const sidesTo = (y: number, fringe: string) => `M 12 ${y} L 21 ${y} L 21 38 ${fringe} L 79 38 L 79 ${y} L 88 ${y}`;

const DOME = {
  low: "M 16 32 C 15 7, 85 7, 84 32 Z",
  medium: "M 16 32 C 15 4, 85 4, 84 32 Z",
  full: "M 14 34 C 12 1, 88 1, 86 34 Z",
};

const roundedCurlsOutline = scallop([...arcPoints(50, 40, 40, 36, 160, 380, 13), [78, 52], [70, 44], [30, 44], [22, 52]]);

const afroOutline = scallop([...arcPoints(50, 36, 46, 42, 150, 390, 17), [70, 60], [30, 60]]);

const curlyBobOutline = scallop([
  [14, 74],
  ...arcPoints(50, 40, 39, 36, 168, 372, 12),
  [86, 74],
  [80, 80],
  [74, 74],
  [72, 44],
  [28, 44],
  [26, 74],
  [20, 80],
]);

const locs = (xs: number[], y0: number, y1s: number[]) => xs.map((x, i) => capsule(x, y0, y1s[i % y1s.length], 5)).join(" ");

export const HAIR_SPECS: Record<HairId, HairSpec> = {
  bald: {},

  buzzCut: {
    stubble: capAbove("M 14 42 L 22 42 C 22 34, 28 29, 36 27.5 Q 50 25, 64 27.5 C 72 29, 78 34, 78 42 L 86 42"),
  },

  flatTopShort: {
    cap: capAbove(HAIRLINE.natural),
    front: "M 17 32 L 17 10 Q 50 7, 83 10 L 83 32 Z",
    details: "M 27 12 V 20 M 38 10.5 V 18 M 50 10 V 18 M 62 10.5 V 18 M 73 12 V 20",
    top: 8.5,
  },

  crewCut: {
    cap: capAbove(HAIRLINE.natural),
    front: DOME.medium,
    details: "M 30 16 Q 36 12, 42 15 M 52 13 Q 58 11, 64 14",
    top: 11,
  },

  caesarCrop: {
    cap: capAbove(
      "M 14 46 L 23 46 C 22 40, 22 36, 24 34 L 29 35.5 L 34 33 L 39 35.5 L 44 33 L 49 35.5 L 54 33 L 59 35.5 L 64 33 L 69 35.5 L 74 33 L 76 34 C 78 37, 78 41, 77 46 L 86 46",
    ),
    front: DOME.low,
    details: "M 30 20 L 29 33 M 40 18 L 39 33 M 50 18 L 49 33 M 60 18 L 59 33 M 70 20 L 69 33",
    top: 13,
  },

  fadeCrop: {
    cap: capAbove("M 14 31 L 22 31 C 30 27, 40 25.5, 50 25.5 C 60 25.5, 70 27, 78 31 L 86 31"),
    front: "M 19 30 C 18 5, 82 5, 81 30 Z",
    stubble: capAbove(HAIRLINE.natural),
    details: "M 36 16 Q 44 12, 52 14",
    top: 12,
  },

  undercut: {
    stubble: capAbove(HAIRLINE.natural),
    cap: capAbove("M 14 31 L 22 31 C 24 31, 26 32, 28 32 C 38 32, 50 26, 62 24.5 C 70 23.5, 76 26, 78 29 L 86 29"),
    front: "M 16 30 C 13 10, 34 2, 56 3 C 76 4, 90 14, 86 30 Z",
    details: "M 26 28 Q 40 22, 56 14 M 34 30 Q 50 22, 66 18 M 46 8 Q 62 6, 78 14",
    top: 5,
  },

  slickBack: {
    cap: capAbove("M 14 44 L 23 44 C 23 36, 27 30, 35 28 Q 44 26.5, 50 28.5 Q 56 26.5, 65 28 C 73 30, 77 36, 77 44 L 86 44"),
    front: "M 15 32 C 13 4, 87 4, 85 32 Z",
    details: "M 30 26 Q 33 16, 42 9 M 43 26 Q 45 15, 53 8 M 57 26 Q 59 16, 66 9 M 70 27 Q 72 20, 76 15",
    accents: () => (
      <path d="M 30 12 Q 40 7, 50 6.5" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
    ),
    top: 11,
  },

  curtains: {
    cap: capAbove(
      "M 14 46 L 23 46 C 22 40, 23 37, 26 37 C 34 37, 44 33, 50 24 C 56 33, 66 37, 74 37 C 77 37, 78 40, 77 46 L 86 46",
    ),
    front: "M 15 34 C 13 5, 87 5, 85 34 Z",
    details: "M 50 9 L 50 24 M 42 13 Q 34 22, 28 35 M 58 13 Q 66 22, 72 35",
    top: 12,
  },

  shortWaves: {
    cap: capAbove(HAIRLINE.natural),
    front: "M 16 32 C 14 20, 18 12, 26 10 Q 32 5, 38 9 Q 44 4, 50 8 Q 56 4, 62 9 Q 68 5, 74 10 C 82 12, 86 20, 84 32 Z",
    details: "M 24 20 Q 30 16, 36 20 T 48 20 T 60 20 T 72 20 T 80 22 M 24 27 Q 30 23, 36 27 T 48 27 T 60 27 T 72 27",
    top: 6,
  },

  messyShort: {
    cap: capAbove(
      "M 14 44 L 23 44 C 23 38, 24 34, 27 33 L 31 36 L 34 31 L 40 35 L 44 30 L 50 34 L 55 29 L 60 34 L 65 30 L 70 34 L 74 32 C 77 34, 78 38, 77 44 L 86 44",
    ),
    front:
      "M 15 32 L 11 20 L 19 20 L 16 9 L 27 13 L 29 2 L 38 9 L 44 0 L 50 8 L 57 0 L 62 9 L 71 3 L 73 13 L 84 9 L 81 20 L 89 20 L 85 32 Z",
    details: "M 30 14 L 36 22 M 50 10 L 50 20 M 68 14 L 63 22",
    top: 0,
    peak: 0,
  },

  shortJaggedCrop: {
    cap: capAbove(
      "M 12 52 L 21 52 L 21 38 L 26 40 L 30 34 L 35 39 L 40 33 L 45 39 L 50 33 L 55 39 L 60 33 L 65 39 L 70 34 L 74 40 L 79 38 L 79 52 L 88 52",
    ),
    front: "M 14 34 C 11 4, 89 4, 86 34 L 88 53 L 83 49 L 81 56 L 78 44 L 22 44 L 19 56 L 17 49 L 12 53 Z",
    details: "M 30 14 L 34 26 M 44 10 L 46 24 M 58 10 L 56 24 M 70 14 L 66 26",
    top: 11.5,
  },

  sidePartShort: {
    cap: capAbove("M 14 44 L 23 44 C 23 36, 26 33, 30 34 C 40 34, 52 30, 62 26 C 70 24, 76 26, 78 32 L 78 44 L 86 44"),
    front: "M 15 32 C 12 10, 30 2, 52 3 C 74 3, 88 12, 85 32 Z",
    details: "M 37 5 Q 35 12, 37 20 M 42 14 Q 56 20, 72 22 M 46 10 Q 62 12, 76 18",
    top: 3,
  },

  bobCutSharp: {
    cap: capAbove(sidesTo(70, "L 21 36 Q 50 33, 79 36")),
    front: "M 12 34 C 9 3, 91 3, 88 34 L 90 77 L 72 71 L 72 44 L 28 44 L 28 71 L 10 77 Z",
    back: "M 15 28 L 11 76 L 89 76 L 85 28 Z",
    details: "M 30 12 Q 28 24, 30 34 M 50 8 V 33 M 70 12 Q 72 24, 70 34 M 15 44 L 14 70 M 85 44 L 86 70",
    top: 11,
  },

  jaggedFringeBob: {
    cap: capAbove(sidesTo(70, "L 21 36 L 26 34 L 32 39 L 38 33 L 44 39 L 50 33 L 56 39 L 62 33 L 68 39 L 74 34 L 79 36")),
    front:
      "M 12 34 C 9 3, 91 3, 88 34 L 90 78 L 85 74 L 81 80 L 76 74 L 72 76 L 72 44 L 28 44 L 28 76 L 24 74 L 19 80 L 15 74 L 10 78 Z",
    back: "M 15 28 L 11 76 L 89 76 L 85 28 Z",
    details: "M 32 14 L 34 30 M 50 9 V 28 M 68 14 L 66 30 M 15 46 L 15 72 M 85 46 L 85 72",
    top: 11,
  },

  bowlCutRound: {
    cap: capAbove("M 12 50 L 21 50 L 21 36.5 Q 50 34, 79 36.5 L 79 50 L 88 50"),
    front: "M 12 40 C 8 2, 92 2, 88 40 C 88 47, 84 53, 79 53 L 79 44 L 21 44 L 21 53 C 16 53, 12 47, 12 40 Z",
    details: "M 30 12 Q 27 24, 29 35 M 50 8 V 35 M 70 12 Q 73 24, 71 35",
    accents: () => (
      <path d="M 26 14 Q 36 7, 48 6" fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="2.5" strokeLinecap="round" />
    ),
    top: 10.5,
  },

  sharpBobYellowHighlight: {
    cap: capAbove(sidesTo(70, "L 21 40 C 32 39, 44 35, 56 32 C 66 30, 74 31, 79 34")),
    front: "M 12 34 C 9 3, 91 3, 88 34 L 90 77 L 72 71 L 72 44 L 28 44 L 28 71 L 10 77 Z",
    back: "M 15 28 L 11 76 L 89 76 L 85 28 Z",
    details: "M 36 8 Q 44 20, 60 30 M 50 6 Q 60 16, 74 24 M 85 44 L 86 70",
    paint: () => (
      <path
        d="M 30 4 Q 16 18, 14 44 L 10 80 L 18 80 L 20 44 Q 22 26, 36 10 Z"
        fill="#FDE68A"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    ),
    top: 11,
  },

  shortCurlyBob: {
    cap: capAbove(
      sidesTo(60, "L 21 38 Q 24 32, 29 36 Q 33 30, 38 35 Q 43 29, 48 34 Q 53 29, 58 34 Q 63 29, 68 35 Q 73 31, 77 36 L 79 38"),
    ),
    front: curlyBobOutline,
    back: "M 16 30 L 13 74 L 87 74 L 84 30 Z",
    details: "M 14 50 q 3 3 0 6 M 86 50 q -3 3 0 6 M 30 14 q 3 3 6 0 M 58 10 q 3 3 6 0 M 16 64 q 3 3 0 6 M 84 64 q -3 3 0 6",
    top: 3,
  },

  longStraightLayered: {
    cap: capAbove(HAIRLINE.middlePart),
    front:
      "M 14 30 C 10 6, 90 6, 86 30 C 90 50, 92 80, 90 99 L 77 99 C 78 80, 76 60, 72 44 L 28 44 C 24 60, 22 80, 23 99 L 10 99 C 8 80, 10 50, 14 30 Z",
    back: "M 16 26 C 8 44, 8 78, 12 99 L 88 99 C 92 78, 92 44, 84 26 Z",
    details:
      "M 50 9 L 50 24 M 17 40 C 14 58, 15 80, 16 97 M 83 40 C 86 58, 85 80, 84 97 M 40 12 Q 30 20, 24 32 M 60 12 Q 70 20, 76 32",
    top: 12,
  },

  longLocs: {
    cap: capAbove("M 12 50 L 21 50 L 21 38 C 26 32, 40 30, 50 29 C 60 30, 74 32, 79 38 L 79 50 L 88 50"),
    front: DOME.medium,
    back: "M 16 28 C 8 44, 8 80, 12 96 L 88 96 C 92 80, 92 44, 84 28 Z",
    backDetails: "M 26 40 V 96 M 34 60 V 96 M 42 70 V 96 M 50 70 V 96 M 58 70 V 96 M 66 60 V 96 M 74 40 V 96",
    details: "M 30 14 Q 36 10, 42 14 M 58 14 Q 64 10, 70 14 M 44 8 Q 50 6, 56 8",
    accents: (color) => (
      <g fill={color} stroke="currentColor" strokeWidth="1.5">
        <path d={locs([11, 16.5, 22], 30, [94, 97, 88])} />
        <path d={locs([89, 83.5, 78], 30, [94, 97, 88])} />
        <g fill="#E5E7EB" stroke="none">
          <rect x="9" y="56" width="4" height="1.6" rx="0.5" />
          <rect x="14.5" y="72" width="4" height="1.6" rx="0.5" />
          <rect x="81.5" y="62" width="4" height="1.6" rx="0.5" />
          <rect x="87" y="78" width="4" height="1.6" rx="0.5" />
        </g>
      </g>
    ),
    top: 11,
  },

  messySideSwept: {
    cap: capAbove(sidesTo(58, "L 21 40 C 26 42, 32 40, 38 36 C 48 30, 60 30, 68 34 L 72 36 L 73 31 C 76 32, 79 36, 79 38")),
    front:
      "M 13 38 C 6 18, 16 4, 34 2 C 52 -2, 76 0, 88 12 C 94 22, 90 34, 87 40 L 90 61 L 84 57 L 80 63 L 78 44 L 22 44 L 20 63 L 16 57 L 10 61 Z",
    back: "M 16 28 C 6 44, 6 76, 12 90 L 88 90 C 94 76, 94 44, 84 28 Z",
    details: "M 28 8 Q 40 16, 46 30 M 46 4 Q 58 14, 62 28 M 64 4 Q 76 12, 80 24",
    top: 1,
  },

  roundedCurls: {
    cap: capAbove(
      sidesTo(50, "L 21 38 Q 25 32, 30 36 Q 35 30, 40 34 Q 45 29, 50 33 Q 55 29, 60 34 Q 65 30, 70 36 Q 75 32, 79 38"),
    ),
    front: roundedCurlsOutline,
    details: "M 28 14 q 3 3 6 0 M 46 9 q 3 3 6 0 M 64 12 q 3 3 6 0 M 13 40 q 3 3 0 6 M 87 40 q -3 3 0 6",
    top: 3,
  },

  trapezoidCut: {
    cap: capAbove(sidesTo(70, "L 21 35 L 79 35")),
    front: "M 21 9 L 79 9 L 93 80 L 74 80 L 72 44 L 28 44 L 26 80 L 7 80 Z",
    back: "M 22 20 L 78 20 L 90 79 L 10 79 Z",
    details: "M 22 14 L 78 14 M 13 50 L 10 76 M 87 50 L 90 76",
    top: 9,
  },

  roundedMiddlePart: {
    cap: capAbove(HAIRLINE.middlePart),
    front:
      "M 14 32 C 12 5, 88 5, 86 32 C 88 50, 90 80, 88 95 Q 82 99, 76 95 L 73 44 L 27 44 L 24 95 Q 18 99, 12 95 C 10 80, 12 50, 14 32 Z",
    back: "M 16 26 C 8 44, 8 80, 12 95 Q 50 101, 88 95 C 92 80, 92 44, 84 26 Z",
    details: "M 50 8 L 50 24 M 17 42 C 15 60, 16 80, 17 93 M 83 42 C 85 60, 84 80, 83 93",
    top: 11,
  },

  puffyMiddlePart: {
    cap: capAbove(HAIRLINE.middlePart),
    front:
      "M 15 30 C 12 3, 88 3, 85 30 C 97 36, 99 56, 92 68 C 89 74, 83 75, 77 71 L 76 44 L 24 44 L 23 71 C 17 75, 11 74, 8 68 C 1 56, 3 36, 15 30 Z",
    back: "M 16 28 C 4 40, 4 70, 14 78 L 86 78 C 96 70, 96 40, 84 28 Z",
    details: "M 50 8 L 50 24 M 10 44 Q 6 54, 10 64 M 90 44 Q 94 54, 90 64 M 36 10 Q 28 16, 22 28 M 64 10 Q 72 16, 78 28",
    top: 10,
  },

  heartMiddlePart: {
    cap: capAbove(HAIRLINE.middlePart),
    front:
      "M 50 13 C 44 0, 20 -2, 13 16 C 9 30, 11 52, 11 90 L 24 90 L 25 44 L 75 44 L 76 90 L 89 90 C 89 52, 91 30, 87 16 C 80 -2, 56 0, 50 13 Z",
    back: "M 18 24 C 8 40, 8 80, 12 92 L 88 92 C 92 80, 92 40, 82 24 Z",
    details:
      "M 50 13 L 50 24 M 16 40 C 14 60, 15 76, 15 88 M 84 40 C 86 60, 85 76, 85 88 M 30 8 Q 22 14, 20 26 M 70 8 Q 78 14, 80 26",
    top: 4.5,
  },

  sweptFringe: {
    cap: capAbove(sidesTo(70, "L 21 44 C 30 44, 40 40, 48 34 C 58 27, 70 26, 79 30")),
    front: "M 13 32 C 10 3, 90 3, 87 32 C 90 50, 92 80, 90 98 L 77 98 L 76 44 L 24 44 L 23 98 L 10 98 C 8 80, 10 50, 13 32 Z",
    back: "M 16 26 C 8 44, 8 80, 12 98 L 88 98 C 92 80, 92 44, 84 26 Z",
    details: "M 66 12 Q 52 22, 36 38 M 78 18 Q 62 26, 50 34 M 17 44 C 15 60, 16 80, 17 96 M 83 44 C 85 60, 84 80, 83 96",
    top: 10,
  },

  singleTopKnot: {
    cap: capAbove(HAIRLINE.pulledBack),
    front: `${DOME.low} M 39 6 A 11 9.5 0 1 1 61 6 A 11 9.5 0 1 1 39 6 Z`,
    details: "M 44 3 Q 50 0, 56 4 M 42 8 Q 50 12, 58 8 M 34 18 Q 42 14, 48 14 M 66 18 Q 58 14, 52 14",
    accents: () => <path d="M 42 14 Q 50 17, 58 14" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />,
    top: 13,
    peak: -4,
  },

  doubleSpaceBuns: {
    cap: capAbove("M 14 46 L 23 46 C 23 37, 27 30, 35 28 Q 46 26, 50 24 Q 54 26, 65 28 C 73 30, 77 37, 77 46 L 86 46"),
    front: `${DOME.low} ${both("M 12 10 A 10 10 0 1 1 32 10 A 10 10 0 1 1 12 10 Z")}`,
    details: `M 50 9 L 50 24 ${both("M 16 7 Q 22 3, 28 8 M 15 13 Q 22 17, 29 12")}`,
    top: 3,
    peak: -1,
  },

  lowPonytail: {
    cap: capAbove(HAIRLINE.pulledBack),
    front: DOME.low,
    back: "M 66 42 C 86 44, 94 62, 90 84 C 88 94, 80 98, 76 92 C 82 78, 82 60, 64 50 Z",
    details: "M 30 16 Q 40 12, 48 14 M 70 16 Q 62 12, 54 14",
    backDetails: "M 74 50 Q 86 62, 84 86 M 70 54 Q 80 66, 80 88",
    top: 13,
  },

  largeAfro: {
    cap: capAbove(HAIRLINE.natural),
    front: afroOutline,
    details:
      "M 22 18 q 3 3 6 0 M 40 6 q 3 3 6 0 M 60 8 q 3 3 6 0 M 74 22 q 3 3 6 0 M 10 40 q 3 3 0 6 M 90 40 q -3 3 0 6 M 30 4 q 2 2 4 0 M 52 0 q 2 2 4 0",
    top: -5,
  },

  spikyMohawk: {
    stubble: capAbove(HAIRLINE.high),
    cap: "M 39 -40 L 39 21 Q 44 22, 50 26 Q 56 22, 61 21 L 61 -40 Z",
    front: "M 38 22 L 30 6 L 40 12 L 41 -6 L 50 5 L 56 -9 L 59 10 L 70 3 L 62 22 Z",
    details: "M 44 22 L 43 6 M 52 22 L 55 0",
    peak: -9,
  },

  aviatorFlaps: {
    front: `M 26 73 C 22 79, 16 82, 10 80 C 4 78, 1.5 70, 2 60 C 2.5 46, 7 35, 13.5 28 L 15 26 L 15 18 Q 15 14, 19 13 Q 50 2, 81 13 Q 85 14, 85 18 L 85 26 L 86.5 28 C 93 35, 97.5 46, 98 60 C 98.5 70, 96 78, 90 80 C 84 82, 78 79, 74 73 L 74 35 L 26 35 Z`,
    details: both("M 12 31 C 7 40, 5 52, 6 66 M 16.5 33 C 13 44, 12 56, 14 72"),
    shine: both("M 6 50 C 6.5 42, 9 36, 12 32 C 10.5 38, 9 45, 8.5 54 Z") + " M 30 9.5 Q 50 4, 70 9.5 Q 50 6.5, 30 9.5 Z",
    accents: () => (
      <g>
        <path d={both("M 15 26 L 15 35 L 21 35")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <g fill="#ff6b6b" stroke="currentColor" strokeWidth="1.5">
          <rect x="10.5" y="23" width="12" height="5" rx="2.5" />
          <rect x="77.5" y="23" width="12" height="5" rx="2.5" />
        </g>
        <path d="M 12.5 24.6 H 16.5 M 79.5 24.6 H 83.5" stroke="white" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" />
      </g>
    ),
    top: 7.5,
  },

  texturedPompadour: {
    cap: capAbove(HAIRLINE.high),
    front: "M 16 32 C 12 18, 18 4, 32 1 C 42 -5, 60 -7, 74 -1 C 88 5, 90 20, 84 32 Z",
    details: "M 28 22 Q 34 8, 50 2 M 40 24 Q 46 10, 64 4 M 54 24 Q 60 14, 76 8",
    accents: () => (
      <path d="M 34 6 Q 46 -1, 60 -1" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
    ),
    top: -4,
  },

  largeHairBow: {
    cap: capAbove(sidesTo(60, "L 21 40 C 26 34, 38 30, 50 29.5 C 62 30, 74 34, 79 40")),
    front: `${DOME.medium} M 50 10 C 38 -14, 8 -8, 14 12 C 18 22, 36 22, 50 10 Z M 50 10 C 62 -14, 92 -8, 86 12 C 82 22, 64 22, 50 10 Z M 44 10 A 6 6 0 1 1 56 10 A 6 6 0 1 1 44 10 Z`,
    back: "M 16 28 C 8 44, 8 70, 14 80 L 86 80 C 92 70, 92 44, 84 28 Z",
    details: "M 22 6 Q 30 10, 40 10 M 78 6 Q 70 10, 60 10 M 22 14 Q 32 16, 42 12 M 78 14 Q 68 16, 58 12",
    top: 11,
    peak: -8,
  },

  detailedHairBow: {
    cap: capAbove(sidesTo(70, "L 21 40 C 26 34, 38 30, 50 29.5 C 62 30, 74 34, 79 40")),
    front: `${DOME.medium} M 50 11 C 42 -6, 20 -4, 22 10 C 23 18, 38 18, 50 11 Z M 50 11 C 58 -6, 80 -4, 78 10 C 77 18, 62 18, 50 11 Z M 45 11 A 5 5 0 1 1 55 11 A 5 5 0 1 1 45 11 Z`,
    back: "M 16 28 C 8 44, 8 78, 12 94 L 88 94 C 92 78, 92 44, 84 28 Z",
    details: "M 28 5 Q 34 10, 42 11 M 72 5 Q 66 10, 58 11 M 30 12 Q 36 15, 44 12 M 70 12 Q 64 15, 56 12",
    top: 11,
    peak: -5,
  },
};

export const getHairSpec = (hairId: string | undefined): HairSpec | undefined =>
  (hairId && (ALL_HAIR_SPECS[hairId] ?? HAIR_SPECS[hairId as HairId])) || undefined;

/** Preset packs register their own specs here so fitting logic sees them too. */
export const ALL_HAIR_SPECS: Record<string, HairSpec> = { ...HAIR_SPECS };
export const registerHairSpecs = (specs: Record<string, HairSpec>) => Object.assign(ALL_HAIR_SPECS, specs);

const HAIR_LABELS: Record<HairId, string> = {
  bald: "Bald",
  buzzCut: "Buzz Cut",
  flatTopShort: "Flat Top",
  crewCut: "Crew Cut",
  caesarCrop: "Caesar Crop",
  fadeCrop: "Fade Crop",
  undercut: "Undercut",
  slickBack: "Slick Back",
  curtains: "Curtains",
  shortWaves: "Short Waves",
  messyShort: "Messy Short",
  shortJaggedCrop: "Jagged Crop",
  sidePartShort: "Side Part",
  bobCutSharp: "Sharp Bob",
  jaggedFringeBob: "Jagged Bob",
  bowlCutRound: "Bowl Cut",
  sharpBobYellowHighlight: "Highlight Bob",
  shortCurlyBob: "Curly Bob",
  longStraightLayered: "Long Layered",
  longLocs: "Long Locs",
  messySideSwept: "Messy Side Swept",
  roundedCurls: "Rounded Curls",
  trapezoidCut: "Trapezoid",
  roundedMiddlePart: "Middle Part",
  puffyMiddlePart: "Puffy Middle Part",
  heartMiddlePart: "Heart Middle Part",
  sweptFringe: "Swept Fringe",
  singleTopKnot: "Top Knot",
  doubleSpaceBuns: "Space Buns",
  lowPonytail: "Low Ponytail",
  largeAfro: "Afro",
  spikyMohawk: "Mohawk",
  aviatorFlaps: "Aviator Flaps",
  texturedPompadour: "Pompadour",
  largeHairBow: "Large Bow",
  detailedHairBow: "Detailed Bow",
};

export const createHairRegistries = <Id extends string>(
  specs: Record<Id, HairSpec>,
  labels: Record<Id, string>,
  flags: { presetOnly?: boolean; isExclusive?: boolean } = {},
) => {
  const ids = Object.keys(specs) as Id[];
  registerHairSpecs(specs);
  return {
    front: Object.fromEntries(
      ids.map((id) => [id, { component: renderHairFront(specs[id]), label: labels[id], ...flags }]),
    ) as PartRegistry<Id>,
    back: Object.fromEntries(
      ids.map((id) => [id, { component: renderHairBack(specs[id]), label: labels[id], ...flags }]),
    ) as PartRegistry<Id>,
  };
};

const registries = createHairRegistries(HAIR_SPECS, HAIR_LABELS);

export const HairFront: PartRegistry<HairId> = registries.front;
export const HairBack: PartRegistry<HairId> = registries.back;
