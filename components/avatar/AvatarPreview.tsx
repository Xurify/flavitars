import React, { useId } from "react";
import { AvatarState } from "@/lib/avatar/types";
import { resolveAvatarColors, resolveAvatarLogic } from "@/lib/utils/avatar-resolver";
import { AvatarFilters } from "@/lib/avatar/core/filters";
import { AvatarLayers } from "@/lib/avatar/core/layers";
import { cn } from "@/lib/utils/strings";

interface AvatarPreviewProps {
  state: AvatarState;
  size?: "sm" | "md" | "lg" | "xl" | "preview";
  className?: string;
  showBackground?: boolean;
  centered?: boolean;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
  preview: "w-64 h-64",
};

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  state,
  size = "preview",
  className,
  showBackground = true,
  centered = false,
}) => {
  const { hairColor } = resolveAvatarColors(state);
  const { clippingY } = resolveAvatarLogic(state);

  const baseId = useId();
  const filterId = `filter-${baseId.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300",
        showBackground && "bg-card border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        sizeClasses[size],
        className
      )}
      style={{ "--avatar-hair": hairColor } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "w-full h-full text-foreground transform transition-transform duration-300",
          !centered && "scale-[0.85] translate-y-[-5%]"
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <AvatarFilters filterId={filterId} clippingY={clippingY} headId={state.head} hatId={state.hat} />

        <g
          filter={
            state.texture !== "none" ? `url(#${filterId}-${state.texture})` : undefined
          }
        >
          {state.texture !== "none" && (
            <>
              <rect x="0" y="0" width="100" height="100" fill="currentColor" opacity="0.06" className="text-foreground" />
              <rect x="0" y="0" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </>
          )}

          <AvatarLayers state={state} filterId={filterId} />
        </g>
      </svg>
    </div>
  );
};

export default AvatarPreview;
