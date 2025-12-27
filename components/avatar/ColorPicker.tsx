import React from "react";
import { cn } from "@/lib/utils/strings";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

interface ColorPickerProps {
  label: string;
  colors: ColorOption[];
  selectedIndex: string;
  onSelect: (id: string) => void;
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
}) => {
  return (
    <div className={cn("space-y-2 transition-opacity duration-300", disabled && "opacity-40 pointer-events-none")}>
      <h3 className="text-[9px] font-mono font-black uppercase tracking-[0.1em] text-muted-foreground/80">{label}</h3>
      <div className="flex flex-wrap gap-1.5 relative">
        {colors.map((color) => {
          const isSelected = selectedIndex === color.id;
          const isAllowed = !allowedColorIds || allowedColorIds.includes(color.id);

          return (
            <Button
              key={color.id}
              variant={isSelected && !disabled && isAllowed ? "primary" : "default"}
              size="square"
              onClick={() => !disabled && isAllowed && onSelect(color.id)}
              disabled={disabled || !isAllowed}
              className={cn("group relative h-8 w-8 lg:h-6 lg:w-6", !isAllowed && "opacity-20 grayscale cursor-not-allowed")}
              style={{ backgroundColor: color.color }}
              title={disabled ? `${label} Disabled` : !isAllowed ? "Not available for this item" : color.name}
            >
              {isSelected && !disabled && isAllowed && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Check className="h-3 w-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]" strokeWidth={5} />
                </div>
              )}
              {!isAllowed && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <X className="h-3 w-3 text-black/40" strokeWidth={2} />
                </div>
              )}
              {disabled && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <X className="h-4 w-4 text-black/40" strokeWidth={3} />
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
