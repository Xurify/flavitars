import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { renderAvatarSvg } from "../lib/avatar/core/renderer";
import { DEFAULT_AVATAR_STATE } from "../lib/avatar/types";
import { HairIds } from "../lib/avatar/parts/hair-ids";
import { HatIds } from "../lib/avatar/parts/hats";
import { HeadIds } from "../lib/avatar/parts/head";

const OUT_DIR = process.env.GRID_OUT ?? "/cursor/stores/bc-d800e0b6-1a23-4378-b19a-cff9fa32e686/media";

function cell(overrides: Partial<typeof DEFAULT_AVATAR_STATE>, label: string) {
  return { overrides, label };
}

async function svgFor(overrides: Partial<typeof DEFAULT_AVATAR_STATE>) {
  return renderAvatarSvg({
    ...DEFAULT_AVATAR_STATE,
    texture: "none",
    ...overrides,
  });
}

function page(title: string, cells: { svg: string; label: string }[], columns: number) {
  const items = cells
    .map(
      (item) =>
        `<figure><div class="tile">${item.svg}</div><figcaption>${item.label}</figcaption></figure>`,
    )
    .join("");
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>
  html,body{margin:0;background:#f7f4ef;font:11px/1.2 ui-sans-serif,system-ui;color:#444}
  h1{font:600 18px/1.2 ui-sans-serif,system-ui;margin:16px 20px 8px}
  .grid{display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:10px;padding:12px 20px 28px}
  figure{margin:0;text-align:center}
  .tile{background:#fff;border-radius:16px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;padding:6px}
  .tile svg{width:86%;height:86%}
  figcaption{margin-top:4px;font-size:9px;word-break:break-word}
</style></head>
<body><h1>${title}</h1><div class="grid">${items}</div></body></html>`;
}

async function shot(name: string, html: string, width: number, height: number) {
  const htmlPath = `/tmp/${name}.html`;
  writeFileSync(htmlPath, html);
  const out = join(OUT_DIR, `${name}.png`);
  const chrome =
    process.env.CHROME_PATH ??
    ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find((path) => {
      try {
        return require("node:fs").existsSync(path);
      } catch {
        return false;
      }
    }) ??
    "google-chrome";
  const { spawnSync } = await import("node:child_process");
  const userData = `/tmp/chrome-grid-${name}`;
  mkdirSync(userData, { recursive: true });
  const result = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      `--user-data-dir=${userData}`,
      `--window-size=${width},${height}`,
      `--screenshot=${out}`,
      `file://${htmlPath}`,
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    console.error(result.stderr);
    throw new Error(`chrome failed for ${name}`);
  }
  console.log("wrote", out);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const beanieCells = [];
  for (const hair of HairIds) {
    beanieCells.push({
      svg: await svgFor({ hair, hat: "beanie", hairColor: "black", hatColor: "black", head: "rounded" }),
      label: `beanie ${hair}`,
    });
  }
  await shot("avatar-beanie", page("Beanie × every hair (black on black)", beanieCells, 6), 1400, 2200);

  const bucketCells = [];
  for (const hair of HairIds) {
    bucketCells.push({
      svg: await svgFor({ hair, hat: "bucketHat", hairColor: "black", hatColor: "khaki", head: "rounded" }),
      label: `bucket ${hair}`,
    });
  }
  await shot("avatar-bucket", page("Bucket × every hair", bucketCells, 6), 1400, 2200);

  const cowboyCells = [];
  for (const hair of HairIds) {
    cowboyCells.push({
      svg: await svgFor({ hair, hat: "cowboyHat", hairColor: "black", hatColor: "brown", head: "rounded" }),
      label: `cowboy ${hair}`,
    });
  }
  await shot("avatar-cowboy", page("Cowboy × every hair", cowboyCells, 6), 1400, 2200);

  const flagsCells = [];
  for (const hair of HairIds) {
    flagsCells.push({
      svg: await svgFor({ hair, hat: "flagsCap", hairColor: "blue", hatColor: "black", head: "rounded" }),
      label: `flags ${hair}`,
    });
  }
  await shot("avatar-flagscap", page("Flags cap × every hair", flagsCells, 6), 1400, 2200);

  const afroCells = [];
  for (const hat of HatIds.filter((hatId) => hatId !== "none")) {
    afroCells.push({
      svg: await svgFor({ hair: "largeAfro", hat, hairColor: "black", head: "rounded" }),
      label: `afro ${hat}`,
    });
  }
  await shot("avatar-afro", page("Afro × every hat", afroCells, 6), 1400, 1600);

  const mohawkCells = [];
  for (const hat of HatIds.filter((hatId) => hatId !== "none")) {
    mohawkCells.push({
      svg: await svgFor({ hair: "spikyMohawk", hat, hairColor: "black", head: "rounded" }),
      label: `mohawk ${hat}`,
    });
  }
  await shot("avatar-mohawk", page("Mohawk × every hat", mohawkCells, 6), 1400, 1600);

  const bunCells = [];
  for (const hat of HatIds.filter((hatId) => hatId !== "none")) {
    bunCells.push({
      svg: await svgFor({ hair: "doubleSpaceBuns", hat, hairColor: "black", head: "rounded" }),
      label: `buns ${hat}`,
    });
  }
  await shot("avatar-buns", page("Space buns × every hat", bunCells, 6), 1400, 1600);

  const locCells = [];
  for (const hat of HatIds.filter((hatId) => hatId !== "none")) {
    locCells.push({
      svg: await svgFor({ hair: "longLocs", hat, hairColor: "brown", head: "rounded" }),
      label: `locs ${hat}`,
    });
  }
  await shot("avatar-locs", page("Long locs × every hat", locCells, 6), 1400, 1600);

  const headCells = [];
  const headHats = ["beanie", "bucketHat", "cowboyHat", "flagsCap", "chefHat", "crown", "halo", "astronautHelmet", "skiMask"] as const;
  const headHairs = ["buzzCut", "largeAfro", "spikyMohawk", "doubleSpaceBuns", "longLocs", "bobCutSharp"] as const;
  for (const head of HeadIds) {
    for (const hat of headHats) {
      const hair = headHairs[HeadIds.indexOf(head) % headHairs.length];
      headCells.push({
        svg: await svgFor({ head, hat, hair, hairColor: "black" }),
        label: `${head} ${hat} ${hair}`,
      });
    }
  }
  await shot("avatar-heads", page("Heads × hats + problem combos", headCells, 9), 1600, 2000);
}

await main();
