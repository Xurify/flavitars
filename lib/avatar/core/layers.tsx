import React from "react";
import { AvatarState } from "../types";
import { resolveAvatarColors, resolveAvatarParts, resolveAvatarFit } from "../../utils/avatar-resolver";
import { getHeadFacialTransform } from "../anatomy";
import { Ears, Neck } from "../parts/head";
import { HairBackView, HairFrontView, HairSpec } from "../parts/hair-engine";

export type LayerCategory = "hair" | "body" | "head" | "extras" | "eyebrows" | "eyes" | "nose" | "mouth" | "accessories" | "hat";

export interface LayerSlot {
  category: LayerCategory;
  partId: string;
  layer?: "front" | "back";
}

interface AvatarLayersProps {
  state: AvatarState;
  filterId: string;
  /** Lets tools (e.g. the path editor) wrap each part, for hit-testing or highlighting. */
  wrap?: (slot: LayerSlot, node: React.ReactNode) => React.ReactNode;
  /** Renders the hair from this spec instead of the registry (live editing). */
  hairSpec?: HairSpec;
}

const passThrough = (_slot: LayerSlot, node: React.ReactNode) => node;

/**
 * Paint order, back to front: back hair → neck + body → ears, head, face → front hair →
 * accessories → hat. When a fitted hat is worn, the head and hair above its seat line are
 * clipped away so nothing pokes through the hat.
 */
export const AvatarLayers: React.FC<AvatarLayersProps> = ({ state, filterId, wrap = passThrough, hairSpec }) => {
  const { skinTone, hairColor, hatColor, accessoryColor, bodyColor, facialFeaturesColor } = resolveAvatarColors(state);
  const { HeadShape, EyebrowSet, EyeSet, NoseSet, MouthSet, ExtraSet, HairBackSet, HairFrontSet, AccessorySet, HatSet, BodySet } =
    resolveAvatarParts(state);
  const fit = resolveAvatarFit(state, hairSpec);

  const uid = filterId;
  const keepId = `${uid}-hat-keep`;
  const outlineId = `${uid}-body-outline`;
  const headClip = fit.keep && fit.clipHead ? `url(#${keepId})` : undefined;
  const common = { headId: state.head, hatId: state.hat, hairId: state.hair, uid } as const;
  const hairProps = { fill: hairColor, keep: fit.keep, ...common };

  const accessories =
    fit.showAccessories &&
    wrap(
      { category: "accessories", partId: state.accessories },
      <g transform={getHeadFacialTransform(state.head)} className="accessory-set">
        <AccessorySet
          fill={hairColor}
          secondaryFill={accessoryColor}
          accessoryColorId={state.accessoryColor}
          hairTop={fit.hairTop}
          {...common}
        />
      </g>,
    );

  return (
    <g>
      <defs>
        {fit.keep && (
          <clipPath id={keepId}>
            <path d={fit.keep} />
          </clipPath>
        )}
        <filter id={outlineId} filterUnits="userSpaceOnUse" x="-20" y="40" width="140" height="120">
          <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="spread" />
          <feFlood floodColor="currentColor" />
          <feComposite in2="spread" operator="in" result="outline" />
          <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {fit.showHair &&
        wrap(
          { category: "hair", partId: state.hair, layer: "back" },
          <g className="hair-back-set">
            {hairSpec ? <HairBackView spec={hairSpec} {...hairProps} /> : <HairBackSet {...hairProps} />}
          </g>,
        )}

      {wrap(
        { category: "body", partId: state.body },
        <g className="body-set" filter={`url(#${outlineId})`}>
          <Neck fill={skinTone} {...common} />
          <BodySet skinTone={skinTone} secondaryFill={bodyColor} {...common} />
        </g>,
      )}

      <g clipPath={headClip} className="head-group">
        {wrap(
          { category: "head", partId: state.head },
          <g>
            {fit.showEars && <Ears fill={skinTone} {...common} />}
            <HeadShape fill={skinTone} {...common} />
          </g>,
        )}
        <g style={{ color: facialFeaturesColor }} transform={getHeadFacialTransform(state.head)}>
          {wrap({ category: "extras", partId: state.extras }, <ExtraSet {...common} />)}
          {wrap({ category: "eyebrows", partId: state.eyebrows }, <EyebrowSet {...common} />)}
          {wrap({ category: "eyes", partId: state.eyes }, <EyeSet {...common} />)}
          {wrap({ category: "nose", partId: state.nose }, <NoseSet {...common} />)}
          {wrap({ category: "mouth", partId: state.mouth }, <MouthSet {...common} />)}
        </g>
      </g>

      {fit.showHair &&
        wrap(
          { category: "hair", partId: state.hair, layer: "front" },
          <g className="hair-front-set">
            {hairSpec ? <HairFrontView spec={hairSpec} {...hairProps} /> : <HairFrontSet {...hairProps} />}
          </g>,
        )}

      {!fit.accessoriesOverHat && accessories}

      {wrap(
        { category: "hat", partId: state.hat },
        <g className="hat-set">
          <HatSet fill={hatColor} hairTop={fit.hairTop} hairPeak={fit.hairPeak} {...common} />
        </g>,
      )}

      {fit.accessoriesOverHat && accessories}
    </g>
  );
};
