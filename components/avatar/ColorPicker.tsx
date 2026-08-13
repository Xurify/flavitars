import React from "react";
import { cn } from "@/lib/utils/strings";
import { CheckIcon, XIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

interface ColorPickerProps {
  label: string;
  colors: ColorOption[] | readonly ColorOption[];
  selectedIndex: string;
  onSelect: (colorId: string) => void;
  disabled?: boolean;
  allowedColorIds?: string[];
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  colors,
  selectedIndex,
  onSelect,
  disabled,
  allowedColorIds,
}): React.JSX.Element => {
  const activeColor = colors.find((colorOption) => colorOption.id === selectedIndex);

  return (
    <div className={cn("space-y-2.5 transition-opacity duration-200", disabled && "opacity-35 pointer-events-none")}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground/80">{label}</span>
        {activeColor && (
          <span className="text-[11px] text-muted-foreground font-medium capitalize">
            {activeColor.name}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {colors.map((colorOption) => {
          const isSelected = selectedIndex === colorOption.id;
          const isAllowed = !allowedColorIds || allowedColorIds.includes(colorOption.id);

          return (
            <Tooltip key={colorOption.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => !disabled && isAllowed && onSelect(colorOption.id)}
                  disabled={disabled || !isAllowed}
                  className={cn(
                    "group relative h-6.5 w-6.5 rounded-full transition-all duration-150 cursor-pointer select-none ring-1 ring-black/10",
                    isSelected && !disabled && isAllowed
                      ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-xs"
                      : "hover:scale-110 hover:shadow-xs",
                    !isAllowed && "opacity-25 grayscale cursor-not-allowed",
                    disabled && "cursor-not-allowed"
                  )}
                  style={{ backgroundColor: colorOption.color }}
                  aria-label={colorOption.name}
                >
                  {isSelected && !disabled && isAllowed && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <CheckIcon className="h-3 w-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" strokeWidth={3} />
                    </div>
                  )}
                  {!isAllowed && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <XIcon className="h-3 w-3 text-black/50" strokeWidth={2.5} />
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-[11px]">
                {disabled
                  ? `${label} Disabled`
                  : !isAllowed
                    ? "Not available for this item"
                    : colorOption.name}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

