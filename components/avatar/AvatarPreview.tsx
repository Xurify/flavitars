import React, { useId } from "react";
import { AvatarState } from "@/lib/avatar/types";
import { resolveAvatarColors } from "@/lib/utils/avatar-resolver";
import { AvatarFilters } from "@/lib/avatar/core/filters";
import { AvatarLayers } from "@/lib/avatar/core/layers";
import { getAvatarViewBox } from "@/lib/avatar/core/view-box";
import { cn } from "@/lib/utils/strings";

interface AvatarPreviewProps {
  state: AvatarState;
  size?: "sm" | "md" | "lg" | "xl" | "preview";
  className?: string;
  showBackground?: boolean;
  centered?: boolean;
}

const sizeClasses = {
  sm: "w-12 h-12 rounded-xl",
  md: "w-20 h-20 rounded-xl",
  lg: "w-32 h-32 rounded-2xl",
  xl: "w-48 h-48 rounded-2xl",
  preview: "w-64 h-64 sm:w-72 sm:h-72 rounded-2xl",
};

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  state,
  size = "preview",
  className,
  showBackground = true,
  centered = false,
}): React.JSX.Element => {
  const { hairColor } = resolveAvatarColors(state);

  const baseId = useId();
  const filterId = `filter-${baseId.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300",
        showBackground &&
          "bg-white border border-border/80 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]",
        sizeClasses[size],
        className
      )}
      style={{ "--avatar-hair": hairColor } as React.CSSProperties}
    >
      <svg
        viewBox={getAvatarViewBox(state)}
        className={cn(
          "w-full h-full text-foreground transform transition-transform duration-300",
          !centered && "scale-[0.96] translate-y-[-1%]"
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <AvatarFilters filterId={filterId} headId={state.head} hatId={state.hat} />

        <g filter={state.texture !== "none" ? `url(#${filterId}-${state.texture})` : undefined}>
          {state.texture !== "none" && (
            <>
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                fill="currentColor"
                opacity="0.05"
                className="text-foreground"
              />
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.08"
              />
            </>
          )}

          <AvatarLayers state={state} filterId={filterId} />
        </g>
      </svg>
    </div>
  );
};

export default AvatarPreview;

