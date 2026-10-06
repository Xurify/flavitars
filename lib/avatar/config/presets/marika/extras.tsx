import { PartRegistry, PartComponent } from "../../../parts/common";

export const MarikaExtrasIds = ["marikaBlush", "marikaCheekbones"] as const;

export type MarikaExtrasId = (typeof MarikaExtrasIds)[number];

const marikaBlush: PartComponent = () => (
  <g opacity="0.25">
    <circle cx="32" cy="58" r="7" fill="#F472B6" filter="blur(2px)" />
    <circle cx="68" cy="58" r="7" fill="#F472B6" filter="blur(2px)" />
  </g>
);

/** Coral blush swept up along the cheekbones. */
const marikaCheekbones: PartComponent = () => (
  <g fill="#F07F72" opacity="0.35" filter="blur(2px)">
    <ellipse cx="30" cy="57" rx="7.5" ry="4.5" transform="rotate(-24 30 57)" />
    <ellipse cx="70" cy="57" rx="7.5" ry="4.5" transform="rotate(24 70 57)" />
  </g>
);

export const MarikaExtras: PartRegistry<MarikaExtrasId> = {
  marikaBlush: { component: marikaBlush, label: "Marika Blush", presetOnly: true, isExclusive: true },
  marikaCheekbones: { component: marikaCheekbones, label: "Marika Cheekbones", presetOnly: true, isExclusive: true },
};
