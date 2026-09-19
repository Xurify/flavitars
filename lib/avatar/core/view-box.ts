import type { AvatarState } from "../types";
import { isPhysicalHat } from "../parts/hats";

const EXTRA_TALL_HATS = new Set<AvatarState["hat"]>(["wizardHat", "vikingHelmet", "chefHat"]);

const TALL_HATS = new Set<AvatarState["hat"]>([
  "topHat",
  "propellerHat",
  "halo",
  "astronautHelmet",
  "crown",
  "pirateHat",
  "samuraiHelmet",
  "cowboyHat",
  "strawHat",
  "militaryHelmet",
  "detectiveHat",
  "ushanka",
  "beret",
]);

const TALL_HAIR = new Set<AvatarState["hair"]>([
  "largeAfro",
  "spikyMohawk",
  "doubleSpaceBuns",
  "singleTopKnot",
  "largeHairBow",
  "detailedHairBow",
  "texturedPompadour",
]);

const PERCH_HATS = new Set<AvatarState["hat"]>(["crown", "halo", "propellerHat", "nurseCap", "chefHat"]);

export function getAvatarViewBox(state: Pick<AvatarState, "hat" | "hair">): string {
  if (state.hair === "largeAfro") {
    if (PERCH_HATS.has(state.hat) || EXTRA_TALL_HATS.has(state.hat)) {
      return "0 -92 100 204";
    }
    if (state.hat === "beret") {
      return "0 -56 100 168";
    }
    return "0 -80 100 192";
  }
  if (state.hat === "beret" && TALL_HAIR.has(state.hair)) {
    return "0 -40 100 152";
  }
  if (EXTRA_TALL_HATS.has(state.hat) || (PERCH_HATS.has(state.hat) && TALL_HAIR.has(state.hair))) {
    return "0 -52 100 160";
  }
  if (TALL_HATS.has(state.hat)) {
    return "0 -24 100 132";
  }
  if (TALL_HAIR.has(state.hair) && !isPhysicalHat(state.hat)) {
    return "0 -24 100 132";
  }
  return "0 0 100 100";
}
