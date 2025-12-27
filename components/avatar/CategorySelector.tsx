import React from "react";

import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategorySelectorProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "primary" : "neutral"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="flex items-center gap-1.5"
        >
          <span className="text-base">{category.icon}</span>
          <span>{category.label}</span>
        </Button>
      ))}
    </div>
  );
};
