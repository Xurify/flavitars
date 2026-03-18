import { PartRegistry, PartComponent, AvatarItem, createAvatarItem } from "./common";
import { getHeadHairTransform, SMALL_HATS } from "./hats";
import { getHairPathData, getHairHighlightPath } from "./hair-paths";
import { HairIds, type HairId } from "./hair-ids";

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

const shavedSidesLongBackBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("shavedSidesLongBack", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const spikyMohawkBack: PartComponent = () => null;

const largeAfroBack: PartComponent = ({ fill, hatId }) => {
  if (hatId && hatId !== "none" && !SMALL_HATS.includes(hatId)) return null;
  const d = getHairPathData("largeAfro", "back", hatId ?? "none");
  if (!d) return null;
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      {!hatId && (
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

const singleTopKnotBack: PartComponent = () => null;

const doubleSpaceBunsBack: PartComponent = ({ fill }) => (
  <g>
    <circle cx="15" cy="12" r="13" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
    <circle cx="85" cy="12" r="13" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
  </g>
);

const sidePartShortBack: PartComponent = () => null;

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

const buzzCutBack: PartComponent = () => null;

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
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const detailedHairBowBack: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("detailedHairBow", "back", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
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
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="black" strokeWidth="1" />
      <g stroke="black" opacity="0.15" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M 22 30 V 100 M 50 25 V 100 M 78 30 V 100" />
      </g>
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
        <path d="M 25 35 V 110" />
        <path d="M 40 30 V 112" />
        <path d="M 55 28 V 112" />
        <path d="M 70 30 V 112" />
        <path d="M 85 35 V 108" />
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
      <path d="M 50 12 V 28" fill="none" stroke="black" opacity="0.15" strokeWidth="1.5" strokeLinecap="round" />
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

const shavedSidesLongBackFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("shavedSidesLongBack", "front", hatId ?? "none");
  if (!d) return null;
  const hairColor = fill || "var(--avatar-hair, #000)";
  return <path d={d} fill={hairColor} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
};

const spikyMohawkFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const hasHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  if (hasHat) return null;
  const d = getHairPathData("spikyMohawk", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1)}>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
};

const largeAfroFront: PartComponent = ({ hatId }) => {
  const hasHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  if (hasHat) return null;
  return null;
};

const sweptFringeFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("sweptFringe", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const singleTopKnotFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const hasHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  if (hasHat) return null;
  const d = getHairPathData("singleTopKnot", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1)}>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="5" r="14" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
    </g>
  );
};

const doubleSpaceBunsFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const hasHat = hatId && hatId !== "none" && !SMALL_HATS.includes(hatId);
  if (hasHat) return null;
  const d = getHairPathData("doubleSpaceBuns", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1)}>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <circle cx="15" cy="12" r="11" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <circle cx="85" cy="12" r="11" fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
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
  return (
    <g>
      <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="22" width="10" height="4" rx="2" fill="#ff6b6b" stroke="currentColor" strokeWidth="1.5" />
      <rect x="78" y="22" width="10" height="4" rx="2" fill="#ff6b6b" stroke="currentColor" strokeWidth="1.5" />
    </g>
  );
};

const flatTopShortFront: PartComponent = ({ fill, hatId }) => {
  const d = getHairPathData("flatTopShort", "front", hatId ?? "none");
  if (!d) return null;
  return <path d={d} fill={fill || "var(--avatar-hair, #000)"} stroke="currentColor" strokeWidth="2" />;
};

const buzzCutFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const d = getHairPathData("buzzCut", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1)}>
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
  return (
    <g>
      <path d={d} fill={hairColor} stroke="black" strokeWidth="1" />
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
      <g stroke="black" opacity="0.2" strokeWidth="1.2" strokeLinecap="round" fill="none">
        <path d="M 10 45 L 14 47 M 10 60 L 14 62 M 10 75 L 14 77" />
        <path d="M 16 50 L 20 52 M 16 70 L 20 72" />
        <path d="M 86 45 L 90 47 M 86 60 L 90 62 M 86 75 L 90 77" />
        <path d="M 80 50 L 84 52 M 80 70 L 84 72" />
      </g>
      <g stroke="#E5E7EB" strokeWidth="2" strokeLinecap="butt" fill="none">
        <path d="M 11.2 55 L 12.8 55.2" />
        <path d="M 10.2 78 L 11.8 78.2" />
        <path d="M 23.5 45 L 24.5 45.1" />
        <path d="M 87.2 50 L 88.8 50.2" />
        <path d="M 88.5 72 L 90.1 72.2" />
        <path d="M 77.2 62 L 78.8 62.1" />
      </g>
      <g stroke="white" opacity="0.5" strokeWidth="0.8" strokeLinecap="round" fill="none">
        <path d="M 11.5 54.8 L 12.5 55" />
        <path d="M 87.5 49.8 L 88.5 50" />
        <path d="M 77.5 61.8 L 78.5 62" />
      </g>
    </g>
  );
};

const lowPonytailFront: PartComponent = ({ fill, headId, hairId, hatId }) => {
  const d = getHairPathData("lowPonytail", "front", hatId ?? "none");
  if (!d) return null;
  return (
    <g transform={getHeadHairTransform(headId, hairId, -1)}>
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
  HairItems.map((item) => [item.id, { component: item.backSvg || (() => null), label: item.name }]),
) as PartRegistry<HairId>;

export const HairFront: PartRegistry<HairId> = Object.fromEntries(
  HairItems.map((item) => [item.id, { component: item.svg, label: item.name }]),
) as PartRegistry<HairId>;
