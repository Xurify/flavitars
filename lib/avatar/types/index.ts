import React from "react";
import { FABRIC_PALETTE, HAIR_PALETTE, LENS_PALETTE, SKIN_PALETTE, paletteSwatches } from "../colors";

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
  PartDefinition,
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
  HatIds,
  HeadId,
  HairId,
  HairIds,
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
  HeadIds,
} from "../parts";

import {
  MarikaHeads,
  MarikaHeadIds,
  MarikaHairBack,
  MarikaHairFront,
  MarikaEyes,
  MarikaEyebrows,
  MarikaMouths,
  MarikaNoses,
  MarikaNoseIds,
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

import {
  UrsulaHeads,
  UrsulaHeadIds,
  UrsulaHairBack,
  UrsulaHairFront,
  UrsulaEyes,
  UrsulaEyebrows,
  UrsulaMouths,
  UrsulaNoses,
  UrsulaNoseIds,
  UrsulaBodies,
  UrsulaAccessories,
  UrsulaExtras,
  UrsulaHairIds,
  UrsulaEyesIds,
  UrsulaEyebrowsIds,
  UrsulaMouthIds,
  UrsulaBodyIds,
  UrsulaAccessoryIds,
  UrsulaExtrasIds,
} from "../config/presets/ursula";

import {
  DrewBodies,
  DrewBodyIds,
  DrewEyebrows,
  DrewEyebrowsIds,
  DrewEyes,
  DrewEyesIds,
  DrewExtras,
  DrewExtrasIds,
  DrewHairBack,
  DrewHairFront,
  DrewHairIds,
  DrewMouthIds,
  DrewMouths,
} from "../config/presets/drew";

import {
  PrvyEyes,
  PrvyEyesIds,
  PrvyExtras,
  PrvyExtrasIds,
  PrvyMouths,
  PrvyMouthIds,
  PrvyNoses,
  PrvyNoseIds,
} from "../config/presets/prvy";

export const AllHeadShapes = { ...HeadShapes, ...MarikaHeads, ...UrsulaHeads };
export const AllNoses = { ...Noses, ...MarikaNoses, ...PrvyNoses, ...UrsulaNoses };
export const AllHairFront = { ...HairFront, ...MarikaHairFront, ...UrsulaHairFront, ...DrewHairFront };
export const AllHairBack = { ...HairBack, ...MarikaHairBack, ...UrsulaHairBack, ...DrewHairBack };
export const AllEyes = { ...Eyes, ...MarikaEyes, ...UrsulaEyes, ...PrvyEyes, ...DrewEyes };
export const AllEyebrows = { ...Eyebrows, ...MarikaEyebrows, ...UrsulaEyebrows, ...DrewEyebrows };
export const AllMouths = { ...Mouths, ...MarikaMouths, ...UrsulaMouths, ...PrvyMouths, ...DrewMouths };
export const AllBodies = { ...Bodies, ...MarikaBodies, ...UrsulaBodies, ...DrewBodies };
export const AllAccessories = { ...Accessories, ...MarikaAccessories, ...UrsulaAccessories };
export const AllExtras = { ...Extras, ...MarikaExtras, ...UrsulaExtras, ...PrvyExtras, ...DrewExtras };

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

export type AllHairId = HairId | (typeof MarikaHairIds)[number] | (typeof UrsulaHairIds)[number] | (typeof DrewHairIds)[number];
export type AllEyesId =
  | EyesId
  | (typeof MarikaEyesIds)[number]
  | (typeof UrsulaEyesIds)[number]
  | (typeof PrvyEyesIds)[number]
  | (typeof DrewEyesIds)[number];
export type AllEyebrowsId =
  | EyebrowsId
  | (typeof MarikaEyebrowsIds)[number]
  | (typeof UrsulaEyebrowsIds)[number]
  | (typeof DrewEyebrowsIds)[number];
export type AllMouthId =
  | MouthId
  | (typeof MarikaMouthIds)[number]
  | (typeof UrsulaMouthIds)[number]
  | (typeof PrvyMouthIds)[number]
  | (typeof DrewMouthIds)[number];
export type AllBodyId = BodyId | (typeof MarikaBodyIds)[number] | (typeof UrsulaBodyIds)[number] | (typeof DrewBodyIds)[number];
export type AllAccessoryId = AccessoryId | (typeof MarikaAccessoryIds)[number] | (typeof UrsulaAccessoryIds)[number];
export type AllExtrasId =
  | ExtrasId
  | (typeof MarikaExtrasIds)[number]
  | (typeof UrsulaExtrasIds)[number]
  | (typeof PrvyExtrasIds)[number]
  | (typeof DrewExtrasIds)[number];
export type AllHeadId = HeadId | (typeof MarikaHeadIds)[number] | (typeof UrsulaHeadIds)[number];
export type AllNoseId =
  | NoseId
  | (typeof MarikaNoseIds)[number]
  | (typeof PrvyNoseIds)[number]
  | (typeof UrsulaNoseIds)[number];

export interface PresetAvatarState {
  head: AllHeadId;
  eyebrows: AllEyebrowsId;
  eyes: AllEyesId;
  nose: AllNoseId;
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
  items: Record<string, PartDefinition>;
  backItems?: Record<string, PartDefinition>;
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
  accessoryColor: "electric",
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
    items: AllHeadShapes,
    sortedKeys: [...HeadIds],
  },
  {
    id: "eyebrows",
    label: "Brows",
    icon: "🤨",
    stateKey: "eyebrows",
    allowNone: true,
    items: AllEyebrows,
    sortedKeys: [...EyebrowsId],
  },
  {
    id: "eyes",
    label: "Eyes",
    icon: "👁",
    stateKey: "eyes",
    allowNone: false,
    items: AllEyes,
    sortedKeys: [...EyesId],
  },
  {
    id: "nose",
    label: "Nose",
    icon: "👃",
    stateKey: "nose",
    allowNone: true,
    items: Noses,
    sortedKeys: [...NoseId],
  },
  {
    id: "mouth",
    label: "Mouth",
    icon: "👄",
    stateKey: "mouth",
    allowNone: false,
    items: AllMouths,
    sortedKeys: [...MouthId],
  },
  {
    id: "hair",
    label: "Hair",
    icon: "💇",
    stateKey: "hair",
    allowNone: true,
    items: AllHairFront,
    backItems: AllHairBack,
    sortedKeys: [...HairIds],
    sortedBackKeys: [...HairIds],
  },
  {
    id: "hats",
    label: "Hats",
    icon: "🎩",
    stateKey: "hat",
    allowNone: true,
    items: Hats,
    sortedKeys: [...HatIds],
  },
  {
    id: "extras",
    label: "Details",
    icon: "✨",
    stateKey: "extras",
    allowNone: true,
    items: AllExtras,
    sortedKeys: [...ExtrasId],
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: "👓",
    stateKey: "accessories",
    allowNone: true,
    items: AllAccessories,
    sortedKeys: [...AccessoryId],
  },
  {
    id: "body",
    label: "Body",
    icon: "👕",
    stateKey: "body",
    allowNone: false,
    items: AllBodies,
    sortedKeys: [...BodyId],
  },
  {
    id: "texture",
    label: "Texture",
    icon: "🎨",
    stateKey: "texture",
    allowNone: false,
    items: Textures,
    sortedKeys: [...TextureId],
  },
] as const;

export const SKIN_TONES: SkinTone[] = paletteSwatches(SKIN_PALETTE);
export const HAIR_COLORS: HairColor[] = paletteSwatches(HAIR_PALETTE);
export const FABRIC_COLORS: HairColor[] = paletteSwatches(FABRIC_PALETTE);
export const ACCESSORY_ACCENT_COLORS: HairColor[] = paletteSwatches(LENS_PALETTE);
