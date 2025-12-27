import { AvatarState, DEFAULT_AVATAR_STATE, SKIN_TONES, HAIR_COLORS, ACCESSORY_ACCENT_COLORS, CATEGORIES } from "../types";

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

  state.skinTone = SKIN_TONES[rng.nextInt(SKIN_TONES.length)].id;
  state.hairColor = HAIR_COLORS[rng.nextInt(HAIR_COLORS.length)].id;
  state.hatColor = HAIR_COLORS[rng.nextInt(HAIR_COLORS.length)].id;
  state.accessoryColor = ACCESSORY_ACCENT_COLORS[rng.nextInt(ACCESSORY_ACCENT_COLORS.length)].id;
  state.bodyColor = HAIR_COLORS[rng.nextInt(HAIR_COLORS.length)].id;

  state.containHair = rng.next() > 0.5;

  return state;
}

/**
 * Generate a deterministic avatar configuration from a numeric ID
 */
export function getAvatarStateFromId(id: number): AvatarState {
  return generateAvatarFromSeed(id);
}
/**
 * Generate a deterministic numeric ID from an avatar state
 */
export function getAvatarIdFromState(state: AvatarState): number {
  const orderedState = {
    head: state.head,
    eyebrows: state.eyebrows,
    eyes: state.eyes,
    nose: state.nose,
    mouth: state.mouth,
    hair: state.hair,
    extras: state.extras,
    accessories: state.accessories,
    hat: state.hat,
    body: state.body,
    skinTone: state.skinTone,
    hairColor: state.hairColor,
    hatColor: state.hatColor,
    accessoryColor: state.accessoryColor,
    bodyColor: state.bodyColor,
    texture: state.texture,
    containHair: state.containHair,
  };
  return hashString(JSON.stringify(orderedState));
}
