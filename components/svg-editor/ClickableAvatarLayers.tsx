"use client";

import React, { useState } from "react";
import { AvatarState } from "@/lib/avatar/types";
import { AvatarLayers, AvatarOverlays, LayerSlot } from "@/lib/avatar/core/layers";
import { getHairSpec } from "@/lib/avatar/parts/hair";
import { HairLayer } from "@/lib/avatar/parts/hair-paths";
import { PartCategory, SelectedPart, PartLayer } from "@/lib/svg-editor/part-data";

interface ClickableAvatarLayersProps {
  state: AvatarState;
  filterId: string;
  selectedPart: SelectedPart | null;
  onPartSelect: (part: SelectedPart) => void;
  showHoverEffects?: boolean;
  pathOverride?: {
    path: string;
    layer: HairLayer;
  };
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
  pathOverride,
}) => {
  const hairSpec = pathOverride ? { ...getHairSpec(state.hair), [pathOverride.layer]: pathOverride.path } : undefined;

  const isPartSelected = (category: PartCategory, layer?: PartLayer) => {
    if (!selectedPart) return false;
    if (selectedPart.category !== category) return false;
    if (layer && selectedPart.layer !== layer) return false;
    return true;
  };

  const wrap = (slot: LayerSlot, node: React.ReactNode) => (
    <ClickableLayer
      category={slot.category}
      partId={slot.partId}
      layer={slot.layer}
      isSelected={isPartSelected(slot.category, slot.layer)}
      onSelect={onPartSelect}
      showHoverEffects={showHoverEffects}
    >
      {node}
    </ClickableLayer>
  );

  return (
    <g filter={`url(#${filterId}-wobble)`}>
      <AvatarLayers state={state} filterId={filterId} wrap={wrap} hairSpec={hairSpec} />
    </g>
  );
};

export const ClickableAvatarOverlays: React.FC<ClickableAvatarLayersProps> = ({
  state,
  filterId,
  selectedPart,
  onPartSelect,
  showHoverEffects = true,
}) => {
  const isPartSelected = (category: PartCategory, layer?: PartLayer) => {
    if (!selectedPart) return false;
    if (selectedPart.category !== category) return false;
    if (layer && selectedPart.layer !== layer) return false;
    return true;
  };

  const wrap = (slot: LayerSlot, node: React.ReactNode) => (
    <ClickableLayer
      category={slot.category}
      partId={slot.partId}
      layer={slot.layer}
      isSelected={isPartSelected(slot.category, slot.layer)}
      onSelect={onPartSelect}
      showHoverEffects={showHoverEffects}
    >
      {node}
    </ClickableLayer>
  );

  return (
    <g filter={`url(#${filterId}-wobble)`}>
      <AvatarOverlays state={state} filterId={filterId} wrap={wrap} />
    </g>
  );
};

export default ClickableAvatarLayers;
