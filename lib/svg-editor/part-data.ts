/**
 * Universal Part Path Data Extraction
 * Provides a unified interface for extracting editable path data from any avatar part.
 */

import { AvatarState, DEFAULT_AVATAR_STATE } from "@/lib/avatar/types";
import { HairId } from "@/lib/avatar/parts/hair";
import { HatId, HAT_CLIP_ZONES } from "@/lib/avatar/parts/hats";

export type PartCategory =
  | "hair"
  | "hat"
  | "head"
  | "eyes"
  | "eyebrows"
  | "nose"
  | "mouth"
  | "body"
  | "accessories"
  | "extras";

export type PartLayer = "front" | "back";

export interface SelectedPart {
  category: PartCategory;
  id: string;
  layer?: PartLayer;
}

export interface PartPathInfo {
  pathData: string | null;
  hasMultipleLayers: boolean;
  availableLayers: PartLayer[];
  isEditable: boolean;
  exportName: string;
}

/**
 * Parses URL search params into an AvatarState object.
 * Falls back to defaults for missing params.
 */
export function parseAvatarStateFromParams(
  searchParams: URLSearchParams
): AvatarState {
  return {
    head: (searchParams.get("head") || DEFAULT_AVATAR_STATE.head) as AvatarState["head"],
    eyebrows: (searchParams.get("eyebrows") || DEFAULT_AVATAR_STATE.eyebrows) as AvatarState["eyebrows"],
    eyes: (searchParams.get("eyes") || DEFAULT_AVATAR_STATE.eyes) as AvatarState["eyes"],
    nose: (searchParams.get("nose") || DEFAULT_AVATAR_STATE.nose) as AvatarState["nose"],
    mouth: (searchParams.get("mouth") || DEFAULT_AVATAR_STATE.mouth) as AvatarState["mouth"],
    hair: (searchParams.get("hair") || DEFAULT_AVATAR_STATE.hair) as AvatarState["hair"],
    extras: (searchParams.get("extras") || DEFAULT_AVATAR_STATE.extras) as AvatarState["extras"],
    accessories: (searchParams.get("accessories") || DEFAULT_AVATAR_STATE.accessories) as AvatarState["accessories"],
    hat: (searchParams.get("hat") || DEFAULT_AVATAR_STATE.hat) as AvatarState["hat"],
    body: (searchParams.get("body") || DEFAULT_AVATAR_STATE.body) as AvatarState["body"],
    skinTone: searchParams.get("skin_tone") || DEFAULT_AVATAR_STATE.skinTone,
    hairColor: searchParams.get("hair_color") || DEFAULT_AVATAR_STATE.hairColor,
    hatColor: searchParams.get("hat_color") || DEFAULT_AVATAR_STATE.hatColor,
    accessoryColor: searchParams.get("accessory_color") || DEFAULT_AVATAR_STATE.accessoryColor,
    bodyColor: searchParams.get("body_color") || DEFAULT_AVATAR_STATE.bodyColor,
    texture: (searchParams.get("texture") || DEFAULT_AVATAR_STATE.texture) as AvatarState["texture"],
    containHair: searchParams.get("contain_hair") === "true" || DEFAULT_AVATAR_STATE.containHair,
  };
}

/**
 * Gets the clip path for a hat (used for hair clipping).
 */
export function getHatClipPath(hatId: HatId): string | null {
  if (!hatId || hatId === "none") return null;
  const zone = HAT_CLIP_ZONES[hatId];
  return zone?.clipPath || null;
}

/**
 * Determines if a part category supports multiple layers.
 */
export function getPartLayers(category: PartCategory): PartLayer[] {
  switch (category) {
    case "hair":
      return ["front", "back"];
    default:
      return [];
  }
}

/**
 * Determines if a part is editable (has extractable path data).
 * Complex parts with multiple paths may be view-only.
 */
export function isPartEditable(
  category: PartCategory,
  partId: string
): boolean {
  switch (category) {
    case "hair":
      return true;
    case "hat":
      return !!getHatClipPath(partId as HatId);
    default:
      return false;
  }
}

/**
 * Generates the export name for a part.
 */
export function getPartExportName(
  category: PartCategory,
  partId: string,
  layer?: PartLayer
): string {
  const layerSuffix = layer
    ? layer.charAt(0).toUpperCase() + layer.slice(1)
    : "";

  switch (category) {
    case "hair":
      return `${partId}${layerSuffix}`;
    case "hat":
      return `${partId}.clipPath`;
    default:
      return partId;
  }
}

/**
 * Gets comprehensive path info for a selected part.
 */
export function getPartPathInfo(
  category: PartCategory,
  partId: string,
  layer?: PartLayer
): PartPathInfo {
  const availableLayers = getPartLayers(category);
  const hasMultipleLayers = availableLayers.length > 1;
  const isEditable = isPartEditable(category, partId);
  const exportName = getPartExportName(category, partId, layer);

  let pathData: string | null = null;

  if (isEditable && category === "hat") {
    pathData = getHatClipPath(partId as HatId);
  }

  return {
    pathData,
    hasMultipleLayers,
    availableLayers,
    isEditable,
    exportName,
  };
}

/**
 * Human-readable display names for part categories.
 */
export const CATEGORY_DISPLAY_NAMES: Record<PartCategory, string> = {
  hair: "Hairstyle",
  hat: "Hat",
  head: "Head",
  eyes: "Eyes",
  eyebrows: "Eyebrows",
  nose: "Nose",
  mouth: "Mouth",
  body: "Outfit",
  accessories: "Accessories",
  extras: "Extras",
};

/**
 * Maps AvatarState keys to PartCategory.
 */
export const STATE_KEY_TO_CATEGORY: Record<string, PartCategory> = {
  hair: "hair",
  hat: "hat",
  head: "head",
  eyes: "eyes",
  eyebrows: "eyebrows",
  nose: "nose",
  mouth: "mouth",
  body: "body",
  accessories: "accessories",
  extras: "extras",
};

/**
 * Order in which categories should be displayed in the sidebar.
 */
export const CATEGORY_ORDER: PartCategory[] = [
  "hair",
  "hat",
  "head",
  "eyes",
  "eyebrows",
  "nose",
  "mouth",
  "body",
  "accessories",
  "extras",
];
