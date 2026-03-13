/**
 * One-off script: format all path strings in hair-paths.ts using the readable
 * style (space after command letter, commas in Q/C/S). Run with:
 *   bun run scripts/format-hair-paths.ts
 */

import { HAIR_PATHS } from "../lib/avatar/parts/hair-paths";
import { formatPathReadable } from "../lib/svg-editor/path-parser";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const lines: string[] = [
  'import type { HairId } from "./hair-ids";',
  'import { SMALL_HATS, type HatId } from "./hats";',
  "",
  "export type HairLayer = \"front\" | \"back\";",
  "",
  "type HairPathSingle = string;",
  "type HairPathVariant = HairPathSingle | { noHat: string; hat: string };",
  "",
  "type HairPathEntry = { front: HairPathVariant; back: HairPathVariant };",
  "",
  "export const HAIR_PATHS: Record<HairId, HairPathEntry> = {",
];

for (const [id, entry] of Object.entries(HAIR_PATHS)) {
  lines.push(`  ${id}: {`);
  if (typeof entry.front !== "string") {
    lines.push(`    front: {`);
    lines.push(`      noHat: ${JSON.stringify(formatPathReadable(entry.front.noHat))},`);
    lines.push(`      hat: ${JSON.stringify(formatPathReadable(entry.front.hat))},`);
    lines.push(`    },`);
  } else {
    lines.push(`    front: ${JSON.stringify(entry.front ? formatPathReadable(entry.front) : "")},`);
  }
  if (typeof entry.back !== "string") {
    lines.push(`    back: {`);
    lines.push(`      noHat: ${JSON.stringify(formatPathReadable(entry.back.noHat))},`);
    lines.push(`      hat: ${JSON.stringify(formatPathReadable(entry.back.hat))},`);
    lines.push(`    },`);
  } else {
    lines.push(`    back: ${JSON.stringify(entry.back ? formatPathReadable(entry.back) : "")},`);
  }
  lines.push("  },");
}

lines.push("};", "");
lines.push("export function getHairPathData(hairId: HairId, layer: HairLayer, hatId: HatId = \"none\"): string {");
lines.push("  const paths = HAIR_PATHS[hairId];");
lines.push("  if (!paths) return \"\";");
lines.push("");
lines.push("  const variant: HairPathVariant = layer === \"front\" ? paths.front : paths.back;");
lines.push("");
lines.push("  if (typeof variant === \"string\") {");
lines.push("    return variant;");
lines.push("  }");
lines.push("");
lines.push("  const hasPhysicalHat = hatId !== \"none\" && !SMALL_HATS.includes(hatId);");
lines.push("  return hasPhysicalHat ? variant.hat : variant.noHat;");
lines.push("}");
lines.push("");
lines.push("export function hasHairVariants(hairId: HairId, layer: HairLayer): boolean {");
lines.push("  const paths = HAIR_PATHS[hairId];");
lines.push("  if (!paths) return false;");
lines.push("  const variant: HairPathVariant = layer === \"front\" ? paths.front : paths.back;");
lines.push("  return typeof variant !== \"string\";");
lines.push("}");
lines.push("");
lines.push("export function getAllHairIds(): HairId[] {");
lines.push("  return Object.keys(HAIR_PATHS) as HairId[];");
lines.push("}");

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "lib", "avatar", "parts", "hair-paths.ts");
writeFileSync(outPath, lines.join("\n") + "\n", "utf8");
console.log("Formatted", outPath);
