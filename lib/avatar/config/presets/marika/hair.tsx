import { PartComponent } from "../../../parts/common";
import { SMALL_HATS } from "../../../parts/hats";

export const MarikaHairIds = ["marikaCurlyBangs", "marikaBangsUpdo", "marika1", "marikaAtelier"] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

export const MarikaHairBack: Record<MarikaHairId, PartComponent> = {
  marikaCurlyBangs: ({ fill }) => {
    const hairColor = fill || "#F3DFA2";
    return (
      <g>
        <path
          d="M 15 30 C 5 45, 0 85, 20 100 C 35 105, 65 105, 80 100 C 100 85, 95 45, 85 30 L 70 20 Q 50 25, 30 20 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
        />
        <g stroke="black" opacity="0.1" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M 25 50 Q 15 65, 25 85" />
          <path d="M 75 50 Q 85 65, 75 85" />
          <path d="M 40 45 Q 35 60, 42 80" />
          <path d="M 60 45 Q 65 60, 58 80" />
        </g>
      </g>
    );
  },
  marikaBangsUpdo: ({ fill }) => {
    const hairColor = fill || "#E6BC7B";
    return (
      <g>
        <circle cx="50" cy="25" r="28" fill={hairColor} stroke="black" strokeWidth="1.5" />
        <path d="M 35 30 Q 50 50, 65 30" fill="none" stroke="black" opacity="0.1" strokeWidth="1.5" />
        <path d="M 30 20 Q 50 5, 70 20" fill="none" stroke="black" opacity="0.1" strokeWidth="1.5" />
      </g>
    );
  },
  marika1: ({ fill }) => {
    const hairColor = fill || "#F7E7CE";
    return (
      <g>
        <path
          d="M 15 25 C 5 45, 0 85, 20 95 L 80 95 C 100 85, 95 45, 85 25 L 75 15 Q 50 5, 25 15 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
        />
        <path d="M 20 35 Q 15 55, 22 75" fill="none" stroke="black" opacity="0.1" strokeWidth="1.5" />
        <path d="M 80 35 Q 85 55, 78 75" fill="none" stroke="black" opacity="0.1" strokeWidth="1.5" />
      </g>
    );
  },
  marikaAtelier: ({ fill }) => {
    const hairColor = fill || "#E8E2BC";
    return (
      <g>
        <path
          d="M 12 35 L 5 25 L 10 15 L 5 5 L 15 0 L 12 -12 L 25 -10 L 28 -22 L 40 -18 L 45 -30 
             L 55 -28 L 65 -35 L 75 -25 L 82 -32 L 88 -20 L 85 -8 L 95 0 L 90 12 L 98 25 L 88 35 
             Q 50 25, 12 35 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        <path
          d="M 10 30 C -5 60, -2 105, 15 115 L 35 110 L 50 115 L 65 110 L 85 115 C 102 105, 105 60, 90 30"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        <g fill="none" stroke="black" opacity="0.15" strokeWidth="3" strokeLinecap="round">
          <path d="M 25 40 Q 15 65, 20 95" />
          <path d="M 75 40 Q 85 65, 80 95" />
          <path d="M 45 35 Q 55 70, 50 100" opacity="0.08" strokeWidth="1.5" />
        </g>
      </g>
    );
  },
};

export const MarikaHairFront: Record<MarikaHairId, PartComponent> = {
  marikaCurlyBangs: ({ fill, hatId }) => {
    const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
    if (isFullHat) return null;
    const hairColor = fill || "#F3DFA2";
    return (
      <g>
        <path
          d="M 10 30 Q 15 10, 50 15 Q 85 10, 90 30 L 88 55 C 80 40, 60 35, 50 35 C 40 35, 20 40, 12 55 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <g stroke="black" opacity="0.15" strokeWidth="1.2" fill="none">
          <path d="M 15 25 Q 18 35, 22 28" />
          <path d="M 25 22 Q 30 35, 35 25" />
          <path d="M 40 20 Q 45 32, 50 20" />
          <path d="M 60 20 Q 55 32, 50 20" />
          <path d="M 75 22 Q 70 35, 65 25" />
          <path d="M 85 25 Q 82 35, 78 28" />
        </g>
      </g>
    );
  },
  marikaBangsUpdo: ({ fill, hatId }) => {
    const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
    if (isFullHat) return null;
    const hairColor = fill || "#E6BC7B";
    return (
      <g>
        <path
          d="M 12 30 C 15 5, 45 5, 50 10 C 55 5, 85 5, 88 30 L 85 45 Q 60 30, 50 30 Q 40 30, 15 45 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 20 15 Q 50 -5, 80 15" stroke="black" strokeWidth="1.5" fill={hairColor} />
        <path d="M 20 15 Q 50 -5, 80 15" fill={hairColor} stroke="none" />

        <path d="M 25 25 Q 35 15, 50 20" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        <path d="M 75 25 Q 65 15, 50 20" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
      </g>
    );
  },
  marika1: ({ fill }) => {
    const hairColor = fill || "#F7E7CE";
    return (
      <g>
        <path
          d="M 12 15 Q 50 5, 88 15 L 85 35 
             Q 80 40, 75 28 L 68 25 Q 65 35, 60 28 
             L 55 25 Q 50 38, 45 25 
             L 40 25 Q 35 35, 30 28 
             L 25 25 Q 20 40, 15 35 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 30 18 Q 32 28, 30 28" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        <path d="M 45 18 Q 48 30, 45 25" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        <path d="M 60 18 Q 58 30, 60 28" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        <path d="M 75 18 Q 72 28, 75 28" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />

        <path d="M 12 15 L 10 40 C 5 45, 10 50, 15 45 L 15 35" fill={hairColor} stroke="black" strokeWidth="1.5" />
        <path d="M 88 15 L 90 40 C 95 45, 90 50, 85 45 L 85 35" fill={hairColor} stroke="black" strokeWidth="1.5" />
      </g>
    );
  },
  marikaAtelier: ({ fill }) => {
    const hairColor = fill || "#E3E0B5";
    return (
      <g>
        <path
          d="M 12 25 Q 10 5, 25 5 Q 40 10, 50 15 Q 60 10, 75 5 Q 90 5, 88 25 L 85 40 Q 70 30, 50 35 Q 30 30, 15 40 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 20 5 L 15 2 M 30 5 L 28 0 M 70 5 L 72 0 M 80 5 L 85 2" stroke="black" opacity="0.1" strokeWidth="0.5" />

        <g stroke="black" opacity="0.15" strokeWidth="1" fill="none">
          <path d="M 20 20 L 25 15 L 20 10" />
          <path d="M 80 20 L 75 15 L 80 10" />
          <path d="M 40 25 L 45 20 L 40 15" />
          <path d="M 60 25 L 55 20 L 60 15" />
        </g>
      </g>
    );
  },
};
