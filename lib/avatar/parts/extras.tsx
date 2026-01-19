import { PartRegistry, PartComponent, AvatarItem, createAvatarItem } from "./common";

export const ExtrasId = ["none", "freckles", "blush", "beautyMark"] as const;
export type ExtrasId = (typeof ExtrasId)[number];

const noneExtra: PartComponent = () => null;

const frecklesExtra: PartComponent = () => (
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
);

const blushExtra: PartComponent = () => (
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
);

const beautyMarkExtra: PartComponent = () => (
  <g>
    <circle cx="68" cy="68" r="0.8" fill="#4B2C20" opacity="0.8" />
  </g>
);

export const ExtrasItems: AvatarItem[] = [
  createAvatarItem({ id: "none", name: "None", svg: noneExtra }),
  createAvatarItem({ id: "freckles", name: "Freckles", svg: frecklesExtra }),
  createAvatarItem({ id: "blush", name: "Blush", svg: blushExtra }),
  createAvatarItem({ id: "beautyMark", name: "Beauty Mark", svg: beautyMarkExtra }),
];

export const Extras: PartRegistry<ExtrasId> = Object.fromEntries(
  ExtrasItems.map((item) => [item.id, { component: item.svg, label: item.name }])
) as any as PartRegistry<ExtrasId>;
