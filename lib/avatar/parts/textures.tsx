import { PartRegistry, PartComponent } from "./common";

export const TextureId = ["none", "noise", "glitch", "halftone"] as const;
export type TextureId = (typeof TextureId)[number];

const noneTexture: PartComponent = () => null;
const noiseTexture: PartComponent = () => null;
const glitchTexture: PartComponent = () => null;
const halftoneTexture: PartComponent = () => null;

export const Textures: PartRegistry<TextureId> = {
  none: { component: noneTexture, label: "None" },
  noise: { component: noiseTexture, label: "Noise" },
  glitch: { component: glitchTexture, label: "Glitch" },
  halftone: { component: halftoneTexture, label: "Halftone" },
};
