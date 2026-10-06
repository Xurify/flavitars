export * from "./head";
export * from "./hair";
export * from "./eyes";
export * from "./eyebrows";
export * from "./mouth";
export * from "./nose";
export * from "./body";
export * from "./accessories";
export * from "./extras";
export * from "./presets";

import { MarikaHeads, MarikaHeadIds } from "./head";
import { MarikaHairBack, MarikaHairFront, MarikaHairIds } from "./hair";
import { MarikaEyes, MarikaEyesIds } from "./eyes";
import { MarikaEyebrows, MarikaEyebrowsIds } from "./eyebrows";
import { MarikaMouths, MarikaMouthIds } from "./mouth";
import { MarikaNoses, MarikaNoseIds } from "./nose";
import { MarikaBodies, MarikaBodyIds } from "./body";
import { MarikaAccessories, MarikaAccessoryIds } from "./accessories";
import { MarikaExtras, MarikaExtrasIds } from "./extras";
import { MARIKA_PRESETS } from "./presets";

export const MarikaPartsRegistry = {
  heads: MarikaHeads,
  hairBack: MarikaHairBack,
  hairFront: MarikaHairFront,
  eyes: MarikaEyes,
  eyebrows: MarikaEyebrows,
  mouths: MarikaMouths,
  noses: MarikaNoses,
  bodies: MarikaBodies,
  accessories: MarikaAccessories,
  extras: MarikaExtras,
};

export const MarikaIdsRegistry = {
  heads: MarikaHeadIds,
  hair: MarikaHairIds,
  eyes: MarikaEyesIds,
  eyebrows: MarikaEyebrowsIds,
  mouths: MarikaMouthIds,
  noses: MarikaNoseIds,
  bodies: MarikaBodyIds,
  accessories: MarikaAccessoryIds,
  extras: MarikaExtrasIds,
};

export { MARIKA_PRESETS };
