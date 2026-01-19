export * from "./base";

export const getHeadFacialTransform = (headId: string) => {
  const offsets: Record<string, number> = {
    square: 1.5,
    rounded: 3,
    oval: 3,
    angular: 0,
    heart: 2.5,
  };
  const offsetY = offsets[headId] ?? 0;
  return `translate(0, ${offsetY})`;
};

/**
 * Utility for accessories that sit on the sides (headphones, earrings)
 * Shifts components laterally based on head width
 */
export const getHeadSideOffset = (headId: string, isLeft: boolean): number => {
  const offsets: Record<string, number> = {
    square: isLeft ? 4.5 : -4.5,
    rounded: isLeft ? 3.5 : -3.5,
    angular: isLeft ? 7 : -7,
    oval: isLeft ? 3.5 : -3.5,
  };
  return offsets[headId] ?? 0;
};

/**
 * Utility for accessories that sit on the sides (headphones, earrings)
 * Shifts components laterally based on head width
 */
export const getHeadSideTransform = (headId: string, isLeft: boolean) => {
  const offsetX = getHeadSideOffset(headId, isLeft);
  return `translate(${offsetX}, 0)`;
};
