import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

const HAIRLINE = "M 21 44 C 22.5 36, 26 30, 32 27.5 C 35 26.5, 37 26.5, 39 27 C 50 29, 62 34, 71 40 C 75.5 43, 78 46, 79 51";

/**
 * The swept lock as a shape of its own: its bottom edge is the hairline, its right end curls
 * down over the side hair, and its left edge lifts off the part and bows outwards before
 * cresting above the base. Drawn as an accent so it gets its own outline.
 */
const LOCK = `${HAIRLINE} C 81 54, 84 55.5, 86.5 53.5 C 90 50.5, 90.5 43, 89 35 C 87 23, 79 11, 65 4.5 C 53 -1, 38 0, 28 7 C 21 12, 17 22, 17.5 31 C 17.8 36, 19.5 40.5, 21 44 Z`;

/**
 * Ursula's swoosh: a plain base (sides to the jaw, ears mostly covered, rounded ends) with the
 * swept fringe laid over it as a lighter, outlined lock.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(`M 12 60 L 21 60 L 21 44 ${HAIRLINE.replace(/^M 21 44/, "")} L 79 60 L 88 60`),
    front:
      "M 14 66 C 9 65, 6.5 57, 7 48 C 7.5 34, 10 18, 18 11 C 26 5, 40 4, 52 5 C 66 6, 80 10, 86 18 C 90 24, 92 34, 92 46 C 92 56, 92 62, 89 65 C 87 68.5, 82.5 68, 81.5 64 C 80.8 60, 80.3 56, 80 52 L 79 46 L 21 46 L 20 52 C 19.7 56, 19.2 60, 18.5 64 C 17.5 68, 15.5 67.5, 14 66 Z",
    details: "M 12 50 C 10.5 56, 11 62, 14 65 M 88 50 C 89.5 56, 89 62, 86 65",
    accents: (hairColor) => (
      <g>
        <path d={LOCK} fill={hairColor} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d={LOCK} fill="white" fillOpacity="0.14" />
        <path
          d="M 29 32 C 40 18, 58 11, 80 18 M 25 40 C 34 24, 54 17, 74 25"
          fill="none"
          stroke="black"
          strokeOpacity="0.16"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path d="M 30 10 C 40 4, 54 3, 66 6 C 54 5.5, 42 7, 33 13 Z" fill="white" fillOpacity="0.25" />
      </g>
    ),
    top: 1,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
