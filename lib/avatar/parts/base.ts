import React from "react";
import { HatId } from "./hats";
import { HeadId } from "./head";
import { HairId } from "./hair";
import type { TextureId } from "./textures";
// We use string here to avoid circular dependencies with part files defining these IDs
// The actual IDs are still checked by TypeScript in the implementation files.

export interface PartProps {
  fill?: string;
  secondaryFill?: string;
  accessoryColorId?: string;
  headId: HeadId;
  hatId?: HatId;
  hairId?: HairId;
  skinTone?: string;
  texture?: TextureId;
  /** Unique per rendered avatar; prefixes ids a part defines (clip paths, gradients). */
  uid?: string;
  /** Top of the hair silhouette (or head when bald); used by hats that rest on the hair. */
  hairTop?: number;
  /** Highest point of the hair including buns and spikes; floating items clear it. */
  hairPeak?: number;
  /** Region of head and hair left visible by a worn hat; parts outside it are cut away. */
  keep?: string;
}

export interface PartComponent<P = object> extends React.FC<PartProps & P> {
  colors?: string[];
}

export interface PartDefinition<P = object> {
  component: PartComponent<P>;
  label: string;
  isExclusive?: boolean;
  presetOnly?: boolean;
  /** Takes the user's colour for its category (hat colour, lens colour). */
  colorable?: boolean;
  tags?: string[];
  incompatibleWith?: string[];
  requiresParts?: string[];
}

export type PartRegistry<Id extends string, P = object> = Record<Id, PartDefinition<P>>;

export interface AvatarItemConfig {
  clippingY?: number;
  scale?: number;
  zIndex?: number;
}

export interface AvatarItem<P = object> {
  id: string;
  name: string;
  tags?: string[];
  config?: AvatarItemConfig;
  svg: React.FC<PartProps & P>;
  backSvg?: React.FC<PartProps & P>;
}

export const createAvatarItem = <P>(item: AvatarItem<P>) => item;
