/**
 * Hair Data Extractor
 * Provides raw SVG path data for each hairstyle and layer.
 * This is a simplified mapping - in production you might parse the actual components.
 */

import { HairId } from "@/lib/avatar/parts/hair";

// Map of hair styles to their path data
// Format: { [hairId]: { front: string, back: string } }
const HAIR_PATHS: Record<HairId, { front: string; back: string }> = {
  bald: { front: "", back: "" },
  buzzCut: {
    front: "M20 25 C 20 10, 80 10, 80 25 L 30 25 Q 45 25, 30 25 Z",
    back: "",
  },
  flatTopShort: {
    front: "M12 18 Q 50 5, 88 18 L 88 38 L 12 38 Z",
    back: "M15 20 Q 10 50, 15 75 L 85 75 Q 90 50, 85 20 Z",
  },
  shortJaggedCrop: {
    front: "M12 18 Q 50 5, 88 18 L 90 32 L 78 28 L 70 38 L 58 30 L 50 40 L 42 30 L 30 38 L 22 28 L 10 32 Z",
    back: "M20 15 L 10 40 Q 10 70, 15 95 L 85 95 Q 90 70, 90 40 L 80 15 Z",
  },
  sidePartShort: {
    front: "M14 18 Q 30 2, 86 10 L 80 25 Q 40 18, 20 45 Z",
    back: "",
  },
  bobCutSharp: {
    front: "M 12 15 Q 12 45, 18 80 L 25 35 Q 25 10, 12 15 Z M 88 15 Q 88 45, 82 80 L 75 35 Q 75 10, 88 15 Z M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z",
    back: "M 15 20 L 5 45 Q 8 75, 12 95 L 88 95 Q 92 75, 95 45 L 85 20 Z",
  },
  bobCutStraight: {
    front: "M 15 15 C 8 35, 5 60, 12 85 L 25 35 Q 25 10, 15 15 Z M 85 15 C 92 35, 95 60, 88 85 L 75 35 Q 75 10, 85 15 Z M 12 15 Q 50 2, 88 15 L 82 35 Q 75 30, 68 38 L 50 32 L 32 38 Q 25 30, 18 35 Z",
    back: "M 18 20 Q 5 45, 10 95 L 90 95 Q 95 45, 82 20 Z",
  },
  jaggedFringeBob: {
    front: "M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z",
    back: "M15 15 Q 5 45, 10 95 L 90 95 Q 95 45, 85 15 Z",
  },
  bowlCutRound: {
    front: "M 12 18 Q 45 4, 88 15 L 82 35 C 65 25, 45 35, 30 45 L 18 35 Z M 15 25 C -5 55, -2 88, 22 100 L 42 95 Q 18 65, 15 25 Z M 85 25 C 105 55, 102 88, 78 100 L 58 95 Q 82 65, 85 25 Z",
    back: "M 10 20 C -10 40, -5 80, 15 95 L 30 88 L 50 95 L 70 88 L 85 95 C 110 80, 105 40, 90 20 Z",
  },
  sharpBobYellowHighlight: {
    front: "M 16 15 Q 10 50, 16 95 L 24 95 Q 18 50, 22 15 Z M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z",
    back: "M 15 25 L 5 45 Q 8 75, 12 95 L 88 95 Q 92 75, 95 45 L 85 25 Z",
  },
  shortCurlyBob: {
    front: "M 15 28 C 22 8, 45 5, 50 15 C 55 5, 78 8, 85 28 L 80 38 Q 50 20, 20 38 Z M 12 30 Q 0 50, 8 75 Q 2 85, 15 95 L 28 88 Q 18 75, 22 55 Q 15 40, 18 30 Z M 88 30 Q 100 50, 92 75 Q 98 85, 85 95 L 72 88 Q 82 75, 78 55 Q 85 40, 82 30 Z",
    back: "M 18 25 C 5 40, 0 70, 15 95 L 85 95 C 100 70, 95 40, 82 25 Z",
  },
  longStraightLayered: {
    front: "M 15 15 C 8 35, 5 60, 12 95 L 25 35 Q 25 10, 15 15 Z M 85 15 C 92 35, 95 60, 88 95 L 75 35 Q 75 10, 85 15 Z M 12 15 Q 50 2, 88 15 L 80 35 Q 50 20, 20 35 Z",
    back: "M 15 25 C 5 40, 0 80, 10 115 L 90 115 C 100 80, 95 40, 85 25 Z",
  },
  longLocs: {
    front: "M 15 20 Q 50 5, 85 20 L 82 35 Q 50 25, 18 35 Z M 12 30 Q 8 55, 10 95 M 18 28 Q 14 55, 16 95 M 24 26 Q 20 55, 22 90 M 88 30 Q 92 55, 90 95 M 82 28 Q 86 55, 84 95 M 76 26 Q 80 55, 78 90",
    back: "M 12 20 Q 50 45, 8 100 L 92 100 Q 95 45, 88 20 Z",
  },
  messySideSwept: {
    front: "M 10 20 L 15 4 C 28 -5, 42 -5, 48 2 Q 78 0, 95 12 L 91 32 C 78 18, 55 18, 42 22 Q 25 25, 12 28 Z",
    back: "M 10 25 C -20 45, -25 90, 15 100 C 25 105, 35 100, 45 105 C 55 100, 65 105, 75 102 C 85 105, 125 90, 80 15 L 90 25 L 65 5 Z",
  },
  roundedCurls: {
    front: "M 12 22 C 15 5, 45 5, 52 10 Q 75 10, 90 18 L 86 35 C 75 22, 55 25, 40 25 Q 25 25, 12 28 Z",
    back: "M 15 25 C 0 45, 0 90, 30 100 C 40 105, 50 100, 70 100 C 100 90, 100 45, 85 25 L 65 8 Z",
  },
  trapezoidCut: {
    front: "M 12 18 C 25 5, 65 2, 90 22 L 85 38 Q 60 15, 20 38 Z",
    back: "M 15 20 L 5 45 Q 8 95, 12 95 L 88 95 Q 92 95, 95 45 L 85 20 Z",
  },
  roundedMiddlePart: {
    front: "M 15 20 C 30 10, 45 10, 50 15 C 55 10, 70 10, 85 20 L 80 32 Q 50 15, 20 32 Z",
    back: "M 15 20 L 8 45 Q 10 95, 12 95 L 88 95 Q 90 95, 92 45 L 85 20 Z",
  },
  puffyMiddlePart: {
    front: "M 15 20 C 15 5, 30 -5, 50 5 C 70 -5, 85 5, 85 20 L 92 45 Q 85 35, 75 42 L 50 35 L 25 42 Q 15 35, 8 45 Z",
    back: "M 15 25 Q 5 50, 10 95 L 90 95 Q 95 50, 85 25 Z",
  },
  heartMiddlePart: {
    front: "M 12 25 C 20 10, 45 5, 52 15 C 65 5, 90 10, 88 25 L 92 45 Q 92 65, 85 95 L 70 95 Q 78 70, 75 45 L 70 35 L 50 38 L 30 35 L 25 45 Q 22 70, 15 95 L 8 95 Q 8 65, 12 45 Z",
    back: "M 18 20 C 0 45, 0 95, 15 95 L 35 90 L 50 95 L 65 90 L 85 95 C 100 95, 100 45, 82 20 Z",
  },
  sweptFringe: {
    front: "M14 15 Q 40 4, 86 10 L 80 25 Q 40 16, 22 48 L 14 28 Z",
    back: "M10 15 Q 10 -10, 50 -10 Q 90 -10, 90 15 L 98 85 H 2 Z",
  },
  singleTopKnot: {
    front: "M 10 25 Q 50 2, 90 25 L 90 35 Q 50 22, 10 35 Z",
    back: "",
  },
  doubleSpaceBuns: {
    front: "M10 15 Q 50 -2, 90 15 L 86 30 Q 50 20, 14 30 Z",
    back: "",
  },
  lowPonytail: {
    front: "M 18 30 C 18 10, 40 8, 50 8 C 60 8, 82 10, 82 30 L 82 40 C 82 30, 60 25, 50 25 C 40 25, 18 30, 18 40 Z",
    back: "M 50 35 Q 60 40, 75 95 L 82 92 Q 68 40, 60 35 Z",
  },
  largeAfro: {
    front: "",
    back: "M 5 50 A 45 45 0 1 1 95 50 A 45 45 0 1 1 5 50",
  },
  spikyMohawk: {
    front: "M22 28 L 15 15 L 30 22 L 35 6 L 45 18 L 50 -2 L 55 18 L 65 6 L 70 22 L 85 15 L 78 28 Q 50 24, 22 28 Z",
    back: "",
  },
  shavedSidesLongBack: {
    front: "M 15 15 C 5 35, 5 95, 25 100 L 35 85 L 22 35 Q 22 10, 15 15 Z M 85 15 C 95 35, 95 95, 75 100 L 65 85 L 78 35 Q 78 10, 85 15 Z M 12 15 Q 50 5, 88 15 L 82 35 C 70 25, 30 25, 18 35 Z",
    back: "M 20 25 C 5 45, 5 95, 20 95 L 35 90 L 50 95 L 65 90 L 80 95 C 95 95, 95 45, 80 25 Z",
  },
  aviatorFlaps: {
    front: "M15 15 Q 50 0, 85 15 L 85 35 Q 50 25, 15 35 Z",
    back: "M15 25 Q 0 40, 5 75 Q 15 80, 20 70 L 25 35 Z M85 25 Q 100 40, 95 75 Q 85 80, 80 70 L 75 35 Z",
  },
  texturedPompadour: {
    front: "M 12 18 C 12 0, 40 -5, 52 5 C 65 -5, 95 0, 88 22 L 85 42 C 75 35, 60 38, 50 35 Q 25 35, 12 32 Z",
    back: "M 20 25 L 15 45 Q 15 55, 30 60 L 70 60 Q 85 55, 85 45 L 80 25 Z",
  },
  largeHairBow: {
    front: "M 10 20 C 5 0, 45 -10, 50 10 C 55 -10, 95 0, 90 20 L 95 35 Q 92 45, 80 42 L 20 42 Q 8 45, 5 35 Z",
    back: "M 12 25 L 5 45 Q 8 75, 20 85 L 80 85 Q 92 75, 95 45 L 88 25 Z",
  },
  detailedHairBow: {
    front: "M 10 20 C 5 2, 45 -5, 50 12 C 55 -5, 95 2, 90 20 L 92 28 Q 90 32, 80 30 L 20 30 Q 10 32, 8 28 Z",
    back: "M 12 25 L 5 45 Q 8 75, 20 85 L 80 85 Q 92 75, 95 45 L 88 25 Z",
  },
};

export function getHairPathData(hairId: HairId, layer: "front" | "back"): string {
  const paths = HAIR_PATHS[hairId];
  if (!paths) return "";
  return layer === "front" ? paths.front : paths.back;
}

export function getAllHairIds(): HairId[] {
  return Object.keys(HAIR_PATHS) as HairId[];
}
