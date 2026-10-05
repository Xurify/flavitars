/**
 * Visual QA: renders every option of a category onto one HTML contact sheet.
 *   bun run render-sheet hair out.html '{"head":"angular","hat":"beanie"}'
 *   bun run render-sheet hats out.html '{"hair":"largeAfro"}'
 *   bun run render-sheet cat out.html '{"__cat":"accessories"}'
 *   bun run render-sheet random out.html
 * The JSON overrides the base state; "__vb" sets the viewBox.
 */
import { writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { AvatarState, DEFAULT_AVATAR_STATE } from "../lib/avatar/types";
import { AvatarFilters, AVATAR_FILTER_PREFIX } from "../lib/avatar/core/filters";
import { AvatarLayers } from "../lib/avatar/core/layers";

type Cell = { label: string; state: AvatarState };

let viewBox = "-10 -25 120 125";

function svgFor(state: AvatarState) {
  const filterId = `${AVATAR_FILTER_PREFIX}-${state.texture}`;
  return renderToStaticMarkup(
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" width="240" height="250">
      <rect x="-50" y="-50" width="200" height="200" fill="#eef2f7" />
      <rect x="5" y="5" width="90" height="90" fill="none" stroke="#94a3b8" strokeDasharray="1 1" strokeWidth="0.3" />
      <AvatarFilters filterId={filterId} headId={state.head} hatId={state.hat} />
      <g filter={state.texture !== "none" ? `url(#${filterId}-${state.texture})` : undefined}>
        <AvatarLayers state={state} filterId={filterId} />
      </g>
    </svg>,
  );
}

export function sheet(title: string, cells: Cell[], cols = 8) {
  const items = cells
    .map(
      (c) =>
        `<figure><img src="data:image/svg+xml;utf8,${encodeURIComponent(svgFor(c.state))}"/><figcaption>${c.label}</figcaption></figure>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;font:11px sans-serif;background:#fff">
<h3 style="margin:6px">${title}</h3>
<div style="display:grid;grid-template-columns:repeat(${cols},120px);gap:4px;padding:4px">${items}</div>
<style>figure{margin:0}img{width:120px;height:125px;display:block}figcaption{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}</style>
</body></html>`;
}

const base: AvatarState = { ...DEFAULT_AVATAR_STATE, texture: "none", hairColor: "brown", hatColor: "red" };

if ((import.meta as ImportMeta & { main?: boolean }).main) {
  const [mode = "hair", out = "sheet.html", ...rest] = process.argv.slice(2);
  const json = rest[0] ? JSON.parse(rest[0]) : {};
  if (json.__vb) viewBox = json.__vb;
  const s = { ...base, ...json } as AvatarState;
  const { HairIds } = await import("../lib/avatar/parts/hair-ids");
  const { HatIds } = await import("../lib/avatar/parts/hats");
  const { HeadIds } = await import("../lib/avatar/parts/head");
  const { CATEGORIES } = await import("../lib/avatar/types");
  let cells: Cell[] = [];
  if (mode === "hair") cells = HairIds.map((h) => ({ label: h, state: { ...s, hair: h } }));
  if (mode === "hats") cells = HatIds.map((h) => ({ label: h, state: { ...s, hat: h } }));
  if (mode === "heads") cells = HeadIds.map((h) => ({ label: h, state: { ...s, head: h } }));
  if (mode === "cat") {
    const cat = CATEGORIES.find((c) => c.id === json.__cat)!;
    cells = cat.sortedKeys.map((k) => ({ label: k, state: { ...s, [cat.stateKey]: k } }));
  }
  if (mode === "random") {
    const { generateAvatarFromSeed } = await import("../lib/avatar/engine/avatar-generator");
    cells = Array.from({ length: 48 }, (_, i) => ({
      label: `seed ${i}`,
      state: { ...generateAvatarFromSeed(`s${i}`), texture: "none" },
    }));
  }
  writeFileSync(out, sheet(`${mode} ${rest[0] ?? ""}`, cells));
}
