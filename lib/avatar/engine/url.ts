import { AvatarState } from "../types";
import { avatarSearchParams, AvatarStateParams } from "../config/params";
import { createSerializer } from "nuqs/server";
import { getAvatarIdFromState } from "./avatar-generator";

const serialize = createSerializer(avatarSearchParams);

/**
 * Absolute URL that returns this avatar as SVG. Uses the short form `/{id}.svg`, which `next.config.ts`
 * rewrites to `/api/avatar/:id`. Preset-only URLs still use `/api/avatar?preset=…` (no short alias).
 */
export function buildAvatarSvgApiUrl(
  origin: string,
  avatarState: AvatarState,
  params: Partial<AvatarStateParams> & Record<string, string | boolean | null | undefined>,
): string {
  const hasPreset = !!params.preset;
  const hasId = params.id !== null && params.id !== undefined;
  const otherParamsCount = Object.entries(params).filter(
    ([key, value]) => key !== "preset" && key !== "id" && value !== null && value !== undefined,
  ).length;

  if (hasPreset && !hasId && otherParamsCount === 0) {
    return `${origin}/api/avatar?${new URLSearchParams({ preset: params.preset as string }).toString()}`;
  }
  if (hasId && !hasPreset && otherParamsCount === 0) {
    return `${origin}/${encodeURIComponent(params.id as string)}.svg`;
  }

  const avatarId = getAvatarIdFromState(avatarState);
  return `${origin}/${encodeURIComponent(avatarId)}.svg`;
}

/**
 * Generates a shareable URL with the current avatar state encoded as query parameters.
 */
export function generateShareableURL(state: Partial<AvatarState>): string {
  const url = new URL(typeof window !== "undefined" ? window.location.origin : "");

  const params: Partial<AvatarStateParams> = {
    head: state.head,
    eyebrows: state.eyebrows,
    eyes: state.eyes,
    nose: state.nose,
    mouth: state.mouth,
    hair: state.hair,
    extras: state.extras,
    accessories: state.accessories,
    hat: state.hat,
    body: state.body,
    skin_tone: state.skinTone,
    hair_color: state.hairColor,
    hat_color: state.hatColor,
    accessory_color: state.accessoryColor,
    body_color: state.bodyColor,
    texture: state.texture,
    contain_hair: state.containHair,
  };

  return url.origin + serialize(params);
}
