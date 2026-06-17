import { PartRegistry, PartComponent } from "../../../parts/common";
import { SMALL_HATS } from "../../../parts/hats";

export const UrsulaHairIds = ["ursulaCoiffure"] as const;
export type UrsulaHairId = (typeof UrsulaHairIds)[number];

const ursulaCoiffureBack: PartComponent = ({ fill }) => {
  const hairColor = fill || "#F7E7CE";
  return (
    <g>
      {/* Fuller back hair that supports the voluminous side wings */}
      <path
        d="M 16 34 
           C 12 42, 14 54, 24 60 
           C 32 64, 68 64, 76 60 
           C 86 54, 88 42, 84 34 
           C 86 28, 80 18, 70 14
           Q 50 18, 30 14
           C 20 18, 14 28, 16 34 Z"
        fill={hairColor}
        stroke="black"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Back hair texture lines */}
      <g stroke="black" strokeWidth="1.2" opacity="0.1" fill="none" strokeLinecap="round">
        <path d="M 22 45 Q 16 58, 26 66" />
        <path d="M 78 45 Q 84 58, 74 66" />
      </g>
    </g>
  );
};

const ursulaCoiffureFront: PartComponent = ({ fill, hatId }) => {
  const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  if (isFullHat) return null;
  const hairColor = fill || "#F7E7CE";

  return (
    <g>
      {/* Main Hair Mass - Voluminous feathered coiffure with lower forehead hairline */}
      <path
        d="M 16 38 
           C 8 32, 6 24, 14 20
           C 8 14, 18 6, 28 8
           C 32 4, 45 -5, 58 -5
           C 70 -6, 82 -2, 86 8
           C 93 12, 94 22, 88 28
           C 92 32, 90 38, 84 36
           C 80 28, 70 22, 54 22
           C 44 22, 34 23, 28 20
           C 24 26, 20 32, 16 38 Z"
        fill={hairColor}
        stroke="black"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Shadow near the part */}
      <path
        d="M 28 16
           C 30 8, 34 6, 38 6
           C 35 12, 32 18, 29 20 Z"
        fill="black"
        opacity="0.08"
      />

      {/* Side wisps/bangs overlapping forehead */}
      <path
        d="M 28 16
           C 33 22, 42 24, 48 24
           C 42 22, 35 18, 28 16 Z"
        fill="black"
        opacity="0.05"
      />
      <path
        d="M 28 16
           C 25 22, 21 28, 17 32
           C 21 27, 25 21, 28 16 Z"
        fill="black"
        opacity="0.05"
      />

      {/* Voluminous right-sweep highlights */}
      <path
        d="M 32 6
           C 45 -2, 68 -2, 78 6
           C 84 11, 80 18, 72 20
           C 60 22, 45 18, 32 12 Z"
        fill="white"
        opacity="0.18"
      />
      
      <path
        d="M 40 2
           C 50 -4, 65 -4, 72 4
           C 76 8, 73 14, 66 16
           C 56 18, 48 14, 40 8 Z"
        fill="white"
        opacity="0.12"
      />

      {/* Left-sweep highlight */}
      <path
        d="M 14 18
           C 20 14, 26 12, 28 10
           C 25 14, 20 20, 14 24 Z"
        fill="white"
        opacity="0.18"
      />

      {/* Soft swept-back strands flowing diagonally from the part over the crown */}
      <g stroke="black" strokeWidth="1" opacity="0.13" fill="none" strokeLinecap="round">
        {/* Soft side part */}
        <path d="M 29 7 C 30 12, 29 16, 28 20" opacity="0.6" />
        {/* Main sweep: front near the part arcing up over the crown and back to the right */}
        <path d="M 32 18 C 44 9, 64 5, 82 13" />
        <path d="M 30 14 C 43 5, 64 2, 80 10" />
        <path d="M 31 10 C 44 1, 66 -1, 78 5" />
        <path d="M 35 6 C 48 -2, 66 -4, 76 1" />
        {/* Left temple sweeping back */}
        <path d="M 26 10 C 21 13, 17 17, 15 23" />
        <path d="M 24 16 C 20 19, 17 23, 16 28" />
        {/* Right side volume curving down toward the ear */}
        <path d="M 84 14 C 87 19, 86 24, 82 29" />
      </g>
    </g>
  );
};

export const UrsulaHairBack: PartRegistry<UrsulaHairId> = {
  ursulaCoiffure: {
    component: ursulaCoiffureBack,
    label: "Ursula Coiffure Back",
    presetOnly: true,
    isExclusive: true,
  },
};

export const UrsulaHairFront: PartRegistry<UrsulaHairId> = {
  ursulaCoiffure: {
    component: ursulaCoiffureFront,
    label: "Ursula Coiffure",
    presetOnly: true,
    isExclusive: true,
  },
};
