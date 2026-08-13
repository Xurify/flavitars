"use client";

import React from "react";
import {
  UserIcon,
  EyeIcon,
  SparklesIcon,
  PaletteIcon,
  CrownIcon,
  GlassesIcon,
  ShirtIcon,
  SmileIcon,
  ScissorsIcon,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/strings";

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategorySelectorProperties {
  categories: readonly Category[] | Category[];
  activeCategory: string;
  onCategoryChange: (identifier: string) => void;
}

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  head: UserIcon,
  eyebrows: EyeIcon,
  eyes: EyeIcon,
  nose: SmileIcon,
  mouth: SmileIcon,
  hair: ScissorsIcon,
  hats: CrownIcon,
  extras: SparklesIcon,
  accessories: GlassesIcon,
  body: ShirtIcon,
  texture: PaletteIcon,
};

export const CategorySelector: React.FC<CategorySelectorProperties> = ({
  categories,
  activeCategory,
  onCategoryChange,
}): React.JSX.Element => {
  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 px-0.5 bg-secondary/50 p-1 rounded-full border border-border/60">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const IconComponent = CATEGORY_ICON_MAP[category.id] || SparklesIcon;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer select-none transition-colors duration-150 shrink-0",
              isActive
                ? "bg-foreground text-background shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-white/70"
            )}
          >
            <IconComponent
              className={cn(
                "w-3.5 h-3.5 shrink-0 transition-colors duration-150",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
};
