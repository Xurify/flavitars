import type { ReactElement, ReactNode } from "react";
import { PartRegistry, PartComponent, AvatarItem, createAvatarItem } from "./common";
import { getHeadHairTransform, isClosedKnitHat, isFullCoverageHat, isOpenBrimHat, isPhysicalHat } from "./hats";
import { getHairPathData, getHairHighlightPath } from "./hair-paths";
import { HairIds, type HairId } from "./hair-ids";

function bunKnotPair(
  hairColor: string,
  leftX: number,
  rightX: number,
  centerY: number,
  radius: number,
): ReactElement {
  return (
    <>
      <circle cx={leftX} cy={centerY} r={radius} fill={hairColor} stroke="currentColor" strokeWidth="2" />
      <circle cx={rightX} cy={centerY} r={radius} fill={hairColor} stroke="currentColor" strokeWidth="2" />
      <path
        d={`M ${leftX - 4} ${centerY - 3} A 4 3 0 0 1 ${leftX + 2} ${centerY - 5}`}
        fill="none"
        stroke="white"
        opacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M ${rightX - 4} ${centerY - 3} A 4 3 0 0 1 ${rightX + 2} ${centerY - 5}`}
        fill="none"
        stroke="white"
        opacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
}

function tuckedBowKnot(hairColor: string): ReactElement {
  return (
    <g>
      <path
        d="M 4 40 Q -2 32, 8 28 Q 18 36, 16 46 Q 8 50, 4 40 Z"
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M 20 42 Q 12 34, 22 30 Q 30 38, 26 48 Q 20 50, 20 42 Z"
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="40" r="4" fill={hairColor} stroke="currentColor" strokeWidth="2" />
      <path
        d="M 96 40 Q 102 32, 92 28 Q 82 36, 84 46 Q 92 50, 96 40 Z"
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M 80 42 Q 88 34, 78 30 Q 70 38, 74 48 Q 80 50, 80 42 Z"
        fill={hairColor}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="86" cy="40" r="4" fill={hairColor} stroke="currentColor" strokeWidth="2" />
    </g>
  );
}

export { HairIds, type HairId };

// --- BACK COMPONENTS ---

const baldBack: PartComponent = () => null;

const bobCutSharpBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("bobCutSharp", "back", hatId ?? "none");
  if (!d) return null;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 30 25 Q 25 60, 28 85 M 70 25 Q 75 60, 72 85" fill="none" stroke="black" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
};

const spikyMohawkBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("spikyMohawk", "back", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const largeAfroBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("largeAfro", "back", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  const hasPhysicalHat = isPhysicalHat(hatId);
  const hideAfroPuffs = isFullCoverageHat(hatId);
  return (
    <g>
      <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" />
      {hasPhysicalHat && !hideAfroPuffs && (
        <g>
          <ellipse cx="14" cy="50" rx="16" ry="20" fill={hairColor} stroke="currentColor" strokeWidth="2" />
          <ellipse cx="86" cy="50" rx="16" ry="20" fill={hairColor} stroke="currentColor" strokeWidth="2" />
          <path d="M 6 42 Q 12 36, 22 38" fill="none" stroke="white" opacity="0.22" strokeWidth="3" strokeLinecap="round" />
          <path d="M 78 38 Q 88 36, 94 42" fill="none" stroke="white" opacity="0.22" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {!hasPhysicalHat && (
        <path d="M25 0 Q 50 -10, 75 0" fill="none" stroke="white" opacity="0.1" strokeWidth="12" strokeLinecap="round" />
      )}
    </g>
  );
};

const sweptFringeBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("sweptFringe", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const singleTopKnotBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("singleTopKnot", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const doubleSpaceBunsBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("doubleSpaceBuns", "back", hatId ?? "none");
  const hideBuns = isFullCoverageHat(hatId);
  const hairColor = fill || "var(--avatar-hair, #000)";
  if (hideBuns) {
    if (!d) return null;
    return <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" />;
  }
  const hasPhysicalHat = isPhysicalHat(hatId);
  return (
    <g>
      {d ? <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" /> : null}
      {isClosedKnitHat(hatId) && bunKnotPair(hairColor, 12, 88, 46, 10)}
      {isOpenBrimHat(hatId) && bunKnotPair(hairColor, 11, 89, 50, 11)}
      {hasPhysicalHat && !isClosedKnitHat(hatId) && !isOpenBrimHat(hatId) && bunKnotPair(hairColor, 12, 88, 46, 10)}
      {!hasPhysicalHat && (
        <>
          <circle cx="15" cy="12" r="13" fill={hairColor} stroke="currentColor" strokeWidth="2" />
          <circle cx="85" cy="12" r="13" fill={hairColor} stroke="currentColor" strokeWidth="2" />
        </>
      )}
    </g>
  );
};

const sidePartShortBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("sidePartShort", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const jaggedFringeBobBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("jaggedFringeBob", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const bowlCutRoundBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("bowlCutRound", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const messySideSweptBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("messySideSwept", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const roundedCurlsBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("roundedCurls", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const shortJaggedCropBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("shortJaggedCrop", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const aviatorFlapsBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("aviatorFlaps", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const flatTopShortBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("flatTopShort", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const crewCutBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("crewCut", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const caesarCropBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("caesarCrop", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const fadeCropBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("fadeCrop", "back", hatId ?? "none");
  if (!d) return null;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <path d="M 23 44 Q 50 55, 77 44" fill="none" stroke="white" opacity="0.16" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
};

const undercutBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("undercut", "back", hatId ?? "none");
  if (!d) return null;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <path d="M 20 48 Q 50 60, 80 48" fill="none" stroke="white" opacity="0.12" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
};

const slickBackBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("slickBack", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const curtainsBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("curtains", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const shortWavesBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("shortWaves", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const messyShortBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("messyShort", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const buzzCutBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("buzzCut", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const sharpBobYellowHighlightBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("sharpBobYellowHighlight", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const roundedMiddlePartBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("roundedMiddlePart", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const trapezoidCutBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("trapezoidCut", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const texturedPompadourBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("texturedPompadour", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const largeHairBowBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("largeHairBow", "back", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return (
    <g>
      <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {isPhysicalHat(hatId) && !isFullCoverageHat(hatId) && tuckedBowKnot(hairColor)}
    </g>
  );
};

const detailedHairBowBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("detailedHairBow", "back", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return (
    <g>
      <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {isPhysicalHat(hatId) && !isFullCoverageHat(hatId) && tuckedBowKnot(hairColor)}
    </g>
  );
};

const puffyMiddlePartBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("puffyMiddlePart", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const heartMiddlePartBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("heartMiddlePart", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const longLocsBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("longLocs", "back", hatId ?? "none");
  if (!d) return null;
  const hasPhysicalHat = isPhysicalHat(hatId);
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="black" strokeWidth="1" />
      {!hasPhysicalHat && (
        <g stroke="black" opacity="0.15" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M 22 30 V 100 M 50 25 V 100 M 78 30 V 100" />
        </g>
      )}
    </g>
  );
};

const lowPonytailBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("lowPonytail", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const longStraightLayeredBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("longStraightLayered", "back", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return (
    <g>
      <path d={d} fill={hairColor} stroke="black" strokeWidth="1.5" />
      <g stroke="black" opacity="0.08" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M 23 30 C 17 50, 17 76, 21 97" />
        <path d="M 36 22 C 31 47, 32 74, 35 98" />
        <path d="M 50 14 C 47 42, 48 73, 50 98" />
        <path d="M 64 22 C 69 47, 68 74, 65 98" />
        <path d="M 77 30 C 83 50, 83 76, 79 97" />
      </g>
    </g>
  );
};

const shortCurlyBobBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("shortCurlyBob", "back", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #E8C872)";
  return (
    <g>
      <path d={d} fill={hairColor} stroke="black" strokeWidth="1.5" />
      <g stroke="black" opacity="0.12" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M 22 40 Q 18 55, 25 70 Q 20 80, 28 90" />
        <path d="M 35 35 Q 30 50, 38 65 Q 32 75, 40 88" />
        <path d="M 65 35 Q 70 50, 62 65 Q 68 75, 60 88" />
        <path d="M 78 40 Q 82 55, 75 70 Q 80 80, 72 90" />
      </g>
    </g>
  );
};

const longStraightLayeredFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("longStraightLayered", "front", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return (
    <g>
      <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <g fill="none" stroke="black" strokeLinecap="round">
        <path d="M 50 10 C 47 17, 45 23, 44 29" opacity="0.22" strokeWidth="1.5" />
        <path d="M 23 35 C 18 52, 18 72, 21 92" opacity="0.18" strokeWidth="1.4" />
        <path d="M 77 35 C 82 52, 82 72, 79 92" opacity="0.18" strokeWidth="1.4" />
      </g>
    </g>
  );
};

// --- FRONT COMPONENTS ---

const baldFront: PartComponent = () => null;

const bobCutSharpFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("bobCutSharp", "front", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const spikyMohawkFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const d = getHairPathData("spikyMohawk", "front", hatId ?? "none");
  const hairColor = fill || "var(--avatar-hair, #000)";
  const hasPhysicalHat = isPhysicalHat(hatId);
  if (!d && !hasPhysicalHat) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1, hatId)}>
      {d ? <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /> : null}
    </g>
  );
};

const largeAfroFront: PartComponent = () => null;

const sweptFringeFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("sweptFringe", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const singleTopKnotFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const hasPhysicalHat = isPhysicalHat(hatId);
  const d = getHairPathData("singleTopKnot", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1, hatId)}>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      {!hasPhysicalHat && (
        <circle cx="50" cy="5" r="14" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      )}
    </g>
  );
};

const doubleSpaceBunsFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const hasPhysicalHat = isPhysicalHat(hatId);
  const hideBuns = isFullCoverageHat(hatId);
  const d = getHairPathData("doubleSpaceBuns", "front", hatId ?? "none");
  const hairColor = fill || "var(--avatar-hair, #000)";
  if (hideBuns) {
    if (!d) return null;
    return (
      <g transform={getHeadHairTransform(headId, hairId, -1, hatId)}>
        <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" />
      </g>
    );
  }
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1, hatId)}>
      {d ? <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" /> : null}
      {!hasPhysicalHat && (
        <>
          <circle cx="15" cy="12" r="11" fill={hairColor} stroke="currentColor" strokeWidth="2" />
          <circle cx="85" cy="12" r="11" fill={hairColor} stroke="currentColor" strokeWidth="2" />
        </>
      )}
    </g>
  );
};

const sidePartShortFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("sidePartShort", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const jaggedFringeBobFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("jaggedFringeBob", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const bowlCutRoundFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("bowlCutRound", "front", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" />;
};

const messySideSweptFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("messySideSwept", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const roundedCurlsFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("roundedCurls", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const shortJaggedCropFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("shortJaggedCrop", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const aviatorFlapsFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("aviatorFlaps", "front", hatId ?? "none");
  if (!d) return null;
  const hasPhysicalHat = isPhysicalHat(hatId);
  const clipY = hasPhysicalHat ? 32 : 22;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <rect x="12" y={clipY} width="10" height="4" rx="2" fill="#ff6b6b" stroke="currentColor" strokeWidth="1.5" />
      <rect x="78" y={clipY} width="10" height="4" rx="2" fill="#ff6b6b" stroke="currentColor" strokeWidth="1.5" />
    </g>
  );
};

const flatTopShortFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("flatTopShort", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const crewCutFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("crewCut", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const caesarCropFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("caesarCrop", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const fadeCropFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("fadeCrop", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <path d="M 21 31 Q 50 38, 79 31" fill="none" stroke="white" opacity="0.14" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
};

const undercutFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("undercut", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const slickBackFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("slickBack", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <g stroke="black" opacity="0.14" strokeWidth="1.3" strokeLinecap="round" fill="none">
        <path d="M 29 17 Q 40 20, 48 31" />
        <path d="M 45 13 Q 54 20, 60 33" />
        <path d="M 61 14 Q 70 21, 76 34" />
      </g>
    </g>
  );
};

const curtainsFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("curtains", "front", hatId ?? "none");
  if (!d) return null;
  const hasPhysicalHat = isPhysicalHat(hatId);
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {!hasPhysicalHat && (
        <path d="M 50 20 L 50 51" fill="none" stroke="black" opacity="0.18" strokeWidth="1.4" strokeLinecap="round" />
      )}
    </g>
  );
};

const shortWavesFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("shortWaves", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <g stroke="black" opacity="0.18" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d="M 25 22 Q 32 17, 39 22 T 53 22 T 67 22 T 79 22" />
        <path d="M 22 30 Q 30 26, 38 30 T 54 30 T 70 30" />
      </g>
    </g>
  );
};

const messyShortFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("messyShort", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const buzzCutFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const d = getHairPathData("buzzCut", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1, hatId)}>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
    </g>
  );
};

const sharpBobYellowHighlightFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("sharpBobYellowHighlight", "front", hatId ?? "none");
  const highlight = getHairHighlightPath("sharpBobYellowHighlight", hatId ?? "none");
  if (!d) return null;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      {highlight && <path d={highlight} fill="#FDE68A" stroke="black" strokeWidth="1.5" />}
    </g>
  );
};

const roundedMiddlePartFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("roundedMiddlePart", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const trapezoidCutFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("trapezoidCut", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const texturedPompadourFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("texturedPompadour", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const largeHairBowFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("largeHairBow", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const detailedHairBowFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("detailedHairBow", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const puffyMiddlePartFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("puffyMiddlePart", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const heartMiddlePartFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("heartMiddlePart", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const longLocsFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("longLocs", "front", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  const hasPhysicalHat = isPhysicalHat(hatId);
  return (
    <g>
      <path d={d} fill={hairColor} stroke="black" strokeWidth="1" />
      {!hasPhysicalHat && (
        <>
      <path d="M 25 15 Q 50 8, 75 15" fill="none" stroke="black" opacity="0.1" strokeWidth="2" strokeLinecap="round" />
      <g stroke="rgba(0,0,0,0.3)" strokeWidth="6.5" strokeLinecap="round" fill="none">
        <path d="M 12 30 Q 8 55, 10 95" />
        <path d="M 24 26 Q 20 55, 22 90" />
        <path d="M 88 30 Q 92 55, 90 95" />
        <path d="M 76 26 Q 80 55, 78 90" />
      </g>
      <g stroke={hairColor} strokeWidth="4.5" strokeLinecap="round" fill="none">
        <path d="M 12 30 Q 8 55, 10 95" />
        <path d="M 18 28 Q 14 55, 16 95" />
        <path d="M 24 26 Q 20 55, 22 90" />
      </g>
      <g stroke={hairColor} strokeWidth="4.5" strokeLinecap="round" fill="none">
        <path d="M 88 30 Q 92 55, 90 95" />
        <path d="M 82 28 Q 86 55, 84 95" />
        <path d="M 76 26 Q 80 55, 78 90" />
      </g>
        </>
      )}
    </g>
  );
};

const lowPonytailFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const d = getHairPathData("lowPonytail", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1, hatId)}>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
    </g>
  );
};

const shortCurlyBobFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("shortCurlyBob", "front", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #E8C872)";
  return (
    <g>
      <path d={d} fill={hairColor} stroke="black" strokeWidth="1.5" />
      <path d="M 28 18 Q 35 12, 42 18 M 58 18 Q 65 12, 72 18" fill="none" stroke="black" opacity="0.12" strokeWidth="1" />
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
  createAvatarItem({ id: "crewCut", name: "Crew Cut", svg: crewCutFront, backSvg: crewCutBack }),
  createAvatarItem({ id: "caesarCrop", name: "Caesar Crop", svg: caesarCropFront, backSvg: caesarCropBack }),
  createAvatarItem({ id: "fadeCrop", name: "Fade Crop", svg: fadeCropFront, backSvg: fadeCropBack }),
  createAvatarItem({ id: "undercut", name: "Undercut", svg: undercutFront, backSvg: undercutBack }),
  createAvatarItem({ id: "slickBack", name: "Slick Back", svg: slickBackFront, backSvg: slickBackBack }),
  createAvatarItem({ id: "curtains", name: "Curtains", svg: curtainsFront, backSvg: curtainsBack }),
  createAvatarItem({ id: "shortWaves", name: "Short Waves", svg: shortWavesFront, backSvg: shortWavesBack }),
  createAvatarItem({ id: "messyShort", name: "Messy Short", svg: messyShortFront, backSvg: messyShortBack }),
  createAvatarItem({ id: "shortJaggedCrop", name: "Jagged Crop", svg: shortJaggedCropFront, backSvg: shortJaggedCropBack }),
  createAvatarItem({ id: "sidePartShort", name: "Side Part", svg: sidePartShortFront, backSvg: sidePartShortBack }),
  createAvatarItem({ id: "bobCutSharp", name: "Sharp Bob", svg: bobCutSharpFront, backSvg: bobCutSharpBack }),
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
  createAvatarItem({ id: "aviatorFlaps", name: "Aviator Flaps", svg: aviatorFlapsFront, backSvg: aviatorFlapsBack }),
  createAvatarItem({ id: "texturedPompadour", name: "Pompadour", svg: texturedPompadourFront, backSvg: texturedPompadourBack }),
  createAvatarItem({ id: "largeHairBow", name: "Large Bow", svg: largeHairBowFront, backSvg: largeHairBowBack }),
  createAvatarItem({ id: "detailedHairBow", name: "Detailed Bow", svg: detailedHairBowFront, backSvg: detailedHairBowBack }),
];

export const HairBack: PartRegistry<HairId> = Object.fromEntries(
  HairItems.map((item) => [item.id, { component: item.backSvg || (() => null), label: item.name }]),
) as PartRegistry<HairId>;

export const HairFront: PartRegistry<HairId> = Object.fromEntries(
  HairItems.map((item) => [item.id, { component: item.svg, label: item.name }]),
) as PartRegistry<HairId>;

export function HairOnHatOverlay({
  hairId,
  hatId,
  fill,
}: {
  hairId?: string;
  hatId?: string;
  fill?: string;
}): ReactNode {
  if (!isPhysicalHat(hatId) || isFullCoverageHat(hatId) || !hairId) {
    return null;
  }
  const hairColor = fill || "var(--avatar-hair, #000)";
  if (hairId === "singleTopKnot") {
    return (
      <g className="hair-on-hat">
        <circle cx="50" cy="8" r="12" fill={hairColor} stroke="currentColor" strokeWidth="2" />
        <path
          d="M 44 4 A 5 4 0 0 1 54 2"
          fill="none"
          stroke="white"
          opacity="0.28"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    );
  }
  if (hairId === "spikyMohawk") {
    return (
      <g className="hair-on-hat">
        <path
          d="M 8 18 L 2 40 L 8 66 L 18 52 L 16 28 Z"
          fill={hairColor}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 92 18 L 98 40 L 92 66 L 82 52 L 84 28 Z"
          fill={hairColor}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    );
  }
  return null;
}
