import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/** Top edge of the swept lock: lifts off the part, crosses the crown and curls down over the right temple. */
const RIDGE = "M 25 41 C 32 16, 58 8, 80 16 C 86 19, 89.5 27, 88.5 38";

/**
 * The swoosh: parted at the far left, the fringe rises into a crest and sweeps across the
 * forehead to the right. The swept lock is drawn as a layer of its own, outlined along its top
 * edge and lit, with the crown shaded behind it. The sides fall to the jaw with layered, rounded
 * ends, mostly covering the ears.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(
      "M 12 60 L 21 60 L 21 44 C 22.5 36, 26 30, 32 27.5 C 35 26.5, 37 26.5, 39 27 C 50 29, 62 34, 71 40 C 75.5 43, 78 46, 79 51 L 79 60 L 88 60",
    ),
    front:
      "M 14 66 C 9 65, 6.5 57, 7 48 C 7.5 34, 9 20, 15 12 C 20 5, 30 1, 42 1 C 50 1, 56 2.5, 62 4 C 70 5.5, 78 9, 84 15 C 89 21, 91.5 30, 91.5 36 C 91.5 38, 90 39, 89.5 40 C 91.5 42, 92 48, 92 54 C 92 59, 92 62, 89 65 C 87 68.5, 82.5 68, 81.5 64 C 80.8 60, 80.3 56, 80 52 L 79 46 L 21 46 L 20 52 C 19.7 56, 19.2 60, 18.5 64 C 17.5 68, 15.5 67.5, 14 66 Z",
    paint: () => (
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d={`${RIDGE} L 100 38 L 100 -10 L -10 -10 L -10 46 L 22 46 Z`} fill="black" fillOpacity="0.13" stroke="none" />
        <path d={RIDGE} strokeWidth="1.8" strokeOpacity="0.7" />
        <path d="M 30 37 C 42 25, 62 22, 78 32" strokeWidth="1.3" strokeOpacity="0.4" />
        <path d="M 26 40 C 21 30, 22.5 17, 32 9" strokeWidth="1.4" strokeOpacity="0.45" />
        <path d="M 12 52 C 10 58, 11.5 63, 15 66 M 88 52 C 90 58, 88.5 63, 85 66" strokeWidth="1.3" strokeOpacity="0.4" />
      </g>
    ),
    shine: "M 33 33 C 44 21, 64 16, 82 22 C 66 21, 48 24, 37 36 Z M 22 16 C 28 8, 36 4, 44 3 C 37 6, 30 11, 25 19 Z",
    details: "M 44 8 C 56 6, 68 8, 78 13 M 16 48 C 15 54, 15.5 60, 17 63 M 84 48 C 85 54, 84.5 60, 83 63",
    top: 2,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
