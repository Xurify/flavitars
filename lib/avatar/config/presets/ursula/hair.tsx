import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/**
 * Short layered cut: parted on her left, the top lifts and sweeps across to the other temple,
 * the sides stay close to the head so both ears (and the pearls) show.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(
      "M 12 52 L 20.5 52 L 20.5 47 C 22 41, 25.5 36, 31 33 C 38 29.5, 46 28, 54 26.5 C 60 25, 64 23, 67 20.5 C 72 22.5, 77 27, 79 33 L 79.5 47 L 88 47",
    ),
    front:
      "M 17 54 C 13 53, 10.5 48, 10.5 42 C 10 30, 15 18, 25 10.5 C 33 4.5, 44 2.5, 54 4 C 63 5.5, 70 9, 75 12 C 81 15.5, 85.5 22, 86.5 30 C 87.5 37, 87 43, 85 47 C 83.5 50, 81.5 50.5, 80 48.5 L 80 40 L 21 40 L 21 50 C 20.5 52.5, 19 54, 17 54 Z M 17.5 48 C 15.5 51, 14.8 54, 14.5 57.5 C 11.5 54.5, 10.5 50.5, 11.5 46 Z M 87 43 C 87.6 47.5, 86.8 51.5, 84.2 54.5 C 84 51.5, 83.2 49, 82 47 Z",
    details:
      "M 66 10 C 52 7, 36 9, 25 17 C 18 23, 14.5 32, 15 42 M 68 16 C 55 13, 40 15, 30 22.5 M 66 21 C 56 19, 44 21.5, 35 27 M 64 6 C 65.5 11, 66.5 16, 67 20.5 M 74 14 C 80 19, 84 27, 84 38",
    shine:
      "M 27 12.5 C 35 6.5, 47 4.5, 58 6 C 47 8, 37 10.5, 29.5 16 Z M 18 32 C 20 25, 23.5 20, 28.5 16.5 C 25.5 21.5, 23 26.5, 21.8 32.5 Z",
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
