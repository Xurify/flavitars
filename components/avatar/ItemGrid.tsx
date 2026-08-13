import React from "react";
import { CheckIcon } from "lucide-react";
import { HeadId, HeadShapes } from "@/lib/avatar/parts/head";
import { PartComponent, PartDefinition } from "@/lib/avatar/parts";
import { AvatarCategory, HAIR_COLORS, ACCESSORY_ACCENT_COLORS } from "@/lib/avatar/types";
import { cn } from "@/lib/utils/strings";

interface ItemGridProps {
  items: Record<string, PartDefinition>;
  backItems?: Record<string, PartDefinition>;
  selectedIndex: string;
  onSelect: (itemId: string) => void;
  allowNone?: boolean;
  previewFill: string;
  hairFill: string;
  hatFill: string;
  skinToneFill: string;
  accessoryFill: string;
  bodyFill: string;
  accessoryColorId: string;
  hatColorId: string;
  bodyColorId: string;
  categoryId: AvatarCategory;
  headId: HeadId;
  sortedKeys: string[];
}

interface ItemPreviewProps {
  itemId: string;
  label: string;
  categoryId: AvatarCategory;
  headId: HeadId;
  ItemComponent: PartComponent;
  BackComponent?: PartComponent;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
  showMannequin?: boolean;
  skinToneFill: string;
  hatFill: string;
  hairFill: string;
  accessoryFill: string;
  bodyFill: string;
  accessoryColorId: string;
  hatColorId: string;
  bodyColorId: string;
}

const TextureFilters = (): React.JSX.Element => (
  <defs>
    <filter id="grid-noise">
      <feTurbulence baseFrequency="0.6" numOctaves="3" />
      <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 -7" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5" />
      </feComponentTransfer>
      <feBlend mode="overlay" in="SourceGraphic" />
    </filter>
    <filter id="grid-glitch">
      <feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" in="SourceGraphic" result="redChannel" />
      <feOffset dx="2" in="redChannel" result="redShift" />
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" in="SourceGraphic" result="cyanChannel" />
      <feOffset dx="-2" in="cyanChannel" result="cyanShift" />
      <feBlend mode="screen" in="redShift" in2="cyanShift" />
    </filter>
    <filter id="grid-halftone">
      <feTurbulence baseFrequency="1.5" numOctaves="1" result="turbulenceResult" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 20 -10"
        in="turbulenceResult"
        result="stipplingResult"
      />
      <feComposite in="SourceGraphic" in2="stipplingResult" operator="in" />
    </filter>
  </defs>
);

const ItemPreview = React.memo<ItemPreviewProps>(({
  itemId,
  label,
  categoryId,
  headId,
  ItemComponent,
  BackComponent,
  isSelected,
  onSelect,
  showMannequin,
  skinToneFill,
  hatFill,
  hairFill,
  accessoryFill,
  bodyFill,
  accessoryColorId,
  hatColorId,
  bodyColorId,
}): React.JSX.Element => {
  const HeadShape = (HeadShapes[headId] || HeadShapes["square"]).component;
  const isHeadCategory = categoryId === "head";
  const isHatCategory = categoryId === "hats";

  return (
    <button
      type="button"
      onClick={() => onSelect(itemId)}
      title={label}
      aria-label={label}
      className={cn(
        "group relative flex aspect-square w-full items-center justify-center rounded-xl p-1.5 transition-all duration-150 cursor-pointer select-none",
        isSelected
          ? "bg-white ring-2 ring-primary ring-offset-2 border border-primary/40 shadow-xs scale-[1.02]"
          : "bg-white/90 border border-border/80 hover:border-foreground/30 hover:bg-white hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]"
      )}
    >
      <div className="relative h-full w-full pointer-events-none flex items-center justify-center">
        <svg viewBox="-5 -5 110 110" className="w-full h-full">
          {categoryId === "texture" ? (
            <g>
              <rect x="0" y="0" width="100" height="100" rx="8" fill="#f8fafc" />
              <rect
                x="15"
                y="15"
                width="70"
                height="70"
                rx="6"
                fill="#d3d3d3"
                filter={itemId ? `url(#grid-${itemId})` : undefined}
                opacity={itemId === "none" ? 0.15 : 1}
              />
              <text
                x="50"
                y="94"
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="currentColor"
                opacity="0.6"
                className="font-sans capitalize tracking-normal"
              >
                {itemId}
              </text>
            </g>
          ) : (
            <>
              {BackComponent && (
                <g className="text-slate-900 fill-current">
                  <BackComponent fill={hairFill} headId="square" />
                </g>
              )}
              {showMannequin && (
                <g className="pointer-events-none opacity-20">
                  <HeadShape fill={skinToneFill} headId={headId} />
                </g>
              )}
              {(() => {
                let resolvedFill = isHeadCategory
                  ? skinToneFill
                  : isHatCategory
                    ? hatFill
                    : categoryId === "body"
                      ? bodyFill
                      : hairFill;
                let resolvedSecondaryFill = accessoryFill;

                const allowedColors = ItemComponent.colors;
                if (allowedColors) {
                  const currentSelectedId = isHatCategory
                    ? hatColorId
                    : categoryId === "body"
                      ? bodyColorId
                      : accessoryColorId;
                  if (!allowedColors.includes(currentSelectedId)) {
                    const palette =
                      isHatCategory || categoryId === "body"
                        ? HAIR_COLORS
                        : ACCESSORY_ACCENT_COLORS;
                    const fallbackColor = palette.find(
                      (colorOption) => colorOption.id === allowedColors[0]
                    )?.color;
                    if (fallbackColor) {
                      if (isHatCategory) resolvedFill = fallbackColor;
                      else resolvedSecondaryFill = fallbackColor;
                    }
                  }
                }

                return (
                  <g className="text-slate-900 fill-current">
                    <ItemComponent
                      fill={resolvedFill}
                      secondaryFill={resolvedSecondaryFill}
                      accessoryColorId={accessoryColorId}
                      headId={headId}
                    />
                  </g>
                );
              })()}
            </>
          )}
        </svg>
      </div>

      {isSelected && (
        <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white shadow-xs">
          <CheckIcon className="h-2.5 w-2.5" strokeWidth={3} />
        </div>
      )}
    </button>
  );
});
ItemPreview.displayName = "ItemPreview";


export const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  backItems,
  selectedIndex,
  onSelect,
  hairFill,
  hatFill,
  skinToneFill,
  accessoryFill,
  bodyFill,
  accessoryColorId,
  hatColorId,
  bodyColorId,
  categoryId,
  headId,
  sortedKeys,
}): React.JSX.Element => {
  const showMannequin = ["hair", "eyes", "nose", "mouth", "eyebrows", "extras", "hats"].includes(categoryId);
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 p-1">
      {categoryId === "texture" && (
        <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <TextureFilters />
        </svg>
      )}
      {sortedKeys.map((itemId) => {
        const itemDefinition = items[itemId];
        if (!itemDefinition) return null;
        if (itemDefinition.presetOnly) return null;

        const ItemComponent = itemDefinition.component;
        const BackComponent = backItems?.[itemId]?.component;

        return (
          <ItemPreview
            key={`item-preview-${itemId}`}
            itemId={itemId}
            label={itemDefinition.label}
            categoryId={categoryId}
            headId={headId}
            ItemComponent={ItemComponent}
            BackComponent={BackComponent}
            isSelected={selectedIndex === itemId}
            showMannequin={showMannequin}
            onSelect={onSelect}
            skinToneFill={skinToneFill}
            hatFill={hatFill}
            hairFill={hairFill}
            accessoryFill={accessoryFill}
            bodyFill={bodyFill}
            accessoryColorId={accessoryColorId}
            hatColorId={hatColorId}
            bodyColorId={bodyColorId}
          />
        );
      })}
    </div>
  );
};

