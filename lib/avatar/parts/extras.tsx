import { PartComponent } from "./common";

export const ExtrasId = ["none", "freckles", "blush", "beautyMark"] as const;
export type ExtrasId = (typeof ExtrasId)[number];

export const Extras: Record<ExtrasId, PartComponent> = {
  none: () => null,
  freckles: () => (
    <g fill="currentColor">
      <circle cx="25" cy="52" r="0.7" opacity="0.4" />
      <circle cx="28" cy="54" r="0.5" opacity="0.2" />
      <circle cx="22" cy="55" r="0.9" opacity="0.5" />
      <circle cx="30" cy="51" r="0.6" opacity="0.3" />
      <circle cx="75" cy="52" r="0.7" opacity="0.4" />
      <circle cx="72" cy="54" r="0.5" opacity="0.2" />
      <circle cx="78" cy="55" r="0.9" opacity="0.5" />
      <circle cx="70" cy="51" r="0.6" opacity="0.3" />
    </g>
  ),
  blush: () => (
    <g>
      <g transform="translate(30, 57)" opacity="0.15">
        <circle r="6" fill="#F87171" />
        <circle r="3" fill="#EF4444" opacity="0.5" />
      </g>
      <g transform="translate(70, 57)" opacity="0.15">
        <circle r="6" fill="#F87171" />
        <circle r="3" fill="#EF4444" opacity="0.5" />
      </g>
    </g>
  ),
  beautyMark: () => (
    <g>
      <circle cx="68" cy="68" r="0.8" fill="#4B2C20" opacity="0.8" />
    </g>
  ),
};
