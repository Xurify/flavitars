import type { AvatarState } from "../types";

const EXTRA_TALL_HATS = new Set<AvatarState["hat"]>(["wizardHat"]);

const TALL_HATS = new Set<AvatarState["hat"]>([
  "topHat",
  "chefHat",
  "propellerHat",
  "vikingHelmet",
  "halo",
  "astronautHelmet",
  "crown",
  "pirateHat",
  "samuraiHelmet",
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

export function getAvatarViewBox(state: Pick<AvatarState, "hat" | "hair">): string {
  if (EXTRA_TALL_HATS.has(state.hat)) {
    return "0 -48 100 154";
  }
  if (TALL_HATS.has(state.hat) || TALL_HAIR.has(state.hair)) {
    return "0 -16 100 122";
  }
  return "0 0 100 100";
}
