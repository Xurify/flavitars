import { AvatarState, DEFAULT_AVATAR_STATE, CATEGORIES } from "../types";
import { FABRIC_PALETTE, HAIR_PALETTE, LENS_PALETTE, Palette, paletteSwatches, SKIN_PALETTE } from "../colors";
import { isPackedId, packState, PACKED_ID_PREFIX, unpackState } from "./packer";

/**
 * Deterministic hash function (FNV-1a variant)
 */
export function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Simple seeded random number generator
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: string | number) {
    this.seed = typeof seed === "string" ? hashString(seed) : seed;
  }

  /**
   * Returns a pseudo-random float between 0 and 1
   */
  next(): number {
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >> 17;
    this.seed ^= this.seed << 5;
    return (this.seed >>> 0) / 4294967296;
  }

  /**
   * Returns a pseudo-random integer between 0 and max (exclusive)
   */
  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }
}

/**
 * Generate a deterministic avatar configuration from a seed (string or number)
 */
export function generateAvatarFromSeed(seed: string | number): AvatarState {
  const rng = new SeededRandom(seed);
  const state: AvatarState = { ...DEFAULT_AVATAR_STATE };

  CATEGORIES.forEach((category) => {
    const keys = category.sortedKeys;
    const index = rng.nextInt(keys.length);
    (state as unknown as Record<string, string | boolean>)[category.stateKey] = keys[index];
  });

  const pick = (palette: Palette) => {
    const swatches = paletteSwatches(palette);
    return swatches[rng.nextInt(swatches.length)].id;
  };
  state.skinTone = pick(SKIN_PALETTE);
  state.hairColor = pick(HAIR_PALETTE);
  state.hatColor = pick(FABRIC_PALETTE);
  state.accessoryColor = pick(LENS_PALETTE);
  state.bodyColor = pick(FABRIC_PALETTE);

  state.containHair = rng.next() > 0.5;

  return state;
}

export function getAvatarStateFromId(id: string | number): AvatarState {
  if (typeof id === "string" && isPackedId(id)) {
    const unpacked = unpackState(id);
    if (unpacked) {
      return { ...DEFAULT_AVATAR_STATE, ...unpacked };
    }
  }
  return generateAvatarFromSeed(id);
}
export function getAvatarIdFromState(state: AvatarState): string {
  return PACKED_ID_PREFIX + packState(state);
}
