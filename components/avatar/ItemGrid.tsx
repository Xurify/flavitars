import React from "react";
import { CheckIcon } from "lucide-react";
import { AvatarState, CategoryConfig } from "@/lib/avatar/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/strings";
import { AvatarSvg } from "./AvatarSvg";

interface ItemGridProps {
  category: CategoryConfig;
  state: AvatarState;
  selectedId: string;
  onSelect: (itemId: string) => void;
}

/** Items a category actually offers in the editor (preset-only parts are hidden). */
export const getVisibleItemIds = (category: CategoryConfig) =>
  category.sortedKeys.filter(
    (itemId) => category.items[itemId] && !category.items[itemId].presetOnly
  );

/**
 * Each tile is the user's own avatar with one item swapped in, drawn in the same frame and at the
 * same scale as the main preview. Tiles render flat (no texture) except in the Texture category, and
 * hair tiles drop the hat so the styles can be told apart.
 */
const previewState = (
  state: AvatarState,
  category: CategoryConfig,
  itemId: string
): AvatarState => ({
  ...state,
  ...(category.id === "hair" && { hat: "none" }),
  [category.stateKey]: itemId,
  texture: category.id === "texture" ? (itemId as AvatarState["texture"]) : "none",
});

interface ItemTileProps {
  label: string;
  itemId: string;
  state: AvatarState;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
}

const ItemTile = React.memo<ItemTileProps>(({ label, itemId, state, isSelected, onSelect }) => (
  <Tooltip delayDuration={120}>
    <TooltipTrigger asChild>
      <button
        type="button"
        onClick={() => onSelect(itemId)}
        aria-label={label}
        aria-pressed={isSelected}
        className={cn(
          "group relative aspect-square w-full rounded-xl overflow-hidden transition-all duration-150 cursor-pointer select-none",
          isSelected
            ? "bg-white ring-2 ring-primary ring-offset-2 border border-primary/40 shadow-xs"
            : "bg-white/90 border border-border/80 hover:border-foreground/30 hover:bg-white hover:shadow-xs active:scale-[0.98]"
        )}
      >
        <AvatarSvg state={state} className="h-full w-full text-slate-900 pointer-events-none" />
        {isSelected && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white shadow-xs">
            <CheckIcon className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
        )}
      </button>
    </TooltipTrigger>
    <TooltipContent side="top">{label}</TooltipContent>
  </Tooltip>
));
ItemTile.displayName = "ItemTile";

export const ItemGrid: React.FC<ItemGridProps> = ({
  category,
  state,
  selectedId,
  onSelect,
}): React.JSX.Element => (
  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 p-1">
    {getVisibleItemIds(category).map((itemId) => (
      <ItemTile
        key={itemId}
        itemId={itemId}
        label={category.items[itemId].label}
        state={previewState(state, category, itemId)}
        isSelected={selectedId === itemId}
        onSelect={onSelect}
      />
    ))}
  </div>
);
