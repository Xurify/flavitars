import {
  AvatarState,
  DEFAULT_AVATAR_STATE,
  CATEGORIES,
  AllEyebrows,
  AllEyes,
  AllMouths,
  AllExtras,
  AllHairBack,
  AllHairFront,
  AllAccessories,
  AllBodies,
  AllNoses,
} from "../avatar/types";
import { HeadShapes, Hats, getHatFit, getHairSpec, EAR_ACCESSORIES } from "../avatar/parts";
import { getHairPeak, getHairTop, HairSpec } from "../avatar/parts/hair-engine";
import { getSeatKeepPath } from "../avatar/anatomy";
import { FABRIC_PALETTE, HAIR_PALETTE, LENS_PALETTE, SKIN_PALETTE, resolveColor } from "../avatar/colors";
import { AvatarStateParams } from "../avatar/config/params";
import { AVATAR_PRESETS } from "../avatar/config/presets/presets";
import { getAvatarStateFromId } from "../avatar/engine/avatar-generator";

export function resolveAvatarStateFromParams(params: Partial<AvatarStateParams>): AvatarState {
  let state: AvatarState = { ...DEFAULT_AVATAR_STATE };

  if (params.preset) {
    const presetData = AVATAR_PRESETS[params.preset as keyof typeof AVATAR_PRESETS];
    if (presetData) {
      state = { ...state, ...(presetData as Partial<AvatarState>) };
    }
  }

  if (params.id) {
    state = { ...state, ...getAvatarStateFromId(params.id) };
  }

  const overrides: Partial<AvatarState> = {};

  const categoryKeys: (keyof AvatarState)[] = CATEGORIES.map((category) => category.stateKey);

  categoryKeys.forEach((key) => {
    const paramValue = params[key as keyof AvatarStateParams];
    if (typeof paramValue === "string") {
      (overrides as Record<string, AvatarState[keyof AvatarState]>)[key] = paramValue;
    }
  });

  if (params.texture) overrides.texture = params.texture as AvatarState["texture"];
  if (params.skin_tone) overrides.skinTone = params.skin_tone;
  if (params.hair_color) overrides.hairColor = params.hair_color;
  if (params.hat_color) overrides.hatColor = params.hat_color;
  if (params.accessory_color) overrides.accessoryColor = params.accessory_color;
  if (params.body_color) overrides.bodyColor = params.body_color;
  if (params.contain_hair !== undefined && params.contain_hair !== null) overrides.containHair = params.contain_hair;

  return { ...state, ...overrides };
}

export function resolveAvatarColors(state: AvatarState) {
  const skinTone = resolveColor(SKIN_PALETTE, state.skinTone);
  const hairColor = resolveColor(HAIR_PALETTE, state.hairColor);
  const hatColor = resolveColor(FABRIC_PALETTE, state.hatColor);
  const accessoryColor = resolveColor(LENS_PALETTE, state.accessoryColor);
  const bodyColor = resolveColor(FABRIC_PALETTE, state.bodyColor);

  const isDarkSkin = () => {
    const hex = skinTone.replace("#", "");
    if (hex.length !== 6) return ["#8D5524", "#55331B", "#991B1B", "#1D4ED8"].includes(skinTone);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 50;
  };

  const facialFeaturesColor = isDarkSkin() ? "white" : "currentColor";

  return { skinTone, hairColor, hatColor, accessoryColor, bodyColor, facialFeaturesColor };
}

export function resolveAvatarParts(state: AvatarState) {
  return {
    HeadShape: HeadShapes[state.head]?.component || Object.values(HeadShapes)[0].component,
    EyebrowSet: AllEyebrows[state.eyebrows as keyof typeof AllEyebrows]?.component || (() => null),
    EyeSet: AllEyes[state.eyes as keyof typeof AllEyes]?.component || Object.values(AllEyes)[0].component,
    NoseSet: AllNoses[state.nose as keyof typeof AllNoses]?.component || (() => null),
    MouthSet: AllMouths[state.mouth as keyof typeof AllMouths]?.component || Object.values(AllMouths)[0].component,
    ExtraSet: AllExtras[state.extras as keyof typeof AllExtras]?.component || (() => null),
    HairBackSet: AllHairBack[state.hair as keyof typeof AllHairBack]?.component || (() => null),
    HairFrontSet: AllHairFront[state.hair as keyof typeof AllHairFront]?.component || (() => null),
    AccessorySet: AllAccessories[state.accessories as keyof typeof AllAccessories]?.component || (() => null),
    HatSet: Hats[state.hat]?.component || (() => null),
    BodySet: AllBodies[state.body as keyof typeof AllBodies]?.component || Object.values(AllBodies)[0].component,
  };
}

/**
 * How hat, hair and head interact for this avatar: what gets clipped, what is hidden, and
 * where hats that rest on the hair should sit.
 */
export function resolveAvatarFit(state: AvatarState, hairSpecOverride?: HairSpec) {
  const fit = getHatFit(state.hat);
  const hairSpec = hairSpecOverride ?? getHairSpec(state.hair);
  const hairTop = getHairTop(hairSpec, state.head);
  const hairPeak = getHairPeak(hairSpec, state.head);
  const isMask = fit.kind === "mask";

  let keep: string | undefined;
  if (fit.kind === "seat") keep = getSeatKeepPath(fit.seat);
  if (fit.kind === "helmet") keep = fit.keep;

  return {
    keep,
    clipHead: fit.kind === "seat",
    showHair: !isMask,
    showEars: !isMask,
    showAccessories: !(isMask && EAR_ACCESSORIES.has(state.accessories)),
    /** Glasses, goggles and headphones are worn over a mask rather than under it. */
    accessoriesOverHat: isMask,
    hairTop,
    hairPeak,
  };
}
