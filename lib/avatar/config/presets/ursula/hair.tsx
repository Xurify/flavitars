import { PartRegistry } from "../../../parts/common";
import { capAbove, createHairRegistries, HairSpec } from "../../../parts/hair";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

/*
 * Traced from the reference cartoon on the avatar grid (aligned at the eyes), with the top of the
 * crest eased down so it stays inside the avatar frame. The forehead is left bare: the hairline
 * runs along the top of the head, and all the volume sits above and beside the face.
 */
const FRONT = "M 29.5 87 C 28.3 86.8, 24.4 86.7, 22.1 85.5 C 19.8 84.3, 17.3 82.4, 15.6 80 C 13.9 77.6, 13.0 74.2, 11.9 71 C 10.8 67.8, 10.0 64.5, 9.1 61 C 8.2 57.5, 7.0 53.8, 6.3 50 C 5.6 46.2, 5.1 42.2, 4.9 38 C 4.8 33.8, 4.9 29.1, 5.4 25 C 5.9 20.9, 6.6 16.4, 7.7 13.4 C 8.8 10.4, 10.4 8.5, 11.9 7.0 C 13.4 5.5, 15.3 5.0, 16.5 4.2 C 17.7 3.4, 18.8 2.5, 19.3 2.2 C 19.4 1.3, 19.2 -1.8, 19.8 -3.4 C 20.4 -5.0, 21.1 -6.3, 23.0 -7.4 C 24.9 -8.5, 28.1 -9.6, 31.4 -10.2 C 34.7 -10.8, 38.9 -11.0, 42.6 -11.1 C 46.3 -11.2, 50.1 -11.2, 53.7 -10.8 C 57.3 -10.5, 60.8 -9.8, 64.0 -9.0 C 67.2 -8.2, 70.6 -6.9, 73.2 -5.8 C 75.8 -4.7, 78.2 -3.5, 79.8 -2.2 C 81.4 -0.9, 82.1 1.1, 82.6 1.8 C 83.4 2.4, 85.7 4.3, 87.2 5.4 C 88.7 6.5, 90.4 7.0, 91.8 8.2 C 93.2 9.4, 94.6 10.9, 95.6 12.6 C 96.6 14.3, 97.1 16.3, 97.6 18.2 C 98.1 20.1, 97.9 22.4, 98.4 24 C 98.9 25.6, 100.3 26.9, 100.7 27.5 C 100.4 28.0, 99.5 29.4, 98.9 30.5 C 98.4 31.6, 97.8 31.8, 97.4 34 C 97.0 36.2, 97.0 40.7, 96.7 44 C 96.4 47.3, 96.2 50.7, 95.6 54 C 95.0 57.3, 94.4 60.8, 93.3 64 C 92.2 67.2, 90.8 70.8, 89.1 73.5 C 87.4 76.2, 85.2 78.6, 83.0 80.5 C 80.8 82.4, 78.2 83.8, 76.0 85 C 73.8 86.2, 70.6 87.1, 69.5 87.5 L 79 40 L 21 40 Z";

/** Left edge of the front lock, where it lifts off the forehead into the crest. */
const LIFT = "M 32.3 23 C 31.8 21.9, 30.5 18.7, 29.5 16.6 C 28.5 14.5, 27.4 12.2, 26.3 10.2 C 25.2 8.2, 23.7 6.1, 22.6 4.6 C 21.5 3.1, 20.0 1.6, 19.5 1.0";
/** Where the front lock curls down over the far temple. */
const CURL = "M 63.0 12.2 C 63.6 12.6, 65.7 13.6, 66.7 14.6 C 67.7 15.6, 68.5 16.6, 69.2 18.2 C 69.9 19.8, 70.5 23.0, 70.8 24";
/** Underside of the flick on the far side. */
const FLICK = "M 89.5 30.6 C 90.2 30.5, 92.1 29.9, 93.7 29.8 C 95.3 29.7, 98.0 30.1, 98.9 30.2";
/** Edges where the upper locks overlap the lower ones. */
const TUCKS = "M 75.6 47.6 C 76.3 47.7, 78.1 48.1, 79.8 48.4 C 81.5 48.7, 84.8 49.1, 85.8 49.2 M 12.3 60.5 C 12.5 61.1, 13.1 62.9, 13.4 64 C 13.7 65.1, 14.0 66.5, 14.1 67";
const STRANDS = "M 35.1 23 C 34.9 21.5, 33.4 17.0, 33.7 14.2 C 34.0 11.4, 35.0 8.4, 37.0 6.2 C 39.0 4.0, 42.3 2.1, 45.4 1.0 C 48.5 -0.1, 53.9 -0.0, 55.6 -0.2 M 10.9 15.0 C 12.0 14.5, 15.2 12.4, 17.4 12.2 C 19.6 12.0, 22.9 13.5, 24.0 13.8 M 12.8 28 C 12.5 30.0, 11.2 36.0, 11.1 40 C 10.9 44.0, 11.8 50.0, 11.9 52 M 72.3 13.0 C 73.4 13.7, 76.8 15.2, 78.8 17.0 C 80.8 18.8, 83.5 22.8, 84.4 24 M 90.0 54 C 89.9 55.5, 89.9 60.2, 89.4 63 C 88.9 65.8, 87.2 69.7, 86.8 71";
const SHADOWS = "M 37.9 19.5 C 37.3 18.6, 39.8 15.0, 42.6 13.4 C 45.4 11.8, 50.6 10.3, 54.6 9.8 C 58.6 9.3, 63.0 9.9, 66.7 10.6 C 70.4 11.3, 74.2 12.2, 77.0 13.8 C 79.8 15.4, 82.0 17.3, 83.5 20 C 85.0 22.7, 85.8 26.7, 86.3 30 C 86.8 33.3, 86.8 36.8, 86.7 40 C 86.6 43.2, 87.4 47.7, 85.8 49 C 84.2 50.3, 78.9 50.0, 77.0 48 C 75.1 46.0, 75.5 40.5, 74.6 37 C 73.7 33.5, 72.7 29.6, 71.4 27 C 70.1 24.4, 69.0 22.8, 66.7 21.5 C 64.4 20.2, 60.8 19.5, 57.4 19 C 54.0 18.5, 49.5 18.6, 46.3 18.7 C 43.0 18.8, 38.5 20.4, 37.9 19.5 Z M 22.1 23 C 20.9 24.3, 18.4 28.2, 17.4 32 C 16.4 35.8, 16.1 41.3, 16.1 46 C 16.1 50.7, 16.5 57.3, 17.4 60 C 18.2 62.7, 20.6 64.3, 21.2 62 C 21.8 59.7, 20.6 51.0, 20.7 46 C 20.8 41.0, 20.9 35.7, 21.6 32 C 22.3 28.3, 24.8 25.5, 24.9 24 C 25.0 22.5, 23.4 21.7, 22.1 23 Z M 85.8 49.5 C 87.0 49.7, 89.9 51.8, 90.9 54 C 91.9 56.2, 92.3 60.0, 91.8 63 C 91.3 66.0, 89.8 69.3, 88.1 72 C 86.4 74.7, 84.1 76.9, 81.6 79 C 79.1 81.1, 74.3 84.5, 73.2 84.5 C 72.1 84.5, 73.8 81.1, 75.1 79 C 76.3 76.9, 79.2 74.8, 80.7 72 C 82.2 69.2, 83.4 65.2, 83.9 62 C 84.4 58.8, 83.6 55.1, 83.9 53 C 84.2 50.9, 84.6 49.3, 85.8 49.5 Z M 8.6 56 C 8.1 57.8, 9.8 62.8, 10.9 66 C 12.0 69.2, 13.4 72.3, 15.1 75 C 16.8 77.7, 19.6 81.3, 21.2 82 C 22.8 82.7, 25.2 80.7, 24.9 79 C 24.6 77.3, 20.9 74.7, 19.3 72 C 17.8 69.3, 16.5 65.8, 15.6 63 C 14.7 60.2, 14.9 56.2, 13.7 55 C 12.5 53.8, 9.1 54.2, 8.6 56 Z";
const SHINE = "M 28.6 -5.0 C 29.5 -6.0, 33.4 -7.9, 37.0 -8.6 C 40.6 -9.3, 45.7 -9.5, 50.0 -9.4 C 54.3 -9.3, 62.7 -8.2, 63.0 -7.8 C 63.3 -7.4, 55.8 -7.3, 51.9 -7.0 C 48.0 -6.7, 43.2 -6.5, 39.8 -5.8 C 36.4 -5.1, 33.3 -2.7, 31.4 -2.6 C 29.5 -2.5, 27.7 -4.0, 28.6 -5.0 Z M 8.1 22 C 7.9 20.7, 8.9 16.3, 10.0 14.2 C 11.1 12.1, 14.3 9.3, 14.7 9.4 C 15.1 9.5, 12.9 12.9, 12.3 15.0 C 11.7 17.1, 11.6 20.8, 10.9 22 C 10.2 23.2, 8.2 23.3, 8.1 22 Z";

const SHADE = "#A8681A";
const STRAND = "#9A6420";

/**
 * Her coiffure: from a bare forehead the front lock lifts off her right temple into a tall crest,
 * sweeps across and curls down over the other temple, with a flick at the side. Full sides cover
 * the ears and hug the jaw; the pearl earrings sit on top.
 */
const URSULA_HAIR: Record<UrsulaHairId, HairSpec> = {
  ursulaCoiffure: {
    cap: capAbove(
      "M 12 56 L 21 56 L 21 40 C 21 30, 25 22.5, 32 20.2 C 40 18.8, 50 18.5, 60 19.5 C 65 20, 69 21.5, 72 24.5 C 75 29, 77.5 37, 79.5 47 L 79.5 56 L 88 56",
    ),
    front: FRONT,
    paint: () => (
      <g>
        <path d={SHADOWS} fill={SHADE} fillOpacity="0.38" />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={STRANDS} stroke={STRAND} strokeWidth="1.1" strokeOpacity="0.7" />
          <path d={`${LIFT} ${CURL} ${FLICK}`} stroke="currentColor" strokeWidth="1.8" />
          <path d={TUCKS} stroke="currentColor" strokeWidth="1.5" />
        </g>
      </g>
    ),
    shine: SHINE,
    top: -6,
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
