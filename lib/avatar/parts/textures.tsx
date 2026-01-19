import { PartRegistry, PartComponent, AvatarItem, createAvatarItem } from "./common";

export const TextureId = ["none", "noise", "glitch", "halftone"] as const;
export type TextureId = (typeof TextureId)[number];

const noneTexture: PartComponent = () => null;
const noiseTexture: PartComponent = () => null;
const glitchTexture: PartComponent = () => null;
const halftoneTexture: PartComponent = () => null;

export const TextureItems: AvatarItem[] = [
  createAvatarItem({ id: "none", name: "None", svg: noneTexture }),
  createAvatarItem({ id: "noise", name: "Noise", svg: noiseTexture }),
  createAvatarItem({ id: "glitch", name: "Glitch", svg: glitchTexture }),
  createAvatarItem({ id: "halftone", name: "Halftone", svg: halftoneTexture }),
];

export const Textures: PartRegistry<TextureId> = Object.fromEntries(
  TextureItems.map((item) => [item.id, { component: item.svg, label: item.name }])
) as PartRegistry<TextureId>;
