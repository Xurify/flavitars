"use client";

import React, { useId } from "react";
import { AvatarState } from "@/lib/avatar/types";
import { resolveAvatarColors } from "@/lib/utils/avatar-resolver";
import { AvatarFilters } from "@/lib/avatar/core/filters";
import { ClickableAvatarLayers } from "./ClickableAvatarLayers";
import { SelectedPart } from "@/lib/svg-editor/part-data";
import { cn } from "@/lib/utils/strings";

interface ClickableAvatarPreviewProps {
  state: AvatarState;
  selectedPart: SelectedPart | null;
  onPartSelect: (part: SelectedPart) => void;
  size?: "sm" | "md" | "lg" | "xl" | "preview" | "editor";
  className?: string;
  showBackground?: boolean;
  showHoverEffects?: boolean;
  previewMode?: "full" | "head-only";
  pathOverride?: {
    path: string;
    layer: "front" | "back";
  };
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
  preview: "w-64 h-64",
  editor: "w-full h-full",
};

export const ClickableAvatarPreview: React.FC<ClickableAvatarPreviewProps> = ({
  state,
  selectedPart,
  onPartSelect,
  size = "preview",
  className,
  showBackground = true,
  showHoverEffects = true,
  previewMode = "full",
  pathOverride,
}) => {
  const { hairColor } = resolveAvatarColors(state);

  const baseId = useId();
  const filterId = `filter-${baseId.replace(/[^a-zA-Z0-9]/g, "")}`;

  const viewBox = previewMode === "head-only" ? "0 -10 100 85" : "0 0 100 100";

  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300",
        showBackground && "bg-zinc-900/50 border border-zinc-800 rounded-lg",
        sizeClasses[size],
        className
      )}
      style={{ "--avatar-hair": hairColor } as React.CSSProperties}
    >
      <svg
        viewBox={viewBox}
        className={cn(
          "w-full h-full text-foreground transform transition-transform duration-300",
          previewMode === "full" && "scale-[0.85] translate-y-[-5%]"
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <AvatarFilters filterId={filterId} headId={state.head} hatId={state.hat} />

        <g filter={state.texture !== "none" ? `url(#${filterId}-${state.texture})` : undefined}>
          {state.texture !== "none" && (
            <>
              <rect x="0" y="0" width="100" height="100" fill="currentColor" opacity="0.06" className="text-foreground" />
              <rect x="0" y="0" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </>
          )}

          <ClickableAvatarLayers
            state={state}
            filterId={filterId}
            selectedPart={selectedPart}
            onPartSelect={onPartSelect}
            showHoverEffects={showHoverEffects}
            pathOverride={pathOverride}
          />
        </g>
      </svg>
    </div>
  );
};

export default ClickableAvatarPreview;
