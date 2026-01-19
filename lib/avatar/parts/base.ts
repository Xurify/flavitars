import React from "react";
// We use string here to avoid circular dependencies with part files defining these IDs
// The actual IDs are still checked by TypeScript in the implementation files.

export interface PartProps {
  fill?: string;
  secondaryFill?: string;
  accessoryColorId?: string;
  headId: string;
  hatId?: string;
  hairId?: string;
  skinTone?: string;
}

export interface PartComponent<P = any> extends React.FC<PartProps & P> {
  colors?: string[];
}

export interface PartDefinition<P = any> {
  component: PartComponent<P>;
  label: string;
  isExclusive?: boolean;
  presetOnly?: boolean;
  tags?: string[];
  incompatibleWith?: string[];
  requiresParts?: string[];
}

export type PartRegistry<Id extends string, P = any> = Record<Id, PartDefinition<P>>;

export interface AvatarItemConfig {
  clippingY?: number;
  scale?: number;
  zIndex?: number;
}

export interface AvatarItem<P = any> {
  id: string;
  name: string;
  tags?: string[];
  config?: AvatarItemConfig;
  svg: React.FC<PartProps & P>;
  backSvg?: React.FC<PartProps & P>;
}

export const createAvatarItem = <P>(item: AvatarItem<P>) => item;
