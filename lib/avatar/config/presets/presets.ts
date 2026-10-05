import { PresetAvatarState } from "../../types";
import { MARIKA_PRESETS } from "./marika";
import { URSULA_PRESETS } from "./ursula";

const BASE_PRESETS: Record<"prvy" | "drew", Partial<PresetAvatarState> & { name: string; description?: string }> = {
  prvy: {
    name: "Prvy",
    description: "Born for something",
    head: "rounded",
    hair: "aviatorFlaps",
    body: "pajamas",
    eyes: "prvyEyes",
    hairColor: "blue",
    skinTone: "silver",
    texture: "halftone",
    mouth: "prvyMouth",
    hat: "none",
    hatColor: "white",
    eyebrows: "none",
    nose: "prvyNoNose",
    extras: "prvyKnit",
    accessories: "none",
    accessoryColor: "fire",
    bodyColor: "black",
    containHair: false,
  },
  drew: {
    name: "Drew",
    description: "Those who know",
    head: "slender",
    hair: "drewLong",
    body: "drewShirt",
    eyes: "drewEyes",
    hairColor: "orange",
    skinTone: "pale",
    texture: "halftone",
    mouth: "drewLips",
    hat: "none",
    hatColor: "blonde",
    eyebrows: "drewBrows",
    nose: "smallButton",
    extras: "none",
    accessories: "none",
    accessoryColor: "blue",
    bodyColor: "purple",
    containHair: false,
  },
};

export type PRESET_KEY = keyof typeof BASE_PRESETS | keyof typeof MARIKA_PRESETS | keyof typeof URSULA_PRESETS;

export const AVATAR_PRESETS: Record<PRESET_KEY, Partial<PresetAvatarState> & { name: string; description?: string }> = {
  ...BASE_PRESETS,
  ...MARIKA_PRESETS,
  ...URSULA_PRESETS,
};

export const SELECTABLE_PRESETS = BASE_PRESETS;

export function getAvatarStateFromPreset(name: PRESET_KEY): Partial<PresetAvatarState> | null {
  return AVATAR_PRESETS[name] || null;
}
