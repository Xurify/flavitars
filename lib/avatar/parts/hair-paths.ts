import type { HairId } from "./hair-ids";
import { isPhysicalHat, type HatId } from "./hats";

export type HairLayer = "front" | "back" | "highlight";

type HairPathSingle = string;
type HairPathVariant = HairPathSingle | { noHat: string; hat: string };

type HighlightVariant = string | { noHat: string; hat: string };
type HairPathEntry = { front: HairPathVariant; back: HairPathVariant; highlight?: HighlightVariant };

export const HAIR_PATHS: Record<HairId, HairPathEntry> = {
  bald: {
    front: "",
    back: "",
  },
  buzzCut: {
    front: {
      noHat: "M 20 25 C 20 10, 80 10, 80 25 L 30 25 Q 45 25, 30 25 Z",
      hat: "M 24 28 Q 50 24, 76 28 L 74 36 Q 50 32, 26 36 Z",
    },
    back: "",
  },
  flatTopShort: {
    front: {
      noHat: "M 12 18 Q 50 5, 88 18 L 88 38 L 12 38 Z",
      hat: "M 20 25 Q 50 22, 80 25 L 80 38 L 20 38 Z",
    },
    back: {
      noHat: "M 15 20 Q 10 50, 15 75 L 85 75 Q 90 50, 85 20 Z",
      hat: "M 22 35 Q 20 55, 22 75 L 78 75 Q 80 55, 78 35 Q 50 38, 22 35 Z",
    },
  },
  crewCut: {
    front: {
      noHat: "M 18 23 C 22 9, 78 9, 82 23 L 80 34 Q 50 28, 20 34 Z",
      hat: "M 22 27 Q 50 24, 78 27 L 76 36 Q 50 31, 24 36 Z",
    },
    back: {
      noHat: "M 20 24 C 22 14, 78 14, 80 24 L 78 45 Q 50 52, 22 45 Z",
      hat: "M 18 32 C 24 26, 76 26, 82 32 L 78 48 Q 50 54, 22 48 Z",
    },
  },
  caesarCrop: {
    front: {
      noHat: "M 16 18 C 28 8, 70 8, 84 18 L 82 34 L 75 30 L 68 36 L 60 30 L 52 36 L 44 30 L 36 36 L 28 30 L 20 36 Z",
      hat: "M 22 25 Q 50 20, 78 25 L 76 36 L 68 32 L 60 38 L 52 32 L 44 38 L 36 32 L 28 38 L 22 34 Z",
    },
    back: "M 18 24 C 24 14, 76 14, 82 24 L 78 48 Q 50 56, 22 48 Z",
  },
  fadeCrop: {
    front: {
      noHat: "M 16 20 Q 50 8, 84 20 L 82 32 Q 50 24, 18 32 Z",
      hat: "M 24 26 Q 50 22, 76 26 L 74 34 Q 50 29, 26 34 Z",
    },
    back: "M 18 24 Q 50 10, 82 24 L 78 52 Q 50 62, 22 52 Z",
  },
  undercut: {
    front: {
      noHat: "M 12 24 C 28 4, 70 3, 88 15 L 82 30 C 66 22, 44 23, 22 42 L 15 42 Z",
      hat: "M 18 28 C 36 18, 63 18, 82 25 L 78 34 C 62 28, 44 29, 24 44 L 18 42 Z",
    },
    back: "M 16 25 Q 50 10, 84 25 L 80 55 Q 50 65, 20 55 Z",
  },
  slickBack: {
    front: {
      noHat: "M 12 24 C 20 5, 44 2, 58 8 C 72 8, 84 12, 90 24 L 82 38 Q 50 25, 18 38 Z",
      hat: "M 22 27 C 32 19, 62 17, 78 26 L 76 38 Q 50 29, 24 38 Z",
    },
    back: "M 15 24 C 22 10, 78 10, 85 24 L 82 62 Q 50 72, 18 62 Z",
  },
  curtains: {
    front: {
      noHat: "M 15 22 C 25 8, 42 8, 50 18 C 58 8, 75 8, 85 22 L 80 40 Q 66 28, 54 42 L 50 54 L 46 42 Q 34 28, 20 40 Z",
      hat: "M 24 25 C 33 17, 43 16, 50 24 C 57 16, 67 17, 76 25 L 74 34 Q 50 32, 26 34 Z",
    },
    back: {
      noHat: "M 17 25 C 25 12, 75 12, 83 25 L 80 65 Q 50 74, 20 65 Z",
      hat: "M 16 34 C 24 28, 76 28, 84 34 L 80 68 Q 50 76, 20 68 Z",
    },
  },
  shortWaves: {
    front: {
      noHat: "M 15 22 C 22 7, 78 7, 85 22 L 82 36 Q 50 29, 18 36 Z",
      hat: "M 23 27 Q 50 22, 77 27 L 75 37 Q 50 31, 25 37 Z",
    },
    back: "M 18 25 C 24 12, 76 12, 82 25 L 78 52 Q 50 62, 22 52 Z",
  },
  messyShort: {
    front: {
      noHat: "M 14 22 L 20 9 L 30 17 L 38 7 L 48 16 L 58 7 L 68 17 L 80 10 L 86 24 L 82 38 Q 50 26, 18 38 Z",
      hat: "M 22 27 L 30 22 L 39 27 L 49 21 L 59 27 L 70 22 L 78 28 L 75 38 Q 50 31, 25 38 Z",
    },
    back: "M 18 25 Q 50 9, 82 25 L 78 52 Q 50 60, 22 52 Z",
  },
  shortJaggedCrop: {
    front: {
      noHat: "M 17 15 Q 50 5, 83 15 L 84 35 L 78 28 L 70 38 L 58 30 L 50 40 L 42 30 L 30 38 L 22 28 L 17 35 Z",
      hat: "M 22 28 Q 50 24, 78 28 L 76 36 L 68 32 L 58 38 L 50 32 L 42 38 L 32 32 L 24 36 Z",
    },
    back: {
      noHat: "M 20 15 L 10 40 Q 10 70, 15 95 L 85 95 Q 90 70, 90 40 L 80 15 Z",
      hat: "M 16 34 Q 10 58, 14 94 L 86 94 Q 90 58, 84 34 Q 50 38, 16 34 Z",
    },
  },
  sidePartShort: {
    front: {
      noHat: "M 14 18 Q 30 2, 86 10 L 80 25 Q 40 18, 20 45 Z",
      hat: "M 22 27 Q 30 2, 79 22 L 74 30 Q 40 18, 21 47 Z",
    },
    back: "",
  },
  bobCutSharp: {
    front: {
      noHat: "M 12 15 Q 12 45, 18 80 L 25 35 Q 12 18, 12 15 Z M 88 15 Q 88 45, 82 80 L 75 35 Q 88 18, 88 15 Z M 12 15 Q 50 2, 88 15 L 75 35 L 68 22 L 50 35 L 32 22 L 25 35 Z",
      hat: "M 12 28 Q 12 50, 18 80 L 25 42 Q 14 32, 12 28 Z M 88 28 Q 88 50, 82 80 L 75 42 Q 86 32, 88 28 Z M 18 28 Q 50 22, 82 28 L 75 36 L 50 32 L 25 36 Z",
    },
    back: {
      noHat: "M 15 20 L 5 45 Q 8 75, 12 95 L 88 95 Q 92 75, 95 45 L 85 20 Z",
      hat: "M 14 34 Q 6 58, 12 95 L 88 95 Q 94 58, 86 34 Q 50 38, 14 34 Z",
    },
  },
  jaggedFringeBob: {
    front: {
      noHat: "M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z",
      hat: "M 20 28 Q 50 22, 80 28 L 76 36 L 64 30 L 50 36 L 36 30 L 24 36 Z",
    },
    back: {
      noHat: "M 15 15 Q 5 45, 10 95 L 90 95 Q 95 45, 85 15 Z",
      hat: "M 14 34 Q 6 58, 12 95 L 88 95 Q 94 58, 86 34 Q 50 38, 14 34 Z",
    },
  },
  bowlCutRound: {
    front: {
      noHat: "M 12 18 Q 45 4, 88 15 L 82 35 C 65 25, 45 35, 30 45 L 18 35 Z M 15 25 C -5 55, -2 88, 22 100 L 42 95 Q 18 65, 15 25 Z M 85 25 C 105 55, 102 88, 78 100 L 58 95 Q 82 65, 85 25 Z",
      hat: "M 20 28 Q 50 22, 80 28 L 74 36 Q 50 30, 26 36 Z M 12 38 C 2 60, 4 88, 20 98 L 32 92 Q 16 70, 18 44 Z M 88 38 C 98 60, 96 88, 80 98 L 68 92 Q 84 70, 82 44 Z",
    },
    back: {
      noHat: "M 10 20 C -10 40, -5 80, 15 95 L 30 88 L 50 95 L 70 88 L 85 95 C 110 80, 105 40, 90 20 Z",
      hat: "M 12 36 C 2 56, 4 84, 16 96 L 32 90 L 50 96 L 68 90 L 84 96 C 96 84, 98 56, 88 36 Q 50 40, 12 36 Z",
    },
  },
  sharpBobYellowHighlight: {
    front: {
      noHat: "M 12 15 L 16 15 Q 10 50, 16 95 L 24 95 Q 18 50, 22 15 Z M 12 15 Q 50 2, 90 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z",
      hat: "M 20 28 Q 10 54, 16 95 L 24 95 Q 18 54, 28 36 Z M 22 28 Q 50 22, 78 28 L 76 36 L 64 30 L 50 36 L 36 30 L 24 36 Z",
    },
    back: {
      noHat: "M 15 25 L 5 45 Q 8 75, 12 95 L 88 95 Q 92 75, 95 45 L 85 25 Z",
      hat: "M 22 35 Q 20 55, 22 75 L 78 75 Q 80 55, 78 35 Q 50 38, 22 35 Z",
    },
    highlight: {
      noHat: "M 16 15 Q 10 50, 16 95 L 24 95 Q 18 50, 22 15 Z",
      hat: "M 22 26 Q 10 50, 16 95 L 24 95 Q 18 50, 26 26 Z",
    },
  },
  shortCurlyBob: {
    front: {
      noHat: "M 15 28 C 22 8, 45 5, 50 15 C 55 5, 78 8, 85 28 L 80 38 Q 50 20, 20 38 Z M 12 30 Q 0 50, 8 75 Q 2 85, 15 95 L 28 88 Q 18 75, 22 55 Q 15 40, 18 30 Z M 88 30 Q 100 50, 92 75 Q 98 85, 85 95 L 72 88 Q 82 75, 78 55 Q 85 40, 82 30 Z",
      hat: "M 22 28 C 32 22, 44 22, 50 24 C 56 22, 68 22, 78 28 L 74 36 Q 50 30, 26 36 Z M 12 38 Q 2 58, 10 78 Q 4 90, 16 96 L 28 90 Q 16 76, 20 48 Z M 88 38 Q 98 58, 90 78 Q 96 90, 84 96 L 72 90 Q 84 76, 80 48 Z",
    },
    back: {
      noHat: "M 18 25 C 5 40, 0 70, 15 95 L 85 95 C 100 70, 95 40, 82 25 Z",
      hat: "M 14 36 C 4 54, 4 78, 16 96 L 84 96 C 96 78, 96 54, 86 36 Q 50 40, 14 36 Z",
    },
  },
  longStraightLayered: {
    front: {
      noHat: "M 14 24 C 19 10, 35 5, 50 6 C 65 5, 81 10, 86 24 L 82 34 C 68 25, 58 20, 50 23 C 42 20, 32 25, 18 34 Z",
      hat: "M 20 28 C 28 22, 40 20, 50 22 C 60 20, 72 22, 80 28 L 76 36 C 66 30, 58 28, 50 30 C 42 28, 34 30, 24 36 Z",
    },
    back: {
      noHat: "M 16 24 C 7 41, 7 77, 13 99 L 87 99 C 93 77, 93 41, 84 24 C 72 10, 28 10, 16 24 Z",
      hat: "M 14 34 C 8 54, 8 80, 14 99 L 86 99 C 92 80, 92 54, 86 34 C 72 28, 28 28, 14 34 Z",
    },
  },
  longLocs: {
    front: {
      noHat: "M 15 20 Q 50 5, 85 20 L 82 35 Q 50 25, 18 35 Z M 12 30 Q 8 55, 10 95 M 18 28 Q 14 55, 16 95 M 24 26 Q 20 55, 22 90 M 88 30 Q 92 55, 90 95 M 82 28 Q 86 55, 84 95 M 76 26 Q 80 55, 78 90",
      hat: "M 20 28 Q 50 22, 80 28 L 76 36 Q 50 30, 24 36 Z M 10 38 Q 6 64, 10 96 L 20 96 Q 16 64, 18 42 Z M 90 38 Q 94 64, 90 96 L 80 96 Q 84 64, 82 42 Z",
    },
    back: {
      noHat: "M 12 22 C 8 45, 8 78, 14 100 L 86 100 C 92 78, 92 45, 88 22 Q 50 8, 12 22 Z",
      hat: "M 14 36 C 8 58, 10 82, 16 100 L 84 100 C 90 82, 92 58, 86 36 Q 50 40, 14 36 Z",
    },
  },
  messySideSwept: {
    front: {
      noHat: "M 10 20 L 15 4 C 28 -5, 42 -5, 48 2 Q 78 0, 95 12 L 91 32 C 78 18, 55 18, 42 22 Q 25 25, 12 28 Z",
      hat: "M 12 28 Q 25 25, 42 25 C 55 25, 78 25, 88 32 C 85 35, 75 35, 60 38 Q 30 40, 12 28 Z",
    },
    back: "M 10 25 C -20 45, -25 90, 15 100 C 25 105, 35 100, 45 105 C 55 100, 65 105, 75 102 C 85 105, 125 90, 80 15 L 90 25 L 65 5 Z",
  },
  roundedCurls: {
    front: {
      noHat: "M 12 22 C 15 5, 45 5, 52 10 Q 75 10, 90 18 L 86 35 C 75 22, 55 25, 40 25 Q 25 25, 12 28 Z",
      hat: "M 22 28 C 32 22, 44 22, 50 24 C 62 22, 74 22, 80 28 L 76 36 C 66 30, 56 30, 50 32 C 44 30, 34 30, 24 36 Z",
    },
    back: {
      noHat: "M 15 25 C 0 45, 0 90, 30 100 C 40 105, 50 100, 70 100 C 100 90, 100 45, 85 25 L 65 8 Z",
      hat: "M 14 36 C 4 56, 6 88, 28 98 C 40 102, 50 98, 72 98 C 94 88, 96 56, 86 36 Q 50 40, 14 36 Z",
    },
  },
  trapezoidCut: {
    front: {
      noHat: "M 12 18 C 25 5, 65 2, 90 22 L 85 38 Q 60 15, 20 38 Z",
      hat: "M 22 18 C 25 5, 65 2, 79 17 L 78 40 Q 60 15, 20 38 Z",
    },
    back: {
      noHat: "M 15 20 L 5 45 Q 8 95, 12 95 L 88 95 Q 92 95, 95 45 L 85 20 Z",
      hat: "M 20 20 L 12 49 Q 8 95, 12 95 L 88 95 Q 92 95, 88 49 L 79 21 Z",
    },
  },
  roundedMiddlePart: {
    front: {
      noHat: "M 15 20 C 30 10, 45 10, 50 15 C 55 10, 70 10, 85 20 L 80 32 Q 50 15, 20 32 Z",
      hat: "M 22 28 C 32 22, 44 22, 50 24 C 56 22, 68 22, 78 28 L 74 36 Q 50 30, 26 36 Z",
    },
    back: {
      noHat: "M 15 20 L 8 45 Q 10 95, 12 95 L 88 95 Q 90 95, 92 45 L 85 20 Z",
      hat: "M 16 34 Q 10 58, 14 95 L 86 95 Q 90 58, 84 34 Q 50 38, 16 34 Z",
    },
  },
  puffyMiddlePart: {
    front: {
      noHat: "M 15 20 C 15 5, 30 -5, 50 5 C 70 -5, 85 5, 85 20 L 92 45 Q 85 35, 75 42 L 50 35 L 25 42 Q 15 35, 8 45 Z",
      hat: "M 22 28 C 32 22, 44 22, 50 24 C 56 22, 68 22, 78 28 L 84 42 Q 80 36, 70 40 L 50 36 L 30 40 Q 20 36, 16 42 Z",
    },
    back: {
      noHat: "M 15 25 Q 5 50, 10 95 L 90 95 Q 95 50, 85 25 Z",
      hat: "M 16 34 Q 8 58, 12 95 L 88 95 Q 92 58, 84 34 Q 50 38, 16 34 Z",
    },
  },
  heartMiddlePart: {
    front: {
      noHat: "M 12 25 C 20 10, 45 5, 52 15 C 65 5, 90 10, 88 25 L 92 45 Q 92 65, 85 95 L 70 95 Q 78 70, 75 45 L 70 35 L 50 38 L 30 35 L 25 45 Q 22 70, 15 95 L 8 95 Q 8 65, 12 45 Z",
      hat: "M 22 28 C 30 22, 44 22, 50 26 C 56 22, 70 22, 78 28 L 80 42 Q 82 70, 76 95 L 64 95 Q 70 70, 68 42 L 62 36 L 50 38 L 38 36 L 32 42 Q 30 70, 36 95 L 24 95 Q 18 70, 20 42 Z",
    },
    back: {
      noHat: "M 18 20 C 0 45, 0 95, 15 95 L 35 90 L 50 95 L 65 90 L 85 95 C 100 95, 100 45, 82 20 Z",
      hat: "M 16 34 C 4 56, 6 88, 16 96 L 36 90 L 50 96 L 64 90 L 84 96 C 94 88, 96 56, 84 34 Q 50 38, 16 34 Z",
    },
  },
  sweptFringe: {
    front: {
      noHat: "M 14 15 Q 40 4, 86 10 L 80 25 Q 40 16, 22 48 L 14 28 Z",
      hat: "M 20.25 25.7 Q 38.25 19.7, 63.25 23.7 L 58.25 35.7 Q 38.25 28.7, 26.25 45.7 L 20.25 33.7 Z",
    },
    back: {
      noHat: "M 10 15 Q 10 -10, 50 -10 Q 90 -10, 90 15 L 98 85 H 2 Z",
      hat: "M 14 28 Q 12 50, 16 85 H 84 Q 88 50, 86 28 Q 50 32, 14 28 Z",
    },
  },
  singleTopKnot: {
    front: {
      noHat: "M 10 25 Q 50 2, 90 25 L 90 35 Q 50 22, 10 35 Z",
      hat: "M 22 28 Q 50 24, 78 28 L 76 36 Q 50 32, 24 36 Z",
    },
    back: "",
  },
  doubleSpaceBuns: {
    front: {
      noHat: "M 10 15 Q 50 -2, 90 15 L 86 30 Q 50 20, 14 30 Z",
      hat: "M 20 28 Q 50 22, 80 28 L 76 36 Q 50 30, 24 36 Z",
    },
    back: "",
  },
  lowPonytail: {
    front: {
      noHat: "M 18 30 C 18 10, 40 8, 50 8 C 60 8, 82 10, 82 30 L 82 40 C 82 30, 60 25, 50 25 C 40 25, 18 30, 18 40 Z",
      hat: "M 22 28 C 28 22, 40 20, 50 22 C 60 20, 72 22, 78 28 L 76 36 C 66 30, 58 28, 50 30 C 42 28, 34 30, 24 36 Z",
    },
    back: "M 50 35 Q 60 40, 75 95 L 82 92 Q 68 40, 60 35 Z",
  },
  largeAfro: {
    front: "",
    back: {
      noHat: "M 5 50 A 45 45 0 1 1 95 50 A 45 45 0 1 1 5 50",
      hat: "M 8 50 A 42 44 0 1 1 92 50 A 42 44 0 1 1 8 50",
    },
  },
  spikyMohawk: {
    front: {
      noHat: "M 22 28 L 15 15 L 30 22 L 35 6 L 45 18 L 50 -2 L 55 18 L 65 6 L 70 22 L 85 15 L 78 28 Q 50 24, 22 28 Z",
      hat: "M 22 30 Q 50 24, 78 30 L 76 38 Q 50 34, 24 38 Z",
    },
    back: {
      noHat: "",
      hat: "M 14 36 C 10 54, 12 78, 20 96 L 34 90 C 26 74, 24 52, 28 40 C 40 34, 60 34, 72 40 C 76 52, 74 74, 66 90 L 80 96 C 88 78, 90 54, 86 36 C 70 26, 30 26, 14 36 Z",
    },
  },
  aviatorFlaps: {
    front: {
      noHat: "M 15 15 Q 50 0, 85 15 L 85 35 Q 50 25, 15 35 Z",
      hat: "M 20 26 Q 50 20, 80 26 L 78 36 Q 50 30, 22 36 Z",
    },
    back: {
      noHat: "M 15 25 Q 0 40, 5 75 Q 15 80, 20 70 L 25 35 Z M 85 25 Q 100 40, 95 75 Q 85 80, 80 70 L 75 35 Z",
      hat: "M 12 36 Q 2 52, 6 78 Q 14 84, 20 72 L 24 42 Z M 88 36 Q 98 52, 94 78 Q 86 84, 80 72 L 76 42 Z",
    },
  },
  texturedPompadour: {
    front: {
      noHat: "M 12 18 C 12 0, 40 -5, 52 5 C 65 -5, 95 0, 88 22 L 85 42 C 75 35, 60 38, 50 35 Q 25 35, 12 32 Z",
      hat: "M 20 28 C 28 22, 44 20, 52 24 C 62 20, 76 22, 80 28 L 78 38 C 68 32, 58 34, 50 32 Q 30 34, 22 36 Z",
    },
    back: {
      noHat: "M 20 25 L 15 45 Q 15 55, 30 60 L 70 60 Q 85 55, 85 45 L 80 25 Z",
      hat: "M 16 36 L 14 50 Q 16 62, 30 64 L 70 64 Q 84 62, 86 50 L 84 36 Q 50 40, 16 36 Z",
    },
  },
  largeHairBow: {
    front: {
      noHat: "M 10 20 C 5 0, 45 -10, 50 10 C 55 -10, 95 0, 90 20 L 95 35 Q 92 45, 80 42 L 20 42 Q 8 45, 5 35 Z",
      hat: "M 22 28 Q 50 22, 78 28 L 74 36 Q 50 32, 26 36 Z",
    },
    back: {
      noHat: "M 12 25 L 5 45 Q 8 75, 20 85 L 80 85 Q 92 75, 95 45 L 88 25 Z",
      hat: "M 14 36 L 8 54 Q 10 78, 22 88 L 78 88 Q 90 78, 92 54 L 86 36 Q 50 40, 14 36 Z",
    },
  },
  detailedHairBow: {
    front: {
      noHat: "M 10 20 C 5 2, 45 -5, 50 12 C 55 -5, 95 2, 90 20 L 92 28 Q 90 32, 80 30 L 20 30 Q 10 32, 8 28 Z",
      hat: "M 22 28 Q 50 22, 78 28 L 74 36 Q 50 32, 26 36 Z",
    },
    back: {
      noHat: "M 12 25 L 5 45 Q 8 75, 20 85 L 80 85 Q 92 75, 95 45 L 88 25 Z",
      hat: "M 14 36 L 8 54 Q 10 78, 22 88 L 78 88 Q 90 78, 92 54 L 86 36 Q 50 40, 14 36 Z",
    },
  },
};

export function getHairPathData(hairId: HairId, layer: HairLayer, hatId: HatId): string {
  const paths = HAIR_PATHS[hairId];
  if (!paths) return "";

  if (layer === "highlight") {
    const highlight = paths.highlight ?? "";
    if (typeof highlight === "string") return highlight;
    const hasPhysicalHat = isPhysicalHat(hatId);
    return hasPhysicalHat ? highlight.hat : highlight.noHat;
  }

  const variant: HairPathVariant = layer === "front" ? paths.front : paths.back;

  if (typeof variant === "string") {
    return variant;
  }

  const hasPhysicalHat = isPhysicalHat(hatId);
  return hasPhysicalHat ? variant.hat : variant.noHat;
}

export function getHairHighlightPath(hairId: HairId, hatId: HatId = "none"): string {
  const highlight = HAIR_PATHS[hairId]?.highlight;
  if (!highlight) return "";
  if (typeof highlight === "string") return highlight;
  const hasPhysicalHat = isPhysicalHat(hatId);
  return hasPhysicalHat ? highlight.hat : highlight.noHat;
}

export function hasHairHighlight(hairId: HairId): boolean {
  return !!(HAIR_PATHS[hairId]?.highlight);
}

export function hasHairVariants(hairId: HairId, layer: HairLayer): boolean {
  const paths = HAIR_PATHS[hairId];
  if (!paths) return false;
  if (layer === "highlight") return false;
  const variant: HairPathVariant = layer === "front" ? paths.front : paths.back;
  return typeof variant !== "string";
}

export function getAllHairIds(): HairId[] {
  return Object.keys(HAIR_PATHS) as HairId[];
}
