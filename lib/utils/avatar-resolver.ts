import {
  AvatarState,
  SKIN_TONES,
  HAIR_COLORS,
  ACCESSORY_ACCENT_COLORS,
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
} from "../avatar/types";
import { HeadShapes, Noses, Hats, getHatClippingY } from "../avatar/parts";
import {
  FULL_COVERAGE_HAIR,
  DEFAULT_SKIN_TONE,
  DEFAULT_HAIR_COLOR,
  DEFAULT_HAT_COLOR,
  DEFAULT_ACCESSORY_COLOR,
  DEFAULT_BODY_COLOR,
} from "../avatar/config/constants";
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

  const stringKeys: (keyof AvatarState)[] = CATEGORIES.map((category) => category.stateKey);

  stringKeys.forEach((key) => {
    // @ts-expect-error - dynamic assignment
    const paramValue = params[key === "hat" ? "hat" : key];
    if (typeof paramValue === "string") {
      // @ts-expect-error - dynamic assignment
      overrides[key] = paramValue;
    }
  });

  if (params.skin_tone) overrides.skinTone = params.skin_tone;
  if (params.hair_color) overrides.hairColor = params.hair_color;
  if (params.hat_color) overrides.hatColor = params.hat_color;
  if (params.accessory_color) overrides.accessoryColor = params.accessory_color;
  if (params.body_color) overrides.bodyColor = params.body_color;
  if (params.contain_hair !== undefined && params.contain_hair !== null) overrides.containHair = params.contain_hair;

  return { ...state, ...overrides };
}

export function resolveAvatarColors(state: AvatarState) {
  const skinTone =
    SKIN_TONES.find((tone) => tone.id === (state.skinTone || DEFAULT_SKIN_TONE))?.color ||
    (state.skinTone && state.skinTone.startsWith("#") ? state.skinTone : SKIN_TONES[0].color);

  const hairColor =
    HAIR_COLORS.find((accent) => accent.id === (state.hairColor || DEFAULT_HAIR_COLOR))?.color ||
    (state.hairColor && state.hairColor.startsWith("#") ? state.hairColor : HAIR_COLORS[0].color);

  const hatColor =
    HAIR_COLORS.find((accent) => accent.id === (state.hatColor || DEFAULT_HAT_COLOR))?.color ||
    (state.hatColor && state.hatColor.startsWith("#") ? state.hatColor : HAIR_COLORS[0].color);

  const accessoryColor =
    ACCESSORY_ACCENT_COLORS.find((accessory) => accessory.id === (state.accessoryColor || DEFAULT_ACCESSORY_COLOR))?.color ||
    (state.accessoryColor && state.accessoryColor.startsWith("#") ? state.accessoryColor : ACCESSORY_ACCENT_COLORS[0].color);

  const bodyColor =
    HAIR_COLORS.find((accent) => accent.id === (state.bodyColor || DEFAULT_BODY_COLOR))?.color ||
    (state.bodyColor && state.bodyColor.startsWith("#") ? state.bodyColor : HAIR_COLORS[0].color);

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
    HeadShape: HeadShapes[state.head] || Object.values(HeadShapes)[0],
    EyebrowSet: AllEyebrows[state.eyebrows as keyof typeof AllEyebrows] || (() => null),
    EyeSet: AllEyes[state.eyes as keyof typeof AllEyes] || Object.values(AllEyes)[0],
    NoseSet: Noses[state.nose] || (() => null),
    MouthSet: AllMouths[state.mouth as keyof typeof AllMouths] || Object.values(AllMouths)[0],
    ExtraSet: AllExtras[state.extras as keyof typeof AllExtras] || (() => null),
    HairBackSet: AllHairBack[state.hair as keyof typeof AllHairBack] || (() => null),
    HairFrontSet: AllHairFront[state.hair as keyof typeof AllHairFront] || (() => null),
    AccessorySet: AllAccessories[state.accessories as keyof typeof AllAccessories] || (() => null),
    HatSet: Hats[state.hat] || (() => null),
    BodySet: AllBodies[state.body as keyof typeof AllBodies] || Object.values(AllBodies)[0],
  };
}

export function resolveAvatarLogic(state: AvatarState) {
  const hatClippingY = getHatClippingY(state.hat, state.head);
  const isFullHair = FULL_COVERAGE_HAIR.includes(state.hair);

  const shouldClipHead = hatClippingY !== null || isFullHair;
  const clippingY = hatClippingY ?? (isFullHair ? 22 : 0);

  const isSkiMask = state.hat === "skiMask";

  return { shouldClipHead, clippingY, isSkiMask };
}
