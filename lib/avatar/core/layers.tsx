import React from "react";
import { AvatarState } from "../types";
import { resolveAvatarColors, resolveAvatarParts, resolveAvatarLogic } from "../../utils/avatar-resolver";
import { getHatClipZone, getHeadFacialTransform } from "../parts";
import { HairOnHatOverlay } from "../parts/hair";

interface AvatarLayersProps {
  state: AvatarState;
  filterId: string;
}

export const AvatarLayers: React.FC<AvatarLayersProps> = ({ state, filterId }) => {
  const { skinTone, hairColor, hatColor, accessoryColor, bodyColor, facialFeaturesColor } = resolveAvatarColors(state);
  const { HeadShape, EyebrowSet, EyeSet, NoseSet, MouthSet, ExtraSet, HairBackSet, HairFrontSet, AccessorySet, HatSet, BodySet } =
    resolveAvatarParts(state);

  const { isSkiMask } = resolveAvatarLogic(state);
  const hatClip = getHatClipZone(state.hat);
  const hideAllHair = Boolean(hatClip.hideAllHair);
  const hatHidesHair = hatClip.hidesHair && Boolean(hatClip.clipPath);
  const hairMask = !hideAllHair && hatHidesHair ? `url(#${filterId}-hair-clip-mask)` : undefined;

  return (
    <g>
      {/* LAYER 1: Back hair is the volume around the hat. Clip the hat footprint so hair cannot sit in hollows. */}
      {!hideAllHair && (
      <g mask={hairMask} className="hair-back-set">
        <HairBackSet fill={hairColor} hatId={state.hat} headId={state.head} hairId={state.hair} />
      </g>
      )}

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

      {/* LAYER 4: Front hair tucked under the hat crown */}
      {!hideAllHair && (
      <g mask={hairMask} className="hair-front-set">
        <HairFrontSet fill={hairColor} hatId={state.hat} headId={state.head} hairId={state.hair} />
      </g>
      )}

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
      <HatSet fill={hatColor} headId={state.head} hatId={state.hat} hairId={state.hair} />
      {!hideAllHair && <HairOnHatOverlay hairId={state.hair} hatId={state.hat} fill={hairColor} />}
    </g>
  );
};
