import { PartRegistry, PartComponent, AvatarItem, createAvatarItem } from "./common";
import { getHeadHairTransform, NO_CLIPPING_HATS, SMALL_HATS } from "./hats";

export const HairIds = [
  "bald",
  "buzzCut",
  "flatTopShort",
  "shortJaggedCrop",
  "sidePartShort",
  "bobCutSharp",
  "bobCutStraight",
  "jaggedFringeBob",
  "bowlCutRound",
  "sharpBobYellowHighlight",
  "shortCurlyBob",
  "longStraightLayered",
  "longLocs",
  "messySideSwept",
  "roundedCurls",
  "trapezoidCut",
  "roundedMiddlePart",
  "puffyMiddlePart",
  "heartMiddlePart",
  "sweptFringe",
  "singleTopKnot",
  "doubleSpaceBuns",
  "lowPonytail",
  "largeAfro",
  "spikyMohawk",
  "shavedSidesLongBack",
  "aviatorFlaps",
  "texturedPompadour",
  "largeHairBow",
  "detailedHairBow",
] as const;

export type HairId = (typeof HairIds)[number];

// --- BACK COMPONENTS ---

const baldBack: PartComponent = () => null;

const bobCutSharpBack: PartComponent = ({ fill }) => (
  <g>
    <path
      d="M 15 20 L 5 45 Q 8 75, 12 95 L 88 95 Q 92 75, 95 45 L 85 20 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M 30 25 Q 25 60, 28 85 M 70 25 Q 75 60, 72 85"
      fill="none"
      stroke="black"
      opacity="0.1"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </g>
);

const bobCutStraightBack: PartComponent = ({ fill }) => (
  <g>
    <path
      d="M 18 20 Q 5 45, 10 95 L 90 95 Q 95 45, 82 20 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M 50 30 V 90" fill="none" stroke="black" opacity="0.12" strokeWidth="4" strokeLinecap="round" />
  </g>
);

const shavedSidesLongBackBack: PartComponent = ({ fill }) => (
  <path
    d="M 20 25 C 5 45, 5 95, 20 95 L 35 90 L 50 95 L 65 90 L 80 95 C 95 95, 95 45, 80 25 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const spikyMohawkBack: PartComponent = () => null;

const largeAfroBack: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <g>
      <circle cx="50" cy="25" r="45" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      {!hatId && (
        <path d="M25 0 Q 50 -10, 75 0" fill="none" stroke="white" opacity="0.1" strokeWidth="12" strokeLinecap="round" />
      )}
    </g>
  );

const sweptFringeBack: PartComponent = ({ fill }) => (
  <path
    d="M10 15 Q 10 -10, 50 -10 Q 90 -10, 90 15 L 98 85 H 2 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const singleTopKnotBack: PartComponent = () => null;

const doubleSpaceBunsBack: PartComponent = ({ fill }) => (
  <g>
    <circle cx="15" cy="12" r="13" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
    <circle cx="85" cy="12" r="13" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
  </g>
);

const sidePartShortBack: PartComponent = () => null;

const jaggedFringeBobBack: PartComponent = ({ fill }) => (
  <path
    d="M15 15 Q 5 45, 10 95 L 90 95 Q 95 45, 85 15 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const bowlCutRoundBack: PartComponent = ({ fill }) => (
  <path
    d="M 10 20 C -10 40, -5 80, 15 95 L 30 88 L 50 95 L 70 88 L 85 95 C 110 80, 105 40, 90 20 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const messySideSweptBack: PartComponent = ({ fill }) => (
  <path
    d="M 10 25 C -20 45, -25 90, 15 100 C 25 105, 35 100, 45 105 C 55 100, 65 105, 75 102 C 85 105, 125 90, 80 15 L 90 25 L 65 5 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const roundedCurlsBack: PartComponent = ({ fill }) => (
  <path
    d="M 15 25 C 0 45, 0 90, 30 100 C 40 105, 50 100, 70 100 C 100 90, 100 45, 85 25 L 65 8 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const shortJaggedCropBack: PartComponent = ({ fill }) => (
  <path
    d="M20 15 L 10 40 Q 10 70, 15 95 L 85 95 Q 90 70, 90 40 L 80 15 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const aviatorFlapsBack: PartComponent = ({ fill }) => (
  <g>
    <path
      d="M15 25 Q 0 40, 5 75 Q 15 80, 20 70 L 25 35 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M85 25 Q 100 40, 95 75 Q 85 80, 80 70 L 75 35 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  </g>
);

const flatTopShortBack: PartComponent = ({ fill }) => (
  <path
    d="M15 20 Q 10 50, 15 75 L 85 75 Q 90 50, 85 20 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const buzzCutBack: PartComponent = () => null;

const sharpBobYellowHighlightBack: PartComponent = ({ fill }) => (
  <path
    d="M 15 25 L 5 45 Q 8 75, 12 95 L 88 95 Q 92 75, 95 45 L 85 25 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const roundedMiddlePartBack: PartComponent = ({ fill }) => (
  <path
    d="M 15 20 L 8 45 Q 10 95, 12 95 L 88 95 Q 90 95, 92 45 L 85 20 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const trapezoidCutBack: PartComponent = ({ fill }) => (
  <path
    d="M 15 20 L 5 45 Q 8 95, 12 95 L 88 95 Q 92 95, 95 45 L 85 20 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const texturedPompadourBack: PartComponent = ({ fill }) => (
  <path
    d="M 20 25 L 15 45 Q 15 55, 30 60 L 70 60 Q 85 55, 85 45 L 80 25 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const largeHairBowBack: PartComponent = ({ fill }) => (
  <path
    d="M 12 25 L 5 45 Q 8 75, 20 85 L 80 85 Q 92 75, 95 45 L 88 25 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const detailedHairBowBack: PartComponent = ({ fill }) => (
  <path
    d="M 12 25 L 5 45 Q 8 75, 20 85 L 80 85 Q 92 75, 95 45 L 88 25 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const puffyMiddlePartBack: PartComponent = ({ fill }) => (
  <path
    d="M 15 25 Q 5 50, 10 95 L 90 95 Q 95 50, 85 25 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const heartMiddlePartBack: PartComponent = ({ fill }) => (
  <path
    d="M 18 20 C 0 45, 0 95, 15 95 L 35 90 L 50 95 L 65 90 L 85 95 C 100 95, 100 45, 82 20 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const longLocsBack: PartComponent = ({ fill }) => (
  <g>
    <path
      d="M 12 20 Q 5 45, 8 100 L 92 100 Q 95 45, 88 20 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="black"
      strokeWidth="1"
    />
    <g stroke="black" opacity="0.15" strokeWidth="4" strokeLinecap="round" fill="none">
      <path d="M 22 30 V 100 M 50 25 V 100 M 78 30 V 100" />
    </g>
  </g>
);

const lowPonytailBack: PartComponent = ({ fill }) => (
  <path
    d="M 50 35 Q 60 40, 75 95 L 82 92 Q 68 40, 60 35 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const longStraightLayeredBack: PartComponent = ({ fill }) => {
  const hairColor = fill || "var(--avatar-hair, #D4A574)";
  return (
    <g>
      {/* Long straight hair back */}
      <path
        d="M 15 25 C 5 40, 0 80, 10 115 L 90 115 C 100 80, 95 40, 85 25 Z"
        fill={hairColor}
        stroke="black"
        strokeWidth="1.5"
      />
      {/* Straight hair texture */}
      <g stroke="black" opacity="0.08" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M 25 35 V 110" />
        <path d="M 40 30 V 112" />
        <path d="M 55 28 V 112" />
        <path d="M 70 30 V 112" />
        <path d="M 85 35 V 108" />
      </g>
    </g>
  );
};

const shortCurlyBobBack: PartComponent = ({ fill }) => {
  const hairColor = fill || "var(--avatar-hair, #E8C872)";
  return (
    <g>
      {/* Short curly bob back */}
      <path d="M 18 25 C 5 40, 0 70, 15 95 L 85 95 C 100 70, 95 40, 82 25 Z" fill={hairColor} stroke="black" strokeWidth="1.5" />
      {/* Curly texture */}
      <g stroke="black" opacity="0.12" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M 22 40 Q 18 55, 25 70 Q 20 80, 28 90" />
        <path d="M 35 35 Q 30 50, 38 65 Q 32 75, 40 88" />
        <path d="M 65 35 Q 70 50, 62 65 Q 68 75, 60 88" />
        <path d="M 78 40 Q 82 55, 75 70 Q 80 80, 72 90" />
      </g>
    </g>
  );
};

const longStraightLayeredFront: PartComponent = () => null;

// --- FRONT COMPONENTS ---

const baldFront: PartComponent = () => null;

const bobCutSharpFront: PartComponent = ({ fill, hatId }) => {
  const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  const startY = isFullHat ? 26 : 15;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return (
    <g>
      <path
        d={
          isFullHat
            ? `M10 ${startY} Q 10 ${startY + 30}, 15 95 L 22 ${startY + 20} Q 15 ${startY}, 10 ${startY} Z`
            : "M 12 15 Q 12 45, 18 80 L 25 35 Q 25 10, 12 15 Z"
        }
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d={
          isFullHat
            ? `M90 ${startY} Q 90 ${startY + 30}, 85 95 L 78 ${startY + 20} Q 85 ${startY}, 90 ${startY} Z`
            : "M 88 15 Q 88 45, 82 80 L 75 35 Q 75 10, 88 15 Z"
        }
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
      />
      {!isFullHat && (
        <path
          d="M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z"
          fill={hairColor}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
};

const bobCutStraightFront: PartComponent = ({ fill, hatId }) => {
  const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  const hairColor = fill || "var(--avatar-hair, #000)";
  return (
    <g>
      <path
        d={
          isFullHat
            ? "M 15 28 C 10 48, 5 68, 10 95 L 25 95 Q 18 63, 22 28 Z"
            : "M 15 15 C 8 35, 5 60, 12 85 L 25 35 Q 25 10, 15 15 Z"
        }
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d={
          isFullHat
            ? "M 85 28 C 90 48, 95 68, 90 95 L 75 95 Q 82 63, 78 28 Z"
            : "M 85 15 C 92 35, 95 60, 88 85 L 75 35 Q 75 10, 85 15 Z"
        }
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
      />
      {!isFullHat && (
        <path
          d="M 12 15 Q 50 2, 88 15 L 82 35 Q 75 30, 68 38 L 50 32 L 32 38 Q 25 30, 18 35 Z"
          fill={hairColor}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
};

const shavedSidesLongBackFront: PartComponent = ({ fill, hatId }) => {
  const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  const hairColor = fill || "var(--avatar-hair, #000)";
  return (
    <g>
      <path
        d={
          isFullHat
            ? "M 15 30 C 5 60, 5 95, 20 95 L 30 85 L 22 50 Z"
            : "M 15 15 C 5 35, 5 95, 25 100 L 35 85 L 22 35 Q 22 10, 15 15 Z"
        }
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d={
          isFullHat
            ? "M 85 30 C 95 60, 95 95, 80 95 L 70 85 L 78 50 Z"
            : "M 85 15 C 95 35, 95 95, 75 100 L 65 85 L 78 35 Q 78 10, 85 15 Z"
        }
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
      />
      {!isFullHat && (
        <path
          d="M 12 15 Q 50 5, 88 15 L 82 35 C 70 25, 30 25, 18 35 Z"
          fill={hairColor}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
};

const spikyMohawkFront: PartComponent = ({ fill, headId, hairId, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <g transform={getHeadHairTransform(headId, hairId, -1)}>
      <path
        d="M22 28 L 15 15 L 30 22 L 35 6 L 45 18 L 50 -2 L 55 18 L 65 6 L 70 22 L 85 15 L 78 28 Q 50 24, 22 28 Z"
        fill={fill || "var(--avatar-hair, #000)"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  );

const largeAfroFront: PartComponent = () => null;

const sweptFringeFront: PartComponent = ({ fill }) => (
  <path
    d="M14 15 Q 40 4, 86 10 L 80 25 Q 40 16, 22 48 L 14 28 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const singleTopKnotFront: PartComponent = ({ fill, headId, hairId }) => (
  <g transform={getHeadHairTransform(headId, hairId, -1)}>
    <path
      d="M 10 25 Q 50 2, 90 25 L 90 35 Q 50 22, 10 35 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="50" cy="5" r="14" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
  </g>
);

const doubleSpaceBunsFront: PartComponent = ({ fill, headId, hairId }) => (
  <g transform={getHeadHairTransform(headId, hairId, -1)}>
    <path
      d="M10 15 Q 50 -2, 90 15 L 86 30 Q 50 20, 14 30 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="15" cy="12" r="11" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
    <circle cx="85" cy="12" r="11" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
  </g>
);

const sidePartShortFront: PartComponent = ({ fill, hatId }) => (
  <path
    d={`M14 ${!!hatId && hatId !== "none" ? 26 : 18} Q 30 2, 86 10 L 80 25 Q 40 18, 20 45 Z`}
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const jaggedFringeBobFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  );

const bowlCutRoundFront: PartComponent = ({ fill, hatId }) => {
  const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  const hairColor = fill || "var(--avatar-hair, #000)";
  return (
    <g>
      {!isFullHat && (
        <path
          d="M 12 18 Q 45 4, 88 15 L 82 35 C 65 25, 45 35, 30 45 L 18 35 Z"
          fill={hairColor}
          stroke="currentColor"
          strokeWidth="2"
        />
      )}
      <path
        d={
          isFullHat
            ? "M 15 32 C 0 57, -5 80, 15 95 L 32 88 Q 15 65, 22 32 Z"
            : "M 15 25 C -5 55, -2 88, 22 100 L 42 95 Q 18 65, 15 25 Z"
        }
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d={
          isFullHat
            ? "M 85 32 C 100 57, 105 80, 85 95 L 68 88 Q 85 65, 78 32 Z"
            : "M 85 25 C 105 55, 102 88, 78 100 L 58 95 Q 82 65, 85 25 Z"
        }
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
  );
};

const messySideSweptFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 10 20 L 15 4 C 28 -5, 42 -5, 48 2 Q 78 0, 95 12 L 91 32 C 78 18, 55 18, 42 22 Q 25 25, 12 28 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );

const roundedCurlsFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 12 22 C 15 5, 45 5, 52 10 Q 75 10, 90 18 L 86 35 C 75 22, 55 25, 40 25 Q 25 25, 12 28 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );

const shortJaggedCropFront: PartComponent = ({ fill }) => (
  <path
    d="M12 18 Q 50 5, 88 18 L 90 32 L 78 28 L 70 38 L 58 30 L 50 40 L 42 30 L 30 38 L 22 28 L 10 32 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const aviatorFlapsFront: PartComponent = ({ fill }) => (
  <g>
    <path
      d="M15 15 Q 50 0, 85 15 L 85 35 Q 50 25, 15 35 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect x="12" y="22" width="10" height="4" rx="2" fill="#ff6b6b" stroke="currentColor" strokeWidth="1.5" />
    <rect x="78" y="22" width="10" height="4" rx="2" fill="#ff6b6b" stroke="currentColor" strokeWidth="1.5" />
  </g>
);

const flatTopShortFront: PartComponent = ({ fill }) => (
  <path
    d="M12 18 Q 50 5, 88 18 L 88 38 L 12 38 Z"
    fill={fill || "var(--avatar-hair, #000)"}
    stroke="currentColor"
    strokeWidth="2"
  />
);

const buzzCutFront: PartComponent = ({ fill, headId, hatId, hairId }) =>
  hatId && !NO_CLIPPING_HATS.includes(hatId) ? null : (
    <g transform={getHeadHairTransform(headId, hairId, -1)}>
      <path
        d="M20 25 C 20 10, 80 10, 80 25 L 30 25 Q 45 25, 30 25 Z"
        fill={fill || "var(--avatar-hair, #000)"}
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
  );

const sharpBobYellowHighlightFront: PartComponent = ({ fill }) => (
  <g>
    <path d="M 16 15 Q 10 50, 16 95 L 24 95 Q 18 50, 22 15 Z" fill="#FDE68A" stroke="black" strokeWidth="1.5" />
    <path
      d="M 12 15 Q 50 2, 88 15 L 82 35 L 68 22 L 50 35 L 32 22 L 18 35 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  </g>
);

const roundedMiddlePartFront: PartComponent = ({ fill, hatId }) => {
  const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  return (
    <path
      d={
        isFullHat
          ? "M 15 30 Q 8 65, 12 95 L 30 95 Q 22 65, 28 30 Z"
          : "M 15 20 C 30 10, 45 10, 50 15 C 55 10, 70 10, 85 20 L 80 32 Q 50 15, 20 32 Z"
      }
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );
};

const trapezoidCutFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 12 18 C 25 5, 65 2, 90 22 L 85 38 Q 60 15, 20 38 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );

const texturedPompadourFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 12 18 C 12 0, 40 -5, 52 5 C 65 -5, 95 0, 88 22 L 85 42 C 75 35, 60 38, 50 35 Q 25 35, 12 32 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );

const largeHairBowFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 10 20 C 5 0, 45 -10, 50 10 C 55 -10, 95 0, 90 20 L 95 35 Q 92 45, 80 42 L 20 42 Q 8 45, 5 35 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );

const detailedHairBowFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 10 20 C 5 2, 45 -5, 50 12 C 55 -5, 95 2, 90 20 L 92 28 Q 90 32, 80 30 L 20 30 Q 10 32, 8 28 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );

const puffyMiddlePartFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 15 20 C 15 5, 30 -5, 50 5 C 70 -5, 85 5, 85 20 L 92 45 Q 85 35, 75 42 L 50 35 L 25 42 Q 15 35, 8 45 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );

const heartMiddlePartFront: PartComponent = ({ fill, hatId }) =>
  hatId && hatId !== "none" && !SMALL_HATS.includes(hatId) ? null : (
    <path
      d="M 12 25 C 20 10, 45 5, 52 15 C 65 5, 90 10, 88 25 L 92 45 Q 92 65, 85 95 L 70 95 Q 78 70, 75 45 L 70 35 L 50 38 L 30 35 L 25 45 Q 22 70, 15 95 L 8 95 Q 8 65, 12 45 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  );

const longLocsFront: PartComponent = ({ fill, hatId }) => {
  const hairColor = fill || "var(--avatar-hair, #000)";
  const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  return (
    <g>
      {/* Top scalp/hairline - Enhanced with tight texture */}
      {!isFullHat && (
        <g>
          <path d="M 15 20 Q 50 5, 85 20 L 82 35 Q 50 25, 18 35 Z" fill={hairColor} stroke="black" strokeWidth="1" />
          <path d="M 25 15 Q 50 8, 75 15" fill="none" stroke="black" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {/* Shadow layer for front strands */}
      <g stroke="rgba(0,0,0,0.3)" strokeWidth="6.5" strokeLinecap="round" fill="none">
        <path d="M 12 30 Q 8 55, 10 95" />
        <path d="M 24 26 Q 20 55, 22 90" />
        <path d="M 88 30 Q 92 55, 90 95" />
        <path d="M 76 26 Q 80 55, 78 90" />
      </g>

      {/* Front framing locs - left side */}
      <g stroke={hairColor} strokeWidth="4.5" strokeLinecap="round" fill="none">
        <path d="M 12 30 Q 8 55, 10 95" />
        <path d="M 18 28 Q 14 55, 16 95" />
        <path d="M 24 26 Q 20 55, 22 90" />
      </g>
      {/* Front framing locs - right side */}
      <g stroke={hairColor} strokeWidth="4.5" strokeLinecap="round" fill="none">
        <path d="M 88 30 Q 92 55, 90 95" />
        <path d="M 82 28 Q 86 55, 84 95" />
        <path d="M 76 26 Q 80 55, 78 90" />
      </g>

      {/* Loc texture - Defined segmentation */}
      <g stroke="black" opacity="0.2" strokeWidth="1.2" strokeLinecap="round" fill="none">
        <path d="M 10 45 L 14 47 M 10 60 L 14 62 M 10 75 L 14 77" />
        <path d="M 16 50 L 20 52 M 16 70 L 20 72" />
        <path d="M 86 45 L 90 47 M 86 60 L 90 62 M 86 75 L 90 77" />
        <path d="M 80 50 L 84 52 M 80 70 L 84 72" />
      </g>

      {/* Silver Ring/Bead Accents - Refined to match image */}
      <g stroke="#E5E7EB" strokeWidth="2" strokeLinecap="butt" fill="none">
        <path d="M 11.2 55 L 12.8 55.2" /> {/* Ring on left loc */}
        <path d="M 10.2 78 L 11.8 78.2" /> {/* Another lower on same loc */}
        <path d="M 23.5 45 L 24.5 45.1" /> {/* Ring on middle loc */}
        <path d="M 87.2 50 L 88.8 50.2" /> {/* Ring on right loc */}
        <path d="M 88.5 72 L 90.1 72.2" /> {/* Another on right loc */}
        <path d="M 77.2 62 L 78.8 62.1" /> {/* Ring on inner right loc */}
      </g>
      {/* Inner shine for silver rings */}
      <g stroke="white" opacity="0.5" strokeWidth="0.8" strokeLinecap="round" fill="none">
        <path d="M 11.5 54.8 L 12.5 55" />
        <path d="M 87.5 49.8 L 88.5 50" />
        <path d="M 77.5 61.8 L 78.5 62" />
      </g>
    </g>
  );
};

const lowPonytailFront: PartComponent = ({ fill, headId, hairId }) => (
  <g transform={getHeadHairTransform(headId, hairId, -1)}>
    <path
      d="M 18 30 C 18 10, 40 8, 50 8 C 60 8, 82 10, 82 30 L 82 40 C 82 30, 60 25, 50 25 C 40 25, 18 30, 18 40 Z"
      fill={fill || "var(--avatar-hair, #000)"}
      stroke="currentColor"
      strokeWidth="2"
    />
  </g>
);

const shortCurlyBobFront: PartComponent = ({ fill, hatId }) => {
  const hairColor = fill || "var(--avatar-hair, #E8C872)";
  const isFullHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  return (
    <g>
      {/* Curly top */}
      {!isFullHat && (
        <g>
          <path
            d="M 15 28 C 22 8, 45 5, 50 15 C 55 5, 78 8, 85 28 L 80 38 Q 50 20, 20 38 Z"
            fill={hairColor}
            stroke="black"
            strokeWidth="1.5"
          />
          {/* Curl texture on top */}
          <path d="M 28 18 Q 35 12, 42 18 M 58 18 Q 65 12, 72 18" fill="none" stroke="black" opacity="0.12" strokeWidth="1" />
        </g>
      )}
      {/* Left curly side */}
      <g fill={hairColor} stroke="black" strokeWidth="1.5">
        <path d="M 12 30 Q 0 50, 8 75 Q 2 85, 15 95 L 28 88 Q 18 75, 22 55 Q 15 40, 18 30 Z" />
      </g>
      {/* Right curly side */}
      <g fill={hairColor} stroke="black" strokeWidth="1.5">
        <path d="M 88 30 Q 100 50, 92 75 Q 98 85, 85 95 L 72 88 Q 82 75, 78 55 Q 85 40, 82 30 Z" />
      </g>
      {/* Curl definition */}
      <g stroke="black" opacity="0.15" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M 10 45 Q 5 60, 12 75" />
        <path d="M 22 50 Q 15 65, 25 80" />
        <path d="M 90 45 Q 95 60, 88 75" />
        <path d="M 78 50 Q 85 65, 75 80" />
      </g>
    </g>
  );
};

export const HairItems: AvatarItem[] = [
  createAvatarItem({ id: "bald", name: "Bald", svg: baldFront, backSvg: baldBack }),
  createAvatarItem({ id: "buzzCut", name: "Buzz Cut", svg: buzzCutFront, backSvg: buzzCutBack }),
  createAvatarItem({ id: "flatTopShort", name: "Flat Top", svg: flatTopShortFront, backSvg: flatTopShortBack }),
  createAvatarItem({ id: "shortJaggedCrop", name: "Jagged Crop", svg: shortJaggedCropFront, backSvg: shortJaggedCropBack }),
  createAvatarItem({ id: "sidePartShort", name: "Side Part", svg: sidePartShortFront, backSvg: sidePartShortBack }),
  createAvatarItem({ id: "bobCutSharp", name: "Sharp Bob", svg: bobCutSharpFront, backSvg: bobCutSharpBack }),
  createAvatarItem({ id: "bobCutStraight", name: "Straight Bob", svg: bobCutStraightFront, backSvg: bobCutStraightBack }),
  createAvatarItem({ id: "jaggedFringeBob", name: "Jagged Bob", svg: jaggedFringeBobFront, backSvg: jaggedFringeBobBack }),
  createAvatarItem({ id: "bowlCutRound", name: "Bowl Cut", svg: bowlCutRoundFront, backSvg: bowlCutRoundBack }),
  createAvatarItem({
    id: "sharpBobYellowHighlight",
    name: "Highlight Bob",
    svg: sharpBobYellowHighlightFront,
    backSvg: sharpBobYellowHighlightBack,
  }),
  createAvatarItem({ id: "shortCurlyBob", name: "Curly Bob", svg: shortCurlyBobFront, backSvg: shortCurlyBobBack }),
  createAvatarItem({
    id: "longStraightLayered",
    name: "Long Layered",
    svg: longStraightLayeredFront,
    backSvg: longStraightLayeredBack,
  }),
  createAvatarItem({ id: "longLocs", name: "Long Locs", svg: longLocsFront, backSvg: longLocsBack }),
  createAvatarItem({ id: "messySideSwept", name: "Messy Side Swept", svg: messySideSweptFront, backSvg: messySideSweptBack }),
  createAvatarItem({ id: "roundedCurls", name: "Rounded Curls", svg: roundedCurlsFront, backSvg: roundedCurlsBack }),
  createAvatarItem({ id: "trapezoidCut", name: "Trapezoid", svg: trapezoidCutFront, backSvg: trapezoidCutBack }),
  createAvatarItem({ id: "roundedMiddlePart", name: "Middle Part", svg: roundedMiddlePartFront, backSvg: roundedMiddlePartBack }),
  createAvatarItem({ id: "puffyMiddlePart", name: "Puffy Middle Part", svg: puffyMiddlePartFront, backSvg: puffyMiddlePartBack }),
  createAvatarItem({ id: "heartMiddlePart", name: "Heart Middle Part", svg: heartMiddlePartFront, backSvg: heartMiddlePartBack }),
  createAvatarItem({ id: "sweptFringe", name: "Swept Fringe", svg: sweptFringeFront, backSvg: sweptFringeBack }),
  createAvatarItem({ id: "singleTopKnot", name: "Top Knot", svg: singleTopKnotFront, backSvg: singleTopKnotBack }),
  createAvatarItem({ id: "doubleSpaceBuns", name: "Space Buns", svg: doubleSpaceBunsFront, backSvg: doubleSpaceBunsBack }),
  createAvatarItem({ id: "lowPonytail", name: "Low Ponytail", svg: lowPonytailFront, backSvg: lowPonytailBack }),
  createAvatarItem({ id: "largeAfro", name: "Afro", svg: largeAfroFront, backSvg: largeAfroBack }),
  createAvatarItem({ id: "spikyMohawk", name: "Mohawk", svg: spikyMohawkFront, backSvg: spikyMohawkBack }),
  createAvatarItem({
    id: "shavedSidesLongBack",
    name: "Shaved Sides",
    svg: shavedSidesLongBackFront,
    backSvg: shavedSidesLongBackBack,
  }),
  createAvatarItem({ id: "aviatorFlaps", name: "Aviator Flaps", svg: aviatorFlapsFront, backSvg: aviatorFlapsBack }),
  createAvatarItem({ id: "texturedPompadour", name: "Pompadour", svg: texturedPompadourFront, backSvg: texturedPompadourBack }),
  createAvatarItem({ id: "largeHairBow", name: "Large Bow", svg: largeHairBowFront, backSvg: largeHairBowBack }),
  createAvatarItem({ id: "detailedHairBow", name: "Detailed Bow", svg: detailedHairBowFront, backSvg: detailedHairBowBack }),
];

export const HairBack: PartRegistry<HairId> = Object.fromEntries(
  HairItems.map((item) => [item.id, { component: item.backSvg || (() => null), label: item.name }])
) as PartRegistry<HairId>;

export const HairFront: PartRegistry<HairId> = Object.fromEntries(
  HairItems.map((item) => [item.id, { component: item.svg, label: item.name }])
) as PartRegistry<HairId>;
