import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";
import { arcPoints, densify, scallop } from "../../../parts/shapes";

export const MarikaHairIds = ["marikaCurlyBangs", "marikaBangsUpdo", "marika1", "marikaAtelier"] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

const curlyMane = scallop([...arcPoints(50, 50, 43, 50, 140, 400, 22), [70, 72], [30, 72]]);
const curlyBack = scallop(
  densify(
    [
      [16, 40],
      [8, 62],
      [8, 84],
      [16, 98],
      [50, 101],
      [84, 98],
      [92, 84],
      [92, 62],
      [84, 40],
    ],
    9,
  ),
);

const atelierMane = scallop(
  densify(
    [
      [12, 88],
      [7, 70],
      [5, 52],
      [6, 36],
      [10, 22],
      [17, 11],
      [27, 3],
      [39, -3],
      [53, -6],
      [67, -7],
      [80, -3],
      [92, 5],
      [100, 17],
      [103, 32],
      [101, 47],
      [97, 62],
      [93, 76],
      [89, 90],
      [76, 72],
      [74, 46],
      [26, 46],
      [24, 72],
    ],
    5.5,
  ),
  { bulge: 0.6 },
);
const atelierBack = scallop(
  densify(
    [
      [14, 40],
      [7, 62],
      [6, 82],
      [11, 100],
      [50, 102],
      [89, 100],
      [97, 82],
      [96, 60],
      [90, 40],
    ],
    6,
  ),
);

const MARIKA_HAIR: Record<MarikaHairId, HairSpec> = {
  marikaCurlyBangs: {
    cap: capAbove(
      "M 12 70 L 21 70 L 21 40 Q 23 34, 27 38 Q 31 32, 36 37 Q 41 31, 46 36 Q 50 31, 54 36 Q 59 31, 64 37 Q 69 32, 73 38 Q 77 34, 79 40 L 79 70 L 88 70",
    ),
    front: curlyMane,
    back: curlyBack,
    details:
      "M 14 50 q 3 3 0 6 M 86 50 q -3 3 0 6 M 12 66 q 3 3 0 6 M 88 66 q -3 3 0 6 M 26 12 q 3 3 6 0 M 46 6 q 3 3 6 0 M 64 10 q 3 3 6 0 M 18 30 q 3 3 0 6 M 82 30 q -3 3 0 6",
    shine: "M 30 10 C 40 4, 56 3, 66 6 C 56 6, 42 8, 32 14 Z",
    top: 4,
  },
  marikaBangsUpdo: {
    cap: capAbove(
      "M 12 56 L 21 56 L 21 38 Q 28 36.5, 34 38 Q 40 36, 46 37.5 Q 52 36, 58 37.5 Q 64 36, 70 37.5 Q 76 36, 79 38 L 79 56 L 88 56",
    ),
    front:
      "M 13 40 C 9 14, 30 3, 50 3 C 70 3, 91 14, 87 40 C 88 48, 87 54, 83 58 L 79 46 L 21 46 L 17 58 C 13 54, 12 48, 13 40 Z",
    details:
      "M 30 12 Q 28 22, 30 35 M 42 8 Q 41 22, 42 35 M 58 8 Q 59 22, 58 35 M 70 12 Q 72 22, 70 35 M 16 44 Q 15 50, 17 55 M 84 44 Q 85 50, 83 55",
    shine: "M 28 13 C 36 7, 50 5.5, 60 6.5 C 50 8.5, 38 10.5, 30 16 Z",
    top: 3,
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
    cap: capAbove("M 12 64 L 21 64 L 21 40 C 26 36, 32 33, 40 32 C 52 30, 66 31, 79 36 L 79 64 L 88 64"),
    front: atelierMane,
    back: atelierBack,
    details:
      "M 30 4 L 34 10 L 30 16 L 34 22 M 46 -1 L 50 5 L 46 11 L 50 17 M 62 -3 L 66 3 L 62 9 L 66 15 M 78 1 L 82 7 L 78 13 L 82 19 M 92 14 L 96 20 L 92 26 L 96 32 M 11 46 L 15 52 L 11 58 L 15 64 M 92 46 L 96 52 L 92 58 L 96 64 M 13 72 L 17 78 L 13 84 M 88 72 L 92 78 L 88 84",
    shine: "M 40 2 C 54 -3, 72 -3, 84 4 C 72 2, 56 2, 44 6 Z",
    top: 0,
    peak: -6,
  },
};

const registries = createHairRegistries(
  MARIKA_HAIR,
  {
    marikaCurlyBangs: "Marika Curly Bangs",
    marikaBangsUpdo: "Marika Bangs",
    marika1: "Marika Style 1",
    marikaAtelier: "Marika Atelier",
  },
  { presetOnly: true, isExclusive: true },
);

export const MarikaHairBack: PartRegistry<MarikaHairId> = registries.back;
export const MarikaHairFront: PartRegistry<MarikaHairId> = registries.front;
