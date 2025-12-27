import { PartComponent } from "./common";

export const TextureId = ["none", "noise", "glitch", "halftone"] as const;
export type TextureId = (typeof TextureId)[number];

export const Textures: Record<TextureId, PartComponent> = {
  none: () => null,
  noise: () => null,
  glitch: () => null,
  halftone: () => null,
};
