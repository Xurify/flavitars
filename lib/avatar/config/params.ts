import { parseAsString, parseAsBoolean, parseAsInteger, createLoader, createSerializer } from "nuqs/server";
import type { inferParserType } from "nuqs";

export const avatarSearchParams = {
  // Deterministic ID (seed)
  id: parseAsString,

  // Predefined Presets (e.g., ?preset=michael-jackson)
  preset: parseAsString.withDefault(""),

  // Individual parts
  head: parseAsString,
  eyebrows: parseAsString,
  eyes: parseAsString,
  nose: parseAsString,
  mouth: parseAsString,
  hair: parseAsString,
  extras: parseAsString,
  accessories: parseAsString,
  hat: parseAsString,
  body: parseAsString,
  skin_tone: parseAsString,
  hair_color: parseAsString,
  hat_color: parseAsString,
  accessory_color: parseAsString,
  body_color: parseAsString,
  texture: parseAsString,
  contain_hair: parseAsBoolean,
};

export type AvatarSearchParams = typeof avatarSearchParams;
export type AvatarStateParams = inferParserType<AvatarSearchParams>;

export const loadAvatarState = createLoader(avatarSearchParams);
export const serializeAvatarState = createSerializer(avatarSearchParams);
