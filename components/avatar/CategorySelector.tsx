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

interface CategorySelectorProps {
  categories: readonly Category[] | Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
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

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}): React.JSX.Element => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-1">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const IconComponent = CATEGORY_ICON_MAP[category.id] || SparklesIcon;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer select-none",
              isActive
                ? "bg-foreground text-background shadow-xs ring-1 ring-foreground"
                : "bg-white/80 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/70"
            )}
          >
            <IconComponent
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
};

