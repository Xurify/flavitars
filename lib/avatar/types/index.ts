import React from "react";

export type AvatarCategory =
  | "head"
  | "eyebrows"
  | "eyes"
  | "nose"
  | "mouth"
  | "hair"
  | "hairBack"
  | "hairFront"
  | "extras"
  | "accessories"
  | "hats"
  | "body"
  | "texture";

import {
  PartProps,
  PartComponent,
  HeadShapes,
  Eyebrows,
  Eyes,
  Noses,
  Mouths,
  HairBack,
  HairFront,
  Extras,
  Accessories,
  Hats,
  HatId,
  HeadId,
  HairId,
  EyesId,
  EyebrowsId,
  NoseId,
  MouthId,
  ExtrasId,
  AccessoryId,
  BodyId,
  Bodies,
  TextureId,
  Textures,
} from "../parts";

import {
  MarikaHairBack,
  MarikaHairFront,
  MarikaEyes,
  MarikaEyebrows,
  MarikaMouths,
  MarikaBodies,
  MarikaAccessories,
  MarikaExtras,
  MarikaHairIds,
  MarikaEyesIds,
  MarikaEyebrowsIds,
  MarikaMouthIds,
  MarikaBodyIds,
  MarikaAccessoryIds,
  MarikaExtrasIds,
} from "../config/presets/marika";

export const AllHairFront = { ...HairFront, ...MarikaHairFront };
export const AllHairBack = { ...HairBack, ...MarikaHairBack };
export const AllEyes = { ...Eyes, ...MarikaEyes };
export const AllEyebrows = { ...Eyebrows, ...MarikaEyebrows };
export const AllMouths = { ...Mouths, ...MarikaMouths };
export const AllBodies = { ...Bodies, ...MarikaBodies };
export const AllAccessories = { ...Accessories, ...MarikaAccessories };
export const AllExtras = { ...Extras, ...MarikaExtras };

export interface AvatarState {
  head: HeadId;
  eyebrows: EyebrowsId;
  eyes: EyesId;
  nose: NoseId;
  mouth: MouthId;
  hair: HairId;
  extras: ExtrasId;
  accessories: AccessoryId;
  hat: HatId;
  body: BodyId;
  skinTone: string;
  hairColor: string;
  hatColor: string;
  accessoryColor: string;
  bodyColor: string;
  texture: TextureId;
  containHair: boolean;
}

export type AllHairId = HairId | (typeof MarikaHairIds)[number];
export type AllEyesId = EyesId | (typeof MarikaEyesIds)[number];
export type AllEyebrowsId = EyebrowsId | (typeof MarikaEyebrowsIds)[number];
export type AllMouthId = MouthId | (typeof MarikaMouthIds)[number];
export type AllBodyId = BodyId | (typeof MarikaBodyIds)[number];
export type AllAccessoryId = AccessoryId | (typeof MarikaAccessoryIds)[number];
export type AllExtrasId = ExtrasId | (typeof MarikaExtrasIds)[number];

export interface PresetAvatarState {
  head: HeadId;
  eyebrows: AllEyebrowsId;
  eyes: AllEyesId;
  nose: NoseId;
  mouth: AllMouthId;
  hair: AllHairId;
  extras: AllExtrasId;
  accessories: AllAccessoryId;
  hat: HatId;
  body: AllBodyId;
  skinTone: string;
  hairColor: string;
  hatColor: string;
  accessoryColor: string;
  bodyColor: string;
  texture: TextureId;
  containHair: boolean;
}

export interface LayerConfig {
  category: AvatarCategory;
  zIndex: number;
  renderBehindFace?: boolean;
}
export interface CustomizationItem {
  id: string;
  name: string;
  category: AvatarCategory;
  component: React.ComponentType<PartProps>;
  incompatibleWith?: string[];
  requiresSkinTone?: boolean;
}

export interface CategoryConfig {
  id: AvatarCategory;
  label: string;
  icon: string;
  stateKey: keyof AvatarState;
  allowNone: boolean;
  items: Record<string, PartComponent>;
  backItems?: Record<string, PartComponent>;
  sortedKeys: string[];
  sortedBackKeys?: string[];
}

export interface SkinTone {
  id: string;
  name: string;
  color: string;
}

export interface HairColor {
  id: string;
  name: string;
  color: string;
}

export interface ExportOptions {
  size: number;
  format: "png" | "svg";
  includeBackground: boolean;
}

export const DEFAULT_AVATAR_STATE: AvatarState = {
  head: "square",
  eyebrows: "none",
  eyes: "standard",
  nose: "hook",
  mouth: "smile",
  hair: "bald",
  extras: "none",
  accessories: "none",
  hat: "none" as HatId,
  body: "basicWhiteTee",
  skinTone: "light",
  hairColor: "black",
  hatColor: "black",
  accessoryColor: "blue",
  bodyColor: "royal",
  texture: "halftone",
  containHair: false,
};

export const LAYER_ORDER: LayerConfig[] = [
  { category: "hairBack", zIndex: 0, renderBehindFace: true },
  { category: "body", zIndex: 1 },
  { category: "head", zIndex: 2 },
  { category: "extras", zIndex: 3 },
  { category: "eyebrows", zIndex: 4 },
  { category: "eyes", zIndex: 5 },
  { category: "nose", zIndex: 6 },
  { category: "mouth", zIndex: 7 },
  { category: "accessories", zIndex: 8 },
  { category: "hairFront", zIndex: 9 },
  { category: "hats", zIndex: 10 },
];

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "head",
    label: "Head",
    icon: "👤",
    stateKey: "head",
    allowNone: false,
    items: HeadShapes,
    sortedKeys: Object.keys(HeadShapes).sort(),
  },
  {
    id: "eyebrows",
    label: "Brows",
    icon: "🤨",
    stateKey: "eyebrows",
    allowNone: true,
    items: AllEyebrows,
    sortedKeys: Object.keys(Eyebrows).sort(),
  },
  {
    id: "eyes",
    label: "Eyes",
    icon: "👁",
    stateKey: "eyes",
    allowNone: false,
    items: AllEyes,
    sortedKeys: Object.keys(Eyes).sort(),
  },
  {
    id: "nose",
    label: "Nose",
    icon: "👃",
    stateKey: "nose",
    allowNone: true,
    items: Noses,
    sortedKeys: Object.keys(Noses).sort(),
  },
  {
    id: "mouth",
    label: "Mouth",
    icon: "👄",
    stateKey: "mouth",
    allowNone: false,
    items: AllMouths,
    sortedKeys: Object.keys(Mouths).sort(),
  },
  {
    id: "hair",
    label: "Hair",
    icon: "💇",
    stateKey: "hair",
    allowNone: true,
    items: AllHairFront,
    backItems: AllHairBack,
    sortedKeys: Object.keys(HairFront).sort(),
    sortedBackKeys: Object.keys(HairBack).sort(),
  },
  {
    id: "hats",
    label: "Hats",
    icon: "🎩",
    stateKey: "hat",
    allowNone: true,
    items: Hats,
    sortedKeys: Object.keys(Hats).sort(),
  },
  {
    id: "extras",
    label: "Extras",
    icon: "✨",
    stateKey: "extras",
    allowNone: true,
    items: AllExtras,
    sortedKeys: Object.keys(Extras).sort(),
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: "👓",
    stateKey: "accessories",
    allowNone: true,
    items: AllAccessories,
    sortedKeys: Object.keys(Accessories).sort(),
  },
  {
    id: "body",
    label: "Body",
    icon: "👕",
    stateKey: "body",
    allowNone: false,
    items: AllBodies,
    sortedKeys: Object.keys(Bodies).sort(),
  },
  {
    id: "texture",
    label: "Style",
    icon: "🎨",
    stateKey: "texture",
    allowNone: false,
    items: Textures,
    sortedKeys: Object.keys(Textures).sort(),
  },
] as const;

export const SKIN_TONES: SkinTone[] = [
  // Human Tones
  { id: "paper", name: "Paper", color: "#FFFFFF" },
  { id: "porcelain", name: "Porcelain", color: "#FFF5EE" },
  { id: "pale", name: "Pale", color: "#FFDFC4" },
  { id: "fair", name: "Fair", color: "#FFE0BD" },
  { id: "light", name: "Light", color: "#F0D5BE" },
  { id: "warm-beige", name: "Warm Beige", color: "#E8BEAC" },
  { id: "tan", name: "Tan", color: "#D1A384" },
  { id: "olive", name: "Olive", color: "#A57257" },
  { id: "medium", name: "Medium", color: "#C68642" },
  { id: "dark", name: "Dark", color: "#8D5524" },
  { id: "deep", name: "Deep", color: "#55331B" },
  // Creative & Fantasy
  { id: "zombie", name: "Zombie", color: "#7BB661" },
  { id: "alien", name: "Alien", color: "#BEF264" },
  { id: "ghoul", name: "Ghoul", color: "#A3C1AD" },
  { id: "martian", name: "Martian", color: "#EF4444" },
  { id: "crimson", name: "Crimson", color: "#991B1B" },
  { id: "oceanic", name: "Oceanic", color: "#1D4ED8" },
  { id: "azure", name: "Azure", color: "#3B82F6" },
  { id: "sky", name: "Sky", color: "#7DD3FC" },
  { id: "lavender", name: "Lavender", color: "#C084FC" },
  { id: "orchid", name: "Orchid", color: "#A855F7" },
  { id: "candy", name: "Candy", color: "#F472B6" },
  { id: "bubblegum", name: "Bubblegum", color: "#FB7185" },
  { id: "inferno", name: "Inferno", color: "#F97316" },
  { id: "gold", name: "Gold", color: "#FBBF24" },
  { id: "bronze", name: "Bronze", color: "#B45309" },
  { id: "silver", name: "Silver", color: "#CBD5E1" },
  { id: "ghost", name: "Ghost", color: "#F1F5F9" },
];

export const HAIR_COLORS: HairColor[] = [
  { id: "black", name: "Black", color: "#1a1a1a" },
  { id: "darkBrown", name: "Dark Brown", color: "#3b2b23" },
  { id: "brown", name: "Brown", color: "#c5845eff" },
  { id: "lightBrown", name: "Light Brown", color: "#a67c52" },
  { id: "auburn", name: "Auburn", color: "#8b3a2b" },
  { id: "blonde", name: "Blonde", color: "#EAB308" },
  { id: "goldenBlonde", name: "Golden Blonde", color: "#f3d289" },
  { id: "ashBlonde", name: "Ash Blonde", color: "#d6ccc2" },
  { id: "platinumBlonde", name: "Platinum Blonde", color: "#fefcd7" },
  { id: "orange", name: "Orange", color: "#EA580C" },
  { id: "red", name: "Red", color: "#DC2626" },
  { id: "purple", name: "Purple", color: "#8B5CF6" },
  { id: "blue", name: "Blue", color: "#3B82F6" },
  { id: "green", name: "Green", color: "#10B981" },
  { id: "pink", name: "Pink", color: "#EC4899" },
  { id: "khaki", name: "Khaki", color: "#E7DBC4" },
  { id: "royal", name: "Royal Blue", color: "#2563EB" },
  { id: "grey", name: "Grey", color: "#a1a1a1" },
  { id: "white", name: "White", color: "#E5E7EB" },
  { id: "lilac", name: "Lilac", color: "#E9D5FF" },
] as const;

export const ACCESSORY_ACCENT_COLORS: HairColor[] = [
  { id: "fire", name: "Fire Reflective", color: "#EF4444" },
  { id: "electric", name: "Electric Blue", color: "#3B82F6" },
  { id: "emerald", name: "Emerald Mirror", color: "#10B981" },
  { id: "nebula", name: "Nebula Purple", color: "#8B5CF6" },
  { id: "solar", name: "Solar Orange", color: "#F59E0B" },
  { id: "chrome", name: "Chrome Silver", color: "#94A3B8" },
  { id: "obsidian", name: "Obsidian Black", color: "#1A1A1A" },
];
