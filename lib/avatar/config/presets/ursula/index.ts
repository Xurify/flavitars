export * from "./hair";
export * from "./eyes";
export * from "./eyebrows";
export * from "./mouth";
export * from "./body";
export * from "./accessories";
export * from "./extras";
export * from "./presets";

import { UrsulaHairBack, UrsulaHairFront, UrsulaHairIds } from "./hair";
import { UrsulaEyes, UrsulaEyesIds } from "./eyes";
import { UrsulaEyebrows, UrsulaEyebrowsIds } from "./eyebrows";
import { UrsulaMouths, UrsulaMouthIds } from "./mouth";
import { UrsulaBodies, UrsulaBodyIds } from "./body";
import { UrsulaAccessories, UrsulaAccessoryIds } from "./accessories";
import { UrsulaExtras, UrsulaExtrasIds } from "./extras";
import { URSULA_PRESETS } from "./presets";

export const UrsulaPartsRegistry = {
  hairBack: UrsulaHairBack,
  hairFront: UrsulaHairFront,
  eyes: UrsulaEyes,
  eyebrows: UrsulaEyebrows,
  mouths: UrsulaMouths,
  bodies: UrsulaBodies,
  accessories: UrsulaAccessories,
  extras: UrsulaExtras,
};

export const UrsulaIdsRegistry = {
  hair: UrsulaHairIds,
  eyes: UrsulaEyesIds,
  eyebrows: UrsulaEyebrowsIds,
  mouths: UrsulaMouthIds,
  bodies: UrsulaBodyIds,
  accessories: UrsulaAccessoryIds,
  extras: UrsulaExtrasIds,
};

export { URSULA_PRESETS };
