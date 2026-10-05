import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/** Where the crest lifts off the side part and rolls up and over. */
const LIFT = "M 36.5 26.3 C 31 17.5, 32.5 4, 42 -3.5";

/** Underside of the curl the crest ends in, over the far temple. */
const CURL = "M 86.8 32.2 C 84 30.6, 81.8 27.8, 80.6 24";

/** Split between the upper and lower lock on the part side. */
const SPLIT = "M 9.4 33 C 12.5 33.5, 15.5 35.5, 18.5 39";

const SHADE = "#7A4A10";

/**
 * Her coiffure, drawn as locks rather than one mass: from a deep side part the crest lifts off a
 * shoulder, sweeps across and curls under over the far temple; below it a lock flares out and
 * flicks at the jaw. On the part side two softer locks fall over the ear and flick out too. The
 * hairline runs diagonally (temple bare on the part side), and the lobes and pearls show.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(
      "M 12 57 L 21 57 L 21 46 C 21.5 39, 24 33, 29 29.5 C 32 27.5, 35 26.5, 38 26.3 C 48 26.6, 59 29.6, 67 34 C 72.5 37.5, 76 42, 78.5 47.5 L 79 57 L 88 57",
    ),
    front: [
      "M 21.5 56.5 C 18 59.5, 13 61.5, 8.5 60.5",
      "C 10 58, 9.5 55, 8.5 51.5 C 7 46, 7 40.5, 8.5 36.5 C 9.2 34.8, 9.6 34, 9.4 33",
      "C 7.8 28, 8.5 20, 13 14 C 15.5 10.5, 19 8, 22.5 6.5",
      "C 24.5 -1, 30 -8, 38 -9.4 C 46 -10.8, 55 -7.5, 62 -5.5 C 69 -6.8, 77 -3, 82 3 C 86.5 8, 88.8 12.5, 88.8 18",
      "C 89.5 23, 89.3 28.5, 86.8 32.2",
      "C 89.5 33, 91.8 36, 92.3 40.5 C 92.8 45, 91.6 49.5, 91.2 53 C 91 55.5, 91.6 58, 92.6 60.2",
      "C 88.5 61.5, 83.5 60, 79.5 56.5 L 79 40 L 21 40 Z",
    ].join(" "),
    back: "M 15 46 C 10.5 53, 11.5 61, 15.5 64.5 C 18.5 67, 22.5 66.5, 25 63.5 L 75 63.5 C 77.5 66.5, 81.5 67, 84.5 64.5 C 88.5 61, 89.5 53, 85 46 Z",
    paint: () => (
      <g>
        <g fill={SHADE}>
          <path d={`${LIFT} L 42 -14 L -10 -14 L -10 70 L 22 70 Z`} fillOpacity="0.18" />
          <path d={`${SPLIT} L 22 70 L -10 70 L -10 33 Z`} fillOpacity="0.1" />
          <path d={`${CURL} L 79 30 L 79 70 L 100 70 L 100 32.2 Z`} fillOpacity="0.22" />
          <path
            d="M 38 26.3 C 48 26.6, 59 29.6, 67 34 C 72.5 37.5, 76 42, 78.5 47.5 L 81 45.5 C 78 39, 73 33, 66 29 C 58 25, 48 23, 39.5 23 Z"
            fillOpacity="0.16"
          />
        </g>
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d={LIFT} strokeWidth="1.8" strokeOpacity="0.85" />
          <path d={CURL} strokeWidth="1.5" strokeOpacity="0.7" />
          <path d={SPLIT} strokeWidth="1.3" strokeOpacity="0.55" />
          <path d="M 38.5 18 C 46 11, 58 8.5, 70 11.5 C 76 13, 80.5 16.5, 84 21" strokeWidth="1.2" strokeOpacity="0.45" />
          <path d="M 43 6 C 52 1, 63 0.5, 72 3 M 62 -5.5 C 60.5 -1, 57 2.5, 52 4.5" strokeWidth="1.1" strokeOpacity="0.35" />
          <path d="M 11 41 C 10.2 47, 11 53, 13.5 58 M 89.5 38 C 90 44, 89.3 50, 88.6 56" strokeWidth="1" strokeOpacity="0.3" />
        </g>
      </g>
    ),
    shine: [
      "M 33 0 C 38 -5.5, 47 -7.5, 55 -5 C 47 -4, 40 -1.5, 35.5 3 Z M 64 -2 C 69 -3.5, 75 -2, 79 2 C 74 0.5, 69 0, 65.5 1 Z",
      "M 46 14 C 55 9.5, 66 9.5, 76 14 C 67 12.5, 57 13, 48 17 Z",
      "M 12 25 C 13.5 20, 16 16.5, 19.5 13.5 C 17.5 17.5, 15.5 21.5, 15 26.5 Z",
      "M 90 40 C 90.5 43, 90.3 46, 89.6 49 C 89.2 46, 89.2 43, 89.5 40 Z",
    ].join(" "),
    top: -6,
    peak: -9.5,
  },
};

const registries = createHairRegistries(
  URSULA_HAIR,
  { ursulaCoiffure: "Ursula Coiffure" },
  { presetOnly: true, isExclusive: true },
);

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = registries.back;
export const UrsulaHairFront: PartRegistry<UrsulaHairId> = registries.front;
