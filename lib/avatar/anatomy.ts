/**
 * Shared head geometry. Every part that has to line up with the head (hair, hats, ears,
 * earrings, headphones, neck) reads its anchors from here instead of hard-coding offsets.
 *
 * Coordinates are in the 0–100 avatar space. "Face space" is world space shifted down by
 * `faceOffset`, which is the space eyes, brows, nose, mouth, extras and accessories are drawn in.
 */

/**
 * The one frame every avatar is shown in (editor preview, item tiles, exports, API). It is sized
 * for the tallest hat on the tallest hair, so avatars never shrink to fit an item.
 */
export const AVATAR_FRAME = { x: -9, y: -18, size: 118 } as const;
export const AVATAR_VIEWBOX = `${AVATAR_FRAME.x} ${AVATAR_FRAME.y} ${AVATAR_FRAME.size} ${AVATAR_FRAME.size}`;

export const HeadIds = ["square", "rounded", "angular", "oval", "slender"] as const;
export type HeadId = (typeof HeadIds)[number];

export interface HeadAnatomy {
  path: string;
  /** Highest y of the skull outline. */
  top: number;
  /** Vertical shift applied to facial features and face-anchored accessories. */
  faceOffset: number;
  /** x of the right side of the skull at ear height (world space); the left side mirrors it. */
  earX: number;
}

export const HEADS: Record<HeadId, HeadAnatomy> = {
  square: {
    path: "M20 22 Q 50 18, 80 22 L 78 85 Q 50 92, 22 85 Z",
    top: 20,
    faceOffset: 1.5,
    earX: 79,
  },
  rounded: {
    path: "M20 30 C 20 10, 80 10, 80 30 C 80 60, 80 85, 50 92 C 20 85, 20 60, 20 30 Z",
    top: 15,
    faceOffset: 3,
    earX: 80,
  },
  angular: {
    path: "M20 20 L 80 20 L 75 75 L 50 92 L 25 75 Z",
    top: 20,
    faceOffset: 0,
    earX: 77,
  },
  oval: {
    path: "M20 40 C 20 10, 80 10, 80 40 C 80 70, 75 90, 50 90 C 25 90, 20 70, 20 40 Z",
    top: 17.5,
    faceOffset: 3,
    earX: 80,
  },
  slender: {
    path: "M22 30 C 22 10, 78 10, 78 30 C 78 60, 77 84, 50 92 C 23 84, 22 60, 22 30 Z",
    top: 15,
    faceOffset: 3,
    earX: 78,
  },
};

export const HEAD_PATHS: Record<string, string> = Object.fromEntries(HeadIds.map((id) => [id, HEADS[id].path]));

/** Heads drawn for one preset (traced from a likeness); they are not offered in the editor. */
const PRESET_HEADS: Record<string, HeadAnatomy> = {};
export const registerPresetHead = (id: string, head: HeadAnatomy) => {
  PRESET_HEADS[id] = head;
};

export const getHead = (headId: string | undefined): HeadAnatomy =>
  HEADS[(headId as HeadId) ?? "square"] ?? PRESET_HEADS[headId ?? ""] ?? HEADS.square;

export const getFaceOffset = (headId: string | undefined) => getHead(headId).faceOffset;

export const getHeadFacialTransform = (headId: string | undefined) => `translate(0, ${getFaceOffset(headId)})`;

/** Ear centre in face space. */
export const EAR_Y = 52;

/**
 * Side accessories (earrings, ear cuffs) are authored hanging from x=15 / x=85 at y≈58.
 * This returns the shift that moves that authored point onto the actual ear lobe.
 */
export const getHeadSideOffset = (headId: string | undefined, isLeft: boolean): number => {
  const lobeX = getHead(headId).earX + 1.5;
  return isLeft ? 85 - lobeX : lobeX - 85;
};

export const getHeadSideTransform = (headId: string | undefined, isLeft: boolean) =>
  `translate(${getHeadSideOffset(headId, isLeft)}, 0)`;

/** Ear lobe in face space, where earrings hang from. */
export const getEarLobe = (headId: string | undefined, isLeft: boolean) => {
  const x = getHead(headId).earX + 1.5;
  return { x: isLeft ? 100 - x : x, y: 58 };
};

/** Moves an earring authored with its hook at (x, y) onto the ear lobe. */
export const getEarringTransform = (headId: string | undefined, isLeft: boolean, x: number, y: number) => {
  const lobe = getEarLobe(headId, isLeft);
  return `translate(${lobe.x - x}, ${lobe.y - y})`;
};

/** Where glasses arms meet the ear, in face space. */
export const getTemple = (headId: string | undefined, isLeft: boolean) => {
  const x = getHead(headId).earX + 2;
  return { x: isLeft ? 100 - x : x, y: EAR_Y - 6 };
};

/** Glasses arms from the frame's outer edges (frameX on the left, mirrored right) back to the ears. */
export const getTempleArmsPath = (headId: string | undefined, frameX: number, frameY: number) => {
  const left = getTemple(headId, true);
  const right = getTemple(headId, false);
  return `M ${frameX} ${frameY} L ${left.x} ${left.y} M ${100 - frameX} ${frameY} L ${right.x} ${right.y}`;
};

export const getEarPath = (headId: string | undefined, isLeft: boolean) => {
  const x = getHead(headId).earX;
  const y = EAR_Y;
  const right = `M ${x - 2} ${y - 7} C ${x + 5} ${y - 10}, ${x + 8} ${y + 3}, ${x - 1} ${y + 8}`;
  return isLeft ? mirrorPath(right) : right;
};

export const getEarDetailPath = (headId: string | undefined, isLeft: boolean) => {
  const x = getHead(headId).earX;
  const y = EAR_Y;
  const right = `M ${x + 0.5} ${y - 4} C ${x + 4} ${y - 4}, ${x + 4.5} ${y + 2}, ${x + 0.5} ${y + 3.5}`;
  return isLeft ? mirrorPath(right) : right;
};

const PARAM_COUNT: Record<string, number> = { M: 2, L: 2, T: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, A: 7, Z: 0 };

/** Mirrors a path around x = 50 (absolute and relative commands, including arcs). */
export const mirrorPath = (d: string) => {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  let cmd = "";
  let index = 0;
  return tokens
    .map((token) => {
      if (/[a-zA-Z]/.test(token)) {
        cmd = token;
        index = 0;
        return token;
      }
      const upper = cmd.toUpperCase();
      const count = PARAM_COUNT[upper] || 1;
      const slot = index % count;
      index++;
      const value = parseFloat(token);
      const relative = cmd !== upper;
      let isX = false;
      if (upper === "H") isX = true;
      else if (upper === "A") {
        if (slot === 4) return String(1 - value);
        isX = slot === 5;
      } else if (upper !== "V") isX = slot % 2 === 0;
      if (!isX) return token;
      return String(relative ? -value : 100 - value);
    })
    .join(" ");
};

export const NECK_PATH = "M 38 70 L 38 96 Q 50 101, 62 96 L 62 70 Z";

/**
 * Hats sit on the head along a "seat" curve. Everything of the head and hair above that
 * curve is cut away, so the hat's band has to cover the curve from x≈16 to x≈84.
 */
export interface HatSeat {
  /** y of the seat curve at x = 50. */
  mid: number;
  /** y of the seat curve at x = 10 and x = 90. */
  edge: number;
}

export const getSeatKeepPath = ({ mid, edge }: HatSeat) => {
  const control = 2 * mid - edge;
  return [
    `M -60 ${edge + 40} L 0 ${edge + 9} Q 5 ${edge}, 12 ${edge}`,
    `Q 50 ${control}, 88 ${edge}`,
    `Q 95 ${edge}, 100 ${edge + 9} L 160 ${edge + 40} L 160 200 L -60 200 Z`,
  ].join(" ");
};
