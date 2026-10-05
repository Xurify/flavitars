import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";
import { scallop, type Point } from "../../../parts/shapes";
import { mirrorPath } from "../../../anatomy";

export const MarikaHairIds = ["marikaCurlyBangs", "marikaBangsUpdo", "marika1", "marikaAtelier"] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

const both = (leftSide: string) => `${leftSide} ${mirrorPath(leftSide)}`;

/** A hairline run whose bumps hang towards the face (curly bangs). */
const curlyRun = (points: Point[]) => scallop(points, { closed: false, inward: true }).replace(/^M/, "L");

/**
 * Loose 80s curls: close to the skull on top, widening past the jaw, with the lengths falling
 * in front of the shoulders. Uneven spacing keeps the ringlets from reading as a wig.
 */
const curlyMane = scallop([
  [8, 97],
  [3, 89],
  [1, 80],
  [2.5, 71],
  [3, 62],
  [5, 52],
  [6.5, 43],
  [9, 35],
  [13, 27],
  [18, 20],
  [24.5, 14],
  [32, 9.5],
  [40, 7],
  [47, 6],
  [54, 6],
  [61, 7.5],
  [68.5, 10],
  [75.5, 14.5],
  [81.5, 20.5],
  [86.5, 28],
  [90, 36],
  [92.5, 44],
  [94, 53],
  [95.5, 62],
  [97, 71],
  [98.5, 80],
  [97, 89],
  [92, 97],
  [84, 99.5],
  [76, 97],
  [70, 90],
  [67, 82],
  [64, 72],
  [36, 72],
  [33, 82],
  [30, 90],
  [24, 97],
  [16, 99.5],
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
      "M 29 22 q 3 -3 6 0 M 42 15 q 3 -3 6 0 M 56 15 q 3 -3 6 0 M 68 21 q 3 -3 6 0",
      "M 35 27 q 2.5 2.5 5 0 M 48 24 q 2.5 2.5 5 0 M 62 26 q 2.5 2.5 5 0",
      both("M 9 38 q 3 3 0 6 q -3 3 0 6 M 6 58 q 3 3 0 6 q -3 3 0 6 M 12 72 q 3 3 0 6 q -3 3 0 6 M 6 84 q 3 3 0 6 M 18 86 q 3 3 0 6 M 16 26 q 3 0 4 3"),
    ].join(" "),
    shine: "M 32 12 C 42 7, 58 6.5, 68 10 C 58 10.5, 44 11.5, 35 16 Z",
    top: 6,
  },
  marikaBangsUpdo: {
    // Wispy fringe: uneven strands ending in soft points, with shallow rounded gaps between them.
    cap: capAbove(
      "M 12 70 L 21 70 L 21 39.5 C 23 36.5, 24 36.5, 26 40.5 C 28.5 36.6, 30.5 36.6, 33 39.8 C 35 36.2, 37 36.2, 39 41 C 41.5 36.4, 43.5 36.4, 46 40.2 C 48 36, 50 36, 52 40.8 C 54.5 36.3, 56.5 36.3, 59 39.9 C 61.5 36.2, 63.5 36.2, 66 40.6 C 68.5 36.5, 70.5 36.5, 73 40 C 75 36.6, 77 36.6, 79 39.5 L 79 70 L 88 70",
    ),
    front:
      "M 13 78 C 7.5 72, 6 58, 7.5 44 C 9 26, 18 8, 36 4.5 C 46 2, 62 2.5, 72 6.5 C 86 12, 92 26, 92.5 44 C 94 58, 92.5 72, 87 78 C 85 80.5, 81 80, 80 77 L 79 44 L 21 44 L 20 77 C 19 80, 15 80.5, 13 78 Z",
    details:
      "M 26 40 C 26.5 34, 28 28, 30.5 22 M 39 40.5 C 39 34, 40 28, 42 21 M 52 40 C 52 33, 52.5 27, 53.5 20 M 66 40 C 66 34, 65 28, 63 21 M 73 39.5 C 72.5 34, 71 28, 68.5 22 M 14 50 C 12 60, 12.5 70, 15.5 77 M 86 50 C 88 60, 87.5 70, 84.5 77 M 22 16 C 17.5 24, 15 34, 14.5 44 M 78 16 C 82.5 24, 85 34, 85.5 44",
    shine: "M 27 14 C 36 7, 50 5, 61 6.5 C 49.5 9, 38.5 13, 31 19.5 Z",
    top: 4,
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
    marikaBangsUpdo: "Marika Fringe Bob",
    marika1: "Marika Style 1",
    marikaAtelier: "Marika Atelier",
  },
  { presetOnly: true, isExclusive: true },
);

export const MarikaHairBack: PartRegistry<MarikaHairId> = registries.back;
export const MarikaHairFront: PartRegistry<MarikaHairId> = registries.front;
