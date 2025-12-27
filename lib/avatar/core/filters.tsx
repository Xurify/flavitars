import React from "react";
import { getHeadHatTransform } from "../parts";
import { HeadId, HEAD_PATHS } from "../parts/head";
import { HatId } from "../parts/hats";

interface AvatarFiltersProps {
  filterId: string;
  clippingY: number;
  headId: HeadId;
  hatId: HatId;
}

export const AvatarFilters: React.FC<AvatarFiltersProps> = ({ filterId, clippingY, headId, hatId }) => {
  return (
    <defs>
      {/* STYLE 1: CRUNCHY NOISE */}
      <filter id={`${filterId}-noise`} filterUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" result="noise" />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 15 -7"
          result="crunchyNoise"
        />
        <feComponentTransfer in="crunchyNoise">
          <feFuncR type="linear" slope="0.12" />
          <feFuncG type="linear" slope="0.12" />
          <feFuncB type="linear" slope="0.12" />
          <feFuncA type="linear" slope="0.6" />
        </feComponentTransfer>
        <feBlend mode="overlay" in="SourceGraphic" />
      </filter>

      {/* STYLE 2: POP-ART HALFTONE (Structured Dots) */}
      <filter id={`${filterId}-halftone`} filterUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="1" result="dots" />
        <feColorMatrix
          in="dots"
          type="matrix"
          values="0 0 0 0 0 
                  0 0 0 0 0 
                  0 0 0 0 0 
                  0 0 0 20 -10"
          result="stippling"
        />
        <feComposite in="SourceGraphic" in2="stippling" operator="in" />
        <feBlend mode="multiply" in2="SourceGraphic" opacity="0.4" />
      </filter>

      {/* STYLE 3: DIGITAL GLITCH (Prime / Lo-Fi) */}
      <filter id={`${filterId}-glitch`} filterUnits="userSpaceOnUse" x="-10%" y="-10%" width="120%" height="120%">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" in="SourceGraphic" result="red" />
        <feOffset in="red" dx="1" dy="0" result="redShift" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" in="SourceGraphic" result="cyan" />
        <feOffset in="cyan" dx="-1" dy="0" result="cyanShift" />
        <feBlend in="redShift" in2="cyanShift" mode="screen" result="rgbSplit" />

        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.2" numOctaves="1" result="glitchNoise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 10 -5" result="glitchMask" />
        <feComposite in="rgbSplit" in2="glitchMask" operator="arithmetic" k2="1" k3="0.2" />
      </filter>

      <filter id={`${filterId}-wobble`} filterUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves="3" result="edgeTurbulence" />
        <feDisplacementMap in2="edgeTurbulence" in="SourceGraphic" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      <clipPath id={`${filterId}-head-clip`}>
        <rect x="0" y={clippingY} width="100" height={100 - clippingY} />
      </clipPath>

      <clipPath id={`${filterId}-head-shape`}>
        <path d={HEAD_PATHS[headId] || HEAD_PATHS.angular} />
      </clipPath>

      <mask id={`${filterId}-astronaut-glass-mask`} maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100" height="100" fill="black" />
        <circle cx="50" cy="15" r="41" fill="white" transform={getHeadHatTransform(headId, hatId, 35, 1)} />
      </mask>
    </defs>
  );
};
