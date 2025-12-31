import { NextRequest, NextResponse } from "next/server";
import {
  HairFront,
  HairBack,
  Eyes,
  Eyebrows,
  Mouths,
  Accessories,
  Bodies,
  HeadShapes,
  Noses,
  Hats,
  PartProps,
} from "@/lib/avatar/parts";

export const runtime = "nodejs";

export type PartCategory = "head" | "hair" | "eyes" | "eyebrows" | "nose" | "mouth" | "hats" | "accessories" | "body";

const STANDARD_VIEWBOX = "-5 -5 110 110";

export const CATEGORY_CONFIG: Record<
  PartCategory,
  {
    items: Record<string, React.ComponentType<PartProps>>;
    backItems?: Record<string, React.ComponentType<PartProps>>;
    usesHairColor?: boolean;
    usesSkinTone?: boolean;
    showMannequin?: boolean;
  }
> = {
  head: { items: HeadShapes, usesSkinTone: true },
  hair: { items: HairFront, backItems: HairBack, usesHairColor: true, showMannequin: true },
  eyes: { items: Eyes, showMannequin: true },
  eyebrows: { items: Eyebrows, showMannequin: true },
  nose: { items: Noses, showMannequin: true },
  mouth: { items: Mouths, showMannequin: true },
  hats: { items: Hats, usesHairColor: true, showMannequin: true },
  accessories: { items: Accessories, usesHairColor: true, showMannequin: true },
  body: { items: Bodies, usesSkinTone: true },
};

export async function renderPartSvg(category: PartCategory, style: string): Promise<string> {
  const config = CATEGORY_CONFIG[category];
  if (!config) {
    return `<svg viewBox="${STANDARD_VIEWBOX}" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="55" text-anchor="middle" fill="#999" font-size="10">Invalid</text>
    </svg>`;
  }

  const PartComponent = config.items[style];
  if (!PartComponent) {
    return `<svg viewBox="${STANDARD_VIEWBOX}" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="55" text-anchor="middle" fill="#999" font-size="10">${style}</text>
    </svg>`;
  }

  try {
    const { renderToStaticMarkup } = await import("react-dom/server");

    const props: PartProps = {
      headId: "square",
      hatId: "none",
      hairId: style,
      fill: "var(--avatar-hair, #1a1a1a)",
    };

    if (config.usesSkinTone) {
      props.skinTone = "var(--avatar-skin, #fce0c0)";
      props.fill = "var(--avatar-skin, #fce0c0)";
    }

    const partMarkup = renderToStaticMarkup(<PartComponent {...props} />);

    let backMarkup = "";
    if (config.backItems && config.backItems[style]) {
      const BackComponent = config.backItems[style];
      backMarkup = renderToStaticMarkup(<BackComponent {...props} />);
    }

    let mannequinMarkup = "";
    if (config.showMannequin) {
      const HeadShape = HeadShapes["square"];
      mannequinMarkup = renderToStaticMarkup(
        <g opacity="0.15">
          <HeadShape fill="var(--avatar-skin, #fce0c0)" headId="square" />
        </g>
      );
    }

    const hasContent = partMarkup.trim().length > 0 || backMarkup.trim().length > 0;

    if (!hasContent) {
      return `<svg viewBox="${STANDARD_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
        ${mannequinMarkup}
        <text x="50" y="55" text-anchor="middle" fill="currentColor" font-size="12" opacity="0.3">none</text>
      </svg>`;
    }

    return `<svg viewBox="${STANDARD_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;color:currentColor;">
      <g style="color:#1a1a1a;">${backMarkup}</g>
      ${mannequinMarkup}
      <g style="color:#1a1a1a;">${partMarkup}</g>
    </svg>`;
  } catch (error) {
    console.error("Error rendering part:", error);
    return `<svg viewBox="${STANDARD_VIEWBOX}" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="55" text-anchor="middle" fill="#f00" font-size="8">Error</text>
    </svg>`;
  }
}

// GET /api/avatar/part?category=hair&style=bobCutSharp
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") as PartCategory | null;
  const style = searchParams.get("style");

  if (!category || !style) {
    return new NextResponse("Missing category or style parameter", { status: 400 });
  }

  const svgContent = await renderPartSvg(category, style);

  return new NextResponse(svgContent, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
