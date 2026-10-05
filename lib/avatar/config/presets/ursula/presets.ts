import { PresetAvatarState } from "../../../types";

export const URSULA_PRESETS: Record<
  "ursula",
  Partial<PresetAvatarState> & { name: string; description?: string }
> = {
  "ursula": {
    name: "Ursula von der Leyen",
    description: "President of the European Commission, with her signature swept blonde bob, red blazer, white collar and pearls.",
    head: "slender",
    eyes: "ursulaEyes",
    eyebrows: "ursulaEyebrows",
    nose: "refinedButton",
    mouth: "ursulaSmile",
    hair: "ursulaCoiffure",
    skinTone: "pale",
    hairColor: "#E2C27E",
    body: "ursulaRedBlazer",
    bodyColor: "red",
    extras: "ursulaCheeks",
    accessories: "none",
    texture: "halftone",
  },
};
