import { AvatarState, CATEGORIES } from "../types";
import { FABRIC_PALETTE, HAIR_PALETTE, LENS_PALETTE, Palette, paletteSwatches, SKIN_PALETTE } from "../colors";
import { TextureId, Textures } from "../parts";

/**
 * Packs the avatar state into a compact Base36 string.
 * ID format: prefix + packed bits in base36. Each field's bit width and index depend on its option
 * list, so changing a part list or palette breaks existing ids.
 */

export const PACKED_ID_PREFIX = "p2_";

export const isPackedId = (id: string) => id.startsWith(PACKED_ID_PREFIX);

const ids = (palette: Palette) => paletteSwatches(palette).map((option) => option.id);

/** Colour fields in pack order. */
const COLOR_FIELDS = [
  { key: "skinTone", palette: SKIN_PALETTE },
  { key: "hairColor", palette: HAIR_PALETTE },
  { key: "hatColor", palette: FABRIC_PALETTE },
  { key: "accessoryColor", palette: LENS_PALETTE },
  { key: "bodyColor", palette: FABRIC_PALETTE },
] as const;

const BASE36_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz";

function bigIntToBase36(value: bigint): string {
  if (value === BigInt(0)) return "0";
  let result = "";
  let remainingValue = value;
  while (remainingValue > BigInt(0)) {
    result = BASE36_CHARS[Number(remainingValue % BigInt(36))] + result;
    remainingValue /= BigInt(36);
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

  COLOR_FIELDS.forEach(({ key, palette }) => {
    pack(state[key], ids(palette));
  });
  pack(state.texture, Object.keys(Textures));
  pack(state.containHair, ["false", "true"]);

  return bigIntToBase36(bits);
}

export function unpackState(packedId: string): Partial<AvatarState> | null {
  if (!isPackedId(packedId)) return null;
  const packedValue = packedId.slice(PACKED_ID_PREFIX.length);

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

    COLOR_FIELDS.forEach(({ key, palette }) => {
      state[key] = unpack(ids(palette));
    });
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
