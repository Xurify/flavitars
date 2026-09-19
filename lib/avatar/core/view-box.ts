import type { AvatarState } from "../types";

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
  if (EXTRA_TALL_HATS.has(state.hat) || (PERCH_HATS.has(state.hat) && TALL_HAIR.has(state.hair))) {
    return "0 -52 100 160";
  }
  if (TALL_HATS.has(state.hat) || TALL_HAIR.has(state.hair)) {
    return "0 -24 100 132";
  }
  return "0 0 100 100";
}
