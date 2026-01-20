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
    front: "M15 20 Q 50 8, 85 20 L 80 35 Q 50 22, 20 35 Z",
    back: "M18 22 Q 50 10, 82 22 L 82 50 Q 50 45, 18 50 Z",
  },
  sidePartShort: {
    front: "M14 18 Q 30 2, 86 10 L 80 25 Q 40 18, 20 45 Z",
    back: "",
  },
  bobCutSharp: {
    front: "M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z",
    back: "M 15 20 L 5 45 Q 8 75, 12 95 L 88 95 Q 92 75, 95 45 L 85 20 Z",
  },
  bobCutStraight: {
    front: "M 12 15 Q 50 2, 88 15 L 84 40 Q 50 35, 16 40 Z",
    back: "M 14 20 L 10 95 H 90 L 86 20 Z",
  },
  jaggedFringeBob: {
    front: "M 15 20 L 25 12 L 35 22 L 45 10 L 55 22 L 65 10 L 75 20 L 85 12 L 80 35 Q 50 28, 20 35 Z",
    back: "M 15 25 Q 10 60, 12 90 L 88 90 Q 90 60, 85 25 Z",
  },
  bowlCutRound: {
    front: "M 12 18 C 12 5, 88 5, 88 18 L 88 40 C 88 55, 12 55, 12 40 Z",
    back: "M 15 30 Q 50 20, 85 30 L 85 75 Q 50 85, 15 75 Z",
  },
  sharpBobYellowHighlight: {
    front: "M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z",
    back: "M 14 18 L 8 95 H 92 L 86 18 Z",
  },
  shortCurlyBob: {
    front: "M 18 20 C 18 8, 82 8, 82 20 C 92 22, 92 35, 82 38 L 18 38 C 8 35, 8 22, 18 20 Z",
    back: "M 20 25 C 8 25, 5 60, 12 85 Q 50 95, 88 85 C 95 60, 92 25, 80 25 Z",
  },
  longStraightLayered: {
    front: "",
    back: "M 10 15 Q 10 -5, 50 -5 Q 90 -5, 90 15 L 95 100 Q 50 110, 5 100 Z",
  },
  longLocs: {
    front: "M 18 22 Q 50 10, 82 22 L 78 35 Q 50 28, 22 35 Z",
    back: "M 12 25 Q 50 15, 88 25 L 90 95 Q 50 100, 10 95 Z",
  },
  messySideSwept: {
    front: "M 10 20 L 15 4 C 28 -5, 42 -5, 48 2 Q 78 0, 95 12 L 91 32 C 78 18, 55 18, 42 22 Q 25 25, 12 28 Z",
    back: "M 8 22 C 8 5, 50 0, 92 22 L 95 80 Q 50 90, 5 80 Z",
  },
  roundedCurls: {
    front: "M 15 22 C 25 8, 75 8, 85 22 Q 85 35, 75 40 L 25 40 Q 15 35, 15 22 Z",
    back: "M 15 28 C 5 28, 2 65, 10 90 L 90 90 C 98 65, 95 28, 85 28 Z",
  },
  trapezoidCut: {
    front: "M 12 18 C 25 5, 65 2, 90 22 L 85 38 Q 60 15, 20 38 Z",
    back: "M 10 22 C 10 5, 90 5, 90 22 L 95 85 Q 50 95, 5 85 Z",
  },
  roundedMiddlePart: {
    front: "M 15 20 C 30 10, 45 10, 50 15 C 55 10, 70 10, 85 20 L 80 32 Q 50 15, 20 32 Z",
    back: "M 12 18 Q 50 5, 88 18 L 92 85 Q 50 95, 8 85 Z",
  },
  puffyMiddlePart: {
    front: "M 15 18 C 25 5, 45 8, 50 15 C 55 8, 75 5, 85 18 L 82 35 Q 50 22, 18 35 Z",
    back: "M 10 20 Q 50 -5, 90 20 L 92 80 Q 50 92, 8 80 Z",
  },
  heartMiddlePart: {
    front: "M 50 22 C 35 5, 15 8, 15 25 C 15 35, 30 42, 50 35 C 70 42, 85 35, 85 25 C 85 8, 65 5, 50 22 Z",
    back: "M 10 30 Q 50 15, 90 30 L 88 85 Q 50 95, 12 85 Z",
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
    front: "M 18 20 Q 50 8, 82 20 L 78 35 Q 50 25, 22 35 Z",
    back: "M 45 50 Q 42 70, 45 95 L 55 95 Q 58 70, 55 50 Z",
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
    front: "M 20 22 Q 50 12, 80 22 L 78 38 Q 50 30, 22 38 Z",
    back: "M 35 25 Q 50 20, 65 25 L 70 95 Q 50 100, 30 95 Z",
  },
  aviatorFlaps: {
    front: "M 20 22 Q 50 10, 80 22 L 76 35 Q 50 28, 24 35 Z",
    back: "M 15 25 Q 50 12, 85 25 L 88 45 H 12 Z",
  },
  texturedPompadour: {
    front: "M 18 28 Q 30 -5, 50 5 Q 70 -5, 82 28 L 78 40 Q 50 25, 22 40 Z",
    back: "M 20 30 Q 50 20, 80 30 L 82 60 Q 50 55, 18 60 Z",
  },
  largeHairBow: {
    front: "M 15 25 Q 50 10, 85 25 L 80 38 Q 50 28, 20 38 Z",
    back: "M 18 30 Q 50 18, 82 30 L 80 55 Q 50 50, 20 55 Z",
  },
  detailedHairBow: {
    front: "M 18 25 Q 50 12, 82 25 L 78 38 Q 50 30, 22 38 Z",
    back: "M 15 28 Q 50 15, 85 28 L 82 60 Q 50 55, 18 60 Z",
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
