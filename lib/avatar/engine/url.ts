import { AvatarState } from "../types";
import { avatarSearchParams, AvatarStateParams } from "../config/params";
import { createSerializer } from "nuqs/server";

const serialize = createSerializer(avatarSearchParams);

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
