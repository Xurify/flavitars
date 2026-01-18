import { AvatarState, CATEGORIES, SKIN_TONES, HAIR_COLORS, ACCESSORY_ACCENT_COLORS } from "../types";
import { TextureId, Textures } from "../parts";

/**
 * Packs the avatar state into a compact Base36 string.
 * ID format: p_ + packed bits in base36
 */

const BASE36_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz";

function bigIntToBase36(value: bigint): string {
  if (value === BigInt(0)) return "0";
  let result = "";
  let v = value;
  while (v > BigInt(0)) {
    result = BASE36_CHARS[Number(v % BigInt(36))] + result;
    v /= BigInt(36);
  }
  return result;
}

function base36ToBigInt(str: string): bigint {
  let result = BigInt(0);
  for (let i = 0; i < str.length; i++) {
    result = result * BigInt(36) + BigInt(BASE36_CHARS.indexOf(str[i]));
  }
  return result;
}

export function packState(state: AvatarState): string {
  let bits = BigInt(0);
  let offset = BigInt(0);

  const pack = (value: string | boolean, options: string[] | readonly string[]) => {
    const bitWidth = BigInt(Math.ceil(Math.log2(Math.max(2, options.length))));
    const index = typeof value === "boolean" ? (value ? 1 : 0) : options.indexOf(value);
    const safeIndex = index === -1 ? 0 : index;
    bits |= BigInt(safeIndex) << offset;
    offset += bitWidth;
  };

  CATEGORIES.forEach((category) => {
    pack(state[category.stateKey], category.sortedKeys);
  });

  pack(state.skinTone, SKIN_TONES.map((tone) => tone.id));
  pack(state.hairColor, HAIR_COLORS.map((color) => color.id));
  pack(state.hatColor, HAIR_COLORS.map((color) => color.id));
  pack(state.accessoryColor, ACCESSORY_ACCENT_COLORS.map((color) => color.id));
  pack(state.bodyColor, HAIR_COLORS.map((color) => color.id));
  pack(state.texture, Object.keys(Textures));
  pack(state.containHair, ["false", "true"]);

  return bigIntToBase36(bits);
}

export function unpackState(packedId: string): Partial<AvatarState> | null {
  if (!packedId.startsWith("p_")) return null;
  const packedValue = packedId.slice(2);
  
  try {
    const bits = base36ToBigInt(packedValue);
    let offset = BigInt(0);
    const state: Partial<AvatarState> = {};

    const unpack = (options: string[] | readonly string[]) => {
      const bitWidth = BigInt(Math.ceil(Math.log2(Math.max(2, options.length))));
      const mask = (BigInt(1) << bitWidth) - BigInt(1);
      const index = Number((bits >> offset) & mask);
      offset += bitWidth;
      return options[index] || options[0];
    };

    CATEGORIES.forEach((category) => {
      (state as Record<string, string | boolean>)[category.stateKey] = unpack(category.sortedKeys);
    });

    state.skinTone = unpack(SKIN_TONES.map((tone) => tone.id));
    state.hairColor = unpack(HAIR_COLORS.map((color) => color.id));
    state.hatColor = unpack(HAIR_COLORS.map((color) => color.id));
    state.accessoryColor = unpack(ACCESSORY_ACCENT_COLORS.map((color) => color.id));
    state.bodyColor = unpack(HAIR_COLORS.map((color) => color.id));
    state.texture = unpack(Object.keys(Textures)) as TextureId;
    state.containHair = unpack(["false", "true"]) === "true";

    return state;
  } catch (error) {
    if (error instanceof Error) {
        console.error("Failed to unpack avatar state:", error.message);
    } else {
        console.error("Failed to unpack avatar state: Unknown error");
    }
    return null;
  }
}
