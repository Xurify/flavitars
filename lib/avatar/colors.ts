/**
 * Colour palettes. Each palette is split into named groups for the picker.
 *
 * Swatch order inside a palette is part of the packed-id format (see engine/packer.ts) and decides
 * which colour a seed draws: adding, removing or reordering swatches changes seed-only avatars and
 * breaks existing packed ids.
 */

export interface ColorSwatch {
  id: string;
  name: string;
  color: string;
}

export interface ColorGroup {
  label: string;
  swatches: readonly ColorSwatch[];
}

export interface Palette {
  id: PaletteId;
  label: string;
  groups: readonly ColorGroup[];
  defaultId: string;
}

export type PaletteId = "skin" | "hair" | "fabric" | "lens";

const swatch = (id: string, name: string, color: string): ColorSwatch => ({ id, name, color });

export const SKIN_PALETTE: Palette = {
  id: "skin",
  label: "Skin",
  defaultId: "light",
  groups: [
    {
      label: "Natural",
      swatches: [
        swatch("porcelain", "Porcelain", "#FCEDE4"),
        swatch("pale", "Pale", "#F8DFCD"),
        swatch("fair", "Fair", "#F3D3BC"),
        swatch("light", "Light", "#EDC6A8"),
        swatch("warm-beige", "Beige", "#E0B08E"),
        swatch("tan", "Tan", "#CE9971"),
        swatch("medium", "Honey", "#B98159"),
        swatch("olive", "Olive", "#9C6A46"),
        swatch("dark", "Brown", "#7A4D31"),
        swatch("deep", "Deep", "#563321"),
      ],
    },
    {
      label: "Fantasy",
      swatches: [
        swatch("zombie", "Zombie", "#9CC48A"),
        swatch("alien", "Alien", "#C2E26D"),
        swatch("sky", "Sky", "#94D2F0"),
        swatch("azure", "Azure", "#6A93E8"),
        swatch("lavender", "Lavender", "#B9A2F0"),
        swatch("candy", "Candy", "#F2A0C6"),
        swatch("martian", "Martian", "#E46D60"),
        swatch("inferno", "Inferno", "#F0954D"),
        swatch("gold", "Gold", "#EFC556"),
        swatch("silver", "Silver", "#C7CFDA"),
      ],
    },
  ],
};

export const HAIR_PALETTE: Palette = {
  id: "hair",
  label: "Hair",
  defaultId: "black",
  groups: [
    {
      label: "Dark",
      swatches: [
        swatch("black", "Black", "#1E1B1A"),
        swatch("darkBrown", "Dark Brown", "#3D2A21"),
        swatch("brown", "Brown", "#6B4330"),
        swatch("auburn", "Auburn", "#8C3A22"),
        swatch("lightBrown", "Light Brown", "#9C6B44"),
        swatch("orange", "Ginger", "#C9592A"),
      ],
    },
    {
      label: "Light",
      swatches: [
        swatch("goldenBlonde", "Golden Blonde", "#D9A650"),
        swatch("blonde", "Blonde", "#E7C46F"),
        swatch("ashBlonde", "Ash Blonde", "#C9BA9E"),
        swatch("platinumBlonde", "Platinum", "#EFE5C8"),
        swatch("grey", "Grey", "#9EA2A6"),
        swatch("white", "White", "#EAE9E5"),
      ],
    },
    {
      label: "Vivid",
      swatches: [
        swatch("red", "Red", "#D9363E"),
        swatch("pink", "Pink", "#EE5FA6"),
        swatch("lilac", "Lilac", "#C6AEF5"),
        swatch("purple", "Purple", "#8656E8"),
        swatch("blue", "Blue", "#3B7EEA"),
        swatch("green", "Green", "#1FA572"),
      ],
    },
  ],
};

/** Hats (and, historically, bodies): fabric names instead of hair names. */
export const FABRIC_PALETTE: Palette = {
  id: "fabric",
  label: "Fabric",
  defaultId: "black",
  groups: [
    {
      label: "Neutrals",
      swatches: [
        swatch("black", "Black", "#202024"),
        swatch("charcoal", "Charcoal", "#41464F"),
        swatch("grey", "Grey", "#8E949C"),
        swatch("white", "White", "#F4F3EF"),
        swatch("cream", "Cream", "#ECE1C8"),
        swatch("khaki", "Khaki", "#C7B188"),
        swatch("camel", "Camel", "#A57A4E"),
        swatch("chocolate", "Chocolate", "#5E3B22"),
      ],
    },
    {
      label: "Colours",
      swatches: [
        swatch("maroon", "Maroon", "#7B2334"),
        swatch("red", "Red", "#D33C3C"),
        swatch("orange", "Orange", "#EA7B2D"),
        swatch("mustard", "Mustard", "#E2B13C"),
        swatch("forest", "Forest", "#3D8A52"),
        swatch("teal", "Teal", "#2A9D8F"),
        swatch("navy", "Navy", "#253A63"),
        swatch("royal", "Royal Blue", "#2F6EDC"),
        swatch("purple", "Purple", "#7A4CC9"),
        swatch("pink", "Pink", "#E86FA6"),
      ],
    },
  ],
};

/** Tinted lenses (ski goggles). */
export const LENS_PALETTE: Palette = {
  id: "lens",
  label: "Lens",
  defaultId: "electric",
  groups: [
    {
      label: "Mirror",
      swatches: [
        swatch("electric", "Electric Blue", "#3B82F6"),
        swatch("emerald", "Emerald", "#10B981"),
        swatch("nebula", "Nebula", "#8B5CF6"),
        swatch("fire", "Fire", "#EF4444"),
        swatch("solar", "Solar", "#F59E0B"),
        swatch("chrome", "Chrome", "#94A3B8"),
        swatch("obsidian", "Obsidian", "#1A1A1A"),
      ],
    },
  ],
};

export const PALETTES: Record<PaletteId, Palette> = {
  skin: SKIN_PALETTE,
  hair: HAIR_PALETTE,
  fabric: FABRIC_PALETTE,
  lens: LENS_PALETTE,
};

export const paletteSwatches = (palette: Palette): ColorSwatch[] => palette.groups.flatMap((group) => group.swatches);

export const findSwatch = (palette: Palette, id: string | undefined): ColorSwatch | undefined => {
  const target = id || palette.defaultId;
  return paletteSwatches(palette).find((option) => option.id === target);
};

/** Hex for a stored id. Raw `#rrggbb` values are accepted; anything unknown gets the default. */
export const resolveColor = (palette: Palette, id: string | undefined): string => {
  const found = findSwatch(palette, id);
  if (found) return found.color;
  if (id?.startsWith("#")) return id;
  return findSwatch(palette, palette.defaultId)!.color;
};
