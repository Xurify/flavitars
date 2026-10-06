import React from "react";
import { CheckIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { canonicalColorId, findSwatch, Palette } from "@/lib/avatar/colors";
import { cn } from "@/lib/utils/strings";

interface ColorPickerProps {
  label: string;
  /** Shown next to the label, e.g. the item the colour applies to. */
  context?: string;
  palette: Palette;
  selectedId: string;
  onSelect: (colorId: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  context,
  palette,
  selectedId,
  onSelect,
}): React.JSX.Element => {
  const activeId = canonicalColorId(palette, selectedId);
  const active = findSwatch(palette, selectedId);

  return (
    <section className="space-y-2.5">
      <header className="flex items-baseline justify-between gap-2">
        <h4 className="text-xs font-semibold text-foreground/85">
          {label}
          {context && <span className="ml-1.5 font-medium text-muted-foreground">· {context}</span>}
        </h4>
        {active && (
          <span className="text-[11px] text-muted-foreground font-medium">{active.name}</span>
        )}
      </header>

      <div className="space-y-2">
        {palette.groups.map((group) => (
          <div key={group.label} className="flex items-start gap-3">
            {palette.groups.length > 1 && (
              <span className="w-14 shrink-0 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                {group.label}
              </span>
            )}
            <div className="flex flex-wrap gap-1.5">
              {group.swatches.map((swatch) => {
                const isSelected = activeId === swatch.id;
                return (
                  <Tooltip key={swatch.id} delayDuration={120}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => onSelect(swatch.id)}
                        aria-label={swatch.name}
                        aria-pressed={isSelected}
                        className={cn(
                          "relative h-6 w-6 rounded-full transition-transform duration-150 cursor-pointer ring-1 ring-black/10",
                          isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:scale-110"
                        )}
                        style={{ backgroundColor: swatch.color }}
                      >
                        {isSelected && (
                          <CheckIcon
                            className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                            strokeWidth={3}
                          />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{swatch.name}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
