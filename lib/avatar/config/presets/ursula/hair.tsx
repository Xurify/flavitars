import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove("M 14 44 L 22 44 C 22 36, 24 30, 29 26 C 34 29, 42 30, 50 29.5 C 62 29, 72 30, 77 36 L 78 44 L 86 44"),
    front:
      "M 15 38 C 7 30, 8 18, 16 14 C 14 6, 24 2, 32 4 C 42 -4, 66 -5, 80 2 C 90 8, 93 20, 88 28 C 91 34, 88 40, 84 38 C 82 32, 80 30, 78 30 L 22 30 C 20 32, 17 35, 15 38 Z",
    back: "M 16 34 C 12 42, 14 54, 24 60 C 32 64, 68 64, 76 60 C 86 54, 88 42, 84 34 C 86 28, 80 18, 70 14 Q 50 18, 30 14 C 20 18, 14 28, 16 34 Z",
    details:
      "M 29 7 C 30 12, 29 16, 28 20 M 32 18 C 44 9, 64 5, 82 13 M 30 14 C 43 5, 64 2, 80 10 M 31 10 C 44 1, 66 -1, 78 5 M 26 10 C 21 13, 17 17, 15 23 M 24 16 C 20 19, 17 23, 16 28 M 84 14 C 87 19, 86 24, 82 29",
    shine:
      "M 32 6 C 45 -2, 68 -2, 78 6 C 84 11, 80 18, 72 20 C 60 22, 45 18, 32 12 Z M 14 18 C 20 14, 26 12, 28 10 C 25 14, 20 20, 14 24 Z",
    top: -3,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
