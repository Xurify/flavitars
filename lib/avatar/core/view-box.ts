import type { AvatarState } from "../types";

export const AVATAR_VIEWBOX = "0 0 100 100";

export function getAvatarViewBox(_state?: Pick<AvatarState, "hat" | "hair">): string {
  return AVATAR_VIEWBOX;
}
