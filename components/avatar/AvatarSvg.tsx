import React, { useId } from "react";
import { AvatarState } from "@/lib/avatar/types";
import { AvatarFilters } from "@/lib/avatar/core/filters";
import { AvatarLayers, AvatarOverlays } from "@/lib/avatar/core/layers";
import { AVATAR_FRAME, AVATAR_VIEWBOX } from "@/lib/avatar/anatomy";
import { cn } from "@/lib/utils/strings";

interface AvatarSvgProps {
  state: AvatarState;
  className?: string;
}

/**
 * An avatar in the shared frame. Every avatar on screen goes through this, so a tile in the
 * item grid is exactly the main preview at a smaller size.
 */
export const AvatarSvg: React.FC<AvatarSvgProps> = ({ state, className }) => {
  const filterId = `avatar-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const hasTexture = state.texture !== "none";

  return (
    <svg
      viewBox={AVATAR_VIEWBOX}
      className={cn("block", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <AvatarFilters filterId={filterId} headId={state.head} hatId={state.hat} />
      <g filter={hasTexture ? `url(#${filterId}-${state.texture})` : undefined}>
        {hasTexture && (
          <rect
            x={AVATAR_FRAME.x}
            y={AVATAR_FRAME.y}
            width={AVATAR_FRAME.size}
            height={AVATAR_FRAME.size}
            fill="currentColor"
            opacity="0.05"
          />
        )}
        <AvatarLayers state={state} filterId={filterId} />
      </g>
      <AvatarOverlays state={state} filterId={filterId} />
    </svg>
  );
};
