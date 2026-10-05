import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/** The swept-up line: from the left of the forehead up into the crest, curling over to the right. */
const LIFT = "M 36 28.6 C 30 20, 32 5, 43 -2.5 C 48 -5.5, 53 -5.5, 57.5 -4.2";

/** Underside of the roll where the hair comes down past the right temple. */
const ROLL = "M 85.8 36 C 83.2 34, 81.4 30.5, 81 26";

const SHADE = "#8A4E08";

/**
 * Her coiffure: the forehead is an open dome, and the hair is swept up and back from it into a
 * big crest that leans to her right (viewer's left), then rolls over and down past the other
 * temple, where the side flicks out. Both sides are full down to the earlobes, so the pearls show.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove("M 12 56 L 21 56 L 21 46 C 22 36, 27 30.5, 35 28.6 Q 50 25.6, 65 28.6 C 73 30.5, 78 36, 79 46 L 79 56 L 88 56"),
    front: [
      "M 21.5 56 C 18 59.5, 14 61.5, 9.5 60",
      "C 6.8 54, 6 46, 7 38 C 8 28, 12 19, 18 12",
      "C 23 5, 28 -4, 36 -8.5 C 42 -11.5, 49 -10.5, 52.5 -6.5",
      "C 54.5 -4.5, 57 -4, 60 -4.6 C 70 -6.5, 80 -1.5, 85.5 5.5 C 89.5 11.5, 91 19.5, 89.8 27",
      "C 89.2 31, 87.4 34, 85.8 36",
      "C 90.5 37.5, 94 41, 94.4 46 C 94.8 51, 93 55.5, 95.5 59.5",
      "C 90.5 61.5, 85 60.5, 79.5 56.5 L 79 40 L 21 40 Z",
    ].join(" "),
    back: "M 15 46 C 10.5 53, 11.5 61, 15.5 64.5 C 18.5 67, 22.5 66.5, 25 63.5 L 75 63.5 C 77.5 66.5, 81.5 67, 84.5 64.5 C 88.5 61, 89.5 53, 85 46 Z",
    paint: () => (
      <g>
        <g fill={SHADE}>
          <path d={`${LIFT} L 58 -14 L -10 -14 L -10 70 L 22 70 Z`} fillOpacity="0.13" />
          <path d={`${ROLL} L 79 25 L 79 70 L 100 70 L 100 36 Z`} fillOpacity="0.2" />
        </g>
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d={LIFT} strokeWidth="1.8" strokeOpacity="0.85" />
          <path d={ROLL} strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M 47 27 C 45 18, 51 9.5, 62 6.5 C 70 4.5, 77 7, 82 12.5 M 58 -3.8 C 62 2, 70 4, 80 4.5" strokeWidth="1.2" strokeOpacity="0.45" />
          <path d="M 24 16 C 19 24, 16.5 32, 16.5 40 M 11 41 C 10.5 48, 11.5 54, 14.5 58" strokeWidth="1.1" strokeOpacity="0.35" />
          <path d="M 89.5 43 C 90 48, 89.6 53, 89.2 57" strokeWidth="1" strokeOpacity="0.3" />
        </g>
      </g>
    ),
    shine: "M 35 -2 C 39 -6.5, 45 -8.5, 50 -7.5 C 45 -6, 40 -3.5, 37 0 Z M 62 -2 C 68 -3.5, 75 -2, 80 1.5 C 74 0, 68 0, 63.5 1 Z M 58 14 C 66 10, 74 11, 80 16 C 73 13.5, 66 13.5, 60 16.5 Z",
    top: -7,
    peak: -10,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
