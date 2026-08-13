"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";
import { PenToolIcon, SparklesIcon } from "lucide-react";

import {
  SKIN_TONES,
  HAIR_COLORS,
  ACCESSORY_ACCENT_COLORS,
  CATEGORIES,
  AvatarCategory,
  AvatarState,
} from "@/lib/avatar/types";
import { buildAvatarSvgApiUrl, generateShareableURL } from "@/lib/avatar/engine/url";
import { Hats } from "@/lib/avatar/parts/hats";
import { Accessories, AccessoryId } from "@/lib/avatar/parts/accessories";
import { AvatarStateParams, avatarSearchParams } from "@/lib/avatar/config/params";
import { resolveAvatarStateFromParams } from "@/lib/utils/avatar-resolver";
import { exportToImage, exportToSVG } from "@/lib/utils/export";
import { getAvatarIdFromState } from "@/lib/avatar/engine/avatar-generator";
import { avatarStateToSearchParams } from "@/lib/svg-editor/part-data";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AvatarPreview } from "./AvatarPreview";
import { CategorySelector } from "./CategorySelector";
import { ItemGrid } from "./ItemGrid";
import { ColorPicker } from "./ColorPicker";
import { ActionBar } from "./ActionBar";

interface AvatarEditorProps {
  initialState?: AvatarState;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({ initialState }): React.JSX.Element => {
  const [params, setParams] = useQueryStates(avatarSearchParams, {
    shallow: true,
    history: "push",
    clearOnDefault: true,
  });

  const avatarState: AvatarState = useMemo(() => {
    const resolvedState = resolveAvatarStateFromParams(params);
    const hasUrlParams = Object.values(params).some(
      (value) => value !== null && value !== undefined && value !== ""
    );
    if (!hasUrlParams && initialState) {
      return initialState;
    }
    return resolvedState;
  }, [params, initialState]);

  const pathEditorUrl = useMemo(
    () => `/path-editor?${avatarStateToSearchParams(avatarState).toString()}`,
    [avatarState]
  );

  const [activeCategory, setActiveCategory] = useState<AvatarCategory>("head");
  const previewReference = useRef<HTMLDivElement>(null);
  const controlsContainerReference = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (categoryIdentifier: string): void => {
    setActiveCategory(categoryIdentifier as AvatarCategory);
    if (controlsContainerReference.current) {
      controlsContainerReference.current.scrollTop = 0;
    }
  };

  const handleParamsChange = (updates: Partial<AvatarStateParams>): void => {
    setParams(updates);
  };

  const handleItemSelect = (itemIdentifier: string): void => {
    const categoryConfig = CATEGORIES.find((category) => category.id === activeCategory);
    if (!categoryConfig) return;
    const stateKey = categoryConfig.stateKey;
    const selectedItem = categoryConfig.items[itemIdentifier];
    const allowedColors = selectedItem?.component?.colors;

    const updates: Partial<AvatarStateParams> = {
      [categoryConfig.id === "hats" ? "hat" : (categoryConfig.stateKey as string)]: itemIdentifier,
    };

    const colorKey = (
      stateKey === "hat"
        ? "hatColor"
        : stateKey === "accessories"
          ? "accessoryColor"
          : stateKey === "hair"
            ? "hairColor"
            : stateKey === "body"
              ? "bodyColor"
              : stateKey + "Color"
    ) as keyof AvatarState;

    const paramColorKey = (
      stateKey === "hat"
        ? "hat_color"
        : stateKey === "accessories"
          ? "accessory_color"
          : stateKey === "hair"
            ? "hair_color"
            : stateKey === "body"
              ? "body_color"
              : stateKey + "_color"
    ) as keyof typeof avatarSearchParams;

    if (allowedColors && !allowedColors.includes(avatarState[colorKey] as string)) {
      (updates as Record<keyof AvatarStateParams, AvatarStateParams[keyof AvatarStateParams]>)[
        paramColorKey
      ] = allowedColors[0];
    }

    handleParamsChange(updates);
  };

  const handleSkinToneSelect = (skinToneIdentifier: string): void => {
    handleParamsChange({ skin_tone: skinToneIdentifier });
  };

  const handleHairColorSelect = (hairColorIdentifier: string): void => {
    handleParamsChange({ hair_color: hairColorIdentifier });
  };

  const handleBodyColorSelect = (bodyColorIdentifier: string): void => {
    handleParamsChange({ body_color: bodyColorIdentifier });
  };

  const handleRandomize = useCallback((): void => {
    const pickRandomItem = <T,>(list: readonly T[] | T[]): T =>
      list[Math.floor(Math.random() * list.length)];

    const randomState: Partial<AvatarStateParams> = {
      skin_tone: pickRandomItem(SKIN_TONES).id,
      hair_color: pickRandomItem(HAIR_COLORS).id,
      hat_color: pickRandomItem(HAIR_COLORS).id,
      accessory_color: pickRandomItem(ACCESSORY_ACCENT_COLORS).id,
      body_color: pickRandomItem(HAIR_COLORS).id,
    };

    CATEGORIES.forEach((category) => {
      const keys = category.sortedKeys;
      const selection = pickRandomItem(keys);
      (randomState as Record<string, string | boolean | null>)[
        category.id === "hats" ? "hat" : (category.stateKey as string)
      ] = selection;
    });

    setParams(randomState);
    toast.success("Generated random avatar");
  }, [setParams]);

  const handleReset = useCallback((): void => {
    setParams(null);
    toast.info("Reset to default avatar");
  }, [setParams]);

  const handleCopyLink = (): void => {
    navigator.clipboard.writeText(generateShareableURL(avatarState));
    toast.success("Share link copied to clipboard");
  };

  const handleCopySvgUrl = (): void => {
    const url = buildAvatarSvgApiUrl(window.location.origin, avatarState, params);
    navigator.clipboard.writeText(url);
    toast.success("SVG API URL copied to clipboard");
  };

  const handleExport = async (format: "png" | "svg"): Promise<void> => {
    if (previewReference.current) {
      const hasPreset = Boolean(params.preset);
      const hasId = params.id !== null && params.id !== undefined;
      const otherParamsCount = Object.entries(params).filter(
        ([key, value]) =>
          key !== "preset" && key !== "id" && value !== null && value !== undefined
      ).length;

      let avatarId: string | number;
      if (hasPreset && !hasId && otherParamsCount === 0) {
        avatarId = params.preset ?? "";
      } else if (hasId && !hasPreset && otherParamsCount === 0) {
        avatarId = params.id!;
      } else {
        avatarId = getAvatarIdFromState(avatarState);
      }

      const fileName = `flavitar_${avatarId || "custom"}.${format}`;

      if (format === "png") {
        await exportToImage(previewReference.current, fileName);
        toast.success("Exported PNG image");
      } else {
        await exportToSVG(previewReference.current, fileName);
        toast.success("Exported SVG vector");
      }
    }
  };

  const currentCategory = CATEGORIES.find((category) => category.id === activeCategory)!;
  const currentId = avatarState[currentCategory.stateKey] as string;
  const activeItemLabel = currentCategory.items[currentId]?.label ?? "None";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
        return;
      }

      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        handleRandomize();
      } else if (event.key === "Escape") {
        event.preventDefault();
        handleReset();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        const currentIndex = CATEGORIES.findIndex((category) => category.id === activeCategory);
        const nextIndex = (currentIndex + 1) % CATEGORIES.length;
        handleCategoryChange(CATEGORIES[nextIndex].id);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const currentIndex = CATEGORIES.findIndex((category) => category.id === activeCategory);
        const previousIndex = (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
        handleCategoryChange(CATEGORIES[previousIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCategory, handleRandomize, handleReset]);

  const previewFill =
    HAIR_COLORS.find((accent) => accent.id === avatarState.hairColor)?.color ||
    HAIR_COLORS[0].color;

  const accessoryFill =
    ACCESSORY_ACCENT_COLORS.find(
      (accessory) => accessory.id === (avatarState.accessoryColor || "blue")
    )?.color || ACCESSORY_ACCENT_COLORS[0].color;

  return (
    <TooltipProvider delayDuration={400}>
      <div className="h-full flex flex-col bg-background selection:bg-primary selection:text-white overflow-hidden font-sans">
        <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1500px] mx-auto items-stretch lg:border-x border-border/70 bg-background relative z-10 overflow-hidden">
          {/* Left Canvas Stage & Color Studio */}
          <div className="flex-[0.7] lg:flex-none lg:w-[380px] xl:w-[420px] flex flex-col border-b lg:border-b-0 lg:border-r border-border/70 bg-white/70 backdrop-blur-xs shrink-0 overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 relative bg-radial from-white to-stone-50/50">
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(30, 41, 59, 0.08) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div
                ref={previewReference}
                className="relative z-10 scale-[0.9] sm:scale-100 lg:scale-105 transition-transform duration-300 drop-shadow-sm"
              >
                <AvatarPreview state={avatarState} size="preview" showBackground={true} />
              </div>

              {params.preset && (
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 text-foreground text-xs font-semibold">
                  <SparklesIcon className="w-3 h-3 text-primary" />
                  <span className="capitalize">{params.preset}</span>
                </div>
              )}
            </div>

            <div className="hidden lg:flex flex-col max-h-[360px] overflow-y-auto border-t border-border/70 bg-white/95 p-5 space-y-4 scrollbar-refined">
              <div className="flex items-center justify-between pb-1 border-b border-border/50">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Color Studio
                </h3>
              </div>
              <EditorColorPickers
                avatarState={avatarState}
                handleSkinToneSelect={handleSkinToneSelect}
                handleHairColorSelect={handleHairColorSelect}
                handleParamsChange={handleParamsChange}
                handleBodyColorSelect={handleBodyColorSelect}
              />
            </div>
          </div>

          {/* Right Customization Deck */}
          <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
            <div className="sticky top-0 z-20 border-b border-border/70 p-3 bg-white/90 backdrop-blur-md shrink-0">
              <CategorySelector
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            <div
              ref={controlsContainerReference}
              className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-refined pb-24 lg:pb-6"
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground font-heading">
                    {currentCategory.label}
                  </h2>
                  <span className="inline-flex items-center rounded-lg bg-secondary/90 border border-border/60 px-2 py-0.5 text-[11px] font-semibold text-foreground">
                    {activeItemLabel}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {Object.keys(currentCategory.items).length} options
                </span>
              </div>

              <ItemGrid
                items={currentCategory.items}
                backItems={currentCategory.backItems}
                sortedKeys={currentCategory.sortedKeys}
                selectedIndex={currentId}
                onSelect={handleItemSelect}
                allowNone={currentCategory.allowNone}
                previewFill={previewFill}
                hatFill={
                  HAIR_COLORS.find((accent) => accent.id === avatarState.hatColor)?.color ||
                  HAIR_COLORS[0].color
                }
                hairFill={previewFill}
                skinToneFill={
                  SKIN_TONES.find((tone) => tone.id === avatarState.skinTone)?.color ||
                  SKIN_TONES[0].color
                }
                accessoryFill={accessoryFill}
                bodyFill={
                  HAIR_COLORS.find((accent) => accent.id === avatarState.bodyColor)?.color ||
                  HAIR_COLORS[0].color
                }
                accessoryColorId={avatarState.accessoryColor}
                hatColorId={avatarState.hatColor}
                bodyColorId={avatarState.bodyColor}
                categoryId={currentCategory.id}
                headId={avatarState.head}
              />


              <div className="lg:hidden mt-8 space-y-4 bg-white/80 p-5 border border-border/70 rounded-2xl shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Color Studio
                </h3>
                <EditorColorPickers
                  avatarState={avatarState}
                  handleSkinToneSelect={handleSkinToneSelect}
                  handleHairColorSelect={handleHairColorSelect}
                  handleParamsChange={handleParamsChange}
                  handleBodyColorSelect={handleBodyColorSelect}
                />
              </div>
            </div>

            <footer className="shrink-0 bg-white border-t border-border/70">
              <ActionBar
                onRandomize={handleRandomize}
                onReset={handleReset}
                onCopyLink={handleCopyLink}
                onExport={handleExport}
                onCopySvgUrl={handleCopySvgUrl}
              />
            </footer>
          </div>
        </main>

        <footer className="border-t border-border/70 bg-white/80 h-9 shrink-0 flex items-center justify-between px-4 sm:px-6 text-[11px] font-medium text-muted-foreground overflow-hidden">
          <Link
            href={pathEditorUrl}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <PenToolIcon className="w-3.5 h-3.5 text-primary" />
            <span>Path Editor</span>
          </Link>
          <span>Flavitars Modular Avatar Engine</span>
        </footer>
      </div>
    </TooltipProvider>
  );
};

const EditorColorPickers = ({
  avatarState,
  handleSkinToneSelect,
  handleHairColorSelect,
  handleParamsChange,
  handleBodyColorSelect,
}: {
  avatarState: AvatarState;
  handleSkinToneSelect: (identifier: string) => void;
  handleHairColorSelect: (identifier: string) => void;
  handleParamsChange: (updates: Partial<AvatarStateParams>) => void;
  handleBodyColorSelect: (identifier: string) => void;
}): React.JSX.Element => (
  <div className="space-y-4">
    <ColorPicker
      label="Skin Tone"
      colors={SKIN_TONES}
      selectedIndex={avatarState.skinTone}
      onSelect={handleSkinToneSelect}
    />
    <div className="border-t border-border/40" />
    <ColorPicker
      label="Hair Color"
      colors={HAIR_COLORS}
      selectedIndex={avatarState.hairColor}
      onSelect={handleHairColorSelect}
      disabled={avatarState.hair === "bald"}
    />
    <div className="border-t border-border/40" />
    <ColorPicker
      label="Hat Color"
      colors={HAIR_COLORS}
      allowedColorIds={(() => {
        const hatItem = Hats[avatarState.hat];
        return hatItem?.component?.colors;
      })()}
      selectedIndex={avatarState.hatColor}
      onSelect={(identifier) => {
        handleParamsChange({ hat_color: identifier });
      }}
      disabled={avatarState.hat === "none" || avatarState.hat === "chefHat"}
    />
    <div className="border-t border-border/40" />
    <ColorPicker
      label="Accessories Accent"
      colors={ACCESSORY_ACCENT_COLORS}
      allowedColorIds={(() => {
        const item = Accessories[avatarState.accessories as AccessoryId];
        return item?.component?.colors;
      })()}
      selectedIndex={avatarState.accessoryColor}
      onSelect={(identifier) => {
        handleParamsChange({ accessory_color: identifier });
      }}
      disabled={avatarState.accessories === "none"}
    />
    <div className="border-t border-border/40" />
    <ColorPicker
      label="Body Color"
      colors={HAIR_COLORS}
      selectedIndex={avatarState.bodyColor}
      onSelect={handleBodyColorSelect}
    />
  </div>
);

export default AvatarEditor;

