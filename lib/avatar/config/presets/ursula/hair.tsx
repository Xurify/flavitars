import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/** Where the crest lifts off the side part and rolls up and over. */
const LIFT = "M 36.5 26.5 C 31 18, 32 5, 41.5 -4";

/** Underside of the curl the sweep ends in, over the far temple. */
const CURL = "M 91 37.5 C 87.5 36.5, 84.5 33.5, 82.5 29.5";

/** The diagonal hairline: high at the part, the sweep lying over the far temple. */
const HAIRLINE = "C 21.5 40, 24 33, 29 29.5 C 32 27.5, 35 26.5, 38 26.3 C 48 26.6, 59 29.6, 67 34 C 72.5 37.5, 76 42, 78.5 47.5";

/**
 * Her coiffure: a deep side part on her right, from which the hair lifts into a crest and sweeps
 * across, so the hairline runs diagonally (temple bare on the part side, the sweep falling over
 * the other temple and ending in a curl). The sides fall to the jaw over the ears, leaving the
 * lobes and pearls showing.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(`M 12 60 L 21 60 L 21 47 ${HAIRLINE} L 79 60 L 88 60`),
    front:
      "M 21.5 57 C 18 59.5, 13.5 59, 12 55 C 9.5 49, 8 41, 9 33 C 9.8 25, 13 19, 18 15.5 C 20.5 13.5, 22.5 11.5, 23.5 8 C 25.5 1, 31 -6, 39.5 -9 C 49.5 -12, 63.5 -8.5, 73.5 -1 C 81.5 5, 87.5 13, 90 21.5 C 91.5 27, 92 32.5, 91 37.5 C 93 41, 93.3 45, 92.8 49 C 92.3 53, 91.8 56, 93.5 59.5 C 89.5 60.5, 85.5 59.5, 83.5 57 C 81.5 58.5, 80 58, 78.5 56.5 L 79 40 L 21 40 Z",
    back: "M 15 40 C 11 48, 11 58, 14 63 C 16.5 66.5, 20.5 67.5, 24.5 64.5 L 75.5 64.5 C 79.5 67.5, 84 66.5, 86.5 63 C 89.5 58, 89.5 48, 85 40 Z",
    paint: () => (
      <g>
        <path d={`${LIFT} L 41.5 -14 L -10 -14 L -10 60 L 22 60 Z`} fill="#7A4A10" fillOpacity="0.22" />
        <path d={`${CURL} L 79 34 L 79 62 L 96 62 L 96 37.5 Z`} fill="#7A4A10" fillOpacity="0.2" />
        <path d={`M 38 26.3 ${HAIRLINE.replace(/^C 21.5 40, 24 33, 29 29.5 C 32 27.5, 35 26.5, 38 26.3 /, "")} L 82 45 C 78.5 38, 73 32.5, 66 28.5 C 58 24.5, 48 22, 39.5 22.5 Z`} fill="#7A4A10" fillOpacity="0.16" />
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d={LIFT} strokeWidth="1.8" strokeOpacity="0.85" />
          <path d={CURL} strokeWidth="1.5" strokeOpacity="0.7" />
        </g>
      </g>
    ),
    details:
      "M 41 20 C 53 13, 68 14.5, 80 23 M 41 9 C 53 2.5, 67 3.5, 78 11 M 14 30 C 12.5 38, 13 46, 15.5 54 M 88 42 C 89 47, 88.8 52, 87.5 56",
    shine: "M 39 1 C 48 -5, 60 -5.5, 70 -1.5 C 60 -1.5, 50 -0.5, 42.5 4.5 Z M 46 14 C 56 9, 68 10, 78 16 C 68 13.5, 57 13.5, 48 17.5 Z M 14.5 28 C 16 22, 18.5 17.5, 22.5 14 C 20.5 18.5, 18.5 23, 18 29 Z",
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
