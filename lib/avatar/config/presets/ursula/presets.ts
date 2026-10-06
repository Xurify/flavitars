import { PresetAvatarState } from "../../../types";

export const URSULA_PRESETS: Record<
  "ursula",
  Partial<PresetAvatarState> & { name: string; description?: string }
> = {
  "ursula": {
    name: "Ursula von der Leyen",
    description: "President of the European Commission, with her signature short swept-back blonde hair, red blazer, white collar and pearls.",
    head: "ursulaHead",
    eyes: "ursulaEyes",
    eyebrows: "ursulaEyebrows",
    nose: "ursulaNose",
    mouth: "ursulaSmile",
    hair: "ursulaCoiffure",
    skinTone: "#F0C8B0",
    hairColor: "#F0C069",
    body: "ursulaRedBlazer",
    bodyColor: "red",
    extras: "ursulaCheeks",
    accessories: "ursulaPearlEarrings",
    texture: "none",
  },
};
