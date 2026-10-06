/**
 * Colour palettes. Each palette is split into named groups for the picker, and keeps an alias
 * table so ids that were renamed or retired still resolve (stored avatars, share links).
 *
 * Swatch order inside a palette is part of the v2 packed-id format (see engine/packer.ts):
 * append new swatches to the end of a group's list only after bumping the packer version.
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
  /** Retired or renamed ids → current ids. */
  aliases: Readonly<Record<string, string>>;
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
  aliases: {
    paper: "porcelain",
    ghost: "silver",
    ghoul: "zombie",
    crimson: "martian",
    oceanic: "azure",
    orchid: "lavender",
    bubblegum: "candy",
    bronze: "inferno",
  },
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
  aliases: {
    khaki: "ashBlonde",
    royal: "blue",
  },
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
  aliases: {
    darkBrown: "chocolate",
    brown: "camel",
    lightBrown: "camel",
    auburn: "maroon",
    blonde: "mustard",
    goldenBlonde: "mustard",
    ashBlonde: "khaki",
    platinumBlonde: "cream",
    blue: "royal",
    green: "forest",
    lilac: "purple",
  },
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
  aliases: {
    black: "obsidian",
    blue: "electric",
  },
};

export const PALETTES: Record<PaletteId, Palette> = {
  skin: SKIN_PALETTE,
  hair: HAIR_PALETTE,
  fabric: FABRIC_PALETTE,
  lens: LENS_PALETTE,
};

export const paletteSwatches = (palette: Palette): ColorSwatch[] => palette.groups.flatMap((group) => group.swatches);

/** Current id for a stored id (follows aliases); unknown ids and raw hex values pass through. */
export const canonicalColorId = (palette: Palette, id: string | undefined): string => {
  if (!id) return palette.defaultId;
  return palette.aliases[id] ?? id;
};

export const findSwatch = (palette: Palette, id: string | undefined): ColorSwatch | undefined => {
  const canonical = canonicalColorId(palette, id);
  return paletteSwatches(palette).find((option) => option.id === canonical);
};

/** Hex for a stored id. Raw `#rrggbb` values are accepted; anything unknown gets the default. */
export const resolveColor = (palette: Palette, id: string | undefined): string => {
  const found = findSwatch(palette, id);
  if (found) return found.color;
  if (id?.startsWith("#")) return id;
  return findSwatch(palette, palette.defaultId)!.color;
};

/**
 * The flat lists as they were before palettes were grouped. Packed ids with the legacy `p_`
 * prefix and seed-generated avatars index into these, so they must never change.
 */
export const LEGACY_SKIN_IDS = [
  "paper",
  "porcelain",
  "pale",
  "fair",
  "light",
  "warm-beige",
  "tan",
  "olive",
  "medium",
  "dark",
  "deep",
  "zombie",
  "alien",
  "ghoul",
  "martian",
  "crimson",
  "oceanic",
  "azure",
  "sky",
  "lavender",
  "orchid",
  "candy",
  "bubblegum",
  "inferno",
  "gold",
  "bronze",
  "silver",
  "ghost",
] as const;

export const LEGACY_HAIR_IDS = [
  "black",
  "darkBrown",
  "brown",
  "lightBrown",
  "auburn",
  "blonde",
  "goldenBlonde",
  "ashBlonde",
  "platinumBlonde",
  "orange",
  "red",
  "purple",
  "blue",
  "green",
  "pink",
  "khaki",
  "royal",
  "grey",
  "white",
  "lilac",
] as const;

export const LEGACY_ACCENT_IDS = ["fire", "electric", "emerald", "nebula", "solar", "chrome", "black"] as const;
