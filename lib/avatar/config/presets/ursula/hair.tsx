import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/** The swept-up line: from the left of the forehead up into the crest, curling over to the right. */
const LIFT = "M 34 29 C 26 20, 29 4, 42 -4 C 48 -7.5, 54 -7.5, 59 -6";

/** Underside of the upper right lobe, where it rolls down over the lower one. */
const ROLL = "M 93.6 35 C 89.6 33, 86.4 29, 85.4 23";

const SHADE = "#9A5E10";

/**
 * Her coiffure, with the volume of the reference: the forehead is an open dome and the hair is
 * swept up from it into a tall crest that rises highest on her right (viewer's left), dips, and
 * rolls over the other side in a second lobe. Both sides are full and wide at eye level and fall
 * to the jaw over the ears; only the pearl earrings show in front.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove("M 12 76 L 21 76 L 21 46 C 22 36, 27 30.5, 35 28.6 Q 50 25.6, 65 28.6 C 73 30.5, 78 36, 79 46 L 79 76 L 88 76"),
    front: [
      "M 23 74 C 20 78.5, 15.5 81, 10.5 79.5",
      "C 7 75, 5.6 66, 5.6 57 C 5.6 46, 6.4 36, 9 27 C 11.5 19, 16 12, 22 7",
      "C 26 2, 32 -4.5, 39 -8 C 44 -10, 50 -9.8, 54 -7.6",
      "C 56 -7, 58.5 -6.4, 61.5 -6.8 C 71 -7.6, 80.5 -2.5, 87 5 C 92 11, 94.4 20, 94.4 28 C 94.4 31, 94.1 33.2, 93.6 35",
      "C 95.2 39, 95.7 46, 95.4 54 C 95.1 62, 93.6 68, 92.5 72 C 93.5 74.5, 94.6 76.5, 95.4 78.5",
      "C 90.5 80.5, 84 79.5, 77.5 74.5 L 79 40 L 21 40 Z",
    ].join(" "),
    paint: () => (
      <g>
        <g fill={SHADE}>
          <path d={`${LIFT} L 59 -14 L -10 -14 L -10 90 L 22 90 Z`} fillOpacity="0.14" />
          <path d={`${ROLL} L 79 22 L 79 90 L 100 90 L 100 35 Z`} fillOpacity="0.18" />
        </g>
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d={LIFT} strokeWidth="1.9" strokeOpacity="0.9" />
          <path d={ROLL} strokeWidth="1.6" strokeOpacity="0.75" />
          <path d="M 47 27 C 46 17, 52 9, 63 6 C 72 4, 80 8, 86 14 M 60 -5.6 C 64 0, 72 2, 82 3" strokeWidth="1.2" strokeOpacity="0.45" />
          <path d="M 17 22 C 12 32, 10.5 44, 11.5 56 M 13.5 48 C 12 58, 12.5 67, 16 75" strokeWidth="1.1" strokeOpacity="0.35" />
          <path d="M 91.5 44 C 92.4 53, 91.8 62, 89.6 70" strokeWidth="1.1" strokeOpacity="0.35" />
        </g>
      </g>
    ),
    shine: "M 33 -2 C 38 -7.5, 45 -9.5, 51 -8.5 C 45 -6.5, 39.5 -4, 36 0 Z M 64 -3 C 71 -4.5, 78 -2.5, 83.5 1.5 C 77 0, 70.5 0, 65.5 1 Z M 9.5 40 C 10 33, 12 27, 15 22 C 13.5 28, 12.5 34, 12.5 41 Z",
    top: -8,
    peak: -9.8,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
