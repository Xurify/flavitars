import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/**
 * Short layered cut swept back from a side part: lift on top, the fringe sweeps across the
 * forehead, and the sides are tucked behind the ears (drawn as back hair so the ears show).
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(
      "M 12 50 L 21 50 L 21 45 C 21.5 37.5, 25 31.5, 31 28.5 C 34 27, 36.5 26.5, 38 26.5 C 46 28.5, 58 32.5, 68 37.5 C 73 40, 77 42.5, 79 47 L 79 50 L 88 50",
    ),
    front:
      "M 13 46 C 9.5 42, 8.5 34, 10 24 C 12 12, 24 4, 40 2.5 C 54 1, 70 3, 81 9 C 89 14, 92 24, 91.5 34 C 91 40, 89.5 44, 87 46 L 79 45 L 21 45 Z",
    back: "M 16 28 C 7 36, 5 50, 9 63 C 16 66, 26 63, 34 60 L 66 60 C 74 63, 84 66, 91 63 C 95 50, 93 36, 84 28 Z",
    details:
      "M 38 27 C 50 29, 62 33.5, 72 40 M 36 20 C 50 19.5, 66 24, 80 33 M 34 13 C 48 11, 64 13.5, 78 21 M 30 29 C 24 33, 19 40, 18 45 M 25 16 C 18 22, 13 32, 12 44",
    backDetails: "M 12 40 C 10 48, 11 56, 14 62 M 88 40 C 90 48, 89 56, 86 62",
    shine: "M 30 11 C 40 5, 54 4, 66 6.5 C 54 8, 42 10.5, 33 16 Z",
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
