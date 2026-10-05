import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/** Where the swept lock lifts off the side part: up from the left of the forehead into the crest. */
const LIFT = "M 29 27 C 25 16, 29.5 3, 43 -2.5";

/** Inner edge of the roll as it comes down the far side into the flick. */
const ROLL = "M 62 3 C 73 5.5, 81.5 12, 85.5 21 C 88 28, 88.8 35, 90.5 42";

/**
 * Her swept-up cut: from a side part on her right, the hair lifts into a tall crest and rolls over
 * to the other side, so the whole forehead shows. The top and temples sit in front of the head;
 * the puffy sides sit behind the ears (so the ears and pearls show) and end just below the
 * earlobes, with a flick on the far side.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(
      "M 12 50 L 21 50 L 21 44 C 22 36, 25 30, 29 27 C 35 23.5, 44 22.5, 52 22.5 C 62 23, 71 26, 76 31 C 78 34, 79 38, 79 44 L 79 50 L 88 50",
    ),
    front:
      "M 14 49 C 10.5 46, 9.5 38, 10 31 C 10.5 20, 15 10, 23 3.5 C 29 -1.5, 36 -6, 44 -6 C 52 -6, 58 -2.5, 65 0 C 73 2.5, 80 6.5, 85 12.5 C 89.5 18.5, 90.8 26, 91 33 C 91.3 38, 92 42, 94.5 46.5 C 91 47.5, 87.5 47, 85 45.5 C 83 47, 80.5 48, 79 47.5 L 79 40 L 21 40 L 21 47 C 19 49, 16.5 49.8, 14 49 Z",
    back: "M 17 30 C 8 36, 5 47, 6 57 C 7 64, 11 69, 17 69.5 C 20.5 69.8, 23.5 68, 24.5 65 L 75.5 65 C 76.5 68, 79.5 69.8, 83 69.5 C 89 69, 93 64, 94 57 C 95 47, 92 36, 83 30 Z",
    paint: () => (
      <g>
        <path d={`${LIFT} L 43 -12 L -10 -12 L -10 50 L 22 50 Z`} fill="black" fillOpacity="0.1" />
        <path d={LIFT} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
        <path d={ROLL} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.45" />
      </g>
    ),
    details:
      "M 37 8 C 48 1.5, 62 2.5, 74 9 M 35 17 C 47 13, 62 14, 74 21 C 79 25, 82 30, 83 37 M 13.5 34 C 12.5 40, 13 44, 15.5 47.5",
    backDetails: "M 9.5 51 C 9 57, 10.5 63, 14 67 M 90.5 51 C 91 57, 89.5 63, 86 67",
    shine: "M 38 1.5 C 47 -3, 58 -2.5, 68 1 C 58 0.5, 48 1, 41 5 Z M 14.5 26 C 16 20, 19 15.5, 23 12.5 C 20.5 16.5, 18.5 21, 17.5 27 Z",
    top: -5,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
