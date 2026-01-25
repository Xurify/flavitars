"use client";

import React, { useState, useMemo, useRef } from "react";

import { SKIN_TONES, HAIR_COLORS, ACCESSORY_ACCENT_COLORS, CATEGORIES, AvatarCategory, AvatarState } from "@/lib/avatar/types";
import Link from "next/link";
import { generateShareableURL } from "@/lib/avatar/engine/url";
import { Hats } from "@/lib/avatar/parts/hats";
import { Accessories, AccessoryId } from "@/lib/avatar/parts/accessories";

import { AvatarPreview } from "./AvatarPreview";
import { CategorySelector } from "./CategorySelector";
import { ItemGrid } from "./ItemGrid";
import { ColorPicker } from "./ColorPicker";
import { ActionBar } from "./ActionBar";

import { useQueryStates } from "nuqs";
import { AvatarStateParams, avatarSearchParams } from "@/lib/avatar/config/params";
import { resolveAvatarStateFromParams } from "@/lib/utils/avatar-resolver";
import { exportToImage, exportToSVG } from "@/lib/utils/export";
import { getAvatarIdFromState } from "@/lib/avatar/engine/avatar-generator";
import { TooltipProvider } from "@/components/ui/tooltip";

interface AvatarEditorProps {
  initialState?: AvatarState;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({ initialState }) => {
  const [params, setParams] = useQueryStates(avatarSearchParams, {
    shallow: true,
    history: "push",
    clearOnDefault: true,
  });

  const avatarState: AvatarState = useMemo(() => {
    const resolvedState = resolveAvatarStateFromParams(params);
    const hasUrlParams = Object.values(params).some((value) => value !== null && value !== undefined && value !== "");
    if (!hasUrlParams && initialState) {
      return initialState;
    }
    return resolvedState;
  }, [params, initialState]);

  const pathEditorUrl = useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("hair", avatarState.hair);
    searchParams.set("hat", avatarState.hat);
    searchParams.set("head", avatarState.head);
    searchParams.set("eyes", avatarState.eyes);
    searchParams.set("eyebrows", avatarState.eyebrows);
    searchParams.set("nose", avatarState.nose);
    searchParams.set("mouth", avatarState.mouth);
    searchParams.set("body", avatarState.body);
    searchParams.set("extras", avatarState.extras);
    searchParams.set("accessories", avatarState.accessories);
    searchParams.set("texture", avatarState.texture);
    searchParams.set("skin_tone", avatarState.skinTone);
    searchParams.set("hair_color", avatarState.hairColor);
    searchParams.set("hat_color", avatarState.hatColor);
    searchParams.set("accessory_color", avatarState.accessoryColor);
    searchParams.set("body_color", avatarState.bodyColor);
    return `/path-editor?${searchParams.toString()}`;
  }, [avatarState]);

  const [activeCategory, setActiveCategory] = useState<AvatarCategory>("head");
  const previewRef = useRef<HTMLDivElement>(null);
  const controlsContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id as AvatarCategory);
    if (controlsContainerRef.current) {
      controlsContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleParamsChange = (updates: Partial<AvatarStateParams>) => {
    setParams(updates);
  };

  const handleItemSelect = (id: string) => {
    const categoryConfig = CATEGORIES.find((category) => category.id === activeCategory);
    if (!categoryConfig) return;
    const stateKey = categoryConfig.stateKey;
    const selectedItem = categoryConfig.items[id];
    const allowedColors = selectedItem?.component?.colors;

    const updates: Partial<AvatarStateParams> = {
      [categoryConfig.id === "hats" ? "hat" : (categoryConfig.stateKey as string)]: id,
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
      (updates as Record<keyof AvatarStateParams, AvatarStateParams[keyof AvatarStateParams]>)[paramColorKey] = allowedColors[0];
    }

    handleParamsChange(updates);
  };

  const handleSkinToneSelect = (id: string) => {
    handleParamsChange({ skin_tone: id });
  };

  const handleHairColorSelect = (id: string) => {
    handleParamsChange({ hair_color: id });
  };

  const handleBodyColorSelect = (id: string) => {
    handleParamsChange({ body_color: id });
  };

  const handleRandomize = () => {
    const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

    const randomState: Partial<AvatarStateParams> = {
      skin_tone: pick(SKIN_TONES).id,
      hair_color: pick(HAIR_COLORS).id,
      hat_color: pick(HAIR_COLORS).id,
      accessory_color: pick(ACCESSORY_ACCENT_COLORS).id,
      body_color: pick(HAIR_COLORS).id,
    };

    CATEGORIES.forEach((category) => {
      const keys = category.sortedKeys;
      const selection = pick(keys);
      (randomState as Record<string, string | boolean | null>)[category.id === "hats" ? "hat" : (category.stateKey as string)] =
        selection;
    });

    setParams(randomState);
  };

  const handleReset = () => {
    setParams(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateShareableURL(avatarState));
  };

  const handleExport = async (format: "png" | "svg") => {
    if (previewRef.current) {
      const hasPreset = !!params.preset;
      const hasId = params.id !== null && params.id !== undefined;
      const otherParamsCount = Object.entries(params).filter(
        ([key, value]) => key !== "preset" && key !== "id" && value !== null && value !== undefined,
      ).length;

      let avatarId: string | number;
      if (hasPreset && !hasId && otherParamsCount === 0) {
        avatarId = params.preset;
      } else if (hasId && !hasPreset && otherParamsCount === 0) {
        avatarId = params.id!;
      } else {
        avatarId = getAvatarIdFromState(avatarState);
      }

      const fileName = `flavitar_${avatarId || "custom"}.${format}`;

      if (format === "png") {
        await exportToImage(previewRef.current, fileName);
      } else {
        await exportToSVG(previewRef.current, fileName);
      }
    }
  };

  const currentCategory = CATEGORIES.find((category) => category.id === activeCategory)!;
  const currentId = avatarState[currentCategory.stateKey] as string;
  const previewFill = HAIR_COLORS.find((accent) => accent.id === avatarState.hairColor)?.color || HAIR_COLORS[0].color;

  const accessoryFill =
    ACCESSORY_ACCENT_COLORS.find((accessory) => accessory.id === (avatarState.accessoryColor || "blue"))?.color ||
    ACCESSORY_ACCENT_COLORS[0].color;

  return (
    <TooltipProvider delayDuration={1500}>
      <div className="h-full flex flex-col bg-background selection:bg-primary selection:text-primary-foreground overflow-hidden font-sans">
        <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto items-stretch lg:border-x-2 lg:border-border bg-background relative z-10 overflow-hidden">
          <div className="flex-[0.6] lg:flex-none lg:w-[350px] flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-border bg-card/5 shrink-0 overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-6 relative">
              <div
                className="absolute inset-0 border border-border/5 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#00000003 1px, transparent 1px), linear-gradient(90deg, #00000003 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div
                ref={previewRef}
                className="relative z-10 scale-[0.85] sm:scale-[0.95] lg:scale-[1.1] transition-transform duration-300"
              >
                <AvatarPreview state={avatarState} size="preview" showBackground={false} />
              </div>
            </div>

            <div className="hidden lg:flex flex-col overflow-y-auto border-t-2 border-border bg-white p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <EditorColorPickers
                avatarState={avatarState}
                handleSkinToneSelect={handleSkinToneSelect}
                handleHairColorSelect={handleHairColorSelect}
                handleParamsChange={handleParamsChange}
                handleBodyColorSelect={handleBodyColorSelect}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
            <div className="sticky top-0 z-20 border-b-2 border-border p-3 bg-card shrink-0">
              <CategorySelector categories={CATEGORIES} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
            </div>

            <div ref={controlsContainerRef} className="flex-1 overflow-y-auto p-4 scrollbar-none pb-20 lg:pb-4">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-border flex items-center justify-center font-mono text-[8px] font-black bg-primary text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    {currentCategory.id === "extras" ? "★" : ""}
                  </div>
                  <h2 className="text-base lg:text-lg font-black tracking-tight uppercase">Module: {currentCategory.label}</h2>
                </div>
                <span className="text-[8px] font-mono font-bold text-muted-foreground/50 uppercase">
                  INDEX: {Object.keys(currentCategory.items).indexOf(currentId) + 1} {Object.keys(currentCategory.items).length}
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
                hatFill={HAIR_COLORS.find((accent) => accent.id === avatarState.hatColor)?.color || HAIR_COLORS[0].color}
                hairFill={previewFill}
                skinToneFill={SKIN_TONES.find((tone) => tone.id === avatarState.skinTone)?.color || SKIN_TONES[0].color}
                accessoryFill={accessoryFill}
                bodyFill={HAIR_COLORS.find((accent) => accent.id === avatarState.bodyColor)?.color || HAIR_COLORS[0].color}
                accessoryColorId={avatarState.accessoryColor}
                hatColorId={avatarState.hatColor}
                bodyColorId={avatarState.bodyColor}
                categoryId={currentCategory.id}
                headId={avatarState.head}
              />

              <div className="lg:hidden mt-8 space-y-6 bg-card/30 p-4 border-2 border-border/50 rounded-lg">
                <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Configure Colors</h3>
                <EditorColorPickers
                  avatarState={avatarState}
                  handleSkinToneSelect={handleSkinToneSelect}
                  handleHairColorSelect={handleHairColorSelect}
                  handleParamsChange={handleParamsChange}
                  handleBodyColorSelect={handleBodyColorSelect}
                />
              </div>
            </div>

            <footer className="shrink-0 bg-background border-t-2 border-border lg:border-t-0">
              <ActionBar
                onRandomize={handleRandomize}
                onReset={handleReset}
                onCopyLink={handleCopyLink}
                onExport={handleExport}
              />
            </footer>
          </div>
        </main>

        <footer className="border-t-2 border-border bg-card h-8 shrink-0 flex items-center justify-between px-4 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.2em] overflow-hidden">
          <Link href={pathEditorUrl} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Path Editor
          </Link>
          <span>© 2025 FLAVITARS • XURIFY</span>
        </footer>
      </div>
    </TooltipProvider>
  );
};

/* Extracted Color Picker Group for reuse */
const EditorColorPickers = ({
  avatarState,
  handleSkinToneSelect,
  handleHairColorSelect,
  handleParamsChange,
  handleBodyColorSelect,
}: {
  avatarState: AvatarState;
  handleSkinToneSelect: (id: string) => void;
  handleHairColorSelect: (id: string) => void;
  handleParamsChange: (updates: Partial<AvatarStateParams>) => void;
  handleBodyColorSelect: (id: string) => void;
}) => (
  <div className="space-y-4">
    <ColorPicker label="Skin Tone" colors={SKIN_TONES} selectedIndex={avatarState.skinTone} onSelect={handleSkinToneSelect} />
    <div className="border-t border-dashed border-border/20 pt-1" />
    <ColorPicker
      label="Hair Color"
      colors={HAIR_COLORS}
      selectedIndex={avatarState.hairColor}
      onSelect={handleHairColorSelect}
      disabled={avatarState.hair === "bald"}
    />
    <div className="border-t border-dashed border-border/20 pt-1" />
    <ColorPicker
      label="Hat Color"
      colors={HAIR_COLORS}
      allowedColorIds={(() => {
        const hatItem = Hats[avatarState.hat];
        return hatItem?.component?.colors;
      })()}
      selectedIndex={avatarState.hatColor}
      onSelect={(id) => {
        handleParamsChange({ hat_color: id });
      }}
      disabled={avatarState.hat === "none" || avatarState.hat === "chefHat"}
    />

    <div className="border-t border-dashed border-border/20 pt-1" />
    <ColorPicker
      label="Accessories Accent"
      colors={ACCESSORY_ACCENT_COLORS}
      allowedColorIds={(() => {
        const item = Accessories[avatarState.accessories as AccessoryId];
        return item?.component?.colors;
      })()}
      selectedIndex={avatarState.accessoryColor}
      onSelect={(id) => {
        handleParamsChange({ accessory_color: id });
      }}
      disabled={avatarState.accessories === "none"}
    />
    <div className="border-t border-dashed border-border/20 pt-1" />
    <ColorPicker label="Body Color" colors={HAIR_COLORS} selectedIndex={avatarState.bodyColor} onSelect={handleBodyColorSelect} />
  </div>
);

export default AvatarEditor;
