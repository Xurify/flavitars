import { PartComponent, getHeadSideOffset } from "../../../parts/common";

export const MarikaAccessoryIds = ["marikaAtelierEarrings"] as const;

export type MarikaAccessoryId = (typeof MarikaAccessoryIds)[number];

export const MarikaAccessories: Record<MarikaAccessoryId, PartComponent> = {
  marikaAtelierEarrings: ({ headId }) => {
    const leftX = getHeadSideOffset(headId, true) * 0.5;
    const rightX = getHeadSideOffset(headId, false) * 0.5;
    return (
      <g>
        {/* Left Earring - Gold Dangle - positioned at left jaw edge */}
        <g transform={`translate(${leftX}, 0)`}>
          <line x1="22" y1="62" x2="22" y2="66" stroke="#F59E0B" strokeWidth="1" />
          {/* Triangle Element */}
          <path d="M 19 66 L 25 66 L 22 76 Z" fill="#FFD700" stroke="#B45309" strokeWidth="0.5" />
          {/* Texture */}
          <circle cx="22" cy="69" r="0.5" fill="#B45309" />
          <circle cx="21" cy="71" r="0.5" fill="#B45309" />
          <circle cx="23" cy="71" r="0.5" fill="#B45309" />
        </g>
        {/* Right Earring - positioned at right jaw edge */}
        <g transform={`translate(${rightX}, 0)`}>
          <line x1="78" y1="62" x2="78" y2="66" stroke="#F59E0B" strokeWidth="1" />
          <path d="M 75 66 L 81 66 L 78 76 Z" fill="#FFD700" stroke="#B45309" strokeWidth="0.5" />
          {/* Texture */}
          <circle cx="78" cy="69" r="0.5" fill="#B45309" />
          <circle cx="77" cy="71" r="0.5" fill="#B45309" />
          <circle cx="79" cy="71" r="0.5" fill="#B45309" />
        </g>
      </g>
    );
  },
};
