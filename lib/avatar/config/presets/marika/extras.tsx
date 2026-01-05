import { PartRegistry, PartComponent } from "../../../parts/common";

export const MarikaExtrasIds = ["marikaBlush"] as const;

export type MarikaExtrasId = (typeof MarikaExtrasIds)[number];

const marikaBlush: PartComponent = () => (
  <g opacity="0.25">
    <circle cx="32" cy="58" r="7" fill="#F472B6" filter="blur(2px)" />
    <circle cx="68" cy="58" r="7" fill="#F472B6" filter="blur(2px)" />
  </g>
);

export const MarikaExtras: PartRegistry<MarikaExtrasId> = {
  marikaBlush: { component: marikaBlush, label: "Marika Blush", presetOnly: true, isExclusive: true },
};
