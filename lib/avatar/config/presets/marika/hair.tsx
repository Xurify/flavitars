import { PartComponent } from "../../../parts/common";
import { SMALL_HATS } from "../../../parts/hats";

export const MarikaHairIds = [
  "marikaCurls",
  "marikaCurlyBangs",
  "marikaUpdo",
  "marika80sWild",
  "marikaMilitaryBlonde",
  "marikaAtelier",
] as const;

export type MarikaHairId = (typeof MarikaHairIds)[number];

export const MarikaHairBack: Record<MarikaHairId, PartComponent> = {
  marikaCurls: ({ fill }) => {
    const hairColor = fill || "#E6BC7B";
    return (
      <g>
        {/* Tiered Voluminous Back Mass - "Cloud" Silhouette Recreation */}
        <path
          d="M 20 25 C -10 35, -15 80, 5 105 C 15 115, 35 105, 50 115 C 65 105, 85 115, 95 105 C 120 80, 115 35, 80 25 L 65 18 Q 50 25, 35 18 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Deep Ambient Shadows for curl weight */}
        <g fill="none" stroke="black" opacity="0.15" strokeWidth="4" strokeLinecap="round">
          <path d="M 30 45 Q 15 65, 25 95 M 70 45 Q 85 65, 75 95" />
          <path d="M 50 40 V 105" opacity="0.1" strokeWidth="2" />
        </g>
        {/* Soft satin bounce lighting on lower curls */}
        <path d="M 25 95 Q 50 105, 75 95" fill="none" stroke="white" opacity="0.15" strokeWidth="6" strokeLinecap="round" />
      </g>
    );
  },
  marikaCurlyBangs: ({ fill }) => {
    const hairColor = fill || "#F3DFA2";
    return (
      <g>
        {/* Voluminous Curly Back */}
        <path
          d="M 15 30 C 5 45, 0 85, 20 100 C 35 105, 65 105, 80 100 C 100 85, 95 45, 85 30 L 70 20 Q 50 25, 30 20 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
        />
        {/* Curl details */}
        <g stroke="black" opacity="0.1" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M 25 50 Q 15 65, 25 85" />
          <path d="M 75 50 Q 85 65, 75 85" />
          <path d="M 40 45 Q 35 60, 42 80" />
          <path d="M 60 45 Q 65 60, 58 80" />
        </g>
      </g>
    );
  },
  marikaUpdo: ({ fill }) => {
    const hairColor = fill || "#E6BC7B";
    return (
      <g>
        {/* Elegant Updo Back (Bun/Twist) */}
        <circle cx="50" cy="25" r="28" fill={hairColor} stroke="black" strokeWidth="1.5" />
        {/* Texture/Twist lines */}
        <path d="M 35 30 Q 50 50, 65 30" fill="none" stroke="black" opacity="0.1" strokeWidth="1.5" />
        <path d="M 30 20 Q 50 5, 70 20" fill="none" stroke="black" opacity="0.1" strokeWidth="1.5" />
      </g>
    );
  },
  marika80sWild: ({ fill }) => {
    const hairColor = fill || "#E8C872";
    return (
      <g>
        {/* Wild 80s Texture - Spiky/Teased Silhouette */}
        <path
          d="M 15 35 C -5 50, -10 90, 20 105 C 40 115, 60 115, 80 105 C 110 90, 105 50, 85 35 L 75 25 Q 50 15, 25 25 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Teased Texture */}
        <g stroke="black" opacity="0.15" strokeWidth="1.5" fill="none">
          <path d="M 10 50 L 25 60 L 15 75 L 30 85" />
          <path d="M 90 50 L 75 60 L 85 75 L 70 85" />
          <path d="M 40 40 L 50 55 L 45 70" />
          <path d="M 60 40 L 50 55 L 55 70" />
        </g>
      </g>
    );
  },
  marikaMilitaryBlonde: ({ fill }) => {
    const hairColor = fill || "#F7E7CE";
    return (
      <g>
        {/* Short, styled back - "Helmet" shape but elegant */}
        <path
          d="M 15 25 C 5 45, 0 85, 20 95 L 80 95 C 100 85, 95 45, 85 25 L 75 15 Q 50 5, 25 15 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
        />
        {/* Volume/Texture lines */}
        <path d="M 20 35 Q 15 55, 22 75" fill="none" stroke="black" opacity="0.1" strokeWidth="1.5" />
        <path d="M 80 35 Q 85 55, 78 75" fill="none" stroke="black" opacity="0.1" strokeWidth="1.5" />
      </g>
    );
  },
  marikaAtelier: ({ fill }) => {
    const hairColor = fill || "#E8E2BC";
    return (
      <g>
        {/* Massive Teased Perimeter - High Detail Jagged Edge */}
        <path
          d="M 12 35 L 5 25 L 10 15 L 5 5 L 15 0 L 12 -12 L 25 -10 L 28 -22 L 40 -18 L 45 -30 
             L 55 -28 L 65 -35 L 75 -25 L 82 -32 L 88 -20 L 85 -8 L 95 0 L 90 12 L 98 25 L 88 35 
             Q 50 25, 12 35 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Lower Voluminous Fall - The hair reaching the shoulders */}
        <path
          d="M 10 30 C -5 60, -2 105, 15 115 L 35 110 L 50 115 L 65 110 L 85 115 C 102 105, 105 60, 90 30"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* High-Fidelity Depth Shading - Simulating dense permed layers */}
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
  marikaCurls: ({ fill, hatId }) => {
    const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
    const hairColor = fill || "#E6BC7B";
    const highlightColor = "#FFF4E0";

    if (isFullHat) return null;

    return (
      <g>
        {/* Main Defined Part and Bangs Mass */}
        <path
          d="M 12 28 C 15 8, 45 5, 52 12 C 65 5, 92 8, 92 28 L 88 45 Q 75 30, 60 38 L 45 32 Q 25 32, 12 45 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 1:1 Side Curl Clumping (Recreating image silhouettes) */}
        <g stroke="black" strokeWidth="1.5" strokeLinejoin="round">
          {/* Right framing clump */}
          <path d="M 88 28 C 115 50, 110 85, 90 98 L 75 88 Q 95 65, 85 28 Z" fill={hairColor} />
          {/* Left framing clump */}
          <path d="M 12 28 C -15 50, -10 85, 10 98 L 25 88 Q 5 65, 15 28 Z" fill={hairColor} />
        </g>

        {/* Studio-Quality Specular Highlights (Satin Gloss) */}
        <g stroke={highlightColor} strokeWidth="5" opacity="0.35" strokeLinecap="round" fill="none">
          <path d="M 35 15 Q 50 10, 65 14" /> {/* Crown shine */}
          <path d="M 75 35 Q 92 45, 88 75" strokeWidth="2" /> {/* Right curl highlight */}
          <path d="M 25 35 Q 8 45, 12 75" strokeWidth="2" /> {/* Left curl highlight */}
          {/* Secondary bright gold flecks */}
          <path d="M 45 18 L 48 22" stroke="#FDE68A" strokeWidth="2" opacity="0.6" />
          <path d="M 55 18 L 52 22" stroke="#FDE68A" strokeWidth="2" opacity="0.6" />
        </g>

        {/* Fine Texture Separation Lines */}
        <g stroke="black" opacity="0.18" strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M 50 12 V 32" strokeWidth="2" /> {/* The Part Line */}
          <path d="M 82 45 Q 95 65, 85 85" />
          <path d="M 18 45 Q 5 65, 15 85" />
          <path d="M 30 25 Q 40 18, 50 25" />
          <path d="M 70 25 Q 60 18, 50 25" />
        </g>
      </g>
    );
  },
  marikaCurlyBangs: ({ fill, hatId }) => {
    const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
    if (isFullHat) return null;
    const hairColor = fill || "#F3DFA2";
    return (
      <g>
        {/* Curly Bangs - framing the face */}
        <path
          d="M 10 30 Q 15 10, 50 15 Q 85 10, 90 30 L 88 55 C 80 40, 60 35, 50 35 C 40 35, 20 40, 12 55 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Bang Texture */}
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
  marikaUpdo: ({ fill, hatId }) => {
    const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
    if (isFullHat) return null;
    const hairColor = fill || "#E6BC7B";
    return (
      <g>
        {/* Swept back front */}
        <path
          d="M 12 30 C 15 5, 45 5, 50 10 C 55 5, 85 5, 88 30 L 85 45 Q 60 30, 50 30 Q 40 30, 15 45 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Volume on top */}
        <path d="M 20 15 Q 50 -5, 80 15" stroke="black" strokeWidth="1.5" fill={hairColor} />
        <path d="M 20 15 Q 50 -5, 80 15" fill={hairColor} stroke="none" />

        {/* Strand Details */}
        <path d="M 25 25 Q 35 15, 50 20" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        <path d="M 75 25 Q 65 15, 50 20" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
      </g>
    );
  },
  marika80sWild: ({ fill, hatId }) => {
    const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
    if (isFullHat) return null;
    const hairColor = fill || "#E8C872";
    return (
      <g>
        {/* Wild 80s Front - Teased Bangs/Side Swept */}
        <path
          d="M 10 35 C 5 10, 30 5, 50 15 C 70 5, 95 10, 90 35 L 85 55 Q 65 35, 50 45 Q 35 35, 15 55 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Teased Spikes */}
        <g stroke="black" opacity="0.15" strokeWidth="1.5" fill="none">
          <path d="M 15 25 L 20 10" />
          <path d="M 85 25 L 80 10" />
          <path d="M 35 20 Q 45 10, 55 20" />
        </g>
      </g>
    );
  },
  marikaMilitaryBlonde: ({ fill }) => {
    const hairColor = fill || "#F7E7CE";
    return (
      <g>
        {/* Defined Bangs - separated strands "Fringe" */}
        {/* Main bangs block - High coverage */}
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
        {/* Individual defining strands for the "defined" look */}
        <path d="M 30 18 Q 32 28, 30 28" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        <path d="M 45 18 Q 48 30, 45 25" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        <path d="M 60 18 Q 58 30, 60 28" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />
        <path d="M 75 18 Q 72 28, 75 28" fill="none" stroke="black" opacity="0.1" strokeWidth="1" />

        {/* Side frames */}
        <path d="M 12 15 L 10 40 C 5 45, 10 50, 15 45 L 15 35" fill={hairColor} stroke="black" strokeWidth="1.5" />
        <path d="M 88 15 L 90 40 C 95 45, 90 50, 85 45 L 85 35" fill={hairColor} stroke="black" strokeWidth="1.5" />
      </g>
    );
  },
  marikaAtelier: ({ fill }) => {
    const hairColor = fill || "#E3E0B5";
    return (
      <g>
        {/* Wild 80s Bangs/Fringe - High Volume Upwards */}
        <path
          d="M 12 25 Q 10 5, 25 5 Q 40 10, 50 15 Q 60 10, 75 5 Q 90 5, 88 25 L 85 40 Q 70 30, 50 35 Q 30 30, 15 40 Z"
          fill={hairColor}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Flyaways / Frizz Haze */}
        <path d="M 20 5 L 15 2 M 30 5 L 28 0 M 70 5 L 72 0 M 80 5 L 85 2" stroke="black" opacity="0.1" strokeWidth="0.5" />

        {/* Crimped/Teased Texture on Bangs */}
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
