import { PresetAvatarState } from "../../../types";

export const URSULA_PRESETS: Record<
  "ursula",
  Partial<PresetAvatarState> & { name: string; description?: string }
> = {
  "ursula": {
    name: "Ursula von der Leyen",
    description: "President of the European Commission, with her signature short swept-back blonde hair, red blazer, white collar and pearls.",
    head: "rounded",
    eyes: "ursulaEyes",
    eyebrows: "ursulaEyebrows",
    nose: "ursulaNose",
    mouth: "ursulaSmile",
    hair: "ursulaCoiffure",
    skinTone: "fair",
    hairColor: "#F3CB66",
    body: "ursulaRedBlazer",
    bodyColor: "red",
    extras: "ursulaCheeks",
    accessories: "ursulaPearlEarrings",
    texture: "halftone",
  },
};
