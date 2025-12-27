import { HeadShapes } from "./head";
import { Eyebrows } from "./eyebrows";
import { Eyes } from "./eyes";
import { Noses } from "./nose";
import { Mouths } from "./mouth";
import { HairFront } from "./hair";
import { Extras } from "./extras";
import { Accessories } from "./accessories";
import { Hats } from "./hats";
import { Bodies } from "./body";
import { Textures } from "./textures";

export * from "./common";
export * from "./head";
export * from "./eyebrows";
export * from "./eyes";
export * from "./extras";
export * from "./nose";
export * from "./mouth";
export * from "./hair";
export * from "./accessories";
export * from "./hats";
export * from "./body";
export * from "./textures";

export const PART_COUNTS = {
  heads: Object.keys(HeadShapes).length,
  eyebrows: Object.keys(Eyebrows).length,
  eyes: Object.keys(Eyes).length,
  noses: Object.keys(Noses).length,
  mouths: Object.keys(Mouths).length,
  hair: Object.keys(HairFront).length,
  extras: Object.keys(Extras).length,
  accessories: Object.keys(Accessories).length,
  hats: Object.keys(Hats).length,
  bodies: Object.keys(Bodies).length,
  textures: Object.keys(Textures).length,
};
