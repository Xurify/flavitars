import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

const RIDGE = "M 28 32 C 40 18, 60 13, 84 20";

/**
 * The swoosh: parted at the far left, the fringe rises steeply into a crest and sweeps across
 * the forehead to the right, so the silhouette is a wave leaning right. The crown behind the
 * swept layer is shaded, the layer itself catches the light. The sides fall to the jaw, mostly
 * covering the ears, with rounded ends.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(
      "M 12 60 L 21 60 L 21 44 C 22.5 36, 26 30, 32 27.5 C 35 26.5, 37 26.5, 39 27 C 50 29, 62 34, 71 40 C 75.5 43, 78 46, 79 51 L 79 60 L 88 60",
    ),
    front:
      "M 14 66 C 9 65, 6.5 57, 7 48 C 7.5 34, 9 20, 15 12 C 20 5, 30 1, 42 1 C 50 1, 56 2.5, 62 4 C 70 5.5, 78 9, 84 15 C 89 21, 91.5 30, 91.5 40 C 91.5 50, 92 58, 89 65 C 87 68.5, 82.5 68, 81.5 64 C 80.8 60, 80.3 56, 80 52 L 79 46 L 21 46 L 20 52 C 19.7 56, 19.2 60, 18.5 64 C 17.5 68, 15.5 67.5, 14 66 Z",
    paint: () => (
      <g fill="none" stroke="black" strokeLinecap="round">
        <path d={`${RIDGE} L 100 -10 L -10 -10 L -10 46 L 22 46 Z`} fill="black" fillOpacity="0.1" stroke="none" />
        <path d={RIDGE} strokeWidth="1.4" strokeOpacity="0.22" />
        <path d="M 30 36 C 44 29, 62 29, 76 38" strokeWidth="1.2" strokeOpacity="0.18" />
        <path d="M 24 44 C 20 32, 24 18, 34 10" strokeWidth="1.2" strokeOpacity="0.18" />
      </g>
    ),
    shine: "M 34 30 C 48 22, 66 20, 82 26 C 66 25, 50 27, 36 34 Z M 24 14 C 30 7, 38 3.5, 46 3 C 38 5.5, 31 10, 26 17 Z",
    details: "M 13 50 C 12 56, 12.5 62, 14 65 M 87 50 C 88 56, 87.5 62, 86 65 M 44 8 C 56 6, 68 8, 78 13",
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
