"use client";

import React, { useState } from "react";
import { AvatarState } from "@/lib/avatar/types";
import { resolveAvatarColors, resolveAvatarParts, resolveAvatarLogic } from "@/lib/utils/avatar-resolver";
import { getHeadFacialTransform, getHatClipZone } from "@/lib/avatar/parts";
import { PartCategory, SelectedPart, PartLayer } from "@/lib/svg-editor/part-data";

interface ClickableAvatarLayersProps {
  state: AvatarState;
  filterId: string;
  selectedPart: SelectedPart | null;
  onPartSelect: (part: SelectedPart) => void;
  showHoverEffects?: boolean;
}

interface ClickableLayerProps {
  category: PartCategory;
  partId: string;
  layer?: PartLayer;
  isSelected: boolean;
  onSelect: (part: SelectedPart) => void;
  showHoverEffects: boolean;
  children: React.ReactNode;
  className?: string;
}

const ClickableLayer: React.FC<ClickableLayerProps> = ({
  category,
  partId,
  layer,
  isSelected,
  onSelect,
  showHoverEffects,
  children,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect({ category, id: partId, layer });
  };

  return (
    <g
      className={className}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: "pointer",
        transition: "filter 0.15s ease-out",
        filter: isSelected
          ? "drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))"
          : showHoverEffects && isHovered
          ? "drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))"
          : undefined,
      }}
      data-part-category={category}
      data-part-id={partId}
      data-part-layer={layer}
    >
      {children}
    </g>
  );
};

export const ClickableAvatarLayers: React.FC<ClickableAvatarLayersProps> = ({
  state,
  filterId,
  selectedPart,
  onPartSelect,
  showHoverEffects = true,
}) => {
  const { skinTone, hairColor, hatColor, accessoryColor, bodyColor, facialFeaturesColor } = resolveAvatarColors(state);
  const {
    HeadShape,
    EyebrowSet,
    EyeSet,
    NoseSet,
    MouthSet,
    ExtraSet,
    HairBackSet,
    HairFrontSet,
    AccessorySet,
    HatSet,
    BodySet,
  } = resolveAvatarParts(state);

  const { isSkiMask } = resolveAvatarLogic(state);

  const clipZone = getHatClipZone(state.hat);
  const hasHat = state.hat && state.hat !== "none";
  const shouldClipHair = hasHat && clipZone.hidesHair;
  const hairClipMaskId = shouldClipHair ? `${filterId}-hair-clip-mask` : undefined;

  const isPartSelected = (category: PartCategory, layer?: PartLayer) => {
    if (!selectedPart) return false;
    if (selectedPart.category !== category) return false;
    if (layer && selectedPart.layer !== layer) return false;
    return true;
  };

  return (
    <g filter={`url(#${filterId}-wobble)`}>
      <ClickableLayer
        category="hair"
        partId={state.hair}
        layer="back"
        isSelected={isPartSelected("hair", "back")}
        onSelect={onPartSelect}
        showHoverEffects={showHoverEffects}
        className="hair-back-set"
      >
        <g mask={hairClipMaskId ? `url(#${hairClipMaskId})` : undefined}>
          <HairBackSet fill={hairColor} hatId={state.hat} headId={state.head} hairId={state.hair} />
        </g>
      </ClickableLayer>

      <ClickableLayer
        category="body"
        partId={state.body}
        isSelected={isPartSelected("body")}
        onSelect={onPartSelect}
        showHoverEffects={showHoverEffects}
        className="body-set"
      >
        <g style={{ color: bodyColor }}>
          <BodySet headId={state.head} hatId={state.hat} skinTone={skinTone} />
        </g>
      </ClickableLayer>

      <g mask={state.hat === "astronautHelmet" ? `url(#${filterId}-astronaut-glass-mask)` : undefined}>
        <ClickableLayer
          category="head"
          partId={state.head}
          isSelected={isPartSelected("head")}
          onSelect={onPartSelect}
          showHoverEffects={showHoverEffects}
          className="head-group"
        >
          <HeadShape fill={skinTone} headId={state.head} hatId={state.hat} />
        </ClickableLayer>

        {!isSkiMask && (
          <g style={{ color: facialFeaturesColor }} transform={getHeadFacialTransform(state.head)}>
            <ClickableLayer
              category="extras"
              partId={state.extras}
              isSelected={isPartSelected("extras")}
              onSelect={onPartSelect}
              showHoverEffects={showHoverEffects}
            >
              <ExtraSet headId={state.head} hatId={state.hat} />
            </ClickableLayer>

            <ClickableLayer
              category="eyebrows"
              partId={state.eyebrows}
              isSelected={isPartSelected("eyebrows")}
              onSelect={onPartSelect}
              showHoverEffects={showHoverEffects}
            >
              <EyebrowSet headId={state.head} hatId={state.hat} />
            </ClickableLayer>

            <ClickableLayer
              category="eyes"
              partId={state.eyes}
              isSelected={isPartSelected("eyes")}
              onSelect={onPartSelect}
              showHoverEffects={showHoverEffects}
            >
              <EyeSet headId={state.head} hatId={state.hat} />
            </ClickableLayer>

            <ClickableLayer
              category="nose"
              partId={state.nose}
              isSelected={isPartSelected("nose")}
              onSelect={onPartSelect}
              showHoverEffects={showHoverEffects}
            >
              <NoseSet headId={state.head} hatId={state.hat} />
            </ClickableLayer>

            <ClickableLayer
              category="mouth"
              partId={state.mouth}
              isSelected={isPartSelected("mouth")}
              onSelect={onPartSelect}
              showHoverEffects={showHoverEffects}
            >
              <MouthSet headId={state.head} hatId={state.hat} />
            </ClickableLayer>
          </g>
        )}
      </g>

      <ClickableLayer
        category="hair"
        partId={state.hair}
        layer="front"
        isSelected={isPartSelected("hair", "front")}
        onSelect={onPartSelect}
        showHoverEffects={showHoverEffects}
        className="hair-front-set"
      >
        <g mask={hairClipMaskId ? `url(#${hairClipMaskId})` : undefined}>
          <HairFrontSet fill={hairColor} hatId={state.hat} headId={state.head} hairId={state.hair} />
        </g>
      </ClickableLayer>

      {(!isSkiMask || state.accessories === "headphones") && (
        <ClickableLayer
          category="accessories"
          partId={state.accessories}
          isSelected={isPartSelected("accessories")}
          onSelect={onPartSelect}
          showHoverEffects={showHoverEffects}
        >
          <g transform={getHeadFacialTransform(state.head)}>
            <AccessorySet
              headId={state.head}
              hatId={state.hat}
              fill={hairColor}
              secondaryFill={accessoryColor}
              accessoryColorId={state.accessoryColor}
            />
          </g>
        </ClickableLayer>
      )}

      <ClickableLayer
        category="hat"
        partId={state.hat}
        isSelected={isPartSelected("hat")}
        onSelect={onPartSelect}
        showHoverEffects={showHoverEffects}
      >
        <HatSet fill={hatColor} headId={state.head} hatId={state.hat} />
      </ClickableLayer>
    </g>
  );
};

export default ClickableAvatarLayers;
