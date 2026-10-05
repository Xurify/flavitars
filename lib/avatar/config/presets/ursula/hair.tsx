import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/**
 * Her signature bob: parted on the left, the fringe sweeps across the forehead, the layers
 * have lift on top and the ends turn in at the jaw, covering the ears.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(
      "M 12 72 L 21 72 L 21 46 C 21.5 38, 25 32, 30 29.5 C 33 28, 36 27.5, 38 27.5 C 44 29, 55 33, 66 38.5 C 72 41.5, 78 44.5, 79 53 L 79 72 L 88 72",
    ),
    front:
      "M 15 80 C 9 76, 7 64, 7.5 52 C 8 36, 13 20, 24 11 C 32 5, 44 3.5, 54 4 C 66 5, 78 8, 85 16 C 91 23, 93 36, 92.5 50 C 92 64, 90 76, 84 81 C 82 82.5, 79.5 81.5, 79 79 L 78 44 L 22 44 L 21 79 C 20.5 81.5, 17.5 82, 15 80 Z",
    details:
      "M 38 28 C 48 31, 60 36, 70 42 M 36 22 C 48 22, 62 27, 74 35 M 30 12 C 22 20, 17 32, 16 46 M 14 52 C 13 62, 14 72, 17 78 M 84 22 C 88 32, 89 46, 88 60 M 86 64 C 86 70, 84 76, 82 80",
    shine: "M 28 14 C 36 8, 48 6, 58 7 C 48 9.5, 38 12.5, 31 18 Z",
    top: 4,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
