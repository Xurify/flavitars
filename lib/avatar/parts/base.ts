import React from "react";
import { HatId } from "./hats";
import { HeadId } from "./head";
import { HairId } from "./hair";
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
}

export interface PartComponent<P> extends React.FC<PartProps & P> {
  colors?: string[];
}

export interface PartDefinition<P> {
  component: PartComponent<P>;
  label: string;
  isExclusive?: boolean;
  presetOnly?: boolean;
  tags?: string[];
  incompatibleWith?: string[];
  requiresParts?: string[];
}

export type PartRegistry<Id extends string, P> = Record<Id, PartDefinition<P>>;

export interface AvatarItemConfig {
  clippingY?: number;
  scale?: number;
  zIndex?: number;
}

export interface AvatarItem<P> {
  id: string;
  name: string;
  tags?: string[];
  config?: AvatarItemConfig;
  svg: React.FC<PartProps & P>;
  backSvg?: React.FC<PartProps & P>;
}

export const createAvatarItem = <P>(item: AvatarItem<P>) => item;
