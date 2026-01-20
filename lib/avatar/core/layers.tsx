import React from "react";
import { AvatarState } from "../types";
import { resolveAvatarColors, resolveAvatarParts, resolveAvatarLogic } from "../../utils/avatar-resolver";
import { getHeadFacialTransform, getHatClipZone } from "../parts";

interface AvatarLayersProps {
  state: AvatarState;
  filterId: string;
}

export const AvatarLayers: React.FC<AvatarLayersProps> = ({ state, filterId }) => {
  const { skinTone, hairColor, hatColor, accessoryColor, bodyColor, facialFeaturesColor } = resolveAvatarColors(state);
  const { HeadShape, EyebrowSet, EyeSet, NoseSet, MouthSet, ExtraSet, HairBackSet, HairFrontSet, AccessorySet, HatSet, BodySet } =
    resolveAvatarParts(state);

  const { isSkiMask } = resolveAvatarLogic(state);
  
  // Get the hat's clip zone (new physics system)
  const clipZone = getHatClipZone(state.hat);
  const hasHat = state.hat && state.hat !== "none";
  const shouldClipHair = hasHat && clipZone.hidesHair;
  
  // The mask ID for this hat's clip zone
  const hairClipMaskId = shouldClipHair ? `${filterId}-hair-clip-mask` : undefined;

  return (
    <g filter={`url(#${filterId}-wobble)`}>
      {/* LAYER 1: Back Hair - flows behind head, clipped by hat zone */}
      <g mask={hairClipMaskId ? `url(#${hairClipMaskId})` : undefined} className="hair-back-set">
        <HairBackSet fill={hairColor} hatId={state.hat} headId={state.head} hairId={state.hair} />
      </g>

      {/* LAYER 2: Body/Neck */}
      <g className="body-set" style={{ color: bodyColor }}>
        <BodySet headId={state.head} hatId={state.hat} skinTone={skinTone} />
      </g>

      {/* LAYER 3: Head + Face */}
      <g mask={state.hat === "astronautHelmet" ? `url(#${filterId}-astronaut-glass-mask)` : undefined}>
        <g className="head-group">
          <HeadShape fill={skinTone} headId={state.head} hatId={state.hat} />

          {/* Facial Features */}
          {!isSkiMask && (
            <g style={{ color: facialFeaturesColor }} transform={getHeadFacialTransform(state.head)}>
              <ExtraSet headId={state.head} hatId={state.hat} />
              <EyebrowSet headId={state.head} hatId={state.hat} />
              <EyeSet headId={state.head} hatId={state.hat} />
              <NoseSet headId={state.head} hatId={state.hat} />
              <MouthSet headId={state.head} hatId={state.hat} />
            </g>
          )}
        </g>
      </g>

      {/* LAYER 4: Front Hair - clipped by hat zone to prevent overflow */}
      <g mask={hairClipMaskId ? `url(#${hairClipMaskId})` : undefined} className="hair-front-set">
        <HairFrontSet fill={hairColor} hatId={state.hat} headId={state.head} hairId={state.hair} />
      </g>

      {/* LAYER 5: Accessories (glasses, earrings, etc.) */}
      {(!isSkiMask || state.accessories === "headphones") && (
        <g transform={getHeadFacialTransform(state.head)}>
          <AccessorySet
            headId={state.head}
            hatId={state.hat}
            fill={hairColor}
            secondaryFill={accessoryColor}
            accessoryColorId={state.accessoryColor}
          />
        </g>
      )}

      {/* LAYER 6: Hat on top of everything */}
      <HatSet fill={hatColor} headId={state.head} hatId={state.hat} />
    </g>
  );
};
