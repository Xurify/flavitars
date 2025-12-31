import { NextRequest, NextResponse } from "next/server";
import { renderPartSvg, CATEGORY_CONFIG, PartCategory } from "../part/route";
import { CATEGORIES } from "@/lib/avatar/types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") as PartCategory | null;

  if (!category) {
    return NextResponse.json({ error: "Missing category parameter" }, { status: 400 });
  }

  const config = CATEGORY_CONFIG[category];
  if (!config) {
    return NextResponse.json({ error: `Invalid category: ${category}` }, { status: 400 });
  }

  const categoryMeta = CATEGORIES.find((CATEGORY) => CATEGORY.id === category);
  const styles = Object.keys(config.items);

  const noneValues = ["bald", "none", "standard"];
  const sortedStyles = [...styles].sort((a, b) => {
    const aIsNone = noneValues.includes(a);
    const bIsNone = noneValues.includes(b);
    if (aIsNone && !bIsNone) return -1;
    if (!aIsNone && bIsNone) return 1;
    return a.localeCompare(b);
  });

  const parts = await Promise.all(
    sortedStyles.map(async (style) => {
      const svg = await renderPartSvg(category, style);
      return {
        id: style,
        name: formatStyleName(style),
        svg,
      };
    })
  );

  return NextResponse.json(
    {
      category,
      label: categoryMeta?.label || category,
      allowNone: categoryMeta?.allowNone || false,
      parts,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

function formatStyleName(style: string): string {
  return style
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
