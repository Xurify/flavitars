import { getHairSpec } from "./hair";

/** Editable path layers of a hairstyle spec (see `HairSpec`). */
export type HairLayer = "cap" | "front" | "back";

export const HAIR_LAYER_LABELS: Record<HairLayer, string> = {
  cap: "Hairline",
  front: "Volume",
  back: "Back",
};

export function getHairPathData(hairId: string, layer: HairLayer): string {
  return getHairSpec(hairId)?.[layer] ?? "";
}
