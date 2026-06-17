import { PresetAvatarState } from "../../../types";

export const URSULA_PRESETS: Record<
  "ursula",
  Partial<PresetAvatarState> & { name: string; description?: string }
> = {
  "ursula": {
    name: "Ursula von der Leyen",
    description: "President of the European Commission, with her signature short swept-back blonde hair, red blazer, and white collared shirt.",
    head: "rounded",
    eyes: "ursulaEyes",
    eyebrows: "ursulaEyebrows",
    nose: "refinedButton",
    mouth: "ursulaSmile",
    hair: "ursulaCoiffure",
    skinTone: "porcelain",
    hairColor: "goldenBlonde",
    body: "ursulaRedBlazer",
    bodyColor: "red",
    extras: "ursulaCheeks",
    accessories: "ursulaPearlEarrings",
    texture: "halftone",
  },
};
