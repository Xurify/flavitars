import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";
import { scallop, type Point } from "../../../parts/shapes";
import { mirrorPath } from "../../../anatomy";

export const MarikaHairIds = ["marikaCurlyBangs", "marikaBangsUpdo", "marika1", "marikaAtelier"] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

const both = (leftSide: string) => `${leftSide} ${mirrorPath(leftSide)}`;

/** A hairline run whose bumps hang towards the face (curly bangs). */
const curlyRun = (points: Point[]) => scallop(points, { closed: false, inward: true }).replace(/^M/, "L");

/** 80s mane: curly fringe down to the brows, then ringlets widening past the shoulders. */
const curlyMane = scallop([
  [5, 96],
  [1.5, 89],
  [0, 81],
  [1.5, 72],
  [3, 63],
  [4, 54],
  [5.5, 45],
  [7.5, 36],
  [11, 28],
  [16, 21],
  [22, 14.5],
  [29, 9.5],
  [37, 6],
  [45, 4.5],
  [53, 4.5],
  [61, 5.5],
  [69, 8.5],
  [76, 13],
  [82, 19],
  [87, 26],
  [91, 34],
  [93.5, 43],
  [95, 52],
  [96.5, 61],
  [98, 70],
  [99.5, 79],
  [98.5, 88],
  [95, 95],
  [89, 98],
  [83, 96],
  [77, 98.5],
  [72.5, 93],
  [71.5, 86],
  [66, 70],
  [34, 70],
  [28.5, 86],
  [27.5, 93],
  [23, 98.5],
  [17, 96],
  [11, 98],
]);

const MARIKA_HAIR: Record<MarikaHairId, HairSpec> = {
  marikaCurlyBangs: {
    cap: capAbove(
      `M 12 68 L 22 68 ${curlyRun([
        [22, 68],
        [22.5, 60],
        [23, 52],
        [24.5, 44.5],
        [28.5, 38],
        [34, 34],
        [40.5, 32.5],
        [47, 31.5],
        [53, 31.5],
        [59.5, 32.5],
        [66, 34],
        [71.5, 38],
        [75.5, 44.5],
        [77, 52],
        [77.5, 60],
        [78, 68],
      ])} L 88 68`,
    ),
    front: curlyMane,
    details: [
      "M 28 22 q 3 -3 6 0 M 41 15 q 3 -3 6 0 M 55 15 q 3 -3 6 0 M 67 21 q 3 -3 6 0",
      "M 34 27 q 2.5 2.5 5 0 M 47 24 q 2.5 2.5 5 0 M 61 26 q 2.5 2.5 5 0",
      both("M 9 38 q 3 3 0 6 q -3 3 0 6 M 5 58 q 3 3 0 6 q -3 3 0 6 M 12 70 q 3 3 0 6 q -3 3 0 6 M 6 82 q 3 3 0 6 M 16 86 q 3 3 0 6 M 15 26 q 3 0 4 3"),
    ].join(" "),
    shine: "M 30 11 C 40 6, 58 5.5, 68 9 C 58 9.5, 42 10.5, 33 15 Z",
    top: 5,
  },
  marikaBangsUpdo: {
    cap: capAbove(
      "M 12 76 L 21 76 L 21 52 C 21.5 46, 24.5 41.5, 29 38.5 C 35 35, 44 33, 52 31.5 C 60 30, 68 28, 73 27.5 C 76.5 27.5, 78.5 30, 79 34 L 79 56 L 88 56",
    ),
    front:
      "M 22 79 C 17 81, 12.5 78, 10.5 72.5 C 7 63, 7 50, 8.5 40 C 10.5 22, 26 6, 50 5.5 C 72 5.5, 88 16, 90 33 C 91 42, 90.5 50, 88 55 C 86 58.5, 82.5 59.5, 80 57.5 L 79 44 L 21 44 Z",
    details:
      "M 66 12 C 52 13, 34 21, 23 37 M 69 19 C 56 21, 41 27, 30 36 M 58 8 C 42 9, 26 17, 17 32 M 13 46 C 11 56, 12 66, 16 74 M 75 14 C 82 20, 87 30, 87 44",
    shine: "M 28 17 C 37 10, 50 8, 60 9.5 C 49 12, 39 16, 32 22 Z",
    top: 6,
  },
  marika1: {
    cap: capAbove(
      "M 12 50 L 21 50 L 21 36 Q 23 40, 25 34 L 30 36 Q 34 42, 38 34 L 43 35 Q 47 42, 50 34 L 55 35 Q 59 42, 62 34 L 68 36 Q 72 40, 75 34 Q 77 40, 79 36 L 79 50 L 88 50",
    ),
    front: "M 13 32 C 11 5, 89 5, 87 32 L 90 44 C 94 50, 88 54, 84 48 L 78 40 L 22 40 L 16 48 C 12 54, 6 50, 10 44 Z",
    back: "M 15 25 C 5 45, 0 85, 20 95 L 80 95 C 100 85, 95 45, 85 25 L 75 15 Q 50 5, 25 15 Z",
    details: "M 30 18 Q 32 26, 30 30 M 45 18 Q 48 28, 46 32 M 60 18 Q 58 28, 60 30 M 75 18 Q 72 26, 74 30",
    backDetails: "M 20 35 Q 15 55, 22 75 M 80 35 Q 85 55, 78 75",
    top: 11,
  },
  marikaAtelier: {
    cap: capAbove("M 12 60 L 21 60 L 21 40 Q 30 33, 40 36 Q 46 31, 50 35 Q 54 31, 60 36 Q 70 33, 79 40 L 79 60 L 88 60"),
    front:
      "M 14 36 L 7 26 L 12 16 L 7 6 L 17 3.5 L 15 -2.7 L 26 -1.4 L 30 -7.6 L 40 -5.2 L 46 -11.4 L 55 -9.5 L 64 -13.2 L 72 -7.6 L 81 -10.7 L 86 -3.9 L 83 2.3 L 93 4.8 L 88 14 L 95 25 L 86 36 Z",
    back: "M 10 30 C -5 60, -2 105, 15 115 L 35 110 L 50 115 L 65 110 L 85 115 C 102 105, 105 60, 90 30 Z",
    details: "M 22 16 L 26 10 L 22 4.8 M 78 16 L 74 10 L 78 4.8 M 40 12 L 45 4.8 L 40 -0.2 M 60 12 L 55 4.8 L 60 -0.2",
    backDetails: "M 25 40 Q 15 65, 20 95 M 75 40 Q 85 65, 80 95",
    top: 2,
    peak: -13,
  },
};

const registries = createHairRegistries(
  MARIKA_HAIR,
  {
    marikaCurlyBangs: "Marika Curls",
    marikaBangsUpdo: "Marika Swept Bob",
    marika1: "Marika Style 1",
    marikaAtelier: "Marika Atelier",
  },
  { presetOnly: true, isExclusive: true },
);

export const MarikaHairBack: PartRegistry<MarikaHairId> = registries.back;
export const MarikaHairFront: PartRegistry<MarikaHairId> = registries.front;
