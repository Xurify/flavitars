"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";
import { PenToolIcon, SparklesIcon } from "lucide-react";

import { CATEGORIES, AvatarCategory, AvatarState } from "@/lib/avatar/types";
import {
  FABRIC_PALETTE,
  HAIR_PALETTE,
  LENS_PALETTE,
  SKIN_PALETTE,
  paletteSwatches,
} from "@/lib/avatar/colors";
import { buildAvatarSvgApiUrl, generateShareableURL } from "@/lib/avatar/engine/url";
import { Hats } from "@/lib/avatar/parts/hats";
import { Accessories, AccessoryId } from "@/lib/avatar/parts/accessories";
import { getHairSpec } from "@/lib/avatar/parts/hair";
import { AvatarStateParams, avatarSearchParams } from "@/lib/avatar/config/params";
import { resolveAvatarFit, resolveAvatarStateFromParams } from "@/lib/utils/avatar-resolver";
import { exportToImage, exportToSVG } from "@/lib/utils/export";
import { getAvatarIdFromState } from "@/lib/avatar/engine/avatar-generator";
import { avatarStateToSearchParams } from "@/lib/svg-editor/part-data";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AvatarPreview } from "./AvatarPreview";
import { CategorySelector } from "./CategorySelector";
import { ItemGrid, getVisibleItemIds } from "./ItemGrid";
import { ColorPicker } from "./ColorPicker";
import { ActionBar } from "./ActionBar";

/** Tab order: the head, then the face top to bottom, then what is worn. CATEGORIES order is fixed by id packing. */
const EDITOR_CATEGORY_ORDER: AvatarCategory[] = [
  "head",
  "hair",
  "eyebrows",
  "eyes",
  "nose",
  "mouth",
  "extras",
  "hats",
  "accessories",
  "body",
  "texture",
];
const EDITOR_CATEGORIES = EDITOR_CATEGORY_ORDER.map(
  (id) => CATEGORIES.find((category) => category.id === id)!
);

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

  const handleCategoryChange = (categoryIdentifier: AvatarCategory): void => {
    setActiveCategory(categoryIdentifier);
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
    handleParamsChange({
      [categoryConfig.id === "hats" ? "hat" : categoryConfig.stateKey]: itemIdentifier,
    });
  };

  const handleRandomize = useCallback((): void => {
    const pickRandomItem = <T,>(list: readonly T[] | T[]): T =>
      list[Math.floor(Math.random() * list.length)];

    const randomState: Partial<AvatarStateParams> = {
      skin_tone: pickRandomItem(paletteSwatches(SKIN_PALETTE)).id,
      hair_color: pickRandomItem(paletteSwatches(HAIR_PALETTE)).id,
      hat_color: pickRandomItem(paletteSwatches(FABRIC_PALETTE)).id,
      accessory_color: pickRandomItem(paletteSwatches(LENS_PALETTE)).id,
    };

    CATEGORIES.forEach((category) => {
      const selection = pickRandomItem(getVisibleItemIds(category));
      (randomState as Record<string, string | boolean | null>)[
        category.id === "hats" ? "hat" : (category.stateKey as string)
      ] = selection;
    });

    setParams(randomState);
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
        ([key, value]) => key !== "preset" && key !== "id" && value !== null && value !== undefined
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
        const currentIndex = EDITOR_CATEGORY_ORDER.indexOf(activeCategory);
        handleCategoryChange(
          EDITOR_CATEGORY_ORDER[(currentIndex + 1) % EDITOR_CATEGORY_ORDER.length]
        );
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const currentIndex = EDITOR_CATEGORY_ORDER.indexOf(activeCategory);
        handleCategoryChange(
          EDITOR_CATEGORY_ORDER[
            (currentIndex - 1 + EDITOR_CATEGORY_ORDER.length) % EDITOR_CATEGORY_ORDER.length
          ]
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCategory, handleRandomize, handleReset]);

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
              <ColorStudio avatarState={avatarState} onChange={handleParamsChange} />
            </div>
          </div>

          {/* Right Customization Deck */}
          <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
            <div className="sticky top-0 z-20 border-b border-border/70 p-3 bg-white/90 backdrop-blur-md shrink-0">
              <CategorySelector
                categories={EDITOR_CATEGORIES}
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
                  {getVisibleItemIds(currentCategory).length} options
                </span>
              </div>

              <ItemGrid
                category={currentCategory}
                state={avatarState}
                selectedId={currentId}
                onSelect={handleItemSelect}
              />

              <div className="lg:hidden mt-8 space-y-4 bg-white/80 p-5 border border-border/70 rounded-2xl shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Color Studio
                </h3>
                <ColorStudio avatarState={avatarState} onChange={handleParamsChange} />
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

/** Colour controls, shown only for parts that are on the avatar and take a colour. */
const ColorStudio = ({
  avatarState,
  onChange,
}: {
  avatarState: AvatarState;
  onChange: (updates: Partial<AvatarStateParams>) => void;
}): React.JSX.Element => {
  const hat = Hats[avatarState.hat];
  const accessory = Accessories[avatarState.accessories as AccessoryId];
  const hairSpec = getHairSpec(avatarState.hair);
  const hasHair =
    resolveAvatarFit(avatarState).showHair &&
    Boolean(hairSpec && (hairSpec.cap || hairSpec.front || hairSpec.back || hairSpec.stubble));

  const sections = [
    <ColorPicker
      key="skin"
      label="Skin"
      palette={SKIN_PALETTE}
      selectedId={avatarState.skinTone}
      onSelect={(id) => onChange({ skin_tone: id })}
    />,
    hasHair && (
      <ColorPicker
        key="hair"
        label="Hair"
        palette={HAIR_PALETTE}
        selectedId={avatarState.hairColor}
        onSelect={(id) => onChange({ hair_color: id })}
      />
    ),
    hat?.colorable && (
      <ColorPicker
        key="hat"
        label="Hat"
        context={hat.label}
        palette={FABRIC_PALETTE}
        selectedId={avatarState.hatColor}
        onSelect={(id) => onChange({ hat_color: id })}
      />
    ),
    accessory?.colorable && (
      <ColorPicker
        key="lens"
        label="Lens"
        context={accessory.label}
        palette={LENS_PALETTE}
        selectedId={avatarState.accessoryColor}
        onSelect={(id) => onChange({ accessory_color: id })}
      />
    ),
  ].filter(Boolean);

  return (
    <div className="space-y-4 divide-y divide-border/40 [&>*:not(:first-child)]:pt-4">
      {sections}
    </div>
  );
};

export default AvatarEditor;
