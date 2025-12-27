import React from "react";
import { AvatarState } from "../types";
import { resolveAvatarColors, resolveAvatarParts, resolveAvatarLogic } from "../../utils/avatar-resolver";
import { getHeadFacialTransform, HATS_THAT_CAN_CONTAIN_HAIR } from "../parts";
import { LONG_HAIR_STYLES } from "../config/constants";

interface AvatarLayersProps {
  state: AvatarState;
  filterId: string;
}

export const AvatarLayers: React.FC<AvatarLayersProps> = ({ state, filterId }) => {
  const { skinTone, hairColor, hatColor, accessoryColor, bodyColor, facialFeaturesColor } = resolveAvatarColors(state);
  const { HeadShape, EyebrowSet, EyeSet, NoseSet, MouthSet, ExtraSet, HairBackSet, HairFrontSet, AccessorySet, HatSet, BodySet } =
    resolveAvatarParts(state);
  const { shouldClipHead, isSkiMask } = resolveAvatarLogic(state);

  const isLongHair = LONG_HAIR_STYLES.includes(state.hair);
  const isHatContainingHair = state.hat && HATS_THAT_CAN_CONTAIN_HAIR.includes(state.hat) && state.containHair && !isLongHair;

  return (
    <g filter={`url(#${filterId}-wobble)`}>
      {/* Hair Back */}
      <g
        clipPath={isHatContainingHair && state.hat !== "astronautHelmet" ? `url(#${filterId}-head-shape)` : undefined}
        className="hair-back-set"
      >
        <HairBackSet fill={hairColor} hatId={state.hat} headId={state.head} hairId={state.hair} />
      </g>

      {/* Body */}
      <g style={{ color: bodyColor }} className="body-set">
        <BodySet headId={state.head} hatId={state.hat} skinTone={skinTone} />
      </g>

      <g mask={state.hat === "astronautHelmet" ? `url(#${filterId}-astronaut-glass-mask)` : undefined}>
        <g className="head-group">
          <g clipPath={shouldClipHead ? `url(#${filterId}-head-clip)` : undefined}>
            <HeadShape fill={skinTone} headId={state.head} hatId={state.hat} />
          </g>
          {!isSkiMask && (
            <g style={{ color: facialFeaturesColor }} transform={getHeadFacialTransform(state.head)}>
              <ExtraSet headId={state.head} hatId={state.hat} />
              <EyebrowSet headId={state.head} hatId={state.hat} />
              <EyeSet headId={state.head} hatId={state.hat} />
              <NoseSet headId={state.head} hatId={state.hat} />
              <MouthSet headId={state.head} hatId={state.hat} />
            </g>
          )}
          <g clipPath={isHatContainingHair && state.hat !== "astronautHelmet" ? `url(#${filterId}-head-shape)` : undefined}>
            <HairFrontSet fill={hairColor} hatId={state.hat} headId={state.head} hairId={state.hair} />
          </g>
        </g>

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
      </g>
      <HatSet fill={hatColor} headId={state.head} hatId={state.hat} />
    </g>
  );
};
