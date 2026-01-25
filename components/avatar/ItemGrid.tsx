import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeadId, HeadShapes } from "@/lib/avatar/parts/head";
import { PartComponent, PartDefinition } from "@/lib/avatar/parts";
import { AvatarCategory, HAIR_COLORS, ACCESSORY_ACCENT_COLORS } from "@/lib/avatar/types";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ItemGridProps {
  items: Record<string, PartDefinition>;
  backItems?: Record<string, PartDefinition>;
  selectedIndex: string;
  onSelect: (id: string) => void;
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
  id: string;
  label: string;
  categoryId: AvatarCategory;
  headId: HeadId;
  ItemComponent: PartComponent;
  BackComponent?: PartComponent;
  isSelected: boolean;
  onSelect: (id: string) => void;
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

const TextureFilters = () => (
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

const ItemPreview: React.FC<ItemPreviewProps> = ({
  id,
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
}) => {
  const HeadShape = (HeadShapes[headId] || HeadShapes["square"]).component;
  const isHeadCategory = categoryId === "head";
  const isHatCategory = categoryId === "hats";
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isSelected ? "primary" : "default"}
          size="square"
          onClick={() => onSelect(id)}
          className="group relative flex w-full items-center justify-center p-0.5"
        >
          <div className="relative h-full w-full pointer-events-none">
            <svg viewBox="-5 -5 110 110" className="w-full h-full">
              {categoryId === "texture" ? (
                <g>
                  <rect x="0" y="0" width="100" height="100" fill="#f8fafc" />
                  <rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    rx="4"
                    fill="#d3d3d3ff"
                    filter={id ? `url(#grid-${id})` : undefined}
                    opacity={id === "none" ? 0.1 : 1}
                  />
                  <text
                    x="50"
                    y="94"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="currentColor"
                    opacity="0.4"
                    className="font-mono uppercase tracking-widest"
                  >
                    {id}
                  </text>
                </g>
              ) : (
                <>
                  {BackComponent && (
                    <g className="text-slate-900 fill-current ">
                      <BackComponent fill={hairFill} headId="square" />
                    </g>
                  )}
                  {showMannequin && (
                    <g className="pointer-events-none opacity-20">
                      <HeadShape fill={skinToneFill} headId={headId} />
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
                      const currentId = isHatCategory ? hatColorId : categoryId === "body" ? bodyColorId : accessoryColorId;
                      if (!allowedColors.includes(currentId)) {
                        const palette = isHatCategory || categoryId === "body" ? HAIR_COLORS : ACCESSORY_ACCENT_COLORS;
                        const fallbackColor = palette.find((colorOption) => colorOption.id === allowedColors[0])?.color;
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
            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center border-2 border-border bg-yellow-500 text-primary-foreground shadow-sm">
              <Check className="h-2 w-2" strokeWidth={5} />
            </div>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="font-mono uppercase tracking-wider">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

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
}) => {
  const showMannequin = ["hair", "eyes", "nose", "mouth", "brows", "extras", "hats"].includes(categoryId);
  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 xl:grid-cols-6 gap-3 p-1">
      {categoryId === "texture" && (
        <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <TextureFilters />
        </svg>
      )}
      {sortedKeys.map((id) => {
        const itemDef = items[id];
        if (!itemDef) return null;
        if (itemDef.presetOnly) return null;

        const ItemComponent = itemDef.component;
        const BackComponent = backItems?.[id]?.component;

        return (
          <ItemPreview
            key={`item-preview-${id}`}
            id={id}
            label={itemDef.label}
            categoryId={categoryId}
            headId={headId}
            ItemComponent={ItemComponent}
            BackComponent={BackComponent}
            isSelected={selectedIndex === id}
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
