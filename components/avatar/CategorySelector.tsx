"use client";

import React from "react";
import { AvatarCategory } from "@/lib/avatar/types";
import { cn } from "@/lib/utils/strings";
import { CategoryIcon } from "./CategoryIcon";

interface Category {
  id: AvatarCategory;
  label: string;
}

interface CategorySelectorProperties {
  categories: readonly Category[];
  activeCategory: string;
  onCategoryChange: (identifier: AvatarCategory) => void;
}

export const CategorySelector: React.FC<CategorySelectorProperties> = ({
  categories,
  activeCategory,
  onCategoryChange,
}): React.JSX.Element => (
  <div
    role="tablist"
    aria-label="Avatar parts"
    className="flex items-center gap-1 overflow-x-auto scrollbar-none p-1 bg-secondary/50 rounded-full border border-border/60"
  >
    {categories.map((category) => {
      const isActive = activeCategory === category.id;
      return (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer select-none transition-colors duration-150 shrink-0",
            isActive
              ? "bg-foreground text-background shadow-xs"
              : "text-muted-foreground hover:text-foreground hover:bg-white/70"
          )}
        >
          <CategoryIcon
            category={category.id}
            className={cn("w-4 h-4 shrink-0", isActive && "text-primary")}
          />
          <span>{category.label}</span>
        </button>
      );
    })}
  </div>
);
