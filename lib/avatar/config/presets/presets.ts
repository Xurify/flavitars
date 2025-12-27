import { AvatarState, PresetAvatarState } from "../../types";
import { MARIKA_PRESETS } from "./marika";

const BASE_PRESETS: Record<"prvy" | "drew", Partial<AvatarState> & { name: string; description?: string }> = {
  prvy: {
    name: "Prvy",
    description: "Born for something",
    head: "rounded",
    hair: "aviatorFlaps",
    body: "pajamas",
    eyes: "wingedLashes",
    hairColor: "blue",
    skinTone: "tan",
    texture: "halftone",
    mouth: "oMouth",
    hat: "skiMask",
    hatColor: "white",
    eyebrows: "angry",
    nose: "lShape",
    extras: "none",
    accessories: "none",
    accessoryColor: "fire",
    bodyColor: "black",
    containHair: false,
  },
  drew: {
    name: "Drew",
    description: "Those who know",
    head: "oval",
    hair: "roundedMiddlePart",
    body: "houndstoothPurpShirt",
    eyes: "lightHazel",
    hairColor: "orange",
    skinTone: "pale",
    texture: "halftone",
    mouth: "smile",
    hat: "none",
    hatColor: "blonde",
    eyebrows: "none",
    nose: "hook",
    extras: "none",
    accessories: "none",
    accessoryColor: "blue",
    bodyColor: "royal",
    containHair: false,
  },
};

export type PRESET_KEY = keyof typeof BASE_PRESETS | keyof typeof MARIKA_PRESETS;

export const AVATAR_PRESETS: Record<PRESET_KEY, Partial<PresetAvatarState> & { name: string; description?: string }> = {
  ...BASE_PRESETS,
  ...MARIKA_PRESETS,
};

export const SELECTABLE_PRESETS = BASE_PRESETS;

export function getAvatarStateFromPreset(name: PRESET_KEY): Partial<PresetAvatarState> | null {
  return AVATAR_PRESETS[name] || null;
}
