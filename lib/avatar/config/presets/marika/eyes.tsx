import { PartComponent } from "../../../parts/common";

export const MarikaEyesIds = ["marikaProfoundBlue", "marikaAtelier"] as const;

export type MarikaEyesId = (typeof MarikaEyesIds)[number];

export const MarikaEyes: Record<MarikaEyesId, PartComponent> = {
  marikaProfoundBlue: () => (
    <g>
      {/* Smoky Eyeshadow Base */}
      <path d="M 20 44 Q 35 30, 50 44" fill="#111" opacity="0.1" filter="blur(2px)" />
      <path d="M 50 44 Q 65 30, 80 44" fill="#111" opacity="0.1" filter="blur(2px)" />

      {/* Left Eye */}
      <g transform="translate(35, 45)">
        {/* Deep Blue Iris */}
        <circle r="4.8" fill="#8B9DB3" />
        <circle r="3" fill="#6B7D91" />
        {/* Pupil */}
        <circle r="2" fill="black" />
        {/* Intense Highlight */}
        <circle cx="1.5" cy="-2" r="1.5" fill="white" />
        <circle cx="-1.5" cy="1.5" r="0.8" fill="white" opacity="0.5" />

        {/* Heavy Eyeliner - Top */}
        <path d="M -10 -2 Q -12 -8, 2 -5" fill="none" stroke="black" strokeWidth="2.8" strokeLinecap="round" />
        {/* Heavy Eyeliner - Bottom */}
        <path d="M -9 2 Q 0 5, 9 2" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* Mascara Lashes */}
        <g stroke="black" strokeWidth="1.2" strokeLinecap="round">
          <path d="M -9 -3 L -12 -7" />
          <path d="M -5 -5 L -6 -10" />
          <path d="M -1 -5 L 0 -11" />
          <path d="M 3 -4 L 5 -9" />
        </g>
      </g>

      {/* Right Eye */}
      <g transform="translate(65, 45)">
        {/* Deep Blue Iris */}
        <circle r="4.8" fill="#8B9DB3" />
        <circle r="3" fill="#6B7D91" />
        {/* Pupil */}
        <circle r="2" fill="black" />
        {/* Intense Highlight */}
        <circle cx="1.5" cy="-2" r="1.5" fill="white" />
        <circle cx="-1.5" cy="1.5" r="0.8" fill="white" opacity="0.5" />

        {/* Heavy Eyeliner - Top */}
        <path d="M 10 -2 Q 12 -8, -2 -5" fill="none" stroke="black" strokeWidth="2.8" strokeLinecap="round" />
        {/* Heavy Eyeliner - Bottom */}
        <path d="M 9 2 Q 0 5, -9 2" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* Mascara Lashes */}
        <g stroke="black" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 9 -3 L 12 -7" />
          <path d="M 5 -5 L 6 -10" />
          <path d="M 1 -5 L 0 -11" />
          <path d="M -3 -4 L -5 -9" />
        </g>
      </g>
    </g>
  ),
  marikaAtelier: () => (
    <g>
      {/* 80s Pink/Purple Eyeshadow - Separated to avoid unibrow */}
      <path d="M 20 42 Q 32 25, 45 42" fill="#D946EF" opacity="0.4" filter="blur(1px)" />
      <path d="M 55 42 Q 68 25, 80 42" fill="#D946EF" opacity="0.4" filter="blur(1px)" />

      {/* Left Eye */}
      <g transform="translate(35, 45)">
        {/* Iris - Clear Blue */}
        <circle r="4.6" fill="#3B82F6" />
        <circle r="2.5" fill="#1e1b4b" />
        <circle r="1.5" fill="black" />
        {/* White Highlight */}
        <circle cx="1.5" cy="-2" r="1.2" fill="white" />

        {/* Upper Lash Line - Thick Black */}
        <path d="M -10 -2 Q -5 -8, 2 -5" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" />

        {/* Lower Rim - Blue liner hint */}
        <path d="M -9 2 Q 0 5, 9 2" fill="none" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* Right Eye */}
      <g transform="translate(65, 45)">
        {/* Iris - Clear Blue */}
        <circle r="4.6" fill="#3B82F6" />
        <circle r="2.5" fill="#1e1b4b" />
        <circle r="1.5" fill="black" />
        {/* White Highlight */}
        <circle cx="1.5" cy="-2" r="1.2" fill="white" />

        {/* Upper Lash Line - Thick Black */}
        <path d="M 10 -2 Q 5 -8, -2 -5" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" />

        {/* Lower Rim - Blue liner hint */}
        <path d="M 9 2 Q 0 5, -9 2" fill="none" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      </g>
    </g>
  ),
};
