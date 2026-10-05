import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove("M 12 62 L 21 62 L 21 40 C 23 32, 28 28, 36 26 C 46 28, 60 27, 70 29 C 76 31, 79 36, 79 40 L 79 62 L 88 62"),
    front:
      "M 14 40 C 10 22, 18 6, 36 3 C 50 0, 70 2, 82 10 C 90 16, 91 28, 88 40 C 89 50, 90 58, 87 64 Q 84 67, 80 64 L 79 46 L 21 46 L 20 64 Q 16 67, 13 64 C 10 58, 11 50, 14 40 Z",
    details:
      "M 36 6 C 34 12, 35 20, 36 26 M 38 8 C 52 4, 70 8, 82 18 M 37 15 C 52 10, 70 14, 84 27 M 30 10 C 22 16, 18 26, 17 40 M 84 34 C 86 44, 86 52, 84 60 M 16 46 C 14 52, 15 58, 16 62",
    shine: "M 40 6 C 54 3, 70 6, 78 12 C 70 10, 54 9, 42 11 Z M 20 24 C 22 18, 26 14, 30 12 C 27 16, 24 20, 23 26 Z",
    top: 3,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
