import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const MarikaHairIds = ["marikaCurlyBangs", "marikaBangsUpdo", "marika1", "marikaAtelier"] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

const LONG_SIDES =
  "M 12 30 C 10 6, 90 6, 88 30 C 92 50, 94 80, 90 98 L 77 98 C 78 80, 76 60, 73 44 L 27 44 C 24 60, 22 80, 23 98 L 10 98 C 6 80, 8 50, 12 30 Z";

const MARIKA_HAIR: Record<MarikaHairId, HairSpec> = {
  marikaCurlyBangs: {
    cap: capAbove(
      "M 12 70 L 21 70 L 21 40 Q 23 34, 27 38 Q 31 32, 36 37 Q 41 31, 46 36 Q 50 31, 54 36 Q 59 31, 64 37 Q 69 32, 73 38 Q 77 34, 79 40 L 79 70 L 88 70",
    ),
    front: LONG_SIDES,
    back: "M 15 30 C 5 45, 0 85, 20 100 C 35 105, 65 105, 80 100 C 100 85, 95 45, 85 30 L 70 20 Q 50 25, 30 20 Z",
    details: "M 16 44 Q 12 62, 16 82 M 84 44 Q 88 62, 84 82 M 30 14 q 3 3 6 0 M 50 10 q 3 3 6 0 M 66 14 q 3 3 6 0",
    backDetails: "M 25 50 Q 15 65, 25 85 M 75 50 Q 85 65, 75 85",
    top: 11,
  },
  marikaBangsUpdo: {
    cap: capAbove(
      "M 14 46 L 22 46 L 22 40 C 26 36, 36 33, 44 34 Q 49 35, 50 31 Q 51 35, 56 34 C 64 33, 74 36, 78 40 L 78 46 L 86 46",
    ),
    front: "M 15 32 C 13 4, 87 4, 85 32 Z M 30 6 C 30 -8, 70 -8, 70 6 Z",
    details: "M 25 25 Q 35 15, 50 20 M 75 25 Q 65 15, 50 20 M 38 -2 Q 50 -6, 62 -2",
    top: -4.5,
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
      "M 14 36 L 7 26 L 12 16 L 7 6 L 17 2 L 15 -8 L 26 -6 L 30 -16 L 40 -12 L 46 -22 L 55 -19 L 64 -25 L 72 -16 L 81 -21 L 86 -10 L 83 0 L 93 4 L 88 14 L 95 25 L 86 36 Z",
    back: "M 10 30 C -5 60, -2 105, 15 115 L 35 110 L 50 115 L 65 110 L 85 115 C 102 105, 105 60, 90 30 Z",
    details: "M 22 16 L 26 10 L 22 4 M 78 16 L 74 10 L 78 4 M 40 12 L 45 4 L 40 -4 M 60 12 L 55 4 L 60 -4",
    backDetails: "M 25 40 Q 15 65, 20 95 M 75 40 Q 85 65, 80 95",
    top: -22,
  },
};

const registries = createHairRegistries(
  MARIKA_HAIR,
  {
    marikaCurlyBangs: "Marika Curly Bangs",
    marikaBangsUpdo: "Marika Updo",
    marika1: "Marika Style 1",
    marikaAtelier: "Marika Atelier",
  },
  { presetOnly: true, isExclusive: true },
);

export const MarikaHairBack: PartRegistry<MarikaHairId> = registries.back;
export const MarikaHairFront: PartRegistry<MarikaHairId> = registries.front;
