import { NextResponse } from "next/server";
import { CATEGORIES, SKIN_TONES, HAIR_COLORS, ACCESSORY_ACCENT_COLORS } from "@/lib/avatar/types";

export const runtime = "nodejs";

export async function GET() {
  const categories = CATEGORIES.filter((category) =>
    ["head", "hair", "eyes", "eyebrows", "nose", "mouth", "hats", "accessories", "body"].includes(category.id)
  ).map((category) => {
    const sortedItems = [...category.sortedKeys].sort((a, b) => {
      const noneValues = ["bald", "none", "standard"];
      const aIsNone = noneValues.includes(a);
      const bIsNone = noneValues.includes(b);
      if (aIsNone && !bIsNone) return -1;
      if (!aIsNone && bIsNone) return 1;
      return 0;
    });

    return {
      id: category.id,
      label: category.label,
      stateKey: category.stateKey,
      allowNone: category.allowNone,
      items: sortedItems,
    };
  });

  const metadata = {
    version: "1.0.0",
    categories,
    colors: {
      skin: SKIN_TONES.map((skinTone) => ({ id: skinTone.id, name: skinTone.name, hex: skinTone.color })),
      hair: HAIR_COLORS.map((hairColor) => ({ id: hairColor.id, name: hairColor.name, hex: hairColor.color })),
      accessory: ACCESSORY_ACCENT_COLORS.map((accessoryAccentColor) => ({
        id: accessoryAccentColor.id,
        name: accessoryAccentColor.name,
        hex: accessoryAccentColor.color,
      })),
    },
  };

  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
