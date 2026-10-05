import React from "react";
import { AvatarState } from "@/lib/avatar/types";
import { resolveAvatarColors } from "@/lib/utils/avatar-resolver";
import { cn } from "@/lib/utils/strings";
import { AvatarSvg } from "./AvatarSvg";

interface AvatarPreviewProps {
  state: AvatarState;
  size?: "sm" | "md" | "lg" | "xl" | "preview";
  className?: string;
  showBackground?: boolean;
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
}): React.JSX.Element => {
  const { hairColor } = resolveAvatarColors(state);

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
      <AvatarSvg state={state} className="w-full h-full text-foreground" />
    </div>
  );
};

export default AvatarPreview;
